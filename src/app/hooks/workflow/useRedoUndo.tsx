import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React, { useEffect, useState } from "react";
import { useEdgesState, useNodesState, useReactFlow } from "reactflow";
import * as Y from "yjs";
import { create } from "zustand";
interface Store {
  storedNodes: any;
  setstoredNodes: (value: any) => void;
  nodeFunctions: {
    id: any;
    method: "DELETE_NODES" | "ADD_NODE" | "DELETE_EDGES" | "ADD_EDGES" | "";
    obj: any;
  };
  setNodeFunction: (value: any) => void;
  resetNodeFunction: () => void;
}

const normalizeObject = (obj: any) => {
  // Normalize fields by sanitizing null-like mismatches or unnecessary differences
  return {
    ...obj,
    tenant_id: obj.tenant_id || null, // Normalize null-like mismatches
    data: JSON.parse(obj.data || "{}"), // Parse and normalize encoded JSON strings
  };
};

const areObjectsDeeplyEqual = (obj1: any, obj2: any) => {
  obj1 = normalizeObject(obj1);
  obj2 = normalizeObject(obj2);

  return Object.keys(obj1).every(
    (key) => JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])
  );
};

export const deepEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!areObjectsDeeplyEqual(arr1[i], arr2[i])) return false;
  }

  return true;
};

