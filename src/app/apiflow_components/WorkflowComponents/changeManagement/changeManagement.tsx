import { Box, Drawer, Grid, Tab, Tabs } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GlobalCircularLoader from "../../../Components/Global/GlobalCircularLoader";
import {
  PrimaryTypography,
  SecondaryTypography,
} from "../../../Styles/signInUp";
import theme from "../../../../Theme/theme";
import React, { useEffect, useRef, useState } from "react";
import {
  FlowReducer,
  GetNodeChangesTrackingOffset,
} from "../../../Redux/apiManagement/flowReducer";
import { RootStateType } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  TimelineConnector,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReactJsonViewCompare from "react-json-view-compare";
import {
  calculateDaysAgo,
  dateTimeFormat,
  getCookies,
} from "../../../Helpers/helpersFunctions";

export const ChangeNodeManage = (props: any) => {
  const {
    node_id,
    changeManClicked,
    setChangeManClicked,
    node_name,
    changeManResponse,
    project_id,
    flow_id,
  } = props;

  const dispatch = useDispatch<any>();

  const { nodeChangeManFlowNodeLoading, getRevisionLoading, revisionData } =
    useSelector<RootStateType, FlowReducer>(
      (state) => state.apiManagement.apiFlowDesign
    );

  const containerRef = useRef<any>(null);

  const flowIdVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_FLOWID ?? "");
  const versionId = getCookies(
    process.env.NEXT_PUBLIC_COOKIE_VERSIONVALUE ?? ""
  );

  const [tabValue, setTabValue] = useState(0);
  const [trackingRes, setTrackingRes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(7);
  const [compareResponse, setCompareResponse] = useState({});
  const [currentId, setCurrentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        setCurrentPage((prevPage) => prevPage + 8);
      }
    }
  };

  const formatWithLineNumbers = (text: string) => {
    return (text ?? "")
      .split("\n")
      .map((line: string, index: number) => `${index + 1}. ${line}`)
      .join("\n");
  };

  const parsedInput =
    typeof changeManResponse?.serviceInput === "string"
      ? JSON.parse(changeManResponse?.serviceInput)
      : changeManResponse?.serviceInput;

  const parsedOutput =
    typeof changeManResponse?.serviceOutput === "string"
      ? JSON.parse(changeManResponse?.serviceOutput)
      : changeManResponse?.serviceOutput;

  const currentJson: any = {
    service_input: parsedInput,
    service_output: parsedOutput,
    status_code: changeManResponse?.statusCode,
  };

  // ?.filter((val: any) => val?.created_date === selectedDate)
  // ?.find((val: any) => val?.created_date === "2024-08-16T17:48:10.203")
  // ?.map((item: any) => item?.properties)

  const fetchPageData = async (page: number) => {
    let requestData = {
      flow_id: flow_id,
      project_id: project_id,
      // flow_id: "6c990d814bc04f9f8be794bea0061bfc",
      node_id: node_id,
      version_id: versionId,
      // version_id: "e2cce2cd927448efac120298a0a5f9ae",
      offset: 0,
      limit: page,
      sort_order: "asc",
      sort_by: "created_date",
    };

    // if (requestData?.flow_id?.trim() && requestData?.version_id?.trim()) {
    dispatch(GetNodeChangesTrackingOffset(requestData))
      .unwrap()
      .then((revisionRes: any) => {
        console.log("revisionRes: ", revisionRes);
        setTrackingRes(revisionRes);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
    // }
  };

  function revisionHandler(id: string) {
    console.log("REvisionId:", id);
    let currentResponse = trackingRes?.find((x) => x.created_date == id);
    let changeJson = JSON.parse(currentResponse?.properties || "{}");
    console.log("trackJson:", changeJson);
    const parsedInputCom =
      typeof changeJson?.service_input === "string"
        ? JSON.parse(changeJson?.service_input)
        : changeJson?.service_input;

    const parsedOutputCom =
      typeof changeJson?.service_output === "string"
        ? JSON.parse(changeJson?.service_output)
        : changeJson?.service_output;

    const trackJson: any = {
      service_input: parsedInputCom,
      service_output: parsedOutputCom,
      status_code: changeManResponse?.statusCode,
    };

    console.log("trackJson:", trackJson);
    setCompareResponse(trackJson);
    setCurrentId(id);
  }

  const getValueOrDefault = (value: any) => {
    // Check if value is null, "null", or undefined
    const checkValue =
      value === null || value === "null" || value === undefined ? "-" : value;
    console.log("checkValue: ", checkValue);
    return checkValue; // Ensure the returned value is always a string
  };

  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage]);

  return (
    <div>
      <Drawer
        anchor="right"
        open={changeManClicked}
        onClose={() => {
          setChangeManClicked(false);
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%", // Full width
            maxWidth: "80vw", // Ensure it doesn't exceed viewport width
            height: "100%", // Full height
            background: "#121212",
          },
        }}
      >
        <Box className="p-2 px-3">
          {changeManClicked && changeManResponse?.length <= 0 && (
            <GlobalCircularLoader open={nodeChangeManFlowNodeLoading} />
          )}
          <div
            style={{ margin: "1rem 0rem" }}
            onClick={() => {
              setChangeManClicked(false);
            }}
          >
            <ArrowBackIosIcon
              sx={{
                fontSize: "13px",
                color: "white",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                cursor: "pointer",
                color: "#64748B",
                fontSize: "0.6rem",
                fontFamily: "Inter-regular",
              }}
            >
              Back
            </span>
          </div>
          <div>
            <PrimaryTypography
              sx={{ color: "white", fontSize: "15px" }}
              className="mt-2"
            >
              Change Management:{" "}
              <span
                style={{
                  fontWeight: 800,
                  color: `${theme.palette.primaryPurple.main}`,
                }}
              >
                {node_name}
              </span>
            </PrimaryTypography>
            <PrimaryTypography
              style={{
                color: `${theme.palette.teritiaryColor.main}`,
                margin: "7px",
                fontSize: "12px",
              }}
            >
              This section provides the change management details for the node:{" "}
              <span
                style={{
                  fontWeight: 800,
                }}
              >
                {node_name}
              </span>
              , with a status of{" "}
              <span
                style={{
                  color:
                    changeManResponse?.status === "SUCCESS"
                      ? "#48C9B0"
                      : changeManResponse?.status === "FAILED"
                      ? " #FF5252"
                      : "",
                }}
              >
                {changeManResponse?.status}
              </span>{" "}
              and a status code of{" "}
              <span
                style={{
                  color:
                    changeManResponse?.statusCode >= 100 &&
                    changeManResponse?.statusCode <= 199
                      ? `${theme.palette.primaryBlue.main}`
                      : changeManResponse?.statusCode >= 200 &&
                        changeManResponse?.statusCode <= 299
                      ? `#16A34A`
                      : changeManResponse?.statusCode >= 300 &&
                        changeManResponse?.statusCode <= 399
                      ? `#D8A805`
                      : `${theme.palette.mainRed.main}`,
                  //   : "",
                  fontWeight: 800,
                }}
              >
                {changeManResponse?.statusCode}
              </span>
              .
            </PrimaryTypography>
          </div>
          <Grid container sx={{ height: "320px" }}>
            <Grid
              item
              xs={7}
              // sx={{ borderRight: "1px solid black" }}
            >
              <PrimaryTypography
                style={{
                  marginTop: "10px",
                  fontWeight: 800,
                }}
              >
                Transition Details
              </PrimaryTypography>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                sx={{ textAlign: "center" }}
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="InputOutputTab"
              >
                <Tab
                  label="Input"
                  sx={{
                    fontWeight: "700",
                    color: "white",
                    fontFamily: "Inter-regular",
                    fontSize: "0.8rem",
                  }}
                />
                <Tab
                  label="Output"
                  sx={{
                    fontWeight: "700",
                    color: "white",
                    fontFamily: "Inter-regular",
                    fontSize: "0.8rem",
                  }}
                />
              </Tabs>

              <>
                {tabValue === 0 ? (
                  <Box
                    sx={{
                      height: "220px",
                      overflowY: "auto",
                    }}
                  >
                    <pre style={{ whiteSpace: "pre-wrap", color: "white" }}>
                      {parsedInput
                        ? formatWithLineNumbers(
                            JSON.stringify(parsedInput, null, 2)
                          )
                        : "No data found"}
                    </pre>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "220px",
                      overflowY: "auto",
                    }}
                  >
                    <pre style={{ whiteSpace: "pre-wrap", color: "white" }}>
                      {parsedOutput
                        ? formatWithLineNumbers(
                            JSON.stringify(parsedOutput, null, 2)
                          )
                        : "No data found"}
                    </pre>
                  </Box>
                )}
              </>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                marginLeft: "10px",
              }}
            >
              <PrimaryTypography
                style={{
                  marginTop: "10px",
                  fontWeight: 800,
                }}
              >
                Revision History
              </PrimaryTypography>
              <Box
                sx={{
                  padding: "10px",
                  position: "relative",
                }}
              >
                {revisionData?.length <= 0 && (
                  <GlobalCircularLoader open={getRevisionLoading} />
                )}

                <div>
                  <Box
                    // className='container'
                    ref={containerRef}
                    onScroll={handleScroll}
                    // minHeight={"100px"}
                    height={"430px"}
                    sx={{
                      overflowY: "auto",
                      overflowX: "hidden",
                      padding: "10px",
                    }}
                  >
                    <div>
                      {trackingRes?.length > 0 ? (
                        trackingRes?.map((val: any, index: any) => (
                          <div id="scrollContainer" key={index}>
                            <Timeline
                              sx={{
                                [`& .${timelineItemClasses.root}:before`]: {
                                  flex: 0,
                                  padding: 0,
                                },
                                marginBottom: "-10px",
                              }}
                            >
                              <TimelineItem>
                                <TimelineSeparator>
                                  <TimelineDot
                                    color={
                                      val.created_date === currentId
                                        ? "secondary"
                                        : "primary"
                                    }
                                  />
                                  <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    revisionHandler(val.created_date);
                                  }}
                                >
                                  <div>
                                    <PrimaryTypography
                                      style={{
                                        fontWeight: 800,
                                        color: "white",
                                      }}
                                    >
                                      {getValueOrDefault(
                                        dateTimeFormat(val?.created_date)
                                      )}
                                    </PrimaryTypography>
                                    <SecondaryTypography
                                      style={{
                                        color: `${theme.palette.teritiaryColor.main}`,
                                      }}
                                    >
                                      <span style={{ marginRight: "5px" }}>
                                        <AccountCircleIcon
                                          style={{
                                            fontSize: "15px",
                                            marginBottom: "2px",
                                          }}
                                        />
                                      </span>
                                      {/* {getValueOrDefault(
                                        capitalizeFirstLetter(val?.createdBy)
                                      )} */}
                                    </SecondaryTypography>
                                    <SecondaryTypography
                                      style={{
                                        color: `${theme.palette.teritiaryColor.main}`,
                                      }}
                                    >
                                      {calculateDaysAgo(val?.created_date)}
                                    </SecondaryTypography>
                                  </div>
                                </TimelineContent>
                              </TimelineItem>
                            </Timeline>
                          </div>
                        ))
                      ) : (
                        <div>
                          <PrimaryTypography
                            style={{
                              alignItems: "center",
                              textAlign: "center",
                              position: "absolute",
                              top: "30%",
                              left: "30%",
                              transform: "translate(-30%, -30%)",
                              color: `${theme.palette.teritiaryColor.main}`,
                              fontWeight: 900,
                            }}
                          >
                            {" "}
                            No data found
                          </PrimaryTypography>
                        </div>
                      )}
                    </div>
                  </Box>
                </div>
              </Box>
            </Grid>
          </Grid>
          {/* <Box>
              <Divider />
            </Box> */}
          <Box>
            <PrimaryTypography
              style={{
                marginTop: "10px",
                fontWeight: 800,
              }}
            >
              Comparison View
            </PrimaryTypography>

            <Box>
              <ReactJsonViewCompare
                oldData={compareResponse}
                // oldData={(oldJson)}
                newData={currentJson}
              />
            </Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};
