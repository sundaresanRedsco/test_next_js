import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

export const config = {
  matcher: ["/", "/sign", "/sign/signup", "/userId/:userId*"], // Only trigger on these paths
};
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const url = req.nextUrl.clone();
  const tokenData = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const token = tokenData?.token;
  const userId = tokenData?.user_id;
  const isOnboarding =
    userId && req.cookies.get(String(userId))?.value ? true : false;

  const publicRoutes: any = ["/", "/sign", "/sign/signup"];

  if (pathname) {
    if (token) {
      if (isOnboarding && !publicRoutes.includes(pathname)) {
        url.pathname = "/sign/signup";
        return NextResponse.redirect(url);
      }
      if (!isOnboarding && !pathname.includes("/userId")) {
        url.pathname = "/userId/" + tokenData?.user_id;
        return NextResponse.redirect(url);
      }
    } else {
      if (!publicRoutes.includes(pathname)) {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }
  }

  const tokenExpiresAt: any = tokenData?.expiration_time?.toString();
  const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
  const currentDate = new Date();
  if (expirationDate && currentDate > expirationDate) {
    url.pathname = "/sign";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
