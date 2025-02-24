"use client";

import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

import SignInUpTypography from "@/components/signInUp/SignInUpTypography";
import SignInUpButton from "@/components/signInUp/SignInUpButton";
import SignInUpIconButton from "@/components/signInUp/SignInUpIconButton";
import LogoWhite from "@/assests/svgs/signInUp/LogoWhite";
import GitIcon from "@/assests/svgs/signInUp/GitIcon";
import GoogleIcon from "@/assests/svgs/signInUp/GoogleIcon";
import { globalTranslate, signInUpTranslate } from "@/helpers/helpersFunctions";
import { ROUTES } from "../routes/routes";

// Adjust the RightSection to include a z-index so it layers correctly
const RightSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(179.99deg, #ED634C 2.58%, #A049E1 97.23%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "4rem",
  color: "white",
  position: "absolute",
  overflow: "hidden",
  borderRadius: "50%",
  height: "115vh",
  width: "115vh",
  right: "-15vw",
  paddingRight: "16vw",
  gap: "1rem",
  alignItems: "start",
  zIndex: 1, // ensures this section layers above the background image
  border: "12px solid rgba(198, 136, 234, 0.35)",

  [theme.breakpoints.down("xl")]: {
    svg: {
      width: "80px",
      height: "80px",
    },
  },
  [theme.breakpoints.up("xl")]: {
    svg: {
      width: "105px",
      height: "105px",
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "none", // hide on mobile
  },
}));

// A container for the login form
const LoginForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "55%",
  [theme.breakpoints.up("xl")]: {
    width: "40%",
  },
  [theme.breakpoints.down("lg")]: {
    width: "70%",
  },
  [theme.breakpoints.down("md")]: {
    width: "70%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

type Props = {
  children: React.ReactNode;
  type?: "signin" | "signup" | "forgot-password";
};

export default function SignInUpLayout({ children, type }: Props) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <div
      className="w-full h-screen flex flex-row justify-between items-center relative overflow-x-hidden md:overflow-y-auto  lg:overflow-y-hidden  "
      style={{ background: theme.palette.signInUpBg.main }}
    >
      {/* Left section: Login Form */}
      <div className="h-full w-full sm:w-full lg:w-[60%] flex flex-col items-center justify-center">
        <LoginForm>
          <Box
            sx={{
              mb: {
                xl: 4,
                lg: 4,
                xs: 2,
              },
            }}
          >
            <SignInUpTypography
              text={signInUpTranslate(`${type}.TITLE`, "sigInUpConstants")}
              // variant="lg"
              fontSize={{
                xl: globalTranslate("fontSize.lg", "signInUpStyleConstants"),
                xs: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
              }}
              color={theme.palette.signInTextSecondary.main}
              fontWeight="md"
            />
          </Box>
          <Box
            component="form"
            sx={{ width: "100%" }}
            onSubmit={(e) => e.preventDefault()}
          >
            {children}
            {/* <SignInUpButton
              text={signInUpTranslate(`${type}.BUTTON`, "sigInUpConstants")}
              onClick={() => {
                if (type === "signin") {
                  router.push(ROUTES.ONBOARDING);
                } else if (type === "signup") {
                  router.push(ROUTES.ONBOARDING_EMAIL_VERIFICATION);
                }
              }}
            /> */}
            {type !== "forgot-password" && (
              <>
                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <SignInUpTypography
                    text={signInUpTranslate(
                      `OR_CONNECT_WITH`,
                      "sigInUpConstants"
                    )}
                    // variant="sm"
                    fontSize={{
                      xl: globalTranslate(
                        "fontSize.sm",
                        "signInUpStyleConstants"
                      ),
                      xs: globalTranslate(
                        "fontSize.xs1",
                        "signInUpStyleConstants"
                      ),
                    }}
                    color={theme.palette.signInTextTertiary.main}
                    fontWeight="md"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <SignInUpIconButton icon={<GitIcon />} />
                    <SignInUpIconButton icon={<GoogleIcon />} />
                  </Box>
                </Box>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                mt: {
                  xl: 2,
                  lg: 5,
                  xs: 2,
                },
              }}
            >
              <SignInUpTypography
                text={signInUpTranslate(`${type}.TEXT`, "sigInUpConstants")}
                // variant="sm"
                fontSize={{
                  xl: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
                  xs: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
                }}
                color={theme.palette.signInTextTertiary.main}
                fontWeight="sm"
              />
              <SignInUpTypography
                text={signInUpTranslate(`${type}.LINK`, "sigInUpConstants")}
                // variant="sm"
                fontSize={{
                  xl: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
                  xs: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
                }}
                color={theme.palette.signInTextLink.main}
                fontWeight="lg"
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => {
                  if (type === "signin") {
                    router.push(ROUTES.SIGNUP);
                  } else if (type === "signup") {
                    router.push(ROUTES.SIGNIN);
                  } else if (type === "forgot-password") {
                    router.push(ROUTES.FORGOT_PASSWORD);
                  }
                }}
              />
            </Box>
          </Box>
        </LoginForm>
      </div>

      {/* Background image */}
      <Box
        component="img"
        src="/global/signInUpBg.png"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Right Section */}
      <RightSection>
        <div className="flex flex-row items-center gap-2">
          <LogoWhite />
          <SignInUpTypography
            fontWeight="lg"
            fontSize={{
              xl: globalTranslate("fontSize.xl", "signInUpStyleConstants"),
              xs: globalTranslate("fontSize.xl2", "signInUpStyleConstants"),
            }}
            variant="xl"
            text={signInUpTranslate(`LOGO`, "sigInUpConstants")}
          />
        </div>
        <SignInUpTypography
          // variant="xs"
          fontSize={{
            xl: globalTranslate("fontSize.xs", "signInUpStyleConstants"),
            xs: globalTranslate("fontSize.xs3", "signInUpStyleConstants"),
          }}
          lineHeight="1.7rem"
          text={signInUpTranslate(
            `${type}.RIGHT_SIDE_CONTENT`,
            "sigInUpConstants"
          )}
        />
        <SignInUpButton
          variant="secondary"
          text={signInUpTranslate(`LEARN_MORE`, "sigInUpConstants")}
        />
      </RightSection>
    </div>
  );
}
