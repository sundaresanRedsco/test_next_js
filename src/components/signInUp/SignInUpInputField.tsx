import { Box, FormHelperText, styled, TextField } from "@mui/material";
import React from "react";
import SignInUpTypography from "./SignInUpTypography";
import theme from "@/theme/theme";
import EmailIcon from "@/assests/svgs/signInUp/EmailIcon";
import PasswordIcon from "@/assests/svgs/signInUp/PasswordIcon";
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "transparent",
    borderRadius: "10px",
    "& fieldset": {
      border: `2px solid`,
      borderColor: theme.apiTrail.signInUp.Border,
    },
    "&:hover fieldset": {
      borderColor: theme.apiTrail.signInUp.ButtonPrimary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.apiTrail.signInUp.ButtonPrimary,
    },
  },
  marginBottom: "1rem",
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
    <Box sx={{ mb: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {type === "email" ? <EmailIcon /> : <PasswordIcon />}
        <SignInUpTypography
          text={label}
          variant="sm"
          color={theme.apiTrail.signInUp.TextLable}
          fontWeight="md"
        />
      </div>
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
