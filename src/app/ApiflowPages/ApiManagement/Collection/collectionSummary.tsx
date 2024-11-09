import { Box, Grid, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GlobalInfoCard from "../../../ApiFlowComponents/Global/GlobalInfoCard";
import LinearProgress from "@mui/material/LinearProgress";
import DotIcon from "../../../Assests/icons/Ellipse.svg";
import Riskchart from "../../../Components/ApiRisk/Riskchart";
import { styled } from "@mui/system";
import { RootStateType } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCollectionDocsById,
  GetOperationCountbyCollectionId,
  GetOperationTagsCountbyCollectionId,
  ImportSwaggerDocument,
} from "../../../Redux/apiManagement/endpointReducer";
import {
  formatToTitleCase,
  getFirstThreeLetters,
} from "../../../Helpers/helpersFunctions";
import { environmentReducer } from "../../../Redux/apiManagement/environmentReducer";
import GInput from "../../../ApiFlowComponents/Global/GInput";
import { TeamProfileHeading } from "../../../Styles/manageTeamComponet";
import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
} from "@mui/icons-material";

const HeadingTypography = styled(Typography)`
  font-family: Inter-Semi-Bold !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.8rem;
  // font-weight: 600;
  margin-top: 0.7rem;
`;

const ApiText = styled("span")({
  cursor: "pointer",
  color: "#000000",
  fontSize: "1rem",
  fontFamily: "Inter-Regular",
  fontWeight: "600",
  marginRight: "8px",
});

const RiskText = styled("span")({
  cursor: "pointer",
  color: "#000000",
  fontSize: "0.5rem",
  fontFamily: "Inter-Regular",
  fontWeight: "600",
  marginLeft: "8px",
});

interface ProgressData {
  label: string;
  value: number;
}

