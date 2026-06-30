"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import PageHero from "@/components/ui/page-hero";
import ProfileTabs from "@/components/perfil/profile-tabs";
import AlunoDados from "@/components/perfil/aluno-dados";
import AlunoAplicacoes from "@/components/perfil/aluno-aplicacoes";

export default function PerfilAlunoPage() {
  const router = useRouter();
  const { user, userType, loading } = useAuth();
  const [tab, setTab] = useState("dados");

  useEffect(() => {
    if (loading) return;
    if (!user) router.push("/login?redirect=/perfil/aluno");
    else if (userType === "empresa") router.push("/perfil/empresa");
  }, [loading, user, userType, router]);

  if (loading || !user || userType === "empresa") return null;

  return (
    <>
      <PageHero eyebrow="Sua conta" title="Perfil" />
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <ProfileTabs
          layoutId="aluno-tabs"
          tabs={[
            { id: "dados", label: "Seus dados" },
            { id: "aplicacoes", label: "Suas aplicações" },
          ]}
          active={tab}
          onChange={setTab}
        />
        {tab === "dados" ? <AlunoDados /> : <AlunoAplicacoes />}
      </section>
    </>
  );
}
