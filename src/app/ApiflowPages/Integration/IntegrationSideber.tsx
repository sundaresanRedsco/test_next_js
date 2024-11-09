import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import GDivider from "../../ApiFlowComponents/Global/GDivider";
import GButton from "../../ApiFlowComponents/Global/GButton";
import theme from "../../../Theme/theme";

const PrimaryTypography = styled(Typography)`
  font-family: Inter-Medium !important;
  color: #282f79;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 10px;
`;

const SecondaryTypography = styled(Typography)`
  font-family: Inter-Semi-Bold !important;
  color: #9a93b9;
  font-size: 0.6rem;
  // margin-top: 10px;
`;

const IntegrationSidebar = ({ activeButton, handleButtonClick }: any) => {
  console.log(activeButton, "activeButtonactiveButton");

  return (
    // <Grid
    //   item
    //   xl={6}
    //   xs={12}
    //   sm={12}
    //   md={5}
    // sx={{
    //   paddingLeft: "0.5rem",
    //   borderRight: "1px solid #A4A8C9",
    //   height: "450px",
    //   overflow: "auto",
    //   "&::-webkit-scrollbar": {
    //     width: "1px", // Adjust the width of the scrollbar
    //   },
    // }}
    // >
    <div>
      <PrimaryTypography>Integration Information</PrimaryTypography>
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
          buttonShape="circular"
          // buttonType="tertiary"
          buttonType={
            activeButton?.label === "Service Now" ? "primary" : "teritiary"
          }
          color={
            activeButton?.label === "Service Now"
              ? `${theme.palette.mainWhite.main}`
              : "#282F79"
          }
          padding="4px 40px"
          minWidth="35px"
          // background="#282F79"
          // color="#FFFFFF"
          onClickHandler={() =>
            handleButtonClick("GLOBAL_INTEGRATION", "Service Now")
          }
        />
        <GButton
          label="Splunk"
          buttonShape="circular"
          // buttonType="tertiary"
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
          minWidth="35px"
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
    // {/* </Grid> */}
  );
};

const ButtonSection = ({
  title,
  labels,
  activeButton,
  handleButtonClick,
  section,
}: any) => (
  <div>
    <SecondaryTypography style={{ marginTop: "1.5rem" }}>
      {title}
    </SecondaryTypography>

    <GDivider />

    <Box sx={{ marginTop: "0.8rem" }}>
      {labels.map((label: any) => (
        <GButton
          key={label}
          label={label}
          buttonShape="circular"
          buttonType="tertiary"
          padding="4px 20px"
          minWidth="35px"
          marginLeft="1rem"
          color={activeButton?.label === label ? "white" : "#282F79"}
          background={activeButton?.label === label ? "#282F79" : "transparent"}
          onClickHandler={() => handleButtonClick(section, label)}
        />
      ))}
    </Box>
  </div>
);

export default IntegrationSidebar;
