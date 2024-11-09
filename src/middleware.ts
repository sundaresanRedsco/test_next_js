import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieStore = cookies();
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("tokenNew", token);

  const WSID_Crypted =
    token?.workspace_id ||
    cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "")?.value;
  const WSID = WSID_Crypted ? WSID_Crypted : null;

  const protectedRoutes = ["/", "/userId"];
  const publicRoutes = [
    "/sign",
    "/sign/signup",
    "/sign/signup/otp-verification",
    "/sign/forget-password/forget-password-otp",
    "/sign/signup/company",
    "/sign/forget-password",
  ];

  const url = new URL(request.url);

  // Handle protected routes
  if (protectedRoutes.includes(url.pathname)) {
    if (!token) {
      // Token is missing, redirect to sign-in
      return NextResponse.redirect(new URL("/sign", request.url));
    }

    // Check token expiration
    const tokenExpiresAt: any = token?.expiration_time?.toString();
    console.log(tokenExpiresAt, "tokenExpiresAt");

    const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
      // Token expired, redirect to sign-in
      console.log("Protected route: Token expired");
      return NextResponse.redirect(new URL("/sign", request.url));
    }

    // Redirect to user workspace if accessing root
    if (url.pathname === "/" && WSID) {
      return NextResponse.redirect(
        new URL(`/userId/${token.user_id}/workspaceId/${WSID}/`, request.url)
      );
    } else if (url.pathname === "/" && !WSID) {
      return NextResponse.redirect(
        new URL(`/userId/${token.user_id}`, request.url)
      );
    }
  }

  // Handle public routes
  if (publicRoutes.includes(url.pathname)) {
    if (token) {
      // Redirect to user workspace if accessing root
      if (WSID) {
        return NextResponse.redirect(
          new URL(`/userId/${token.user_id}/workspaceId/${WSID}/`, request.url)
        );
      } else {
        return NextResponse.redirect(
          new URL(`/userId/${token.user_id}`, request.url)
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/userId/:userId/workspaceId/:workspaceId",
    "/userId/:userId",
    "/sign",
    "/sign/signup",
    "/sign/signup/otp-verification",
    "/sign/forget-password/forget-password-otp",
    "/sign/signup/company",
    "/sign/forget-password",
  ],
};
