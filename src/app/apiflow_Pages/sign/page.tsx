"use client";
import OnBoardLayout from "@/app/apiflow_components/sign/OnBoardLayout";
import SignIn from "@/app/apiflow_components/sign/sign-in";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import useSignIn from "@/app/hooks/sign/useSignIn";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useEffect, useState } from "react";

type Props = {};

export default function SignInPage({}: Props) {
  const { CLIENT_ID } = useSignIn();
  const { setFormDataStore, setIsLoading } = useSignUpStore();
  const [isClient, setisClient] = useState(false);
  useEffect(() => {
    setFormDataStore("currentPage", "Login");
    setisClient(true);
    setIsLoading(false);
  }, []);

  return (
    <OnBoardLayout steps={[]}>
      {isClient && (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <SignIn />
        </GoogleOAuthProvider>
      )}
    </OnBoardLayout>
  );
}
