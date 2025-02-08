import { styled } from "@mui/system";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { StepperIcon } from "../sign/SignUPStepper";

const StyledButton = styled(Button)`
  font-size: 14px;
  background: ${({ theme }) => theme.palette.v2SectionColour.main};
  color: ${({ theme }) => theme.palette.v2WhiteColour.main};
  font-family: FiraSans-regular;
`;

export interface GlobalButtonProps {
  buttonType?: string | "primary" | "tertiary" | "secondary";
  fontSize?: any;
  dataTest?: string | undefined;
  type?: any;
  label?: string | any;
  color?: string;
  background?: string;
  width?: any;
  radius?: string;
  border?: string;
  borderColor?: string;
  outline?: string;
  margin?: string;
  marginRight?: string;
  borderRadius?: string;
  marginLeft?: string;
  padding?: any;
  fontWeight?: number | string;
  icon?: React.ReactNode; // Icon component to be included
  iconPosition?: "start" | "end";
  cursor?: string;
  fontFamily?: any;
  onClickHandler?: any;
  disabled?: boolean;
  isSelected?: boolean;
  sx?: SxProps<Theme>;
  className?: string;
}

export default function GlobalButton(props: GlobalButtonProps) {
  const {
    buttonType,
    fontSize,
    dataTest,
    type,
    label,
    color,
    background,
    width,
    radius,
    border,
    borderColor,
    outline,
    margin,
    marginLeft,
    marginRight,
    borderRadius,
    padding,
    fontWeight,
    icon,
    iconPosition = "start",
    cursor,
    disabled,
    fontFamily,
    onClickHandler = () => {},
    className,
    isSelected,
    // onClickHandler,
    sx,
  } = props;

  const theme = useTheme(); // Access the current theme

  const Color =
    color ||
    (buttonType === "primary"
      ? "#FFFFFF"
      : buttonType === "secondary"
      ? theme.palette.primaryBlack.main
      : buttonType === "tertiary"
      ? theme.palette.cardInfoBody.main
      : theme.palette.teritiaryColor.main);

  const backgroundColor =
    background ||
    (buttonType === "primary"
      ? "#7A43FE"
      : buttonType === "secondary"
      ? theme.palette.btnCancelGrey.main
      : buttonType === "tertiary"
      ? theme.palette.teritiaryColor.main
      : theme.palette.teritiaryColor.main);
  return (
    <StyledButton
      sx={{
        "&.MuiButton-root": {
          transition: ".5s",
          color: Color,
          cursor: cursor,
          background: backgroundColor,
          // fontSize:   "0.7rem",
          fontSize: fontSize || "0.7rem",
          borderRadius: radius || "7px",
          width: width,
          border:
            border || (buttonType === "tertiary" ? "1.2px solid" : "none"),
          borderColor:
            borderColor ||
            (buttonType === "tertiary" ? theme.palette.primaryBody.main : ""),
          margin: margin || "10px 0px",
          marginLeft: marginLeft || "0px",
          marginRight: marginRight || "0px",
          // borderRadius: borderRadius || "0px",
          padding: padding || "3px 8px",
          fontWeight: fontWeight || 400,
          outline:
            buttonType === "tertiary"
              ? `2px solid ${theme.palette.linkColor.main}`
              : outline,
          textTransform: "inherit",
          fontFamily: fontFamily ? fontFamily : "FiraSans-regular",
          "@media (min-width: 2120px)": {
            padding:
              className == "bigButton" ? "20px 60px !important" : "15px 60px ",
            fontSize: className == "authBtn" ? "20px" : "25px",
            borderRadius: className == "bigButton" ? "15px" : "12px",
          },
        },
        "&.MuiButton-root.Mui-disabled": {
          color: "gray",
          border: background != "none" ? "1.5px solid gray" : "",
        },
        ...sx,
      }}
      data-test={dataTest}
      type={type ? type : ""}
      disabled={disabled}
      onClick={onClickHandler}
      // startIcon={
      //   icon &&
      //   iconPosition === "start" && (
      //     <Box sx={{ fill: Color, color: Color }}>{icon}</Box>
      //   )
      // }
    >
      {isSelected && (
        <Box sx={{ position: "absolute", left: -7 }}>
          <StepperIcon isCompleted={true} sx={{ borderRadius: "3px" }} />
        </Box>
      )}
      {icon && iconPosition === "start" && (
        <IconButton
          className="p-0 me-1"
          sx={{ fill: Color, color: Color, cursor: cursor }}
        >
          {icon}
        </IconButton>
      )}
      {label}
      {icon && iconPosition === "end" && (
        <IconButton
          className="p-0 ms-1"
          sx={{ fill: Color, color: Color, cursor: cursor }}
        >
          {icon}
        </IconButton>
      )}
    </StyledButton>
  );
}
