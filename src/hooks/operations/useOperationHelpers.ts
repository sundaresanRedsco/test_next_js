import { Box, styled } from "@mui/system";
import { TextareaAutosize, Typography } from "@mui/material";
import theme from "@/Theme/theme";

export const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-regular";
  color: ${theme.palette.textPrimaryColor.main};
  font-weight: 700;
  font-size: 16px;
  wordwrap: break-word;
`;
export const PrimaryTypography = styled(Typography)`
  font-family: "FiraSans-regular";
  color: ${theme.palette.textPrimaryColor.main};
  font-weight: 600;
  font-size: 15px;
  wordwrap: break-word;
`;

export const SecondaryTypography = styled(Typography)`
  font-family: "FiraSans-regular";
  color: ${theme.palette.textPrimaryColor.main};
  font-weight: 600;
  font-size: 15px;
  wordwrap: break-word;
`;

export const TextOutlinedInput = styled(TextareaAutosize)`
  font-size: 0.7rem;
  font-weight: 500;
  line-height: 1.5;
  font-family: "FiraSans-regular";
  padding: 15px;
  background: transparent;
  border-radius: 10px;
  border: 1.5px solid ${theme.palette.textOutlinedBorderColor.main};
`;
// color: ${theme.palette.textPrimaryColor.main};

export const CardContainer = styled(Box)`
  box-sizing: border-box;
  left: 0px;
  top: 0px;
  margin: 25px 15px 10px 0px;
  border: 1px solid ${theme.palette.operationPageBorderColor.main};
  border-radius: 20px;
  background: ${theme.palette.apiInsightsBackgroundColor.main};
`;

export const operationSecrityLevelData = [
  "Authenticated App Users",
  "Anonymous App Users",
  "Public(All Users)",
  "Private(Internal Server only)",
];

export const btnVal = ["Input Parameters", "Output Parameters"];
