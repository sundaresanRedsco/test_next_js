import * as React from "react";
import Box from "@mui/material/Box";
// import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import theme from "../../../Theme/theme";
import CustomPagination from "./customPagination";
import { makeStyles } from "@mui/material";

export default function GDataGrid(props: any) {
  const {
    dataGridType,
    processRowUpdate,
    columns,
    backgroundColor,
    density,
    hidePagination,
    color,
    rows,
    hideFooter,
    checkboxSelection,
    fontSize,
    bodyFontSize,
    autoHeight,
    fontWeight,
    disableColumnMenu,
    editMode,
    onRowSelect,
    width,
  } = props;

  const tableHeaderBg =
    dataGridType === "primary"
      ? theme.palette.silverGrey.main
      : theme.palette.LGrayishBlue.main;
  const stripedRows = dataGridType === "primary" ? true : false;
  return (
    <Box
      sx={{
        height: 300,
        width: width || "100%",
        // border: "1px solid " + theme.palette.silverGrey.main,
        "& .super-app-theme--header": {
          backgroundColor: backgroundColor || tableHeaderBg,
          color: color || theme.palette.primaryText.main,
          fontFamily: "Inter-Regular",
          fontSize: fontSize || "0.6rem",
          fontStyle: "normal",
          fontWeight: fontWeight || 800,
          lineHeight: "normal",
        },
      }}
    >
      <DataGrid
        density={density || "compact"}
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={onRowSelect}
        processRowUpdate={processRowUpdate}
        editMode={editMode}
        slots={{
          pagination: hidePagination ? null : CustomPagination,
        }}
        sx={{
          border: "none", // Remove the bottom border

          "& .MuiDataGrid-cell": {
            fontSize: bodyFontSize || "0.6rem", // Specify the font size
            fontFamily: "Inter-Regular", // Specify the font family
            color: theme.palette.grayishBlue.main, // Specify the font color
            border:
              dataGridType === "primary"
                ? "1px solid " + theme.palette.silverGrey.main
                : "none",

            borderRight: "none", // Remove the right border for all cells
            "&:last-child": {
              borderRight: "1px solid " + theme.palette.silverGrey.main, // Add right border for the last cell
            },
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: stripedRows ? "#F5F5F5" : "", // Specify the background color for even rows
          },
          "& .MuiDataGrid-footerContainer": {
            display: "flex",
            justifyContent: "center", // Center the pagination
            border: "none",
          },
          "& .MuiPagination-root .MuiPaginationItem-page": {
            height: "24px", // Set the height for the selected page item
            fontSize: "0.6rem",
            minHeight: "24px",
            width: "24px",
            minWidth: "24px",
          },
          "& .MuiButtonBase-root-MuiPaginationItem-root": {
            height: "24px", // Set the height for the selected page item
            fontSize: "0.6rem",
            minHeight: "24px",
            width: "24px",
            minWidth: "24px",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "10px",
          },
        }}
        disableRowSelectionOnClick={true} // Disable row selection
        hideFooter={hideFooter || false}
        checkboxSelection={checkboxSelection || false}
        autoHeight={autoHeight || false}
        disableColumnMenu={disableColumnMenu || false}
        initialState={{
          ...rows?.initialState,
          pagination: { paginationModel: { pageSize: 5 } },
        }}
      />
    </Box>
  );
}
