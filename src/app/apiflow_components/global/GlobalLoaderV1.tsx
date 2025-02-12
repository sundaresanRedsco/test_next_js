"use client";

import React from "react";
import { styled, keyframes } from "@mui/system";
import { Backdrop, Typography } from "@mui/material";

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

const HeadingTypography = styled(Typography)`
  font-family: Firasans-regular;
  color: white;
  font-weight: 900;
  position: absolute;
  top: 55%;
`;
const GlobalLoader = () => {
  return (
    <Backdrop sx={{ zIndex: 99999 }} open={true}>
      <LoaderContainer>
        <BoxContainer></BoxContainer>
        <Shadow></Shadow>
      </LoaderContainer>
      <HeadingTypography sx={{ marginTop: "20px" }}>
        loading...
      </HeadingTypography>
    </Backdrop>
  );
};

export default GlobalLoader;
