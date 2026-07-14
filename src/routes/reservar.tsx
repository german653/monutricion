import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchServices, createAppointment } from "@/lib/queries";

export const Route = createFileRoute("/reservar")({
  head: () => ({
    meta: [
      { title: "Reservar turno — Melina Oviedo Nutrición" },
      { name: "description", content: "Reservá tu consulta nutricional con Melina Oviedo de forma simple y rápida." },
      { property: "og:url", content: "/reservar" },
    ],
    links: [{ rel: "canonical", href: "/reservar" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({ queryKey: ["services"], queryFn: fetchServices }),
  component: BookingPage,
  errorComponent: ({ error }) => <SiteLayout><div className="p-24 text-center" role="alert">{error.message}</div></SiteLayout>,
});

const schema = z.object({
  first_name: z.string().trim().min(1, "Ingresá tu nombre").max(80),
  last_name: z.string().trim().min(1, "Ingresá tu apellido").max(80),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z.string().trim().min(6, "Teléfono inválido").max(30),
  service_id: z.string().min(1, "Elegí un servicio"),
  date: z.string().min(1, "Elegí una fecha"),
  time: z.string().min(1, "Elegí un horario"),
  notes: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

function BookingPage() {
  const { data: services } = useSuspenseQuery({ queryKey: ["services"], queryFn: fetchServices });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const service = services.find((s) => s.id === values.service_id);
      await createAppointment({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        service_id: values.service_id,
        service_name: service?.title ?? null,
        date: values.date,
        time: values.time,
        notes: values.notes ?? null,
      });
      toast.success("¡Tu turno fue reservado con éxito!");
      navigate({ to: "/reservar/confirmacion" });
    } catch {
      toast.error("No pudimos registrar tu turno. Intentá nuevamente.");
    }
  };

  const field = "rounded-xl";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mb-10 text-center">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Reservar turno</h1>
          <p className="mt-3 text-muted-foreground">Completá el formulario y me pondré en contacto con vos.</p>
        </Reveal>
        <Reveal>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre</Label>
                <Input id="first_name" className={field} {...register("first_name")} />
                {errors.first_name && <p className="text-sm text-destructive">{errors.first_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Apellido</Label>
                <Input id="last_name" className={field} {...register("last_name")} />
                {errors.last_name && <p className="text-sm text-destructive">{errors.last_name.message}</p>}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Correo</Label>
                <Input id="email" type="email" className={field} {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" className={field} {...register("phone")} />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service_id">Servicio</Label>
              <select
                id="service_id"
                className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                defaultValue=""
                {...register("service_id")}
              >
                <option value="" disabled>Elegí un servicio</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              {errors.service_id && <p className="text-sm text-destructive">{errors.service_id.message}</p>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha</Label>
                <Input id="date" type="date" className={field} {...register("date")} />
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora</Label>
                <Input id="time" type="time" className={field} {...register("time")} />
                {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea id="notes" className="rounded-xl" rows={3} {...register("notes")} />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar turno
            </Button>
          </form>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
