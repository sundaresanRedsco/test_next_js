import { styled } from "@mui/system";
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchNew } from "@/app/Assests/icons";
import { BiSearchAlt2 } from "react-icons/bi";

const StyledGSearchFormControl = styled(FormControl)`
  margin: 0rem;
`;

const GsearchOutlinedInput = styled(OutlinedInput)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  padding: 0.1rem 0.2rem;
  font-size: 0.7rem;
  border: 1px solid ${({ theme }) => theme.palette.silverGrey.main};
  border-radius: 5px .MuiInputBase-input.MuiOutlinedInput-input {
    padding: 0px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette.silverGrey.main};
  }

  .MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border: 1px solid ${({ theme }) => theme.palette.silverGrey.main};
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
  marginLeft?: any;
  border?: any;
  color?: any;
  iconColor?: any;
}
export default function GsearchBar(props: GsearchBarPropsType) {
  const { placeholder, onChange, marginLeft, border, color, iconColor } = props;
  return (
    <>
      <StyledGSearchFormControl>
        <GsearchOutlinedInput
          id="outlined-adornment-amount"
          endAdornment={
            <InputAdornment position="start">
              {/* <SearchIcon /> */}
              {/* <SearchNew/> */}
              <BiSearchAlt2 style={{ color: iconColor || "black" }} />
            </InputAdornment>
          }
          label={""}
          placeholder={placeholder}
          onChange={onChange}
          sx={{
            height: "35px",
            color: color || "#FFFFFFBF",
            fontFamily: "FiraSans-Regular",
            marginLeft: marginLeft,
            width: "100%",
            border: border || "solid 1px #FFFFFF40",
            borderRadius: "10px",
          }}
        />
      </StyledGSearchFormControl>
    </>
  );
}
