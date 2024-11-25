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
import React from "react";
import GlobalButton from "../../global/GButton";
import useSignIn from "@/app/hooks/sign/useSignIn";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { AzureIcon, GoogleIcon } from "@/app/Assests/icons";
import IconLayout from "../../global/IconLayout";

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
  } = useSignIn();

  const InputArray = [
    {
      id: 1,
      label: "E-Mail",
      icon: <Email sx={{ fontSize: "18px", color: "#FFFFFF80" }} />,
      type: "email",
      name: "email",
      value: formData?.email,
      error: errorEmail,
      helperText: errorEmail,
      dataTest: "email-input",
      errorHandler: (error: any) => setErrorMail(error),
      onChangeHandler: (e: any) => handleInputChange("email", e.target.value),
    },

    {
      id: 5,
      label: "Password",
      icon: <Lock sx={{ fontSize: "18px", color: "#FFFFFF80" }} />,
      type: "password",
      name: "password",
      value: formData?.password,
      error: errorPassword,
      helperText: errorPassword,
      dataTest: "password-input",
      errorHandler: (error: any) => undefined,
      onChangeHandler: (e: any) =>
        handleInputChange("password", e.target.value),
    },
  ];
  const { isxs, issm, ismd } = useMuiBreakpoints();
  const googleLogin = useGoogleLogin({
    onError: () => {},
    onSuccess: handleSuccess,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginHandler();
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
      <Stack></Stack>
      <Grid
        container
        sx={{ width: "100%", height: { xs: "100%", sm: "100%", md: "90%" } }}
        columnSpacing={isxs ? 1 : issm ? 1 : 4}
      >
        <Grid size={{ md: 12, sm: 12, xs: 12 }}>
          <Stack
            sx={{
              gap: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
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
                sx={{ color: "white", fontSize: "30px" }}
              >
                Login
              </PrimarySignInUPTypography>
              <SecondarySignInUPTypography
                sx={{
                  color: "#F3F3F3BF",
                  marginTop: 1,
                  fontSize: "14px",
                }}
              >
                Login with your credentials
              </SecondarySignInUPTypography>
            </Stack>
            {InputArray.map((elem, index) => {
              return (
                <Stack
                  key={index}
                  sx={{
                    gap: 1.5,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    width: { xs: "100%", sm: "80%", md: "360px" },
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
                    height="43px"
                    radius="5px"
                  />
                </Stack>
              );
            })}
            <Stack
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GlobalButton
                padding="4px 35px"
                label={"Login"}
                iconPosition="end"
                fontWeight={500}
                type={"submit"}
                buttonType="primary"
                radius="8px"
                fontSize={"15px"}
                fontFamily={"Firasans-medium !important"}
              />
            </Stack>
            <Stack
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
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
                  }}
                >
                  <TertiarySignInUPTypography
                    sx={{
                      color: "#FFFFFFBF",
                      fontSize: "12px",
                      top: 0,
                    }}
                  >
                    {"(OR)"}
                  </TertiarySignInUPTypography>
                </Divider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#F3F3F340",
                  width: "100%",
                  gap: 2,
                }}
                className="google-button"
              >
                {[
                  {
                    label: "Continue with Google",
                    icon: <GoogleIcon />,
                    onClick: googleLogin,
                  },
                  {
                    label: "Continue with Azure",
                    icon: <AzureIcon />,
                    onClick: handleAuthentication,
                  },
                ].map((btn: any, index: number) => {
                  return (
                    <GlobalButton
                      key={index}
                      padding="10px 15px"
                      label={btn.label}
                      iconPosition="start"
                      background="#7946FD40"
                      color="white"
                      icon={<IconLayout>{btn.icon}</IconLayout>}
                      type={"button"}
                      sx={{
                        boxShadow: "0px 0px 0px .3px #F3F3F340 inset",
                      }}
                      onClickHandler={btn.onClick}
                      radius="8px"
                    />
                  );
                })}
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
