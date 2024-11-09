import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";

const SecurityTags = () => {
  const theme = useTheme(); // Access the current theme
  const securityTagValues = [
    {
      name: "Private API",
      border: "#7D2020",
      color: "#7D2020",
    },
    {
      name: "GEO-API",
      border: "#2BBCD4",
      color: "#2BBCD4",
    },
    {
      name: "Edge Optimized",
      border: "#81B1FF",
      color: "#81B1FF",
    },
  ];

  const [securityTagSearchClicked, setSecurityTagSearchClicked] =
    useState(false);
  const [securityTagVal, setSecurityTagVal] =
    useState<any[]>(securityTagValues);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <GInput
        className="securityTagSearch"
        fullWidth
        variant="standard"
        value="Security Tags"
        fontSize={securityTagSearchClicked ? "" : "10px"}
        fontWeight={securityTagSearchClicked ? "" : 600}
        color={
          securityTagSearchClicked
            ? ""
            : `${theme.palette.v2SecondaryColor.main}`
        }
        endIcon={
          <SearchV2Icon
            stroke={theme.palette.v2PrimaryColor.main}
            style={{ width: "8px", height: "8px", cursor: "pointer" }}
            onClick={() => setSecurityTagSearchClicked((prev) => !prev)}
          />
        }
        disableUnderline={!securityTagSearchClicked}
        disabledColor={theme.palette.v2SecondaryColor.main}
        disabled={!securityTagSearchClicked}
        helperText={true}
      />
      <GDivider />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {securityTagVal?.map((val: any, index : any) => (
          <GButton
          key={index}
            buttonShape="circular"
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

export default SecurityTags;
