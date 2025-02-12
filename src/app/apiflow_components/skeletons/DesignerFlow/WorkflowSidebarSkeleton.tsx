import React from "react";
import { Box, Skeleton } from "@mui/material";

function WorkflowSidebarSkeleton() {
  return (
    <Box
      sx={{
        backgroundColor: "#12121259",
        height: "480px",
        width: "90%",
        borderRadius: "15px",
        // padding: "20px",
      }}
    >
      {/* First skeleton with a red line at the bottom with top margin */}
      <Box
        sx={{
          position: "relative",
          mb: 1,
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -3, // Adjusts the line to sit slightly lower
            left: 0,
            width: "100%",
            height: "2px", // Adjust line thickness as needed
            backgroundColor: "#FFFFFF40",
          },
        }}
      >
        <Skeleton
          variant="text"
          width="87%"
          height={60}
          sx={{ backgroundColor: "#00000052", marginLeft: "1rem" }}
        />
      </Box>

      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3px 15px",
          gap: "0px",

          borderRadius: "7px",
        }}
      >
        {/* Additional skeletons */}
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            width="100%"
            height={60}
            sx={{ backgroundColor: "#00000052", borderRadius: "10px" }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default WorkflowSidebarSkeleton;
