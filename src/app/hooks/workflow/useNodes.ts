import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { RootStateType } from "@/app/Redux/store";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Connection, useReactFlow } from "reactflow";

type Props = {};

export default function useNodes({ nodeData }: any) {
  const { deleteElements, getEdges, getNode, getNodes } = useReactFlow();
  const { addFlowId, removeFlowId, selectedFlowIds, setNodeFunction } =
    useWorkflowStore();
  const { nextNode, flowYdoc, globalKeys } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);
  const onClick = useCallback(() => {
    const nodeToRemoveId = nodeData?.id;
    // Find edges connected to the node being removed
    const edgesToRemove = getEdges().filter(
      (edge) => edge.source === nodeToRemoveId || edge.target === nodeToRemoveId
    );

    const payload = {
      nodes: [{ id: nodeToRemoveId }], // Node to be removed
      edges: edgesToRemove.map((edge) => ({ id: edge.id })), // Edges connected to the node
    };

    // Delete the node and its associated edges
    // deleteElements(payload);

    let updatedNode: any = {
      action: "DELETE_NODES",
      status: "null",
      id: nodeToRemoveId,
      // flow_id: apiFlowId,
      nodes: {
        id: nodeToRemoveId,
      },
    };

    const edgeMap = flowYdoc?.getMap<any>("edges");
    if (edgeMap) {
      edgesToRemove.forEach((edge) => {
        let updatedEdge: any = {
          action: "DELETE_EDGES",
          status: "null",
          // flow_id: apiFlowId,
          edges: { id: edge.id }, // Assuming edge.id is the id of the current edge
        };
        edgeMap.set(edge.id, updatedEdge); // Assuming edge.id is the key
      });
    } else {
      console.log("Yjs Map 'edges' is not initialized.");
    }

    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      nodesMap?.set(nodeToRemoveId, updatedNode);
      setNodeFunction({
        id: nodeToRemoveId,
        method: "DELETE_NODES",
        obj: null,
      });
    } else {
      console.log("Yjs Map 'run' is not initialized.");
    }
  }, [nodeData?.id, deleteElements, getEdges]);

  function isValidConnection(connection: Connection) {
    const { source, target } = connection;

    //   const isTargetConnected = getEdges().some((edge) => edge.target === target);
    //   if (isTargetConnected) {
    //     return false;
    //   }

    // Check if the source and target are the same
    if (source === target) {
      return false;
    }

    // Check if the target handle is already connected to a source handle with "_startHandle"
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

  return { isValidConnection, onClick };
}
