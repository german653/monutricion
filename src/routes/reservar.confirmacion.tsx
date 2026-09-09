import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, MapPin, Navigation, ExternalLink, Calendar, Clock } from "lucide-react";
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

  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:px-6 md:py-20">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">¡Turno confirmado!</h1>
        <p className="mt-3 text-muted-foreground">
          Recibimos tu solicitud. Melina se pondrá en contacto con vos a la brevedad para confirmar
          los detalles. ¡Gracias por confiar!
        </p>

        {/* Resumen del turno asignado */}
        {booked && (
          <div className="mt-6 w-full rounded-2xl border border-border bg-card p-4 text-left shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Resumen de tu turno
            </p>
            <div className="space-y-1.5 text-sm">
              {booked.service_name && (
                <p className="font-medium text-foreground">
                  <span className="text-muted-foreground">Servicio:</span> {booked.service_name}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className="inline-flex items-center gap-1.5 text-foreground capitalize">
                  <Calendar className="h-4 w-4 text-primary" /> {formatDate(booked.date)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-foreground">
                  <Clock className="h-4 w-4 text-primary" /> {booked.time} hs
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tarjeta de ubicación asignada */}
        {(locationTitle || locationAddress) && (
          <div className="mt-4 w-full rounded-2xl border border-primary/20 bg-accent/30 p-5 text-left shadow-soft">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Lugar de atención
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
                      <span>Cómo llegar con Google Maps</span>
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
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full">
            <Link to="/servicios">Ver servicios</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
