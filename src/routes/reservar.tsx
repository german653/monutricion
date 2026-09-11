import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Loader2,
  MapPin,
  Navigation,
  ExternalLink,
  CheckCircle2,
  MessageCircle,
  CalendarPlus,
  Clock,
  Calendar,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Appointment } from "@/types";
import {
  fetchServices,
  fetchAvailableSlots,
  createAppointment,
  fetchConsultationLocation,
  SlotCollisionError,
  type AvailableSlotInfo,
} from "@/lib/queries";
import { sendBookingConfirmationEmail } from "@/lib/email";

export const Route = createFileRoute("/reservar")({
  head: () => ({
    meta: [
      { title: "Reservar turno — Melina Oviedo Nutrición" },
      {
        name: "description",
        content: "Reservá tu consulta nutricional con Melina Oviedo de forma simple y rápida.",
      },
      { property: "og:url", content: "/reservar" },
    ],
    links: [{ rel: "canonical", href: "/reservar" }],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData({ queryKey: ["services"], queryFn: fetchServices }),
      context.queryClient.ensureQueryData({
        queryKey: ["available-slots"],
        queryFn: fetchAvailableSlots,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["consultation-location"],
        queryFn: fetchConsultationLocation,
      }),
    ]),
  component: BookingPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="p-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
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
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, "");
    const title = encodeURIComponent(
      `Consulta con Melina Oviedo — ${app.service_name || "Nutrición"}`,
    );
    const details = encodeURIComponent(
      `Turno agendado con la Lic. Melina Oviedo.\nServicio: ${app.service_name || "Consulta Nutricional"}\nPaciente: ${app.first_name} ${app.last_name}\nLugar: ${location}\nContacto: +54 9 3541 63-9512`,
    );
    const loc = encodeURIComponent(location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${loc}`;
  } catch {
    return "#";
  }
}

function buildWhatsappUrl(app: Appointment, location: string) {
  const text = `¡Hola Meli! Acabo de reservar un turno en tu web para consultar con vos:

👤 *Paciente:* ${app.first_name} ${app.last_name}
🥗 *Servicio:* ${app.service_name || "Consulta Nutricional"}
📅 *Día:* ${formatDate(app.date)} (${app.date})
⏰ *Horario:* ${app.time} hs
📍 *Lugar:* ${location}
📱 *Teléfono:* ${app.phone}${app.notes ? `\n📝 *Observaciones:* ${app.notes}` : ""}

¡Te escribo para avisarte y tenerlo confirmado en tu agenda!`;

  return `https://wa.me/5493541639512?text=${encodeURIComponent(text)}`;
}

function BookingPage() {
  const { data: services } = useSuspenseQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { data: slots } = useSuspenseQuery({
    queryKey: ["available-slots"],
    queryFn: fetchAvailableSlots,
  });
  const { data: location } = useSuspenseQuery({
    queryKey: ["consultation-location"],
    queryFn: fetchConsultationLocation,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(7);

  // Listen to Firestore changes in real-time so taken slots disappear immediately for all users
  useEffect(() => {
    let unsubSlots: (() => void) | undefined;
    let unsubApps: (() => void) | undefined;

    try {
      unsubSlots = onSnapshot(
        collection(db, "booked_slots"),
        () => {
          queryClient.invalidateQueries({ queryKey: ["available-slots"] });
        },
        () => {
          // gracefully ignore snapshot errors
        },
      );
    } catch {
      // ignore
    }

    try {
      unsubApps = onSnapshot(
        collection(db, "appointments"),
        () => {
          queryClient.invalidateQueries({ queryKey: ["available-slots"] });
        },
        () => {
          // gracefully ignore snapshot errors
        },
      );
    } catch {
      // ignore
    }

    return () => {
      if (unsubSlots) unsubSlots();
      if (unsubApps) unsubApps();
    };
  }, [queryClient]);

  const slotsByDate = useMemo(() => {
    const map = new Map<string, AvailableSlotInfo[]>();
    for (const s of slots) {
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date)!.push(s);
    }
    return map;
  }, [slots]);

  const dates = useMemo(() => Array.from(slotsByDate.keys()).sort(), [slotsByDate]);
  const [selectedDate, setSelectedDate] = useState("");
  const slotsForDate = selectedDate ? (slotsByDate.get(selectedDate) ?? []) : [];
  const times = slotsForDate.map((s) => s.time);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedTime = watch("time");

  const selectedSlot = useMemo(() => {
    if (!selectedDate || !selectedTime) return null;
    return slots.find((s) => s.date === selectedDate && s.time === selectedTime) ?? null;
  }, [slots, selectedDate, selectedTime]);

  // Track submission state with refs to avoid false warnings caused by our own booking
  const isSubmittingBookingRef = useRef(false);
  const bookingSucceededRef = useRef(false);

  // Real-time conflict protection: If another user reserves the currently selected time, warn immediately
  useEffect(() => {
    // If the current user is submitting or has succeeded, ignore the slot removal
    if (isSubmittingBookingRef.current || bookingSucceededRef.current) {
      return;
    }
    if (selectedDate && selectedTime) {
      const availableTimes = (slotsByDate.get(selectedDate) ?? []).map((s) => s.time);
      if (availableTimes.length > 0 && !availableTimes.includes(selectedTime)) {
        setValue("time", "");
        toast.warning(
          `El horario de las ${selectedTime} hs para el día elegido acaba de ser reservado por otra persona. Por favor seleccioná otro horario.`,
          { duration: 7000 },
        );
      }
    }
  }, [slotsByDate, selectedDate, selectedTime, setValue]);

  // Auto-redirect to home page after confirmation modal appears
  useEffect(() => {
    if (!showConfirmationModal) return;

    if (redirectCountdown <= 0) {
      navigate({ to: "/" });
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showConfirmationModal, redirectCountdown, navigate]);

  const onSubmit = async (values: FormValues) => {
    isSubmittingBookingRef.current = true;
    try {
      const service = services.find((s) => s.id === values.service_id);
      const bookedApp = await createAppointment({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        service_id: values.service_id,
        service_name: service?.title ?? null,
        date: values.date,
        time: values.time,
        notes: values.notes ?? null,
        location_title: selectedSlot?.location_title ?? null,
        location_address: selectedSlot?.location_address ?? null,
        location_notes: selectedSlot?.location_notes ?? null,
        location_maps_url: selectedSlot?.location_maps_url ?? null,
      });
      bookingSucceededRef.current = true;
      await queryClient.invalidateQueries({ queryKey: ["available-slots"] });
      setConfirmedAppointment(bookedApp);
      setRedirectCountdown(7);
      setShowConfirmationModal(true);
      toast.success("¡Tu turno fue reservado con éxito!");

      // Enviar correo de confirmación automático mediante EmailJS
      const locationText = `${bookedApp.location_title || location?.title || "Gimnasio 653"} - ${bookedApp.location_address || location?.address || "Córdoba"}`;
      sendBookingConfirmationEmail(bookedApp, locationText).catch((e) => {
        console.warn("Fallo al enviar correo con EmailJS:", e);
      });
    } catch (err: unknown) {
      isSubmittingBookingRef.current = false;
      await queryClient.invalidateQueries({ queryKey: ["available-slots"] });
      const errorObj = err as { name?: string; message?: string } | undefined;
      if (
        err instanceof SlotCollisionError ||
        errorObj?.name === "SlotCollisionError" ||
        errorObj?.message?.includes("reservado")
      ) {
        setValue("time", "");
        toast.error(
          "¡Ese horario acaba de ser reservado por otra persona! Por favor seleccioná otro horario disponible.",
          { duration: 7000 },
        );
      } else {
        toast.error("No pudimos registrar tu turno. Intentá nuevamente.");
      }
    }
  };

  const field = "rounded-xl";
  const selectClass =
    "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm disabled:opacity-50";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mb-10 text-center">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Reservar turno</h1>
          <p className="mt-3 text-muted-foreground">
            Completá el formulario y me pondré en contacto con vos.
          </p>
        </Reveal>

        <Reveal>
          {dates.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
              <p className="text-muted-foreground">
                Por el momento no hay horarios disponibles. Volvé a intentarlo pronto o escribinos
                por WhatsApp.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Nombre</Label>
                  <Input id="first_name" className={field} {...register("first_name")} />
                  {errors.first_name && (
                    <p className="text-sm text-destructive">{errors.first_name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Apellido</Label>
                  <Input id="last_name" className={field} {...register("last_name")} />
                  {errors.last_name && (
                    <p className="text-sm text-destructive">{errors.last_name.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input id="email" type="email" className={field} {...register("email")} />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" className={field} {...register("phone")} />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service_id">Servicio</Label>
                <select
                  id="service_id"
                  className={selectClass}
                  defaultValue=""
                  {...register("service_id")}
                >
                  <option value="" disabled>
                    Elegí un servicio
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                {errors.service_id && (
                  <p className="text-sm text-destructive">{errors.service_id.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3 pt-1 text-xs">
                <span className="text-muted-foreground font-medium">Seleccioná fecha y hora</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  Disponibilidad en vivo
                </span>
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
                    <option value="" disabled>
                      Elegí un día
                    </option>
                    {dates.map((d) => (
                      <option key={d} value={d} className="capitalize">
                        {formatDate(d)}
                      </option>
                    ))}
                  </select>
                  {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horario</Label>
                  <select
                    id="time"
                    className={selectClass}
                    defaultValue=""
                    disabled={!selectedDate || times.length === 0}
                    {...register("time")}
                  >
                    <option value="" disabled>
                      {!selectedDate
                        ? "Elegí un día primero"
                        : times.length === 0
                          ? "Sin horarios disponibles"
                          : "Elegí un horario"}
                    </option>
                    {slotsForDate.map((s) => (
                      <option key={s.time} value={s.time}>
                        {s.time} hs{s.location_title ? ` — 📍 ${s.location_title}` : ""}
                      </option>
                    ))}
                  </select>
                  {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                </div>
              </div>

              {/* Lugar de atención dinámico según el horario seleccionado */}
              {selectedSlot ? (
                <div className="rounded-2xl border border-primary/25 bg-accent/40 p-5 shadow-xs transition-all animate-in fade-in slide-in-from-top-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xs">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                          Lugar de atención para este horario ({selectedSlot.time} hs)
                        </span>
                        <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
                          {selectedSlot.location_title}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-foreground/80">
                          {selectedSlot.location_address}
                        </p>
                        {selectedSlot.location_notes && (
                          <p className="mt-1 text-xs text-muted-foreground italic">
                            ℹ️ {selectedSlot.location_notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {(selectedSlot.location_maps_url || selectedSlot.location_address) && (
                      <a
                        href={
                          selectedSlot.location_maps_url ||
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${selectedSlot.location_title} ${selectedSlot.location_address}`,
                          )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-accent sm:self-center"
                      >
                        <Navigation className="h-3.5 w-3.5 text-primary" />
                        <span>Ver cómo llegar</span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>
              ) : selectedDate && times.length > 0 ? (
                <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-3 text-center text-xs text-muted-foreground">
                  📍 Seleccioná un horario para ver el lugar de atención presencial correspondiente
                  a ese turno.
                </div>
              ) : null}

              {selectedDate && times.length === 0 && (
                <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-700 dark:text-amber-300">
                  Todos los turnos de este día ya han sido reservados. Por favor seleccioná otra
                  fecha disponible en el calendario.
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="notes">Observaciones</Label>
                <Textarea id="notes" className="rounded-xl" rows={3} {...register("notes")} />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirmar turno
              </Button>
            </form>
          )}
        </Reveal>
      </section>

      {/* Pop-up modal de confirmación con redirección al inicio */}
      <Dialog
        open={showConfirmationModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowConfirmationModal(false);
            navigate({ to: "/" });
          }
        }}
      >
        <DialogContent className="max-w-md rounded-3xl p-6 sm:p-7 text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <DialogHeader className="space-y-1.5 text-center sm:text-center">
            <DialogTitle className="font-display text-2xl font-bold text-foreground">
              ¡Turno confirmado con éxito!
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
              {confirmedAppointment?.first_name ? (
                <>
                  ¡Muchas gracias,{" "}
                  <strong className="text-foreground">{confirmedAppointment.first_name}</strong>!
                  Tu consulta quedó registrada en la agenda de Melina.
                </>
              ) : (
                "Tu consulta quedó registrada en la agenda de Melina."
              )}
            </DialogDescription>
          </DialogHeader>

          {confirmedAppointment && (
            <div className="my-2 rounded-2xl border border-border bg-muted/30 p-4 text-left space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                  {confirmedAppointment.service_name || "Consulta Nutricional"}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-700 dark:text-emerald-300">
                  Agendado
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="space-y-0.5">
                  <span className="text-[0.7rem] text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-primary" /> Día
                  </span>
                  <p className="font-semibold text-foreground capitalize">
                    {formatDate(confirmedAppointment.date)}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[0.7rem] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" /> Horario
                  </span>
                  <p className="font-semibold text-foreground">
                    {confirmedAppointment.time} hs
                  </p>
                </div>
              </div>

              <div className="space-y-0.5 pt-1 border-t border-border/50">
                <span className="text-[0.7rem] text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" /> Lugar de atención
                </span>
                <p className="font-semibold text-foreground">
                  {confirmedAppointment.location_title || location?.title || "Gimnasio 653"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {confirmedAppointment.location_address || location?.address || "Córdoba, Argentina"}
                </p>
              </div>
            </div>
          )}

          {/* Acciones directas (WhatsApp y Google Calendar) */}
          {confirmedAppointment && (
            <div className="space-y-2 pt-1">
              <a
                href={buildWhatsappUrl(
                  confirmedAppointment,
                  `${confirmedAppointment.location_title || location?.title || "Gimnasio 653"} - ${confirmedAppointment.location_address || location?.address || "Córdoba"}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Avisarle a Meli por WhatsApp</span>
              </a>

              <a
                href={buildCalendarUrl(
                  confirmedAppointment,
                  `${confirmedAppointment.location_title || location?.title || "Gimnasio 653"} - ${confirmedAppointment.location_address || location?.address || "Córdoba"}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                <CalendarPlus className="h-3.5 w-3.5 text-primary" />
                <span>Guardar en Google Calendar</span>
              </a>
            </div>
          )}

          {/* Redirección automática al inicio */}
          <div className="mt-3 space-y-2 border-t border-border/60 pt-3">
            <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
              <span>Redirigiendo a la página de inicio...</span>
              <span className="inline-flex items-center justify-center h-5.5 px-2 rounded-full bg-primary/10 font-bold text-primary text-[0.75rem]">
                {redirectCountdown}s
              </span>
            </div>

            <Button
              type="button"
              className="w-full rounded-2xl"
              onClick={() => {
                setShowConfirmationModal(false);
                navigate({ to: "/" });
              }}
            >
              Ir a la página de inicio ahora
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}
