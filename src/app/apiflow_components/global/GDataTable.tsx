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
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// ** MUI ICON Components
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { DeleteTableIcon } from "@/app/Assests/icons";

// ** Custom CSS

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
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 30,
      height: 30,
      fontFamily: "Firasans-medium",
      fontSize: "15px",
      textTransform: "uppercase",
    },
    children: `${name.split(" ")[0][0]}`,
  };
}
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
const tableBodyCellCommonStyle = (notMaxWidth?: boolean) => {
  return {
    color: "white",
    maxWidth: notMaxWidth ? "unset" : "100px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2,
    whiteSpace: "nowrap",
    cursor: "pointer",
    padding: "10px",
  };
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
                  style={{
                    ...tableBodyCellCommonStyle(true),
                  }}
                  title={row[column]}
                  key={column}

                  // onClick={(event) => handleRowSelect(row)}
                >
                  <Stack direction={"row"} gap={1.5} alignItems={"center"}>
                    <Avatar {...stringAvatar(row[column])} />
                    {row[column]}
                  </Stack>
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
                    ...tableBodyCellCommonStyle(),
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
                    sx={{ ...tableBodyCellCommonStyle(), padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableBodyCellCommonStyle(), padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableBodyCellCommonStyle(), padding: "15px" }}
                  >
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={"100%"}
                      height={15}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ ...tableBodyCellCommonStyle(), padding: "15px" }}
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
                    sx={{ ...tableBodyCellCommonStyle() }}
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
                    ...tableBodyCellCommonStyle(),
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
