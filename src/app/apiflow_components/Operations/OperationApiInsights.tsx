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
import theme from "../../../Theme/theme";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondaryTypography,
} from "../../Styles/signInUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { paginator } from "@/app/apiflow_components/global/GPaginator";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  GetAllSenseDataKeyInOperByOperId,
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
import GCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import InfoIcon from "@mui/icons-material/Info";

const StyledTableCell = styled(TableCell)(({ theme: any }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.btnGrey.main,
    color: theme.palette.mainWhite.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const OperationApiInsights = () => {
  const containerRef = useRef<any>(null);

  const dispatch = useDispatch<any>();
  const theme = useTheme();

  const operIdVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "");

  const { loading, loadingValue } = useSelector<RootStateType, projectReducer>(
    (state) => state.apiManagement.projects
  );

  //useState
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [keyOperationData, setKeyOperationData] = useState<any[]>([]);
  const countTableVal = Math.ceil(keyOperationData?.length / 5);
  const [page2, setPage2] = React.useState<number>(1);
  const [openRows, setOpenRows] = useState<any>({});

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
  };

  const contentStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
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
    const checkValue =
      value === null || value === "null" || value === undefined ? "-" : value;

    return checkValue; // Ensure the returned value is always a string
  };

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
    dispatch(GetOperationById(operIdVal))
      .unwrap()
      .then((operRes: any) => {
        setOperationDetails(operRes);
      })
      .catch((error: any) => {});
  }, [operIdVal]);

  useEffect(() => {
    dispatch(GetAllSenseDataKeyInOperByOperId(operIdVal))
      .unwrap()
      .then((sensitiveDataRes: any) => {
        setKeyOperationData(sensitiveDataRes);
      })
      .catch((error: any) => {});
  }, [dispatch, operIdVal]);

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
    <div>
      <div>
        <Button
          variant="contained"
          startIcon={
            <InfoIcon
              style={{
                fontSize: "16px",
                color: `#ACAAB3`,
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
            border: "1.5px solid #7946FD",
            borderRadius: "10px",
            flex: "none",
            order: 1,
            flexGrow: 0,
            marginLeft: "30px",
          }}
          onClick={togglePopup}
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
              width: "100%",
              height: "100%",
              transition: "left 0.3s ease",
              padding: "0.1rem 2rem",
              overflow: "auto",
              left: isPopupOpen ? 0 : "100%",
              maxHeight: "auto",
              overflowY: "auto",
              background: theme.palette.apiInsightsBackgroundColor.main,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div onClick={closePopup}>
              <div style={{ margin: "1rem 0rem" }}>
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
                    fontFamily: "Inter-regular",
                  }}
                >
                  Back
                </span>
              </div>
            </div>
            <div>
              <HeadingTypography
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                }}
              >
                Insights Operation
              </HeadingTypography>
              <SecondaryTypography>
                Insights from the{" "}
                <span
                  style={{
                    color:
                      operationDetails?.[0]?.http_method === "GET"
                        ? "green"
                        : operationDetails?.[0]?.http_method === "POST"
                        ? "#FDA556"
                        : operationDetails?.[0]?.http_method === "PUT"
                        ? `${theme.palette.primaryBlue.main}`
                        : operationDetails?.[0]?.http_method === "DELETE"
                        ? `${theme.palette.mainRed.main}`
                        : "",
                    fontWeight: 900,
                  }}
                >
                  {operationDetails?.[0]?.http_method}
                </span>{" "}
                method of operation{" "}
                <span
                  style={{
                    fontWeight: 900,
                  }}
                >
                  {operationDetails?.[0]?.name}
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

                          background: `${theme.palette.v2PrimaryColor.main}`,
                          width: "160px",
                          height: "60px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.mainWhite.main}`,
                            }}
                          >
                            {/* Operation Type */}
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "13px",
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
                                  color: `${theme.palette.mainWhite.main}`,
                                  fontWeight: 600,
                                }}
                              >
                                {operationDetails?.[0]?.private_or_public?.trim() ===
                                ""
                                  ? "NIL"
                                  : operationDetails?.[0]?.private_or_public}
                              </SecondaryTypography>
                            </div>
                            <div>
                              <Tooltip
                                arrow
                                title={`Click here to see the Public Logs`}
                              >
                                <ArrowCircleRightOutlinedIcon
                                  style={{
                                    color: `${theme.palette.mainWhite.main}`,
                                    cursor: "pointer",
                                    fontSize: "15px",
                                  }}
                                  onClick={handlePublicLogs}
                                />
                              </Tooltip>
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

                          background: `${theme.palette.v2PrimaryColor.main}`,
                          width: "160px",
                          height: "60px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.mainWhite.main}`,
                            }}
                          >
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "13px",
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
                              color: `${theme.palette.mainWhite.main}`,
                              fontWeight: 600,
                            }}
                          >
                            {operationDetails?.[0]?.sector?.trim() === ""
                              ? "NIL"
                              : capitalizeFirstLetter(
                                  operationDetails?.[0]?.sector
                                )}
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

                          background: `${theme.palette.v2PrimaryColor.main}`,
                          width: "160px",
                          height: "60px",
                        }}
                      >
                        <div>
                          <SecondaryTypography
                            style={{
                              color: `${theme.palette.mainWhite.main}`,
                            }}
                          >
                            <span>
                              <InsightsOutlinedIcon
                                style={{
                                  fontSize: "13px",
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
                                  color: `${theme.palette.mainWhite.main}`,
                                  fontWeight: 600,
                                }}
                              >
                                {operationDetails?.[0]?.orphan_status?.trim() ===
                                  "" || !operationDetails?.[0]?.orphan_status
                                  ? "NIL"
                                  : operationDetails?.[0]?.orphan_status}
                              </SecondaryTypography>
                            </div>
                            <div>
                              <Tooltip
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
                              </Tooltip>
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
                      color: `${theme.palette.teritiaryColor.main}`,
                      fontSize: "10px",
                    }}
                  >
                    Intent
                  </HeadingTypography>
                  <div>
                    <SecondaryTypography>
                      {operationDetails?.[0]?.intent?.trim() === ""
                        ? "NIL"
                        : operationDetails?.[0]?.intent}
                    </SecondaryTypography>
                  </div>
                </div>
                <div>
                  <HeadingTypography
                    style={{
                      marginTop: "40px",
                      color: `${theme.palette.teritiaryColor.main}`,
                      fontSize: "10px",
                    }}
                  >
                    Sensitive Insights
                  </HeadingTypography>
                  {keyOperationData?.length === 0 ? (
                    <>
                      <PrimaryTypography
                        style={{
                          position: "absolute",
                          top: "70%",
                          left: "40%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                          color: `${theme.palette.teritiaryColor.main}`,
                          fontWeight: 900,
                          fontSize: "10px",
                        }}
                      >
                        No Data Found
                      </PrimaryTypography>
                    </>
                  ) : (
                    <div
                      style={{
                        margin: "30px",
                      }}
                    >
                      <TableContainer
                        sx={{ width: "100%" }}
                        component={Paper}
                        elevation={4}
                      >
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <PrimaryTypography style={{ fontSize: "10px" }}>
                                  Sensitive Insights for{" "}
                                  <span>
                                    {operationDetails?.[0]?.name} operation
                                  </span>
                                </PrimaryTypography>
                              </TableCell>
                              <TableCell></TableCell>

                              <TableCell align="right">
                                <Tooltip
                                  arrow
                                  title={`Click here to see the Sensitive Logs`}
                                >
                                  <ArrowCircleRightOutlinedIcon
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "18px",
                                    }}
                                    onClick={handleSensitivityLogs}
                                  />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <StyledTableCell align="left">
                                <PrimaryTypography
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "10px",
                                  }}
                                >
                                  Name
                                </PrimaryTypography>
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                <PrimaryTypography
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "10px",
                                  }}
                                >
                                  Type
                                </PrimaryTypography>
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                <PrimaryTypography
                                  style={{
                                    fontWeight: 900,
                                    fontSize: "10px",
                                  }}
                                >
                                  Sensitivity Level
                                </PrimaryTypography>
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {paginator(keyOperationData, page2, 5)?.data?.map(
                              (tableVal: any, rowIndex: any) => (
                                <React.Fragment key={rowIndex}>
                                  <TableRow
                                    sx={{
                                      height: "20px",
                                    }}
                                    onClick={() => {
                                      toggleRow(rowIndex);
                                    }}
                                  >
                                    <TableCell align="left">
                                      <PrimaryTypography
                                        style={{ fontSize: "10px" }}
                                      >
                                        {capitalizeFirstLetter(tableVal?.name)}
                                      </PrimaryTypography>
                                    </TableCell>
                                    <TableCell align="left">
                                      <PrimaryTypography
                                        style={{ fontSize: "10px" }}
                                      >
                                        {capitalizeFirstLetter(tableVal?.type)}
                                      </PrimaryTypography>
                                    </TableCell>
                                    <TableCell align="left">
                                      {!tableVal?.sensitivity_level ? (
                                        "-"
                                      ) : (
                                        <button
                                          style={{
                                            border: "none",
                                            backgroundColor:
                                              tableVal?.sensitivity_level ===
                                              "HIGH_SENSITIVITY"
                                                ? // ? `#dc0000`
                                                  `#ff4d4d`
                                                : tableVal?.sensitivity_level ===
                                                  "MEDIUM_SENSITIVITY"
                                                ? `#fdc500`
                                                : tableVal?.sensitivity_level ===
                                                  "LOW_SENSITIVITY"
                                                ? `#00ac46`
                                                : "",
                                            padding: "4px 7px",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <PrimaryTypography
                                            style={{
                                              fontSize: "10px",
                                            }}
                                          >
                                            {tableVal?.sensitivity_level}
                                          </PrimaryTypography>
                                        </button>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <Pagination
                        sx={{
                          marginLeft: "300px",
                          marginTop: "20px",
                        }}
                        count={countTableVal}
                        page={page2}
                        onChange={handleChangeTable}
                        color="secondary"
                      />
                    </div>
                  )}
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
                          <GCircularLoader open={loadingValue} />
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
                              fontFamily: "Inter-regular",
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
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={filterStatusVal}
                                  onChange={(e: SelectChangeEvent) => {
                                    setFilterStatusVal(
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
                                  <MenuItem value="ApiStatus">
                                    <PrimaryTypography
                                      style={{ fontSize: "10px" }}
                                    >
                                      Api Status
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
                              {filterStatusVal !== "All" && (
                                <span style={{ marginLeft: "10px" }}>
                                  <FormControl
                                    variant="standard"
                                    sx={{ minWidth: 130 }}
                                    size="small"
                                  >
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={filteredVal}
                                      onChange={(e: SelectChangeEvent) => {
                                        setFilteredVal(
                                          e.target.value as string
                                        );
                                      }}
                                    >
                                      {filterStatusVal === "ApiStatus"
                                        ? statusValues?.map(
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
                                        : logsDates?.map(
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
                            <GCircularLoader open={loadingValue} />
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
                              fontFamily: "Inter-regular",
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
                            <GCircularLoader open={loadingValue} />
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
                              fontFamily: "Inter-regular",
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
                                                  {/* {capitalizeFirstLetter(val)} */}
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
    </div>
  );
};

export default OperationApiInsights;
