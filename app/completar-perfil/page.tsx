import { Suspense } from "react";
import type { Metadata } from "next";
import CompletarPerfilForm from "@/components/auth/completar-perfil-form";

export const metadata: Metadata = {
  title: "Completar perfil — Pratka",
};

export default function CompletarPerfilPage() {
  return (
    <Suspense fallback={null}>
      <CompletarPerfilForm />
    </Suspense>
  );
}
