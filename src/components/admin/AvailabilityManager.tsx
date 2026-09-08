import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus, Loader2, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAvailability, addAvailabilitySlots, deleteAvailabilitySlot } from "@/lib/queries";

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
}

function generateRange(from: string, to: string, stepMin: number): string[] {
  if (!from || !to) return [];
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  let cur = fh * 60 + fm;
  const end = th * 60 + tm;
  const out: string[] = [];
  while (cur <= end && out.length < 100) {
    out.push(
      `${String(Math.floor(cur / 60)).padStart(2, "0")}:${String(cur % 60).padStart(2, "0")}`,
    );
    cur += stepMin;
  }
  return out;
}

export function AvailabilityManager() {
  const queryClient = useQueryClient();
  const { data: slots = [] } = useQuery({ queryKey: ["availability"], queryFn: fetchAvailability });
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState("");
  const [single, setSingle] = useState("");
  const [from, setFrom] = useState("09:00");
  const [to, setTo] = useState("13:00");
  const [step, setStep] = useState(30);
  const [busy, setBusy] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, { id: string; time: string }[]>();
    for (const s of slots) {
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date)!.push({ id: s.id, time: s.time });
    }
    return Array.from(map.entries());
  }, [slots]);

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["availability"] }),
      queryClient.invalidateQueries({ queryKey: ["available-slots"] }),
    ]);

  const add = async (times: string[]) => {
    if (!date) {
      toast.error("Elegí un día");
      return;
    }
    const clean = times.filter(Boolean);
    if (clean.length === 0) {
      toast.error("Agregá al menos un horario");
      return;
    }
    setBusy(true);
    try {
      await addAvailabilitySlots(date, clean);
      await refresh();
      toast.success("Horarios agregados");
      setSingle("");
    } catch {
      toast.error("No se pudieron agregar");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteAvailabilitySlot(id);
      await refresh();
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl">Horarios disponibles</h2>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Definí los días y las horas en que la gente puede reservar. Solo estos horarios aparecerán
        en la página de reservas.
      </p>

      <div className="mb-6 space-y-4 rounded-2xl border border-border bg-surface p-4">
        <div className="space-y-2">
          <Label>Día</Label>
          <Input
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <Label>Agregar un horario</Label>
            <Input
              type="time"
              value={single}
              onChange={(e) => setSingle(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <div className="flex items-end">
            <Button
              className="w-full rounded-full sm:w-auto"
              onClick={() => add([single])}
              disabled={busy}
            >
              <Plus className="mr-1 h-4 w-4" /> Agregar
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="mb-2 block">Generar varios (por rango)</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Desde</span>
              <Input
                type="time"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Hasta</span>
              <Input
                type="time"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Cada (min)</span>
              <Input
                type="number"
                min={5}
                step={5}
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="rounded-xl"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                className="w-full rounded-full"
                onClick={() => add(generateRange(from, to, step))}
                disabled={busy}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generar"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {grouped.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Todavía no cargaste horarios.
          </p>
        )}
        {grouped.map(([d, items]) => (
          <div key={d} className="rounded-2xl border border-border p-4">
            <p className="mb-3 text-sm font-medium capitalize">{formatDate(d)}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((it) => (
                <span
                  key={it.id}
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
                >
                  {it.time}
                  <button
                    onClick={() => remove(it.id)}
                    aria-label={`Eliminar ${it.time}`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
