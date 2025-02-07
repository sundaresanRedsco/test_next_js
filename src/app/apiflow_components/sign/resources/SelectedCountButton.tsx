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
        "@media (min-width: 2120px)": {
          height: "40px",
          minWidth: "150px",
        },
      }}
    >
      <PrimarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "13px",
          "@media (min-width: 2120px)": {
            fontSize: "20px",
          },
        }}
      >
        {count}
      </PrimarySignInUPTypography>
      <TertiarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "10px",
          "@media (min-width: 2120px)": {
            fontSize: "18px",
          },
        }}
      >
        Selected
      </TertiarySignInUPTypography>
    </Box>
  );
}
