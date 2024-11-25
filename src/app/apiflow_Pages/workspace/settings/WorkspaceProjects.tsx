"use client";

import React, { useState, useRef, useEffect } from "react";
// import { LeftArrowIcon } from "@/app/Assests/icons";
import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";

import GButton from "@/app/apiflow_components/global/GButton";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {
  GetGroupsByWorkspaceIdOVerView,
  projectApiReducer,
  updateGroupOverViewEnd,
  updateGroupOverViewStart,
} from "@/app/Redux/apiManagement/projectApiReducer";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import { PrimaryTypography } from "@/app/Styles/signInUp";
// import GlobalOverViewGroupIntegration from "@/app/apiflow_components/global/GlobalOverViewGroupIntegration";
import Grid from "@mui/material/Grid2";
import dynamic from "next/dynamic";
import WorkspaceProjectSkeleton from "@/app/apiflow_components/skeletons/WorkspaceProjectSkeleton";
import { initializeSession } from "@/app/Redux/commonReducer";

const GlobalOverViewGroupIntegration = dynamic(
  () =>
    import("@/app/apiflow_components/global/GlobalOverViewGroupIntegration"),
  {
    loading: () => <WorkspaceProjectSkeleton />, // Skeleton displayed during loading
  }
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

function WorkspaceProjects() {
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );
  console.log(currentWorkspace?.id, "currentWorkspace?.id");

  const {
    groupOverViewEnd,
    groupOverViewStart,
    getGroupOverViewLoading,
    getGroupTotalCount,
    getGroupList,
  } = useSelector<RootStateType, projectApiReducer>(
    (state) => state.apiManagement.apiProjects
  );
  console.log(getGroupList, "getGroupListsd");

  const dispatch = useDispatch<any>();
  // const containerRef = useRef<any>(null);

  const [groupData, setGroupData] = useState<any>([]);
  console.log(groupData, "groupDatasd");
  const [offsetVal, setoffsetVal] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(groupData, "projetDatasdsd");
  console.log(
    getGroupOverViewLoading,
    groupData,
    groupOverViewEnd,
    groupOverViewStart,
    "getGroupOverViewLoading"
  );




  const fetchPageData = async (endValue: number) => {
    const data = {
      WorkspaceId: currentWorkspace?.id as string,
      start: 1,
      end: endValue,
    };

    dispatch(GetGroupsByWorkspaceIdOVerView(data))
      .unwrap()
      .then((workspaceRes: any) => {
        console.log("Fetched data:", workspaceRes);
      })
      .catch((error: any) => {
        console.log("ErrorWorkspace: ", error);
      });
  };

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  const containerRef: any = useRef<any>();
  const handleScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      if (bottom <= window.innerHeight) {
        setEndValue((prevEnd) => prevEnd + 5); // Increase end value by 3 on scroll
      }
    }
  };

  // Initialize `start` and `end` values
  const [endValue, setEndValue] = useState(5);

  useEffect(() => {
    fetchPageData(endValue);
  }, [endValue]);

  // Hook to handle scroll events
  useEffect(() => {
    const container = document.getElementById("mainContainer");

    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div style={{ margin: "10px 15px" }}>
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
            Projects
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
          Manage Projects
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
      <div>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Box
            // ref={containerRef}
            // onScroll={handleScroll}
            sx={{
              height: 500,
              overflowY: "auto",
              position: "relative",
            }}
          >
            {getGroupOverViewLoading && (
              <GlobalCircularLoader
                open={getGroupOverViewLoading}
                noBackdrop={true}
              />
            )}
            {getGroupTotalCount > 0 ? (
              <GlobalOverViewGroupIntegration data={getGroupList?.groups} />
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

            {getGroupOverViewLoading &&
              getGroupList?.groups?.length > 1 &&
              [1, 2, 3, 4].map((elem, index) => {
                return (
                  <Grid
                    size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                    sx={{
                      display: "flex",
                      position: "relative",
                      minHeight: "300px",
                      "@media (min-width: 1600px)": {
                        // Change '1920px' to any custom breakpoint
                        flexBasis: "25%", // Adjust as per your needs
                        maxWidth: "25%", // Same as the flexBasis for proper alignment
                      },
                    }}
                  >
                    <WorkspaceProjectSkeleton key={index} />
                  </Grid>
                );
              })}
            <div ref={containerRef}></div>
          </Box>
        </Grid>
      </div>
    </div>
  );
}

export default WorkspaceProjects;
