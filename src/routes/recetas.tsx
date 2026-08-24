import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Clock, Users } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchRecipes } from "@/lib/queries";

export const Route = createFileRoute("/recetas")({
  head: () => ({
    meta: [
      { title: "Recetas saludables — Melina Oviedo Nutrición" },
      {
        name: "description",
        content:
          "Recetas ricas, simples y equilibradas seleccionadas por la Lic. Melina Oviedo, con ingredientes y paso a paso.",
      },
      { property: "og:title", content: "Recetas saludables — Melina Oviedo" },
      {
        property: "og:description",
        content: "Ideas de comidas y colaciones nutritivas para tu día a día.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/recetas" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({ queryKey: ["recipes"], queryFn: fetchRecipes }),
  component: RecipesPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="p-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="p-24 text-center">No encontramos esta página.</div>
    </SiteLayout>
  ),
});

function lines(value: string) {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function RecipesPage() {
  const { data: recipes } = useSuspenseQuery({ queryKey: ["recipes"], queryFn: fetchRecipes });

  return (
    <SiteLayout>
      <section className="bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Recetas y material</h1>
            <p className="mt-3 text-muted-foreground">
              Ideas simples, ricas y equilibradas para comer mejor todos los días.
            </p>
          </Reveal>

          {recipes.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">
              Muy pronto vas a encontrar acá recetas y material descargable.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r, i) => (
                <Reveal key={r.id} delay={i * 0.06}>
                  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                    {r.image_url && (
                      <img
                        src={r.image_url}
                        alt={r.title}
                        loading="lazy"
                        className="h-52 w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {r.category && (
                        <span className="mb-2 self-start rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                          {r.category}
                        </span>
                      )}
                      <h2 className="font-display text-xl">{r.title}</h2>
                      {r.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {r.prep_time && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {r.prep_time}
                          </span>
                        )}
                        {r.servings && (
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" /> {r.servings}
                          </span>
                        )}
                      </div>

                      {(r.ingredients || r.steps) && (
                        <Accordion type="single" collapsible className="mt-4">
                          {r.ingredients && (
                            <AccordionItem value="ing">
                              <AccordionTrigger className="text-sm">Ingredientes</AccordionTrigger>
                              <AccordionContent>
                                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                  {lines(r.ingredients).map((l, idx) => (
                                    <li key={idx}>{l}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                          {r.steps && (
                            <AccordionItem value="steps">
                              <AccordionTrigger className="text-sm">Preparación</AccordionTrigger>
                              <AccordionContent>
                                <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                                  {lines(r.steps).map((l, idx) => (
                                    <li key={idx}>{l}</li>
                                  ))}
                                </ol>
                              </AccordionContent>
                            </AccordionItem>
                          )}
                        </Accordion>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
