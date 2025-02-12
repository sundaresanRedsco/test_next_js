"use client";
import OverviewChannel from "@/app/apiflow_Pages/pages/Channel/overViewChannel";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

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
      <OverviewChannel />
    </div>
  );
}