const MulticolorLinearProgress: React.FC<{
  segments: { color: string; value: number }[];
}> = ({ segments }) => {
  return (
    <Box position="relative" width="100%">
      <LinearProgress
        variant="determinate"
        value={100}
        sx={{
          height: "8px",
          backgroundColor: "transparent",
          borderRadius: "10px", // Add border radius here
        }}
      />
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          overflow: "hidden",
          borderRadius: "5px", // Add border radius here
        }}
      >
        {segments.map((segment, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: segment.color,
              width: `${segment.value}%`,
              height: "100%",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

function CollectionSummary(props: any) {
  const { id, details } = props;
  const theme = useTheme();
  const { currentEnvironmentDetails, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const dispatch = useDispatch<any>();

  const infoDatas = [
    {
      label: "Internal Private IP Address",
      id: "1",
      ip: "172.168.1.2",
      apis: "123",
      type: "endpoint",
      cardData: "IP",
    },
    {
      label: "Internal Private IP Address",
      id: "2",
      ip: "172.168.223.2",
      apis: "123",
      type: "endpoint",
      cardData: "IP",
    },
    {
      label: "Internal Private IP Address",
      id: "3",
      ip: "172.168.1.2",
      apis: "123",
      type: "endpoint",
      cardData: "IP",
    },
    {
      label: "Internal Private IP Address",
      id: "4",
      ip: "172.168.223.2",
      apis: "123",
      type: "endpoint",
      cardData: "IP",
    },
    {
      label: "Internal Private IP Address",
      id: "5",
      ip: "172.168.1.2",
      apis: "123",
      type: "endpoint",
      cardData: "IP",
    },
    {
      label: "Internal Private IP Address",
      id: "6",
      ip: "172.168.223.2",
      apis: "123",
      type: "endpoint",
      cardData: "IP",
    },

    {
      label: "Service Now Tickets",
      id: "7",
      ip: "345",
      apis: "123",
      type: "integration",
      cardData: "Service Now",
    },
    {
      label: "GCP API Gateway",
      id: "8",
      ip: "345",
      apis: "123",
      type: "integration",
      cardData: "GCP",
    },
    {
      label: "Service Now Tickets",
      id: "9",
      ip: "345",
      apis: "123",
      type: "integration",
      cardData: "Service Now",
    },
    {
      label: "GCP API Gateway",
      id: "10",
      ip: "345",
      apis: "123",
      type: "integration",
      cardData: "GCP",
    },
    {
      label: "Service Now Tickets",
      id: "11",
      ip: "345",
      apis: "123",
      type: "integration",
      cardData: "Service Now",
    },
    {
      label: "GCP API Gateway",
      id: "12",
      ip: "345",
      apis: "123",
      type: "integration",
      cardData: "GCP",
    },

    {
      label: "Orphan API",
      id: "13",
      ip: "345",
      apis: "125",
      type: "apiTag",
      cardData: "GCP",
    },
    {
      label: "Zombie API",
      id: "14",
      ip: "345",
      apis: "123",
      type: "apiTag",
      cardData: "Service Now",
      errorMsg: "ZombiApi",
    },
    {
      label: "Shadow Apis",
      id: "15",
      ip: "345",
      apis: "123",
      type: "apiTag",
      cardData: "GCP",
      errorMsg: "Shadow Apis",
    },
  ];
  const segments = [
    { color: "red", value: 20 }, // 20% width, red color
    { color: "orange", value: 30 }, // 30% width, orange color
    { color: "yellow", value: 50 }, // 50% width, yellow color
  ];
  const ApiRiskData = [
    { label: "Collection Name 1", riskCount: "25", risk: "55% Risk" },
    { label: "Collection Name 2", riskCount: "25", risk: "3% Risk" },
    { label: "Collection Name 3", riskCount: "25", risk: "15% Risk" },
    { label: "Collection Name 4", riskCount: "25", risk: "30% Risk" },
    // ... (more data here)
  ];

  const [tags, setTags] = useState<any>([]);
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
      stage_id: currentStage,
      project_id: currentEnvironmentDetails?.project_id,
      collection_id: details?.collections_id,
      url: selectOption === "URL" ? "null" : "null",
      file_store:
        selectOption === "FILE" && selectedFile ? selectedFile : "null",
      doc_type: selectOption,
    };

    const formData = new FormData();
    Object?.entries(updateDoc)?.forEach(([key, value]: any) => {
      formData?.append(key, value);
    });

    dispatch(ImportSwaggerDocument(formData))
      .unwrap()
      .then((res: any) => {
        if (selectOption === "url") {
          //   toast.success("URL Imported");
          //   handleUrlSubmit();

          let data = {
            project_id: currentEnvironmentDetails?.project_id,
            collection_id: details.collections_id,
          };
          dispatch(GetCollectionDocsById(data))
            .unwrap()
            .then((res: any) => {
              setSwaggerDocs(res);
            });
        } else {
          //   toast.success("File Imported");
          let data = {
            project_id: currentEnvironmentDetails?.project_id,
            collection_id: details.collections_id,
          };
          dispatch(GetCollectionDocsById(data))
            .unwrap()
            .then((res: any) => {
              setSwaggerDocs(res);
            });
        }
      })
      .catch((error: any) => {
        // if (error.message === "UNAUTHORIZED") {
        //   dispatch(updateSessionPopup(true));
        // } else {
        //   toast.error(error?.message);
        // }
      });
  };

  const handleFileClick = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.click();
    }
  };

  useEffect(() => {
    if (details) {
      dispatch(GetOperationTagsCountbyCollectionId(details.collections_id))
        .unwrap()
        .then((res: any) => {
          const arrayOfObjects = Object.keys(res).map((key) => ({
            name: key,
            value: res[key],
          }));

          setTags(arrayOfObjects);
        });

      dispatch(GetOperationCountbyCollectionId(details.collections_id))
        .unwrap()
        .then((res: any) => {
          setEndpointCount(res?.active_Operationcount);
        });
    }
  }, [details]);

  useEffect(() => {
    if (details) {
      let data = {
        project_id: currentEnvironmentDetails?.project_id,
        collection_id: details.collections_id,
      };
      dispatch(GetCollectionDocsById(data))
        .unwrap()
        .then((res: any) => {
          setSwaggerDocs(res);
        });
    }
  }, [details, currentEnvironmentDetails]);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: "0px",
        margin: "0px",
      }}
    >
      {/* First Column */}
      <Grid item xl={3} xs={12} sm={12} md={6} className="pt-0 m-0">
        <div className="d-flex">
          <HeadingTypography>{details?.name}</HeadingTypography>
          <HeadingTypography
            sx={{
              marginLeft: "1.5rem",
              fontSize: "0.5rem",
              marginTop: "0.9rem",
            }}
          >
            DETAILS <ArrowForwardIosIcon sx={{ fontSize: "0.5rem" }} />
          </HeadingTypography>
        </div>
        <HeadingTypography>
          <ApiText
            style={{
              color: theme.palette.V2TextColor.main,
            }}
          >
            {enpointCount}
          </ApiText>{" "}
          End points
        </HeadingTypography>
        <HeadingTypography>Current Security Risks</HeadingTypography>
        <div style={{ width: "70%", marginTop: "1rem" }}>
          <MulticolorLinearProgress segments={segments} />
        </div>

        <Grid container spacing={2} sx={{ padding: "0px 15px" }}>
          <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
            <DotIcon style={{ height: "5px", width: "5px" }} />
            <RiskText
              style={{
                color: theme.palette.V2TextColor.main,
              }}
            >
              API Documentation
            </RiskText>
          </Grid>

          <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
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
          </Grid>
          {crudDoc == "EDIT" && swaggerDocs?.id && (
            <>
              <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
                <DotIcon style={{ height: "5px", width: "5px" }} />
                <RiskText
                  style={{
                    color: theme.palette.V2TextColor.main,
                  }}
                >
                  {swaggerDocs.type === "FILE" ? "File" : "Url"}
                </RiskText>
              </Grid>

              <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
                <HeadingTypography>
                  {swaggerDocs.type === "FILE" ? "File" : swaggerDocs.url}
                </HeadingTypography>
              </Grid>
            </>
          )}
        </Grid>

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
                      fontWeight={700}
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
                      //   toast.error("Upload only JSON or YAML File");
                    }
                  }
                }}
              />

              {selectOption == "FILE" && (
                <div>
                  <div style={{ display: "flex" }}>
                    <TeamProfileHeading
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
                    </TeamProfileHeading>
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

        <div>
          <Riskchart />
        </div>
      </Grid>

      {/* Endpoints Column */}
      <Grid item xl={3} xs={12} sm={12} md={6} className="pt-0 m-0">
        <div className="d-flex">
          <HeadingTypography>End Points</HeadingTypography>
          <HeadingTypography
            sx={{
              marginLeft: "1.5rem",
              fontSize: "0.5rem",
              marginTop: "0.9rem",
            }}
          >
            DETAILS <ArrowForwardIosIcon sx={{ fontSize: "0.5rem" }} />
          </HeadingTypography>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {infoDatas
            .filter((info) => info.type === "endpoint")
            .map((info) => (
              <div key={info.id} style={{ marginBottom: "1.5rem" }}>
                <GlobalInfoCard
                  title={info.label}
                  ip={info.ip}
                  description="Pointing"
                  apiCount={info.apis}
                  cardData={info.cardData}
                  errorMsg={info.errorMsg}
                />
              </div>
            ))}
        </div>
      </Grid>

      {/* Integrations Column */}
      <Grid item xl={3} xs={12} sm={12} md={6}>
        <div className="d-flex">
          <HeadingTypography>Integrations</HeadingTypography>
          <HeadingTypography
            sx={{
              marginLeft: "1.5rem",
              fontSize: "0.5rem",
              marginTop: "0.9rem",
            }}
          >
            DETAILS <ArrowForwardIosIcon sx={{ fontSize: "0.5rem" }} />
          </HeadingTypography>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {infoDatas
            .filter((info) => info.type === "integration")
            .map((info) => (
              <div key={info.id} style={{ marginBottom: "1.5rem" }}>
                <GlobalInfoCard
                  title={info.label}
                  ip={info.ip}
                  description="Pointing"
                  apiCount={info.apis}
                  cardData={info.cardData}
                  errorMsg={info.errorMsg}
                />
              </div>
            ))}
        </div>
      </Grid>

      {/* Endpoints Column */}
      <Grid item xl={3} xs={12} sm={12} md={6}>
        <div className="d-flex">
          <HeadingTypography>API Tags</HeadingTypography>
          <HeadingTypography
            sx={{
              marginLeft: "1.5rem",
              fontSize: "0.5rem",
              marginTop: "0.9rem",
            }}
          >
            DETAILS <ArrowForwardIosIcon sx={{ fontSize: "0.5rem" }} />
          </HeadingTypography>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {tags?.map((info: any) => (
            <div key={info.name} style={{ marginBottom: "1.5rem" }}>
              <GlobalInfoCard
                title={formatToTitleCase(info?.name)}
                ip={info.value}
                description="Pointing"
                apiCount={info.value}
                cardData={getFirstThreeLetters(info?.name)?.toUpperCase()}
                errorMsg={""}
              />
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default CollectionSummary;
