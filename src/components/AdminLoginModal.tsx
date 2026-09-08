import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
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
import { KeyRound } from "lucide-react";

export function AdminLoginModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "meli42981809";
    if (password.trim() === adminPass) {
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
