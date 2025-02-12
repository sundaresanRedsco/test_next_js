import React from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import GDataGrid from "@/app/apiflow_components/global/GDataGrid";

export default function OutputParamTable(props: any) {
  const { rowsOutput } = props;

  const columnsOutputParameters: GridColDef[] = [
    {
      field: "name",
      headerName: `Name`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "path",
      headerName: `Path`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "scope",
      headerName: `Scope`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "data_type",
      headerName: `Data type`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "collection_id",
      headerName: `Collection ID`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "record_id",
      headerName: `Record ID`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "description",
      headerName: `Description`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{
            fontSize: "10px",
            fontFamily: "FiraSans-regular",
          }}
        >
          {params?.value || ""}
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{
        borderLeft: "1.5px solid #F3F3F340",
        borderRight: "1.5px solid #F3F3F340",
      }}
    >
      <GDataGrid
        dataGridType={"primary"}
        columns={columnsOutputParameters}
        rows={rowsOutput}
        disableColumnMenu={true}
        fontSize="0.6rem"
        fontWeight={800}
        hideFooter={false}
      />
    </Box>
  );
}
