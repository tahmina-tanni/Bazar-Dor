import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hasSession = Boolean(
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token")
  );
  if (hasSession) return NextResponse.next();
  const signIn = new URL("/signin", request.url);
  signIn.searchParams.set("redirect", request.nextUrl.pathname);
  signIn.searchParams.set("reason", "auth-required");
  return NextResponse.redirect(signIn);
}

export const config = { matcher: ["/product/:path*", "/profile/:path*"] };
