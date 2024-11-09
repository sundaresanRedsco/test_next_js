import React, { useEffect, useState } from "react";
import GlobalHeader from "../../../ApiFlowComponents/Global/GlobalHeader";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import ProjectSideBar from "../../../ApiFlowComponents/ApiManagements/ProjectComponents/ProjectSideBar";
import NotesIcon from "../../../Assests/icons/notes.svg";
import IntegrationPage from "./IntegrationPage";

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.v2SectionColour.main};
  // padding: 10px 25px;
`;

const sidebarData = [
  {
    label: "CHANGE HISTORY",
    id: "history",
    icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
  },

  {
    label: "SETTING",
    id: "setting",
    icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
  },
];

function IntegrationMain(props: any) {
  const { id, onCloseHandler } = props;

  const [activeItem, setActiveItem] = useState("SUMMARY");
  // console.log(id, "idsdsdsdeerr");

  console.log(activeItem, id, "activeItemactiveItem");

  const handleItemClick = (id: any) => {
    setActiveItem(id);
  };

  return (
    <div>
      <GlobalHeader id={id} onCloseHandler={onCloseHandler} />

      <CardContainer
        style={{
          padding: "10px 10px",
          position: "relative",
          height: "500px",
          overflowY: "hidden",

          // backgroundColor:"#FFFFFF"
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
            <ProjectSideBar
              sidebarData={sidebarData}
              onClickHandler={(id: string) => handleItemClick(id)}
              active={activeItem}
            />
          </Box>
          <Box>
            {activeItem == "SUMMARY" && (
              <>
                {(id.includes("service_now") || id.includes("splunk")) && (
                  <IntegrationPage id={id} onCloseHandler={onCloseHandler} />
                )}
              </>
            )}
          </Box>
        </div>
      </CardContainer>
    </div>
  );
}

export default IntegrationMain;
