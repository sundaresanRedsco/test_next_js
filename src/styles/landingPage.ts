import theme from "@/theme/theme";
import { Theme, Typography, SxProps } from "@mui/material";
import { styled } from "@mui/system";

export const centeredContainerStyles: SxProps<Theme> = {
  backgroundColor: "black",
  maxWidth: "100vw",
  minHeight: "100vh",
};

export const centeredBoxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

export const topBarStyles = {
  height: { xs: "60px", sm: "65px", md: "70px" },
  background: `${theme.palette.landingNavBg.main}`,
  border: `1px solid ${theme.palette.landingPrimary.main}`,
  backdropFilter: "blur(1.5px)",
  borderRadius: { xs: "25px", sm: "35px", md: "50px" },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: { xs: "20px 10px", sm: "30px 20px", md: "40px 30px" },
};

export const navBarStyles = {
  width: "100%",
  padding: { xs: "0 15px", sm: "0 25px", md: "0 40px" },
};

export const navBarBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const LogoNameTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Firasans-bold",
  color: `${theme.palette.landingPrimary.main}`,
  [theme.breakpoints.up("xs")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "24px",
  },
}));

export const navLinkStyles = {
  display: { xs: "none", md: "flex" },
  alignItems: "center",
  gap: { md: 3, lg: 5 },
};

export const NavLinkTypography = styled(Typography)<{ selected: boolean }>(
  ({ selected, theme }) => ({
    fontFamily: selected ? "Firasans-semibold" : "Firasans-regular",
    color: selected
      ? `${theme.palette.landingPrimary.main}`
      : `${theme.palette.landingNavLink.main}`,
    textDecoration: "none",
    transition: "color 0.3s",
    cursor: "pointer",
    position: "relative",
    [theme.breakpoints.up("xs")]: {
      fontSize: selected ? "16px" : "14px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: selected ? "18px" : "16px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: selected ? "20px" : "18px",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      borderRadius: "5px",
      bottom: selected ? "-10px" : "0px",
      left: "50%",

      height: "4px",
      backgroundColor: selected
        ? `${theme.palette.landingNavLinkHighlight.main}`
        : "transparent",
      transition: "width 0.3s ease-in-out",
      transform: "translateX(-50%)",
      [theme.breakpoints.up("xs")]: {
        width: selected ? "10%" : "0",
      },
      [theme.breakpoints.up("sm")]: {
        width: selected ? "10%" : "0",
      },
      [theme.breakpoints.up("md")]: {
        width: selected ? "50%" : "0",
      },
    },
  })
);

export const authButtonStyles = {
  display: "flex",
  alignItems: "center",
  gap: { xs: 1, sm: 1.5, md: 2 },
};

export const customButtonStyles = {
  display: "flex",
  alignItems: "center",
  gap: { xs: 2, sm: 3 },
  marginTop: { xs: 3, sm: 4, md: 5 },
  padding: { xs: "0 16px", sm: "0 24px", md: 0 },
};

export const HeroSectionTitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Firasans-bold",
  color: `${theme.palette.landingPrimary.main}`,
  fontStyle: "normal",
  fontWeight: "700",
  width: "90%",
  [theme.breakpoints.up("xs")]: {
    fontSize: "28px",
    lineHeight: "40px",
    marginBottom: "10px",
    // textAlign: "justify",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "34px",
    lineHeight: "40px",
    marginBottom: "15px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "40px",
    lineHeight: "55px",
    marginBottom: "20px",
  },
}));

export const HeroSectionDescriptionTypography = styled(Typography)(
  ({ theme }) => ({
    fontFamily: "Firasans-light",
    color: `${theme.palette.landingHeroSectionDesc.main}`,
    fontStyle: "normal",
    fontWeight: "300",
    width: "90%",

    [theme.breakpoints.up("xs")]: {
      fontSize: "14px",
      lineHeight: "24px",
      textAlign: "justify",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "15px",
      lineHeight: "24px",
      textAlign: "justify",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "16px",
      lineHeight: "26px",
      textAlign: "left",
    },
  })
);

export const CustomButtonTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Firasans-bold",
  fontStyle: "normal",
  fontWeight: "700",
  alignItems: "center",
  [theme.breakpoints.up("xs")]: {
    fontSize: "14px",
    lineHeight: "30px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "16px",
    lineHeight: "35px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "18px",
    lineHeight: "40px",
  },
}));

export const NavButtonTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "Firasans-semibold",
  fontStyle: "normal",
  fontWeight: "500",
  alignItems: "center",
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
    lineHeight: "16px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "13px",
    lineHeight: "18px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
    lineHeight: "20px",
  },
}));
