// import React, { useEffect, useRef, useState } from "react";
// import {
//   AddIcon,
//   CloneIcon,
//   CloneV2Icon,
//   DeleteIcon,
//   DeleteV2Icon,
//   FilterIcon,
//   FilterV2Icon,
//   JsonIcon,
//   PlusV2Icon,
//   SampleCodeIcon,
//   SearchIcon,
//   SearchV2Icon,
//   SettingsIcon,
//   SettingsV2Icon,
//   SoapIcon,
//   UnlinkIcon,
// } from "../../../Assests/icons";
// import { SecondaryTextTypography } from "../../../Styles/signInUp";
// import { Box, Grid, useTheme } from "@mui/material";
// import { translate } from "../../../Helpers/helpersFunctions";
// import { styled } from "@mui/system";
// import { TreeView, TreeItem, treeItemClasses } from "@mui/x-tree-view";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
// import GInput from "../../Global/GInput";
// import GDivider from "../../Global/GDivider";
// import GButton from "../../Global/GButton";
// import GrpcImage from "../../../Assests/images/gprc.png";
// import GraphQlImage from "../../../Assests/images/graphql.png";
// import WebImage from "../../../Assests/images/web.png";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   environmentReducer,
//   GetAllStagesByProjectId,
// } from "../../../Redux/apiManagement/environmentReducer";
// import {
//   endpointReducer,
//   GetCollectionOperationTree,
//   GetOperations,
// } from "../../../Redux/apiManagement/endpointReducer";
// import { RootStateType } from "../../../Redux/store";
// import GlobalCircularLoader from "../../../Components/Global/GlobalCircularLoader";
// import GAlertDetailBox from "../../Global/GAlertDetailBox";
// import {
//   setAddTabs,
//   setRemoveTabs,
//   setTabs,
//   tabsReducer,
// } from "../../../Redux/tabReducer";
// import { useLocation } from "react-router-dom";
// import { CommonReducer } from "../../../Redux/commonReducer";
// import { workspaceReducer } from "../../../Redux/apiManagement/workspaceReducer";
// import { useDrag } from "react-dnd";

// export const ItemTypes = {
//   CARD: "card",
// };

// const DraggableCard = ({
//   id,
//   name,
//   http_method,
//   type,
//   tabs,
//   collection_id,
//   onSelectCurrentOperation,
// }: any) => {
//   const theme = useTheme();
//   const [, drag] = useDrag({
//     type: ItemTypes.CARD,
//     item: { id, name, http_method, type },
//   });

//   return (
//     <div ref={drag}>
//       <SecondaryTextTypography
//         key={id}
//         style={{
//           fontSize: "8px",
//           marginLeft: "15px",
//           // color: `${theme.palette.v2EndpointColor.main}`,
//           color: tabs.some((tab: any) => tab.includes(`Operat_${id}`))
//             ? `${theme.palette.v2EndpointActiveColor.main}`
//             : `${theme.palette.v2EndpointColor.main}`,

//           fontWeight: tabs.some((tab: any) => tab.includes(`Operat_${id}`))
//             ? `600`
//             : ``,
//           marginTop: "3px",
//           cursor: "grab",
//           display: "flex",
//         }}
//         onClick={() => {
//           onSelectCurrentOperation(collection_id, id);
//         }}
//       >
//         <AddCircleOutlineIcon
//           style={{
//             // color: expanded.includes(val.collections_id)
//             //   ? `${theme.palette.v2EndpointActiveColor.main}`
//             //   : `${theme.palette.v2EndpointColor.main}`,
//             width: "10px",
//             height: "10px",
//             marginRight: "5px",
//           }}
//         />
//         {name}
//       </SecondaryTextTypography>
//     </div>
//   );
// };

// const StyleTreeView = styled(TreeView)(({ theme }) => ({
//   color: theme.palette.v2TeritiaryColor.main,
//   fontFamily: "Inter-Regular !important",
//   marginTop: 10,
// }));

// const Endpoints = () => {
//   const dispatch = useDispatch<any>();
//   const theme = useTheme();
//   const containerRef = useRef<any>(null);
//   const location = useLocation();

//   const { getOperationLoading, getCollOperTreeLoading } = useSelector<
//     RootStateType,
//     endpointReducer
//   >((state) => state.apiManagement.endpoint);

//   const { currentEnvironment, currentStage } = useSelector<
//     RootStateType,
//     environmentReducer
//   >((state) => state.apiManagement.environment);

