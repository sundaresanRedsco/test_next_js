export const ROUTES = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  POST: "/posts/[id]",
};

export const getPostUrl = (id: string) => `/posts/${id}`;
