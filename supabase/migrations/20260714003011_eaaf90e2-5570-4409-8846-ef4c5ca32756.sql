CREATE OR REPLACE FUNCTION public.available_slots()
RETURNS TABLE (date date, "time" text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT a.date, a.time
  FROM public.availability a
  WHERE a.date >= CURRENT_DATE
    AND NOT EXISTS (
      SELECT 1 FROM public.appointments ap
      WHERE ap.date = a.date
        AND ap.time = a.time
        AND ap.status <> 'cancelado'
    )
  ORDER BY a.date, a.time;
$$;
REVOKE ALL ON FUNCTION public.available_slots() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.available_slots() TO anon, authenticated;