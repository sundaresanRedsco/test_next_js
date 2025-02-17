"use client";
import SurfaceButton from "@/app/website_components/layout/SurfaceButton";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { keyframes } from "@mui/system";

type Props = {};

interface MenuItem {
  id: number;
  name: string;
  to: string;
  icon?: any;
  count?: string;
  bg?: string;
}

export default function ManageIdentities({}: Props) {
  const svgRef = useRef<any>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.style.opacity = "1";
            target.style.transform = "translateY(0) scale(1)";
          } else {
            target.style.opacity = "0";
            target.style.transform = "translateY(50px) scale(0.8)";
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is in view
      }
    );

    const current = svgRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        // position: "relative",
        width: "100%",
        padding: "0 40px",
        // marginTop: "30px",
        marginBottom: { xs: "20px", md: "100px", sm: "20px", lg: "100px" },
        // backgroundColor: "#141420",
      }}
    >
      <Box
        sx={{
          position: "relative",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant={"h2"}
          sx={{
            color: "white",
            fontSize: { xs: "18px", sm: "32px", md: "40px", lg: "48px" },
            fontWeight: 700,
            textWrap: "wrap",
            wordBreak: "break-word",
            textAlign: "center",
            marginBlock: 0,
            lineHeight: "56px",
            margin: {
              xs: "20px 0 20px",
              sm: "20px 0 20px",
              md: "100px 0 20px",
              lg: "100px 0 20px",
            },
          }}
        >
          See API workflow in Action
        </Typography>
      </Box>
      <Box
        sx={{
          height: {
            lg: "auto",
            sm: "calc(100% + 300px)",
            xs: "calc(100% + 400px)",
          },
          width: "100%",

          left: 0,

          objectFit: "cover",
          overflow: "clip",
        }}
        component={"img"}
        src="/page/heroSection/workflow.jpg"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            gap: 2,
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
      </Box>
    </Box>
  );
}
