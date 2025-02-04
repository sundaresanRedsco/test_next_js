"use client";

import {
  Grid,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";
import SignInImage from "../../Assests/images/signin.png";

// import { ApiFlowLogo, EmailIcon, Logo } from "../../Assests/icons";
import ApiFlowLogo from "../../Assests/icons/apiflow.svg";
import EmailIcon from "../../Assests/icons/email_@.svg";
import Logo from "../../Assests/icons/apiflow 1.svg";

import {
  Navigate,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Link from "next/link";
import theme from "../../../Theme/theme";
import GInput from "../../Components/Global/GInput";

import GButton from "../../Components/Global/GlobalButtons";
import { useEffect, useState } from "react";
import {
  LinkSignInUPTypography,
  LoginLink,
  PrimarySignInUPTypography,
  PrimaryTypography,
  QuarternarySignInUPTypography,
  SecondarySignInUPTypography,
  SecondaryTypography,
  SignOuterContainer,
  SignupMicrosoft,
  TertiarySignInUPTypography,
} from "../../Styles/signInUp";
import {
  FORGET_PASSWORD_OTP_VERIFICATION_PATH,
  FORGET_PASSWORD_PATH,
  GATEWAY_FIRST_IMPORT_PATH,
  INDEX_PATH,
  PRICING_PATH,
  SIGNINUP_COMPANY_PATH,
  SIGNINUP_OTP_VERIFICATION_PATH,
  SIGNINUP_PATH,
  SIGNINUP_VERIFY_PATH,
  SIGNUP_PATH,
  TWO_FACTOR_ENABLE_OTP_VERIFICATION_PATH,
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
import { EncrouptionLogic, translate } from "../../Helpers/helpersFunctions";
import { useDispatch, useSelector } from "react-redux";
import { LoginReducer, TwoFactorLogin, login } from "../../Redux/loginReducer";
import {
  CommonReducer,
  ForgetPasswordOTPverification,
  SendEmailOTPPassword,
  initializeSession,
} from "../../Redux/commonReducer";
import microsoft from "../../Assests/images/microsoft1.png";
import Azure from "../../Assests/images/azure-logo.png";
import { RootStateType } from "../../Redux/store";
import GLobalLoader from "../../Components/Global/GlobalLoader";
import {
  SignupReducer,
  resendOtp,
  signupOrganization,
  signupUser,
  verifyOtp,
} from "../../Redux/signupReducer";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import { Microsoft } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { loginRequest } from "../../Services/azureServices";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { googleClientId, initSession } from "../../Services/auth";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter, usePathname } from "next/navigation"; // For Next.js 13+
import Image from "next/image";

interface loginInfoType {
  email: string;
  password: string;
  invitations_token: any;
}

export function LoginForm() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const pathName = usePathname();

  const { instance, accounts } = useMsal();
  const { loading } = useSelector<RootStateType, LoginReducer>(
    (state) => state.login
  );
  const [formData, setFormData] = useState<loginInfoType>({
    email: "",
    password: "",
    invitations_token: "null",
  });

  const [user, setUser] = useState<any>(null);
  const [errorEmail, setErrorMail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [checkBoxVal, setCheckBoxVal] = useState(false);

  let dev =
    "790333692787-pr3muri10h4quj2iqf9hlqi9olgerfck.apps.googleusercontent.com";
  let stage =
    "292411272101-9bpkf47ohttlift4u1n25tfk4e3u1fgp.apps.googleusercontent.com";

  const currentHost = typeof window !== "undefined" ? window.location.host : "";
  let CLIENT_ID = "";
  if (currentHost.includes("test-next-js-syuo.vercel")) {
    // Use production URL if host includes stage.apiflow.url
    CLIENT_ID = stage;
  } else {
    // Use default base URL
    CLIENT_ID = dev;
  }

  useEffect(() => {
    // Inject custom styles into the document head
    const style = document.createElement("style");
    style.innerHTML = `
        .nsm7Bb-HzV7m-LgbsSe {
          background-color: #d0dee71f !important; /* White background color */
          color: #000000 !important;           /* Black text color */
          border-radius: 5px !important;       /* Rounded corners */
          padding:10px !important;       /* Add padding */
        
          border: 1px solid #000000 !important; /* Black border */
          box-shadow: none !important;         /* Remove the shadow */
          font-size: 10px !important;          /* Font size */
          display: flex !important;
          
         
        }
  
        // .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
        //   margin-right: 8px !important;
        // }
  
        .nsm7Bb-HzV7m-LgbsSe:hover {
          background-color: #f0f0f0 !important; /* Light grey on hover */
        }
      `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when the component is unmounted
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSuccess = (response: any) => {
    console.log("Google ID Token:", response.credential);

    let token = response.credential;
    let email = "null";
    let password = "null";
    let token_type = "GOOGLE";
    let invitations_token = "null";

    dispatch(login({ email, password, token, token_type, invitations_token }))
      .unwrap()
      .then((res: any) => {
        console.log("loginRes: ", res);
        if (res?.user?.user_registered !== "EXISTING_USER") {
          Cookies.remove("MID");
          Cookies.set("ttid", res?.user?.tenant, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          Cookies.set("tt-email", res?.user?.email, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          Cookies.set("ov", "OVS", {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
        } else {
          router.push(
            `/userId/${res?.user?.user_id}/workspaceId/${res?.user?.workspace_id}`
          );

          //encrypt wsid
          const encryptedWsidId = EncrouptionLogic(res?.user?.workspace_id);

          Cookies.set(
            process.env.NEXT_PUBLIC_COOKIE_WSID || "",
            encryptedWsidId,
            {
              sameSite: "Strict", // Strict SameSite policy
              secure: true,
            }
          );
        }
      })
      .catch((err: any) => {
        setErrorMail(err?.message);
        setErrorPassword(err?.message);
      });

    console.log("loginRes after");
  };

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log them out
        // authService.logout();

        setUser(null);
      } else {
        instance
          .loginPopup(loginRequest)
          .then((response: any) => {
            // Handle the response if needed
            console.log(response, "response");

            console.log("Login successful:", response.idToken);
            let token = response.idToken;
            let email = "null";
            let password = "null";
            let token_type = "AZURE";
            let invitations_token = "null";
            dispatch(
              login({ email, password, token, token_type, invitations_token })
            )
              .unwrap()
              .then((res: any) => {
                if (res?.user?.user_registered !== "EXISTING_USER") {
                  Cookies.remove("MID");
                  Cookies.set("ttid", res?.user?.tenant, {
                    expires: 1,
                    sameSite: "Strict",
                    secure: true,
                  });
                  Cookies.set("tt-email", res?.user?.email, {
                    expires: 1,
                    sameSite: "Strict",
                    secure: true,
                  });
                  Cookies.set("ov", "OVS", {
                    expires: 1,
                    sameSite: "Strict",
                    secure: true,
                  });
                  router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
                } else {
                  router.push(
                    `/userId/${res?.user?.user_id}/workspaceId/${res?.user?.workspace_id}`
                  );

                  //encrypt wsid
                  const encryptedWsidId = EncrouptionLogic(
                    res?.user?.workspace_id
                  );

                  Cookies.set(
                    process.env.NEXT_PUBLIC_COOKIE_WSID || "",
                    encryptedWsidId,
                    {
                      sameSite: "Strict", // Strict SameSite policy
                      secure: true,
                    }
                  );
                }
              })
              .catch((err: any) => {
                setErrorMail(err?.message);
                setErrorPassword(err?.message);
              });
            // const refreshToken = account.idTokenClaims.ssoToken;
            // setUser(account);
            // console.log(account, "account");
            // console.log(tokenInfo, "Token");
            // console.log(refreshToken, "refreshToken");
          })
          .catch((e) => {
            console.log(e, "test");
          });
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedFormData = { ...formData, [field]: value };

    // If the email field is cleared, clear the password field as well
    if (field === "email" && value === "") {
      updatedFormData.password = "";
    }

    setFormData(updatedFormData);

    // Set error messages
    if (updatedFormData.email === "" && updatedFormData.password === "") {
      setErrorMail("Email is required");
      setErrorPassword("Password is required");
    } else {
      setErrorMail("");
      setErrorPassword("");
    }
  };

  function loginHandler() {
    const { email, password, invitations_token } = formData;

    if (!email && !password) {
      setErrorMail("Email is Required");
      setErrorPassword("Password is Required");
    } else if (!email) {
      setErrorMail("Email is required");
    } else if (!password) {
      setErrorPassword("Password is required");
    } else {
      setErrorMail("");
      setErrorPassword("");
      // let azure_token = "null";
      let token_type = "null";
      let token = "null";
      let invitations_token = "null";

      dispatch(login({ email, password, token_type, token, invitations_token }))
        .unwrap()
        .then((res: any) => {
          console.log("ResInLogin: ", res);

          if (res) {
            // Cookies.set("roleId", res?.user?.role_id, {
            //   sameSite: "Strict",
            //   secure: true,
            // });
            router.push(
              `/userId/${res?.user?.user_id}/workspaceId/${res?.user?.workspace_id}`
            );
            // if (pathName == "/sign") {
            //   return <GlobalLoader />;
            // } else {

            // }
          }

          // first login
          // if (res?.user?.first_login === true) {
          // navigate(GATEWAY_FIRST_IMPORT_PATH);

          // const encryptedWsidId = EncrouptionLogic(res?.user?.team_workspace_id );   //encrypt wsid

          // Cookies.set(
          //   process.env.NEXT_PUBLIC_COOKIE_WSID || "",
          //   encryptedWsidId,
          //   {
          //     sameSite: "Strict", // Strict SameSite policy
          //     secure: true,
          //   }
          // );

          // Cookies.set("TEAMWSID", res?.user?.team_workspace_id);

          // } else {

          router.push(
            `/userId/${res?.user?.user_id}/workspaceId/${res?.user?.workspace_id}`
          );

          const encryptedWsidId = EncrouptionLogic(res?.user?.workspace_id); //encrypt wsid

          Cookies.set(
            process.env.NEXT_PUBLIC_COOKIE_WSID || "",
            encryptedWsidId,
            {
              sameSite: "Strict", // Strict SameSite policy
              secure: true,
            }
          );

          // }
        })
        .catch((err: any) => {
          console.log(err, "LoginError");
          if (err?.message === "TWO FACTOR:Enable") {
            Cookies.set("2FE", email, {
              expires: 1,
              sameSite: "Strict",
              secure: true,
            });
            router.push("/sign" + TWO_FACTOR_ENABLE_OTP_VERIFICATION_PATH);
          }

          setErrorMail(err?.message);
          setErrorPassword(err?.message);
        });
    }
  }

  const handleRememberMe = (e: any) => {
    let checkBoxValue = e.target.checked;
    console.log(
      "CheckboxVal: ",
      checkBoxValue,
      formData?.email,
      formData?.password
    );
    setCheckBoxVal(checkBoxValue);
    if (checkBoxValue === false) {
      Cookies.set("LoginEmail", formData?.email, {
        sameSite: "Strict",
        secure: true,
      });
      Cookies.set("LoginPassword", formData?.password, {
        sameSite: "Strict",
        secure: true,
      });
      console.log("FormData: ", formData);
    } else {
      Cookies.remove("LoginEmail");
      Cookies.remove("LoginPassword");
    }
  };

  useEffect(() => {
    let loginEmail = Cookies.get("LoginEmail");
    let loginPassword = Cookies.get("LoginPassword");
    console.log("LoginDetails: ", loginEmail, loginPassword);
    if (loginEmail === undefined || loginPassword === undefined) {
      setCheckBoxVal(true);
    } else {
      setCheckBoxVal(false);
      setFormData({
        email: loginEmail,
        password: loginPassword,
        invitations_token: "null",
      });
    }
  }, []);

  useEffect(() => {
    // Check if the user is already authenticated
    // const checkAuthentication = async () => {
    //   try {
    //     const account = await authService.login();
    //     setUser(account);
    //     console.log(account ,"testUser")
    //   } catch (error) {
    //     console.error("Authentication failed:", error);
    //   }
    // };
    // checkAuthentication();
  }, []);

  return (
    <section className="login">
      {loading && <GLobalLoader />}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="section">
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            {/* <ApiFlowLogo /> */}
            {translate("signInUp.APIFLOW")}
          </PrimarySignInUPTypography>
          <div className="mt-3">
            <PrimarySignInUPTypography
              variant="h6"
              sx={{ fontWeight: "600", fontSize: "0.8rem" }}
            >
              {translate("signInUp.WELCOME_MESSAGE")}
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography
              variant="subtitle2"
              style={{ fontSize: "0.7rem", marginTop: "0.5rem" }}
            >
              {translate("signInUp.APIFLOW_HELPERTEXT")}
            </SecondarySignInUPTypography>
          </div>
          <div style={{ marginTop: "10px" }}>
            <SecondarySignInUPTypography
              sx={{ fontSize: "0.6rem", fontWeight: "200" }}
            >
              {translate("signInUp.EMAIL")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type="email"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder={translate("signInUp.EMAIL_PLACEHOLDER")}
                fontWeight={700}
                fontSize="0.6rem"
                radius="5px"
                labelShrink={true}
                dataTest={"email-input"}
                variant="outlined"
                value={formData?.email}
                error={errorEmail}
                helperText={errorEmail}
                errorHandler={(error: any) => setErrorMail(error)}
                onChangeHandler={(e: any) =>
                  handleInputChange("email", e.target.value)
                }
              />
            </div>

            <SecondarySignInUPTypography
              sx={{ fontSize: "0.6rem", fontWeight: "200" }}
            >
              {translate("signInUp.PASSWORD")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type={passwordVisibility === true ? "text" : "password"}
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder={translate("signInUp.PASSWORD_PLACEHOLDER")}
                fontWeight={700}
                fontSize="0.6rem"
                radius={"5px"}
                labelShrink={true}
                dataTest={"password-input"}
                variant="outlined"
                value={formData?.password}
                error={errorPassword}
                helperText={errorPassword}
                onChangeHandler={(e: any) =>
                  handleInputChange("password", e.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    {passwordVisibility === true ? (
                      // <VisibilityOffOutlinedIcon
                      //   style={{ cursor: "pointer", fontSize: "1rem" }}
                      //   onClick={() =>
                      //     setPasswordVisibility(!passwordVisibility)
                      //   }
                      // />
                      <></>
                    ) : (
                      // <VisibilityOutlinedIcon
                      //   style={{ cursor: "pointer", fontSize: "1rem" }}
                      //   onClick={() =>
                      //     setPasswordVisibility(!passwordVisibility)
                      //   }
                      // />
                      <></>
                    )}
                  </InputAdornment>
                }
              />
            </div>

            <div className="d-flex justify-content-between">
              <TertiarySignInUPTypography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                <RadioCheckboxComponent
                  checked={checkBoxVal}
                  buttonWidth="15px"
                  buttonColor="green"
                  icon={<CheckCircleIcon />}
                  dataTest={"remember-me-checkbox"}
                  // checkedIcon={<RadioButtonUncheckedIcon />}
                  onChange={handleRememberMe}
                />
                <span style={{ marginLeft: "-18px", fontSize: "0.6rem" }}>
                  {translate("signInUp.REMEMBER_ME")}
                </span>
              </TertiarySignInUPTypography>
              <Link
                href={SIGNINUP_PATH + FORGET_PASSWORD_PATH}
                className="text-decoration-none"
              >
                <QuarternarySignInUPTypography
                  sx={{
                    cursor: "pointer",
                    fontSize: "0.6rem",
                    fontWeight: "600",
                  }}
                >
                  {translate("signInUp.FORGOT_PASSWORD")}
                </QuarternarySignInUPTypography>
              </Link>
            </div>
            <div className="text-end">
              <GButton
                buttonType="primary"
                dataTest={"sign-in-button"}
                label={translate("signInUp.LOGIN_NOW")}
                width="100%"
                padding={"8px"}
                onClickHandler={() => {
                  loginHandler();
                }}
              />
            </div>

            <div>
              <Box className="d-flex justify-content-center align-items-center my-1">
                <Divider sx={{ width: "100px" }} />
                <QuarternarySignInUPTypography
                  sx={{
                    background: theme.palette.signInUpWhite.main,
                    fontSize: "0.6rem",
                    padding: "5px 10px",
                  }}
                  className="mx-2"
                >
                  {translate("signInUp.OR")}
                </QuarternarySignInUPTypography>
                <Divider sx={{ width: "100px" }} />
              </Box>

              <Box className="my-2 d-flex" sx={{ width: "100%" }}>
                <Button
                  style={{
                    textTransform: "none",
                    background: "transparent",
                    width: "49%",
                    marginRight: "1rem",
                  }}
                  variant="outlined"
                  // fullWidth
                  sx={{
                    borderColor: `${theme.palette.signInUpBlack.main}`,
                    color: `${theme.palette.signInUpBlack.main}`,
                    fontSize: "10px",
                    fontFamily: "Inter-Regular",
                  }}
                  onClick={() => handleAuthentication()}
                >
                  {/* <img
                    // src={Azure}
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginRight: "14px",
                    }}
                  ></img> */}
                  <Image
                    src={Azure}
                    alt=""
                    style={{
                      height: "1rem",
                      width: "1rem",
                      marginRight: "14px",
                    }}
                  />{" "}
                  <LoginLink href={""}>
                    {/* {translate("signInUp.LOGIN_MICROSOFT")} */}
                    Sign in with Azure
                  </LoginLink>
                </Button>

                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  {/* <GoogleOAuthProvider clientId={GOOGLE_AUTH_SECREAT_KEY}> */}

                  <div style={{ width: "50%" }}>
                    <GoogleLogin
                      onSuccess={handleSuccess} // Use the correct prop name
                      //   onError={handleError}
                    />
                  </div>
                </GoogleOAuthProvider>
              </Box>
            </div>

            <PrimarySignInUPTypography
              sx={{ fontSize: "0.6rem", marginTop: "1.5rem" }}
            >
              {translate("signInUp.LOGIN_TEXT1")}{" "}
              <LinkSignInUPTypography href="">
                {" "}
                {translate("signInUp.LOGIN_TEXT2")}{" "}
              </LinkSignInUPTypography>{" "}
              {translate("signInUp.LOGIN_TEXT3")}{" "}
              <LinkSignInUPTypography href="">
                {translate("signInUp.LOGIN_TEXT4")}
              </LinkSignInUPTypography>{" "}
              {translate("signInUp.LOGIN_TEXT5")}{" "}
              <LinkSignInUPTypography href="">
                {translate("signInUp.LOGIN_TEXT6")}
              </LinkSignInUPTypography>{" "}
              {translate("signInUp.LOGIN_TEXT7")}
            </PrimarySignInUPTypography>

            <Box className="d-flex justify-content-center align-items-center my-3">
              <Divider sx={{ width: "100px" }} />
              <QuarternarySignInUPTypography
                sx={{
                  background: theme.palette.signInUpWhite.main,
                  fontSize: "0.6rem",
                  padding: "5px 10px",
                }}
                className="mx-2"
              >
                {translate("signInUp.NEW_TO_APIFLOW")}
              </QuarternarySignInUPTypography>
              <Divider sx={{ width: "100px" }} />
            </Box>

            <Box className="my-2">
              <Button
                style={{ textTransform: "none", background: "transparent" }}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: `${theme.palette.signInUpBlack.main}`,
                  color: `${theme.palette.signInUpBlack.main}`,
                  fontSize: "0.7rem",
                  fontFamily: "Inter-Regular",
                }}
                onClick={() => router.push(SIGNINUP_PATH + SIGNUP_PATH)}
              >
                {translate("signInUp.REGISTER_NOW")}
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </section>
  );
}

interface userDataType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  [key: string]: string; // Index signature
}

interface userDataErrorsType {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
  [key: string]: string | undefined; // Index signature
}

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading } = useSelector<RootStateType, SignupReducer>(
    (state) => state.signup
  );
  console.log("load", loading);

  const [formData, setFormData] = useState<userDataType>({
    first_name: "",
    user_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    member_invite_id: "null",
  });

  const [error, setError] = useState<userDataErrorsType>({});
  console.log(error?.first_name, "errorsdsd");
  const [registerPasswordVisibility, setRegisterPasswordVisibility] =
    useState(false);
  const [regConfirmPasswordVisibility, setRegConfirmPasswordVisibility] =
    useState(false);
  const [errorEmail, setErrorMail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const { instance, accounts } = useMsal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userDataType>();

  function validateConfirmPassword(
    confirmPassword: string,
    password: string
  ): string | undefined {
    return formData.password === confirmPassword
      ? undefined
      : "Passwords do not matchs";
  }

  // function signUpHandler() {
  //   const newErrors: userDataErrorsType = {};

  //   const confirmPasswordError = validateConfirmPassword(
  //     formData.confirm_password
  //   );
  //   if (confirmPasswordError) {
  //     newErrors.confirm_password = confirmPasswordError;
  //   }

  //   setError(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     let upadatedData = {
  //       ...formData,

  //       member_invite_id: Cookies.get("MID") || "null",
  //     };
  //     dispatch(signupUser(upadatedData))
  //       .unwrap()
  //       .then((res: any) => {
  //         toast.success("User Registration successful");
  //         Cookies.set("ttid", res.tenant, { expires: 1 });
  //         Cookies.set("tt-email", res.email, { expires: 1 });
  //         Cookies.remove("MID");
  //         navigate(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
  //       })
  //       .catch((error: any) => {
  //         // Handle error
  //         console.log(error, "newerror");

  //         setError({ email: error.message });
  //         // setError({ email: error });
  //       });
  //   }
  //   console.log(formData.password,"ormData.password");

  // }

  function signUpHandler() {
    const specialCharPattern = /[^a-zA-Z\s]/; // Allow letters and spaces only
    const numberPattern = /[0-9]/;
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const hasSpecialChars = (str: any) => specialCharPattern.test(str);
    const hasNumbers = (str: any) => numberPattern.test(str);
    const isValidLength = (str: any) => str.length >= 3 && str.length <= 50;
    const newErrors: userDataErrorsType = {};

    if (formData.first_name === "") {
      newErrors.first_name = "First Name is required";
    } else if (hasSpecialChars(formData.first_name)) {
      newErrors.first_name = "First Name should not contain special characters";
    } else if (hasNumbers(formData.first_name)) {
      newErrors.first_name = "First Name should not contain numbers";
    } else if (!isValidLength(formData.first_name)) {
      newErrors.first_name = "First Name should be between 3 and 50 characters";
    }

    if (formData.user_name === "") {
      newErrors.user_name = "Username is required";
    } else if (!isValidLength(formData.user_name)) {
      newErrors.first_name = "Username should be between 3 and 50 characters";
    }

    if (formData.last_name === "") {
      newErrors.last_name = "Last Name is required";
    } else if (hasSpecialChars(formData.last_name)) {
      newErrors.last_name = "Last Name should not contain special characters";
    } else if (hasNumbers(formData.last_name)) {
      newErrors.last_name = "Last Name should not contain numbers";
    } else if (!isValidLength(formData.last_name)) {
      newErrors.last_name = "Last Name should be between 3 and 50 characters";
    }

    if (formData.email === "") {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
    }

    const confirmPasswordError = validateConfirmPassword(
      formData.confirm_password,
      formData.password
    );
    if (confirmPasswordError) {
      newErrors.confirm_password = confirmPasswordError;
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      let updatedData = {
        ...formData,
        member_invite_id: Cookies.get("MID") || "null",
      };
      dispatch(signupUser(updatedData))
        .unwrap()
        .then((res: any) => {
          toast.success("User Registration successful");
          Cookies.set("ttid", res.tenant, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          Cookies.set("tt-email", res.email, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          Cookies.remove("MID");
          // router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
          router.push(SIGNINUP_PATH + SIGNINUP_OTP_VERIFICATION_PATH);
        })
        .catch((error: any) => {
          // Handle error

          setError(JSON.parse(error.message));
        });
    }
    console.log(formData.password, "formData.password");
  }

  let dev =
    "790333692787-pr3muri10h4quj2iqf9hlqi9olgerfck.apps.googleusercontent.com";
  let stage =
    "292411272101-9bpkf47ohttlift4u1n25tfk4e3u1fgp.apps.googleusercontent.com";

  const currentHost = typeof window !== "undefined" ? window.location.host : "";
  let CLIENT_ID = "";
  if (currentHost.includes("test-next-js-syuo.vercel")) {
    // Use production URL if host includes stage.apiflow.url
    CLIENT_ID = stage;
  } else {
    // Use default base URL
    CLIENT_ID = dev;
  }

  useEffect(() => {
    // Inject custom styles into the document head
    const style = document.createElement("style");
    style.innerHTML = `
        .nsm7Bb-HzV7m-LgbsSe {
          background-color: #d0dee71f !important; /* White background color */
          color: #000000 !important;           /* Black text color */
          border-radius: 5px !important;       /* Rounded corners */
          padding:10px !important;       /* Add padding */
        
          border: 1px solid #000000 !important; /* Black border */
          box-shadow: none !important;         /* Remove the shadow */
          font-size: 10px !important;          /* Font size */
          display: flex !important;
          
         
        }
  
        // .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
        //   margin-right: 8px !important;
        // }
  
        .nsm7Bb-HzV7m-LgbsSe:hover {
          background-color: #f0f0f0 !important; /* Light grey on hover */
        }
      `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when the component is unmounted
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSuccess = (response: any) => {
    console.log("Google ID Token:", response.credential);

    let token = response.credential;
    let email = "null";
    let password = "null";
    let token_type = "GOOGLE";
    let invitations_token = "null";

    dispatch(login({ email, password, token, token_type, invitations_token }))
      .unwrap()
      .then((res: any) => {
        if (res?.user?.user_registered !== "EXISTING_USER") {
          Cookies.remove("MID");
          Cookies.set("ttid", res?.user?.tenant, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          Cookies.set("tt-email", res?.user?.email, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          Cookies.set("ov", "OVS", {
            expires: 1,
            sameSite: "Strict",
            secure: true,
          });
          router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
        }
      })
      .catch((err: any) => {
        setErrorMail(err?.message);
        setErrorPassword(err?.message);
      });
  };

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log them out
        // authService.logout();

        setUser(null);
      } else {
        instance
          .loginPopup(loginRequest)
          .then((response: any) => {
            // Handle the response if needed
            console.log(response, "response");

            console.log("Login successful:", response.idToken);
            let token = response.idToken;
            let email = "null";
            let password = "null";
            let token_type = "AZURE";
            let invitations_token = "null";

            dispatch(
              login({ email, password, token, token_type, invitations_token })
            )
              .unwrap()
              .then((res: any) => {
                if (res?.user?.user_registered !== "EXISTING_USER") {
                  Cookies.remove("MID");
                  Cookies.set("ttid", res?.user?.tenant, {
                    expires: 1,
                    sameSite: "Strict",
                    secure: true,
                  });
                  Cookies.set("tt-email", res?.user?.email, {
                    expires: 1,
                    sameSite: "Strict",
                    secure: true,
                  });
                  Cookies.set("ov", "OVS", {
                    expires: 1,
                    sameSite: "Strict",
                    secure: true,
                  });
                  router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
                }
              })
              .catch((err: any) => {
                setErrorMail(err?.message);
                setErrorPassword(err?.message);
              });
            // const refreshToken = account.idTokenClaims.ssoToken;
            // setUser(account);
            // console.log(account, "account");
            // console.log(tokenInfo, "Token");
            // console.log(refreshToken, "refreshToken");
          })
          .catch((e: any) => {
            console.log(e, "test");
          });
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <section className="signUp">
      {loading && <GLobalLoader />}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="section" sx={{ width: "100%", height: "100%" }}>
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            {/* <ApiFlowLogo /> */}
            {translate("signInUp.APIFLOW")}
          </PrimarySignInUPTypography>
          <div>
            <PrimarySignInUPTypography
              variant="h5"
              sx={{ fontWeight: "600", fontSize: "0.8rem" }}
            >
              {translate("signInUp.REGISTER")}
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography
              variant="subtitle2"
              sx={{ fontSize: "0.7rem", marginTop: "0.5rem" }}
            >
              {translate("signInUp.REGISTER_HELPERTEXT")}
            </SecondarySignInUPTypography>
          </div>
          <form onSubmit={handleSubmit(signUpHandler)}>
            <div className="row mx-0" style={{ marginTop: "10px" }}>
              <div className="col-6 ps-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.6rem", fontWeight: "200" }}
                >
                  {translate("signInUp.FIRST_NAME")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="text"
                  id="first_name"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  // placeholder={translate("signInUp.FIRST_NAME_PLACEHOLDER")}
                  placeholder={"name"}
                  fontWeight={700}
                  fontSize="0.6rem"
                  radius="5px"
                  labelShrink={true}
                  dataTest={"signup-first-name"}
                  variant="outlined"
                  maxLength={100}
                  value={formData.first_name}
                  error={error.first_name || errors?.first_name}
                  helperText={error.first_name || errors?.first_name?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      first_name: e.target.value,
                    });
                  }}
                  register={register}
                  required
                />
              </div>
              <div className="col-6 pe-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.6rem", fontWeight: "200" }}
                >
                  {translate("signInUp.LAST_NAME")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="text"
                  id="last_name"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate("signInUp.LAST_NAME_PLACEHOLDER")}
                  fontWeight={700}
                  fontSize="0.6rem"
                  radius="5px"
                  labelShrink={true}
                  dataTest={"signup-last-name"}
                  variant="outlined"
                  maxLength={50}
                  value={formData.last_name}
                  error={error.last_name || errors?.last_name}
                  helperText={error.last_name || errors?.last_name?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      last_name: e.target.value,
                    });
                  }}
                  register={register}
                  required
                />
              </div>

              <div className="col-12 ps-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.6rem", fontWeight: "200" }}
                >
                  {/* {translate("signInUp.FIRST_NAME")} */}
                  Username
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="text"
                  id="user_name"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={"username"}
                  fontWeight={700}
                  fontSize="0.6rem"
                  radius="5px"
                  labelShrink={true}
                  dataTest={"signup-username"}
                  variant="outlined"
                  maxLength={100}
                  value={formData.user_name}
                  error={error.user_name || errors?.user_name}
                  helperText={error.user_name || errors?.user_name?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      user_name: e.target.value,
                    });
                  }}
                  register={register}
                  required
                />
              </div>
              <div className="col-12 p-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.6rem", fontWeight: "200" }}
                >
                  {translate("signInUp.EMAIL")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="text"
                  id="email"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate("signInUp.EMAIL_PLACEHOLDER")}
                  fontWeight={700}
                  fontSize="0.6rem"
                  radius="5px"
                  labelShrink={true}
                  dataTest={"signup-email"}
                  variant="outlined"
                  maxLength={50}
                  value={formData.email}
                  error={error.email || errors?.email}
                  helperText={error.email || errors?.email?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                    // setE("");
                  }}
                  register={register}
                  pattern={emailPattern}
                  patternError={"Invalid Email"}
                  required
                />
              </div>
              <div className="col-6 ps-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.6rem", fontWeight: "200" }}
                >
                  {translate("signInUp.PASSWORD")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type={
                    registerPasswordVisibility === true ? "text" : "password"
                  }
                  id="password"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  fontSize="0.6rem"
                  placeholder={translate("signInUp.PASSWORD_PLACEHOLDER")}
                  fontWeight={700}
                  radius={"5px"}
                  labelShrink={true}
                  dataTest={"signup-password"}
                  variant="outlined"
                  maxLength={50}
                  value={formData.password}
                  error={error.password || errors?.password}
                  helperText={error.password || errors?.password?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                    // setErrorPassword("");
                  }}
                  endAdornment={
                    <>
                      <InputAdornment position="end">
                        {registerPasswordVisibility === true ? (
                          <VisibilityOffOutlinedIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() =>
                              setRegisterPasswordVisibility(
                                !registerPasswordVisibility
                              )
                            }
                          />
                        ) : (
                          <VisibilityOutlinedIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() =>
                              setRegisterPasswordVisibility(
                                !registerPasswordVisibility
                              )
                            }
                          />
                        )}
                      </InputAdornment>
                    </>
                  }
                  register={register}
                  pattern={passwordPattern}
                  patternError={
                    "Password must contain at least 8 characters, 1 uppercase, and 1 special character"
                  }
                  required
                />
              </div>
              <div className="col-6 pe-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.6rem", fontWeight: "200" }}
                >
                  {translate("signInUp.CONFIRM_PASSWORD")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type={
                    regConfirmPasswordVisibility === true ? "text" : "password"
                  }
                  id="confirm_password"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate(
                    "signInUp.CONFITM_PASSWORD_PLACEHOLDER"
                  )}
                  fontWeight={700}
                  radius={"5px"}
                  fontSize="0.6rem"
                  labelShrink={true}
                  dataTest={"signup-confirm-password"}
                  variant="outlined"
                  maxLength={50}
                  value={formData.confirm_password}
                  error={error.confirm_password || errors?.confirm_password}
                  helperText={
                    error.confirm_password || errors?.confirm_password?.message
                  }
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    });
                    // setErrorPassword("");
                  }}
                  endAdornment={
                    <>
                      <InputAdornment position="end">
                        {regConfirmPasswordVisibility === true ? (
                          <VisibilityOffOutlinedIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() =>
                              setRegConfirmPasswordVisibility(
                                !regConfirmPasswordVisibility
                              )
                            }
                          />
                        ) : (
                          <VisibilityOutlinedIcon
                            style={{ cursor: "pointer", fontSize: "1rem" }}
                            onClick={() =>
                              setRegConfirmPasswordVisibility(
                                !regConfirmPasswordVisibility
                              )
                            }
                          />
                        )}
                      </InputAdornment>
                    </>
                  }
                  required
                />
              </div>
            </div>
            <div className="text-end  mt-1">
              <GButton
                buttonType="primary"
                type="submit"
                dataTest={"sign-up-button"}
                // label={translate("signInUp.REGISTER")}
                label={"Reg"}
                // label={"reg"}
                width="100%"
                padding={"8px"}
                margin="0px"
                onClickHandler={() => {
                  signUpHandler();
                }}
              />
            </div>
          </form>
          <div>
            <Box className="d-flex justify-content-center align-items-center my-1">
              <Divider sx={{ width: "100px" }} />
              <QuarternarySignInUPTypography
                sx={{
                  background: theme.palette.signInUpWhite.main,
                  fontSize: "0.6rem",
                  padding: "5px 10px",
                }}
                className="mx-2"
              >
                {translate("signInUp.OR")}
              </QuarternarySignInUPTypography>
              <Divider sx={{ width: "100px" }} />
            </Box>

            <Box className="my-2 d-flex" sx={{ width: "100%" }}>
              <Button
                style={{
                  textTransform: "none",
                  background: "transparent",
                  width: "49%",
                  marginRight: "1rem",
                }}
                variant="outlined"
                // fullWidth
                sx={{
                  borderColor: `${theme.palette.signInUpBlack.main}`,
                  color: `${theme.palette.signInUpBlack.main}`,
                  fontSize: "10px",
                  fontFamily: "Inter-Regular",
                }}
                onClick={() => handleAuthentication()}
              >
                {/* <img
                  src={Azure}
                  style={{
                    height: "1rem",
                    width: "1rem",
                    marginRight: "14px",
                  }}
                ></img>{" "} */}
                <Image
                  src={Azure}
                  alt=""
                  style={{ height: "1rem", width: "1rem", marginRight: "14px" }}
                />
                {/* <LoginLink to={""}> */}
                {/* {translate("signInUp.LOGIN_MICROSOFT")} */}
                Sign in with Azure
                {/* </LoginLink> */}
              </Button>

              <GoogleOAuthProvider clientId={CLIENT_ID}>
                {/* <GoogleOAuthProvider clientId={GOOGLE_AUTH_SECREAT_KEY}> */}

                <div style={{ width: "50%" }}>
                  <GoogleLogin
                    onSuccess={handleSuccess} // Use the correct prop name
                    //   onError={handleError}
                  />
                </div>
              </GoogleOAuthProvider>
            </Box>

            {/* <Box className="my-2">
              <Button
                style={{ textTransform: "none", background: "transparent" }}
                variant="outlined"
                // fullWidth
                sx={{
                  borderColor: `${theme.palette.signInUpBlack.main}`,
                  color: `${theme.palette.signInUpBlack.main}`,
                  fontSize: "13px",
                  fontFamily: "Inter-Regular",
                }}
                // onClick={() => navigate(SIGNINUP_PATH + SIGNUP_PATH)}
              >
                <img
                  src={Azure}
                  style={{
                    height: "1.8rem",
                    width: "2rem",
                    marginLeft: "1.3rem",
                  }}
                ></img>{" "}
                <LoginLink to={""}>
                  {" "}
                  {translate("signInUp.REGISTER_MICROSOFT")}
                </LoginLink>
              </Button>
            </Box> */}
          </div>

          <Box className="d-flex justify-content-center align-items-center my-1">
            <Divider sx={{ width: "100px" }} />
            <QuarternarySignInUPTypography
              sx={{
                background: theme.palette.signInUpWhite.main,
                fontSize: "0.6rem",
                padding: "5px 10px",
              }}
              className="mx-2"
            >
              {translate("signInUp.OR")}
            </QuarternarySignInUPTypography>
            <Divider sx={{ width: "100px" }} />
          </Box>
          <Box className="my-1 mb-2">
            <Button
              style={{ textTransform: "none", background: "transparent" }}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: `${theme.palette.signInUpBlack.main}`,
                color: `${theme.palette.signInUpBlack.main}`,
                fontSize: "0.7rem",
                fontFamily: "Inter-Regular",
              }}
              onClick={() => router.push(SIGNINUP_PATH)}
            >
              {translate("signInUp.LOGIN_NOW")}
            </Button>

            {/* <div >

            <LinkSignInUPTypography to={SIGNINUP_PATH} style={{marginLeft:"9.5rem",fontSize:"0.8rem"}}>
            Back to Login
            </LinkSignInUPTypography>
            </div> */}
          </Box>
        </Box>
      </Box>
    </section>
  );
}

