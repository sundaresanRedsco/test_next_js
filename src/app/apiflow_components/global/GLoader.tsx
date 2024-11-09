"use client";

import React from "react";
import { styled, keyframes } from "@mui/system";
import { Backdrop, Box, Typography } from "@mui/material";

const loaderAnimation = keyframes({
  "0%": { left: "-100px" },
  "100%": { left: "110%" },
});

const animateAnimation = keyframes({
  "17%": { borderBottomRightRadius: "3px" },
  "25%": { transform: "translateY(9px) rotate(22.5deg)" },
  "50%": {
    transform: "translateY(18px) scale(1,.9) rotate(45deg)",
    borderBottomRightRadius: "40px",
  },
  "75%": { transform: "translateY(9px) rotate(67.5deg)" },
  "100%": { transform: "translateY(0) rotate(90deg)" },
});

const shadowAnimation = keyframes({
  "50%": { transform: "scale(1.2,1)" },
});

const LoaderContainer = styled("div")({
  /* Uncomment this to make it run! */
  /* animation: `${loaderAnimation} 5s linear infinite`, */
  position: "absolute",
  top: "calc(50% - 20px)",
  left: "calc(50% - 20px)",
});

const BoxContainer = styled("div")({
  width: "50px",
  height: "50px",
  background: "#fff",
  animation: `${animateAnimation} 0.5s linear infinite`,
  position: "absolute",
  top: 0,
  left: 0,
  borderRadius: "3px",
});

const Shadow = styled("div")({
  width: "50px",
  height: "5px",
  background: "#000",
  opacity: 0.1,
  position: "absolute",
  top: "59px",
  left: 0,
  borderRadius: "50%",
  animation: `${shadowAnimation} 0.5s linear infinite`,
});

// color: ${({ theme }) => theme.palette.primaryWhite.main};
const HeadingTypography = styled(Typography)`
  font-family: Firasans-regular !important;
  color: white;
  position: absolute;
  top: 55%;
`;
const GLoader = ({
  isBackdrop,
  borderRadius,
}: {
  isBackdrop?: boolean;
  borderRadius?: any;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backdropFilter: "blur(1px)",
        position: "absolute",
        zIndex: 111111,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: isBackdrop ? "#0c070f78" : "transparent",
        borderRadius: borderRadius || "unset",
      }}
    >
      <LoaderContainer>
        <BoxContainer></BoxContainer>
        <Shadow></Shadow>
      </LoaderContainer>
      <HeadingTypography sx={{ marginTop: "20px" }}>
        loading...
      </HeadingTypography>
    </Box>
  );
};

export default GLoader;
