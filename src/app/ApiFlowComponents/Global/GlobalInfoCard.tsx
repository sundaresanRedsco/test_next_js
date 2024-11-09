import React from "react";
import { Typography, Box, useTheme, styled } from "@mui/material";
import ArrorwV2 from "../../Assests/icons/upArrow.svg";

export interface GlobalInfoCardProps {
  title: string;
  ip: string;
  description: string;
  apiCount: any;
  cardData: any;
  errorMsg: any;
}

const CardTypography = styled(Typography)`
  font-family: Inter-Semi-Bold !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.8rem;
`;

const GlobalInfoCard: React.FC<GlobalInfoCardProps> = ({
  title,
  ip,
  description,
  apiCount,
  errorMsg,
  cardData,
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      style={{
        fontFamily: "Inter-Semi-Bold !important",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="3.2rem"
        height="3rem"
        borderRadius="20%"
        bgcolor="#27c1dc"
        marginRight="1rem"
      >
        <CardTypography
          variant="h6"
          style={{ fontSize: "0.5rem", color: "#ffffff" }}
        >
          {cardData}
        </CardTypography>
      </Box>
      <Box
        style={{
          color: theme.palette.V2TextColor.main,
        }}
      >
        <CardTypography
          variant="subtitle2"
          fontWeight="bold"
          style={{
            fontSize: "0.7rem",
          }}
        >
          {title}
        </CardTypography>
        <CardTypography
          variant="h6"
          fontWeight="bold"
          style={{
            fontFamily: "Inter-Semi-Bold",
          }}
        ></CardTypography>

        <span style={{ fontSize: "0.8rem", fontWeight: "600" }}>{ip}</span>
        <ArrorwV2 style={{ height: "10px", margin: "0px 4px" }} />

        <span
          style={{
            fontSize: "0.5rem",
            fontWeight: "600",
            fontFamily: "Inter-Semi-Bold",
          }}
        >
          {description} in {apiCount}{" "}
          <span
            style={{
              fontSize: "0.5rem",
              fontWeight: "600",
              color: "red",
              fontFamily: "Inter-Semi-Bold !important",
            }}
          >
            {errorMsg}
          </span>
        </span>
      </Box>
    </Box>
  );
};

export default GlobalInfoCard;
