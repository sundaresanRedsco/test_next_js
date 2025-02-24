import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/"], // Apply middleware only for the home page
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    // If the user is not authenticated, redirect to /signin
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Allow the request if the user is authenticated
  return NextResponse.next();
}
