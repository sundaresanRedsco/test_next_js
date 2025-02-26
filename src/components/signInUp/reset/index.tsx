"use client";

import { sigInUpConstants } from "@/constants/appTexts";
import { globalTranslate } from "@/helpers/helpersFunctions";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import React, { useState } from "react";
import SignInUpInputField from "../SignInUpInputField";
import SignInUpButton from "../SignInUpButton";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function ResetPassword({}: Props) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const inputFields = [
    {
      label: globalTranslate(`reset.NEW_PASSWORD_LABEL`, "sigInUpConstants"),
      placeholder: globalTranslate(
        `reset.NEW_PASSWORD_PLACEHOLDER`,
        "sigInUpConstants"
      ),
      value: newPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewPassword(e.target.value),
      type: "password",
      error: newPasswordErr,
    },
    {
      label: globalTranslate(
        `reset.CONFIRM_PASSWORD_LABEL`,
        "sigInUpConstants"
      ),
      placeholder: globalTranslate(
        `reset.CONFIRM_PASSWORD_PLACEHOLDER`,
        "sigInUpConstants"
      ),
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
      type: "password",
      error: confirmPasswordErr,
    },
  ];

  const validateForm = () => {
    let isValid = true;
    if (!newPassword) {
      setNewPasswordErr("New Password is required");
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordErr("New Password must be at least 6 characters");
      isValid = false;
    } else {
      setNewPasswordErr("");
    }

    if (!confirmPassword) {
      setConfirmPasswordErr("Confirm Password is required");
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordErr(
        "Confirm Password does not match with new password"
      );
      isValid = false;
    } else {
      setConfirmPasswordErr("");
    }

    return isValid;
  };

  const resetPasswordHandler = () => {
    if (!validateForm()) return;
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("resettoken");
    console.log(resetToken);
  };

  return (
    <SignInUpLayout
      type={globalTranslate(`reset.LAYOUT_TYPE`, "sigInUpConstants")}
    >
      {inputFields?.map((elem, index) => {
        return (
          <SignInUpInputField
            key={index}
            label={elem.label}
            placeholder={elem.placeholder}
            value={elem.value}
            onChange={elem.onChange}
            type={elem.type}
            error={elem.error}
          />
        );
      })}
      <SignInUpButton
        text={globalTranslate(`reset.BUTTON`, "sigInUpConstants")}
        onClick={() => {
          resetPasswordHandler();
        }}
      />
    </SignInUpLayout>
  );
}