export function TwoFactorOtp() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  console.log(userProfile?.user?.email, "userLOginsssss");
  const [OtpDetails, setOtpDetails] = useState({
    OTP: "",
    recoveryKey: "",
  });
  console.log(OtpDetails, "OTP");

  const [verifyOtpClicked, setVerifyOtpClicked] = useState(true);
  const [recoverKeyClicked, setRecoverKeyClicked] = useState(false);

  const handleVerificationOtp = (e: any) => {
    console.log("test");
    e.preventDefault();

    let loginTwoFactorEmail = Cookies.get("2FE");

    dispatch(
      TwoFactorLogin({
        email: loginTwoFactorEmail,
        totp: verifyOtpClicked ? OtpDetails?.OTP : "",
        RecoveryKey: recoverKeyClicked ? OtpDetails?.recoveryKey : "",
      })
    )
      .unwrap()
      .then((res: any) => {
        console.log("ResInOTP: ", res);

        //encrypt wsid
        const encryptedWsidId = EncrouptionLogic(res?.workspace_id);

        Cookies.set(
          process.env.NEXT_PUBLIC_COOKIE_WSID || "",
          encryptedWsidId,
          {
            sameSite: "Strict", // Strict SameSite policy
            secure: true,
          }
        );

        toast.success("OTP Verified");
        Cookies.remove("2FE");

        initSession({
          token: res?.token,
          expires_in: res?.expiration_time,
          user_profile: res,
        });
        dispatch(initializeSession());
        router.push(`/userId/${res?.user_id}/workspaceId/${res?.workspace_id}`);
        console.log(initSession, "intial");

        console.log("UpadateResponseLogin: ", res);
      })
      .catch((error: any) => {
        console.log(error, "error Occured");
        toast.error("Some Error Occured");
      });
    // }
  };

  // if (!Cookies.get("2FE")) {
  //   return <Navigate to={SIGNINUP_PATH } />;
  // }

  return (
    <section>
      {/* {loading && <GLobalLoader />} */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="section" sx={{ width: "100%", height: "100%" }}>
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            <ApiFlowLogo />
            {translate("signInUp.APIFLOW")}
          </PrimarySignInUPTypography>
          <div>
            <PrimarySignInUPTypography variant="h5" sx={{ fontWeight: "600" }}>
              {/* {translate("signInUp.REGISTER")} */}
              Welcome Back
            </PrimarySignInUPTypography>
            <div>
              {verifyOtpClicked === true ? (
                <>
                  <SecondarySignInUPTypography variant="subtitle2">
                    {/* {translate("signInUp.REGISTER_HELPERTEXT")} */}
                    Enter the OTP sent to your Authenticator App.
                  </SecondarySignInUPTypography>
                </>
              ) : (
                <>
                  <SecondarySignInUPTypography variant="subtitle2">
                    {/* {translate("signInUp.REGISTER_HELPERTEXT")} */}
                    Enter your recovery key for verification.
                  </SecondarySignInUPTypography>
                </>
              )}
            </div>
          </div>
          <form
          // onSubmit={handleSubmit(UpdatePassowrd)}
          >
            <div className="row mx-0" style={{ marginTop: "10px" }}>
              <div className="col-12 p-0">
                {/* <SecondarySignInUPTypography
                  sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                >
                  Enter OTP 
                </SecondarySignInUPTypography> */}
                {/* {translate("signInUp.LAST_NAME")} */}

                {verifyOtpClicked === true ? (
                  <>
                    <GInput
                      fullWidth={true}
                      type="text"
                      id="otp"
                      color={theme.palette.signInUpBlack.main}
                      background={theme.palette.signInUpWhite.main}
                      placeholder={"Enter Your OTP"}
                      fontWeight={700}
                      onChangeHandler={(e: any) => {
                        setOtpDetails({
                          ...OtpDetails,
                          OTP: e.target.value,
                        });
                      }}
                      // fontSize="13px"
                      radius="5px"
                      labelShrink={true}
                      dataTest={"signup-last-name"}
                      variant="outlined"
                      maxLength={6}
                      // value={formData.otp}
                      // error={error.otp || errors?.otp}
                      // helperText={error.otp || errors?.otp?.message}
                      // onChangeHandler={(e: any) => {
                      //   setFormData({
                      //     ...formData,
                      //     otp: e.target.value,
                      //   });
                      // }}
                      // register={register}
                      // required
                    />
                  </>
                ) : (
                  <>
                    <GInput
                      fullWidth={true}
                      type="text"
                      id="recoveryKey"
                      color={theme.palette.signInUpBlack.main}
                      background={theme.palette.signInUpWhite.main}
                      placeholder={"Enter Your Recovery Key"}
                      fontWeight={700}
                      onChangeHandler={(e: any) => {
                        setOtpDetails({
                          ...OtpDetails,
                          recoveryKey: e.target.value,
                        });
                      }}
                      // fontSize="13px"
                      radius="5px"
                      labelShrink={true}
                      dataTest={"signup-last-name"}
                      variant="outlined"

                      // value={formData.otp}
                      // error={error.otp || errors?.otp}
                      // helperText={error.otp || errors?.otp?.message}
                      // onChangeHandler={(e: any) => {
                      //   setFormData({
                      //     ...formData,
                      //     otp: e.target.value,
                      //   });
                      // }}
                      // register={register}
                      // required
                    />
                  </>
                )}
              </div>

              {/* <div className="col-12 p-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                >
                  {translate("signInUp.PASSWORD")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="password"
                  id="password"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate("signInUp.PASSWORD_PLACEHOLDER")}
                  fontWeight={700}
                  radius={"5px"}
                  labelShrink={true}
                  dataTest={"signup-password"}
                  variant="outlined"
                  maxLength={50}
                  // value={formData.password}
                  // error={error.password || errors?.password}
                  // helperText={error.password || errors?.password?.message}
                  // onChangeHandler={(e: any) => {
                  //   setFormData({
                  //     ...formData,
                  //     password: e.target.value,
                  //   });
                  //   // setErrorPassword("");
                  // }}
                  // register={register}
                  pattern={passwordPattern}
                  patternError={
                    "Password must contain at least 8 characters, 1 uppercase, and 1 special character"
                  }
                  required
                />
              </div> */}

              {/* <div className="col-12 p-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                >
                  {translate("signInUp.CONFIRM_PASSWORD")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="password"
                  id="confirm_password"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate(
                    "signInUp.CONFITM_PASSWORD_PLACEHOLDER"
                  )}
                  fontWeight={700}
                  radius={"5px"}
                  labelShrink={true}
                  dataTest={"signup-confirm-password"}
                  variant="outlined"
                  maxLength={50}
                  // value={formData.confirm_password}
                  // error={error.confirm_password || errors?.confirm_password}
                  // helperText={
                  //   error.confirm_password || errors?.confirm_password?.message
                  // }
                  // onChangeHandler={(e: any) => {
                  //   setFormData({
                  //     ...formData,
                  //     confirm_password: e.target.value,
                  //   });
                  //   // setErrorPassword("");
                  // }}
                  // required
                />
              </div> */}
            </div>
            {/* <div className="d-flex justify-content-between"> */}
            {/* <SecondarySignInUPTypography
                variant="subtitle2"
                className="d-block resend-code-text"
              >
                Code not received{" "}
                <span
                  // onClick={() => {
                  //   sendEmail();
                  // }}
                  style={{
                    color: theme.palette.signInUpPurple.main,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Resend code?
                </span>
              </SecondarySignInUPTypography> */}

            {/* <SecondarySignInUPTypography
                variant="subtitle2"
                className="d-block resend-code-text "
              > */}

            {/* <span
                  style={{
                    color: theme.palette.signInUpPurple.main,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span> */}
            {/* </SecondarySignInUPTypography> */}
            {/* </div> */}

            <div className="mb-1">
              {verifyOtpClicked === true ? (
                <>
                  <PrimaryTypography
                    style={{
                      color: `${theme.palette.primaryPurple.main}`,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setRecoverKeyClicked(true);
                      setVerifyOtpClicked(false);
                      setOtpDetails({
                        OTP: "",
                        recoveryKey: "",
                      });
                    }}
                  >
                    Do you want to use your recover key?
                  </PrimaryTypography>
                </>
              ) : (
                <>
                  <PrimaryTypography
                    style={{
                      color: `${theme.palette.primaryPurple.main}`,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setRecoverKeyClicked(false);
                      setVerifyOtpClicked(true);
                    }}
                  >
                    Do you want to use OTP?
                  </PrimaryTypography>
                </>
              )}
            </div>

            <div className="text-end  my-1">
              <GButton
                buttonType="primary"
                // type="submit"
                // dataTest={"sign-up-button"}
                // label={translate("signInUp.REGISTER")}
                // label={"Verify Your OTP"}
                label={"Verify"}
                width="100%"
                padding={"8px"}
                margin="0px"
                onClickHandler={handleVerificationOtp}
              />
            </div>
          </form>
          {/* <Box className="d-flex justify-content-center align-items-center my-1">
            <Divider sx={{ width: "100px" }} />
            <QuarternarySignInUPTypography
              sx={{
                background: theme.palette.signInUpWhite.main,
                fontSize: "0.6rem",
                padding: "5px 10px",
              }}
              className="mx-2"
            >
              {translate("signInUp.OR")}
            </QuarternarySignInUPTypography>
            <Divider sx={{ width: "100px" }} />
          </Box> */}
          {/* <Box className="my-1 mb-2">
            <Button
              style={{ textTransform: "none", background: "transparent" }}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: `${theme.palette.signInUpBlack.main}`,
                color: `${theme.palette.signInUpBlack.main}`,
                fontSize: "13px",
                fontFamily: "Inter-Regular",
              }}
              // onClick={() => navigate(SIGNINUP_PATH + "/forget-password")}
            >
            
              Back
            </Button>
          </Box> */}
        </Box>
      </Box>
    </section>
  );
}

