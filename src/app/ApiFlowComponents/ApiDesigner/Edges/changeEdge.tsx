import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "reactflow";

import "./buttonedge.css";

export default function ChangeEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data, // Access the data prop to get edge data
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={data?.label ? style : { stroke: "#babbbf" }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="nodrag nopan"
        >
          <span
            style={{
              color: data?.label ? style?.stroke : "#babbbf",
              fontWeight: "600",
            }}
          >
            {data?.label || "Current Edge"}
          </span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
