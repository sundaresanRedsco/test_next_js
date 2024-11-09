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
import { GetCollectionById } from "../../Redux/apiManagement/endpointReducer";
import CollectionSummary from "./Collection/collectionSummary";

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

function CollectionPage(props: any) {
  const { id, onCloseHandler } = props;

  const { currentEnvironmentDetails } = useSelector<
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

  const sidebarData = [
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
    // {
    //   label: "TEAM",
    //   id: "team",
    //   icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    // },
    // {
    //   label: "INTEGRATIONS",
    //   id: "integration",
    //   icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    // },
    {
      label: "SETTING",
      id: "setting",
      icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
    },
  ];

  const [activeItem, setActiveItem] = useState("summary");
  const [collectionDetails, setCollectionDetails] = useState<any>({});

  const handleItemClick = (id: any) => {
    setActiveItem(id);
  };

  function getPartAfterUnderscore(str: string) {
    // Find the index of the first underscore
    const index = str.indexOf("_");

    // Check if the underscore is found
    if (index !== -1) {
      // Return the part after the first underscore
      return str.slice(index + 1);
    } else {
      // Return an empty string if no underscore is found
      return "";
    }
  }
  const collectionId = getPartAfterUnderscore(id);

  // Example usage

  useEffect(() => {
    if (collectionId) {
      dispatch(GetCollectionById(collectionId))
        .unwrap()
        .then((res: any) => {
          setCollectionDetails(res);
        })
        .catch((err: any) => {});
    }
  }, [collectionId]);

  return (
    <div>
      <GlobalHeader
        id={id}
        label={currentEnvironmentDetails?.project_name}
        subLabel={collectionDetails?.name}
        onCloseHandler={onCloseHandler}
      />
      <CardContainer
        style={{
          height: "450px",
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
              height: "450px",
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "3px", // Adjust the width of the scrollbar
              },
            }}
          >
            {activeItem === "summary" && (
              <CollectionSummary id={id} details={collectionDetails} />
            )}
          </Box>
        </div>
      </CardContainer>
    </div>
  );
}

export default CollectionPage;
