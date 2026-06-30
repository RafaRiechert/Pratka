"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, ClipboardList, LogOut, Trash2, Users } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import type { CompanyProfile, StudentProfile } from "@/lib/types";

export default function AdminDashboard({
  companies,
  students,
  totalApplications,
  appCountByCompany,
  appCountByStudent,
}: {
  companies: CompanyProfile[];
  students: StudentProfile[];
  totalApplications: number;
  appCountByCompany: Record<string, number>;
  appCountByStudent: Record<string, number>;
}) {
  const router = useRouter();
  const [companyList, setCompanyList] = useState(companies);
  const [studentList, setStudentList] = useState(students);
  const [removeCompany, setRemoveCompany] = useState<CompanyProfile | null>(null);
  const [removeStudent, setRemoveStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function confirmRemoveCompany() {
    if (!removeCompany) return;
    setLoading(true);
    const res = await fetch(`/api/admin/companies/${removeCompany.id}`, {
      method: "DELETE",
    });
    setLoading(false);
    if (res.ok) {
      setCompanyList((prev) => prev.filter((c) => c.id !== removeCompany.id));
    }
    setRemoveCompany(null);
  }

  async function confirmRemoveStudent() {
    if (!removeStudent) return;
    setLoading(true);
    const res = await fetch(`/api/admin/students/${removeStudent.id}`, {
      method: "DELETE",
    });
    setLoading(false);
    if (res.ok) {
      setStudentList((prev) => prev.filter((s) => s.id !== removeStudent.id));
    }
    setRemoveStudent(null);
  }

  return (
    <div className="min-h-screen bg-navy-deep px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-extrabold text-offwhite">
            Pratka <span className="text-gradient-lime">Admin</span>
          </h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut size={16} /> Sair
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <GlassCard className="flex items-center gap-4 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/15 text-lime">
              <Users size={20} />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-offwhite">
                {studentList.length}
              </div>
              <div className="text-sm text-offwhite/55">Estudantes</div>
            </div>
          </GlassCard>
          <GlassCard className="flex items-center gap-4 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/20 text-purple-soft">
              <Building2 size={20} />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-offwhite">
                {companyList.length}
              </div>
              <div className="text-sm text-offwhite/55">Empresas</div>
            </div>
          </GlassCard>
          <GlassCard className="flex items-center gap-4 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-offwhite/70">
              <ClipboardList size={20} />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-offwhite">
                {totalApplications}
              </div>
              <div className="text-sm text-offwhite/55">Candidaturas</div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-offwhite">Empresas</h2>
          <GlassCard className="mt-4 overflow-x-auto p-0">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-offwhite/50">
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">Setor</th>
                  <th className="px-5 py-3 font-medium">Cadastro</th>
                  <th className="px-5 py-3 font-medium">Vagas</th>
                  <th className="px-5 py-3 font-medium">Candidaturas</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {companyList.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-white/5 text-offwhite/80 last:border-0"
                  >
                    <td className="px-5 py-3">{c.company_name}</td>
                    <td className="px-5 py-3">{c.sector}</td>
                    <td className="px-5 py-3">
                      {new Date(c.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-5 py-3">{c.num_openings ?? 0}</td>
                    <td className="px-5 py-3">{appCountByCompany[c.id] ?? 0}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          c.is_active
                            ? "bg-lime/15 text-lime"
                            : "bg-white/10 text-offwhite/50"
                        }`}
                      >
                        {c.is_active ? "Ativa" : "Encerrada"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRemoveCompany(c)}
                      >
                        <Trash2 size={14} /> Remover
                      </Button>
                    </td>
                  </tr>
                ))}
                {companyList.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-offwhite/40">
                      Nenhuma empresa cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </GlassCard>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-offwhite">Estudantes</h2>
          <GlassCard className="mt-4 overflow-x-auto p-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-offwhite/50">
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">E-mail</th>
                  <th className="px-5 py-3 font-medium">Universidade</th>
                  <th className="px-5 py-3 font-medium">Candidaturas</th>
                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {studentList.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-white/5 text-offwhite/80 last:border-0"
                  >
                    <td className="px-5 py-3">
                      {s.name} {s.surname}
                    </td>
                    <td className="px-5 py-3">{s.email}</td>
                    <td className="px-5 py-3">{s.university || "—"}</td>
                    <td className="px-5 py-3">{appCountByStudent[s.id] ?? 0}</td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRemoveStudent(s)}
                      >
                        <Trash2 size={14} /> Remover
                      </Button>
                    </td>
                  </tr>
                ))}
                {studentList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-offwhite/40">
                      Nenhum estudante cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </GlassCard>
        </div>
      </div>

      <ConfirmModal
        open={!!removeCompany}
        title="Remover empresa?"
        description={`Tem certeza que deseja remover ${removeCompany?.company_name}? Essa ação não pode ser desfeita.`}
        confirmLabel="Remover"
        loading={loading}
        onConfirm={confirmRemoveCompany}
        onCancel={() => setRemoveCompany(null)}
      />
      <ConfirmModal
        open={!!removeStudent}
        title="Remover aluno?"
        description={`Tem certeza que deseja remover ${removeStudent?.name} ${removeStudent?.surname}? Essa ação não pode ser desfeita.`}
        confirmLabel="Remover"
        loading={loading}
        onConfirm={confirmRemoveStudent}
        onCancel={() => setRemoveStudent(null)}
      />
    </div>
  );
}
