import React from "react";
import { Checkbox, FormControlLabel, Radio, styled } from "@mui/material";

const RadioCheckbox = styled(Checkbox)(({ theme }: any) => ({
  "&.Mui-checked": {
    color: "#7946FD",
  },
    "&.MuiCheckbox-root": {
    padding: 0,
  },
}));

const RadioCheckboxButton = styled(Radio)(({ theme }: any) => ({
  "&.Mui-checked": {
    color: "#7946FD",
  },
}));

export default function RadioCheckboxComponent(props: any) {
  const {
    buttonColor,
    labelColor,
    fontSize,
    buttonWidth,
    fontWeight,
    checked,
    onChange,
    label,
    dataTest,
    radioButton,
    icon,
    checkedIcon,
    defaultValue,
    defaultChecked,
    disabled,
    checkedColor,
    strokeColor,
  } = props;
  const Component = radioButton ? RadioCheckboxButton : RadioCheckbox;
  return (
    <FormControlLabel
      sx={{
        ".MuiSvgIcon-root": {
          fontSize: buttonWidth || "0.8rem",
          fill: buttonColor || "#FFFFFF",
          marginRight: !radioButton ? "5px" : "0px",
          stroke: radioButton ? strokeColor : "",
          background: radioButton ? "#FFFFFF" : "",
          borderRadius: buttonWidth,
        },

        ".MuiTypography-root": {
          fontFamily: "FiraSans-regular",
          fontSize: fontSize || "0.6rem",
          color: labelColor,
          fontWeight: fontWeight,
          margin: "0",
          borderRadius: "50%",
        },
      }}
      control={
        <Component
          checked={checked}
          defaultValue={defaultValue}
          onChange={onChange}
          data-test={dataTest}
          icon={icon}
          checkedIcon={checkedIcon}
          defaultChecked={defaultChecked}
          disabled={disabled}
          sx={{
            "&.Mui-checked": {
              color: checkedColor || "black", // Use checkedColor prop
            },
          }}
        />
      }
      label={label}
    />
  );
}
