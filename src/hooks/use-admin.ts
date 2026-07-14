import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AdminState {
  loading: boolean;
  session: Session | null;
  isAdmin: boolean;
}

async function checkAdmin(userId: string): Promise<boolean> {
  const db = supabase as unknown as { from: (t: string) => any };
  const { data } = await db
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>({
    loading: true,
    session: null,
    isAdmin: false,
  });

  useEffect(() => {
    let active = true;

    const resolve = async (session: Session | null) => {
      if (!session) {
        if (active) setState({ loading: false, session: null, isAdmin: false });
        return;
      }
      const isAdmin = await checkAdmin(session.user.id);
      if (active) setState({ loading: false, session, isAdmin });
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => resolve(session));

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return state;
}
