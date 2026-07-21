import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import SignupForm from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Cadastrar — Pratka",
};

export default function CadastroPage() {
  return (
    <>
      <PageHero eyebrow="Crie sua conta" title="Cadastrar" />
      <section className="px-6 pb-28">
        <SignupForm />
      </section>
    </>
  );
}
