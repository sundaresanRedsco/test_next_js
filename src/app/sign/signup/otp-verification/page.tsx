"use client";

import { Grid, Box } from "@mui/material";
// import SignInImage from "../Assests/images/signin.png";
import SignInImage from "../../../Assests/images/signin.webp";
import {
  PrimarySignInUPTypography,
  SignOuterContainer,
} from "../../../Styles/signInUp";

import { translate } from "../../../Helpers/helpersFunctions";
import { OtpVerification } from "../../../Pages/SignInUp/signInUpForm";

export default function OtpForm() {
  return (
    <section>
      <SignOuterContainer>
        <Box sx={{ width: "75%" }}>
          <Grid container>
            <Grid
              item
              xs={7}
              className="d-flex align-items-center justify-content-center"
            >
              {/* <img
                //   src={SignInImage}
                alt="signInUp-Image123"
                className="img-fluid"
              /> */}
              <Box sx={{ width: "100%", height: "100%" }}>
                <img
                  src={SignInImage.src}
                  alt="SignInUpImage"
                  style={{ width: "100%", height: "100%" }}
                  // loading="lazy"
                />
              </Box>
            </Grid>
            <Grid item xs={5}>
              <OtpVerification />

              <PrimarySignInUPTypography sx={{ fontSize: "0.6rem" }}>
                {translate("signInUp.FOOTER_MESSAGE")}
              </PrimarySignInUPTypography>
            </Grid>
          </Grid>
        </Box>
      </SignOuterContainer>
    </section>
  );
}
