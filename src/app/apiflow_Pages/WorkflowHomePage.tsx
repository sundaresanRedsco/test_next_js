"use client";
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Card,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Image from "next/image";

import { environmentReducer } from "../Redux/apiManagement/environmentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../Redux/store";
import {
  FlowReducer,
  GetRecentModification,
} from "../Redux/apiManagement/flowReducer";
import { workspaceReducer } from "../Redux/apiManagement/workspaceReducer";

import CreateWorflowPopup from "../apiflow_components/WorkflowComponents/CreateWorflowPopup";

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
  const theme = useTheme();

  const dispatch = useDispatch<any>();
  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const { getRecentModificationsLoading, recentModifications } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);

  const [displayedModifications, setDisplayedModifications] = useState(
    recentModifications?.slice(-2)
  );

  const [anchorEl, setAnchorEl] = useState(false);
  const [serviceVal, setServiceVal] = useState("HTTP - JSON");

  useEffect(() => {
    if (recentModifications) {
      const handleResize = () => {
        if (window?.innerWidth >= 1600) {
          setDisplayedModifications(recentModifications?.slice(-3));
        } else {
          setDisplayedModifications(recentModifications?.slice(-2));
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [recentModifications]);

  useEffect(() => {
    if (currentEnvironment) {
      dispatch(GetRecentModification(currentEnvironment))
        .unwrap()
        .then((getRecentModRes: any) => {})
        .catch((error: any) => {});
    }
  }, [currentEnvironment]);

  return (
    <Box
      sx={{
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
            gap: "20px",
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
                gap: "10px",
              }}
              onClick={() => {
                setAnchorEl(true);
              }}
            >
              {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}> */}
              <InnerStyledCard>
                <PrimaryTypography
                  sx={{
                    fontSize: {
                      xl: "18px",
                      lg: "18px",
                      md: "16px",
                    },
                  }}
                >
                  {val}
                </PrimaryTypography>
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

            justifyContent: "flex-start",
            alignItems: "start",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          {!getRecentModificationsLoading ? (
            displayedModifications?.length <= 0 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "50vh",
                }}
              >
                <PrimaryTypography
                  style={{
                    color: "#FFFFFF",

                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  No data found
                </PrimaryTypography>
              </Box>
            ) : (
              <>
                {displayedModifications?.map((x, index) => (
                  <OuterStyledCard
                    key={x.id}
                    sx={{
                      padding: "10px",
                      margin: "20px",

                      width: { xs: "100%", sm: "48%", md: "45%", lg: "45%" },

                      "@media (min-width: 1600px)": {
                        width: "30%", // Three boxes per row
                      },
                    }}
                  >
                    <PrimaryTypography style={{ marginBottom: "20px" }}>
                      {x.flow_name}
                    </PrimaryTypography>

                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "auto",
                      }}
                    >
                      <Image
                        src={x.screenshot}
                        alt={x.flow_name}
                        layout="responsive"
                        width={500}
                        height={300}
                        objectFit="cover"
                      />
                    </Box>
                  </OuterStyledCard>
                ))}
              </>
            )
          ) : (
            [1, 2].map((_, index) => (
              <OuterStyledCard
                key={index}
                sx={{
                  margin: "20px",
                  height: "370px",
                  width: { xs: "100%", sm: "48%", md: "45%", lg: "45%" },
                  "@media (min-width: 1600px)": {
                    width: "30%", // Three boxes per row
                  },
                  overflow: "hidden",
                }}
              >
                <Skeleton sx={{ height: "100%", width: "100%" }} />
              </OuterStyledCard>
            ))
          )}
        </Box>
      </Grid>

      <Backdrop
        sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        // open={btnClicked}
        open={anchorEl}
      />
      <div>
        {anchorEl && (
          <CreateWorflowPopup open={anchorEl} setOpen={setAnchorEl} />
        )}
      </div>
    </Box>
  );
}
