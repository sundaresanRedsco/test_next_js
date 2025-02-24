import { Box, FormHelperText, styled, TextField } from "@mui/material";
import React from "react";
import SignInUpTypography from "./SignInUpTypography";
import theme from "../../Theme/Theme";
import EmailIcon from "@/assests/svgs/signInUp/EmailIcon";
import PasswordIcon from "@/assests/svgs/signInUp/PasswordIcon";
import { globalTranslate } from "@/helpers/helpersFunctions";
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    borderRadius: "10px",
    "& fieldset": {
      border: `2px solid`,
      borderColor: theme.apiTrail.signInUp.Border,
      [theme.breakpoints.down("xl")]: {
        border: `1.5px solid`,
        borderColor: theme.apiTrail.signInUp.Border,
        // boxSizing: "border-box", // Ensure padding is accounted for in the height
      },
    },

    "&:hover fieldset": {
      borderColor: theme.apiTrail.signInUp.ButtonPrimary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.apiTrail.signInUp.ButtonPrimary,
    },
    [theme.breakpoints.up("lg")]: {
      borderRadius: "8px",
      // boxSizing: "border-box", // Ensure padding is accounted for in the height
    },
  },
  marginBottom: "1rem",

  [theme.breakpoints.up("xl")]: {
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      height: "1.4375em", // Set your desired height here
      padding: "16.5px 14px",
      // boxSizing: "border-box", // Ensure padding is accounted for in the height
    },
  },
  [theme.breakpoints.down("xl")]: {
    "& .MuiInputBase-input::placeholder": {
      fontSize: "0.75rem", // Adjust the value as needed
    },
    "& .MuiInputBase-input.MuiOutlinedInput-input": {
      height: "0.5375em", // Set your desired height here
      padding: "16.5px 14px",
      // boxSizing: "border-box", // Ensure padding is accounted for in the height
    },
  },
});

type Props = {
  variant?: "primary" | "secondary";
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  error?: string;
};

export default function SignInUpInputField({
  variant,
  label,
  placeholder,
  value,
  onChange,
  type,
  error,
}: Props) {
  return (
    <Box
      sx={{
        mb: { xl: 2, xs: 1 },
        svg: {
          width: {
            lg: "1rem", // large screens
          },
          height: {
            lg: "1rem", // large screens
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: { xl: 1, xs: 1 },
        }}
      >
        {type === "email" ? <EmailIcon /> : <PasswordIcon />}
        <SignInUpTypography
          text={label}
          // variant="sm"
          fontSize={{
            xl: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
            lg: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
          }}
          color={theme.apiTrail.signInUp.TextLable}
          fontWeight="md"
        />
      </Box>
      <StyledTextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error ? true : false}
        helperText={
          error && (
            <FormHelperText
              sx={{
                fontSize: "10px",
                margin: "0px",
                fontFamily: "Firasans-medium",
                color: theme.apiTrail.signInUp.Error,
              }}
            >
              {error}
            </FormHelperText>
          )
        }
      />
    </Box>
  );
}