// export function OtpVerification() {
//   const router = useRouter();
//   const dispatch = useDispatch<any>();

//   const { loading } = useSelector<RootStateType, SignupReducer>(
//     (state) => state.signup
//   );
//   const [otp, setOtp] = useState<number | string>("");

//   const [error, setError] = useState<string>("");
//   const [enble, setEnable] = useState<boolean>(false);
//   const [minutes, setMinutes] = useState<number>(10);
//   const [seconds, setSeconds] = useState<number>(0);

//   function OtpVerificationHandler() {
//     if (otp === "") {
//       setError("Please Enter otp");
//       return;
//     }

//     let updateData = {
//       email: Cookies.get("tt-email"),
//       otp: otp,
//     };
//     dispatch(verifyOtp(updateData))
//       .unwrap()
//       .then((res: any) => {
//         toast.success("Otp verification successfully");

//         Cookies.set("ov", "OVS", { expires: 1 });
//         router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
//       })
//       .catch((error: any) => {
//         // Handle error
//         setError(error.message);
//       });
//   }

//   function ResendOTP() {
//     let tempEmail = Cookies.get("tt-email") || "";

//     dispatch(resendOtp(tempEmail))
//       .unwrap()
//       .then((res: any) => {
//         toast.success("Otp send to email");
//         setMinutes(10);
//         setSeconds(0);
//       })
//       .catch((error: any) => {
//         // Handle error
//         // setError(error.message);
//         toast.error(error.message);
//       });
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//       if (seconds === 0) {
//         if (minutes === 0) {
//           setEnable(false);

