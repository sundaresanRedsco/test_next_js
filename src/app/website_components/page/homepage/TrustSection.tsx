"use client";
import SurfaceButton from "@/app/website_components/layout/SurfaceButton";
import { Box } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import SideImage from "../../../../public/page/homepage/soc2-DeNSns8d.png";
import Image from "next/image";
import { IconButton } from "@mui/material";

import { styled } from "@mui/system";

type Props = {};
// Create a styled Typography component
const StyledTypography = styled(Typography)(({ theme }) => ({
  // display: "flex",
  // alignItems: "center",
  background: "#ffffff1a", // Semi-transparent white background
  borderRadius: "50px",
  padding: "8px 10px",
  fontSize: "0.9rem",
  color: "white", // Adapting to the theme's text color
  margin: "10px",
  width: "fit-content",
  marginTop: "20px",
  // width: "100%",
}));

export default function TrustSection({}: Props) {
  const leftItems = [
    "Open-source",
    "Self-hosting assurance",
    "Role-Level Security",
    "Argon2 algorithm",
    "High availability",
  ];

  const rightItems = [
    "Community-driven",
    "Data protection",
    "TLS encryption",
    "Data isolation",
    "Database encryption",
  ];
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        padding: "0 40px",
        marginTop: "30px",
      }}
    >
      <Typography
        component={"h2"}
        sx={{
          color: "white",
          fontSize: "40px",
          fontWeight: "bold",
          textWrap: "wrap",
          wordBreak: "break-word",
          textAlign: "center",
          marginBlock: 0,
          lineHeight: "64px",
        }}
      >
        Trust and security
      </Typography>
      {/* card section */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          textAlign: { xs: "center", md: "left" },
          background:
            "radial-gradient(372.84% 141.42% at 0% 0%, #ffffff2e, #ffffff0f)",
          borderRadius: "15px",
          marginTop: "5px",
          padding: { xs: "0px", sm: "20px" },
        }}
      >
        <Grid item xs={12} md={2} sx={{ padding: "0px !important" }}>
          <Image
            src={SideImage} // Replace with your logo URL or import
            alt="SOC 2 Logo"
            style={{
              width: "100px",
              margin: "0 auto",
              display: "block",
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} sx={{ padding: "0px !important" }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              color: "#5cf",
            }}
          >
            SOC 2 Compliant
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "#ffffffb3",
            }}
          >
            Logto has undergone the AICPA SOC 2 Type I certification to validate
            Security, Availability, and Confidentiality controls. With a Type II
            audit on the horizon, we aim to further demonstrate our commitment
            to security and compliance.
          </Typography>
        </Grid>
      </Grid>

      {/* tree section */}

      <Box
        sx={{
          padding: "50px",
          color: "white",

          position: "relative",
          width: "100%",

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
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {/* Left side items */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            {leftItems.map((item, index) => (
              <StyledTypography
                key={index}
                sx={{
                  marginLeft: index % 2 === 0 ? "0" : "40px",
                  marginRight: index % 2 === 0 ? "40px" : "0",
                }}
              >
                <CheckCircleIcon
                  sx={{ color: "#8A52F7", marginRight: "10px" }}
                />
                {item}
              </StyledTypography>
            ))}
          </Grid>

          {/* Center icon */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "50px",
                textAlign: "center",
              }}
            >
              <IconButton>
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#8A52F7",
                    borderRadius: "50%",
                    position: "relative",
                  }}
                >
                  {/* User Icon */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                    }}
                  >
                    <Typography variant="h2">👤</Typography>
                  </Box>
                </Box>
              </IconButton>
            </Box>
          </Grid>

          {/* Right side items */}
          <Grid
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
            item
            xs={12}
            md={4}
          >
            {rightItems.map((item, index) => (
              <StyledTypography
                key={index}
                sx={{
                  marginLeft: index % 2 === 0 ? "0" : "40px",
                  marginRight: index % 2 === 0 ? "40px" : "0",
                }}
              >
                <CheckCircleIcon
                  sx={{ color: "#8A52F7", marginRight: "10px" }}
                />
                {item}
              </StyledTypography>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/*  */}
      <Typography
        variant={"body1"}
        sx={{
          color: "#ffffffb3",
          textAlign: "center",
        }}
      >
        Logto Cloud is hosted in the EU 🇪🇺 and US 🇺🇸 regions and provides robust
        security with stringent protocol adherence, DevSecOps practices,
        advanced encryption, and measures for data isolation and protection.
      </Typography>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <SurfaceButton
          data={{
            name: "Learn More about security and trust",
            id: 1,
            to: "",
          }}
        />
      </Box>
    </Box>
  );
}
