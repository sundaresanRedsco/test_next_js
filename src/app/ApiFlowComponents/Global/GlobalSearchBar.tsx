import { styled } from "@mui/system";
import { OutlinedInput, InputAdornment, FormControl } from "@mui/material";
import SearchV2 from "../../Assests/icons/v2SearchIcon.svg";

const StyledGSearchFormControl = styled(FormControl)`
  margin: 0rem;
  width: 100%;
`;

const GsearchOutlinedInput = styled(OutlinedInput)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular !important;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: ${({ theme }) => theme.palette.v2WhiteColour.main};
  // background-color:red;

  padding: 0.1rem 0.2rem;
  font-size: 0.7rem;
  border: none; /* Remove border */
  border-radius: 5px;

  .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 0px;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none; /* Ensure no border is shown */
  }

  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none; /* Remove border on focus */
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: ${({ theme }) => theme.palette.primaryBlack.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.primaryBlack.main};
    opacity: 1; /* Ensure placeholder text is fully visible */
  }
`;

interface GsearchBarPropsType {
  placeholder: string;
  onChange?: any;
}

export default function GlobalSearchBar(props: GsearchBarPropsType) {
  const { placeholder, onChange } = props;
  return (
    <StyledGSearchFormControl>
      <GsearchOutlinedInput
        id="outlined-adornment-amount"
        startAdornment={
          <InputAdornment position="start">
            {/* <SearchV2 style={{ height: "10px" }} />/ */}
          </InputAdornment>
        }
        label={""}
        placeholder={placeholder}
        onChange={onChange}
        sx={{
          height: "2.1rem",
        }}
      />
    </StyledGSearchFormControl>
  );
}
