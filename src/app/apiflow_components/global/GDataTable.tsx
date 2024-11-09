// ** MUI Components
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Checkbox,
  Button,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// ** MUI ICON Components
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// ** Custom CSS
import { useEffect, useState } from "react";
import Image from "next/image";
import { borderBottom, borderRadius, fontFamily, useTheme } from "@mui/system";
import { DeleteTableIcon } from "@/app/Assests/icons";
import GInput from "./GInput";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import GSelect from "../sign/discovery/GSelect";

// ** Select Field Styles
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 205,
    },
  },
};
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     // backgroundColor: "#241D35",
  //   },
  //   "&:nth-of-type(even)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  // hide last border
  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
  "& .MuiTableCell-root": {
    fontFamily: "Firasans-light",
    color: "#FFFFFF",
    backgroundColor: "#241D35",
  },
}));
type Props = {
  showCheckBox?: boolean;
  setselectedFilter?: any;
  isLoading?: boolean;
  totalRecords?: any;
  data?: any;
  sortColumn?: any;
  sortDirection?: any;
  selectedRows?: any;
  columnLabels?: any;
  onPageChange?: any;
  onRowsPerPageChange?: any;
  onhandleSort?: any;
  onhandleRowSelect?: any;
  onhandleSelectAllRows?: any;
  onhandleExport?: any;
  onSearchTextChange?: any;
  additionalHeader?: any;
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#362F47",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));
const defaultTableBodyStyles = {
  //**Last TableRow's Last TableCell */
  "& .MuiTableRow-root:last-of-type .MuiTableCell-root:last-of-type": {
    borderBottomRightRadius: "10px",
  },
  //**Last TableRow's First TableCell */
  "& .MuiTableRow-root:last-child .MuiTableCell-root:nth-of-type(1)": {
    borderBottomLeftRadius: "10px",
  },
  //** Every TableRow's First TableCell */
  "& .MuiTableRow-root .MuiTableCell-root:nth-of-type(1)": {
    textAlign: "start",
  },
  //**Every TableCell */
  "& .MuiTableRow-root .MuiTableCell-root": {
    borderBottom: "1.5px solid #FFFFFF26",
    textAlign: "center",
  },
  //**Last tableRow */
  "& .MuiTableRow-root:last-child .MuiTableCell-root": {
    border: "none",
  },
};
const defaultTableHeadStyle = (additionalHeader?: boolean) => {
  return {
    "& .MuiTableRow-root:last-of-type .MuiTableCell-root:last-of-type": {
      borderTopRightRadius: additionalHeader ? 0 : "10px",
    },
    "& .MuiTableRow-root:last-child .MuiTableCell-root:nth-of-type(1)": {
      borderTopLeftRadius: additionalHeader ? 0 : "10px",
      textAlign: "start",
    },
    "& .MuiTableRow-root .MuiTableCell-root": {
      textAlign: "center",
    },
  };
};
const tableHeadCellCommonStyle = {
  fontSize: "12px",
  color: "white",
  background: "#362F47",
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 2,
  whiteSpace: "nowrap",
  // cursor: "pointer",
  fontFamily: "Firasans-medium",
  border: "none",
  padding: "10px",
};
const tableBodyCellCommonStyle = {
  color: "white",
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 2,
  whiteSpace: "nowrap",
  cursor: "pointer",
  padding: "10px",
};
const GDataTable = ({
  showCheckBox,
  setselectedFilter,
  isLoading,
  totalRecords,
  data,
  sortColumn,
  sortDirection,
  selectedRows,
  columnLabels,
  onPageChange,
  onRowsPerPageChange,
  onhandleSort,
  onhandleRowSelect,
  onhandleSelectAllRows,
  onhandleExport,
  onSearchTextChange,
  additionalHeader,
}: Props) => {
  // ** Table Skeleton Function
  function TableSkeletonData(
    id: any,
    disk: any,
    type: any,
    size: any,
    cost: any,
    action: any
  ) {
    return { id, disk, type, size, cost, action };
  }
  const Skeletonrows = [
    TableSkeletonData(1, "SSD", "Standard", "2TB", "$200", "View"),
    TableSkeletonData(2, "HDD", "Premium", "4TB", "$350", "View"),
    TableSkeletonData(3, "SSD", "Basic", "1TB", "$150", "View"),
    TableSkeletonData(4, "HDD", "Standard", "1TB", "$100", "View"),
    TableSkeletonData(5, "SSD", "Premium", "4TB", "$400", "View"),
  ];
  const handleFilterChange = (event: any) => {
    const newFilter = event.target.value;

    setselectedFilter(newFilter);
  };
  const handleSearchTextChange = (event: any) => {
    onSearchTextChange(event.target.value);
  };
  const handleChangePage = (event: any, newPage: any) => {
    onPageChange(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    onRowsPerPageChange(event.target.value);
  };
  const handleSort = (column: any) => {
    onhandleSort(column);
  };
  const handleRowSelect = (event: any, row: any) => {
    onhandleRowSelect(row);
  };
  const handleSelectAllRows = (event: any) => {
    onhandleSelectAllRows(event.target.checked);
  };
  const handleExport = () => {
    onhandleExport(selectedRows);
  };
  const isRowSelected = (row: any) => selectedRows?.indexOf(row) !== -1;
  const formedTrows = () => {
    return data.map((row: any, index: number) => {
      return (
        <StyledTableRow selected={isRowSelected(row)} key={index}>
          {showCheckBox && (
            <TableCell padding="checkbox" sx={{ background: "#362F47" }}>
              <Checkbox
                checked={isRowSelected(row)}
                onChange={handleSelectAllRows}
                sx={{
                  color: "#6b6f82",
                  "&.Mui-checked": { color: "#6DCCDD" },
                }}
              />
            </TableCell>
          )}
          {Object.keys(columnLabels).map((column, index1) => {
            if (column === "email") {
              return (
                <TableCell
                  style={tableBodyCellCommonStyle}
                  title={row[column]}
                  key={column}
                  // onClick={(event) => handleRowSelect(row)}
                >
                  {row[column]}
                </TableCell>
              );
            } else if (column === "action") {
              return (
                <TableCell
                  key={column}
                  sx={{ width: "auto", maxWidth: "auto" }}
                  // aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                  // onClick={(event) => handleMenuClick(event, index)}
                >
                  <IconButton sx={{ padding: 0 }}>
                    <DeleteTableIcon />
                  </IconButton>
                </TableCell>
              );
            } else {
              return (
                <TableCell
                  style={{
                    ...tableBodyCellCommonStyle,
                  }}
                  title={row[column]}
                  key={column}
                >
                  {row[column]}
                </TableCell>
              );
            }
          })}
        </StyledTableRow>
      );
    });
  };
  return (
    <div>
      {additionalHeader && (
        <Grid
          container
          sx={{
            width: "100%",
            background: "#12121280",
            borderRadius: "10px 10px 0 0",
            padding: "10px",
          }}
          columnSpacing={1}
        >
          {additionalHeader}
        </Grid>
      )}

      <TableContainer component={Paper} sx={{ background: "transparent" }}>
        {/* // ** DataTable */}
        <Box
          hidden={isLoading || data.length == 0}
          sx={{
            width: "100%",
          }}
        >
          <Table>
            <TableHead sx={defaultTableHeadStyle(additionalHeader)}>
              <TableRow>
                {showCheckBox && (
                  <TableCell
                    padding="checkbox"
                    sx={{ background: "#362F47", borderBottom: "none" }}
                  >
                    <Checkbox
                      checked={selectedRows?.length === data.length}
                      onChange={handleSelectAllRows}
                      sx={{
                        color: "#6b6f82",
                        "&.Mui-checked": { color: "#6DCCDD" },
                      }}
                    />
                  </TableCell>
                )}
                {Object.keys(columnLabels).map((column) => {
                  if (columnLabels[column] == "Action") {
                    return (
                      <TableCell
                        key={column}
                        style={tableHeadCellCommonStyle}
                        title={columnLabels[column]}
                        sx={{ width: "auto" }}
                      >
                        {columnLabels[column]}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={column} // Add key prop
                        onClick={
                          onhandleSort ? () => handleSort(column) : undefined
                        }
                        style={tableHeadCellCommonStyle}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                        {sortColumn === column && (
                          <span>
                            &nbsp;
                            {sortDirection === "asc" ? (
                              <KeyboardArrowUp
                              // sx={{ position: "relative", top: "7px" }}
                              />
                            ) : (
                              <KeyboardArrowDown
                              // sx={{ position: "relative", top: "7px" }}
                              />
                            )}
                          </span>
                        )}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody sx={defaultTableBodyStyles}>{formedTrows()}</TableBody>
          </Table>

          {/* <TablePagination
            sx={{
              overflow: "hidden",
              width: {
                xl: "auto",
                lg: "auto",
                md: "auto",
                sm: "auto",
                xs: "max-content",
              },
              position: "sticky",
              left: {
                xl: "auto",
                lg: "auto",
                md: "auto",
                sm: "auto",
                xs: 0,
              },
              [themes.breakpoints.down(460)]: {
                "& .MuiInputBase-root": {
                  margin: 0,
                },
              },
              [themes.breakpoints.down(376)]: {
                "& .MuiTablePagination-actions": {
                  margin: 0,
                },
              },
            }}
            hidden={data.length == 0 || totalRecords == 0}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRecords}
            rowsPerPage={rowsPerPage}
            page={totalRecords > page ? page : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Box>
        {/* // ** Skeleton Table */}
        <div hidden={!isLoading}>
          <Table aria-label="simple table" sx={{ overflowX: "scroll" }}>
            <TableHead
              sx={{
                height: "45px",
                ...defaultTableHeadStyle(additionalHeader),
              }}
            >
              <TableRow>
                <TableCell style={tableHeadCellCommonStyle}></TableCell>
                <TableCell style={tableHeadCellCommonStyle}></TableCell>
                <TableCell style={tableHeadCellCommonStyle}></TableCell>
                <TableCell style={tableHeadCellCommonStyle}></TableCell>
                <TableCell style={tableHeadCellCommonStyle}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={defaultTableBodyStyles}>
              {Skeletonrows.map((row) => (
                <StyledTableRow key={row.id}>
                  <TableCell
                    scope="row"
                    sx={{ ...tableBodyCellCommonStyle, padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableBodyCellCommonStyle, padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableBodyCellCommonStyle, padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableBodyCellCommonStyle, padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ ...tableBodyCellCommonStyle }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* // ** No Datas */}
        <div hidden={isLoading || data.length != 0}>
          <Table>
            <TableHead sx={defaultTableHeadStyle(additionalHeader)}>
              <TableRow>
                {Object.keys(columnLabels).map((column) => {
                  if (columnLabels[column] == "Action") {
                    return (
                      <TableCell
                        key={column} // Add key prop
                        style={tableHeadCellCommonStyle}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={column} // Add key prop
                        // onClick={() => handleSort(column)}
                        style={tableHeadCellCommonStyle}
                        title={columnLabels[column]}
                      >
                        {columnLabels[column]}
                        {sortColumn === column && (
                          <span>
                            &nbsp;
                            {sortDirection === "asc" ? (
                              <KeyboardArrowUp
                              // sx={{ position: "relative", top: "7px" }}
                              />
                            ) : (
                              <KeyboardArrowDown
                              // sx={{ position: "relative", top: "7px" }}
                              />
                            )}
                          </span>
                        )}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody sx={defaultTableBodyStyles}>
              <StyledTableRow>
                <TableCell
                  style={{
                    ...tableBodyCellCommonStyle,
                    padding: "80px 0 80px 0",
                    textAlign: "center",
                  }}
                  colSpan={Object.keys(columnLabels).length}
                >
                  There is no data available to display in the table.
                </TableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
};

export default GDataTable;
