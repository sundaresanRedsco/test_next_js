"use client";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import React, { useState } from "react";
import SignInUpInputField from "../SignInUpInputField";
import { globalTranslate, signInUpTranslate } from "@/helpers/helpersFunctions";
import ReCAPTCHAForm from "../ReCaptcha";
import SignInUpButton from "../SignInUpButton";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";

type Props = {};

export default function ForgetPassword({}: Props) {
  const [email, setEmail] = useState("");
  const [emailErr, setemailErr] = useState("");

  const router = useRouter();

  return (
    <SignInUpLayout type="forgot-password">
      <SignInUpInputField
        label={globalTranslate(`EMAIL_LABEL`, "sigInUpConstants")}
        placeholder={globalTranslate(`EMAIL_PLACEHOLDER`, "sigInUpConstants")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type={"email"}
        error={emailErr}
      />
      <ReCAPTCHAForm />

      <SignInUpButton
        text={signInUpTranslate(`forgot-password.BUTTON`, "sigInUpConstants")}
        onClick={(e: any) => {
          e.preventDefault();
          router.push(ROUTES.RESET + "cdddduhuwioedjbjjjjjjjjj");
        }}
      />
    </SignInUpLayout>
  );
}
