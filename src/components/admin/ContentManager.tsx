import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Loader2,
  Sparkles,
  MessageCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  HeartPulse,
  Leaf,
  Salad,
  Target,
  Award,
  ShieldCheck,
  Activity,
  Apple,
  Smile,
  Dumbbell,
  Stethoscope,
  Sun,
  CheckCircle2,
  BookOpen,
  Users,
  Compass,
} from "lucide-react";
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
  fetchValues,
  DEFAULT_VALUES,
  saveContent,
  DEFAULT_FOOTER_WHATSAPP_MESSAGE,
} from "@/lib/queries";
import { buildWhatsappUrl } from "@/lib/format";
import type {
  HeroContent,
  AboutContent,
  BrandingContent,
  ContactContent,
  ValuesContent,
  ValueCard,
} from "@/types";
import logoFallback from "@/assets/logo-mo.png.asset.json";

const AVAILABLE_ICONS = [
  { id: "HeartPulse", label: "Salud y Corazón", Icon: HeartPulse },
  { id: "Leaf", label: "Cercanía y Naturaleza", Icon: Leaf },
  { id: "Salad", label: "Nutrición y Comida", Icon: Salad },
  { id: "Sparkles", label: "Evidencia y Ciencia", Icon: Sparkles },
  { id: "Target", label: "Objetivos y Metas", Icon: Target },
  { id: "Award", label: "Certificación y Logro", Icon: Award },
  { id: "ShieldCheck", label: "Confianza y Seguridad", Icon: ShieldCheck },
  { id: "Activity", label: "Rendimiento Deportivo", Icon: Activity },
  { id: "Apple", label: "Alimentación Sana", Icon: Apple },
  { id: "Smile", label: "Bienestar y Empatía", Icon: Smile },
  { id: "Dumbbell", label: "Fuerza y Deporte", Icon: Dumbbell },
  { id: "Stethoscope", label: "Atención Clínica", Icon: Stethoscope },
  { id: "Sun", label: "Vitalidad y Día a Día", Icon: Sun },
  { id: "CheckCircle2", label: "Hábitos y Resultados", Icon: CheckCircle2 },
  { id: "BookOpen", label: "Educación Nutricional", Icon: BookOpen },
  { id: "Users", label: "Acompañamiento Humano", Icon: Users },
];

