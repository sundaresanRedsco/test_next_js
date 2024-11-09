"use client";
import React, { useEffect } from "react";
import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import WorkflowImage from "@/app/Assests/images/WorkflowImage.png";
import Image from "next/image";
// import PostCard from "../apiflow_components/channels/post/PostCard";
import { environmentReducer } from "../Redux/apiManagement/environmentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../Redux/store";
import {
  FlowReducer,
  GetRecentModification,
} from "../Redux/apiManagement/flowReducer";

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

const PrimaryTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

const OuterStyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#251A28",
  // backgroundColor: "red",
  borderRadius: "20px",
  flex: "none",
  order: 1,
  alignSelf: "stretch",
  flexGrow: 0,
}));

const InnerStyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  background: "#12121280",
  borderRadius: "15px",
  padding: "15px 20px",
  border: "1px solid rgba(255, 255, 255, 0.25)",
}));

export default function WorkflowHomePage() {
  const workflowVal = ["Create Workflow", "Workflow Samples", "Tutorial"];

  const dispatch = useDispatch<any>();
  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const {
    // loading,
    DesignFlowloading,
    recentModifications,
  } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  console.log(recentModifications, "recentModifications");

  useEffect(() => {
    dispatch(GetRecentModification(currentEnvironment))
      .unwrap()
      .then((getRecentModRes: any) => {
        console.log(getRecentModRes, "getRecentModRes");
      })
      .catch((error: any) => {
        console.log(error, "ERROR");
      });
  }, [currentEnvironment]);

  return (
    <Box
      sx={{
        // padding: "20px",
        overflowY: "auto",
      }}
    >
      <Grid
        size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        sx={{ margin: "20px 0px" }}
      >
        <HeadingTypography>Workflow Summary</HeadingTypography>
        <OuterStyledCard
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
            alignItems: "center",
            padding: "10px",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          {workflowVal?.map((val) => (
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                width: {
                  xs: "auto",
                  sm: "auto",
                  md: "auto",
                  lg: "33%",
                  xl: "33%",
                },
              }}
            >
              {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}> */}
              <InnerStyledCard>
                <PrimaryTypography>{val}</PrimaryTypography>
                <KeyboardArrowRightIcon
                  style={{
                    color: "#FFFFFF",
                  }}
                />
              </InnerStyledCard>
              {/* </Grid> */}
            </Box>
          ))}
        </OuterStyledCard>
      </Grid>
      <Grid
        size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        sx={{ margin: "20px 0px" }}
      >
        <HeadingTypography>Recently Modified</HeadingTypography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          {recentModifications?.map((x) => (
            <OuterStyledCard
              key={x.id}
              sx={{
                padding: "10px",
                margin: "5px",
                // width: "577px",
                // height: "430px",
                width: { xs: "100%", sm: "48%", md: "45%", lg: "48%" },
                "@media (min-width: 1600px)": {
                  width: "33%", // Same as the flexBasis for proper alignment
                },
              }}
            >
              <PrimaryTypography style={{ marginBottom: "20px" }}>
                {x.flow_name}
              </PrimaryTypography>
              {/* 
              <img
                src={x.screenshot}
                alt={x.flow_name}
                style={{ width: "100%", height: "auto" }} // Ensure height is auto to maintain aspect ratio
              /> */}

              <Image
                // src={WorkflowImage}
                src={x.screenshot}
                alt={x.flow_name}
                width={100}
                height={100}
                // style={{ width: "100%" }}
              />
            </OuterStyledCard>
          ))}

          {/* <OuterStyledCard
            sx={{
              padding: "10px",
              margin: "5px",
              width: { xs: "100%", sm: "48%", md: "45%", lg: "48%" },
              "@media (min-width: 1600px)": {
                width: "33%", // Same as the flexBasis for proper alignment
              },
              // width: "577px",
              // height: "430px",
            }}
          >
            <PrimaryTypography style={{ marginBottom: "20px" }}>
              Workflow2{" "}
            </PrimaryTypography>

            <Image
              src={WorkflowImage}
              alt="Workflow Image"
              style={{ width: "100%" }}
            />
          </OuterStyledCard> */}
        </Box>
      </Grid>
      {/* <Grid
        size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        sx={{ margin: "20px 0px" }}
      >
        <PostCard />
      </Grid> */}
    </Box>
  );
}
