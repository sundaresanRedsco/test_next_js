"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import WorkflowHeader from "@/app/apiflow_components/WorkflowComponents/workflowHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import Draggable from "react-draggable";

import {
  clearResults,
  clearSingleApiData,
  CreateGlobalKeys,
  FlowReducer,
  GetAllVerisons,
  GetApiDesignFlowByDesignFlowId,
  GetDesignApiFlow,
  GetGlobalKeys,
  PostRecentModification,
  PublishVersion,
  SaveFlowHandler,
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
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TerminalIcon from "@mui/icons-material/Terminal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { SaveAlt } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
// import WorkflowSidebar from "@/app/apiflow_components/WorkflowComponents/workflowSidebar";
import { useDrop } from "react-dnd";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  ReactFlowInstance,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import { useRouter, usePathname } from "next/navigation";
import { AdminServices } from "@/app/Services/services";
import {
  extractPlaceholdersFromPath,
  generateUniqueNodeName,
  getRandomColor,
  prepareEdges,
  prepareNodes,
  replacePlaceholders,
  setCookies,
  validatePlaceholders,
} from "@/app/Helpers/helpersFunctions";

import WorkflowStartNode from "@/app/apiflow_components/WorkflowComponents/Nodes/workflowStartNode";
import WorkflowOperationNode from "@/app/apiflow_components/WorkflowComponents/Nodes/workflowOperationNode";
import CustomEdge from "@/app/ApiFlowComponents/ApiDesigner/Edges/customEdge";
import ChangeEdge from "@/app/ApiFlowComponents/ApiDesigner/Edges/changeEdge";
import {
  GetOperationById,
  projectReducer,
} from "@/app/Redux/apiManagement/projectReducer";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import theme from "@/Theme/theme";
import { GetCollectionOperationTree } from "@/app/Redux/apiManagement/endpointReducer";
// import FLowBg from "../../Assests/images/FlowBg.png";
// import WorkflowDrawer from "@/app/apiflow_components/WorkflowComponents/workflowDrawer";
// import GDialogBox from "@/app/Components/Global/GDialogBox";
// import DesignerImportPopup from "@/app/ApiFlowComponents/ApiDesigner/DesignerImportPopup";
import html2canvas from "html2canvas";
import WorkFlowLayout from "@/app/apiflow_components/WorkflowComponents/WorkFlowLayout";
import GLoader from "@/app/apiflow_components/global/GLoader";
import GlobalLoader from "@/app/Components/Global/GlobalLoader";

import dynamic from "next/dynamic";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import WorkFlowHeaderSkeleton from "@/app/apiflow_components/skeletons/DesignerFlow/WorkFlowHeaderSkeleton";
import WorkflowDrawerSkeleton from "@/app/apiflow_components/skeletons/DesignerFlow/WorkflowDrawerSkeleton";
import WorkflowSidebarSkeleton from "@/app/apiflow_components/skeletons/DesignerFlow/WorkflowSidebarSkeleton";
import _ from "lodash";
import FlowDesigner from "@/app/ApiflowPages/ApiManagement/FlowDesigner";
import DraggableDrawer from "@/app/ApiFlowComponents/ApiDesigner/drawer/draggableDrawer";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import {
  Badge,
  Box,
  Popover,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import ChangeHistoryDesigner from "@/app/apiflow_components/WorkflowComponents/ChangeHistoryDesigner";

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

// Dynamically import WorkflowDrawer
const WorkflowDrawer = dynamic(
  () => import("@/app/apiflow_components/WorkflowComponents/workflowDrawer"),
  {
    loading: () => <WorkflowDrawerSkeleton />,
  }
);

// Dynamically import GDialogBox
const GDialogBox = dynamic(() => import("@/app/Components/Global/GDialogBox"), {
  ssr: false,
});

// Dynamically import DesignerImportPopup
const DesignerImportPopup = dynamic(
  () => import("@/app/ApiFlowComponents/ApiDesigner/DesignerImportPopup"),
  { ssr: false }
);

export const ItemTypes = {
  CARD: "card",
};

const nodeTypes = {
  startButtonNode: WorkflowStartNode,
  // operationNode: OperationNode,
  operationNode: WorkflowOperationNode,
};

const edgeTypes = {
  buttonEdge: CustomEdge,
  changeEdge: ChangeEdge,
};

type YDoc = Y.Doc;

const threads = 5;
let processedNodes = new Set();
async function runHandler(
  doc: any,
  nodes: any,
  edges: any,
  tenant_id: string,
  apiFlow_Id: string,
  project_id: string,
  workspace_id: string
) {
  const runMap = doc.getMap("run");
  // const nodeMap = doc.getMap("nodes");
  // const edgesMap = doc.getMap("edges");
  const runData = runMap?.toJSON()?.run;

  // console.log(edgesMap.toJSON());

  const globalkeys = doc.getArray("globalkeys");
  const globalKeysArray = globalkeys.toArray();

  // console.log(globalkeys,"globalKeysArraydsd");

  if (runData?.status !== "COMPLETED") {
    try {
      let updatedNodes = nodes || [];
      let updatedEdges = edges || [];

      // // Update nodes and edges
      // updateNodesAndEdges(nodeMap, updatedNodes);
      // updateNodesAndEdges(edgesMap, updatedEdges, "edges");

      console.log("updatedEdges", updatedEdges);

      let queue = [];
      let currentEdge = getStartEdge(updatedEdges);

      if (currentEdge) {
        queue.push(currentEdge);
      }

      initializeRun(runMap, currentEdge?.target);

      const incomingEdgesCount: Map<string, number> = new Map(); // Node ID -> Number of incoming edges
      const nodesReadyToProcess: Map<string, Set<string>> = new Map(); // Node ID -> Set of processing dependencies

      // Initialize incoming edge counts and dependencies
      updatedEdges.forEach((edge: any) => {
        const targetNode = edge.target;
        if (!incomingEdgesCount.has(targetNode)) {
          incomingEdgesCount.set(targetNode, 0);
          nodesReadyToProcess.set(targetNode, new Set());
        }
        incomingEdgesCount.set(
          targetNode,
          incomingEdgesCount.get(targetNode)! + 1
        );
        nodesReadyToProcess.get(targetNode)?.add(edge.source);
      });

      let previousEdgeResponse: any = null;
      let globalResponse = {};
      processedNodes = new Set();

      console.log("updatedEdges1", updatedEdges);
      console.log("updatedNodes", updatedNodes);
      console.log("processedNodes", processedNodes);
      // Process nodes in parallel
      while (queue.length > 0) {
        const currentEdges = queue.splice(0, Math.min(threads, queue.length));
        const results = await parallel(
          currentEdges,
          async (edge: any) => {
            const result = await processNode(
              doc,
              edge,
              updatedNodes,
              updatedEdges,
              runMap,
              processedNodes,
              previousEdgeResponse,
              globalKeysArray,
              globalResponse,
              tenant_id,
              apiFlow_Id,
              project_id,
              workspace_id
            );
            // Update previousEdgeResponse for each processed node
            if (result.previousEdgeResponse) {
              previousEdgeResponse = result.previousEdgeResponse;
              globalResponse = {
                ...globalResponse,
                [result.current_node_id]:
                  result?.previousEdgeResponse?.response?.apiResponse,
              };
            }

            result.nextEdges.forEach((nextEdge: any) => {
              const targetNode = nextEdge.target;
              // Decrement the count of remaining incoming edges
              if (incomingEdgesCount.has(targetNode)) {
                incomingEdgesCount.set(
                  targetNode,
                  incomingEdgesCount.get(targetNode)! - 1
                );

                // If all incoming edges are processed, add the node to the queue
                if (incomingEdgesCount.get(targetNode) === 0) {
                  queue.push(nextEdge);
                  incomingEdgesCount.delete(targetNode);
                }
              }
            });

            return result.nextEdges;
          },
          threads
        );

        // results.forEach((nextEdges: any) => {
        //   if (nextEdges && nextEdges.length > 0) {
        //     queue.push(...nextEdges);
        //   }
        // });

        // Add results to the queue
        results.flat().forEach((nextEdges: any) => {
          if (nextEdges && nextEdges.length > 0) {
            nextEdges.forEach((nextEdge: any) => {
              const targetNode = nextEdge.target;
              // Ensure nodes with multiple incoming edges are correctly handled
              if (!incomingEdgesCount.has(targetNode)) {
                incomingEdgesCount.set(targetNode, 0);
                nodesReadyToProcess.set(targetNode, new Set());
              }

              // Check if all dependencies are processed
              const dependencies = nodesReadyToProcess.get(targetNode);
              if (dependencies && dependencies.size === 0) {
                queue.push(nextEdge);
              } else {
                dependencies?.delete(nextEdge.source);
              }
            });
          }
        });
      }

      console.log("target COMPLETED");
      finalizeRun(runMap, queue.length === 0, globalResponse);
    } catch (error) {
      console.error("Error occurred:", error);
      stopRun(runMap);
    }
  }
}

function initializeRun(runMap: any, target: any) {
  if (runMap) {
    const updateData = runMap.get("run");
    if (updateData) {
      updateData.status = "RUNNING";
      updateData.next_node = [target];
      updateData.run_result = [];
      updateData.running_nodes = [target];
      runMap.set("run", updateData);
    }
  }
}

async function processNode(
  doc: any,
  currentEdge: any,
  updatedNodes: any,
  updatedEdges: any,
  runMap: any,
  processedNodes: any,
  previousEdgeResponse: any,
  globalKeysArray: any,
  globalResponse: any,
  tenant_id: string,
  apiFlow_Id: string,
  project_id: string,
  workspace_id: string
) {
  // console.log(previousEdgeResponse, "previousEdgeResponse");
  let currentNode = updatedNodes.find((x: any) => x.id === currentEdge?.target);
  console.log("target2");
  if (!currentNode || processedNodes?.has(currentNode.id))
    return { nextEdges: [] };
  console.log("target21");
  processedNodes?.add(currentNode.id);
  console.log("target3");
  const parsedData =
    typeof currentNode?.data === "string"
      ? JSON.parse(currentNode.data)
      : currentNode?.data;
  currentNode = { ...currentNode, data: parsedData };

  updateRunStatus(runMap, currentEdge?.target);
  console.log("target4");
  let nextEdges = [];
  let newPreviousEdgeResponse = previousEdgeResponse;
  let requestBody = {};
  if (currentNode?.type === "operationNode") {
    requestBody = createRequestBody(
      currentNode,
      previousEdgeResponse,
      globalKeysArray,
      globalResponse
    );
    const operationSuccess = await performOperation(
      doc,
      currentEdge.target,
      apiFlow_Id,
      project_id,
      currentNode,
      requestBody
    );
    newPreviousEdgeResponse = operationSuccess;

    console.log(
      "operationSuccess: ",
      operationSuccess,
      newPreviousEdgeResponse
    );

    let changeManData = {
      flow_id: apiFlow_Id,
      node_id: operationSuccess?.node_id,
      tenant_id: tenant_id,
      project_id: project_id,
      workspace_id: workspace_id,
      operation_id: currentNode?.data.operation_id,
      requestBody: {
        serviceInput: JSON.stringify(operationSuccess?.serviceInput),
        serviceOutput: JSON.stringify(operationSuccess?.response),
        statusCode: operationSuccess?.statusCode,
      },
    };

    // query need pas id
    // let changeManResponse = await changeManagement(changeManData);
    // console.log("changeManResponse: ", changeManResponse);

    console.log(globalResponse, "globalResponse");

    if (operationSuccess?.status === "SUCCESS") {
      for (let key of globalKeysArray) {
        console.log(currentNode, "test1");
        if (key.node_id === currentNode.id) {
          console.log(currentNode, "test2");
          const response = newPreviousEdgeResponse?.response?.apiResponse;
          let value = replacePlaceholders(
            key.request_template,
            { response },
            null
          );
          console.log(value, "value");
          updateKeys(doc, value, key.id, globalKeysArray);
        }
      }
    }

    nextEdges = getNextEdges(
      updatedEdges,
      currentEdge.target,
      operationSuccess?.status == "SUCCESS",
      "operationNode",
      null
    );
  } else if (currentNode?.type === "responseNode") {
    nextEdges = getNextEdges(
      updatedEdges,
      currentEdge.target,
      true,
      currentNode?.type,
      newPreviousEdgeResponse?.statusCode
    );
  }
  console.log("target4");
  finalizeNode(runMap, currentEdge?.target, nextEdges, {
    ...newPreviousEdgeResponse,
    requestBody: requestBody,
  });
  let current_node_id = currentNode?.data?.node_name;
  console.log("target5");
  return {
    nextEdges,
    previousEdgeResponse: newPreviousEdgeResponse,
    current_node_id,
  };
}

function updateRunStatus(runMap: any, target: any) {
  // Logging to indicate the function execution
  console.log("target");

  // Check if runMap is provided
  if (runMap) {
    // Retrieve the data for the run key
    const updateData = runMap.get("run");

    // If updateData is available, proceed with the update
    if (updateData) {
      // Set the status to RUNNING
      updateData.status = "RUNNING";

      // Ensure next_node is an array
      if (!Array.isArray(updateData.next_node)) {
        updateData.next_node = [];
      }

      // Ensure running_nodes is an array
      if (!Array.isArray(updateData.running_nodes)) {
        updateData.running_nodes = [];
      }

      // Add target to next_node array
      updateData.next_node = [...updateData.next_node, target];

      // Add target to running_nodes array
      updateData.running_nodes = [...updateData.running_nodes, target];

      // Update the run key in the map with the modified data
      runMap.set("run", updateData);
    }
  }

  // Logging to indicate the function has completed execution
  console.log("target7");
}

function createRequestBody(
  currentNode: any,
  previousEdgeResponse: any,
  globalKeysArray: any,
  globalResponse: any
) {
  // const object = previousEdgeResponse?.response;
  // const response = previousEdgeResponse?.response?.apiResponse;
  const response = globalResponse;

  const payloadStr = currentNode?.data?.raw_payload || "{}";
  // const payload = JSON.parse(payloadStr);
  console.log(globalResponse, "globalResponse");
  let payload = {};

  try {
    payload = JSON.parse(payloadStr);
  } catch (error) {
    console.error("Error parsing JSON payload:", payloadStr, error);
    // Set payload to empty object if parsing fails
    payload = {};
  }

  const new_payload = replacePlaceholders(
    payload,
    { response },
    globalKeysArray
  );

  console.log(globalKeysArray, "globalKeysArraysdsdsdjrjr");

  let headersArr = currentNode?.data?.operations_header || [];

  let globalHeaders = globalKeysArray?.filter(
    (x: any) => x.include === true && x.node_id !== currentNode.id
  );

  let globalBody = globalKeysArray?.filter(
    (x: any) => x.body_include === true && x.node_id !== currentNode.id
  );

  if (globalHeaders.length > 0) {
    for (let key of globalHeaders) {
      let removeDupValues = headersArr?.filter(
        (x: any) => x?.name !== key?.header_key
      );
      headersArr = [
        ...removeDupValues,
        {
          name: key?.header_key,
          test_value: key.prefix_value + " " + key?.value,
          default_value: "",
        },
      ];
    }
  }

  if (globalBody.length > 0) {
    for (let key of globalBody) {
      new_payload[key.body_key] = key.body_key; // or key.body_key = value if there is a corresponding value
    }
  }
  console.log(headersArr, "headersArr");
  const updateArray = (array: any) => {
    if (Array.isArray(array)) {
      return array.map((item) => {
        const key = item.name;
        console.log(previousEdgeResponse?.status, "array");
        let value =
          // previousEdgeResponse?.status == "SUCCESS"
          replacePlaceholders(item.test_value, { response }, globalKeysArray);
        // : item.test_value;
        console.log(value, "test_value");
        value =
          typeof value === "object" || Array.isArray(value)
            ? JSON.stringify(value)
            : value?.toString();

        console.log(value, "array");
        return { key, value };
      });
    }
    return [];
  };
  console.log("target8");
  return {
    operation_inputs: updateArray(currentNode?.data?.operations_input),
    operation_headers: updateArray(headersArr),
    operation_authorization: updateArray(currentNode?.data?.operations_auth),
    operation_query_params: updateArray(
      currentNode?.data?.operations_query_param
    ),
    payload: new_payload ? JSON.stringify(new_payload) : "",
  };
}

function finalizeNode(
  runMap: any,
  target: any,
  nextEdges: any,
  previousEdgeResponse: any
) {
  // Check if runMap is provided
  if (runMap) {
    // Retrieve the data for the run key
    const updateData = runMap.get("run");

    // If updateData is available, proceed with the update
    if (updateData) {
      // Set the status to RUNNING
      updateData.status = "RUNNING";

      // Ensure next_node is an array
      if (!Array.isArray(updateData.next_node)) {
        updateData.next_node = [];
      }

      // Update next_node by removing the target and adding next edges' targets
      updateData.next_node = updateData.next_node
        .filter((node: any) => node !== target)
        .concat(nextEdges.map((edge: any) => edge?.target));

      // Ensure run_result is an array
      if (!Array.isArray(updateData.run_result)) {
        updateData.run_result = [];
      }

      // Add the previousEdgeResponse to run_result
      updateData.run_result = [
        ...updateData.run_result,
        previousEdgeResponse || {},
      ];

      // Ensure running_nodes is an array
      if (!Array.isArray(updateData.running_nodes)) {
        updateData.running_nodes = [];
      }

      // Update running_nodes by removing the target
      updateData.running_nodes = updateData.running_nodes.filter(
        (node: any) => node !== target
      );

      // Update the run key in the map with the modified data
      runMap.set("run", updateData);
    }
  }
}

function finalizeRun(runMap: any, isQueueEmpty: any, globalResponse: any) {
  // compareGlobalResponse(globalResponse);
  if (runMap) {
    const runData = runMap.get("run");
    if (isQueueEmpty && runData?.status !== "COMPLETED") {
      runData.status = "COMPLETED";
      runData.next_node = [];
      runData.running_nodes = [];
      runData.userAction = ``;
      runMap.set("run", runData);
    }
  }
}

function stopRun(runMap: any) {
  if (runMap) {
    const updateData = runMap.get("run");
    if (updateData) {
      updateData.status = "STOPPED";
      updateData.next_node = [];
      updateData.run_result = [];
      updateData.running_nodes = [];
      updateData.userAction = ``;
      runMap.set("run", updateData);
    }
  }
}

async function parallel(arr: any, apiLikeFunction: any, threads: any) {
  let index = 0;
  const results: any = [];
  const executing = new Set();

  const enqueue = async () => {
    if (index === arr.length) return;

    const currentIndex = index++;
    const promise = apiLikeFunction(arr[currentIndex]).then((result: any) => {
      results[currentIndex] = result;
      executing.delete(promise);
    });

    executing.add(promise);

    // If we reach the thread limit, wait for any of the promises to resolve
    if (executing.size >= threads) {
      await Promise.race(executing);
    }

    await enqueue();
  };

  // Start the initial batch of requests
  await Promise.all(Array.from({ length: threads }, enqueue));

  // Wait for all remaining promises to settle
  await Promise.all(executing);

  return results;
}

const updateKeys = (ydoc: any, value: any, id: any, keysArray: any) => {
  const newGlobalKeys = keysArray.map((item: any) =>
    item.id === id ? { ...item, value: value } : item
  );

  if (ydoc) {
    const keysArrayNew = ydoc.getArray("globalkeys");
    const index = keysArrayNew
      .toArray()
      .findIndex((item: any) => item.id === id);
    keysArrayNew.delete(index, 1); // Remove the old item
    keysArrayNew.insert(index, [
      newGlobalKeys.find((item: any) => item.id === id),
    ]); // Insert the updated item
  }
};

function getNextEdges(
  edges: any,
  targetId: any,
  operationSuccess: any,
  nodetype: any,
  nodeEndVariable: any
) {
  console.log(operationSuccess, "operationSuccess");
  if (nodetype === "operationNode") {
    return edges.filter(
      (edge: any) =>
        edge.source === targetId &&
        (operationSuccess
          ? edge.sourceHandle.endsWith("_success")
          : edge.sourceHandle.endsWith("_failure"))
    );
  } else if (nodetype === "responseNode") {
    return edges.filter(
      (edge: any) =>
        edge.source === targetId &&
        edge.sourceHandle.endsWith("_" + nodeEndVariable)
    );
  } else {
    return edges.filter((edge: any) => edge.source === targetId);
  }
}

// Other functions like getStartEdge, replacePlaceholders, performOperation, and shouldContinueFlow should be defined similarly

async function performOperation(
  doc: any,
  targetId: any,
  flow_id: any,
  project_id: any,
  currentNode: any,
  requestBody: any
) {
  console.log("function Called");
  try {
    // Define the URL of the API endpoint you want to call
    // const nodeMap = doc.getMap("nodes");
    // let particular_node = nodeMap.get(targetId).nodes;
    let particular_node = currentNode;
    const apiUrl = `Api/Api_design_flow_service/save_and_fetch_by_operation_id?operation_id=${particular_node?.data.operation_id}&flow_id=${flow_id}&node_id=${targetId}&project_id=${project_id}`;
    // console.log("api url", apiUrl);
    // Make a POST request to the API endpoint
    // console.log(requestBody )
    let method = "post";
    const response = await AdminServices(method, apiUrl, requestBody);

    // await axios.post(apiUrl, requestBody);

    // Log the response data
    // console.log("Response:", response.data);

    // Return the response data
    // console.log(response.data, "response.data");
    return response;
  } catch (error) {
    // Handle errors here
    // console.error("Error:", error);
    // You might want to throw the error here if you don't want to handle it locally
    throw error;
  }
}

async function changeManagement(data: any) {
  try {
    // const apiUrl = `${adminUrl}/Api/Api_design_flow_service/update_node_chaneges_to_changesmanagement?Flow_id=${data?.flow_id}&node_id=${data?.node_id}&tenant_id=${data?.tenant_id}&workspace_id=${data?.workspace_id}&project_id=${data?.project_id}&operation_id=${data?.operation_id}`;
    const apiUrl = `Api/Api_design_flow_service/update_node_chaneges_to_changesmanagement?Flow_id=${data?.flow_id}&node_id=${data?.node_id}&tenant_id=${data?.tenant_id}&workspace_id=${data?.workspace_id}&project_id=${data?.project_id}&operation_id=${data?.operation_id}`;

    const changeRes = await AdminServices("POST", apiUrl, data?.requestBody);

    return changeRes?.data;
  } catch (error) {
    throw error;
  }
}

function calculateSimilarityScore(nodeA: any, nodeB: any) {
  // Ensure both inputs are objects
  if (
    typeof nodeA !== "object" ||
    nodeA === null ||
    typeof nodeB !== "object" ||
    nodeB === null
  ) {
    return 0; // Return 0 if either is not an object
  }

  // Get the unique keys from both objects
  const keysA = Object.keys(nodeA);
  const keysB = Object.keys(nodeB);
  const totalKeys = new Set([...keysA, ...keysB]).size;

  // Get the shared keys between the two objects
  const sharedKeys = keysA.filter((key: string) => key in nodeB);
  const sharedKeysCount = sharedKeys.length;

  // Calculate value similarity for shared keys
  let matchingValuesCount = 0;
  sharedKeys.forEach((key: string) => {
    if (nodeA[key] === nodeB[key]) {
      matchingValuesCount++;
    }
  });

  // Key Similarity Ratio: ratio of shared keys to total unique keys
  const keySimilarityRatio = sharedKeysCount / totalKeys;

  // Value Similarity Ratio: ratio of matching values to shared keys
  const valueSimilarityRatio = matchingValuesCount / sharedKeysCount || 0; // Avoid division by 0

  // Combine both ratios, weighted equally (50% key, 50% value)
  const finalScore =
    (keySimilarityRatio * 0.5 + valueSimilarityRatio * 0.5) * 100;

  return finalScore;
}

function compareGlobalResponse(globalResponse: any) {
  console.log(globalResponse, "globalResponsefun");

  const nodeIds = Object.keys(globalResponse);
  const results = [];

  // Compare each node with every other node (excluding self-comparisons)
  for (let i = 0; i < nodeIds.length; i++) {
    for (let j = i + 1; j < nodeIds.length; j++) {
      const nodeA = globalResponse[nodeIds[i]];
      const nodeB = globalResponse[nodeIds[j]];
      const score = calculateSimilarityScore(nodeA, nodeB);

      // Only push comparison of distinct nodes
      results.push({
        nodes: [nodeIds[i], nodeIds[j]],
        score: score,
      });
    }
  }

  console.log(results, "Similarity Results");

  // Log the similarity results
  results.forEach((result) => {
    console.log(
      `Similarity between ${result.nodes[0]} and ${
        result.nodes[1]
      }: ${result.score.toFixed(2)}%`
    );
  });
}

// Example usage with your globalResponse
// const globalResponse = {
//   node_hoavtkvj: { products: Array(30), total: 194, skip: 0, limit: 30 },
//   node_bd4qp501: { users: Array(30), total: 208, skip: 0, limit: 30 }
// };

function getStartEdge(edges: any) {
  // Find the start edge based on your criteria
  return edges.find((edge: any) =>
    edge.sourceHandle?.endsWith("_start_startHandle")
  );
}

const WorkflowDesigner = (props: any) => {
  //-------------------------------------variable declarations-------------------------------------------
  const { recentlyModifiedProp } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  // const apiFlow_Id = "5409b548a1854ddfa9b297ad9d102488";
  const dispatch = useDispatch<any>();
  const { deleteElements, getEdges, getNode, getNodes } = useReactFlow();

  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const mouseRef = useRef<any>(null);
  const { screenToFlowPosition, getViewport } = useReactFlow();

  const [apiFlow_Id, setWorkflowId] = useState<any>(null);

  console.log(apiFlow_Id, "apiFlow_Id");

  useEffect(() => {
    // Extracting the workflowId from the pathname
    const pathParts = pathname.split("/"); // Split the pathname by '/'

    // Assuming the structure is /userId/{userId}/workspaceId/{workspaceId}/workflow/{workflowId}
    const workflowIndex = pathParts.indexOf("workflow"); // Find the index of 'workflow'

    if (workflowIndex !== -1 && workflowIndex + 1 < pathParts.length) {
      setWorkflowId(pathParts[workflowIndex + 1]); // The next part will be the workflowId
    }
  }, [pathname]);

  const isProduction = false;
  const websocketUrl = isProduction
    ? process.env.NEXT_PUBLIC_WSS_URL || "default_websocket_url" // Use a default if undefined
    : // : "ws://localhost:9595";
  // "ws://localhost:9596";
      "ws://139.99.114.132:2053";


  const socket = new WebSocket(websocketUrl);

  // Open event - WebSocket connection established
  socket.addEventListener("open", () => {
    console.log("WebSocket connected to " + websocketUrl);
  });

  // Close event - WebSocket connection closed
  socket.addEventListener("close", () => {
    console.log("WebSocket connection closed.");
  });

  // Error event - WebSocket connection error
  socket.addEventListener("error", (error) => {
    console.error("WebSocket error: ", error);
  });

  // Message event - WebSocket message received
  socket.addEventListener("message", (event) => {
    console.log("Received message: ", event.data);
  });

  //---------------------------useSelector---------------------------------------------------------------
  const {
    // loading,
    DesignFlowloading,
    compiling,
    globalKeys,
    isEditable,
    flowVersions,
    userLists,
    currentFlowDetails,
  } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { operationLists, operationByIdLoading } = useSelector<
    RootStateType,
    projectReducer
  >((state) => state.apiManagement.projects);

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  //-------------------------------useState----------------------------------------------------------------
  const [actionProgress, setActionProgress] = useState<any>(false);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [history, setHistory] = useState<any[]>([]);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [apiFlowName, setApiFlowName] = useState("");
  const [flowDetails, setFlowDetails] = useState<any>({});
  const [userColor, setCurrentColor] = useState(getRandomColor());
  const [wWsProvider, setWWsProvider] = useState<any>(null);
  const [cursors, setCursors] = useState(new Map());
  const [localCursor, setLocalCursor] = useState<any>(null);
  const [versionValue, setVersionValue] = useState("");
  const [saveFlow, setSaveFlow] = useState(false);
  const [showText, setShowText] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [updatedNodesNew, setUpdatedNodesNew] = useState<any>();
  const [updatedEdgesNew, setUpdatedEdgesNew] = useState<any>();
  const [showTopLeftText, setShowTopLeftText] = useState(false);
  const [showTopRightText, setShowTopRightText] = useState(false);
  const [showBottomLeftText, setShowBottomLeftText] = useState(false);
  const [showBottomRightText, setShowBottomRightText] = useState(false);
  const [changehistorySlider, setChangehistorySlider] = useState(false);
  const [PublishConfirmation, setPublishConfirmation] = useState(false);
  const [PublishSavePopup, setPublishSavePopup] = useState(false);
  const [Importopen, setImportOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any | null>(null);
  const [userAction, setUserAction] = useState("");
  const [errorBoole, setErrorBoole] = useState<any>(false);
  const [SuccessMessages, setSuccessMessages] = useState<any>();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [hasEdited, setHasEdited] = useState(false);
  const [hasNewEdited, setHasNewEdited] = useState(isEditable);
  const [rfInstance, setRfInstance] = useState<any>(null);

  const [fullUrl, setFullUrl] = useState("");

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
        console.log("Yjs Map 'run' is not initialized.");
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
      console.log("Yjs Map 'run' is not initialized.");
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
          console.log("JSON file uploaded successfully");
          toast.success("JSON file uploaded successfully");
        } catch (error) {
          console.error("Invalid JSON file:", error);
          toast.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const captureSnapshot = async () => {
    // if (dropContainer1.current) {
    //   const canvas = await html2canvas(dropContainer1.current, {
    //     backgroundColor: null, // Retain background transparency if any
    //     useCORS: true, // Enables cross-origin image loading
    //     scale: 2, // Higher scale for better quality (optional)
    //   });

    //   // Convert the canvas to an image URL (Base64 format)
    //   const imageURL = canvas.toDataURL("image/png");

    //   // Return the Base64 string
    //   return imageURL;
    // }
    // return null; // Return null if container is not found

    if (boxRef.current) {
      const canvas = await html2canvas(boxRef.current, {
        backgroundColor: null, // Retain transparency
        useCORS: true, // Allow cross-origin images
        scale: 2, // Optional: Higher quality
      });

      // Convert canvas to Base64 image URL
      const imageURL = canvas.toDataURL("image/png");
      console.log("Screenshot captured:", imageURL);
      return imageURL;

      // // Optionally: Download the image
      // const link = document.createElement("a");
      // link.href = imageURL;
      // link.download = "screenshot.png";
      // link.click();
    }
  };

  function isValidConnection(connection: Connection) {
    const { source, target } = connection;

    if (source === target) {
      return false;
    }

    const isTargetConnectedToStartHandle = getEdges().some(
      (edge) =>
        edge.target === target && edge?.sourceHandle?.includes("_startHandle")
    );

    if (isTargetConnectedToStartHandle) {
      // If the target is already connected to a "_startHandle", prevent any new connections
      return false;
    }

    // Check if the source handle is already connected to the target handle
    const isSourceConnectedToTarget = getEdges().some(
      (edge) => edge.target === source && edge.source === target
    );
    if (isSourceConnectedToTarget) {
      return false;
    }

    return true;
  }

  const handleFileImports = () => {
    const file: any = fileContent;

    let requestData = {
      project_id: currentEnvironment,
      stage_id: currentStage,
      offsetStart: 0,
      offsetEnd: 1000,
    };

    dispatch(GetCollectionOperationTree(requestData))
      .unwrap()
      .then((res: any) => {
        console.log("treeRes: ", res);
        const filterStatusVal: any = res?.collections?.filter(
          (filterStatus: any) => filterStatus?.status === "ACTIVE"
        );
        console.log(filterStatusVal, "dfdfdf");
        console.log("GetOperationTreeRes: ", res?.collections);

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
            console.log(data.nodes, "data.nodessdsdsdkk");

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
                    console.log(parsedData, "parsedDataasas");

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
              };
            });

            console.log("Uploaded Data:", nodeNew, edgeNew);
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
      .catch((error: any) => {
        console.log("Error: ", error);
      });

    console.log("requestData: ", requestData);
  };

  const handleSaveImportData = () => {
    updatedNodesNew.forEach((newNode: any) => {
      let updatedNode = {
        action: "ADD_NODE",
        status: "null",
        flow_id: apiFlow_Id,
        id: newNode?.id,
        nodes: newNode,
      };
      console.log(updatedNode, "updatedNode");

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

  const onConnect = useCallback(
    (params: any) => {
      if (
        params.sourceHandle.endsWith("_start_startHandle") &&
        params.targetHandle.endsWith("_input_er")
      ) {
        return null;
      }

      if (
        params.sourceHandle.endsWith("_success") &&
        params.targetHandle.endsWith("_input_er")
      ) {
        return null;
      }

      connectingNodeId.current = null;

      addEdge(params);
    },
    [ydoc]
  );

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (!connectingNodeId.current) return;
    },
    [screenToFlowPosition]
  );

  // const [{ canDrop, isOver }, drop] = useDrop({
  //   accept: ItemTypes.CARD,
  //   drop: (item, monitor) => {
  //     const container: any = document.getElementById("react-flow-container");
  //     const rect = container.getBoundingClientRect();
  //     const flowInstance: any = rfInstance;
  //     const adjustdropPosition: any = monitor.getClientOffset();
  //     const zoomLevel = flowInstance.getZoom();

  //     const dropPosition: any = {
  //       x: (adjustdropPosition.x - rect.left) / zoomLevel,
  //       y: (adjustdropPosition.y - rect.top) / zoomLevel,
  //     };

  //     let tempData: any = item;
  //     console.log(tempData, "tempDataDrop");
  //     let count = 0;
  //     if (isEditable) {
  //       for (const node of nodes) {
  //         if (node.data) {
  //           const nodeDataV2 = JSON.parse(node.data);
  //           console.log(nodeDataV2, "nodeDataV2");
  //           if (nodeDataV2.operation_id === tempData?.id) {
  //             count++;
  //           }
  //         }
  //       }
  //       let name: string = tempData?.name;
  //       let node_name = name + (count == 0 ? "" : "_" + count);
  //       // dispatch(
  //       //   GetOperationById({
  //       //     operation_id: tempData?.id,
  //       //     project_id: currentFlowDetails?.project_id,
  //       //   })
  //       // )
  //       // .unwrap()
  //       // .then((operRes: any) => {
  //       // console.log("OperRes: ", operRes);

  //       if (tempData?.type === "operations" && isEditable) {
  //         // let name: string = tempData?.name;
  //         let id: string = uuidv4();
  //         // let node_name = generateUniqueNodeName();
  //         let matchedPaths = extractPlaceholdersFromPath(null);
  //         // console.log(matchedPaths, operRes?.[0]?.full_url, "matchedPaths");

  //         let queryParams: any = [];

  //         for (let params of matchedPaths) {
  //           if (params) {
  //             const updatedData: any = queryParams?.filter(
  //               (x: any) => x?.name !== params && x?.scope !== "path"
  //             );

  //             queryParams = [
  //               ...updatedData,
  //               {
  //                 name: params,
  //                 test_value: "",
  //                 scope: "path",
  //                 data_type: "string",
  //               },
  //             ];
  //           }
  //         }

  //         const operHeaders = []?.map((x: any) => ({
  //           name: x.name,
  //           test_value: x.test_value,
  //           data_type: x.data_type,
  //         }));

  //         const newNode = {
  //           id: id,
  //           type: "operationNode",
  //           name: node_name,
  //           position: { x: dropPosition?.x, y: dropPosition?.y },
  //           positionAbsolute: { x: dropPosition?.x, y: dropPosition?.y },
  //           status: "null",
  //           flow_id: apiFlow_Id,
  //           version: versionValue,
  //           created_by: userProfile.user.user_id,
  //           data: JSON.stringify({
  //             name,
  //             id,
  //             node_name,
  //             operation_id: tempData?.id,
  //             method: tempData?.http_method,
  //             full_url: tempData?.full_url,
  //             operations_header: operHeaders,
  //             operations_input: [],
  //             operations_auth: [],
  //             operations_query_param: [],
  //             raw_output: "",
  //             raw_payload: "",
  //           }),
  //           response: {},
  //           width: 230,
  //           height: 120,
  //         };

  //         // Parse and access the variable
  //         const parsedData = JSON.parse(newNode?.data);
  //         console.log("Parsed Data: ", parsedData);

  //         // Add the condition to allow dragging only if operation_id is not null
  //         if (parsedData?.operation_id !== null) {
  //           let updatedNode: any = {
  //             action: "ADD_NODE",
  //             status: "null",
  //             flow_id: apiFlow_Id,
  //             id: id,
  //             nodes: newNode,
  //           };

  //           const nodeMap = ydoc?.getMap<any>("nodes");
  //           if (nodeMap) {
  //             nodeMap.set(updatedNode.id, updatedNode);

  //             const startNode = nodes.find(
  //               (node) => node.type === "startButtonNode"
  //             );
  //             console.log(startNode, "startNode");
  //             if (startNode && nodes?.length == 1) {
  //               let id = uuidv4();
  //               let edge = {
  //                 ...params,
  //                 id: id,
  //                 animated: true,
  //                 name: "null",
  //                 status: "null",
  //                 source: startNode.id,
  //                 flow_id: apiFlow_Id,
  //                 sourceHandle: startNode.id + "_startHandle",
  //                 target: updatedNode.id,
  //                 targetHandle: updatedNode.id + "_input",
  //                 version: versionValue,
  //                 created_by: userProfile.user.user_id,
  //                 style: {
  //                   stroke: "#4CAF50",
  //                   // stroke: "#55CCFF",
  //                 },
  //                 type: "buttonEdge",
  //               };

  //               let updatedEdge: any = {
  //                 action: "ADD_EDGES",
  //                 status: "null",
  //                 flow_id: apiFlow_Id,
  //                 id: id,
  //                 edges: edge,
  //               };
  //               console.log(updatedEdge, "startNode");

  //               const edgeMap = ydoc?.getMap<any>("edges");
  //               if (edgeMap) {
  //                 edgeMap.set(updatedEdge.id, updatedEdge);
  //               } else {
  //                 console.log("Yjs Map 'edgeMap' is not initialized.");
  //               }
  //             }
  //           } else {
  //             console.log("Yjs Map 'run' is not initialized.");
  //           }
  //         } else {
  //           console.log("Operation ID is null. Drag is not allowed.");
  //         }
  //       }
  //       // })
  //       // .catch((error: any) => {
  //       //   console.log("Error: ", error);
  //       // });
  //     }
  //   },
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // });
  const dropContainer1 = useRef<HTMLDivElement>(null);
  // drop(dropContainer1);
  const { dropItem } = useGlobalStore();
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!ItemTypes.CARD) {
        return;
      }
      const dropPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let tempData: any = dropItem;
      console.log(dropItem, "DropItem");
      let count = 0;
      if (isEditable) {
        for (const node of nodes) {
          if (node.data) {
            const nodeDataV2 = JSON.parse(node.data);
            console.log(nodeDataV2, "nodeDataV2");
            if (nodeDataV2.operation_id === tempData?.id) {
              count++;
            }
          }
        }
        let name: string = tempData?.name;
        let node_name = name + (count == 0 ? "" : "_" + count);
        // dispatch(
        //   GetOperationById({
        //     operation_id: tempData?.id,
        //     project_id: currentFlowDetails?.project_id,
        //   })
        // )
        // .unwrap()
        // .then((operRes: any) => {
        // console.log("OperRes: ", operRes);

        if (tempData?.type === "operations" && isEditable) {
          // let name: string = tempData?.name;
          let id: string = uuidv4();
          // let node_name = generateUniqueNodeName();
          // let matchedPaths = extractPlaceholdersFromPath(null);
          let matchedPaths = extractPlaceholdersFromPath(
            tempData?.full_url || null
          );
          // console.log(matchedPaths, operRes?.[0]?.full_url, "matchedPaths");

          let queryParams: any = [];

          for (let params of matchedPaths) {
            if (params) {
              const updatedData: any = queryParams?.filter(
                (x: any) => x?.name !== params && x?.scope !== "path"
              );

              queryParams = [
                ...updatedData,
                {
                  name: params,
                  test_value: "",
                  scope: "path",
                  data_type: "string",
                },
              ];
            }
          }

          const operHeaders = []?.map((x: any) => ({
            name: x.name,
            test_value: x.test_value,
            data_type: x.data_type,
          }));

          const newNode = {
            id: id,
            type: "operationNode",
            name: node_name,
            position: { x: dropPosition?.x, y: dropPosition?.y },
            positionAbsolute: { x: dropPosition?.x, y: dropPosition?.y },
            status: "null",
            flow_id: apiFlow_Id,
            version: versionValue,
            created_by: userProfile.user.user_id,
            data: JSON.stringify({
              name,
              id,
              node_name,
              operation_id: tempData?.id,
              method: tempData?.http_method,
              full_url: tempData?.full_url,
              operations_header: operHeaders,
              operations_input: [],
              operations_auth: [],
              operations_query_param: [],
              raw_output: "",
              raw_payload: "",
            }),
            response: {},
            width: 230,
            height: 120,
          };

          // Parse and access the variable
          const parsedData = JSON.parse(newNode?.data);
          console.log("Parsed Data: ", parsedData);

          // Add the condition to allow dragging only if operation_id is not null
          if (parsedData?.operation_id !== null) {
            let updatedNode: any = {
              action: "ADD_NODE",
              status: "null",
              flow_id: apiFlow_Id,
              id: id,
              nodes: newNode,
            };

            const nodeMap = ydoc?.getMap<any>("nodes");
            if (nodeMap) {
              nodeMap.set(updatedNode.id, updatedNode);

              const startNode = nodes.find(
                (node) => node.type === "startButtonNode"
              );
              console.log(startNode, "startNode");
              if (startNode && nodes?.length == 1) {
                let id = uuidv4();
                let edge = {
                  ...params,
                  id: id,
                  animated: true,
                  name: "null",
                  status: "null",
                  source: startNode.id,
                  flow_id: apiFlow_Id,
                  sourceHandle: startNode.id + "_startHandle",
                  target: updatedNode.id,
                  targetHandle: updatedNode.id + "_input",
                  version: versionValue,
                  created_by: userProfile.user.user_id,
                  style: {
                    stroke: "#4CAF50",
                    // stroke: "#55CCFF",
                  },
                  type: "buttonEdge",
                };

                let updatedEdge: any = {
                  action: "ADD_EDGES",
                  status: "null",
                  flow_id: apiFlow_Id,
                  id: id,
                  edges: edge,
                };
                console.log(updatedEdge, "startNode");

                const edgeMap = ydoc?.getMap<any>("edges");
                if (edgeMap) {
                  edgeMap.set(updatedEdge.id, updatedEdge);
                } else {
                  console.log("Yjs Map 'edgeMap' is not initialized.");
                }
              }
            } else {
              console.log("Yjs Map 'run' is not initialized.");
            }
          } else {
            console.log("Operation ID is null. Drag is not allowed.");
          }
        }
        // })
        // .catch((error: any) => {
        //   console.log("Error: ", error);
        // });
      }
    },
    [screenToFlowPosition, dropItem]
  );

  useEffect(() => {
    dispatch(
      GetOperationById({
        operation_id: dropItem?.id,
        project_id: currentFlowDetails?.project_id,
      })
    )
      .unwrap()
      .then((operationRes: any) => {
        // console.log(operationRes, operationRes?.[0]?.full_url, "operationRes");
        // setFullUrl(operationRes?.[0]?.full_url);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  }, []);

  function parseData(data: any) {
    // Check if data is an object
    if (typeof data === "object") {
      return data; // Return as is
    } else {
      try {
        // Try to parse the data
        return JSON.parse(data);
      } catch (error) {
        // If parsing fails, return null or handle the error accordingly
        return null;
      }
    }
  }

  const addEdge = (params: any) => {
    connectingNodeId.current = null;
    let id = uuidv4();
    let edge = {
      ...params,
      id: id,
      name: "null",
      animated: true,
      status: "null",
      flow_id: apiFlow_Id,
      version: versionValue,
      created_by: userProfile.user.user_id,
      style: {
        stroke: params?.sourceHandle.includes("success")
          ? // ? "#4CAF50"
            "#55CCFF"
          : params?.sourceHandle.includes("failure")
          ? // ? "#FF5252"
            "#55CCFF"
          : "",
      },
      type: "buttonEdge",
    };

    let updatedEdge: any = {
      action: "ADD_EDGES",
      status: "null",
      flow_id: apiFlow_Id,
      id: id,
      edges: edge,
    };

    const edgeMap = ydoc?.getMap<any>("edges");
    if (edgeMap) {
      edgeMap.set(updatedEdge.id, updatedEdge);
    } else {
      console.log("Yjs Map 'edgeMap' is not initialized.");
    }
  };

  const validateNodes = (
    nodesArray: any,
    edgesArray: any,
    globalKeysArray: any
  ) => {
    const errors = [];

    // Validate nodes
    for (const node of nodesArray) {
      if (node.data) {
        console.log(node.data, "node.dataS");

        const nodeData = JSON.parse(node.data);
        console.log(nodeData, "cvcvdffd");

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

        console.log(nodes, "nrewnodesnodes");

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
        console.log(nodeData, "nodeDataNewsssdfjjk");

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
      console.log(globalKeysArray, "globalKeysArray");

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
      console.log(errors, "errorsComes");
      setErrors(errors);

      const errorMap = ydoc?.getMap<any>("errors");
      if (errorMap) {
        errorMap.set("errors", errors);
      }
      // setCompiling(false);
      dispatch(setCompiling(false));
      console.log("Validation failed:", errors);
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
        console.log("Yjs Map 'run' is not initialized.");
      }
    }
  };

  const handleNodeChange = (
    data: any,
    nodes: any,
    ydoc: YDoc | null,
    wWsProvider: any,
    userProfile: any,
    userColor: string
  ) => {
    const awareness = wWsProvider?.awareness;
    const nodesMap = ydoc?.getMap<any>("nodes");
    let currentData = nodes?.find((x: any) => x?.id === data[0]?.id);
    onNodesChange(data);

    if (data[0]?.dragging === true) {
      awareness?.setLocalStateField("dragging", {
        nodeId: data[0]?.id,
        dragging: true,
      });

      if (nodesMap) {
        let dataNode = parseData(currentData?.data);
        nodesMap.set(data[0]?.id, {
          action: "EDIT_NODE",
          status: "null",
          id: data[0]?.id,
          nodes: {
            ...currentData,
            position: data[0].position,
            positionAbsolute: data[0].positionAbsolute,
            dragging: true,
            data: JSON.stringify({
              ...dataNode,
              dragger: userProfile?.user.email,
              color: userColor,
            }),
          },
        });
      } else {
        console.log("Yjs Map 'nodes' is not initialized.");
      }
    } else {
      awareness?.setLocalStateField("dragging", {
        nodeId: null,
        dragging: false,
      });

      if (nodesMap) {
        let dataNode = parseData(currentData?.data);
        nodesMap.set(data[0]?.id, {
          action: "EDIT_NODE",
          status: "null",
          id: data[0]?.id,
          nodes: {
            ...currentData,
            dragging: false,
            selected: false,
            data: JSON.stringify({
              ...dataNode,
              dragger: null,
              color: null,
            }),
          },
        });
      } else {
        console.log("Yjs Map 'nodes' is not initialized.");
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
                console.log("No active version found.");
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
    console.log("test");

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

  const handleSavePopup = () => {
    setSaveFlow(true);
  };

  const handlePublishPopup = () => {
    setPublishConfirmation(true);
    setPublishSavePopup(true);
  };

  const handlePublishClosePopup = () => {
    setPublishConfirmation(false);
    setPublishSavePopup(false);
  };

  const handleSaveClosePopup = () => {
    setSaveFlow(false);
    setPublishConfirmation(false);
  };

  const onRecentModifyHanlder = async () => {
    const base64Image = await captureSnapshot();
    let data = {
      flow_name: currentFlowDetails?.name,
      flow_id: apiFlow_Id,
      project_id: currentFlowDetails?.project_id,
      screenshot: base64Image,
    };

    dispatch(PostRecentModification(data))
      .unwrap()
      .then((res: any) => {});
  };

  const onSaveHandler = async () => {
    // handleSavePopup()
    const nodeMap = ydoc?.getMap("nodes");
    const edgesMap = ydoc?.getMap("edges");

    const { nodeArray, deleteNodeId } = prepareNodes(nodeMap);
    const { edgesArray, deleteEdgeId } = prepareEdges(edgesMap);
    console.log(nodeArray, "nodeArray");
    console.log(edgesArray, "edgesArray");
    console.log(deleteNodeId, "deleteNodeId");
    console.log(deleteEdgeId, "deleteEdgeId");

    if (
      nodeArray.length == 0 &&
      edgesArray.length == 0 &&
      deleteNodeId.length == 0 &&
      deleteEdgeId.length == 0
    ) {
      setSaveFlow(false);
      return;
    }
    const requestBody = {
      nodes: nodeArray,
      edges: edgesArray,
      viewport: { x: 0, y: 0, zoom: 0 },
      deleted_node_ids: deleteNodeId,
      deleted_edge_ids: deleteEdgeId,
    };
    let updatedData = {
      value: requestBody,
      flow_id: apiFlow_Id,
      version_id: versionValue,
      user_id: userProfile.user.user_id,
      tenant_id: userProfile.user.tenant_id,
      project_id: currentFlowDetails?.project_id,
    };

    let updateData = {
      action: "USER_ACTION",
      flow_id: apiFlow_Id,
      status: "START",
      type: "SAVE",
      next_node: [],
      userAction: `${userProfile?.user?.email} initiated Save`,
      errors: [],
    };

    const runMap = ydoc?.getMap<any>("run");
    if (runMap) {
      runMap.set("run", updateData);
      dispatch(SaveFlowHandler(updatedData))
        .unwrap()
        .then((res: any) => {
          const keysArrayNew = ydoc?.getArray("globalkeys");
          const requestKeys = {
            flow_id: apiFlow_Id,
            version_id: versionValue,
            globalKeys: JSON.stringify(keysArrayNew),
            // tenant_id: userProfile.user.tenant_id,
          };

          dispatch(CreateGlobalKeys(requestKeys)).then((res: any) => {});

          let updateData = {
            action: "USER_ACTION",
            flow_id: apiFlow_Id,
            status: "COMPLETED",
            next_node: [],
            type: "SAVE",
            userAction: ``,
            errors: [], // Added field for errors
          };
          runMap.set("run", updateData);

          if (nodeMap) {
            nodeMap.clear(); // Remove all nodes from the map
          }
          if (edgesMap) {
            edgesMap.clear(); // Remove all edges from the map
          }

          onRecentModifyHanlder();
          handleSaveClosePopup();
        })
        .catch((err: any) => {
          let updateData = {
            action: "USER_ACTION",
            flow_id: apiFlow_Id,
            status: "STOPPED",
            type: "SAVE",
            next_node: [],
            errors: [],
          };
        });
    } else {
      console.log("Yjs Map 'run' is not initialized.");
    }
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

  // -----------------------------------------useEffect-------------------------------------------------------
  useEffect(() => {
    if (versionValue && apiFlow_Id && userProfile.user.tenant_id) {
      setNodes([]);
      setEdges([]);
      const ydoc = new Y.Doc();
      const wsProvider = new WebsocketProvider(
        websocketUrl,
        `${userProfile.user.tenant_id}_${apiFlow_Id}_${versionValue}`,
        ydoc
      );

      setYdoc(ydoc);
      dispatch(setFlowYdoc(ydoc));
      setWSprovider(wsProvider);
      setWWsProvider(wsProvider);
      dispatch(setWSprovider(wsProvider));

      wsProvider.on("status", (event: any) => {
        console.log(event.status); // logs "connected" or "disconnected"
      });

      const awareness = wsProvider?.awareness;

      awareness?.on("change", () => {
        dispatch(setUserLists(Array.from(awareness.getStates().values())));
        const newCursors = new Map();
        awareness.getStates().forEach((state, clientId) => {
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
    if (!ydoc) return;
    const nodeMap = ydoc?.getMap<any>("nodes");
    const edgeMap = ydoc?.getMap<any>("edges");
    const keysArray = ydoc.getArray("globalkeys");
    // const messagesArray = ydoc.getArray<any>("nodes");
    // const edgesArray = ydoc.getArray<any>("edges");
    // const runArray = ydoc?.getArray<any>("run");
    const runMap = ydoc?.getMap<any>("run");
    const errorMap = ydoc?.getMap<any>("errors");

    // const editNodesArry = ydoc.getArray<any>("nodes");
    const updateNodes = () => {
      const newMessages: any = [];
      let nodeJson = nodeMap?.toJSON();
      Object.keys(nodeJson).forEach((key) => {
        newMessages.push(nodeJson[key]);
      });

      setNodes((previousNodes) => {
        const updatedNodes = newMessages.reduce(
          (accumulator: any, message: any) => {
            if (message?.action === "DELETE_NODES") {
              // Extract the array of node IDs to delete from the deletion message
              // const nodeIdsToDelete = message.nodeIds;
              // Filter out all the deleted nodes from the accumulator array
              // return accumulator.filter(
              //   (node: any) => !nodeIdsToDelete.includes(node.id)
              // );
              const nodeIdsToDelete = message.nodes.id;
              return accumulator.filter(
                (node: any) => nodeIdsToDelete !== node.id
              );
            } else {
              // Handle other actions (e.g., adding or updating nodes)
              const node = message.nodes;
              const index = accumulator.findIndex(
                (existingNode: any) => existingNode.id === node.id
              );
              if (index !== -1) {
                // If node already exists, update it
                accumulator[index] = node;
              } else {
                // If node doesn't exist, add it
                accumulator.push(node);
              }
              return accumulator;
            }
          },
          [...previousNodes]
        );

        return updatedNodes;
      });
    };

    const updateEdges = () => {
      // const newEdges = edgesArray.toArray();
      const newEdges: any = [];
      let edgeJson = edgeMap?.toJSON();
      Object.keys(edgeJson).forEach((key) => {
        newEdges.push(edgeJson[key]);
      });

      setEdges((previousEdges) => {
        const updatedEdges = newEdges.reduce(
          (accumulator: any, message: any) => {
            if (message?.action === "DELETE_EDGES") {
              // Extract the array of node IDs to delete from the deletion message
              const edgesIdsToDelete = message.edges.id;
              // Filter out all the deleted nodes from the accumulator array
              // return accumulator.filter(
              //   (edge: any) => !edgesIdsToDelete.includes(edge.id)
              // );

              return accumulator.filter(
                (edge: any) => edgesIdsToDelete !== edge.id
              );
            } else {
              // Handle other actions (e.g., adding or updating nodes)
              const edge = message.edges;
              const index = accumulator.findIndex(
                (existingEdge: any) => existingEdge.id === message.id
              );
              if (index !== -1) {
                // If node already exists, update it
                accumulator[index] = edge;
              } else {
                // If node doesn't exist, add it
                accumulator.push(edge);
              }
              return accumulator;
            }
          },
          [...previousEdges]
        );

        return updatedEdges;
      });
    };
    // const runFlow = () => {
    //   let runData = runMap?.toJSON();
    //   console.log(runData, "runDatasds");

    //   if (runData.run.action === "RUN") {
    //     if (runData.run.status === "START") {
    //       toast.success("Run Started", {
    //         style: {
    //           border: "1px solid #6B21A8",
    //           padding: "16px",
    //           color: "#6B21A8",
    //         },
    //         iconTheme: {
    //           primary: "#6B21A8",
    //           secondary: "#FFFAEE",
    //         },
    //       });
    //       setActionProgress(true);
    //       setUserAction(runData.run.userAction);
    //       dispatch(setNextNode(runData.run.next_node));
    //       dispatch(setIsEditable(false));
    //     } else if (runData.run.status === "RUNNING") {
    //       dispatch(setNextNode(runData.run.next_node));
    //       setUserAction(runData.run.userAction);
    //       // Additional handling if needed
    //     } else if (runData?.run.status === "COMPLETED") {
    //       if (hasEdited) {
    //         dispatch(setIsEditable(true));

    //         // Enable editing after saving if there were edits
    //         setHasEdited(false); // Reset the flag after saving
    //       }

    //       // dispatch(setIsEditable(true));
    //       setActionProgress(false);
    //       dispatch(setNextNode(runData.run.next_node));
    //       toast.success("Run Ended", {
    //         style: {
    //           border: "1px solid #6B21A8",
    //           padding: "16px",
    //           color: "#6B21A8",
    //         },
    //         iconTheme: {
    //           primary: "#6B21A8",
    //           secondary: "#FFFAEE",
    //         },
    //       });
    //       setUserAction(runData.run.userAction);
    //     } else if (runData?.run.status === "STOPPED") {
    //       dispatch(setNextNode(runData.run.next_node));
    //       setActionProgress(false);
    //       dispatch(setIsEditable(true));
    //       setUserAction(runData.run.userAction);
    //       toast.success("Run Stopped", {
    //         style: {
    //           border: "1px solid #713200",
    //           padding: "16px",
    //           color: "#713200",
    //         },
    //         iconTheme: {
    //           primary: "#713200",
    //           secondary: "#FFFAEE",
    //         },
    //       });
    //     }
    //   } else if (runData.run.action === "USER_ACTION") {
    //     if (runData.run.status === "START") {
    //       dispatch(setIsEditable(false));
    //       setActionProgress(true);
    //       setUserAction(runData.run.userAction);
    //     } else if (runData.run.status === "COMPLETED") {
    //       // dispatch(setIsEditable(true));
    //       // dispatch(setIsEditable(true));

    //       if (hasEdited) {
    //         dispatch(setIsEditable(true));
    //         setHasNewEdited(true);

    //         // Enable editing after saving if there were edits
    //         setHasEdited(false); // Reset the flag after saving
    //       }

    //       console.log(isEditable, "NewhasEdited");

    //       // } else {
    //       //   // No edits made, keep editing disabled
    //       //   setIsEditable(false);
    //       //   dispatch(setIsEditable(false));
    //       // }

    //       setActionProgress(false);
    //       setUserAction(runData.run.userAction);
    //       toast.success(`${runData.run.type} Successfulsss`);
    //     } else if (runData.run.status === "STOPPED") {
    //       dispatch(setIsEditable(true));
    //       setActionProgress(false);
    //       setUserAction(runData.run.userAction);
    //       toast.error(`${runData.run.type} Not Succesful`);
    //     }
    //   }
    // };

    const runFlow = () => {
      let runData = runMap?.toJSON();
      console.log(runData, "runDatasds");

      if (runData.run.action === "RUN") {
        if (runData.run.status === "START") {
          toast.success("Run Started", {
            style: {
              border: "1px solid #6B21A8",
              padding: "16px",
              color: "#6B21A8",
            },
            iconTheme: {
              primary: "#6B21A8",
              secondary: "#FFFAEE",
            },
          });
          setActionProgress(true);
          setUserAction(runData.run.userAction);
          dispatch(setNextNode(runData.run.next_node));
          dispatch(setIsEditable(false)); // Disable editing while loading
        } else if (runData.run.status === "RUNNING") {
          dispatch(setNextNode(runData.run.next_node));
          setUserAction(runData.run.userAction);
          // Additional handling if needed
        } else if (runData?.run.status === "COMPLETED") {
          if (hasEdited) {
            dispatch(setIsEditable(true)); // Enable editing after save completion
            setHasEdited(false); // Reset the flag after saving
          }
          setActionProgress(false);
          dispatch(setNextNode(runData.run.next_node));
          toast.success("Run Ended", {
            style: {
              border: "1px solid #6B21A8",
              padding: "16px",
              color: "#6B21A8",
            },
            iconTheme: {
              primary: "#6B21A8",
              secondary: "#FFFAEE",
            },
          });
          setUserAction(runData.run.userAction);
        } else if (runData?.run.status === "STOPPED") {
          dispatch(setNextNode(runData.run.next_node));
          setActionProgress(false);
          dispatch(setIsEditable(true)); // Enable editing after stop
          setUserAction(runData.run.userAction);
          toast.success("Run Stopped", {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
            iconTheme: {
              primary: "#713200",
              secondary: "#FFFAEE",
            },
          });
        }
      } else if (runData.run.action === "USER_ACTION") {
        if (runData.run.status === "START") {
          // dispatch(setIsEditable(false)); // Disable editing during user action
          setActionProgress(true);
          setUserAction(runData.run.userAction);
        } else if (runData.run.status === "COMPLETED") {
          if (hasEdited) {
            dispatch(setIsEditable(true)); // Re-enable editing after completion
            setHasNewEdited(true); // Mark as edited
            setHasEdited(false); // Reset the flag
          }
          setActionProgress(false);
          setUserAction(runData.run.userAction);
          toast.success(`${runData.run.type} Successful`);
        } else if (runData.run.status === "STOPPED") {
          dispatch(setIsEditable(true)); // Enable editing after stop
          setActionProgress(false);
          setUserAction(runData.run.userAction);
          toast.error(`${runData.run.type} Not Successful`);
        }
      }
    };

    const errorsFlow = () => {
      let errData = errorMap?.toJSON();
      setErrors(errData.errors);
    };

    const globalFlow = () => {
      console.log("call");
      let globalData = keysArray.toArray();
      console.log(globalData, "globalData");

      dispatch(setGlobalKeys(globalData));
    };

    runMap.observe(runFlow);
    errorMap.observe(errorsFlow);
    edgeMap.observe(updateEdges);
    nodeMap.observe(updateNodes);
    keysArray.observe(globalFlow);

    return () => {
      runMap.unobserve(runFlow);
      errorMap.unobserve(errorsFlow);
      edgeMap.unobserve(updateEdges);
      nodeMap.unobserve(updateNodes);
      keysArray.unobserve(globalFlow);
    };
  }, [ydoc]);

  useEffect(() => {
    if (apiFlow_Id && userProfile.user.tenant_id) {
      if (!ydoc) {
        return;
      }

      const data = {
        flow_id: apiFlow_Id,
        version_id: versionValue,
        tenant_id: userProfile?.user?.tenant_id,
        project_id: currentFlowDetails?.project_id,
      };

      dispatch(GetDesignApiFlow(data))
        .then((res: any) => {
          if (res?.payload) {
            setNodes([]);
            setEdges([]);
            // Extract nodes and edges from API response
            const nodesApiData = res?.payload?.nodes || [];
            const edgesApiData = res?.payload?.edges || [];

            // Get nodes and edges from ydoc
            const nodeMap = ydoc?.getMap<any>("nodes");
            const edgeMap = ydoc?.getMap<any>("edges");

            // Convert nodeMap and edgeMap to arrays
            const nodeJson = nodeMap?.toJSON() || {};
            const edgeJson = edgeMap?.toJSON() || {};

            // Convert map data to arrays
            const newNodes = Object.values(nodeJson);
            const newEdges = Object.values(edgeJson);
            let updatedNodes = [...nodesApiData];
            // Process new nodes
            newNodes.forEach((node: any) => {
              if (node?.action === "DELETE_NODES") {
                const nodeIdsToDelete = node.nodes.id;
                // Remove nodes with these IDs from updatedNodes
                updatedNodes = updatedNodes.filter(
                  (existingNode: any) =>
                    !nodeIdsToDelete.includes(existingNode.id)
                );
              } else {
                const nodeToUpdate = node.nodes;
                const index = updatedNodes.findIndex(
                  (existingNode: any) => existingNode.id === nodeToUpdate.id
                );

                if (index !== -1) {
                  // Update existing node
                  updatedNodes[index] = nodeToUpdate;
                } else {
                  // Add new node
                  updatedNodes.push(nodeToUpdate);
                }
              }
            });

            console.log("updatedNodes", updatedNodes, newNodes);
            // Update nodes state
            setNodes(updatedNodes);

            // Directly modify the edges state
            let updatedEdges = [...edgesApiData];

            newEdges.forEach((edge: any) => {
              if (edge?.action === "DELETE_EDGES") {
                const edgeIdsToDelete = edge.edges.id;
                // Remove edges with these IDs from updatedEdges
                updatedEdges = updatedEdges.filter(
                  (existingEdge: any) =>
                    !edgeIdsToDelete.includes(existingEdge.id)
                );
              } else {
                const edgeToUpdate = edge.edges;
                const index = updatedEdges.findIndex(
                  (existingEdge: any) => existingEdge.id === edgeToUpdate.id
                );

                if (index !== -1) {
                  // Update existing edge
                  updatedEdges[index] = edgeToUpdate;
                } else {
                  // Add new edge
                  updatedEdges.push(edgeToUpdate);
                }
              }
            });

            // Update edges state
            setEdges(updatedEdges);

            // Update nodes state
          }
        })
        .catch((error: any) => {
          console.error("GetDesignApiFlow error:", error);
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });

      dispatch(GetGlobalKeys(data))
        .unwrap()
        .then((res: any) => {
          const keysArray = ydoc.getArray("globalkeys");
          let globalData = keysArray.toArray();
          if (userLists.length > 0) {
            dispatch(setGlobalKeys(globalData));
          }
          if (res.globalKeys) {
            let keys = JSON.parse(res.globalKeys);
            console.log(keys);
            // dispatch(setGlobalKeys(keys));
            let currentIndex = 0;
            keys.forEach((key: any, i: any) => {
              keysArray.insert(currentIndex + i, [key]);
            });
          }
        })
        .catch((error: any) => {
          console.error("GetApiDesignFlowByDesignFlowId error:", error);
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }, [
    apiFlow_Id,
    currentFlowDetails,
    ydoc,
    versionValue,
    userProfile?.user?.tenant_id,
  ]);

  useEffect(() => {
    if (apiFlow_Id && userProfile?.user?.user_id) {
      dispatch(GetApiDesignFlowByDesignFlowId(apiFlow_Id))
        .unwrap()
        .then((res: any) => {
          console.log(res, "flowIdRes");
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
                console.log("No active version found.");
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

  const proOptions = { hideAttribution: true };

  // useEffect(() => {
  //   dispatch(setCurrentUserFlowColor(userColor));
  // }, [userColor]);

  const [key, setKey] = useState(0);
  const prevNodesRef = useRef(nodes);

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

  // Throttled handler for onNodeDrag to test its effect
  const onNodeDragWithThrottle = useCallback(
    _.throttle((event, node) => {
      // setNodes((nds) =>
      //   // nds.map((n) =>
      //   //   n.id === node.id ? { ...n, position: node.position } : n
      //   // )
      //   nds.map((n) => {
      //     console.log("Current Node ID (n.id):", n.id);
      //     console.log("Dragged Node ID (node.id):", node.id);
      //     console.log("Dragged Node Position (node.position):", node.position);
      //     return n.id === node.id ? { ...n, position: node.position } : n;
      //   })
      // );

      requestAnimationFrame(() => {
        setNodes((nds) => {
          const updatedNodes = nds.map((n) =>
            n.id === node.id ? { ...n, position: node.position } : n
          );
          return updatedNodes;
        });
      });
    }, 50), // Throttle interval: 200ms
    [setNodes]
  );

  let lastFrameTime = performance.now();
  let frameCount = 0;

  function measureFPS() {
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    frameCount++;

    if (delta > 1000) {
      // Log FPS every second
      console.log(`FPS: ${frameCount}`);
      frameCount = 0;
    }
    requestAnimationFrame(measureFPS);
  }

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeDragStop = useCallback((event: any, node: any) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
    );
  }, []);

  useEffect(() => {
    measureFPS();
  }, []);

  console.log(ydoc, "YDOC");

  const [tooltipPosition, setTooltipPosition] = React.useState({ x: 0, y: 0 });

  console.log(tooltipPosition, "tooltipPosition");

  const handleMouseMove = (event: any) => {
    // Convert mouse position to flow coordinates
    const position = rfInstance?.screenToFlowPosition({
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

  return (
    <Grid
      ref={boxRef}
      sx={{
        height: { lg: "97vh", md: "100vh", sm: "auto" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 0px",
      }}
      size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
    >
      <WorkFlowLayout>
        <Grid container sx={{ position: "relative", height: "100%" }}>
          <GlobalCircularLoader
            open={DesignFlowloading}
            style={{ position: "absolute" }}
          />
          {/* {DesignFlowloading && (
            <GlobalCircularLoader isBackdrop={true} borderRadius="15px" />
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
            sx={{ padding: "10px" }}
            size={{ xs: 12, sm: 12, md: 7.7, lg: 8.7, xl: 8.6 }}
          >
            <div
              className="position-relative"
              ref={mouseRef}
              onMouseMove={(event) => {
                if (mouseRef.current) {
                  const rect = mouseRef.current.getBoundingClientRect();
                  const offsetX = event.clientX - rect.left;
                  const offsetY = event.clientY - rect.top;

                  const position = { x: offsetX, y: offsetY };

                  const awareness = wWsProvider?.awareness;
                  awareness?.setLocalStateField("cursor", position);
                }
              }}
            >
              <Grid container>
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  {/* {operationByIdLoading && (
                    <GlobalCircularLoader
                      open={operationByIdLoading}
                      isBackdrop={true}
                    />
                  )} */}
                  <div
                    style={{
                      width: "100%",
                      height: recentlyModifiedProp === true ? "20vh" : "80vh",
                    }}
                    ref={dropContainer1}
                  >
                    {/* <ReactFlow
                      onDrop={onDrop}
                      id="react-flow-container"
                      className="position-relative"
                      ref={reactFlowWrapper}
                      // onDragOver={(event) => {
                      //   event.preventDefault();
                      //   event.dataTransfer.dropEffect = "move";
                      // }}
                      onDragOver={onDragOver}
                      elementsSelectable={true}
                      nodes={nodes}
                      edges={edges}
                      // key={key}
                      onNodesChange={(data) =>
                        handleNodeChange(
                          data,
                          nodes,
                          ydoc,
                          wWsProvider,
                          userProfile,
                          userColor
                        )
                      }
                      onNodeDrag={onNodeDragWithThrottle}
                      // snapToGrid={true}
                      // snapGrid={[15, 15]}
                      onEdgesChange={onEdgesChange}
                      nodesConnectable={isEditable}
                      nodesDraggable={isEditable}
                      onConnect={onConnect}
                      onConnectStart={onConnectStart}
                      onConnectEnd={onConnectEnd}
                      // nodesConnectable={editMode}
                      // nodesDraggable={editMode}
                      // fitView
                      // fitViewOptions={{ padding: 2 }}
                      nodeTypes={nodeTypes}
                      edgeTypes={edgeTypes}
                      onInit={setRfInstance}
                      onNodeDragStart={() => {
                        console.log("onNodeDragStart");
                      }}
                      // onNodeDragStop={() => console.log("onNodeDragStop")}
                      onNodeDragStop={onNodeDragStop}
                      // onNodeDragStart={() => {
                      //   console.log("onNodeDragStart");
                      //   setDragCount(0);
                      //   setEventTimestamps([]);
                      // }}
                      // onNodeDragStop={() => {
                      //   console.log("onNodeDragStop");
                      //   console.log("Total drag events:", dragCount);
                      // }}
                      proOptions={proOptions}
                      nodeOrigin={[0.5, 0]}
                      // fitView
                      fitViewOptions={{ padding: 700 }}
                      attributionPosition="bottom-right"
                      onMouseMove={(event) => {
                        const position: ReactFlowInstance =
                          rfInstance?.screenToFlowPosition({
                            x: event?.clientX,
                            y: event?.clientY,
                          });
                        setLocalCursor(position);

                        //   const awareness = wWsProvider.awareness;
                        //   awareness.setLocalStateField("cursor", position);
                      }}
                      // style={{ width: "100%", height: "100%" }}
                      // onNodesDelete={onNodesDelete}
                    >
                      
                 
                      {Array.from(cursors?.entries()).map(([clientId, position]: any) => (
  <Draggable
    key={clientId}
    position={{ x: position?.x || 0, y: position?.y || 0 }} // Control position dynamically
    onDrag={(e, data) => {
      // Update the position during the drag
      const updatedPosition = { x: data.x, y: data.y };
      setCursors((prevCursors) =>
        new Map(prevCursors).set(clientId, {
          ...position,
          ...updatedPosition,
        })
      );
    }}
    onStop={(e, data) => {
      console.log(`Moved ${position?.name} to:`, {
        x: data.x,
        y: data.y,
      });
      // Optionally update final position in shared state
    }}
  >
    <div style={{ position: "absolute" }}>
      <LightTooltip
        title={position?.name}
        open={true} // Tooltip remains visible
      >
        <NavigationIcon
          sx={{
            fill: position?.color,
            transform: `rotate(-15deg)`,
            cursor: "grab", // Change cursor to indicate dragging is enabled
          }}
        />
      </LightTooltip>
    </div>
  </Draggable>
))}


                    </ReactFlow> */}

                    <ReactFlow
                      id="react-flow-container"
                      className="position-relative"
                      onDrop={onDrop}
                      ref={reactFlowWrapper}
                      elementsSelectable={true}
                      nodes={nodes}
                      onDragOver={onDragOver}
                      edges={edges}
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
                      onEdgesChange={onEdgesChange}
                      onConnect={onConnect}
                      nodeTypes={nodeTypes}
                      edgeTypes={edgeTypes}
                      onInit={setRfInstance}
                      fitViewOptions={{ padding: 700 }}
                      proOptions={{ hideAttribution: true }}
                    >
                      {Array.from(cursors?.entries()).map(
                        ([clientId, cursorPosition]) => {
                          const viewport = rfInstance?.getViewport() || {
                            zoom: 1,
                            x: 0,
                            y: 0,
                          };
                          // const adjustedX = tooltipPosition.x * viewport.zoom + viewport.x;
                          const adjustedX =
                            cursorPosition.x * viewport.zoom + viewport.x;
                          const adjustedY =
                            cursorPosition.y * viewport.zoom + viewport.y;

                          return (
                            <div
                              key={clientId}
                              style={{
                                position: "absolute",
                                transform: `translate(${adjustedX}px, ${adjustedY}px)`,
                                pointerEvents: "none",
                              }}
                            >
                              {!cursorPosition.dragging && (
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
                                      transform: `rotate(-15deg)`,
                                    }}
                                  />
                                </LightTooltip>
                              )}
                            </div>
                          );
                        }
                      )}
                    </ReactFlow>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 4.3, lg: 3.3, xl: 3.3 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WorkflowSidebar
              project_id={currentFlowDetails?.project_id}
              recentlyModifiedProp={recentlyModifiedProp}
            />
          </Grid>{" "}
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

        {/* <DraggableDrawer
          containerRef={mouseRef}
          openDrawer={true}
          setOpenDrawer={setOpenDrawer}
          errors={errors}
          compiling={compiling}
          SuccessMessages={SuccessMessages}
        /> */}

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
    </Grid>
  );
};

const MemoizedWorkFlowDesigner = memo(WorkflowDesigner);

export default (props: any) => (
  <ReactFlowProvider>
    {/* <WorkflowDesigner {...props} /> */}
    <MemoizedWorkFlowDesigner {...props} />
  </ReactFlowProvider>
);
