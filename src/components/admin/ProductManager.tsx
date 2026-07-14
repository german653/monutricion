import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchAllProducts, fetchCategories, upsertProduct, deleteProduct } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

const empty: Partial<Product> = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: "",
  category_id: null,
  is_active: true,
};

export function ProductManager() {
  const queryClient = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ["all-products"], queryFn: fetchAllProducts });
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<Product>>(empty);
  const [saving, setSaving] = useState(false);

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["all-products"] }),
      queryClient.invalidateQueries({ queryKey: ["products"] }),
    ]);

  const openNew = () => {
    setDraft(empty);
    setOpen(true);
  };
  const openEdit = (p: Product) => {
    setDraft(p);
    setOpen(true);
  };

  const save = async () => {
    if (!draft.name?.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    setSaving(true);
    try {
      await upsertProduct({
        ...draft,
        price: Number(draft.price) || 0,
        stock: Number(draft.stock) || 0,
        category_id: draft.category_id || null,
      });
      await refresh();
      toast.success("Producto guardado");
      setOpen(false);
    } catch {
      toast.error("No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await deleteProduct(id);
      await refresh();
      toast.success("Producto eliminado");
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl">Productos</h2>
        <Button size="sm" className="rounded-full" onClick={openNew}>
          <Plus className="mr-1 h-4 w-4" /> Nuevo
        </Button>
      </div>
      <div className="space-y-2">
        {products.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">Aún no hay productos.</p>
        )}
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {p.name}
                {!p.is_active && <span className="ml-2 text-xs text-muted-foreground">(oculto)</span>}
              </p>
              <p className="text-xs text-muted-foreground">{formatPrice(p.price)} · Stock: {p.stock}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openEdit(p)} aria-label="Editar">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-destructive" onClick={() => remove(p.id)} aria-label="Eliminar">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Editar producto" : "Nuevo producto"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={draft.name ?? ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea rows={3} value={draft.description ?? ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Precio</Label>
                <Input type="number" value={draft.price ?? 0} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input type="number" value={draft.stock ?? 0} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <select
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                value={draft.category_id ?? ""}
                onChange={(e) => setDraft({ ...draft, category_id: e.target.value || null })}
              >
                <option value="">Sin categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={draft.is_active ?? true} onCheckedChange={(v) => setDraft({ ...draft, is_active: v })} />
              <Label>Visible en la tienda</Label>
            </div>
            <div className="space-y-2">
              <Label>URL de imagen (opcional)</Label>
              <Input value={draft.image_url ?? ""} onChange={(e) => setDraft({ ...draft, image_url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" className="rounded-full" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="rounded-full" onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
