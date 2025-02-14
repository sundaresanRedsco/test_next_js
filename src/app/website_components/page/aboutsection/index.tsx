import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { AutoSlideCarousel } from "./AutoSlideCarousel";
import SurfaceButton from "@/app/website_components/layout/SurfaceButton";

type Props = {};

export default function AboutSection({}: Props) {
  const slidindObjects: string[] = [
    "/page/aboutsection/AWS_Simple_Icons_AWS_Cloud.svg.png",
    "/page/aboutsection/Microsoft_Azure.svg",
    "/page/aboutsection/Google_Cloud_logo.svg",
    "/page/aboutsection/kong.svg",
    "/page/aboutsection/swagger.svg",
    "/page/aboutsection/postman-icon.svg",
    "/page/aboutsection/rest.svg",
    "/page/aboutsection/logstash.svg",
    "/page/aboutsection/servicenow-header-logo.svg",
  ];
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: {
          md: "100px 100px 0 0",
          sm: "32px 32px 0 0",
          xs: "32px 32px 0 0",
        },
        borderTop: "1px solid rgba(255,255,255,.14)",
        background:
          "url('/page/heroSection/background.jpg') no-repeat center/cover,linear-gradient(#14142066,#141420 120.83%)",
        paddingBottom: "100px",
        width: "100%",
        zIndex: 1,
        "&::before": {
          content: "''",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          background: "linear-gradient(#14142066,#141420 120.83%)",
          borderRadius: {
            md: "100px 100px 0 0",
            sm: "32px 32px 0 0",
            xs: "32px 32px 0 0",
          },
        },
      }}
    >
      <Stack
        sx={{
          position: "relative",
          zIndex: 2,
          margin: { md: "0 120px", sm: 0 },
          alignItems: "center",
          padding: "0 40px",
          gap: "40px",
        }}
      >
        <Typography
          component={"h2"}
          sx={{
            color: "white",
            fontWeight: "bold",
            textWrap: "wrap",
            wordBreak: "break-word",
            marginBlock: 0,
            fontSize: { md: "48px", sm: "32px", xs: "20px" },
            lineHeight: { md: "56px", sm: "40px", xs: "40px" },
            marginTop: "100px",
            textAlign: "center",
          }}
        >
          Support for more than 150 data sources and Api platforms.
        </Typography>
        <Box
          sx={{
            width: "100%",
            maskImage:
              "linear-gradient(to right,#0000,#000 12.5%,#000 87.5%,#0000)",
          }}
        >
          <AutoSlideCarousel data={slidindObjects} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {[
            {
              id: 1,
              name: "Join Discord community",
              to: "",
              icon: "/page/icons/discord.svg",
            },
            {
              id: 2,
              name: "Join GitHub discussions",
              to: "",
              icon: "/page/icons/github.svg",
            },
          ].map((elem, index) => {
            return (
              <SurfaceButton
                key={index}
                data={{
                  id: 1,
                  name: elem.name,
                  to: "",
                  icon: <Box component={"img"} src={elem.icon} />,
                }}
                customStyle={{
                  padding: "12px 32px",
                  borderRadius: "999px",
                  background: "#111a3c66",
                  gap: "12px",
                }}
              />
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
}
