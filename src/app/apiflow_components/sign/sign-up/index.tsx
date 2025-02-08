import GInput from "@/app/apiflow_components/global/GInput";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Email, Lock, PersonRounded, Phone } from "@mui/icons-material";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import GlobalButton from "../../global/GButton";
import useSignUp from "@/app/hooks/sign/useSignUp";
import { emailPattern, passwordPattern } from "@/app/Utilities/regex";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import AccountCreation from "./AccountCreation";
import ScrollableLayout from "../ScrollableLayout";

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
    isDataChanged,
    updateform,
  } = useSignUp();
  const {
    setUserData,
    formDataStore,
    setFormDataStore,
    authPage,
    setAuthPage,
    setactiveStep,
  } = useSignUpStore();
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
      icon: (
        <Email
          sx={{
            fontSize: "18px",
            color: "#FFFFFF80",
            "@media (min-width: 2120px)": {
              fontSize: "25px",
            },
          }}
        />
      ),
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
      icon: (
        <PersonRounded
          sx={{
            fontSize: "18px",
            color: "#FFFFFF80",
            "@media (min-width: 2120px)": {
              fontSize: "25px",
            },
          }}
        />
      ),
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
      icon: (
        <PersonRounded
          sx={{
            fontSize: "18px",
            color: "#FFFFFF80",
            "@media (min-width: 2120px)": {
              fontSize: "25px",
            },
          }}
        />
      ),
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
      icon: (
        <Lock
          sx={{
            fontSize: "18px",
            color: "#FFFFFF80",
            "@media (min-width: 2120px)": {
              fontSize: "25px",
            },
          }}
        />
      ),
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
  const { isxs, issm, ismd, isxl } = useMuiBreakpoints();
  useEffect(() => {
    if (userData) {
      setUserData(userData);
    }
  }, [userData]);
  switch (authPage) {
    case 0:
      return (
        <AccountCreation currentPage={authPage} setcurrentPage={setAuthPage} />
      );
    case 1:
      return (
        <ScrollableLayout
          title={"Create your account"}
          description={"Account creation using SSO or Email"}
          showBackButton={true}
          handleBack={() => {
            setAuthPage(0);
            if (formDataStore?.authType == "email") {
              setFormDataStore("authType", formDataStore?.authType + "_back");
            }
          }}
          showNextButton={formDataStore?.isRegisterd ? "Next" : "Create"}
          handleNext={async () => {
            try {
              if (!formDataStore?.isRegisterd) {
                await submitform();
              } else {
                // if (isDataChanged) {
                updateform();
                // } else {
                //   setactiveStep(1);
                // }
              }
              setFormDataStore("registeredForm", signUpFormData);
            } catch (err) {
              console.error("Error submitting form:", err);
            }
          }}
          height={"100%"}
          justifyContent="center"
        >
          <Grid
            container
            sx={{
              width: "100%",
              marginInline: "auto",
            }}
            columnSpacing={isxs ? 1 : issm ? 1 : 6}
          >
            {InputArray.map((elem, index) => {
              return (
                <Grid
                  size={{ md: 6, sm: 6, xs: 12 }}
                  key={index}
                  sx={{
                    "@media (max-width: 850px)": {
                      width: "100%",
                    },
                  }}
                >
                  <Stack sx={{ gap: 1.5, marginBottom: "15px" }}>
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
                          fontSize: "13px",
                          "@media (min-width: 2120px)": {
                            fontSize: "20px",
                          },
                        }}
                      >
                        {elem?.label}
                      </SecondarySignInUPTypography>
                    </Box>
                    <GInput
                      disabled={
                        elem.name != "first_name" &&
                        elem.name != "last_name" &&
                        formDataStore?.isRegisterd
                      }
                      background={"#31244F80"}
                      name={elem.name}
                      type={elem.type}
                      fullWidth={true}
                      value={elem.value}
                      onChangeHandler={elem.onChange}
                      error={elem.error}
                      helperText={elem.helperText}
                      required={elem.required}
                      patternError={elem?.patternError}
                      pattern={elem?.pattern}
                      // register={elem.register}
                      height={"47px"}
                      radius={"5px"}
                    />
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </ScrollableLayout>
      );
  }
}
