import {
  Grid,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import SignInImage from "../../Assests/images/signin.png";

import { ApiFlowLogo } from "../../Assests/icons";
import {
  Link,
  Navigate,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import theme from "../../../Theme/theme";
import GInput from "../../Components/Global/GInput";

import GButton from "../../Components/Global/GlobalButtons";
import { useEffect, useState } from "react";
import {
  LinkSignInUPTypography,
  PrimarySignInUPTypography,
  QuarternarySignInUPTypography,
  SecondarySignInUPTypography,
  SignOuterContainer,
  TertiarySignInUPTypography,
} from "../../Styles/signInUp";
import {
  FORGET_PASSWORD_OTP_VERIFICATION_PATH,
  FORGET_PASSWORD_PATH,
  INDEX_PATH,
  PRICING_PATH,
  SIGNINUP_COMPANY_PATH,
  SIGNINUP_OTP_VERIFICATION_PATH,
  SIGNINUP_PATH,
  SIGNINUP_VERIFY_PATH,
  SIGNUP_PATH,
} from "../../Utilities/pathConstants";
import RadioCheckboxComponent from "../../Components/Global/radioCheckboxComponent";
import toast from "react-hot-toast";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  emailPattern,
  mobilePattern,
  passwordPattern,
  websitePattern,
} from "../../Utilities/regex";
import {
  getCookies,
  setCookies,
  translate,
} from "../../Helpers/helpersFunctions";
import { useDispatch, useSelector } from "react-redux";
import { LoginReducer, login } from "../../Redux/loginReducer";
import {
  CommonReducer,
  ForgetPasswordOTPverification,
  SendEmailOTPPassword,
} from "../../Redux/commonReducer";
import { RootStateType } from "../../Redux/store";
import GLobalLoader from "../../Components/Global/GlobalLoader";
import {
  SignupReducer,
  memberInviteActivation,
  signupOrganization,
} from "../../Redux/signupReducer";

import Cookies from "js-cookie";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import Image from "next/image";

function VerifiedForm() {
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { loading } = useSelector<RootStateType, SignupReducer>(
    (state) => state.signup
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  function teamMemberActivation() {
    let updatedData = getCookies("ack");

    dispatch(memberInviteActivation(updatedData))
      .unwrap()
      .then((res: any) => {
        console.log(res, "res");
        // toast.success("Company Registration successfull");
        if (res.status === "NEW_REGISTERED_USER") {
          setCookies(
            "MID",
            res?.memberInviteId || "",
            userProfile?.user?.expiration_time
          );
          navigate(SIGNINUP_PATH + SIGNUP_PATH);
        } else {
          toast.success("Invitation Accepted Successfully");
          navigate(SIGNINUP_PATH);
        }
        Cookies.remove("ack");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  }

  useEffect(() => {
    // Extracting the "key" parameter from the URL
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams, "test");
    const keyParam = searchParams.get("k") || "";

    setCookies("ack", keyParam, userProfile?.user?.expiration_time);

    // Now you can use the "key" value as needed
    console.log("Key from URL:", keyParam);
    console.log("Raw search string:", location.search);
  }, [location.search]);

  return (
    <section className="verified">
      {loading && <GlobalLoader />}
      <Box sx={{ height: "95vh", display: "flex", alignItems: "center" }}>
        <Box component="section" sx={{ width: "100%" }}>
          <div style={{ height: "70vh" }}>
            <Box sx={{ textAlign: "center" }}>
              <ApiFlowLogo style={{ width: "150px", height: "150px" }} />
            </Box>
            <PrimarySignInUPTypography
              sx={{ fontWeight: "600", textAlign: "center" }}
            >
              ApiFlow
            </PrimarySignInUPTypography>
            <PrimarySignInUPTypography className="mt-3">
              Click the link below to accept the team invitation{" "}
              <span style={{ fontWeight: "600" }}>successfully.</span> <br />{" "}
              You will find more details directly on the platform.
            </PrimarySignInUPTypography>
            <div className="text-end my-2 ">
              <GButton
                buttonType="primary"
                dataTest={"sign-up-company-button"}
                label={"Proceed"}
                width="100%"
                padding={"8px"}
                onClickHandler={teamMemberActivation}
              />
            </div>
          </div>

          <SecondarySignInUPTypography
            variant="subtitle2"
            className="text-center"
          >
            Thank You for choosing ApiFlow
          </SecondarySignInUPTypography>
        </Box>
      </Box>
    </section>
  );
}

export default function Activation() {
  return (
    <section>
      <SignOuterContainer>
        <Box sx={{ width: "75%" }}>
          <Grid container>
            <Grid
              xs={7}
              className="d-flex align-items-center justify-content-center px-2"
            >
              {/* <img
                src={SignInImage}
                alt="signInUp-Image"
                className="img-fluid"
              /> */}
              <Image
                src={SignInImage}
                alt="signInUp-Image"
                className="img-fluid"
              />
            </Grid>
            <Grid xs={5}>
              <VerifiedForm />
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
