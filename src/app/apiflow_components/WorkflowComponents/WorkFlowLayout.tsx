import { Box } from "@mui/material";
import React from "react";

type Props = { children: any };

export default function WorkFlowLayout({ children }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "#191C1D",
        stroke: "#ACAAB380",
        borderRadius: "15px",
        position: "relative",
        boxShadow: "inset 0 0 0 1px #ACAAB380",
        marginTop: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(99.67deg, rgba(69, 122, 184, 0.75) 3.09%, rgba(186, 83, 193, 0.75) 48.17%, rgba(79, 76, 255, 0.75) 90.61%)",
          borderRadius: "15px",
          backdropFilter: "blur(150px)",
          opacity: "50%",
          position: "absolute",
          top: 0,
          boxShadow: "inset 0 0 100px 1px black",
        }}
      ></Box>
      <Box
        sx={{ position: "relative", zIndex: 1, height: "100%", width: "100%" }}
      >
        {children}
      </Box>
    </Box>
  );
}
