"use client";
import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import SignInUpTypography from "@/components/signInUp/SignInUpTypography";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import {
  globalTranslate,
  setCookies,
  signInUpTranslate,
} from "@/helpers/helpersFunctions";
import SignInUpInputField from "../SignInUpInputField";
import SignInUpCheckBox from "../SignInUpCheckBox";
import SignInUpButton from "../SignInUpButton";
import { emailPattern } from "@/utilities/regex";
import { SignUpUser } from "@/redux/signupReducer";
import { useDispatch } from "react-redux";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

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

  const validateForm = (): boolean => {
    let isValid = true;
    if (!email) {
      setEmailErr("Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setEmailErr("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailErr("");
    }

    if (!password) {
      setPasswordErr("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordErr("");
    }

    if (!acceptTerms) {
      // You could set an error message here if needed.
      isValid = false;
    }
    return isValid;
  };

  function signUpHandler(): any {
    if (!validateForm()) return;
    setDisableButton(true);

    dispatch(
      SignUpUser({
        email: email,
        password: password,
      })
    )
      .unwrap()
      .then((res: any) => {
        if (res) {
          const key: string =
            process.env.NEXT_PUBLIC_COOKIE_EMAIL_VERIFICATION ?? "";
          setCookies(key, email, 1);
          router.push(ROUTES.EMAIL_VERIFICATION);
        }
      })
      .catch((err: any) => {
        setEmailErr(err.message);
        setPasswordErr(err.message);
      })
      .finally(() => {
        setDisableButton(false);
      });
  }

  return (
    <SignInUpLayout type="signup">
      {inputFields.map((elem, index) => {
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
            text={globalTranslate(`signup.TERMS_TEXT`, "sigInUpConstants")}
            color={theme.apiTrail.signInUp.TextTertiary}
            fontWeight="xs"
            fontSize={{
              // xl: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
              xs: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
            }}
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
      <SignInUpButton
        text={signInUpTranslate(`signup.BUTTON`, "sigInUpConstants")}
        onClick={signUpHandler}
        disabled={disableButton || !acceptTerms || !email || !password}
      />
    </SignInUpLayout>
  );
}
