/**
 * Cloudinary image upload and helper service.
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "",
};

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || CLOUDINARY_CONFIG.cloudName;
  const uploadPreset =
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || CLOUDINARY_CONFIG.uploadPreset;

  if (!cloudName || !uploadPreset) {
    // Si todavía no configuró Cloudinary, convertimos a data URL para que la app funcione fluidamente
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("No se pudo leer la imagen localmente."));
        }
      };
      reader.onerror = () => reject(new Error("Error al procesar el archivo."));
      reader.readAsDataURL(file);
    });
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || "Error al subir la imagen a Cloudinary");
  }

  const data: CloudinaryUploadResponse = await response.json();
  return data.secure_url;
}

/**
 * Helper to generate optimized Cloudinary URLs with auto format and quality
 */
export function getOptimizedCloudinaryUrl(url: string, transformations = "f_auto,q_auto"): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/${transformations}/`);
}
