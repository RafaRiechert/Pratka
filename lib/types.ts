export type ApplicationStatus =
  | "enviada"
  | "em_analise"
  | "nao_selecionado"
  | "programa_encerrado";

export interface StudentProfile {
  id: string;
  name: string | null;
  surname: string | null;
  email: string | null;
  country: string | null;
  phone: string | null;
  city: string | null;
  cpf: string | null;
  sexual_orientation: string | null;
  race_ethnicity: string | null;
  disability: string | null;
  cv_url: string | null;
  linkedin_url: string | null;
  degree: string | null;
  school: string | null;
  education_level: string | null;
  university: string | null;
  course: string | null;
  graduation_year: number | null;
  how_found_pratka: string | null;
  profile_complete: boolean;
  created_at: string;
}

export interface CompanyProfile {
  id: string;
  company_name: string | null;
  cnpj: string | null;
  corporate_email: string | null;
  contact_name: string | null;
  contact_role: string | null;
  contact_info: string | null;
  logo_url: string | null;
  description: string | null;
  sector: string | null;
  website: string | null;
  program_city: string | null;
  program_state: string | null;
  summer_period: string | null;
  num_openings: number | null;
  program_areas: string | null;
  is_paid: boolean;
  stipend_amount: string | null;
  requirements: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Application {
  id: string;
  student_id: string;
  company_id: string;
  status: ApplicationStatus;
  applied_at: string;
}

export interface ApplicationWithCompany extends Application {
  company_profiles: CompanyProfile;
}

export interface ApplicationWithStudent extends Application {
  student_profiles: StudentProfile;
}

export interface CompanyListItem extends CompanyProfile {
  isNew: boolean;
}
