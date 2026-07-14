import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-mo.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)} aria-label="MO Nutrición y Salud — Inicio">
      <img
        src={logo.url}
        alt="Logo MO Nutrición y Salud"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover shadow-soft"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Melina Oviedo
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
            Nutrición y Salud
          </span>
        </span>
      )}
    </Link>
  );
}