//   const { tabs } = useSelector<RootStateType, tabsReducer>(
//     (state) => state.tabs
//   );

//   const { userProfile } = useSelector<RootStateType, CommonReducer>(
//     (state) => state.common
//   );

//   const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
//     (state) => state.apiManagement.workspace
//   );

//   const hasOperClicked = tabs.some((tab) => tab.includes("Operat_"));

//   let projectIdVal = location?.pathname?.split("/")[6];

//   const iconStyle = {
//     width: "13px",
//     height: "13px",
//   };

//   const iconImageStyle = {
//     width: "12px",
//     height: "12px",
//   };

//   const iconList = [
//     {
//       name: "Filter",
//       icon: <FilterV2Icon style={{ width: "13px", height: "13px" }} />,
//     },
//     {
//       name: "Add",
//       icon: <PlusV2Icon style={{ width: "13px", height: "13px" }} />,
//     },
//     {
//       name: "Clone",
//       icon: <CloneV2Icon style={{ width: "13px", height: "13px" }} />,
//     },
//     {
//       name: "Delete",
//       icon: <DeleteV2Icon style={{ width: "13px", height: "13px" }} />,
//     },
//   ];

//   const collectionOperations = [
//     {
//       collections_id: "1",
//       name: "CollectionName1",
//       service_type: "JSON",
//       active_vesion: "1.2",
//       operName: "oper1",
//     },
//     {
//       collections_id: "2",
//       name: "CollectionName2",
//       service_type: "SOAP",
//       active_vesion: "1.2",
//       operName: "oper2",
//     },
//     {
//       collections_id: "3",
//       name: "CollectionName3",
//       service_type: "gRPC",
//       active_vesion: "1.2",
//       operName: "oper3",
//     },
//     {
//       collections_id: "4",
//       name: "CollectionName4",
//       service_type: "JSON",
//       active_vesion: "1.2",
//       operName: "oper4",
//     },
//     {
//       collections_id: "5",
//       name: "CollectionName5",
//       service_type: "JSON",
//       active_vesion: "1.2",
//       operName: "oper5",
//     },
//   ];

//   const [endpointSearchClicked, setEndpointSearchClicked] = useState(false);
//   const [endpointVal, setEndpointVal] = useState<any[]>([]);
//   const [expanded, setExpanded] = useState<string[]>([]);
//   const [stateId, setStageId] = useState<string>("");
//   const [collOperVal, setCollOperVal] = useState<any[]>([]);

//   const [currentPage, setCurrentPage] = useState<number>(5);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [startVal, setStartVal] = useState<number>(0);
//   const [endVal, setEndVal] = useState<number>(5);
//   const [collOperTreeCount, setCollOperTreeCount] = useState(0);
//   const [collOperDetails, setCollOperDetails] = useState<any[]>([]);
//   const [searchVal, setSearchVal] = useState("");

//   const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
//     setExpanded(nodeIds);
//   };

//   const fetchPageData = async (page: number) => {
//     if (currentEnvironment && currentStage) {
//       setIsLoading(true);
//       setEndVal((prevEnd: any) => prevEnd + 5);
//       let requestData = {
//         project_id: currentEnvironment,
//         stage_id: currentStage,
//         offsetStart: 0,
//         offsetEnd: page,
//       };
//       dispatch(GetCollectionOperationTree(requestData))
//         .unwrap()
//         .then((res: any) => {
//           console.log("treeRes: ", res);
//           setCollOperTreeCount(res?.count);
//           const filterStatusVal = res?.collections?.filter(
//             (filterStatus: any) => filterStatus?.status === "ACTIVE"
//           );
//           console.log("GetOperationTreeRes: ", res?.collections);
//           setCollOperDetails(filterStatusVal);
//           setIsLoading(false);
//         })
//         .catch((error: any) => {
//           console.log("Eror: ", error);
//         })
//         .finally(() => setIsLoading(false));
//     }
//   };

//   const handleScroll = () => {
//     if (containerRef?.current) {
//       const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
//       if (
//         scrollTop + clientHeight >= scrollHeight - 100 &&
//         !getCollOperTreeLoading
//       ) {
//         setCurrentPage((prevPage) => prevPage + 5);
//       }
//     }
//   };

//   console.log("Tabs: ", tabs);

//   const onSelectCurrentCollection = (collId: string) => {
//     if (tabs.includes("Coll_" + collId)) {
//       dispatch(setRemoveTabs("Coll_" + collId));
//       return;
//     }
//     dispatch(setAddTabs("Coll_" + collId));
//   };

