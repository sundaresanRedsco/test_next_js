import React from "react";
import { Box, styled, Typography } from "@mui/material";
import GDivider from "@/app/apiflow_components/global/GDivider";
import theme from "@/Theme/theme";
import {
  HeadingTypography,
  SecondaryTypography,
} from "@/app/hooks/operations/useOperationHelpers";
import ButtonSection from "@/app/apiflow_components/Integration/ButtonSection";

const GlobalIntegrationSidebar = ({ activeButton, handleButtonClick }: any) => {
  return (
    <div>
      <HeadingTypography style={{ color: "white" }}>
        Integration Information
      </HeadingTypography>

      <Box style={{ margin: "10px" }}>
        <ButtonSection
          title="Global Integrations"
          activeButton={activeButton}
          labels={["Service Now", "Splunk"]}
          handleButtonClick={handleButtonClick}
          section="GLOBAL_INTEGRATION"
        />
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

export default GlobalIntegrationSidebar;
