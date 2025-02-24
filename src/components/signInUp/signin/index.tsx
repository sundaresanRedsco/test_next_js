"use client";
import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import SignInUpTypography from "@/components/signInUp/SignInUpTypography";

import SignInUpLayout from "@/layouts/SignInUpLayout";
import { globalTranslate } from "@/helpers/helpersFunctions";
import SignInUpInputField from "../SignInUpInputField";
import SignInUpCheckBox from "../SignInUpCheckBox";
import { StyledLink } from "@/styles/signInUp";

// And then use it like this:

export default function SignIn() {
  const theme = useTheme();
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
            // variant="sm"
            fontSize={{
              xl: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
              xs: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
            }}
            color={theme.apiTrail.signInUp.TextTertiary}
            fontWeight="xs"
          />
        </Box>
        <StyledLink
          href={globalTranslate(`signin.CHECK_BOX_ROUTE`, "sigInUpConstants")}
          sx={{
            fontSize: {
              xl: "1.25rem",
              xs: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
            },
          }}
        >
          {globalTranslate(`signin.FORGOT_PASSWORD`, "sigInUpConstants")}
        </StyledLink>
      </Box>
    </SignInUpLayout>
  );
}