//   const onSelectCurrentOperation = (collId: string, operId: string) => {
//     const collectionTab = "Operat_" + operId + "_" + collId;
//     dispatch(setAddTabs(collectionTab));
//     dispatch(GetAllStagesByProjectId(currentEnvironment));
//   };

//   console.log(tabs, "state.tabs");

//   // useEffect(() => {
//   //   if (currentEnvironment && currentStage) {
//   //     let getOperationValues = {
//   //       project_id: currentEnvironment,
//   //       stage_id: currentStage,
//   //     };
//   //     dispatch(GetOperations(getOperationValues))
//   //       .unwrap()
//   //       .then((operRes: any) => {
//   //         console.log(operRes, "operResoperRes");
//   //         setCollOperVal(operRes);
//   //       })
//   //       .catch((error: any) => {
//   //         console.log("Error: ", error);
//   //       });
//   //   }
//   // }, [currentEnvironment, currentStage]);

//   useEffect(() => {
//     // const container = document.getElementById(maninContainer);
//     const container = document.getElementById("scrollable-container");
//     container?.addEventListener("scroll", handleScroll);
//     setSearchVal("");

//     return () => {
//       container?.removeEventListener("scroll", handleScroll);
//       setSearchVal("");
//     };
//     // }, [maninContainer]); // Include maninContainer as a dependency
//   }, []);

//   useEffect(() => {
//     if (currentEnvironment) {
//       fetchPageData(currentPage);
//       setIsLoading(false);
//     } else {
//       setCollOperDetails([]);
//       setCollOperTreeCount(0);
//     }
//   }, [currentPage, currentEnvironment, currentStage]);

//   // useEffect(() => {
//   //   fetchPageData(currentPage);
//   // }, []);

//   return (
//     <Box sx={{ marginTop: "20px" }}>
//       <Grid container>
//         <Grid item xs={7}>
//           <GInput
//             className="endpointSearch"
//             fullWidth
//             variant="standard"
//             value="Endpoints"
//             fontSize={endpointSearchClicked ? "" : "10px"}
//             fontWeight={endpointSearchClicked ? "" : 600}
//             color={
//               endpointSearchClicked
//                 ? ""
//                 : `${theme.palette.v2SecondaryColor.main}`
//             }
//             endIcon={
//               <SearchV2Icon
//                 stroke={theme.palette.v2PrimaryColor.main}
//                 style={{ width: "8px", height: "8px", cursor: "pointer" }}
//                 onClick={() => setEndpointSearchClicked((prev) => !prev)}
//               />
//             }
//             disableUnderline={!endpointSearchClicked}
//             disabledColor={theme.palette.v2SecondaryColor.main}
//             disabled={!endpointSearchClicked}
//             helperText={true}
//           />
//         </Grid>
//         <Grid
//           item
//           xs={5}
//           sx={{
//             display: "flex",
//             justifyContent: "end",
//             alignItems: "baseline",
//           }}
//         >
//           <Box>
//             <GButton
//               buttonShape="circular"
//               label="Import"
//               padding="0px"
//               minWidth="35px"
//             />
//             <GButton
//               buttonShape="circular"
//               label="New"
//               padding="0px"
//               minWidth="35px"
//               marginLeft="5px"
//               disabled={currentEnvironment ? true : false}
//               cursor={currentEnvironment ? "" : "pointer"}
//             />
//           </Box>
//         </Grid>
//       </Grid>
//       <GDivider />
//       <Box>
//         <Box sx={{ marginTop: "10px" }}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               // background: "#F1F5F9",
//               // padding: "0px 2px",
//             }}
//           >
//             <Box style={{ display: "flex" }}>
//               <SettingsV2Icon
//                 style={{
//                   width: "13px",
//                   height: "13px",
//                   stroke: `${theme.palette.v2SecondaryColor.main}`,
//                 }}
//               />
//               <SecondaryTextTypography
//                 style={{
//                   fontFamily: "Inter-Regular ! important",
//                   marginLeft: "3px",
//                   fontSize: "10px",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   color: `${theme.palette.v2SecondaryColor.main}`,
//                 }}
//                 //   onClick={}
//               >
//                 All Endpoints
//               </SecondaryTextTypography>
//             </Box>

