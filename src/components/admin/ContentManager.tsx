import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  fetchHero,
  fetchAbout,
  fetchBranding,
  fetchContact,
  saveContent,
  DEFAULT_FOOTER_WHATSAPP_MESSAGE,
} from "@/lib/queries";
import { buildWhatsappUrl } from "@/lib/format";
import type { HeroContent, AboutContent, BrandingContent, ContactContent } from "@/types";
import logoFallback from "@/assets/logo-mo.png.asset.json";

const DEFAULT_ABOUT_BODY = `Soy Licenciada en Nutrición, egresada de la Facultad de Nutrición de la Universidad Nacional de Córdoba, matrícula profesional 5433.

Me apasiona acompañar a las personas en el camino hacia su mejor versión, ayudándolas a alcanzar sus objetivos, construir hábitos saludables y, sobre todo, a confiar en que pueden lograr mucho más de lo que imaginan.

Creo que la nutrición es una herramienta fundamental para cuidar nuestra salud, sentirnos mejor y potenciar nuestro bienestar en todos los aspectos de nuestra vida.

Trabajo con diferentes patologías y objetivos nutricionales, y tengo una especial pasión por la nutrición deportiva. Además, soy runner y cuento con certificación ISAK nivel I y II, porque considero que conocer y entender nuestro cuerpo es parte fundamental del proceso.

Quiero acompañarte desde un lugar de educación, motivación y empatía, brindándote herramientas para que puedas aprender a alimentarte, disfrutar del proceso y alcanzar tus objetivos de una manera sostenible.

Porque no se trata de buscar la perfección, sino de aprender, avanzar y crecer en el camino. 

¿Empezamos juntos?`;

