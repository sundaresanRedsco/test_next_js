import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React, { useRef } from "react";

type Props = {
  nodes: any;
  getIntersectingNodes: (node: any) => void;
  setNodes: any;
};

export default function useGroupNodes({
  nodes,
  getIntersectingNodes,
  setNodes,
}: Props) {
  const { setNodeWithinFrame, dimensions } = useWorkflowStore();
  const overlappingNodeRef = useRef<any>(null);
  const isNodeWithinFrame = (dragNode: any) => {
    let node = null;

    if (!dragNode?.parentId) {
      node = overlappingNodeRef?.current;
    } else {
      node = nodes.find((node: any) => node.id == dragNode?.parentId);
    }
    if (!node) {
      return false;
    }

    const dragNodeRect = {
      left: dragNode.position.x,
      right: dragNode.position.x + 230,
      top: dragNode.position.y,
      bottom: dragNode.position.y + 120,
    };

    const nodeRect = {
      left: node.position.x,
      right: node.position.x + 400,
      top: node.position.y,
      bottom: node.position.y + 350,
    };

    return (
      dragNodeRect.left >= nodeRect.left &&
      dragNodeRect.right <= nodeRect.right &&
      dragNodeRect.top >= nodeRect.top &&
      dragNodeRect.bottom <= nodeRect.bottom
    );
  };
  const checkNodeWithinFrame = (dragNode: any, node: any) => {
    if (node) {
      let dragRight = dragNode.position.x + 230;
      let dragBottom = dragNode.position.y + 120;
      let dragLeft = dragNode.position.x + 230;
      let dragTop = dragNode.position.y + 120;
      let nodeRight = node.position.x + dimensions[node?.id]?.width;
      let nodeBottom = node.position.y + dimensions[node?.id]?.height;

      if (dragNode?.parentId === node.id) {
        dragRight = node.position.x + dragNode.position.x + 230;
        dragBottom = node.position.y + dragNode.position.y + 120;
        dragLeft = node.position.x + dragNode.position.x;
        dragTop = node.position.y + dragNode.position.y;
      } else if (dragNode?.parentId) {
        const prevGroupNode = nodes.find(
          (prev: any) => prev.id === dragNode.parentId
        );

        if (prevGroupNode) {
          dragRight =
            dragNode.position.x -
            prevGroupNode.position.x -
            node.position.x +
            230;
          dragBottom =
            dragNode.position.y -
            prevGroupNode.position.y -
            node.position.y +
            120;
          dragLeft =
            dragNode.position.x + prevGroupNode.position.x + node.position.x;
          dragTop =
            dragNode.position.y + prevGroupNode.position.y + node.position.y;
        }
      }

      const dragNodeRect = {
        left: dragLeft,
        right: dragRight,
        top: dragTop,
        bottom: dragBottom,
      };

      const nodeRect = {
        left: node.position.x,
        right: nodeRight,
        top: node.position.y,
        bottom: nodeBottom,
      };

      return (
        dragNodeRect.left >= nodeRect.left &&
        dragNodeRect.right <= nodeRect.right &&
        dragNodeRect.top >= nodeRect.top &&
        dragNodeRect.bottom <= nodeRect.bottom
      );
    }
    return false;
  };
  const onDragStart = (event: any, dragNode: any) => {
    const overlappingNode = getIntersectingNodes(dragNode)?.[0];
    if (overlappingNode) {
      overlappingNodeRef.current = overlappingNode;
    } else {
      overlappingNodeRef.current = null;
    }

    if (
      checkNodeWithinFrame(dragNode, overlappingNodeRef.current) &&
      dragNode.type == "operationNode" &&
      overlappingNodeRef.current?.type == "groupNode"
    ) {
      const id = overlappingNodeRef.current.id;
      if (id) {
        setNodeWithinFrame(id);
      }
    } else {
      setNodeWithinFrame("");
    }
  };
  const onDragEnd = (event: any, dragNode: any) => {
    setNodeWithinFrame("");

    const isAllowed =
      overlappingNodeRef?.current?.type !== "groupNode" &&
      dragNode?.parentId &&
      dragNode.type == "operationNode"
        ? true
        : false;

    if (isAllowed) {
      setNodes((prevNodes: any) => {
        const currentGroupNode = prevNodes.find(
          (prevNode: any) => prevNode.id === dragNode?.parentId
        );
        const position = {
          x:
            (currentGroupNode?.position?.x || 0) + (dragNode?.position?.x || 0),
          y:
            (currentGroupNode?.position?.y || 0) + (dragNode?.position?.y || 0),
        };

        return prevNodes.map((nodeData: any) => {
          const node = { ...nodeData };
          if (node.id === dragNode.id && dragNode.type == "operationNode") {
            node.parentId = undefined;
            node.position = position;
            node.positionAbsolute = position;
          }
          return node;
        });
      });
    }

    if (
      overlappingNodeRef?.current?.type == "groupNode" &&
      dragNode.type == "operationNode"
    ) {
      //* Update dragged node position relative to the parent node
      setNodes((prevNodes: any) => [
        overlappingNodeRef?.current,
        ...prevNodes
          .filter((node: any) => node.id !== overlappingNodeRef?.current?.id)
          .map((nodeData: any) => {
            const node = { ...nodeData };

            const { x: groupX, y: groupY } = overlappingNodeRef?.current
              ?.position || {
              x: 0,
              y: 0,
            };
            const { x: dragX, y: dragY } = dragNode?.position || {
              x: 0,
              y: 0,
            };

            let position = {
              x: dragX - groupX,
              y: dragY - groupY,
            };

            if (
              node.parentId &&
              node.parentId !== overlappingNodeRef?.current?.id
            ) {
              const prevGroupNode = prevNodes.find(
                (n: any) => n.id === dragNode.parentId
              );
              const { x: prevGroupNodeX, y: prevGroupNodeY } =
                prevGroupNode?.position || { x: 0, y: 0 };
              position = {
                x: dragX + prevGroupNodeX - groupX,
                y: dragY + prevGroupNodeY - groupY,
              };
            }

            if (node.id === dragNode.id) {
              node.parentId = overlappingNodeRef?.current?.id;
              if (dragNode?.parentId != overlappingNodeRef?.current?.id) {
                node.position = position;
                node.positionAbsolute = position;
              }
            }

            return node;
          }),
      ]);
    }
  };
  return { onDragStart, onDragEnd };
}
