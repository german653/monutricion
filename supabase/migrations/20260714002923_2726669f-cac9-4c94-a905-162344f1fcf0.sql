CREATE TABLE public.availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  time text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (date, time)
);
GRANT SELECT ON public.availability TO anon, authenticated;
GRANT ALL ON public.availability TO service_role;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view availability" ON public.availability FOR SELECT USING (true);
CREATE POLICY "Admins manage availability" ON public.availability FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX idx_availability_date ON public.availability(date);