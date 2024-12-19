import React, { useEffect, useState } from "react";
import { useEdgesState, useNodesState, useReactFlow } from "reactflow";
import * as Y from "yjs";

export default function useRedoUndo(ydoc: Y.Doc | null, data: any) {
  const { getEdges } = useReactFlow();
  const { edges, setEdges, nodes, setNodes } = data;

  const [count, setcount] = useState(0);
  const [storedNodes, setstoredNodes] = useState<any>([]);
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
    const connectedEdges = getEdges().filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );

    connectedEdges.forEach((edge) => {
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
    const connectedEdges = getEdges().filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );

    connectedEdges.forEach((edge) => {
      const edgeUpdate = {
        action: "ADD_EDGES",
        status: "null",
        edges: { id: edge.id },
      };

      edgesMap.set(edge.id, edgeUpdate);
    });
  };

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

  const deepEqual = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (!areObjectsDeeplyEqual(arr1[i], arr2[i])) return false;
    }

    return true;
  };
  const handleYjsMap = (count: number, type: "undo" | "redo") => {
    const getNodeIds = (currentCount: number, direction: number) =>
      storedNodes[currentCount]?.nodes.map((elem: any) => elem.id) || [];
    const getEdgeIds = (currentCount: number) =>
      storedNodes[currentCount]?.edges.map((elem: any) => elem.id) || [];
    const getEdges = (currentCount: number) =>
      storedNodes[currentCount]?.edges || [];

    let currentIds: any = [];
    let prevIds = [];
    let currentEdgeIds: any = [];
    let prevEdgeIds = [];
    let currentEdges = [];

    if (type === "redo") {
      currentIds = getNodeIds(count + 1, 1);
      prevIds =
        storedNodes[count]?.nodes
          .filter((elem: any) => !currentIds.includes(elem.id))
          .map((elem: any) => elem.id) || [];
      currentEdgeIds = getEdgeIds(count + 1);
      prevEdgeIds =
        storedNodes[count]?.edges
          .filter((elem: any) => !currentEdgeIds.includes(elem.id))
          .map((elem: any) => elem.id) || [];
      currentEdges = getEdges(count + 1);
    } else {
      currentIds = getNodeIds(count - 1, -1);
      prevIds =
        storedNodes[count]?.nodes
          .filter((elem: any) => !currentIds.includes(elem.id))
          .map((elem: any) => elem.id) || [];
      currentEdgeIds = getEdgeIds(count - 1);
      prevEdgeIds =
        storedNodes[count]?.edges
          .filter((elem: any) => !currentEdgeIds.includes(elem.id))
          .map((elem: any) => elem.id) || [];
      currentEdges = getEdges(count - 1);
    }

    const nodesMap = ydoc?.getMap<any>("nodes");
    const edgesMap = ydoc?.getMap<any>("edges");

    if (!nodesMap || !edgesMap) {
      console.log("Yjs Maps 'nodes' or 'edges' are not available.");
      return;
    }

    if (type === "undo") {
      // Handle undo logic
      prevIds.forEach((id: any) => {
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
    } else if (type === "redo") {
      // Handle redo logic
      prevIds.forEach((id: any) => {
        // const prevEdges = getEdge(id);
        const updatedNode = {
          action: "ADD_NODE",
          status: "null",
          id,
          nodes: { id },
        };

        nodesMap.set(id, updatedNode);

        // Handle connected edges
        addEdgesConnectedToNode(id, edgesMap);
      });
    }
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
      console.log(count, "nodeEdge-redo0", storedNodes);
      setcount((prev) => prev + 1);
      handleYjsMap(count, "redo");
      if (storedNodes[count + 1]) {
        setNodes(storedNodes[count + 1]?.nodes);
        setEdges(storedNodes[count + 1]?.edges);
      }
    }
  };
  const handleUndo = () => {
    if (count != 0) {
      setcount((prev) => prev - 1);
    } else {
      setcount(0);
    }
    console.log(count, "nodeEdge-undo", storedNodes);

    if (count >= 0) {
      handleYjsMap(count, "undo");

      setNodes(storedNodes[count == 0 ? 0 : count - 1]?.nodes);
      setEdges(storedNodes[count == 0 ? 0 : count - 1]?.edges);
    }
  };

  useEffect(() => {
    if (nodes.length != 0) {
      if (storedNodes.length > 1 && storedNodes[count]) {
        if (
          !deepEqual(nodes, storedNodes[count]?.nodes) ||
          !deepEqual(edges, storedNodes[count]?.edges)
        ) {
          if (count == storedNodes.length - 1) {
            setstoredNodes((prev: any) => [
              ...prev,
              { nodes, edges }, // Push the new state
            ]);
            setcount((prev) => prev + 1);
          } else {
            if (count <= 1) {
              setstoredNodes((prev: any) => [
                ...prev.slice(0, 1),
                { nodes, edges },
              ]);
            } else {
              setstoredNodes((prev: any) => [
                ...prev.slice(0, count),
                { nodes, edges },
              ]);
              // setcount((prev) => prev - 1);
            }
          }
        }
      } else {
        if (
          !deepEqual(totalCounts.nodesArr, nodes) ||
          !deepEqual(totalCounts.edgesArr, edges)
        ) {
          setstoredNodes((prev: any) => [
            ...prev,
            { nodes, edges }, // Push the new state
          ]);
          setcount((prev) => prev + 1);
        }
      }
    }
  }, [nodes.length, edges.length, storedNodes.length]);

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
  // console.log(count, "nodeEdge123", storedNodes);

  return {
    totalCounts,
    settotalCounts,
    storedNodes,
    setstoredNodes,
    handleYjsMap,
    count,
    setcount,
    handleUndo,
    handleRedo,
  };
}
