import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { buildWhatsappUrl } from "@/lib/format";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/servicios", label: "Servicios" },
  { to: "/tienda", label: "Tienda" },
  { to: "/reservar", label: "Reservar turno" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Footer() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Acompañamiento nutricional profesional y cercano para transformar tu
            bienestar con hábitos que perduran.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
            Navegación
          </h3>
          <ul className="space-y-2">
            {nav.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
            Seguime
          </h3>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/nutri_melioviedo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={buildWhatsappUrl("¡Hola Melina! Quería hacerte una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="mailto:nutri.melioviedo@gmail.com"
              aria-label="Correo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Melina Oviedo · Nutrición y Salud</p>
          <button
            onClick={() => setLoginOpen(true)}
            className="transition-colors hover:text-foreground"
          >
            Acceso
          </button>
        </div>
      </div>

      <AdminLoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </footer>
  );
}
