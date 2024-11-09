import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectSideBar from "../../ApiFlowComponents/ApiManagements/ProjectComponents/ProjectSideBar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GlobalInfoCard from "../../ApiFlowComponents/Global/GlobalInfoCard";
import LinearProgress from "@mui/material/LinearProgress";
import NotesIcon from "../../Assests/icons/notes.svg";
import ArrorwV2 from "../../Assests/icons/upArrow.svg";
import DotIcon from "../../Assests/icons/Ellipse.svg";
import Riskchart from "../../Components/ApiRisk/Riskchart";
import { styled } from "@mui/system";
import Integrations from "../Integration/Integrations";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";
import { RootStateType } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import { GetOperationTagsCountbyProjectAndStageId } from "../../Redux/apiManagement/endpointReducer";
import { formatToTitleCase } from "../../Helpers/helpersFunctions";

const HeadingTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #000000;
  font-size: 0.6rem;
  font-weight: 600;
  margin-top: 0.7rem;
`;

const SideBarText = styled(Typography)`
  padding: 6px 8px;
  font-size: 0.4rem;
  font-family: Inter-Regular !important;
  color: #000000;
`;

const ApiText = styled("span")({
  cursor: "pointer",
  color: "#000000",
  fontSize: "1rem",
  fontFamily: "Inter-Regular",
  fontWeight: "600",
  marginRight: "8px",
});

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  // padding: 10px 25px;
`;
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

