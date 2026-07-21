"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import { Field, Input } from "@/components/ui/input";

export default function SignupForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    router.push("/");
  }

  return (
    <GlassCard className="mx-auto max-w-md p-8">
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Criando conta..." : "Cadastrar"}
        </Button>
        <p className="text-center text-sm text-ink-soft">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-tangerine-deep hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </GlassCard>
  );
}
