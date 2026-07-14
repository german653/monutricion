-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  duration text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  stock int NOT NULL DEFAULT 0,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_products_category ON public.products(category_id);

-- Appointments
CREATE TYPE public.appointment_status AS ENUM ('pendiente', 'confirmado', 'cancelado');
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
  service_name text,
  date date NOT NULL,
  time text NOT NULL,
  notes text,
  status appointment_status NOT NULL DEFAULT 'pendiente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.appointments TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view appointments" ON public.appointments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update appointments" ON public.appointments FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete appointments" ON public.appointments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER appointments_updated BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Site content (key/value editable content)
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins manage site content" ON public.site_content FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER site_content_updated BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- FAQ
CREATE TABLE public.faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faq TO anon, authenticated;
GRANT ALL ON public.faq TO service_role;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view faq" ON public.faq FOR SELECT USING (true);
CREATE POLICY "Admins manage faq" ON public.faq FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed content
INSERT INTO public.site_content (key, value) VALUES
('hero', '{"title":"Nutrición que transforma tu bienestar","subtitle":"Acompañamiento profesional y cercano para que alcances tus objetivos de salud con hábitos que perduran.","image_url":""}'::jsonb),
('about', '{"title":"Sobre mí","body":"Soy Melina Oviedo, Licenciada en Nutrición. Ayudo a personas de todas las edades a mejorar su relación con la comida a través de planes personalizados, realistas y sostenibles. Mi enfoque combina evidencia científica con un trato humano y cercano.","image_url":"","experience":"+5 años de experiencia","specialties":"Nutrición clínica, deportiva y descenso de peso"}'::jsonb),
('contact', '{"email":"nutri.melioviedo@gmail.com","phone":"+54 3541 63-9512","whatsapp":"543541639512","instagram":"https://www.instagram.com/nutri_melioviedo/","address":"Córdoba, Argentina"}'::jsonb);

INSERT INTO public.faq (question, answer, sort_order) VALUES
('¿Cómo son las consultas?','Las consultas pueden ser presenciales u online. En la primera evaluamos tu historia clínica, hábitos y objetivos para diseñar un plan a medida.',1),
('¿Necesito una derivación médica?','No es obligatoria, pero si tenés estudios recientes traelos para personalizar mejor tu plan.',2),
('¿Los planes son restrictivos?','No. Trabajamos con hábitos sostenibles y variados adaptados a tus gustos y tu ritmo de vida.',3);

INSERT INTO public.categories (name, slug) VALUES
('Suplementos','suplementos'),('Snacks saludables','snacks'),('Infusiones','infusiones');

INSERT INTO public.services (title, description, duration, price, sort_order) VALUES
('Consulta nutricional inicial','Evaluación completa, análisis de hábitos y plan alimentario personalizado.','60 min',15000,1),
('Seguimiento','Ajustes del plan, control de progreso y acompañamiento continuo.','30 min',9000,2),
('Nutrición deportiva','Plan orientado a rendimiento y composición corporal para deportistas.','60 min',18000,3);