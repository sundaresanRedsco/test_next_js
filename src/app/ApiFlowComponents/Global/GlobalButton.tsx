import { styled } from "@mui/system";
import { Button, IconButton, useTheme } from "@mui/material";

const StyledButton = styled(Button)`
  font-family: Inter-Regular !important;
  font-size: 14px;
  background: ${({ theme }) => theme.palette.v2SectionColour.main};
  color: ${({ theme }) => theme.palette.v2WhiteColour.main};
`;

export interface GlobalButtonProps {
  buttonType?: string;
  fontSize?: string;
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
  padding?: string;
  fontWeight?: number | string;
  icon?: React.ReactNode; // Icon component to be included
  iconPosition?: "start" | "end";
  cursor?: string;
  onClickHandler?: any;
  disabled?: boolean;
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
    onClickHandler = () => {},
    // onClickHandler,
  } = props;

  const theme = useTheme(); // Access the current theme

  const Color =
    color ||
    (buttonType === "primary"
      ? theme.palette.primaryWhite.main
      : buttonType === "secondary"
        ? theme.palette.primaryBlack.main
        : buttonType === "tertiary"
          ? theme.palette.cardInfoBody.main
          : theme.palette.teritiaryColor.main);

  const backgroundColor =
    background ||
    (buttonType === "primary"
      ? theme.palette.primaryPurple.main
      : buttonType === "secondary"
        ? theme.palette.btnCancelGrey.main
        : buttonType === "tertiary"
          ? theme.palette.teritiaryColor.main
          : theme.palette.teritiaryColor.main);

  return (
    <StyledButton
      sx={{
        "&.MuiButton-root": {
          color: Color,
          cursor: cursor,
          background: backgroundColor,
          // fontSize:   "0.7rem",
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
          // borderRadius: borderRadius || "0px",
          padding: padding || "3px 8px",
          fontWeight: fontWeight || 400,
          outline:
            buttonType === "tertiary"
              ? `2px solid ${theme.palette.linkColor.main}`
              : outline,
          textTransform: "inherit",
        },
      }}
      data-test={dataTest}
      type={type ? type : ""}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {icon && iconPosition === "start" && (
        <IconButton className="p-0 me-1" sx={{ fill: Color, color: Color }}>
          {icon}
        </IconButton>
      )}
      {label}
      {icon && iconPosition === "end" && (
        <IconButton className="p-0 ms-1" sx={{ fill: Color, color: Color }}>
          {icon}
        </IconButton>
      )}
    </StyledButton>
  );
}
