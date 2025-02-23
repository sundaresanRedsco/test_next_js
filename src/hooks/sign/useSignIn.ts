"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useSignUpStore } from "@/store/useSignUpStore";
// import { useMsal } from "@azure/msal-react";
// import { RootStateType } from "@/app/Redux/store";
// import { login, LoginReducer, TwoFactorLogin } from "@/app/Redux/loginReducer";
// import { EncrouptionLogic } from "@/app/Helpers/helpersFunctions";
// import { loginRequest } from "@/app/Services/azureServices";
// import { useSignUpStore } from "./signZustand";
// import theme from "@/theme/theme";

interface loginInfoType {
  email: string;
  password: string;
  invitations_token: any;
}
export default function useSignIn() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const pathName = usePathname();
  const {
    setIsLoading,
    setactiveStep,
    setFormDataStore,
    setIsTotpEnabled,
    formDataStore,
  } = useSignUpStore();

  const accounts: any = [];
  const loading = false;

  // const { instance, accounts } = useMsal();
  // const { loading } = useSelector<RootStateType, LoginReducer>(
  //   (state) => state.login
  // );
  const [formData, setFormData] = useState<loginInfoType>({
    email: "",
    password: "",
    invitations_token: "null",
  });
  const [user, setUser] = useState<any>(null);
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [userData, setuserData] = useState(null);
  const [checkBoxVal, setCheckBoxVal] = useState(false);

  const [otp, setOtp] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [errorEmail, setErrorMail] = useState<string>("");
  const [errorOtp, setErrorOtp] = useState<string>("");
  const [errorRecoveryCode, setErrorRecoveryCode] = useState<string>("");
  const [enableRecovery, setenableRecovery] = useState(false);

  let dev =
    "292411272101-9bpkf47ohttlift4u1n25tfk4e3u1fgp.apps.googleusercontent.com";

  let stage =
    "292411272101-9bpkf47ohttlift4u1n25tfk4e3u1fgp.apps.googleusercontent.com";

  const currentHost = typeof window !== "undefined" ? window.location.host : "";
  let CLIENT_ID = "";
  if (currentHost.includes("stage.apiflow.pro")) {
    // Use production URL if host includes stage.apiflow.url
    CLIENT_ID = stage;
  } else {
    // Use default base URL
    CLIENT_ID = dev;
  }

  useEffect(() => {
    // Inject custom styles into the document head
    // const style = document.createElement("style");
    // style.innerHTML = `
    //     .nsm7Bb-HzV7m-LgbsSe {
    //       background-color: ${theme.palette.signInUpBlackSecondary.main} !important; /* White background color */
    //       color: ${theme.palette.signInUpBlack.main} !important;           /* Black text color */
    //       border-radius: 5px !important;       /* Rounded corners */
    //       padding:10px !important;       /* Add padding */

    //       border: 1px solid ${theme.palette.signInUpBlack.main} !important; /* Black border */
    //       box-shadow: none !important;         /* Remove the shadow */
    //       font-size: 10px !important;          /* Font size */
    //       display: flex !important;

    //     }

    //     // .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
    //     //   margin-right: 8px !important;
    //     // }

    //     .nsm7Bb-HzV7m-LgbsSe:hover {
    //       background-color:${theme.palette.signInUpWhiteSecondary.main} !important; /* Light grey on hover */
    //     }
    //   `;
    // document.head.appendChild(style);
    // setFormDataStore("currentPage", "Sign Up");
    // setactiveStep(2);
    // Cleanup function to remove the style when the component is unmounted
    return () => {
      // document.head.removeChild(style);
    };
  }, []);

  const handleSuccess = async (response: any) => {
    //   let email = "null";
    //   let password = "null";
    //   let token_type = "GOOGLE";
    //   let invitations_token = formDataStore?.invite_token || "null";
    //   setIsLoading(true);
    //   const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: new URLSearchParams({
    //       code: response.code,
    //       client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as any,
    //       client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as any,
    //       // redirect_uri: process.env.NEXT_PUBLIC_APP_BASE_URL as any,
    //       redirect_uri: "postmessage",
    //       grant_type: "authorization_code",
    //     }).toString(),
    //   });
    //   const tokenData = await tokenResponse.json();
    //   let token = tokenData?.id_token;
    //   if (tokenData) {
    //     const userInfoResponse = await fetch(
    //       "https://www.googleapis.com/oauth2/v3/userinfo",
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Bearer ${tokenData.access_token}`,
    //         },
    //       }
    //     );
    //     const userInfo = await userInfoResponse.json();
    //     if (userInfo.email) {
    //       setFormData((prev) => ({ ...prev, email: userInfo.email }));
    //     }
    //   }
    //   dispatch(login({ email, password, token, token_type, invitations_token }))
    //     .unwrap()
    //     .then((res: any) => {
    //       const userId: any = res?.user?.user_id;
    //       if (res && res?.user?.user_registered != "EXISTING_USER") {
    //         if (pathName != "/sign/signup") {
    //           router.push("/sign/signup");
    //         }
    //         Cookies.set(userId, "onboarding");
    //         setactiveStep(1);
    //         setFormDataStore("currentPage", "SignUp");
    //         setFormDataStore("authType", "google");
    //         const encryptedWsidId = EncrouptionLogic(res?.user?.workspace_id);
    //         Cookies.set(
    //           process.env.NEXT_PUBLIC_COOKIE_WSID || "",
    //           encryptedWsidId,
    //           {
    //             sameSite: "Strict", // Strict SameSite policy
    //             secure: true,
    //           }
    //         );
    //         setIsLoading(false);
    //       } else {
    //         if (res == "TWO FACTOR:Enable") {
    //           setIsTotpEnabled(true);
    //         } else {
    //           Cookies.remove(userId);
    //           Cookies.remove("MID");
    //           Cookies.set("ttid", res?.user?.tenant, {
    //             expires: 1,
    //             sameSite: "Strict",
    //             secure: true,
    //           });
    //           Cookies.set("tt-email", res?.user?.email, {
    //             expires: 1,
    //             sameSite: "Strict",
    //             secure: true,
    //           });
    //           Cookies.set("ov", "OVS", {
    //             expires: 1,
    //             sameSite: "Strict",
    //             secure: true,
    //           });
    //           setFormDataStore("token", res?.user?.token);
    //           router.push(`/userId/${res?.user?.user_id}`);
    //         }
    //       }
    //     })
    //     .catch((err: any) => {
    //       if (err?.message === '"TWO FACTOR:Enable"') {
    //         Cookies.set("2FE", email, {
    //           expires: 1,
    //           sameSite: "Strict",
    //           secure: true,
    //         });
    //         setIsTotpEnabled(true);
    //       } else {
    //         setErrorMail(err?.message);
    //         setErrorPassword(err?.message);
    //         setFormDataStore("authType", "");
    //       }
    //       setIsLoading(false);
    //     });
  };
  const handleAuthentication = async () => {
    //   try {
    //     if (user) {
    //       setUser(null);
    //     } else {
    //       instance
    //         .loginPopup(loginRequest)
    //         .then((response: any) => {
    //           let token = response.idToken;
    //           let email = "null";
    //           let password = "null";
    //           let token_type = "AZURE";
    //           let invitations_token = "null";
    //           dispatch(
    //             login({ email, password, token, token_type, invitations_token })
    //           )
    //             .unwrap()
    //             .then((res: any) => {
    //               const userId: any = res?.user?.user_id;
    //               if (res?.user?.user_registered !== "EXISTING_USER") {
    //                 Cookies.remove("MID");
    //                 Cookies.set("ttid", res?.user?.tenant, {
    //                   expires: 1,
    //                   sameSite: "Strict",
    //                   secure: true,
    //                 });
    //                 Cookies.set("tt-email", res?.user?.email, {
    //                   expires: 1,
    //                   sameSite: "Strict",
    //                   secure: true,
    //                 });
    //                 Cookies.set("ov", "OVS", {
    //                   expires: 1,
    //                   sameSite: "Strict",
    //                   secure: true,
    //                 });
    //                 Cookies.set(userId, "onboarding");
    //                 setactiveStep(1);
    //                 setFormDataStore("currentPage", "SignUp");
    //               } else {
    //                 Cookies.remove(userId);
    //                 router.push(`/userId/${res?.user?.user_id}`);
    //                 //encrypt wsid
    //                 const encryptedWsidId = EncrouptionLogic(
    //                   res?.user?.workspace_id
    //                 );
    //                 Cookies.set(
    //                   process.env.NEXT_PUBLIC_COOKIE_WSID || "",
    //                   encryptedWsidId,
    //                   {
    //                     sameSite: "Strict", // Strict SameSite policy
    //                     secure: true,
    //                   }
    //                 );
    //               }
    //             })
    //             .catch((err: any) => {
    //               setErrorMail(err?.message);
    //               setErrorPassword(err?.message);
    //             });
    //         })
    //         .catch((e) => {});
    //     }
    //   } catch (error) {
    //     console.error("Authentication failed:", error);
    //   }
  };
  const handleInputChange = (field: string, value: string) => {
    //   const updatedFormData = { ...formData, [field]: value };
    //   // If the email field is cleared, clear the password field as well
    //   if (field === "email" && value === "") {
    //     updatedFormData.password = "";
    //   }
    //   setFormData(updatedFormData);
    //   // Set error messages
    //   if (updatedFormData.email === "" && updatedFormData.password === "") {
    //     setErrorMail("Email is required");
    //     setErrorPassword("Password is required");
    //   } else {
    //     setErrorMail("");
    //     setErrorPassword("");
    //   }
  };

  function loginHandler(Email?: string, Password?: string): any {
    // const { email, password, invitations_token } = formData;
    // setIsLoading(true);
    // if (Email && Password) {
    //   let token_type = "null";
    //   let token = "null";
    //   let invitations_token = formDataStore?.invite_token || "null";
    //   dispatch(
    //     login({
    //       email: Email,
    //       password: Password,
    //       token_type,
    //       token,
    //       invitations_token,
    //     })
    //   )
    //     .unwrap()
    //     .then((res: any) => {
    //       if (res) {
    //         const userId: any = res?.user?.user_id;
    //         setuserData(res);
    //         setFormDataStore("user_id", userId);
    //         setIsLoading(false);
    //         setFormDataStore("token", res?.user?.token);
    //         if (!formDataStore?.invite_token) {
    //           setactiveStep(1);
    //         } else {
    //           setFormDataStore("currentPage", "SignUp");
    //           setactiveStep(5);
    //           router.replace(`/sign/signup`);
    //         }
    //       }
    //     })
    //     .catch((err: any) => {
    //       setIsLoading(false);
    //     });
    // } else {
    //   if (!email && !password) {
    //     setErrorMail("Email is Required");
    //     setErrorPassword("Password is Required");
    //     setIsLoading(false);
    //   } else if (!email) {
    //     setErrorMail("Email is required");
    //     setIsLoading(false);
    //   } else if (!password) {
    //     setErrorPassword("Password is required");
    //     setIsLoading(false);
    //   } else {
    //     setErrorMail("");
    //     setErrorPassword("");
    //     // let azure_token = "null";
    //     let token_type = "null";
    //     let token = "null";
    //     let invitations_token = "null";
    //     dispatch(
    //       login({ email, password, token_type, token, invitations_token })
    //     )
    //       .unwrap()
    //       .then((res: any) => {
    //         if (res == "TWO FACTOR:Enable") {
    //           setIsTotpEnabled(true);
    //         } else {
    //           router.push(`/userId/${res?.user?.user_id}`);
    //         }
    //       })
    //       .catch((err: any) => {
    //         if (err?.message === '"TWO FACTOR:Enable"') {
    //           Cookies.set("2FE", email, {
    //             expires: 1,
    //             sameSite: "Strict",
    //             secure: true,
    //           });
    //           setIsTotpEnabled(true);
    //         } else {
    //           setErrorMail(err?.message);
    //           setErrorPassword(err?.message);
    //         }
    //         setIsLoading(false);
    //       });
    //   }
    // }
  }

  const handleRememberMe = (e: any) => {
    let checkBoxValue = e.target.checked;

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
    } else {
      Cookies.remove("LoginEmail");
      Cookies.remove("LoginPassword");
    }
  };
  const handleAuthBy2fa = async (data: any) => {
    setIsLoading(true);
    let token_type = "null";
    let token = "null";
    let invitations_token = "null";

    // try {
    //   dispatch(
    //     TwoFactorLogin({
    //       token_type,
    //       token,
    //       invitations_token,
    //       ...data,
    //     })
    //   )
    //     .unwrap()
    //     .then((res: any) => {
    //       if (res == "TWO FACTOR:Enable") {
    //         setIsTotpEnabled(true);
    //       } else {
    //         router.push(`/userId/${res?.user?.user_id}`);
    //       }
    //     })
    //     .catch((err: any) => {
    //       setErrorOtp(JSON.parse(err?.message));
    //       setErrorRecoveryCode(JSON.parse(err?.message));
    //       setIsLoading(false);
    //     });
    // } catch (err: any) {
    //   setErrorOtp(err?.response?.data);
    //   setErrorRecoveryCode(err?.response?.data);
    // }
  };
  const handleSubmitOtp = () => {
    // if (enableRecovery) {
    //   if (recoveryCode === "") {
    //     setErrorRecoveryCode("Recovery Code is required");
    //   } else {
    //     handleAuthBy2fa({
    //       email: formData?.email,
    //       totp: "",
    //       recoveryKey: recoveryCode,
    //     });
    //     setErrorRecoveryCode("");
    //   }
    // } else {
    //   if (otp === "") {
    //     setErrorOtp("OTP is required");
    //   } else {
    //     handleAuthBy2fa({
    //       email: formData?.email,
    //       totp: otp,
    //       recoveryKey: "",
    //     });
    //     setErrorOtp("");
    //   }
    // }
  };

  const handleEnableRecoveyCode = () => {
    setenableRecovery(!enableRecovery);
    setOtp("");
    setRecoveryCode("");
    setErrorOtp("");
    setErrorRecoveryCode("");
  };
  useEffect(() => {
    let loginEmail = Cookies.get("LoginEmail");
    let loginPassword = Cookies.get("LoginPassword");
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
  return {
    checkBoxVal,
    handleSuccess,
    handleAuthentication,
    handleInputChange,
    loginHandler,
    handleRememberMe,
    pathName,
    accounts,
    loading,
    errorPassword,
    errorEmail,
    setErrorMail,
    formData,
    userData,
    CLIENT_ID,
    handleSubmitOtp,
    otp,
    setOtp,
    recoveryCode,
    setRecoveryCode,
    errorRecoveryCode,
    errorOtp,
    enableRecovery,
    setenableRecovery,
    handleEnableRecoveyCode,
  };
}