//             <Box sx={{ display: "flex", marginBottom: "4px" }}>
//               {iconList?.map((val: any, index: any) => (
//                 <Box
//                   key={index}
//                   sx={{ marginLeft: index !== 0 ? "10px" : "0px" }}
//                 >
//                   {val?.icon}
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Box>
//         <Box
//           ref={containerRef}
//           onScroll={handleScroll}
//           sx={{
//             maxHeight: "300px",
//             overflowY: "auto",
//             position: getCollOperTreeLoading ? "relative" : "none",
//             "&::-webkit-scrollbar": {
//               width: "1px", // Adjust the width of the scrollbar
//             },
//           }}
//         >
//           {<GlobalCircularLoader open={getCollOperTreeLoading} />}
//           {collOperDetails?.length === 0 ? (
//             <GAlertDetailBox
//               label={
//                 "DRAG AND DROP THE ENDPOINT FILE OR CLICK NEW/IMPORT BUTTON"
//               }
//             />
//           ) : (
//             <>
//               <StyleTreeView expanded={expanded} onNodeToggle={handleToggle}>
//                 {/* {collectionOperations.map((val, index) => ( */}
//                 {
//                   // collOperVal
//                   collOperDetails?.map((val, index) => (
//                     <TreeItem
//                       key={val.collection_id}
//                       nodeId={val.collection_id}
//                       label={
//                         <Box
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             margin: "5px 0px",
//                             cursor: "pointer",
//                           }}
//                           onClick={() =>
//                             onSelectCurrentCollection(val?.collection_id)
//                           }
//                         >
//                           {expanded.includes(val.collection_id) ? (
//                             <RemoveCircleOutlineOutlinedIcon
//                               style={{
//                                 color: expanded.includes(val.collection_id)
//                                   ? `${theme.palette.v2EndpointActiveColor.main}`
//                                   : `${theme.palette.v2EndpointColor.main}`,
//                                 stroke: expanded.includes(val.collection_id)
//                                   ? `${theme.palette.v2EndpointActiveColor.main}`
//                                   : `${theme.palette.v2EndpointColor.main}`,
//                                 strokeWidth: expanded.includes(
//                                   val.collection_id
//                                 )
//                                   ? "0.5"
//                                   : "1",
//                                 width: "13px",
//                                 height: "13px",
//                                 marginRight: "3px",
//                               }}
//                             />
//                           ) : (
//                             <AddCircleOutlineIcon
//                               style={{
//                                 color: expanded.includes(val.collection_id)
//                                   ? `${theme.palette.v2EndpointActiveColor.main}`
//                                   : `${theme.palette.v2EndpointColor.main}`,
//                                 width: "13px",
//                                 height: "13px",
//                                 marginRight: "3px",
//                               }}
//                             />
//                           )}
//                           {val?.service_type === "JSON" ? (
//                             <JsonIcon style={iconStyle} />
//                           ) : val?.service_type === "SOAP" ? (
//                             <SoapIcon style={iconStyle} />
//                           ) : val?.service_type === "gRPC" ? (
//                             <img
//                               src={GrpcImage}
//                               alt=""
//                               style={iconImageStyle}
//                             />
//                           ) : val?.service_type === "GraphQL" ? (
//                             <img
//                               src={GraphQlImage}
//                               alt=""
//                               style={iconImageStyle}
//                             />
//                           ) : val?.service_type === "WEB SOCKET" ? (
//                             <img src={WebImage} alt="" style={iconImageStyle} />
//                           ) : (
//                             ""
//                           )}
//                           <SecondaryTextTypography
//                             style={{
//                               marginLeft: "3px",
//                               fontSize: "10px",
//                               maxWidth: "100px",
//                               overflow: "hidden",
//                               whiteSpace: "nowrap",
//                               textOverflow: "ellipsis",
//                               fontWeight: tabs.some((tab) =>
//                                 tab.includes(`Coll_${val.collection_id}`)
//                               )
//                                 ? "600"
//                                 : "",
//                               color: tabs.some((tab) =>
//                                 tab.includes(`Coll_${val.collection_id}`)
//                               )
//                                 ? `${theme.palette.v2EndpointActiveColor.main}`
//                                 : `${theme.palette.v2EndpointColor.main}`,
//                             }}
//                           >
//                             {val?.collection_name}{" "}
//                           </SecondaryTextTypography>
//                           <SecondaryTextTypography
//                             style={{
//                               fontSize: "9px",
//                               // color: expanded.includes(val.collection_id)
//                               //   ? `${theme.palette.v2EndpointActiveColor.main}`
//                               //   : `${theme.palette.v2EndpointColor.main}`,
//                               color: tabs.some((tab) =>
//                                 tab.includes(`Coll_${val.collection_id}`)
//                               )
//                                 ? `${theme.palette.v2EndpointActiveColor.main}`
//                                 : `${theme.palette.v2EndpointColor.main}`,
//                             }}
//                           >
//                             {` (${val?.active_version})`}
//                           </SecondaryTextTypography>
//                         </Box>
//                       }
//                       sx={{
//                         "& .MuiTreeItem-content": {
//                           display: "block",
//                           backgroundColor: "transparent !important",
//                           padding: "0px",
//                         },
//                         "& .MuiTreeItem-content.Mui-selected": {
//                           backgroundColor: "transparent !important",
//                         },
//                         "& .MuiTreeItem-content.Mui-selected:hover": {
//                           backgroundColor: "transparent !important",
//                         },
//                         "& .MuiTreeItem-content:hover": {
//                           backgroundColor: "transparent !important",
//                         },
//                       }}
//                     >
//                       {/* {val?.operations.map((operation: any) => (
//                         <SecondaryTextTypography
//                           key={operation?.operation_id}
//                           style={{
//                             fontSize: "8px",
//                             marginLeft: "15px",
//                             // color: `${theme.palette.v2EndpointColor.main}`,
//                             color: tabs.some((tab) =>
//                               tab.includes(`Operat_${operation?.operation_id}`)
//                             )
//                               ? `${theme.palette.v2EndpointActiveColor.main}`
//                               : `${theme.palette.v2EndpointColor.main}`,

