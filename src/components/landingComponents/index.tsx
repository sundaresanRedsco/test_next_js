"use client";

import React from "react";

import TopBar from "./TopBar";
import Image from "next/image";
import { Box, Container, useTheme } from "@mui/material";
import LandingPageBg from "../../../public/page/heroSection/LandingPageBg.png";
import HeroSection from "./HeroSection";

const LandingPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflowX: "hidden",
        overflowY: { xs: "auto" },
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
        <Image
          src={LandingPageBg}
          alt="Background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: `${theme.palette.landingBg.main}`,
          }}
        ></Box>
      </Box>
      <Container
        sx={{
          position: "relative",
        }}
      >
        <TopBar />
        <HeroSection />
      </Container>
    </Box>
  );
};

export default LandingPage;
