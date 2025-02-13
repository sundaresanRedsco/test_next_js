"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act, useEffect, useState } from "react";
import { getItems, removeItem, setItem } from "../Services/localstorage";
import { useSignUpStore } from "./sign/signZustand";

export default function useSecuredRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
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
    const onBoard = getItems(`userId/${data?.user?.user_id}`);
    const isOnboarding = onBoard ? true : false;
    const invite_token = searchParams.get("invite_token");

    if (isOnboarding) {
      if (token && pathname != "/sign/signup") {
        setIsLoading(false);
        router.replace("/sign/signup");
        // setactiveStep(1);
        setItem(`userId/${data?.user?.user_id}`, "onboarding");
        setFormDataStore("currentPage", "SignUp");
      }
      setFormDataStore("currentPage", "SignUp");
      if (!formDataStore?.authType) {
        removeItem(`userId/${data?.user?.user_id}`);
      }
    } else if (!isOnboarding) {
      if (token) {
        if (
          publicRoutes.includes(pathname) &&
          !isTokenExpired &&
          !pathname.includes("/userId")
        ) {
          setIsLoading(false);
          router.replace(`/userId/${data?.user?.user_id}`);
        } else if (
          (pathname == "/" || pathname == "/userId") &&
          !isTokenExpired
        ) {
          router.replace(`/userId/${data?.user?.user_id}`);
        }
      } else {
        if (!publicRoutes.includes(pathname)) {
          router.push("/");
        }
      }
    }
    if (invite_token) {
      setactiveStep(0);
      setFormDataStore("currentPage", "SignUp");
      setFormDataStore("invite_token", invite_token);
    }
  }, [data, pathname, status, isLoading]);
}
