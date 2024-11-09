import React, { useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider, // Import ReactFlowProvider
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import StartButtonNode from "../Nodes/startNode";
import OperationNode from "../Nodes/operationNode";
import ChangeEdge from "../Edges/changeEdge";
import OperationChangeNode from "../Nodes/operationChangeNode";

const nodeTypes = {
  startButtonNode: StartButtonNode,
  operationNode: OperationChangeNode,
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
      <div style={{ height: 500 }}>
        <ReactFlow
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
          fitView
          fitViewOptions={{ padding: 900 }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default ViewFlow;
