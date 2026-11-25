import Image from "next/image";
import type { ReactNode } from "react";
import { socialAction } from "@/app/actions/auth";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-svh lg:grid-cols-[1.1fr_1fr]">
      {/* 왼쪽 비주얼 (데스크톱) */}
      <aside className="relative hidden overflow-hidden bg-brand-dark lg:block">
        <Image
          src="/images/hero/slide-1.jpg"
          alt=""
          fill
          sizes="55vw"
          priority
          className="object-cover"
          style={{ animation: "kenburns 20s ease-out infinite alternate" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/30" />
        <div className="animate-float absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative flex h-full flex-col justify-end p-14 text-white">
          <p className="text-xs tracking-[0.3em] text-accent">WELCOME TO church19</p>
          <p className="fade-up mt-4 max-w-md text-4xl font-bold leading-tight">
            사람을 살리고,
            <br />
            키우고, 세우는 공동체
          </p>
          <p className="fade-up mt-4 max-w-sm text-white/70" style={{ animationDelay: "200ms" }}>
            함께 예배하고 서로 돌보며 자라가는 church19의 가족이 되어주세요.
          </p>
        </div>
      </aside>

      {/* 오른쪽 폼 */}
      <section className="flex items-center justify-center bg-background px-5 pb-16 pt-28">
        <div className="fade-up w-full max-w-md">
          <h1 className="text-4xl font-bold tracking-tight text-brand-dark">{title}</h1>
          <p className="mt-2 text-foreground/60">{subtitle}</p>
          <div className="mt-9">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function SocialButtons({ verb }: { verb: string }) {
  return (
    <div className="space-y-3">
      <form action={socialAction.bind(null, "kakao")}>
        <button className="flex h-13 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#FEE500] text-sm font-bold text-[#191919] transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="#191919"
              d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.69 6.75l-.95 3.5a.4.4 0 0 0 .6.43l4.1-2.72c.51.07 1.03.04 1.56.04 5.52 0 10-3.58 10-8S17.52 3 12 3Z"
            />
          </svg>
          카카오로 {verb}
        </button>
      </form>
      <form action={socialAction.bind(null, "google")}>
        <button className="flex h-13 w-full items-center justify-center gap-2.5 rounded-2xl border border-black/15 bg-white text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5Z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5Z" />
            <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1Z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48Z" />
          </svg>
          Google로 {verb}
        </button>
      </form>
    </div>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="my-7 flex items-center gap-3 text-xs text-foreground/40">
      <span className="h-px flex-1 bg-black/10" />
      {children}
      <span className="h-px flex-1 bg-black/10" />
    </div>
  );
}
