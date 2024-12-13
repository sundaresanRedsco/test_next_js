import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  TwoArrowIcon,
  TwoArrowMinimizedIcon,
  UnionMinimizedIcon,
} from "@/app/Assests/icons";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { Union } from "@/app/Assests/icons";
import { useDrag } from "react-dnd";
import { SecondaryTextTypography } from "@/app/Styles/signInUp";
import {
  endpointReducer,
  GetCollectionOperationTreeFlow,
  updateWorkflowSidebarEnd,
  updateWorkflowSidebarStart,
} from "@/app/Redux/apiManagement/endpointReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { apiEndPointReducer } from "@/app/Redux/apiIntelligence/apiEndPointReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import { useSideBarStore } from "@/app/hooks/sideBarStore";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";

export const SecondaryTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #eeeeee;
  font-size: 14px;
  font-weight: 500;
`;

export const TertiaryTypogrpahy = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #eeeeee;
  font-size: 14px;
  font-weight: 500;
`;

export const ItemTypes = {
  CARD: "card",
};

const DraggableCard = ({
  id,
  name,
  http_method,
  type,
  // tabs,
  collection_id,
  recentlyModifiedProp,
  full_url,
}: // onSelectCurrentOperation,
any) => {
  const theme = useTheme();
  // const [, drag] = useDrag({
  //   type: ItemTypes.CARD,
  //   item: { id, name, http_method, type },
  // });

  const divRef = useRef<HTMLDivElement>(null);

  // Attach the drag to the ref, as React DnD will correctly handle this ref
  // drag(divRef);
  const { dropItem, setdropItems } = useGlobalStore();
  const [isDragging, setisDragging] = useState(false);
  useEffect(() => {
    if (isDragging) {
      setdropItems({ id, name, http_method, type, full_url });
    }
  }, [isDragging, id, name, http_method, type, full_url]);
  return (
    <div
      ref={divRef}
      onDragStart={(e) => {
        setisDragging(true);
      }}
      onDragEnd={() => {
        setisDragging(false);
      }}
      draggable
    >
      {/* <SecondaryTextTypography
          key={id}
          style={{
            fontSize: "8px",
            marginLeft: "15px",
            // color: `${theme.palette.v2EndpointColor.main}`,
            color: tabs.some((tab: any) => tab.includes(`Operat_${id}`))
              ? `${theme.palette.v2EndpointActiveColor.main}`
              : `${theme.palette.v2EndpointColor.main}`,

            fontWeight: tabs.some((tab: any) => tab.includes(`Operat_${id}`))
              ? `600`
              : ``,
            marginTop: "3px",
            cursor: "grab",
            display: "flex",
            alignItems: "center",
            maxWidth: "150px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            minWidth: 0,
            padding: "2px 0px",
          }}
          onClick={() => {
            onSelectCurrentOperation(collection_id, id);
          }}
        >
          {name}
        </SecondaryTextTypography> */}
      <Box
        key={id}
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: recentlyModifiedProp === true ? "8px" : "6px 15px",
          gap: recentlyModifiedProp === true ? "" : "10px",
          // width: "100%",
          height: recentlyModifiedProp === true ? "20px" : "",
          left: "0px",
          top: recentlyModifiedProp === true ? "" : "58px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "0.5px solid #FFFFFF40",
          borderRadius: recentlyModifiedProp === true ? "5px" : "7px",
          marginBottom: recentlyModifiedProp === true ? "5px" : "13px",
          cursor: "grab",
        }}
      >
        <TertiaryTypogrpahy
          style={{ fontSize: recentlyModifiedProp === true ? "6px" : "" }}
        >
          {name}
        </TertiaryTypogrpahy>
        <Box sx={{ marginLeft: "auto" }}>
          {recentlyModifiedProp === true ? <UnionMinimizedIcon /> : <Union />}
        </Box>
      </Box>
    </div>
  );
};

