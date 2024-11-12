import React from "react";
import { Box, Skeleton } from "@mui/material";

const LinearSkeleton: React.FC = () => (
  <Box sx={{ width: "100%", maxWidth: 400, margin: "1rem 0" }}>
    <Skeleton
      variant="rectangular"
      height={10}
      sx={{ borderRadius: 5, background: "#00000052" }}
    />
  </Box>
);

export default LinearSkeleton;
