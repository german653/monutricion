import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { ShoppingBag, Plus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, fetchCategories } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/features/cart/cart-store";
import type { Product } from "@/types";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda — Melina Oviedo Nutrición" },
      {
        name: "description",
        content: "Suplementos, snacks saludables e infusiones seleccionados por Melina Oviedo.",
      },
      { property: "og:title", content: "Tienda — Melina Oviedo" },
      { property: "og:url", content: "/tienda" },
    ],
    links: [{ rel: "canonical", href: "/tienda" }],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData({ queryKey: ["products"], queryFn: fetchProducts }),
      context.queryClient.ensureQueryData({ queryKey: ["categories"], queryFn: fetchCategories }),
    ]);
  },
  component: ShopPage,
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="p-24 text-center" role="alert">
        {error.message}
      </div>
    </SiteLayout>
  ),
});

function ShopPage() {
  const { data: products } = useSuspenseQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const { data: categories } = useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { add } = useCart();
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active ? products.filter((p) => p.category_id === active) : products),
    [products, active],
  );

  const handleAdd = (p: Product) => {
    add(p);
    toast.success(`${p.name} agregado al carrito`);
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Tienda</h1>
          <p className="mt-3 text-muted-foreground">
            Productos saludables seleccionados con cuidado.
          </p>
        </Reveal>

        {categories.length > 0 && (
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActive(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === null ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
            >
              Todos
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === c.id ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Pronto vas a encontrar productos disponibles aquí.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold">{p.name}</h2>
                      {p.stock <= 0 && <Badge variant="secondary">Sin stock</Badge>}
                    </div>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-display text-xl font-semibold text-primary">
                        {formatPrice(p.price)}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full"
                        disabled={p.stock <= 0}
                        onClick={() => handleAdd(p)}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Agregar
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
