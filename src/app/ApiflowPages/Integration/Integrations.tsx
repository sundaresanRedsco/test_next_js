import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GlobalIntegrationCard from "../../ApiFlowComponents/Global/GlobalIntegrationCard";
import styled from "@emotion/styled";
import GDivider from "../../ApiFlowComponents/Global/GDivider";
import GButton from "../../ApiFlowComponents/Global/GButton";
import {
  HeaderTextTypography,
  PrimaryTextTypography,
} from "../../Styles/signInUp";
import { RootStateType } from "../../Redux/store";
import {
  apiGatewayReducer,
  GetApiGatewayByProjectId,
} from "../../Redux/apiManagement/apiGatewayReducer";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionPopup } from "../../Redux/commonReducer";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";

const PrimaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #000000;
  font-size: 0.7rem;
  font-weight: 600;
`;

const SecondaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #9a93b9;
  font-size: 0.5rem;
  margin-top: 10px;
`;

function Integrations() {
  const dispatch = useDispatch<any>();

  const { loading, apiGatewayProject } = useSelector<
    RootStateType,
    apiGatewayReducer
  >((state) => state.apiManagement.gateWay);

  const { currentEnvironmentDetails, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  console.log(apiGatewayProject, "apiGatewayProjectssd");

  const [activeButton, setActiveButton] = useState({
    type: "API_MANAGEMNET",
    flow: "GCP",
  });
  console.log(activeButton, "activeButtonsasas");

  const handleButtonClick = (type: string, label: string) => {
    setActiveButton({
      type: type,
      flow: label,
    });
  };

  useEffect(() => {
    if (currentEnvironmentDetails) {
      dispatch(GetApiGatewayByProjectId(currentEnvironmentDetails.project_id))
        .unwrap()
        .then()
        .catch((errr: any) => {
          if (errr.message == "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }, [currentEnvironmentDetails]);

  return (
    <div>
      <div>
        <Grid container spacing={3}>
          {/* First Column */}
          <Grid
            item
            xl={6}
            xs={12}
            sm={12}
            md={5}
            sx={{
              paddingLeft: "45px !important",
              borderRight: "1px solid #A4A8C9",
            }}
          >
            {/* <IntegrationSidebar /> */}
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
                  {["GCP", "AZURE", "AWS"].map((label) => (
                    <GButton
                      key={label}
                      label={label}
                      buttonShape="circular"
                      buttonType="tertiary"
                      padding="4px 20px"
                      minWidth="35px"
                      //  padding="4px 25px"
                      marginLeft="1rem"
                      color={activeButton.flow === label ? "white" : "#282F79"}
                      background={
                        activeButton.flow === label ? "#282F79" : "transparent"
                      }
                      onClickHandler={() =>
                        handleButtonClick("API_MANAGEMENT", label)
                      }
                    />
                  ))}
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
          </Grid>

          {/* Endpoints Column */}
          <Grid
            item
            xl={6}
            xs={12}
            sm={12}
            md={7}
            sx={{ paddingLeft: "45px !important" }}
          >
            <PrimaryTypography>
              {activeButton.flow === "AWS"
                ? "AWS"
                : activeButton.flow === "GCP"
                ? "Google Cloud Platform"
                : activeButton.flow === "AZURE"
                ? "Azure"
                : ""}
            </PrimaryTypography>
            <SecondaryTypography>
              configuration is added and available to this environment
            </SecondaryTypography>

            {apiGatewayProject?.map((data: any, index: any) => (
              <div style={{ marginTop: "10px" }} key={index}>
                {data?.type === activeButton.flow ? (
                  <GlobalIntegrationCard
                    title={data?.type}
                    secondaryTitle={`Added on${data?.createdat}`}
                    cardData={"SN"}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Integrations;
