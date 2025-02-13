import React, { useEffect, useRef, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Drawer,
  FormControl,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import InsightsIcon from "@mui/icons-material/Insights";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondaryTypography,
} from "../../Styles/signInUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  BackgroundUrlList,
  GetAllSenseDataKeyInOperByOperId,
  GetAllStandardsKeyInOperByOperId,
  GetApiStatus,
  GetApiStatusByOpperationId,
  GetOperationById,
  LogStashOffsetFromClickhouse,
  SensitiveOffsetClickHouse,
  projectReducer,
} from "../../Redux/apiManagement/projectReducer";
import { dateFormat, getCookies } from "../../Helpers/helpersFunctions";
import { RootStateType } from "../../Redux/store";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import GlobalCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import InfoIcon from "@mui/icons-material/Info";
import { paginator } from "../global/paginator";
import BackgroundUrlsAccordion from "./BackgroundTable";

import GSelect from "../sign/discovery/GSelect";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import SensitiveTable from "./SensitiveTable";
import StandardsTable from "./StandardsTable";
import JsonComparisonList from "./changeHistoryBackground";
import { GetBackgroundChangeTracking } from "@/app/Redux/apiManagement/endpointReducer";

const StyledTableCell = styled(TableCell)(({ theme: any }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E8E8E8",
    color: "#ffffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const ApiInsights = (props: any) => {
  const { currentOperation, backgroundUrlData } = props;

  const containerRef = useRef<any>(null);
  const theme = useTheme();

  const dispatch = useDispatch<any>();

  const operIdVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "");

  const { loading, loadingValue } = useSelector<RootStateType, projectReducer>(
    (state) => state.apiManagement.projects
  );

  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [keyOperationData, setKeyOperationData] = useState<any[]>([]);
  const countTableVal = Math.ceil(keyOperationData?.length / 5);
  const [page2, setPage2] = React.useState<number>(1);
  const [openRows, setOpenRows] = useState<any>({});
  const [backgroundDetails, setBackgroundDetails] = useState<any>({});
  const [drawerHistory, setDrawerHistory] = useState(false);

  const [publicPrivateClicked, setPublicPrivateClicked] = useState(false);
  const [sensLogsClicked, setSensLogsClicked] = useState(false);
  const [orphanLogClicked, setOrphanLogClicked] = useState(false);

  const [filterStatusVal, setFilterStatusVal] = useState("All");
  const [filterSensLogVal, setFilterSensLogVal] = useState("All");
  const [filterOrphanLogVal, setFilterOrphanLogVal] = useState("All");

  const [operationDetails, setOperationDetails] = useState<any[]>([]);
  const [apiStatusCount, setApiStatusCount] = useState<number>(0);
  const [logsDates, setLogsDates] = useState<any[]>([]);

  const [apiStatusResut, setApiStatusResult] = useState<any[]>([]);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(7);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sensLogResult, setSensLogResult] = useState<any[]>([]);
  const [sensLogDates, setSensLogDates] = useState<any[]>([]);

  const [orphanLogDates, setOrphanLogDates] = useState<any[]>([]);
  const [orphanLogResult, setOrphanLogResult] = useState<any[]>([]);
  const [standardsData, setStandardsData] = useState<any[]>([]);

  const [statusValues, setStatusValues] = useState(["PUBLIC", "PRIVATE"]);
  const [operationTypes, setOperationTypes] = useState([
    "INPUT",
    "HEADERS",
    "AUTHORIZATION",
    "QUERY_PARAMETER",
  ]);
  const [sensitivityTypes, setSensitivityTypes] = useState([
    "LOW_SENSITIVITY",
    "MEDIUM_SENSITIVITY",
    "HIGH_SENSITIVITY",
  ]);
  const [statusCodes, setStatusCodes] = useState([
    "100",
    "200",
    "300",
    "400",
    "500",
  ]);

  const [loadingState, setLoadingState] = useState(false);

  const [filteredVal, setFilteredVal] = useState(
    filterStatusVal === "ApiStatus"
      ? statusValues?.[0]
      : filterStatusVal === "DateTime"
      ? logsDates?.[0]
      : ""
  );

  const [filteredSensVal, setFilteredSensVal] = useState(
    filterSensLogVal === "OperationType"
      ? operationTypes?.[0]
      : filterSensLogVal === "DateTime"
      ? sensLogDates?.[0]
      : filterSensLogVal === "SensitivityLevel"
      ? sensitivityTypes?.[0]
      : ""
  );

  const [filteredOrphanVal, setFilteredOrphanVal] = useState(
    filterOrphanLogVal === "StatusCode"
      ? statusCodes?.[0]
      : filterOrphanLogVal === "DateTime"
      ? orphanLogDates?.[0]
      : ""
  );

  //functions
  const capitalizeFirstLetter = (word: any) => {
    if (!word) return "-";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const toggleRow = (rowIndex: any) => {
    setOpenRows((prevOpenRows: any) => ({
      ...prevOpenRows,
      [rowIndex]: !prevOpenRows[rowIndex],
    }));
  };

  const handleChangeTable = (event: any, value: any) => {
    setPage2(paginator(keyOperationData, value, 5).page);
  };

  const popupStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: isPopupOpen ? 0 : "100%",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    transition: "left 0.3s ease",
    zIndex: 999,
    marginLeft: "14rem",
    background: "1px 0 6px 0px #333232",
  };

  const contentStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    transition: "left 0.3s ease",
    padding: "0.1rem 2rem",
    overflow: "auto",
    left: isPopupOpen ? 0 : "100%",
    maxHeight: "auto",
    overflowY: "auto",
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const filteredData = apiStatusResut?.filter((filterVal: any) => {
    if (filterStatusVal === "All") {
      return true;
    } else {
      if (filteredVal === "PUBLIC" || filteredVal === "PRIVATE") {
        return filterVal?.operation_status === filteredVal;
      } else {
        return filterVal?.dateTime === filteredVal;
      }
    }
  });

  const filteredSensLogData = sensLogResult?.filter((filterVal: any) => {
    if (filterSensLogVal === "All") {
      return true;
    } else {
      if (operationTypes?.includes(filteredSensVal)) {
        return filterVal?.operation_type === filteredSensVal;
      } else if (sensitivityTypes?.includes(filteredSensVal)) {
        return filterVal?.sensitivity_level === filteredSensVal;
      } else {
        return filterVal?.created_at === filteredSensVal;
      }
    }
  });

  const filteredOrphanData = orphanLogResult?.filter((filterVal: any) => {
    if (filterOrphanLogVal === "All") {
      return true;
    } else {
      if (statusCodes?.includes(filteredOrphanVal)) {
        return filterVal?.response_status === filteredOrphanVal;
      } else {
        return filterVal?.timestamp === filteredOrphanVal;
      }
    }
  });

  const handleSensitivityLogs = () => {
    setSensLogsClicked(true);
    fetchSensLogsData(currentPage);
  };

  const handlePublicLogs = () => {
    setLoadingState(true);
    setPublicPrivateClicked(true);
    setLoadingState(false);
    fetchPageData(currentPage);
  };

  const handleOprphanLogs = () => {
    setOrphanLogClicked(true);
    fetchOrphanLogsData(currentPage);
  };

  const fetchPageData = async (page: number) => {
    let requestData = {
      operation_id: operIdVal,

      offsetStart: 0,
      offsetEnd: page,
      fieldName: "",
      fieldValue: "",
    };

    dispatch(GetApiStatus(requestData))
      .unwrap()
      .then((apiStatusRes: any) => {
        const apiResultValues = apiStatusRes?.result;

        setApiStatusResult(apiResultValues);
        const filteringOnlyDates = apiResultValues?.map(
          (obj: any) => obj?.dateTime
        );
        setLogsDates(filteringOnlyDates);
      })
      .catch((error: any) => {});
  };

  const fetchSensLogsData = async (page: number) => {
    let requestDataSensLogs = {
      operation_id: operIdVal,

      offsetStart: 0,
      offsetEnd: page,
      fieldName: "",
      fieldValue: "",
      useWildcard: false,
    };

    dispatch(SensitiveOffsetClickHouse(requestDataSensLogs))
      .unwrap()
      .then((sensLogRes: any) => {
        const sensLogResultValues = sensLogRes?.result;
        setSensLogResult(sensLogResultValues);
        const filteringSensLogDates = sensLogResultValues?.map(
          (obj: any) => obj?.created_at
        );
        setSensLogDates(filteringSensLogDates);
      })
      .catch((error: any) => {});
  };

  const fetchOrphanLogsData = (page: number) => {
    let requestOrphanData = {
      operationId: operIdVal,

      offset: 0,
      limit: page,
      searchField: "",
      searchValue: "",
      sortBy: "asc",
      sortField: "",
    };

    dispatch(LogStashOffsetFromClickhouse(requestOrphanData))
      .unwrap()
      .then((orphanRes: any) => {
        const orphanLogResultValues = orphanRes?.result;
        setOrphanLogResult(orphanLogResultValues);
        const filteringOrphanLogDates = orphanLogResultValues?.map(
          (obj: any) => obj?.timestamp
        );
        setOrphanLogDates(filteringOrphanLogDates);
      })
      .catch((error: any) => {});
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        setCurrentPage((prevPage) => prevPage + 8);
      }
    }
  };

  const getValueOrDefault = (value: any) => {
    // Check if value is null, "null", or undefined
    const checkValue =
      value === null || value === "null" || value === undefined ? "-" : value;

    return checkValue; // Ensure the returned value is always a string
  };

  function getInsights(operation_id: string) {
    dispatch(
      GetAllSenseDataKeyInOperByOperId({
        project_id: currentEnvironment,
        operation_id: operation_id,
      })
    )
      .unwrap()
      .then((sensitiveDataRes: any) => {
        setKeyOperationData(sensitiveDataRes);
      })
      .catch((error: any) => {});

    dispatch(
      GetAllStandardsKeyInOperByOperId({
        project_id: currentEnvironment,
        operation_id: operation_id,
      })
    )
      .unwrap()
      .then((sensitiveDataRes: any) => {
        setStandardsData(sensitiveDataRes);
      })
      .catch((error: any) => {});
  }

  useEffect(() => {
    setFilteredSensVal(
      filterSensLogVal === "OperationType"
        ? operationTypes?.[0]
        : filterSensLogVal === "DateTime"
        ? sensLogDates?.[0]
        : filterSensLogVal === "SensitivityLevel"
        ? sensitivityTypes?.[0]
        : ""
    );
  }, [filterSensLogVal]);

  useEffect(() => {
    setFilteredVal(
      filterStatusVal === "ApiStatus"
        ? statusValues?.[0]
        : filterStatusVal === "DateTime"
        ? logsDates?.[0]
        : ""
    );
  }, [filterStatusVal]);

  useEffect(() => {
    setFilteredOrphanVal(
      filterOrphanLogVal === "StatusCode"
        ? statusCodes?.[0]
        : filterOrphanLogVal === "DateTime"
        ? orphanLogDates?.[0]
        : ""
    );
  }, [filterOrphanLogVal]);

  useEffect(() => {
    if (publicPrivateClicked) {
      fetchPageData(currentPage);
    }
    if (sensLogsClicked) {
      fetchSensLogsData(currentPage);
    }
    if (orphanLogClicked) {
      fetchOrphanLogsData(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (publicPrivateClicked) {
      fetchPageData(currentPage);
    }
    if (sensLogsClicked) {
      fetchSensLogsData(currentPage);
    }
    if (orphanLogClicked) {
      fetchOrphanLogsData(currentPage);
    }
  }, []);

  useEffect(() => {
    let requestData = {
      operation_id: operIdVal,
      offsetStart: startVal,
      offsetEnd: endVal,
      fieldName: "",
      fieldValue: "",
    };

    dispatch(GetApiStatus(requestData))
      .unwrap()
      .then((apiStatus: any) => {
        setApiStatusCount(apiStatus?.count);
      })
      .catch((error: any) => {});
  }, []);

  return (
    <Box>
      <div>
        <Button
          variant="contained"
          startIcon={
            <InfoIcon
              style={{
                fontSize: "16px",
                color: `${theme.palette.textTertiaryColor.main}`,
                fontWeight: 900,
              }}
            />
          }
          style={{
            textTransform: "none",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "15px 20px",
            width: "100%",
            height: "40px",
            background: "rgba(121, 70, 253, 0.1)",
            border: `1.5px solid ${theme.palette.navigationTabColor.main}`,
            borderRadius: "10px",
            flex: "none",
            order: 1,
            flexGrow: 0,
            marginLeft: "30px",
          }}
          onClick={() => {
            togglePopup();
            getInsights(currentOperation?.operationId);
          }}
        >
          <SecondaryTypography
            style={{
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            Insights
          </SecondaryTypography>
        </Button>
      </div>
      {/* drawer code */}
      <Backdrop open={isPopupOpen} sx={{ zIndex: "99" }}>
        <div style={popupStyles} onClick={togglePopup}>
          <div
            style={{
              ...contentStyles,
              background: theme.palette.apiInsightsBackgroundColor.main,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div onClick={closePopup}>
              <div style={{ margin: "1rem 0rem" }}>
                <ArrowBackIosIcon
                  sx={{
                    fontSize: "12px",
                    color: `${theme.palette.teritiaryColor.main}`,
                    cursor: "pointer",
                    marginTop: "2px",
                  }}
                />
                <span
                  style={{
                    cursor: "pointer",

                    color: `${theme.palette.teritiaryColor.main}`,
                    fontSize: "12px",
                    fontFamily: "FiraSans-regular",
                  }}
                >
                  Back
                </span>
              </div>
            </div>
            <div>
              <HeadingTypography
                style={{
                  fontSize: "14px",
                }}
              >
                Insights Operation
              </HeadingTypography>
              <SecondaryTypography
                style={{
                  fontSize: "12px",
                  color: `${theme.palette.textSecondaryColor.main}`,
                }}
              >
                Insights from the{" "}
                <span
                  style={{
                    color:
                      currentOperation?.http_method === "GET"
                        ? "green"
                        : currentOperation?.http_method === "POST"
                        ? "#FDA556"
                        : currentOperation?.http_method === "PUT"
                        ? `${theme.palette.primaryBlue.main}`
                        : currentOperation?.http_method === "DELETE"
                        ? `${theme.palette.mainRed.main}`
                        : "",
                    fontWeight: 900,
                  }}
                >
                  {currentOperation?.http_method}
                </span>{" "}
                method of operation{" "}
                <span
                  style={{
                    fontWeight: 900,
                  }}
                >
                  {currentOperation?.name}
                </span>
              </SecondaryTypography>
            </div>
            <div>
              <Box
                width={"80%"}
                sx={{
                  marginTop: "10px",
                  padding: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <Box>
                      <Card
                        square={false}
                        elevation={8}
                        sx={{
                          padding: "8px",
                          background: `${theme.palette.primaryPurple.main}`,
                          width: "180px",
                          height: "80px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.textPrimaryColor.main}`,
                              fontSize: "12px",
                            }}
                          >
                            {/* Operation Type */}
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "15px",
                                  marginRight: "5px",
                                  marginBottom: "3px",
                                }}
                              />
                            </span>
                            Api Status
                          </SecondaryTypography>
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <SecondaryTypography
                                style={{
                                  color: `${theme.palette.textPrimaryColor.main}`,
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                {currentOperation?.private_or_public?.trim() ===
                                ""
                                  ? "NIL"
                                  : currentOperation?.private_or_public}
                              </SecondaryTypography>
                            </div>
                            <div>
                              {/* <Tooltip
                                arrow
                                title={`Click here to see the Public Logs`}
                              >
                                <ArrowCircleRightOutlinedIcon
                                  style={{
                                    color: `${theme.palette.textPrimaryColor.main}`,
                                    cursor: "pointer",
                                    fontSize: "15px",
                                  }}
                                  onClick={handlePublicLogs}
                                />
                              </Tooltip> */}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Box>
                  </div>

                  <div>
                    <Box>
                      <Card
                        square={false}
                        elevation={8}
                        sx={{
                          padding: "8px",
                          background: `${theme.palette.primaryPurple.main}`,
                          width: "180px",
                          height: "80px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.textPrimaryColor.main}`,
                              fontSize: "12px",
                            }}
                          >
                            {/* Operation Type */}
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "15px",
                                  marginRight: "5px",
                                  marginBottom: "3px",
                                }}
                              />
                            </span>
                            Location Type -{currentOperation?.location_type}
                          </SecondaryTypography>
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <SecondaryTypography
                                style={{
                                  color: `${theme.palette.textPrimaryColor.main}`,
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                Location -{currentOperation?.location}
                              </SecondaryTypography>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Box>
                  </div>
                  <div>
                    <Box>
                      <Card
                        square={false}
                        elevation={8}
                        sx={{
                          padding: "8px",
                          background: `${theme.palette.primaryPurple.main}`,
                          width: "180px",
                          height: "80px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.textPrimaryColor.main}`,
                            }}
                          >
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "15px",
                                  marginRight: "5px",
                                  marginBottom: "3px",
                                }}
                              />
                            </span>
                            Category
                          </SecondaryTypography>
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                          }}
                        >
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.textPrimaryColor.main}`,
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {currentOperation?.sector?.trim() === ""
                              ? "NIL"
                              : capitalizeFirstLetter(currentOperation?.sector)}
                          </SecondaryTypography>
                        </div>
                      </Card>
                    </Box>
                  </div>
                  <div>
                    <Box>
                      <Card
                        square={false}
                        elevation={8}
                        sx={{
                          padding: "8px",
                          background: `${theme.palette.primaryPurple.main}`,
                          width: "180px",
                          height: "80px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.textPrimaryColor.main}`,
                              fontSize: "12px",
                            }}
                          >
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "15px",
                                  marginRight: "5px",
                                  marginBottom: "3px",
                                }}
                              />
                            </span>
                            Api Logs
                          </SecondaryTypography>
                        </div>
                        <div
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <SecondaryTypography
                                style={{
                                  color: `${theme.palette.textPrimaryColor.main}`,
                                  fontSize: "12px",
                                  fontWeight: 600,
                                }}
                              >
                                {currentOperation?.orphan_status?.trim() ===
                                  "" || !currentOperation?.orphan_status
                                  ? "NIL"
                                  : currentOperation?.orphan_status}
                              </SecondaryTypography>
                            </div>
                            <div>
                              {/* <Tooltip
                                arrow
                                title={`Click here to see the Api Logs`}
                              >
                                <ArrowCircleRightOutlinedIcon
                                  style={{
                                    color: `${theme.palette.mainWhite.main}`,
                                    cursor: "pointer",
                                    fontSize: "15px",
                                  }}
                                  onClick={handleOprphanLogs}
                                />
                              </Tooltip> */}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Box>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <HeadingTypography
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Intent
                  </HeadingTypography>
                  <div>
                    <SecondaryTypography
                      style={{
                        fontSize: "12px",
                        color: `${theme.palette.textSecondaryColor.main}`,
                      }}
                    >
                      {currentOperation?.intent?.trim() === ""
                        ? "NIL"
                        : currentOperation?.intent}
                    </SecondaryTypography>
                  </div>
                </div>

                <div>
                  <HeadingTypography
                    style={{
                      marginTop: "40px",
                      fontSize: "14px",
                    }}
                  >
                    Background Urls
                  </HeadingTypography>
                  <div
                    style={{
                      margin: "30px",
                    }}
                  >
                    <BackgroundUrlsAccordion
                      backgroundUrlData={backgroundUrlData}
                      setBackgroundDetails={(value: any) => {
                        dispatch(
                          GetBackgroundChangeTracking({
                            back_id: value?.id,
                            operation_id: currentOperation?.operationId,
                            offset: 1,
                            limit: 10,
                          })
                        );

                        setBackgroundDetails(value);
                        setDrawerHistory(true);
                      }}
                    />
                    <JsonComparisonList
                      openDrawer={drawerHistory}
                      setOpenDrawer={setDrawerHistory}
                      backgroundDetails={backgroundDetails}
                    />
                  </div>
                </div>
                <div>
                  <HeadingTypography
                    style={{
                      marginTop: "40px",
                      fontSize: "14px",
                    }}
                  >
                    Sensitive Insights
                  </HeadingTypography>
                  <SensitiveTable data={keyOperationData} />
                </div>

                <div>
                  <HeadingTypography
                    style={{
                      marginTop: "40px",
                      fontSize: "14px",
                    }}
                  >
                    Compliance Checks
                  </HeadingTypography>
                  <StandardsTable data={standardsData} />
                </div>
              </Box>
            </div>
            <div>
              {publicPrivateClicked === true && (
                <div>
                  <Drawer
                    anchor="right"
                    open={publicPrivateClicked}
                    onClose={() => {
                      setPublicPrivateClicked(false);
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        backgroundColor: "#211c27",
                      },
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          width: "500px",
                          padding: "20px",
                          position: "relative",
                        }}
                      >
                        {publicPrivateClicked && filteredData?.length <= 0 && (
                          <GlobalCircularLoader open={loadingValue} />
                        )}

                        <div
                          style={{ margin: "1rem 0rem" }}
                          onClick={() => {
                            setPublicPrivateClicked(false);
                            setCurrentPage(7);
                            setFilterStatusVal("All");

                            setFilteredVal(
                              filterStatusVal === "ApiStatus"
                                ? statusValues?.[0]
                                : filterStatusVal === "DateTime"
                                ? logsDates?.[0]
                                : ""
                            );
                          }}
                        >
                          <ArrowBackIosIcon
                            sx={{
                              fontSize: "8px",
                              color: "white",
                              cursor: "pointer",
                              marginTop: "2px",
                            }}
                          />
                          <span
                            style={{
                              cursor: "pointer",
                              color: "white",
                              fontSize: "8px",
                              fontFamily: "FiraSans-regular",
                            }}
                          >
                            Back to Insights
                          </span>
                        </div>
                        <div>
                          <PrimaryTypography style={{ fontSize: "10px" }}>
                            Transformation History
                          </PrimaryTypography>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.teritiaryColor.main}`,
                              margin: "7px",
                            }}
                          >
                            Here is the transformation details for the operation{" "}
                            <span
                              style={{
                                fontWeight: 900,
                              }}
                            >
                              {operationDetails?.[0]?.name}
                            </span>
                          </SecondaryTypography>
                          <div
                            style={{
                              margin: "20px 0px 10px 0px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <SecondaryTypography
                              style={{
                                color: `${theme.palette.teritiaryColor.main}`,
                              }}
                            >
                              {`Filtering status: `}
                            </SecondaryTypography>
                            <span style={{ marginLeft: "10px" }}>
                              <FormControl
                                variant="standard"
                                sx={{ minWidth: 130 }}
                                size="small"
                              >
                                <GSelect
                                  width="100%"
                                  size={"small"}
                                  options={[
                                    {
                                      label: "All",
                                      value: "All",
                                    },
                                    {
                                      label: "Api Status",
                                      value: "ApiStatus",
                                    },
                                    {
                                      label: "Date and Time",
                                      value: "DateTime",
                                    },
                                  ]}
                                  value={filterStatusVal}
                                  onChange={(value: any) => {
                                    setFilterStatusVal(value);
                                  }}
                                />
                              </FormControl>
                            </span>
                            <>
                              {filterStatusVal !== "All" && (
                                <span style={{ marginLeft: "10px" }}>
                                  <FormControl
                                    variant="standard"
                                    sx={{ minWidth: 130 }}
                                    size="small"
                                  >
                                    <GSelect
                                      width="100%"
                                      size={"small"}
                                      value={filteredVal}
                                      onChange={(value: any) => {
                                        setFilteredVal(value);
                                      }}
                                      options={
                                        filterStatusVal === "ApiStatus"
                                          ? statusValues?.map(
                                              (val: any, index: number) => ({
                                                label:
                                                  capitalizeFirstLetter(val),
                                                value: val,
                                              })
                                            )
                                          : logsDates?.map(
                                              (val: any, index: number) => ({
                                                label: dateFormat(val),
                                                value: val,
                                              })
                                            )
                                      }
                                    />
                                  </FormControl>
                                </span>
                              )}
                            </>
                          </div>
                          <Box
                            ref={containerRef}
                            onScroll={handleScroll}
                            height={"380px"}
                            sx={{
                              overflowY: "auto",
                              padding: "10px",
                            }}
                          >
                            <div>
                              {filteredData?.length > 0 ? (
                                filteredData?.map((val: any, index: number) => (
                                  <div id="scrollContainer">
                                    <pre key={index}>
                                      <SecondaryTypography>
                                        {`${index + 1}. `}

                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 900,
                                            display: "inline",
                                          }}
                                        >
                                          Date and Time:{" "}
                                        </SecondaryTypography>
                                        {getValueOrDefault(
                                          dateFormat(val?.dateTime)
                                        )}
                                      </SecondaryTypography>
                                      <SecondaryTypography>
                                        <span>{"    "}</span>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 900,
                                            display: "inline",
                                          }}
                                        >
                                          Status:{" "}
                                        </SecondaryTypography>
                                        <SecondaryTypography
                                          style={{
                                            display: "inline",
                                            color:
                                              val?.operation_status === "PUBLIC"
                                                ? `${theme.palette.mainGreen.main}`
                                                : val?.operation_status ===
                                                  "PRIVATE"
                                                ? `${theme.palette.mainRed.main}`
                                                : "",
                                          }}
                                        >
                                          {" "}
                                          {getValueOrDefault(
                                            val?.operation_status
                                          )}
                                        </SecondaryTypography>
                                      </SecondaryTypography>
                                    </pre>
                                  </div>
                                ))
                              ) : (
                                <div>
                                  <PrimaryTypography
                                    style={{
                                      alignItems: "center",
                                      textAlign: "center",
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      color: `${theme.palette.teritiaryColor.main}`,
                                      fontWeight: 900,
                                      fontSize: "10px",
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
                    </div>
                  </Drawer>
                </div>
              )}
            </div>
            <div>
              {sensLogsClicked === true && (
                <div>
                  <Drawer
                    anchor="right"
                    open={sensLogsClicked}
                    onClose={() => {
                      setSensLogsClicked(false);
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          width: "500px",
                          padding: "20px",
                          position: "relative",
                        }}
                      >
                        {sensLogsClicked &&
                          filteredSensLogData?.length <= 0 && (
                            <GlobalCircularLoader open={loadingValue} />
                          )}

                        <div
                          style={{ margin: "1rem 0rem" }}
                          onClick={() => {
                            setCurrentPage(7);
                            setSensLogsClicked(false);
                            setFilterSensLogVal("All");
                            setFilteredSensVal(
                              filterSensLogVal === "OperationType"
                                ? operationTypes?.[0]
                                : filterSensLogVal === "DateTime"
                                ? sensLogDates?.[0]
                                : filterSensLogVal === "SensitivityLevel"
                                ? sensitivityTypes?.[0]
                                : ""
                            );
                          }}
                        >
                          <ArrowBackIosIcon
                            sx={{
                              fontSize: "8px",
                              color: "#64748B",
                              cursor: "pointer",
                              marginTop: "2px",
                            }}
                          />
                          <span
                            style={{
                              cursor: "pointer",
                              color: "#64748B",
                              fontSize: "8px",
                              fontFamily: "FiraSans-regular",
                            }}
                          >
                            Back to Sensitive Insights
                          </span>
                        </div>
                        <div>
                          <HeadingTypography style={{ fontSize: "10px" }}>
                            Transformation History
                          </HeadingTypography>
                          <PrimaryTypography
                            style={{
                              color: `${theme.palette.teritiaryColor.main}`,
                              margin: "7px",
                              fontSize: "10px",
                            }}
                          >
                            Here is the transformation details for the operation{" "}
                            <span
                              style={{
                                fontWeight: 900,
                                fontSize: "10px",
                              }}
                            >
                              {operationDetails?.[0]?.name}
                            </span>
                          </PrimaryTypography>
                          <div
                            style={{
                              margin: "20px 0px 10px 0px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <PrimaryTypography
                              style={{
                                color: `${theme.palette.teritiaryColor.main}`,
                                fontSize: "10px",
                              }}
                            >
                              {`Filtering: `}
                            </PrimaryTypography>
                            <span style={{ marginLeft: "10px" }}>
                              <FormControl
                                variant="standard"
                                sx={{ minWidth: 130 }}
                                size="small"
                              >
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={filterSensLogVal}
                                  onChange={(e: SelectChangeEvent) => {
                                    setFilterSensLogVal(
                                      e.target.value as string
                                    );
                                  }}
                                >
                                  <MenuItem value="All">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      All
                                    </PrimaryTypography>
                                  </MenuItem>
                                  <MenuItem value="OperationType">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      Operation Type
                                    </PrimaryTypography>
                                  </MenuItem>
                                  <MenuItem value="DateTime">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      Date and Time
                                    </PrimaryTypography>
                                  </MenuItem>
                                  <MenuItem value="SensitivityLevel">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      Sensitivity Level
                                    </PrimaryTypography>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </span>
                            <>
                              {filterSensLogVal !== "All" && (
                                <span style={{ marginLeft: "10px" }}>
                                  <FormControl
                                    variant="standard"
                                    sx={{ minWidth: 130 }}
                                    size="small"
                                  >
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={filteredSensVal}
                                      onChange={(e: SelectChangeEvent) => {
                                        setFilteredSensVal(
                                          e.target.value as string
                                        );
                                      }}
                                    >
                                      {filterSensLogVal === "OperationType"
                                        ? operationTypes?.map(
                                            (val: any, index: number) => (
                                              <MenuItem key={index} value={val}>
                                                <PrimaryTypography
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  {capitalizeFirstLetter(val)}
                                                </PrimaryTypography>
                                              </MenuItem>
                                            )
                                          )
                                        : filterSensLogVal ===
                                          "SensitivityLevel"
                                        ? sensitivityTypes?.map(
                                            (val: any, index: number) => (
                                              <MenuItem key={index} value={val}>
                                                <PrimaryTypography
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  {capitalizeFirstLetter(val)}
                                                </PrimaryTypography>
                                              </MenuItem>
                                            )
                                          )
                                        : sensLogDates?.map(
                                            (val: any, index: number) => (
                                              <MenuItem key={index} value={val}>
                                                <PrimaryTypography
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  {dateFormat(val)}
                                                </PrimaryTypography>
                                              </MenuItem>
                                            )
                                          )}
                                    </Select>
                                  </FormControl>
                                </span>
                              )}
                            </>
                          </div>
                          <Box
                            ref={containerRef}
                            onScroll={handleScroll}
                            height={"380px"}
                            sx={{
                              overflowY: "auto",
                              padding: "10px",
                            }}
                          >
                            <div>
                              {filteredSensLogData?.length > 0 ? (
                                filteredSensLogData?.map(
                                  (val: any, index: number) => (
                                    <div id="scrollContainer">
                                      <pre key={index}>
                                        <SecondaryTypography>
                                          {`${index + 1}. `}
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Name:{" "}
                                          </SecondaryTypography>
                                          {capitalizeFirstLetter(val?.name)}
                                        </SecondaryTypography>
                                        <SecondaryTypography>
                                          <span>{"    "}</span>
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Operation Type:{" "}
                                          </SecondaryTypography>
                                          {capitalizeFirstLetter(
                                            val?.operation_type
                                          )}
                                        </SecondaryTypography>
                                        <SecondaryTypography>
                                          <span>{"    "}</span>
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Sensitivity Level:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
                                            style={{
                                              display: "inline",
                                              color:
                                                val?.sensitivity_level ===
                                                "LOW_SENSITIVITY"
                                                  ? `#00ac46`
                                                  : val?.sensitivity_level ===
                                                    "MEDIUM_SENSITIVITY"
                                                  ? `#fdc500`
                                                  : val?.sensitivity_level ===
                                                    "HIGH_SENSITIVITY"
                                                  ? `#ff4d4d`
                                                  : "",
                                            }}
                                          >
                                            {" "}
                                            {capitalizeFirstLetter(
                                              val?.sensitivity_level
                                            )}
                                          </SecondaryTypography>
                                        </SecondaryTypography>
                                        <SecondaryTypography>
                                          <span>{"    "}</span>
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Date and Time:{" "}
                                          </SecondaryTypography>
                                          {` ${dateFormat(val?.created_at)}`}
                                        </SecondaryTypography>
                                      </pre>
                                    </div>
                                  )
                                )
                              ) : (
                                <div>
                                  <PrimaryTypography
                                    style={{
                                      alignItems: "center",
                                      textAlign: "center",
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      color: `${theme.palette.teritiaryColor.main}`,
                                      fontWeight: 900,
                                      fontSize: "10px",
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
                    </div>
                  </Drawer>
                </div>
              )}
            </div>
            <div>
              {orphanLogClicked === true && (
                <div>
                  <Drawer
                    anchor="right"
                    open={orphanLogClicked}
                    onClose={() => {
                      setOrphanLogClicked(false);
                    }}
                  >
                    <div>
                      <Box
                        sx={{
                          width: "500px",
                          padding: "20px",
                          position: "relative",
                        }}
                      >
                        {orphanLogClicked &&
                          filteredOrphanData?.length <= 0 && (
                            <GlobalCircularLoader
                              // open={orphanLogClicked && filteredOrphanData?.length <= 0}
                              open={loadingValue}
                            />
                          )}

                        <div
                          style={{ margin: "1rem 0rem" }}
                          onClick={() => {
                            setCurrentPage(7);
                            setOrphanLogClicked(false);
                            setFilterOrphanLogVal("All");
                            setFilteredOrphanVal(
                              filterOrphanLogVal === "StatusCode"
                                ? statusCodes?.[0]
                                : filterOrphanLogVal === "DateTime"
                                ? orphanLogDates?.[0]
                                : ""
                            );
                          }}
                        >
                          <ArrowBackIosIcon
                            sx={{
                              fontSize: "8px",
                              color: "#64748B",
                              cursor: "pointer",
                              marginTop: "2px",
                            }}
                          />
                          <span
                            style={{
                              cursor: "pointer",
                              color: "#64748B",
                              fontSize: "8px",
                              fontFamily: "FiraSans-regular",
                            }}
                          >
                            Back to Insights
                          </span>
                        </div>
                        <div>
                          <PrimaryTypography style={{ fontSize: "10px" }}>
                            Api Logs
                          </PrimaryTypography>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.teritiaryColor.main}`,
                              margin: "7px",
                            }}
                          >
                            Here are the details about the orphan operation{" "}
                            <span
                              style={{
                                fontWeight: 900,
                              }}
                            >
                              {operationDetails?.[0]?.name}
                            </span>
                          </SecondaryTypography>
                          <div
                            style={{
                              margin: "20px 0px 10px 0px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <SecondaryTypography
                              style={{
                                color: `${theme.palette.teritiaryColor.main}`,
                              }}
                            >
                              {`Filtering: `}
                            </SecondaryTypography>
                            <span style={{ marginLeft: "10px" }}>
                              <FormControl
                                variant="standard"
                                sx={{ minWidth: 130 }}
                                size="small"
                              >
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={filterOrphanLogVal}
                                  onChange={(e: SelectChangeEvent) => {
                                    setFilterOrphanLogVal(
                                      e.target.value as string
                                    );
                                  }}
                                >
                                  <MenuItem value="All">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      All
                                    </PrimaryTypography>
                                  </MenuItem>
                                  <MenuItem value="StatusCode">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      Status Code
                                    </PrimaryTypography>
                                  </MenuItem>
                                  <MenuItem value="DateTime">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      Date and Time
                                    </PrimaryTypography>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </span>
                            <>
                              {filterOrphanLogVal !== "All" && (
                                <span style={{ marginLeft: "10px" }}>
                                  <FormControl
                                    variant="standard"
                                    sx={{ minWidth: 130 }}
                                    size="small"
                                  >
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={filteredOrphanVal}
                                      onChange={(e: SelectChangeEvent) => {
                                        setFilteredOrphanVal(
                                          e.target.value as string
                                        );
                                      }}
                                    >
                                      {filterOrphanLogVal === "StatusCode"
                                        ? statusCodes?.map(
                                            (val: any, index: number) => (
                                              <MenuItem key={index} value={val}>
                                                <PrimaryTypography
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  {val}
                                                </PrimaryTypography>
                                              </MenuItem>
                                            )
                                          )
                                        : orphanLogDates?.map(
                                            (val: any, index: number) => (
                                              <MenuItem key={index} value={val}>
                                                <PrimaryTypography
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  {dateFormat(val)}
                                                </PrimaryTypography>
                                              </MenuItem>
                                            )
                                          )}
                                    </Select>
                                  </FormControl>
                                </span>
                              )}
                            </>
                          </div>
                          <Box
                            ref={containerRef}
                            onScroll={handleScroll}
                            height={"380px"}
                            sx={{
                              overflowY: "auto",
                              padding: "10px",
                            }}
                          >
                            <div>
                              {filteredOrphanData?.length > 0 ? (
                                filteredOrphanData?.map(
                                  (val: any, index: number) => (
                                    <div id="scrollContainer">
                                      <pre key={index}>
                                        <SecondaryTypography>
                                          {`${index + 1}.  `}

                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Date and Time:
                                          </SecondaryTypography>
                                          {getValueOrDefault(
                                            dateFormat(val?.timestamp)
                                          )}
                                        </SecondaryTypography>
                                        <SecondaryTypography>
                                          <span>{"     "}</span>
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Status Code:{" "}
                                          </SecondaryTypography>
                                          {getValueOrDefault(
                                            val?.response_status
                                          )}
                                        </SecondaryTypography>
                                        <SecondaryTypography>
                                          <span>{"     "}</span>
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 900,
                                              display: "inline",
                                            }}
                                          >
                                            Client IP:{" "}
                                          </SecondaryTypography>
                                          {getValueOrDefault(val?.client_ip)}
                                        </SecondaryTypography>
                                        {val?.cityName?.trim() !== "" ? (
                                          <SecondaryTypography>
                                            <span>{"     "}</span>
                                            <SecondaryTypography
                                              style={{
                                                fontWeight: 900,
                                                display: "inline",
                                              }}
                                            >
                                              City Name:{" "}
                                            </SecondaryTypography>
                                            {getValueOrDefault(val?.cityName)}
                                          </SecondaryTypography>
                                        ) : (
                                          ""
                                        )}
                                        {val?.countryName?.trim() !== "" ? (
                                          <SecondaryTypography>
                                            <span>{"     "}</span>
                                            <SecondaryTypography
                                              style={{
                                                fontWeight: 900,
                                                display: "inline",
                                              }}
                                            >
                                              Country Name:{" "}
                                            </SecondaryTypography>
                                            {getValueOrDefault(
                                              val?.countryName
                                            )}
                                          </SecondaryTypography>
                                        ) : (
                                          ""
                                        )}
                                      </pre>
                                    </div>
                                  )
                                )
                              ) : (
                                <div>
                                  <PrimaryTypography
                                    style={{
                                      alignItems: "center",
                                      textAlign: "center",
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      color: `${theme.palette.teritiaryColor.main}`,
                                      fontWeight: 900,
                                      fontSize: "10px",
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
                    </div>
                  </Drawer>
                </div>
              )}
            </div>
          </div>
        </div>
      </Backdrop>
    </Box>
  );
};

export default ApiInsights;