export function ContentManager() {
  const queryClient = useQueryClient();

  const { data: brandingData, isLoading: loadingBranding } = useQuery({
    queryKey: ["branding"],
    queryFn: fetchBranding,
  });
  const { data: heroData, isLoading: loadingHero } = useQuery({
    queryKey: ["hero"],
    queryFn: fetchHero,
  });
  const { data: aboutData, isLoading: loadingAbout } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });
  const { data: contactData, isLoading: loadingContact } = useQuery({
    queryKey: ["contact"],
    queryFn: fetchContact,
  });

  const [brandingDraft, setBrandingDraft] = useState<BrandingContent>({
    logo_url: "",
    favicon_url: "",
    brand_name: "Melina Oviedo",
    tagline: "Nutrición y Salud",
  });

  const [heroDraft, setHeroDraft] = useState<HeroContent>({
    title: "",
    subtitle: "",
    image_url: "",
  });

  const [aboutDraft, setAboutDraft] = useState<AboutContent>({
    title: "Hola, soy Meli Oviedo",
    body: DEFAULT_ABOUT_BODY,
    experience: "Lic. en Nutrición (UNC) • M.P. 5433",
    specialties: "Nutrición deportiva • ISAK I y II • Hábitos sostenibles",
    image_url: "",
  });

  const [contactDraft, setContactDraft] = useState<ContactContent>({
    email: "nutricion.melinaoviedo@gmail.com",
    phone: "+54 9 3541 63-9512",
    whatsapp: "5493541639512",
    instagram: "https://www.instagram.com/nutri_melioviedo/?hl=es-la",
    address: "Córdoba, Argentina (Presencial & Online)",
    footer_whatsapp_message: DEFAULT_FOOTER_WHATSAPP_MESSAGE,
  });

  const [savingBranding, setSavingBranding] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingContact, setSavingContact] = useState(false);

  useEffect(() => {
    if (brandingData) {
      setBrandingDraft({
        logo_url: brandingData.logo_url ?? "",
        favicon_url: brandingData.favicon_url ?? "",
        brand_name: brandingData.brand_name ?? "Melina Oviedo",
        tagline: brandingData.tagline ?? "Nutrición y Salud",
      });
    }
  }, [brandingData]);

  useEffect(() => {
    if (heroData) {
      setHeroDraft({
        title: heroData.title ?? "",
        subtitle: heroData.subtitle ?? "",
        image_url: heroData.image_url ?? "",
      });
    }
  }, [heroData]);

  useEffect(() => {
    if (aboutData) {
      setAboutDraft({
        title: aboutData.title ?? "Hola, soy Meli Oviedo",
        body: aboutData.body ?? DEFAULT_ABOUT_BODY,
        experience: aboutData.experience ?? "Lic. en Nutrición (UNC) • M.P. 5433",
        specialties:
          aboutData.specialties ?? "Nutrición deportiva • ISAK I y II • Hábitos sostenibles",
        image_url: aboutData.image_url ?? "",
      });
    }
  }, [aboutData]);

  useEffect(() => {
    if (contactData) {
      setContactDraft({
        email: contactData.email ?? "nutricion.melinaoviedo@gmail.com",
        phone: contactData.phone ?? "+54 9 3541 63-9512",
        whatsapp: contactData.whatsapp ?? "5493541639512",
        instagram: contactData.instagram ?? "https://www.instagram.com/nutri_melioviedo/?hl=es-la",
        address: contactData.address ?? "Córdoba, Argentina (Presencial & Online)",
        footer_whatsapp_message:
          contactData.footer_whatsapp_message ?? DEFAULT_FOOTER_WHATSAPP_MESSAGE,
      });
    }
  }, [contactData]);

  const saveBranding = async () => {
    setSavingBranding(true);
    try {
      await saveContent("branding", brandingDraft);
      await queryClient.invalidateQueries({ queryKey: ["branding"] });
      toast.success("Logo e identidad de la web actualizados");
    } catch {
      toast.error("No se pudo guardar la identidad de marca");
    } finally {
      setSavingBranding(false);
    }
  };

  const saveHero = async () => {
    setSavingHero(true);
    try {
      await saveContent("hero", heroDraft);
      await queryClient.invalidateQueries({ queryKey: ["hero"] });
      toast.success("Contenido del Inicio actualizado");
    } catch {
      toast.error("No se pudo guardar el inicio");
    } finally {
      setSavingHero(false);
    }
  };

  const saveAbout = async () => {
    setSavingAbout(true);
    try {
      await saveContent("about", aboutDraft);
      await queryClient.invalidateQueries({ queryKey: ["about"] });
      toast.success("Contenido de Sobre Mí actualizado");
    } catch {
      toast.error("No se pudo guardar Sobre Mí");
    } finally {
      setSavingAbout(false);
    }
  };

  const saveFooterWhatsapp = async () => {
    setSavingContact(true);
    try {
      await saveContent("contact", contactDraft);
      await queryClient.invalidateQueries({ queryKey: ["contact"] });
      toast.success("Mensaje de WhatsApp del footer actualizado");
    } catch {
      toast.error("No se pudo guardar el mensaje de WhatsApp");
    } finally {
      setSavingContact(false);
    }
  };

  if (loadingBranding || loadingHero || loadingAbout || loadingContact) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const currentPreviewLogo = brandingDraft.logo_url || logoFallback.url;

  return (
    <div className="space-y-6">
      {/* Branding & Logo Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <h2 className="font-display text-xl font-semibold">Identidad y Logo de la Web</h2>
            <p className="text-sm text-muted-foreground">
              Subí el logo oficial de la web que se mostrará en la barra de navegación y pie de
              página.
            </p>
          </div>
          <Button className="rounded-full" onClick={saveBranding} disabled={savingBranding}>
            {savingBranding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar Logo e
            Identidad
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          <div className="lg:col-span-1">
            <ImageUpload
              value={brandingDraft.logo_url}
              onChange={(url) => setBrandingDraft({ ...brandingDraft, logo_url: url || "" })}
              folder="branding"
              label="Archivo del Logo (PNG, JPG, SVG o WebP)"
            />
          </div>

          <div className="space-y-4 lg:col-span-1">
            <div className="space-y-2">
              <Label>Nombre de la marca</Label>
              <Input
                value={brandingDraft.brand_name ?? ""}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, brand_name: e.target.value })}
                placeholder="Melina Oviedo"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo o lema</Label>
              <Input
                value={brandingDraft.tagline ?? ""}
                onChange={(e) => setBrandingDraft({ ...brandingDraft, tagline: e.target.value })}
                placeholder="Nutrición y Salud"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4 space-y-3 lg:col-span-1">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Vista previa en tiempo real
            </Label>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/70 shadow-xs">
              <img
                src={currentPreviewLogo}
                alt="Vista previa del logo"
                className="h-12 w-12 rounded-full object-cover shadow-soft"
              />
              <div className="flex flex-col">
                <span className="font-display text-base font-semibold leading-tight">
                  {brandingDraft.brand_name || "Melina Oviedo"}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {brandingDraft.tagline || "Nutrición y Salud"}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Este logo se refleja automáticamente en la cabecera (Navbar), el menú móvil y el pie
              de página.
            </p>
          </div>
        </div>

        {/* Favicon / Icono de la Pestaña */}
        <div className="border-t border-border/60 pt-5 mt-4">
          <div className="mb-4">
            <h3 className="font-display text-base font-semibold">
              Favicon (Icono de la pestaña del navegador)
            </h3>
            <p className="text-sm text-muted-foreground">
              Personalizá el icono miniatura que verán tus pacientes y visitantes en la pestaña de
              su navegador o marcadores.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
            <div className="lg:col-span-1">
              <ImageUpload
                value={brandingDraft.favicon_url ?? ""}
                onChange={(url) => setBrandingDraft({ ...brandingDraft, favicon_url: url || "" })}
                folder="branding"
                label="Archivo del Favicon (PNG, SVG, ICO o JPG)"
              />
            </div>

            <div className="rounded-2xl border border-border bg-surface p-4 space-y-3 lg:col-span-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Simulación de la pestaña en el navegador
              </Label>
              <div className="rounded-xl border border-border/80 bg-muted/40 p-3">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-background border border-border shadow-xs max-w-sm">
                  <img
                    src={brandingDraft.favicon_url || "/favicon.svg"}
                    alt="Favicon preview"
                    className="h-4 w-4 rounded-sm object-contain"
                  />
                  <span className="text-xs font-medium truncate text-foreground">
                    {brandingDraft.brand_name || "Melina Oviedo"} —{" "}
                    {brandingDraft.tagline || "Nutrición y Salud"}
                  </span>
                  <span className="text-muted-foreground text-xs ml-auto">✕</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Si no subís uno personalizado, la web utiliza automáticamente el icono botánico
                verde oliva oficial de MO Nutrición.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp del Pie de Página (Footer) */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">Mensaje de WhatsApp del Footer</h2>
              <p className="text-sm text-muted-foreground">
                Configurá el texto predeterminado que se enviará al pulsar el botón de WhatsApp
                ubicado únicamente en el pie de página.
              </p>
            </div>
          </div>
          <Button
            className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={saveFooterWhatsapp}
            disabled={savingContact}
          >
            {savingContact && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar Mensaje del
            Footer
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="footer-wa-msg" className="font-medium">
                  Mensaje predeterminado de WhatsApp
                </Label>
                <button
                  type="button"
                  onClick={() =>
                    setContactDraft((prev) => ({
                      ...prev,
                      footer_whatsapp_message: DEFAULT_FOOTER_WHATSAPP_MESSAGE,
                    }))
                  }
                  className="text-xs text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  <Sparkles className="h-3 w-3" /> Restaurar original
                </button>
              </div>
              <Textarea
                id="footer-wa-msg"
                rows={4}
                value={contactDraft.footer_whatsapp_message ?? ""}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    footer_whatsapp_message: e.target.value,
                  }))
                }
                placeholder="¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje"
                className="text-sm leading-relaxed"
              />
              <p className="text-xs text-muted-foreground">
                Tu cliente verá este texto ya escrito al presionar el botón de WhatsApp del footer.
                Podés usar emojis y saltos de línea.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wa-phone">Número de WhatsApp (con código de país sin +)</Label>
              <Input
                id="wa-phone"
                value={contactDraft.whatsapp ?? ""}
                onChange={(e) =>
                  setContactDraft((prev) => ({
                    ...prev,
                    whatsapp: e.target.value,
                  }))
                }
                placeholder="5493541639512"
              />
              <p className="text-xs text-muted-foreground">
                Ejemplo: 5493541639512 (54 = Argentina, 9 = Móvil, 3541... = Número).
              </p>
            </div>
          </div>

          {/* Vista previa en vivo */}
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Vista previa del mensaje
              </Label>
              <span className="text-[0.7rem] rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                Botón del Footer
              </span>
            </div>

            <div className="rounded-2xl bg-emerald-500/5 p-4 border border-emerald-500/20 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      Mensaje recibido en tu WhatsApp
                    </span>
                    <span className="text-[0.65rem] text-muted-foreground">Ahora</span>
                  </div>
                  <div className="rounded-xl rounded-tl-none bg-background p-3 text-sm text-foreground shadow-xs border border-border/60 whitespace-pre-wrap break-words">
                    {contactDraft.footer_whatsapp_message?.trim() || (
                      <span className="italic text-muted-foreground">
                        (Sin texto predeterminado)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="text-xs text-muted-foreground">
                Aplica únicamente al botón de WhatsApp del pie de página.
              </p>
              <a
                href={buildWhatsappUrl(
                  contactDraft.footer_whatsapp_message?.trim() || DEFAULT_FOOTER_WHATSAPP_MESSAGE,
                  contactDraft.whatsapp?.trim() || "5493541639512",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
              >
                Probar enlace en WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hero Content */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Página de Inicio (Hero)</h2>
            <Button size="sm" className="rounded-full" onClick={saveHero} disabled={savingHero}>
              {savingHero && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar Inicio
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Título principal</Label>
            <Input
              value={heroDraft.title}
              onChange={(e) => setHeroDraft({ ...heroDraft, title: e.target.value })}
              placeholder="Nutrición que transforma tu bienestar"
            />
          </div>
          <div className="space-y-2">
            <Label>Subtítulo o descripción</Label>
            <Textarea
              rows={3}
              value={heroDraft.subtitle}
              onChange={(e) => setHeroDraft({ ...heroDraft, subtitle: e.target.value })}
              placeholder="Acompañamiento profesional y cercano..."
            />
          </div>
          <ImageUpload
            value={heroDraft.image_url}
            onChange={(url) => setHeroDraft({ ...heroDraft, image_url: url || "" })}
            folder="hero"
            label="Foto principal de inicio"
          />
        </div>

        {/* About Content */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Sección Sobre Mí</h2>
            <Button size="sm" className="rounded-full" onClick={saveAbout} disabled={savingAbout}>
              {savingAbout && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar Sobre Mí
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Título</Label>
              <button
                type="button"
                onClick={() =>
                  setAboutDraft({
                    ...aboutDraft,
                    title: "Hola, soy Meli Oviedo",
                    body: DEFAULT_ABOUT_BODY,
                  })
                }
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Restaurar texto oficial
              </button>
            </div>
            <Input
              value={aboutDraft.title}
              onChange={(e) => setAboutDraft({ ...aboutDraft, title: e.target.value })}
              placeholder="Hola, soy Meli Oviedo"
            />
          </div>
          <div className="space-y-2">
            <Label>Descripción / Historia</Label>
            <Textarea
              rows={8}
              value={aboutDraft.body}
              onChange={(e) => setAboutDraft({ ...aboutDraft, body: e.target.value })}
              placeholder="Contá sobre vos, tu formación y enfoque..."
              className="text-sm leading-relaxed"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Experiencia</Label>
              <Input
                value={aboutDraft.experience ?? ""}
                onChange={(e) => setAboutDraft({ ...aboutDraft, experience: e.target.value })}
                placeholder="Lic. en Nutrición (UNC) • M.P. 5433"
              />
            </div>
            <div className="space-y-2">
              <Label>Especialidades</Label>
              <Input
                value={aboutDraft.specialties ?? ""}
                onChange={(e) => setAboutDraft({ ...aboutDraft, specialties: e.target.value })}
                placeholder="Nutrición deportiva • ISAK I y II"
              />
            </div>
          </div>
          <ImageUpload
            value={aboutDraft.image_url}
            onChange={(url) => setAboutDraft({ ...aboutDraft, image_url: url || "" })}
            folder="about"
            label="Foto de Sobre Mí"
          />
        </div>
      </div>
    </div>
  );
}