//           clearInterval(interval);
//           toast.error("OTP Expired");
//         } else {
//           setSeconds(59);
//           setMinutes(minutes - 1);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [seconds, minutes]);

//   useEffect(() => {
//     if (!Cookies.get("ttid")) {
//       router.push(SIGNINUP_PATH + SIGNUP_PATH); // Redirect if 'ttid' is missing
//     }
//     if (Cookies.get("ttid") && Cookies.get("ov")) {
//       router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH); // Redirect if 'ov' exists
//     }
//   }, []);

//   return (
//     <section className="otpVerfication">
//       {loading && <GlobalLoader />}
//       <Box sx={{ height: "95vh", display: "flex", alignItems: "center" }}>
//         <Box component="section" sx={{ width: "100%" }}>
//           <PrimarySignInUPTypography
//             sx={{ fontWeight: "600", textAlign: "center" }}
//           >
//             <ApiFlowLogo /> {translate("signInUp.APIFLOW")}
//           </PrimarySignInUPTypography>
//           <div className="mt-3">
//             <PrimarySignInUPTypography variant="h5" sx={{ fontWeight: "600" }}>
//               {translate("optVerification.VERIFY_EMAIL")}
//             </PrimarySignInUPTypography>
//             <SecondarySignInUPTypography variant="subtitle2">
//               {translate("optVerification.OPT_HELPERTEXT")}
//             </SecondarySignInUPTypography>
//           </div>
//           <div style={{ marginTop: "20px" }}>
//             <div className=" mx-0">
//               <GInput
//                 fullWidth={true}
//                 type="number"
//                 color={theme.palette.signInUpBlack.main}
//                 background={theme.palette.signInUpWhite.main}
//                 placeholder="Enter the OTP Pin"
//                 fontWeight={700}
//                 radius={"5px"}
//                 labelShrink={true}
//                 dataTest={"password-input"}
//                 variant="outlined"
//                 value={otp}
//                 error={error}
//                 helperText={error}
//                 onChangeHandler={(e: any) => {
//                   setOtp(e.target.value);
//                   setError("");
//                 }}
//               />
//             </div>

