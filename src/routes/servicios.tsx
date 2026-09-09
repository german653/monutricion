import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { fetchServices } from "@/lib/queries";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Melina Oviedo Nutrición" },
      {
        name: "description",
        content:
          "Consultas nutricionales, seguimiento y nutrición deportiva. Elegí tu plan personalizado.",
      },
      { property: "og:title", content: "Servicios — Melina Oviedo" },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({ queryKey: ["services"], queryFn: fetchServices }),
  component: ServicesPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="p-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
});

function ServicesPage() {
  const { data: services } = useSuspenseQuery({ queryKey: ["services"], queryFn: fetchServices });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Servicios</h1>
          <p className="mt-3 text-muted-foreground">
            Acompañamiento personalizado para cada etapa de tu camino.
          </p>
        </Reveal>
        {services.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Próximamente vas a encontrar aquí el detalle de nuestros servicios.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1">
                  {s.image_url && (
                    <img
                      src={s.image_url}
                      alt={s.title}
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="text-xl font-semibold">{s.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
                    {s.duration && (
                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" /> {s.duration}
                      </span>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-2xl font-semibold text-primary">
                        {formatPrice(s.price)}
                      </span>
                      <Button asChild size="sm" className="rounded-full">
                        <Link to="/reservar">Reservar</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
