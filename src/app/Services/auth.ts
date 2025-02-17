import axios from "../axios-client";
import Cookies from "js-cookie";
import { getSession, signOut } from "next-auth/react"; // Import getSession and signOut from NextAuth
import {
  EncrouptionLogic,
  getCookies,
  setCookies,
} from "../Helpers/helpersFunctions";
const environment = process.env.NODE_ENV;

export let adminUrl: any;
let googleClientId: any;
adminUrl = process.env.NEXT_PUBLIC_BASE_URL;
googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const DATE_FORMAT = "YYYY-MM-DD hh:mm:ss A";

// Fetch user profile from cookies or session
export async function getUserProfile(): Promise<any | null> {
  const data: any = await getSession(); // Fetch session from NextAuth

  const token: string | null =
    data?.user?.token || Cookies.get("token") || null;
  const userProfileStr =
    data?.user || getCookies(process.env.NEXT_PUBLIC_COOKIE_USERPROFILE ?? "");
  const tokenExpiresAt =
    data?.expiration_time || userProfileStr?.expiration_time?.toString();

  if (!token || !userProfileStr) {
    return null;
  }

  // Check if token is expired
  const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
  if (new Date() > expirationDate) {
    return null;
  }

  let userProfile: any | null;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  try {
    userProfile = userProfileStr;
  } catch (error) {
    console.error("Error parsing user profile:", error);
    return null;
  }

  return {
    user: userProfile,
    session_expire_time: tokenExpiresAt,
  };
}

// Initialize session after login
export async function initSession({
  token,
  expires_in,
  user_profile,
}: {
  token: string;
  expires_in: number;
  user_profile: any;
}) {
  // Fetch session again to ensure synchronization
  const data: any = await getSession();

  // Set the token in a cookie
  // setCookies("token", token,expires_in);
  // setCookies("token", token, expires_in);

  Cookies.set("token", token, {
    secure: true, // Set the cookie to be secure
    sameSite: "Strict", // Optional: SameSite policy (can be 'Lax', 'Strict', or 'None')
    expires: expires_in, // Optional: Set expiration in days
  });

  const encruptionProfile = EncrouptionLogic(user_profile);

  setCookies(
    process.env.NEXT_PUBLIC_COOKIE_USERPROFILE ?? "",
    encruptionProfile,
    expires_in
  );
  localStorage.setItem(
    process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "",
    encruptionProfile
  );

  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    // Send session data to the server for additional processing
    await axios.post("/api/initSessionServer", {
      token,
      expires_in,
      user_profile,
    });
  } catch (error) {}
}

// Login function, followed by session initialization
async function login(values: any): Promise<any> {
  // Simulate API call or adjust based on real API response
  const data: any = await getSession(); // Fetch session data after login

  if (data?.user_registered === "EXISTING_USER") {
    const access_token = data.user.token;
    const expires_in = data.expiration_time;

    if (data && expires_in) {
      await initSession({
        user_profile: data.user,
        token: access_token,
        expires_in,
      });
    }

    // Return user and expiration data
    return {
      user: data.user,
      session_expire_time: expires_in,
    };
  } else {
    return null;
  }
}

// Logout and clear session data
export async function logout() {
  await signOut({ redirect: false }); // Redirect to sign page after logout
  // Clear all cookies except those needed for login autofill
  const cookies = Object.keys(Cookies.get());
  cookies.forEach((cookie) => {
    if (cookie !== "LoginEmail" && cookie !== "LoginPassword") {
      Cookies.remove(cookie);
    }
  });

  localStorage.clear();
  sessionStorage.clear();
  delete axios.defaults.headers.common["Authorization"];

  // NextAuth sign out
}
