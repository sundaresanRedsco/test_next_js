import React from "react";
import { styled } from "@mui/material/styles";

const CustomCheckbox = styled("input")(({ theme }) => ({
  width: "25px",
  height: "25px",
  marginRight: "5px",
  cursor: "pointer",
  appearance: "none",
  backgroundColor: theme.apiTrail.signInUp.CheckBox,
  borderRadius: "4px",
  display: "grid",
  placeContent: "center",
  transition: "all 0.2s ease-in-out",
  "&:checked": {
    backgroundColor: theme.apiTrail.signInUp.CheckedCheckBox,
    transform: "scale(0.95)",
    "&::before": {
      content: '""',
      width: "7px",
      height: "15px",
      transform: "rotate(45deg) scale(0)",
      borderBottom: `3px solid ${theme.apiTrail.signInUp.CheckBoxTick}`,
      borderRight: `3px solid ${theme.apiTrail.signInUp.CheckBoxTick}`,
      marginBottom: "4px",
      animation: "checkmark 0.2s ease-in-out forwards",
    },
  },
  "@keyframes checkmark": {
    "0%": {
      transform: "rotate(45deg) scale(0)",
    },
    "50%": {
      transform: "rotate(45deg) scale(1.2)",
    },
    "100%": {
      transform: "rotate(45deg) scale(1)",
    },
  },
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

type Props = {
  checked: boolean;
  onChange: () => void;
  sx?: any;
};

export default function SignInUpCheckBox({ checked, onChange, sx }: Props) {
  return (
    <CustomCheckbox
      type="checkbox"
      id="remember"
      checked={checked}
      onChange={onChange}
      sx={sx}
    />
  );
}
