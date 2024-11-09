import {
  PrimarySignInUPTypography,
  TertiarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Box } from "@mui/material";
import React from "react";

type Props = { count: number };

export default function SelectedCountButton({ count }: Props) {
  return (
    <Box
      sx={{
        background: "#37265C",
        border: "1.5px solid #F3F3F340",
        borderRadius: "7px",
        minWidth: "100px",
        height: "30px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "3px",
        textAlign: "end",
      }}
    >
      <PrimarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "13px",
        }}
      >
        {count}
      </PrimarySignInUPTypography>
      <TertiarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "10px",
        }}
      >
        Selected
      </TertiarySignInUPTypography>
    </Box>
  );
}
