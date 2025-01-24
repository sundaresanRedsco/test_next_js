// import React from "react";
// import { styled } from "@mui/system";
// import { FormControl, FormHelperText, TextField } from "@mui/material";

// interface GlobalTextFieldProps {
//   name: string;
//   id?: string;
//   value: string;
//   defaultValue?: string;
//   disabledVal?: boolean;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   dataTest?: string;
//   placeholder?: string;
//   label?: string;
//   width?: string | number;
//   height?: string | number;
//   error?: string;
//   startAdornment?: React.ReactNode;
//   endAdornment?: React.ReactNode;
//   type?: string;
//   onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
//   errorHandler?: (message: string) => void;
//   fontSize?: string; // Add fontSize prop
// }

// const StyledFormControl = styled(FormControl)`
//   margin: 0;
//   width: 100%;
// `;

// const CustomOutlinedInput = styled(TextField)<{ fontSize?: string }>`
//   background-color: #ffffff;
//   padding: 10px 12px;
//   font-size: ${({ fontSize }) => fontSize || "0.5rem"}; // Use fontSize prop
//   color: ${({ theme }) => theme.palette.text.primary};
//   border-radius: 5px; /* Rounded corners */
//   height: 2.5rem; /* Set height */
//   border: none; /* No border */
//   box-shadow: none; /* Remove shadow */

//   & .MuiOutlinedInput-notchedOutline {
//     border: none; /* Ensure no border on initial render */
//   }

//   &.Mui-focused .MuiOutlinedInput-notchedOutline {
//     border: none; /* Disable focused border effect */
//   }

//   &:hover .MuiOutlinedInput-notchedOutline {
//     border: none; /* Disable hover border effect */
//   }

//   &::placeholder {
//     color: #9a93b9;
//     opacity: 1;
//     font-size:0.5rem;
//   }

//   .MuiInputBase-input.MuiOutlinedInput-input {
//     padding: 0;
//     font-family: Inter-Regular !important;
//   }
// `;

// const GlobalTextField: React.FC<GlobalTextFieldProps> = ({
//   name,
//   value,
//   defaultValue = "",
//   disabledVal = false,
//   onChange,
//   dataTest,
//   placeholder = "",
//   label,
//   width = "100%",
//   height,
//   error,
//   startAdornment,
//   endAdornment,
//   type = "text",
//   onKeyUp,
//   errorHandler,
//   fontSize, // Add fontSize to destructured props
// }) => {
//   return (
//     <StyledFormControl style={{ marginTop: "10px", width }}>
//       <CustomOutlinedInput
//         id="outlined-adornment-amount"
//         disabled={disabledVal}
//         size="small"
//         name={name}
//         value={value}
//         defaultValue={defaultValue}
//         data-test={dataTest}
//         type={type}
//         placeholder={placeholder}
//         label={label}
//         onInput={() => error && errorHandler && errorHandler("")}
//         onChange={onChange}
//         error={!!error}
//         onKeyUp={onKeyUp}
//         style={{ height }}
//         fontSize={fontSize} // Pass fontSize to styled component
//         InputLabelProps={{
//           style: { fontSize: "0.7rem" } // Adjust the label font size here
//         }}
//       />
//       {error && (
//         <FormHelperText style={{ fontSize: "0.5rem" }} error>
//           {error}
//         </FormHelperText>
//       )}
//     </StyledFormControl>
//   );
// };

// export default GlobalTextField;

import React from "react";
import { styled } from "@mui/system";
import { FormControl, FormHelperText, TextField } from "@mui/material";

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
}

const StyledFormControl = styled(FormControl)`
  margin: 0;
  width: 100%;
`;

// background-color: #ffffff;
const CustomOutlinedInput = styled(TextField)<{ fontSize?: string }>`
  padding: 6px 8px; /* Reduced padding */
  font-size: ${({ fontSize }) => fontSize || "0.4rem"}; // Smaller font size
  color: #eeeeee;
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
    color: black;
    opacity: 1;
  }

  .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 5px;
    font-family: FiraSans-regular !important;
    font-size: 0.6rem; // Smaller placeholder font size
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
        style={{ height }}
        fontSize={fontSize || "0.4rem"} // Default to smaller font size
        InputLabelProps={{
          style: { fontSize: "0.6rem" }, // Smaller label font size
        }}
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
