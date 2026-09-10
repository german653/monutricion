import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchFaq, upsertFaq, deleteFaq, reorderFaqs, resetDefaultFaqs } from "@/lib/queries";
import type { Faq } from "@/types";

export function FaqManager() {
  const queryClient = useQueryClient();
  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faq"],
    queryFn: fetchFaq,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Partial<Faq> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [resetting, setResetting] = useState(false);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["faq"] });

  const handleOpenNew = () => {
    setEditingFaq({
      id: "",
      question: "",
      answer: "",
      sort_order: faqs.length + 1,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (faq: Faq) => {
    setEditingFaq({ ...faq });
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq?.question?.trim()) {
      toast.error("La pregunta no puede estar vacía");
      return;
    }
    if (!editingFaq?.answer?.trim()) {
      toast.error("La respuesta no puede estar vacía");
      return;
    }

    setSaving(true);
    try {
      await upsertFaq(editingFaq);
      await refresh();
      toast.success(editingFaq.id ? "Pregunta actualizada" : "Pregunta agregada con éxito");
      setDialogOpen(false);
      setEditingFaq(null);
    } catch {
      toast.error("No se pudo guardar la pregunta frecuente");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás segura de eliminar esta pregunta frecuente?")) return;
    setDeletingId(id);
    try {
      await deleteFaq(id);
      await refresh();
      toast.success("Pregunta frecuente eliminada");
    } catch {
      toast.error("No se pudo eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setReordering(true);
    try {
      await reorderFaqs(updated);
      await refresh();
      toast.success("Orden actualizado");
    } catch {
      toast.error("No se pudo actualizar el orden");
    } finally {
      setReordering(false);
    }
  };

  const handleResetDefaults = async () => {
    if (
      !confirm(
        "¿Restaurar las preguntas frecuentes oficiales por defecto de Melina Oviedo Nutrición?",
      )
    )
      return;
    setResetting(true);
    try {
      await resetDefaultFaqs();
      await refresh();
      toast.success("Preguntas frecuentes oficiales restauradas");
    } catch {
      toast.error("No se pudieron restaurar las preguntas por defecto");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Preguntas Frecuentes (FAQ)</h2>
            <p className="text-sm text-muted-foreground">
              Gestioná las dudas habituales que ven tus pacientes en la sección "Sobre Mí".
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs"
            onClick={handleResetDefaults}
            disabled={resetting}
          >
            {resetting ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            )}
            Restaurar predeterminadas
          </Button>

          <Button size="sm" className="rounded-full" onClick={handleOpenNew}>
            <Plus className="mr-1.5 h-4 w-4" /> Nueva Pregunta
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Cargando preguntas frecuentes...</p>
        </div>
      ) : faqs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center space-y-3">
          <p className="text-muted-foreground text-sm">
            Aún no hay preguntas frecuentes creadas.
          </p>
          <Button size="sm" className="rounded-full" onClick={handleOpenNew}>
            <Plus className="mr-1.5 h-4 w-4" /> Crear la primera pregunta
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="group rounded-2xl border border-border bg-surface p-4 transition-all hover:border-border/80 hover:bg-surface/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-8 line-clamp-2">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-border/50">
                {/* Reordenar */}
                <div className="flex items-center rounded-xl bg-background border border-border/70 p-0.5 mr-1">
                  <button
                    type="button"
                    disabled={index === 0 || reordering}
                    onClick={() => handleMove(index, "up")}
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors"
                    title="Mover arriba"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === faqs.length - 1 || reordering}
                    onClick={() => handleMove(index, "down")}
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 transition-colors"
                    title="Mover abajo"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-xl"
                  onClick={() => handleOpenEdit(faq)}
                  title="Editar pregunta"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDelete(faq.id)}
                  disabled={deletingId === faq.id}
                  title="Eliminar pregunta"
                >
                  {deletingId === faq.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal / Dialog para agregar o editar */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg rounded-3xl">
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingFaq?.id ? "Editar Pregunta Frecuente" : "Nueva Pregunta Frecuente"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="faq-question">Pregunta</Label>
                <Input
                  id="faq-question"
                  value={editingFaq?.question ?? ""}
                  onChange={(e) =>
                    setEditingFaq((prev) => (prev ? { ...prev, question: e.target.value } : null))
                  }
                  placeholder="Ej: ¿Cómo son las consultas online o presenciales?"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faq-answer">Respuesta</Label>
                <Textarea
                  id="faq-answer"
                  rows={5}
                  value={editingFaq?.answer ?? ""}
                  onChange={(e) =>
                    setEditingFaq((prev) => (prev ? { ...prev, answer: e.target.value } : null))
                  }
                  placeholder="Explicá con claridad el procedimiento, duración o modalidad..."
                  required
                  className="rounded-xl text-sm leading-relaxed"
                />
              </div>
            </div>

            <DialogFooter className="flex flex-row justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingFaq?.id ? "Guardar Cambios" : "Crear Pregunta"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
