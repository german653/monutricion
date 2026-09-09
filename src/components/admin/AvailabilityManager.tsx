import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2, Plus, Loader2, CalendarClock, MapPin, Building2, ExternalLink, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchAvailability,
  addAvailabilitySlots,
  deleteAvailabilitySlot,
  fetchConsultationLocation,
  saveConsultationLocation,
  DEFAULT_CONSULTATION_LOCATION,
} from "@/lib/queries";
import type { ConsultationLocation } from "@/types";

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
  const { data: locationData } = useQuery({
    queryKey: ["consultation-location"],
    queryFn: fetchConsultationLocation,
  });
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState("");
  const [single, setSingle] = useState("");
  const [from, setFrom] = useState("09:00");
  const [to, setTo] = useState("13:00");
  const [step, setStep] = useState(30);
  const [busy, setBusy] = useState(false);

  // Location state
  const [locDraft, setLocDraft] = useState<ConsultationLocation>(DEFAULT_CONSULTATION_LOCATION);
  const [savingLoc, setSavingLoc] = useState(false);

  useEffect(() => {
    if (locationData) {
      setLocDraft({
        title: locationData.title || DEFAULT_CONSULTATION_LOCATION.title,
        address: locationData.address || DEFAULT_CONSULTATION_LOCATION.address,
        notes: locationData.notes ?? DEFAULT_CONSULTATION_LOCATION.notes,
        google_maps_url: locationData.google_maps_url ?? "",
      });
    }
  }, [locationData]);

  const handleSaveLocation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!locDraft.title.trim()) {
      toast.error("Ingresá el título o nombre del lugar");
      return;
    }
    if (!locDraft.address.trim()) {
      toast.error("Ingresá la dirección o ubicación del lugar");
      return;
    }

    setSavingLoc(true);
    try {
      await saveConsultationLocation(locDraft);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["consultation-location"] }),
        queryClient.invalidateQueries({ queryKey: ["site-content"] }),
      ]);
      toast.success("¡Lugar de atención guardado con éxito!");
    } catch {
      toast.error("No se pudo guardar la ubicación");
    } finally {
      setSavingLoc(false);
    }
  };

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
    <div className="space-y-8">
      {/* Lugar de atención física */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl">Lugar de atención presencial</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Visible en Reservas
          </span>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">
          Configurá el nombre del lugar donde atendés y la dirección exacta para que tus pacientes sepan a dónde tienen que ir al reservar su turno.
        </p>

        <form onSubmit={handleSaveLocation} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="loc_title">
                Título del lugar <span className="text-primary">*</span>
              </Label>
              <Input
                id="loc_title"
                placeholder="Ej: gimnasio653 o Consultorio Central"
                value={locDraft.title}
                onChange={(e) => setLocDraft({ ...locDraft, title: e.target.value })}
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                El nombre comercial o del espacio de atención.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loc_address">
                Dirección / Ubicación <span className="text-primary">*</span>
              </Label>
              <Input
                id="loc_address"
                placeholder="Ej: Av. San Martín 1234, Carlos Paz, Córdoba"
                value={locDraft.address}
                onChange={(e) => setLocDraft({ ...locDraft, address: e.target.value })}
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                Calle, número, barrio y ciudad para ubicar el lugar.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="loc_notes">Indicaciones adicionales (opcional)</Label>
              <Textarea
                id="loc_notes"
                placeholder="Ej: 1° piso por escalera, anunciarse en recepción al llegar."
                rows={2}
                value={locDraft.notes ?? ""}
                onChange={(e) => setLocDraft({ ...locDraft, notes: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loc_maps">Enlace a Google Maps (opcional)</Label>
              <Input
                id="loc_maps"
                type="url"
                placeholder="https://maps.app.goo.gl/..."
                value={locDraft.google_maps_url ?? ""}
                onChange={(e) => setLocDraft({ ...locDraft, google_maps_url: e.target.value })}
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                Si pegás el enlace, los pacientes tendrán un botón directo para abrir la ruta en su GPS.
              </p>
            </div>
          </div>

          {/* Vista previa en tiempo real */}
          <div className="rounded-2xl border border-primary/20 bg-accent/40 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Vista previa para los pacientes en la web
            </p>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Lugar de atención:</span>
                  <p className="font-semibold text-foreground">
                    {locDraft.title || "gimnasio653"}
                  </p>
                </div>
                <p className="text-sm text-foreground/90">
                  {locDraft.address || "Dirección pendiente de configuración"}
                </p>
                {locDraft.notes && (
                  <p className="mt-1 text-xs text-muted-foreground italic">
                    ℹ️ {locDraft.notes}
                  </p>
                )}
                {locDraft.google_maps_url && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      <ExternalLink className="h-3 w-3" /> Ver en Google Maps
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-full px-6"
              disabled={savingLoc}
            >
              {savingLoc ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar lugar de atención
            </Button>
          </div>
        </form>
      </div>

      {/* Horarios disponibles */}
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
  </div>
  );
}
