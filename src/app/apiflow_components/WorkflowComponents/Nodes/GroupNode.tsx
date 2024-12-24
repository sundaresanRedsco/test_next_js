import React, { useMemo, useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import theme from "@/Theme/theme";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import { DeleteIcon } from "@/app/Assests/icons";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
export const TextTypography = styled(Typography)`
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
  const { isEditable } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );
  const nodeData = useMemo(() => parseData(data) || {}, [data]);
  const { nodeWithinFrame } = useWorkflowStore();

  return (
    <Box
      sx={{
        height: "400px",
        width: "700px",
        border:
          nodeWithinFrame == nodeData?.id
            ? "2px solid white"
            : "2px solid gray",
        borderRadius: "10px",
        background: "#0505054d",
        color: "white",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: "-30px",
        }}
      >
        <TextTypography sx={{ color: "white" }}>
          {nodeData?.name}
        </TextTypography>
        <Button
          sx={{
            "&.MuiButton-root:hover path": {
              fill: "red",
            },
            backgroundColor: "unset !important",
            marginLeft: "auto",
            minWidth: "auto",
          }}
        >
          {isEditable && (
            <DeleteIcon
              className="position-absolute"
              style={{
                width: "15px",
                height: "15px",
                fill: theme.palette.mainRed.main,
                right: "5px",
                cursor: "pointer",
                transition: "fill 0.1s ease",
                marginBottom: "5px ",
              }}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
}
