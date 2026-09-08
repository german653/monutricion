import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, KeyRound } from "lucide-react";

export function AdminLoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "1234") {
      localStorage.setItem("admin_authenticated", "true");
      window.dispatchEvent(new Event("admin-auth-change"));
      toast.success("¡Bienvenida, Melina!");
      onOpenChange(false);
      setPassword("");
      navigate({ to: "/admin" });
      return;
    }

    toast.error("Contraseña incorrecta");
  };

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error || !data.user) {
        toast.error("Credenciales inválidas");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = supabase as unknown as { from: (t: string) => any };
      const { data: role } = await db
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!role) {
        toast.error("No tienes permisos de administrador");
        return;
      }

      localStorage.setItem("admin_authenticated", "true");
      window.dispatchEvent(new Event("admin-auth-change"));
      toast.success("¡Bienvenida, Melina!");
      onOpenChange(false);
      navigate({ to: "/admin" });
    } catch {
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center font-display text-2xl">
            Acceso Administrador
          </DialogTitle>
          <DialogDescription className="text-center">
            Ingresá la contraseña para gestionar el sitio.
          </DialogDescription>
        </DialogHeader>

        {!showEmailLogin ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Contraseña</Label>
              <Input
                id="admin-password"
                type="password"
                autoFocus
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl text-center text-lg tracking-widest"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl">
              Ingresar al Panel
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowEmailLogin(true)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ¿Acceder con email y contraseña de Supabase?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSupabaseLogin} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Correo</Label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-pass">Contraseña</Label>
              <Input
                id="admin-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ingresar
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowEmailLogin(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Volver a acceso con contraseña rápida
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
