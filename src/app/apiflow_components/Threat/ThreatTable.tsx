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
import { borderBottom, styled } from "@mui/system";
import GButton from "@/app/ApiFlowComponents/Global/GButton";
import {
  NodeIconTable,
  ProgressIconTable,
  SqlIconTable,
} from "@/app/Assests/icons";

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`;

const ServerityText = styled(Box)`
  height: 20px;
  wigth: 20px;
  border-radius: 50%;
  background: red;
`;

const TableTextTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 12px;
`;

const TableTypography = styled("span")`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 12px;
  // margin-left: 10px;
`;

// Define the column headers
const tableHeaders = [
  "Threat Activity",
  "Resource",
  "Node",
  "Threat Details",
  "Severity",
  "Timestamp",
];

const tableBodyCellCommonStyle = {
  color: "white",
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 2,
  whiteSpace: "nowrap",
  cursor: "pointer",
  padding: "10px",
  borderBottom: "none",
};

// Sample data for four rows
const tableData: any = [
  {
    id: 1,
    col1: "Method override",
    col2: "GetAllProducts",
    col3: "-",
    col4: "-",
    col5: "8",
    col6: "2025-01-09, 10:00:40 AM",
    type: "-",
  },
  {
    id: 2,
    col1: "Cross-site Scripting",
    col2: "GetAllUsers",
    col3: "-",
    col4: "-",
    col5: "8",
    col6: "2025-01-19, 11:45:58 AM",
    type: "-",
  },
  // {
  //   id: 1,
  //   col1: "SQL",
  //   col2: "CMP Pro.../Dev Env",
  //   col3: "Get/order/{or}",
  //   col4: "Log4J JNDI Exploitation",
  //   col5: "8",
  //   col6: "2024-10-09, 11:45:58 AM",
  //   type: "sql",
  // },
  // {
  //   id: 2,
  //   col1: "SQL",
  //   col2: "CMP Pro.../Dev Env",
  //   col3: "Get/order/{or}",
  //   col4: "LOg4j RCE DOS",
  //   col5: "5",
  //   col6: "2024-10-09, 11:45:58 AM",
  //   type: "ProgressSql",
  // },
  // {
  //   id: 3,
  //   col1: "SQL",
  //   col2: "CMP Pro.../Dev Env",
  //   col3: "Get/order/{or}",
  //   col4: "Log4J JNDI Exploitation",
  //   col5: "5",
  //   col6: "2024-10-09, 11:45:58 AM",
  //   type: "sql",
  // },
  // {
  //   id: 4,
  //   col1: "SQL",
  //   col2: "CMP Pro.../Dev Env",
  //   col3: "Get/order/{or}",
  //   col4: "Log4J JNDI Exploitation",
  //   col5: "8",
  //   col6: "2024-10-09, 11:45:58 AM",
  //   type: "ProgressSql",
  // },
];

function ThreatTable() {
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
                <HeadingTypography> {header}</HeadingTypography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody sx={{ background: "#241D35" }}>
          {tableData?.length === 0 ? (
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
            tableData.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    borderBottom: "solid 1px #FFFFFF26",
                  }}
                >
                  {row?.type === "sql" ? (
                    <SqlIconTable />
                  ) : (
                    <ProgressIconTable />
                  )}
                  <TableTypography style={{ marginLeft: "10px" }}>
                    {row?.col1}
                  </TableTypography>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    borderBottom: "solid 1px #FFFFFF26",
                  }}
                >
                  <TableTextTypography>{row?.col2}</TableTextTypography>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    borderBottom: "solid 1px #FFFFFF26",
                  }}
                >
                  {/* <NodeIconTable />{" "} */}
                  <TableTypography>{row?.col3}</TableTypography>{" "}
                  {/* <GButton
                    background="#FFFFFF26"
                    label={"+8"}
                    color="#FFFFFF"
                    minWidth="25px"
                    padding="0px"
                    border="none"
                    fontSize="12px"
                  /> */}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    borderBottom: "solid 1px #FFFFFF26",
                  }}
                >
                  <TableTextTypography>{row?.col4}</TableTextTypography>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    borderBottom: "solid 1px #FFFFFF26",
                  }}
                >
                  <GButton
                    background="#FD0101"
                    label={row?.col5}
                    color="#FFFFFF"
                    minWidth="25px"
                    padding="0px"
                    border="none"
                    fontSize="0.8rem"
                  />
                </TableCell>
                <TableCell
                  sx={{
                    color: "#FFFFFF",
                    borderBottom: "solid 1px #FFFFFF26",
                  }}
                >
                  <TableTextTypography>{row?.col6}</TableTextTypography>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThreatTable;
