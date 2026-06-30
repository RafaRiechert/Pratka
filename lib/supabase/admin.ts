import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Falls back to a placeholder project so admin pages don't crash before
// Supabase credentials are added to .env.local — see .env.local.example.
// Queries will simply fail/return empty until configured.
const FALLBACK_URL = "https://placeholder.supabase.co";
const FALLBACK_SERVICE_ROLE_KEY = "placeholder-service-role-key";

/**
 * Service-role client. Bypasses RLS — only import from server-only code
 * (route handlers, server actions), never from client components.
 * Used by the admin panel to manage all companies/students.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || FALLBACK_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
