import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const ManageTeamsHeading = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 1.2rem;
`;

const ManageTeamsText = styled(Typography)`
color: ${({ theme }) => theme.palette.primaryBlack.main};
font-family: Inter-Regular;
font-style: normal;
font-weight: 300;
line-height: normal;
fontSize: 1.2rem";
margin-bottom: 14px;
color: gray;
font-size: 0.8rem;
`;

const ManageTeamsTableHeading = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 2rem;
  margin-top: 0.8rem;
  color: gray;
  font-size: 0.8rem;
`;

const TeamMembersAddFile = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  margin-top: 0.3rem;
`;

const ManageTeamsNoData = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const TeamDiscoveryText = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.8rem;
`;

const TeamDiscoveryHeading = styled(Typography)`
color: ${({ theme }) => theme.palette.signInUpBlack.main};
font-family: Inter-Regular;
font-style: normal;
font-weight: 300;
line-height: normal;
fontsize: 0.5rem
margin-bottom: 10px
`;

export const TeamProfileHeading = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const MembersText = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.8rem;
`;
const AcceptedText = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.8rem;
  color: green;
`;

const RolesHeading = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const RolesText = styled(Typography)`
  color: ${({ theme }) => theme.palette.signInUpBlack.main};
  font-family: Inter-Regular;
  font-style: normal;
  line-height: normal;
  font-size: 0.8rem;
`;
