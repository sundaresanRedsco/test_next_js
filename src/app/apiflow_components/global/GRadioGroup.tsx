import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import theme from "@/Theme/theme";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.radioBg1.main,
  ".Mui-focusVisible &": {
    outline: `2px auto ${theme.palette.radioBg.main}`,
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.radioBg1.main,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.radioBg3.main,
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: theme.palette.radioBg2.main,
    ...theme.applyStyles("dark", {
      background: theme.palette.radioBg4.main,
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: `0 0 0 1px ${theme.palette.radioBg6.main}`,
    backgroundColor: theme.palette.radioBg5.main,
    backgroundImage: `linear-gradient(180deg,${theme.palette.radioBg7.main},${theme.palette.radioBg8.main})`,
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: theme.palette.radioBg.main,
  "&::before": {
    display: "flex",
    width: 16,
    height: 16,
    background: `radial-gradient(${theme.palette.sigInUpStepperIconActive.main},${theme.palette.sigInUpStepperIconActive.main} 28%,transparent 0%)`,
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.radioBg.main,
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
          color: theme.palette.signInUpPrimary.main,
          "& .MuiTypography-root": {
            fontFamily: "Firasans-regular",
            fontSize: "13px",
            "@media (min-width: 2120px)": {
              fontSize: "20px",
            },
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
