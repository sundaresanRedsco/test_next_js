import { Grid, Typography, Box, Divider, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { FreePlanIcon, TickIcon } from "../../Assests/icons";
import {
  HeadingTypography,
  LinkTypography,
  PrimarySignInUPTypography,
  PrimaryTypography,
  QuarternarySignInUPTypography,
  SecondarySignInUPTypography,
  SecondaryTypography,
} from "../../Styles/signInUp";
import theme from "../../../Theme/theme";
import GButton from "../Global/GlobalButtons";
import { translate } from "../../Helpers/helpersFunctions";

const PricingCardCon = styled("div")`
  background: ${({ theme }) => theme.palette.signInUpWhite.main};
  border-radius: 5px;
  position: relative;
  padding: 1rem;
  height: 400px;
  width: 230px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    height: 400px;
    width: 210px;
    padding: 0.5rem;
  }
  @media (max-width: 1000px) {
    height: 400px;
    width: 185px;
  }

  @media (max-width: 900px) {
    height: 400px;
    width: 280px;
    padding: 0.5rem;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default function PricingCard(props: any) {
  const { icon, name, price, featuresList, contact } = props;
  return (
    <PricingCardCon className="border">
      <div
        style={{
          flexGrow: "1",
        }}
      >
        <PrimaryTypography
          className="mb-2 d-flex align-items-center"
          sx={{
            color: theme.palette.signInUpBlack.main,
            fontWeight: "600",
          }}
        >
          <span className="me-2">{icon}</span>
          {name}
        </PrimaryTypography>
        <Divider />
        <PrimaryTypography
          className="py-1 px-1"
          sx={{
            color: theme.palette.signInUpBlack.main,
            fontWeight: "600",
          }}
        >
          <Box className="d-flex align-items-center">
            <PrimarySignInUPTypography variant="h4">
              <sup style={{ fontSize: "1rem", verticalAlign: "super" }}>
                {translate("pricing.DOLLAR")}
              </sup>
              {price}
            </PrimarySignInUPTypography>
            <Box className="mx-2">
              <QuarternarySignInUPTypography sx={{ fontSize: "0.6rem" }}>
                {translate("pricing.MONTH")}
              </QuarternarySignInUPTypography>
              <PrimarySignInUPTypography sx={{ fontSize: "0.6rem" }}>
                {translate("pricing.MEMBERS")}
              </PrimarySignInUPTypography>
            </Box>
          </Box>
        </PrimaryTypography>
        <Divider />
        <Box
          className="packageDetails"
          // sx={{
          //   height: 180,
          // }}
        >
          <Box className="ps-2">
            {featuresList.map((item: any, index: number) => (
              <PrimarySignInUPTypography
                key={index}
                sx={{
                  fontSize: "0.7rem",
                  marginTop: "5px",
                }}
              >
                <IconButton
                  sx={{
                    background: "#D1FAE5",
                    padding: "5px",
                    marginRight: "10px",
                    "& svg": {
                      width: "0.7rem",
                      height: "0.7rem",
                      fill: "#16A34A",
                    },
                  }}
                >
                  <TickIcon />
                </IconButton>

                {item}
              </PrimarySignInUPTypography>
            ))}
          </Box>
        </Box>
      </div>
      <Box className="text-end mt-1 px-2 pe-3">
        <GButton
          buttonType="primary"
          label={translate("pricing.COMPLETE_REGISTRATION")}
          radius={"0px"}
        />
      </Box>
    </PricingCardCon>
  );
}
