"use client";
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Card,
  FormControl,
  Popover,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
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
  CreateApiDesignFlow,
  FlowReducer,
  GetDesignflowMinamlInfoFlowoffset,
  GetRecentModification,
} from "../Redux/apiManagement/flowReducer";
import GlobalCircularLoader from "../ApiFlowComponents/Global/GlobalCircularLoader";
import { workspaceReducer } from "../Redux/apiManagement/workspaceReducer";
import toast from "react-hot-toast";
import { updateSessionPopup } from "../Redux/commonReducer";
import { SecondaryTypography } from "../Styles/signInUp";
import ApiTextField from "../Components/ApiManagement/apiTextField";
import { TextOutlinedInput } from "../hooks/operations/useOperationHelpers";
import GButton from "../Components/Global/GlobalButtons";

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
  const theme = useTheme();

  const dispatch = useDispatch<any>();
  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const {
    // loading,
    getRecentModificationsLoading,
    recentModifications,
  } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  console.log(recentModifications, "recentModificationssd");

  const [displayedModifications, setDisplayedModifications] = useState(
    recentModifications?.slice(-2)
  );

  const [anchorEl, setAnchorEl] = useState(false);
  const [serviceVal, setServiceVal] = useState("HTTP - JSON");
  const [btnClicked, setBtnClicked] = useState(false);

  const [errorApiName, setErrorApiName] = useState("");
  const [createNewApiFlowValues, setCreateNewApiFlowValues] = useState({
    // workspace_id: currentTeam?.workspace_id,
    workspace_id: currentWorkspace?.id,
    name: "",
    description: "",
  });

  const handleClosePopover = () => {
    setAnchorEl(false);
    setBtnClicked(false);

    setCreateNewApiFlowValues({
      description: "",
      name: "",
      workspace_id: "",
    });
    setErrorApiName("");
  };

  const handleCreateApiFlow = () => {
    const hasValidationError = createNewApiFlowValues?.name.trim() === "";
    // ||
    // createNewApiFlowValues?.description.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      createNewApiFlowValues?.name
    );

    const isOverLimit = createNewApiFlowValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
      // setErrorDescription("ApiFlow Description is required")
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
      let createData = {
        // tenant_id: userProfile?.user?.tenant_id,
        workspace_id: currentWorkspace?.id,
        projectid: currentEnvironment,
        name: createNewApiFlowValues?.name,
        description: createNewApiFlowValues?.description,
        id: "",
        // user_id: userProfile?.user.user_id,
      };

      dispatch(CreateApiDesignFlow(createData))
        .unwrap()
        .then((createRes: any) => {
          let requestData = {
            project_id: currentEnvironment,
            start: 1,
            end: 6,
            name: "",
          };
          // dispatch(GetApiDesignFlowByWorkspaceId(currentTeam?.workspace_id))
          dispatch(GetDesignflowMinamlInfoFlowoffset(requestData))
            .unwrap()
            .then((getApiFlowRes: any) => {
              toast?.success("New Api Flow Created");
              // dispatch(updateTourStep(tourStep + 1));
              setCreateNewApiFlowValues({
                description: "",
                name: "",
                workspace_id: "",
              });
              setAnchorEl(false);
              setBtnClicked(false);
              // }
              // else {
              //   toast?.error("Error")
              // }
            })
            .catch((error: any) => {
              if (error?.message === "UNAUTHORIZED") {
                dispatch(updateSessionPopup(true));
              }
            });
        })
        .catch((error: any) => {
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  };

  const handleCreateApiFlowValidation = () => {
    const hasValidationError = createNewApiFlowValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      createNewApiFlowValues?.name
    );

    const isOverLimit = createNewApiFlowValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
      // setErrorDescription("ApiFlow Description is required")
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
    }
  };

  const handleCreateNewApiFlow = (field: any, event: any) => {
    setCreateNewApiFlowValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

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
        .then((getRecentModRes: any) => {
          console.log(getRecentModRes, "getRecentModRes");
        })
        .catch((error: any) => {
          console.log(error, "ERROR");
        });
    }
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
            // justifyContent: "space-evenly",
            justifyContent: "flex-start",
            alignItems: "start",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* {getRecentModificationsLoading && (
            <GlobalCircularLoader
              open={getRecentModificationsLoading}
              isBackdrop={true}
            />
          )} */}
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
                    // padding: "15%",
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
                      // width: "577px",
                      // height: "430px",
                      width: { xs: "100%", sm: "48%", md: "45%", lg: "45%" },
                      // "@media (min-width: 1600px)": {
                      //   width: "33%", // Same as the flexBasis for proper alignment
                      // },
                      "@media (min-width: 1600px)": {
                        width: "30%", // Three boxes per row
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

                    {/* <Image
                // src={WorkflowImage}
                src={x.screenshot}
                alt={x.flow_name}
                width={500}
                height={300}
                // style={{ width: "100%" }}
              /> */}

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
        open={btnClicked}
      />
      <div>
        {anchorEl && (
          <Popover
            open={anchorEl}
            // anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            sx={{
              zIndex: 9999,
              "& .MuiPaper-root": {
                backgroundColor: theme.palette.signInUpWhite.main,
                width: "580px",
                height: "340px",
                // position: "absolute",
              },
            }}
          >
            <div style={{ padding: "20px" }}>
              <PrimaryTypography
                style={{
                  color: `${theme.palette.teritiaryColor.main}`,
                }}
              >
                Create a new ApiFlow
              </PrimaryTypography>
              <div style={{ marginTop: "10px" }}>
                <div className="api_designFlow_name">
                  <SecondaryTypography
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    ApiFlow Name
                  </SecondaryTypography>
                  <ApiTextField
                    // value={element.api_project_name}
                    value={createNewApiFlowValues?.name}
                    dataTest={"project-name-input"}
                    width="500px"
                    height="42px"
                    borderColor="#9CA3AF"
                    borderRadius="4px"
                    onChange={(e: any) => {
                      handleCreateNewApiFlow("name", e.target.value);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        // dispatch(updateTourStep(tourStep + 1));
                        handleCreateApiFlowValidation();
                      }
                    }}
                    error={errorApiName}
                    errorHandler={(error: any) => setErrorApiName(error)}
                  />
                  <span
                    style={{
                      whiteSpace: "pre",
                    }}
                  >
                    {"  "}
                  </span>
                </div>
                <div className="api_designFlow_description">
                  <SecondaryTypography
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    ApiFlow Description
                  </SecondaryTypography>
                  <FormControl>
                    <div style={{ marginTop: "10px" }}>
                      <TextOutlinedInput
                        // value={element.description}
                        value={createNewApiFlowValues?.description}
                        data-test={"project-description"}
                        style={{
                          width: "500px",
                          height: "50px",
                          borderColor: "#9CA3AF",
                          borderRadius: "4px",
                        }}
                        onChange={(e: any) => {
                          handleCreateNewApiFlow("description", e.target.value);
                        }}
                        onKeyUp={(event: any) => {}}
                      />
                    </div>
                  </FormControl>
                </div>
              </div>
              <div
                style={{ margin: "10px" }}
                className="api_designFlow_buttons"
              >
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div>
                    <GButton
                      buttonType="primary"
                      label={`Cancel`}
                      color={`${theme.palette.primaryBlack.main}`}
                      background="transparent"
                      onClickHandler={handleClosePopover}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <GButton
                      buttonType="primary"
                      label={`Create ApiFlow`}
                      onClickHandler={handleCreateApiFlow}
                      dataTest="save-project-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Popover>
        )}
      </div>

      {/* <Grid
        size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        sx={{ margin: "20px 0px" }}
      >
        <PostCard />
      </Grid> */}
    </Box>
  );
}
