import React, { useEffect } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "reactflow";

import "./buttonedge.css";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../Redux/store";
import { FlowReducer } from "../../../Redux/apiManagement/flowReducer";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import useNodeErr from "@/app/hooks/workflow/useNodeErr";

const onEdgeClick = (evt: any, id: any) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const { flowYdoc, isEditable } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const { getEdge, setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { setNodeFunction } = useWorkflowStore();
  const { handleEdgeError } = useNodeErr();

  const edge = getEdge(id);
  const onEdgeClick = () => {
    // if (edge) {
    //   handleEdgeError(edge.target, true);
    // }
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
    const edgeMap = flowYdoc?.getMap<any>("edges");
    if (edgeMap) {
      let updatedEdge: any = {
        action: "DELETE_EDGES",
        status: "null",
        // flow_id: apiFlowId,
        edges: { id: id }, // Assuming edge.id is the id of the current edge
      };

      edgeMap.set(id, updatedEdge); // Assuming edge.id is the key
      setNodeFunction({
        id: id,
        method: "DELETE_EDGES",
        obj: null,
      });
    } else {
      console.log("Yjs Map 'edges' is not initialized.");
    }
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {isEditable && (
            <button
              className="edgebutton"
              onClick={onEdgeClick}
              style={{ color: "" }}
            >
              ×
            </button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
