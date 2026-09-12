import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Instagram, MessageCircle, Lock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { buildWhatsappUrl } from "@/lib/format";
import { fetchContact, DEFAULT_FOOTER_WHATSAPP_MESSAGE } from "@/lib/queries";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/servicios", label: "Servicios" },
  { to: "/recetas", label: "Recetas" },
  { to: "/tienda", label: "Tienda" },
  { to: "/reservar", label: "Reservar turno" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Footer() {
  const [loginOpen, setLoginOpen] = useState(false);
  const { data: contact } = useQuery({
    queryKey: ["contact"],
    queryFn: fetchContact,
  });

  const footerWhatsappMessage =
    contact?.footer_whatsapp_message?.trim() || DEFAULT_FOOTER_WHATSAPP_MESSAGE;
  const whatsappNumber = contact?.whatsapp?.trim() || "5493541639512";
  const instagramUrl =
    contact?.instagram?.trim() || "https://www.instagram.com/nutri_melioviedo/?hl=es-la";

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Acompañamiento nutricional profesional y cercano para transformar tu bienestar con
            hábitos que perduran.
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
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Melina Oviedo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={buildWhatsappUrl(footerWhatsappMessage, whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Melina Oviedo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 pt-6 pb-28 sm:py-6 sm:flex-row sm:px-6 lg:px-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Melina Oviedo · Nutrición y Salud</p>
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground active:scale-95 touch-manipulation"
            aria-label="Acceso al panel profesional"
          >
            <Lock className="h-3 w-3 opacity-60" />
            <span>Acceso profesional</span>
          </button>
        </div>
      </div>

      <AdminLoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </footer>
  );
}
