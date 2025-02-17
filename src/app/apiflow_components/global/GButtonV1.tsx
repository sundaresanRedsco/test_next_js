import { styled } from "@mui/system";
import { Button, useTheme } from "@mui/material";
import { hasPermission } from "../../Redux/permissionReducer/permissionsUtils";
import { useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { permissionReducer } from "../../Redux/permissionReducer/permissionReducer";

const StyledButton = styled(Button)`
  font-family: "FiraSans-regular" !important;
  font-size: 8px;
`;

interface GButtonProps {
  buttonType?: string;
  buttonShape?: string;
  color?: string;
  background?: string;
  label?: string | any;
  disabled?: boolean;
  dataTest?: string | undefined;
  type?: any;
  cursor?: string;
  radius?: string;
  fontSize?: string;
  width?: string;
  border?: string;
  borderColor?: string;
  fontWeight?: string;
  size?: "small" | "medium" | "large";
  padding?: string;
  onClickHandler?: any;
  minWidth?: string;
  marginLeft?: string;
  margin?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  module_name?: string;
  sub_module?: string;
  action?: string;
  isPermission?: boolean;
}

const GButton = (props: GButtonProps) => {
  const theme = useTheme();
  const {
    buttonType,
    buttonShape,
    color,
    background,
    label,
    disabled,
    dataTest,
    type,
    cursor,
    radius,
    fontSize,
    width,
    border,
    borderColor,
    fontWeight,
    size = "small",
    padding,
    minWidth,
    marginLeft,
    margin,
    startIcon,
    endIcon,
    onClickHandler = () => {},
    module_name = "",
    sub_module = "",
    action = "",
    isPermission = false,
  } = props;

  const Color =
    color ||
    (buttonType === "primary" || buttonType === "secondary"
      ? theme.palette.mainWhite.main
      : buttonType === "teritiary"
      ? theme.palette.v2SecondaryColor.main
      : buttonType == "Outlined"
      ? theme.palette.V2OutlinedButtonColor.main
      : theme.palette.v2PrimaryColor.main);

  const backgroundColor =
    background ||
    (buttonType === "primary"
      ? theme.palette.v2PrimaryColor.main
      : buttonType === "secondary"
      ? theme.palette.v2SecondaryColor.main
      : buttonType == "Outlined"
      ? "transparent"
      : "transparent");

  const BorderRadius =
    radius ||
    (buttonShape === "circular"
      ? "24px"
      : buttonShape === "rectangle"
      ? "5px"
      : "");

  const BorderColor =
    borderColor ||
    (buttonType === "teritiary"
      ? theme.palette.v2PrimaryColor.main
      : buttonType == "Outlined"
      ? theme.palette.V2OutlinedButtonColor.main
      : "");
  const { permissions } = useSelector<RootStateType, permissionReducer>(
    (state) => state.permission
  );

  const fullBorder = border || `1px solid ${BorderColor}`;
  const hasComPermission = isPermission
    ? hasPermission(permissions, module_name, sub_module, action)
    : true;

  return (
    <>
      {hasComPermission && (
        <Button
          sx={{
            "&.MuiButton-root": {
              color: Color,
              cursor: cursor,
              background: backgroundColor,
              borderRadius: BorderRadius,
              fontSize: fontSize || "8px",
              border: fullBorder,
              borderColor: BorderColor,
              fontWeight: fontWeight || 500,
              fontFamily: "FiraSans-regular !important",
              textTransform: "inherit",
              padding: padding || "1px",
              width: width || "auto",
              minWidth: minWidth,
              marginLeft: marginLeft,
              margin: margin,
              textAlign: "center",
            },
          }}
          type={type ? type : ""}
          data-test={dataTest}
          disabled={disabled}
          startIcon={startIcon}
          endIcon={endIcon}
          onClick={onClickHandler}
        >
          {label}
        </Button>
      )}
    </>
  );
};

export default GButton;
