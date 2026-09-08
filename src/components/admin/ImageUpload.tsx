import { useRef, useState } from "react";
import { toast } from "sonner";
import { Cloud, ImagePlus, Loader2, X } from "lucide-react";
import { uploadToCloudinary } from "@/integrations/cloudinary/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Imagen" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const isCloudinaryUrl = value?.includes("cloudinary.com");

  const pick = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("La imagen no puede superar 10 MB");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
      if (url.includes("cloudinary.com")) {
        toast.success("Imagen subida a Cloudinary con éxito");
      } else {
        toast.success("Imagen cargada correctamente");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo subir la imagen";
      toast.error(message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {isCloudinaryUrl && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <Cloud className="h-3 w-3" /> Cloudinary
          </span>
        )}
      </div>

      {value ? (
        <div className="relative w-full overflow-hidden rounded-2xl border border-border">
          <img src={value} alt="Vista previa" className="h-40 w-full object-cover" />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 rounded-full"
            onClick={() => onChange(null)}
            aria-label="Quitar imagen"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-5 w-5" />
              Subir imagen (Cloudinary / Dispositivo)
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void pick(file);
        }}
      />

      <Input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        placeholder="…o pegá una URL de Cloudinary / externa"
      />
    </div>
  );
}
