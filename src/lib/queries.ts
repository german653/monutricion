import { supabase } from "@/integrations/supabase/client";
import type {
  AboutContent,
  Appointment,
  AppointmentStatus,
  Category,
  ContactContent,
  Faq,
  HeroContent,
  Product,
  Recipe,
  Service,
} from "@/types";

// The generated Database types don't yet include our tables, so we use a
// loosely-typed handle and cast results to our domain types.
const db = supabase as unknown as {
  from: (table: string) => any;
};

/* ----------------------------- Public reads ----------------------------- */

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await db
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function fetchAllServices(): Promise<Service[]> {
  const { data, error } = await db
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Service[];
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await db
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await db
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await db.from("categories").select("*").order("name");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchFaq(): Promise<Faq[]> {
  const { data, error } = await db
    .from("faq")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Faq[];
}

export async function fetchContent<T>(key: string): Promise<T | null> {
  const { data, error } = await db
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return (data?.value ?? null) as T | null;
}

export const fetchHero = () => fetchContent<HeroContent>("hero");
export const fetchAbout = () => fetchContent<AboutContent>("about");
export const fetchContact = () => fetchContent<ContactContent>("contact");

/* ----------------------------- Appointments ----------------------------- */

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
  const { error } = await db.from("appointments").insert(input);
  if (error) throw error;
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const { data, error } = await db
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Appointment[];
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const { error } = await db.from("appointments").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteAppointment(id: string) {
  const { error } = await db.from("appointments").delete().eq("id", id);
  if (error) throw error;
}

/* ------------------------------- Admin CRUD ----------------------------- */

export async function upsertService(input: Partial<Service>) {
  const { error } = input.id
    ? await db.from("services").update(input).eq("id", input.id)
    : await db.from("services").insert(input);
  if (error) throw error;
}

export async function deleteService(id: string) {
  const { error } = await db.from("services").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertProduct(input: Partial<Product>) {
  const { error } = input.id
    ? await db.from("products").update(input).eq("id", input.id)
    : await db.from("products").insert(input);
  if (error) throw error;
}

export async function deleteProduct(id: string) {
  const { error } = await db.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function saveContent(key: string, value: unknown) {
  const { error } = await db
    .from("site_content")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}

/* -------------------------------- Recipes ------------------------------- */

export async function fetchRecipes(): Promise<Recipe[]> {
  const { data, error } = await db
    .from("recipes")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Recipe[];
}

export async function fetchAllRecipes(): Promise<Recipe[]> {
  const { data, error } = await db
    .from("recipes")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Recipe[];
}

export async function upsertRecipe(input: Partial<Recipe>) {
  const { error } = input.id
    ? await db.from("recipes").update(input).eq("id", input.id)
    : await db.from("recipes").insert(input);
  if (error) throw error;
}

export async function deleteRecipe(id: string) {
  const { error } = await db.from("recipes").delete().eq("id", id);
  if (error) throw error;
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
  const { data, error } = await db
    .from("availability")
    .select("*")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  if (error) throw error;
  return (data ?? []) as AvailabilitySlot[];
}

export async function addAvailabilitySlots(date: string, times: string[]) {
  const rows = times.map((time) => ({ date, time }));
  const { error } = await db
    .from("availability")
    .upsert(rows, { onConflict: "date,time", ignoreDuplicates: true });
  if (error) throw error;
}

export async function deleteAvailabilitySlot(id: string) {
  const { error } = await db.from("availability").delete().eq("id", id);
  if (error) throw error;
}

/** Free slots for the public booking page (only Melina's slots not yet taken). */
export async function fetchAvailableSlots(): Promise<{ date: string; time: string }[]> {
  const { data, error } = await (supabase as any).rpc("available_slots");
  if (error) throw error;
  return (data ?? []).map((r: any) => ({ date: r.date, time: r.time }));
}
