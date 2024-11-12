import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputAdornment,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function GFlowSelect(props: any) {
  const {
    fullWidth,
    width,
    height,
    borderHeight,
    border,
    size,
    color,
    fontSize,
    fontWeight,
    radius,
    label,
    labelShrink,
    variant,
    options,
    value,
    error,
    helperText,
    margin,
    onChange,
  } = props;

  const [open, setOpen] = useState(false);

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    console.log("Selected Value:", selectedValue);

    // If an external onChange function is provided, call it
    if (onChange) {
      onChange(selectedValue, event);
    }
  };

  return (
    <Box sx={{ width: width, margin: margin }}>
      <FormControl fullWidth={fullWidth} variant={variant} error={error}>
        {label && <InputLabel>{label}</InputLabel>}
        <Select
          labelId="demo-simple-select-label"
          id={label}
          label={label}
          value={value}
          fullWidth={fullWidth}
          size={size}
          onChange={handleSelectChange}
          IconComponent={KeyboardArrowDownIcon}
          //   inputProps={{
          //     style: {
          //       fontFamily: "FiraSans-medium !important",
          //       color: "red",
          //       fontSize: fontSize || "0.7rem",
          //       fontWeight: fontWeight || 500,
          //       borderRadius: radius || "5px",
          //     },
          //   }}
          sx={{
            fontFamily: "FiraSans-medium !important",
            width: width,
            margin: margin,
            "& .MuiSelect-select": {
              fontFamily: "FiraSans-medium !important",
              color: color || "#EEEEEE",
              fontSize: fontSize || "0.8rem",
              fontWeight: fontWeight || 500,
              border: border || "1px solid #ACAAB3",
              padding: "1px 15px",
              height: borderHeight || "3rem",
            },
            "& .MuiSvgIcon-root": {
              color: "#EEEEEE",
              fontSize: "13px",
              fontWeight: 800,
            },
            "& .MuiSelect-icon": {
              transform: "none !important", // Prevents rotation on open/close
            },
          }}
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
        </Select>
        {helperText && (
          <FormHelperText sx={{ fontSize: "0.6rem", margin: "4px" }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