//             <div className="d-flex justify-content-between">
//               <SecondarySignInUPTypography
//                 variant="subtitle2"
//                 className="d-block resend-code-text"
//               >
//                 Code not received{" "}
//                 <span
//                   onClick={() => {
//                     ResendOTP();
//                   }}
//                   style={{
//                     color: theme.palette.signInUpPurple.main,
//                     fontWeight: "600",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Resend code?
//                 </span>
//               </SecondarySignInUPTypography>

//               <SecondarySignInUPTypography
//                 variant="subtitle2"
//                 className="d-block resend-code-text "
//               >
//                 Code Valid for
//                 <span
//                   style={{
//                     color: theme.palette.signInUpPurple.main,
//                     fontWeight: "600",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {" "}
//                   {minutes < 10 ? `0${minutes}` : minutes}:
//                   {seconds < 10 ? `0${seconds}` : seconds}
//                 </span>
//               </SecondarySignInUPTypography>
//             </div>

//             <div className="text-end my-2 ">
//               <GButton
//                 buttonType="primary"
//                 dataTest={"sign-in-button"}
//                 label={translate("optVerification.VERIFY")}
//                 width="100%"
//                 padding={"8px"}
//                 onClickHandler={() => {
//                   OtpVerificationHandler();
//                 }}
//               />
//             </div>
//           </div>
//         </Box>
//       </Box>
//     </section>
//   );
// }

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';

