-- Pratka initial schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.

create extension if not exists "pgcrypto";

create type application_status as enum (
  'enviada',
  'em_analise',
  'nao_selecionado',
  'programa_encerrado'
);

-- ---------------------------------------------------------------------------
-- student_profiles
-- ---------------------------------------------------------------------------
create table if not exists public.student_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  surname text,
  email text,
  country text,
  phone text,
  city text,
  cpf text,
  sexual_orientation text,
  race_ethnicity text,
  disability text,
  cv_url text,
  linkedin_url text,
  degree text,
  school text,
  education_level text,
  university text,
  course text,
  graduation_year int,
  how_found_pratka text,
  profile_complete boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;

create policy "Students can view their own profile"
  on public.student_profiles for select
  using (auth.uid() = id);

create policy "Students can insert their own profile"
  on public.student_profiles for insert
  with check (auth.uid() = id);

create policy "Students can update their own profile"
  on public.student_profiles for update
  using (auth.uid() = id);

-- Companies need to read the profile + CV of students who applied to them.
create policy "Companies can view profiles of their applicants"
  on public.student_profiles for select
  using (
    exists (
      select 1 from public.applications a
      where a.student_id = student_profiles.id
        and a.company_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- company_profiles
-- ---------------------------------------------------------------------------
create table if not exists public.company_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  company_name text,
  cnpj text,
  corporate_email text,
  contact_name text,
  contact_role text,
  contact_info text,
  logo_url text,
  description text,
  sector text,
  website text,
  program_city text,
  program_state text,
  summer_period text,
  num_openings int,
  program_areas text,
  is_paid boolean not null default false,
  stipend_amount text,
  requirements text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.company_profiles enable row level security;

-- The Empresas listing page is public: anyone can read active company programs.
create policy "Anyone can view active company profiles"
  on public.company_profiles for select
  using (is_active = true);

create policy "Companies can view their own profile"
  on public.company_profiles for select
  using (auth.uid() = id);

create policy "Companies can insert their own profile"
  on public.company_profiles for insert
  with check (auth.uid() = id);

create policy "Companies can update their own profile"
  on public.company_profiles for update
  using (auth.uid() = id);

create policy "Companies can delete their own profile"
  on public.company_profiles for delete
  using (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- applications
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.student_profiles (id) on delete cascade,
  company_id uuid not null references public.company_profiles (id) on delete cascade,
  status application_status not null default 'enviada',
  applied_at timestamptz not null default now(),
  unique (student_id, company_id)
);

alter table public.applications enable row level security;

create policy "Students can view their own applications"
  on public.applications for select
  using (auth.uid() = student_id);

create policy "Students can create their own applications"
  on public.applications for insert
  with check (auth.uid() = student_id);

create policy "Companies can view applications sent to them"
  on public.applications for select
  using (auth.uid() = company_id);

create policy "Companies can update status of applications sent to them"
  on public.applications for update
  using (auth.uid() = company_id);

-- ---------------------------------------------------------------------------
-- Storage: CV uploads
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('cvs', 'cvs', false)
on conflict (id) do nothing;

create policy "Students can upload their own CV"
  on storage.objects for insert
  with check (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Students can update their own CV"
  on storage.objects for update
  using (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Students can read their own CV"
  on storage.objects for select
  using (
    bucket_id = 'cvs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Companies can read CVs of their applicants"
  on storage.objects for select
  using (
    bucket_id = 'cvs'
    and exists (
      select 1 from public.applications a
      where a.company_id = auth.uid()
        and a.student_id::text = (storage.foldername(name))[1]
    )
  );
