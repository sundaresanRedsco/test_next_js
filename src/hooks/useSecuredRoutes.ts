"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act, useEffect, useState } from "react";
// import { useSignUpStore } from "./sign/signZustand";
import Cookies from "js-cookie";
import { useSignUpStore } from "@/store/useSignUpStore";

export default function useSecuredRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  // const userId: any = data?.user?.user_id;
  const userId: any = "";

  const {
    setactiveStep,
    setFormDataStore,
    setIsLoading,
    formDataStore,
    isLoading,
    // resetAllSignStoreData,
  } = useSignUpStore();
  const [isTokenExpired, setisTokenExpired] = useState(false);
  const searchParams = useSearchParams();
  const isOnboarding = Cookies.get(userId) ? true : false;

  useEffect(() => {
    if (status === "loading") return;

    // const token = data?.user?.token;
    const token = "";

    const publicRoutes = ["/", "/sign", "/sign/signup"];
    // const tokenExpiresAt: any = data?.user?.expiration_time?.toString();
    const tokenExpiresAt: any = "";

    const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
      setisTokenExpired(true);
      router.push("/");
      router.refresh();
    } else {
      setisTokenExpired(false);
    }
    const invite_token = searchParams?.get("invite_token");
    if (!formDataStore?.authType && token && !pathname?.includes("/userId")) {
      Cookies.remove(userId);
      // router.push("/userId/" + data?.user?.user_id);
      router.push("/userId/" + "");

      // resetAllSignStoreData();
    }

    if (isOnboarding) {
      if (token && pathname != "/sign/signup") {
        router.replace("/sign/signup");
        setFormDataStore("currentPage", "SignUp");
      }
      setFormDataStore("currentPage", "SignUp");
    }
    if (invite_token) {
      setFormDataStore("invite_token", invite_token);
    }
    if (invite_token && pathname != "/sign/signup") {
      setactiveStep(0);
      setFormDataStore("currentPage", "SignUp");
      setFormDataStore("invite_token", invite_token);
      router.replace("/sign/signup?invite_token=" + invite_token);
    }
  }, [isOnboarding, userId, pathname, status, isLoading, isTokenExpired]);
}