export function OtpVerification() {
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading } = useSelector<RootStateType, SignupReducer>(
    (state) => state.signup
  );
  const [otp, setOtp] = useState<number | string>("");
  const [error, setError] = useState<string>("");
  const [enble, setEnable] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number>(0);

  function OtpVerificationHandler() {
    if (otp === "") {
      setError("Please Enter otp");
      return;
    }

    let updateData = {
      email: Cookies.get("tt-email"),
      otp: otp,
    };
    dispatch(verifyOtp(updateData))
      .unwrap()
      .then((res: any) => {
        toast.success("Otp verification successful");

        Cookies.set("ov", "OVS", {
          expires: 1,
          sameSite: "Strict",
          secure: true,
        });
        router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH); // Redirect here
      })
      .catch((error: any) => {
        setError(error.message);
      });
  }

  function ResendOTP() {
    let tempEmail = Cookies.get("tt-email") || "";

    dispatch(resendOtp(tempEmail))
      .unwrap()
      .then((res: any) => {
        toast.success("Otp sent to email");
        setMinutes(10);
        setSeconds(0);
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setEnable(false);
          clearInterval(interval);
          toast.error("OTP Expired");
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  // Prevent back button navigation when the OTP page is displayed
  useEffect(() => {
    // Check if the user is not authenticated or already verified and redirect
    if (!Cookies.get("ttid")) {
      router.push(SIGNINUP_PATH + SIGNUP_PATH);
    } else if (Cookies.get("ttid") && Cookies.get("ov")) {
      router.push(SIGNINUP_PATH + SIGNINUP_COMPANY_PATH);
    }

    // Function to prevent back navigation
    const handlePopState = () => {
      // Prevent back navigation
      window.history.pushState(null, "", window.location.href);
    };

    // Push a new state to the history
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <section className="otpVerification">
      {loading && <GlobalLoader />}
      <Box sx={{ height: "95vh", display: "flex", alignItems: "center" }}>
        <Box component="section" sx={{ width: "100%" }}>
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            {/* <ApiFlowLogo /> {translate("signInUp.APIFLOW")} */}
          </PrimarySignInUPTypography>
          <div className="mt-3">
            <PrimarySignInUPTypography variant="h5" sx={{ fontWeight: "600" }}>
              {translate("optVerification.VERIFY_EMAIL")}
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography variant="subtitle2">
              {translate("optVerification.OPT_HELPERTEXT")}
            </SecondarySignInUPTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div className="mx-0">
              <GInput
                fullWidth={true}
                type="number"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder="Enter the OTP Pin"
                fontWeight={700}
                radius={"5px"}
                labelShrink={true}
                dataTest={"otp-input"}
                variant="outlined"
                value={otp}
                error={error}
                helperText={error}
                onChangeHandler={(e: any) => {
                  setOtp(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="d-flex justify-content-between">
              <SecondarySignInUPTypography
                variant="subtitle2"
                className="d-block resend-code-text"
              >
                Code not received{" "}
                <span
                  onClick={() => {
                    ResendOTP();
                  }}
                  style={{
                    color: theme.palette.signInUpPurple.main,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Resend code?
                </span>
              </SecondarySignInUPTypography>

              <SecondarySignInUPTypography
                variant="subtitle2"
                className="d-block resend-code-text "
              >
                Code Valid for
                <span
                  style={{
                    color: theme.palette.signInUpPurple.main,
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </SecondarySignInUPTypography>
            </div>
            <div className="text-end my-2">
              <GButton
                buttonType="primary"
                dataTest={"otp-verify-button"}
                label={translate("optVerification.VERIFY")}
                width="100%"
                padding={"8px"}
                onClickHandler={() => {
                  OtpVerificationHandler();
                }}
              />
            </div>
          </div>
        </Box>
      </Box>
    </section>
  );
}

function VerifiedForm() {
  return (
    <section className="verified">
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
              Registration completed{" "}
              <span style={{ fontWeight: "600" }}>successfully. </span> <br /> A
              verification e-mail sent your registered e-mail id. Please check
              your company email id and verify your account
            </PrimarySignInUPTypography>
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

interface companyDataType {
  company_id: string;
  your_company_name: string;
  your_mobile_number: string;
  your_occupation: string;
  company_website: string;
  [key: string]: string; // Index signature
}

interface companyDataErrorsType {
  company_id?: string;
  your_company_name?: string;
  your_mobile_number?: string;
  your_occupation?: string;
  company_website?: string;
  [key: string]: string | undefined; // Index signature
}

export function CompanyRegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const { loading } = useSelector<RootStateType, SignupReducer>(
    (state) => state.signup
  );
  const [formData, setFormData] = useState<companyDataType>({
    company_id: "",
    your_company_name: "",
    your_mobile_number: "",
    your_occupation: "",
    company_website: "",
  });

  const [error, setError] = useState<companyDataErrorsType>({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<companyDataType>();

  function companySignupHandler() {
    const newErrors: companyDataErrorsType = {};

    if (formData.your_company_name === "") {
      newErrors.your_company_name = "Company Name is required";
    } else if (
      formData.your_company_name.length < 3 ||
      formData.your_company_name.length > 50
    ) {
      newErrors.your_company_name =
        "Your Company Name should be between 3 and 50 characters";
    } else if (/[^a-zA-Z\s]/.test(formData.your_company_name)) {
      newErrors.your_company_name =
        "Company Name should not contain special characters";
    } else if (/[0-9]/.test(formData.your_company_name)) {
      newErrors.your_company_name = "Company Name should not contain numbers";
    } else {
      delete newErrors.your_company_name; // Clear error if validation passes
    }

    if (formData.your_occupation === "") {
      newErrors.your_occupation = "Occupation is required";
    } else if (
      formData.your_occupation.length < 3 ||
      formData.your_occupation.length > 50
    ) {
      newErrors.your_occupation =
        "Your Occupation should be between 3 and 50 characters";
    } else if (/[^a-zA-Z\s]/.test(formData.your_occupation)) {
      newErrors.your_occupation =
        "Occupation should not contain special characters";
    } else if (/[0-9]/.test(formData.your_occupation)) {
      newErrors.your_occupation = "Occupation should not contain numbers";
    } else {
      delete newErrors.your_occupation; // Clear error if valid
    }

    // Check for errors
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors); // Set validation errors
      return; // Prevent further execution if errors exist
    } else {
      setError({}); // Clear all errors if validation passes
    }

    let updatedData = {
      ...formData,
      company_id: Cookies.get("ttid"),
    };

    dispatch(signupOrganization(updatedData))
      .unwrap()
      .then(() => {
        toast.success("Company Registration successfull");
        Cookies.remove("ttid");
        Cookies.remove("ov");
        router.push(SIGNINUP_PATH);
      })
      .catch((error: any) => {
        // let err = JSON.parse(error.message);
        // sessionStorage.setItem("signupError", JSON.stringify(err));
      });
  }

  // if (!Cookies.get("ttid")) {
  //   return <Navigate to={SIGNINUP_PATH + SIGNUP_PATH} />;
  // }

  // if (Cookies.get("ttid") && !Cookies.get("ov")) {
  //   return <Navigate to={SIGNINUP_PATH + SIGNINUP_OTP_VERIFICATION_PATH} />;
  // }

  return (
    <section className="signUpCompany">
      {loading && <GLobalLoader />}
      <Box sx={{ height: "95vh", display: "flex", alignItems: "center" }}>
        <Box component="section" sx={{ width: "100%" }}>
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            <ApiFlowLogo /> {translate("signInUp.APIFLOW")}
          </PrimarySignInUPTypography>
          <div className="mt-3">
            <PrimarySignInUPTypography variant="h5" sx={{ fontWeight: "600" }}>
              {translate("companyRegistration.COMPANY_DETAILS")}
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography variant="subtitle2">
              {translate("companyRegistration.COMPANY_DETAILS_HELPERTEXT")}
            </SecondarySignInUPTypography>
          </div>
          <form
            onSubmit={handleSubmit(companySignupHandler)}
            style={{ marginTop: "20px" }}
          >
            <SecondarySignInUPTypography
              sx={{ fontSize: "0.8rem", fontWeight: "300" }}
            >
              {translate("companyRegistration.COMPANY_NAME")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type="text"
                id="your_company_name"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder="Enter Your Company Name"
                fontWeight={700}
                radius="5px"
                labelShrink={true}
                dataTest={"signup-company-name"}
                variant="outlined"
                value={formData.your_company_name}
                error={error.your_company_name || errors?.your_company_name}
                helperText={
                  error.your_company_name || errors?.your_company_name?.message
                }
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    your_company_name: e.target.value,
                  });
                }}
                register={register}
                required
              />
            </div>

            <SecondarySignInUPTypography
              sx={{ fontSize: "0.8rem", fontWeight: "300" }}
            >
              {translate("companyRegistration.COMPANY_MOBILE_NUMBER")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type="number"
                id="your_mobile_number"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder="Your Mobile Numbers"
                fontWeight={700}
                radius={"5px"}
                labelShrink={true}
                dataTest={"signup-mobile"}
                variant="outlined"
                value={formData.your_mobile_number}
                error={error.your_mobile_number || errors?.your_mobile_number}
                helperText={
                  error.your_mobile_number ||
                  errors?.your_mobile_number?.message
                }
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    your_mobile_number: e.target.value,
                  });
                }}
                register={register}
                pattern={mobilePattern}
                patternError={"Invalid Phone No"}
                required
              />
            </div>

            <SecondarySignInUPTypography
              sx={{ fontSize: "0.8rem", fontWeight: "300" }}
            >
              {translate("companyRegistration.COMPANY_OCCUPATION")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type="text"
                id="your_occupation"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder="Please Enter Your Occupation"
                fontWeight={700}
                radius={"5px"}
                labelShrink={true}
                dataTest={"signup-occupation"}
                variant="outlined"
                value={formData.your_occupation}
                error={error.your_occupation || errors?.your_occupation}
                helperText={
                  error.your_occupation || errors?.your_occupation?.message
                }
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    your_occupation: e.target.value,
                  });
                }}
                register={register}
                required
              />
            </div>
            <SecondarySignInUPTypography
              sx={{ fontSize: "0.8rem", fontWeight: "300" }}
            >
              {translate("companyRegistration.COMPANY_WEBSITE")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type="text"
                id="company_website"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder="Please Enter Your Company Website"
                fontWeight={700}
                radius={"5px"}
                labelShrink={true}
                dataTest={"signup-website"}
                variant="outlined"
                value={formData.company_website}
                error={error.company_website || errors?.company_website}
                helperText={
                  error.company_website || errors?.company_website?.message
                }
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    company_website: e.target.value,
                  });
                }}
                register={register}
                pattern={websitePattern}
                patternError={"Invalid website format"}
                required
              />
            </div>
            <div className="my-0 px-2 ">
              <RadioCheckboxComponent
                label={
                  <PrimarySignInUPTypography className="mb-0">
                    {translate("companyRegistration.CHECKBOX_TEXT1")}{" "}
                    <span style={{ fontWeight: "600" }}>
                      {translate("companyRegistration.IPROTECT_IN")}
                    </span>{" "}
                    {translate("companyRegistration.CHECKBOX_TEXT2")}
                  </PrimarySignInUPTypography>
                }
              />

              <RadioCheckboxComponent
                label={
                  <PrimarySignInUPTypography className="mb-0">
                    {translate("companyRegistration.CHECKBOX_TEXT3")}{" "}
                    <span style={{ fontWeight: "600" }}>
                      {translate("companyRegistration.IPROTECT_IN")}
                    </span>{" "}
                    {translate("companyRegistration.CHECKBOX_TEXT4")}
                  </PrimarySignInUPTypography>
                }
              />
            </div>
            <div className="text-end my-2 ">
              <GButton
                buttonType="primary"
                type={"submit"}
                dataTest={"sign-up-company-button"}
                // label={translate("companyRegistration.PROCEED_REGISTRATION")}
                label={"proc"}
                // onClickHandler={companySignupHandler}
                onClickHandler={() => {
                  companySignupHandler();
                }}
                width="100%"
                padding={"8px"}
              />
            </div>
          </form>
        </Box>
      </Box>
    </section>
  );
}

