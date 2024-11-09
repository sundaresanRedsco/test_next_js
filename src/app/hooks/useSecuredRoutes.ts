import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getItems } from "../Services/localstorage";

export default function useSecuredRoutes() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();

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
    const isOnboarding = getItems(`userId/${data?.user?.user_id}`);
    if (!isOnboarding) {
      if (token && publicRoutes.includes(pathname)) {
        router.replace(`/userId/${data?.user?.user_id}`);
      } else if (!token && !publicRoutes.includes(pathname)) {
        router.push("/sign");
      }
    }
  }, [data, pathname, router, status]);
}