//                             fontWeight: tabs.some((tab) =>
//                               tab.includes(`Operat_${operation?.operation_id}`)
//                             )
//                               ? `600`
//                               : ``,
//                             marginTop: "3px",
//                             cursor: "pointer",
//                             display: "flex",
//                           }}
//                           onClick={() => {
//                             onSelectCurrentOperation(
//                               val.collection_id,
//                               operation?.operation_id
//                             );
//                             setCurrentOperationId(operation?.operation_id);
//                             setOperationClicked(true);
//                           }}
//                         >
//                           <AddCircleOutlineIcon
//                             style={{
//                               // color: expanded.includes(val.collections_id)
//                               //   ? `${theme.palette.v2EndpointActiveColor.main}`
//                               //   : `${theme.palette.v2EndpointColor.main}`,
//                               width: "10px",
//                               height: "10px",
//                               marginRight: "5px",
//                             }}
//                           />
//                           {operation?.operation_name}
//                         </SecondaryTextTypography>
//                       ))} */}
//                       {val?.operations.map((operation: any) => (
//                         <DraggableCard
//                           key={operation?.operation_id}
//                           id={operation?.operation_id}
//                           name={operation?.operation_name}
//                           http_method={operation?.http_method}
//                           type="operations"
//                           collection_id={val?.collection_id}
//                           tabs={tabs}
//                           onSelectCurrentOperation={onSelectCurrentOperation}
//                         />
//                       ))}
//                     </TreeItem>
//                   ))
//                 }
//               </StyleTreeView>
//             </>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Endpoints;

import React, { useEffect, useRef, useState } from "react";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import JsonIcon from "../../../Assests/icons/jsonIcon.svg";
import SoapIcon from "../../../Assests/icons/soapIcon.svg";
import Image from "next/image";
import { SecondaryTextTypography } from "../../../Styles/signInUp";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";
import GrpcImage from "../../../Assests/images/gprc.webp";
import GraphQlImage from "../../../Assests/images/graphql.webp";
import WebImage from "../../../Assests/images/web.webp";
import { useDispatch, useSelector } from "react-redux";
import {
  environmentReducer,
  GetAllStagesByProjectId,
} from "../../../Redux/apiManagement/environmentReducer";
import {
  endpointReducer,
  GetCollectionOperationTree,
  GetOperations,
} from "../../../Redux/apiManagement/endpointReducer";
import { RootStateType } from "../../../Redux/store";
import GlobalCircularLoader from "../../../Components/Global/GlobalCircularLoader";
import GAlertDetailBox from "../../Global/GAlertDetailBox";
import {
  setAddTabs,
  setRemoveTabs,
  tabsReducer,
} from "../../../Redux/tabReducer";
import { useDrag } from "react-dnd";
import { useStore } from "@/app/hooks/zuzstand";

const accordionDetailsStyles = {
  marginTop: "-25px",
  marginBottom: "-20px",
  border: "none",
};

