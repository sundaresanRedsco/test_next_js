import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  img: string;
  title: string;
};

export default function MultifactorAuthCard({ img, title }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        border: "1px solid rgba(255,255,255,.12)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "10px",
        padding: "20px",
        fontSize: "14px",
        fontWeight: "bold",
        lineHeight: "22px",
        height: "156px",
        whiteSpace: "pre-wrap",
        background: "#ffffff1a",
        color: "#fffc",
      }}
    >
      <Box component={"img"} src={img} sx={{ height: "32px" }} />
      <Typography
        component={"p"}
        sx={{
          fontSize: "14px",
          lineHeight: "22px",
          textAlign: "center",
          flex: 1,
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          position: "relative",
          background: "#fffc",
          width: "30px",
          borderRadius: "15px",
          height: "18px",
          "&::before": {
            content: "''",
            position: "absolute",
            background: "#7958ff",
            width: "100%",
            height: "100%",
            borderRadius: "100px",
            top: 0,
            left: 0,
            transition: "opacity .35s ease-in-out",
            opacity: "100%",
          },
          "&::after": {
            content: "''",
            position: "absolute",
            background: "#fff",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            top: "1px",
            left: "1px",
            transition: "transform .3s ease-in-out",
          },
        }}
      ></Box>
    </Box>
  );
}
