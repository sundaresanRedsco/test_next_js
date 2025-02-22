"use client";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import React, { useState } from "react";
import SignInUpInputField from "../SignInUpInputField";
import { globalTranslate } from "@/helpers/helpersFunctions";

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
    </SignInUpLayout>
  );
}
