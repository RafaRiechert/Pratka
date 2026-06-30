import "server-only";
import { cookies } from "next/headers";

export const ADMIN_EMAIL = "rafaelriechert1@gmail.com";
export const ADMIN_PASSWORD = "Betina11";
export const ADMIN_COOKIE_NAME = "pratka_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === "1";
}
