import { SecondarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box, Button } from "@mui/material";
import React from "react";

type Props = {
  icon: any;
  label: string;
  onClick: () => void;
  isActive?: boolean;
};

export default function GatewayCard({ isActive, icon, label, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "100%",
        display: "flex",
        background: isActive
          ? "linear-gradient(180deg, #3C1B8C 9.65%, #7A43FE 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.125) 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 2,
        borderRadius: "10px",
        transition: "background 3s, box-shadow 3s",
        "&:hover": {
          background: "linear-gradient(180deg, #3C1B8C 9.65%, #7A43FE 100%)",
        },
        boxShadow: "0px 0 1px #FFFFFF40",
        cursor: "pointer",
        textTransform: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <SecondarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "8px",
        }}
      >
        {label}
      </SecondarySignInUPTypography>
    </Button>
  );
}
