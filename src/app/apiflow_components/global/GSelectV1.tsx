import React from "react";
import {
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  FormHelperText,
} from "@mui/material";
import theme from "../../../Theme/theme";

export default function GSelect(props: any) {
  const {
    fullWidth,
    width,
    height,
    borderHeight,
    size,
    color,
    fontSize,
    fontWeight,
    borderColor,
    radius,
    label,
    disabled,
    options,
    iconPosition, // Added prop for icon position
    icon,
    value,
    defaultValue,
    border,
    error,
    helperText,
    onChange,
    name,
  } = props;

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    console.log("Selected Value:", selectedValue);

    // If an external onChange function is provided, call it
    if (onChange) {
      onChange(selectedValue, event);
    }
  };

  return (
    <Box>
      <TextField
        name={name}
        fullWidth={fullWidth}
        size={size}
        select
        id={label}
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
        sx={{
          width: width,
          background: "#7946FD40",
          borderRadius: "7px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: borderColor || "#F3F3F340",
            border: border || "1.5px solid #F3F3F340",
            borderRadius: "7px",
            // height: borderHeight || "3rem",
          },
          "& .MuiSelect-select.MuiSelect-select": {
            fontFamily: "FiraSans !important",
            color: color || "white",
            fontSize: fontSize || "0.6rem",
            fontWeight: fontWeight,
            height: height,
          },
          "& .MuiInputLabel-root": {
            fontFamily: "FiraSans !important",
            color: color || "white",
            fontSize: fontSize || "0.8rem",
            fontWeight: fontWeight,
          },
          "& .MuiSvgIcon-root": {
            color: color || "white",
          },
        }}
        InputProps={{
          style: {
            fontFamily: "FiraSans !important",
            color: color,
            fontSize: fontSize || "0.6rem",
            fontWeight: fontWeight,
            borderRadius: radius || "5px",
          },
          startAdornment: iconPosition === "start" && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: iconPosition === "end" && (
            <InputAdornment position="end">{icon}</InputAdornment>
          ),
        }}
        disabled={disabled}
        value={value}
        error={error}
        helperText={
          helperText && (
            <FormHelperText sx={{ fontSize: "0.6rem", margin: "4px" }}>
              {helperText}
            </FormHelperText>
          )
        }
      >
        {options?.map((option: any) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            sx={{
              cursor: option.disabled ? "not-allowed" : "pointer",
              fontSize: "0.8rem",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
