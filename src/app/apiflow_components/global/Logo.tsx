import { PrimarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Logo({}: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box
        sx={{
          height: "35px",
          width: "35px",
          "@media (min-width: 1600px)": {
            height: "60px",
            width: "60px",
          },
        }}
      >
        <Image
          height={100}
          width={100}
          src={"/global/logo.png"}
          alt="Apiflow-logo"
          style={{
            marginRight: 5,
            height: "100%",
            width: "100%",
          }}
        />
      </Box>

      <PrimarySignInUPTypography
        sx={{
          color: "white",
          fontSize: "25px",
          "@media (min-width: 1600px)": {
            fontSize: "45px",
          },
        }}
      >
        API Flow
      </PrimarySignInUPTypography>
    </Box>
  );
}
