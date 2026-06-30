-- Seed data: 5 example companies so the Empresas page isn't empty on first load.
-- These are placeholder demo accounts (fake auth.users rows) — not meant to be logged into.
-- Safe to skip/delete in production once real companies start signing up.

do $$
declare
  v_id uuid;
  v_companies jsonb := '[
    {
      "email": "demo+aurora@pratka.app",
      "company_name": "Aurora Tech Solutions",
      "cnpj": "12.345.678/0001-90",
      "sector": "Tecnologia",
      "description": "Empresa de software B2B focada em automação de processos para o setor financeiro.",
      "website": "https://aurora-demo.example.com",
      "program_city": "São Paulo",
      "program_state": "SP",
      "summer_period": "Janeiro a Março de 2027",
      "num_openings": 12,
      "program_areas": "Engenharia de Software, Produto, Dados",
      "is_paid": true,
      "stipend_amount": "R$ 3.000/mês",
      "requirements": "Cursando Engenharia, Ciência da Computação ou áreas afins, a partir do 3º semestre."
    },
    {
      "email": "demo+vertex@pratka.app",
      "company_name": "Vertex Consultoria Estratégica",
      "cnpj": "23.456.789/0001-01",
      "sector": "Consultoria",
      "description": "Consultoria de gestão e estratégia para médias e grandes empresas brasileiras.",
      "website": "https://vertex-demo.example.com",
      "program_city": "Rio de Janeiro",
      "program_state": "RJ",
      "summer_period": "Dezembro de 2026 a Fevereiro de 2027",
      "num_openings": 8,
      "program_areas": "Estratégia, Finanças, Operações",
      "is_paid": true,
      "stipend_amount": "R$ 2.800/mês",
      "requirements": "Cursando Administração, Economia, Engenharia ou áreas correlatas."
    },
    {
      "email": "demo+nortebank@pratka.app",
      "company_name": "Norte Capital",
      "cnpj": "34.567.890/0001-12",
      "sector": "Financeiro",
      "description": "Instituição financeira independente com foco em investimentos e crédito para empresas.",
      "website": "https://nortecapital-demo.example.com",
      "program_city": "São Paulo",
      "program_state": "SP",
      "summer_period": "Janeiro a Fevereiro de 2027",
      "num_openings": 6,
      "program_areas": "Investment Banking, Risco, Operações Financeiras",
      "is_paid": true,
      "stipend_amount": "R$ 3.500/mês",
      "requirements": "Cursando Economia, Administração, Engenharia ou Ciências Atuariais."
    },
    {
      "email": "demo+bioverde@pratka.app",
      "company_name": "BioVerde Agroindústria",
      "cnpj": "45.678.901/0001-23",
      "sector": "Agronegócio",
      "description": "Empresa de agroindústria sustentável com operações em todo o Brasil.",
      "website": "https://bioverde-demo.example.com",
      "program_city": "Ribeirão Preto",
      "program_state": "SP",
      "summer_period": "Janeiro a Março de 2027",
      "num_openings": 10,
      "program_areas": "Engenharia Agronômica, Supply Chain, Sustentabilidade",
      "is_paid": true,
      "stipend_amount": "R$ 2.500/mês",
      "requirements": "Cursando Agronomia, Engenharia ou áreas relacionadas a sustentabilidade."
    },
    {
      "email": "demo+lumen@pratka.app",
      "company_name": "Lumen Saúde Digital",
      "cnpj": "56.789.012/0001-34",
      "sector": "Saúde",
      "description": "Healthtech que desenvolve soluções digitais para clínicas e hospitais.",
      "website": "https://lumensaude-demo.example.com",
      "program_city": "Belo Horizonte",
      "program_state": "MG",
      "summer_period": "Fevereiro a Abril de 2027",
      "num_openings": 5,
      "program_areas": "Produto, Design, Engenharia de Software",
      "is_paid": false,
      "stipend_amount": null,
      "requirements": "Cursando qualquer área de tecnologia, design ou saúde, a partir do 2º semestre."
    }
  ]'::jsonb;
  c jsonb;
begin
  for c in select * from jsonb_array_elements(v_companies)
  loop
    v_id := gen_random_uuid();

    insert into auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) values (
      v_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
      c->>'email', crypt(gen_random_uuid()::text, gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}', '{}',
      '', '', '', ''
    )
    on conflict (email) do nothing;

    insert into public.company_profiles (
      id, company_name, cnpj, corporate_email, contact_name, contact_role, contact_info,
      logo_url, description, sector, website,
      program_city, program_state, summer_period, num_openings,
      program_areas, is_paid, stipend_amount, requirements, is_active
    ) values (
      v_id, c->>'company_name', c->>'cnpj', c->>'email', 'Equipe de RH', 'Recrutamento', c->>'email',
      null, c->>'description', c->>'sector', c->>'website',
      c->>'program_city', c->>'program_state', c->>'summer_period', (c->>'num_openings')::int,
      c->>'program_areas', (c->>'is_paid')::boolean, c->>'stipend_amount', c->>'requirements', true
    )
    on conflict (id) do nothing;
  end loop;
end $$;