export function ForgetPasswordEmail() {
  const router = useRouter();
  // const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const { loading } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const [formData, setFormData] = useState<any>({
    email: "",
  });
  console.log(formData?.email, "emailformData");

  const [errorEmail, setErrorMail] = useState<string>("");

  function sendEmail() {
    const { email } = formData;
    console.log(email, "emailsdsd");

    if (!email) {
      setErrorMail("Email is Required");
    } else {
      setErrorMail("");

      dispatch(SendEmailOTPPassword(formData?.email))
        .unwrap()
        .then((res: any) => {
          toast.success("OTP sent Successfully to mail");
          Cookies.set("OVE", email, { sameSite: "Strict", secure: true });
          router.push(SIGNINUP_PATH + FORGET_PASSWORD_OTP_VERIFICATION_PATH);
        })
        .catch((err: any) => {
          setErrorMail(err?.message);
        });
    }
  }

  return (
    <section className="forgetEmail">
      {loading && <GLobalLoader />}
      <Box sx={{ height: "95vh", display: "flex", alignItems: "center" }}>
        <Box component="section" className="w-100">
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            <ApiFlowLogo />
            {translate("signInUp.APIFLOW")}
          </PrimarySignInUPTypography>
          <div className="mt-3 w-100">
            <PrimarySignInUPTypography variant="h5" sx={{ fontWeight: "600" }}>
              {/* {translate("signInUp.WELCOME_MESSAGE")}
               */}
              Forget Password
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography variant="subtitle2">
              {/* {translate("signInUp.APIFLOW_HELPERTEXT")}
               */}
              Please enter the email address associated with your account. We'll
              send you a OTP to reset your password.
            </SecondarySignInUPTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <SecondarySignInUPTypography
              sx={{ fontSize: "0.8rem", fontWeight: "300" }}
            >
              {translate("signInUp.EMAIL")}
            </SecondarySignInUPTypography>
            <div className=" mx-0">
              <GInput
                fullWidth={true}
                type="email"
                color={theme.palette.signInUpBlack.main}
                background={theme.palette.signInUpWhite.main}
                placeholder={translate("signInUp.EMAIL_PLACEHOLDER")}
                fontWeight={700}
                radius="5px"
                labelShrink={true}
                dataTest={"email-input"}
                variant="outlined"
                value={formData.email}
                error={errorEmail}
                helperText={errorEmail}
                errorHandler={(error: any) => setErrorMail(error)}
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                  setErrorMail("");
                }}
              />
            </div>

            <div className="text-end my-2 mt-2">
              <GButton
                buttonType="primary"
                dataTest={"sign-in-button"}
                label={"Submit"}
                width="100%"
                padding={"8px"}
                onClickHandler={() => {
                  sendEmail();
                }}
              />
            </div>

            <Box className="d-flex justify-content-center align-items-center my-3">
              <Divider sx={{ width: "100px" }} />
              <QuarternarySignInUPTypography
                sx={{
                  background: theme.palette.signInUpWhite.main,
                  fontSize: "0.6rem",
                  padding: "5px 10px",
                }}
                className="mx-2"
              >
                {/* {translate("signInUp.NEW_TO_APIFLOW")} */}
                Or
              </QuarternarySignInUPTypography>
              <Divider sx={{ width: "100px" }} />
            </Box>

            <Box className="my-2">
              <Button
                style={{ textTransform: "none", background: "transparent" }}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: `${theme.palette.signInUpBlack.main}`,
                  color: `${theme.palette.signInUpBlack.main}`,
                  fontSize: "13px",
                  fontFamily: "Inter-Regular",
                }}
                onClick={() => router.push(SIGNINUP_PATH)}
              >
                {/* {translate("signInUp.REGISTER_NOW")}
                 */}
                Back to login
              </Button>
            </Box>
          </div>
        </Box>
      </Box>
    </section>
  );
}

