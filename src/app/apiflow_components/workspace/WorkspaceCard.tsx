import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import GButton from "@/app/apiflow_components/global/GButtonV1";
import { styled } from "@mui/system";
export const HeadingTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular !important",
  color: theme.palette.textPrimaryColor.main,
  fontWeight: 600,
  margin: "10px 0px",
  [theme.breakpoints.up("xs")]: {
    fontSize: "1rem", // Extra small devices (phones)
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.2rem", // Small devices (tablets)
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.3rem", // Medium devices (desktops)
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.5rem", // Large devices (larger desktops)
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "1.8rem", // Extra large devices (large desktops)
  },
}));

export const SubHeadingTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular !important",
  color: theme.palette.textSecondaryColor.main,
  fontSize: "0.7rem",
  fontWeight: "400",
  margin: "10px 0px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.8rem",
  },
}));

export const BodyTextTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular !important",
  color: theme.palette.textTertiaryColor.main,
  fontSize: "0.7rem",
  fontWeight: "400", // Or 0.8rem if preferred
  margin: "10px 0px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.8rem",
  },
}));

export const RiskTextTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular !important",
  color: "#E50001",
  fontWeight: 600,
  fontSize: "0.8rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.9rem",
  },
}));

export const SuccessTextTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular !important",
  color: "#34C468",
  fontSize: "0.8rem",
  fontWeight: "600", // Or 0.8rem if preferred

  [theme.breakpoints.up("sm")]: {
    fontSize: "0.9rem",
  },
}));
type Props = {
  membersCount: any;
  syncTime: any;
  riskCount: any;
  projectCount: any;
  title: any;
  onClickHandler: any;
};

function WorkspaceCard({
  membersCount,
  syncTime,
  riskCount,
  projectCount,
  title,
  onClickHandler,
}: Props) {
  return (
    <Card
      sx={{
        backgroundColor: "#12121280",
        color: "#fff",
        borderRadius: "30px",
        width: "100%",
        boxShadow: 3,
      }}
    >
      <CardContent>
        <HeadingTypography>{title}</HeadingTypography>
        <SubHeadingTypography>
          {projectCount + " Projects"}
        </SubHeadingTypography>

        {/* <BodyTextTypography>
          <RiskTextTypography sx={{ display: "inline" }}>
            {riskCount}
          </RiskTextTypography>{" "}
          <span>Security Risks</span>
        </BodyTextTypography> */}

        <BodyTextTypography>
          <span>Last Created At</span>{" "}
          <SuccessTextTypography sx={{ display: "inline" }}>
            {syncTime}
          </SuccessTextTypography>
        </BodyTextTypography>

        <BodyTextTypography>
          <SuccessTextTypography sx={{ display: "inline" }}>
            {membersCount}
          </SuccessTextTypography>{" "}
          <span>team members working</span>
        </BodyTextTypography>

        <div style={{ marginTop: "1rem" }}>
          <GButton
            background="#7A43FE"
            label="View Workspace"
            color="#FFFFFF"
            width="250px"
            padding="8px"
            border="none"
            fontSize="0.8rem"
            fontWeight="600"
            radius="10px"
            onClickHandler={onClickHandler}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default WorkspaceCard;
