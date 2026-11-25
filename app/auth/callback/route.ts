import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { landingPath } from "@/lib/supabase/profile";

// OAuth(구글/카카오) 및 이메일 인증 링크가 돌아오는 곳
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${await landingPath(supabase)}`);
  }
  return NextResponse.redirect(`${origin}/login?error=oauth`);
}
