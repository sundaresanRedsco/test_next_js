import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import theme from "@/Theme/theme";
import CustomPagination from "./customPagination";

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
    dataGridType === "primary" ? "#F3F3F340" : theme.palette.LGrayishBlue.main;
  const stripedRows = dataGridType === "primary" ? true : false;
  return (
    <Box
      sx={{
        height: 300,
        width: width || "100%",
        border: "1px solid " + "#F3F3F340",
        "& .super-app-theme--header": {
          backgroundColor: backgroundColor || "#F3F3F340",
          color: color || "black",
          fontFamily: "FiraSans-regular",
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
            fontFamily: "FiraSans-regular", // Specify the font family
            color: "#FFFFFF", // Specify the font color
            border:
              dataGridType === "primary" ? "1px solid " + "#F3F3F340" : "none",

            borderRight: "none", // Remove the right border for all cells
            "&:last-child": {
              borderRight: "1px solid " + "#F3F3F340", // Add right border for the last cell
            },
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: stripedRows ? "#F3F3F340" : "", // Specify the background color for even rows
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
          "& .MuiDataGrid-overlay": {
            backgroundColor: "transparent",
            color: "#EEEEEE",
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
