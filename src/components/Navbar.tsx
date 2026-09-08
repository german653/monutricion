import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/features/cart/cart-store";
import { useAdmin } from "@/hooks/use-admin";
import { CartSheet } from "@/components/CartSheet";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/servicios", label: "Servicios" },
  { to: "/recetas", label: "Recetas" },
  { to: "/tienda", label: "Tienda" },
  { to: "/reservar", label: "Reservar turno" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const { count } = useCart();
  const { isAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
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

        <div className="flex items-center gap-1.5">
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

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>
                  <Logo showText />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent [&.active]:bg-accent [&.active]:text-accent-foreground"
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="mt-1 inline-flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-base font-medium text-secondary-foreground"
                  >
                    <ShieldCheck className="h-4 w-4" /> Panel Admin
                  </Link>
                )}
                <Button asChild className="mt-4 rounded-2xl" onClick={() => setMobileOpen(false)}>
                  <Link to="/reservar">Reservar turno</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}
