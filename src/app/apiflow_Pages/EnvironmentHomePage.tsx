"use client";
import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid2 from "@mui/material/Grid2";

import { styled } from "@mui/system";

import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";

import dynamic from "next/dynamic";
import { environmentReducer } from "../Redux/apiManagement/environmentReducer";
import EnvironmentPageSkeleton from "../apiflow_components/skeletons/EnvironmentPageSkeleton";
import EnviromentTableSkeleton from "../apiflow_components/skeletons/EnviromentTableSkeleton";
import LinearSkeleton from "../apiflow_components/skeletons/LinearSkeleton";
import { useRouter } from "next/navigation";
import { CommonReducer } from "../Redux/commonReducer";
import { workspaceReducer } from "../Redux/apiManagement/workspaceReducer";

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

const projectData: any = [
  // {
  //   title: "Risk Detected",
  //   dataValue: 48,
  //   percentageChange: 10,
  //   dotColor: "red",
  // },
  // {
  //   title: "Frequent Changes",
  //   dataValue: 30,
  //   percentageChange: 5,
  //   dotColor: "#55FF46",
  // },
  // {
  //   title: "Compliance Risk",
  //   dataValue: 25,
  //   percentageChange: 15,
  //   dotColor: "red",
  // },
  // {
  //   title: "Recent Messages",
  //   dataValue: 40,
  //   percentageChange: 8,
  //   dotColor: "#55FF46",
  // },
];

const EnvironmentHomePage = () => {
  const { currentEnvironment, currentEnvironmentDetails } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  console.log(currentEnvironmentDetails, "currentEnvironmentsNwe");
  console.log(currentEnvironment, "sdcurrentEnvironmentsdsdw");

  const router = useRouter();
  const baseUrl = `/userId/${userProfile.user.user_id}/workspaceId/${currentWorkspace?.id}/project`;

  return (
    <div>
      <HeadingTypography style={{ fontSize: "25px" }}>
        {currentEnvironmentDetails?.name ||
          currentEnvironmentDetails?.project_name}
      </HeadingTypography>
      <BackgroundContainer>
        <Grid2 container spacing={2} sx={{ marginBottom: "0.5rem" }}>
          <Grid2 size={{ md: 6, sm: 6, xs: 12 }}>
            <HeadingTypography>Risk Summary</HeadingTypography>
          </Grid2>

          <Grid2
            size={{ md: 6, sm: 6, xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end", md: "flex-end" },
            }}

            // flexDirection: { xs: "column", sm: "column", md: "row" },
          >
            {/* <HeadingTypography>Button</HeadingTypography> */}
            <Box sx={{ display: "flex" }}>
              {/* <Stack
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              
              }}
            > */}

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <GlobalButton
                  padding="6px 15px"
                  label={"ProjectIntegration"}
                  iconPosition="start"
                  fontWeight={500}
                  // type={"submit"}
                  // buttonType="primary"
                  // width={"100%"}
                  background="#7A43FE26"
                  color="#FFFFFF"
                  marginRight="5px"
                  border="solid 1px #FFFFFF40"
                  icon={<ButtonPlusIcon />}
                  onClickHandler={() => {
                    router?.push(`${baseUrl}/projectIntegration`);
                  }}
                />
                <GlobalButton
                  padding="6px 15px"
                  label={"New Environment"}
                  iconPosition="start"
                  marginRight="5px"
                  fontWeight={500}
                  // type={"submit"}
                  // buttonType="primary"
                  // width={"100%"}
                  background="#7A43FE26"
                  color="#FFFFFF"
                  border="solid 1px #FFFFFF40"
                  icon={<ButtonPlusIcon />}
                />

                <GlobalButton
                  padding="6px 15px"
                  label={"Project Integration"}
                  iconPosition="start"
                  fontWeight={500}
                  // type={"submit"}
                  // buttonType="primary"
                  // width={"100%"}
                  background="#7A43FE26"
                  color="#FFFFFF"
                  border="solid 1px #FFFFFF40"
                  marginRight="5px"
                  onClickHandler={() => {
                    router?.push(`${baseUrl}/projectIntegration`);
                  }}
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

        {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}> */}
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

        {/* </div> */}
        {/* {projectData?.length === 0 ? (
          <div></div>
        ) : (
          <>
          
            <GlobalProgressBar />
          </>
        )} */}
      </BackgroundContainer>
      <div style={{ marginTop: "1.5rem" }}>
        <ThreatHeader />
        <ThreatTable />
      </div>
    </div>
  );
};

export default EnvironmentHomePage;
