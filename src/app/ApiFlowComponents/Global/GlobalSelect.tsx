import React from "react";
import {
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  FormHelperText,
  useTheme,
} from "@mui/material";

export default function GlobalSelect(props: any) {
  const {
    fullWidth,
    width,
    height,
    borderHeight,
    size,
    color,
    fontSize,
    fontWeight,
    radius,
    label,
    disabled,
    options,
    iconPosition,
    icon,
    value,
    defaultValue,
    error,
    helperText,
    onChange,
    placeholder,
    dropdownContainerStyle,
    onDropdownScroll,
  } = props;

  const theme = useTheme();
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    console.log("Selected Value:", selectedValue);

    if (onChange) {
      onChange(selectedValue, event);
    }
  };

  return (
    <Box sx={{ marginBottom: helperText ? "0px" : "21px" }}>
      <TextField
        fullWidth={fullWidth}
        size={size || "small"}
        select
        id={label}
        label={label}
        defaultValue={defaultValue}
        onChange={handleSelectChange}
        placeholder={placeholder}
        sx={{
          width: width || "100%",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: radius || "8px",
            height: borderHeight || "2.5rem",
            border: "none",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSelect-select": {
              padding: "10px 14px",
              fontFamily: "Inter-Regular",
              color: color || theme.palette.primaryText.main,
              fontSize: fontSize || "0.8rem",
              fontWeight: fontWeight || 500,
              textAlign: "center",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.7rem", // Decrease font size for the label
            transform: "translate(14px, 12px) scale(1)",
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75)",
            },
          },
          "& .MuiSvgIcon-root": {
            display: "block",
          },
        }}
        InputProps={{
          style: {
            fontFamily: "Inter-Regular",
            color: color || theme.palette.primaryText.main,
            fontSize: fontSize || "0.8rem",
            fontWeight: fontWeight || 500,
            borderRadius: radius || "8px",
            textAlign: "center",
          },
          startAdornment:
            icon && iconPosition === "start" ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined,
          endAdornment:
            icon && iconPosition === "end" ? (
              <InputAdornment position="end">{icon}</InputAdornment>
            ) : undefined,
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
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: dropdownContainerStyle,
              onScroll: onDropdownScroll,
            },
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
              textAlign: "center",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
