"use client";

import React, { useEffect, useState } from "react";
import GlobalIntegrationCard from "@/app/apiflow_components/global/GlobalIntegrationCard";

import { RootStateType } from "@/app/Redux/store";
import {
  apiGatewayReducer,
  GetApiGatewayByProjectId,
} from "@/app/Redux/apiManagement/apiGatewayReducer";
import { useDispatch, useSelector } from "react-redux";
import { updateSessionPopup } from "@/app/Redux/commonReducer";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import IntegrationSidebar from "@/app/apiflow_components/Integration/IntegrationEnvironmentSidebar";
import ImportsCard from "@/app/apiflow_components/Integration/ImportsCard";
import IntegrationPage from "@/app/apiflow_components/Integration/IntegrationPage";
import IntegrationList from "@/app/apiflow_components/Integration/IntegrationList";
import Grid from "@mui/material/Grid2";

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

  const [activeButton, setActiveButton] = useState({
    section: "API_MANAGEMENT",
    label: "GCP",
  });

  const [crudType, setcrudType] = useState("VIEW");

  const handleButtonClick = (section: string, label: string) => {
    switch (section) {
      case "GLOBAL_INTEGRATION":
        // Handle Global Integration button clicks
        setActiveButton({
          section: section,
          label: label,
        });
        break;

      case "API_MANAGEMENT":
        setActiveButton({
          section: section,
          label: label,
        });
        // Handle API Management button clicks
        break;

      case "EMAIL_MESSENGERS":
        // Handle Email and Messengers button clicks
        break;

      case "INCIDENT_TASK_MANAGEMENT":
        setActiveButton({
          section: section,
          label: label,
        });
        // Handle Incident and Task Management button clicks
        break;

      case "SIEM_SOAR":
        // Handle SIEM and SOAR Systems button clicks
        break;

      case "LOG_MANAGEMENT":
        // Handle Log Management Systems button clicks
        break;

      case "DATA_COLLECTORS":
        // Handle Data Collectors button clicks
        break;

      default:
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
            // height: "450px",
            // height: "100vh",
            // overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "3px",
            },
          }}
        >
          {/* First Column */}
          <Grid
            size={{ xl: 3, xs: 12, sm: 5, md: 5 }}
            className="pt-0"
            sx={{
              //   paddingLeft: "0.5rem",
              //   borderRight: "1px solid #A4A8C9",
              // height: "100vh",
              // overflowY: "auto", // Adding vertical scrolling only
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
            size={{ xl: 9, xs: 12, sm: 7, md: 7 }}
            className="pt-0"
            sx={{
              //   backgroundColor: "rgba(18, 18, 18, 0.5)",
              // height: "100vh",
              padding: "20px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "3px",
              },
            }}
          >
            {/* {activeButton.section !== "GLOBAL_INTEGRATION" && (
              <>
                <PrimaryTypography>
                  {activeButton.label}{" "}
                  <GButton
                    // buttonShape="circular"
                    buttonType="primary"
                    label={crudType === "VIEW" ? "Add" : "Back"}
                    margin="5px"
                    marginLeft="10px"
                    onClickHandler={() =>
                      setcrudType(crudType === "VIEW" ? "ADD" : "VIEW")
                    }
                  />
                </PrimaryTypography>
                <SecondaryTypography>
                  Configuration is added and available to this environment.
                </SecondaryTypography>
              </>
            )} */}

            {/* {activeButton.section === "API_MANAGEMENT" && ( */}
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
            {/* )} */}

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
