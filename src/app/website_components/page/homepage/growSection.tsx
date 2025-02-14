"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const points = [
  "Any deployment stage",
  "Any API Gateway ",
  "Any infrastructure",
];
export default function GrowSection() {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        component={"h2"}
        sx={{
          color: "white",
          fontSize: { xs: "32px", sm: "40px", md: "48px", lg: "56px" },
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "40px",
          lineHeight: "64px",
        }}
      >
        Grow and scale, with
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          padding: "1rem",
          borderRadius: "10px", // Smoother, more noticeable rounding
          // overflow: "hidden", // Prevents overflow of elements

          "&::before": {
            // transform: "scale(1.05)", // Slight zoom on hover for interactivity
            content: '""',
            position: "absolute",
            background: `
               conic-gradient(from 0deg at 50% 50%, #e18bff, #e0f 64.02deg, #00a6ff 123.256deg, #4797ff 178.055deg, #04f 227.505deg, #9f49f7 281.258deg, #f0c 360deg)`,
            borderRadius: "inherit",
            width: "100%",
            opacity: "20%",
            top: 0,
            bottom: 0,
            filter: "blur(70px)",
            zIndex: "-1",
          },
        }}
      >
        
      </Box>

      <Typography
        variant={"h4"}
        sx={{
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "40px",
          fontSize: { xs: "32px", sm: "32px", md: "40px", lg: "48px" },
        }}
      >
        Secure your API's at all stages of your deployments
      </Typography>
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          justifyContent: "center",
          margin: "10px 10px",
        }}
      >
        {points.map((x: string) => (
          <Typography
            key={x}
            variant={"body1"}
            sx={{
              color: "#ffffffb3",
              textAlign: "center",
              fontSize: { xs: "15px", sm: "1rem" },
            }}
          >
            {" "}
            <CheckCircleIcon sx={{ color: "#8A52F7", margin: "0px 10px " }} />
            {x}
          </Typography>
        ))}
      </Box>

      <Typography
        variant={"body1"}
        sx={{
          color: "#ffffffb3",
          textAlign: "center",
        }}
      >
        Whether you're evolving as a API service provider, or large
        enterprise, ApiFlow can help quickly implement those must-have
        security protection features around your API's.
      </Typography>
    </Box>
  );
}
