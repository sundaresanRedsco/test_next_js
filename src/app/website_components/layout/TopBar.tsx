"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React from "react";
import DropDownMenu from "./DropDownMenu";
import SurfaceButton from "./SurfaceButton";
import { GitHub } from "@mui/icons-material";

export interface MenuItem {
  id: number;
  name: string;
  to: string;
  icon?: any;
  count?: string;
  bg?: string;
  sm?: boolean;
}
interface Props {
  window?: () => Window;
  children?: React.ReactElement<any>;
}
function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  const background = trigger
    ? "linear-gradient(225deg,#24215138,#2623533b 40.11%,#2f2d6126),#141420cc"
    : "transparent";

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        style: {
          background,
          transition: "background 0.3s ease",
          backdropFilter: "blur(10px)",
        },
      })
    : null;
}

export default function TopBar(props: Props) {
  const menus: MenuItem[] = [
    {
      id: 6,
      name: "About",
      to: "",
    },
  ];
  const buttons: MenuItem[] = [
    {
      id: 2,
      name: "Sign in",
      to: "/sign",
    },
    {
      id: 3,
      name: "Get started",
      to: "/sign/signup",
      bg: "linear-gradient(90deg,#6b47f7 7.35%,#7f46ff 112.43%)",
    },
  ];
  return (
    <ElevationScroll {...props}>
      <AppBar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingX: "16px",
          }}
        >
          <Box
            sx={{
              width: { sm: "82.5%", xs: "100%" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Toolbar sx={{ padding: 0 }}>
              <Box
                sx={{ height: { sm: "33px", xs: "25px" } }}
                component={"img"}
                src="/layout/api_flow_logo.svg"
              />
            </Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: { lg: "flex", md: "none", xs: "none" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {menus.map((elem, index) => {
                  return <DropDownMenu key={index} data={elem} />;
                })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                {buttons.map((elem, index) => {
                  return <SurfaceButton key={index} data={elem} />;
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </ElevationScroll>
  );
}
