import { NextResponse } from "next/server";
import { setCookie } from "nookies";
import { EncrouptionLogic } from "@/app/Helpers/helpersFunctions";

export async function POST(req: Request) {
  const { token, expires_in, user_profile } = await req.json();

  // Convert expires_in to seconds if necessary
  const maxAge = expires_in; // Assuming expires_in is already in seconds

  // Encrypt user profile data
  const encruptionProfile = EncrouptionLogic(user_profile);
  const wp_id = EncrouptionLogic(user_profile?.user?.workspace_id);

  // Create the response object
  const res = NextResponse.json({ success: true });

  setCookie({ res }, "token", token, {
    maxAge,
    path: "/",
    secure: true,
    sameSite: "strict",
    // httpOnly: true,
  });

  setCookie(
    { res },
    process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "",
    encruptionProfile,
    {
      maxAge,
      path: "/",
      secure: true,
      sameSite: "strict",
      // httpOnly: true,
    }
  );

  setCookie({ res }, process.env.NEXT_PUBLIC_COOKIE_WSID || "", wp_id, {
    maxAge,
    path: "/",
    secure: true,
    sameSite: "strict",
    // httpOnly: true,
  });

  return res;
}
