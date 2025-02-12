"use client";
import React, { useState } from "react";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import { Backdrop, Box, Button } from "@mui/material";
import theme from "@/Theme/theme";
// import ThreatHeader from "../Threat/ThreatHeader";
// import ThreatTable from "../Threat/ThreatTable";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { includes } from "lodash";
import CreateWorflowPopup from "../WorkflowComponents/CreateWorflowPopup";
import OverviewPageSkeleton from "../skeletons/WorkspaceSettings/OverviewPageSkeleton";
import ProjectGroupUpdateForm from "../SummaryComponents/ProjectGroupUpdateForm";

const ButtonPlusIcon = dynamic(
  () => import("@/app/Assests/icons/ButtonIcon.svg")
);
const GlobalButton = dynamic(
  () => import("@/app/apiflow_components/global/GButton")
);

const ThreatHeader = dynamic(
  () => import("@/app/apiflow_components/Threat/ThreatHeader")
);

const ThreatTable = dynamic(
  () => import("@/app/apiflow_components/Threat/ThreatTable")
);

const OverviewPage = dynamic(
  () => import("@/app/apiflow_Pages/workspace/settings/Overview"),
  {
    ssr: false, // Optionally disable SSR if you don't need it during SSR
    loading: () => <OverviewPageSkeleton />,
  }
);

const tabs = ["General", "Settings", "Messages"];
const integrationsInfo =
  "Add third-party integrations at the workspace level, so it is available to all projects/environments within this workspace.";

const GlobalSummary = (props: any) => {
  const { summaryData, endpointIdentityCountData } = props;

  const pathname = usePathname();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const [activeTab, setActiveTab] = useState("General");
  const [anchorEl, setAnchorEl] = useState(false);

  const router = useRouter();
  const baseUrl = `/userId/${userProfile.user.user_id}/workspaceId/${currentWorkspace?.id}/environment`;

  return (
    <Box bgcolor={`${theme.palette.summaryBgColor.main}`} height={"90vh"}>
      <Box
        sx={{
          background: `${theme.palette.iconSidebarBackground.main}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "15px 15px 0px 0px",
          padding: "15px 20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
          {tabs?.map((tab) => (
            <PrimaryTypography
              key={tab}
              onClick={() => setActiveTab(tab)}
              sx={{
                fontFamily: "FiraSans-regular",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 900,
                color:
                  activeTab === tab
                    ? `${theme.palette.navigationTabColor.main}`
                    : `${theme.palette.textTertiaryColor.main}`,
              }}
            >
              {tab}
            </PrimaryTypography>
          ))}
        </Box>

        <Box>
          {pathname.includes("/environment") && (
            <GlobalButton
              padding="6px 15px"
              margin="0px 0px"
              label={"Create Workflow"}
              iconPosition="start"
              fontWeight={500}
              background="#7A43FE26"
              color="#FFFFFF"
              border="solid 1px #FFFFFF40"
              icon={<ButtonPlusIcon />}
              onClickHandler={() => {
                setAnchorEl(true);
              }}
            />
          )}
        </Box>
      </Box>

      {/**Create Workflow Popup */}

      <Box>
        {anchorEl && (
          <>
            <Backdrop
              sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              // open={btnClicked}
              open={anchorEl}
            />
            <CreateWorflowPopup open={anchorEl} setOpen={setAnchorEl} />
          </>
        )}
      </Box>

      <>
        {activeTab === "General" ? (
          <>
            <Box
              display="flex"
              justifyContent="space-around"
              bgcolor={`${theme.palette.summaryCardColor.main}`}
              sx={{
                margin: "20px",
                padding: "25px 0px",
                borderRadius: "7px",
              }}
            >
              {summaryData?.map((item: any, index: any) => (
                <Box key={index} textAlign="center">
                  <PrimaryTypography
                    style={{
                      fontSize: "20px",
                      fontFamily: "FiraSans-regular",
                      fontWeight: 900,
                    }}
                  >
                    {item.value}
                  </PrimaryTypography>
                  <PrimaryTypography
                    style={{
                      fontSize: "18px",
                      marginTop: "5px",
                      fontFamily: "FiraSans-regular",
                    }}
                  >
                    {item.label}
                  </PrimaryTypography>
                </Box>
              ))}
            </Box>
            {/* Integrations Section */}
            <>
              {pathname.includes("/environment") && (
                <Box
                  bgcolor={`${theme.palette.summaryCardColor.main}`}
                  sx={{
                    margin: "20px",
                    padding: "25px 0px",
                    borderRadius: "7px",
                    textAlign: "center",
                  }}
                >
                  <PrimaryTypography
                    style={{
                      fontSize: "18px",
                      marginTop: "5px",
                      fontFamily: "FiraSans-regular",
                    }}
                  >
                    Integrations
                  </PrimaryTypography>
                  <PrimaryTypography
                    style={{
                      fontSize: "18px",
                      marginTop: "5px",
                      fontFamily: "FiraSans-regular",
                    }}
                  >
                    {integrationsInfo}
                  </PrimaryTypography>
                  <GlobalButton
                    buttonType="primary"
                    background={`${theme.palette.iconSidebarIconHoverBackground.main}`}
                    label="Configure"
                    marginRight="10px"
                    padding="5px 20px"
                    fontSize={"12px"}
                    radius="10px"
                    border="0.5px solid"
                    borderColor={`${theme.palette.textPrimaryColor.main}`}
                    onClickHandler={() => {
                      router?.push(`${baseUrl}/projectIntegration`);
                    }}
                  />
                </Box>
              )}
            </>

            {/**Threat table */}
            <Box
              sx={{
                margin: "20px",
                padding: "25px 0px",
              }}
            >
              <ThreatHeader />
              <ThreatTable
                endpointIdentityCountData={endpointIdentityCountData}
              />
            </Box>
          </>
        ) : activeTab === "Settings" ? (
          <>
            {pathname?.includes("/project") ? (
              <>
                <ProjectGroupUpdateForm />
              </>
            ) : pathname.includes("/environment") ? (
              <>
                <ProjectGroupUpdateForm />
              </>
            ) : (
              <Box sx={{ padding: "15px" }}>
                <React.Suspense fallback={<OverviewPageSkeleton />}>
                  <OverviewPage />
                </React.Suspense>
              </Box>
            )}
          </>
        ) : (
          <>
            <h1>message</h1>
          </>
        )}
      </>
    </Box>
  );
};

export default GlobalSummary;
