import {
  TextField,
  InputAdornment,
  FormHelperText,
  Box,
  useTheme,
} from "@mui/material";

export default function GInput(props: any) {
  const theme = useTheme();
  const {
    fullWidth,
    width,
    height,
    color,
    background,
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
    sidebar,
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
  console.log(sidebar, "sidebarsidebar");

  return (
    <Box
      sx={{
        marginBottom: helperText ? "0px" : !helperText ? "21px" : "0px",
      }}
    >
      <TextField
        fullWidth={fullWidth}
        size={size || "small"}
        type={type}
        id={id}
        label={label}
        onClick={onClick}
        onKeyDown={onKeyDown}
        InputLabelProps={{
          shrink: labelShrink,
          style: {
            fontFamily: "Inter-Regular",
            color: color ? color : theme.palette.v2SecondaryColor.main,
            // color: color ? color : theme.palette.primaryBlack.main,

            fontSize: fontSize || "0.6rem",
            fontWeight: fontWeight,
          },
        }}
        sx={{
          margin: margin,
          border: border,
          width: width,
          height: height,
          borderColor: borderColor,

          "&.MuiFormHelperText-root": {
            fontSize: "10px",
          },
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: disabledColor,
          },
          "&.MuiTextField-root": {
            verticalAlign: "unset",
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
            <FormHelperText sx={{ fontSize: "10px", margin: "0px" }}>
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
            color: color ? color : theme.palette.v2PrimaryColor.main,
            // color: color ? color : theme.palette.primaryBlack.main,
            fontFamily: "Inter-Regular",
            fontSize: fontSize || "0.6rem",
            fontWeight: fontWeight,
            borderRadius: radius || 0, // Set border radius to 0
          },
          disableUnderline: disableUnderline,

          startAdornment: (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ),
          endAdornment: endAdornment ? (
            endAdornment
          ) : (
            <InputAdornment position="end">{endIcon}</InputAdornment>
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
