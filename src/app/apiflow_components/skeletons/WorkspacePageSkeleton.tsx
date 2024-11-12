// WorkspacePageSkeleton.tsx
import React from "react";
import { Box, Skeleton } from "@mui/material";

const WorkspacePageSkeleton = () => (
  <Box sx={{ width: "100%" }}>
    <Skeleton
      variant="rectangular"
      width="100%" // Use 100% width relative to the container
      height={"100%"} // Adjust height as needed
      sx={{
        borderRadius: "30px", // Rounded corners for the card
        boxShadow: 3, // Optional shadow for card-like effect
        backgroundColor: "#00000052", // Skeleton background color
      }}
    />
  </Box>
);

export default WorkspacePageSkeleton;
