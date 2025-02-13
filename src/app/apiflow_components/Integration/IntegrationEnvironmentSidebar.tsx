import React from "react";
import { Box, styled, Typography } from "@mui/material";
import GDivider from "@/app/apiflow_components/global/GDivider";
import theme from "@/Theme/theme";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondaryTypography,
} from "@/app/hooks/operations/useOperationHelpers";
import ButtonSection from "@/app/apiflow_components/Integration/ButtonSection";

const IntegrationSidebar = ({ activeButton, handleButtonClick }: any) => {
  return (
    <div>
      <HeadingTypography style={{ color: "white" }}>
        Integration Information
      </HeadingTypography>
      <Box style={{ margin: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SecondaryTypography>Global Integration</SecondaryTypography>
        </Box>
      </Box>

      <GDivider />

      <ButtonSection
        title="Incident and task management systems"
        activeButton={activeButton}
        labels={["Pagerduty", "Jira"]}
        handleButtonClick={handleButtonClick}
        section="INCIDENT_TASK_MANAGEMENT"
      />
    </div>
  );
};

export default IntegrationSidebar;