const accordionCollectionStyles = {
  elevation: 0,
  border: "none",
  borderBottom: "none",
  "&.MuiPaper-root::before": {
    display: "none",
  },
  "&.MuiPaper-root-MuiAccordion-root.Mui-expanded ": {
    marginBottom: "0",
  },
  background: "transparent",
  boxShadow: "none",
  marginTop: "-15px",
  margin: "0px",
};

export const ItemTypes = {
  CARD: "card",
};

export const DraggableCard = ({
  id,
  name,
  http_method,
  type,
  tabs,
  collection_id,
  onSelectCurrentOperation,
}: any) => {
  const theme = useTheme();
  // const [, drag] = useDrag({
  //   type: ItemTypes.CARD,
  //   item: { id, name, http_method, type },
  // });

  const divRef = useRef<HTMLDivElement>(null);

  // Attach the drag to the ref, as React DnD will correctly handle this ref
  // drag(divRef);
  const { items, setItems } = useStore();
  const [isDragging, setisDragging] = useState(false);
  useEffect(() => {
    if (isDragging) {
      setItems({ id, name, http_method, type });
    }
  }, [isDragging, id, name, http_method, type]);

  return (
    <div
      ref={divRef}
      onDragStart={(e) => {
        // onDragStart(e);
        setisDragging(true);
      }}
      onDragEnd={() => {
        setisDragging(false);
      }}
      draggable
    >
      <SecondaryTextTypography
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
        <AddCircleOutlineIcon
          style={{
            // color: expanded.includes(val.collections_id)
            //   ? `${theme.palette.v2EndpointActiveColor.main}`
            //   : `${theme.palette.v2EndpointColor.main}`,
            width: "10px",
            height: "10px",
            marginRight: "5px",
          }}
        />
        {name}
      </SecondaryTextTypography>
    </div>
  );
};

