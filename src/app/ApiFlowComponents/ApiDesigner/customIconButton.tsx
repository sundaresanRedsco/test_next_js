import React from "react";
import { IconButton, Tooltip, Badge, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

// Define the type for the CustomIconButton props
interface CustomIconButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
  tooltipTitle: string;
  IconComponent: any; // Use the correct type for SVG components
  iconStyle?: React.CSSProperties;
  badgeContent?: number;
  isActive?: boolean; // Prop to determine if the icon is active
  sx?: SxProps<Theme>; // Use SxProps from Material-UI for custom styles
  disabled?: boolean; // Prop to handle disabled state
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  onClick,
  ariaLabel,
  tooltipTitle,
  IconComponent,
  iconStyle,
  badgeContent,
  isActive = false, // Default to false if not provided
  sx,
  disabled = false, // Default to false if not provided
}) => {
  const theme = useTheme();
  return (
    <IconButton
      onClick={onClick}
      aria-label={ariaLabel}
      size="small"
      disabled={disabled}
      sx={{
        "&:hover": {
          backgroundColor: disabled ? "transparent" : "transparent",
        },
        backgroundColor:
          isActive && !disabled
            ? theme.palette.v2PrimaryColor.main
            : "transparent", // Background color based on active and disabled prop
        "&:active": {
          backgroundColor: theme.palette.v2PrimaryColor.main, // Ensure background color remains purple while clicking
        },
        ...sx,
      }}
    >
      <Tooltip arrow title={tooltipTitle}>
        {badgeContent ? (
          <Badge
            badgeContent={badgeContent}
            color="info"
            max={100}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                minWidth: "16px",
                height: "16px",
                fontSize: "0.6rem",
                padding: "4px",
                fontWeight: 800,
              },
            }}
          >
            <IconComponent
              style={{
                ...iconStyle,
                color: isActive && !disabled ? "white" : iconStyle?.color, // Icon color based on active and disabled prop
              }}
            />
          </Badge>
        ) : (
          <IconComponent
            style={{
              ...iconStyle,
              color: isActive && !disabled ? "white" : iconStyle?.color, // Icon color based on active and disabled prop
            }}
          />
        )}
      </Tooltip>
    </IconButton>
  );
};

export default CustomIconButton;
