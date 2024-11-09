import { useMediaQuery, useTheme } from "@mui/material";

export default function useMuiBreakpoints() {
  const theme = useTheme();
  const isxs = useMediaQuery(theme.breakpoints.only("xs"));
  const issm = useMediaQuery(theme.breakpoints.only("sm"));
  const ismd = useMediaQuery(theme.breakpoints.only("md"));
  const isxl = useMediaQuery(theme.breakpoints.only("xl"));
  const islg = useMediaQuery(theme.breakpoints.only("lg"));
  return { isxs, issm, ismd, islg, isxl };
}
