import { Box, Stack, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import PinV2 from "../../Assests/icons/pinNew.svg";
import MaximizeV2 from "../../Assests/icons/maximize-image.svg";
import CloseV2 from "../../Assests/icons/noun-close.svg";

import { formatToTitleCase } from "../../Helpers/helpersFunctions";

const SeactionHeader = styled(Box)`
  background: ${({ theme }) => theme.palette.V2GlobalHeaderBackground.main};
  // background: white;
  color: ${({ theme }) => theme.palette.V2GlobalHeaderColor.main};
  padding: 6px 8px;
  margin-top: 1rem;
  font-family: Inter-Medium !important;
`;

const HeadingTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.v2WhiteColour.main};
  font-size: 0.7rem;
  margin: 0px;
`;

function GlobalHeader(props: any) {
  const { id, label, subLabel, onCloseHandler } = props;
  const theme = useTheme();
  return (
    <div>
      <div>
        <SeactionHeader
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <HeadingTypography
            style={{
              fontWeight: subLabel ? "500" : "",
            }}
          >
            {label || formatToTitleCase(id)}
            {subLabel && (
              <HeadingTypography
                className="mx-3"
                style={{
                  display: "inline-block",
                  fontWeight: "700",
                }}
              >
                {subLabel}
              </HeadingTypography>
            )}
          </HeadingTypography>

          <div>
            <Stack direction={"row"} spacing={2}>
              <PinV2 style={{ height: "15px", cursor: "pointer" }} />
              <MaximizeV2 style={{ height: "15px", cursor: "pointer" }} />
              <CloseV2
                style={{ height: "15px", cursor: "pointer" }}
                onClick={() => {
                  onCloseHandler(id);
                }}
              />
            </Stack>
          </div>
        </SeactionHeader>
      </div>
    </div>
  );
}

export default GlobalHeader;
