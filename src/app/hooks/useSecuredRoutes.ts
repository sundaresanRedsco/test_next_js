import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getItems, setItem } from "../Services/localstorage";
import { useSignUpStore } from "./sign/signZustand";

export default function useSecuredRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  const { setactiveStep, setFormDataStore, setIsLoading } = useSignUpStore();
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
      console.log("Protected route: Token expired");
      router.push("/sign");
      router.refresh();
    }
    const isOnboarding = getItems(`userId/${data?.user?.user_id}`);

    if (!isOnboarding) {
      if (token && publicRoutes.includes(pathname)) {
        router.replace(`/userId/${data?.user?.user_id}`);
      } else if (!token && !publicRoutes.includes(pathname)) {
        router.push("/sign");
      } else if ((pathname == "/" || pathname == "/userId") && token) {
        router.replace(`/userId/${data?.user?.user_id}`);
      }
    } else {
      router.replace("/sign");
      setactiveStep(1);
      setItem(`userId/${data?.user?.user_id}`, "onboarding");
      setFormDataStore("currentPage", "Sign Up");
    }
  }, [data, pathname, router, status]);
}
