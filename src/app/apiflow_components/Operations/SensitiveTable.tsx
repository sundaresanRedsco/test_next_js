import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import GButton from "@/app/apiflow_components/global/GButtonV1";

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
`;

const TableTextTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 10px;
`;

const TableTypography = styled("span")`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 10px;
`;

// Define the column headers
const tableHeaders = [
  "Key ID",
  "Name",
  "Group",
  "Param Type",
  "Sensitivity Level",
];

const tableBodyCellCommonStyle = {
  color: "white",
  maxWidth: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "pointer",
  padding: "10px",
  borderBottom: "none",
};

// Sample data

function SensitiveTable(props: any) {
  const { data } = props;
  return (
    <TableContainer>
      <Table>
        {/* Table Header */}
        <TableHead style={{ background: "#362F47", borderBottom: "none" }}>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell
                key={index}
                sx={{ color: "#FFFFFF", borderBottom: "none" }}
              >
                <HeadingTypography>{header}</HeadingTypography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody sx={{ background: "#241D35" }}>
          {data.length === 0 ? (
            <TableRow style={{ height: "22rem" }}>
              <TableCell colSpan={12} sx={tableBodyCellCommonStyle}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <p style={{ textAlign: "center", color: "#FFFFFF" }}>
                    There is no data available to display in the table.
                  </p>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            data?.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={tableBodyCellCommonStyle}>
                  <TableTextTypography>{row.key_id}</TableTextTypography>
                </TableCell>
                <TableCell sx={tableBodyCellCommonStyle}>
                  <TableTypography>{row.name}</TableTypography>
                </TableCell>
                <TableCell sx={tableBodyCellCommonStyle}>
                  <TableTextTypography>{row.group}</TableTextTypography>
                </TableCell>
                <TableCell sx={tableBodyCellCommonStyle}>
                  <TableTextTypography>{row.type}</TableTextTypography>
                </TableCell>
                <TableCell sx={tableBodyCellCommonStyle}>
                  <GButton
                    background={
                      row.sensitivity_level === "high"
                        ? "#FD0101"
                        : row.sensitivity_level === "medium"
                        ? "#FFA500"
                        : "#00C853"
                    }
                    label={row.sensitivity_level}
                    color="#FFFFFF"
                    minWidth="50px"
                    padding="5px"
                    border="none"
                    fontSize="0.8rem"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SensitiveTable;
