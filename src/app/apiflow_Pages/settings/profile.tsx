"use client";
import React, { useEffect, useState } from "react";
import { OuterBoxContainer } from "../../Styles/dashboradStyledComponents";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondarySignInUPTypography,
} from "../../Styles/signInUp";
import { Box, useTheme } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { emailPattern, mobilePattern } from "../../Utilities/regex";
import { translate } from "../../Helpers/helpersFunctions";


import { useSelector } from "react-redux";
import {
  CommonReducer,
  GetCompanyByTenantId,
  UpdateCompanyDetails,
  UpdateUser,
} from "../../Redux/commonReducer";
import { RootStateType } from "../../Redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import GInput from "@/app/apiflow_components/global/GInput";
import GButton from "@/app/apiflow_components/global/GlobalButtons";

export default function Profile() {
  const dispatch = useDispatch<any>();
  const theme = useTheme();

  const { userProfile, loading } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const [companyId, setCompanyId] = useState("");

  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    imageCover: "",
    profilePicture: "",
  });

  const [companyDetails, setCompanyDetails] = useState<any>({
    companyName: "",
    mobileNumber: "",
    occupation: "",
    website: "",
  });

  const [error, setError] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    companyName: "",
    mobileNumber: "",
    occupation: "",
    website: "",
  });

  function settingsProfileHandler() {
    if (
      formData?.first_name === "" ||
      formData?.last_name === "" ||
      formData?.email === "" ||
      companyDetails?.companyName === "" ||
      companyDetails?.mobileNumber === "" ||
      companyDetails?.occupation === "" ||
      companyDetails?.website === ""
    ) {
      setError({
        first_name: formData?.first_name === "" ? "First Name is required" : "",
        last_name: formData?.last_name === "" ? "Last Name is required" : "",
        mobileNumber:
          companyDetails?.mobileNumber === ""
            ? "Mobile Number is required"
            : "",
        occupation:
          companyDetails?.occupation === "" ? "Occupation is required" : "",
      });
    } else if (mobilePattern.test(companyDetails.mobileNumber)) {
      setError({
        first_name: "",
        last_name: "",
        email: "",
        companyName: "",
        mobileNumber: "Invalid phone number",
        occupation: "",
        website: "",
      });
    } else {
      setError({
        first_name: "",
        last_name: "",
        email: "",
        companyName: "",
        mobileNumber: "",
        occupation: "",
        website: "",
      });
    }
  }

  const handleImageCoverHandler = (e: any) => {
    console.log("E: ", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      if (file?.type?.startsWith("image/")) {
        const maxSize = 2 * 1024 * 1024;
        console.log("FileSize: ", file.size, maxSize);

        if (file?.size < maxSize) {
          const reader = new FileReader();

          reader.onload = function (e: any) {
            const base64Image = e.target.result;
            console.log("Base64 Image:", base64Image);

            setFormData({
              ...formData,
              imageCover: base64Image,
            });
          };

          reader.readAsDataURL(file);
        } else {
          toast.error("Image size should be less than 2MB");
        }
      } else {
        toast.error("Selected file is not an image");
      }
    }
  };

  const handleProfilePictureHandler = (e: any) => {
    console.log("E: ", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      if (file?.type?.startsWith("image/")) {
        // const imageUrl = URL.createObjectURL(file);
        // setProfilePicture(imageUrl);

        const maxSize = 2 * 1024 * 1024;
        console.log("FileSize: ", file.size, maxSize);

        if (file?.size < maxSize) {
          const reader = new FileReader();

          reader.onload = function (e: any) {
            const base64Image = e.target.result;
            console.log("Base64ProfileImage: ", base64Image);

            setFormData({
              ...formData,
              profilePicture: base64Image,
            });
          };
          reader.readAsDataURL(file);
        } else {
          toast.error("Image size should be less than 2MB");
        }
      } else {
        toast.error("Selected file is not an image");
      }
    } else {
      toast.error("No image selected");
    }
  };

  const handleUpdateProfile = () => {
    console.log("Reach", formData?.first_name?.length);
    if (formData?.first_name === "" || formData?.last_name === "") {
      setError({
        first_name: formData?.first_name === "" ? "First Name is required" : "",
        last_name: formData?.last_name === "" ? "Last Name is required" : "",
        mobileNumber:
          companyDetails?.mobileNumber === ""
            ? "Mobile number is required"
            : "",
        occupation:
          companyDetails?.occupation === "" ? "Occupation is required" : "",
      });
    } else if (mobilePattern.test(companyDetails?.mobileNumber)) {
      setError({
        mobileNumber: "Invalid mobile number",
      });
    } else {
      let updateUserData = {
        user_id: userProfile?.user?.user_id,
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        email: formData.email,
        profile_picture: formData?.profilePicture,
        cover_picture: formData?.imageCover,
      };

      let updateCompanyData = {
        company_id: companyId,
        your_company_name: companyDetails?.companyName,
        your_mobile_number: companyDetails?.mobileNumber,
        your_occupation: companyDetails?.occupation,
        company_website: companyDetails?.website,
      };

      dispatch(UpdateUser(updateUserData))
        .unwrap()
        .then((res: any) => {
          console.log("UpadateUserResponse: ", res);
          toast.success("Profile updated successfully");
        })
        .catch((error: any) => {
          console.log("error: ", error);
        });
    }
  };

  useEffect(() => {
    setFormData({
      first_name: userProfile?.user?.first_name,
      last_name: userProfile?.user?.last_name,
      email: userProfile?.user?.email,
      imageCover: userProfile?.user?.cover_picture,
      profilePicture: userProfile?.user?.profile_picture,
    });
  }, [userProfile]);

  useEffect(() => {
    dispatch(GetCompanyByTenantId(userProfile?.user?.tenant_id))
      .unwrap()
      .then((response: any) => {
        console.log("Response: ", response);
        let values = response[0];
        console.log("Values: ", values);
        setCompanyDetails({
          companyName: values.your_company_name,
          mobileNumber: values.your_mobile_number,
          occupation: values.your_occupation,
          website: values.company_website,
        });
        setCompanyId(values.company_id);
      })
      .catch((error: any) => {
        console.log("error: ", error);
      });
    console.log("tenantId: ", userProfile?.user?.tenant_id);
  }, []);

  return (
    <div>
      {loading && <GlobalLoader />}

      <OuterBoxContainer>
        <HeadingTypography
          style={{
            fontSize: "20px",
            fontWeight: 900,
          }}
        >
          {translate("settings.PROFILE")}
        </HeadingTypography>
        <PrimaryTypography
          style={{
            fontSize: "14px",
            fontWeight: 700,
            marginTop: "20px",
          }}
        >
          {translate("settings.PROFILE_TEXT")}
        </PrimaryTypography>
        <div style={{ marginTop: "10px" }}>
          <Box
            sx={{
              width: "950px",
              height: "100px",
              background: `${theme.palette.LGrayishBlue.main}`,
              border: `${theme.palette.primaryBlack.main}`,
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              {(formData.imageCover || userProfile?.user?.cover_picture) && (
                <img
                  // src={imageCover}
                  src={formData.imageCover || userProfile?.user?.cover_picture}
                  alt=""
                  style={{
                    width: "950px",
                    height: "100px",
                    borderRadius: "4px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 9999,
                }}
              >
                <input
                  id={`file-upload-input`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageCoverHandler}
                />
                <label htmlFor={`file-upload-input`}>
                  <div
                    style={{
                      display: "flex",
                      background: `${theme.palette.primaryBlack.main}`,
                      marginTop: "70px",
                      marginLeft: "900px",
                      padding: "2px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    <EditIcon
                      style={{
                        width: "13px",
                        height: "13px",
                        marginLeft: "2px",
                        color: `${theme.palette.primaryWhite.main}`,
                      }}
                    />
                    <ExpandMore
                      style={{
                        width: "13px",
                        height: "13px",
                        marginTop: "1px",
                        marginLeft: "4px",
                        color: `${theme.palette.primaryWhite.main}`,
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          </Box>
        </div>
        <div
          style={{
            // position: 'absolute',
            marginTop: "-30px",
            marginLeft: "15px",
          }}
        >
          <Box
            sx={{
              width: "75px",
              height: "75px",
              background: `${theme.palette.LGrayishBlue.main}`,
              border: `1.5px solid ${theme.palette.primaryBlack.main}`,
              borderRadius: "50%",
              position: "relative",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                position: "relative",
              }}
            >
              {(formData.profilePicture ||
                userProfile?.user?.profile_picture) && (
                <img
                  // src={profilePicture || SocialImage}
                  src={
                    formData.profilePicture ||
                    userProfile?.user?.profile_picture
                  }
                  alt=" "
                  style={{
                    width: "74px",
                    height: "74px",
                    borderRadius: "50%",
                  }}
                />
              )}
              <div
                style={{
                  // position: 'absolute',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 9999,
                }}
              >
                <input
                  id={`file-upload-inputProfile`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePictureHandler}
                />
                <label htmlFor={`file-upload-inputProfile`}>
                  <div
                    style={{
                      display: "flex",
                      background: `${theme.palette.primaryBlack.main}`,
                      padding: "2px",
                      borderRadius: "3px",
                      cursor: "pointer",
                      marginTop: "50px",
                      // marginLeft: "60px",
                      marginRight: "-10px",
                    }}
                  >
                    <EditIcon
                      style={{
                        width: "13px",
                        height: "13px",
                        marginLeft: "2px",
                        color: `${theme.palette.primaryWhite.main}`,
                      }}
                    />
                    <ExpandMore
                      style={{
                        width: "13px",
                        height: "13px",
                        marginTop: "1px",
                        marginLeft: "4px",
                        color: `${theme.palette.primaryWhite.main}`,
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
          </Box>
        </div>
        <div>
          <div style={{ marginTop: "30px" }}>
            <PrimaryTypography
              style={{
                fontSize: "14px",
                fontWeight: 700,
                marginTop: "20px",
              }}
            >
              {translate("settings.PROFILE_DETAILS")}
            </PrimaryTypography>
            <div className="col-6 ps-0">
              <SecondarySignInUPTypography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "300",
                  marginTop: "10px",
                }}
              >
                {translate("signInUp.FIRST_NAME")}
              </SecondarySignInUPTypography>
              <GInput
                fullWidth={true}
                type="text"
                placeholder={translate("signInUp.FIRST_NAME_PLACEHOLDER")}
                radius="5px"
                labelShrink={true}
                dataTest={"email-input"}
                value={formData?.first_name}
                error={error?.first_name}
                helperText={error?.first_name}
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    first_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-6 pe-0">
              <SecondarySignInUPTypography
                sx={{ fontSize: "0.8rem", fontWeight: "300" }}
              >
                {translate("signInUp.LAST_NAME")}
              </SecondarySignInUPTypography>

              <GInput
                fullWidth={true}
                type="text"
                placeholder={translate("signInUp.LAST_NAME_PLACEHOLDER")}
                // fontSize="13px"
                radius="5px"
                labelShrink={true}
                dataTest={"email-input"}
                value={formData?.last_name}
                error={error?.last_name}
                helperText={error?.last_name}
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    last_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-6 p-0">
              <SecondarySignInUPTypography
                sx={{ fontSize: "0.8rem", fontWeight: "300" }}
              >
                {translate("signInUp.EMAIL")}
              </SecondarySignInUPTypography>

              <GInput
                fullWidth={true}
                type="email"
                placeholder={translate("signInUp.EMAIL_PLACEHOLDER")}
                radius="5px"
                labelShrink={true}
                dataTest={"email-input"}
                disabled={true}
                value={formData?.email}
                error={error?.email}
                helperText={error?.email}
                onChangeHandler={(e: any) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="mt-3">
            <GButton
              buttonType="primary"
              dataTest={"sign-up-button"}
              label={`${translate("settings.UPDATE_PROFILE")}`}
              width="200px"
              padding={"8px"}
              margin="0px"
              cursor="pointer"
              onClickHandler={() => {
                settingsProfileHandler();
                console.log("FormData: ", formData);
                handleUpdateProfile();
              }}
            />
          </div>
        </div>
      </OuterBoxContainer>
    </div>
  );
}
