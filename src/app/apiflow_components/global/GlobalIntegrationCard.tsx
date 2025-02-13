import React from "react";
import { Typography, Box } from "@mui/material";
import TickV2Icon from "@/app/Assests/icons/TickIcon.svg";
import { styled } from "@mui/system";
import {
  PrimaryTypography,
  SecondaryTypography,
} from "@/app/hooks/operations/useOperationHelpers";

const CardContainer = styled(Box)`
  padding: 10px 15px;
  border-radius: 10px;
  width: 100%;
`;

export interface GlobalInfoCardProps {
  title: string;
  secondaryTitle: string;
  cardData: any;
}

const GlobalIntegrationCard: React.FC<GlobalInfoCardProps> = ({
  title,
  secondaryTitle,
  cardData,
}) => {
  return (
    <CardContainer>
      <div className="d-flex justify-content-between">
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="3rem"
            height="3rem"
            borderRadius="20%"
            bgcolor="#FFFFFF"
            color="#FB7802"
            marginRight="1rem"
          >
            <PrimaryTypography
              style={{ fontSize: "0.7rem", fontWeight: "600" }}
            >
              {cardData}
            </PrimaryTypography>
          </Box>
          <Box>
            <PrimaryTypography>{title}</PrimaryTypography>
            <SecondaryTypography>{secondaryTitle}</SecondaryTypography>
          </Box>
        </Box>
        <TickV2Icon style={{ height: "45px", width: "20px" }} />
      </div>
    </CardContainer>
  );
};

export default GlobalIntegrationCard;
