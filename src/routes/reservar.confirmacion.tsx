import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reservar/confirmacion")({
  head: () => ({
    meta: [{ title: "Turno confirmado — Melina Oviedo" }, { name: "robots", content: "noindex" }],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">¡Turno confirmado!</h1>
        <p className="mt-3 text-muted-foreground">
          Recibimos tu solicitud. Melina se pondrá en contacto con vos a la brevedad para confirmar
          los detalles. ¡Gracias por confiar!
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full">
            <Link to="/">Volver al inicio</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full">
            <Link to="/servicios">Ver servicios</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
