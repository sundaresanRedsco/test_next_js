"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act, useEffect, useState } from "react";
import { useSignUpStore } from "./sign/signZustand";
import Cookies from "js-cookie";

export default function useSecuredRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  const userId: any = data?.user?.user_id;

  const {
    setactiveStep,
    setFormDataStore,
    setIsLoading,
    formDataStore,
    isLoading,
  } = useSignUpStore();
  const [isTokenExpired, setisTokenExpired] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (status === "loading") return;

    const token = data?.user?.token;

    const publicRoutes = ["/", "/sign", "/sign/signup"];
    const tokenExpiresAt: any = data?.user?.expiration_time?.toString();
    const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
      setisTokenExpired(true);
      router.push("/");
      router.refresh();
    } else {
      setisTokenExpired(false);
    }
    const isOnboarding = Cookies.get(userId) || false;
    const invite_token = searchParams.get("invite_token");
    if (!formDataStore?.authType && token && !pathname.includes("/userId")) {
      Cookies.remove(userId);
      router.replace("/");
    }
    if (isOnboarding) {
      if (token && pathname != "/sign/signup") {
        setIsLoading(false);
        router.replace("/sign/signup");
        Cookies.set(userId, "onboarding");
        setFormDataStore("currentPage", "SignUp");
      }
      setFormDataStore("currentPage", "SignUp");
    }
    if (invite_token) {
      setactiveStep(0);
      setFormDataStore("currentPage", "SignUp");
      setFormDataStore("invite_token", invite_token);
    }
  }, [userId, pathname, status, isLoading]);
}
