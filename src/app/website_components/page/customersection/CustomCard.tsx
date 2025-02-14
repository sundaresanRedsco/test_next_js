import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  md?: number;
  sm?: number;
  lg?: number;
  opacity?: string;
  transform?: string;
};

export default function CustomCard({
  children,
  title,
  description,
  md,
  sm,
  lg,
  transform,
  opacity,
}: Props) {
  return (
    <Grid
      lg={lg}
      md={md}
      sm={sm}
      xs={sm}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "80px",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(0deg,#fff0,#ffffff14)",
        boxShadow: "#00000040 0 1px 2px",
        flex: 1,
        overflow: "hidden",
        padding: "48px 32px",
        border: "1px solid rgba(255,255,255,.1)",
        transition: "box-shadow .25s ease-in-out",
        borderRadius: "24px",
        position: "relative",
        "&:hover": {
          cursor: "pointer",
          boxShadow: "#5cf3 0 2px 40px",
        },
      }}
    >
      <Box
        sx={{
          width: "500px",
          height: "500px",
          overflow: "visible",
          position: "absolute",
          top: "-290px",
          left: "50%",
          zIndex: 1,
          borderRadius: "500px",
          filter: "blur(70px)",
          opacity: opacity ? opacity : "40%",
          transform: transform,
          "&::after": {
            content: "''",
            position: "absolute",
            top: "30px",
            right: 0,
            bottom: "-30px",
            left: 0,
            background:
              "conic-gradient(from 0deg at 50% 50%,#ff0080,#e0f 54.892deg,#00a6ff 106.699deg,#4797ff 162deg,#04f 252deg,#9f49f7,#f0c 360deg)",
            opacity: "60%",
            transform: "rotate(180deg)",
          },
        }}
      />
      {children}
      <Stack sx={{ textAlign: "center" }}>
        <Typography
          component={"h3"}
          sx={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            lineHeight: "30px",
          }}
        >
          {title}
        </Typography>
        <Typography
          component={"p"}
          sx={{
            color: "#fff9",
            fontSize: "18px",
            lineHeight: "26px",
            minHeight: "31h",
            marginTop: "10px",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Grid>
  );
}
