import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, Divider, SocialButtons } from "@/components/AuthShell";
import { SignupForm } from "@/components/AuthForms";

export const metadata: Metadata = { title: "회원가입 | church19" };

export default function SignupPage() {
  return (
    <AuthShell title="회원가입" subtitle="church19 가족이 되어주세요.">
      <SocialButtons verb="시작하기" />
      <Divider>또는 이메일로</Divider>
      <SignupForm />
      <p className="mt-6 text-center text-sm text-foreground/60">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-bold text-brand hover:underline">
          로그인
        </Link>
      </p>
    </AuthShell>
  );
}
