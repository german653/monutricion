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
  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || DEFAULT_SERVICE_ID;
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || DEFAULT_TEMPLATE_ID;
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || DEFAULT_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("[EmailJS] Faltan credenciales de EmailJS para despachar el correo.");
    return {
      success: false,
      error: "Credenciales de EmailJS incompletas",
    };
  }

  const cleanEmail = appointment.email ? appointment.email.trim() : "";
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return {
      success: false,
      error: "La dirección de correo ingresada no es válida",
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

    const fullName = `${appointment.first_name} ${appointment.last_name}`.trim();
    const serviceName = appointment.service_name || "Consulta Nutricional";
    const timeFormatted = `${appointment.time} hs`;
    const dateTimeBadge = `${formattedDate} • ${timeFormatted}`;

    // IMPORTANT: The template uses {{nutricion}} in the "Subject *" line!
    // SMTP Subject headers MUST be a single line (no newlines) or EmailJS/mail servers reject it.
    const subjectLine = `Reserva de Turno: ${serviceName} (${formattedDate} ${timeFormatted})`;

    // Complete reservation details for {{message}} in the body
    const fullMessage = `¡Hola ${appointment.first_name}! Tu turno con Lic. Melina Oviedo fue registrado exitosamente.

Detalles de tu reserva:
• Paciente: ${fullName}
• Servicio: ${serviceName}
• Fecha: ${formattedDate} (${appointment.date})
• Horario: ${timeFormatted}
• Lugar: ${locationText}
• Teléfono registrado: ${appointment.phone || "No indicado"}
${appointment.notes ? `• Observaciones: ${appointment.notes}\n` : ""}
Cualquier duda o cambio que necesites, podés escribir directamente por WhatsApp o responder a este correo.`;

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        // Variables principales requeridas por tu plantilla actual:
        to_email: cleanEmail,
        name: fullName,
        email: cleanEmail,
        time: dateTimeBadge,
        message: fullMessage,
        nutricion: subjectLine,

        // Variables adicionales para máxima compatibilidad:
        to_name: fullName,
        user_name: fullName,
        patient_name: fullName,
        first_name: appointment.first_name.trim(),
        last_name: appointment.last_name.trim(),

        user_email: cleanEmail,
        client_email: cleanEmail,
        recipient: cleanEmail,
        recipient_email: cleanEmail,

        patient_phone: appointment.phone || "No especificado",
        phone: appointment.phone || "No especificado",

        service_name: serviceName,
        service: serviceName,

        appointment_date: formattedDate,
        date: formattedDate,
        fecha: formattedDate,
        raw_date: appointment.date,

        appointment_time: timeFormatted,
        hora: timeFormatted,
        horario: timeFormatted,
        raw_time: appointment.time,

        location: locationText,
        lugar: locationText,
        location_title: appointment.location_title || "Gimnasio 653",
        location_address: appointment.location_address || "Córdoba, Argentina",

        notes: appointment.notes || "Sin observaciones",
        observaciones: appointment.notes || "Sin observaciones",

        reply_to: cleanEmail,
        from_name: "Lic. Melina Oviedo - Nutrición",
        resumen: fullMessage,
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
      return { success: false, error: errorText || `Error HTTP ${res.status}` };
    }

    console.log("[EmailJS] ¡Correo de confirmación enviado exitosamente!");
    return { success: true };
  } catch (error: unknown) {
    console.error("[EmailJS] Error al conectar con EmailJS:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error de red al conectar con EmailJS",
    };
  }
}
