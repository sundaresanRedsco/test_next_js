"use client";
import GInput from "@/app/apiflow_components/global/GInput";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
  TertiarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Email, Lock } from "@mui/icons-material";
import { Box, Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import GlobalButton from "../../global/GButton";
import useSignIn from "@/app/hooks/sign/useSignIn";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleIcon } from "@/app/Assests/icons";
import IconLayout from "../../global/IconLayout";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import GOtpField from "../../global/GOtpField";
import theme from "@/Theme/theme";
import { translate } from "@/app/Helpers/helpersFunctions";

export default function SignIn({ clientSession }: any) {
  const {
    handleSuccess,
    handleInputChange,
    loginHandler,
    errorPassword,
    errorEmail,
    setErrorMail,
    formData,
    handleSubmitOtp,
    otp,
    setOtp,
    recoveryCode,
    setRecoveryCode,
    errorRecoveryCode,
    errorOtp,
    enableRecovery,
    handleEnableRecoveyCode,
  } = useSignIn();
  const { isTotpEnabled } = useSignUpStore();

  const InputArray = [
    {
      id: 1,
      label: `${translate("signin.EMAIL")}`,
      icon: (
        <Email
          sx={{
            fontSize: { xl: "25px", lg: "18px" },
            color: theme.palette.SignInUpBorder.main,
          }}
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
      label: `${translate("signin.PASSWORD")}`,
      icon: (
        <Lock
          sx={{
            fontSize: { xl: "25px", lg: "18px" },
            color: theme.palette.SignInUpBorder.main,
          }}
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
      label: `${translate("signin.OTP")}`,
      icon: (
        <Lock
          sx={{
            fontSize: "18px",
            color: theme.palette.SignInUpBorder.main,
          }}
        />
      ),
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
      label: `${translate("signin.RECOVERY_CODE")}`,
      icon: (
        <Lock
          sx={{
            fontSize: "18px",
            color: theme.palette.SignInUpBorder.main,
          }}
        />
      ),
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
                  color: theme.palette.signInUpPrimary.main,
                  fontSize: {
                    xs: "18px", // small screens
                    sm: "20px", // medium screens
                    md: "25px", // larger screens
                    lg: "30px", // extra-large screens
                  },
                  "@media (min-width: 2120px)": {
                    fontSize: "60px",
                  },
                }}
              >
                {isTotpEnabled
                  ? `${translate("signin.TWO_FACTOR_AUTHENTICATION")}`
                  : `${translate("button.LOGIN")}`}
              </PrimarySignInUPTypography>
              <SecondarySignInUPTypography
                sx={{
                  color: theme.palette.sigInUpStepperTextSecondary.main,
                  marginTop: 1,
                  fontSize: "14px",
                  "@media (min-width: 2120px)": {
                    fontSize: "20px",
                  },
                }}
              >
                {isTotpEnabled
                  ? `${translate("signin.ENTER_OTP")}`
                  : `${translate("signin.LOGIN_WITH_CREDENTIALS")}`}
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
                "@media (min-width: 2120px)": {
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
                              color: theme.palette.SignInUpBorder.main,
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            {elem?.icon}
                            <SecondarySignInUPTypography
                              sx={{
                                color: theme.palette.signInUpPrimary.main,
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
                              background={
                                theme.palette.sigInUpStepperTextSecondary.main
                              }
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
                                  color: theme.palette.gray.main,
                                  fontSize: "12px",
                                  textAlign: "left",
                                }}
                              >
                                {translate("signin.OTP_TEXT1")}
                              </SecondarySignInUPTypography>
                            )}
                            <SecondarySignInUPTypography
                              sx={{
                                color: theme.palette.link.main,
                                fontSize: "12px",
                                cursor: "pointer",
                              }}
                              onClick={handleEnableRecoveyCode}
                            >
                              {elem.type == "otp"
                                ? `${translate("signin.USE_RECOVERY_KEY")}`
                                : `${translate("signin.USE_OTP_INSTEAD")}`}
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

                            marginBottom: index == 0 ? 1 : 0,
                          }}
                        >
                          <Box
                            sx={{
                              color: theme.palette.SignInUpBorder.main,
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            {elem?.icon}
                            <SecondarySignInUPTypography
                              sx={{
                                color: theme.palette.signInUpPrimary.main,
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
                            background={theme.palette.inputBg4.main}
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
                    label={
                      isTotpEnabled
                        ? `${translate("button.VERIFY")}`
                        : `${translate("button.LOGIN")}`
                    }
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
                  "@media (min-width: 2120px)": {
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
                      color: theme.palette.signInUpPrimary.main,
                      width: "100%",
                      margin: "10px 0",
                    }}
                  >
                    <Divider
                      variant="middle"
                      sx={{
                        borderColor:
                          theme.palette.sigInUpButtonBorderSecondary.main,
                        borderWidth: "1px 100px 0px 100px",
                        borderStyle: "none solid",
                        height: "1px",
                        alignItems: "center",
                        "@media (min-width: 2120px)": {
                          height: "3px",
                          borderWidth: "1px 300px 0px 300px",
                        },
                      }}
                    >
                      <TertiarySignInUPTypography
                        sx={{
                          color: theme.palette.sigInUpStepperTextTertary.main,
                          fontSize: "12px",
                          top: 0,
                          "@media (min-width: 2120px)": {
                            fontSize: "20px",
                          },
                        }}
                      >
                        {translate("common.OR")}
                      </TertiarySignInUPTypography>
                    </Divider>
                  </Box>
                  <Box
                    className="googleButton"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: theme.palette.sigInUpButtonBorder.main,
                      width: "100%",
                      gap: { xs: 0, sm: 0, md: 2 },
                      flexDirection: { xs: "column", sm: "column", md: "row" },
                    }}
                  >
                    {[
                      {
                        label: `${translate("signin.CONTINUE_WITH_GOOGLE")}`,
                        icon: <GoogleIcon />,
                        onClick: googleLogin,
                      },
                    ].map((btn: any, index: number) => {
                      return (
                        <GlobalButton
                          className="authBtn"
                          key={index}
                          padding="13px 5px"
                          label={btn.label}
                          iconPosition="start"
                          background={theme.palette.inputBg.main}
                          color={theme.palette.signInUpPrimary.main}
                          icon={<IconLayout>{btn.icon}</IconLayout>}
                          type={"button"}
                          sx={{
                            boxShadow: `0px 0px 0px .3px ${theme.palette.sigInUpButtonBorder.main} inset`,
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
