import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { formatToTitleCase } from "../../Helpers/helpersFunctions";

const SeactionHeader = styled(Box)`
  background: ${({ theme }) => theme.palette.v2PrimaryColor.main};
  // background: white;
  color: ${({ theme }) => theme.palette.v2WhiteColour.main};
  padding: 6px 8px;
  margin-top: 1rem;
  font-family: Inter-Regular !important;
`;

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  // padding: 10px 25px;
`;

const HeadingTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.v2WhiteColour.main};
  font-size: 0.7rem;
  margin: 0px;
`;

function GlobalSection(props: any) {
  const {
    id,
    CardComponent,
    ProjectComponent,
    IntegrationComponent,
    onCloseHandler,
  } = props;
  return (
    <div>
      <div>
        <SeactionHeader
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <HeadingTypography>{formatToTitleCase(id)} </HeadingTypography>

          <div>
            <Stack direction={"row"} spacing={2}>
              {/* <PinV2 style={{ height: "15px", cursor: "pointer" }} />
              <MaximizeV2 style={{ height: "15px", cursor: "pointer" }} />
              <CloseV2
                style={{ height: "15px", cursor: "pointer" }}
                onClick={() => {
                  onCloseHandler(id);
                }}
              /> */}
            </Stack>
          </div>
        </SeactionHeader>

        <CardContainer
          style={{
            backgroundColor:
              (ProjectComponent || IntegrationComponent) && "#FFFFFF",
            padding: (ProjectComponent || IntegrationComponent) && "10px 0px",
          }}
        >
          {CardComponent}
        </CardContainer>
      </div>
    </div>
  );
}

export default GlobalSection;
