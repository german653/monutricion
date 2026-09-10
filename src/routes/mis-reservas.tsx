import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  CalendarPlus,
  Navigation,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  Loader2,
  CalendarCheck,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { fetchAppointmentsByEmailOrPhone, fetchAppointments } from "@/lib/queries";
import type { Appointment, AppointmentStatus } from "@/types";

export const Route = createFileRoute("/mis-reservas")({
  head: () => ({
    meta: [
      { title: "Mis Reservas — Melina Oviedo Nutrición" },
      {
        name: "description",
        content: "Consultá tus turnos agendados con la Lic. Melina Oviedo.",
      },
    ],
  }),
  component: MisReservasPage,
});

function formatDate(iso: string) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function buildCalendarUrl(app: Appointment) {
  try {
    const [year, month, day] = app.date.split("-").map(Number);
    const [hours, minutes] = app.time.split(":").map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");

    const location = `${app.location_title || "Consultorio"} - ${app.location_address || "Córdoba"}`;
    const title = encodeURIComponent(
      `Consulta con Melina Oviedo — ${app.service_name || "Nutrición"}`,
    );
    const details = encodeURIComponent(
      `Turno de nutrición con la Lic. Melina Oviedo.\nPaciente: ${app.first_name} ${app.last_name}\nServicio: ${app.service_name || "Consulta"}\nLugar: ${location}\nContacto: paginamelinanutricion@gmail.com / +54 9 3541 63-9512`,
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${encodeURIComponent(location)}`;
  } catch {
    return "#";
  }
}

const statusConfig: Record<
  AppointmentStatus,
  { label: string; badgeClass: string; icon: typeof CheckCircle2 }
> = {
  pendiente: {
    label: "Pendiente de confirmación",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
    icon: Clock3,
  },
  confirmado: {
    label: "Turno Confirmado",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    badgeClass: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
    icon: XCircle,
  },
};

function MisReservasPage() {
  const [queryInput, setQueryInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  // Auto-fill from recent booking storage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const contactRaw = localStorage.getItem("mo_client_contact");
        if (contactRaw) {
          const contact = JSON.parse(contactRaw);
          const initial = contact.email || contact.phone || "";
          if (initial) {
            setQueryInput(initial);
            setSubmittedQuery(initial);
          }
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const {
    data: appointments = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["client-appointments", submittedQuery],
    queryFn: () => fetchAppointmentsByEmailOrPhone(submittedQuery),
    enabled: Boolean(submittedQuery.trim()),
    staleTime: 1000 * 30,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      setSubmittedQuery(queryInput.trim());
    }
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <Reveal className="text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
            <CalendarCheck className="h-4 w-4" /> Portal de Pacientes
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
            Mis Reservas
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Consultá la fecha, hora y ubicación de tus turnos agendados con la Lic. Melina Oviedo, o
            escribile directamente ante cualquier duda.
          </p>
        </Reveal>

        {/* Buscador de turnos */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-3">
              <Label htmlFor="search-input" className="text-sm font-medium">
                Buscá tus turnos por Email o Teléfono
              </Label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-input"
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    placeholder="Ej: tuemail@gmail.com o 3541..."
                    className="pl-9 rounded-2xl text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!queryInput.trim() || isFetching}
                  className="rounded-2xl px-6"
                >
                  {isFetching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...
                    </>
                  ) : (
                    "Buscar reservas"
                  )}
                </Button>
              </div>
              <p className="text-[0.75rem] text-muted-foreground">
                Podés ingresar el correo electrónico o el número de teléfono con el que reservaste.
              </p>
            </form>
          </div>
        </Reveal>

        {/* Resultados */}
        <div className="mt-10 space-y-4">
          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground font-medium">Buscando tus turnos...</p>
            </div>
          ) : submittedQuery && appointments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center space-y-4 max-w-xl mx-auto">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-foreground text-base">
                  No encontramos turnos registrados
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  No hallamos ninguna reserva con el dato{" "}
                  <strong className="text-foreground">{submittedQuery}</strong>. Verificá que el
                  correo o teléfono coincida con el que ingresaste al reservar.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Button asChild className="rounded-full">
                  <Link to="/reservar">Reservar un nuevo turno</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setQueryInput("");
                    setSubmittedQuery("");
                  }}
                >
                  Intentar con otro dato
                </Button>
              </div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <p className="text-sm font-medium text-foreground">
                  Encontramos{" "}
                  <strong className="font-semibold text-primary">
                    {appointments.length} {appointments.length === 1 ? "reserva" : "reservas"}
                  </strong>{" "}
                  para <span className="text-muted-foreground font-normal">{submittedQuery}</span>
                </p>
                <Button asChild size="sm" variant="ghost" className="rounded-full text-xs">
                  <Link to="/reservar">+ Nuevo turno</Link>
                </Button>
              </div>

              <div className="grid gap-5">
                {appointments.map((app) => {
                  const status = statusConfig[app.status] || statusConfig.pendiente;
                  const StatusIcon = status.icon;
                  const locationTitle = app.location_title || "Consultorio Gimnasio 653";
                  const locationAddress = app.location_address || "Córdoba, Argentina";
                  const mapsUrl =
                    app.location_maps_url ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${locationTitle} ${locationAddress}`,
                    )}`;

                  // WhatsApp pre-filled message for Melina
                  const waMsg = `¡Hola Meli! Te consulto sobre mi turno en tu web:\n• Paciente: ${app.first_name} ${app.last_name}\n• Servicio: ${app.service_name || "Nutrición"}\n• Día: ${formatDate(app.date)}\n• Horario: ${app.time} hs\n\n¿Me podrías brindar más información o confirmarlo? ¡Muchas gracias!`;
                  const waUrl = `https://wa.me/5493541639512?text=${encodeURIComponent(waMsg)}`;

                  return (
                    <div
                      key={app.id}
                      className="rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-card space-y-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/60 pb-4">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                            Servicio
                          </span>
                          <h3 className="font-display text-xl font-semibold text-foreground">
                            {app.service_name || "Consulta Nutricional"}
                          </h3>
                        </div>
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.badgeClass}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          <span>{status.label}</span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-2xl border border-border/70 bg-surface/70 p-4 space-y-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                            <Calendar className="h-4 w-4 text-primary" /> Fecha de la consulta
                          </span>
                          <p className="font-semibold text-foreground text-sm capitalize">
                            {formatDate(app.date)}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-border/70 bg-surface/70 p-4 space-y-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                            <Clock className="h-4 w-4 text-primary" /> Horario asignado
                          </span>
                          <p className="font-semibold text-foreground text-sm">{app.time} hs</p>
                        </div>

                        <div className="rounded-2xl border border-border/70 bg-surface/70 p-4 space-y-1 sm:col-span-2 lg:col-span-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                            <MapPin className="h-4 w-4 text-primary" /> Lugar de atención
                          </span>
                          <p className="font-semibold text-foreground text-sm truncate">
                            {locationTitle}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {locationAddress}
                          </p>
                        </div>
                      </div>

                      {app.notes && (
                        <div className="rounded-2xl bg-muted/40 p-3 text-xs text-muted-foreground space-y-0.5">
                          <span className="font-semibold text-foreground">Tus observaciones:</span>
                          <p>{app.notes}</p>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>Consultar a Melina por WhatsApp</span>
                          </a>

                          <a
                            href={buildCalendarUrl(app)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
                          >
                            <CalendarPlus className="h-3.5 w-3.5 text-primary" />
                            <span>Google Calendar</span>
                          </a>
                        </div>

                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline ml-auto"
                        >
                          <Navigation className="h-3.5 w-3.5" />
                          <span>Ver cómo llegar en Maps</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-8 text-center space-y-4 max-w-xl mx-auto shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-foreground text-base">
                  Buscá tus reservas fácilmente
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ingresá en el buscador superior el email o teléfono que usaste para reservar tu
                  turno y verás el horario, el lugar de atención y el estado de confirmación.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-muted-foreground text-left flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Recordá que también te enviamos un correo con los detalles desde{" "}
                  <strong className="text-foreground">paginamelinanutricion@gmail.com</strong> al momento de reservar.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
