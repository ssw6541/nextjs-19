import type { SupabaseClient } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  school: string | null;
  department: string | null;
  gender: "male" | "female" | "other" | null;
  hobby: string | null;
  specialty: string | null;
  onboarded: boolean;
};

export async function getProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<Profile | null> {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  return (data as Profile | null) ?? null;
}

// 로그인 직후 이동할 곳: 아직 개인정보 입력을 마치지(또는 건너뛰지) 않았다면 프로필 페이지
export async function landingPath(supabase: SupabaseClient): Promise<string> {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return "/";
    const profile = await getProfile(supabase, data.user.id);
    return profile?.onboarded ? "/" : "/profile";
  } catch {
    return "/";
  }
}
