import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#D9D9D980",
  ".Mui-focusVisible &": {
    outline: "2px auto #D9D9D9",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#D9D9D980",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#D9D9D9",
  "&::before": {
    display: "flex",
    width: 16,
    height: 16,
    background: "radial-gradient(#7A43FE,#7A43FE 28%,transparent 0%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#D9D9D9",
  },
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
type Props = {
  inputs: object[] | undefined;
  name: string | undefined;
  value: any | undefined;
  onChange: any | undefined;
};
export default function GRadioGroup({ inputs, onChange, value, name }: Props) {
  return (
    <FormControl>
      {/* <FormLabel id="demo-customized-radios">Gender</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-customized-radios"
        name={name}
        value={value}
        onChange={onChange}
        sx={{
          color: "white",
          "& .MuiTypography-root": {
            fontFamily: "Firasans-regular",
            fontSize: "13px",
          },
        }}
      >
        {inputs?.map((elem: any, index) => {
          return (
            <FormControlLabel
              key={index}
              value={elem.value}
              control={<BpRadio />}
              label={elem.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
