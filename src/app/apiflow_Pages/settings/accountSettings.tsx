"use client";
import React, { useEffect, useState } from "react";
import { OuterBoxContainer } from "../../Styles/dashboradStyledComponents";
import { translate } from "../../Helpers/helpersFunctions";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondarySignInUPTypography,
  SecondaryTypography,
} from "../../Styles/signInUp";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import RadioCheckboxComponent from "@/app/apiflow_components/global/radioCheckboxComponentV1";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { RootStateType } from "../../Redux/store";
import {
  CommonReducer,
  UpdatePassword,
  updateSessionPopup,
  updateUserProfile,
} from "../../Redux/commonReducer";
import { useSelector } from "react-redux";
import GlobalLoader from "@/app/apiflow_components/global/GlobalLoaderV1";
import { passwordPattern } from "../../Utilities/regex";
import {
  DisableTwoFactor,
  SendEmailOtp,
  TwoFactorCodeVerification,
  TwoFactorOtpVerification,
  accountReducer,
} from "../../Redux/settings/accountReducer";

import { useTheme } from "@emotion/react";
import GInput from "@/app/apiflow_components/global/GInput";
import GOtpField from "@/app/apiflow_components/global/GOtpField";
import GButton from "@/app/apiflow_components/global/GButtonV1";
import QRCode from "react-qr-code"; // ✅ Correct import
import { CopyAll } from "@mui/icons-material";
import { setItem } from "@/app/Services/localstorage";
import { signIn } from "next-auth/react";
import useSessionUpdate from "@/app/hooks/useSessionUpdate";

