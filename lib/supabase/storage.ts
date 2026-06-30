import { createClient } from "@/lib/supabase/client";

export async function uploadCv(userId: string, file: File) {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "pdf";
  const path = `${userId}/cv.${ext}`;
  const { error } = await supabase.storage
    .from("cvs")
    .upload(path, file, { upsert: true });
  if (error) throw error;
  return path;
}
