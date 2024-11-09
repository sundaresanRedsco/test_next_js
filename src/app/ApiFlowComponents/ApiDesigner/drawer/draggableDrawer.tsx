"use client";

import React, { useEffect, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import GlobalCircularLoader from "../../../Components/Global/GlobalCircularLoader";
import { RootStateType } from "../../../Redux/store";
import { FlowReducer } from "../../../Redux/apiManagement/flowReducer";
import { useSelector } from "react-redux";
import {
  PrimaryTypography,
  SecondaryTypography,
} from "../../../Styles/signInUp";
import { styled } from "@mui/system";
import theme from "../../../../Theme/theme";
import JsonViewer from "../jsonViewer";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    bottom: "5px",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 30,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});

interface StyledTabProps {
  label: React.ReactNode;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ val }: any) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.6rem",
  marginRight: "5px",
  minWidth: 0,
  color: `${theme.palette.teritiaryColor.main}`,
  "&.Mui-selected": {
    color: `${theme.palette.primaryBlack.main}`,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const ScrollableDiv = styled("div")({
  flex: 1,
  padding: "10px",
  background: "white",
  overflowY: "auto", // Enables vertical scrolling
  height: "100%", // Adjust this as needed to set a specific height
  maxHeight: "400px", // Set a max height for the scrollable area
});

const CustomizedAccSummary = styled(AccordionSummary)(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    marginRight: "0",
    marginLeft: "0",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: "10px",
  },
}));

