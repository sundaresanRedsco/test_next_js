import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";

// Access the current theme
const DataTypes = () => {
  const theme = useTheme();
  const dataTypeValues = [
    {
      name: "Health Data",
      border: "#3082B7",
      color: "#3082B7",
    },
    {
      name: "Financial Data",
      border: "#81B1FF",
      color: "#81B1FF",
    },
    {
      name: "Personal Data",
      border: "#2BBCD4",
      color: "#2BBCD4",
    },
  ];

  const [dataTypeSearchClicked, setDataTypeSearchClicked] = useState(false);
  const [dataTypeVal, setDataTypeVal] = useState<any[]>(dataTypeValues);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <GInput
        className="DataTypeSearch"
        fullWidth
        variant="standard"
        value="Data Types"
        fontSize={dataTypeSearchClicked ? "" : "10px"}
        fontWeight={dataTypeSearchClicked ? "" : 600}
        color={
          dataTypeSearchClicked ? "" : `${theme.palette.v2SecondaryColor.main}`
        }
        endIcon={
          <SearchV2Icon
            stroke={theme.palette.v2PrimaryColor.main}
            style={{ width: "8px", height: "8px", cursor: "pointer" }}
            onClick={() => setDataTypeSearchClicked((prev) => !prev)}
          />
        }
        disableUnderline={!dataTypeSearchClicked}
        disabledColor={theme.palette.v2SecondaryColor.main}
        disabled={!dataTypeSearchClicked}
        helperText={true}
      />
      <GDivider />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {dataTypeVal?.map((val: any, index : any) => (
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

export default DataTypes;
