import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import GlobalButton from "./GlobalButton";

const PrimaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.primaryText.main};
  font-size: 0.8rem;
`;

const SecondaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.primaryText.main};
  font-size: 0.55rem;
  font-weight: 600;
`;

const CardContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

function GlobalCard(props: any) {
  const { CardList } = props;
  return (
    <div>
      <Grid
        container
        spacing={1}
        style={{ display: "flex", alignItems: "stretch" }}
      >
        {CardList.map((policy: any, index: number) => (
          <Grid
            item
            xl={3}
            xs={12}
            sm={12}
            lg={4}
            md={4}
            key={index}
            style={{ display: "flex" }}
          >
            <Card
              variant="outlined"
              style={{
                flex: 1,
                margin: "20px 10px",
                padding: "10px",
                backgroundColor: "#FFFFFF",
                border: "none",
              }}
            >
              <CardContentWrapper>
                <div style={{ margin: "0px 10px" }}>
                  <div style={{ padding: "5px 0px" }}>
                    <PrimaryTypography style={{ fontWeight: 600 }}>
                      {policy?.name}
                    </PrimaryTypography>
                    <SecondaryTypography style={{ fontSize: "0.5rem" }}>
                      {policy?.subtext}
                    </SecondaryTypography>
                  </div>
                  <div style={{ marginLeft: "1.5rem" }}>
                    <SecondaryTypography style={{ fontSize: "0.5rem" }}>
                      {policy?.subPoints1 || <>&nbsp;</>}
                      <div> {policy?.subPoints2 || <>&nbsp;</>}</div>
                      <div> {policy?.subPoints3 || <>&nbsp;</>}</div>
                    </SecondaryTypography>
                  </div>
                </div>

                <div style={{ marginTop: "0.3rem" }}>
                  <GlobalButton
                    background="#282F79"
                    color="#FFFFFF"
                    fontSize="0.6rem"
                    padding="7px"
                    borderRadius="8px"
                    label={policy?.buttonText}
                    width="100%"
                    onClickHandler={() => {
                      policy.onClick();
                    }}
                  />
                </div>
              </CardContentWrapper>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default GlobalCard;
