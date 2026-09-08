import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import logoFallback from "@/assets/logo-mo.png.asset.json";
import { fetchBranding } from "@/lib/queries";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  const { data: branding } = useQuery({
    queryKey: ["branding"],
    queryFn: fetchBranding,
  });

  const logoSrc = branding?.logo_url || logoFallback.url;
  const brandName = branding?.brand_name || "Melina Oviedo";
  const tagline = branding?.tagline || "Nutrición y Salud";

  return (
    <Link
      to="/"
      className={cn("flex items-center gap-3 group", className)}
      aria-label={`${brandName} — ${tagline}`}
    >
      <img
        src={logoSrc}
        alt={`Logo ${brandName}`}
        width={44}
        height={44}
        className="h-11 w-11 rounded-full object-cover shadow-soft transition-transform duration-200 group-hover:scale-105"
      />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            {brandName}
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
            {tagline}
          </span>
        </span>
      )}
    </Link>
  );
}
