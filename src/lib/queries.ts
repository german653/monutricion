import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/integrations/firebase/client";
import type {
  AboutContent,
  Appointment,
  AppointmentStatus,
  BrandingContent,
  Category,
  ConsultationLocation,
  ContactContent,
  Faq,
  HeroContent,
  Product,
  Recipe,
  Service,
} from "@/types";

/* ----------------------------- Default Initial Data ----------------------------- */

const DEFAULT_SERVICES: Service[] = [
  {
    id: "s-1",
    title: "Consulta nutricional inicial",
    description: "Evaluación completa, análisis de hábitos y plan alimentario 100% personalizado.",
    duration: "60 min",
    price: 15000,
    sort_order: 1,
    is_active: true,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "s-2",
    title: "Seguimiento nutricional",
    description: "Ajustes del plan, evaluación de avances y acompañamiento cercano continuo.",
    duration: "30 min",
    price: 9000,
    sort_order: 2,
    is_active: true,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "s-3",
    title: "Nutrición deportiva",
    description: "Plan enfocado en rendimiento, energía, masa muscular y composición corporal.",
    duration: "60 min",
    price: 18000,
    sort_order: 3,
    is_active: true,
    image_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p-1",
    name: "Proteína Vegetal Neutra 500g",
    description: "Suplemento proteico a base de arveja y arroz, sin aditivos ni azúcares.",
    price: 12500,
    stock: 15,
    category_id: "c-1",
    is_active: true,
    image_url:
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p-2",
    name: "Mix Frutos Secos & Semillas 250g",
    description: "Almendras, nueces, castañas de cajú y semillas tostadas sin sal agregada.",
    price: 4500,
    stock: 25,
    category_id: "c-2",
    is_active: true,
    image_url:
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "p-3",
    name: "Infusión Digestiva Herbal 100g",
    description:
      "Mezcla de manzanilla, menta, cedrón y anís estrellado para después de las comidas.",
    price: 3200,
    stock: 20,
    category_id: "c-3",
    is_active: true,
    image_url:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_RECIPES: Recipe[] = [
  {
    id: "r-1",
    title: "Pancake proteico de avena y banana",
    description:
      "Un desayuno rápido, saciante y lleno de nutrientes para empezar el día con energía.",
    image_url:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&auto=format&fit=crop&q=80",
    category: "Desayunos",
    prep_time: "15 min",
    servings: "2 porciones",
    ingredients:
      "• 1 taza de avena arrollada\n• 1 banana madura\n• 2 huevos\n• 1 cdita de canela\n• 1 cdita de polvo para hornear\n• Frutos rojos para decorar",
    steps:
      "1. Procesar todos los ingredientes en licuadora hasta obtener una mezcla homogénea.\n2. Calentar una sartén antiadherente con unas gotas de aceite de coco.\n3. Verter porciones y cocinar a fuego medio hasta que salgan burbujas, dar vuelta y dorar 1 min.\n4. Servir con frutas frescas.",
    sort_order: 1,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-2",
    title: "Bowl fresco de quinoa, palta y vegetales asados",
    description: "Almuerzo completo con proteína vegetal, grasas saludables y fibra de calidad.",
    image_url:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    category: "Almuerzos",
    prep_time: "25 min",
    servings: "2 platos",
    ingredients:
      "• 1 taza de quinoa cocida\n• 1 palta en cubos\n• 1 taza de calabaza asada\n• 1 taza de hojas verdes variadas\n• Semillas de girasol tostadas\n• Limón, aceite de oliva virgen extra y sal marina",
    steps:
      "1. Cocinar la quinoa lavada en 2 partes de agua por 15 minutos.\n2. Disponer una base de hojas verdes en dos bowls.\n3. Agregar la quinoa tibia, la calabaza asada y la palta fresca.\n4. Condimentar con la vinagreta de limón y oliva y espolvorear las semillas.",
    sort_order: 2,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r-3",
    title: "Trufas energéticas de cacao y dátiles",
    description: "Snack dulce sin azúcares refinados, ideal para antes o después de entrenar.",
    image_url:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    category: "Snacks",
    prep_time: "10 min",
    servings: "10 unidades",
    ingredients:
      "• 10 dátiles descarozados hidratados\n• 1/2 taza de nueces o almendras\n• 2 cdas de cacao amargo en polvo\n• 1 cda de semillas de chía\n• Coco rallado para rebozar",
    steps:
      "1. Procesar los frutos secos y los dátiles hasta que se forme una pasta moldeable.\n2. Incorporar el cacao y las semillas.\n3. Formar bolitas con las manos y rebozarlas en coco rallado.\n4. Refrigerar 30 minutos antes de consumir.",
    sort_order: 3,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_CATEGORIES: Category[] = [
  { id: "c-1", name: "Suplementos", slug: "suplementos", created_at: new Date().toISOString() },
  { id: "c-2", name: "Snacks saludables", slug: "snacks", created_at: new Date().toISOString() },
  { id: "c-3", name: "Infusiones", slug: "infusiones", created_at: new Date().toISOString() },
];

const DEFAULT_FAQ: Faq[] = [
  {
    id: "f-1",
    question: "¿Cómo son las consultas?",
    answer:
      "Las consultas pueden ser presenciales u online. En el primer encuentro evaluamos tu historia clínica, rutina, hábitos alimentarios y objetivos para diseñar una propuesta 100% personalizada y realista.",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "f-2",
    question: "¿Necesito una derivación médica o análisis previos?",
    answer:
      "No es obligatorio tener derivación previa, pero si tenés análisis de laboratorio o estudios médicos recientes, podés traerlos para ajustar el plan con mayor precisión.",
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "f-3",
    question: "¿Los planes son restrictivos o dietas estrictas?",
    answer:
      "No trabajo con dietas de moda ni restricciones extremas. Mi enfoque es la educación alimentaria y el desarrollo de hábitos sostenibles que puedas mantener a largo plazo disfrutando del proceso.",
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];

const DEFAULT_ABOUT: AboutContent = {
  title: "Hola, soy Meli Oviedo",
  body: `Soy Licenciada en Nutrición, egresada de la Facultad de Nutrición de la Universidad Nacional de Córdoba, matrícula profesional 5433.

Me apasiona acompañar a las personas en el camino hacia su mejor versión, ayudándolas a alcanzar sus objetivos, construir hábitos saludables y, sobre todo, a confiar en que pueden lograr mucho más de lo que imaginan.

Creo que la nutrición es una herramienta fundamental para cuidar nuestra salud, sentirnos mejor y potenciar nuestro bienestar en todos los aspectos de nuestra vida.

Trabajo con diferentes patologías y objetivos nutricionales, y tengo una especial pasión por la nutrición deportiva. Además, soy runner y cuento con certificación ISAK nivel I y II, porque considero que conocer y entender nuestro cuerpo es parte fundamental del proceso.

Quiero acompañarte desde un lugar de educación, motivación y empatía, brindándote herramientas para que puedas aprender a alimentarte, disfrutar del proceso y alcanzar tus objetivos de una manera sostenible.

Porque no se trata de buscar la perfección, sino de aprender, avanzar y crecer en el camino. 

¿Empezamos juntos?`,
  experience: "Lic. en Nutrición (UNC) • M.P. 5433",
  specialties: "Nutrición deportiva • ISAK I y II • Hábitos sostenibles",
};

const DEFAULT_BRANDING: BrandingContent = {
  logo_url: null,
  favicon_url: null,
  brand_name: "Melina Oviedo",
  tagline: "Nutrición y Salud",
};

const DEFAULT_HERO: HeroContent = {
  title: "Nutrición real para potenciar tu vida y rendimiento",
  subtitle:
    "Acompañamiento profesional, planes personalizados y herramientas prácticas para construir hábitos sostenibles.",
};

export const DEFAULT_FOOTER_WHATSAPP_MESSAGE =
  "¡Holaa Melina! Vi tu sitio web y te quiero hacerte una consulta. Espero tu mensaje";

const DEFAULT_CONTACT: ContactContent = {
  email: "nutricion.melinaoviedo@gmail.com",
  phone: "+54 9 3541 63-9512",
  whatsapp: "5493541639512",
  instagram: "https://www.instagram.com/nutri_melioviedo/?hl=es-la",
  address: "Córdoba, Argentina (Presencial & Online)",
  footer_whatsapp_message: DEFAULT_FOOTER_WHATSAPP_MESSAGE,
};

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`mo_data_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`mo_data_${key}`, JSON.stringify(value));
  } catch {
    // ignore
  }
}

/* ----------------------------- Public reads ----------------------------- */

export async function fetchServices(): Promise<Service[]> {
  try {
    const q = query(collection(db, "services"), where("is_active", "==", true));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
      list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return list;
    }
  } catch {
    // fall through
  }
  return getStorage<Service[]>("services", DEFAULT_SERVICES).filter((s) => s.is_active);
}

export async function fetchAllServices(): Promise<Service[]> {
  try {
    const snap = await getDocs(collection(db, "services"));
    if (!snap.empty) {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Service);
      list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return list;
    }
  } catch {
    // fall through
  }
  return getStorage<Service[]>("services", DEFAULT_SERVICES);
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, "products"), where("is_active", "==", true));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
    }
  } catch {
    // fall through
  }
  return getStorage<Product[]>("products", DEFAULT_PRODUCTS).filter((p) => p.is_active);
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, "products"));
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
    }
  } catch {
    // fall through
  }
  return getStorage<Product[]>("products", DEFAULT_PRODUCTS);
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const snap = await getDocs(collection(db, "categories"));
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category);
    }
  } catch {
    // fall through
  }
  return getStorage<Category[]>("categories", DEFAULT_CATEGORIES);
}

export async function fetchFaq(): Promise<Faq[]> {
  try {
    const snap = await getDocs(collection(db, "faq"));
    if (!snap.empty) {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Faq);
      list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return list;
    }
  } catch {
    // fall through
  }
  return getStorage<Faq[]>("faq", DEFAULT_FAQ);
}

export async function fetchContent<T>(key: string, fallback?: T): Promise<T | null> {
  try {
    const docRef = doc(db, "site_content", key);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data?.value !== undefined && data.value !== null) {
        return data.value as T;
      }
    }
  } catch {
    // fall through
  }
  return getStorage<T | null>(`content_${key}`, fallback ?? null);
}

export const fetchHero = () => fetchContent<HeroContent>("hero", DEFAULT_HERO);
export const fetchAbout = () => fetchContent<AboutContent>("about", DEFAULT_ABOUT);
export const fetchContact = () => fetchContent<ContactContent>("contact", DEFAULT_CONTACT);
export const fetchBranding = () => fetchContent<BrandingContent>("branding", DEFAULT_BRANDING);

/* ----------------------------- Appointments ----------------------------- */

export class SlotCollisionError extends Error {
  constructor(message = "Este horario ya ha sido reservado por otra persona.") {
    super(message);
    this.name = "SlotCollisionError";
  }
}

export interface NewAppointment {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_id: string | null;
  service_name: string | null;
  date: string;
  time: string;
  notes?: string | null;
}

export async function createAppointment(input: NewAppointment): Promise<void> {
  const cleanTime = input.time.trim();
  const cleanDate = input.date.trim();
  const slotKey = `${cleanDate}_${cleanTime.replace(":", "-")}`;
  const slotDocRef = doc(db, "booked_slots", slotKey);
  const newId = crypto.randomUUID();

  const newApp: Appointment = {
    ...input,
    date: cleanDate,
    time: cleanTime,
    id: newId,
    status: "pendiente",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 1. First verify if local cache already has a conflict (for immediate responsiveness)
  const existingLocal = getStorage<Appointment[]>("appointments", []);
  const localCollision = existingLocal.find(
    (a) => a.date === cleanDate && a.time === cleanTime && a.status !== "cancelado",
  );
  if (localCollision) {
    throw new SlotCollisionError(
      "Este horario ya fue reservado. Por favor elegí otro horario disponible.",
    );
  }

  // 2. Perform atomic reservation in Firestore via transaction
  let firestoreSucceeded = false;
  try {
    await runTransaction(db, async (transaction) => {
      // Check atomic slot lock
      const slotSnap = await transaction.get(slotDocRef);
      if (slotSnap.exists()) {
        const slotData = slotSnap.data();
        if (slotData && slotData.status !== "cancelado") {
          throw new SlotCollisionError("Este horario acaba de ser reservado por otra persona.");
        }
      }

      // Write slot lock and new appointment atomically
      transaction.set(slotDocRef, {
        id: slotKey,
        date: cleanDate,
        time: cleanTime,
        appointment_id: newId,
        status: "pendiente",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      const appDocRef = doc(db, "appointments", newId);
      transaction.set(appDocRef, newApp);
    });
    firestoreSucceeded = true;
  } catch (err: unknown) {
    const errorObj = err as { name?: string; message?: string } | undefined;
    if (
      err instanceof SlotCollisionError ||
      errorObj?.name === "SlotCollisionError" ||
      errorObj?.message?.includes("reservado") ||
      errorObj?.message?.includes("SLOT_ALREADY_TAKEN")
    ) {
      throw new SlotCollisionError(
        "Este horario acaba de ser reservado por otra persona. Por favor elegí otro horario.",
      );
    }
    // If transaction failed due to network/offline mode, fallback to setDoc
    if (!firestoreSucceeded) {
      try {
        await setDoc(slotDocRef, {
          id: slotKey,
          date: cleanDate,
          time: cleanTime,
          appointment_id: newId,
          status: "pendiente",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        await setDoc(doc(db, "appointments", newId), newApp);
      } catch {
        // Continue with local storage if network is offline
      }
    }
  }

  setStorage("appointments", [newApp, ...existingLocal]);
}

export async function fetchAppointments(): Promise<Appointment[]> {
  try {
    const snap = await getDocs(collection(db, "appointments"));
    if (!snap.empty) {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Appointment);
      list.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
      return list;
    }
  } catch {
    // fall through
  }
  return getStorage<Appointment[]>("appointments", []);
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  let appDate: string | undefined;
  let appTime: string | undefined;

  try {
    const appDoc = await getDoc(doc(db, "appointments", id));
    if (appDoc.exists()) {
      const d = appDoc.data() as Appointment;
      appDate = d.date;
      appTime = d.time;
    }

    await setDoc(
      doc(db, "appointments", id),
      { status, updated_at: new Date().toISOString() },
      { merge: true },
    );

    // Keep booked_slots lock in sync
    if (appDate && appTime) {
      const slotKey = `${appDate}_${appTime.replace(":", "-")}`;
      await setDoc(
        doc(db, "booked_slots", slotKey),
        { status, updated_at: new Date().toISOString() },
        { merge: true },
      );
    }
  } catch {
    // ignore
  }

  const list = getStorage<Appointment[]>("appointments", []);
  const updated = list.map((a) => {
    if (a.id === id) {
      appDate = a.date;
      appTime = a.time;
      return { ...a, status, updated_at: new Date().toISOString() };
    }
    return a;
  });
  setStorage("appointments", updated);
}

export async function deleteAppointment(id: string) {
  try {
    const appDoc = await getDoc(doc(db, "appointments", id));
    if (appDoc.exists()) {
      const d = appDoc.data() as Appointment;
      if (d.date && d.time) {
        const slotKey = `${d.date}_${d.time.replace(":", "-")}`;
        await deleteDoc(doc(db, "booked_slots", slotKey));
      }
    }
    await deleteDoc(doc(db, "appointments", id));
  } catch {
    // ignore
  }

  const list = getStorage<Appointment[]>("appointments", []);
  setStorage(
    "appointments",
    list.filter((a) => a.id !== id),
  );
}

/* ------------------------------- Admin CRUD ----------------------------- */

export async function upsertService(input: Partial<Service>) {
  const id = input.id || crypto.randomUUID();
  const list = getStorage<Service[]>("services", DEFAULT_SERVICES);
  const existingItem = list.find((s) => s.id === id);

  const payload: Service = {
    id,
    title: input.title || existingItem?.title || "",
    description: input.description || existingItem?.description || "",
    duration: input.duration !== undefined ? input.duration : existingItem?.duration || null,
    price: input.price !== undefined ? input.price : existingItem?.price || 0,
    sort_order:
      input.sort_order !== undefined
        ? input.sort_order
        : existingItem?.sort_order || list.length + 1,
    is_active: input.is_active !== undefined ? input.is_active : (existingItem?.is_active ?? true),
    image_url: input.image_url !== undefined ? input.image_url : existingItem?.image_url || null,
    created_at: existingItem?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, "services", id), payload, { merge: true });
  } catch {
    // ignore
  }

  if (input.id && existingItem) {
    const next = list.map((s) => (s.id === id ? payload : s));
    setStorage("services", next);
  } else {
    setStorage("services", [...list, payload]);
  }
}

export async function deleteService(id: string) {
  try {
    await deleteDoc(doc(db, "services", id));
  } catch {
    // ignore
  }
  const list = getStorage<Service[]>("services", DEFAULT_SERVICES);
  setStorage(
    "services",
    list.filter((s) => s.id !== id),
  );
}

export async function upsertProduct(input: Partial<Product>) {
  const id = input.id || crypto.randomUUID();
  const list = getStorage<Product[]>("products", DEFAULT_PRODUCTS);
  const existingItem = list.find((p) => p.id === id);

  const payload: Product = {
    id,
    name: input.name || existingItem?.name || "",
    description: input.description || existingItem?.description || "",
    price: input.price !== undefined ? input.price : existingItem?.price || 0,
    stock: input.stock !== undefined ? input.stock : existingItem?.stock || 0,
    category_id:
      input.category_id !== undefined ? input.category_id : existingItem?.category_id || null,
    is_active: input.is_active !== undefined ? input.is_active : (existingItem?.is_active ?? true),
    image_url: input.image_url !== undefined ? input.image_url : existingItem?.image_url || null,
    created_at: existingItem?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, "products", id), payload, { merge: true });
  } catch {
    // ignore
  }

  if (input.id && existingItem) {
    const next = list.map((p) => (p.id === id ? payload : p));
    setStorage("products", next);
  } else {
    setStorage("products", [payload, ...list]);
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch {
    // ignore
  }
  const list = getStorage<Product[]>("products", DEFAULT_PRODUCTS);
  setStorage(
    "products",
    list.filter((p) => p.id !== id),
  );
}

export async function saveContent(key: string, value: unknown) {
  try {
    await setDoc(doc(db, "site_content", key), {
      key,
      value,
      updated_at: new Date().toISOString(),
    });
  } catch {
    // ignore
  }
  setStorage(`content_${key}`, value);
}

/* -------------------------------- Recipes ------------------------------- */

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const q = query(collection(db, "recipes"), where("is_published", "==", true));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Recipe);
      list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return list;
    }
  } catch {
    // fall through
  }
  return getStorage<Recipe[]>("recipes", DEFAULT_RECIPES).filter((r) => r.is_published);
}

export async function fetchAllRecipes(): Promise<Recipe[]> {
  try {
    const snap = await getDocs(collection(db, "recipes"));
    if (!snap.empty) {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Recipe);
      list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return list;
    }
  } catch {
    // fall through
  }
  return getStorage<Recipe[]>("recipes", DEFAULT_RECIPES);
}

export async function upsertRecipe(input: Partial<Recipe>) {
  const id = input.id || crypto.randomUUID();
  const list = getStorage<Recipe[]>("recipes", DEFAULT_RECIPES);
  const existingItem = list.find((r) => r.id === id);

  const payload: Recipe = {
    id,
    title: input.title || existingItem?.title || "",
    description: input.description || existingItem?.description || "",
    image_url: input.image_url !== undefined ? input.image_url : existingItem?.image_url || null,
    category: input.category !== undefined ? input.category : existingItem?.category || null,
    prep_time: input.prep_time !== undefined ? input.prep_time : existingItem?.prep_time || null,
    servings: input.servings !== undefined ? input.servings : existingItem?.servings || null,
    ingredients: input.ingredients || existingItem?.ingredients || "",
    steps: input.steps || existingItem?.steps || "",
    sort_order:
      input.sort_order !== undefined
        ? input.sort_order
        : existingItem?.sort_order || list.length + 1,
    is_published:
      input.is_published !== undefined ? input.is_published : (existingItem?.is_published ?? true),
    created_at: existingItem?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, "recipes", id), payload, { merge: true });
  } catch {
    // ignore
  }

  if (input.id && existingItem) {
    const next = list.map((r) => (r.id === id ? payload : r));
    setStorage("recipes", next);
  } else {
    setStorage("recipes", [payload, ...list]);
  }
}

export async function deleteRecipe(id: string) {
  try {
    await deleteDoc(doc(db, "recipes", id));
  } catch {
    // ignore
  }
  const list = getStorage<Recipe[]>("recipes", DEFAULT_RECIPES);
  setStorage(
    "recipes",
    list.filter((r) => r.id !== id),
  );
}

/* ----------------------------- Availability ----------------------------- */

export interface AvailabilitySlot {
  id: string;
  date: string;
  time: string;
  created_at: string;
}

export async function fetchAvailability(): Promise<AvailabilitySlot[]> {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const q = query(
      collection(db, "availability"),
      where("date", ">=", today),
      orderBy("date", "asc"),
    );
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as AvailabilitySlot);
    }
  } catch {
    // fall through
  }
  return getStorage<AvailabilitySlot[]>("availability", []);
}

export async function addAvailabilitySlots(date: string, times: string[]) {
  const current = getStorage<AvailabilitySlot[]>("availability", []);
  const newSlots: AvailabilitySlot[] = [];

  for (const time of times) {
    const slotId = `${date}_${time.replace(":", "-")}`;
    const slotData = {
      id: slotId,
      date,
      time,
      created_at: new Date().toISOString(),
    };
    newSlots.push(slotData);

    try {
      await setDoc(doc(db, "availability", slotId), slotData, { merge: true });
    } catch {
      // ignore
    }
  }

  setStorage("availability", [...current, ...newSlots]);
}

export async function deleteAvailabilitySlot(id: string) {
  try {
    await deleteDoc(doc(db, "availability", id));
  } catch {
    // ignore
  }
  const current = getStorage<AvailabilitySlot[]>("availability", []);
  setStorage(
    "availability",
    current.filter((s) => s.id !== id),
  );
}

function isSlotInFuture(dateStr: string, timeStr: string): boolean {
  try {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const [year, month, day] = dateStr.split("-").map(Number);
    // Add 10-minute margin so users don't book a slot that has already started or is within 10 min
    const slotDate = new Date(year, month - 1, day, hours, minutes || 0, 0);
    return slotDate.getTime() > Date.now() + 10 * 60 * 1000;
  } catch {
    return true;
  }
}

/** Free slots for the public booking page. Excludes occupied appointments, slot locks, and past dates. */
export async function fetchAvailableSlots(): Promise<{ date: string; time: string }[]> {
  let rawSlots: { date: string; time: string }[] = [];

  try {
    const storedSlots = await fetchAvailability();
    if (storedSlots.length > 0) {
      rawSlots = storedSlots.map((s) => ({ date: s.date, time: s.time }));
    }
  } catch {
    // fall through
  }

  // Generate availability for upcoming business days if none configured
  if (rawSlots.length === 0) {
    const base = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        const dateStr = d.toISOString().slice(0, 10);
        rawSlots.push(
          { date: dateStr, time: "09:00" },
          { date: dateStr, time: "11:00" },
          { date: dateStr, time: "15:00" },
          { date: dateStr, time: "17:00" },
        );
      }
    }
  }

  // Collect all occupied slots from Firestore & LocalStorage
  const occupiedKeys = new Set<string>();

  try {
    const appsSnap = await getDocs(collection(db, "appointments"));
    appsSnap.forEach((d) => {
      const data = d.data() as Appointment;
      if (data.date && data.time && data.status !== "cancelado") {
        occupiedKeys.add(`${data.date.trim()}___${data.time.trim()}`);
      }
    });
  } catch {
    // ignore
  }

  try {
    const locksSnap = await getDocs(collection(db, "booked_slots"));
    locksSnap.forEach((d) => {
      const data = d.data();
      if (data.date && data.time && data.status !== "cancelado") {
        occupiedKeys.add(`${data.date.trim()}___${data.time.trim()}`);
      }
    });
  } catch {
    // ignore
  }

  // Local storage check
  const localApps = getStorage<Appointment[]>("appointments", []);
  for (const a of localApps) {
    if (a.date && a.time && a.status !== "cancelado") {
      occupiedKeys.add(`${a.date.trim()}___${a.time.trim()}`);
    }
  }

  // Filter out occupied slots and past slots
  const available = rawSlots.filter((slot) => {
    const key = `${slot.date.trim()}___${slot.time.trim()}`;
    if (occupiedKeys.has(key)) return false;
    return isSlotInFuture(slot.date, slot.time);
  });

  return available;
}

/* -------------------- Consultation Location & Schedule -------------------- */

export const DEFAULT_CONSULTATION_LOCATION: ConsultationLocation = {
  title: "Gimnasio 653",
  address: "Córdoba, Argentina",
  notes: "Atención presencial con turno previo. Presentate 5 minutos antes del horario asignado.",
  google_maps_url: "",
};

export async function fetchConsultationLocation(): Promise<ConsultationLocation> {
  try {
    const snap = await getDoc(doc(db, "site_content", "consultation_location"));
    if (snap.exists()) {
      const data = snap.data();
      const val = (data?.value ?? data) as Partial<ConsultationLocation>;
      return {
        title: val.title?.trim() || DEFAULT_CONSULTATION_LOCATION.title,
        address: val.address?.trim() || DEFAULT_CONSULTATION_LOCATION.address,
        notes: val.notes ?? DEFAULT_CONSULTATION_LOCATION.notes,
        google_maps_url: val.google_maps_url ?? DEFAULT_CONSULTATION_LOCATION.google_maps_url,
      };
    }
  } catch {
    // fall through
  }
  const stored = getStorage<ConsultationLocation | null>("content_consultation_location", null);
  return (
    stored || {
      ...DEFAULT_CONSULTATION_LOCATION,
    }
  );
}

export async function saveConsultationLocation(loc: ConsultationLocation): Promise<void> {
  await saveContent("consultation_location", loc);
}
