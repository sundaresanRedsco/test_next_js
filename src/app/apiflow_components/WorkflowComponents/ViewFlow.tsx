import React, { useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider, // Import ReactFlowProvider
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import WorkflowStartNode from "./Nodes/workflowStartNode";
import WorkflowOperationNode from "./Nodes/workflowOperationNode";
import CustomEdge from "@/app/ApiFlowComponents/ApiDesigner/Edges/customEdge";
import ChangeEdge from "@/app/ApiFlowComponents/ApiDesigner/Edges/changeEdge";
import { Box } from "@mui/material";
import RevHistoryNode from "@/app/apiflow_components/WorkflowComponents/Nodes/RevHistoryNode";
import DeletedNode from "./Nodes/DeletedNode";
// const DeletedNode = ({ data }: any) => {
//   return (
//     <div
//       style={{
//         backgroundColor: "gray",
//         color: "white",
//         border: "1px solid red",
//         padding: "10px",
//         borderRadius: "5px",
//         opacity: 0.5, // Reduced opacity for deleted nodes
//       }}
//     >
//       {data?.operations_header || "Deleted Node"}
//     </div>
//   );
// };
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
