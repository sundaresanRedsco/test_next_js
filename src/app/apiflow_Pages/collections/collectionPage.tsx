"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, Grid2, Skeleton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import GInput from "@/app/apiflow_components/global/GInput";
import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
  DoNotTouch,
} from "@mui/icons-material";
import {
  GetCollectionDocsById,
  ImportSwaggerDocument,
} from "@/app/Redux/apiManagement/endpointReducer";
import { projectApiReducer } from "@/app/Redux/apiManagement/projectApiReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

const PrimaryTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

const OuterStyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#251A28",

  borderRadius: "20px",
  flex: "none",
  order: 1,
  alignSelf: "stretch",
  flexGrow: 0,
}));

const InnerStyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  background: "#12121280",
  borderRadius: "15px",
  padding: "15px 20px",
  border: "1px solid rgba(255, 255, 255, 0.25)",
}));

export default function CollectionPage() {
  const pathname = usePathname();

  // Extract segments from the pathname
  const pathSegments = pathname?.split("/") || [];
  const collectionId = pathSegments[6];

  const { currentEnvironment, currentEnvironmentDetails } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const [enpointCount, setEndpointCount] = useState<any>(0);
  const [swaggerDocs, setSwaggerDocs] = useState<any>({});
  const [crudDoc, setCrudDocs] = useState<string>("");
  const [selectOption, setSelectOption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [urlData, setUrlData] = useState<any | null>(null);
  const [errorOtpdetails, setErrorOtpdetails] = useState<any>({});

  const handleFormSubmit = () => {
    if (selectOption === "URL") {
      const otp = urlData || "";
      const urlRegex = /^(http|https):\/\/[^ "]+$/;

      if (otp?.trim() === "") {
        setErrorOtpdetails({
          otp: "URL is required",
        });
        return;
      } else if (!urlRegex.test(otp?.trim())) {
        setErrorOtpdetails({
          otp: "Invalid URL format",
        });
        return;
      } else {
        setErrorOtpdetails({});
      }
    }

    let updateDoc = {
      stage_id: "null",
      project_id: currentEnvironment,
      collection_id: collectionId,
      url: selectOption === "URL" ? "null" : "null",
      file_store:
        selectOption === "FILE" && selectedFile ? selectedFile : "null",
      doc_type: selectOption,
    };

    const formData = new FormData();
    Object?.entries(updateDoc)?.forEach(([key, value]: any) => {
      formData?.append(key, value);
    });

    let updatedData = {
      workspace_id: currentWorkspace?.id,
      data: formData,
    };

    dispatch(ImportSwaggerDocument(updatedData))
      .unwrap()
      .then((res: any) => {
        if (selectOption === "url") {
          let data = {
            project_id: currentEnvironmentDetails?.project_id,
            collection_id: collectionId,
          };
          dispatch(GetCollectionDocsById(data))
            .unwrap()
            .then((res: any) => {
              setSwaggerDocs(res);
            });
        } else {
          toast.success("File Imported");
          let data = {
            project_id: currentEnvironmentDetails?.project_id,
            collection_id: collectionId,
          };
          dispatch(GetCollectionDocsById(data))
            .unwrap()
            .then((res: any) => {
              setSwaggerDocs(res);
            });
        }
      })
      .catch((error: any) => {});
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <Box
      sx={{
        overflowY: "auto",
      }}
    >
      <Grid2 container spacing={2} sx={{ padding: "0px 15px" }}>
        <Grid2 sx={{ marginTop: "0.3rem" }}>
          <HeadingTypography>API Documentation</HeadingTypography>
        </Grid2>

        <Grid2 sx={{ marginTop: "0.3rem" }}>
          <HeadingTypography>
            {swaggerDocs?.id ? "Success" : "Pending"}
            <span
              style={{
                color: "#E50001",
                fontWeight: "600",
              }}
              onClick={() => {
                setCrudDocs("EDIT");
              }}
            >
              ADD HERE
            </span>
          </HeadingTypography>
        </Grid2>
        {crudDoc == "EDIT" && swaggerDocs?.id && (
          <>
            <Grid2 sx={{ marginTop: "0.3rem" }}>
              <DoNotTouch style={{ height: "5px", width: "5px" }} />
              <Typography
                style={{
                  color: theme.palette.V2TextColor.main,
                }}
              >
                {swaggerDocs.type === "FILE" ? "File" : "Url"}
              </Typography>
            </Grid2>

            <Grid2 sx={{ marginTop: "0.3rem" }}>
              <HeadingTypography>
                {swaggerDocs.type === "FILE" ? "File" : swaggerDocs.url}
              </HeadingTypography>
            </Grid2>
          </>
        )}
      </Grid2>

      {crudDoc == "EDIT" && (
        <div style={{ display: "flex", marginTop: "5px" }}>
          <div>
            <span
              style={{
                color: selectOption === "URL" ? "purple" : "#1e40af",
                cursor: "pointer",
                marginLeft: "1.1rem",
                fontSize: "0.8rem",
                fontFamily: "Inter-Regular",
              }}
              onClick={() => {
                setSelectOption("URL");
              }}
            >
              Url
            </span>

            <span
              style={{
                color: selectOption === "FILE" ? "purple" : "#1e40af",
                cursor: "pointer",
                marginLeft: "2rem",
                fontSize: "0.8rem",
                fontFamily: "Inter-Regular",
              }}
              onClick={() => {
                setSelectOption("FILE");
              }}
            >
              File
            </span>

            {selectOption == "URL" && (
              <div style={{ marginLeft: "1.2rem" }}>
                <HeadingTypography>Enter URL</HeadingTypography>
                <div style={{ display: "flex", marginTop: "0.8rem" }}>
                  <GInput
                    width={"14.7rem"}
                    type="text"
                    color={"#000000"}
                    background={"#ffffff"}
                    fontWeight={"700"}
                    radius="5px"
                    labelShrink={true}
                    dataTest={"email-input"}
                    variant="outlined"
                    value={urlData === "null" ? "" : urlData}
                    onChangeHandler={(e: any) => {
                      setUrlData(e.target.value);
                    }}
                    error={errorOtpdetails?.otp}
                    helperText={errorOtpdetails?.otp}
                  />
                </div>
              </div>
            )}

            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              accept=".json,.yaml,.yml"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  const fileName = file.name.toLowerCase();
                  if (
                    fileName.endsWith(".json") ||
                    fileName.endsWith(".yaml") ||
                    fileName.endsWith(".yml")
                  ) {
                    console.log("file", file);
                    setSelectedFile(file);
                  } else {
                  }
                }
              }}
            />

            {selectOption == "FILE" && (
              <div>
                <div style={{ display: "flex" }}>
                  <Typography
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                      marginTop: "1rem",
                      marginLeft: "1.1rem",
                      fontSize: "0.8rem",
                    }}
                    onClick={handleFileClick}
                  >
                    Upload
                  </Typography>
                </div>
              </div>
            )}
            <CheckCircleOutlineOutlined
              style={{
                cursor: "pointer",
                color: "green",
                marginLeft: "1rem",
              }}
              onClick={() => {
                handleFormSubmit();
              }}
            />
            <CancelOutlined
              style={{
                cursor: "pointer",
                marginRight: "1rem",
                color: "red",
                marginLeft: "1rem",
              }}
              onClick={() => {
                setCrudDocs("");
                setUrlData("");
                setSelectOption("");
              }}
            />
          </div>
        </div>
      )}
    </Box>
  );
}
