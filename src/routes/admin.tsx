import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CalendarCheck,
  Package,
  Salad,
  LogOut,
  Loader2,
  Trash2,
  MessageCircle,
  CalendarClock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/Logo";
import { ServiceManager } from "@/components/admin/ServiceManager";
import { ProductManager } from "@/components/admin/ProductManager";
import { AvailabilityManager } from "@/components/admin/AvailabilityManager";
import {
  fetchAppointments,
  fetchAllProducts,
  fetchAllServices,
  updateAppointmentStatus,
  deleteAppointment,
} from "@/lib/queries";
import type { AppointmentStatus } from "@/types";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Panel Admin — Melina Oviedo" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const statusStyles: Record<AppointmentStatus, string> = {
  pendiente: "bg-accent text-accent-foreground",
  confirmado: "bg-success/15 text-success",
  cancelado: "bg-destructive/10 text-destructive",
};

function AdminPage() {
  const { loading, isAdmin } = useAdmin();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !isAdmin) navigate({ to: "/" });
  }, [loading, isAdmin, navigate]);

  const enabled = isAdmin;
  const { data: appointments = [] } = useQuery({ queryKey: ["appointments"], queryFn: fetchAppointments, enabled });
  const { data: products = [] } = useQuery({ queryKey: ["all-products"], queryFn: fetchAllProducts, enabled });
  const { data: services = [] } = useQuery({ queryKey: ["all-services"], queryFn: fetchAllServices, enabled });
  const [busy, setBusy] = useState<string | null>(null);

  if (loading || !isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const changeStatus = async (id: string, status: AppointmentStatus) => {
    setBusy(id);
    try {
      await updateAppointmentStatus(id, status);
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Estado actualizado");
    } catch {
      toast.error("No se pudo actualizar");
    } finally {
      setBusy(null);
    }
  };

  const removeAppointment = async (id: string) => {
    setBusy(id);
    try {
      await deleteAppointment(id);
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Reserva eliminada");
    } catch {
      toast.error("No se pudo eliminar");
    } finally {
      setBusy(null);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const stats = [
    { icon: CalendarCheck, label: "Reservas", value: appointments.length },
    { icon: Package, label: "Productos", value: products.length },
    { icon: Salad, label: "Servicios", value: services.length },
    { icon: CalendarCheck, label: "Pendientes", value: appointments.filter((a) => a.status === "pendiente").length },
  ];

  const nextStatus: Record<AppointmentStatus, AppointmentStatus> = {
    pendiente: "confirmado",
    confirmado: "cancelado",
    cancelado: "pendiente",
  };

  const waLink = (phone: string) => `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

  return (
    <div className="min-h-dvh bg-surface">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Logo />
          <Button variant="secondary" className="rounded-full" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Salir
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-display text-3xl tracking-tight">Panel de administración</h1>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <s.icon className="mb-3 h-6 w-6 text-primary" />
              <p className="font-display text-3xl font-semibold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="reservas" className="w-full">
          <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1 rounded-2xl bg-card p-1">
            <TabsTrigger value="reservas" className="rounded-xl"><CalendarCheck className="mr-1.5 h-4 w-4" /> Reservas</TabsTrigger>
            <TabsTrigger value="horarios" className="rounded-xl"><CalendarClock className="mr-1.5 h-4 w-4" /> Horarios</TabsTrigger>
            <TabsTrigger value="servicios" className="rounded-xl"><Salad className="mr-1.5 h-4 w-4" /> Servicios</TabsTrigger>
            <TabsTrigger value="productos" className="rounded-xl"><Package className="mr-1.5 h-4 w-4" /> Productos</TabsTrigger>
          </TabsList>

          <TabsContent value="reservas">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h2 className="mb-4 font-display text-xl">Reservas</h2>
              {appointments.length === 0 ? (
                <p className="py-10 text-center text-muted-foreground">Todavía no hay reservas.</p>
              ) : (
                <div className="space-y-3">
                  {appointments.map((a) => (
                    <div
                      key={a.id}
                      className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-medium">
                          {a.first_name} {a.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {a.service_name ?? "Servicio"} · {a.date} {a.time}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {a.email} · {a.phone}
                        </p>
                        {a.notes && <p className="mt-1 text-sm italic text-muted-foreground">“{a.notes}”</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={waLink(a.phone)} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-success" aria-label="Contactar por WhatsApp">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </a>
                        <button onClick={() => changeStatus(a.id, nextStatus[a.status])} disabled={busy === a.id}>
                          <Badge className={`cursor-pointer capitalize ${statusStyles[a.status]}`}>{a.status}</Badge>
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-muted-foreground hover:text-destructive"
                          onClick={() => removeAppointment(a.id)}
                          disabled={busy === a.id}
                          aria-label="Eliminar reserva"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="horarios">
            <AvailabilityManager />
          </TabsContent>

          <TabsContent value="servicios">
            <ServiceManager />
          </TabsContent>

          <TabsContent value="productos">
            <ProductManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
