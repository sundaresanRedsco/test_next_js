import React, { useRef } from "react";
import ReactFlow, {
  ReactFlowProvider, // Import ReactFlowProvider
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import WorkflowStartNode from "./Nodes/workflowStartNode";
import ChangeEdge from "@/app/apiflow_components/WorkflowComponents/Edges/changeEdge";
import { Box } from "@mui/material";
import RevHistoryNode from "@/app/apiflow_components/WorkflowComponents/Nodes/RevHistoryNode";
import DeletedNode from "./Nodes/DeletedNode";

const nodeTypes = {
  startButtonNode: WorkflowStartNode,
  operationNode: RevHistoryNode,
  deletedNode: DeletedNode,
};

const edgeTypes = {
  buttonEdge: ChangeEdge,
  changeEdge: ChangeEdge,
};
const ViewFlow = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
}: {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
}) => {
  const reactFlowWrapper = useRef(null);

  // Handler for node click
  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log("Node clicked:", node);
    // Add your node click logic here
  };

  return (
    <ReactFlowProvider>
      <Box
        sx={{
          height: 500,
          "& .react-flow": {
            height: "600px !important",
          },
        }}
      >
        <ReactFlow
          id="react-flow-container"
          className="position-relative"
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes} // Include the custom node types
          edgeTypes={edgeTypes} // Include the custom edge types
          nodesDraggable={true} // Enable node dragging
          nodesConnectable={false} // Disable connecting nodes
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick} // Handle node clicks
          fitViewOptions={{ padding: 700 }}
        ></ReactFlow>
      </Box>
    </ReactFlowProvider>
  );
};

export default ViewFlow;
