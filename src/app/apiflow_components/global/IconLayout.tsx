import { Box } from "@mui/material";
import React from "react";

export default function IconLayout({ children, height, width }: any) {
  return (
    <Box
      sx={{
        height: height || "100%",
        width: width || "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
