"use client";
import {
  SignupReducer,
  signupUser,
  updateUser,
} from "@/app/Redux/signupReducer";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { RootStateType } from "@/app/Redux/store";
import { useMsal } from "@azure/msal-react";
import { useForm } from "react-hook-form";
import { emailPattern } from "@/app/Utilities/regex";
import {
  SIGNINUP_COMPANY_PATH,
  SIGNINUP_OTP_VERIFICATION_PATH,
  SIGNINUP_PATH,
} from "@/app/Utilities/pathConstants";
import { login } from "@/app/Redux/loginReducer";
import { loginRequest } from "@/app/Services/azureServices";
import useSignIn from "./useSignIn";
import { useSignUpStore } from "./signZustand";
import theme from "@/Theme/Theme";

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

export default function useSignUp() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { loginHandler, userData } = useSignIn();

  const [signUpFormData, setsignUpFormData] = useState<any>({
    first_name: "",
    user_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    member_invite_id: "null",
    isFromGoogleOrAzure: false,
    isOnboarding: true,
  });
  const handleFormData = (key: string, value: any) => {
    setsignUpFormData((prev: any) => ({ ...prev, [key]: value }));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    handleFormData(name, value);
  };
  const { loading } = useSelector<RootStateType, SignupReducer>(
    (state) => state.signup
  );
  const [error, setError] = useState<userDataErrorsType>({});
  const [errorEmail, setErrorMail] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const { instance, accounts } = useMsal();
  const { setIsLoading, formDataStore, setactiveStep, setFormDataStore } =
    useSignUpStore();
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
    return password === confirmPassword ? undefined : "Passwords do not matchs";
  }

  function signUpHandler(): any {
    setIsLoading(true);
    const specialCharPattern = /[^a-zA-Z\s]/;
    const numberPattern = /[0-9]/;

    const hasSpecialChars = (str: any) => specialCharPattern.test(str);
    const hasNumbers = (str: any) => numberPattern.test(str);
    const isValidLength = (str: any) => str.length >= 3 && str.length <= 50;
    const newErrors: userDataErrorsType = {};

    if (signUpFormData.first_name === "") {
      newErrors.first_name = "First Name is required";
      setIsLoading(false);
    } else if (hasSpecialChars(signUpFormData.first_name)) {
      newErrors.first_name = "First Name should not contain special characters";
      setIsLoading(false);
    } else if (hasNumbers(signUpFormData.first_name)) {
      newErrors.first_name = "First Name should not contain numbers";
      setIsLoading(false);
    } else if (!isValidLength(signUpFormData.first_name)) {
      newErrors.first_name = "First Name should be between 3 and 50 characters";
      setIsLoading(false);
    }

    if (signUpFormData.user_name === "") {
      newErrors.user_name = "Username is required";
      setIsLoading(false);
    } else if (!isValidLength(signUpFormData.user_name)) {
      newErrors.first_name = "Username should be between 3 and 50 characters";
      setIsLoading(false);
    }

    if (signUpFormData.last_name === "") {
      newErrors.last_name = "Last Name is required";
      setIsLoading(false);
    } else if (hasSpecialChars(signUpFormData.last_name)) {
      newErrors.last_name = "Last Name should not contain special characters";
      setIsLoading(false);
    } else if (hasNumbers(signUpFormData.last_name)) {
      newErrors.last_name = "Last Name should not contain numbers";
      setIsLoading(false);
    } else if (!isValidLength(signUpFormData.last_name)) {
      newErrors.last_name = "Last Name should be between 3 and 50 characters";
      setIsLoading(false);
    }

    if (signUpFormData.email === "") {
      newErrors.email = "Email is required";
      setIsLoading(false);
    } else if (!emailPattern.test(signUpFormData.email)) {
      newErrors.email = "Invalid email format";
      setIsLoading(false);
    }

    if (signUpFormData.password === "") {
      newErrors.password = "Password is required";
      setIsLoading(false);
    } else if (signUpFormData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
      setIsLoading(false);
    }

    const confirmPasswordError = validateConfirmPassword(
      signUpFormData.confirm_password,
      signUpFormData.password
    );
    if (confirmPasswordError) {
      newErrors.confirm_password = confirmPasswordError;
      setIsLoading(false);
    }
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let updatedData = {
        ...signUpFormData,
        member_invite_id: formDataStore?.invite_token || "null",
      };
      dispatch(
        formDataStore?.isRegisterd
          ? updateUser({
              value: {
                first_name: signUpFormData.first_name,
                last_name: signUpFormData.last_name,
                profile_picture: "",
                cover_picture: "",
                user_id: formDataStore?.user_id,
                token: formDataStore?.token,
              },
              token: formDataStore?.token,
            })
          : signupUser(updatedData)
      )
        .unwrap()
        .then((res: any) => {
          if (!formDataStore?.isRegisterd) {
            setFormDataStore("authType", "email");
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
            loginHandler(signUpFormData.email, signUpFormData.password);
          } else {
            setactiveStep(1);
            setIsLoading(false);
          }
        })
        .catch((error: any) => {
          // Handle error
          setIsLoading(false);
          setError(JSON.parse(error.message));
        });
    }
  }

  let dev =
    // "790333692787-pr3muri10h4quj2iqf9hlqi9olgerfck.apps.googleusercontent.com";
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
    const style = document.createElement("style");
    style.innerHTML = `
        .nsm7Bb-HzV7m-LgbsSe {
          background-color: ${theme.palette.signInUpBlackSecondary.main} !important; /* White background color */
          color: ${theme.palette.signInUpBlack.main} !important;           /* Black text color */
          border-radius: 5px !important;       /* Rounded corners */
          padding:10px !important;       /* Add padding */

          border: 1px solid ${theme.palette.signInUpBlack.main} !important; /* Black border */
          box-shadow: none !important;         /* Remove the shadow */
          font-size: 10px !important;          /* Font size */
          display: flex !important;


        }

        // .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
        //   margin-right: 8px !important;
        // }

        .nsm7Bb-HzV7m-LgbsSe:hover {
          background-color: ${theme.palette.signInUpWhiteSecondary.main} !important; /* Light grey on hover */
        }
      `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when the component is unmounted
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const isDataChanged =
    signUpFormData.last_name != formDataStore?.registeredForm?.last_name ||
    signUpFormData.first_name != formDataStore?.registeredForm?.first_name;
  const submitform = handleSubmit(signUpHandler);
  const updateform = handleSubmit(signUpHandler);
  useEffect(() => {
    if (formDataStore?.registeredForm) {
      setsignUpFormData({
        ...formDataStore?.registeredForm,
      });
    }
  }, []);

  return {
    isDataChanged,
    signUpFormData,
    handleChange,
    handleFormData,
    register,
    submitform,
    error,
    errors,
    userData,
    setsignUpFormData,
    updateform,
  };
}
