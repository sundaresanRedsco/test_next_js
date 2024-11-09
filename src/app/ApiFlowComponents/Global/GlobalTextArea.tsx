import React from "react";
import { TextField, Box, FormHelperText, useTheme } from "@mui/material";

export default function GlobalTextArea(props: any) {
  const {
    fullWidth,
    width,
    height,
    size,
    color,
    fontSize,
    fontWeight,
    radius,
    label,
    disabled,
    placeholder,
    value,
    defaultValue,
    error,
    helperText,
    onChange,
  } = props;

  const theme = useTheme(); // Access the current theme

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    console.log("Input Value:", inputValue);

    if (onChange) {
      onChange(inputValue, event);
    }
  };

  return (
    <Box sx={{ marginBottom: helperText ? "0px" : "21px" }}>
      <TextField
        fullWidth={fullWidth}
        size={size || "small"}
        id={label}
        label={label}
        placeholder={placeholder}
        multiline
        minRows={height || 4} // Set minimum rows for the textarea
        maxRows={8} // Set maximum rows to allow flexible height
        defaultValue={defaultValue}
        onChange={handleTextAreaChange}
        sx={{
          width: width || "100%",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: radius || "5px", // Rounded corners
            "& .MuiInputBase-input": {
              fontFamily: "Inter-Regular !important",
              color: color || theme.palette.primaryText.main,
              fontSize: fontSize || "0.6rem",
              fontWeight: fontWeight || 500,
              padding: "10px 14px", // Padding to match the spacing
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // Ensure no border on initial render
          },
          "& .MuiInputLabel-root": {
            display: "none", // Hiding the label if not needed
          },
        }}
        InputProps={{
          style: {
            fontFamily: "'Inter-Regular'",
            color: color || theme.palette.primaryText.main,
            fontSize: fontSize || "0.6rem",
            fontWeight: fontWeight || 500,
            borderRadius: radius || "8px",
          },
        }}
        disabled={disabled}
        value={value}
        error={error}
        helperText={
          helperText && (
            <FormHelperText sx={{ fontSize: "0.5rem", margin: "4px" }}>
              {helperText}
            </FormHelperText>
          )
        }
      />
    </Box>
  );
}
