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
    labelShrink,
    variant,
    disabled,
    options,
    iconPosition, // Added prop for icon position
    icon,
    value,
    defaultValue,
    border,
    error,
    helperText,
    margin,
    onChange,
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
    <Box
    // sx={{
    //   marginBottom: helperText ? "0px" : !helperText ? "21px" : "0px",
    // }}
    >
      <TextField
        fullWidth={fullWidth}
        size={size}
        select
        id={label}
        label={label}
        defaultValue={defaultValue}
        onChange={handleSelectChange}
        sx={{
          width: width,
          margin: margin,
          "& .MuiOutlinedInput-notchedOutline": {
            fontFamily: "FiraSans-medium !important",
            borderColor: borderColor || "#ACAAB3",
            border: border || "1px solid #ACAAB3",
            borderRadius: radius || "10px",
            height: borderHeight || "3rem",
          },
          "& .MuiSelect-select.MuiSelect-select": {
            fontFamily: "FiraSans-medium !important",
            color: color || "#EEEEEE",
            fontSize: fontSize || "0.6rem",
            fontWeight: fontWeight || 500,
            height: height,
          },
          "& .MuiInputLabel-root": {
            fontFamily: "FiraSans-medium !important",
            color: color || "#EEEEEE",
            fontSize: fontSize || "0.8rem",
            fontWeight: fontWeight || 500,
          },
          "& .MuiInputAdornment-root": {
            marginLeft: "0px",
          },
          "& .MuiInputBase-root-MuiOutlinedInput-root": {
            fontFamily: "FiraSans-regular !important",
            lineHeight: "0px",
          },
        }}
        InputProps={{
          style: {
            fontFamily: "FiraSans-medium !important",
            color: color,
            fontSize: fontSize || "0.7rem",
            fontWeight: fontWeight || 500,
            borderRadius: radius || "5px",
          },
          startAdornment: iconPosition === "start" && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: iconPosition === "end" && (
            <InputAdornment position="end">{icon}</InputAdornment>
          ),
        }}
        SelectProps={{
          IconComponent: () => null,
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
