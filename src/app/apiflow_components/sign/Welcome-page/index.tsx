import GButton from "@/app/Components/Global/GlobalButtons";
import {
  PrimarySignInUPTypography,
  PrimaryTypography,
  SecondarySignInUPTypography,
  TertiarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import { ArrowForwardRounded } from "@mui/icons-material";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";

export default function WelcomePage() {
  const { handleStep } = useSignUpStore();
  localStorage.clear();
  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        component={"img"}
        src={"/sign/StyledLayerImg.webp"}
        alt="Apiflow-logo"
        style={{
          bottom: 0,
          left: 0,
          position: "absolute",
          width: "300px",
        }}
      />
      <Image
        height={50}
        width={50}
        src={"/global/logo.webp"}
        alt="Apiflow-logo"
      />
      <PrimarySignInUPTypography
        sx={{
          color: "white",
          fontSize: { xs: "30px", md: "50px" },
          textAlign: "center",
        }}
      >
        Welcome to API Flows
      </PrimarySignInUPTypography>
      <TertiarySignInUPTypography
        sx={{
          color: "#F3F3F3BF",
          marginTop: 1,
        }}
      >
        Better API Visibility, Lesser Complexity
      </TertiarySignInUPTypography>
      <GButton
        padding="12px 34px"
        label={"Let’s Get Started"}
        iconPosition="end"
        icon={<ArrowForwardRounded />}
        background={"#7A43FE"}
        color="white"
        fontSize="15px"
        margin="70px 0 0 0"
        fontWeight={600}
        onClickHandler={handleStep}
      />
    </Stack>
  );
}
