import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  MenuItem,
  InputAdornment,
  Box,
  FormHelperText,
} from "@mui/material";
import { KeyboardArrowDownRounded } from "@mui/icons-material";
import theme from "@/Theme/theme";
import GSkeletonLoader from "@/app/ApiFlowComponents/Global/GSkeletonLoader";
import useScrollRef from "@/app/hooks/useScrollRef";
type Props = {
  fullWidth?: boolean;
  width?: any;
  height?: any;
  borderHeight?: any;
  size?: any;
  color?: any;
  fontSize?: any;
  fontWeight?: any;
  borderColor?: any;
  radius?: any;
  label?: any;
  labelShrink?: any;
  variant?: any;
  disabled?: boolean;
  options?: any;
  iconPosition?: any;
  icon?: any;
  value?: any;
  defaultValue?: any;
  border?: any;
  error?: any;
  helperText?: any;
  onChange?: any;
  name?: any;
  borderRadius?: any;
  background?: any;
  customStyle?: any;
  padding?: any;
  additionalMenuItemsStyle?: any;
  totalCount?: any;
  fetchData?: any;
  isMenuItemsLoading?: any;
  setisMenuItemsLoading?: any;
  sx?: any;
};
export default function GSelect(props: Props) {
  const {
    fullWidth,
    width,
    height,
    radius,
    size,
    color,
    fontSize,
    fontWeight,
    borderColor,
    label,
    variant,
    disabled,
    options,
    iconPosition,
    icon,
    value,
    defaultValue,
    border,
    error,
    helperText,
    onChange,
    name,
    borderRadius,
    background,
    customStyle,
    padding,
    additionalMenuItemsStyle,
    fetchData,
    totalCount,
    isMenuItemsLoading,
    setisMenuItemsLoading,
    sx,
  } = props;
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value;
    console.log("Selected Value:", selectedValue);

    if (onChange) {
      onChange(selectedValue, event);
    }
  };
  const containerRef = useRef<any>();
  // const { handleScroll, offsetVal } = useScrollRef(containerRef);
  const [offsetVal, setoffsetVal] = useState(0);
  const selectMenuRef = useRef<any>();

  const handleScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      if (bottom <= window.innerHeight) {
        setoffsetVal((prev) => prev + 5);
      }
    }
  };

  useEffect(() => {
    if (offsetVal <= totalCount && !isMenuItemsLoading) {
      setisMenuItemsLoading(true);
      fetchData(offsetVal);
    }
  }, [offsetVal]);
  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      if (selectMenuRef.current) {
        selectMenuRef.current.addEventListener("scroll", handleScroll);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (selectMenuRef.current) {
        selectMenuRef.current.removeEventListener("scroll", handleScroll);
      }
      observer.disconnect();
    };
  }, []);
  const isHeightIncrease = !isMenuItemsLoading && offsetVal < totalCount;

  return (
    <Box
      sx={{
        width: width,
        ...sx,
      }}
    >
      <TextField
        // ref={selectMenuRef}
        name={name}
        fullWidth={fullWidth}
        size={size}
        select
        id={label}
        label={label}
        defaultValue={defaultValue}
        onChange={handleSelectChange}
        SelectProps={{
          IconComponent: () => null, // Remove the default dropdown icon
        }}
        sx={{
          ...sx,
          width: width,
          background: background || "transparent",
          "& .MuiInputBase-root": {
            // border: border || "1.5px solid #F3F3F340",
            height: height,
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            boxShadow: border ? border : "0 0 0 1.3px #F3F3F340",
            "@media (min-width: 2120px)": {
              height: "80px",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          borderColor: borderColor || "#F3F3F340",
          borderRadius: borderRadius || "7px",
          "& .MuiOutlinedInput-notchedOutline:hover": {
            borderColor: borderColor || "#F3F3F340",
          },
          "& .MuiSelect-select.MuiSelect-select": {
            fontFamily: "FiraSans-medium",
            color: color || "white",
            fontSize: fontSize || "0.8rem",
            fontWeight: fontWeight,
            height: "100%",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            padding: padding || "",
            "@media (min-width: 2120px)": {
              height: "80px",
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "FiraSans-regular",
            color: color || "white",
            fontSize: fontSize || "0.8rem",
            fontWeight: fontWeight,
          },
          "& .MuiSvgIcon-root": {
            color: color || "white",
          },
          "& .MuiSelect-icon": {
            display: "none",
          },
          ...customStyle,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* <GBadge badgeContent={teamsCount} color="#FE6565" position="left"> */}
              <KeyboardArrowDownRounded
                style={{
                  fontSize: "20px",
                  fontFamily: "FiraSans-Regular ! important",
                  fill: theme.palette.sidebarWorkspaceColor.main,
                }}
              />
              {/* </GBadge> */}
            </InputAdornment>
          ),
          sx: {
            fontFamily: "FiraSans-regular",
            color: color,
            fontSize: fontSize || "0.8rem",
            fontWeight: fontWeight,
            borderRadius: radius || "5px",
            cursor: "pointer",
            "@media (min-width: 2120px)": {
              borderRadius: "13px",
            },
          },
          startAdornment: iconPosition === "start" && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
        slotProps={{
          select: {
            MenuProps: {
              PaperProps: {
                sx: {
                  fontFamily: "FiraSans-Regular ! important",
                  backgroundColor: "#211c27",
                  // "& .MuiMenuItem-root": {
                  //   // backgroundColor: "red",
                  //   "&:hover": {
                  //     backgroundColor: "yourItemHoverColor",
                  //   },
                  // },
                  color: "white",
                  ...additionalMenuItemsStyle,
                },
                ref: selectMenuRef,
              },
            },
          },
        }}
        disabled={disabled}
        value={value}
        error={error}
      >
        {options?.map((option: any) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option?.disabled}
            sx={{
              cursor: option?.disabled ? "not-allowed" : "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
        {isMenuItemsLoading &&
          [1, 2, 3, 4].map((elem, index) => {
            return (
              <MenuItem
                key={index}
                sx={{
                  marginBottom: elem == 4 ? "5px" : "20px",
                  marginTop: elem == 1 ? "5px" : 0,
                }}
              >
                <GSkeletonLoader secondary={true} open={true} width="90%" />
              </MenuItem>
            );
          })}

        <div
          ref={containerRef}
          style={{
            height: isHeightIncrease ? "50px" : 0,
          }}
        ></div>
      </TextField>
      {helperText && (
        <FormHelperText
          sx={{ fontSize: "0.6rem", margin: "4px", color: "#d32f2f" }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
