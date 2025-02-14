"use client";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import TopBar from "./TopBar";

interface Props {
  window?: () => Window;
  children?: any;
}

function ScrollTop(props: Props) {
  const { children, window } = props;

  // Detect if the user has scrolled past the threshold
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  // Handle the scroll to top action
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Access the inner content container
    const contentContainer = document.querySelector("#scrollable-container");

    if (contentContainer) {
      // Scroll the container back to the top
      contentContainer.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 3 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function Surfacelayout(props: Props) {
  return (
    <>
      <TopBar />
      <Toolbar id="back-to-top-anchor" />
      <Box
        id="scrollable-container"
        sx={{
          width: "100%",
          height: "90vh", // Keep this as it is to ensure full viewport height
          overflowY: "auto", // Allow scrolling inside the container
          position: "relative",
        }}
      >
        {props.children}
      </Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
