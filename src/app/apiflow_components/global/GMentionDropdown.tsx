import React, { useState, useRef } from "react";
import { TextField, MenuItem, Popper, Paper } from "@mui/material";
import theme from "@/Theme/theme";

interface GMentionDropdownProps {
  height?: string;
  margin?: string;
  padding?: string;
  color?: string;
  placeholder?: string;
  options: string[]; // List of names to mention
  onChange?: (value: string) => void; // Callback when input changes
}

const GMentionDropdown: React.FC<GMentionDropdownProps> = ({
  height,
  margin,
  padding,
  color,
  options,
  placeholder = "Search...",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const anchorRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (onChange) onChange(value);

    const lastAtIndex = value.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      const searchText = value.slice(lastAtIndex + 1);
      const filtered = options.filter((option) =>
        option.toLowerCase().startsWith(searchText.toLowerCase())
      );

      setFilteredOptions(filtered);
      setOpen(filtered.length > 0);
      setCursorPosition(lastAtIndex);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (name: string) => {
    const beforeAt = inputValue.slice(0, cursorPosition + 1);
    const afterAt = inputValue
      .slice(cursorPosition + 1)
      .split(" ")
      .slice(1)
      .join(" ");
    const newValue = `${beforeAt}${name} ${afterAt}`;

    setInputValue(newValue);
    setOpen(false);
    if (onChange) onChange(newValue);
  };

  return (
    <div>
      <TextField
        inputRef={anchorRef}
        value={inputValue}
        size="small"
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth
        InputLabelProps={{
          // shrink: labelShrink,
          style: {
            fontFamily: "FiraSans-regular",
            color: color ? color : theme.palette.teritiaryColor.main,
            fontSize: "0.7rem",
          },
        }}
        sx={{
          "&.MuiFormControl-root": {
            height: "auto",
          },
          "& .MuiInputBase-root": {
            color: "#EEEEEE",
            boxShadow: "0 0 0 1.3px #F3F3F340",
            padding: padding || "7px 0px",
            height: height,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-input": {
            fontFamily: "FiraSans-medium !important",
          },
          "& .MuiInputBase-input::placeholder": {
            fontFamily: "Firasans-light",
          },
          margin: "10px 0px",
          height: height || "50px",
          borderRadius: "7px",
          "&.MuiFormHelperText-root": {
            fontSize: "10px",
          },
        }}
      />
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
        <Paper style={{ width: anchorRef.current?.offsetWidth || "100%" }}>
          {filteredOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleSelect(option)}>
              @{option}
            </MenuItem>
          ))}
        </Paper>
      </Popper>
    </div>
  );
};

export default GMentionDropdown;
