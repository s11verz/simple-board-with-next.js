import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req: req });

  if (req.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/이동할 url"), req.url);
    }
  }

  req.cookies.get("쿠키이름");
  req.cookies.has("쿠키이름");
  req.cookies.delete("쿠키이름");

  const response = NextResponse.next();
  response.cookies.set({
    name: "mode",
    value: "dark",
    maxAge: 3600,
    httpOnly: true,
  });
  return response;
}
