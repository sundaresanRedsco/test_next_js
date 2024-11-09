import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

export const SettingsHeading = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 1rem;
  font-weight: 600;
`;

export const SettingsText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 8px;
`;

export const TwofactorOtpText = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.8rem;
  margin-bottom: 8px;
`;

export const SettingsTroubleQr = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.6rem;
  color: rgb(2, 101, 210);
  margin-top: 10px;
  margin-bottom: 10px;
`;
