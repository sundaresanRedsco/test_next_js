import { styled } from "@mui/system";
import {
  TextField,
  InputAdornment,
  FormHelperText,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import theme from "@/Theme/theme";
type Props = {
  fullWidth?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  color?: string;
  background?: string;
  secondarybackground?: string;
  fontSize?: string;
  fontWeight?: string;
  margin?: string;
  radius?: string;
  type?: string;
  id?: any;
  label?: string;
  labelShrink?: boolean;
  variant?: string;
  disabled?: boolean;
  value?: any;
  placeholder?: string;
  maxLength?: string;
  error?: any;
  helperText?: any;
  dataTest?: string;
  startIcon?: any;
  endIcon?: any;
  onChangeHandler?: any;
  register?: any;
  pattern?: any;
  patternError?: any;
  required?: boolean;
  border?: any;
  disableUnderline?: boolean;
  defaultValue?: any;
  startAdornment?: any;
  endAdornment?: any;
  borderColor?: string;
  size?: string;
  disabledColor?: string;
  onClick?: any;
  errorHandler?: any;
  onKeyDown?: any;
  onKeyUp?: any;
  name?: string;
  smallInput?: boolean;
  sx?: any;
};
export default function GInput(props: Props) {
  const {
    fullWidth,
    width,
    height,
    padding,
    color,
    background,
    secondarybackground,
    fontSize,
    fontWeight,
    margin,
    radius,
    type,
    id,
    label,
    labelShrink,
    variant,
    disabled,
    value,
    placeholder,
    maxLength,
    error,
    helperText,
    dataTest,
    startIcon,
    endIcon,
    onChangeHandler,
    register,
    pattern,
    patternError,
    required,
    border,
    disableUnderline,
    defaultValue,
    startAdornment,
    endAdornment,
    borderColor,
    size,
    disabledColor,
    onClick,
    errorHandler,
    onKeyDown,
    onKeyUp,
    name,
    smallInput,
    sx,
  } = props;

  function removeUnderscoreAndCapitalize(name: string) {
    // Check if the string contains an underscore
    if (name.includes("_")) {
      // Split the string into an array of words using underscores as separators
      const words = name.split("_");

      // Capitalize the first letter of each word
      const capitalizedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      );

      // Join the words back together to form the final string
      const result = capitalizedWords.join(" ");

      return result;
    } else {
      // If no underscore is present, capitalize the first letter of the entire string
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
  const [isHide, setisHide] = useState(true);
  const eyeIcon = () => {
    return (
      <IconButton
        onClick={() => {
          setisHide(!isHide);
        }}
        size="small"
        sx={{
          color: "#F3F3F380",
        }}
      >
        {isHide ? (
          <VisibilityOff sx={{ fontSize: "18px" }} />
        ) : (
          <Visibility sx={{ fontSize: "18px" }} />
        )}
      </IconButton>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <TextField
        name={name}
        fullWidth={fullWidth}
        size={size || "small"}
        type={type == "password" ? (isHide ? "password" : "text") : type}
        id={id}
        label={label}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        InputLabelProps={{
          shrink: labelShrink,
          style: {
            fontFamily: "FiraSans-regular",
            color: color ? color : theme.palette.teritiaryColor.main,
            // color: color ? color : theme.palette.primaryBlack.main,

            fontSize: fontSize || "0.7rem",
            fontWeight: fontWeight,
          },
        }}
        sx={{
          ...sx,
          "&.MuiFormControl-root": {
            height: "auto",
          },
          "& input:-webkit-autofill": {
            // boxShadow: "none !important",
            WebkitBoxShadow: background
              ? `0 0 0 30px #291e3b  inset !important`
              : secondarybackground
              ? `0 0 0 30px #241D35 inset !important`
              : "0 0 0 30px #18151c inset !important",
            WebkitTextFillColor: color || "white",
            borderRadius: "unset !important",
            caretColor: color || "white",
          },
          "& .MuiInputBase-root": {
            paddingRight: type == "password" ? "3px" : "auto",
            paddingLeft: smallInput ? 0 : "auto",
            padding: padding,
            height: height,
            boxShadow: border ? border : "0 0 0 1.3px #F3F3F340",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-input": {
            fontFamily: "FiraSans-medium !important",
          },
          "& .MuiInputBase-input::placeholder": {
            fontFamily: "Firasans-light",
          },
          margin: margin,
          width: width,
          height: height,
          borderColor: borderColor ? borderColor : "#F3F3F340",
          borderRadius: "7px",
          "&.MuiFormHelperText-root": {
            fontSize: "10px",
          },
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: disabledColor,
          },
        }}
        variant={variant}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        error={error}
        onInput={() => error && errorHandler && props?.errorHandler("")}
        helperText={
          helperText && (
            <FormHelperText
              sx={{
                fontSize: "10px",
                margin: "0px",
                fontFamily: "Firasans-regular",
                color: "#d32f2f",
              }}
            >
              {helperText}
            </FormHelperText>
          )
        }
        data-test={dataTest}
        onChange={onChangeHandler}
        {...(register &&
          register(
            id,

            {
              onChange: (e: any) => {
                onChangeHandler(e);
              },
              required: required
                ? removeUnderscoreAndCapitalize(id) + " is required."
                : "",
              pattern: {
                value: pattern,
                message: patternError,
              },
            }
          ))}
        InputProps={{
          style: {
            background: background,
            color: color ? color : "white",
            // color: color ? color : theme.palette.primaryBlack.main,
            fontFamily: "FiraSans-regular",
            fontSize: fontSize || "0.7rem",
            fontWeight: fontWeight ? fontWeight : 500,
            borderRadius: radius || "7px", // Set border radius to 0
          },
          disableunderline: disableUnderline,

          startAdornment: startAdornment ? (
            startAdornment
          ) : (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: endAdornment ? (
            endAdornment
          ) : (
            <InputAdornment position="end">
              {type == "password" ? eyeIcon() : endIcon}
            </InputAdornment>
          ),
        }}
        inputProps={{
          minLength: 0,
          maxLength: maxLength, // Set maximum length
        }}
        // startAdornment={startAdornment}
        // endAdornment={endAdornment}
      />
    </Box>
  );
}