const DraggableDrawer = (props: any) => {
  const {
    containerRef,
    openDrawer,
    setOpenDrawer,
    errors,
    SuccessMessages,
    height,
    setHeight,
    // errorJson,
    // errorMessages
    //  compiling
  } = props;

  // console.log(errorMessages,"errorJsons");
  console.log(SuccessMessages, "SuccessMessages");

  // const NewData =JSON.stringify(errorJson)
  // console.log(NewData,"NewData");

  const { flowYdoc, runSingleNodeData, compiling } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);
  // Default height
  const [runResult, setRunResult] = useState<any>([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleResize = (event: any, { size }: any) => {
    setHeight(size.height);
  };

  const handleClose = () => {
    setOpenDrawer(false); // Hide the drawer when the close button is clicked
  };

  useEffect(() => {
    if (!flowYdoc) return;
    const runMap = flowYdoc?.getMap<any>("run");
    console.log("FlowYDoc: ", flowYdoc, runMap.toJSON(), runMap?.size);

    // const editNodesArry = ydoc.getArray<any>("nodes");

    const runFlow = () => {
      let runData = runMap?.toJSON();
      console.log(runData, "runData");
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

  console.log(runResult, "runResult");
  const containerWidth = containerRef.current
    ? containerRef.current.offsetWidth
    : typeof window !== "undefined" && window.innerWidth;

  return (
    <>
      {openDrawer && (
        <ResizableBox
          width={containerWidth} // Full width of the viewport
          height={height}
          minConstraints={[10, 10]}
          maxConstraints={[Infinity, 600]} // Maximum height for resizing
          onResize={handleResize}
          axis="y" // Allow resizing only vertically
          resizeHandles={["n"]} // Resize handle at the top
          style={{
            position: "absolute", // Fixed positioning
            bottom: 0, // Start from the bottom
            left: 0, // Align to the left side
            width: "100%", // Full width of the viewport
            background: "white", // White background
            overflow: "auto",
            zIndex: 1000, // Ensure the drawer is above other content
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative", // For positioning the close button
            }}
          >
            {/* Drawer Heading */}
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f8f8f8",
                borderBottom: "1px solid #ddd",
              }}
            >
              <PrimaryTypography
                style={{
                  margin: 0,
                  // fontSize: "1rem",
                  fontWeight: "bold",
                  fontFamily: "Inter-Regular",
                }}
              >
                Terminal
              </PrimaryTypography>
            </div>

            <div>
              <Box sx={{ width: "100%" }}>
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Tabs"
                >
                  <StyledTab
                    label={
                      <SecondaryTypography
                        style={{
                          fontWeight: 900,
                          color:
                            value === 0
                              ? `${theme.palette.primaryBlack.main}`
                              : `${theme.palette.teritiaryColor.main}`,
                        }}
                      >
                        ERROR
                      </SecondaryTypography>
                    }
                  />
                  <StyledTab
                    label={
                      <SecondaryTypography
                        style={{
                          fontWeight: 900,
                        }}
                      >
                        CONSOLE
                      </SecondaryTypography>
                    }
                  />

                  <StyledTab
                    label={
                      <SecondaryTypography
                        style={{
                          fontWeight: 900,
                          color:
                            value === 2
                              ? `${theme.palette.primaryBlack.main}`
                              : `${theme.palette.teritiaryColor.main}`,
                        }}
                      >
                        Test Case Result
                      </SecondaryTypography>
                    }
                  />
                  <StyledTab
                    label={
                      <SecondaryTypography
                        style={{
                          fontWeight: 900,
                          color:
                            value === 3
                              ? `${theme.palette.primaryBlack.main}`
                              : `${theme.palette.teritiaryColor.main}`,
                        }}
                      >
                        Security Scan Results
                      </SecondaryTypography>
                    }
                  />
                </StyledTabs>
              </Box>
            </div>

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

            {value === 0 ? (
              <ScrollableDiv>
                {errors &&
                  errors.map((x: string, index: number) => (
                    <SecondaryTypography key={index} style={{ color: "red" }}>
                      {x}
                    </SecondaryTypography>
                  ))}
              </ScrollableDiv>
            ) : (
              <ScrollableDiv>
                {runResult?.length <= 0 ? (
                  <PrimaryTypography
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      padding: "10px 0",
                      marginBottom: "-15px",
                    }}
                  >
                    {SuccessMessages || "No data found"}
                  </PrimaryTypography>
                ) : (
                  <div>
                    {runResult?.map((result: any, index: any) => (
                      <Accordion
                        key={index}
                        disableGutters
                        style={{
                          background: "transparent",
                          boxShadow: "none",
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <CustomizedAccSummary
                          aria-controls={`panel${index}-content`}
                          id={`panel${index}-header`}
                          expandIcon={
                            <ArrowForwardIosSharpIcon
                              style={{
                                fontSize: "10px",
                                marginTop: "10px",
                                fontWeight: 900,
                              }}
                            />
                          }
                          style={{ padding: 0 }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              padding: "10px 0",
                              marginBottom: "-15px",
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <SecondaryTypography
                                  style={{
                                    color:
                                      result?.serviceInput?.request?.method ===
                                      "GET"
                                        ? `${theme.palette.mainGreen.main}`
                                        : result?.serviceInput?.request
                                            ?.method === "POST"
                                        ? "#FDA556"
                                        : result?.serviceInput?.request
                                            ?.method === "PUT"
                                        ? `${theme.palette.primaryBlue.main}`
                                        : result?.serviceInput?.request
                                            ?.method === "DELETE"
                                        ? `${theme.palette.mainRed.main}`
                                        : "",
                                    fontWeight: 900,
                                  }}
                                >
                                  {result?.serviceInput?.request?.method}
                                </SecondaryTypography>
                                <SecondaryTypography
                                  style={{
                                    marginLeft: "10px",
                                    fontWeight: 900,
                                    color: `${theme.palette.teritiaryColor.main}`,
                                  }}
                                >
                                  {result?.serviceInput?.request?.url}
                                </SecondaryTypography>
                                <SecondaryTypography
                                  style={{
                                    color:
                                      result.status === "SUCCESS"
                                        ? "#4CAF50"
                                        : result.status === "FAILED"
                                        ? "#FF5252"
                                        : "",
                                    fontWeight: 900,
                                    marginLeft: "10px",
                                  }}
                                >
                                  {result.status}
                                </SecondaryTypography>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                              }}
                            >
                              <SecondaryTypography
                                style={{
                                  color:
                                    result.statusCode >= 100 &&
                                    result.statusCode <= 199
                                      ? "#0000FF"
                                      : result.statusCode >= 200 &&
                                        result.statusCode <= 299
                                      ? "#16A34A"
                                      : result.statusCode >= 300 &&
                                        result.statusCode <= 399
                                      ? "#D8A805"
                                      : result.statusCode >= 400 &&
                                        result.statusCode <= 499
                                      ? "#FF8C00"
                                      : result.statusCode >= 500 &&
                                        result.statusCode <= 599
                                      ? "#FF0000"
                                      : "",
                                  fontWeight: 900,
                                }}
                              >
                                {result.statusCode}
                              </SecondaryTypography>
                              <SecondaryTypography
                                style={{
                                  marginLeft: "10px",
                                  fontWeight: 900,
                                  color:
                                    result.statusCode >= 100 &&
                                    result.statusCode <= 199
                                      ? "#0000FF"
                                      : result.statusCode >= 200 &&
                                        result.statusCode <= 299
                                      ? "#16A34A"
                                      : result.statusCode >= 300 &&
                                        result.statusCode <= 399
                                      ? "#D8A805"
                                      : result.statusCode >= 400 &&
                                        result.statusCode <= 499
                                      ? "#FF8C00"
                                      : result.statusCode >= 500 &&
                                        result.statusCode <= 599
                                      ? "#FF0000"
                                      : "",
                                }}
                              >
                                {result.request_status}
                              </SecondaryTypography>
                            </div>
                          </div>
                        </CustomizedAccSummary>
                        <AccordionDetails
                          style={{
                            margin: 0,
                            padding: "0px 5px",
                          }}
                        >
                          <div
                            style={{ marginLeft: "20px", marginRight: "20px" }}
                          >
                            <JsonViewer data={result?.response} />
                            <JsonViewer data={result?.serviceInput} />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </div>
                )}
              </ScrollableDiv>
            )}

            {/* Close Button */}
            <IconButton
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "25px",
                height: "25px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001, // Ensure the button is above the drawer
              }}
              onClick={handleClose}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </div>
        </ResizableBox>
      )}
    </>
  );
};

export default DraggableDrawer;
