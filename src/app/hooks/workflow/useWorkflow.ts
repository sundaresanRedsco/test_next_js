import {
  CreateGlobalKeys,
  FlowReducer,
  GetDesignApiFlow,
  GetGlobalKeys,
  PostRecentModification,
  SaveFlowHandler,
  setGlobalKeys,
  setIsEditable,
  setNextNode,
} from "@/app/Redux/apiManagement/flowReducer";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addEdge, Connection, useReactFlow } from "reactflow";
import { v4 as uuidv4 } from "uuid";
import { useGlobalStore } from "../useGlobalStore";
import { ItemTypes } from "@/app/apiflow_components/WorkflowComponents/workflowSidebar";
import { isPointInBox } from "@/app/Utilities";
import {
  extractPlaceholdersFromPath,
  prepareEdges,
  prepareNodes,
} from "@/app/Helpers/helpersFunctions";
import { useParams } from "react-router-dom";
import * as Y from "yjs";
import html2canvas from "html2canvas";
import useNodeErr from "./useNodeErr";

type YDoc = Y.Doc;

export default function useWorkflow({
  setNodes,
  setEdges,
  count,
  setErrors,
  setHasNewEdited,
  versionValue,
  apiFlow_Id,
  nodes,
  onNodesChange,
  boxRef,
  settotalCounts,
}: any) {
  //--------------------------------------Redux---------------------------------------------------------

  const dispatch = useDispatch<any>();

  const { isEditable, flowYdoc, currentFlowDetails, userLists } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  //--------------------------------------Hooks---------------------------------------------------------

  const [actionProgress, setActionProgress] = useState<any>(false);
  const [userAction, setUserAction] = useState("");
  const [hasEdited, setHasEdited] = useState(false);
  const [saveFlow, setSaveFlow] = useState(false);
  const [PublishConfirmation, setPublishConfirmation] = useState(false);
  const [PublishSavePopup, setPublishSavePopup] = useState(false);

  const connectingNodeId = useRef(null);
  const params = useParams();

  //--------------------------------------Custom Hooks---------------------------------------------------------

  const { handleAddInitialErrors } = useNodeErr();

  //--------------------------------------Stores---------------------------------------------------------

  const { getEdges, getIntersectingNodes, screenToFlowPosition } =
    useReactFlow();
  const {
    storedNodes,
    setNodeFunction,
    setDimension,
    setstoredNodes,
    resetWorkFlowState,
    inputdatas,
    setParticularInputData,
  } = useWorkflowStore();
  const { dropItem } = useGlobalStore();

  //--------------------------------------UseEffects---------------------------------------------------------

  useEffect(() => {
    resetWorkFlowState("storedNodes");
  }, []);

  useEffect(() => {
    if (!flowYdoc) return;
    const nodeMap = flowYdoc?.getMap<any>("nodes");
    const edgeMap = flowYdoc?.getMap<any>("edges");
    const keysArray = flowYdoc.getArray("globalkeys");
    // const messagesArray = flowYdoc.getArray<any>("nodes");
    // const edgesArray = flowYdoc.getArray<any>("edges");
    // const runArray = flowYdoc?.getArray<any>("run");
    const runMap = flowYdoc?.getMap<any>("run");
    const errorMap = flowYdoc?.getMap<any>("errors");

    // const editNodesArry = flowYdoc.getArray<any>("nodes");
    const updateNodes = () => {
      const newMessages: any = [];
      let nodeJson = nodeMap?.toJSON();
      Object.keys(nodeJson).forEach((key) => {
        newMessages.push(nodeJson[key]);
      });

      setNodes((previousNodes: any) => {
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
              const index = accumulator?.findIndex(
                (existingNode: any) => existingNode?.id === node?.id
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

      setEdges((previousEdges: any) => {
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

    const runFlow = () => {
      let runData = runMap?.toJSON();

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
      let globalData = keysArray.toArray();

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
  }, [flowYdoc, count, storedNodes]);

  useEffect(() => {
    if (apiFlow_Id && userProfile.user.tenant_id) {
      if (!flowYdoc) {
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
            settotalCounts({
              nodes: nodesApiData.length,
              edges: edgesApiData.length,
              nodesArr: nodesApiData,
              edgesArr: edgesApiData,
            });
            if (storedNodes.length == 0) {
              setstoredNodes([{ nodes: nodesApiData, edges: edgesApiData }]);
              handleAddInitialErrors(nodesApiData);
            }

            // Get nodes and edges from ydoc
            const nodeMap = flowYdoc?.getMap<any>("nodes");
            const edgeMap = flowYdoc?.getMap<any>("edges");

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
          const keysArray = flowYdoc?.getArray("globalkeys");
          let globalData = keysArray?.toArray();
          if (userLists.length > 0) {
            dispatch(setGlobalKeys(globalData));
          }
          if (res.globalKeys) {
            let keys = JSON.parse(res.globalKeys);
            // dispatch(setGlobalKeys(keys));
            let currentIndex = 0;
            keys.forEach((key: any, i: any) => {
              keysArray?.insert(currentIndex + i, [key]);
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
    flowYdoc,
    versionValue,
    userProfile?.user?.tenant_id,
  ]);
  //--------------------------------------Functions---------------------------------------------------------

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
    [flowYdoc]
  );
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

    const edgeMap = flowYdoc?.getMap<any>("edges");
    if (edgeMap) {
      edgeMap.set(updatedEdge.id, updatedEdge);
      setNodeFunction({
        id: updatedEdge.id,
        method: "ADD_EDGES",
        obj: edge,
      });
    } else {
    }
  };
  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!ItemTypes.CARD) {
        return;
      }
      let dropPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const groupNodes = nodes.filter((node: any) => node.type == "groupNode");
      const groupNode = groupNodes.find((groupNode: any) => {
        return isPointInBox(
          { x: dropPosition.x, y: dropPosition.y },
          {
            x: groupNode.position.x || 0,
            y: groupNode.position.y || 0,
            height: groupNode?.height || 0,
            width: groupNode?.width || 0,
          }
        );
      });
      if (groupNode) {
        const { x, y } = groupNode?.position || {
          x: 0,
          y: 0,
        };
        const { x: dragX, y: dragY } = dropPosition || { x: 0, y: 0 };
        dropPosition = { x: dragX - x, y: dragY - y };
      }
      let tempData: any = dropItem;

      let count = 0;
      if (isEditable) {
        for (const node of nodes) {
          if (node.data) {
            const nodeDataV2 = JSON.parse(node.data);

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

        if (tempData?.type === "operations" && isEditable) {
          // let name: string = tempData?.name;
          let id: string = uuidv4();
          // let node_name = generateUniqueNodeName();
          // let matchedPaths = extractPlaceholdersFromPath(null);
          let matchedPaths = extractPlaceholdersFromPath(
            tempData?.full_url || null
          );

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
            parentId: groupNode?.id,
          };

          // Parse and access the variable
          const parsedData = JSON.parse(newNode?.data);

          // Add the condition to allow dragging only if operation_id is not null
          if (parsedData?.operation_id !== null) {
            let updatedNode: any = {
              action: "ADD_NODE",
              status: "null",
              flow_id: apiFlow_Id,
              id: id,
              nodes: newNode,
            };

            const nodeMap = flowYdoc?.getMap<any>("nodes");
            if (nodeMap) {
              nodeMap.set(updatedNode.id, updatedNode);
              setParticularInputData(updatedNode.id, {
                input: { input: "", isErr: false },
                header: [{ input: "", isErr: false }],
                params: [{ input: "", isErr: false }],
                edge: [{ input: [], isErr: false }],
              });
              setNodeFunction({
                id: updatedNode.id,
                method: "ADD_NODE",
                obj: newNode,
              });
              const startNode = nodes.find(
                (node: any) => node.type === "startButtonNode"
              );
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

                const edgeMap = flowYdoc?.getMap<any>("edges");
                if (edgeMap) {
                  edgeMap.set(updatedEdge.id, updatedEdge);
                } else {
                }
              }
            } else {
            }
          } else {
          }
        } else if (tempData?.type == "groupNode" && isEditable) {
          let id = uuidv4();
          const names = nodes
            .filter((node: any) => node.type == "groupNode")
            .map((node: any) => node?.name);
          const node_name =
            names.length > 0
              ? tempData?.name + " " + names.length
              : tempData?.name;
          const newNode = {
            id: id,
            type: "groupNode",
            name: node_name,
            position: { x: dropPosition?.x, y: dropPosition?.y },
            positionAbsolute: { x: dropPosition?.x, y: dropPosition?.y },
            status: "null",
            flow_id: apiFlow_Id,
            version: versionValue,
            created_by: userProfile.user.user_id,
            data: { name: node_name, id, operation_id: tempData?.id },
            response: {},
            width: 700,
            height: 400,
          };
          let updatedNode: any = {
            action: "ADD_NODE",
            status: "null",
            flow_id: apiFlow_Id,
            id: id,
            nodes: newNode,
          };

          const nodeMap = flowYdoc?.getMap<any>("nodes");
          if (nodeMap) {
            nodeMap.set(updatedNode.id, updatedNode);
          }
          setDimension(id, {
            width: 700,
            height: 400,
          });
        }
        // })
        // .catch((error: any) => {

        // });
      }
    },
    [screenToFlowPosition, dropItem]
  );

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
      }
    }
  };
  const handleSaveClosePopup = () => {
    setSaveFlow(false);
    setPublishConfirmation(false);
  };
  const handlePublishPopup = () => {
    setPublishConfirmation(true);
    setPublishSavePopup(true);
  };

  const handlePublishClosePopup = () => {
    setPublishConfirmation(false);
    setPublishSavePopup(false);
  };
  const onSaveHandler = async () => {
    // handleSavePopup()
    const nodeMap = flowYdoc?.getMap("nodes");
    const edgesMap = flowYdoc?.getMap("edges");

    const { nodeArray, deleteNodeId } = prepareNodes(nodeMap);
    const { edgesArray, deleteEdgeId } = prepareEdges(edgesMap);

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

    const runMap = flowYdoc?.getMap<any>("run");
    if (runMap) {
      runMap.set("run", updateData);
      dispatch(SaveFlowHandler(updatedData))
        .unwrap()
        .then((res: any) => {
          const keysArrayNew = flowYdoc?.getArray("globalkeys");
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
    }
  };
  const handleSavePopup = () => {
    setSaveFlow(true);
  };
  const captureSnapshot = async () => {
    if (boxRef.current) {
      const canvas = await html2canvas(boxRef.current, {
        backgroundColor: null, // Retain transparency
        useCORS: true, // Allow cross-origin images
        scale: 2, // Optional: Higher quality
      });

      // Convert canvas to Base64 image URL
      const imageURL = canvas.toDataURL("image/png");
      return imageURL;
    }
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

  return {
    actionProgress,
    userAction,
    setHasEdited,
    isValidConnection,
    onConnect,
    onDrop,
    handleNodeChange,
    onSaveHandler,
    handleSavePopup,
    saveFlow,
    handleSaveClosePopup,
    handlePublishPopup,
    handlePublishClosePopup,
    PublishSavePopup,
    PublishConfirmation,
  };
}
