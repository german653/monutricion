import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  MapPin,
  Navigation,
  ExternalLink,
  Calendar,
  Clock,
  Mail,
  MessageCircle,
  CalendarPlus,
  BookmarkCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { fetchConsultationLocation } from "@/lib/queries";
import type { Appointment } from "@/types";

export const Route = createFileRoute("/reservar/confirmacion")({
  head: () => ({
    meta: [{ title: "Turno confirmado — Melina Oviedo" }, { name: "robots", content: "noindex" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["consultation-location"],
      queryFn: fetchConsultationLocation,
    }),
  component: ConfirmationPage,
});

function formatDate(iso: string) {
  try {
    const d = new Date(`${iso}T00:00:00`);
    return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return iso;
  }
}

function buildCalendarUrl(app: Appointment, location: string) {
  try {
    const [year, month, day] = app.date.split("-").map(Number);
    const [hours, minutes] = app.time.split(":").map(Number);
    const start = new Date(year, month - 1, day, hours, minutes);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration

    const fmt = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d+/g, "");

    const title = encodeURIComponent(
      `Consulta con Melina Oviedo — ${app.service_name || "Nutrición"}`,
    );
    const details = encodeURIComponent(
      `Turno agendado con la Lic. Melina Oviedo.\nServicio: ${app.service_name || "Consulta Nutricional"}\nPaciente: ${app.first_name} ${app.last_name}\nLugar: ${location}\nContacto: paginamelinanutricion@gmail.com / +54 9 3541 63-9512`,
    );
    const loc = encodeURIComponent(location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${loc}`;
  } catch {
    return "#";
  }
}

function ConfirmationPage() {
  const { data: defaultLocation } = useQuery({
    queryKey: ["consultation-location"],
    queryFn: fetchConsultationLocation,
  });

  let booked: Appointment | null = null;
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem("mo_last_booked_appointment");
      if (raw) booked = JSON.parse(raw);
    } catch {
      // ignore
    }
  }

  const locationTitle = booked?.location_title || defaultLocation?.title || "Gimnasio 653";
  const locationAddress =
    booked?.location_address || defaultLocation?.address || "Córdoba, Argentina";
  const locationNotes = booked?.location_notes ?? defaultLocation?.notes;
  const mapsUrl = booked?.location_maps_url ?? defaultLocation?.google_maps_url;
  const fullLocation = `${locationTitle} - ${locationAddress}`;

  // WhatsApp text to notify Melina about the newly created reservation
  const whatsappNotificationText = booked
    ? `¡Hola Meli! Acabo de reservar un turno en tu web para consultar con vos:

👤 *Paciente:* ${booked.first_name} ${booked.last_name}
🥗 *Servicio:* ${booked.service_name || "Consulta Nutricional"}
📅 *Día:* ${formatDate(booked.date)} (${booked.date})
⏰ *Horario:* ${booked.time} hs
📍 *Lugar:* ${locationTitle} (${locationAddress})
📱 *Teléfono:* ${booked.phone}
✉️ *Email:* ${booked.email}${booked.notes ? `\n📝 *Observaciones:* ${booked.notes}` : ""}

¡Te escribo para avisarte y tenerlo confirmado en tu agenda!`
    : "¡Hola Meli! Acabo de reservar un turno en tu web y te quería avisar para coordinar la consulta.";

  const whatsappUrl = `https://wa.me/5493541639512?text=${encodeURIComponent(
    whatsappNotificationText,
  )}`;

  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-12 text-center sm:px-6 md:py-16">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-soft">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl text-foreground">
          ¡Tu turno fue registrado con éxito!
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-muted-foreground max-w-md">
          Ya reservamos tu lugar en el horario seleccionado. Seguí los siguientes pasos para
          mantenerlo agendado y no olvidarte.
        </p>

        {/* Notificación de envío de correo */}
        <div className="mt-6 w-full rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-left shadow-xs flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Mail className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Te enviamos los detalles a tu correo
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Enviamos un e-mail desde{" "}
              <strong className="font-semibold text-foreground">paginamelinanutricion@gmail.com</strong>{" "}
              a <strong className="font-semibold text-foreground">{booked?.email || "tu correo"}</strong> con el
              comprobante y horario de tu reserva para que lo tengas siempre a mano.
            </p>
            <p className="text-[0.75rem] text-muted-foreground/80 italic">
              * Si no lo ves en tu bandeja de entrada en unos minutos, revisá tu carpeta de spam o correo no deseado.
            </p>
          </div>
        </div>

        {/* Acción prioritaria: Avisarle a Melina por WhatsApp */}
        <div className="mt-4 w-full rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 p-5 text-left shadow-card">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-soft">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="space-y-2 flex-1">
              <div>
                <span className="inline-flex items-center rounded-full bg-emerald-600/20 px-2.5 py-0.5 text-[0.7rem] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                  Paso importante
                </span>
                <h2 className="text-base font-bold text-foreground">
                  Avisale a Meli por WhatsApp de tu reserva
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-0.5">
                  Para que Melina organice su agenda personalizada y esté al tanto de tu consulta,
                  escribile ahora mismo con este botón:
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Avisar a Meli por WhatsApp ahora</span>
              </a>
            </div>
          </div>
        </div>

        {/* Resumen del turno asignado */}
        {booked && (
          <div className="mt-5 w-full rounded-3xl border border-border bg-card p-5 text-left shadow-soft space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Detalle de tu reserva
              </p>
              <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-[0.7rem] font-semibold text-accent-foreground">
                Estado: Registrado
              </span>
            </div>

            <div className="space-y-2 text-sm">
              {booked.service_name && (
                <div>
                  <span className="text-xs text-muted-foreground">Servicio reservado</span>
                  <p className="font-semibold text-foreground text-base">{booked.service_name}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-border/70 bg-surface p-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> Fecha
                  </span>
                  <p className="font-semibold text-foreground text-sm capitalize">
                    {formatDate(booked.date)}
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-surface p-3">
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> Horario
                  </span>
                  <p className="font-semibold text-foreground text-sm">{booked.time} hs</p>
                </div>
              </div>

              <div className="pt-1 text-xs text-muted-foreground">
                <span>Paciente: </span>
                <strong className="text-foreground font-medium">
                  {booked.first_name} {booked.last_name}
                </strong>{" "}
                • <span>Tel: </span>
                <strong className="text-foreground font-medium">{booked.phone}</strong>
              </div>
            </div>

            {/* Añadir a Google Calendar */}
            <div className="pt-2 border-t border-border/60 flex flex-wrap gap-2">
              <a
                href={buildCalendarUrl(booked, fullLocation)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                <CalendarPlus className="h-3.5 w-3.5 text-primary" />
                <span>Guardar en Google Calendar</span>
              </a>
              <Link
                to="/mis-reservas"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors ml-auto"
              >
                <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
                <span>Ver en Mis Reservas</span>
              </Link>
            </div>
          </div>
        )}

        {/* Tarjeta de ubicación asignada */}
        {(locationTitle || locationAddress) && (
          <div className="mt-4 w-full rounded-3xl border border-primary/20 bg-accent/30 p-5 text-left shadow-soft">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Lugar de atención presencial
                </span>
                <p className="font-semibold text-foreground text-base">{locationTitle}</p>
                <p className="text-sm text-foreground/80 font-medium">{locationAddress}</p>
                {locationNotes && (
                  <p className="mt-1 text-xs text-muted-foreground italic">ℹ️ {locationNotes}</p>
                )}
                {(mapsUrl || locationAddress) && (
                  <div className="mt-3">
                    <a
                      href={
                        mapsUrl ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${locationTitle} ${locationAddress}`,
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs hover:bg-accent transition-colors"
                    >
                      <Navigation className="h-3 w-3 text-primary" />
                      <span>Ver cómo llegar en Google Maps</span>
                      <ExternalLink className="h-2.5 w-2.5 text-muted-foreground" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full">
            <Link to="/mis-reservas">
              <BookmarkCheck className="mr-1.5 h-4 w-4" /> Ir a Mis Reservas
            </Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full">
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
