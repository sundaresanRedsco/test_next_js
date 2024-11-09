import { Box } from "@mui/material";
import React from "react";
import { SecondaryTextTypography } from "../../Styles/signInUp";
import theme from "../../../Theme/theme";

const GAlertDetailBox = (props: any) => {
  const { label } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#F6F9FF",
        padding: "15px",
        borderRadius: "15px",
      }}
    >
      <SecondaryTextTypography
        style={{
          color: `${theme.palette.v2TeritiaryColor.main}`,
          textTransform: "capitalize",
          fontSize: "10px",
          fontWeight: 300,
        }}
      >
        {label}
      </SecondaryTextTypography>
    </Box>
  );
};

export default GAlertDetailBox;
