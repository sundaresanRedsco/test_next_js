"use client";

import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";

import { styled } from "@mui/system";

import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { projectApiReducer } from "@/app/Redux/apiManagement/projectApiReducer";
import dynamic from "next/dynamic";
import EnvironmentPageSkeleton from "@/app/apiflow_components/skeletons/EnvironmentPageSkeleton";
import EnviromentTableSkeleton from "@/app/apiflow_components/skeletons/EnviromentTableSkeleton";
import LinearSkeleton from "@/app/apiflow_components/skeletons/LinearSkeleton";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";

const ButtonPlusIcon = dynamic(
  () => import("@/app/Assests/icons/ButtonIcon.svg")
);
const ExpandIcon = dynamic(
  () => import("@/app/Assests/icons/ExpandIconNew.svg")
);
const MinimizeNewIcon = dynamic(
  () => import("@/app/Assests/icons/MinimizeNew.svg")
);

const GlobalGraphData = dynamic(
  () => import("@/app/apiflow_components/global/GlobalGraphData"), // Add comma here
  {
    loading: () => <EnvironmentPageSkeleton />, // Skeleton displayed during loading
  }
);
const ThreatHeader = dynamic(
  () => import("@/app/apiflow_components/Threat/ThreatHeader")
);
const ThreatTable = dynamic(
  () => import("@/app/apiflow_components/Threat/ThreatTable"),
  {
    loading: () => <EnviromentTableSkeleton />, // Skeleton displayed during loading
  }
);

const GlobalProgressBar = dynamic(
  () => import("@/app/apiflow_components/global/GlobalProgressBar"),
  {
    loading: () => <LinearSkeleton />, // Skeleton displayed during loading
  }
);

const GlobalButton = dynamic(
  () => import("@/app/apiflow_components/global/GButton")
);

const BackgroundContainer = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  background: #1c1818a3;
  border-radius: 10px;
  padding: 10px 20px;
`;

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  //   margin-bottom: 1rem;
  margin: 10px 0px;
`;

const ProgressTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 15px;
  margin-top: 1.5rem;
`;

const projectData: any = [];

const ProjectHomePage = () => {
  const { currentProject, currentProjectDetails } = useSelector<
    RootStateType,
    projectApiReducer
  >((state) => state.apiManagement.apiProjects);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  return (
    <div>
      <HeadingTypography style={{ fontSize: "25px" }}>
        {currentProjectDetails?.name} Summary
      </HeadingTypography>
      <BackgroundContainer>
        <Grid2 container spacing={2} sx={{ marginBottom: "0.5rem" }}>
          <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
            <HeadingTypography>Environment Summary</HeadingTypography>
          </Grid2>

          <Grid2
            size={{ md: 6, sm: 6, xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end", md: "flex-end" },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <GlobalButton
                  padding="6px 15px"
                  label={"New Environment"}
                  iconPosition="start"
                  fontWeight={500}
                  background="#7A43FE26"
                  color="#FFFFFF"
                  border="solid 1px #FFFFFF40"
                  icon={<ButtonPlusIcon />}
                />
                <div style={{ margin: "10px 20px" }}>
                  <ExpandIcon />
                  <span style={{ marginLeft: "1.3rem", marginTop: "1rem" }}>
                    <MinimizeNewIcon />
                  </span>
                </div>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 4, sm: 4, xs: 12 }}>
            <GlobalGraphData
              projectData={projectData}
              projectName={"Dev Environment"}
            />
          </Grid2>

          <Grid2 size={{ md: 4, sm: 4, xs: 12 }}>
            <GlobalGraphData
              projectData={projectData}
              projectName={"On-prem Swag Environment"}
            />
          </Grid2>
          <Grid2 size={{ md: 4, sm: 4, xs: 12 }}>
            <GlobalGraphData
              projectData={projectData}
              projectName={"GCP Environment"}
            />
          </Grid2>
        </Grid2>

        <ProgressTypography>
          Threat Activity By Category (Total : {projectData?.length})
        </ProgressTypography>
        <GlobalProgressBar />
      </BackgroundContainer>
      <div style={{ marginTop: "1.5rem" }}>
        <ThreatHeader />
        <ThreatTable />
      </div>
    </div>
  );
};

export default ProjectHomePage;
