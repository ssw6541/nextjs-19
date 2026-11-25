import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthShell, Divider, SocialButtons } from "@/components/AuthShell";
import { LoginForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "로그인 | church19" };

async function Notice({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const { error } = await searchParams;
  if (!error) return null;
  const msg =
    error === "env"
      ? "Supabase 환경변수가 설정되지 않았습니다."
      : "소셜 로그인에 실패했습니다. 다시 시도해주세요.";
  return (
    <p role="alert" className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
      {msg}
    </p>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <AuthShell title="로그인" subtitle="church19에 오신 것을 환영합니다.">
      <Suspense>
        <Notice searchParams={props.searchParams} />
      </Suspense>
      <SocialButtons verb="로그인" />
      <Divider>또는 이메일로</Divider>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-foreground/60">
        아직 회원이 아니신가요?{" "}
        <Link href="/signup" className="font-bold text-brand hover:underline">
          회원가입
        </Link>
      </p>
    </AuthShell>
  );
}
