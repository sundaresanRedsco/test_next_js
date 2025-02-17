import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import theme from "@/Theme/theme";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { DeleteIcon } from "@/app/Assests/icons";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import { NodeResizer, useReactFlow } from "reactflow";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import { BiCopy } from "react-icons/bi";
import { BiCut } from "react-icons/bi";
import useReusableFunctions from "@/app/hooks/workflow/useReusableFunctions";
import { BiLock } from "react-icons/bi";
import { HiOutlineLockOpen } from "react-icons/hi2";

const TextTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: ${theme.palette.DarkBlack.main};
  font-size: 20px;
  font-weight: 500;
`;

type Props = {
  data: any;
};

function parseData(data: any) {
  // Check if data is an object
  if (typeof data === "object") {
    return data; // Return as is
  } else {
    try {
      // Try to parse the data
      return JSON.parse(data);
    } catch (error) {
      // If parsing fails, return null or handle the error accordingly
      console.error("Error parsing data:", error);
      return null;
    }
  }
}

export default function GroupNode({ data }: Props) {
  const { isEditable, flowYdoc } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );
  const { deleteElements, getEdges, getNode, getNodes } = useReactFlow();

  const nodeData = useMemo(() => parseData(data) || {}, [data]);
  const {
    nodeWithinFrame,
    setNodeFunction,
    dimensions,
    setDimension,
    addFlowId,
    removeFlowId,
    selectedFlowIds,
    setCopyClicked,
    setCutClicked,
    copyClicked,
    frameLockClicked,
    setFrameLockClicked,
  } = useWorkflowStore();

  const childNodes = getNodes().filter((node) => node.parentId == nodeData?.id);
  const handleResize = (event: any, { height, width }: any) => {
    setDimension(nodeData?.id, {
      width,
      height,
    });
  };
  const handleResizeEnd = (e: any, { width, height }: any) => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      const currentData = getNode(nodeData?.id);
      const newNode = {
        ...currentData,
        width,
        height,
      };
      const updatedNode = {
        action: "EDIT_NODE",
        status: "null",
        id: nodeData?.id,
        nodes: newNode,
      };
      nodesMap.set(nodeData?.id, updatedNode);
    }
  };

  const handlePrepareDeletion = (id: any) => {
    const nodeToRemoveId = id;
    const edgesToRemove = getEdges().filter(
      (edge) => edge.source === nodeToRemoveId || edge.target === nodeToRemoveId
    );
    let updatedNode: any = {
      action: "DELETE_NODES",
      status: "null",
      id: nodeToRemoveId,
      nodes: {
        id: nodeToRemoveId,
      },
    };
    const edgeMap = flowYdoc?.getMap<any>("edges");
    if (edgeMap) {
      edgesToRemove.forEach((edge) => {
        let updatedEdge: any = {
          action: "DELETE_EDGES",
          status: "null",
          edges: { id: edge.id },
        };
        edgeMap.set(edge.id, updatedEdge);
      });
    }
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      nodesMap?.set(nodeToRemoveId, updatedNode);

      setNodeFunction({
        id: nodeToRemoveId,
        method: "DELETE_NODES",
        obj: null,
      });
    }
  };

  const handleClickNode = (id: any) => {
    if (isEditable) {
      if (selectedFlowIds?.includes(id)) {
        const childNodes = getNodes().filter((node) => node.parentId == id);
        if (childNodes.length > 0) {
          childNodes.forEach((node: any) => {
            removeFlowId(node.id);
          });
        }
        removeFlowId(id);
      } else {
        const childNodes = getNodes().filter((node) => node.parentId == id);
        if (childNodes.length > 0) {
          childNodes.forEach((node: any) => {
            addFlowId(node.id);
          });
        }
        addFlowId(id, "groupNode");
      }
    }
  };

  const handleKeyDown = (event: any) => {
    if (event?.key === "Escape" && isEditable) {
      removeFlowId(nodeData?.id);
    }
  };
  const handleDelete = () => {
    if (childNodes.length > 0) {
      childNodes.forEach((node: any) => {
        handlePrepareDeletion(node.id);
      });
    }
    handlePrepareDeletion(nodeData?.id);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditable]);

  const minWidth = useMemo(() => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      const allNodes = Array.from(nodesMap?.values() || []);
      const childNodes = allNodes.filter(
        (node: any) => node.nodes?.parentId == nodeData?.id
      );
      if (childNodes.length !== 0) {
        const maxRight = Math.max(
          ...childNodes.map(
            (node: any) => node.nodes.position.x + node.nodes.width + 30
          )
        );
        return maxRight;
      }
    }
    return 500; // Default minimum width
  }, [nodeData?.id, flowYdoc, childNodes]);

  const minHeight = useMemo(() => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      const allNodes = Array.from(nodesMap?.values() || []);
      const childNodes = allNodes.filter(
        (node: any) => node.nodes?.parentId == nodeData?.id
      );
      if (childNodes.length !== 0) {
        const maxBottom = Math.max(
          ...childNodes.map(
            (node: any) => node.nodes.position.y + node.nodes.height
          )
        );
        return maxBottom;
      }
    }
    return 300; // Default minimum height
  }, [nodeData?.id, flowYdoc, childNodes]);

  const { handleCopyNodes } = useReusableFunctions();

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsCopied(copyClicked[nodeData?.id]);
  }, [copyClicked]);

  return (
    <>
      <NodeResizer
        isVisible={isEditable}
        onResize={handleResize}
        minWidth={minWidth}
        minHeight={minHeight}
        onResizeEnd={handleResizeEnd}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: "-40px",
          zIndex: 1,
        }}
      >
        <TextTypography sx={{ color: "white" }}>
          {nodeData?.name}
        </TextTypography>
        <Box sx={{ display: "flex" }}>
          {isEditable && (
            <IconButton
              onClick={handleDelete}
              sx={{ right: "5px", marginBottom: "5px " }}
            >
              <DeleteIcon
                style={{
                  width: "15px",
                  height: "15px",
                  fill: theme.palette.mainRed.main,
                }}
              />
            </IconButton>
          )}
          {isEditable && selectedFlowIds?.includes(nodeData?.id) && (
            <>
              <BiCopy
                style={{
                  marginRight: "10px",
                  marginTop: "7px",
                  cursor: "pointer",
                  color: isCopied ? "green" : "auto",
                }}
                onClick={() => {
                  setCopyClicked(nodeData?.id, true);
                  handleCopyNodes();
                }}
              />
              <BiCut
                style={{
                  cursor: "pointer",
                  marginTop: "7px",
                }}
                onClick={() => {
                  setCutClicked(nodeData?.id, true);
                  handleCopyNodes(true);
                }}
              />
            </>
          )}
          {isEditable && (
            <>
              {frameLockClicked[nodeData?.id] ? (
                <BiLock
                  style={{
                    cursor: "pointer",
                    marginTop: "7px",
                  }}
                  onClick={() => {
                    setFrameLockClicked(nodeData?.id, false);
                  }}
                />
              ) : (
                <HiOutlineLockOpen
                  style={{
                    cursor: "pointer",
                    marginTop: "7px",
                  }}
                  onClick={() => {
                    setFrameLockClicked(nodeData?.id, true);
                  }}
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: dimensions[nodeData?.id]
            ? dimensions[nodeData?.id]?.width
            : 700,
          height: dimensions[nodeData?.id]
            ? dimensions[nodeData?.id]?.height
            : 400,
          border:
            nodeWithinFrame == nodeData?.id
              ? "2px solid green"
              : selectedFlowIds.includes(nodeData?.id)
              ? "2px solid white"
              : "2px solid gray",
          transition: "border-color 0.3s ease-in-out",
          borderRadius: "10px",
          background: "#0505054d",
          color: "white",
          position: "relative",
        }}
        onClick={() => handleClickNode(nodeData?.id)}
      ></Box>
    </>
  );
}
