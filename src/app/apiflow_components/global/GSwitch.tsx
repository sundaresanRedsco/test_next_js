import { styled, Switch } from "@mui/material";
import React from "react";

type Props = {
  value: boolean;
  handleChange: any;
  name: string;
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#7A43FE",
        ...theme.applyStyles("dark", {
          backgroundColor: "#7A43FE",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#9A9A9A",
    boxSizing: "border-box",
    ...theme.applyStyles("dark", {
      backgroundColor: "#9A9A9A",
    }),
  },
}));
export default function GSwitch({ value, handleChange, name }: Props) {
  return <AntSwitch name={name} checked={value} onChange={handleChange} />;
}
