"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import * as Y from "yjs";

import {
  clearResults,
  clearSingleApiData,
  FlowReducer,
  GetAllVerisons,
  GetApiDesignFlowByDesignFlowId,
  PublishVersion,
  setChangeHistroy,
  setCompiling,
  setCurrentUserFlowColor,
  setFlowYdoc,
  setGlobalKeys,
  setGlobalResponse,
  setIsEditable,
  setNextNode,
  setUserLists,
  setWSprovider,
} from "@/app/Redux/apiManagement/flowReducer";
import { RxGroup } from "react-icons/rx";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TerminalIcon from "@mui/icons-material/Terminal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ChatBubble, SaveAlt } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  extractPlaceholdersFromPath,
  generateUniqueNodeName,
  getRandomColor,
  setCookies,
  validatePlaceholders,
} from "@/app/Helpers/helpersFunctions";
import {
  GetOperationById,
  projectReducer,
} from "@/app/Redux/apiManagement/projectReducer";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import theme from "@/Theme/theme";
import {
  GetCollectionImportOperationTree,
  GetCollectionOperationTree,
} from "@/app/Redux/apiManagement/endpointReducer";
import WorkFlowLayout from "@/app/apiflow_components/WorkflowComponents/WorkFlowLayout";
import dynamic from "next/dynamic";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import GCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import WorkFlowHeaderSkeleton from "@/app/apiflow_components/skeletons/DesignerFlow/WorkFlowHeaderSkeleton";
import WorkflowDrawerSkeleton from "@/app/apiflow_components/skeletons/DesignerFlow/WorkflowDrawerSkeleton";
import WorkflowSidebarSkeleton from "@/app/apiflow_components/skeletons/DesignerFlow/WorkflowSidebarSkeleton";
import _ from "lodash";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import {
  Box,
  IconButton,
  Popover,
  Tooltip,
  TooltipProps,
  styled,
  tooltipClasses,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import ChangeHistoryDesigner from "@/app/apiflow_components/WorkflowComponents/ChangeHistoryDesigner";
import { useWebSocket } from "@/app/hooks/useWebSocket";
import UndoRedo from "@/app/apiflow_components/WorkflowComponents/UndoRedo";
import useRedoUndo from "@/app/hooks/workflow/useRedoUndo";
import Selecto from "react-selecto";
import useGroupNodes from "@/app/hooks/workflow/useGroupNodes";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import useSelectNodes from "@/app/hooks/workflow/useSelectNodes";
import useWorkflow from "@/app/hooks/workflow/useWorkflow";
import { usePathname } from "next/navigation";
import {
  edgeTypes,
  nodeTypes,
  runHandler,
} from "@/app/hooks/workflow/helperFunctions";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import GlobalContextMenu from "@/app/hooks/workflow/GlobalContextMenu";
import useWorkflowPost from "@/app/hooks/posts/useWorkflowPost";
import WorkflowPosts from "@/app/apiflow_components/WorkflowComponents/workflowPosts";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    // boxShadow: theme.shadows[1],
    fontFamily: "Inter-Regular",
    fontSize: 8,
    fontWeight: 600,
    marginTop: "0px",
  },
}));

const WorkflowHeader = dynamic(
  () => import("@/app/apiflow_components/WorkflowComponents/workflowHeader"),

  {
    loading: () => <WorkFlowHeaderSkeleton />,
  }
);

const WorkflowSidebar = dynamic(
  () => import("@/app/apiflow_components/WorkflowComponents/workflowSidebar"),
  {
    loading: () => <WorkflowSidebarSkeleton />,
  }
);

const WorkflowDrawer = dynamic(
  () => import("@/app/apiflow_components/WorkflowComponents/workflowDrawer"),
  {
    loading: () => <WorkflowDrawerSkeleton />,
  }
);

const GDialogBox = dynamic(() => import("@/app/Components/Global/GDialogBox"), {
  ssr: false,
});

const DesignerImportPopup = dynamic(
  () => import("@/app/ApiFlowComponents/ApiDesigner/DesignerImportPopup"),
  { ssr: false }
);

export const ItemTypes = {
  CARD: "card",
};

