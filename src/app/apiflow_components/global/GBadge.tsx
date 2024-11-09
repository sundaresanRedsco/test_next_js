import { Badge, useTheme } from "@mui/material";
import React from "react";

const GBadge = (props: any) => {
  const { badgeContent, color, position, children, iconLeft, iconTop } = props;
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
          fontFamily: "Inter-Regular",
          left: iconLeft, // Keep iconLeft positioning
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: iconTop,
        },
      }}
    >
      {children}
    </Badge>
  );
};

export default GBadge;
