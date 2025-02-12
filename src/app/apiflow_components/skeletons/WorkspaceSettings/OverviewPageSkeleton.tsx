// OverviewPageSkeleton.tsx
import React from "react";
import { Box, Grid2, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";

const TextSkeleton = styled(Skeleton)`
  width: 100%;
  background-color: #00000052;
  border-radius: 7px;
  height: 60px;
`;

const HeadingSkeleton = styled(Skeleton)`
  width: 150px;
  background-color: #00000052;
  border-radius: 10px;
  height: 40px;
  margin-top: 1rem;
`;

const CircleSkeleton = styled(Skeleton)`
  background-color: #00000052;
  border-radius: 50%; // Make it circular
  width: 150px; // Set a fixed width
  height: 150px; // Set height equal to width
`;

const IconSkeleton = styled(Skeleton)`
  width: 35px;
  height: 35px;
  background-color: #00000052;
  border-radius: 10px;
`;

const TablesSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 6,
}) => (
  <TableContainer component={Box} sx={{ maxWidth: "100%", mt: 2, px: 2 }}>
    <Table>
      <TableHead>
        <TableRow sx={{ background: "#362F47" }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell
              key={`header-cell-${colIndex}`}
              sx={{ borderBottom: "none" }}
            >
              <Skeleton
                variant="rectangular"
                width="60%"
                height={30}
                style={{ background: "#00000052" }}
              />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={`row-${rowIndex}`}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell
                key={`cell-${rowIndex}-${colIndex}`}
                sx={{ borderBottom: "none" }}
              >
                <Skeleton
                  variant="rectangular"
                  width="60%"
                  height={30}
                  style={{ background: "#00000052" }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const OverviewPageSkeleton = () => (
  <div>
    <HeadingSkeleton variant="text" style={{ width: "250px" }} />
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <HeadingSkeleton variant="text" style={{ marginTop: "1rem" }} />
      {/* <IconSkeleton variant="rectangular" /> */}
      <HeadingSkeleton variant="text" style={{ marginTop: "0rem" }} />
    </Box>

    <Box
      sx={{
        width: "100%",
        height: "auto",
        background: "#241D35",
        marginTop: "1rem",
        borderRadius: "20px",
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
          <Box
            sx={{
              margin: "1rem 0rem",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Circle skeleton */}
            <CircleSkeleton variant="circular" />
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sx: "column",
                md: "column",
                lg: "row",
                xl: "row",
              },
              marginTop: "10px",
            }}
          >
            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div
                style={{
                  color: "#FFFFFFBF",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  margin: "10px",
                }}
              >
                <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  <TextSkeleton variant="text" />
                </Grid2>
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <div
                  style={{
                    color: "#FFFFFFBF",
                    fontSize: "0.8rem",
                    fontWeight: "400",
                    margin: "10px",
                  }}
                >
                  <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <TextSkeleton variant="text" />
                  </Grid2>
                </div>
              </Grid2>
            </Grid2>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sx: "column",
                md: "column",
                lg: "row",
                xl: "row",
              },
            }}
          >
            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div
                style={{
                  color: "#FFFFFFBF",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  margin: "10px",
                }}
              >
                <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  <TextSkeleton variant="text" />
                </Grid2>
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div
                style={{
                  color: "#FFFFFFBF",
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  margin: "10px",
                }}
              >
                <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  <TextSkeleton variant="text" />
                </Grid2>
              </div>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>

      {/* Table skeleton */}
      <TablesSkeleton rows={4} columns={4} />
    </Box>
  </div>
);

export default OverviewPageSkeleton;
