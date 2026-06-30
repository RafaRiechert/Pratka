# Supabase setup

1. Create a project at https://supabase.com.
2. In the SQL editor, run `migrations/0001_init.sql` then `migrations/0002_seed.sql` (seed is optional demo data).
3. In Project Settings → API, copy the Project URL and anon public key into `.env.local` (see `.env.local.example` in the repo root).
4. Storage bucket `cvs` is created by the migration for resume uploads (private, access controlled by RLS).
