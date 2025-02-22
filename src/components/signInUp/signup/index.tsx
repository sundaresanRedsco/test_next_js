"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import SignInUpTypography from "@/components/signInUp/SignInUpTypography";
import theme from "@/theme/theme";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import { globalTranslate } from "@/helpers/helpersFunctions";
import SignInUpInputField from "../SignInUpInputField";
import SignInUpCheckBox from "../SignInUpCheckBox";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

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
        `signup.PASSWORD_PLACEHOLDER`,
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
    <SignInUpLayout type="signup">
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
        <Box sx={{ display: "flex", alignItems: "start" }}>
          <SignInUpCheckBox
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            sx={{
              mt: 0.2,
            }}
          />
          <SignInUpTypography
            text={""}
            variant="sm"
            color={theme.apiTrail.signInUp.TextTertiary}
            fontWeight="xs"
            isMixedText={{
              start: globalTranslate(
                `signup.MIXED_TEXT.start`,
                "sigInUpConstants"
              ),
              between: globalTranslate(
                `signup.MIXED_TEXT.between`,
                "sigInUpConstants"
              ),
              text1: globalTranslate(
                `signup.MIXED_TEXT.text1`,
                "sigInUpConstants"
              ),
              text2: globalTranslate(
                `signup.MIXED_TEXT.text2`,
                "sigInUpConstants"
              ),
              link1: globalTranslate(
                `signup.MIXED_TEXT.link1`,
                "sigInUpConstants"
              ),
              link2: globalTranslate(
                `signup.MIXED_TEXT.link2`,
                "sigInUpConstants"
              ),
            }}
          />
        </Box>
      </Box>
    </SignInUpLayout>
  );
}
