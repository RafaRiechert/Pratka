"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { CompanyProfile, StudentProfile } from "@/lib/types";

type UserType = "aluno" | "empresa" | null;

interface AuthContextValue {
  user: User | null;
  userType: UserType;
  studentProfile: StudentProfile | null;
  companyProfile: CompanyProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(
    async (currentUser: User | null) => {
      if (!currentUser) {
        setStudentProfile(null);
        setCompanyProfile(null);
        setUserType(null);
        return;
      }
      const metaType = currentUser.user_metadata?.user_type as
        | UserType
        | undefined;

      if (metaType === "empresa") {
        const { data } = await supabase
          .from("company_profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();
        setCompanyProfile(data as CompanyProfile | null);
        setStudentProfile(null);
        setUserType("empresa");
      } else {
        const { data } = await supabase
          .from("student_profiles")
          .select("*")
          .eq("id", currentUser.id)
          .maybeSingle();
        setStudentProfile(data as StudentProfile | null);
        setCompanyProfile(null);
        setUserType("aluno");
      }
    },
    [supabase]
  );

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      loadProfile(session?.user ?? null).finally(() => {
        if (mounted) setLoading(false);
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      loadProfile(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, loadProfile]);

  const refreshProfile = useCallback(async () => {
    await loadProfile(user);
  }, [user, loadProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        studentProfile,
        companyProfile,
        loading,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
