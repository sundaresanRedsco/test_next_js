import React, { useEffect, useRef, useState } from "react";
import { Box, Drawer, Grid, useTheme } from "@mui/material";
import {
  PrimaryTypography,
  SecondaryTypography,
} from "../../../Styles/signInUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../Redux/store";
import {
  FlowReducer,
  GetChangesByRevisionId,
  GetRevisionsByFlowVersionId,
} from "../../../Redux/apiManagement/flowReducer";
import GlobalCircularLoader from "../../Global/GlobalCircularLoader";
import {
  calculateDaysAgo,
  dateTimeFormat,
  getCookies,
} from "../../../Helpers/helpersFunctions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import ViewFLow from "../ViewFlow/viewFlow";
import { useEdgesState, useNodesState } from "reactflow";
import toast from "react-hot-toast";

function ChangeHistoryDesigner(props: any) {
  const { openChangeHistory, onCloseChangeHistory } = props;
  const theme = useTheme();

  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);

  const { getRevisionLoading, revisionData, changeHistoryNodes } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);

  // const versionId = sessionStorage.getItem("versionValue");
  const versionId = getCookies(
    process.env.NEXT_PUBLIC_COOKIE_VERSIONVALUE ?? ""
  );
  const flowId = getCookies(process.env.NEXT_PUBLIC_COOKIE_FLOWID ?? "");

  console.log("VersionIdCheck: ", versionId);

  const [filterStatusVal, setFilterStatusVal] = useState("All");

  const [logsDates, setLogsDates] = useState<any[]>([]);
  const [currentId, setCurrentId] = useState<string[]>([]);
  const [userValue, setUserValue] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(7);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [nodes, setNodes, onNodesChange] = useNodesState<any>(
    changeHistoryNodes?.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    changeHistoryNodes?.edges
  );

  const [revisionDetails, setRevisionDetails] = useState<any[]>(revisionData);

  const [filteredVal, setFilteredVal] = useState(
    filterStatusVal === "User"
      ? userValue?.[0]
      : filterStatusVal === "DateTime"
      ? logsDates?.[0]
      : ""
  );

  //functions
  const capitalizeFirstLetter = (word: any) => {
    if (!word) return "-";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const getValueOrDefault = (value: any) => {
    // Check if value is null, "null", or undefined
    const checkValue =
      value === null || value === "null" || value === undefined ? "-" : value;
    console.log("checkValue: ", checkValue);
    return checkValue; // Ensure the returned value is always a string
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        setCurrentPage((prevPage) => prevPage + 8);
      }
    }
  };

  const fetchPageData = async (page: number) => {
    let requestData = {
      flow_id: flowId,
      // flow_id: "6c990d814bc04f9f8be794bea0061bfc",
      version_id: versionId,
      // version_id: "e2cce2cd927448efac120298a0a5f9ae",
      offset: 0,
      limit: page,
      sort_order: "asc",
      sort_by: "created_date",
    };

    if (requestData?.flow_id?.trim() && requestData?.version_id?.trim()) {
      dispatch(GetRevisionsByFlowVersionId(requestData))
        .unwrap()
        .then((revisionRes: any) => {
          console.log("revisionRes: ", revisionRes);
          setRevisionDetails(revisionRes);
          const filteringOnlyDates = revisionRes?.map(
            (obj: any) => obj?.createdDate
          );
          setLogsDates(filteringOnlyDates);
          const filteringOnlyUserNames = revisionRes?.map(
            (obj: any) => obj?.createdBy
          );
          setUserValue(filteringOnlyUserNames);
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    }
  };

  const filteredData = revisionDetails?.filter((filterVal: any) => {
    if (filterStatusVal === "All") {
      return true;
    } else {
      if (filterStatusVal === "User") {
        return filterVal?.createdBy === filteredVal;
      } else {
        return filterVal?.createdDate === filteredVal;
      }
    }
  });

  const modifyHandle = (handle: string, name: string) => {
    if (!handle) return handle; // Return if undefined or empty
    const parts = handle.split("_");
    if (parts.length > 1) {
      // Insert '_changed' between the id and the rest of the string
      return `${parts[0]}_${name}_${parts.slice(1).join("_")}`;
    }
    return handle; // Return unchanged if no underscore is found
  };

  function revisionHandler(id: string, name: string) {
    if (!currentId?.includes(id)) {
      if (currentId?.length === 2) {
        toast.error("Already two revisions selected");
        return;
      }

      // If the ID is not already selected, fetch and add the changes
      dispatch(GetChangesByRevisionId(id))
        .unwrap()
        .then((changeRes: any) => {
          console.log("changeRes: ", changeRes);

          // For nodes
          setCurrentId((prevSelectedIds) => [...prevSelectedIds, id]);
          const parsedDetailsArray = changeRes?.changedNodes?.map(
            (item: any) => {
              const parsedDetails = JSON?.parse(item?.details);
              return {
                ...item,
                parsedDetails,
              };
            }
          );

          let nodeId_array: any = [];
          let changeNodeArray = parsedDetailsArray
            ?.filter((x: any) => x.parsedDetails.type === "operationNode")
            .map((item: any) => {
              let parsedData = JSON?.parse(item?.parsedDetails?.data);
              parsedData.changeType = name + " - " + item?.type;
              parsedData.response = item?.parsedDetails?.response;
              let stringifiedData = JSON?.stringify(parsedData);
              nodeId_array.push(item?.parsedDetails?.id);

              return {
                ...item?.parsedDetails,
                data: stringifiedData,
                id: item?.parsedDetails?.id + "_" + name,
                revision_id: id,
              };
            });

          setNodes((prevNodes: any) => {
            const updatedNodes = prevNodes?.map((node: any) => node);
            console.log("UpdateNodes: ", changeNodeArray);
            return [...updatedNodes, ...changeNodeArray];
          });

          // For edges
          const parsedEdgesArray = changeRes?.changeEdges?.map((item: any) => {
            const parsedEdgeDetails = JSON?.parse(item?.details);
            return {
              ...item,
              parsedEdgeDetails,
            };
          });

          let changeEdgeArray = parsedEdgesArray?.map((item: any) => {
            let edgeStyle = {};
            let edgeLabel = "";

            switch (item.type) {
              case "ADDED_EDGE":
                edgeStyle = { stroke: "green" };
                edgeLabel = name + " - " + "Added Edge";
                break;
              case "DELETED_EDGE":
                edgeStyle = { stroke: "red" };
                edgeLabel = name + " - " + "Deleted Edge";
                break;
              default:
                edgeStyle = { stroke: "blue" };
                edgeLabel = name + " - " + item.type;
            }

            const source = item?.parsedEdgeDetails?.source?.includes("start")
              ? item?.parsedEdgeDetails?.source
              : nodeId_array.includes(item?.parsedEdgeDetails?.source)
              ? item?.parsedEdgeDetails?.source + "_" + name
              : item?.parsedEdgeDetails?.source;

            const target = nodeId_array.includes(
              item?.parsedEdgeDetails?.target
            )
              ? item?.parsedEdgeDetails?.target + "_" + name
              : item?.parsedEdgeDetails?.target;

            const sourceHandle = item?.parsedEdgeDetails?.source?.includes(
              "start"
            )
              ? item?.parsedEdgeDetails?.sourceHandle
              : nodeId_array.includes(item?.parsedEdgeDetails?.source)
              ? modifyHandle(item?.parsedEdgeDetails?.sourceHandle, name)
              : item?.parsedEdgeDetails?.sourceHandle;

            const targetHandle = nodeId_array.includes(
              item?.parsedEdgeDetails?.target
            )
              ? modifyHandle(item?.parsedEdgeDetails?.targetHandle, name)
              : item?.parsedEdgeDetails?.targetHandle;

            return {
              ...item?.parsedEdgeDetails,
              type: "changeEdge",
              id: item?.parsedEdgeDetails?.id + "_" + name,
              source: source,
              target: target,
              sourceHandle: sourceHandle,
              targetHandle: targetHandle,
              style: {
                ...item?.parsedEdgeDetails?.style,
                ...edgeStyle,
              },
              data: {
                label: edgeLabel,
              },
              revision_id: id,
            };
          });

          setEdges((prevEdgeData: any) => {
            const updatedEdges = prevEdgeData?.map((edge: any) => ({
              ...edge,
              changeEdgeType: "ModifiedEdge",
            }));

            console.log("UpdateEdge: ", updatedEdges, changeEdgeArray, edges);
            return [...updatedEdges, ...changeEdgeArray];
          });
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    } else {
      // If the ID is already selected, remove the associated nodes and edges
      setCurrentId((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id)
      );

      setNodes((prevNodes: any) =>
        prevNodes.filter((node: any) => node.revision_id !== id)
      );

      setEdges((prevEdges: any) =>
        prevEdges.filter((edge: any) => edge.revision_id !== id)
      );
    }
  }

  console.log("filteredData: ", filteredData, filterStatusVal, filteredVal);

  useEffect(() => {
    setFilteredVal(
      filterStatusVal === "User"
        ? userValue?.[0]
        : filterStatusVal === "DateTime"
        ? logsDates?.[0]
        : ""
    );
  }, [filterStatusVal]);

  useEffect(() => {
    fetchPageData(currentPage);
  }, [openChangeHistory, currentPage]);

  useEffect(() => {
    return () => {
      setNodes([]);
      setEdges([]);
    };
  }, []);

  useEffect(() => {
    setNodes(changeHistoryNodes?.nodes);
    setEdges(changeHistoryNodes?.edges);
  }, [changeHistoryNodes]);

  console.log("nodesModified", nodes);
  console.log("nodesModified", edges);

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={openChangeHistory}
        onClose={() => {
          onCloseChangeHistory();
          //   setInputVisible(false);
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%", // Full width
            maxWidth: "80vw", // Ensure it doesn't exceed viewport width
            height: "100%", // Full height
          },
        }}
      >
        <Box className="p-2 px-3">
          <ArrowBackIosIcon
            sx={{
              fontSize: "0.6rem",
              color: "#64748B",
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
          <PrimaryTypography className="mt-2">
            Revision History
          </PrimaryTypography>
          <SecondaryTypography
            style={{
              color: `${theme.palette.teritiaryColor.main}`,
              margin: "7px",
            }}
          >
            The following provides the revision history details.
          </SecondaryTypography>

          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={9}>
              <ViewFLow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: "10px",
                  position: "relative",
                }}
              >
                {revisionData?.length <= 0 && (
                  <GlobalCircularLoader open={getRevisionLoading} />
                )}
                <div
                  style={{ margin: "1rem 0rem" }}
                  onClick={() => {
                    onCloseChangeHistory();
                    setCurrentPage(7);
                    setFilterStatusVal("All");
                    setFilteredVal(
                      filterStatusVal === "User"
                        ? userValue?.[0]
                        : filterStatusVal === "DateTime"
                        ? logsDates?.[0]
                        : ""
                    );
                  }}
                ></div>
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
                      {filteredData?.length > 0 ? (
                        filteredData?.map((val: any, index: any) => (
                          <div id="scrollContainer" key={val?.revision_id}>
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
                                      currentId.includes(val.revision_id)
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
                                    revisionHandler(val.revision_id, val.name);
                                  }}
                                >
                                  <div>
                                    <PrimaryTypography
                                      style={{
                                        fontWeight: 800,
                                      }}
                                    >
                                      {val?.name}
                                    </PrimaryTypography>
                                    <SecondaryTypography
                                      style={{
                                        color: `${theme.palette.primaryBlack.main}`,
                                      }}
                                    >
                                      {getValueOrDefault(
                                        dateTimeFormat(val?.created_at)
                                      )}
                                    </SecondaryTypography>
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
                                      {getValueOrDefault(
                                        capitalizeFirstLetter(val?.created_by)
                                      )}
                                    </SecondaryTypography>
                                    <SecondaryTypography
                                      style={{
                                        color: `${theme.palette.teritiaryColor.main}`,
                                      }}
                                    >
                                      {calculateDaysAgo(val?.created_at)}
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
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
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
        </Box>
      </Drawer>
    </div>
  );
}

export default ChangeHistoryDesigner;