export default function WorkflowSidebar(props: any) {
  const { recentlyModifiedProp, project_id } = props;
  const { isSidebarCollapsed } = useSideBarStore();

  const { getTreeFlowLoading, workflowSidebarStart, workflowSidebarEnd } =
    useSelector<RootStateType, endpointReducer>(
      (state) => state.apiManagement.endpoint
    );
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const containerRef = useRef<any>(null);

  const workflowSidebarCollOperVal = [
    {
      summary: "AWS_SOUTH_DEV(1.0)",
      details: [
        {
          operName: "addProducts",
        },
        {
          operName: "searchUsers",
        },
        {
          operName: "getUsers",
        },
        {
          operName: "deleteUsers",
        },
      ],
    },
    {
      summary: "AWS_SOUTH_DEV(2.0)",
      details: [
        {
          operName: "addProducts2",
        },
        {
          operName: "searchUsers2",
        },
        {
          operName: "getUsers2",
        },
        {
          operName: "deleteUsers2",
        },
      ],
    },
  ];

  type ExpandedState = { [key: number]: boolean };
  const [expanded, setExpanded] = useState<ExpandedState>({ 0: true });
  const [sidebarVal, setSidebarVal] = useState(workflowSidebarCollOperVal);

  const handleAccordionToggle = (index: number) => {
    setExpanded((prevState: any) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [endpointSearchClicked, setEndpointSearchClicked] = useState(false);
  const [endpointVal, setEndpointVal] = useState<any[]>([]);

  const [stateId, setStageId] = useState<string>("");
  const [collOperVal, setCollOperVal] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(5);
  const [collOperTreeCount, setCollOperTreeCount] = useState(0);
  const [collOperDetails, setCollOperDetails] = useState<any[]>([]);

  const [searchVal, setSearchVal] = useState("");

  const handleToggle = (
    event: React.SyntheticEvent,
    nodeIds: string[] | any
  ) => {
    setExpanded(nodeIds);
  };

  const fetchPageData = async (page: number) => {
    if (project_id) {
      setIsLoading(true);
      setEndVal((prevEnd: any) => prevEnd + 5);
      let requestData = {
        project_id: project_id,
        // offsetStart: 0,
        offsetStart: workflowSidebarStart,
        offsetEnd: page,
      };
      dispatch(GetCollectionOperationTreeFlow(requestData))
        .unwrap()
        .then((res: any) => {
          setCollOperTreeCount(res?.count);

          // const filterStatusVal = res?.collections?.filter(
          //   (filterStatus: any) => filterStatus?.status === "ACTIVE"
          // );

          // setCollOperDetails(filterStatusVal);

          setCollOperDetails((prevValues: any) => {
            const newData = Array.isArray(res?.collections)
              ? res?.collections.filter(
                  (filterStatus: any) => filterStatus?.status === "ACTIVE"
                )
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

          setIsLoading(false);
        })
        .catch((error: any) => {})
        .finally(() => setIsLoading(false));
    }
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      // if (scrollTop + clientHeight >= scrollHeight - 100) {
      //   setCurrentPage((prevPage) => prevPage + 5);
      // }
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        if (workflowSidebarEnd <= collOperTreeCount) {
          dispatch(updateWorkflowSidebarStart(workflowSidebarStart + 8));
          dispatch(updateWorkflowSidebarEnd(workflowSidebarEnd + 8));
        }
      }
    }
  };

  // useEffect(() => {
  //   if (currentEnvironment && currentStage) {
  //     let getOperationValues = {
  //       project_id: currentEnvironment,
  //       stage_id: currentStage,
  //     };
  //     dispatch(GetOperations(getOperationValues))
  //       .unwrap()
  //       .then((operRes: any) => {

  //         setCollOperVal(operRes);
  //       })
  //       .catch((error: any) => {

  //       });
  //   }
  // }, [currentEnvironment, currentStage]);

  useEffect(() => {
    // const container = document.getElementById(maninContainer);
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);
    setSearchVal("");

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      setSearchVal("");
    };
    // }, [maninContainer]); // Include maninContainer as a dependency
  }, []);

  // useEffect(() => {
  //   if (project_id) {
  //     fetchPageData(currentPage);
  //     setIsLoading(false);
  //   } else {
  //     setCollOperDetails([]);
  //     setCollOperTreeCount(0);
  //   }
  // }, [currentPage, project_id]);

  useEffect(() => {
    if (project_id) {
      fetchPageData(workflowSidebarEnd);
      setIsLoading(false);
    }
  }, [workflowSidebarEnd, project_id]);

  return (
    <Box
      sx={{
        background: "#12121259",
        borderRadius: "15px",
        backdropFilter: "blur(158.97px)",
        boxShadow: "0 0 1px 0px #000000a3",
        height: "80vh",
        padding: "20px",
        overflow: "hidden",
        "&:hover": {
          overflowY: "auto",
        },
        transition: "overflow 0.5s",
        width: "95%",
      }}
    >
      {/* <Box
      // sx={{
      //   padding: "10px",
      // }}
      > */}
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid size={{ lg: !isSidebarCollapsed ? 10 : 10.5, xs: 10.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                // height: "45px",
                background: "rgba(122, 67, 254, 0.35)",
                border: "0.5px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "7px",
                flex: "none",
                order: 0,
                flexGrow: 0,
                boxSizing: "border-box",
                padding: {
                  xl: "5px",
                  lg: "5px",
                  md: isSidebarCollapsed ? "5px" : "3px",
                },
                gap: recentlyModifiedProp === true ? "20px" : "10px",
              }}
            >
              <SecondaryTypography
                style={{
                  fontSize: recentlyModifiedProp === true ? "6px" : "",
                }}
              >
                All Nodes
              </SecondaryTypography>
              <KeyboardArrowDownIcon
                style={{
                  color: "#FFFFFF",
                  fontSize: recentlyModifiedProp === true ? "6px" : "",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 1 }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding:
                recentlyModifiedProp === true
                  ? "6px"
                  : {
                      xl: "10px",
                      lg: "10px",
                      md: isSidebarCollapsed ? "10px" : "9px",
                    },
              gap: recentlyModifiedProp === true ? "" : "10px",
              width: {
                xl: "26px",
                lg: "26px",
                md: isSidebarCollapsed ? "26px" : "20px",
              },
              height: {
                xl: "30px",
                lg: "30px",
                md: isSidebarCollapsed ? "30px" : "25px",
              },
              background: "rgba(122, 67, 254, 0.35)",
              border: "0.5px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "6px",
            }}
          >
            {recentlyModifiedProp === true ? (
              <TwoArrowMinimizedIcon />
            ) : (
              <TwoArrowIcon />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Collections and Operations */}
      <Box sx={{ margin: recentlyModifiedProp === true ? "" : "10px 0px" }}>
        {collOperDetails?.map((item: any, index: number) => (
          <Accordion
            key={index}
            expanded={expanded[index] || false}
            onChange={() => handleAccordionToggle(index)}
            disableGutters
            elevation={0}
            sx={{
              background: "transparent",
              boxShadow: "none",
              padding: 0,
              margin: 0,
              border: "none",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                borderBottom: "none",
                border: "none",
                paddingBottom: "0px",
                "&.MuiButtonBase-root": {
                  padding: 0,
                },
              }}
              expandIcon={
                <Box
                  sx={{
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: recentlyModifiedProp === true ? "" : "5px",
                    gap: recentlyModifiedProp === true ? "" : "7.5px",
                    width: recentlyModifiedProp === true ? "10px" : "25px",
                    height: recentlyModifiedProp === true ? "10px" : "25px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "0.375px solid rgba(255, 255, 255, 0.25)",
                    borderRadius: recentlyModifiedProp === true ? "3px" : "6px",
                    flex: "none",
                    order: 1,
                    flexGrow: 0,
                  }}
                >
                  {expanded[index] ? (
                    <RemoveIcon
                      style={{
                        color: "#FFFFFF",
                        fontSize:
                          recentlyModifiedProp === true ? "5px" : "15px",
                      }}
                    />
                  ) : (
                    <AddIcon
                      style={{
                        color: "#FFFFFF",
                        fontSize:
                          recentlyModifiedProp === true ? "5px" : "15px",
                      }}
                    />
                  )}
                </Box>
              }
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <SecondaryTypography
                  style={{
                    fontSize: recentlyModifiedProp === true ? "6px" : "",
                  }}
                >
                  {item?.collection_name}
                </SecondaryTypography>
              </Box>
            </AccordionSummary>
            <Divider
              color="#FFFFFF"
              sx={{
                // backgroundColor: "#FFFFFF",
                height: "1px",
                marginBottom: "10px",
                marginTop: "-5px",
              }}
            />
            <AccordionDetails
              sx={{
                border: "none",
                "&.MuiAccordionDetails-root": {
                  padding: 0,
                },
              }}
            >
              {item?.operations?.map((operation: any, idx: number) => (
                // <Box
                //   key={idx}
                //   sx={{
                //     boxSizing: "border-box",
                //     display: "flex",
                //     flexDirection: "row",
                //     alignItems: "center",
                //     padding: "18px 15px",
                //     gap: "10px",
                //     width: "100%",
                //     height: "55px",
                //     left: "0px",
                //     top: "58px",
                //     background: "rgba(255, 255, 255, 0.1)",
                //     border: "0.5px solid rgba(255, 255, 255, 0.25)",
                //     borderRadius: "10px",
                //     marginBottom: "10px",
                //   }}
                // >
                //   <TertiaryTypogrpahy>
                //     {detail?.operName}
                //   </TertiaryTypogrpahy>
                //   <Box sx={{ marginLeft: "auto" }}>
                //     <Union />
                //   </Box>
                // </Box>
                <DraggableCard
                  key={operation?.operation_id}
                  // id={operation?.operation_id}
                  id={operation?.operation_id}
                  name={operation?.operation_name}
                  http_method={operation?.method}
                  type="operations"
                  collection_id={operation?.collection_id}
                  recentlyModifiedProp={recentlyModifiedProp}
                  full_url={operation?.full_url}
                  // tabs={tabs}
                  // onSelectCurrentOperation={onSelectCurrentOperation}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        {getTreeFlowLoading && (
          <Box sx={{ position: "relative" }}>
            <GlobalCircularLoader open={true} noBackDrop />
          </Box>
        )}
      </Box>
      {/* </Box> */}
    </Box>
  );
}
