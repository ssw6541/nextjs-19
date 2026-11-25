import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";
import { AvatarForm, DeleteAccountForm, InfoForm } from "@/components/ProfileForms";

export const metadata: Metadata = { title: "내 프로필 | church19" };

async function ProfileContent() {
  await connection(); // 로그인 세션은 요청마다 확인
  if (!hasSupabaseEnv()) redirect("/login?error=env");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) redirect("/login");

  const profile = await getProfile(supabase, user.id);
  const meta = user.user_metadata ?? {};
  const name =
    profile?.name ?? meta.name ?? meta.full_name ?? meta.nickname ?? "";
  const avatar = profile?.avatar_url ?? meta.avatar_url ?? meta.picture ?? null;
  const onboarded = profile?.onboarded ?? false;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {!onboarded && (
        <div className="rounded-2xl bg-brand p-6 text-white">
          <p className="text-lg font-bold">{name ? `${name}님, ` : ""}church19에 오신 것을 환영합니다 🎉</p>
          <p className="mt-1 text-sm text-white/80">
            프로필 사진과 개인정보를 입력해 보세요. 모든 항목은 선택이며 나중에 언제든 수정할 수 있습니다.
          </p>
        </div>
      )}

      <section className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-5 text-lg font-bold text-brand-dark">프로필 사진</h2>
        <AvatarForm avatarUrl={avatar} name={name || user.email || null} />
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-1 text-lg font-bold text-brand-dark">개인정보</h2>
        <p className="mb-5 text-sm text-foreground/60">계정: {user.email ?? "이메일 없음 (소셜 로그인)"}</p>
        <InfoForm
          onboarded={onboarded}
          values={{
            name,
            school: profile?.school ?? "",
            department: profile?.department ?? "",
            gender: profile?.gender ?? "",
            hobby: profile?.hobby ?? "",
            specialty: profile?.specialty ?? "",
          }}
        />
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 text-lg font-bold text-brand-dark">계정</h2>
        <DeleteAccountForm />
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="bg-muted px-5 pb-20 pt-32">
      <h1 className="sr-only">내 프로필</h1>
      <Suspense fallback={<p className="py-20 text-center text-foreground/50">불러오는 중...</p>}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}
