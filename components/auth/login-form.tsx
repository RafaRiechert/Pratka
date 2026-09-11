"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import PanelCard from "@/components/ui/panel-card";
import { Field, Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError("Não foi possível entrar. Verifique seu e-mail e senha.");
      return;
    }
    router.push("/");
  }

  return (
    <PanelCard className="mx-auto max-w-md border-t-2 border-t-ink p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="E-mail">
          <Input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Senha">
          <Input
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        <p className="border-t border-line pt-5 text-center text-sm text-ink-soft">
          Ainda não tem conta?{" "}
          <Link href="/cadastro" className="focus-ring rounded-input font-semibold text-accent-deep underline underline-offset-4">
            Cadastre-se
          </Link>
        </p>
      </form>
    </PanelCard>
  );
}
