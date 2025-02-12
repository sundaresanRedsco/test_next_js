"use client";
// Make sure this points to your NextAuth options
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import HomeChannel from "@/app/apiflow_Pages/pages/Channel/home";

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffff;
  font-size: 1.3rem;
  margin-top: 1rem;
`;

export default async function Home(context: {
  searchParams: { tabs?: string };
}) {
  return (
    <div>
      <HeadingTypography> Channel</HeadingTypography>
      <HomeChannel />
    </div>
  );
}
