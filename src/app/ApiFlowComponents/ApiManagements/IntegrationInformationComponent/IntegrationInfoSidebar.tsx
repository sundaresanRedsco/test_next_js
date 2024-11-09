import { Box } from "@mui/material";
import React from "react";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";
import { PrimaryTextTypography } from "../../../Styles/signInUp";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../Redux/store";
import { setAddTabs, tabsReducer } from "../../../Redux/tabReducer";
import { workspaceReducer } from "../../../Redux/apiManagement/workspaceReducer";
import theme from "../../../../Theme/theme";

function IntegrationInfoSidebar() {
  const dispatch = useDispatch<any>();

  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const onSelectCurrentIntegration = (type: any) => {
    dispatch(setAddTabs("integration_page_" + type));
  };

  // const onSelectCurrentIntegration = (type: string) => {

  //   // Add the new tab to the Redux store
  //   dispatch(setAddTabs("integration_page_" + type));

  //   // Parse the current query parameters
  //   const urlParams = new URLSearchParams(location.search);
  //   const existingTabs = urlParams.get("tabs")?.split(",") || [];

  //   // Add the new tab if it doesn't already exist
  //   if (!existingTabs.includes(`integration_page_${type}`)) {
  //     existingTabs.push(`integration_page_${type}`);
  //   }

  //   // Update the "tabs" query parameter
  //   urlParams.set("tabs", existingTabs.join(","));

  //   // Construct the new URL path
  //   const newUrl = `${location.pathname}?${urlParams.toString()}`;

  //   // Navigate to the new URL
  //   navigate(newUrl);
  // };

  return (
    <div>
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
          // buttonType="teritiary"
          buttonType={
            tabs.some((tab: any) => tab.includes("service_now"))
              ? "primary"
              : "teritiary"
          }
          color={
            tabs.some((tab: any) => tab.includes("service_now"))
              ? `${theme.palette.mainWhite.main}`
              : "#282F79"
          }
          padding="2px 0px"
          minWidth="70px"
          // background="#282F79"
          // color="#FFFFFF"
          onClickHandler={() => {
            onSelectCurrentIntegration("service_now");
          }}
        />

        <GButton
          label="Splunk"
          buttonShape="circular"
          // buttonType="teritiary"
          buttonType={
            tabs.some((tab: any) => tab.includes("splunk_siem"))
              ? "primary"
              : "teritiary"
          }
          color={
            tabs.some((tab: any) => tab.includes("splunk_siem"))
              ? `${theme.palette.mainWhite.main}`
              : "#282F79"
          }
          padding="2px 0px"
          minWidth="70px"
          // color="#282F79"
          marginLeft="10px"
          onClickHandler={() => {
            onSelectCurrentIntegration("splunk_siem");
          }}
        />
      </Box>

      <div>
        <div className="d-flex justify-content-between">
          <div>
            <PrimaryTextTypography
              style={{ fontSize: "8px", marginTop: "1.5rem" }}
            >
              Email and messengers
            </PrimaryTextTypography>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <GButton
              label="Import"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              minWidth="35px"
            />

            <GButton
              label="New"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              marginLeft="10px"
              minWidth="35px"
            />
          </div>
        </div>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          {["Personal email", "Email Report", "Slack", "Microsoft Teams"].map(
            (label) => (
              //   <GButton
              // key={label}
              // label={label}
              //     buttonShape="circular"
              //     buttonType="tertiary"
              //     padding="4px 10px"
              //     minWidth="35px"
              //     //  padding="4px 25px"
              //     marginLeft="10px"
              //     // color={activeButton === label ? "white" : "#282F79"}
              //     // background={
              //     //   activeButton === label ? "#282F79" : "transparent"
              //     // }
              //     // onClickHandler={() => handleButtonClick(label)}
              //   />

              <GButton
                buttonShape="circular"
                key={label}
                label={label}
                buttonType="teritiary"
                padding="2px 0px"
                minWidth="70px"
                color="#282F79"
                marginLeft="10px"
              />
            )
          )}
        </Box>
      </div>

      <div>
        <div className="d-flex justify-content-between">
          <div>
            <PrimaryTextTypography
              style={{ fontSize: "8px", marginTop: "1.5rem" }}
            >
              Incident and task management
            </PrimaryTextTypography>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <GButton
              label="Import"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              minWidth="35px"
            />

            <GButton
              label="New"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              marginLeft="10px"
              minWidth="35px"
            />
          </div>
        </div>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="Opsgenie"
            buttonShape="circular"
            buttonType="teritiary"
            padding="2px 0px"
            minWidth="70px"
            color="#282F79"
            //    marginLeft="10px"
          />

          <GButton
            label="Pagerduty"
            buttonShape="circular"
            // buttonType="teritiary"
            buttonType={
              tabs.some((tab: any) => tab.includes("pager_duty"))
                ? "primary"
                : "teritiary"
            }
            color={
              tabs.some((tab: any) => tab.includes("pager_duty"))
                ? `${theme.palette.mainWhite.main}`
                : "#282F79"
            }
            padding="2px 0px"
            minWidth="70px"
            // color="#282F79"
            marginLeft="10px"
            onClickHandler={() => {
              dispatch(setAddTabs("pager_duty"));
            }}
          />

          <GButton
            label="Jira"
            buttonShape="circular"
            // buttonType="teritiary"
            buttonType={
              tabs.some((tab: any) => tab.includes("jira"))
                ? "primary"
                : "teritiary"
            }
            color={
              tabs.some((tab: any) => tab.includes("jira"))
                ? `${theme.palette.mainWhite.main}`
                : "#282F79"
            }
            padding="2px 0px"
            minWidth="70px"
            // color="#282F79"
            onClickHandler={() => {
              dispatch(setAddTabs("jira"));
            }}
          />
        </Box>
      </div>

      <div>
        <div className="d-flex justify-content-between">
          <div>
            <PrimaryTextTypography
              style={{ fontSize: "8px", marginTop: "1.5rem" }}
            >
              SIEM and SOAR systems
            </PrimaryTextTypography>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <GButton
              label="Import"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              minWidth="35px"
            />

            <GButton
              label="New"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              marginLeft="10px"
              minWidth="35px"
            />
          </div>
        </div>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="Splunk"
            buttonShape="circular"
            buttonType="teritiary"
            padding="2px 0px"
            minWidth="70px"
            color="#282F79"
            marginLeft="10px"
          />
          <GButton
            label="Microsoft sentinel"
            buttonShape="circular"
            buttonType="teritiary"
            padding="2px 0px"
            minWidth="80px"
            color="#282F79"
            marginLeft="10px"
          />
        </Box>
      </div>

      <div>
        <div className="d-flex justify-content-between">
          <div>
            <PrimaryTextTypography
              style={{ fontSize: "8px", marginTop: "1.5rem" }}
            >
              Log management systems
            </PrimaryTextTypography>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <GButton
              label="Import"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              minWidth="35px"
            />

            <GButton
              label="New"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              marginLeft="10px"
              minWidth="35px"
            />
          </div>
        </div>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="datadog"
            buttonShape="circular"
            buttonType="teritiary"
            padding="2px 0px"
            minWidth="80px"
            color="#282F79"
            //    marginLeft="10px"
          />
        </Box>
      </div>

      <div>
        <div className="d-flex justify-content-between">
          <div>
            <PrimaryTextTypography
              style={{ fontSize: "8px", marginTop: "1.5rem" }}
            >
              Data collectors
            </PrimaryTextTypography>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <GButton
              label="Import"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              minWidth="35px"
            />

            <GButton
              label="New"
              buttonShape="circular"
              buttonType="teritiary"
              padding="0px"
              marginLeft="10px"
              minWidth="35px"
            />
          </div>
        </div>

        <GDivider />

        <Box sx={{ marginTop: "0.8rem" }}>
          <GButton
            label="logstash"
            buttonShape="circular"
            buttonType="teritiary"
            padding="2px 0px"
            minWidth="60px"
            color="#282F79"
            //    marginLeft="10px"
          />
          <GButton
            label="AWS s3"
            buttonShape="circular"
            buttonType="teritiary"
            padding="2px 0px"
            minWidth="60px"
            color="#282F79"
            marginLeft="10px"
          />
        </Box>
      </div>
    </div>
  );
}

export default IntegrationInfoSidebar;
