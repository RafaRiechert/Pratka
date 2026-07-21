# Pratka

Um catálogo com todas as empresas do Brasil que oferecem programas de
summer internship para undergrads, com link direto para a página de
inscrição de cada uma. A Pratka não intermedia a candidatura — é um site
de display.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion, Lucide React
- Todos os dados das empresas são estáticos (`lib/companies.ts`) — não há
  banco de dados de empresas/candidaturas
- Supabase Auth — apenas para o login/cadastro básico de usuário
  (e-mail + senha). Não desbloqueia nenhuma funcionalidade extra ainda.

## Getting started

```bash
npm install
cp .env.local.example .env.local
```

Preencha `.env.local` com a URL e a anon key do seu projeto Supabase
(Project Settings -> API). O site funciona sem isso configurado — só o
login/cadastro fica desativado.

No painel do Supabase, em Authentication -> Providers -> Email, desative
"Confirm email" para que o cadastro funcione sem verificação por e-mail.

```bash
npm run dev
```

## Adicionando ou editando empresas

Edite o array em `lib/companies.ts`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
