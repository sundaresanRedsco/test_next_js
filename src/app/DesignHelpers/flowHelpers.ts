import axios from "axios";
import { adminUrl } from "../Services/auth";

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
  // const nodeMap = doc.getMap("nodes");
  // const edgesMap = doc.getMap("edges");
  const runData = runMap?.toJSON()?.run;

  const globalkeys = doc.getArray("globalkeys");
  const globalKeysArray = globalkeys.toArray();

  if (runData?.status !== "COMPLETED") {
    try {
      let updatedNodes = nodes || [];
      let updatedEdges = edges || [];

      // // Update nodes and edges
      // updateNodesAndEdges(nodeMap, updatedNodes);
      // updateNodesAndEdges(edgesMap, updatedEdges, "edges");

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

      finalizeRun(runMap, queue.length === 0, globalResponse);
    } catch (error) {
      console.error("Error occurred:", error);
      stopRun(runMap);
    }
  }
}

export function initializeRun(runMap: any, target: any) {
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

export async function processNode(
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
      doc.name,
      currentNode,
      requestBody
    );
    newPreviousEdgeResponse = operationSuccess;

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
    let changeManResponse = await changeManagement(changeManData);

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

// Function to compute similarity score between two arrays
// function arraySimilarity(arr1: any[], arr2: any[]): number {
//   const intersection = arr1.filter(value => arr2.includes(value));
//   return (intersection.length / Math.max(arr1.length, arr2.length)) * 100; // Returns percentage of similarity
// }

// // Function to compare two nodes (objects)
// function compareNodes(node1: any, node2: any) {
//   let similarityScore = 0;
//   let totalKeys = 0;

//   // Check for key similarity
//   const node1Keys = Object.keys(node1);
//   const node2Keys = Object.keys(node2);

//   // Compare keys
//   const commonKeys = node1Keys.filter(key => node2Keys.includes(key));
//   const keySimilarity = (commonKeys.length / Math.max(node1Keys.length, node2Keys.length)) * 100;

//   // Loop through common keys and compare their content
//   commonKeys.forEach(key => {
//     totalKeys++;

//     if (Array.isArray(node1[key]) && Array.isArray(node2[key])) {
//       // If both values are arrays, calculate array similarity
//       const arrayScore = arraySimilarity(node1[key], node2[key]);
//       similarityScore += arrayScore;
//     } else if (typeof node1[key] === 'object' && typeof node2[key] === 'object') {
//       // If both values are objects, recursively compare them
//       const nestedSimilarity = compareNodes(node1[key], node2[key]);
//       similarityScore += nestedSimilarity.contentSimilarity;
//     } else if (node1[key] === node2[key]) {
//       // If the values are identical, full score for this key
//       similarityScore += 100;
//     } else {
//       // No match
//       similarityScore += 0;
//     }
//   });

//   // Final score
//   return {
//     keySimilarity,
//     contentSimilarity: totalKeys > 0 ? similarityScore / totalKeys : 0,
//   };
// }

// // Function to compare all nodes in globalResponse
// function compareAllNodes(globalResponse: any) {
//   const nodeKeys = Object.keys(globalResponse);
//   const results = [];

//   // Compare each node with every other node
//   for (let i = 0; i < nodeKeys.length; i++) {
//     for (let j = i + 1; j < nodeKeys.length; j++) {
//       const node1 = globalResponse[nodeKeys[i]];
//       const node2 = globalResponse[nodeKeys[j]];

//       const similarityResult = compareNodes(node1, node2);
//       results.push({
//         node1: nodeKeys[i],
//         node2: nodeKeys[j],
//         keySimilarity: similarityResult.keySimilarity,
//         contentSimilarity: similarityResult.contentSimilarity,
//       });
//     }
//   }

//   return results;
// }

// Example globalResponse
// const globalResponse = {
//   node_77bkndfj: { products: Array(30), total: 194, skip: 0, limit: 30 },
//   node_7bxs0lys: { users: Array(30), total: 208, skip: 0, limit: 30 },
//   node_xx1234yy: { products: Array(10), total: 50, skip: 0, limit: 10 },
// };

// Compare all nodes and get similarity results
// const similarityResults = compareAllNodes(setGlobalResponse);

// Log results
// similarityResults.forEach(result => {
//   console.log(`Node ${result.node1} vs Node ${result.node2}`);
//   console.log(`Key Similarity: ${result.keySimilarity}%`);
//   console.log(`Content Similarity: ${result.contentSimilarity}%\n`);
// });

export function updateRunStatus(runMap: any, target: any) {
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

export function createRequestBody(
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

        value =
          typeof value === "object" || Array.isArray(value)
            ? JSON.stringify(value)
            : value?.toString();

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
  };
}

export function finalizeNode(
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

export function finalizeRun(
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

export function stopRun(runMap: any) {
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

export async function parallel(arr: any, apiLikeFunction: any, threads: any) {
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

export const updateKeys = (ydoc: any, value: any, id: any, keysArray: any) => {
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

export function getNextEdges(
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

export async function performOperation(
  doc: any,
  targetId: any,
  flow_id: any,
  currentNode: any,
  requestBody: any
) {
  try {
    // Define the URL of the API endpoint you want to call
    // const nodeMap = doc.getMap("nodes");
    // let particular_node = nodeMap.get(targetId).nodes;
    let particular_node = currentNode;
    const apiUrl = `${adminUrl}/Api/Api_design_flow_service/save_and_fetch_by_operation_id?operation_id=${particular_node?.data.operation_id}&flow_id=${flow_id}&node_id=${targetId}`;

    const response = await axios.post(apiUrl, requestBody);

    // Log the response data

    // Return the response data

    return response.data;
  } catch (error) {
    // Handle errors here
    // console.error("Error:", error);
    // You might want to throw the error here if you don't want to handle it locally
    throw error;
  }
}

async function changeManagement(data: any) {
  try {
    const apiUrl = `${adminUrl}/Api/Api_design_flow_service/update_node_chaneges_to_changesmanagement?Flow_id=${data?.flow_id}&node_id=${data?.node_id}&tenant_id=${data?.tenant_id}&workspace_id=${data?.workspace_id}&project_id=${data?.project_id}&operation_id=${data?.operation_id}`;

    const changeRes = await axios.post(apiUrl, data?.requestBody);

    return changeRes?.data;
  } catch (error) {
    throw error;
  }
}

export function calculateSimilarityScore(nodeA: any, nodeB: any) {
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

export function compareGlobalResponse(globalResponse: any) {
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

export function getStartEdge(edges: any) {
  // Find the start edge based on your criteria
  return edges.find((edge: any) =>
    edge.sourceHandle?.endsWith("_start_startHandle")
  );
}

function hasFilterCondition(query: any) {
  // Check if the query contains square brackets and an equality operator
  return /\[([^\]]*=\s*[^]]*)\]/.test(query);
}

// replace holders in apiflow designer
// export function replacePlaceholders(
//   template: any,
//   data: any,
//   globalArrayKeys: any
// ) {

//   if (typeof template === "string" && template.includes("{")) {
//     if (hasFilterCondition(template)) {

//       template = dynamicFilter(data, template);

//       return template;
//     }
//     const placeholders = template.match(/{(.*?)}/g); // Find all placeholders
//     if (placeholders) {
//       placeholders.forEach((place) => {
//         let keys;
//         let replacementValue;
//         // Check if the placeholder starts with 'global.'

//         if (globalArrayKeys?.length > 0 && place.includes("{global.")) {
//           const startIndex = place.indexOf("{global.") + 8; // 8 is the length of '{global.'
//           const endIndex = place.indexOf("}", startIndex); // Find the closing '}'
//           let globalKey: any;
//           if (endIndex > startIndex) {
//             globalKey = place.slice(startIndex, endIndex);

//           } else {
//             console.error("Closing brace '}' not found for '{global.'");
//           }
//           const globalObject = globalArrayKeys
//             ? globalArrayKeys.find((obj: any) => obj.key_name === globalKey)
//             : null;
//           console.log(globalObject, "globalObject");
//           replacementValue = globalObject?.value
//             ? globalObject?.value
//             : undefined;
//         } else {
//           keys = place
//             .slice(1, -1)
//             .split(/\.|\[|\]/)
//             .filter(Boolean); // Split by . or [ or ]
//           replacementValue = data;
//         }

//         // Navigate through the structure if not a global key
//         if (keys) {
//           for (const k of keys) {
//             if (Array.isArray(replacementValue)) {
//               replacementValue = replacementValue[parseInt(k)] || undefined;
//             } else {
//               replacementValue = replacementValue
//                 ? replacementValue[k]
//                 : undefined;
//             }
//           }
//         }

//         template = template.replace(
//           place,
//           replacementValue ? replacementValue : place
//         );
//       });
//     }
//     return template;
//   } else if (typeof template === "object" && template !== null) {
//     const result: any = Array.isArray(template) ? [] : {};
//     for (const key in template) {
//       result[key] = replacePlaceholders(template[key], data, globalArrayKeys);
//     }
//     return result;
//   } else {
//     return template; // Return the value if it's not a placeholder
//   }
// }

export function replacePlaceholders(
  template: any,
  data: any,
  globalArrayKeys: any
) {
  console.log(template, "rphTEMPLATE");
  if (
    typeof template === "string" &&
    (template.includes("{") || template.includes("&"))
  ) {
    if (hasFilterCondition(template)) {
      console.log("template", template);
      console.log("template", hasFilterCondition(template));
      template = dynamicFilter(data, template);
      console.log("template3", template);
      return template;
    }
    const placeholders = template.match(/{(.*?)}/g); // Find all placeholders
    console.log(placeholders, "rphPLACEHOLDERS");

    if (placeholders) {
      placeholders.forEach((place) => {
        let keys;
        let replacementValue;
        // Check if the placeholder starts with 'global.'
        console.log("place", place, typeof place);
        console.log(place, typeof place, "rphPLACE");
        if (globalArrayKeys?.length > 0 && place.includes("{global.")) {
          const startIndex = place.indexOf("{global.") + 8; // 8 is the length of '{global.'
          const endIndex = place.indexOf("}", startIndex); // Find the closing '}'
          let globalKey: any;
          if (endIndex > startIndex) {
            globalKey = place.slice(startIndex, endIndex);
            console.log(globalKey, "globalKey");
          } else {
            console.error("Closing brace '}' not found for '{global.'");
          }
          const globalObject = globalArrayKeys
            ? globalArrayKeys.find((obj: any) => obj.key_name === globalKey)
            : null;
          console.log(globalObject, "globalObject");
          replacementValue = globalObject?.value
            ? globalObject?.value
            : undefined;
        } else {
          keys = place
            .slice(1, -1)
            .split(/\.|\[|\]/)
            .filter(Boolean); // Split by . or [ or ]
          replacementValue = data;
        }
        console.log(keys, "rphPLACEKEYS");
        console.log(replacementValue, "rphREPLACEMENTVALUE");
        // Navigate through the structure if not a global key
        if (keys) {
          for (const k of keys) {
            if (Array.isArray(replacementValue)) {
              replacementValue = replacementValue[parseInt(k)] || undefined;
              console.log(k, typeof k, replacementValue, "rphARRAY");
            } else {
              replacementValue = replacementValue
                ? replacementValue[k]
                : undefined;
              console.log(k, typeof k, replacementValue, "rphOBJECT");
            }
          }
        }

        console.log(
          place,
          replacementValue,
          JSON.stringify(replacementValue),
          "rphREPLACEMENTFINAL"
        );
        template = template.replace(
          place,
          // JSON.stringify(replacementValue) || place
          replacementValue ? replacementValue : place
        );
      });
    }

    //----------------------multiple condition-----------------------------------------

    const multipleCondition = splitAndExtractPatterns(template);
    console.log(multipleCondition, "rphMULTIPLECONDITION");

    let multipleConditionResult = multipleFqlConditions(multipleCondition);

    return multipleConditionResult;

    //----------------------multiple condition-----------------------------------------
  } else if (typeof template === "object" && template !== null) {
    const result: any = Array.isArray(template) ? [] : {};
    for (const key in template) {
      console.log(key, "rphKEY");
      console.log(template[key], "rphVALUE");
      result[key] = replacePlaceholders(template[key], data, globalArrayKeys);
    }
    console.log(result, "rphRESULT");
    return result;
  } else {
    return template; // Return the value if it's not a placeholder
  }
}

//fql functions
export function multipleFqlConditions(multipleCondition: any) {
  let multiVal: any[] = [];

  multipleCondition?.forEach((pattern: any) => {
    const templateSplit = extractCurlyBraceContent(pattern);

    if (templateSplit?.beforeCurly === "upperCase") {
      const upperCaseResult = upperCaseFunc(templateSplit?.curlyContent);
      multiVal?.push(upperCaseResult);
    } else if (templateSplit?.beforeCurly === "lowerCase") {
      const lowerCaseResult = lowerCaseFunc(templateSplit?.curlyContent);
      multiVal?.push(lowerCaseResult);
    } else if (templateSplit?.beforeCurly === "parseJson") {
      const stringToJsonResult = stringToJsonFunc(templateSplit?.curlyContent);
      multiVal?.push(stringToJsonResult);
    } else if (templateSplit?.beforeCurly === "appendArray") {
      const appendArrayResult = appendArraysFunc(templateSplit?.curlyContent);
      multiVal?.push(appendArrayResult);
    } else if (templateSplit?.beforeCurly === "checkCondition") {
      const conditionResult = parseTernaryExpressionFunc(
        templateSplit?.curlyContent
      );
      multiVal?.push(conditionResult);
    } else {
      // multiVal?.push(templateSplit?.curlyContent);
      multiVal?.push(pattern);
    }
  });

  let multiValResult = multiVal?.toString();

  return multiValResult;
}

export function splitAndExtractPatterns(input: string) {
  if (input.startsWith("&appendArray")) {
    const patterns = input
      .replace(/^\&appendArray\(/, "")
      .replace(/\)$/, "")
      .replace(/\[|\]/g, "")
      .split(",")
      .map((value) => value.trim());

    return patterns;
  } else if (input.startsWith("&checkCondition")) {
    const splitWithRespectToBrackets = (val: string | any[]) => {
      const result = [];
      let current = "";
      let depth = 0;

      for (let i = 0; i < val.length; i++) {
        const char = val[i];
        if (char === "[" || char === "(") {
          depth++;
        } else if (char === "]" || char === ")") {
          depth--;
        }

        if (char === "," && depth === 0) {
          // If at the top level (not inside brackets), split here
          result.push(current.trim());
          current = "";
        } else {
          current += char; // Accumulate characters
        }
      }

      if (current) {
        result.push(current.trim()); // Add the last segment
      }

      return result.map((str, index) => (index === 0 ? str : `&${str}`));
    };
    const patterns = splitWithRespectToBrackets(input);
    return patterns;
  } else {
    const patterns = input.split(",&").map((str, index) => {
      const check = index === 0 ? str.trim() : `&${str.trim()}`;
      return check;
    });

    return patterns;
  }
  // const patterns = input.split(",&").map((str, index) => {
  //   const check = index === 0 ? str.trim() : `&${str.trim()}`;
  //   return check;
  // });

  // return patterns;
}

export function extractCurlyBraceContent(str: any) {
  if (typeof str !== "string" || !str.startsWith("&")) {
    return { beforeCurly: null, curlyContent: null };
  }

  const start = str?.indexOf("(");
  const end = str?.lastIndexOf(")");

  if (start === -1 || end === -1 || start >= end) {
    return { beforeCurly: null, curlyContent: null };
  }

  const beforeCurly = str.substring(0, start).replace("&", "");
  const curlyContent = str.substring(start + 1, end);

  return { beforeCurly, curlyContent };
}

function splitCommaSeparatedConditions(input: string): string[] {
  // This regular expression matches balanced parentheses and everything outside them.
  const regex = /(?:\([^()]*\)|[^,])+/g;
  const matches = input.match(regex);

  // Trim each match to remove excess spaces
  return matches ? matches.map((match) => match.trim()) : [];
}

export const upperCaseFunc = (str: string | number | object | null) => {
  if (typeof str !== "string") {
    return str;
  }

  let upperCaseValue: any[] = [];

  const multipleCondition = splitAndExtractPatterns(str);

  multipleCondition?.forEach((val: any) => {
    const commaSeperatedValues = splitCommaSeparatedConditions(val);

    commaSeperatedValues?.forEach((item: any) => {
      if (item?.startsWith("&")) {
        let multipleConditionResult = multipleFqlConditions(multipleCondition);

        let strUpperCase = multipleConditionResult?.toUpperCase();

        upperCaseValue.push(strUpperCase);
      } else {
        upperCaseValue.push(item?.toUpperCase());
      }
    });
  });

  return upperCaseValue;
};

export const lowerCaseFunc = (
  str: string | number | object | null
): string | number | object | null => {
  if (typeof str !== "string") {
    return str;
  }
  // return str?.toLowerCase();
  let lowerCaseValue = "";

  const multipleCondition = splitAndExtractPatterns(str);

  multipleCondition?.forEach((val: any) => {
    if (val?.startsWith("&")) {
      let multipleConditionResult = multipleFqlConditions(multipleCondition);

      let strUpperCase = multipleConditionResult?.toLowerCase();
      lowerCaseValue = strUpperCase;
    } else {
      lowerCaseValue = val?.toLowerCase();
    }
  });

  return lowerCaseValue;
};

export const stringToJsonFunc = (value: any) => {
  try {
    if (typeof value === "string") {
      if (
        (value.startsWith("{") && value.endsWith("}")) ||
        (value.startsWith("[") && value.endsWith("]"))
      ) {
        return JSON.parse(value);
      }
    }
    return value;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return value;
  }
};

//for array

export function extractCommaSeperatedValues(input: any): any[] {
  // const arrays = input
  //   .replace(/^\[|\]$/g, "")
  //   .split(",")
  //   .map((value) => value.trim().replace(/^\[|\]$/g, ""))
  //   .filter((value) => value !== "");

  const multipleCondition = splitAndExtractPatterns(input);

  // const arrays = input
  //   .replace(/^\&appendArray\(\[/, "")
  //   .replace(/\]\)$/, "")
  //   .split(/,(?![^\[]*\])/g)
  //   .map((value) => value.trim());

  const arrays =
    input
      .replace(/^\&appendArray\(\[/, "") // Remove &appendArray([ wrapper
      .replace(/\]\)$/, "") // Remove closing brackets ])
      .match(/(?<=\[).*?(?=\])/g) // Match content inside square brackets
      ?.flatMap((group: string) =>
        group.split(",").map((value: string) => value.trim())
      ) || [];
  // ?.flatMap((group: string) => group.split(",").map((value) => value.trim())); // Split each group by commas and trim values

  // Return the resulting flattened array
  const result = arrays;

  let multipleFqlArr: any[] = [];
  result?.forEach((val: any) => {
    if (val?.startsWith("&")) {
      let multipleConditionResult = multipleFqlConditions([val]);

      multipleFqlArr.push(multipleConditionResult);
    } else {
      multipleFqlArr.push(val);
    }
  });

  // return result;
  return multipleFqlArr;
}

export function appendArraysFunc(inputs: any) {
  const commaSeperatedValues = extractCommaSeperatedValues(inputs);
  let resultArray: any[] = [];

  resultArray = commaSeperatedValues;

  return resultArray;
}

//for condition
interface ConditionParts {
  lhs: string;
  operator: string;
  rhs: string;
}

const operatorPattern = /(===|!==|==|!=|>=|<=|>|<)/;

//condition part
function extractConditionParts(condition: string): ConditionParts {
  const match = condition?.match(operatorPattern);
  if (!match) {
    throw new Error("No operator found in condition");
  }

  const operator = match[0];
  const [lhs, rhs] = condition?.split(operator)?.map((part) => part.trim());

  return { lhs, operator, rhs };
}

//evaluate based on condition
function evaluateCondition(condition: ConditionParts): boolean {
  const lhsValue = condition?.lhs;
  const rhsValue = condition?.rhs;
  const operValue = condition?.operator;

  switch (operValue) {
    case "===":
      return lhsValue === rhsValue;

    case "!==":
      return lhsValue !== rhsValue;

    case ">":
      return lhsValue > rhsValue;

    case "<":
      return lhsValue < rhsValue;

    case ">=":
      return lhsValue >= rhsValue;

    case "<=":
      return lhsValue <= rhsValue;

    default:
      throw new Error(`Unsupported operator: ${operValue}`);
  }
}

export function parseTernaryExpressionFunc(expression: string): string {
  if (!expression?.includes("?")) return expression;

  const ternaryPattern = /(.+?)\?(.+?):(.+)/;
  // const ternaryPattern = /^(.*?[^?])\?([^:]+):(.+)$/;
  const match = expression?.match(ternaryPattern);

  if (!match) return expression;

  const [_, condition, truePart, falsePart] = match.map((part) => part.trim());

  const isConditionTrue = evaluateCondition(extractConditionParts(condition));
  const parsePart = (part: string) => {
    const evaluatedPart = parseTernaryExpressionFunc(part);

    return evaluatedPart.startsWith("&")
      ? multipleFqlConditions([evaluatedPart])
      : evaluatedPart;
  };
  return isConditionTrue ? parsePart(truePart) : parsePart(falsePart);

  // if (match) {
  //   const condition = match[1]?.trim();
  //   const truePart = match[2]?.trim();
  //   const falsePart = match[3]?.trim();

  //   const conditionParts = extractConditionParts(condition);

  //   const isConditionTrue = evaluateCondition(conditionParts);

  //   const evaluatedTruePart = parseTernaryExpressionFunc(truePart);
  //   const evaluatedFalsePart = parseTernaryExpressionFunc(falsePart);

  //   const fqlTruePart = evaluatedTruePart?.startsWith("&")
  //     ? multipleFqlConditions([evaluatedTruePart])
  //     : evaluatedTruePart;

  //   const fqlFalsePart = evaluatedFalsePart?.startsWith("&")
  //     ? multipleFqlConditions([evaluatedFalsePart])
  //     : evaluatedFalsePart;

  //   // return isConditionTrue ? evaluatedTruePart : evaluatedFalsePart;
  //   return isConditionTrue ? fqlTruePart : fqlFalsePart;
  // }

  return expression;
}

export const updateArray = (
  array: any,
  previousEdgeResponse: any,
  globalKeysArray: any
) => {
  if (Array.isArray(array)) {
    return array.map((item) => {
      const key = item.name;

      let response = previousEdgeResponse;
      let value = previousEdgeResponse
        ? replacePlaceholders(item.test_value, { response }, globalKeysArray)
        : item.test_value;

      value =
        typeof value === "object" || Array.isArray(value)
          ? JSON.stringify(value)
          : value?.toString();

      return { key, value };
    });
  }
  return [];
};

function extractPathConditionAndField(query: any) {
  const pathMatch = query.match(/\{([^\[]+)\[/);
  const conditionMatch = query.match(/\[([^\]]+)\]/);
  const fieldMatch = query.match(/\]\.([^}]+)\}/);

  const path = pathMatch ? pathMatch[1].trim() : null;
  const condition = conditionMatch ? conditionMatch[1].trim() : null;
  const field = fieldMatch ? fieldMatch[1].trim() : null;

  return { path, condition, field };
}

function parseCondition(condition: any) {
  const [key, value] = condition.split("=").map((s: any) => s.trim());
  const parsedValue = isNaN(value) ? value.replace(/"/g, "") : Number(value);
  return { key, value: parsedValue };
}

function getValueByPath(obj: any, path: any) {
  return path
    .split(".")
    .reduce((o: any, p: any) => (o ? o[p] : undefined), obj);
}

function filterByCondition(array: any, { key, value }: any) {
  return array.filter((item: any) => item[key] === value);
}

// function dynamicFilter(data: any, queries: any) {
//   // Split queries by delimiter (assumed to be ',')
//   const queryArray = queries.split(/\s*,\s*/);

//   // Process each query and collect results
//   const results = queryArray.map((query: any) => {
//     const { path, condition, field } = extractPathConditionAndField(query);

//     if (!path) {
//       throw new Error("Invalid query format: missing path");
//     }

//     const array = getValueByPath(data, path);
//     if (!Array.isArray(array)) {
//       throw new Error(`Path does not lead to an array: ${path}`);
//     }

//     let result;
//     if (condition) {
//       const parsedCondition = parseCondition(condition);
//       const filteredArray = filterByCondition(array, parsedCondition);
//       result = field
//         ? filteredArray.map((item: any) => item[field])
//         : filteredArray;
//     } else {
//       result = field ? array.map((item) => item[field]) : array;
//     }

//     // If the result is an array with one item and no field is specified, return the item directly
//     if (result.length === 1 && !field) {
//       result = result[0];
//     }

//     return result;
//   });

//   // Flatten the results if there's only one query, otherwise return as an array of results
//   return results.length === 1 ? results[0] : results;
// }

// function dynamicFilter(data: any, queries: any) {
//   // Split queries by delimiter (assumed to be ',')
//   const queryArray = queries.split(/\s*,\s*/);

//   const results = queryArray.map((query: any) => {
//     const { path, condition, field } = extractPathConditionAndField(query);

//     if (!path) {
//       throw new Error("Invalid query format: missing path");
//     }

//     const array = getValueByPath(data, path);
//     if (!Array.isArray(array)) {
//       throw new Error(`Path does not lead to an array: ${path}`);
//     }

//     if (condition) {
//       const parsedCondition = parseCondition(condition);
//       const filteredArray = filterByCondition(array, parsedCondition);
//       return field
//         ? filteredArray.map((item: any) => item[field])
//         : filteredArray;
//     } else {
//       return field ? array.map((item) => item[field]) : array;
//     }
//   });

//   return results;
// }

function dynamicFilter(data: any, queries: any) {
  // Split queries by delimiter (assumed to be ',')
  const queryArray = queries.split(/\s*,\s*/);

  const results = queryArray.map((query: any) => {
    const { path, condition, field } = extractPathConditionAndField(query);

    if (!path) {
      throw new Error("Invalid query format: missing path");
    }

    const array = getValueByPath(data, path);
    if (!Array.isArray(array)) {
      throw new Error(`Path does not lead to an array: ${path}`);
    }

    if (condition) {
      const parsedCondition = parseCondition(condition);
      const filteredArray = filterByCondition(array, parsedCondition);
      return field
        ? filteredArray.map((item: any) => item[field])
        : filteredArray;
    } else {
      return field ? array.map((item) => item[field]) : array;
    }
  });

  // Return a single array if there's only one query, otherwise return an array of arrays
  return results.length === 1 ? results[0] : results;
}

export function generateUniqueNodeName() {
  const prefix = "node_";
  const randomString = Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric string
  return `${prefix}${randomString}`;
}

export function extractPlaceholdersFromPath(url: string) {
  if (!url) {
    return [];
  }

  try {
    // Create a URL object to handle the URL components properly
    const urlObject = new URL(url);

    // Get the pathname (which is the part of the URL after the host and port)
    const urlPath = urlObject.pathname;

    // Define regular expressions to match placeholders
    const curlyBraceRegex = /\{([^}]+)\}/g;
    const colonRegex = /:([^\/\?\{\}]+)/g;

    const placeholders = [];
    let match;

    // Extract curly brace placeholders
    while ((match = curlyBraceRegex.exec(urlPath)) !== null) {
      placeholders.push(match[1]);
    }

    // Extract colon placeholders
    while ((match = colonRegex.exec(urlPath)) !== null) {
      placeholders.push(match[1]);
    }

    return placeholders;
  } catch (error) {
    console.error("Invalid URL:", error);
    return [];
  }
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const extractAllVariables = (inputString: any) => {
  const variablePattern = /\{response\.([^\}\.]+)(?:\.[^\}]*)?\}/g;
  const variables = [];
  let match;

  while ((match = variablePattern.exec(inputString)) !== null) {
    variables.push(match[1]); // Extracted variable name
  }

  return variables;
};

export const validatePlaceholders = (str: any) => {
  const regex = /\{[^}]*$/;
  return !regex.test(str);
};

export function prepareNodes(nodeMap: any) {
  const nodeArray: any = [];
  const deleteNodeId: any = [];
  const nodeJson = nodeMap?.toJSON();

  Object.keys(nodeJson).forEach((key) => {
    if (nodeJson[key].action === "DELETE_NODES") {
      deleteNodeId.push(nodeJson[key]?.nodes?.id);
    } else {
      // if (nodeJson[key].nodes?.type === "operationNode") {
      nodeArray.push({
        ...nodeJson[key].nodes,
        // data: JSON.stringify(nodeJson[key]?.nodes?.data),
        response: nodeJson[key]?.response || null,
        data: nodeJson[key]?.nodes?.data,

        is_active: true,
      });
      // } else {
      //   nodeArray.push({ ...nodeJson[key].nodes, status: "Active" });
      // }
    }
  });

  return { nodeArray, deleteNodeId };
}

// Helper function to prepare edges data
export function prepareEdges(edgesMap: any) {
  const edgesArray: any = [];
  const deleteEdgeId: any = [];
  const edgesJson = edgesMap?.toJSON();

  Object.keys(edgesJson).forEach((key) => {
    if (edgesJson[key].action === "DELETE_EDGES") {
      deleteEdgeId.push(edgesJson[key]?.edges?.id);
    } else {
      edgesArray.push({
        ...edgesJson[key].edges,
        type: "buttonEdge",
        is_active: true,
      });
    }
  });

  return { edgesArray, deleteEdgeId };
}
