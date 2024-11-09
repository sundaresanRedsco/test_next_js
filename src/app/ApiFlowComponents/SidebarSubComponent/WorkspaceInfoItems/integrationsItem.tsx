import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";

const IntegrationsItem = () => {
  const theme = useTheme(); // Access the current theme
  const integrationValues = [
    {
      name: "AWS South",
      border: "#E65101",
      color: "#E65101",
    },
    {
      name: "GCP Asia",
      border: "#81B1FF",
      color: "#81B1FF",
    },
    {
      name: "AZURE Central North",
      border: "#2BBCD4",
      color: "#2BBCD4",
    },
  ];

  const [integrationSearchClicked, setIntegrationSearchClicked] =
    useState(false);
  const [integrationVal, setIntegrationVal] =
    useState<any[]>(integrationValues);

  return (
    <Box sx={{ marginTop: "20px", marginBottom: "30px" }}>
      <GInput
        className="IntegrationSearch"
        fullWidth
        variant="standard"
        value="Integrations"
        fontSize={integrationSearchClicked ? "" : "10px"}
        fontWeight={integrationSearchClicked ? "" : 600}
        color={
          integrationSearchClicked
            ? ""
            : `${theme.palette.v2SecondaryColor.main}`
        }
        endIcon={
          <SearchV2Icon
            stroke={theme.palette.v2PrimaryColor.main}
            style={{ width: "8px", height: "8px", cursor: "pointer" }}
            onClick={() => setIntegrationSearchClicked((prev) => !prev)}
          />
        }
        disableUnderline={!integrationSearchClicked}
        disabledColor={theme.palette.v2SecondaryColor.main}
        disabled={!integrationSearchClicked}
        helperText={true}
      />
      <GDivider />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {integrationVal?.map((val: any, index : any) => (
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

export default IntegrationsItem;
