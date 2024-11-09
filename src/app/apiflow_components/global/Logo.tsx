import { PrimarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

export default function Logo({}: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Image
        height={30}
        width={30}
        src={"/global/logo.png"}
        alt="Apiflow-logo"
        style={{ marginRight: 5 }}
      />
      <PrimarySignInUPTypography sx={{ color: "white", fontSize: "25px" }}>
        API Flow
      </PrimarySignInUPTypography>
    </Box>
  );
}
