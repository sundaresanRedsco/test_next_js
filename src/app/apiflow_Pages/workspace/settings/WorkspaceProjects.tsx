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

const GlobalOverViewGroupIntegration = dynamic(
  () =>
    import("@/app/apiflow_components/global/GlobalOverViewGroupIntegration"),
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

function WorkspaceProjects() {
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const {
    groupOverViewEnd,
    groupOverViewStart,
    getGroupOverViewLoading,
    getGroupTotalCount,
  } = useSelector<RootStateType, projectApiReducer>(
    (state) => state.apiManagement.apiProjects
  );

  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);

  const [groupData, setGroupData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(groupData, "projetDatasdsd");
  console.log(
    getGroupOverViewLoading,
    groupData,
    groupOverViewEnd,
    groupOverViewStart,
    "getGroupOverViewLoading"
  );

  const fetchPageData = async (offsetVal: number) => {
    const data = {
      WorkspaceId: currentWorkspace?.id as string,
      // WorkspaceId: "1edb2a2a8c3948beb0a8bace49360e15",
      start: groupOverViewStart,
      end: offsetVal,
    };

    dispatch(GetGroupsByWorkspaceIdOVerView(data))
      .unwrap()
      .then((groupRes: any) => {
        // if (groupRes?.length > 0) {
        //   // Handle success
        // }
        console.log(groupRes, "resneuusd");
        // setGroupData(groupRes);
        setGroupData((prevValues: any) => {
          const newData = Array.isArray(groupRes?.groups)
            ? groupRes?.groups
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
        if (groupOverViewEnd <= getGroupTotalCount) {
          dispatch(updateGroupOverViewStart(groupOverViewStart + 8));
          dispatch(updateGroupOverViewEnd(groupOverViewEnd + 8));
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
    fetchPageData(groupOverViewEnd);
  }, [groupOverViewEnd, currentWorkspace]);

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
            ref={containerRef}
            onScroll={handleScroll}
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
              <GlobalOverViewGroupIntegration data={groupData} />
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
    </div>
  );
}

export default WorkspaceProjects;
