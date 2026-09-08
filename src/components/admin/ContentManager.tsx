import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { fetchHero, fetchAbout, fetchBranding, saveContent } from "@/lib/queries";
import type { HeroContent, AboutContent, BrandingContent } from "@/types";
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

  const [brandingDraft, setBrandingDraft] = useState<BrandingContent>({
    logo_url: "",
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

  const [savingBranding, setSavingBranding] = useState(false);
  const [savingHero, setSavingHero] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);

  useEffect(() => {
    if (brandingData) {
      setBrandingDraft({
        logo_url: brandingData.logo_url ?? "",
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

  if (loadingBranding || loadingHero || loadingAbout) {
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
