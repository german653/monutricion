import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AdminState {
  loading: boolean;
  session: Session | null;
  isAdmin: boolean;
}

async function checkAdmin(userId: string): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = supabase as unknown as { from: (t: string) => any };
  try {
    const { data } = await db
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return !!data;
  } catch {
    return false;
  }
}

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>(() => {
    const localAuth =
      typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true";
    return {
      loading: true,
      session: null,
      isAdmin: localAuth,
    };
  });

  useEffect(() => {
    let active = true;

    const check = async () => {
      const isLocal =
        typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true";

      if (isLocal) {
        if (active) setState({ loading: false, session: null, isAdmin: true });
        return;
      }

      try {
        const { data } = await supabase.auth.getSession();
        const session = data.session;
        if (!session) {
          if (active) setState({ loading: false, session: null, isAdmin: false });
          return;
        }
        const hasRole = await checkAdmin(session.user.id);
        if (active) setState({ loading: false, session, isAdmin: hasRole });
      } catch {
        if (active) setState({ loading: false, session: null, isAdmin: isLocal });
      }
    };

    check();

    const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
      const isLocal =
        typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true";
      if (isLocal) {
        if (active) setState({ loading: false, session: null, isAdmin: true });
        return;
      }
      if (!session) {
        if (active) setState({ loading: false, session: null, isAdmin: false });
        return;
      }
      checkAdmin(session.user.id).then((hasRole) => {
        if (active) setState({ loading: false, session, isAdmin: hasRole });
      });
    });

    const onAuthChange = () => check();
    window.addEventListener("admin-auth-change", onAuthChange);
    window.addEventListener("storage", onAuthChange);

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
      window.removeEventListener("admin-auth-change", onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, []);

  return state;
}
