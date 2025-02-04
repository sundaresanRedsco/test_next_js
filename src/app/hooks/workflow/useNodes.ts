import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { RootStateType } from "@/app/Redux/store";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Connection, useReactFlow } from "reactflow";
import useNodeErr from "./useNodeErr";
import useTextEditor from "../useTextEditor";

type Props = {};

export default function useNodes({ nodeData }: any) {
  const { handleErrors, handleEdgeError } = useNodeErr();
  const { deleteElements, getEdges, getNode, getNodes } = useReactFlow();
  const { setNodeFunction, inputdatas, removeFlowId } = useWorkflowStore();
  const { nextNode, flowYdoc, globalKeys } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const nodeToRemoveId = nodeData?.id;
      // Find edges connected to the node being removed
      const edgesToRemove = getEdges().filter(
        (edge) =>
          edge.source === nodeToRemoveId || edge.target === nodeToRemoveId
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
        removeFlowId(nodeToRemoveId);
        nodesMap?.set(nodeToRemoveId, updatedNode);
        setNodeFunction({
          id: nodeToRemoveId,
          method: "DELETE_NODES",
          obj: null,
        });
      } else {
        console.log("Yjs Map 'run' is not initialized.");
      }
    },
    [nodeData?.id, deleteElements, getEdges]
  );

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
  const inputErr = inputdatas[nodeData?.id];
  const isHeaderErr =
    inputErr && inputErr["header"]
      ? inputErr["header"]?.some((err: any) => err.isErr == true)
      : false;
  const isParamsErr =
    inputErr && inputErr["params"]
      ? inputErr["params"]?.some((err: any) => err.isErr == true)
      : false;
  const isInputErr =
    inputErr && inputErr["input"] ? inputErr["input"]?.isErr : false;
  const isEdgeErr =
    inputErr && inputErr["edge"]
      ? inputErr["edge"]?.some((err: any) => err.isErr == true)
      : false;

  // const showErr = isHeaderErr || isParamsErr || isInputErr;
  // console.log(isHeaderErr, isParamsErr, isInputErr, nodeData?.id, "showErr");
  const [showErr, setshowErr] = useState(false);
  useEffect(() => {
    if (isHeaderErr || isParamsErr || isInputErr || isEdgeErr) {
      setshowErr(true);
    } else {
      setshowErr(false);
    }
  }, [isHeaderErr, isParamsErr, isInputErr, isEdgeErr]);
  const { handleValidation } = useTextEditor();
  const inputDatas = inputdatas[nodeData?.id];

  useEffect(() => {
    if (inputDatas) {
      const inputDataKeys = ["input", "header", "params", "edge", "keys"];
      for (let i = 0; inputDataKeys.length > i; i++) {
        const key: any = inputDataKeys[i];

        if (inputDatas[key] && inputDatas[key].length > 0 && key != "input") {
          if (key != "edge") {
            inputDatas[key]?.forEach((elem: any, index: number) => {
              if (elem.input) {
                handleValidation(elem.input, key, nodeData?.id, index);
              }
            });
          } else {
            const edges = getEdges().filter((edge) =>
              edge.target.includes(nodeData?.id)
            );
            handleEdgeError(nodeData?.id, edges.length > 0 ? false : true);
          }
        }
      }
    }
  }, [isHeaderErr, isParamsErr, isInputErr, isEdgeErr]);

  useEffect(() => {
    const keys = ["input", "header", "params", "edge", "keys"];
    keys.forEach((elem: any) => {
      handleErrors(nodeData?.id);
    });
  }, [inputDatas, showErr]);
  const edges = getEdges();
  useEffect(() => {
    // const existingEdge = edges.filter((edge) =>
    //   edge.target.includes(nodeData?.id)
    // );
    handleEdgeError(nodeData?.id, false);
    // if (existingEdge.length > 0 && existingEdge[0].target) {
    //   handleEdgeError(existingEdge[0].target, false);
    // }
  }, [edges.length]);

  return { isValidConnection, onClick, showErr };
}
