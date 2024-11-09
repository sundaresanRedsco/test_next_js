"use client";
import React, { useEffect, useRef, useState } from "react";
// import GlobalIntegartionData from "";
// import { LeftArrowIcon } from "@/app/Assests/icons";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
// import GButton from "@/app/ApiFlowComponents/Global/GButton";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import GButton from "@/app/apiflow_components/global/GButton";
import AddIcon from "@mui/icons-material/Add";
import {
  environmentReducer,
  GetProjectByWorkspaceIdSolrOffsetOverView,
  updateProjectOverViewEnd,
  updateProjectOverViewStart,
} from "@/app/Redux/apiManagement/environmentReducer";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import Grid from "@mui/material/Grid2";
import dynamic from "next/dynamic";

const GlobalIntegartionData = dynamic(
  () => import("@/app/apiflow_components/global/GlobalIntegartionData"),
  { ssr: false }
);

const LeftArrowIcon = dynamic(
  () => import("@/app/Assests/icons/LeftArrow.svg"),
  { ssr: false }
);

const TextTypography = styled(Typography)`
  font-family: FiraSans-semibold;
  color: white;
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffffbf;
  font-size: 1.3rem;
  margin-top: 0.7rem;
`;

function WorkspaceEnvironments() {
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const {
    getProjectOverViewLoading,
    getProjectOverViewStart,
    getProjectOverViewEnd,
    getProjectOverViewTotalCount,
  } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);

  const [projectData, setProjectData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPageData = async (offsetVal: number) => {
    const data = {
      workspaceId: currentWorkspace?.id as string,
      sortByField: "",
      sortByvalue: "",
      sortDirection: "asc",
      start: getProjectOverViewStart,
      end: offsetVal,
    };

    dispatch(GetProjectByWorkspaceIdSolrOffsetOverView(data))
      .unwrap()
      .then((projectRes: any) => {
        // if (groupRes?.length > 0) {
        //   // Handle success
        // }
        console.log(projectRes, "projectRes");
        // setGroupData(groupRes);
        setProjectData((prevValues: any) => {
          const newData = Array.isArray(projectRes?.projects)
            ? projectRes?.projects
            : [];
          const updatedValues = [...prevValues];

          newData?.forEach((val: any) => {
            if (
              !prevValues?.some((prevData: any) => prevData?.id === val?.id)
            ) {
              updatedValues.push(val);
            }
          });
          return updatedValues;
        });
      })
      .catch((error: any) => {
        console.log("ErrorWorkspace: ", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        if (getProjectOverViewEnd <= getProjectOverViewTotalCount) {
          dispatch(updateProjectOverViewStart(getProjectOverViewStart + 8));
          dispatch(updateProjectOverViewEnd(getProjectOverViewEnd + 8));
        }
      }
    }
  };

  useEffect(() => {
    // const container = document.getElementById(maninContainer);
    const container: any = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
    // }, [maninContainer]); // Include maninContainer as a dependency
  }, []);

  useEffect(() => {
    fetchPageData(getProjectOverViewEnd);
  }, [getProjectOverViewEnd, currentWorkspace]);

  return (
    <div style={{ margin: "10px 15px" }}>
      {/* Header */}
      <div>
        <HeadingTypography style={{ marginTop: "1rem" }}>
          {/* Carrefour Workspace <LeftArrowIcon /> */}
          {currentWorkspace?.name} <LeftArrowIcon />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "FiraSans-Regular",
              fontSize: "1.3rem",
              margin: "0rem 0.3rem",
              fontWeight: "600",
            }}
          >
            Settings
          </span>
          <LeftArrowIcon />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "FiraSans-Regular",
              fontSize: "1.3rem",
              marginLeft: "0.3rem",
              fontWeight: "600",
            }}
          >
            Environments
          </span>{" "}
        </HeadingTypography>
      </div>

      {/* Manage Environments and Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <TextTypography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
          Manage Environments
        </TextTypography>

        <GButton
          background="#7A43FE"
          label="Create"
          color="#FFFFFF"
          padding="8px"
          border="none"
          fontSize="0.8rem"
          fontWeight="600"
          icon={<AddIcon />}
          iconPosition="start"
        />
      </div>

      {/* Mapping cardData to GlobalIntegartionData */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
        <Box
          ref={containerRef}
          onScroll={handleScroll}
          sx={{
            height: 500,
            overflowY: "auto",
            position: "relative",
          }}
        >
          {getProjectOverViewLoading && (
            <GlobalCircularLoader open={getProjectOverViewLoading} noBackdrop />
          )}
          {getProjectOverViewTotalCount > 0 ? (
            <GlobalIntegartionData data={projectData} />
          ) : (
            <PrimaryTypography
              style={{
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15%",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              No data found
            </PrimaryTypography>
          )}
        </Box>
      </Grid>
    </div>
  );
}

export default WorkspaceEnvironments;
