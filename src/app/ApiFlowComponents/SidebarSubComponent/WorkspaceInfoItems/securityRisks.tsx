import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import SearchV2Icon from "../../../Assests/icons/v2SearchIcon.svg";
import GInput from "../../Global/GInput";
import GDivider from "../../Global/GDivider";
import GButton from "../../Global/GButton";

const SecurityRisks = () => {
  const theme = useTheme(); // Access the current theme
  const securityRiskValues = [
    {
      name: "High",
      bgColor: "#E50001",
    },
    {
      name: "Medium",
      bgColor: "#FB7802",
    },
    {
      name: "Warning",
      bgColor: "#F9D900",
    },
  ];

  const [securityRiskSearchClicked, setSecurityRiskSearchClicked] =
    useState(false);
  const [securityRiskVal, setSecurityRiskVal] =
    useState<any[]>(securityRiskValues);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <GInput
        className="securityRiskSeach"
        fullWidth
        variant="standard"
        value="Security Risks"
        fontSize={securityRiskSearchClicked ? "" : "10px"}
        fontWeight={securityRiskSearchClicked ? "" : 600}
        color={
          securityRiskSearchClicked
            ? ""
            : `${theme.palette.v2SecondaryColor.main}`
        }
        endIcon={
          <SearchV2Icon
            stroke={theme.palette.v2PrimaryColor.main}
            style={{ width: "8px", height: "8px", cursor: "pointer" }}
            onClick={() => setSecurityRiskSearchClicked((prev) => !prev)}
          />
        }
        disableUnderline={!securityRiskSearchClicked}
        disabledColor={theme.palette.v2SecondaryColor.main}
        disabled={!securityRiskSearchClicked}
        helperText={true}
      />
      <GDivider />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {securityRiskVal?.map((val: any, index : any) => (
          <GButton
          key={index}
            buttonShape="circular"
            background={val?.bgColor}
            borderColor={val?.bgColor}
            color={"#FFFFFF"}
            label={val?.name}
            padding="2px 4px"
            minWidth="35px"
          />
        ))}
      </Box>
    </Box>
  );
};

export default SecurityRisks;
