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
import GButton from "@/app/apiflow_components/global/GButtonV1";
import {
  NodeIconTable,
  ProgressIconTable,
  SqlIconTable,
} from "@/app/Assests/icons";
import theme from "@/Theme/theme";

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: ${theme.palette.textPrimaryColor.main};
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
  color: ${theme.palette.textPrimaryColor.main};
  font-size: 12px;
`;

const TableTypography = styled("span")`
  font-family: "FiraSans-Regular" !important;
  color: ${theme.palette.textPrimaryColor.main};
  font-size: 12px;
`;

// Define the column headers
const tableHeaders = ["Private", "Public", "Orphan", "Zombie", "Shadow"];

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

function ThreatTable(props: any) {
  const { endpointIdentityCountData } = props;

  let tableData = [
    endpointIdentityCountData.private_count,
    endpointIdentityCountData.public_count,
    endpointIdentityCountData.orphan_count,
    endpointIdentityCountData.zombie_count,
    endpointIdentityCountData.shadow_count,
  ];

  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed", width: "100%" }}>
        {/* Table Header */}
        <TableHead
          style={{
            background: `${theme.palette.summaryCardColor.main}`,
            borderBottom: "none",
          }}
        >
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell
                key={index}
                align={header === "Private" ? "left" : "center"}
                sx={{
                  color: `${theme.palette.textPrimaryColor.main}`,
                  borderBottom: "none",
                }}
              >
                <HeadingTypography> {header}</HeadingTypography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody sx={{ background: `${theme.palette.summaryBgColor.main}` }}>
          {tableData?.length === 0 ? (
            <TableRow style={{ height: "22rem" }}>
              <TableCell colSpan={12} sx={tableBodyCellCommonStyle}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <p
                    style={{
                      textAlign: "center",
                      color: `${theme.palette.textPrimaryColor.main}`,
                    }}
                  >
                    There is no data available to display in the table.
                  </p>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              {tableData?.map((value: any, index: any) => (
                <TableCell
                  key={index}
                  align={index === 0 ? "left" : "center"}
                  sx={{
                    color: theme.palette.textPrimaryColor.main,
                    borderBottom: `solid 1px ${theme.palette.threatTableBodyBorderColor.main}`,
                  }}
                >
                  <TableTypography>{value}</TableTypography>
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThreatTable;
