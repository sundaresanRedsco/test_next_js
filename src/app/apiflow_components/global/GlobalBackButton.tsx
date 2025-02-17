import React from "react";
import { Typography } from "@mui/material";
import BackV2 from "@/app/Assests/icons/BackNew.svg";

interface GlobalBackButtonProps {
  label?: string;
  onClick?: () => void;
  color?: string;
  fontSize?: string;
}

const GlobalBackButton: React.FC<GlobalBackButtonProps> = ({
  label = "Back",
  onClick,
  color = "#000", // default color
  fontSize = "14px", // default font size
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginRight: "2rem",
      }}
      onClick={onClick}
    >
      <BackV2 style={{ height: "0.5rem" }} />

      <Typography style={{ marginLeft: "5px", color, fontSize }}>
        {label}
      </Typography>
    </div>
  );
};

export default GlobalBackButton;
