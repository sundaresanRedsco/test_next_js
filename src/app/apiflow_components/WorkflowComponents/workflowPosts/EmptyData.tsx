import { SecondarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box } from "@mui/material";
import React from "react";

type Props = {
  text: string;
};

export default function EmptyData({ text }: Props) {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      <SecondarySignInUPTypography sx={{ color: "slategray" }}>
        {text}
      </SecondarySignInUPTypography>
    </Box>
  );
}
