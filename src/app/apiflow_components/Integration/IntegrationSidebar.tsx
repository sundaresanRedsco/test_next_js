import React from "react";
import { Box, styled, Typography } from "@mui/material";
import GDivider from "@/app/apiflow_components/global/GDivider";
import GButton from "@/app/apiflow_components/global/GButton";
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

      <Box>
        <GButton
          label="Service Now"
          buttonType={
            activeButton?.label === "Service Now" ? "primary" : "teritiary"
          }
          color={
            activeButton?.label === "Service Now"
              ? `${theme.palette.mainWhite.main}`
              : "#282F79"
          }
          padding="4px 40px"
          onClickHandler={() =>
            handleButtonClick("GLOBAL_INTEGRATION", "Service Now")
          }
        />
        <GButton
          label="Splunk"
          buttonType={
            activeButton?.label === "Splunk" ? "primary" : "teritiary"
          }
          color={
            activeButton?.label === "Splunk"
              ? `${theme.palette.mainWhite.main}`
              : "#282F79"
          }
          marginLeft="5px"
          padding="4px 25px"
          //   minWidth="35px"
          // color="#282F79"
          onClickHandler={() =>
            handleButtonClick("GLOBAL_INTEGRATION", "Splunk")
          }
        />
      </Box>

      <ButtonSection
        title="API Management"
        labels={["GCP", "AZURE", "AWS"]}
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
        section="API_MANAGEMENT"
      />

      <ButtonSection
        title="Email and messengers"
        labels={["Personal email", "Email Report", "Slack", "Microsoft Teams"]}
        handleButtonClick={handleButtonClick}
        section="EMAIL_MESSENGERS"
      />

      <ButtonSection
        title="Incident and task management systems"
        activeButton={activeButton}
        labels={["Opsgenie", "Pagerduty", "Jira"]}
        handleButtonClick={handleButtonClick}
        section="INCIDENT_TASK_MANAGEMENT"
      />

      <ButtonSection
        title="SIEM and SOAR systems"
        labels={["splunk", "Microsoft sentinel"]}
        handleButtonClick={handleButtonClick}
        section="SIEM_SOAR"
      />

      <ButtonSection
        title="Log management systems"
        labels={["splunk"]}
        handleButtonClick={handleButtonClick}
        section="LOG_MANAGEMENT"
      />

      <ButtonSection
        title="Data collectors"
        labels={["logstash", "AWS s3"]}
        handleButtonClick={handleButtonClick}
        section="DATA_COLLECTORS"
      />
    </div>
  );
};

export default IntegrationSidebar;