const Endpoints = () => {
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const containerRef = useRef<any>(null);

  const { getCollOperTreeLoading } = useSelector<
    RootStateType,
    endpointReducer
  >((state) => state.apiManagement.endpoint);

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { tabs } = useSelector<RootStateType, tabsReducer>(
    (state) => state.tabs
  );

  const iconStyle = {
    width: "13px",
    height: "13px",
  };

  const iconImageStyle = {
    width: "12px",
    height: "12px",
  };

  const [endpointSearchClicked, setEndpointSearchClicked] = useState(false);
  const [endpointVal, setEndpointVal] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [stateId, setStageId] = useState<string>("");
  const [collOperVal, setCollOperVal] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(5);
  const [collOperTreeCount, setCollOperTreeCount] = useState(0);
  const [collOperDetails, setCollOperDetails] = useState<any[]>([]);
  console.log(collOperDetails, "collOperDetailssdsd");

  const [searchVal, setSearchVal] = useState("");

  const fetchPageData = async (page: number) => {
    if (currentEnvironment && currentStage) {
      setIsLoading(true);
      setEndVal((prevEnd: any) => prevEnd + 5);
      let requestData = {
        project_id: currentEnvironment,
        stage_id: currentStage,
        offsetStart: 0,
        offsetEnd: page,
      };
      dispatch(GetCollectionOperationTree(requestData))
        .unwrap()
        .then((res: any) => {
          console.log("treeRes: ", res);
          setCollOperTreeCount(res?.count);
          const filterStatusVal = res?.collections?.filter(
            (filterStatus: any) => filterStatus?.status === "ACTIVE"
          );
          console.log("GetOperationTreeRes: ", res?.collections);
          setCollOperDetails(filterStatusVal);
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.log("Eror: ", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !getCollOperTreeLoading
      ) {
        setCurrentPage((prevPage) => prevPage + 5);
      }
    }
  };

  console.log("Tabs: ", tabs);

  const onSelectCurrentCollection = (collId: string) => {
    if (tabs.includes("Coll_" + collId)) {
      dispatch(setRemoveTabs("Coll_" + collId));
      return;
    }
    dispatch(setAddTabs("Coll_" + collId));
  };

  const onSelectCurrentOperation = (collId: string, operId: string) => {
    const collectionTab = "Operat_" + operId + "_" + collId;
    dispatch(setAddTabs(collectionTab));
  };

  console.log(tabs, "state.tabs");

  // useEffect(() => {
  //   if (currentEnvironment && currentStage) {
  //     let getOperationValues = {
  //       project_id: currentEnvironment,
  //       stage_id: currentStage,
  //     };
  //     dispatch(GetOperations(getOperationValues))
  //       .unwrap()
  //       .then((operRes: any) => {
  //         console.log(operRes, "operResoperRes");
  //         setCollOperVal(operRes);
  //       })
  //       .catch((error: any) => {
  //         console.log("Error: ", error);
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

  useEffect(() => {
    if (currentEnvironment && currentStage) {
      fetchPageData(currentPage);
      setIsLoading(false);
    } else {
      setCollOperDetails([]);
      setCollOperTreeCount(0);
    }
  }, [currentPage, currentEnvironment, currentStage]);

  useEffect(() => {
    if (currentEnvironment) {
      dispatch(GetAllStagesByProjectId(currentEnvironment));
    }
  }, [currentEnvironment]);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Grid container>
        <Grid item xs={7}>
          <GInput
            className="endpointSearch"
            fullWidth
            variant="standard"
            value="Endpoints"
            fontSize={endpointSearchClicked ? "" : "10px"}
            fontWeight={endpointSearchClicked ? "" : 600}
            color={
              endpointSearchClicked
                ? ""
                : `${theme.palette.v2SecondaryColor.main}`
            }
            endIcon={
              <SearchV2Icon
                stroke={theme.palette.v2PrimaryColor.main}
                style={{ cursor: "pointer" }}
                onClick={() => setEndpointSearchClicked((prev) => !prev)}
              />
            }
            disableUnderline={!endpointSearchClicked}
            disabledColor={theme.palette.v2SecondaryColor.main}
            disabled={!endpointSearchClicked}
            helperText={true}
          />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "baseline",
          }}
        >
          <Box>
            <GButton
              buttonType="Outlined"
              buttonShape="circular"
              label="Import"
              padding="0px"
              minWidth="35px"
            />
            <GButton
              buttonType="Outlined"
              buttonShape="circular"
              label="New"
              padding="0px"
              minWidth="35px"
              marginLeft="5px"
              disabled={currentEnvironment ? true : false}
              cursor={currentEnvironment ? "" : "pointer"}
            />
          </Box>
        </Grid>
      </Grid>
      <GDivider />
      <Box>
        <Box sx={{ marginTop: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // background: "#F1F5F9",
              // padding: "0px 2px",
            }}
          >
            <Box style={{ display: "flex" }}>
              {/* <SettingsV2Icon
                style={{
                  width: "13px",
                  height: "13px",
                  stroke: `${theme.palette.v2SecondaryColor.main}`,
                }}
              /> */}
              <SecondaryTextTypography
                style={{
                  fontFamily: "Inter-Regular ! important",
                  marginLeft: "3px",
                  fontSize: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: `${theme.palette.v2SecondaryColor.main}`,
                }}
                //   onClick={}
              >
                All Endpoints
              </SecondaryTextTypography>
            </Box>

            <Box sx={{ display: "flex", marginBottom: "4px" }}>
              {/* {iconList?.map((val: any, index: any) => (
                <Box
                  key={index}
                  sx={{ marginLeft: index !== 0 ? "10px" : "0px" }}
                >
                  {val?.icon}
                </Box>
              ))} */}
            </Box>
          </Box>
        </Box>
        <Box
          ref={containerRef}
          onScroll={handleScroll}
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            position: getCollOperTreeLoading ? "relative" : "none",
            "&::-webkit-scrollbar": {
              width: "1px", // Adjust the width of the scrollbar
            },
          }}
        >
          {<GlobalCircularLoader open={getCollOperTreeLoading} />}
          {collOperDetails?.length === 0 ? (
            <GAlertDetailBox
              label={
                "DRAG AND DROP THE ENDPOINT FILE OR CLICK NEW/IMPORT BUTTON"
              }
            />
          ) : (
            <>
              {collOperDetails
                // ?.filter((filterCollStatus: any) => filterCollStatus?.status === "ACTIVE")
                ?.map((val: any) => (
                  <div key={val?.id}>
                    <>
                      <Accordion
                        key={val?.collection_id}
                        sx={accordionCollectionStyles}
                        expanded={tabs.some((tab) =>
                          tab.includes(`Coll_${val.collection_id}`)
                        )}
                      >
                        <AccordionSummary
                          key={val?.collection_id}
                          style={{
                            marginTop: "-10px",
                            marginLeft: "-10px",
                            // maxHeight: "10px",
                            // overflowY: "auto",
                            // "&::-webkit-scrollbar": {
                            //   width: "2px", // Adjust the width of the scrollbar
                            // },
                          }}
                          sx={{
                            borderBottom: "none",
                            margin: "0px",
                            "& .MuiAccordionSummary-content": {
                              marginBottom: "0",
                            },
                            "& .MuiAccordionSummary-content.Mui-expanded": {
                              margin: "0px",
                            },
                          }}
                          onClick={() =>
                            onSelectCurrentCollection(val?.collection_id)
                          }
                        >
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: "5px 0px",
                              cursor: "pointer",
                            }}
                          >
                            {tabs.includes(`Coll_${val.collection_id}`) ? (
                              <RemoveCircleOutlineOutlinedIcon
                                style={{
                                  color: tabs.includes(
                                    `Coll_${val.collection_id}`
                                  )
                                    ? `${theme.palette.v2EndpointActiveColor.main}`
                                    : `${theme.palette.v2EndpointColor.main}`,
                                  stroke: tabs.includes(
                                    `Coll_${val.collection_id}`
                                  )
                                    ? `${theme.palette.v2EndpointActiveColor.main}`
                                    : `${theme.palette.v2EndpointColor.main}`,
                                  strokeWidth: tabs.includes(
                                    `Coll_${val.collection_id}`
                                  )
                                    ? "0.5"
                                    : "1",
                                  width: "13px",
                                  height: "13px",
                                  marginRight: "3px",
                                }}
                              />
                            ) : (
                              <AddCircleOutlineIcon
                                style={{
                                  color: tabs.includes(
                                    `Coll_${val.collection_id}`
                                  )
                                    ? `${theme.palette.v2EndpointActiveColor.main}`
                                    : `${theme.palette.v2EndpointColor.main}`,
                                  width: "13px",
                                  height: "13px",
                                  marginRight: "3px",
                                }}
                              />
                            )}
                            {val?.service_type === "JSON" ? (
                              <JsonIcon style={iconStyle} />
                            ) : val?.service_type === "SOAP" ? (
                              <SoapIcon style={iconStyle} />
                            ) : val?.service_type === "gRPC" ? (
                              <Image
                                src={GrpcImage}
                                alt=""
                                style={iconImageStyle}
                              />
                            ) : val?.service_type === "GraphQL" ? (
                              <Image
                                src={GraphQlImage}
                                alt=""
                                style={iconImageStyle}
                              />
                            ) : val?.service_type === "WEB SOCKET" ? (
                              <Image
                                src={WebImage}
                                alt=""
                                style={iconImageStyle}
                              />
                            ) : (
                              ""
                            )}
                            <SecondaryTextTypography
                              style={{
                                marginLeft: "3px",
                                fontSize: "10px",
                                maxWidth: "150px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                fontWeight: tabs.some((tab) =>
                                  tab.includes(`Coll_${val.collection_id}`)
                                )
                                  ? "600"
                                  : "",
                                color: tabs.some((tab) =>
                                  tab.includes(`Coll_${val.collection_id}`)
                                )
                                  ? `${theme.palette.v2EndpointActiveColor.main}`
                                  : `${theme.palette.v2EndpointColor.main}`,
                              }}
                            >
                              {val?.collection_name}{" "}
                            </SecondaryTextTypography>
                            <SecondaryTextTypography
                              style={{
                                fontSize: "9px",
                                // color: expanded.includes(val.collection_id)
                                //   ? `${theme.palette.v2EndpointActiveColor.main}`
                                //   : `${theme.palette.v2EndpointColor.main}`,
                                color: tabs.some((tab) =>
                                  tab.includes(`Coll_${val.collection_id}`)
                                )
                                  ? `${theme.palette.v2EndpointActiveColor.main}`
                                  : `${theme.palette.v2EndpointColor.main}`,
                              }}
                            >
                              {` (${val?.active_version})`}
                            </SecondaryTextTypography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            marginLeft: "-10px",
                            marginTop: "-10px",
                          }}
                          // sx={accordionDetailsStyles}
                        >
                          {val?.operations.map((operation: any) => (
                            <DraggableCard
                              key={operation?.operation_id}
                              id={operation?.operation_id}
                              name={operation?.operation_name}
                              http_method={operation?.http_method}
                              type="operations"
                              collection_id={val?.collection_id}
                              tabs={tabs}
                              onSelectCurrentOperation={
                                onSelectCurrentOperation
                              }
                            />
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  </div>
                ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Endpoints;
