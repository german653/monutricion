export type UUID = string;

export interface Service {
  id: UUID;
  title: string;
  description: string;
  image_url: string | null;
  duration: string | null;
  price: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: UUID;
  name: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: UUID;
  name: string;
  description: string;
  image_url: string | null;
  price: number;
  stock: number;
  category_id: UUID | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus = "pendiente" | "confirmado" | "cancelado";

export interface Appointment {
  id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_id: UUID | null;
  service_name: string | null;
  date: string;
  time: string;
  notes: string | null;
  location_title?: string | null;
  location_address?: string | null;
  location_notes?: string | null;
  location_maps_url?: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: UUID;
  title: string;
  description: string;
  image_url: string | null;
  category: string | null;
  prep_time: string | null;
  servings: string | null;
  ingredients: string;
  steps: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: UUID;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  image_url?: string;
}

export interface AboutContent {
  title: string;
  body: string;
  image_url?: string;
  experience?: string;
  specialties?: string;
}

export interface ContactContent {
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  footer_whatsapp_message?: string;
}

export interface BrandingContent {
  logo_url?: string | null;
  favicon_url?: string | null;
  brand_name?: string;
  tagline?: string;
}

export interface ConsultationLocation {
  id?: string;
  title: string;
  address: string;
  notes?: string;
  google_maps_url?: string;
  is_default?: boolean;
}
