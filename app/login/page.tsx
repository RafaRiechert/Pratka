import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar — Pratka",
};

export default function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Bem-vindo de volta" title="Entrar" />
      <section className="px-6 pb-28">
        <LoginForm />
      </section>
    </>
  );
}
