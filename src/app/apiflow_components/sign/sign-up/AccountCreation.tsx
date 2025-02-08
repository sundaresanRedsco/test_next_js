import React from "react";
import GlobalButton from "../../global/GButton";
import IconLayout from "../../global/IconLayout";
import {
  AzureIcon,
  EmailIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@/app/Assests/icons";
import { TertiarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box, Divider, Stack } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import ScrollableLayout from "../ScrollableLayout";
import { GitHub } from "@mui/icons-material";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import useSignIn from "@/app/hooks/sign/useSignIn";
import { set } from "lodash";

type Props = {
  handleAuthentication?: any;
  currentPage?: any;
  setcurrentPage?: any;
};

export default function AccountCreation({
  handleAuthentication,
  currentPage,
  setcurrentPage,
}: Props) {
  const { formDataStore, setFormDataStore, setactiveStep } = useSignUpStore();

  const { handleSuccess } = useSignIn();
  const googleLogin = useGoogleLogin({
    onError: () => {},
    onSuccess: (res) => {
      handleSuccess(res);
      setFormDataStore("authType", "google");
    },
    flow: "auth-code",
    scope: "openid email profile",
  });
  return (
    <ScrollableLayout
      //   showBackButton={true}
      //   handleBack={() => {}}
      showNextButton={!!formDataStore?.authType}
      handleNext={() => {
        if (formDataStore?.authType.split("_")[0] == "email") {
          setcurrentPage(1);
        } else {
          setactiveStep(1);
        }
        setFormDataStore("authType", formDataStore?.authType.split("_")[0]);
      }}
      height={"100%"}
      title={"Create your account"}
      description={"Account creation using SSO or Email"}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
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
            marginInline: "auto",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              height: "70%",
            }}
          >
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
                  label: "Sign up with Google",
                  icon: <GoogleIcon />,
                  onClick: googleLogin,
                  isSelected: formDataStore?.authType == "google_back",
                },
                // {
                //   label: "Sign up with Microsoft",
                //   icon: <MicrosoftIcon />,
                //   onClick: () => {
                //     setFormDataStore("authType", "microsoft");
                //   },
                //   isSelected: formDataStore?.authType == "microsoft_back",
                // },
                // {
                //   label: "Sign up with Github",
                //   icon: <GitHub sx={{ color: "black" }} />,
                //   onClick: () => {
                //     setFormDataStore("authType", "github");
                //   },
                //   isSelected: formDataStore?.authType == "github_back",
                // },
              ].map((btn: any, index: number) => {
                const isDisabled =
                  formDataStore?.authType != "" && !btn.isSelected;
                return (
                  <GlobalButton
                    disabled={isDisabled}
                    isSelected={btn.isSelected}
                    className="authBtn"
                    key={index}
                    padding="13px 40px"
                    label={btn.label}
                    iconPosition="start"
                    background="#7946FD40"
                    color="white"
                    icon={<IconLayout>{btn.icon}</IconLayout>}
                    type={"button"}
                    sx={{
                      boxShadow: "0px 0px 0px .3px #F3F3F340 inset",
                      width: "auto",
                      opacity: isDisabled ? 0.5 : 1,
                      "&.MuiButton-root.Mui-disabled": {
                        border: "none",
                      },
                    }}
                    onClickHandler={btn.isSelected ? undefined : btn.onClick}
                    radius={"8px"}
                  />
                );
              })}
            </Box>
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
                  borderWidth: {
                    md: "1px 200px 0px 200px",
                    sm: "1px 100px 0px 100px",
                  },
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
                    color: "#FFFFFFBF",
                    fontSize: "12px",
                    top: 0,
                    "@media (min-width: 2120px)": {
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
                  label: "Sign up with Email",
                  icon: <EmailIcon />,
                  onClick: () => {
                    setcurrentPage(1);
                  },
                  isSelected: formDataStore?.authType == "email_back",
                },
              ].map((btn: any, index: number) => {
                const isDisabled =
                  formDataStore?.authType != "" && !btn.isSelected;
                return (
                  <GlobalButton
                    disabled={isDisabled}
                    isSelected={btn.isSelected}
                    className="authBtn"
                    key={index}
                    padding="13px 40px"
                    label={btn.label}
                    iconPosition="start"
                    background="#7946FD40"
                    color="white"
                    icon={<IconLayout>{btn.icon}</IconLayout>}
                    type={"button"}
                    sx={{
                      boxShadow: "0px 0px 0px .3px #F3F3F340 inset",
                      width: "auto",
                      opacity: isDisabled ? 0.5 : 1,
                      "&.MuiButton-root.Mui-disabled": {
                        border: "none",
                      },
                    }}
                    onClickHandler={btn.isSelected ? undefined : btn.onClick}
                    radius={"8px"}
                  />
                );
              })}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </ScrollableLayout>
  );
}
