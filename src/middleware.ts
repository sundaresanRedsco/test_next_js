import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

export const config = {
  matcher: [
    "/",
    "/sign/signup",
    "/userId/:userId/workspaceId/:workspaceId",
    "/userId/:userId",
  ], // Only trigger on these paths
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
  const isOnboarding = req.cookies.get("onboarding")?.value;
  if (
    !token &&
    pathname != "/sign" &&
    pathname != "/sign/signup" &&
    pathname != "/"
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  // if (token) {
  //   if (isOnboarding && pathname != "/sign") {
  //     url.pathname = "/sign";
  //     return NextResponse.redirect(url);
  //   } else if (!pathname.includes("/userId")) {
  //     url.pathname = "/userId/" + tokenData?.user_id;
  //     return NextResponse.redirect(url);
  //   }
  // }

  console.log("middleWare", pathname);

  const tokenExpiresAt: any = tokenData?.expiration_time?.toString();
  const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
  const currentDate = new Date();
  if (token && currentDate > expirationDate) {
    url.pathname = "/sign";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
