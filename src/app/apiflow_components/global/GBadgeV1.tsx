import { Badge, useTheme } from "@mui/material";
import React from "react";
type Props = {
  badgeContent?: any;
  color?: string;
  position?: any;
  children?: any;
  iconLeft?: any;
  iconTop?: string;
  iconRight?: any;
};
const GBadge = (props: Props) => {
  const {
    badgeContent,
    color,
    position,
    children,
    iconLeft,
    iconTop,
    iconRight,
  } = props;
  const theme = useTheme();

  return (
    <Badge
      badgeContent={badgeContent}
      anchorOrigin={{
        vertical: "top",
        horizontal: position || "right",
      }}
      sx={{
        "& .MuiBadge-badge": {
          backgroundColor: color || theme.palette.warning.main, // Custom background color
          color: theme.palette.common.white, // Text color
          borderRadius: "4px", // Rounded corners for rectangular shape
          padding: "0 6px", // Padding to adjust content spacing
          height: "18px", // Adjust height
          minWidth: "18px", // Ensure minimum width
          fontSize: "10px", // Adjust font size
          fontFamily: "FiraSans-Regular",
          display: badgeContent > 0 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        },
        "&.MuiBadge-root": {
          position: "absolute",
          top: iconTop || "unset",
          left: iconLeft || "unset",
          right: iconRight || "unset",
        },
      }}
    >
      {children}
    </Badge>
  );
};

export default GBadge;
