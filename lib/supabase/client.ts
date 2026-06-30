import { createBrowserClient } from "@supabase/ssr";

// Falls back to a placeholder project so the app can render (in a logged-out
// state) before Supabase credentials are added to .env.local — see
// .env.local.example. Auth/data calls will simply fail until configured.
const FALLBACK_URL = "https://placeholder.supabase.co";
const FALLBACK_ANON_KEY = "placeholder-anon-key";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY
  );
}
