// WorkspacePageSkeleton.tsx
import React from "react";
import { Box, Skeleton } from "@mui/material";

const EnvironmentPageSkeleton = () => (
  <Box sx={{ width: "100%", maxWidth: 400, margin: "1rem" }}>
    <Skeleton
      variant="rectangular"
      width="100%" // Use 100% width relative to the container
      height="250px" // Adjust height as needed
      sx={{
        borderRadius: "30px", // Rounded corners for the card
        boxShadow: 3, // Optional shadow for card-like effect
        backgroundColor: "#00000052",
      }}
    />
  </Box>
);

export default EnvironmentPageSkeleton;
