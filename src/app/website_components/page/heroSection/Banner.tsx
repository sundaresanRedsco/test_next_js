import { Box } from "@mui/material";
import React from "react";

type Props = {};

export default function Banner({}: Props) {
  return (
    <Box
      sx={{
        width: "721px",
        height: "480px",
        zoom: { lg: 1, md: 0.8, sm: 0.5, xs: 0.5 },
        position: "relative",
        // display: {
        //   md: "flex",
        //   sm: "none",
        //   xs: "none",
        // },
      }}
    >
      <Box
        sx={{
          opacity: 1,
          transform: "none",
          width: "648px",
          height: "419px",
          position: "absolute",
          top: 0,
          right: 0,
          backgroundImage:
            "url('/page/heroSection/banner/backgroundLayer.svg')",
          boxShadow: "0 3.8px 22.5px #ded4fd29",
          borderRadius: "12px",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            padding: "2px",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            component={"img"}
            src="/page/heroSection/banner/bg1.jpg"
            sx={{
              // backgroundImage: "url('')",
              // backgroundSize: "100% 100%",
              // backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
              borderRadius: "12px",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            boxShadow: "0 3.8px 22.5px #ded4fd29",
            bottom: "-5px",
            right: "-20px",
            // bottom: "12px",
            // right: "12px",
            width: "525px",
            height: "280px",
            borderRadius: "8px",
            backdropFilter: "blur(9px)",
            padding: 1,
            background: "#251f4b",
          }}
        >
          <Box
            component={"img"}
            src="/page/heroSection/banner/bg2.png"
            sx={{
              // backgroundImage: "url('/page/heroSection/banner/bg2.png')",
              // backgroundSize: "100% 100%",
              // backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
              borderRadius: "12px",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "260px",
          height: "296px",
          borderRadius: "12px",
          boxShadow: "0 3.8px 22.5px #ded4fd29",
          backdropFilter: "blur(20px)",
          padding: 1,
          background: "#121212",
        }}
      >
        <Box
          component={"img"}
          src="/page/heroSection/banner/bg3.png"
          sx={{
            opacity: 1,
            transform: "none",
            borderRadius: "12px",
            width: "100%",
            height: "100%",
            // backgroundImage: "url('/page/heroSection/banner/bg3.png')",
            // backgroundSize: "100% 100%",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
          }}
        />
      </Box>
    </Box>
  );
}
