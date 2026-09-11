import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  ShoppingBag,
  ShieldCheck,
  Home,
  User,
  Salad,
  UtensilsCrossed,
  Calendar,
  CalendarCheck,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/features/cart/cart-store";
import { useAdmin } from "@/hooks/use-admin";
import { CartSheet } from "@/components/CartSheet";

const links = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/sobre-mi", label: "Sobre mí", icon: User },
  { to: "/servicios", label: "Servicios", icon: Salad },
  { to: "/recetas", label: "Recetas", icon: UtensilsCrossed },
  { to: "/tienda", label: "Tienda", icon: ShoppingBag },
  { to: "/reservar", label: "Reservar turno", icon: Calendar },
  { to: "/mis-reservas", label: "Mis Reservas", icon: CalendarCheck },
  { to: "/contacto", label: "Contacto", icon: MessageCircle },
] as const;

export function Navbar() {
  const { count } = useCart();
  const { isAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                <ShieldCheck className="h-4 w-4" /> Panel Admin
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              aria-label="Abrir carrito"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>

            <Button asChild className="hidden rounded-full md:inline-flex">
              <Link to="/reservar">Reservar turno</Link>
            </Button>

            {/* Botón de Menú Móvil Altamente Visible para el encabezado */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  id="header-mobile-menu-btn"
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary shadow-xs transition-all hover:bg-primary/20 active:scale-95 lg:hidden"
                  aria-label="Abrir menú de navegación"
                >
                  <Menu className="h-4 w-4 stroke-[2.5]" />
                  <span className="tracking-wider">MENÚ</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto px-5 py-6">
                <SheetHeader className="text-left pb-3 border-b border-border/60">
                  <SheetTitle>
                    <Logo showText />
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">
                    Elegí la sección a la que querés acceder:
                  </p>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-1">
                  {links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent [&.active]:bg-primary/15 [&.active]:text-primary"
                      activeOptions={{ exact: l.to === "/" }}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/70 text-muted-foreground group-[.active]:bg-primary group-[.active]:text-primary-foreground transition-colors">
                          <l.icon className="h-4 w-4" />
                        </span>
                        <span>{l.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                    </Link>
                  ))}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="mt-1 flex items-center gap-3 rounded-2xl bg-secondary px-3.5 py-2.5 text-sm font-semibold text-secondary-foreground"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary-foreground/10">
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                      <span>Panel Administrador</span>
                    </Link>
                  )}

                  <div className="mt-4 pt-3 border-t border-border/60">
                    <Button asChild className="w-full rounded-2xl py-5 font-semibold text-sm shadow-xs" onClick={() => setMobileOpen(false)}>
                      <Link to="/reservar">
                        <Calendar className="mr-2 h-4 w-4" /> Reservar turno ahora
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      </header>

      {/* Barra de acceso rápido fija en la parte inferior para celulares */}
      <nav
        aria-label="Navegación rápida móvil"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-xl px-2 py-1.5 pb-[max(0.4rem,env(safe-area-inset-bottom))] shadow-lg lg:hidden"
      >
        <div className="mx-auto flex max-w-md items-center justify-around">
          <Link
            to="/"
            className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[0.65rem] font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-bold"
            activeOptions={{ exact: true }}
          >
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </Link>

          <Link
            to="/servicios"
            className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[0.65rem] font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-bold"
          >
            <Sparkles className="h-4 w-4" />
            <span>Servicios</span>
          </Link>

          {/* Botón central destacado para Reservar Turno */}
          <Link
            to="/reservar"
            className="relative -top-2 flex flex-col items-center gap-0.5 rounded-full bg-primary px-3.5 py-1.5 text-[0.68rem] font-bold text-primary-foreground shadow-md transition-transform active:scale-95"
          >
            <Calendar className="h-4 w-4" />
            <span>Reservar</span>
          </Link>

          <Link
            to="/mis-reservas"
            className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[0.65rem] font-medium text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary [&.active]:font-bold"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Mis Turnos</span>
          </Link>

          {/* Botón táctil para desplegar el Menú completo */}
          <button
            type="button"
            id="bottom-bar-menu-trigger"
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[0.65rem] font-bold text-primary transition-colors hover:text-primary/80 active:scale-95"
            aria-label="Abrir menú completo"
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <Menu className="h-4 w-4 stroke-[2.5]" />
            </div>
            <span>Menú</span>
          </button>
        </div>
      </nav>
    </>
  );
}
