# Pratka

"Handshake for Brazil" — connects university students to companies offering
summer internship programs.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Supabase (Postgres + Auth + Storage)
- Framer Motion, Lucide React

## Getting started

```bash
npm install
cp .env.local.example .env.local
```

Then set up Supabase (see `supabase/README.md`) and fill in `.env.local`
with your project's URL, anon key, and service role key.

```bash
npm run dev
```

The app runs without Supabase configured (degrades to logged-out/empty
states), but auth, applications, and the admin panel need it connected.

## Admin panel

Hidden at `/admin` (not linked from the navbar). Login is a hardcoded
credential check (not a Supabase user) — see `lib/admin-auth.ts`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
