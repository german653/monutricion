import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, HeartPulse, Leaf, Salad, Sparkles, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { fetchServices, fetchHero, fetchAbout } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import heroImg from "@/assets/hero-melina.jpg";
import aboutImg from "@/assets/about-melina.jpg";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({ queryKey: ["services"], queryFn: fetchServices }),
      context.queryClient.ensureQueryData({ queryKey: ["hero"], queryFn: fetchHero }),
      context.queryClient.ensureQueryData({ queryKey: ["about"], queryFn: fetchAbout }),
    ]);
  },
  component: Index,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-lg px-6 py-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
});

const values = [
  {
    icon: HeartPulse,
    title: "Salud real",
    text: "Hábitos sostenibles que cuidan tu bienestar a largo plazo.",
  },
  {
    icon: Leaf,
    title: "Cercanía",
    text: "Un acompañamiento humano, sin dietas imposibles ni culpa.",
  },
  {
    icon: Salad,
    title: "Personalizado",
    text: "Planes a medida según tus gustos, tu ritmo y tus objetivos.",
  },
  {
    icon: Sparkles,
    title: "Evidencia",
    text: "Nutrición basada en ciencia, adaptada a la vida real.",
  },
];

function Index() {
  const { data: services } = useSuspenseQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: hero } = useSuspenseQuery({ queryKey: ["hero"], queryFn: fetchHero });
  const { data: about } = useSuspenseQuery({ queryKey: ["about"], queryFn: fetchAbout });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/60 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Leaf className="h-4 w-4" /> Nutrición &amp; Salud
            </span>
            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {hero?.title ?? "Nutrición que transforma tu bienestar"}
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              {hero?.subtitle ??
                "Acompañamiento profesional y cercano para que alcances tus objetivos con hábitos que perduran."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/reservar">
                  Reservar turno <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/servicios">Ver servicios</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2.5rem] shadow-glow">
              <img
                src={hero?.image_url || heroImg}
                alt="Melina Oviedo, nutricionista"
                width={1408}
                height={1600}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Un enfoque cercano y profesional
          </h2>
          <p className="mt-3 text-muted-foreground">
            Todo lo que necesitás para mejorar tu relación con la comida.
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-transform hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] shadow-card">
              <img
                src={about?.image_url || aboutImg}
                alt="Melina Oviedo - Nutrición"
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              {about?.title ?? "Hola, soy Meli Oviedo"}
            </h2>
            <p className="text-muted-foreground line-clamp-4 whitespace-pre-line">{about?.body}</p>
            <Button asChild variant="secondary" className="rounded-full">
              <Link to="/sobre-mi">Conocer mi historia</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Servicios</h2>
          <p className="mt-3 text-muted-foreground">
            Elegí el acompañamiento que mejor se adapta a vos.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
                  {s.duration && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {s.duration}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold text-primary">
                    {formatPrice(s.price)}
                  </span>
                  <Button asChild size="sm" className="rounded-full">
                    <Link to="/reservar">Reservar</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="gradient-brand overflow-hidden rounded-[2.5rem] px-8 py-14 text-center shadow-glow">
            <h2 className="font-display text-3xl text-primary-foreground sm:text-4xl">
              Empecemos tu cambio hoy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
              Reservá tu primera consulta y comencemos a construir hábitos saludables juntas.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-6 rounded-full">
              <Link to="/reservar">Reservar turno</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
