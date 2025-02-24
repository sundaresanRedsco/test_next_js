"use client";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import React, { useState } from "react";
import SignInUpInputField from "../SignInUpInputField";
import { globalTranslate, signInUpTranslate } from "@/helpers/helpersFunctions";
import ReCAPTCHAForm from "../ReCaptcha";
import SignInUpButton from "../SignInUpButton";

type Props = {};

export default function ForgetPassword({}: Props) {
  const [email, setEmail] = useState("");
  const [emailErr, setemailErr] = useState("");

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
        onClick={() => {}}
      />
    </SignInUpLayout>
  );
}
