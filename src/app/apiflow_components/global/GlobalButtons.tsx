import { styled } from "@mui/system";
import { Box, Button, IconButton } from "@mui/material";
import theme from "../../../Theme/theme";

const StyledButton = styled(Button)`
  font-family: "Inter-Regular";
  font-size: 14px;
`;

interface GButtonProps {
  buttonType?: string;
  fontSize?: any;
  dataTest?: string | undefined;
  type?: any;
  label?: string | any;
  color?: string;
  background?: string;
  width?: string;
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
  onClickHandler?: any;
  disabled?: boolean;
  customStyle?: object;
  className?: string;
  variant?: any;
}

export default function GButton(props: GButtonProps) {
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
    onClickHandler = () => {},
    customStyle,
    className,
    variant,
  } = props;

  const Color =
    color ||
    (buttonType === "primary"
      ? theme.palette.primaryWhite.main
      : buttonType === "secondary"
      ? theme.palette.primaryBlack.main
      : buttonType === "tertiary"
      ? theme.palette.cardInfoBody.main
      : theme.palette.teritiaryColor.main);

  const backgroundColor = variant
    ? "transparent"
    : background ||
      (buttonType === "primary"
        ? theme.palette.primaryPurple.main
        : buttonType === "secondary"
        ? theme.palette.btnCancelGrey.main
        : buttonType === "tertiary"
        ? theme.palette.teritiaryColor.main
        : theme.palette.teritiaryColor.main);

  return (
    <StyledButton
      className={className}
      sx={{
        ...customStyle,
        "&.MuiButton-root": {
          color: Color,
          cursor: cursor,
          background: backgroundColor,

          fontSize: fontSize || "0.7rem",
          borderRadius: radius || "5px",
          width: width,
          border:
            border || (buttonType === "tertiary" ? "1.2px solid" : "none"),
          borderColor:
            borderColor ||
            (buttonType === "tertiary" ? theme.palette.primaryBody.main : ""),
          margin: margin || "10px 0px",
          marginLeft: marginLeft || "0px",
          marginRight: marginRight || "0px",

          padding: padding || "3px 8px",
          fontWeight: fontWeight || 400,
          outline:
            buttonType === "tertiary"
              ? `2px solid ${theme.palette.linkColor.main}`
              : outline,
          textTransform: "inherit",
          fontFamily: "FiraSans-regular",
          "@media (min-width: 2120px)": {
            padding:
              className == "bigButton" ? "20px 60px !important" : "15px 60px ",
            fontSize: "25px",
            borderRadius: className == "bigButton" ? "15px" : "12px",
          },
        },
      }}
      data-test={dataTest}
      type={type ? type : ""}
      disabled={disabled}
      onClick={onClickHandler}
      variant={variant}
    >
      {icon && iconPosition === "start" && (
        <Box className="p-0 me-1" sx={{ fill: Color, color: Color }}>
          {icon}
        </Box>
      )}
      {label}
      {icon && iconPosition === "end" && (
        <Box className="p-0 ms-1" sx={{ fill: Color, color: Color }}>
          {icon}
        </Box>
      )}
    </StyledButton>
  );
}
