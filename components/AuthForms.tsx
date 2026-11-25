"use client";

import { useActionState } from "react";
import { loginAction, signupAction, type FormState } from "@/app/actions/auth";

const input =
  "h-13 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
const submit =
  "h-13 w-full rounded-2xl bg-brand text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg disabled:opacity-60";

function Field({ label, ...p }: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input {...p} className={input} />
    </label>
  );
}

function ErrorBox({ error }: { error?: string }) {
  return error ? (
    <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
      {error}
    </p>
  ) : null;
}

const initial: FormState = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);
  return (
    <form action={action} className="space-y-4">
      <Field label="이메일" name="email" type="email" autoComplete="email" required defaultValue={state.values?.email} placeholder="name@example.com" />
      <Field label="비밀번호" name="password" type="password" autoComplete="current-password" required placeholder="비밀번호" />
      <ErrorBox error={state.error} />
      <button className={submit} disabled={pending}>
        {pending ? "로그인 중..." : "이메일로 로그인"}
      </button>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signupAction, initial);
  return (
    <form action={action} className="space-y-4">
      <Field label="이름" name="name" autoComplete="name" required defaultValue={state.values?.name} placeholder="홍길동" />
      <Field label="이메일" name="email" type="email" autoComplete="email" required defaultValue={state.values?.email} placeholder="name@example.com" />
      <Field label="비밀번호 (8자 이상)" name="password" type="password" autoComplete="new-password" minLength={8} required />
      <Field label="비밀번호 확인" name="confirm" type="password" autoComplete="new-password" minLength={8} required />
      <label className="flex items-start gap-2 text-sm text-foreground/70">
        <input type="checkbox" name="agree" className="mt-0.5 h-4 w-4 accent-[var(--brand)]" />
        <span>이용약관 및 개인정보 처리방침에 동의합니다.</span>
      </label>
      <ErrorBox error={state.error} />
      {state.message && (
        <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.message}
        </p>
      )}
      <button className={submit} disabled={pending}>
        {pending ? "가입 중..." : "이메일로 회원가입"}
      </button>
    </form>
  );
}
