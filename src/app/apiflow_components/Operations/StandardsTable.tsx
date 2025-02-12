import React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Violation {
  standard: string;
  identified: string;
  violation: string;
}

interface StandardsInfo {
  label: string;
  key: string;
  param_type: string;
  path: string;
  text: string;
  sensitivity_level: string;
  violations: Violation[];
  created_at: string;
}

interface DataItem {
  id: string;
  standards_info: StandardsInfo[];
}

interface StandardsTableProps {
  data: DataItem[];
}

// Headers as an array
const headers = [
  "Label",
  "Key",
  "Param Type",
  "Path",
  "Text",
  "Sensitivity",
  "Created At",
];

// Styled Table Head
const StyledTableHead = styled(TableHead)({
  background: "#362F47",
});

// Styled Typography for Table Headers
const HeadingTypography = styled(Typography)({
  fontFamily: "FiraSans-Regular",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: 600,
  textAlign: "center",
});

// Styled Accordion for Violations
const StyledAccordion = styled(Accordion)({
  "&::before": {
    display: "none",
  },

  borderRadius: "4px",
  marginBottom: "4px",
  background: "#362F47",
  textAlign: "left !important",
});
const TableTextTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 10px;
  text-align: center;
`;

const tableBodyCellCommonStyle = {
  color: "white",
  maxWidth: "150px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  cursor: "pointer",
  padding: "10px",
  borderBottom: "none",
  textAlign: "center",
};

const StandardsTable: React.FC<StandardsTableProps> = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#241D35",
        overflowX: "auto",
        maxWidth: "100%",
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <Table>
        {/* Table Header */}
        <StyledTableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>
                <HeadingTypography>{header}</HeadingTypography>
              </TableCell>
            ))}
          </TableRow>
        </StyledTableHead>

        {/* Table Body */}
        <TableBody>
          {data?.length === 0 || data == undefined || (
            <TableRow>
              <TableCell colSpan={8} sx={tableBodyCellCommonStyle}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Typography color="#FFFFFF">No data available</Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
          {data.map((item) =>
            item?.standards_info?.map((info, index) => (
              <React.Fragment key={`${item.id}-${index}`}>
                {/* Main Data Row */}
                <TableRow>
                  <TableCell>
                    <TableTextTypography>{info.label}</TableTextTypography>
                  </TableCell>
                  <TableCell>
                    <TableTextTypography>{info.key}</TableTextTypography>
                  </TableCell>
                  <TableCell>
                    <TableTextTypography>{info.param_type}</TableTextTypography>
                  </TableCell>
                  <TableCell>
                    <TableTextTypography>{info.path}</TableTextTypography>
                  </TableCell>
                  <TableCell>
                    <TableTextTypography>{info.text}</TableTextTypography>
                  </TableCell>
                  <TableCell>
                    <TableTextTypography>
                      {info.sensitivity_level}
                    </TableTextTypography>
                  </TableCell>
                  <TableCell>
                    <TableTextTypography>
                      {new Date(info.created_at).toLocaleString()}
                    </TableTextTypography>
                  </TableCell>
                </TableRow>

                {/* Violations Row (Accordion) */}
                {info?.violations?.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={headers.length}>
                      <StyledAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <TableTextTypography variant="body2">
                            {info.violations.length} Violation(s)
                          </TableTextTypography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {info.violations.map((v, i) => (
                            <TableTextTypography
                              key={i}
                              variant="body2"
                              style={{
                                textAlign: "left",
                              }}
                            >
                              <strong>{v.standard}</strong>: {v.violation}
                            </TableTextTypography>
                          ))}
                        </AccordionDetails>
                      </StyledAccordion>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StandardsTable;