export default function useRedoUndo(ydoc: Y.Doc | null, data: any) {
  // const { getEdges } = useReactFlow();
  const { edges, setEdges, nodes, setNodes } = data;
  const { storedNodes, setstoredNodes, nodeFunctions, resetNodeFunction } =
    useWorkflowStore();

  const [count, setcount] = useState(0);
  const [totalCounts, settotalCounts] = useState({
    nodes: 0,
    edges: 0,
    edgesArr: [],
    nodesArr: [],
  });

  /**
   * Removes edges connected to a node during undo
   */
  const removeEdgesConnectedToNode = (nodeId: string, edgesMap: Y.Map<any>) => {
    const connectedEdges = edges.filter(
      (edge: any) => edge.source === nodeId || edge.target === nodeId
    );

    connectedEdges.forEach((edge: any) => {
      if (edgesMap.has(edge.id)) {
        const edgeUpdate = {
          action: "DELETE_EDGES",
          status: "null",
          edges: { id: edge.id },
        };

        edgesMap.set(edge.id, edgeUpdate);
      }
    });
  };

  /**
   * Adds edges connected to a node during redo
   */
  const addEdgesConnectedToNode = (nodeId: string, edgesMap: Y.Map<any>) => {
    const connectedEdges = edges.filter(
      (edge: any) => edge.source === nodeId || edge.target === nodeId
    );

    connectedEdges.forEach((edge: any) => {
      const edgeUpdate = {
        action: "ADD_EDGES",
        status: "null",
        edges: { id: edge.id },
      };

      edgesMap.set(edge.id, edgeUpdate);
    });
  };
  const handleYjsMap = (count: number, type: "undo" | "redo") => {
    const getNodeIds = (currentCount: number, direction: number) =>
      storedNodes[currentCount]?.nodes.map((elem: any) => elem.id) || [];
    const getNodes = (currentCount: number) => storedNodes[currentCount]?.nodes;
    const getEdgeIds = (currentCount: number) =>
      storedNodes[currentCount]?.edges.map((elem: any) => elem.id) || [];
    const getEdges = (currentCount: number) =>
      storedNodes[currentCount]?.edges || [];

    let currentIds: any = [];
    let prevIds = [];
    let currentNodes: any = [];
    let currentEdgeIds: any = [];
    let prevEdgeIds = [];
    let currentEdges = [];

    if (type === "redo") {
      currentNodes = getNodes(count + 1);
      currentIds = getNodeIds(count + 1, 1);
      currentEdgeIds = getEdgeIds(count + 1);
      currentEdges = getEdges(count + 1);
    } else {
      currentNodes = getNodes(count - 1);
      currentIds = getNodeIds(count - 1, -1);
      currentEdgeIds = getEdgeIds(count - 1);
      currentEdges = getEdges(count - 1);
    }
    prevIds =
      storedNodes[count]?.nodes
        .filter((elem: any) => !currentIds.includes(elem.id))
        .map((elem: any) => elem.id) || [];
    prevEdgeIds =
      storedNodes[count]?.edges
        .filter((elem: any) => !currentEdgeIds.includes(elem.id))
        .map((elem: any) => elem.id) || [];

    const nodesMap = ydoc?.getMap<any>("nodes");
    const edgesMap = ydoc?.getMap<any>("edges");

    if (!nodesMap || !edgesMap) {
      console.log("Yjs Maps 'nodes' or 'edges' are not available.");
      return;
    }
    const filteredNodeIds = currentNodes.filter(
      (elem: any) => !prevIds.includes(elem.id)
    );
    // Handle redo logic
    filteredNodeIds.forEach((node: any) => {
      // const prevEdges = getEdge(id);
      const updatedNode = {
        action: "ADD_NODE",
        status: "null",
        id: node.id,
        nodes: node,
      };

      nodesMap.set(node?.id, updatedNode);

      // Handle connected edges
      addEdgesConnectedToNode(node?.id, edgesMap);
    });
    const unusedNodeIds = prevIds.filter(
      (elem: any) => !currentIds.includes(elem)
    );
    // Handle undo logic
    unusedNodeIds.forEach((id: any) => {
      if (nodesMap.has(id)) {
        const updatedNode = {
          action: "DELETE_NODES",
          status: "null",
          id,
          nodes: { id },
        };

        nodesMap.set(id, updatedNode);

        // Handle connected edges
        removeEdgesConnectedToNode(id, edgesMap);
      } else {
        console.log(`Node ID ${id} does not exist in the Yjs Map.`);
      }
    });

    const filteredEdges = currentEdges?.filter(
      (elem: any) => !prevEdgeIds.includes(elem.id)
    );
    filteredEdges?.forEach((edge: any) => {
      if (edgesMap.has(edge?.id)) {
        const updatedEdge = {
          action: "ADD_EDGES",
          status: "null",
          id: edge.id,
          edges: edge,
        };

        edgesMap.set(edge?.id, updatedEdge);
      } else {
        const updatedEdge = {
          action: "DELETE_EDGES",
          status: "null",
          edges: { id: edge.id },
        };

        edgesMap.set(edge.id, updatedEdge);
      }
    });
    const unusedEdgeIds = prevEdgeIds?.filter(
      (elem: any) => !currentEdgeIds.includes(elem)
    );
    unusedEdgeIds.forEach((id: any) => {
      if (edgesMap.has(id)) {
        const updatedEdge = {
          action: "DELETE_EDGES",
          status: "null",
          edges: { id },
        };

        edgesMap.set(id, updatedEdge);
      }
    });
  };

  const handleRedo = () => {
    if (count + 1 < storedNodes?.length) {
      setcount((prev) => prev + 1);
      handleYjsMap(count, "redo");
      if (storedNodes[count + 1]) {
        setNodes(storedNodes[count + 1]?.nodes);
        setEdges(storedNodes[count + 1]?.edges);
      }
    }
  };
  const handleUndo = () => {
    if (count > 0) {
      setcount((prev) => prev - 1);
      handleYjsMap(count, "undo");
      setNodes(storedNodes[count - 1]?.nodes);
      setEdges(storedNodes[count - 1]?.edges);
    } else {
      setcount(0);
      handleYjsMap(0, "undo");
      setNodes(storedNodes[0]?.nodes);
      setEdges(storedNodes[0]?.edges);
    }
  };
  const handleStoredNodeUpdate = () => {
    if (count == storedNodes.length - 1) {
      setstoredNodes([...storedNodes, { nodes, edges }]);
    } else {
      setstoredNodes([...storedNodes.slice(0, count + 1), { nodes, edges }]);
      setcount((prev: any) => prev + 1);
    }
  };
  useEffect(() => {
    if (storedNodes.length != 0) {
      setcount(storedNodes.length - 1);
    }
  }, [storedNodes.length]);
  const handleDelete = (type: "node" | "edge") => {
    const arr = type == "node" ? nodes : edges;
    const tempStoredData = [...storedNodes];
    const newData = arr.filter((elem: any) => elem.id != nodeFunctions.id);
    tempStoredData[count + 1] =
      type == "node" ? { nodes: newData, edges } : { nodes, edges: newData };
    setstoredNodes(tempStoredData);
    setcount((prev: any) => prev + 1);
    resetNodeFunction();
  };
  const handleAdd = (type: "node" | "edge") => {
    const tempStoredData = [...storedNodes];
    const newDatas =
      type == "node"
        ? [...nodes, nodeFunctions.obj]
        : [...edges, nodeFunctions.obj];
    tempStoredData[count + 1] =
      type == "node" ? { nodes: newDatas, edges } : { nodes, edges: newDatas };
    setstoredNodes(tempStoredData);
    setcount((prev: any) => prev + 1);
    resetNodeFunction();
  };
  useEffect(() => {
    if (nodeFunctions.id) {
      if (nodeFunctions.method == "ADD_NODE") {
        handleAdd("node");
      } else if (nodeFunctions.method == "DELETE_NODES") {
        handleDelete("node");
      } else if (nodeFunctions.method == "ADD_EDGES") {
        handleAdd("edge");
      } else if (nodeFunctions.method == "DELETE_EDGES") {
        handleDelete("edge");
      }
    }
  }, [nodeFunctions]);

  useEffect(() => {
    // Function to handle the undo action when Ctrl+Z is pressed
    const handleUndoShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.key == "z") {
          event.preventDefault();
          handleUndo();
        }
        if (event.key == "y") {
          event.preventDefault();
          handleRedo();
        }
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleUndoShortcut);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleUndoShortcut);
    };
  }, [storedNodes, count]);

  return {
    settotalCounts,
    count,
    handleUndo,
    handleRedo,
    handleStoredNodeUpdate,
  };
}
