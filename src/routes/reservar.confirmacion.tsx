import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, MapPin, Navigation, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { fetchConsultationLocation } from "@/lib/queries";

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

function ConfirmationPage() {
  const { data: location } = useQuery({
    queryKey: ["consultation-location"],
    queryFn: fetchConsultationLocation,
  });

  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">¡Turno confirmado!</h1>
        <p className="mt-3 text-muted-foreground">
          Recibimos tu solicitud. Melina se pondrá en contacto con vos a la brevedad para confirmar
          los detalles. ¡Gracias por confiar!
        </p>

        {location && (location.title || location.address) && (
          <div className="mt-6 w-full rounded-2xl border border-primary/20 bg-accent/30 p-5 text-left shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Lugar de atención
                </span>
                <p className="font-semibold text-foreground">
                  {location.title || "Gimnasio 653"}
                </p>
                <p className="text-sm text-foreground/80 font-medium">
                  {location.address || "Córdoba, Argentina"}
                </p>
                {location.notes && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {location.notes}
                  </p>
                )}
                {(location.google_maps_url || location.address) && (
                  <div className="mt-3">
                    <a
                      href={
                        location.google_maps_url ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.title} ${location.address}`)}`
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

