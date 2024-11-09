import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

interface CustomModeEditIconProps extends SvgIconProps {
  disabled?: boolean;
}

const CustomModeEditIcon: React.FC<CustomModeEditIconProps> = (props) => {
  const { disabled, style, onClick, ...other } = props;

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <ModeEditIcon
      {...other}
      style={{
        ...style,
        color: disabled ? "#d3d3d3" : style?.color,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={handleClick}
    />
  );
};

export default CustomModeEditIcon;
