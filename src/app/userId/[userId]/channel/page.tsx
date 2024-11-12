"use client";
// Make sure this points to your NextAuth options
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
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
  let allowedTabs: any[] = [];
  let userPermissions: any[] = [];
  return (
    <div>
      {/* <OverviewChannel
        allowedTabs={allowedTabs}
        userPermissions={userPermissions}
      /> */}
      <HeadingTypography> Channel</HeadingTypography>
    </div>
  );
}
