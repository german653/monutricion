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
import { ImageUpload } from "@/components/admin/ImageUpload";
import { fetchAllRecipes, upsertRecipe, deleteRecipe } from "@/lib/queries";
import type { Recipe } from "@/types";

const empty: Partial<Recipe> = {
  title: "",
  description: "",
  image_url: "",
  category: "",
  prep_time: "",
  servings: "",
  ingredients: "",
  steps: "",
  sort_order: 0,
  is_published: true,
};

export function RecipeManager() {
  const queryClient = useQueryClient();
  const { data: recipes = [] } = useQuery({ queryKey: ["all-recipes"], queryFn: fetchAllRecipes });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<Recipe>>(empty);
  const [saving, setSaving] = useState(false);

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["all-recipes"] }),
      queryClient.invalidateQueries({ queryKey: ["recipes"] }),
    ]);

  const save = async () => {
    if (!draft.title?.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    setSaving(true);
    try {
      await upsertRecipe({ ...draft, sort_order: Number(draft.sort_order) || 0 });
      await refresh();
      toast.success("Receta guardada");
      setOpen(false);
    } catch {
      toast.error("No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar esta receta?")) return;
    try {
      await deleteRecipe(id);
      await refresh();
      toast.success("Receta eliminada");
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl">Recetas y material</h2>
        <Button
          size="sm"
          className="rounded-full"
          onClick={() => {
            setDraft(empty);
            setOpen(true);
          }}
        >
          <Plus className="mr-1 h-4 w-4" /> Nueva
        </Button>
      </div>

      <div className="space-y-2">
        {recipes.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Aún no hay recetas. Subí la primera con su imagen.
          </p>
        )}
        {recipes.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              {r.image_url && (
                <img src={r.image_url} alt="" className="h-10 w-10 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {r.title}
                  {!r.is_published && (
                    <span className="ml-2 text-xs text-muted-foreground">(oculta)</span>
                  )}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {[r.category, r.prep_time, r.servings].filter(Boolean).join(" · ") || "Sin datos"}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => {
                  setDraft(r);
                  setOpen(true);
                }}
                aria-label="Editar"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-destructive"
                onClick={() => remove(r.id)}
                aria-label="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Editar receta" : "Nueva receta"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={draft.title ?? ""}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Descripción corta</Label>
              <Textarea
                rows={2}
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </div>
            <ImageUpload
              value={draft.image_url}
              onChange={(url) => setDraft({ ...draft, image_url: url })}
              folder="recetas"
              label="Imagen de la receta o infografía"
            />
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Input
                  value={draft.category ?? ""}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  placeholder="Desayuno"
                />
              </div>
              <div className="space-y-2">
                <Label>Tiempo</Label>
                <Input
                  value={draft.prep_time ?? ""}
                  onChange={(e) => setDraft({ ...draft, prep_time: e.target.value })}
                  placeholder="20 min"
                />
              </div>
              <div className="space-y-2">
                <Label>Porciones</Label>
                <Input
                  value={draft.servings ?? ""}
                  onChange={(e) => setDraft({ ...draft, servings: e.target.value })}
                  placeholder="2"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Ingredientes (uno por línea)</Label>
              <Textarea
                rows={5}
                value={draft.ingredients ?? ""}
                onChange={(e) => setDraft({ ...draft, ingredients: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Preparación (un paso por línea)</Label>
              <Textarea
                rows={5}
                value={draft.steps ?? ""}
                onChange={(e) => setDraft({ ...draft, steps: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 items-end gap-4">
              <div className="space-y-2">
                <Label>Orden</Label>
                <Input
                  type="number"
                  value={draft.sort_order ?? 0}
                  onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Switch
                  checked={draft.is_published ?? true}
                  onCheckedChange={(v) => setDraft({ ...draft, is_published: v })}
                />
                <Label>Visible en la web</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" className="rounded-full" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="rounded-full" onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
