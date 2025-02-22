"use client";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import SignInUpTypography from "@/components/signInUp/SignInUpTypography";
import theme from "@/theme/theme";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import { globalTranslate } from "@/helpers/helpersFunctions";
import SignInUpInputField from "../SignInUpInputField";
import SignInUpCheckBox from "../SignInUpCheckBox";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const inputFields = [
    {
      label: globalTranslate(`EMAIL_LABEL`, "sigInUpConstants"),
      placeholder: globalTranslate(`EMAIL_PLACEHOLDER`, "sigInUpConstants"),
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      type: "email",
      error: emailErr,
    },
    {
      label: globalTranslate(`PASSWORD_LABEL`, "sigInUpConstants"),
      placeholder: globalTranslate(
        `signin.PASSWORD_PLACEHOLDER`,
        "sigInUpConstants"
      ),
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      type: "password",
      error: passwordErr,
    },
  ];
  return (
    <SignInUpLayout
      type={globalTranslate(`signin.LAYOUT_TYPE`, "sigInUpConstants")}
    >
      {inputFields.map((elem, index) => {
        return (
          <SignInUpInputField
            key={index}
            label={elem.label}
            placeholder={elem.placeholder}
            value={email}
            onChange={elem.onChange}
            type={elem.type}
            error={elem.error}
          />
        );
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          flexDirection: {
            sm: "row",
            xs: "column",
          },
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SignInUpCheckBox
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <SignInUpTypography
            text={globalTranslate(`signin.REMEMBER_ME`, "sigInUpConstants")}
            variant="sm"
            color={theme.apiTrail.signInUp.TextTertiary}
            fontWeight="xs"
          />
        </Box>
        <Link
          href={globalTranslate(`signin.CHECK_BOX_ROUTE`, "sigInUpConstants")}
          style={{
            color: theme.apiTrail.signInUp.TextLink,
            textDecoration: "none",
            fontFamily: "FiraSans-medium",
            fontSize: "1.25rem",
          }}
        >
          {globalTranslate(`signin.FORGOT_PASSWORD`, "sigInUpConstants")}
        </Link>
      </Box>
    </SignInUpLayout>
  );
}
