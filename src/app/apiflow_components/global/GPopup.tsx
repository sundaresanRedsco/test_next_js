import { SecondarySignInUPTypography } from "@/app/Styles/signInUp";
import { Box } from "@mui/material";
import React from "react";
import GlobalButton from "./GButton";
import { WarningIcon } from "@/app/Assests/icons";

type Props = {
  message: string;
  isOpen: boolean;
  handleClose: any;
  height?: string;
  width?: string;
};

export default function GPopup({
  message,
  isOpen,
  handleClose,
  height,
  width,
}: Props) {
  return (
    <Box
      hidden={!isOpen}
      sx={{
        width: width ? width : "100%",
        height: height ? height : "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
        zIndex: 1111,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
          background: "#121212",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px 0px #FFFFFF1A",
          flexDirection: "column",
          minWidth: "200px",
          paddingX: "40px",
          maxWidth: "60%",
        }}
      >
        <WarningIcon />
        <SecondarySignInUPTypography
          sx={{
            color: "white",
            fontSize: "13px",
            marginBottom: "10px",
            marginTop: "8px",
            textAlign: "center",
          }}
        >
          {message}
        </SecondarySignInUPTypography>
        <GlobalButton
          onClickHandler={handleClose}
          label={"Close"}
          background="#7A43FE"
          color="white"
        />
      </Box>
    </Box>
  );
}
