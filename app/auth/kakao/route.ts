import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// 1단계: 카카오 로그인 화면으로 보냅니다. (account_email 은 요청하지 않습니다)
export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl;
  const clientId = process.env.KAKAO_CLIENT_ID;
  if (!clientId) return NextResponse.redirect(`${origin}/login?error=env`);

  const state = randomUUID();
  (await cookies()).set("kakao_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.startsWith("https"),
    maxAge: 600,
    path: "/",
  });

  const url = new URL("https://kauth.kakao.com/oauth/authorize");
  url.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/auth/kakao/callback`,
    response_type: "code",
    scope: "openid profile_nickname profile_image",
    state,
  }).toString();
  return NextResponse.redirect(url);
}