export default function AccountsSettings() {
  const dispatch = useDispatch<any>();
  const theme = useTheme();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { handleUpdateSessionData } = useSessionUpdate();
  const { twoFactorResponce, loading } = useSelector<
    RootStateType,
    accountReducer
  >((state) => state.settings.account);

  const [buttonText, setButtonText] = useState(
    userProfile?.user?.is_2fa_enable == false ? "Enable 2FA" : "Disable 2FA"
  );
  const [twoFactorRes, setTwoFactorRes] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [changePasswordClicked, setChangePasswordClicked] = useState(false);
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const expiryDurationSeconds = 600; // 10 minutes in seconds
  const [expiryTime, setExpiryTime] = useState<number>(expiryDurationSeconds);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [recoveryKeyEnabled, setRecoveryKeyEnabled] = useState<boolean>(false);

  const [OtpDetails, setOtpDetails] = useState({
    OTP: "",
  });

  const [errorOtpDetails, setErrorOtpdetails] = useState<any>({
    OTP: "",
  });

  const [QrCodeDetails, setQrCodeDetails] = useState({
    Code: "",
  });

  const [errorQrCodeDetails, setErrorQrCodedetails] = useState<any>({
    Code: "",
  });

  const [errorPasswordDetails, setErrorPasswordDetails] = useState<any>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordNewVisibility, setPasswordNewVisibility] = useState(false);
  const [passwordConfirmVisibility, setPasswordConfirmVisibility] =
    useState(false);

  function passwordErrorHandler() {
    if (
      passwordDetails?.currentPassword === "" ||
      passwordDetails?.newPassword === "" ||
      passwordDetails?.confirmPassword === ""
    ) {
      setErrorPasswordDetails({
        currentPassword:
          passwordDetails?.currentPassword === ""
            ? "Current Password is required"
            : "",
        newPassword:
          passwordDetails?.newPassword === "" ? "New Password is required" : "",
        confirmPassword:
          passwordDetails?.confirmPassword === ""
            ? "Confirm Password is required"
            : "",
      });
      return;
    } else if (!passwordPattern.test(passwordDetails?.newPassword)) {
      setErrorPasswordDetails({
        newPassword:
          "New password must contain at least 8 characters, 1 uppercase, and 1 special character",
      });
    } else if (
      passwordDetails.currentPassword === passwordDetails.newPassword
    ) {
      setErrorPasswordDetails({
        currentPassword: "Current Password is same as New password",
        newPassword: "New Password is same as Current password",
        confirmPassword: "",
      });
    } else if (
      passwordDetails.newPassword !== passwordDetails.confirmPassword
    ) {
      setErrorPasswordDetails({
        currentPassword: "",
        newPassword: "New Password and confirm Password should be same",
        confirmPassword: "Confirm Password and new Password should be same",
      });
    } else {
      setErrorPasswordDetails({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }

  function otpHandler(otp: string): boolean {
    const otpPattern = /^\d{6}$/;
    if (!otpPattern.test(otp)) {
      setErrorOtpdetails({
        otp: " (6 digits)",
      });
      return false;
    } else {
      setErrorOtpdetails({
        otp: "",
      });
      return true;
    }
  }

  function QrcodeHandler(): any {
    const code = QrCodeDetails?.Code || ""; // Assuming QrCodeDetails is defined somewhere

    if (code === "") {
      setErrorQrCodedetails({
        QR: "Authentication Code is required",
      });
    } else if (code.length !== 6) {
      setErrorQrCodedetails({
        QR: "Six letters are required",
      });
    } else {
      setErrorQrCodedetails({
        QR: "",
      });
    }
  }

  const handlePasswordUpdate = () => {
    if (
      passwordDetails?.currentPassword !== "" ||
      passwordDetails?.newPassword !== "" ||
      passwordDetails?.confirmPassword !== ""
    ) {
      if (passwordPattern.test(passwordDetails?.newPassword)) {
        if (passwordDetails.currentPassword !== passwordDetails.newPassword) {
          if (passwordDetails.newPassword === passwordDetails.confirmPassword) {
            let passwordValues = {
              user_id: userProfile?.user?.user_id,
              old_password: passwordDetails.currentPassword,
              new_password: passwordDetails.newPassword,
            };
            dispatch(UpdatePassword(passwordValues))
              .unwrap()
              .then((res: any) => {
                toast.success("Password updated successfully");

                setPasswordDetails({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              })
              .catch((error: any) => {
                toast.error(error?.message);
              });
          }
        }
      }
    }
  };

  useEffect(() => {
    setItem(`/sidebarMenuId/${userProfile?.user?.user_id}`, "settings");
  }, [userProfile]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOtpDetails({
      OTP: "",
    });

    setErrorOtpdetails({
      OTP: "",
    });
    setErrorQrCodedetails({
      Code: "",
    });

    clearInterval(timer);
    setTimerStarted(false);
    setExpiryTime(expiryDurationSeconds);
  };

  const popupClose = () => {
    setShowTextPopup(false);
    setOpen(false);
    setOtpDetails({
      OTP: "",
    });

    setErrorOtpdetails({
      OTP: "",
    });
    setErrorQrCodedetails({
      Code: "",
    });

    clearInterval(timer);
    setTimerStarted(false);
    setExpiryTime(expiryDurationSeconds);
    setRecoveryKeyEnabled(false);
  };

  const handleSubmit = () => {
    setShowTextPopup(true);
    setRecoveryKeyEnabled(true);
  };

  const TwoFactorClose = () => {
    setShowTextPopup(false);
  };

  const startTimer = () => {
    const countdownTimer = setInterval(() => {
      setExpiryTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(countdownTimer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second

    setTimer(countdownTimer);
    setTimerStarted(true);
  };

  const handleStartTimer = () => {
    if (!timerStarted) {
      startTimer();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  const generateQRData = () => {
    return `otpauth://totp/${twoFactorRes?.name}?secret=${twoFactorRes?.secret_key}`;
  };

  const handleSendOtp = () => {
    let sendOtp = {
      email: userProfile?.user?.email,
      action: "enable",
    };
    dispatch(SendEmailOtp(sendOtp))
      .unwrap()
      .then((res: any) => {
        toast.success("OTP Sent");
      })
      .catch((error: any) => {
        if (error.message == "Try again later") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error("Otp Time Expired");
        }
      });
  };

  const handleVerificationOtp = () => {
    const otp = OtpDetails?.OTP || "";

    if (otp.trim() === "") {
      setErrorOtpdetails({
        otp: "OTP is required",
      });
      return;
    }

    const otpPattern = /^\d{6}$/;

    if (!otpPattern.test(otp)) {
      setErrorOtpdetails({
        otp: "OTP must be exactly 6 digit",
      });
      return;
    }

    dispatch(
      TwoFactorOtpVerification({
        email: userProfile?.user?.email,
        otp: otp, // Use validated OTP
      })
    )
      .unwrap()
      .then((res: any) => {
        toast.success("QR Generated");
        setTwoFactorRes(res);
        handleSubmit();
      })
      .catch((error: any) => {
        if (error.message == "Try again later") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error?.message);
          setErrorOtpdetails({
            otp: "Invalid OTP",
          });
        }
      });
  };

  const handleEnableFactor = () => {
    const code = QrCodeDetails?.Code || "";
    if (!code) {
      setErrorQrCodedetails({
        QR: "Authentication Code is required",
      });
      return;
    }

    if (code.length !== 6) {
      setErrorQrCodedetails({
        QR: "Six Digit Code is required",
      });
      return;
    }

    dispatch(
      TwoFactorCodeVerification({
        code: code,
        secretkey: twoFactorResponce?.secret_key,
      })
    )
      .unwrap()
      .then((res: any) => {
        toast.success("2 Factor Enabled");

        handleUpdateSessionData({ is_2fa_enable: true });
        setRecoveryKeyEnabled(false);
        setButtonText("Disable 2FA");

        // popupClose();
      })
      .catch((error: any) => {
        if (error.message == "Try again later") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error("Invalid authentication code");
          setErrorQrCodedetails({
            QR: "Invalid authentication code",
          });
        }
      });
  };

  const handleDidableSendOtp = () => {
    if (buttonText == "Disable 2FA") {
      let sendDisableOtp = {
        email: userProfile?.user?.email,
        action: "disable",
      };
      dispatch(SendEmailOtp(sendDisableOtp))
        .unwrap()
        .then((res: any) => {
          toast.success(" Disable OTP Sent");
        })
        .catch((error: any) => {
          if (error.message == "Try again later") {
            dispatch(updateSessionPopup(true));
          } else {
            toast.error("Otp Time Expired");
          }
        });
    }
  };

  const handleDisableVerificationOtp = () => {
    const otp = OtpDetails?.OTP || "";

    if (otp.trim() === "") {
      setErrorOtpdetails({
        otp: "Disable 2 Factor OTP is required",
      });
      return;
    }

    if (otpHandler(otp)) {
      dispatch(
        DisableTwoFactor({
          email: userProfile?.user?.email,
          otp: OtpDetails?.OTP,
          RecoveryKey: "",
        })
      )
        .unwrap()
        .then((res: any) => {
          toast.success("Disabled 2FA");
          handleUpdateSessionData({ is_2fa_enable: false });
          setButtonText("Enable 2FA");
          popupClose();
        })
        .catch((error: any) => {
          if (error.message == "Try again later") {
            dispatch(updateSessionPopup(true));
          } else {
            toast.error("Some Error Occured");
            setErrorOtpdetails({
              otp: "Enter Valid Otp",
            });
          }
        });
    }
  };

  const handleButtonClick = () => {
    buttonText === "Enable 2FA" ? handleSendOtp() : handleDidableSendOtp();
  };

  const handleSubmitClick = () => {
    buttonText === "Disable 2FA"
      ? handleDisableVerificationOtp()
      : handleVerificationOtp();
  };

  const toggleButton = () => {
    handleClickOpen();
  };

  const copyArrayToClipboard = (arr: any) => {
    // Convert array into an object with dynamic key names
    const formattedData = arr.reduce((acc: any, value: any, index: number) => {
      acc[`key${index + 1}`] = value; // Naming keys dynamically
      return acc;
    }, {});

    // Convert to JSON string and copy to clipboard
    const textToCopy = JSON.stringify(formattedData, null, 2);
    navigator.clipboard.writeText(textToCopy);
    toast.success("Recovery keys Copied");
  };

  return (
    <div>
      {loading && <GlobalLoader />}

      <Dialog
        open={open}
        onClose={popupClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            background: "black",
          },
        }}
      >
        <div>
          <div>
            <DialogContent>
              <DialogContentText>
                {showTextPopup ? (
                  <div style={{ width: "35rem", height: "28rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6
                        style={{
                          fontFamily: "Firasans-Regular",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {buttonText === "Disable 2FA"
                          ? "Disable 2FA"
                          : "Enable 2FA"}
                      </h6>
                      <h1
                        onClick={popupClose}
                        style={{
                          fontSize: "1rem",
                          cursor: "pointer",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        X
                      </h1>
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                      <h4
                        style={{
                          fontFamily: "Firasans-Regular",
                          fontWeight: "600",
                          color: "white",
                          fontSize: "0.8rem",
                          marginTop: "0.6rem",
                        }}
                      >
                        Set up with authenticator app
                      </h4>
                    </div>

                    <div>
                      {recoveryKeyEnabled ? (
                        <>
                          <p
                            style={{
                              fontFamily: "FiraSans-Regular",
                              fontSize: "0.8rem",
                              marginBottom: "3px",
                              color: "#9b9b9b",
                            }}
                          >
                            Scan QR code on app
                          </p>

                          <p
                            style={{
                              fontFamily: "FiraSans-Regular",
                              fontSize: "0.6rem",
                              color: "#9b9b9b",
                            }}
                          >
                            Scan the QR code with your authenticator app to
                            generate a unique code.
                          </p>

                          <div>
                            <QRCode value={generateQRData()} size={150} />
                          </div>
                          <p
                            style={{
                              fontFamily: "FiraSans-Regular",
                              fontSize: "0.6rem",
                              color: "rgb(2, 101, 210)",
                              marginTop: "0.6rem",
                              cursor: "pointer",
                            }}
                          >
                            Having trouble Scanning the QR code? Use Secret key{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              {twoFactorRes?.secret_key}
                            </span>
                          </p>
                          <p
                            style={{
                              fontFamily: "FiraSans-Regular",
                              fontSize: "0.9rem",
                              marginBottom: "2px",
                              color: "#9b9b9b",
                            }}
                          >
                            Authentication code
                          </p>

                          <p
                            style={{
                              fontFamily: "Firasans-Regular",
                              fontSize: "0.7rem",
                              color: "#c6c6c6",
                            }}
                          >
                            Enter the 6 digit authentication code generated by
                            your app
                          </p>
                          <GOtpField
                            value={QrCodeDetails?.Code}
                            onChange={(value: any) => {
                              setQrCodeDetails({
                                ...QrCodeDetails,
                                Code: value,
                              });
                            }}
                            errMsg={errorQrCodeDetails?.QR}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "1rem",
                            }}
                          >
                            <GButton
                              buttonType="primary"
                              label={"Next"}
                              width="100px"
                              padding={"5px"}
                              margin="0px"
                              onClickHandler={handleEnableFactor}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <p
                            style={{
                              fontFamily: "FiraSans-Regular",
                              fontSize: "0.9rem",
                              marginBottom: "2px",
                              color: "#9b9b9b",
                            }}
                          >
                            Recovery Keys{" "}
                            <CopyAll
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                copyArrayToClipboard(
                                  twoFactorRes?.recoveryKeys
                                );
                              }}
                            />
                          </p>
                          {twoFactorRes?.recoveryKeys?.map((key: string) => (
                            <p
                              key={key}
                              style={{
                                fontFamily: "FiraSans-Regular",
                                fontSize: "0.6rem",
                                color: "rgb(2, 101, 210)",
                                marginTop: "0.6rem",
                                cursor: "pointer",
                              }}
                            >
                              {key}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6
                        style={{
                          fontFamily: "FiraSans-Regular",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        {buttonText === "Disable 2FA"
                          ? "Disable 2FA"
                          : "Enable 2FA"}
                      </h6>
                      <h1
                        onClick={popupClose}
                        style={{
                          fontSize: "1rem",
                          cursor: "pointer",
                          fontWeight: "600",
                          color: "white",
                        }}
                      >
                        X
                      </h1>
                    </div>

                    <div>
                      <h3
                        style={{
                          fontFamily: "Firasans-Regular",
                          fontWeight: "600",
                          color: "white",
                          fontSize: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        Set up two-factor authentication
                      </h3>

                      <p
                        style={{
                          fontFamily: "Firasans-Regular",
                          fontSize: "0.8rem",
                          color: "#9b9b9b",
                        }}
                      >
                        It’s great that you wish to secure your account. Once it
                        is set up you will be signed out
                      </p>

                      <h4
                        style={{
                          fontFamily: "FiraSans-Regular",
                          fontWeight: "600",
                          color: "white",
                          fontSize: "0.8rem",
                          marginTop: "0.8rem",
                        }}
                      >
                        Before you get started, have the following ready:
                      </h4>

                      <p
                        style={{
                          fontFamily: "Firasans-Regular",
                          fontSize: "0.8rem",
                          color: "#9b9b9b",
                        }}
                      >
                        Install an authenticator app on your phone to get
                        two-factor authentication codes when prompted.
                      </p>
                    </div>

                    <div>
                      <p
                        style={{
                          marginTop: "2rem",
                          fontFamily: "Firasans-Regular",
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        Enter Your OTP
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <GOtpField
                          value={OtpDetails?.OTP}
                          onChange={(value: any) => {
                            setOtpDetails({
                              ...OtpDetails,
                              OTP: value,
                            });
                          }}
                          errMsg={errorOtpDetails?.otp}
                        />

                        {timerStarted && (
                          <p
                            style={{
                              fontFamily: "FiraSans-Regular",
                              fontSize: "0.8rem",
                              color: "white",
                              cursor: "pointer",
                              marginTop: 1,
                            }}
                          >
                            OTP Expires in:
                            <span style={{ color: "rgb(2, 101, 210)" }}>
                              {" "}
                              {formatTime(expiryTime)}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        marginTop: "1.2rem",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        gap: 8,
                      }}
                    >
                      <div></div>
                      <GButton
                        buttonType="secondary"
                        label={"Send OTP"}
                        width="100px"
                        padding={"5px"}
                        margin="0px"
                        onClickHandler={() => {
                          handleButtonClick();
                          handleStartTimer();
                        }}
                      />
                      <GButton
                        buttonType="primary"
                        label={"Submit"}
                        width="100px"
                        padding={"5px"}
                        margin="0px"
                        onClickHandler={handleSubmitClick}
                      />
                    </div>
                  </div>
                )}
              </DialogContentText>
            </DialogContent>
          </div>
        </div>
      </Dialog>

      <OuterBoxContainer>
        <HeadingTypography
          style={{
            fontSize: "20px",
            fontWeight: 900,
          }}
        >
          Account Settings
        </HeadingTypography>

        <hr />
        <div>
          <Accordion
            style={{
              background: "transparent",
              boxShadow: "none",
            }}
            expanded={changePasswordClicked}
          >
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  cursor: "auto",
                }}
              >
                <div style={{ marginLeft: "-20px", cursor: "auto" }}>
                  <PrimaryTypography
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                    onClick={() => setChangePasswordClicked(false)}
                  >
                    {translate("settings.PASSWORD")}
                  </PrimaryTypography>
                  <SecondaryTypography>
                    {translate("settings.CHANGE_YOUR_PASSWORD")}
                  </SecondaryTypography>
                </div>
                <div style={{ marginRight: "-20px" }}>
                  <GButton
                    buttonType="primary"
                    dataTest={"sign-up-button"}
                    label={translate("settings.CHANGE_PASSWORD")}
                    padding={"8px"}
                    margin="0px"
                    cursor="pointer"
                    onClickHandler={() => {
                      setChangePasswordClicked(!changePasswordClicked);
                    }}
                  />
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ marginLeft: "-20px", marginTop: "-20px" }}>
                <div className="col-6 pe-0">
                  <SecondarySignInUPTypography
                    sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                  >
                    Current password
                  </SecondarySignInUPTypography>

                  <GInput
                    fullWidth={true}
                    type={passwordVisibility === true ? "text" : "password"}
                    placeholder={"Enter your current password"}
                    // fontSize="13px"
                    radius="5px"
                    labelShrink={true}
                    dataTest={"password-input"}
                    variant="outlined"
                    value={passwordDetails?.currentPassword}
                    error={errorPasswordDetails?.currentPassword}
                    helperText={errorPasswordDetails?.currentPassword}
                    onChangeHandler={(e: any) => {
                      setPasswordDetails({
                        ...passwordDetails,
                        currentPassword: e.target.value,
                      });
                    }}
                    endAdornment={
                      <>
                        <InputAdornment position="end">
                          {passwordVisibility === true ? (
                            <VisibilityOffOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setPasswordVisibility(!passwordVisibility)
                              }
                            />
                          ) : (
                            <VisibilityOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setPasswordVisibility(!passwordVisibility)
                              }
                            />
                          )}
                        </InputAdornment>
                      </>
                    }
                  />
                </div>
                <div className="col-6 pe-0">
                  <SecondarySignInUPTypography
                    sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                  >
                    New password
                  </SecondarySignInUPTypography>

                  <GInput
                    fullWidth={true}
                    type={passwordNewVisibility === true ? "text" : "password"}
                    placeholder={"Enter your new password"}
                    radius="5px"
                    labelShrink={true}
                    dataTest={"email-input"}
                    variant="outlined"
                    value={passwordDetails?.newPassword}
                    error={errorPasswordDetails?.newPassword}
                    helperText={errorPasswordDetails?.newPassword}
                    onChangeHandler={(e: any) => {
                      setPasswordDetails({
                        ...passwordDetails,
                        newPassword: e.target.value,
                      });
                    }}
                    endAdornment={
                      <>
                        <InputAdornment position="end">
                          {passwordNewVisibility === true ? (
                            <VisibilityOffOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setPasswordNewVisibility(!passwordNewVisibility)
                              }
                            />
                          ) : (
                            <VisibilityOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setPasswordNewVisibility(!passwordNewVisibility)
                              }
                            />
                          )}
                        </InputAdornment>
                      </>
                    }
                  />
                </div>
                <div className="col-6 pe-0">
                  <SecondarySignInUPTypography
                    sx={{ fontSize: "0.8rem", fontWeight: "300" }}
                  >
                    Confirm new password
                  </SecondarySignInUPTypography>

                  <GInput
                    fullWidth={true}
                    type={
                      passwordConfirmVisibility === true ? "text" : "password"
                    }
                    placeholder={"Enter your new password to confirm"}
                    radius="5px"
                    labelShrink={true}
                    dataTest={"password-input"}
                    variant="outlined"
                    value={passwordDetails?.confirmPassword}
                    error={errorPasswordDetails?.confirmPassword}
                    helperText={errorPasswordDetails?.confirmPassword}
                    onChangeHandler={(e: any) => {
                      setPasswordDetails({
                        ...passwordDetails,
                        confirmPassword: e.target.value,
                      });
                      setErrorPasswordDetails("");
                    }}
                    endAdornment={
                      <>
                        <InputAdornment position="end">
                          {passwordConfirmVisibility === true ? (
                            <VisibilityOffOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setPasswordConfirmVisibility(
                                  !passwordConfirmVisibility
                                )
                              }
                            />
                          ) : (
                            <VisibilityOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setPasswordConfirmVisibility(
                                  !passwordConfirmVisibility
                                )
                              }
                            />
                          )}
                        </InputAdornment>
                      </>
                    }
                  />
                </div>
                <div>
                  <RadioCheckboxComponent
                    buttonWidth="18px"
                    label={
                      <SecondaryTypography
                        style={{
                          fontSize: "12px",
                        }}
                      >
                        Sign out from all other sessions
                      </SecondaryTypography>
                    }
                    checked={true}
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <GButton
                    buttonType="primary"
                    color="white"
                    dataTest={"sign-up-button"}
                    label={`Update Password`}
                    width="200px"
                    padding={"8px"}
                    margin="0px"
                    cursor="pointer"
                    onClickHandler={() => {
                      passwordErrorHandler();
                      handlePasswordUpdate();
                    }}
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <PrimaryTypography
              style={{
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {translate("settings.TWO_FACTOR_AUTHENTICATION")}
            </PrimaryTypography>
            <SecondaryTypography>
              {translate("settings.TWO_FACTOR_AUTHENTICATION_TEXT")}
            </SecondaryTypography>
          </div>
          <div>
            <GButton
              buttonType="primary"
              dataTest={"sign-up-button"}
              label={buttonText}
              padding={"8px"}
              margin="0px"
              onClickHandler={handleClickOpen}
            />
          </div>
        </div>
        <hr />
      </OuterBoxContainer>
    </div>
  );
}
