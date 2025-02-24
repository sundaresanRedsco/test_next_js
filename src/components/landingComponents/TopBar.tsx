"use client";

import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  authButtonStyles,
  LogoNameTypography,
  navBarBoxStyles,
  navBarStyles,
  navLinkStyles,
  NavLinkTypography,
  topBarStyles,
} from "@/styles/landingPage";
import { NavButtons } from "./NavButtons";
import LogoWhite from "@/assests/svgs/LogoWhite";
import { landingPageTranslate } from "@/helpers/helpersFunctions";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const TopBar = () => {
  const theme = useTheme();
  const navLinks = [
    { label: `${landingPageTranslate("HOME")}`, id: 1 },
    { label: `${landingPageTranslate("PRICING")}`, id: 2 },
    { label: `${landingPageTranslate("ABOUT")}`, id: 3 },
  ];

  const [selectedNavLink, setSelectedNavLink] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const MobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "300px",
          backgroundColor: `${theme.palette.signInTextTertiary.main} !important`,
          padding: "20px",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton
          onClick={toggleMobileMenu}
          sx={{ color: `${theme.palette.landingPrimary.main}` }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {navLinks.map((item) => (
          <NavLinkTypography
            key={item.id}
            selected={item.label === selectedNavLink}
            onClick={() => {
              setSelectedNavLink(item.label);
              toggleMobileMenu();
            }}
            sx={{ textAlign: "center" }}
          >
            {item.label}
          </NavLinkTypography>
        ))}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <NavButtons />
        </Box>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={topBarStyles}>
        <Box
          sx={{
            ...navBarStyles,
            padding: {
              xs: "10px 16px",
              sm: "15px 24px",
              md: "20px 32px",
            },
          }}
        >
          <Box
            sx={{
              ...navBarBoxStyles,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                "& svg": {
                  width: { xs: "24px", sm: "32px", md: "40px" },
                  height: "auto",
                },
              }}
            >
              <LogoWhite />
              <LogoNameTypography>
                {`  ${landingPageTranslate("API_TRAIL")}`}
              </LogoNameTypography>
            </Box>
            {!isMobile && (
              <>
                <Box sx={navLinkStyles}>
                  {navLinks.map((item) => (
                    <NavLinkTypography
                      key={item.id}
                      selected={item.label === selectedNavLink}
                      onClick={() => setSelectedNavLink(item.label)}
                    >
                      {item.label}
                    </NavLinkTypography>
                  ))}
                </Box>

                <Box sx={authButtonStyles}>
                  <NavButtons />
                </Box>
              </>
            )}
            {isMobile && (
              <IconButton
                onClick={toggleMobileMenu}
                sx={{ color: `${theme.palette.landingPrimary.main}` }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <MobileMenu />
    </Box>
  );
};

export default TopBar;
