"use client";

import SurfaceButton from "@/app/website_components/layout/SurfaceButton";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Banner from "./Banner";
import { MenuItem } from "@/app/website_components/layout/TopBar";
import Tick from "../../../../../public/page/heroSection/Tick";

type Props = {};

export default function HeroSection({}: Props) {
  const buttons: MenuItem[] = [
    {
      id: 1,
      name: "Start with free",
      to: "/sign/signup",
      bg: "linear-gradient(90deg,#6b47f7 7.35%,#7f46ff 112.43%)",
    },
    {
      id: 2,
      name: "Contact us",
      to: "",
    },
  ];
  return (
    <Stack
      sx={{
        width: "100%",
        position: "relative",
        alignItems: "center",
        gap: "60px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: { xs: "0 10px", sm: "0 40px", md: "0 40px", lg: "0 40px" },
          margin: "60px 0 0 0",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          gap: { xs: "100px", sm: "100px", md: "100px", lg: 0 },
        }}
      >
        <Stack
          sx={{
            maxWidth: { lg: "400px", md: "100%", sm: "100%", xs: "100%" },
            gap: 3,
            textAlign: {
              lg: "start",
              md: "center",
              sm: "center",
              xs: "center",
            },
            alignItems: {
              lg: "start",
              md: "center",
              sm: "center",
              xs: "center",
            },
          }}
        >
          <Typography
            component={"h1"}
            sx={{
              color: "white",

              fontWeight: "bold",
              textWrap: "wrap",
              wordBreak: "break-word",
              marginBlock: 0,
              fontSize: { xs: "32px", sm: "32px", md: "40px", lg: "48px" },
              lineHeight: "52px",
            }}
          >
            The best Api's visibility tool for organization
          </Typography>
          <Typography
            sx={{
              color: "#ffffffb3",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Every api needs authentication and authorization. Api flow make sure
            all your api's are secure in real time and with AI you get the all
            the security vulnerabilities covered all the time.
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
              width: { sm: "auto", xs: "100%" },
              justifyContent: "center",
            }}
          >
            {buttons.map((elem, index) => {
              return (
                <SurfaceButton
                  key={index}
                  data={elem}
                  fontSize="16px"
                  paddingX="32px"
                  paddingY="16px"
                  borderRadius="12px"
                  lineHeight="24px"
                />
              );
            })}
          </Box>
        </Stack>
        <Banner />
      </Box>
      <Stack
        direction={"row"}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        <Tick />
        <Typography
          sx={{
            color: "#ffffffb3",
            fontSize: "14px",
            lineHeight: "26px",
          }}
        >
          Work seemlessly with many Api Platforms - cloud or on-premise
        </Typography>
      </Stack>
    </Stack>
  );
}
