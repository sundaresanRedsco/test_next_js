import React from "react";
import GButton from "../../Global/GButton";
import { Box } from "@mui/material";
import {
  HeaderTextTypography,
  PrimaryTextTypography,
} from "../../../Styles/signInUp";
import GDivider from "../../Global/GDivider";

function IntegrationSidebar() {
  return (
    <div>
      <HeaderTextTypography style={{ fontSize: "13px" }}>
        Integration Information
      </HeaderTextTypography>
      {/* outer box for margin */}
      <Box style={{ margin: "10px" }}>
        {/* workspace */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PrimaryTextTypography style={{ fontSize: "11px" }}>
            Global Integration
          </PrimaryTextTypography>
        </Box>
      </Box>

      <GDivider />

      <Box>
        <GButton
          label="Service Now"
          buttonShape="circular"
          buttonType="teritiary"
          padding="4px 40px"
          minWidth="35px"
          background="#282F79"
          color="#FFFFFF"
        />
        <GButton
          label="Splunk"
          buttonShape="circular"
          buttonType="teritiary"
          marginLeft="5px"
          padding="4px 25px"
          minWidth="35px"
          color="#282F79"
        />
      </Box>

      <div>
        <PrimaryTextTypography
          style={{ fontSize: "11px", marginTop: "1.5rem" }}
        >
          API Management
        </PrimaryTextTypography>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="GCP"
            buttonShape="circular"
            buttonType="teritiary"
            padding="4px 20px"
            minWidth="35px"
          />
          <GButton
            label="Azure"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />

          <GButton
            label="AWS"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />
        </Box>
      </div>

      <div>
        <PrimaryTextTypography
          style={{ fontSize: "11px", marginTop: "1.5rem" }}
        >
          Email and messengers
        </PrimaryTextTypography>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="Personal email"
            buttonShape="circular"
            buttonType="teritiary"
            padding="4px 20px"
            minWidth="35px"
          />
          <GButton
            label="Email Report"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />

          <GButton
            label="Slack"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />

          <GButton
            label="Microsoft Teams"
            buttonShape="circular"
            buttonType="teritiary"
            margin="1rem 0rem"
            padding="4px 20px"
            // marginTop="10px"

            minWidth="35px"
            color="#282F79"
          />
        </Box>
      </div>

      <div>
        <PrimaryTextTypography
          style={{ fontSize: "11px", marginTop: "1.5rem" }}
        >
          Incident and task management systems
        </PrimaryTextTypography>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="Opsgenie"
            buttonShape="circular"
            buttonType="teritiary"
            padding="4px 20px"
            minWidth="35px"
          />
          <GButton
            label="Pagerduty"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />

          <GButton
            label="Jira"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />
        </Box>
      </div>

      <div>
        <PrimaryTextTypography
          style={{ fontSize: "11px", marginTop: "1.5rem" }}
        >
          SIEM and SOAR systems
        </PrimaryTextTypography>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="splunk"
            buttonShape="circular"
            buttonType="teritiary"
            padding="4px 20px"
            minWidth="35px"
          />
          <GButton
            label="Microsoft sentinel"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />
        </Box>
      </div>

      <div>
        <PrimaryTextTypography
          style={{ fontSize: "11px", marginTop: "1.5rem" }}
        >
          Log management systems
        </PrimaryTextTypography>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="splunk"
            buttonShape="circular"
            buttonType="teritiary"
            padding="4px 20px"
            minWidth="35px"
          />
        </Box>
      </div>

      <div>
        <PrimaryTextTypography
          style={{ fontSize: "11px", marginTop: "1.5rem" }}
        >
          Data collectors
        </PrimaryTextTypography>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="logstash"
            buttonShape="circular"
            buttonType="teritiary"
            padding="4px 20px"
            minWidth="35px"
          />
          <GButton
            label="AWS s3"
            buttonShape="circular"
            buttonType="teritiary"
            marginLeft="5px"
            padding="4px 20px"
            minWidth="35px"
            color="#282F79"
          />
        </Box>
      </div>
    </div>
  );
}

export default IntegrationSidebar;
