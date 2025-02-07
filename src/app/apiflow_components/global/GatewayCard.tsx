import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import { SecondarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";

type Props = {
  icon: any;
  label: string;
  onClick: () => void;
  isActive?: boolean;
};

export default function GatewayCard({ isActive, icon, label, onClick }: Props) {
  const [isHovered, setisHovered] = useState(false);
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "100%",
        display: "flex",
        // background: isActive
        //   ? "linear-gradient(180deg, #3C1B8C 9.65%, #7A43FE 100%)"
        //   : "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.125) 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 3,
        borderRadius: "10px",
        transition: "background 3s, box-shadow 3s",
        // "&:hover": {
        //   background: "linear-gradient(180deg, #3C1B8C 9.65%, #7A43FE 100%)",
        // },
        // boxShadow: "0px 0 1px #FFFFFF40",
        cursor: "pointer",
        textTransform: "none",
        position: "relative",
        "@media (min-width: 2120px)": {
          padding: 8,
          borderRadius: "15px",
        },
      }}
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {icon}
      </Box>
      <SecondarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "8px",
          position: "relative",
          zIndex: 1,
          "@media (min-width: 2120px)": {
            fontSize: "15px",
          },
        }}
      >
        {label}
      </SecondarySignInUPTypography>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          background: "linear-gradient(180deg, #3C1B8C 9.65%, #7A43FE 100%)",
          opacity: isActive || isHovered ? 1 : 0,
          transition: ".3s",
          boxShadow: "0px 0 1px #FFFFFF40",
          "@media (min-width: 2120px)": {
            borderRadius: "15px",
          },
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.125) 100%)",
          opacity: !isActive && !isHovered ? 1 : 0,
          transition: ".3s",
          boxShadow: "0px 0 1px #FFFFFF40",
          "@media (min-width: 2120px)": {
            borderRadius: "15px",
          },
        }}
      ></Box>
    </Button>
  );
}
