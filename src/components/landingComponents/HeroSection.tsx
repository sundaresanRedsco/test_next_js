import React from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";
import {
  authButtonStyles,
  HeroSectionDescriptionTypography,
  HeroSectionTitleTypography,
} from "@/styles/landingPage";
import { CustomButton } from "./CustomButtons";
import { landingPageTranslate } from "@/helpers/helpersFunctions";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      sx={{
        width: "100%",
        marginTop: "90px",
        margin: { xs: "50px 10px", sm: "70px 10px", md: "80px 30px" },
      }}
    >
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ textAlign: { xs: "center", md: "left" } }}
      >
        <HeroSectionTitleTypography>
          {landingPageTranslate("DESC_1")}
        </HeroSectionTitleTypography>

        <HeroSectionDescriptionTypography>
          {landingPageTranslate("DESC_2")}
        </HeroSectionDescriptionTypography>

        <Box
          sx={{
            ...authButtonStyles,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 3 },
            justifyContent: { xs: "center", md: "flex-start" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <CustomButton />
        </Box>
      </Grid>
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "center" },
        }}
      >
        <Box
          component="img"
          src="/page/heroSection/Cone.png"
          alt="3D API Visualization"
          sx={{
            width: { xs: "40%", sm: "40%", md: "50%", lg: "60%" },
            height: "auto",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default HeroSection;
