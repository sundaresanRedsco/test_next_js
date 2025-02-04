"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useMsal } from "@azure/msal-react";
import { RootStateType } from "@/app/Redux/store";
import { login, LoginReducer } from "@/app/Redux/loginReducer";
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
} from "@/app/Utilities/pathConstants";
import { EncrouptionLogic } from "@/app/Helpers/helpersFunctions";
import { loginRequest } from "@/app/Services/azureServices";
import { useSignUpStore } from "./signZustand";
import { setCurrentStage } from "@/app/Redux/apiManagement/projectReducer";
import { removeItem, setItem } from "@/app/Services/localstorage";

interface loginInfoType {
  email: string;
  password: string;
  invitations_token: any;
}
export default function useSignIn() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const pathName = usePathname();
  const { handleStep, setIsLoading, setactiveStep, setFormDataStore } =
    useSignUpStore();

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
  const [userData, setuserData] = useState(null);
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
    // setFormDataStore("currentPage", "Sign Up");
    // setactiveStep(2);
    // Cleanup function to remove the style when the component is unmounted
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSuccess = (response: any) => {
    let token = response.token_id;
    console.log(response.access_token, "response.login");
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
          setItem(`userId/${res?.user?.user_id}`, "onboarding");
          setFormDataStore("currentPage", "Sign Up");
          setactiveStep(1);
        } else {
          removeItem(`userId/${res?.user?.user_id}`);
          router.push(`/userId/${res?.user?.user_id}`);

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
        setUser(null);
      } else {
        instance
          .loginPopup(loginRequest)
          .then((response: any) => {
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
                  setItem(`userId/${res?.user?.user_id}`, "onboarding");
                  setactiveStep(1);
                  setFormDataStore("currentPage", "Sign Up");
                } else {
                  removeItem(`userId/${res?.user?.user_id}`);
                  router.push(`/userId/${res?.user?.user_id}`);
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

  function loginHandler(Email?: string, Password?: string): any {
    const { email, password, invitations_token } = formData;
    setIsLoading(true);
    if (Email && Password) {
      let token_type = "null";
      let token = "null";
      let invitations_token = "null";
      dispatch(
        login({
          email: Email,
          password: Password,
          token_type,
          token,
          invitations_token,
        })
      )
        .unwrap()
        .then((res: any) => {
          setuserData(res);
          handleStep();
          setItem(`userId/${res?.user?.user_id}`, "onboarding");
          setIsLoading(false);
        })
        .catch((err: any) => {
          setIsLoading(false);
        });
    } else {
      if (!email && !password) {
        setErrorMail("Email is Required");
        setErrorPassword("Password is Required");
        setIsLoading(false);
      } else if (!email) {
        setErrorMail("Email is required");
        setIsLoading(false);
      } else if (!password) {
        setErrorPassword("Password is required");
        setIsLoading(false);
      } else {
        setErrorMail("");
        setErrorPassword("");
        // let azure_token = "null";
        let token_type = "null";
        let token = "null";
        let invitations_token = "null";

        dispatch(
          login({ email, password, token_type, token, invitations_token })
        )
          .unwrap()
          .then((res: any) => {
            if (res) {
              // router.push(
              //   `/userId/${res?.user?.user_id}/workspaceId/${res?.user?.workspace_id}`
              // );
              // removeItem(`userId/${res?.user?.user_id}`);

              router.push(`/userId/${res?.user?.user_id}`);
              // setactiveStep(2);
              setIsLoading(false);
              // setItem(`userId/${res?.user?.user_id}`, "onboarding");
              // setFormDataStore("currentPage", "Sign Up");
            }

            router.push(`/userId/${res?.user?.user_id}`);
            // setactiveStep(2);
            setIsLoading(false);
            // setFormDataStore("currentPage", "Sign Up");

            // }

            // const encryptedWsidId = EncrouptionLogic(res?.user?.workspace_id);
            // Cookies.set(
            //   process.env.NEXT_PUBLIC_COOKIE_WSID || "",
            //   encryptedWsidId,
            //   {
            //     sameSite: "Strict",
            //     secure: true,
            //   }
            // );
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
            setIsLoading(false);
          });
      }
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
    passwordVisibility,
    errorPassword,
    errorEmail,
    setErrorMail,
    formData,
    userData,
    CLIENT_ID,
  };
}
