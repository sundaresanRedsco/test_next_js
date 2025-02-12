import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import GButton from "@/app/apiflow_components/global/GButtonV1";

type Props = {
  membersCount: any;
  syncTime: any;

  riskCount: any;
  projetCount: any;
  title: any;
};

// Sample data for workspace cards

// Styled TextTypography component
const TextTypography = styled(Typography)`
  font-family: "Firasans" !important;
  color: white;
  font-size: 0.7rem;
  margin-top: 0.7rem;
`;

function WorkspaceCard({
  membersCount,
  syncTime,
  riskCount,
  projetCount,
  title,
}: Props) {
  return (
    <Box gap={2} padding={2} sx={{ display: "flex", flexWrap: "warp" }}>
      {/* First Card */}

      <Card
        sx={{
          backgroundColor: "#12121280",
          color: "#fff",
          borderRadius: "30px",
          width: 300,
          boxShadow: 3,
        }}
      >
        <CardContent>
          {/* Use custom HeadingTypography for the title */}
          <TextTypography>{title}</TextTypography>

          <TextTypography style={{ color: "#CCCCCC" }}>
            {projetCount}
          </TextTypography>

          <TextTypography>
            <strong style={{ color: "#E50001" }}>{riskCount}</strong>{" "}
            <span style={{ color: "#ACAAB3" }}>Security Risks</span>
          </TextTypography>

          <TextTypography variant="body2" gutterBottom>
            <span style={{ color: "#ACAAB3" }}>Last Successful sync</span>{" "}
            <span style={{ color: "#34C468" }}>{syncTime}</span>
          </TextTypography>

          <TextTypography>
            <strong style={{ color: "#34C468" }}>{membersCount}</strong>{" "}
            <span style={{ color: "#ACAAB3" }}>team members working</span>
          </TextTypography>

          <div style={{ marginTop: "1rem" }}>
            <GButton
              background="#7A43FE"
              label="View Workspace"
              color="#FFFFFF"
              width="100%"
              padding="8px"
              border="none"
              fontSize="0.8rem"
              fontWeight="600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Second Card with centered content */}
    </Box>
  );
}

export default WorkspaceCard;
