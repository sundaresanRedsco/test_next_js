import GInput from "@/app/apiflow_components/global/GInput";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Email, Lock, PersonRounded, Phone } from "@mui/icons-material";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import GlobalButton from "../../global/GButton";
import useSignUp from "@/app/hooks/sign/useSignUp";
import { emailPattern, passwordPattern } from "@/app/Utilities/regex";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";

export default function SignUp() {
  const {
    signUpFormData,
    handleChange,
    handleFormData,
    register,
    submitform,
    error,
    errors,
    userData,
    setsignUpFormData,
  } = useSignUp();
  const { setUserData, formDataStore, setFormDataStore } = useSignUpStore();
  useEffect(() => {
    if (formDataStore?.registeredForm) {
      const data = formDataStore?.registeredForm;
      setsignUpFormData({
        first_name: data.first_name,
        user_name: data.user_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
        member_invite_id: "null",
        isFromGoogleOrAzure: false,
        isOnboarding: true,
      });
    }
  }, [formDataStore?.registeredForm]);
  const InputArray = [
    {
      id: 1,
      label: "Email *",
      icon: <Email sx={{ fontSize: "14px", color: "#FFFFFF80" }} />,
      type: "email",
      onChange: handleChange,
      name: "email",
      value: signUpFormData.email,
      register: register,
      helperText: error.email || errors?.email?.message,
      error: error.email || errors?.email,
      required: true,
      patternError: "Invalid Email",
      pattern: emailPattern,
    },
    // {
    //   id: 2,
    //   label: "Mobile Number *",
    //   icon: <Phone sx={{ fontSize: "14px", color: "#FFFFFF80" }} />,
    //   type: "number",
    //   onChange: handleChange,

    //   name: "phone",
    //   value: "",
    // },
    {
      id: 2,
      label: "User Name *",
      icon: <PersonRounded sx={{ fontSize: "14px", color: "#FFFFFF80" }} />,
      type: "text",
      onChange: handleChange,

      name: "user_name",
      register: register,
      value: signUpFormData.user_name,
      helperText: error.user_name || errors?.user_name?.message,
      error: error.user_name || errors?.user_name,
      required: true,
      patternError: "",
      pattern: null,
    },
    {
      id: 3,
      label: "First Name *",
      icon: <PersonRounded sx={{ fontSize: "14px", color: "#FFFFFF80" }} />,
      type: "text",
      onChange: handleChange,
      name: "first_name",
      register: register,
      value: signUpFormData.first_name,
      helperText: error.first_name || errors?.first_name?.message,
      error: error.first_name || errors?.first_name,
      required: true,
      patternError: "",
      pattern: null,
    },
    {
      id: 4,
      label: "Last Name *",
      icon: "",
      type: "text",
      onChange: handleChange,
      name: "last_name",
      register: register,
      value: signUpFormData.last_name,
      helperText: error.last_name || errors?.last_name?.message,
      required: true,
      error: error.last_name || errors?.last_name,
      patternError: "",
      pattern: null,
    },
    {
      id: 5,
      label: "New Password *",
      icon: <Lock sx={{ fontSize: "14px", color: "#FFFFFF80" }} />,
      type: "password",
      onChange: handleChange,
      name: "password",
      register: register,
      value: signUpFormData.password,
      helperText: error.password || errors?.password?.message,
      required: true,
      error: error.password || errors?.password,
      patternError:
        "Password must contain at least 8 characters, 1 uppercase, and 1 special character",
      pattern: passwordPattern,
    },
    {
      id: 6,
      label: "Confirm Password *",
      icon: "",
      type: "password",
      onChange: handleChange,
      name: "confirm_password",
      register: register,
      value: signUpFormData.confirm_password,
      helperText: error.confirm_password || errors?.confirm_password?.message,
      error: error.confirm_password || errors?.confirm_password,
      required: true,
      patternError: "",
      pattern: null,
    },
  ];
  const { isxs, issm, ismd } = useMuiBreakpoints();
  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
  }, [userData]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await submitform();
          setFormDataStore("registeredForm", signUpFormData);
        } catch (err) {
          console.error("Error submitting form:", err);
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        padding: isxs ? "10px" : issm ? "10px" : ismd ? "30px" : "0 100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        sx={{ width: "100%", height: "90%" }}
        columnSpacing={isxs ? 1 : issm ? 1 : 4}
      >
        <Grid
          size={{
            md: 12,
            xs: 12,
          }}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <PrimarySignInUPTypography
              sx={{
                color: "white",
                fontSize: {
                  xs: "18px", // small screens
                  sm: "20px", // medium screens
                  md: "25px", // larger screens
                  lg: "30px", // extra-large screens
                },
              }}
            >
              Create Account
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography
              sx={{
                color: "#F3F3F3BF",
                marginTop: 1,
                fontSize: "14px",
              }}
            >
              Provide your details to signup
            </SecondarySignInUPTypography>
          </Stack>
        </Grid>
        {InputArray.map((elem, index) => {
          return (
            <Grid size={{ md: 6, sm: 6, xs: 12 }} key={index}>
              <Stack sx={{ gap: 1, marginBottom: "15px" }}>
                <Box
                  sx={{
                    color: "#FFFFFF80",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  {elem?.icon}
                  <SecondarySignInUPTypography
                    sx={{
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {elem?.label}
                  </SecondarySignInUPTypography>
                </Box>
                <GInput
                  background={"#31244F80"}
                  name={elem.name}
                  type={elem.type}
                  fullWidth={true}
                  radius={"7px"}
                  value={elem.value}
                  onChangeHandler={elem.onChange}
                  error={elem.error}
                  helperText={elem.helperText}
                  required={elem.required}
                  patternError={elem?.patternError}
                  pattern={elem?.pattern}
                  // register={elem.register}
                />
              </Stack>
            </Grid>
          );
        })}
        <Grid
          size={{
            md: 12,
            xs: 12,
          }}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GlobalButton
              padding="5px 30px"
              label={"Submit"}
              iconPosition="end"
              type={"submit"}
              buttonType="primary"
              radius="10px"
              fontSize={"15px"}
              fontFamily={"Firasans-medium !important"}
            />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
