import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Trash2,
  Plus,
  Loader2,
  CalendarClock,
  MapPin,
  Building2,
  ExternalLink,
  Save,
  Pencil,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchAvailability,
  addAvailabilitySlots,
  deleteAvailabilitySlot,
  fetchConsultationLocations,
  saveConsultationLocations,
  updateSlotsLocation,
  DEFAULT_CONSULTATION_LOCATION,
  type AvailabilitySlot,
} from "@/lib/queries";
import type { ConsultationLocation } from "@/types";

function formatDate(iso: string) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return iso;
  }
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
  const { data: slots = [] } = useQuery<AvailabilitySlot[]>({
    queryKey: ["availability"],
    queryFn: fetchAvailability,
  });
  const { data: locations = [DEFAULT_CONSULTATION_LOCATION] } = useQuery<ConsultationLocation[]>({
    queryKey: ["consultation-locations"],
    queryFn: fetchConsultationLocations,
  });

  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState("");
  const [single, setSingle] = useState("");
  const [from, setFrom] = useState("09:00");
  const [to, setTo] = useState("13:00");
  const [step, setStep] = useState(30);
  const [busy, setBusy] = useState(false);

  // Selected location for adding slots
  const [selectedLocId, setSelectedLocId] = useState<string>("");

  useEffect(() => {
    if (locations.length > 0 && !selectedLocId) {
      const def = locations.find((l) => l.is_default) || locations[0];
      setSelectedLocId(def.id || "loc-1");
    }
  }, [locations, selectedLocId]);

  // Location form state (add / edit location)
  const [editingLocId, setEditingLocId] = useState<string | null>(null);
  const [locTitle, setLocTitle] = useState("");
  const [locAddress, setLocAddress] = useState("");
  const [locNotes, setLocNotes] = useState("");
  const [locMapsUrl, setLocMapsUrl] = useState("");
  const [isLocFormOpen, setIsLocFormOpen] = useState(false);
  const [savingLoc, setSavingLoc] = useState(false);

  // Quick reassign location modal / state
  const [reassignDate, setReassignDate] = useState<string | null>(null);
  const [targetLocIdForReassign, setTargetLocIdForReassign] = useState<string>("");

  const startNewLocation = () => {
    setEditingLocId(null);
    setLocTitle("");
    setLocAddress("");
    setLocNotes("");
    setLocMapsUrl("");
    setIsLocFormOpen(true);
  };

  const startEditLocation = (loc: ConsultationLocation) => {
    setEditingLocId(loc.id || null);
    setLocTitle(loc.title);
    setLocAddress(loc.address);
    setLocNotes(loc.notes ?? "");
    setLocMapsUrl(loc.google_maps_url ?? "");
    setIsLocFormOpen(true);
  };

  const cancelLocForm = () => {
    setIsLocFormOpen(false);
    setEditingLocId(null);
  };

  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locTitle.trim()) {
      toast.error("Ingresá el nombre o título del lugar");
      return;
    }
    if (!locAddress.trim()) {
      toast.error("Ingresá la dirección del lugar");
      return;
    }

    setSavingLoc(true);
    try {
      let updated: ConsultationLocation[];
      if (editingLocId) {
        updated = locations.map((loc) =>
          loc.id === editingLocId
            ? {
                ...loc,
                title: locTitle.trim(),
                address: locAddress.trim(),
                notes: locNotes.trim() || undefined,
                google_maps_url: locMapsUrl.trim() || undefined,
              }
            : loc,
        );
      } else {
        const newLoc: ConsultationLocation = {
          id: `loc-${Date.now()}`,
          title: locTitle.trim(),
          address: locAddress.trim(),
          notes: locNotes.trim() || undefined,
          google_maps_url: locMapsUrl.trim() || undefined,
          is_default: locations.length === 0,
        };
        updated = [...locations, newLoc];
      }

      await saveConsultationLocations(updated);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["consultation-locations"] }),
        queryClient.invalidateQueries({ queryKey: ["consultation-location"] }),
        queryClient.invalidateQueries({ queryKey: ["site-content"] }),
      ]);
      toast.success(editingLocId ? "Lugar actualizado" : "Nuevo lugar guardado");
      setIsLocFormOpen(false);
      setEditingLocId(null);
    } catch {
      toast.error("No se pudo guardar la ubicación");
    } finally {
      setSavingLoc(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    const updated = locations.map((loc) => ({
      ...loc,
      is_default: loc.id === id,
    }));
    try {
      await saveConsultationLocations(updated);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["consultation-locations"] }),
        queryClient.invalidateQueries({ queryKey: ["consultation-location"] }),
      ]);
      toast.success("Lugar principal actualizado");
    } catch {
      toast.error("No se pudo actualizar");
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (locations.length <= 1) {
      toast.error("Debes mantener al menos un lugar registrado");
      return;
    }
    const updated = locations.filter((loc) => loc.id !== id);
    if (!updated.some((l) => l.is_default)) {
      updated[0].is_default = true;
    }
    try {
      await saveConsultationLocations(updated);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["consultation-locations"] }),
        queryClient.invalidateQueries({ queryKey: ["consultation-location"] }),
      ]);
      toast.success("Lugar eliminado");
      if (selectedLocId === id) {
        setSelectedLocId(updated[0].id || "");
      }
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

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

    const activeLoc = locations.find((l) => l.id === selectedLocId) || locations[0];

    setBusy(true);
    try {
      await addAvailabilitySlots(date, clean, activeLoc);
      await refresh();
      toast.success(
        `Horarios agregados en ${activeLoc?.title ? `"${activeLoc.title}"` : "el lugar seleccionado"}`,
      );
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
      toast.success("Horario eliminado");
    } catch {
      toast.error("No se pudo eliminar");
    }
  };

  const handleApplyReassign = async (dateStr: string) => {
    const loc = locations.find((l) => l.id === targetLocIdForReassign);
    if (!loc) return;

    const slotsForThisDay = slots.filter((s) => s.date === dateStr);
    const slotIds = slotsForThisDay.map((s) => s.id);

    try {
      await updateSlotsLocation(slotIds, loc);
      await refresh();
      toast.success(`Turnos del ${dateStr} actualizados a "${loc.title}"`);
      setReassignDate(null);
    } catch {
      toast.error("No se pudo reasignar el lugar");
    }
  };

  const grouped = useMemo(() => {
    const map = new Map<string, AvailabilitySlot[]>();
    for (const s of slots) {
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date)!.push(s);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [slots]);

  const activeLocObj = locations.find((l) => l.id === selectedLocId) || locations[0];

  return (
    <div className="space-y-8">
      {/* SECCIÓN 1: Lugares de atención configurados */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl">Lugares de atención presencial</h2>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full self-start sm:self-auto"
            onClick={startNewLocation}
          >
            <Plus className="mr-1 h-3.5 w-3.5" /> Agregar otro lugar
          </Button>
        </div>

        <p className="mb-5 text-sm text-muted-foreground">
          Podés registrar los distintos lugares donde atendés (por ejemplo: gimnasio653, consultorio
          privado, centro médico). Luego podrás asignarle a cada turno el lugar correspondiente,
          incluso dentro de un mismo día.
        </p>

        {/* Lista de lugares */}
        <div className="grid gap-3 sm:grid-cols-2">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all ${
                loc.is_default ? "border-primary/40 bg-accent/20" : "border-border bg-surface"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-display font-semibold truncate">{loc.title}</span>
                  </div>
                  {loc.is_default && (
                    <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      Principal
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-foreground/80 font-medium">{loc.address}</p>
                {loc.notes && (
                  <p className="mt-1 text-[11px] text-muted-foreground italic">ℹ️ {loc.notes}</p>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-xs">
                {loc.google_maps_url ? (
                  <a
                    href={loc.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> Ver mapa
                  </a>
                ) : (
                  <span className="text-muted-foreground text-[11px]">Sin link de mapa</span>
                )}

                <div className="flex items-center gap-1">
                  {!loc.is_default && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-[11px] rounded-lg"
                      onClick={() => handleSetDefault(loc.id || "")}
                    >
                      Hacer principal
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 rounded-lg"
                    onClick={() => startEditLocation(loc)}
                    aria-label="Editar lugar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  {locations.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 rounded-lg text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteLocation(loc.id || "")}
                      aria-label="Eliminar lugar"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulario para agregar / editar lugar */}
        {isLocFormOpen && (
          <form
            onSubmit={handleSaveLocation}
            className="mt-6 rounded-2xl border border-primary/30 bg-accent/15 p-5 shadow-xs animate-in fade-in"
          >
            <h3 className="font-display font-semibold mb-3 text-base">
              {editingLocId ? "Editar lugar de atención" : "Agregar nuevo lugar de atención"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="loc_title_field">
                  Nombre del lugar <span className="text-primary">*</span>
                </Label>
                <Input
                  id="loc_title_field"
                  placeholder="Ej: gimnasio653 o Consultorio Centro"
                  value={locTitle}
                  onChange={(e) => setLocTitle(e.target.value)}
                  className="rounded-xl"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="loc_address_field">
                  Dirección exacta <span className="text-primary">*</span>
                </Label>
                <Input
                  id="loc_address_field"
                  placeholder="Ej: Av. San Martín 1234, Carlos Paz, Córdoba"
                  value={locAddress}
                  onChange={(e) => setLocAddress(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="loc_notes_field">Indicaciones o piso (opcional)</Label>
                <Input
                  id="loc_notes_field"
                  placeholder="Ej: 1° piso, presentarse en recepción"
                  value={locNotes}
                  onChange={(e) => setLocNotes(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="loc_maps_field">Enlace a Google Maps (opcional)</Label>
                <Input
                  id="loc_maps_field"
                  type="url"
                  placeholder="https://maps.app.goo.gl/..."
                  value={locMapsUrl}
                  onChange={(e) => setLocMapsUrl(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={cancelLocForm}
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-full px-5" disabled={savingLoc}>
                {savingLoc ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-1.5 h-4 w-4" />
                )}
                {editingLocId ? "Guardar cambios" : "Crear lugar"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* SECCIÓN 2: Crear horarios con asignación de lugar */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl">Horarios disponibles</h2>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Definí los días, las horas y el lugar donde atenderás. Solo los horarios cargados aquí
          aparecerán en la página de reservas.
        </p>

        <div className="mb-6 space-y-4 rounded-2xl border border-border bg-surface p-5">
          <div className="grid gap-4 sm:grid-cols-2">
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

            <div className="space-y-2">
              <Label htmlFor="slot_location_select">📍 Lugar de atención para estos horarios</Label>
              <select
                id="slot_location_select"
                value={selectedLocId}
                onChange={(e) => setSelectedLocId(e.target.value)}
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
              >
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.title} — {loc.address} {loc.is_default ? "(Principal)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeLocObj && (
            <div className="flex items-center gap-2 rounded-xl bg-accent/30 px-3.5 py-2 text-xs text-foreground/85">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                Los turnos agregados se guardarán para: <strong>{activeLocObj.title}</strong> (
                {activeLocObj.address})
              </span>
            </div>
          )}

          {/* Opción A: Agregar un solo horario */}
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="space-y-2">
              <Label>Agregar un horario específico</Label>
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
                disabled={busy || !single}
              >
                <Plus className="mr-1 h-4 w-4" /> Agregar turno
              </Button>
            </div>
          </div>

          {/* Opción B: Generar rango de horarios */}
          <div className="border-t border-border pt-4">
            <Label className="mb-2 block">O generar varios turnos seguidos (por rango)</Label>
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
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generar bloque"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: Lista de horarios cargados */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-lg">Horarios activos cargados</h3>

          {grouped.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Todavía no cargaste horarios en el calendario.
            </p>
          )}

          {grouped.map(([d, items]) => (
            <div key={d} className="rounded-2xl border border-border p-4 bg-card">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2">
                <p className="text-sm font-semibold capitalize text-foreground">{formatDate(d)}</p>

                {/* Botón para cambiar lugar de todos los turnos de este día */}
                {locations.length > 1 && (
                  <button
                    onClick={() => {
                      setReassignDate(reassignDate === d ? null : d);
                      setTargetLocIdForReassign(locations[0].id || "");
                    }}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    {reassignDate === d ? "Cancelar" : "Cambiar lugar a este día"}
                  </button>
                )}
              </div>

              {/* Panel para reasignar lugar a todos los turnos del día */}
              {reassignDate === d && (
                <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl bg-accent/30 p-3 text-xs">
                  <span className="font-medium text-foreground">
                    Asignar nuevo lugar a todos los turnos del día:
                  </span>
                  <select
                    value={targetLocIdForReassign}
                    onChange={(e) => setTargetLocIdForReassign(e.target.value)}
                    className="h-8 rounded-lg border border-input bg-background px-2 text-xs"
                  >
                    {locations.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.title} ({l.address})
                      </option>
                    ))}
                  </select>
                  <Button
                    size="sm"
                    className="h-8 px-3 rounded-lg"
                    onClick={() => handleApplyReassign(d)}
                  >
                    <CheckCircle className="mr-1 h-3.5 w-3.5" /> Aplicar
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {items.map((it) => (
                  <span
                    key={it.id}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent/60 px-3 py-1 text-xs text-accent-foreground border border-border/50"
                  >
                    <span className="font-semibold">{it.time} hs</span>
                    {it.location_title && (
                      <span className="text-[11px] text-primary font-medium">
                        · 📍 {it.location_title}
                      </span>
                    )}
                    <button
                      onClick={() => remove(it.id)}
                      aria-label={`Eliminar ${it.time}`}
                      className="ml-0.5 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
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
