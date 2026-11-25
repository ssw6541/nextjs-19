"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ProfileState = { error?: string; message?: string };

const MAX_AVATAR = 2 * 1024 * 1024;
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  return { supabase, user: data.user };
}

const text = (fd: FormData, key: string, max = 50) => {
  const v = String(fd.get(key) ?? "").trim();
  return v ? v.slice(0, max) : null;
};

export async function saveProfileAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const { supabase, user } = await requireUser();

  const gender = String(formData.get("gender") ?? "");
  if (gender && !["male", "female", "other"].includes(gender))
    return { error: "성별 값이 올바르지 않습니다." };

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    name: text(formData, "name"),
    school: text(formData, "school"),
    department: text(formData, "department"),
    gender: gender || null,
    hobby: text(formData, "hobby", 100),
    specialty: text(formData, "specialty", 100),
    onboarded: true,
  });
  if (error) return { error: `저장하지 못했습니다. (${error.message})` };

  revalidatePath("/", "layout");
  return { message: "저장되었습니다." };
}

// 첫 로그인 안내에서 "나중에 입력할게요"
export async function skipOnboardingAction() {
  const { supabase, user } = await requireUser();
  await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email, onboarded: true });
  revalidatePath("/", "layout");
  redirect("/");
}

export async function uploadAvatarAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const { supabase, user } = await requireUser();

  const file = formData.get("avatar");
  if (!(file instanceof File) || file.size === 0)
    return { error: "이미지를 선택해주세요." };
  const ext = TYPES[file.type];
  if (!ext) return { error: "JPG, PNG, WEBP 이미지만 올릴 수 있습니다." };
  if (file.size > MAX_AVATAR) return { error: "이미지는 2MB 이하여야 합니다." };

  const path = `${user.id}/avatar.${ext}`;
  // 확장자가 바뀌어도 파일이 하나만 남도록 이전 파일을 정리합니다.
  await supabase.storage
    .from("avatars")
    .remove(Object.values(TYPES).map((e) => `${user.id}/avatar.${e}`));
  const { error: upErr } = await supabase.storage
    .from("avatars")
    .upload(path, file, { contentType: file.type, upsert: true });
  if (upErr) return { error: `업로드하지 못했습니다. (${upErr.message})` };

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    avatar_url: `${data.publicUrl}?v=${Date.now()}`,
  });
  if (error) return { error: `저장하지 못했습니다. (${error.message})` };

  revalidatePath("/", "layout");
  return { message: "프로필 사진이 변경되었습니다." };
}

export async function deleteAccountAction(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const { supabase, user } = await requireUser();

  if (String(formData.get("confirm") ?? "").trim() !== "탈퇴")
    return { error: "확인 문구로 '탈퇴'를 정확히 입력해주세요." };

  // 계정이 사라지면 본인 권한이 없어지므로, 아바타 파일을 먼저 정리합니다.
  await supabase.storage
    .from("avatars")
    .remove(Object.values(TYPES).map((e) => `${user.id}/avatar.${e}`));

  const { error } = await supabase.rpc("delete_my_account");
  if (error)
    return {
      error: `탈퇴 처리에 실패했습니다. (${error.message}) — supabase/profile.sql 의 4번을 실행했는지 확인해주세요.`,
    };

  try {
    await supabase.auth.signOut(); // 쿠키 정리
  } catch {
    // 계정이 이미 삭제되어 실패해도 무시
  }
  revalidatePath("/", "layout");
  redirect("/?withdrawn=1");
}

export async function removeAvatarAction(): Promise<ProfileState> {
  const { supabase, user } = await requireUser();
  await supabase.storage
    .from("avatars")
    .remove(Object.values(TYPES).map((e) => `${user.id}/avatar.${e}`));
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, email: user.email, avatar_url: null });
  if (error) return { error: `삭제하지 못했습니다. (${error.message})` };
  revalidatePath("/", "layout");
  return { message: "프로필 사진을 삭제했습니다." };
}
