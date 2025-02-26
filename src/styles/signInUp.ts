import { globalTranslate } from "@/helpers/helpersFunctions";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";

export const PrimarySignInUPTypography = styled(Typography)`
  color: #fff;
  font-family: FiraSans-medium;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SecondarySignInUPTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpPrimary.main};
  font-family: FiraSans-regular;
  font-style: normal;
  font-weight: 300 !important;
  line-height: normal;
`;

export const TertiarySignInUPTypography = styled(Typography)`
  color: #ffffff;
  font-family: FiraSans-light;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.signInTextLink.main,
  textDecoration: "none",
  fontFamily: "FiraSans-medium",
  // Set a default font size (this will be applied for sizes below 'xl')
  fontSize: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
  // At the 'xl' breakpoint, use a different font size
  [theme.breakpoints.up("xl")]: {
    fontSize: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
  },
}));