function getValueIconComponent(iconName: string): React.ComponentType<{ className?: string }> {
  const match = AVAILABLE_ICONS.find((i) => i.id === iconName);
  return match ? match.Icon : Sparkles;
}

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
  const { data: valuesData, isLoading: loadingValues } = useQuery({
    queryKey: ["values"],
    queryFn: fetchValues,
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

  const [valuesDraft, setValuesDraft] = useState<ValuesContent>(DEFAULT_VALUES);

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
  const [savingValues, setSavingValues] = useState(false);
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

  useEffect(() => {
    if (valuesData) {
      setValuesDraft({
        title: valuesData.title ?? DEFAULT_VALUES.title,
        subtitle: valuesData.subtitle ?? DEFAULT_VALUES.subtitle,
        items:
          valuesData.items && valuesData.items.length > 0 ? valuesData.items : DEFAULT_VALUES.items,
      });
    }
  }, [valuesData]);

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

  const saveValues = async () => {
    setSavingValues(true);
    try {
      await saveContent("values", valuesDraft);
      await queryClient.invalidateQueries({ queryKey: ["values"] });
      toast.success("Apartado de Enfoque y Valores guardado con éxito");
    } catch {
      toast.error("No se pudo guardar el apartado de enfoque y valores");
    } finally {
      setSavingValues(false);
    }
  };

  const updateValueItem = (index: number, patch: Partial<ValueCard>) => {
    setValuesDraft((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], ...patch };
      return { ...prev, items };
    });
  };

  const addValueItem = () => {
    setValuesDraft((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `val-${Date.now()}`,
          icon: "Sparkles",
          title: "Nuevo pilar",
          text: "Escribí aquí la descripción de este pilar o valor nutricional.",
        },
      ],
    }));
  };

  const removeValueItem = (index: number) => {
    if (valuesDraft.items.length <= 1) {
      toast.warning("Debe haber al menos una tarjeta de pilar en la sección.");
      return;
    }
    setValuesDraft((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const moveValueItem = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= valuesDraft.items.length) return;
    setValuesDraft((prev) => {
      const items = [...prev.items];
      const temp = items[index];
      items[index] = items[target];
      items[target] = temp;
      return { ...prev, items };
    });
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

  if (loadingBranding || loadingHero || loadingAbout || loadingContact || loadingValues) {
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

      {/* Apartado de Enfoque y Valores (Inicio) */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <HeartPulse className="h-4 w-4" />
              </span>
              <h2 className="font-display text-xl font-semibold">
                Apartado de Enfoque y Valores (Inicio)
              </h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Personalizá el título ("Un enfoque cercano y profesional"), el subtítulo y las
              tarjetas de pilares que aparecen en la página de inicio.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => setValuesDraft(DEFAULT_VALUES)}
            >
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Restaurar originales
            </Button>
            <Button size="sm" className="rounded-full" onClick={saveValues} disabled={savingValues}>
              {savingValues && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Guardar Enfoque
            </Button>
          </div>
        </div>

        {/* Título y Subtítulo de la Sección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Título principal de la sección</Label>
            <Input
              value={valuesDraft.title}
              onChange={(e) => setValuesDraft({ ...valuesDraft, title: e.target.value })}
              placeholder="Un enfoque cercano y profesional"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Subtítulo o descripción</Label>
            <Input
              value={valuesDraft.subtitle}
              onChange={(e) => setValuesDraft({ ...valuesDraft, subtitle: e.target.value })}
              placeholder="Todo lo que necesitás para mejorar tu relación con la comida."
            />
          </div>
        </div>

        {/* Editor de Tarjetas / Pilares */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                Tarjetas de Pilares y Valores
              </h3>
              <p className="text-xs text-muted-foreground">
                Cada tarjeta se mostrará en la página principal con su icono, título y texto
                descriptivo.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="rounded-full text-xs h-8"
              onClick={addValueItem}
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Agregar pilar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {valuesDraft.items.map((item, idx) => {
              const IconComp = getValueIconComponent(item.icon);
              return (
                <div
                  key={item.id || idx}
                  className="rounded-2xl border border-border bg-surface/40 p-4 space-y-3 shadow-2xs hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <IconComp className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        Pilar #{idx + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                        disabled={idx === 0}
                        onClick={() => moveValueItem(idx, "up")}
                        title="Mover arriba"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                        disabled={idx === valuesDraft.items.length - 1}
                        onClick={() => moveValueItem(idx, "down")}
                        title="Mover abajo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-0.5"
                        onClick={() => removeValueItem(idx)}
                        title="Eliminar pilar"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">Icono</Label>
                      <select
                        value={item.icon}
                        onChange={(e) => updateValueItem(idx, { icon: e.target.value })}
                        className="w-full h-9 rounded-xl border border-input bg-card px-2 py-1 text-xs shadow-2xs focus:outline-hidden focus:ring-1 focus:ring-ring"
                      >
                        {AVAILABLE_ICONS.map((ico) => (
                          <option key={ico.id} value={ico.id}>
                            {ico.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2 space-y-1">
                      <Label className="text-xs font-medium text-muted-foreground">
                        Título del pilar
                      </Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateValueItem(idx, { title: e.target.value })}
                        placeholder="Ej: Salud real, Cercanía, Sin dietas..."
                        className="h-9 rounded-xl text-xs bg-card"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Descripción breve
                    </Label>
                    <Textarea
                      rows={2}
                      value={item.text}
                      onChange={(e) => updateValueItem(idx, { text: e.target.value })}
                      placeholder="Hábitos sostenibles que cuidan tu bienestar a largo plazo..."
                      className="text-xs resize-none rounded-xl bg-card"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vista previa en miniatura de cómo se ve en la web */}
        <div className="rounded-2xl border border-border/70 bg-surface/30 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Vista previa en tiempo real
            </span>
            <span className="text-[0.7rem] text-muted-foreground">
              Así se verá en la página de inicio
            </span>
          </div>

          <div className="text-center max-w-xl mx-auto space-y-1">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {valuesDraft.title || "Un enfoque cercano y profesional"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {valuesDraft.subtitle ||
                "Todo lo que necesitás para mejorar tu relación con la comida."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {valuesDraft.items.map((item, idx) => {
              const IconComp = getValueIconComponent(item.icon);
              return (
                <div
                  key={item.id || idx}
                  className="rounded-2xl border border-border bg-card p-4 text-center space-y-2 shadow-2xs"
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <IconComp className="h-4 w-4" />
                  </div>
                  <div className="font-semibold text-xs text-foreground truncate">
                    {item.title || "Pilar"}
                  </div>
                  <p className="text-[0.7rem] text-muted-foreground line-clamp-3 leading-snug">
                    {item.text || "Descripción breve"}
                  </p>
                </div>
              );
            })}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ItemListEditor
              title="Experiencia y Títulos"
              description="Agregá uno por uno tus títulos, matrículas o certificaciones (se mostrarán como ítems destacados en la web)."
              items={parseBulletItems(aboutDraft.experience)}
              onChange={(items) => setAboutDraft({ ...aboutDraft, experience: items.join(" • ") })}
              placeholder="Ej: Lic. en Nutrición (UNC)"
            />

            <ItemListEditor
              title="Especialidades"
              description="Agregá tus áreas de especialización o certificaciones (Nutrición deportiva, ISAK, etc.)."
              items={parseBulletItems(aboutDraft.specialties)}
              onChange={(items) => setAboutDraft({ ...aboutDraft, specialties: items.join(" • ") })}
              placeholder="Ej: Nutrición deportiva"
            />
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

function parseBulletItems(str?: string): string[] {
  if (!str) return [];
  return str
    .split(/•|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function ItemListEditor({
  title,
  description,
  items,
  onChange,
  placeholder,
}: {
  title: string;
  description?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    if (items.includes(trimmed)) {
      toast.info("Ese ítem ya se encuentra en la lista");
      return;
    }
    onChange([...items, trimmed]);
    setNewItem("");
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const temp = next[index];
    next[index] = next[target];
    next[target] = temp;
    onChange(next);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-border/80 bg-surface/50 p-4">
      <div className="flex items-center justify-between">
        <Label className="font-semibold text-foreground text-sm">{title}</Label>
        <span className="text-xs text-muted-foreground font-medium">
          {items.length} {items.length === 1 ? "ítem" : "ítems"}
        </span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      )}

      {/* Lista de ítems */}
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground italic py-2 text-center rounded-xl bg-background/50 border border-dashed border-border">
            No hay ítems todavía. Escribí uno abajo y hacé clic en "Agregar".
          </p>
        ) : (
          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-2xs"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.65rem] font-bold text-primary">
                    {idx + 1}
                  </span>
                  <span className="truncate">{item}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                    title="Subir"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                    title="Bajar"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors ml-0.5"
                    title="Eliminar ítem"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input para agregar nuevo ítem */}
      <div className="flex gap-2 pt-1">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
          className="rounded-xl text-xs h-9"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleAdd}
          disabled={!newItem.trim()}
          className="rounded-xl shrink-0 h-9 text-xs"
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Agregar
        </Button>
      </div>
    </div>
  );
}
