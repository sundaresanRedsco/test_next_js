import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import GSelect from "../sign/discovery/GSelect";
import GsearchBar from "@/app/Components/Global/GsearchBar";
import { ExpandIcon } from "@/app/Assests/icons";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import { projectApiReducer } from "@/app/Redux/apiManagement/projectApiReducer";

const BackgroundContainer = styled(Box)`
  background: #1c1818a3;
  border-radius: 10px;
  padding: 10px 20px;
  width: 100%;
`;

const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
`;

const options = [
  { label: "Compliance", value: "compliance" },
  { label: "Thretcategory", value: "threatCategory" }, // Default placeholder
  { label: "Risk", value: "risk" },
  { label: "Frequent Changes", value: "frequentChanges" },
  { label: "Recent Messages", value: "recentMessages" },
];

const activity = [
  { label: "Compliance", value: "compliance" },
  { label: "Threat Activity", value: "threatCategory" }, // Default placeholder
];

const behavior = [
  { label: "Compliance", value: "compliance" },
  { label: "Threat Behavior", value: "threatCategory" }, // Default placeholder
];

function ThreatHeader() {
  const { currentProject, currentProjectDetails } = useSelector<
    RootStateType,
    projectApiReducer
  >((state) => state.apiManagement.apiProjects);

  const [selectedValue, setSelectedValue] = useState("Compliance");
  const [selectedActivityValue, setSelectedActivityValue] =
    useState("Compliance");
  const [selectedBehaviourValue, setSelectedBehaviourValue] =
    useState("Compliance");

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  const handleChangeActivity = (value: any) => {
    setSelectedActivityValue(value);
  };

  const handleChangeBehaviour = (value: any) => {
    setSelectedBehaviourValue(value);
  };

  useEffect(() => {
    if (currentProject) {
      setSelectedValue("threatCategory");
      setSelectedActivityValue("threatCategory");
      setSelectedBehaviourValue("threatCategory");
    }
  }, [currentProject]);

  return (
    <div>
      <BackgroundContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            gap: "1.5rem",
            justifyContent: "space-between",
          }}
        >
          {/* width: { xs: "100%", sm: "80%", md: "50%" }, */}
          <HeadingTypography>Threat Summary</HeadingTypography>
          <GsearchBar placeholder={"Search"} marginLeft={"0rem"} />

          <GSelect
            options={options}
            // size={"small"}
            width={{ xs: "100%", sm: "100%", md: "150px" }}
            value={selectedValue}
            color={"white"}
            onChange={handleChange}
            name={"gateway"}  
            background="#7946FD40"
            borderRadius="7px"
            radius="10px"
            height="35px"
            fontWeight="0"
            fontSize="11px"

          />

          <GSelect
            options={behavior}
            // size={"small"}
            width={{ xs: "100%", sm: "100%", md: "150px" }}
            value={selectedActivityValue}
            color={"white"}
            onChange={handleChangeActivity}
            name={"activity"}
            background="#7946FD40"
            borderRadius="7px"
            radius="10px"
            height="35px"
            fontSize="11px"

          />

          <GSelect
            options={behavior}
            // size={"small"}
            width={{ xs: "100%", sm: "100%", md: "150px" }}
            value={selectedBehaviourValue}
            color={"white"}
            onChange={handleChangeBehaviour}
            name={"behavior"}
            background="#7946FD40"
            borderRadius="7px"
            radius="10px"
            height="35px"
            fontSize="11px"

          />
          <span>
            <ExpandIcon />
          </span>
        </Box>
      </BackgroundContainer>
    </div>
  );
}

export default ThreatHeader;
