import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { RootStateType } from "@/app/Redux/store";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React from "react";
import { useSelector } from "react-redux";
import { useReactFlow } from "reactflow";

export default function useReusableFunctions() {
  const { flowYdoc } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );
  const { getNodes, getEdges } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();

  const { setCopiedData, selectedFlowIds, setNodeFunction } =
    useWorkflowStore();
  const handleCopyNodes = (isNodeCut?: boolean) => {
    if (selectedFlowIds?.length > 0) {
      const copiedNodesValue = selectedFlowIds?.flatMap((val: any) =>
        nodes?.filter((item: any) => item?.id === val)
      );

      const copiedEdgesValue = edges?.filter(
        (edge: any) =>
          selectedFlowIds.includes(edge.source) ||
          selectedFlowIds.includes(edge.target)
      );

      setCopiedData({
        nodes: copiedNodesValue,
        edges: copiedEdgesValue,
      });

      if (isNodeCut) {
        copiedNodesValue.forEach((node: any) => {
          handleCutNodes(node.id);
        });
      }
    }
  };
  const handlePrepareDeletion = (id: any) => {
    const nodeToRemoveId = id;
    const edgesToRemove = getEdges().filter(
      (edge) => edge.source === nodeToRemoveId || edge.target === nodeToRemoveId
    );
    let updatedNode: any = {
      action: "DELETE_NODES",
      status: "null",
      id: nodeToRemoveId,
      nodes: {
        id: nodeToRemoveId,
      },
    };
    const edgeMap = flowYdoc?.getMap<any>("edges");
    if (edgeMap) {
      edgesToRemove.forEach((edge: any) => {
        let updatedEdge: any = {
          action: "DELETE_EDGES",
          status: "null",
          edges: { id: edge.id },
        };
        edgeMap.set(edge.id, updatedEdge);
      });
    }
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      nodesMap?.set(nodeToRemoveId, updatedNode);

      setNodeFunction({
        id: nodeToRemoveId,
        method: "DELETE_NODES",
        obj: null,
      });
    }
  };
  const handleCutNodes = (id: any) => {
    handlePrepareDeletion(id);
  };
  return { handleCutNodes, handleCopyNodes };
}