const WorkflowDesigner = (props: any) => {
  //-------------------------------------variable declarations-------------------------------------------
  const { recentlyModifiedProp } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<any>();

  const pathname = usePathname();
  const reactFlowWrapper = useRef(null);
  const mouseRef = useRef<any>(null);
  const { screenToFlowPosition, getViewport, getIntersectingNodes } =
    useReactFlow();

  const [apiFlow_Id, setWorkflowId] = useState<any>(null);

  // useEffect(() => {
  //   // Extracting the workflowId from the pathname
  //   const pathParts = pathname.split("/"); // Split the pathname by '/'

  //   // Assuming the structure is /userId/{userId}/workspaceId/{workspaceId}/workflow/{workflowId}
  //   const workflowIndex = pathParts.indexOf("workflow"); // Find the index of 'workflow'

  //   if (workflowIndex !== -1 && workflowIndex + 1 < pathParts.length) {
  //     setWorkflowId(pathParts[workflowIndex + 1]); // The next part will be the workflowId

  //   }
  // }, [pathname]);

  // Add secretKey to the connection headers

  //---------------------------useSelector---------------------------------------------------------------
  const {
    // loading,
    DesignFlowloading,
    compiling,
    globalKeys,
    isEditable,
    flowVersions,
    currentFlowDetails,
  } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  //-------------------------------useState----------------------------------------------------------------
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [apiFlowName, setApiFlowName] = useState("");
  const [userColor, setCurrentColor] = useState(getRandomColor());
  const [wWsProvider, setWWsProvider] = useState<any>(null);
  const [cursors, setCursors] = useState(new Map());
  const [versionValue, setVersionValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [updatedNodesNew, setUpdatedNodesNew] = useState<any>();
  const [updatedEdgesNew, setUpdatedEdgesNew] = useState<any>();
  const [changehistorySlider, setChangehistorySlider] = useState(false);
  const [Importopen, setImportOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any | null>(null);
  const [errorBoole, setErrorBoole] = useState<any>(false);
  const [SuccessMessages, setSuccessMessages] = useState<any>();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [hasNewEdited, setHasNewEdited] = useState(isEditable);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const [lastCursorPosition, setLastCursorPosition] = useState({ x: 0, y: 0 });

  //--------------------------------------custom Hooks---------------------------------------------------------

  const {
    settotalCounts,
    count,
    handleUndo,
    handleRedo,
    handleStoredNodeUpdate,
  } = useRedoUndo(ydoc, {
    edges,
    setEdges,
    nodes,
    setNodes,
  });
  const {
    storedNodes,
    setstoredNodes,
    nodeFunctions,
    copyClicked,
    setCopyClicked,
    resetWorkFlowState,
    copiedData,
    multiSelectClicked,
    setMultiSelectClicked,
  } = useWorkflowStore();

  const customHookprops = {
    setNodes,
    setEdges,
    count,
    setErrors,
    setHasNewEdited,
    versionValue,
    apiFlow_Id,
    nodes,
    onNodesChange,
    edges,
    lastCursorPosition,
    boxRef,
    settotalCounts,
    ydoc,
    wWsProvider,
    userColor,
  };

  const {
    actionProgress,
    userAction,
    setHasEdited,
    isValidConnection,
    onConnect,
    onDrop,
    handleNodeChange,
    onSaveHandler,
    saveFlow,
    handleSaveClosePopup,
    handlePublishPopup,
    handlePublishClosePopup,
    PublishSavePopup,
    PublishConfirmation,
    handleSavePopup,
  } = useWorkflow(customHookprops);

  // useSelectNodes(customHookprops);
  const { handlePasteNodes } = useSelectNodes(customHookprops);
  //--------------------------------------constants---------------------------------------------------------

  const open = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;

  //----------------------------------------functions------------------------------------------------
  const handleChageHistory = () => {
    dispatch(
      setChangeHistroy({
        nodes: nodes,
        edges: edges,
      })
    );
    setChangehistorySlider(true);
  };

  const handleCloseChageHistory = () => {
    setChangehistorySlider(false);
    dispatch(
      setChangeHistroy({
        nodes: [],
        edges: [],
      })
    );
  };

  const handleClick = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl2(null);
  };

  const handleClickOpen = () => {
    if (nodes.length === 1) {
      let updateData = {
        action: "USER_ACTION", // Action to perform
        flow_id: apiFlow_Id, // ID of the flow (ensure apiFlowId is defined and valid)
        status: "START", // Initial status
        type: "IMPORT",
        next_node: [], // Array to hold the next nodes, initially empty
        userAction: `${userProfile?.user?.email} initiated Import`, // User email initiating the run
        errors: [], // Array to track errors, initially empty
      };

      const runMap = ydoc?.getMap<any>("run");
      if (runMap) {
        runMap.set("run", updateData);
        setImportOpen(true);
        setErrorBoole(true);
      } else {
      }
    }
  };

  const handleImportClose = () => {
    let updateData = {
      action: "USER_ACTION", // Action to perform
      flow_id: apiFlow_Id, // ID of the flow (ensure apiFlowId is defined and valid)
      status: "COMPLETED", // Initial status
      type: "IMPORT",
      next_node: [], // Array to hold the next nodes, initially empty
      userAction: ``, // User email initiating the run
      errors: [], // Array to track errors, initially empty
    };
    const runMap = ydoc?.getMap<any>("run");
    if (runMap) {
      runMap.set("run", updateData);
      setImportOpen(false);
      setFileName("");
      setSuccessMessages("");
      setErrorBoole(false);
      setErrors([]);
    } else {
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];
    setFileName(file.name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFileContent(json);
          const jsonStringified = JSON.stringify(json, null, 2);
          toast.success("JSON file uploaded successfully");
        } catch (error) {
          console.error("Invalid JSON file:", error);
          toast.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileImports = () => {
    const file: any = fileContent;

    let requestData = {
      project_id: currentEnvironment,
      stage_id: currentStage,
      offsetStart: 0,
      offsetEnd: 1000,
    };

    dispatch(GetCollectionImportOperationTree(requestData))
      .unwrap()
      .then((res: any) => {
        const filterStatusVal: any = res?.collections?.filter(
          (filterStatus: any) => filterStatus?.status === "ACTIVE"
        );

        if (file) {
          try {
            const data: any = fileContent;

            // Basic validation to ensure nodes and edges are arrays
            if (!Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
              const errorMessage =
                'Invalid JSON structure: "nodes" and "edges" should be arrays';
              setErrors((prev) => [...prev, errorMessage]);
              setOpenDrawer(true);
              setSuccessMessages("");
              setErrorBoole(true);

              throw new Error(errorMessage);
            }

            // Prepare sets to check for duplicates
            const existingNodeIds = new Set(nodes.map((node: any) => node.id));
            const existingEdgeIds = new Set(edges.map((edge: any) => edge.id));
            const existingEdgeConnections = new Set(
              edges.map(
                (edge: any) =>
                  `${edge.source}-${edge.sourceHandle}-${edge.target}-${edge.targetHandle}`
              )
            );

            // Validate nodes
            const nodeNew = data.nodes
              .map((node: any) => {
                if (
                  existingNodeIds.has(node.id) &&
                  data.nodes.type === "operationNode"
                ) {
                  const errorMessage = `Node with ID ${node.id} already exists`;
                  setErrors((prev) => [...prev, errorMessage]);
                  setOpenDrawer(true);
                  setSuccessMessages("");
                  throw new Error(errorMessage);
                }

                if (node.type === "operationNode") {
                  // Validate operations_header
                  try {
                    const parsedData = JSON.parse(node.data);

                    const headers = parsedData.operations_header || [];
                    if (
                      !Array.isArray(headers) ||
                      !headers.every(
                        (header: any) =>
                          header.key &&
                          typeof header.key === "string" &&
                          header.value &&
                          typeof header.value === "string"
                      )
                    ) {
                      throw new Error("Invalid format for operations_header");
                    }

                    // Validate operations_query_param
                    const queryParams = parsedData.operations_query_param || [];
                    if (
                      !Array.isArray(queryParams) ||
                      !queryParams.every(
                        (param: any) =>
                          param.key &&
                          typeof param.key === "string" &&
                          param.value &&
                          typeof param.value === "string" &&
                          param.scope &&
                          typeof param.scope === "string"
                      )
                    ) {
                      throw new Error(
                        "Invalid format for operations_query_param"
                      );
                    }

                    // Check if the operation name matches any in operationLists
                    const operationName = parsedData.name;

                    let operationExists = false;
                    let operationId: string | null = null;
                    let method: string | null = null;
                    let methodName: string | null = null;
                    filterStatusVal?.forEach((item: any) => {
                      const matchingOperation = item.operations.some(
                        (operation: any) =>
                          operation.operation_name === operationName
                      );

                      if (matchingOperation) {
                        operationExists = true;
                        operationId = matchingOperation.operation_id;
                        method = matchingOperation.method;
                        methodName = matchingOperation.methodName;
                      }
                    });

                    if (!operationExists) {
                      const errorMessage = `Operation name "${operationName}" does not exist in the list of operations`;
                      setErrors((prev) => [...prev, errorMessage]);
                      setOpenDrawer(true);
                      setSuccessMessages("");
                      setErrorBoole(true);

                      throw new Error(errorMessage);
                    }

                    let matchedPaths = extractPlaceholdersFromPath(
                      methodName || ""
                    );
                    let node_name = generateUniqueNodeName();
                    let parsedNodeData = JSON?.parse(node?.data);
                    parsedNodeData.operation_id = operationId;
                    parsedNodeData.method = operationId;
                    parsedNodeData.node_name = node_name;
                    let queryParams_new =
                      parsedNodeData?.operations_query_param ?? [];

                    for (let params of matchedPaths) {
                      // Ensure params is a valid value
                      if (params) {
                        // Filter the existing queryParams to exclude those that match the current param and have scope "path"

                        // Check if the parameter already exists in the updatedData
                        const paramExists = queryParams_new?.some(
                          (x: any) => x?.name === params && x?.scope === "path"
                        );

                        // If the parameter doesn't exist with scope "path", add or update it
                        if (!paramExists) {
                          queryParams_new = [
                            ...queryParams_new,
                            {
                              name: params,
                              test_value: "",
                              scope: "path",
                              data_type: "string",
                            },
                          ];
                        }
                      }
                    }
                    parsedNodeData.operations_query_param = queryParams_new;
                    let stringifiedData = JSON?.stringify(parsedNodeData);

                    return {
                      id: node.id,
                      name: node_name,
                      type: node.type,
                      data: stringifiedData, // Ensure data is an object
                      position: node.position,
                      positionAbsolute: node.positionAbsolute,
                      width: 230,
                      height: 120,
                      is_active: true,
                      flow_id: apiFlow_Id,
                      status: "ACTIVE",
                      selected: false,
                      dragging: false,
                      response: null,
                      version: versionValue,
                      created_by: userProfile.user.user_id,
                    };
                  } catch (err: any) {
                    const errorMessage = `Invalid data format in node ID ${node.id}: ${err.message}`;
                    setErrors((prev) => [...prev, errorMessage]);
                    setOpenDrawer(true);
                    setSuccessMessages("");
                    setErrorBoole(true);

                    throw new Error(errorMessage);
                  }
                }
                return null; // Handle other node types or invalid nodes
              })
              .filter(Boolean); // Filter out null values

            // Validate edges
            const edgeNew = data.edges.map((edge: any) => {
              if (existingEdgeIds.has(edge.id)) {
                const errorMessage = `Edge with ID ${edge.id} already exists`;
                setErrors((prev) => [...prev, errorMessage]);
                setOpenDrawer(true);
                setSuccessMessages("");
                throw new Error(errorMessage);
              }

              // Validate the connection using the isValidConnection function
              if (
                !isValidConnection({
                  source: edge.source,
                  target: edge.target,
                  sourceHandle: edge.sourceHandle,
                  targetHandle: edge.targetHandle,
                })
              ) {
                const errorMessage = `Invalid connection between ${edge.source} and ${edge.target}`;
                setErrors((prev) => [...prev, errorMessage]);
                setOpenDrawer(true);
                setSuccessMessages("");
                setErrorBoole(true);

                throw new Error(errorMessage);
              }

              // Check for duplicate edge connections
              const edgeConnection = `${edge.source}-${edge.sourceHandle}-${edge.target}-${edge.targetHandle}`;
              if (existingEdgeConnections.has(edgeConnection)) {
                const errorMessage = `Duplicate edge connection found: ${edgeConnection}`;
                setErrors((prev) => [...prev, errorMessage]);
                setOpenDrawer(true);
                setSuccessMessages("");
                throw new Error(errorMessage);
              }

              // Set color based on sourceHandle condition
              const edgeColor = edge.sourceHandle?.endsWith("_success")
                ? // ? "#4CAF50"
                  // "#4CAF50" // Color for success
                  "#55CCFF" // Color for success
                : // Color for success
                  // : "#FF5722"; // Color for other cases
                  // "#4CAF50";
                  "#55CCFF";

              const source = edge.source?.endsWith("_start")
                ? nodes[0]?.id // Color for success
                : edge.source; // Color for other cases

              const sourceHandle = edge.source?.endsWith("_start")
                ? nodes[0]?.id + "_" + "startHandle" // Color for success
                : edge.sourceHandle;

              return {
                id: edge.id,
                name: edge?.name ?? "",
                source: source,
                target: edge.target,
                sourceHandle: sourceHandle,
                targetHandle: edge.targetHandle,
                animated: edge.animated,
                style: {
                  stroke: edgeColor,
                },
                status: "ACTIVE",
                is_active: true,
                flow_id: apiFlow_Id,
                version: versionValue,
                created_by: userProfile.user.user_id,
                type: "buttonEdge",
              };
            });
            setUpdatedNodesNew(nodeNew);
            setUpdatedEdgesNew(edgeNew);

            // Uncomment the line below once validated
            // setElements([...nodes, ...nodeNew, ...edges, ...edgeNew]);

            toast.success("Valid JSON File");
            setOpenDrawer(true);
            setSuccessMessages("Valid JSON File");
            setErrorBoole(false);
            setErrors([]);
          } catch (err) {
            console.error("Error parsing JSON data:", err);
          }
        }
      })
      .catch((error: any) => {});
  };

  const handleSaveImportData = () => {
    console.log(updatedNodesNew, "updatedNodesNew");
    updatedNodesNew.forEach((newNode: any) => {
      let updatedNode = {
        action: "ADD_NODE",
        status: "null",
        flow_id: apiFlow_Id,
        id: newNode?.id,
        nodes: newNode,
      };

      const nodeMap = ydoc?.getMap<any>("nodes");
      if (nodeMap) {
        nodeMap.set(updatedNode?.id, updatedNode);
      }
    });

    updatedEdgesNew.forEach((newEdge: any) => {
      let updatedEdge = {
        action: "ADD_EDGES",
        status: "null",
        flow_id: apiFlow_Id,
        id: newEdge?.id,
        edges: newEdge,
      };

      const nodeMap = ydoc?.getMap<any>("edges");
      if (nodeMap) {
        nodeMap.set(updatedEdge?.id, updatedEdge);
      }
    });
    toast.success("Json Imported");
    handleImportClose();
  };

  const dropContainer1 = useRef<HTMLDivElement>(null);
  const { dropItem } = useGlobalStore();

  const { selectedFlowIds, addFlowId } = useWorkflowStore();

  useEffect(() => {
    if (dropItem?.id && currentFlowDetails?.project_id) {
      dispatch(
        GetOperationById({
          operation_id: dropItem?.id,
          project_id: currentFlowDetails?.project_id,
        })
      )
        .unwrap()
        .then((operationRes: any) => {
          // setFullUrl(operationRes?.[0]?.full_url);
        })
        .catch((error: any) => {});
    }
  }, [dropItem?.id, currentFlowDetails?.project_id]);

  const validateNodes = (
    nodesArray: any,
    edgesArray: any,
    globalKeysArray: any
  ) => {
    const errors = [];

    // Validate nodes
    for (const node of nodesArray) {
      if (node.data) {
        const nodeData = JSON.parse(node.data);

        // Validate headers
        const headers = nodeData?.operations_header || [];
        for (const header of headers) {
          if (!header.name?.trim()) {
            errors.push(
              `In ${nodeData.node_name} Header name is missing or empty.`
            );
          }
          if (!header.test_value?.trim()) {
            errors.push(
              `In ${nodeData.node_name} Header test_value is missing or empty.`
            );
          } else if (!validatePlaceholders(header.test_value)) {
            errors.push(
              `In ${nodeData.node_name} Invalid placeholder in header: ${header.test_value}`
            );
          }
        }

        // Validate query parameters
        const queryParams = nodeData?.operations_query_param || [];
        for (const input of queryParams) {
          if (!input.name?.trim()) {
            errors.push(
              `In ${nodeData.node_name} Query parameter name is missing or empty.`
            );
          }
          if (!input.test_value?.trim()) {
            errors.push(
              `In ${nodeData.node_name} Query parameter test_value is missing or empty.`
            );
          } else if (!validatePlaceholders(input.test_value)) {
            errors.push(
              `In ${nodeData.node_name} Invalid placeholder in query parameter: ${input.test_value}`
            );
          }
        }

        // Validate raw_payload
        if (nodeData.raw_payload) {
          try {
            if (
              nodeData?.raw_payload &&
              typeof nodeData.raw_payload === "string"
            ) {
              JSON.parse(nodeData.raw_payload);
            }
          } catch (error: any) {
            errors.push(
              `In ${nodeData.node_name} Input JSON format is invalid. Error: ${error?.message}`
            );
            // Handle the error appropriately, e.g., show an error message to the user
          }
        }
      }
    }

    // Validate globalKeysArray
    for (const key of globalKeysArray) {
      if (key.body_include == true) {
        if (!key.body_key?.trim()) {
          errors.push(
            `${key.node_name} Global key body_key is missing or empty.`
          );
        }
      }

      if (!key.key_name?.trim()) {
        errors.push(`${key.node_name} Global name field is missing or empty.`);
      }

      if (!key.request_template?.trim()) {
        errors.push(`${key.node_name} Global value field is missing or empty.`);
      }

      if (key.include === true) {
        if (!key.header_key?.trim()) {
          errors.push(`${key.node_name} header_key field is missing or empty.`);
        }

        if (!key.prefix_value?.trim()) {
          errors.push(
            `${key.node_name} prefix_value field is missing or empty.`
          );
        }
      }
    }

    return errors;
  };

  const onRun = async () => {
    // localStorage.setItem(flowKey, JSON.stringify(flow));

    // Create update data with initial values
    let updateData = {
      action: "RUN", // Action to perform
      flow_id: apiFlow_Id, // ID of the flow (ensure apiFlowId is defined and valid)
      status: "START", // Initial status
      next_node: [], // Array to hold the next nodes, initially empty
      userAction: `${userProfile?.user?.email} initiated Run`, // User email initiating the run
      errors: [], // Array to track errors, initially empty
    };

    // setCompiling(true);
    dispatch(setCompiling(true));

    const nodesData = nodes || [];
    const edgesData = edges || [];
    const GlobeArrayData = globalKeys || [];

    const errors: string[] = validateNodes(
      nodesData,
      edgesData,
      GlobeArrayData
    );

    if (errors.length > 0) {
      setErrors(errors);

      const errorMap = ydoc?.getMap<any>("errors");
      if (errorMap) {
        errorMap.set("errors", errors);
      }
      // setCompiling(false);
      dispatch(setCompiling(false));
    }

    // Validate nodes and collect errors
    else {
      setErrors([]);

      const errorMap = ydoc?.getMap<any>("errors");
      if (errorMap) {
        errorMap.set("errors", []);
      }
      dispatch(setCompiling(false));

      const runMap = ydoc?.getMap<any>("run");
      if (runMap) {
        runMap.set("run", updateData);
        await runHandler(
          ydoc,
          nodes,
          edges,
          userProfile?.user.tenant_id,
          apiFlow_Id,
          currentFlowDetails?.project_id,
          currentWorkspace ? currentWorkspace?.id : ""
        );
      } else {
      }
    }
  };

  const onPublishHandler = () => {
    onSaveHandler();
    const runMap = ydoc?.getMap<any>("run");
    let updateData = {
      action: "USER_ACTION",
      flow_id: apiFlow_Id,
      status: "STARTED",
      type: "PUBLISH",
      next_node: [],
      userAction: `${userProfile?.user?.email} initiated Publish`,
      errors: [], // Added field for errors
    };

    if (runMap) {
      runMap.set("run", updateData);
      dispatch(
        PublishVersion({
          flow_id: apiFlow_Id,
          project_id: currentFlowDetails?.project_id,
        })
      )
        .unwrap()
        .then((res: any) => {
          let updateData = {
            action: "USER_ACTION",
            flow_id: apiFlow_Id,
            status: "COMPLETED",
            type: "PUBLISH",
            next_node: [],
            userAction: ``,
            errors: [], // Added field for errors
          };
          runMap.set("run", updateData);
          dispatch(
            GetAllVerisons({
              flow_id: apiFlow_Id,
              project_id: currentFlowDetails?.project_id,
            })
          )
            .unwrap()
            .then((res: any) => {
              const activeVersion = res.find(
                (version: any) => version.is_active === true
              );

              if (activeVersion) {
                setVersionValue(activeVersion.id);
                sessionStorage.setItem("versionValue", activeVersion.id);
                setCookies(
                  process.env.NEXT_PUBLIC_COOKIE_VERSIONVALUE ?? "",
                  activeVersion.id,
                  userProfile?.user?.expiration_time
                );
              } else {
                // Handle the case where no active version is found
              }
            });
          toast.success("Published");
          handlePublishClosePopup();
        })
        .catch((err: any) => {
          let updateData = {
            action: "USER_ACTION",
            flow_id: apiFlow_Id,
            status: "STOPPED",
            type: "PUBLISH",
            next_node: [],
            userAction: ``,
            errors: [], // Added field for errors
          };
          runMap.set("run", updateData);
        });
    }
  };

  const exportToJson = () => {
    // Parse nodes data
    // const parsedNodes = nodes.map((node) => ({
    //   id: node.id,
    //   type: node.type,
    //   label: node.data.label,
    //   position: node.position,
    //   // Add more fields as needed
    // }));

    const data = {
      nodes: nodes,
      edges: edges,
    };

    // Convert data to JSON string
    const json = JSON.stringify(data, null, 2);

    // Create a Blob from the JSON string
    const blob = new Blob([json], { type: "application/json" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "flow-data.json";

    // Append link to the body and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const handleEditClick = () => {
    setHasEdited(true); // Mark the data as edited
    dispatch(setIsEditable(!isEditable)); // Toggle isEditable state
    setHasNewEdited(!isEditable); // Store whether the current state was editable
  };

  //----------------------------------------buttonconfig----------------------------------------------
  const buttonConfig = [
    {
      onClick: handlePublishPopup,
      ariaLabel: "Publish Version",
      tooltipTitle: "Publish Version",
      IconComponent: PublishOutlinedIcon,
      // sx: { marginLeft: "auto" }, // Add margin-left style here
      isActive: false,
      disabled: isEditable || actionProgress,
      dropDown: "false",
    },
    {
      onClick: handleChageHistory,
      ariaLabel: "Manage History",
      tooltipTitle: "Manage History",
      IconComponent: ManageHistoryIcon,
      isActive: false,
      disabled: false,
      dropDown: "false",
    },
    {
      // onClick: () => navigate(`${pathname}/scheduleRuns`),
      onClick: () => "",
      ariaLabel: "Schedule Runs",
      tooltipTitle: "Schedule Runs",
      IconComponent: ScheduleSendIcon,
      isActive: false,
      disabled: false,
      dropDown: "false",
    },

    {
      onClick: handleClickOpen,
      ariaLabel: "Import",
      tooltipTitle: "Import",
      IconComponent: ImportExportIcon,
      isActive: false,
      // isActive: false,
      //  disabled: nodes?.length !== 1 || actionProgress,
      dropDown: "false",
    },
    {
      onClick: exportToJson,
      ariaLabel: "Export",
      tooltipTitle: "Export",
      IconComponent: FileUploadIcon,
      isActive: false,
      disabled: actionProgress,
      dropDown: "false",
    },

    {
      onClick: handleEditClick,
      ariaLabel: "Edit",
      tooltipTitle: "Edit",
      IconComponent: EditIcon,
      isActive: isEditable,
      disabled: actionProgress,
      dropDown: "true",
    },
    isEditable && {
      onClick: () => setMultiSelectClicked(!multiSelectClicked),
      ariaLabel: "Multi-Select",
      tooltipTitle: "Multi-Select",
      IconComponent: RxGroup,
      isActive: multiSelectClicked,
      disabled: actionProgress,
      dropDown: "true",
    },
    {
      onClick: () => setOpenDrawer(!openDrawer),
      ariaLabel: "Open Terminal",
      tooltipTitle: "Open Terminal",
      IconComponent: TerminalIcon,
      badgeContent: errors?.length,
      isActive: openDrawer,
      dropDown: "true",
    },

    {
      onClick: onRun,
      ariaLabel: "Run",
      tooltipTitle: "Run",
      IconComponent: PlayArrowIcon,
      isActive: false,
      disabled: actionProgress,
      dropDown: "true",
    },

    {
      onClick: handleSavePopup,
      ariaLabel: "Save",
      tooltipTitle: "Save",
      IconComponent: SaveAlt,
      isActive: false,
      disabled: actionProgress,
      dropDown: "true",
    },
  ];
  const { getWsProvider } = useWebSocket();
  // -----------------------------------------useEffect-------------------------------------------------------

  useEffect(() => {
    // Extracting the workflowId from the pathname
    const pathParts = pathname.split("/"); // Split the pathname by '/'

    // Assuming the structure is /userId/{userId}/workspaceId/{workspaceId}/workflow/{workflowId}
    const workflowIndex = pathParts.indexOf("workflow"); // Find the index of 'workflow'

    if (workflowIndex !== -1 && workflowIndex + 1 < pathParts.length) {
      setWorkflowId(pathParts[workflowIndex + 1]); // The next part will be the workflowId
      resetWorkFlowState("copiedData");
      // resetWorkFlowState("selectedFlowIds");
    }
  }, [pathname]);

  useEffect(() => {
    if (versionValue && apiFlow_Id && userProfile.user.tenant_id) {
      setNodes([]);
      setEdges([]);
      const ydoc = new Y.Doc();
      const wsProvider = getWsProvider(
        userProfile.user.tenant_id,
        apiFlow_Id,
        versionValue,
        ydoc
      );
      //   new WebsocketProvider(
      //   websocketUrl,
      //   `${userProfile.user.tenant_id}_${apiFlow_Id}_${versionValue}`,
      //   ydoc
      // );

      setYdoc(ydoc);
      dispatch(setFlowYdoc(ydoc));
      setWSprovider(wsProvider);
      setWWsProvider(wsProvider);
      dispatch(setWSprovider(wsProvider));

      wsProvider.on("status", (event: any) => {
        // logs "connected" or "disconnected"
      });

      const awareness = wsProvider?.awareness;

      awareness?.on("change", () => {
        dispatch(setUserLists(Array.from(awareness.getStates().values())));
        const newCursors = new Map();
        awareness.getStates().forEach((state: any, clientId: any) => {
          if (state.dragging?.dragging) {
            // Handle dragging state if needed
          }
          newCursors.set(clientId, {
            ...state.cursor,
            ...state.user,
            ...state.dragging,
          });
        });
        setCursors(newCursors);
      });

      awareness?.setLocalStateField("user", {
        name: userProfile?.user.email,
        color: userColor,
      });

      return () => {
        ydoc.destroy();
        wsProvider.disconnect();
      };
    }

    // Return an empty cleanup function if no WebSocket provider is initialized
    return () => {};
  }, [versionValue, pathname]);

  useEffect(() => {
    if (apiFlow_Id && userProfile?.user?.user_id) {
      dispatch(GetApiDesignFlowByDesignFlowId(apiFlow_Id))
        .unwrap()
        .then((res: any) => {
          setApiFlowName(res.name);

          dispatch(
            GetAllVerisons({ flow_id: apiFlow_Id, project_id: res.project_id })
          )
            .unwrap()
            .then((res: any) => {
              const activeVersion = res.find(
                (version: any) => version.is_active === true
              );

              if (activeVersion) {
                setVersionValue(activeVersion.id);
                sessionStorage.setItem("versionValue", activeVersion.id);
                setCookies(
                  process.env.NEXT_PUBLIC_COOKIE_VERSIONVALUE ?? "",
                  activeVersion.id,
                  userProfile?.user?.expiration_time
                );
              } else {
                // Handle the case where no active version is found
              }
            });
        })

        .catch((error: any) => {
          console.error("GetApiDesignFlowByDesignFlowId error:", error);
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }, [apiFlow_Id, userProfile.user.tenant_id, userProfile?.user?.user_id]);

  useEffect(() => {
    return () => {
      dispatch(clearResults({}));
      dispatch(setNextNode("null"));
      dispatch(setUserLists([]));
      dispatch(clearSingleApiData({}));
      dispatch(setFlowYdoc(null));
      dispatch(setGlobalKeys([]));
      dispatch(setGlobalResponse({}));
      dispatch(setWSprovider(null));
      dispatch(setCurrentUserFlowColor(""));
      dispatch(setIsEditable(false));
      sessionStorage.removeItem("versionValue");
    };
  }, []);

  // let lastFrameTime = performance.now();
  // let frameCount = 0;

  // function measureFPS() {
  //   const now = performance.now();
  //   const delta = now - lastFrameTime;
  //   lastFrameTime = now;
  //   frameCount++;

  //   if (delta > 1000) {
  //     // Log FPS every second
  //     frameCount = 0;
  //   }
  //   requestAnimationFrame(measureFPS);
  // }

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // useEffect(() => {
  //   measureFPS();
  // }, []);

  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    if (!rfInstance) return; // Ensure rfInstance is available

    // Convert mouse position to flow coordinates
    const position = rfInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    if (position) {
      setTooltipPosition({
        x: position.x,
        y: position.y,
      });
    }
  };

  React.useEffect(() => {
    if (!ydoc) return; // If ydoc is null, exit early

    const cursorsMap = ydoc.getMap("cursors");

    const updateCursors = () => {
      const updatedCursors = new Map();
      cursorsMap.forEach((value, key) => {
        updatedCursors.set(key, value);
      });
      setCursors(updatedCursors);
    };

    // Attach Yjs event listeners
    cursorsMap.observe(updateCursors);

    // Clean up the listener on component unmount
    return () => {
      cursorsMap.unobserve(updateCursors);
    };
  }, [ydoc]);

  const viewport = rfInstance?.getViewport();

  const { onDragEnd, onDragStart } = useGroupNodes({
    nodes,
    setNodes,
    getIntersectingNodes,
  });

  const handleCanvasClick = (event: React.MouseEvent) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setLastCursorPosition(position);
  };

  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  const reactFlowWrapperMenu = useRef<any>();

  const handleContextMenuPaste = (e: any) => {
    handlePasteNodes(e);
    closeContextMenuHandler();
  };

  const menuItems = [
    {
      id: 0,
      label: "Paste Here",
      // onclick: handleContextMenuPaste(),
    },
  ];

  const openContextMenuHandler = (e: any) => {
    if (!isEditable && copiedData?.nodes?.length === 0) return;

    e.preventDefault();
    const wrapperBounds =
      reactFlowWrapperMenu?.current?.getBoundingClientRect();
    // const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
    const position = {
      x: e.clientX - wrapperBounds?.left,
      y: e.clientY - wrapperBounds?.top,
    };
    setContextMenu({ show: true, x: position?.x, y: position?.y });
  };

  const closeContextMenuHandler = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };
  const { openPosts, setopenPostAnchorEl, openPostAnchorEl } =
    useWorkflowPost();

  return (
    <Grid
      ref={boxRef}
      sx={{
        height: { lg: "97vh", md: "100vh", sm: "auto" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
        position: "relative",
      }}
      size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
    >
      <WorkFlowLayout>
        <Grid container sx={{ position: "relative", height: "100%" }}>
          <GCircularLoader
            open={DesignFlowloading}
            style={{ position: "absolute" }}
          />
          {/* {DesignFlowloading && (
            <GCircularLoader isBackdrop={true} borderRadius="15px" />
          )} */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <WorkflowHeader
              recentlyModifiedProp={recentlyModifiedProp}
              apiFlowName={apiFlowName}
              buttonConfig={buttonConfig}
              flowVersions={flowVersions}
              versionValue={versionValue}
              setVersionValue={(value: any) => {
                setVersionValue(value);
                sessionStorage.setItem("versionValue", value);
                dispatch(setFlowYdoc(null));
                setYdoc(null);
                setCookies(
                  process.env.NEXT_PUBLIC_COOKIE_VERSIONVALUE ?? "",
                  value,
                  userProfile?.user?.expiration_time
                );
              }} // Ensure you pass the correct component
              isEditable={isEditable}
              theme={theme} // Ensure you pass the correct theme
              userAction={userAction}
            />
          </Grid>
          <Grid
            ref={reactFlowWrapperMenu}
            onContextMenu={openContextMenuHandler}
            sx={{
              // padding: "10px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "85vh",
            }}
            size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            // size={{ xs: 12, sm: 12, md: 7.7, lg: 8.7, xl: 8.6 }}
          >
            <div
              className="position-relative"
              ref={mouseRef}
              // onMouseMove={(event: any) => {
              //   if (mouseRef.current) {
              //     const rect = mouseRef.current.getBoundingClientRect();
              //     const offsetX = event.clientX - rect.left;
              //     const offsetY = event.clientY - rect.top;

              //     const position = { x: offsetX, y: offsetY };

              //     const awareness = wWsProvider?.awareness;
              //     awareness?.setLocalStateField("cursor", position);
              //   }
              // }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Grid
                container
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  {/* {operationByIdLoading && (
                    <GCircularLoader
                      open={operationByIdLoading}
                      isBackdrop={true}
                    />
                  )} */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    // style={{
                    //   width: "100%",
                    //   height: recentlyModifiedProp === true ? "20vh" : "80vh",
                    // }}
                    ref={dropContainer1}
                    onClick={handleCanvasClick}
                  >
                    {isEditable && multiSelectClicked && (
                      <Selecto
                        container={(document as any).getElementById(
                          "react-flow-container"
                        )}
                        selectableTargets={[".react-flow__node"]}
                        selectByClick={false}
                        selectFromInside={false}
                        continueSelect={false}
                        toggleContinueSelect={"shift"}
                        hitRate={0}
                        onSelect={(e) => {
                          const selectedIds = e.selected.map((el) =>
                            el.getAttribute("data-id")
                          );
                        }}
                        onSelectEnd={(e) => {
                          const selectedIds = e.selected.map((el) =>
                            el.getAttribute("data-id")
                          );
                          if (selectedIds.length > 0) {
                            selectedIds.forEach((id) => {
                              if (!selectedFlowIds.includes(id)) {
                                addFlowId(id);
                              }
                            });
                          }
                        }}
                      />
                    )}

                    <ReactFlow
                      id="react-flow-container"
                      className="position-relative"
                      onDrop={onDrop}
                      ref={reactFlowWrapper}
                      elementsSelectable={true}
                      nodes={nodes}
                      onDragOver={onDragOver}
                      edges={edges}
                      nodesConnectable={isEditable}
                      nodesDraggable={isEditable}
                      onNodesChange={(data) => {
                        handleNodeChange(
                          data,
                          nodes,
                          ydoc,
                          wWsProvider,
                          userProfile,
                          userColor
                        );

                        const deletedNodes = data.filter(
                          (change) => change.type === "remove"
                        );
                        if (deletedNodes.length > 0) {
                          const updatedCursors = new Map(cursors);
                          deletedNodes.forEach((node) => {
                            updatedCursors.delete(node.id);
                          });
                          setCursors(updatedCursors);
                        }
                      }}
                      onMouseMove={handleMouseMove} // Track mouse movement
                      onEdgesChange={(event) => {
                        onEdgesChange(event);
                      }}
                      onConnect={onConnect}
                      nodeTypes={nodeTypes}
                      edgeTypes={edgeTypes}
                      onInit={setRfInstance}
                      fitViewOptions={{ padding: 700 }}
                      proOptions={{ hideAttribution: true }}
                      maxZoom={3.5}
                      minZoom={0.2}
                      onNodeDrag={(event, dragNode) => {
                        onDragStart(event, dragNode);
                      }}
                      onNodeDragStop={(event, dragNode) => {
                        if (isEditable && !nodeFunctions.id) {
                          handleStoredNodeUpdate();
                        }
                        onDragEnd(event, dragNode);
                      }}
                    >
                      {Array.from(cursors?.entries()).map(
                        ([clientId, cursorPosition]) => {
                          const viewport = rfInstance?.getViewport() || {
                            zoom: 1,
                            x: 0,
                            y: 0,
                          };

                          // Adjust the scaling factor based on the zoom level
                          // Use scale = 1 for normal zoom, increase it for zoom in, and decrease it for zoom out
                          const scale =
                            viewport.zoom > 1 ? 2 : viewport.zoom < 1 ? 0.5 : 1;

                          // Adjust both cursor and tooltip position equally based on zoom and scaling factor
                          const adjustedX =
                            (cursorPosition.x - viewport.x) *
                              (scale / viewport.zoom) +
                            viewport.x;
                          const adjustedY =
                            (cursorPosition.y - viewport.y) *
                              (scale / viewport.zoom) +
                            viewport.y;

                          return userProfile?.user.email ===
                            cursorPosition?.name ? (
                            <></>
                          ) : (
                            <div
                              key={clientId}
                              style={{
                                position: "absolute",
                                transform: `translate(${adjustedX}px, ${adjustedY}px)`,
                                pointerEvents: "none",
                              }}
                            >
                              <LightTooltip
                                title={cursorPosition?.name}
                                open={true}
                                PopperProps={{
                                  disablePortal: true,
                                }}
                              >
                                <NavigationIcon
                                  sx={{
                                    fill: cursorPosition?.color,
                                    transform: "rotate(-15deg)",
                                  }}
                                />
                              </LightTooltip>
                            </div>
                          );
                        }
                      )}
                    </ReactFlow>
                  </div>
                </Grid>
              </Grid>
            </div>
            <Box
              sx={{
                position: "absolute",
                right: 1,
                zIndex: 1,
                width: 350,
              }}
            >
              <WorkflowSidebar
                project_id={currentFlowDetails?.project_id}
                recentlyModifiedProp={recentlyModifiedProp}
              />
            </Box>
          </Grid>

          {contextMenu?.show && isEditable && copiedData?.nodes?.length > 0 && (
            <GlobalContextMenu
              x={contextMenu?.x}
              y={contextMenu?.y}
              // onCloseContextMenu={closeContextMenuHandler}
              parentRef={reactFlowWrapperMenu}
            >
              <div className="flex flex-col gap-2">
                {menuItems.map((item: any) => (
                  <div
                    key={item?.id}
                    style={{
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={(e?: any) => {
                      // item.onclick();
                      handleContextMenuPaste(e);
                      // closeContextMenuHandler();
                    }}
                  >
                    {item?.label}
                  </div>
                ))}
              </div>
            </GlobalContextMenu>
          )}

          <UndoRedo
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            isHeightIncreased={openDrawer}
            visible={isEditable}
            undoDisabled={storedNodes.length == 1 || count == 0}
            redoDisabled={count == storedNodes?.length - 1}
          />
          <WorkflowDrawer
            containerRef={mouseRef}
            openDrawer={recentlyModifiedProp === true ? false : openDrawer}
            setOpenDrawer={setOpenDrawer}
            errors={errors}
            compiling={compiling}
            SuccessMessages={SuccessMessages}
          />
          <ChangeHistoryDesigner
            openChangeHistory={changehistorySlider}
            flowId={apiFlow_Id}
            versionId={versionValue}
            onCloseChangeHistory={handleCloseChageHistory}
            project_id={currentEnvironment}
          />
        </Grid>

        {(saveFlow || (PublishConfirmation && PublishSavePopup)) && (
          <GDialogBox
            parentRef={mouseRef}
            openVal={PublishConfirmation ? PublishSavePopup : saveFlow}
            dialogContentText={
              PublishConfirmation
                ? "Do you want to Publish?"
                : "Do you want to save?"
            }
            confirmVal="Confirm"
            cancelVal="Cancel"
            onClickConfirmHandler={
              PublishConfirmation ? onPublishHandler : onSaveHandler
            }
            onClickCancelHandler={
              PublishConfirmation
                ? handlePublishClosePopup
                : handleSaveClosePopup
            }
          />
        )}

        <DesignerImportPopup
          PopupOpen={Importopen}
          PopupClose={handleImportClose}
          fileChange={handleFileChange}
          dataImport={handleFileImports}
          dataSave={handleSaveImportData}
          fileData={fileName}
          errorBoole={errorBoole}
        />
      </WorkFlowLayout>
      {/* <IconButton
        aria-owns={apiFlow_Id}
        aria-haspopup={true}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setopenPostAnchorEl(event.currentTarget);
        }}
        sx={{
          position: "absolute",
          right: 20,
          bottom: 20,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgb(155, 83, 176) 0%, rgb(122, 67, 254) 100%)",
          color: "white",
        }}
      >
        <ChatBubble />
      </IconButton>
      <Popover
        id={apiFlow_Id}
        open={openPosts}
        anchorEl={openPostAnchorEl || null}
        onClose={() => {
          setopenPostAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            padding: "10px",
          },
        }}
      >
        <WorkflowPosts />
      </Popover> */}
    </Grid>
  );
};

const MemoizedWorkFlowDesigner = memo(WorkflowDesigner);

export default (props: any) => (
  <ReactFlowProvider>
    <MemoizedWorkFlowDesigner {...props} />
  </ReactFlowProvider>
);
