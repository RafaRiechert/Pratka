import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { CompanyProfile, StudentProfile } from "@/lib/types";
import AdminLogin from "@/components/admin/admin-login";
import AdminDashboard from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin — Pratka",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) return <AdminLogin />;

  const isSupabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!isSupabaseConfigured) {
    return (
      <AdminDashboard
        companies={[]}
        students={[]}
        totalApplications={0}
        appCountByCompany={{}}
        appCountByStudent={{}}
      />
    );
  }

  const admin = createAdminClient();
  const [{ data: companies }, { data: students }, { count: totalApplications }, { data: applications }] =
    await Promise.all([
      admin.from("company_profiles").select("*").order("created_at", { ascending: false }),
      admin.from("student_profiles").select("*").order("created_at", { ascending: false }),
      admin.from("applications").select("*", { count: "exact", head: true }),
      admin.from("applications").select("student_id, company_id"),
    ]);

  const appCountByCompany: Record<string, number> = {};
  const appCountByStudent: Record<string, number> = {};
  (applications ?? []).forEach((a: { student_id: string; company_id: string }) => {
    appCountByCompany[a.company_id] = (appCountByCompany[a.company_id] ?? 0) + 1;
    appCountByStudent[a.student_id] = (appCountByStudent[a.student_id] ?? 0) + 1;
  });

  return (
    <AdminDashboard
      companies={(companies ?? []) as CompanyProfile[]}
      students={(students ?? []) as StudentProfile[]}
      totalApplications={totalApplications ?? 0}
      appCountByCompany={appCountByCompany}
      appCountByStudent={appCountByStudent}
    />
  );
}
