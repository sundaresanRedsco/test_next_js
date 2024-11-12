import React from "react";
import { Box, Skeleton } from "@mui/material";

function WorkflowDrawerSkeleton() {
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.15)",
        height: "auto",
        padding: {
          xs: "0px 10px",
          sm: "0px 10px",
          md: "0px 10px",
          lg: "0px 10px",
          xl: "5px 10px",
        },
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Text Skeletons */}
      <Skeleton
        variant="text"
        width="80px"
        height="20px"
        sx={{ bgcolor: "#00000052", marginRight: 1 }}
      />
      <Skeleton
        variant="text"
        width="80px"
        height="20px"
        sx={{ bgcolor: "#00000052", marginRight: 1 }}
      />
      <Skeleton
        variant="text"
        width="80px"
        height="20px"
        sx={{ bgcolor: "#00000052", marginRight: 1 }}
      />

      {/* Icon Skeleton */}
      <Box
        sx={{
          position: "absolute",
          right: "10px",
          width: "25px",
          height: "25px",
          cursor: "pointer",
          zIndex: 1001,
        }}
      >
        <Skeleton
          variant="circular"
          width="25px"
          height="25px"
          sx={{ bgcolor: "#00000052" }}
        />
      </Box>
    </Box>
  );
}

export default WorkflowDrawerSkeleton;
