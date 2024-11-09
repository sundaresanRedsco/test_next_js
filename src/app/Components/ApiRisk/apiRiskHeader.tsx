import React from "react";
import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import theme from "../../../Theme/theme";

const HeaderTextTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryText.main};
  font-family: Inter-Regular;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 10px;
`;

export default function ApiRiskHeader(props: any) {
  const { label, icon } = props;

  return (
    <div>
      <section className="apiRiskheader">
        <Box
          sx={{
            background: theme.palette.primaryWhite.main,
            width: "100%",
            height: "50px",
            marginBottom: "10px",
            padding: "5px",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <span
              style={{
                fontSize: "20px",
                marginRight: "5px",
                fontWeight: 900,
              }}
            >
              {icon}
            </span>
            <HeaderTextTypography
              className="d-inline"
              sx={{ fontSize: "13px", fontWeight: "600" }}
            >
              {label}
            </HeaderTextTypography>
          </Box>
        </Box>
      </section>
    </div>
  );
}
