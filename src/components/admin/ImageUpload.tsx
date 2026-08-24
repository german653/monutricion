import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  folder: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder, label = "Imagen" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

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
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type,
      });
      if (error) throw error;
      onChange(`/api/public/media/${path}`);
      toast.success("Imagen subida");
    } catch {
      toast.error("No se pudo subir la imagen");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

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
              Subir imagen desde tu dispositivo
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
        placeholder="…o pegá una URL de imagen"
      />
    </div>
  );
}
