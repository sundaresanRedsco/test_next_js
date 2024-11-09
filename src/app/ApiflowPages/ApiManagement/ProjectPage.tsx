import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectSideBar from "../../ApiFlowComponents/ApiManagements/ProjectComponents/ProjectSideBar";
import LinearProgress from "@mui/material/LinearProgress";
import NotesIcon from "../../Assests/icons/notes.svg";
import { styled } from "@mui/system";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";
import { RootStateType } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import { GetOperationTagsCountbyProjectAndStageId } from "../../Redux/apiManagement/endpointReducer";
import ProjectSummary from "./Project/projectSummary";
import ProjectIntegrations from "./Project/projectInetgration";

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionMainBackground.main};
  // padding: 10px 25px;
`;

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

  const segments = [
    { color: "red", value: 20 }, // 20% width, red color
    { color: "orange", value: 30 }, // 30% width, orange color
    { color: "yellow", value: 50 }, // 50% width, yellow color
  ];

  const sidebarData = [
    {
      label: "SUMMARY",
      id: "summary",
      icon: <NotesIcon />,
    },
    {
      label: "GRAPH",
      id: "graph",
      icon: <NotesIcon />,
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
    if (currentStage) {
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
    }
  }, [currentEnvironmentDetails, currentStage]);

  return (
    <div>
      <GlobalHeader
        id={id}
        label={currentEnvironmentDetails?.project_name}
        onCloseHandler={onCloseHandler}
      />
      <CardContainer
        style={{
          height: "500px",
          overflowY: "hidden",
        }}
      >
        <div className="d-flex">
          <ProjectSideBar
            sidebarData={sidebarData}
            onClickHandler={(id: string) => handleItemClick(id)}
            active={activeItem}
          />
          <Box
            sx={{
              height: "500px",
              overflowY: "auto",
              overflowX: "hidden",
              width: "100%",
              "&::-webkit-scrollbar": {
                width: "3px", // Adjust the width of the scrollbar
              },
            }}
          >
            {activeItem === "summary" && <ProjectSummary id={id} />}

            {activeItem === "integration" && <ProjectIntegrations />}
            {/* // <Grid
              //   container
              //   spacing={3}
              //   sx={{
              //     // paddingRight: "3rem",
              //     margin: "0px",
              //     height: "450px",
              //     overflowY: "auto",
              //   }}
              // >
                // <Grid item xl={3} xs={12} sm={12} md={12} className="pt-0 mt-0"> */}

            {/* //    </Grid>
              // </Grid> 
            // } */}
          </Box>
        </div>
      </CardContainer>
    </div>
  );
}

export default ProjectPage;
