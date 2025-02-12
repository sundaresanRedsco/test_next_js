import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/system";

const TextSkeleton = styled(Skeleton)`
  width: 100px;
  background-color: #00000052;
  border-radius: 7px;
  height: 30px;
`;

const IconSkeleton = styled(Skeleton)`
  width: 35px;
  height: 35px;
  background-color: #00000052;
  border-radius: 10px;
`;

const WorkFlowHeaderSkeleton = () => {
  return (
    <Box
      sx={{
        background: "#F3F3F340",
        backdropFilter: "blur(9.54)",
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: {
          xs: "0px 10px",
          sm: "0px 10px",
          md: "0px 10px",
          lg: "0px 10px",
          xl: "5px 10px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: {
            xs: "5px",
            sx: "5px",
            md: "10px",
            lg: "10px",
            xl: "10px",
          },
          marginLeft: "10px",
          padding: "10px 0px",
        }}
      >
        {/* Text Skeleton */}
        <TextSkeleton variant="text" />

        {/* Button Skeleton */}
        <Skeleton
          variant="rectangular"
          width={100}
          height={30}
          sx={{ backgroundColor: "#00000052", borderRadius: "10px" }}
        />
      </Box>

      <Stack
        direction="row"
        spacing={{
          xs: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 1,
        }}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Edit Icon Skeleton */}
        <IconSkeleton variant="rectangular" />

        {/* Terminal Icon Skeleton */}
        <IconSkeleton variant="rectangular" />

        {/* Run Icon Skeleton */}
        <IconSkeleton variant="rectangular" />

        {/* Download Icon Skeleton */}
        <IconSkeleton variant="rectangular" />

        {/* Dropdown Skeleton */}
        <Skeleton
          variant="rectangular"
          width={70}
          height={30}
          sx={{ backgroundColor: "#00000052", borderRadius: "10px" }}
        />
      </Stack>
    </Box>
  );
};

export default WorkFlowHeaderSkeleton;