export function ForgetPasswordUpdateForm() {
  // const navigate = useNavigate();
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const { loading } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  console.log("load", loading);

  const [formData, setFormData] = useState<any>({
    otp: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState<any>({});
  const [minutes, setMinutes] = useState<number>(10);
  const [seconds, setSeconds] = useState<number>(0);
  const [enble, setEnable] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<userDataType>();

  function validateConfirmPassword(
    confirmPassword: string
  ): string | undefined {
    return formData.password === confirmPassword
      ? undefined
      : "Passwords do not match";
  }

  function sendEmail() {
    let email = Cookies.get("OVE") || "";

    dispatch(SendEmailOTPPassword(email))
      .unwrap()
      .then((res: any) => {
        toast.success("OTP sent Successfully to mail");
        Cookies.set("OVE", email, { sameSite: "Strict", secure: true });
      })
      .catch((err: any) => {
        toast.error(err?.message);
      });
  }

  function UpdatePassowrd() {
    const newErrors: userDataErrorsType = {};

    const confirmPasswordError = validateConfirmPassword(
      formData.confirm_password
    );
    if (confirmPasswordError) {
      newErrors.confirm_password = confirmPasswordError;
    }

    setError(newErrors);
    let updatedData = {
      new_password: formData.confirm_password,
      confirm_password: formData.confirm_password,
      otp: formData?.otp,
      email: Cookies.get("OVE"),
    };

    if (Object.keys(newErrors).length === 0) {
      dispatch(ForgetPasswordOTPverification(updatedData))
        .unwrap()
        .then((res: any) => {
          toast.success("Password update successful");
          Cookies.remove("OVE");
          router.push(SIGNINUP_PATH);
        })
        .catch((error: any) => {
          // Handle error
          setError({ otp: error.message });
        });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setEnable(false);

          clearInterval(interval);
          toast.error("OTP Expired");
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  // if (!Cookies.get("OVE")) {
  //   return <Navigate to={SIGNINUP_PATH + FORGET_PASSWORD_PATH} />;
  // }

  // YourComponent.js

  return (
    <section className="forgetPasswordUpdateForm">
      {loading && <GLobalLoader />}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box component="section" sx={{ width: "100%", height: "100%" }}>
          <PrimarySignInUPTypography
            sx={{ fontWeight: "600", textAlign: "center" }}
          >
            <ApiFlowLogo />
            {translate("signInUp.APIFLOW")}
          </PrimarySignInUPTypography>
          <div>
            <PrimarySignInUPTypography variant="h5" sx={{ fontWeight: "600" }}>
              {/* {translate("signInUp.REGISTER")} */}
              Forget Password
            </PrimarySignInUPTypography>
            <SecondarySignInUPTypography variant="subtitle2">
              {/* {translate("signInUp.REGISTER_HELPERTEXT")} */}
              Enter the OTP sent to your registered email address.
            </SecondarySignInUPTypography>
          </div>
          <form onSubmit={handleSubmit(UpdatePassowrd)}>
            <div className="row mx-0" style={{ marginTop: "10px" }}>
              <div className="col-12 p-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                >
                  {/* {translate("signInUp.LAST_NAME")} */}
                  Enter OTP
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="text"
                  id="otp"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate("signInUp.LAST_NAME_PLACEHOLDER")}
                  fontWeight={700}
                  // fontSize="13px"
                  radius="5px"
                  labelShrink={true}
                  dataTest={"signup-last-name"}
                  variant="outlined"
                  maxLength={6}
                  value={formData.otp}
                  error={error.otp || errors?.otp}
                  helperText={error.otp || errors?.otp?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      otp: e.target.value,
                    });
                  }}
                  register={register}
                  required
                />
              </div>

              <div className="col-12 p-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                >
                  {translate("signInUp.PASSWORD")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="password"
                  id="password"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate("signInUp.PASSWORD_PLACEHOLDER")}
                  fontWeight={700}
                  radius={"5px"}
                  labelShrink={true}
                  dataTest={"signup-password"}
                  variant="outlined"
                  maxLength={50}
                  value={formData.password}
                  error={error.password || errors?.password}
                  helperText={error.password || errors?.password?.message}
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    });
                    // setErrorPassword("");
                  }}
                  register={register}
                  pattern={passwordPattern}
                  patternError={
                    "Password must contain at least 8 characters, 1 uppercase, and 1 special character"
                  }
                  required
                />
              </div>
              <div className="col-12 p-0">
                <SecondarySignInUPTypography
                  sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                >
                  {translate("signInUp.CONFIRM_PASSWORD")}
                </SecondarySignInUPTypography>

                <GInput
                  fullWidth={true}
                  type="password"
                  id="confirm_password"
                  color={theme.palette.signInUpBlack.main}
                  background={theme.palette.signInUpWhite.main}
                  placeholder={translate(
                    "signInUp.CONFITM_PASSWORD_PLACEHOLDER"
                  )}
                  fontWeight={700}
                  radius={"5px"}
                  labelShrink={true}
                  dataTest={"signup-confirm-password"}
                  variant="outlined"
                  maxLength={50}
                  value={formData.confirm_password}
                  error={error.confirm_password || errors?.confirm_password}
                  helperText={
                    error.confirm_password || errors?.confirm_password?.message
                  }
                  onChangeHandler={(e: any) => {
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    });
                    // setErrorPassword("");
                  }}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <SecondarySignInUPTypography
                variant="subtitle2"
                className="d-block resend-code-text"
              >
                Code not received{" "}
                <span
                  onClick={() => {
                    sendEmail();
                  }}
                  style={{
                    color: theme.palette.signInUpPurple.main,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Resend code?
                </span>
              </SecondarySignInUPTypography>

              <SecondarySignInUPTypography
                variant="subtitle2"
                className="d-block resend-code-text "
              >
                Code Valid for
                <span
                  style={{
                    color: theme.palette.signInUpPurple.main,
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </SecondarySignInUPTypography>
            </div>

            <div className="text-end  mt-1">
              <GButton
                buttonType="primary"
                type="submit"
                dataTest={"sign-up-button"}
                label={translate("signInUp.REGISTER")}
                width="100%"
                padding={"8px"}
                margin="0px"
                // onClickHandler={() => {
                //   signUpHandler();
                // }}
              />
            </div>
          </form>
          <Box className="d-flex justify-content-center align-items-center my-1">
            <Divider sx={{ width: "100px" }} />
            <QuarternarySignInUPTypography
              sx={{
                background: theme.palette.signInUpWhite.main,
                fontSize: "0.6rem",
                padding: "5px 10px",
              }}
              className="mx-2"
            >
              {translate("signInUp.OR")}
            </QuarternarySignInUPTypography>
            <Divider sx={{ width: "100px" }} />
          </Box>
          <Box className="my-1 mb-2">
            <Button
              style={{ textTransform: "none", background: "transparent" }}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: `${theme.palette.signInUpBlack.main}`,
                color: `${theme.palette.signInUpBlack.main}`,
                fontSize: "13px",
                fontFamily: "Inter-Regular",
              }}
              onClick={() => router.push(SIGNINUP_PATH + "/forget-password")}
            >
              {/* {translate("signInUp.LOGIN_NOW")} */}
              Back
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
}

export default function SignInUpForm() {
  const common = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  // if (common.isLoggedIn) {
  //   return <Navigate to={INDEX_PATH} />;
  // }

  return (
    <section>
      <SignOuterContainer>
        <Box sx={{ width: "75%" }}>
          <Grid container>
            <Grid
              item
              xs={7}
              className="d-flex align-items-center justify-content-center px-2"
            >
              {/* <img
                src={SignInImage}
                alt="signInUp-Image"
                className="img-fluid"
              /> */}
              <Image src={SignInImage} alt="signInUp-Image" />
            </Grid>
            <Grid item xs={5}>
              <Routes>
                <Route index element={<LoginForm />}></Route>

                <Route path={SIGNUP_PATH} element={<RegisterForm />}></Route>

                <Route
                  path={SIGNINUP_OTP_VERIFICATION_PATH}
                  element={<OtpVerification />}
                ></Route>

                <Route
                  path={SIGNINUP_VERIFY_PATH}
                  element={<VerifiedForm />}
                ></Route>

                <Route
                  path={SIGNINUP_COMPANY_PATH}
                  element={<CompanyRegisterForm />}
                ></Route>

                <Route
                  path={SIGNINUP_COMPANY_PATH}
                  element={<CompanyRegisterForm />}
                ></Route>

                <Route
                  path={FORGET_PASSWORD_PATH}
                  element={<ForgetPasswordEmail />}
                ></Route>

                <Route
                  path={TWO_FACTOR_ENABLE_OTP_VERIFICATION_PATH}
                  element={<TwoFactorOtp />}
                ></Route>

                <Route
                  path={FORGET_PASSWORD_OTP_VERIFICATION_PATH}
                  element={<ForgetPasswordUpdateForm />}
                ></Route>
              </Routes>

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
