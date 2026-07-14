import { createFileRoute } from "@tanstack/react-router";

const ADMIN_EMAIL = "nutri@gmail.com";
const ADMIN_PASSWORD = "42981809";

export const Route = createFileRoute("/api/public/seed-admin")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Find or create the admin auth user
        let userId: string | undefined;
        const { data: list } = await supabaseAdmin.auth.admin.listUsers();
        const existing = list?.users?.find((u) => u.email === ADMIN_EMAIL);

        if (existing) {
          userId = existing.id;
        } else {
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            email_confirm: true,
          });
          if (error) {
            return new Response(JSON.stringify({ ok: false, error: error.message }), {
              status: 500,
              headers: { "content-type": "application/json" },
            });
          }
          userId = data.user?.id;
        }

        if (!userId) {
          return new Response(JSON.stringify({ ok: false, error: "no user id" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        // Ensure the admin role exists
        await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

        return new Response(JSON.stringify({ ok: true, userId }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
