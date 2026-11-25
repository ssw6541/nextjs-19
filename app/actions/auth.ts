"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { landingPath } from "@/lib/supabase/profile";

export type FormState = {
  error?: string;
  message?: string;
  values?: Record<string, string>;
};

const NO_ENV =
  "Supabase 환경변수가 설정되지 않았습니다. .env.local을 확인해주세요.";

async function getOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

function translate(msg: string) {
  if (/invalid login credentials/i.test(msg)) return "이메일 또는 비밀번호가 올바르지 않습니다.";
  if (/email not confirmed/i.test(msg)) return "이메일 인증이 필요합니다. 메일함을 확인해주세요.";
  if (/already registered/i.test(msg)) return "이미 가입된 이메일입니다.";
  if (/rate limit/i.test(msg)) return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  return msg;
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "이메일과 비밀번호를 입력해주세요.", values: { email } };
  if (!hasSupabaseEnv()) return { error: NO_ENV, values: { email } };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: translate(error.message), values: { email } };
  redirect(await landingPath(supabase));
}

export async function signupAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const values = { name, email };

  if (!name) return { error: "이름을 입력해주세요.", values };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "올바른 이메일 형식이 아닙니다.", values };
  if (password.length < 8) return { error: "비밀번호는 8자 이상이어야 합니다.", values };
  if (password !== confirm) return { error: "비밀번호 확인이 일치하지 않습니다.", values };
  if (formData.get("agree") !== "on") return { error: "이용약관 및 개인정보 처리방침에 동의해주세요.", values };
  if (!hasSupabaseEnv()) return { error: NO_ENV, values };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${await getOrigin()}/auth/callback`,
    },
  });
  if (error) return { error: translate(error.message), values };

  // 이미 가입된 이메일은 보안상 identities 가 비어서 돌아옵니다.
  if (data.user && data.user.identities?.length === 0)
    return { error: "이미 가입된 이메일입니다.", values };

  // 이메일 인증을 켜둔 경우 session 이 없습니다.
  if (!data.session)
    return { message: `${email} 로 인증 메일을 보냈습니다. 메일의 링크를 눌러 가입을 완료해주세요.` };

  redirect(await landingPath(supabase));
}

export async function socialAction(provider: "google" | "kakao") {
  if (!hasSupabaseEnv()) redirect("/login?error=env");
  // 카카오는 비즈 앱이 아니어도 되도록 직접 구현한 흐름(/auth/kakao)을 사용합니다.
  if (provider === "kakao") redirect("/auth/kakao");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${await getOrigin()}/auth/callback`,
    },
  });
  if (error || !data.url) redirect("/login?error=oauth");
  redirect(data.url);
}

export async function logoutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/");
}
