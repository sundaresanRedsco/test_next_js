import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GlobalIntegrationCard from "../../../ApiFlowComponents/Global/GlobalIntegrationCard";
import styled from "@emotion/styled";
import GButton from "../../../ApiFlowComponents/Global/GButton";
import { RootStateType } from "../../../Redux/store";
import {
  apiGatewayReducer,
  GetApiGatewayByProjectId,
} from "../../../Redux/apiManagement/apiGatewayReducer";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionPopup } from "../../../Redux/commonReducer";
import { environmentReducer } from "../../../Redux/apiManagement/environmentReducer";
import IntegrationSidebar from "../../Integration/IntegrationSideber";
import ImportsCard from "../../../ApiFlowComponents/ApiManagements/ImportsComponents/ImportsCard";
import IntegrationPage from "../IntegrationPages/IntegrationPage";
import IntegrationList from "../IntegrationPages/IntegrationList";

const PrimaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #000000;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 10px;
`;

const SecondaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #9a93b9;
  font-size: 0.5rem;
  margin-top: 10px;
`;

function ProjectIntegrations() {
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
    section: "API_MANAGEMENT",
    label: "GCP",
  });

  const [crudType, setcrudType] = useState("VIEW");
  console.log(activeButton, "activeButtonsasas");

  const handleButtonClick = (section: string, label: string) => {
    console.log(section, label, "CHECKSECTION");
    switch (section) {
      case "GLOBAL_INTEGRATION":
        console.log(`Global Integration Button Clicked: ${label}`);
        // Handle Global Integration button clicks
        setActiveButton({
          section: section,
          label: label,
        });
        break;

      case "API_MANAGEMENT":
        console.log(`API Management Button Clicked: ${label}`);
        setActiveButton({
          section: section,
          label: label,
        });
        // Handle API Management button clicks
        break;

      case "EMAIL_MESSENGERS":
        console.log(`Email and Messengers Button Clicked: ${label}`);
        // Handle Email and Messengers button clicks
        break;

      case "INCIDENT_TASK_MANAGEMENT":
        console.log(`Incident and Task Management Button Clicked: ${label}`);
        setActiveButton({
          section: section,
          label: label,
        });
        // Handle Incident and Task Management button clicks
        break;

      case "SIEM_SOAR":
        console.log(`SIEM and SOAR Systems Button Clicked: ${label}`);
        // Handle SIEM and SOAR Systems button clicks
        break;

      case "LOG_MANAGEMENT":
        console.log(`Log Management Systems Button Clicked: ${label}`);
        // Handle Log Management Systems button clicks
        break;

      case "DATA_COLLECTORS":
        console.log(`Data Collectors Button Clicked: ${label}`);
        // Handle Data Collectors button clicks
        break;

      default:
        console.log(`Unknown Button Clicked: ${label}`);
        break;
    }
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
        <Grid
          container
          spacing={3}
          sx={{
            padding: "0px",
            margin: "0px",
            height: "450px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
          }}
        >
          {/* First Column */}
          <Grid
            item
            xl={3} // Ensure this adds up with other columns to 12
            xs={12}
            sm={5}
            md={5}
            className="pt-0"
            sx={{
              paddingLeft: "0.5rem",
              borderRight: "1px solid #A4A8C9",
              height: "450px",
              overflowY: "auto", // Adding vertical scrolling only
              "&::-webkit-scrollbar": {
                width: "1px",
              },
            }}
          >
            <IntegrationSidebar
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
            />
          </Grid>

          {/* Second Column */}
          <Grid
            item
            xl={9} // Ensure the remaining space (12 - 3 = 9) is occupied
            xs={12}
            sm={7}
            md={7}
            className="pt-0"
            sx={{
              backgroundColor: "#F6F9FF",
              padding: "40px",
              height: "450px", // Consistent height for both columns
              overflowY: "auto", // Add scrolling here as well
              // padding: "0.5rem",
              "&::-webkit-scrollbar": {
                width: "3px",
              },
            }}
          >
            {activeButton.section !== "GLOBAL_INTEGRATION" && (
              <>
                <PrimaryTypography>
                  {activeButton.label}{" "}
                  <GButton
                    buttonShape="circular"
                    buttonType="primary"
                    label={crudType === "VIEW" ? "Add" : "Back"}
                    margin="5px"
                    onClickHandler={() =>
                      setcrudType(crudType === "VIEW" ? "ADD" : "VIEW")
                    }
                  />
                </PrimaryTypography>
                <SecondaryTypography>
                  Configuration is added and available to this environment.
                </SecondaryTypography>
              </>
            )}

            {activeButton.section === "API_MANAGEMENT" && (
              <>
                {crudType === "VIEW" ? (
                  <>
                    {apiGatewayProject
                      ?.filter((x: any) => x.type === activeButton?.label)
                      ?.map((data: any, index: any) => (
                        <div style={{ marginTop: "10px" }} key={index}>
                          <GlobalIntegrationCard
                            title={data?.type}
                            secondaryTitle={`Added on ${data?.createdat}`}
                            cardData={"SN"}
                          />
                        </div>
                      ))}
                  </>
                ) : (
                  crudType === "ADD" && (
                    <ImportsCard
                      add
                      projectId={currentEnvironmentDetails?.project_id}
                      type={activeButton.label}
                      showNameAndDescription={true}
                    />
                  )
                )}
              </>
            )}

            {activeButton.section === "GLOBAL_INTEGRATION" && (
              <>
                {activeButton.label === "Service Now" ? (
                  <>
                    <IntegrationList id={"integration_page_service_now"} />
                  </>
                ) : activeButton.label === "Splunk" ? (
                  <>
                    <IntegrationList id={"integration_page_splunk_siem"} />
                  </>
                ) : (
                  ""
                )}
              </>
            )}

            {activeButton.section === "INCIDENT_TASK_MANAGEMENT" && (
              <>
                {/* <IntegrationPage id={activeButton} /> */}
                {activeButton.label === "Pagerduty" ? (
                  <>
                    <IntegrationPage id={"integration_page_pager_duty"} />
                  </>
                ) : activeButton.label === "Jira" ? (
                  <>
                    <IntegrationPage id={"integration_page_jira"} />
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ProjectIntegrations;
