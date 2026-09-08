import { useEffect, useState } from "react";

interface AdminState {
  loading: boolean;
  isAdmin: boolean;
}

export function useAdmin(): AdminState {
  const [state, setState] = useState<AdminState>(() => {
    const localAuth =
      typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true";
    return {
      loading: false,
      isAdmin: localAuth,
    };
  });

  useEffect(() => {
    const check = () => {
      const isLocal =
        typeof window !== "undefined" && localStorage.getItem("admin_authenticated") === "true";
      setState({ loading: false, isAdmin: isLocal });
    };

    check();

    const onAuthChange = () => check();
    window.addEventListener("admin-auth-change", onAuthChange);
    window.addEventListener("storage", onAuthChange);

    return () => {
      window.removeEventListener("admin-auth-change", onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, []);

  return state;
}
