import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import GButton from "@/app/apiflow_components/global/GButton";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import GlobalCircularLoader from "@/app/apiflow_components/global/GlobalCircularLoaderV2";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import JsonViewer from "./jsonViewer";

const CustomizedAccSummary = styled(AccordionSummary)(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    marginRight: "0",
    marginLeft: "0",
  },
}));

const PrimaryTypography = styled(Typography)`
  font-family: FiraSans-medium !important;
  color: #eeeeee;
  font-size: 12px;
`;

const SecondaryTypography = styled(Typography)`
  font-family: FiraSans-medium !important;
  color: #eeeeee;
  font-size: 12px;
`;

const TertiaryTypogrpahy = styled(Typography)`
  font-family: FiraSans-light !important;
  color: #eeeeee;
  font-size: 0.6rem;
`;

export default function WorkflowDrawer(props: any) {
  const { containerRef, openDrawer, setOpenDrawer, errors, SuccessMessages } =
    props;

  const { flowYdoc, compiling } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const btnData = [
    {
      name: "Run Results",
      type: "filled",
    },
  ];

  const [selectedBtn, setSelectedBtn] = useState("Run Results");
  const [drawerBtnVal, setDrawerBtnVal] = useState(btnData);
  const [runResult, setRunResult] = useState<any>([]);
  const { height, setHeight } = useGlobalStore();

  const handleResize = (event: any, { size }: any) => {
    setHeight(size.height);
  };

  const handleClose = () => {
    setOpenDrawer(false);
  };

  const handleBtnClick = (val: any) => {
    setSelectedBtn(val);
  };

  const getMethodColor = (method: string): string => {
    switch (method) {
      case "GET":
        return "#3DD775"; // Green
      case "POST":
        return "#F68E1E"; // Orange
      case "PUT":
        return "#007BFF"; // Blue
      case "DELETE":
        return "#FF1F1F"; // Red
      default:
        return "#FFFFFF"; // Default white
    }
  };

  const getMessageColor = (message: string): string => {
    switch (message) {
      case "SUCCESS":
        return "#3DD775"; // Green
      case "FAILED":
        return "#FF1F1F"; // Red
      default:
        return "#FFFFFF"; // Default white
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "OK":
        return "#3DD775"; // Green for OK status
      case "Forbidden":
        return "#F68E1E"; // Orange for Forbidden status
      case "Error":
        return "#FF0000"; // Red for Error status
      default:
        return "#FFFFFF"; // Default white for unhandled statuses
    }
  };

  const getStatusCodeColor = (statusCode: number): string => {
    if (statusCode >= 100 && statusCode <= 199) {
      return "#0000FF"; // Blue for informational responses
    } else if (statusCode >= 200 && statusCode <= 299) {
      return "#3DD775"; // Green for success
    } else if (statusCode >= 300 && statusCode <= 399) {
      return "#D8A805"; // Yellow for redirects
    } else if (statusCode >= 400 && statusCode <= 499) {
      return "#F68E1E"; // Orange for client errors
    } else if (statusCode >= 500 && statusCode <= 599) {
      return "#FF0000"; // Red for server errors
    } else {
      return "#FFFFFF"; // Default white for other cases
    }
  };

  useEffect(() => {
    if (!flowYdoc) return;
    const runMap = flowYdoc?.getMap<any>("run");

    const runFlow = () => {
      let runData = runMap?.toJSON();

      if (runData.run.status === "RUNNING") {
        let updateRun = runData?.run?.run_result;
        setRunResult(updateRun);
      }
    };

    runMap.observe(runFlow);

    return () => {
      runMap.unobserve(runFlow);
    };
  }, [flowYdoc]);

  return (
    <>
      {openDrawer && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            background: "rgba(18, 18, 18, 0.5)",
            backdropFilter: "blur(3px)",
            bottom: 0,
            left: 0,
            overflow: "auto",
            zIndex: 1000,
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <ResizableBox
            width={undefined}
            height={height}
            minConstraints={[10, 10]}
            maxConstraints={[Infinity, 600]}
            onResize={handleResize}
            axis="y"
            resizeHandles={["n"]}
            style={{
              bottom: 0,
              left: 0,
              width: "100%",
              overflow: "auto",
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.15)",
                  height: "auto",
                  padding: {
                    xs: "0px 10px",
                    sm: "0px 10px",
                    md: "0px 10px",
                    lg: "0px 10px",
                    xl: "5px 10px",
                  },
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {drawerBtnVal?.map((item: any) => (
                  <GButton
                    label={item.name}
                    background={
                      selectedBtn === item?.name ? "#7A43FE" : "transparent"
                    }
                    color={selectedBtn === item?.name ? "#EEEEEE" : "#FFFFFF"}
                    border="1px solid"
                    borderColor={
                      selectedBtn === item?.name
                        ? "#7A43FE"
                        : "rgba(255, 255, 255, 0.25)"
                    }
                    radius="8px"
                    padding="3px 10px"
                    marginRight="15px"
                    fontSize={{
                      xs: "10px",
                      sm: "10px",
                      md: "14px",
                      lg: "14px",
                      xl: "15px",
                    }}
                    onClickHandler={() => handleBtnClick(item?.name)}
                  />
                ))}
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "10px",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    zIndex: 1001,
                  }}
                  onClick={handleClose}
                >
                  <CloseOutlinedIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
              </Box>

              {/* Loader */}
              {compiling && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <GlobalCircularLoader open={compiling} />
                </div>
              )}

              <>
                {/* {value === 0 ? ( */}
                {selectedBtn === "Run Results" ? (
                  <Box
                    sx={{
                      background: "transparent",
                      height: "100%",
                      overflowY: "auto",
                      maxHeight: "500px",
                      padding: "0px 20px",
                    }}
                  >
                    {errors?.length > 0 ? (
                      <>
                        {errors?.map((x: string) => (
                          <TeritaryTextTypography
                            key={x}
                            style={{
                              marginTop: "5px",
                              fontSize: "0.7rem",
                              color: "#FF0000",
                            }}
                          >
                            {x}
                          </TeritaryTextTypography>
                        ))}
                      </>
                    ) : runResult?.length <= 0 ? (
                      <TeritaryTextTypography
                        style={{
                          top: "50%",
                          left: "40%",
                          position: "absolute",
                          color: "gray",
                        }}
                      >
                        No data found
                      </TeritaryTextTypography>
                    ) : (
                      runResult.map((result: any, index: any) => (
                        <Accordion
                          key={index}
                          disableGutters
                          sx={{
                            background: "transparent",
                            boxShadow: "none",
                            padding: 0,
                            margin: 0,
                            borderBottom: "0.5px solid #FFFFFF",
                            "&:last-of-type": { borderBottom: "none" },
                          }}
                        >
                          <CustomizedAccSummary
                            expandIcon={
                              <ArrowForwardIosRounded
                                style={{
                                  fontSize: "15px",
                                  color: "#FFFFFF",
                                  fontFamily: "Firasans-medium",
                                }}
                              />
                            }
                            style={{ padding: 0 }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                padding: "10px",
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <SecondaryTypography
                                  sx={{
                                    color: getMethodColor(
                                      result?.serviceInput?.request?.method
                                    ),
                                  }}
                                >
                                  {result?.serviceInput?.request?.method}
                                </SecondaryTypography>
                                <SecondaryTypography
                                  sx={{
                                    marginLeft: "5px",
                                    color: `#FFFFFF`,
                                  }}
                                >
                                  {result?.serviceInput?.request?.url}
                                </SecondaryTypography>
                                <SecondaryTypography
                                  sx={{
                                    color: getMessageColor(result.status),
                                    marginLeft: "15px",
                                  }}
                                >
                                  {result.status}
                                </SecondaryTypography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <SecondaryTypography
                                  sx={{
                                    color: getStatusCodeColor(
                                      result.statusCode
                                    ),
                                  }}
                                >
                                  {result.statusCode}
                                </SecondaryTypography>
                                <SecondaryTypography
                                  sx={{
                                    marginLeft: "10px",
                                    color: getStatusColor(
                                      result.request_status
                                    ),
                                  }}
                                >
                                  {result.request_status}
                                </SecondaryTypography>
                              </Box>
                            </Box>
                          </CustomizedAccSummary>
                          <AccordionDetails
                            sx={{ margin: 0, padding: "0px 5px" }}
                          >
                            <Box sx={{}}>
                              <div>
                                <JsonViewer data={result?.response} />
                                <JsonViewer data={result?.serviceInput} />
                              </div>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    )}
                  </Box>
                ) : (
                  ""
                )}
              </>
            </Box>
          </ResizableBox>
        </Box>
      )}
    </>
  );
}
