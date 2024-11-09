import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

interface CustomDeleteIconProps extends SvgIconProps {
  disabled?: boolean;
}

const CustomDeleteIcon: React.FC<CustomDeleteIconProps> = (props) => {
  const { disabled, style, onClick, ...other } = props;

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <DeleteIcon
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

export default CustomDeleteIcon;
