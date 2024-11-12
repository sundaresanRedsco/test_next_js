import React from "react";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";

interface EnviromentTableSkeletonProps {
  rows?: number;
  columns?: number;
}

const EnviromentTableSkeleton: React.FC<EnviromentTableSkeletonProps> = ({
  rows = 5, // Default number of rows
  columns = 6, // Default number of columns
}) => {
  return (
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
                  width="100%"
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
                    width="100%"
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
};

export default EnviromentTableSkeleton;
