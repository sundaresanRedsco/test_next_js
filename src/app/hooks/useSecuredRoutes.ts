import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { act, useEffect, useState } from "react";
import { getItems, setItem } from "../Services/localstorage";
import { useSignUpStore } from "./sign/signZustand";

export default function useSecuredRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  const { setactiveStep, setFormDataStore, setIsLoading, activeStep } =
    useSignUpStore();
  const [isTokenExpired, setisTokenExpired] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (status === "loading") return;

    const token = data?.user?.token;

    const protectedRoutes = ["/", "/userId"];
    const publicRoutes = [
      "/sign",
      "/sign/signup",
      "/sign/signup/otp-verification",
      "/sign/forget-password/forget-password-otp",
      "/sign/signup/company",
      "/sign/forget-password",
    ];
    const tokenExpiresAt: any = data?.user?.expiration_time?.toString();
    const expirationDate = new Date(parseInt(tokenExpiresAt) * 1000);
    const currentDate = new Date();

    if (currentDate > expirationDate) {
      setisTokenExpired(true);
      router.push("/sign");
      router.refresh();
    } else {
      setisTokenExpired(false);
    }
    const isOnboarding = getItems(`userId/${data?.user?.user_id}`);
    const invite_token = searchParams.get("invite_token");

    if (!isOnboarding) {
      if (token && publicRoutes.includes(pathname) && !isTokenExpired) {
        setIsLoading(false);
        router.replace(`/userId/${data?.user?.user_id}`);
      } else if (!token && !publicRoutes.includes(pathname)) {
        router.push("/sign");
      } else if (
        (pathname == "/" || pathname == "/userId") &&
        token &&
        !isTokenExpired
      ) {
        router.replace(`/userId/${data?.user?.user_id}`);
      }
    } else if (isOnboarding && token) {
      setIsLoading(false);
      router.replace("/sign");
      // setactiveStep(1);
      setItem(`userId/${data?.user?.user_id}`, "onboarding");
      setFormDataStore("currentPage", "Sign Up");
    }
    if (invite_token) {
      setactiveStep(0);
      setFormDataStore("currentPage", "Sign Up");
      setFormDataStore("invite_token", invite_token);
    }
  }, [data, pathname, router, status]);
}
