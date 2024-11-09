import React from "react";
import {
  PricingBox,
  // PricingCovImage,
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
  SignOuterContainer,
} from "../Styles/signInUp";
import { Box, Container, Grid, styled } from "@mui/material";
import {
  ApiFlowLogo,
  EnterPrisePlanIcon,
  StartPlanIcon,
  TeamPlanIcon,
} from "../Assests/icons";
import theme from "../../Theme/theme";
import PricingCard from "../Components/pircing/pircingCard";
import textConstants from "../Constants/textConstants.json";
import ApiImage from "../Assests/images/signin.png";
import { translate } from "../Helpers/helpersFunctions";

export default function Pricing() {
  const [pricingList, setPricingList] = React.useState([
    {
      icon: <StartPlanIcon />,
      name: "Starter",
      price: "0",
      featuresList: ["Feature 1", "Feature 1", "Feature 1"],
      contact: false,
      id: 0,
    },
    {
      icon: <TeamPlanIcon />,
      name: "Team",
      price: "0",
      featuresList: ["Feature 1", "Feature 1", "Feature 1"],
      contact: false,
      id: 1,
    },
    {
      icon: <EnterPrisePlanIcon />,
      name: "Enterprise",
      price: "0",
      featuresList: ["Feature 1", "Feature 1", "Feature 1"],
      contact: false,
      id: 2,
    },
  ]);
  return (
    <section className="pricing">
      <SignOuterContainer className="d-flex align-items-center justify-content-center">
        <Container>
          <PricingBox className="rounded">
            {/* <PricingCovImage src={ApiImage} alt="pricing-Image" /> */}
            <Box className="d-flex  align-items-center position-relative">
              <PrimarySignInUPTypography
                sx={{ fontWeight: "600", textAlign: "center" }}
              >
                <ApiFlowLogo />
                {translate("pricing.APIFLOW")}
              </PrimarySignInUPTypography>

              <SecondarySignInUPTypography
                variant="subtitle2"
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {translate("pricing.PRICING_MESSAGE")}
              </SecondarySignInUPTypography>
            </Box>
            <Grid container className="mt-4 mb-2 px-0">
              {pricingList.map((item: any, index: number) => (
                <Grid
                  sm={6}
                  md={4}
                  lg={4}
                  key={item.id}
                  className="d-flex justify-content-center"
                >
                  <PricingCard
                    icon={item.icon}
                    name={item.name}
                    price={item.price}
                    featuresList={item.featuresList}
                    contact={item.contact}
                  />
                </Grid>
              ))}
            </Grid>
          </PricingBox>
        </Container>
      </SignOuterContainer>
    </section>
  );
}
