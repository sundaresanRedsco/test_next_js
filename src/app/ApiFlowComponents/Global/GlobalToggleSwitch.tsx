import React from "react";
import { Switch, Typography, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

export interface GlobalToggleSwitchProps {
  label?: string; // Label displayed next to the switch
  checked?: boolean; // Initial state of the switch
  onChange?: (checked: boolean) => void; // Callback for when the switch is toggled
  color?: "primary" | "secondary" | "default"; // Switch color
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 34, // Width of the switch
  height: 16, // Height of the switch
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 2, // Adjust padding to ensure proper alignment
    "&.Mui-checked": {
      transform: "translateX(16px)", // Adjusted for smaller width and correct alignment
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#00008B", // Dark blue background when checked
        opacity: 1,
        border: 0,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 12, // Decreased thumb size
    height: 12, // Decreased thumb size
    backgroundColor: "#fff", // White circle
    borderRadius: 6, // Rounded corners for the thumb
  },
  "& .MuiSwitch-track": {
    borderRadius: 8, // Match the height / 2 for track rounding
    backgroundColor: "#E9E9EA", // Light gray background when unchecked
    opacity: 1,
  },
}));

const GlobalToggleSwitch: React.FC<GlobalToggleSwitchProps> = ({
  label = "", // Default label is an empty string
  checked = false, // Default unchecked state
  onChange,
  color = "primary", // Default color is "primary"
}) => {
  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <FormControlLabel
      control={<CustomSwitch checked={checked} onChange={handleToggleChange} />}
      label={<Typography>{label}</Typography>}
    />
  );
};

export default GlobalToggleSwitch;
