import React from "react";
import { styled } from "@mui/system";
import { FormControl, FormHelperText, OutlinedInput } from "@mui/material";

const StyledApiCallFormControl = styled(FormControl)`
  margin: 0rem;
`;

const ApiCallOutlinedInput = styled(OutlinedInput)`
  background-color: transparent;
  padding: 6px 10px;
  font-size: 0.6rem;
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  border: 1px solid ${({ theme }) => theme.palette.primaryBorder.main};
  .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 0px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.secondaryColor.main};
  }
  .MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ theme }) => theme.palette.secondaryColor.main};
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
  &::placeholder {
    color: ${({ theme }) => theme.palette.secondaryColor.main};
    opacity: 1; /* Ensure placeholder text is fully visible */
  }
`;

export default function ApiTextField(props: any) {
  const {
    name,
    value,
    defaultValue,
    disabledVal,
    onChange,
    dataTest,
    placeholder,
    width,
    height,
    error,
    startAdornment,
    endAdornment,
    type,
    onKeyUp,
  } = props;

  return (
    <div>
      <StyledApiCallFormControl style={{ marginTop: "10px", width: width }}>
        <ApiCallOutlinedInput
          id="outlined-adornment-amount"
          disabled={disabledVal || false}
          size="small"
          name={name}
          value={value}
          defaultValue={defaultValue}
          data-test={dataTest}
          type={type}
          placeholder={placeholder}
          // onInput={() => error && props.errorHandler('')}
          onInput={() =>
            error &&
            typeof props.errorHandler === "function" &&
            props.errorHandler("")
          }
          onChange={onChange}
          error={error ? true : false}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          onKeyUp={onKeyUp}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
      </StyledApiCallFormControl>
    </div>
  );
}
