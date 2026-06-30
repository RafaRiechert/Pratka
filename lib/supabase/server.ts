import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Falls back to a placeholder project so server-rendered pages don't crash
// before Supabase credentials are added to .env.local — see
// .env.local.example. Queries will simply fail/return empty until configured.
const FALLBACK_URL = "https://placeholder.supabase.co";
const FALLBACK_ANON_KEY = "placeholder-anon-key";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // setAll called from a Server Component — safe to ignore when
            // middleware is refreshing the session.
          }
        },
      },
    }
  );
}
