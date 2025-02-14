"use client";

import SurfaceButton from "@/components/layout/SurfaceButton";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import Discord from "../../../../public/surface/footer/discord";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";

type Props = {};

export default function NewsLetter({}: Props) {
  const iconsList = [
    {
      id: 1,
      icon: <Discord />,
    },
    {
      id: 2,
      icon: <GitHubIcon />,
    },
    {
      id: 3,
      icon: <TwitterIcon />,
    },
    {
      id: 4,
      icon: <EmailRoundedIcon />,
    },
    {
      id: 5,
      icon: <YouTubeIcon />,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        flexBasis: "280px",
        flexShrink: 0,
      }}
    >
      <Typography
        sx={{
          color: "#f7f8f8",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
        }}
      >
        Subscribe Logto newsletters
      </Typography>
      <Typography
        sx={{
          color: "#747778",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      >
        Stay on top of the latest product updates, development inspirations,
        blogs, and research prompt.
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#f7f8f8",
          }}
        >
          Email address
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "var(--input-border-radius, 6px)",
          border: "1px solid var(--color-input-border, #5c5f60)",
          outline: "1px solid transparent",
          transitionProperty: "outline, border",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: ".2s",
          background: "var(--color-input-background, #2a2c32)",
          height: "var(--input-height, 44px)",
          overflow: "hidden",
          "&:focus-within": {
            border: "1px solid var(--color-input-border, #7547FB)", // Change color on focus
            outline: "1px solid transparent", // Keep the outline on focus
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <TextField
          variant="standard" // Using standard variant for this example
          name="email"
          placeholder="Enter email address"
          InputProps={{
            disableUnderline: true, // Disables the default underline in standard variant
            sx: {
              width: "100%",
              "-webkit-appearance": "none",
              "-moz-appearance": "none",
              appearance: "none",
              color: "var(--color-input-text, #f7f8f8)",
              fontSize: "14px",
              lineHeight: "20px",
              background: "transparent",
              padding:
                "var(--input-padding-y, 8px) var(--input-padding-x, 12px)",
              "&:focus": {
                outline: "none", // Remove default focus outline
              },
            },
          }}
        />
      </Box>
      <SurfaceButton
        customStyle={{
          padding: "10px 16px",
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 500,
          color: "#f7f8f8",
        }}
        varient="filled"
        data={{ name: "Subscribe", id: 1, to: "", bg: "" }}
      />

      <Box
        sx={{
          display: "flex", 
          gap: "30px", 
        }}
      >
        {iconsList?.map((val) => (
          <Box
            key={val.id}
            sx={{
              width: "20px",
              height: "20px",
              color: "#a9acac",
              transition: "color .2s ease-in-out",
              "&:hover": {
                color: "#ffffff", 
              },
            }}
          >
            {val.icon}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
