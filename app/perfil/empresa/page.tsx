"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import PageHero from "@/components/ui/page-hero";
import ProfileTabs from "@/components/perfil/profile-tabs";
import EmpresaDados from "@/components/perfil/empresa-dados";
import EmpresaAplicacoes from "@/components/perfil/empresa-aplicacoes";
import EmpresaVagas from "@/components/perfil/empresa-vagas";
import EmpresaConfiguracoes from "@/components/perfil/empresa-configuracoes";

export default function PerfilEmpresaPage() {
  const router = useRouter();
  const { user, userType, loading } = useAuth();
  const [tab, setTab] = useState("dados");

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login?redirect=/perfil/empresa");
    else if (userType === "aluno") router.push("/perfil/aluno");
  }, [loading, user, userType, router]);

  if (loading || !user || userType === "aluno") return null;

  return (
    <>
      <PageHero eyebrow="Sua conta" title="Perfil da empresa" />
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <ProfileTabs
          layoutId="empresa-tabs"
          tabs={[
            { id: "dados", label: "Dados da empresa" },
            { id: "aplicacoes", label: "Aplicações" },
            { id: "vagas", label: "Editar vagas" },
            { id: "config", label: "Configurações" },
          ]}
          active={tab}
          onChange={setTab}
        />
        {tab === "dados" && <EmpresaDados />}
        {tab === "aplicacoes" && <EmpresaAplicacoes />}
        {tab === "vagas" && <EmpresaVagas />}
        {tab === "config" && <EmpresaConfiguracoes />}
      </section>
    </>
  );
}
