import React from "react";
import { Position } from "reactflow";
import GButton from "@/app/apiflow_components/global/GButton";
import WorkflowCustomHandle from "../workflowCustomHandle";

export default function WorkflowStartNode({ id }: any) {
  return (
    <>
      <div>
        <GButton
          buttonType="primary"
          label={"Start"}
          fontSize="0.6rem"
          padding="0px"
          margin="0"
        />

        <WorkflowCustomHandle
          type="source"
          position={Position.Right}
          id={id + "_startHandle"}
          isConnectable={1}
          style={{
            height: "5px",
            width: "5px",
            background: "#55CCFF",
            borderRadius: "revert-layer",
            borderColor: "#D2D2D2",
            boxShadow: "0 0 12px 2px rgb(85, 204, 255)",
          }}
        />
      </div>
    </>
  );
}
