import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import { fetchServices, fetchAvailableSlots, createAppointment } from "@/lib/queries";

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
    Promise.all([
      context.queryClient.ensureQueryData({ queryKey: ["services"], queryFn: fetchServices }),
      context.queryClient.ensureQueryData({ queryKey: ["available-slots"], queryFn: fetchAvailableSlots }),
    ]),
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

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
}

function BookingPage() {
  const { data: services } = useSuspenseQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: slots } = useSuspenseQuery({ queryKey: ["available-slots"], queryFn: fetchAvailableSlots });
  const navigate = useNavigate();

  const slotsByDate = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const s of slots) {
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date)!.push(s.time);
    }
    return map;
  }, [slots]);

  const dates = useMemo(() => Array.from(slotsByDate.keys()).sort(), [slotsByDate]);
  const [selectedDate, setSelectedDate] = useState("");
  const times = selectedDate ? slotsByDate.get(selectedDate) ?? [] : [];

  const {
    register,
    handleSubmit,
    setValue,
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
  const selectClass = "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm disabled:opacity-50";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mb-10 text-center">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Reservar turno</h1>
          <p className="mt-3 text-muted-foreground">Completá el formulario y me pondré en contacto con vos.</p>
        </Reveal>
        <Reveal>
          {dates.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
              <p className="text-muted-foreground">
                Por el momento no hay horarios disponibles. Volvé a intentarlo pronto o escribinos por WhatsApp.
              </p>
            </div>
          ) : (
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
                <select id="service_id" className={selectClass} defaultValue="" {...register("service_id")}>
                  <option value="" disabled>Elegí un servicio</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                {errors.service_id && <p className="text-sm text-destructive">{errors.service_id.message}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Día disponible</Label>
                  <select
                    id="date"
                    className={selectClass}
                    defaultValue=""
                    {...register("date", {
                      onChange: (e) => {
                        setSelectedDate(e.target.value);
                        setValue("time", "");
                      },
                    })}
                  >
                    <option value="" disabled>Elegí un día</option>
                    {dates.map((d) => (
                      <option key={d} value={d} className="capitalize">{formatDate(d)}</option>
                    ))}
                  </select>
                  {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horario</Label>
                  <select id="time" className={selectClass} defaultValue="" disabled={!selectedDate} {...register("time")}>
                    <option value="" disabled>{selectedDate ? "Elegí un horario" : "Elegí un día primero"}</option>
                    {times.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
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
          )}
        </Reveal>
      </section>
    </SiteLayout>
  );
}
