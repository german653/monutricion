import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Award, Heart, Leaf, Target } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { fetchAbout, fetchFaq } from "@/lib/queries";
import aboutImg from "@/assets/about-melina.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/sobre-mi")({
  head: () => ({
    meta: [
      { title: "Sobre mí — Melina Oviedo Nutrición" },
      {
        name: "description",
        content: "Conocé la historia, experiencia y valores de la nutricionista Melina Oviedo.",
      },
      { property: "og:title", content: "Sobre mí — Melina Oviedo" },
      { property: "og:url", content: "/sobre-mi" },
    ],
    links: [{ rel: "canonical", href: "/sobre-mi" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({ queryKey: ["about"], queryFn: fetchAbout }),
      context.queryClient.ensureQueryData({ queryKey: ["faq"], queryFn: fetchFaq }),
    ]);
  },
  component: AboutPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="p-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
});

const highlights = [
  { icon: Award, title: "Experiencia", key: "experience" as const },
  { icon: Target, title: "Especialidades", key: "specialties" as const },
];

function AboutPage() {
  const { data: about } = useSuspenseQuery({ queryKey: ["about"], queryFn: fetchAbout });
  const { data: faq } = useSuspenseQuery({ queryKey: ["faq"], queryFn: fetchFaq });

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-[2.5rem] shadow-card">
            <img
              src={about?.image_url || aboutImg}
              alt="Melina Oviedo"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Leaf className="h-4 w-4" /> Sobre mí
          </span>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
            {about?.title ?? "Hola, soy Meli Oviedo"}
          </h1>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {about?.body}
          </div>
          <div className="grid gap-4 pt-2 sm:grid-cols-2">
            {highlights.map((h) => (
              <div key={h.key} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <h.icon className="mb-2 h-6 w-6 text-primary" />
                <h3 className="font-semibold">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{about?.[h.key] ?? "—"}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Reveal className="mb-8 text-center">
            <Heart className="mx-auto mb-3 h-8 w-8 text-primary" />
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border-border">
                  <AccordionTrigger className="text-left text-base">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
