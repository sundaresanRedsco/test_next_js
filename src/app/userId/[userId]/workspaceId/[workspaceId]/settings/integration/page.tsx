"use client";

import EditIcon from "@mui/icons-material/Edit";
import { HeadingTypography, PrimaryTypography } from "@/app/Styles/signInUp";
import theme from "@/Theme/theme";
import {
  Backdrop,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import ImportTypePopup from "@/app/apiflow_components/workspace/importTypePopup";
import { GetAllImportConfigurationWorkspaceId } from "@/app/Redux/apiManagement/apiGatewayReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import {
  dateTimeFormat,
  getValueOrDefault,
} from "@/app/Helpers/helpersFunctions";

const TableTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: ${theme.palette.textPrimaryColor.main};
  font-size: 0.8rem;
`;

type ApiGatewayType = {
  id: string;
  secretKey: string;
  name: string;
  region: string;
  accessKey: string;
  type: string;
  subscription_id: string;
  azure_tenat_id: string;
  Secretkey: string;
  ApiGatewayType: string;
  interval: string;
  client_id: string;
  client_secreat: string;
  api_url: string;
  admin_url: string;
  server_urls: string;
  description: string;

  authentication_key: string;
};

const page = () => {
  const dispatch = useDispatch<any>();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  let data = [
    {
      type: "AWS",
      updatedat: "eff",
      error_message: "eff",
      id: "1",
    },
    {
      type: "AZURE",
      updatedat: "eff",
      error_message: "eff",
      id: "2",
    },
    {
      type: "KONG",
      updatedat: "eff",
      error_message: "eff",
      id: "3",
    },
    {
      type: "APISIX",
      updatedat: "eff",
      error_message: "eff",
      id: "4",
    },
    {
      type: "GCP",
      updatedat: "eff",
      error_message: "eff",
      id: "5",
    },
    {
      type: "SWAGGER",
      updatedat: "eff",
      error_message: "eff",
      id: "6",
    },
  ];

  const initialApiGateway: ApiGatewayType = {
    id: "",
    secretKey: "",
    name: "",
    region: "",
    accessKey: "",
    type: "",
    subscription_id: "",
    azure_tenat_id: "", // Added tenant_id field
    Secretkey: "",
    interval: "",
    ApiGatewayType: "",
    client_id: "",
    client_secreat: "",
    api_url: "",
    admin_url: "",
    server_urls: "",
    authentication_key: "",
    description: "",
  };

  const [apiGateway, setApiGateway] =
    useState<ApiGatewayType>(initialApiGateway);

  const [allGatewayData, setAllGatewayData] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState(false);
  const [selectedImportType, setSelectedImportType] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const handleEditImportType = (importType: string, id: string) => {
    setAnchorEl(true);
    setSelectedImportType(importType);
    setSelectedId(id);
  };

  useEffect(() => {
    dispatch(GetAllImportConfigurationWorkspaceId(currentWorkspace?.id))
      .unwrap()
      .then((res: any) => {
        setAllGatewayData(res);
        setApiGateway({
          Secretkey: res[0]?.secretKey,
          id: res[0]?.id,
          secretKey: res[0]?.secretKey,
          name: res[0]?.name,
          description: res[0]?.description,
          region: res[0]?.region,
          accessKey: res[0]?.accessKey,
          type: res[0]?.type,
          subscription_id: res[0]?.subscription_id,
          azure_tenat_id: res[0]?.azure_tenat_id,
          interval: res[0]?.interval,
          ApiGatewayType: "",
          client_id: "",
          client_secreat: "",
          api_url: res[0]?.api_url,
          admin_url: res[0]?.admin_url,
          server_urls: res[0]?.server_urls,
          authentication_key: res[0]?.authentication_key,
        });
      })
      .catch((error: any) => {});
  }, [currentWorkspace?.id]);

  return (
    <Box sx={{ padding: "10px" }}>
      <HeadingTypography>Integration</HeadingTypography>
      {/* <ImportsCard /> */}
      <TableContainer
        sx={{
          marginTop: "1rem",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
        }}
      >
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          {/* Table Header */}
          <TableHead>
            <TableRow
              sx={{
                background: "#362F47",
                "&.MuiTableRow-root .MuiTableCell-root": {
                  borderBottom: "none",
                },
              }}
            >
              {[
                "Type",
                "Import Type",
                "Created At",
                "Updated By",
                "Error Message",
                "Edit",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  align={index === 0 ? "left" : "center"}
                  sx={{
                    color: `${theme.palette.textPrimaryColor.main}`,
                    fontFamily: "FiraSans-Regular",
                    fontWeight: "500",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/*allGatewayData* */}
            {allGatewayData?.length > 0 ? (
              allGatewayData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    position: "relative",
                    "&.MuiTableRow-root .MuiTableCell-root": {
                      borderBottom: "1.5px solid #FFFFFF26",
                    },
                  }}
                >
                  <TableCell>
                    <TableTypography>
                      {getValueOrDefault(row?.type)}
                    </TableTypography>
                  </TableCell>
                  <TableCell align="center">
                    <TableTypography>
                      {getValueOrDefault(row?.import_type)}
                    </TableTypography>
                  </TableCell>
                  <TableCell align="center">
                    <TableTypography>
                      {getValueOrDefault(dateTimeFormat(row?.createdat))}
                    </TableTypography>
                  </TableCell>
                  <TableCell align="center">
                    <TableTypography>
                      {getValueOrDefault(dateTimeFormat(row?.updatedat))}
                    </TableTypography>
                  </TableCell>
                  <TableCell align="center">
                    <TableTypography>
                      {getValueOrDefault(row?.error_message)}
                    </TableTypography>
                  </TableCell>
                  <TableCell key="action" align="center">
                    <IconButton
                      onClick={() => handleEditImportType(row?.type, row?.id)}
                    >
                      <EditIcon
                        style={{
                          width: "13px",
                          height: "13px",
                          marginLeft: "2px",
                          color: `${theme.palette.primaryWhite.main}`,
                        }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{
                  "&.MuiTableRow-root .MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{
                    color: "#FFFFFF",
                    height: "240px",
                  }}
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        {anchorEl && (
          <>
            <Backdrop
              sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              // open={btnClicked}
              open={anchorEl}
            />
            <ImportTypePopup
              importedType={selectedImportType}
              importedId={selectedId}
              open={anchorEl}
              setOpen={setAnchorEl}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default page;
