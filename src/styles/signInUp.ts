import { globalTranslate } from "@/helpers/helpersFunctions";
import { Grid, Typography, Box } from "@mui/material";
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

export const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #fff;
  font-weight: 600;
`;

export const PrimaryTypography = styled(Typography)`
  font-family: FiraSans-light !important;
  color: #fff;
  font-size: 0.8rem;
`;

export const SecondaryTypography = styled(Typography)`
  font-family: FiraSans-light !important;
  color: #9e9fa1;
  font-size: 0.6rem;
`;

//v2   font-family: FiraSans !important;
export const HeaderTextTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.v2PrimaryColor.main};
  font-weight: 800;
  line-height: normal;
`;

export const PrimaryTextTypography = styled(Typography)`
  font-family: FiraSans-semibold !important;
  color: ${({ theme }) => theme.palette.v2SecondaryColor.main};
  font-weight: 600;
  line-height: normal;
`;

export const SecondaryTextTypography = styled(Typography)`
  font-family: FiraSans-medium !important;
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-weight: 500;
  line-height: normal;
`;
export const TeritaryTextTypography = styled(Typography)`
  font-family: FiraSans-regular !important;
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  line-height: normal;
`;

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.apiTrail.signInUp.TextLink,
  textDecoration: "none",
  fontFamily: "FiraSans-medium",
  // Set a default font size (this will be applied for sizes below 'xl')
  fontSize: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
  // At the 'xl' breakpoint, use a different font size
  [theme.breakpoints.up("xl")]: {
    fontSize: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
  },
}));
