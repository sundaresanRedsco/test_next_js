import GroupNode from "@/app/apiflow_components/WorkflowComponents/Nodes/GroupNode";
import WorkflowOperationNode from "@/app/apiflow_components/WorkflowComponents/Nodes/workflowOperationNode";
import WorkflowStartNode from "@/app/apiflow_components/WorkflowComponents/Nodes/workflowStartNode";
import ChangeEdge from "@/app/apiflow_components/WorkflowComponents/Edges/changeEdge";
import CustomEdge from "@/app/apiflow_components/WorkflowComponents/Edges/customEdge";
import {
  changeValueToString,
  // replacePlaceholders,
} from "@/app/Helpers/helpersFunctions";
import { replacePlaceholders } from "@/app/DesignHelpers/flowHelpers";
import { AdminServices } from "@/app/Services/services";
import * as Y from "yjs";
import { v4 as uuidv4 } from "uuid";

export const nodeTypes = {
  startButtonNode: WorkflowStartNode,
  operationNode: WorkflowOperationNode,
  groupNode: GroupNode,
};

export const edgeTypes = {
  buttonEdge: CustomEdge,
  changeEdge: ChangeEdge,
};

type YDoc = Y.Doc;

const threads = 5;
let processedNodes = new Set();
export async function runHandler(
  doc: any,
  nodes: any,
  edges: any,
  tenant_id: string,
  apiFlow_Id: string,
  project_id: string,
  workspace_id: string
) {
  const runMap = doc.getMap("run");
  const runData = runMap?.toJSON()?.run;

  const globalkeys = doc.getArray("globalkeys");
  const globalKeysArray = globalkeys.toArray();

  if (runData?.status !== "COMPLETED") {
    try {
      let updatedNodes = nodes || [];
      let updatedEdges = edges || [];
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
  let currentNode = updatedNodes.find((x: any) => x.id === currentEdge?.target);
  if (!currentNode || processedNodes?.has(currentNode.id))
    return { nextEdges: [] };
  processedNodes?.add(currentNode.id);
  const parsedData =
    typeof currentNode?.data === "string"
      ? JSON.parse(currentNode.data)
      : currentNode?.data;
  currentNode = { ...currentNode, data: parsedData };

  updateRunStatus(runMap, currentEdge?.target);
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

    const changeManage = await changeManagement(changeManData);
    newPreviousEdgeResponse = operationSuccess;

    if (operationSuccess?.status === "SUCCESS") {
      for (let key of globalKeysArray) {
        if (key.node_id === currentNode.id) {
          const response = newPreviousEdgeResponse?.response?.apiResponse;
          let value = replacePlaceholders(
            key.request_template,
            { response },
            null
          );
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
  finalizeNode(runMap, currentEdge?.target, nextEdges, {
    ...newPreviousEdgeResponse,
    requestBody: requestBody,
  });
  let current_node_id = currentNode?.data?.node_name;
  return {
    nextEdges,
    previousEdgeResponse: newPreviousEdgeResponse,
    current_node_id,
  };
}

function updateRunStatus(runMap: any, target: any) {
  // Logging to indicate the function execution

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
  let payload = {};

  try {
    payload = JSON.parse(changeValueToString(payloadStr));
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
  const updateArray = (array: any) => {
    if (Array.isArray(array)) {
      return array.map((item) => {
        const key = item.name;
        let value =
          // previousEdgeResponse?.status == "SUCCESS"
          replacePlaceholders(item.test_value, { response }, globalKeysArray);
        // : item.test_value;
        // value =
        //   typeof value === "object" || Array.isArray(value)
        //     ? JSON.stringify(value)
        //     : value?.toString();
        return { key, value };
      });
    }
    return [];
  };
  return {
    operation_inputs: updateArray(currentNode?.data?.operations_input),
    operation_headers: updateArray(headersArr),
    operation_authorization: updateArray(currentNode?.data?.operations_auth),
    operation_query_params: updateArray(
      currentNode?.data?.operations_query_param
    ),
    payload: new_payload ? JSON.stringify(new_payload) : "",
    // payload: new_payload ? new_payload : "",
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

function finalizeRun(
  runMap: any,
  isQueueEmpty: any,
  globalResponse: any
) {
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
  try {
    let particular_node = currentNode;
    const apiUrl = `Api/Api_design_flow_service/save_and_fetch_by_operation_id?operation_id=${particular_node?.data.operation_id}&flow_id=${flow_id}&node_id=${targetId}&project_id=${project_id}`;

    // Make a POST request to the API endpoint

    let method = "post";
    const response = await AdminServices(method, apiUrl, requestBody);
    return response;
  } catch (error) {
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

  // Log the similarity results
  results.forEach((result) => {});
}

function getStartEdge(edges: any) {
  // Find the start edge based on your criteria
  return edges.find((edge: any) =>
    edge.sourceHandle?.endsWith("_start_startHandle")
  );
}
const extractAllVariables = (inputString: any) => {
  const variablePattern = /\{response\.([^\}\.]+)(?:\.[^\}]*)?\}/g;
  const variables = [];
  let match;

  while ((match = variablePattern.exec(inputString)) !== null) {
    variables.push(match[1]); // Extracted variable name
  }

  return variables;
};

export const checkConnections = (
  node_id: string,
  request_variable: string,
  current_node: string,
  edgesArray: any,
  nodesArray: any,
  ydoc: YDoc | null,
  apiFlowId: string,
  user_id: string
) => {
  let matches = extractAllVariables(request_variable);

  for (const match of matches) {
    for (const node of nodesArray) {
      if (node.type !== "startButtonNode" && node.data) {
        const nodeData = JSON.parse(node.data);
        if (nodeData.node_name === match) {
          let update_data = nodeData.id;
          let existingEdge = edgesArray.find(
            (x: any) => x.source === update_data && x.target === node_id
          );

          if (!existingEdge) {
            addEdges_new(ydoc, node_id, update_data, apiFlowId, user_id);
            return {
              error: "",
            };
          } else {
            return {
              error: "",
            };

            // return {
            //   error: existingEdge
            //     ? ""
            //     : `Edge from ${current_node} to ${nodeData.node_name} not found.`,
            // };
          }
        }
      }
    }
  }

  return { error: "" };
};

const addEdges_new = (
  ydoc: YDoc | null,
  target_node: any,
  source_node: any,
  apiFlowId: string,
  user_id: string
) => {
  let id = uuidv4();
  const storedVersionValue = sessionStorage.getItem("versionValue");
  let edge = {
    // ...params,
    flow_id: apiFlowId,
    created_by: user_id,
    id: id,
    animated: true,
    version: storedVersionValue,
    name: "null",
    status: "null",
    source: source_node,
    sourceHandle: source_node + "_success",
    target: target_node,
    targetHandle: target_node + "_input",
    style: {
      //   stroke: "#4CAF50",
      stroke: "#55CCFF",
    },
    type: "buttonEdge",
  };

  let updatedEdge: any = {
    action: "ADD_EDGES",
    status: "null",
    flow_id: apiFlowId,
    id: id,
    edges: edge,
  };

  // setEdges([...edges, edge]);
  const edgeMap = ydoc ? ydoc?.getMap<any>("edges") : null;
  if (edgeMap) {
    edgeMap.set(updatedEdge.id, updatedEdge);
  } else {
  }
};
