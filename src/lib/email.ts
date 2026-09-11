import type { Appointment } from "@/types";

// Service ID, Template ID y Public Key verificados de EmailJS
const DEFAULT_SERVICE_ID = "service_n0lwasq";
const DEFAULT_TEMPLATE_ID = "template_wzpni0c";
const DEFAULT_PUBLIC_KEY = "6I0IIsl9vU9cz51n4";

export interface SendBookingEmailResult {
  success: boolean;
  error?: string;
}

export async function sendBookingConfirmationEmail(
  appointment: Appointment,
  locationText: string,
): Promise<SendBookingEmailResult> {
  const serviceId =
    (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || DEFAULT_SERVICE_ID;
  const templateId =
    (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || DEFAULT_TEMPLATE_ID;
  const publicKey =
    (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || DEFAULT_PUBLIC_KEY;

  // Si no está configurado el templateId todavía, advertimos y salimos limpiamente
  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      "[EmailJS] Falta configurar VITE_EMAILJS_TEMPLATE_ID para despachar el correo.",
    );
    return {
      success: false,
      error: "Falta configurar el Template ID de EmailJS",
    };
  }

  try {
    let formattedDate = appointment.date;
    try {
      const d = new Date(`${appointment.date}T00:00:00`);
      formattedDate = d.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    } catch {
      // ignore
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_name: `${appointment.first_name} ${appointment.last_name}`.trim(),
        to_email: appointment.email.trim(),
        patient_name: `${appointment.first_name} ${appointment.last_name}`.trim(),
        patient_phone: appointment.phone || "No especificado",
        service_name: appointment.service_name || "Consulta Nutricional",
        appointment_date: formattedDate,
        appointment_time: `${appointment.time} hs`,
        location: locationText,
        notes: appointment.notes || "Sin observaciones",
        reply_to: "paginamelinanutricion@gmail.com",
        // Variable {{nutricion}} y {{message}} con el resumen completo del turno
        nutricion: `Turno agendado con Lic. Melina Oviedo
Paciente: ${appointment.first_name} ${appointment.last_name}
Servicio: ${appointment.service_name || "Consulta Nutricional"}
Fecha: ${formattedDate} (${appointment.date})
Horario: ${appointment.time} hs
Lugar: ${locationText}
Teléfono: ${appointment.phone || "No indicado"}${appointment.notes ? `\nObservaciones: ${appointment.notes}` : ""}`,
        message: `Turno agendado con Lic. Melina Oviedo: ${appointment.service_name || "Consulta"} el ${formattedDate} a las ${appointment.time} hs en ${locationText}.`,
      },
    };

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("[EmailJS] Error en la respuesta:", res.status, errorText);
      return { success: false, error: errorText };
    }

    console.log("[EmailJS] ¡Correo de confirmación enviado exitosamente!");
    return { success: true };
  } catch (error: unknown) {
    console.error("[EmailJS] Error al conectar con EmailJS:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
