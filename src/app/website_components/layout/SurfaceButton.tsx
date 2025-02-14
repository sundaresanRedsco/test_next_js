"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import { MenuItem } from "./TopBar";

type Props = {
  data: MenuItem;
  varient?: string;
  customStyle?: object;
  fontSize?: string;
  borderRadius?: string;
  paddingX?: string;
  paddingY?: string;
  lineHeight?: string;
};

export default function SurfaceButton({
  data,
  varient,
  customStyle,
  fontSize,
  borderRadius,
  paddingX,
  paddingY,
  lineHeight,
}: Props) {
  const handleClick = () => {
    if (data.to) {
      window.open(data.to, "_blank"); // Opens the link in a new tab
    }
  };
  return (
    <Box
      component={"button"}
      onClick={handleClick}
      sx={{
        color: data.bg ? "white" : "#e5e1ec",
        paddingX: paddingX || "15px",
        paddingY: paddingY || "6px",
        "&:hover": {
          background: "",
        },
        background: data.bg
          ? data.bg
          : varient == "filled"
          ? "linear-gradient(90deg,#6b47f7 7.35%,#7f46ff 112.43%)"
          : "linear-gradient(90.09deg,#111a3c33 5.32%,#654eaf33 114.11%),linear-gradient(0deg,#efefef0a,#efefef0a),#1b233933",

        border: data.bg || varient == "filled" ? "" : "1px solid #ffffff29",
        display: {
          xs: data?.sm ? "none" : "flex",
          sm: data?.sm ? "none" : "flex",
          md: "flex",
        },
        gap: "3px",
        alignItems: "flex-end",
        justifyContent: "center",
        fontSize: fontSize || "14px",
        borderRadius: borderRadius || "8px",
        lineHeight: lineHeight || "",
        ...customStyle,
      }}
    >
      <div>{data.icon}</div>
      <div>{data.name}</div>
      <div>{data.count}</div>
    </Box>
  );
}
