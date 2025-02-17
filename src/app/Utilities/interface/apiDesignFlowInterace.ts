interface ApiDesignNodeInterface {
  id: string;
  width: number;
  height: number;
  type: string; // This type should be more specific if possible
  position: {
    x: number;
    y: number;
  };
  data: {
    name: string;
    id: string;
    method: string;
    operation_id: string;
  };
  selected: boolean;
  positionAbsolute: {
    x: number;
    y: number;
  };
  dragging: boolean;
}

interface ApiDesignEdgeInterface {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
  animated: boolean;
  style: {
    stroke: string;
  };
}

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface SingleApiDesignFlowInterface {
  nodes: ApiDesignNodeInterface[];
  edges: ApiDesignEdgeInterface[]; // Define a specific type if edges have a predictable structure
  viewport: Viewport;
}
