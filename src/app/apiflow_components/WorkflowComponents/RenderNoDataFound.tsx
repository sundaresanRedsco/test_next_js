import { SecondaryTypography } from "@/app/Styles/signInUp";
import theme from "@/Theme/theme";

export const RenderNoDataFound = () => (
  <SecondaryTypography
    style={{
      margin: "10px",
      fontSize: "12px",
      fontWeight: 900,
      color: theme.palette.teritiaryColor.main,
    }}
  >
    No data found
  </SecondaryTypography>
);
