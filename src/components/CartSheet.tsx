import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-store";
import { formatPrice, buildWhatsappUrl } from "@/lib/format";

export function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { items, subtotal, count, setQuantity, remove, clear } = useCart();

  const checkout = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => `• ${i.name} x${i.quantity}`).join("\n");
    const message =
      `¡Hola Melina! 👋\n\nQuiero comprar los siguientes productos:\n\n${lines}\n\n` +
      `Total aproximado: ${formatPrice(subtotal)}\n\nMi nombre es: \n\n¡Muchas gracias!`;
    window.open(buildWhatsappUrl(message), "_blank", "noopener");
    toast.success("Abriendo WhatsApp para finalizar tu compra");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5" /> Tu carrito
            {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
              <ShoppingBag className="h-8 w-8 text-accent-foreground" />
            </div>
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
            <Button asChild variant="secondary" className="rounded-full" onClick={() => onOpenChange(false)}>
              <Link to="/tienda">Ver la tienda</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="-mx-6 flex-1 space-y-4 overflow-y-auto px-6 py-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-2xl border border-border p-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">{item.name}</p>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label="Restar"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-accent"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label="Sumar"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="flex-col gap-3 sm:flex-col">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <Button className="w-full rounded-full" size="lg" onClick={checkout}>
                Finalizar compra por WhatsApp
              </Button>
              <button
                onClick={clear}
                className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" /> Vaciar carrito
              </button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
