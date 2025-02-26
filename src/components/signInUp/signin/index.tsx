"use client";
import { Box, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import SignInUpTypography from "@/components/signInUp/SignInUpTypography";
import SignInUpLayout from "@/layouts/SignInUpLayout";
import {
  globalTranslate,
  signInUpTranslate,
  setCookies,
  clearCookies,
  getCookies,
} from "@/helpers/helpersFunctions";
import SignInUpInputField from "../SignInUpInputField";
import SignInUpCheckBox from "../SignInUpCheckBox";
import { StyledLink } from "@/styles/signInUp";
import SignInUpButton from "../SignInUpButton";
import { emailPattern } from "@/utilities/regex";
import { useDispatch } from "react-redux";
import { login } from "@/redux/loginReducer";
import { ROUTES } from "@/routes/routes";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SignIn() {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // States for email and password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // States for errors and "remember me"
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
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

  const validateForm = () => {
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
    return isValid;
  };

  function loginHandler(): any {
    if (!validateForm()) return;
    setDisableButton(true);

    dispatch(
      login({
        email: email,
        password: password,
      })
    )
      .unwrap()
      .then((res: any) => {
        if (res) {
          const emailKey = process.env.NEXT_PUBLIC_COOKIE_EMAIL_REMEMBER || "";
          const passwordKey =
            process.env.NEXT_PUBLIC_COOKIE_PASSWORD_REMEMBER || "";
          // If "remember me" is enabled, store email (and password, if needed) in cookies.
          if (rememberMe) {
            // Store cookies for 30 days. (Consider security implications for password.)
            setCookies(emailKey, email, 30);
            setCookies(passwordKey, password, 30);
          } else {
            // Clear cookies if rememberMe is not checked.
            clearCookies(emailKey);
            clearCookies(passwordKey);
          }
          // Navigate to the desired route on success.
          // router.push(ROUTES.DASHBOARD || );
        }
      })
      .catch((err: any) => {
        setEmailErr(err.message || "");
        setPasswordErr(err.message || "");
      })
      .finally(() => {
        setDisableButton(false);
      });
  }

  // On component mount, try to load email and password from cookies
  useEffect(() => {
    const emailKey = process.env.NEXT_PUBLIC_COOKIE_EMAIL_REMEMBER || "";
    const passwordKey = process.env.NEXT_PUBLIC_COOKIE_PASSWORD_REMEMBER || "";
    const rememberedEmail = getCookies(emailKey);
    const rememberedPassword = getCookies(passwordKey);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
    // Warning: Storing password in a cookie is not recommended.
    if (rememberedPassword) {
      setPassword(rememberedPassword);
    }
  }, []);

  return (
    <SignInUpLayout
      type={globalTranslate(`signin.LAYOUT_TYPE`, "sigInUpConstants")}
    >
      {inputFields.map((elem, index) => (
        <SignInUpInputField
          key={index}
          label={elem.label}
          placeholder={elem.placeholder}
          value={elem.value}
          onChange={elem.onChange}
          type={elem.type}
          error={elem.error}
          fieldType={elem.type}
        />
      ))}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          flexDirection: { sm: "row", xs: "column" },
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SignInUpCheckBox
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <SignInUpTypography
            text={globalTranslate(`signin.REMEMBER_ME`, "sigInUpConstants")}
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
      <SignInUpButton
        text={signInUpTranslate(`signin.BUTTON`, "sigInUpConstants")}
        onClick={loginHandler}
        disabled={disableButton || !email || !password}
      />
    </SignInUpLayout>
  );
}
