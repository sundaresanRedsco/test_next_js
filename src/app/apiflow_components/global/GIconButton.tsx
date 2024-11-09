import { IconButton } from "@mui/material";
import React from "react";

type Props = { icon: any; customStyle?: object; onClick: () => void };

export default function GIconButton({ icon, customStyle, onClick }: Props) {
  return (
    <IconButton
      sx={{
        ...customStyle,
        color: "white",
        background: "#7A43FE",
        height: "25px",
        width: "25px",
        borderRadius: "6px",
        "&:hover": {
          background: "#7A43FE",
        },
      }}
      onClick={onClick}
    >
      {icon}
    </IconButton>
  );
}
