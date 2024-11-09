import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import theme from "../../../../Theme/theme";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";

const VulnerabilitiesTypes = () => {
  const theme = useTheme(); // Access the current theme
  const vulnerabilityValues = [
    {
      name: "Strict-Transport-Security Header",
      border: "#975BA5",
      color: "#975BA5",
    },
    {
      name: "Basic Authentication is used",
      border: "#81B1FF",
      color: "#81B1FF",
    },
    {
      name: "Persistent cookies sensitive data",
      border: "#2BBCD4",
      color: "#2BBCD4",
    },
    {
      name: "Query param contains sensitive data",
      border: "#EA80FC",
      color: "#EA80FC",
    },
  ];

  const [vulnerabilityClicked, setVulnerabilityClicked] = useState(false);
  const [vulnerabilityVal, setVulnerabilityVal] =
    useState<any[]>(vulnerabilityValues);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <GInput
        className="VulnerabilitySearch"
        fullWidth
        variant="standard"
        value="Vulnerabilities Types"
        fontSize={vulnerabilityClicked ? "" : "10px"}
        fontWeight={vulnerabilityClicked ? "" : 600}
        color={
          vulnerabilityClicked ? "" : `${theme.palette.v2SecondaryColor.main}`
        }
        endIcon={
          <SearchV2Icon
            stroke={theme.palette.v2PrimaryColor.main}
            style={{ width: "8px", height: "8px", cursor: "pointer" }}
            onClick={() => setVulnerabilityClicked((prev) => !prev)}
          />
        }
        disableUnderline={!vulnerabilityClicked}
        disabledColor={theme.palette.v2SecondaryColor.main}
        disabled={!vulnerabilityClicked}
        helperText={true}
      />
      <GDivider />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {vulnerabilityVal?.map((val: any, index: any) => (
          <GButton
            key={index}
            buttonShape="rectangle"
            // background={val?.bgColor}
            borderColor={val?.border}
            color={val?.color}
            label={val?.name}
            padding="2px 4px"
            minWidth="35px"
          />
        ))}
      </Box>
    </Box>
  );
};

export default VulnerabilitiesTypes;
