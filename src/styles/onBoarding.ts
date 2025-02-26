import { Stack } from "@mui/material";
import { styled } from "@mui/system";

export const CenteredStack = styled(Stack)(({ theme }) => ({
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  textAlign: "center", // Center text within the stack
}));
