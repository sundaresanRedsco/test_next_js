"use client";

import React from "react";
import { Box, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

import SignInUpTypography from "@/components/signInUp/SignInUpTypography";
import SignInUpButton from "@/components/signInUp/SignInUpButton";
import SignInUpIconButton from "@/components/signInUp/SignInUpIconButton";
import LogoWhite from "@/assests/svgs/signInUp/LogoWhite";
import GitIcon from "@/assests/svgs/signInUp/GitIcon";
import GoogleIcon from "@/assests/svgs/signInUp/GoogleIcon";
import theme from "@/theme/theme";
import { signInUpTranslate } from "@/helpers/helpersFunctions";

// Adjust the RightSection to include a z-index so it layers correctly
const RightSection = styled(Box)({
  background: "linear-gradient(179.99deg, #ED634C 2.58%, #A049E1 97.23%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "4rem",
  color: "white",
  position: "absolute",
  overflow: "hidden",
  borderRadius: "50%",
  height: "110vh",
  width: "110vh",
  right: "-16vw",
  paddingRight: "18vw",
  gap: "1rem",
  alignItems: "start",
  zIndex: 1, // ensures this section layers above the background image
  [theme.breakpoints.down("sm")]: {
    display: "none", // hide on mobile
  },
});

// A container for the login form
const LoginForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "60%",
  [theme.breakpoints.down("sm")]: {
    width: "90%", // hide on mobile
  },
});

type Props = {
  children: React.ReactNode;
  type?: "signin" | "signup" | "forgot-password";
};

export default function SignInUpLayout({ children, type }: Props) {
  const router = useRouter();

  return (
    <div
      className="w-full h-screen flex flex-row justify-between items-center relative overflow-x-hidden overflow-y-auto"
      style={{ background: theme.palette.signInUpBg.main }}
    >
      {/* Left section: Login Form */}
      <div className="h-full w-full md:w-[60%] flex flex-col items-center justify-center">
        <LoginForm>
          <Box sx={{ mb: 4 }}>
            <SignInUpTypography
              text={signInUpTranslate(`${type}.TITLE`, "sigInUpConstants")}
              variant="lg"
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
            <SignInUpButton
              text={signInUpTranslate(`${type}.BUTTON`, "sigInUpConstants")}
            />
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <SignInUpTypography
                text={signInUpTranslate(`OR_CONNECT_WITH`, "sigInUpConstants")}
                variant="sm"
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
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
                mt: 2,
              }}
            >
              <SignInUpTypography
                text={signInUpTranslate(`${type}.TEXT`, "sigInUpConstants")}
                variant="sm"
                color={theme.palette.signInTextTertiary.main}
                fontWeight="sm"
              />
              <SignInUpTypography
                text={signInUpTranslate(`${type}.LINK`, "sigInUpConstants")}
                variant="sm"
                color={theme.palette.signInTextLink.main}
                fontWeight="lg"
                sx={{
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => {
                  if (type === "signin") {
                    router.push("/signup");
                  } else if (type === "signup") {
                    router.push("/signin");
                  } else if (type === "forgot-password") {
                    router.push("/forgot-password");
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
            variant="xl"
            text={signInUpTranslate(`LOGO`, "sigInUpConstants")}
          />
        </div>
        <SignInUpTypography
          variant="xs"
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