function ProjectPage(props: any) {
  const { id, onCloseHandler } = props;

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

  const sidebarDatas = [
    {
      label: "SUMMARY",
      id: "summary",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
    {
      label: "GRAPH",
      id: "graph",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
    {
      label: "TABLE",
      id: "table",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
    {
      label: "CHANGE HISTORY",
      id: "history",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
    {
      label: "TEAM",
      id: "team",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
    {
      label: "INTEGRATIONS",
      id: "integration",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
    {
      label: "SETTING",
      id: "setting",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
  ];

  const [activeItem, setActiveItem] = useState("summary");
  const [tags, setTags] = useState<any>([]);

  const handleItemClick = (id: any) => {
    setActiveItem(id);
  };

  useEffect(() => {
    let data = {
      stage_id: currentStage,
      project_id: currentEnvironmentDetails?.project_id,
    };
    dispatch(GetOperationTagsCountbyProjectAndStageId(data))
      .unwrap()
      .then((res: any) => {
        const arrayOfObjects = Object.keys(res).map((key) => ({
          name: key,
          value: res[key],
        }));

        setTags(arrayOfObjects);
      });
  }, [currentEnvironmentDetails]);

  return (
    <div>
      <GlobalHeader
        id={id}
        label={currentEnvironmentDetails?.project_name}
        onCloseHandler={onCloseHandler}
      />
      <CardContainer
        style={{
          padding: "10px 0px",
        }}
      >
        <div className="d-flex">
          <Box
            sx={{
              width: "7%",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {sidebarDatas.map((path) => (
              <ProjectSideBar
                // key={path.id}
                icon={path.icon}
                Title={path.label}
                SidebarId={path.id}
                onClickHandler={() => handleItemClick(path.id)}
                active={activeItem}
              />
            ))}
          </Box>

          {activeItem === "summary" && (
            <Grid
              container
              spacing={3}
              sx={{
                padding: "2rem 1rem",
                marginTop: "1rem",
                height: "450px",
                overflowY: "auto",
              }}
            >
              {/* First Column */}
              <Grid item xl={3} xs={12} sm={12} md={6}>
                <div className="d-flex">
                  <HeadingTypography>
                    {currentEnvironmentDetails?.project_name}
                  </HeadingTypography>
                  <HeadingTypography
                    sx={{
                      marginLeft: "1.5rem",
                      color: "rgb(91 91 152)",
                      fontSize: "0.5rem",
                      marginTop: "0.9rem",
                    }}
                  >
                    DETAILS <ArrowForwardIosIcon sx={{ fontSize: "0.5rem" }} />
                  </HeadingTypography>
                </div>
                <HeadingTypography>
                  <ApiText>15</ApiText> End points
                </HeadingTypography>
                <HeadingTypography>Current Security Risks</HeadingTypography>
                <div style={{ width: "70%", marginTop: "1rem" }}>
                  <MulticolorLinearProgress segments={segments} />
                </div>
                {ApiRiskData.map((data, index) => (
                  <Grid
                    container
                    spacing={2}
                    sx={{ padding: "0px 15px" }}
                    key={index}
                  >
                    <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
                      <DotIcon style={{ height: "5px", width: "5px" }} />
                      <RiskText>{data.label}</RiskText>
                    </Grid>
                    <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
                      <HeadingTypography>{data.riskCount}</HeadingTypography>
                    </Grid>
                    <Grid item sm={4} sx={{ marginTop: "0.3rem" }}>
                      <HeadingTypography>{data.risk}</HeadingTypography>
                    </Grid>
                  </Grid>
                ))}
                <div style={{ textAlign: "center", alignItems: "center" }}>
                  <Riskchart />
                </div>
              </Grid>

              {/* Endpoints Column */}
              <Grid item xl={3} xs={12} sm={12} md={6}>
                <div className="d-flex">
                  <HeadingTypography>End Points</HeadingTypography>
                  <HeadingTypography
                    sx={{
                      marginLeft: "1.5rem",
                      color: "rgb(91 91 152)",
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
                      color: "rgb(91 91 152)",
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

              {/* <Grid item xl={3} xs={12} sm={12} md={6}> */}
              {/* <div className="d-flex">
                  <HeadingTypography>Real Time Statistics</HeadingTypography>
                  <HeadingTypography
                    sx={{
                      marginLeft: "1.5rem",
                      color: "rgb(91 91 152)",
                      fontSize: "0.5rem",
                      marginTop: "0.9rem",
                    }}
                  >
                    DETAILS <ArrowForwardIosIcon sx={{ fontSize: "0.5rem" }} />
                  </HeadingTypography>
                </div> */}
              {/* <div style={{ marginTop: "2rem" }}>
                  <Box
                    sx={{
                      padding: "1rem",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                      marginTop: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <HeadingTypography>Graph</HeadingTypography>

                      <Box>
                        <ApiText
                          sx={{
                            fontWeight: "bold",
                            marginRight: "8px",
                            fontSize: "0.8rem",
                          }}
                        >
                          Real Time Total Coverage
                        </ApiText>

                        <HeadingTypography style={{ fontSize: "1.1rem" }}>
                          11,110
                        </HeadingTypography>

                        <ApiText
                          sx={{
                            fontWeight: "bold",
                            marginRight: "8px",
                            fontSize: "0.6rem",
                          }}
                        >
                          Compared to
                        </ApiText>
                        <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                          12,345
                        </span>

                        {/* Linear Progress Bars */}
              {/* </Box>
                    </div>
                  </Box>

                  <HeadingTypography>Time Statistics</HeadingTypography>
                </div> */}

              {/* Statistics Section */}
              {/* <Box
                  sx={{
                    padding: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    marginTop: "1rem",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <ApiText
                      sx={{
                        fontWeight: "bold",
                        marginRight: "8px",
                        fontSize: "1.2rem",
                      }}
                    >
                      15,110
                    </ApiText>
                    <Box display="flex" alignItems="center">
                      <ArrorwV2 style={{ height: "10px", margin: "0px 4px" }} />
                      <span style={{ fontWeight: "600", fontSize: "0.5rem" }}>
                        28%
                      </span>
                    </Box>
                  </Box>
                  <HeadingTypography style={{ fontSize: "0.8rem" }}>
                    Compared to 12,345 last year
                  </HeadingTypography>

                  {/* Linear Progress Bars */}
              {/* <Box mt={4}>
                    {["July", "June", "May", "April"].map((month, index) => (
                      <Box key={month} mb={2}>
                        <Box display="flex" justifyContent="space-between">
                          <HeadingTypography>{month}</HeadingTypography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={75 - index * 15} // Adjust progress based on month
                          sx={{
                            height: "8px",
                            borderRadius: "4px",
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: [
                                "#EA80FC",
                                "#ff9800",
                                "#4caf50",
                                "#ffeb3b",
                              ][index], // Colors for each month
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box> */}
              {/* </Box>
              </Grid> */}

              {/* Endpoints Column */}
              <Grid item xl={3} xs={12} sm={12} md={6}>
                <div className="d-flex">
                  <HeadingTypography>API Tags</HeadingTypography>
                  <HeadingTypography
                    sx={{
                      marginLeft: "1.5rem",
                      color: "rgb(91 91 152)",
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
                        cardData={formatToTitleCase(info?.name)}
                        errorMsg={""}
                      />
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          )}

          {activeItem === "integration" && (
            <Grid
              container
              spacing={3}
              sx={{
                // paddingRight: "3rem",
                marginTop: "2rem",
                height: "450px",
                overflowY: "auto",
              }}
            >
              <Grid item xl={3} xs={12} sm={12} md={12}>
                <Integrations />
              </Grid>
            </Grid>
          )}
        </div>
      </CardContainer>
    </div>
  );
}

export default ProjectPage;
