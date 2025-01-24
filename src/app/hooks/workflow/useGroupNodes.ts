import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { RootStateType } from "@/app/Redux/store";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

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
  const { flowYdoc } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );
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
      const isStartNode = dragNode?.type === "startButtonNode";
      const dragX = isStartNode ? 60 : 230;
      const dragY = isStartNode ? 17 : 120;
      let dragRight = dragNode.position.x + dragX;
      let dragBottom = dragNode.position.y + dragY;
      let dragLeft = dragNode.position.x + dragX;
      let dragTop = dragNode.position.y + dragY;
      let nodeRight = node.position.x + dimensions[node?.id]?.width;
      let nodeBottom = node.position.y + dimensions[node?.id]?.height;

      if (!!dragNode.parentId && dragNode.parentId === node.id) {
        dragRight = node.position.x + dragNode.position.x + dragX;
        dragBottom = node.position.y + dragNode.position.y + dragY;
        dragLeft = node.position.x + dragNode.position.x;
        dragTop = node.position.y + dragNode.position.y;
      } else if (!!dragNode.parentId) {
        const prevGroupNode = nodes.find(
          (prev: any) => prev.id === dragNode.parentId
        );

        if (prevGroupNode) {
          dragRight =
            dragNode.position.x -
            prevGroupNode.position.x -
            node.position.x +
            dragX;
          dragBottom =
            dragNode.position.y -
            prevGroupNode.position.y -
            node.position.y +
            dragY;
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
      !!overlappingNodeRef?.current &&
      checkNodeWithinFrame(dragNode, overlappingNodeRef.current) &&
      dragNode.type != "groupNode" &&
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
    const nodeMap = flowYdoc?.getMap<any>("nodes");

    setNodeWithinFrame("");
    const isOverlappingIsFrame =
      !!overlappingNodeRef?.current &&
      overlappingNodeRef?.current?.type == "groupNode"
        ? true
        : false;
    const isDragNodeNotFrame = dragNode.type != "groupNode" ? true : false;
    const isAllowed =
      !overlappingNodeRef?.current ||
      (!isOverlappingIsFrame && !!dragNode?.parentId && isDragNodeNotFrame);
    let isStartNodeParentRemoval = false;
    const nodeData = nodes.find((node: any) => node.id === dragNode.id);

    if (!!isAllowed) {
      if (dragNode.type != "groupNode" && dragNode.type != "operationNode") {
        isStartNodeParentRemoval = true;
      }
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
          if (node.id === dragNode.id && dragNode.type != "groupNode") {
            node.parentId = undefined;
            node.position = position;
            node.positionAbsolute = position;
          }
          return node;
        });
      });
    }
    if (isStartNodeParentRemoval) {
      const parentNode = nodes.find(
        (node: any) => node.id === dragNode.parentId
      );
      if (nodeData) {
        let position = nodeData.position;
        if (parentNode) {
          position = {
            x: (parentNode?.position?.x || 0) + (dragNode?.position?.x || 0),
            y: (parentNode?.position?.y || 0) + (dragNode?.position?.y || 0),
          };
        }
        let node = { ...nodeData };
        node.parentId = undefined;
        node.position = position;
        node.positionAbsolute = position;
        let updatedNode: any = {
          action: "ADD_NODE",
          status: "null",
          flow_id: nodeData.flow_id,
          id: nodeData.id,
          nodes: node,
        };
        if (nodeMap) {
          nodeMap.set(updatedNode.id, updatedNode);
        }
      }

      isStartNodeParentRemoval = false;
    }
    let isStartNodeParentAdd = false;
    if (
      !!(
        !!overlappingNodeRef?.current &&
        overlappingNodeRef?.current?.type == "groupNode" &&
        dragNode.type != "groupNode"
      )
    ) {
      if (dragNode.type != "groupNode" && dragNode.type != "operationNode") {
        isStartNodeParentAdd = true;
      }
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
              !!(
                !!node.parentId &&
                node.parentId !== overlappingNodeRef?.current?.id
              )
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
      if (isStartNodeParentAdd) {
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
        if (nodeData) {
          let node = { ...nodeData };
          if (
            !!(
              !!node.parentId &&
              node.parentId !== overlappingNodeRef?.current?.id
            )
          ) {
            const prevGroupNode = nodes.find(
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
          let updatedNode: any = {
            action: "ADD_NODE",
            status: "null",
            flow_id: nodeData.flow_id,
            id: nodeData.id,
            nodes: node,
          };
          if (nodeMap) {
            nodeMap.set(updatedNode.id, updatedNode);
          }
        }

        isStartNodeParentAdd = false;
      }
    }
  };

  return { onDragStart, onDragEnd };
}
