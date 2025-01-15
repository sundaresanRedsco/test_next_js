import { Box, styled } from "@mui/system";
import { TextareaAutosize, Typography } from "@mui/material";

export const HeadingTypography = styled(Typography)`
  font-family: "FiraSans-regular";
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
  wordwrap: break-word;
`;
export const PrimaryTypography = styled(Typography)`
  font-family: "FiraSans-regular";
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  wordwrap: break-word;
`;

export const SecondaryTypography = styled(Typography)`
  font-family: "FiraSans-regular";
  color: #ffffff;
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
  color: #ffffff;
  border: 1.5px solid #f3f3f340;
`;

export const CardContainer = styled(Box)`
  box-sizing: border-box;
  left: 0px;
  top: 0px;
  margin: 25px 15px 10px 0px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  background: rgba(18, 18, 18, 0.5);
`;

export const operationSecrityLevelData = [
  "Authenticated App Users",
  "Anonymous App Users",
  "Public(All Users)",
  "Private(Internal Server only)",
];

export const btnVal = ["Input Parameters", "Output Parameters"];
