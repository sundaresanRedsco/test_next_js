import React from "react";
import { styled } from "@mui/system";
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  TextField,
} from "@mui/material";

interface GlobalTextFieldProps {
  name: string;
  id?: string;
  value: string;
  defaultValue?: string;
  disabledVal?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataTest?: string;
  placeholder?: string;
  label?: string;
  width?: string | number;
  height?: string | number;
  error?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  type?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  errorHandler?: (message: string) => void;
  fontSize?: string; // Add fontSize prop
  color?: string;
}

const StyledFormControl = styled(FormControl)`
  margin: 0;
  width: 100%;
`;

const CustomOutlinedInput = styled(OutlinedInput)<{
  fontSize?: string;
  color?: string;
}>`
  padding: 6px 8px; /* Reduced padding */
  font-size: ${({ fontSize }) => fontSize || "0.4rem"}; // Smaller font size
  color: ${({ color }) => `#${color}` || "#eeeeee"}; // Default color
  border-radius: 5px;
  height: 2.5rem;
  border: 0.5px solid #eeeeee;
  box-shadow: none;

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &::placeholder {
    color: #eeeeee;
    opacity: 1;
  }

  .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 5px;
    font-family: FiraSans-regular !important;
    font-size: 0.6rem; // Smaller placeholder font size
    color: white;
  }
`;

const GlobalTextField: React.FC<GlobalTextFieldProps> = ({
  name,
  value,
  defaultValue = "",
  disabledVal = false,
  onChange,
  dataTest,
  placeholder = "",
  label,
  width = "100%",
  height,
  error,
  startAdornment,
  endAdornment,
  type = "text",
  onKeyUp,
  errorHandler,
  fontSize,
  color,
}) => {
  return (
    <StyledFormControl style={{ marginTop: "10px", width }}>
      <CustomOutlinedInput
        id="outlined-adornment-amount"
        disabled={disabledVal}
        size="small"
        name={name}
        value={value}
        defaultValue={defaultValue}
        data-test={dataTest}
        type={type}
        placeholder={placeholder}
        label={label}
        onInput={() => error && errorHandler && errorHandler("")}
        onChange={onChange}
        error={!!error}
        onKeyUp={onKeyUp}
        style={{ height, color: "white" }}
        fontSize={fontSize || "0.4rem"} // Default to smaller font size
      />
      {error && (
        <FormHelperText style={{ fontSize: "0.4rem" }} error>
          {error}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default GlobalTextField;
