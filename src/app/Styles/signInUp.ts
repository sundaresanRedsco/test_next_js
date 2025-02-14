import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
// import { Link } from "react-router-dom";
import Link from "next/link";

export const SignOuterContainer = styled(Box)`
  height: 100vh;
  background: ${({ theme }) => theme.palette.signInUpBackground.main};
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  color: ${({ theme }) => theme.palette.signInUpPrimary.main};
  font-family: FiraSans-light;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const QuarternarySignInUPTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpPrimary.main};
  font-family: FiraSans-light;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

export const LinkSignInUPTypography = styled(Link)`
  color: ${({ theme }) => theme.palette.signInUpPrimary.main};
  font-family: FiraSans-light;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.palette.signInUpPrimary.main};
  }
`;

export const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #fff;
  font-weight: 600;
`;

export const FormHeadingTypography = styled(Typography)`
  font-family: FiraSans-semibold;
  color: #fff;
  font-weight: 600;
`;

export const SignupMicrosoft = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpPrimary.main};
  font-family: FiraSans-light;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration: none;
  font-size: o.5rem;
  text-align: center;
  cursor: pointer;
`;

export const PrimaryTypography = styled(Typography)`
  font-family: FiraSans-light !important;
  color: #fff;
  font-size: 0.8rem;
`;

export const CardImage = styled(Typography)`
  font-family: FiraSans-light !important;
  color: #fff;
  font-size: 0.8rem;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  padding: 40px;
  border-radius: 4px;
`;

export const SecondaryTypography = styled(Typography)`
  font-family: FiraSans-light !important;
  color: #9e9fa1;
  font-size: 0.6rem;
`;

export const TableHeading = styled(Typography)`
  font-family: FiraSans-medium !important;
  color: ${({ theme }) => theme.palette.primaryText.main};
  font-size: 14px;
  font-weight: 600;
`;

// fontSize: "14px",
// fontFamily: "Inter-regular",
// fontWeight: "600",

export const LinkTypography = styled(Link)`
  font-family: FiraSans-Medium;
  color: ${({ theme }) => theme.palette.linkColor.main};
  text-decoration: none;
  cursor: pointer;
`;

// pricing
export const PricingBox = styled(Box)`
  position: relative;
  height: 85vh;
  width: 75%;
  margin: auto;
  padding: 2rem 3.5rem !important;

  @media (min-width: 1450px) {
    height: fit-content;
  }

  @media (max-width: 1440px) {
    height: 75vh; /* Adjust the height value for smaller screens */
  }

  @media (max-width: 1400px) {
    padding: 1rem 3rem !important;
    height: 85vh;
  }

  @media (max-width: 1200px) {
    padding: 1rem 1.5rem !important;
  }

  @media (max-width: 768px) {
    height: 85vh;
    overflow-y: scroll;
  }

  @media (max-width: 600px) {
    padding: 0.5rem !important;
  }
`;

export const PricingCovImage = styled("img")`
  position: absolute;
  width: 600px;
  height: 400px;
  bottom: 0%;
  left: 0%;
`;

export const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primaryText.main};
  font-family: FiraSans-light;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration: none;
  margin-left: 7px;
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
