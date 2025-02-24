export const ROUTES = {
  HOME: "/",
  SIGNUP: "/signup",
  SIGNIN: "/signin",
  FORGOT_PASSWORD: "/forgot-password", // Changed key from DASHBOARD to FORGOT_PASSWORD
  ONBOARDING: "/onboarding",
  ONBOARDING_EMAIL_VERIFICATION: "/onboarding/email-verification",
};

export const getPostUrl = (id: string) => `/posts/${id}`;
