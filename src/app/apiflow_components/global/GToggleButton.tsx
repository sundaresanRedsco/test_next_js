import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

type Props = {
  alignment: any;
  handleChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void;
  buttons: string[];
  customStyle?: object;
};

const defaultStyle = {
  padding: "5px",
  "& .MuiButtonBase-root.Mui-selected": {
    background: "#7A43FE",
    borderRadius: "6px",
    "&:hover": {
      background: "#7A43FE",
    },
  },
  "& .MuiButtonBase-root": {
    color: "white !important",
    textTransform: "unset",
    fontFamily: "FiraSans-medium",
    fontSize: "10px",
    padding: "8px 15px",
    border: "none",
  },
  background: "#121212",
  borderRadius: "10px",
  justifyContent: "space-between",
  width: "100%",
  boxShadow: "0px 0px 1.5px  #4F4F4F",
};

export default function GToggleButton({
  handleChange,
  alignment,
  buttons,
  customStyle,
}: Props) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={(e: any) => handleChange(e, e.target.value)}
      aria-label="Platform"
      sx={{
        ...defaultStyle,
        ...customStyle,
        // minWidth: "160px",
      }}
      size="small"
    >
      {buttons.map((item: string, index: number) => {
        return (
          <ToggleButton key={index} value={item}>
            {item}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
