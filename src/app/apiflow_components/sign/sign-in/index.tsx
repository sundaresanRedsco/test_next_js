import GInput from "@/app/apiflow_components/global/GInput";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
  TertiarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Email, Lock, PersonRounded, Phone } from "@mui/icons-material";
import { Box, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import GlobalButton from "../../global/GButton";
import useSignIn from "@/app/hooks/sign/useSignIn";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { AzureIcon, GoogleIcon } from "@/app/Assests/icons";
import IconLayout from "../../global/IconLayout";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import { MuiOtpInput } from "mui-one-time-password-input";
import GOtpField from "../../global/GOtpField";

export default function SignIn({ clientSession }: any) {
  const {
    checkBoxVal,
    handleSuccess,
    handleAuthentication,
    handleInputChange,
    loginHandler,
    handleRememberMe,
    pathName,
    accounts,
    loading,
    passwordVisibility,
    errorPassword,
    errorEmail,
    setErrorMail,
    formData,
    CLIENT_ID,
    handleSubmitOtp,
    otp,
    setOtp,
    recoveryCode,
    setRecoveryCode,
    errorRecoveryCode,
    errorOtp,
    enableRecovery,
    setenableRecovery,
    handleEnableRecoveyCode,
  } = useSignIn();
  const { isTotpEnabled } = useSignUpStore();

  const InputArray = [
    {
      id: 1,
      label: "E-Mail",
      icon: (
        <Email
          sx={{ fontSize: { xl: "25px", lg: "18px" }, color: "#FFFFFF80" }}
        />
      ),
      type: "email",
      name: "email",
      value: formData?.email,
      error: errorEmail,
      helperText: errorEmail,
      dataTest: "email-input",
      errorHandler: (error: any) => setErrorMail(error),
      onChangeHandler: (e: any) => handleInputChange("email", e.target.value),
      visible: !isTotpEnabled,
    },
    {
      id: 5,
      label: "Password",
      icon: (
        <Lock
          sx={{ fontSize: { xl: "25px", lg: "18px" }, color: "#FFFFFF80" }}
        />
      ),
      type: "password",
      name: "password",
      value: formData?.password,
      error: errorPassword,
      helperText: errorPassword,
      dataTest: "password-input",
      errorHandler: (error: any) => undefined,
      onChangeHandler: (e: any) =>
        handleInputChange("password", e.target.value),
      visible: !isTotpEnabled,
    },
    {
      id: 5,
      label: "OTP",
      icon: <Lock sx={{ fontSize: "18px", color: "#FFFFFF80" }} />,
      type: "otp",
      name: "otp",
      value: otp,
      error: errorOtp,
      helperText: errorOtp,
      dataTest: "otp-input",
      errorHandler: (error: any) => undefined,
      onChangeHandler: (e: any) => {
        const value = e.replace(/[^0-9]/g, "");
        setOtp(value);
      },
      visible: isTotpEnabled && !enableRecovery,
    },
    {
      id: 5,
      label: "Recovary Code",
      icon: <Lock sx={{ fontSize: "18px", color: "#FFFFFF80" }} />,
      type: "code",
      name: "recoveryCode",
      value: recoveryCode,
      error: errorRecoveryCode,
      helperText: errorRecoveryCode,
      dataTest: "recoveryCode-input",
      errorHandler: (error: any) => undefined,
      onChangeHandler: (e: any) => setRecoveryCode(e.target.value),
      visible: isTotpEnabled && enableRecovery,
    },
  ];
  const { isxs, issm, ismd, isxl } = useMuiBreakpoints();
  const googleLogin = useGoogleLogin({
    onError: () => {},
    onSuccess: handleSuccess,
    flow: "auth-code",
    scope: "openid email profile",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isTotpEnabled) {
          handleSubmitOtp();
        } else {
          loginHandler();
        }
      }}
      style={{
        width: "100%",
        padding: isxs ? "10px" : issm ? "10px" : ismd ? "30px" : "0 100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: isxs ? "auto" : "80vh",
        overflowY: isxs ? "hidden" : "auto",
      }}
    >
      <Grid
        container
        sx={{ width: "100%", height: { xs: "100%", sm: "100%", md: "90%" } }}
        columnSpacing={isxs || issm ? 1 : 4}
      >
        <Grid
          size={{ md: 12, sm: 12, xs: 12 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack
            sx={{
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "85%",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
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
                  "@media (min-width: 1600px)": {
                    fontSize: "60px",
                  },
                }}
              >
                {isTotpEnabled ? "Two-Factor Authentication" : "Login"}
              </PrimarySignInUPTypography>
              <SecondarySignInUPTypography
                sx={{
                  color: "#F3F3F3BF",
                  marginTop: 1,
                  fontSize: "14px",
                  "@media (min-width: 1600px)": {
                    fontSize: "20px",
                  },
                }}
              >
                {isTotpEnabled
                  ? "Enter Authenticator app OTP"
                  : "Login with your credentials"}
              </SecondarySignInUPTypography>
            </Stack>
            <Box
              sx={{
                width: {
                  xs: "80%",
                  sm: "85%",
                  md: "70%",
                },
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
                "@media (min-width: 1600px)": {
                  width: "60%",
                },
              }}
            >
              <Stack sx={{ width: "100%", gap: { xl: 2, lg: 1 } }}>
                {InputArray.map((elem, index) => {
                  if (elem.visible) {
                    if (elem.type == "otp" || elem.type == "code") {
                      return (
                        <Stack
                          key={index}
                          sx={{
                            gap: 1.5,
                            alignItems: "flex-start",
                            justifyContent: "center",
                            width: { xs: "100%", sm: "80%", md: "100%" },
                            marginBottom: index == 0 ? 1 : 0,
                          }}
                        >
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
                              }}
                            >
                              {elem?.label}
                            </SecondarySignInUPTypography>
                          </Box>
                          {elem.type == "otp" ? (
                            <GOtpField
                              value={elem.value}
                              onChange={elem.onChangeHandler}
                              errMsg={elem.helperText}
                            />
                          ) : (
                            <GInput
                              background={"#31244F80"}
                              name={elem.name}
                              type={"text"}
                              fullWidth={true}
                              dataTest={elem.dataTest}
                              variant="outlined"
                              value={elem.value}
                              error={elem.error}
                              helperText={elem.helperText}
                              onChangeHandler={elem.onChangeHandler}
                              height="43px"
                              radius="5px"
                            />
                          )}
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                elem.type == "otp" ? "flex-start" : "flex-end",
                              gap: "5px",
                            }}
                          >
                            {elem.type == "otp" && (
                              <SecondarySignInUPTypography
                                sx={{
                                  color: "gray",
                                  fontSize: "14px",
                                }}
                              >
                                If you are unable to access the authenticator
                                app,
                              </SecondarySignInUPTypography>
                            )}
                            <SecondarySignInUPTypography
                              sx={{
                                color: "#327fb9",
                                fontSize: "14px",
                                cursor: "pointer",
                              }}
                              onClick={handleEnableRecoveyCode}
                            >
                              {elem.type == "otp"
                                ? "use your Recovery Key"
                                : "Use OTP instead?"}
                            </SecondarySignInUPTypography>
                          </Box>
                        </Stack>
                      );
                    } else {
                      return (
                        <Stack
                          key={index}
                          sx={{
                            gap: 1.5,
                            alignItems: "flex-start",
                            justifyContent: "center",
                            width: "100%",
                            // width: { xs: "100%", sm: "80%", md: "70%" },
                            marginBottom: index == 0 ? 1 : 0,
                          }}
                        >
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
                                "@media (min-width: 1600px)": {
                                  fontSize: "20px",
                                },
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
                            dataTest={elem.dataTest}
                            variant="outlined"
                            value={elem.value}
                            error={elem.error}
                            helperText={elem.helperText}
                            onChangeHandler={elem.onChangeHandler}
                            height={"47px"}
                            radius={"5px"}
                          />
                        </Stack>
                      );
                    }
                  }
                })}
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GlobalButton
                    label={isTotpEnabled ? "Verify" : "Login"}
                    iconPosition="end"
                    fontWeight={500}
                    type={"submit"}
                    buttonType="primary"
                    radius={"8px"}
                    padding="8px 35px"
                    fontSize="15px"
                    fontFamily={"Firasans-medium !important"}
                  />
                </Stack>
              </Stack>
            </Box>
            {!isTotpEnabled && (
              <Box
                sx={{
                  width: { xs: "80%", sm: "85%", md: "70%" },
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  "@media (min-width: 1600px)": {
                    width: "60%",
                  },
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      width: "100%",
                      margin: "10px 0",
                    }}
                  >
                    <Divider
                      variant="middle"
                      sx={{
                        borderColor: "#FFFFFF40",
                        borderWidth: "1px 100px 0px 100px",
                        borderStyle: "none solid",
                        height: "1px",
                        alignItems: "center",
                        "@media (min-width: 1600px)": {
                          height: "3px",
                          borderWidth: "1px 300px 0px 300px",
                        },
                      }}
                    >
                      <TertiarySignInUPTypography
                        sx={{
                          color: "#FFFFFFBF",
                          fontSize: "12px",
                          top: 0,
                          "@media (min-width: 1600px)": {
                            fontSize: "20px",
                          },
                        }}
                      >
                        {"(OR)"}
                      </TertiarySignInUPTypography>
                    </Divider>
                  </Box>
                  <Box
                    className="googleButton"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#F3F3F340",
                      width: "100%",
                      gap: { xs: 0, sm: 0, md: 2 },
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                    }}
                  >
                    {[
                      {
                        label: "Continue with Google",
                        icon: <GoogleIcon />,
                        onClick: googleLogin,
                      },
                      // {
                      //   label: "Continue with Azure",
                      //   icon: <AzureIcon />,
                      //   onClick: handleAuthentication,
                      // },
                    ].map((btn: any, index: number) => {
                      return (
                        <GlobalButton
                          className="authBtn"
                          key={index}
                          padding="13px 5px"
                          label={btn.label}
                          iconPosition="start"
                          background="#7946FD40"
                          color="white"
                          icon={<IconLayout>{btn.icon}</IconLayout>}
                          type={"button"}
                          sx={{
                            boxShadow: "0px 0px 0px .3px #F3F3F340 inset",
                            width: "-webkit-fill-available",
                          }}
                          onClickHandler={btn.onClick}
                          radius={"8px"}
                        />
                      );
                    })}
                  </Box>
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
