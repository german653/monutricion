import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchContact } from "@/lib/queries";
import { buildWhatsappUrl } from "@/lib/format";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Melina Oviedo Nutrición" },
      {
        name: "description",
        content: "Contactá a Melina Oviedo por WhatsApp, correo o Instagram.",
      },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({ queryKey: ["contact"], queryFn: fetchContact }),
  component: ContactPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="p-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
});

const schema = z.object({
  name: z.string().trim().min(1, "Ingresá tu nombre").max(80),
  email: z.string().trim().email("Correo inválido").max(255),
  message: z.string().trim().min(1, "Escribí tu mensaje").max(1000),
});
type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const { data: contact } = useSuspenseQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    const message = `¡Hola Melina! Soy ${values.name} (${values.email}).\n\n${values.message}`;
    window.open(buildWhatsappUrl(message, contact?.whatsapp), "_blank", "noopener");
    toast.success("Abriendo WhatsApp con tu mensaje");
    reset();
  };

  const items = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact?.phone ?? "",
      href: buildWhatsappUrl("¡Hola Melina!", contact?.whatsapp),
    },
    { icon: Mail, label: "Correo", value: contact?.email ?? "", href: `mailto:${contact?.email}` },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@nutri_melioviedo",
      href: contact?.instagram ?? "#",
    },
    { icon: MapPin, label: "Ubicación", value: contact?.address ?? "", href: undefined },
  ];

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Contacto</h1>
          <p className="mt-3 text-muted-foreground">Escribime y coordinemos tu próximo paso.</p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal className="space-y-4">
            {items.map((it) => {
              const content = (
                <div className="flex items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{it.label}</p>
                    <p className="text-sm text-muted-foreground">{it.value}</p>
                  </div>
                </div>
              );
              return it.href ? (
                <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={it.label}>{content}</div>
              );
            })}
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" className="rounded-xl" {...register("name")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" className="rounded-xl" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" rows={5} className="rounded-xl" {...register("message")} />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full">
                <Phone className="mr-2 h-4 w-4" /> Enviar por WhatsApp
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
