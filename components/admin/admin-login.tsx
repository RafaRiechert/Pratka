"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Credenciais inválidas.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh px-6">
      <GlassCard className="w-full max-w-sm p-8">
        <h1 className="text-center font-display text-2xl font-extrabold text-offwhite">
          Pratka <span className="text-gradient-lime">Admin</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <Field label="E-mail" required>
            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/30"
              />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
              />
            </div>
          </Field>
          <Field label="Senha" required>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/30"
              />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11"
              />
            </div>
          </Field>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-danger/10 px-3 py-2.5 text-sm text-danger">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full justify-center">
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </GlassCard>
    </div>
  );
}
