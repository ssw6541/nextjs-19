import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { landingPath } from "@/lib/supabase/profile";

// 2단계: 인증 코드를 ID 토큰으로 바꾸고, Supabase 세션을 만듭니다.
export async function GET(request: NextRequest) {
  const { origin, searchParams } = request.nextUrl;
  const fail = (reason = "oauth") =>
    NextResponse.redirect(`${origin}/login?error=${reason}`);

  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const jar = await cookies();
  const savedState = jar.get("kakao_state")?.value;
  jar.delete("kakao_state");

  if (!code || !state || state !== savedState) return fail();

  const clientId = process.env.KAKAO_CLIENT_ID;
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;
  if (!clientId) return fail("env");

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: `${origin}/auth/kakao/callback`,
    code,
  });
  if (clientSecret) body.set("client_secret", clientSecret);

  const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    body,
    cache: "no-store",
  });
  if (!tokenRes.ok) {
    console.error("[kakao] token error", tokenRes.status, await tokenRes.text());
    return fail();
  }
  const { id_token } = (await tokenRes.json()) as { id_token?: string };
  if (!id_token) {
    console.error("[kakao] id_token 없음 — 카카오 콘솔에서 OpenID Connect 활성화를 확인하세요.");
    return fail();
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithIdToken({
    provider: "kakao",
    token: id_token,
  });
  if (error) {
    console.error("[kakao] supabase error", error.message);
    return fail();
  }
  return NextResponse.redirect(`${origin}${await landingPath(supabase)}`);
}
