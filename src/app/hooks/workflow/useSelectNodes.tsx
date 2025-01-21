import React, { useEffect, useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import { useReactFlow } from "reactflow";
import useReusableFunctions from "./useReusableFunctions";

type Props = {
  nodes: any;
  edges: any;
  apiFlow_Id: any;
  versionValue: any;
  lastCursorPosition: any;
  ydoc: any;
  wWsProvider: any;
  userColor: any;
};

export default function useSelectNodes({
  nodes,
  apiFlow_Id,
  versionValue,
  edges,
  lastCursorPosition,
  ydoc,
  wWsProvider,
  userColor,
}: Props) {
  const { screenToFlowPosition, getEdges, getNode } = useReactFlow();

  const { handleCopyNodes, handleCutNodes } = useReusableFunctions();

  const {
    dimensions,
    setDimension,
    copiedData,
    selectedFlowIds,
    setCopyClicked,
    setParticularInputData,
    resetWorkFlowState,
    setNodeFunction,
  } = useWorkflowStore();
  const { isEditable, flowYdoc } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  // Function to process nodes and add them to the map
  const addCopiedNodes = (
    nodeMap: any,
    position: any,
    nodeIdMapping: any,
    newGrpNodes: any
  ) => {
    copiedData?.nodes?.forEach((tempData: any, index: number) => {
      const isGroupNode = tempData?.type == "groupNode";
      const hasParentId = tempData?.parentId != undefined;

      const node_name = isGroupNode
        ? generateGroupNodeName()
        : getUniqueNodeName(tempData, nodes);

      if (
        (tempData?.type == "operationNode" || tempData?.type == "groupNode") &&
        isEditable
      ) {
        let id: string = uuidv4();
        nodeIdMapping[tempData.id] = id;

        const newNode = createNewNode(
          tempData,
          id,
          node_name,
          position,
          hasParentId,
          index,
          newGrpNodes,
          isGroupNode
        );

        const parsedData = JSON?.parse(newNode?.data);

        if (parsedData?.operation_id !== null) {
          addNodeToMap(
            id,
            newNode,
            nodeMap,
            isGroupNode,
            tempData,
            newGrpNodes
          );
        }
      }
    });
  };

  const generateGroupNodeName = () => {
    const groupNodeNames = nodes
      .filter((node: any) => node.type === "groupNode")
      .map((node: any) => node?.name);
    return `Frame ${groupNodeNames.length}`;
  };

  const getUniqueNodeName = (tempData: any, nodes: any[]): string => {
    const baseName = tempData?.name;
    let currentName = baseName;
    let suffixCount = 0;

    while (nodes.some((node: any) => node.name === currentName)) {
      suffixCount++;
      currentName = `${baseName}_${suffixCount}`;
    }

    return currentName;
  };

  const createNewNode = (
    tempData: any,
    id: any,
    node_name: any,
    position: any,
    hasParentId: any,
    index: any,
    newGrpNodes: any,
    isGroupNode: any
  ) => {
    return {
      id: id,
      type: tempData?.type,
      name: node_name,
      position: hasParentId
        ? tempData.position
        : {
            x: position?.x + index * 20,
            y: position?.y + index * 20,
          },
      positionAbsolute: hasParentId
        ? tempData.positionAbsolute
        : {
            x: position?.x + index * 20,
            y: position?.y + index * 20,
          },
      status: "null",
      flow_id: apiFlow_Id,
      version: versionValue,
      created_by: userProfile?.user?.user_id,
      data: JSON?.stringify({
        name: node_name,
        id,
        node_name,
        operation_id: tempData?.id,
        method: tempData?.http_method,
        fullUrl: tempData?.full_url,
        operationsHeader: [],
        operationsInput: [],
        operationsAuth: [],
        operationsQueryParam: [],
        rawOutput: "",
        rawPayload: "",
      }),
      ...(tempData.parentId && {
        parentId: newGrpNodes[tempData.parentId]
          ? newGrpNodes[tempData.parentId]
          : undefined,
      }),
      response: {},
      width: isGroupNode
        ? dimensions[tempData.id]?.width || tempData?.width
        : 230,
      height: isGroupNode
        ? dimensions[tempData.id]?.height || tempData?.height
        : 120,
      dragger: userProfile?.user?.email,
      color: userColor,
    };
  };

  const addNodeToMap = (
    id: any,
    newNode: any,
    nodeMap: any,
    isGroupNode: any,
    tempData: any,
    newGrpNodes: any
  ) => {
    let updatedNode: any = {
      action: "ADD_NODE",
      status: "null",
      flow_id: apiFlow_Id,
      id: id,
      nodes: newNode,
    };

    console.log(newNode, "AWARENSSDATA");

    nodeMap?.set(updatedNode?.id, updatedNode);

    if (isGroupNode) {
      setDimension(id, {
        width: dimensions[tempData.id]?.width || tempData?.width,
        height: dimensions[tempData.id]?.height || tempData?.height,
      });
      newGrpNodes[tempData.id] = id;
    }
    setCopyClicked(tempData?.id, false);
    if (newNode.type == "operationNode") {
      setParticularInputData(id, {
        input: { input: "", isErr: false },
        header: [{ input: "", isErr: false }],
        params: [{ input: "", isErr: false }],
        edge: [{ input: [], isErr: false }],
      });
    }
    setNodeFunction({
      id: updatedNode?.id,
      method: "ADD_NODE",
      obj: newNode,
    });
  };

  const addCopiedEdges = (nodeIdMapping: any, edgeMap: any) => {
    copiedData?.edges?.map((edge: any) => {
      let newEdgeId = uuidv4();
      const newEdge = {
        ...edge,
        id: newEdgeId,
        source: nodeIdMapping[edge.source] || edge.source,
        target: nodeIdMapping[edge.target] || edge.target,
        sourceHandle: nodeIdMapping[edge.source] + "_success" || edge.source,
        targetHandle: nodeIdMapping[edge.target] + "_input" || edge.target,
      };

      let updatedEdge: any = {
        action: "ADD_EDGES",
        status: "null",
        flow_id: apiFlow_Id,
        id: newEdgeId,
        edges: newEdge,
      };
      if (!edge.source.includes("_start")) {
        edgeMap?.set(newEdgeId, updatedEdge);
      }
    });
  };
  const handlePasteNodes = (event?: any) => {
    if (copiedData?.length === 0) return;

    console.log(copiedData, "setCopiedDataSetCopiedData");

    const position = event
      ? screenToFlowPosition({ x: event.clientX, y: event.clientY })
      : lastCursorPosition;

    const nodeMap = flowYdoc?.getMap("nodes");
    const edgeMap = flowYdoc?.getMap("edges");

    if (nodeMap && isEditable) {
      let newGrpNodes: any = {};
      const nodeIdMapping: any = {}; // Mapping of old node IDs to new node IDs

      addCopiedNodes(nodeMap, position, nodeIdMapping, newGrpNodes);

      addCopiedEdges(nodeIdMapping, edgeMap);
    }

    // resetWorkFlowState("copiedData");
    resetWorkFlowState("selectedFlowIds");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event?.ctrlKey && event?.key === "c") {
        handleCopyNodes();
      } else if (event?.ctrlKey && event?.key === "v") {
        handlePasteNodes();
      } else if (event?.ctrlKey && event?.key === "x") {
        handleCopyNodes(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFlowIds.length, lastCursorPosition, nodes.length]);

  useEffect(() => {
    if (nodes?.length === 0) return;

    const nodeMap = flowYdoc?.getMap<any>("nodes");
    const nodeIds = nodes?.map((val: any) => val?.id);

    nodeIds?.forEach((id: any) => {
      if (!selectedFlowIds.includes(id)) {
        const nodeDetails = getNode(id);
        let tempData = { ...nodeDetails };
        tempData["selected"] = false;
        nodeMap?.set(id, { action: "ADD_NODE", nodes: tempData, id });
      } else {
        selectedFlowIds?.map((id: any) => {
          const nodeDetails = getNode(id);
          let tempData = { ...nodeDetails };
          tempData["selected"] = true;
          nodeMap?.set(id, { action: "ADD_NODE", nodes: tempData, id });
        });
      }
    });
  }, [selectedFlowIds.length, nodes?.length]);
}
