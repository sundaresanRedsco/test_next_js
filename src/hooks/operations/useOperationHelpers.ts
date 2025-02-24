import { Box, styled } from "@mui/system";
import { TextareaAutosize, Typography } from "@mui/material";

export const HeadingTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular",
  color: theme.palette.textPrimaryColor.main,
  fontWeight: 700,
  fontSize: "16px",
  wordWrap: "break-word",
}));

export const PrimaryTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular",
  color: theme.palette.textPrimaryColor.main,
  fontWeight: 600,
  fontSize: "15px",
  wordWrap: "break-word",
}));

export const SecondaryTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-regular",
  color: theme.palette.textPrimaryColor.main,
  fontWeight: 600,
  fontSize: "15px",
  wordWrap: "break-word",
}));

export const TextOutlinedInput = styled(TextareaAutosize)(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: 500,
  lineHeight: 1.5,
  fontFamily: "FiraSans-regular",
  padding: "15px",
  background: "transparent",
  borderRadius: "10px",
  border: `1.5px solid ${theme.palette.textOutlinedBorderColor.main}`,
}));

export const CardContainer = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  left: "0px",
  top: "0px",
  margin: "25px 15px 10px 0px",
  border: `1px solid ${theme.palette.operationPageBorderColor.main}`,
  borderRadius: "20px",
  background: theme.palette.apiInsightsBackgroundColor.main,
}));

export const operationSecrityLevelData = [
  "Authenticated App Users",
  "Anonymous App Users",
  "Public(All Users)",
  "Private(Internal Server only)",
];

export const btnVal = ["Input Parameters", "Output Parameters"];
