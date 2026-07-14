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
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchAllServices, upsertService, deleteService } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import type { Service } from "@/types";

const empty: Partial<Service> = {
  title: "",
  description: "",
  duration: "",
  price: 0,
  image_url: "",
  sort_order: 0,
  is_active: true,
};

export function ServiceManager() {
  const queryClient = useQueryClient();
  const { data: services = [] } = useQuery({ queryKey: ["all-services"], queryFn: fetchAllServices });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<Service>>(empty);
  const [saving, setSaving] = useState(false);

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["all-services"] }),
      queryClient.invalidateQueries({ queryKey: ["services"] }),
    ]);

  const openNew = () => {
    setDraft(empty);
    setOpen(true);
  };
  const openEdit = (s: Service) => {
    setDraft(s);
    setOpen(true);
  };

  const save = async () => {
    if (!draft.title?.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    setSaving(true);
    try {
      await upsertService({
        ...draft,
        price: Number(draft.price) || 0,
        sort_order: Number(draft.sort_order) || 0,
      });
      await refresh();
      toast.success("Servicio guardado");
      setOpen(false);
    } catch {
      toast.error("No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este servicio?")) return;
    try {
      await deleteService(id);
      await refresh();
      toast.success("Servicio eliminado");
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl">Servicios</h2>
        <Button size="sm" className="rounded-full" onClick={openNew}>
          <Plus className="mr-1 h-4 w-4" /> Nuevo
        </Button>
      </div>
      <div className="space-y-2">
        {services.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">Aún no hay servicios.</p>
        )}
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {s.title}
                {!s.is_active && <span className="ml-2 text-xs text-muted-foreground">(oculto)</span>}
              </p>
              <p className="text-xs text-muted-foreground">{formatPrice(s.price)} · {s.duration || "—"}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => openEdit(s)} aria-label="Editar">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-destructive" onClick={() => remove(s.id)} aria-label="Eliminar">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild><span /></DialogTrigger>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Editar servicio" : "Nuevo servicio"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={draft.title ?? ""} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
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
                <Label>Duración</Label>
                <Input value={draft.duration ?? ""} onChange={(e) => setDraft({ ...draft, duration: e.target.value })} placeholder="60 min" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Orden</Label>
                <Input type="number" value={draft.sort_order ?? 0} onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })} />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <Switch checked={draft.is_active ?? true} onCheckedChange={(v) => setDraft({ ...draft, is_active: v })} />
                <Label>Visible</Label>
              </div>
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
