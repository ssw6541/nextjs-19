import Link from "next/link";
import { connection } from "next/server";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";
import { logoutAction } from "@/app/actions/auth";
import Avatar from "./Avatar";

async function getCurrent() {
  await connection(); // 세션 확인은 요청마다 실행 (프리렌더 제외)
  if (!hasSupabaseEnv()) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    const profile = await getProfile(supabase, data.user.id).catch(() => null);
    const meta = data.user.user_metadata ?? {};
    return {
      name:
        profile?.name ?? meta.name ?? meta.full_name ?? meta.nickname ?? data.user.email ?? "회원",
      avatar: profile?.avatar_url ?? meta.avatar_url ?? meta.picture ?? null,
    };
  } catch {
    return null;
  }
}

export default async function UserMenu() {
  const me = await getCurrent();

  if (me) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <Link href="/profile" className="flex items-center gap-2 font-medium hover:opacity-80" title="내 프로필">
          <Avatar src={me.avatar} name={me.name} size={32} />
          <span>{me.name}님</span>
        </Link>
        <form action={logoutAction}>
          <button className="rounded-full border border-current/40 px-4 py-1.5 hover:bg-black/5">
            로그아웃
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link href="/login" className="px-3 py-1.5 font-medium hover:opacity-70">
        로그인
      </Link>
      <Link
        href="/signup"
        className="rounded-full bg-accent px-4 py-1.5 font-medium text-brand-dark hover:brightness-105"
      >
        회원가입
      </Link>
    </div>
  );
}
