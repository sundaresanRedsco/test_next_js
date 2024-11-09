import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import GlobalTextField from "../../ApiFlowComponents/Global/GlobalTextField";
import GlobalTextArea from "../../ApiFlowComponents/Global/GlobalTextArea";
import GlobalToggleSwitch from "../../ApiFlowComponents/Global/GlobalToggleSwitch";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GlobalButton from "../../ApiFlowComponents/Global/GlobalButton";
import UserV2Icon from "../../Assests/icons/v2UserIcon.svg";
import GButton from "../../ApiFlowComponents/Global/GButton";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { workspaceReducer } from "../../Redux/apiManagement/workspaceReducer";
import {
  CreateApiDesignFlow,
  FlowReducer,
} from "../../Redux/apiManagement/flowReducer";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";
import GlobalCircularLoader from "../../ApiFlowComponents/Global/GlobalCircularLoader";
import { useAlert } from "../../../context/alertContext";
import { setAddTabs, setRemoveTabs } from "../../Redux/tabReducer";
import { CommonReducer } from "../../Redux/commonReducer";

const PrimaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #000000;
  font-size: 0.7rem;
  font-weight: 600;
`;

const DescriptionTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #000000;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 1rem;
`;

const ContentTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: #000000;
  font-size: 0.7rem;
  margin-top: 1rem;
`;

interface userDataErrorsType {
  description?: string;
  flow_name?: string;
}

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  // padding: 10px 25px;
`;

function ApiflowDesignEA(props: any) {
  const { id, onCloseHandler } = props;

  const dispatch = useDispatch<any>();
  const { showAlert } = useAlert();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { loading } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const { currentEnvironmentDetails, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);
  console.log(currentEnvironmentDetails, "currentEnvironmentDetails");

  console.log(currentStage, "currentStagesasasasaw");

  const [inputValue, setInputValue] = useState("Dev-AWS-Env");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [formData, setFormData] = useState({
    flow_name: "", // For the GlobalTextField
    description: "", // For the GlobalTextArea
  });
  console.log(formData?.description);

  const [formErrors, setFormErrors] = useState<userDataErrorsType>({
    flow_name: "",
    description: "",
  });

  const hasSpecialChars = (str: any) => /[^a-zA-Z0-9_ ]/g.test(str);

  const hasNumbers = (str: any) => /\d/g.test(str);

  const isValidLength = (str: any, min = 3, max = 50) =>
    str.length >= min && str.length <= max;

  const validateForm = () => {
    const newErrors: userDataErrorsType = {};

    if (formData.flow_name === "") {
      newErrors.flow_name = "Flow Name is required";
    } else if (hasSpecialChars(formData.flow_name)) {
      newErrors.flow_name = "Flow Name should not contain special characters";
    } else if (!isValidLength(formData.flow_name, 3, 50)) {
      newErrors.flow_name = "Flow Name should be between 3 and 50 characters";
    }

    if (formData.description === "") {
      newErrors.description = "Description is required";
    } else if (!isValidLength(formData.description, 0, 200)) {
      newErrors.description = "Description limit 200 characters";
    }

    setFormErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Example submit handler
  const handleSubmit = () => {
    // e.preventDefault();
    if (validateForm()) {
      let createData = {
        // tenant_id: userProfile?.user?.tenant_id,
        workspace_id: currentWorkspace?.id,
        projectid: currentEnvironmentDetails?.project_id,
        stageid: currentStage,
        name: formData?.flow_name,
        description: formData?.description,
        // user_id: userProfile?.user.user_id,
      };

      dispatch(CreateApiDesignFlow(createData))
        .unwrap()
        .then((createRes: any) => {
          setFormData({
            flow_name: "",
            description: "",
          });
          showAlert(
            "Success",
            createRes?.name,
            "Flow Created",
            "",
            () => console.log("Alert closed"),
            () => console.log("Alert clicked")
          );
          dispatch(setRemoveTabs("new_API_flow"));
          dispatch(setAddTabs("designflow_" + createRes.id));
        })
        .catch((error: any) => {
          if (error?.message === "UNAUTHORIZED") {
            // dispatch(updateSessionPopup(true));
          }
        });
      // Proceed with form submission
      console.log("Form is valids!");
    } else {
      console.log("Form has errors.");
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };

  return (
    <div>
      <GlobalHeader id={id} onCloseHandler={onCloseHandler} />

      <CardContainer
        style={{
          padding: "10px 10px",
        }}
      >
        {loading && <GlobalCircularLoader open={loading} />}
        <Grid container spacing={3}>
          <Grid
            item
            // xs={12}
            // sm={6}

            xl={6}
            xs={12}
            sm={12}
            md={6}
            sx={{ paddingRight: "3rem", marginTop: "2rem" }}
          >
            <PrimaryTypography>API Flow Name</PrimaryTypography>

            {/* <GlobalTextField
            name={""}
            fontSize="0.6rem"
            value={inputValue}
            onChange={handleInputChange}
          /> */}

            <GlobalTextField
              name={""}
              fontSize="0.6rem"
              value={formData.flow_name}
              //   onChange={handleInputChange}
              onChange={(e: any) => {
                setFormData({
                  ...formData,
                  flow_name: e.target.value,
                });
              }}
              error={formErrors?.flow_name}
              placeholder="Workspace Name"
            />

            <DescriptionTypography>API Flow Description</DescriptionTypography>
            <div style={{ marginTop: "0.7rem" }}>
              {/* <GlobalTextArea fullWidth /> */}

              <GlobalTextArea
                name="description"
                fullWidth
                value={formData.description}
                onChange={(value: any) => {
                  setFormData({
                    ...formData,
                    description: value,
                  });
                }}
                placeholder="Description"
                error={formErrors.description} // Conditionally display error
                helperText={formErrors.description} // Display the error message
              />
            </div>

            <DescriptionTypography>Project Team</DescriptionTypography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.5rem",
              }}
            >
              <UserV2Icon style={{ height: "5%", width: "5%" }} />
              <GButton
                buttonShape="circular"
                // buttonType='primary'
                background="#F6F9FF"
                color="#9A93B9"
                label="invite"
                padding="1px 30px"
                minWidth="35px"
              />
            </div>
            {/* <button onClick={handleSubmit}>test</button> */}

            <DescriptionTypography style={{ marginTop: "4rem" }}>
              Test Cases
            </DescriptionTypography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ContentTypography>
                  Include Functional Test Cases
                </ContentTypography>
                <ContentTypography>
                  Include Performance Test Cases
                </ContentTypography>
                <ContentTypography>
                  Include GEO Location Test Cases
                </ContentTypography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <GlobalToggleSwitch
                    checked={isSwitchOn}
                    onChange={handleSwitchChange}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <GlobalToggleSwitch
                  // checked={isSwitchOn}
                  // onChange={handleSwitchChange}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <GlobalToggleSwitch
                    checked={isSwitchOn}
                    onChange={handleSwitchChange}
                  />
                </div>

                {/* <DescriptionTypography>Ddsds</DescriptionTypography>
              <DescriptionTypography>hhg</DescriptionTypography> */}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            //  xs={12} sm={6}
            xl={6}
            xs={12}
            sm={12}
            md={6}
            sx={{ marginTop: "2rem" }}
          >
            <PrimaryTypography>Security Scans</PrimaryTypography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ContentTypography>
                  Include Functional Test Cases
                  <span
                    style={{
                      color: "#000080",
                      marginLeft: "1rem",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                    }}
                  >
                    Details{" "}
                    <ArrowForwardIosIcon style={{ fontSize: "0.5rem" }} />
                  </span>
                </ContentTypography>
                <ContentTypography>
                  Include Performance Test Cases
                  <span
                    style={{
                      color: "#000080",
                      marginLeft: "1rem",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                    }}
                  >
                    Details{" "}
                    <ArrowForwardIosIcon style={{ fontSize: "0.5rem" }} />
                  </span>
                </ContentTypography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <GlobalToggleSwitch
                // checked={isSwitchOn}
                // onChange={handleSwitchChange}
                />

                <div style={{ marginTop: "1rem" }}>
                  <GlobalToggleSwitch
                    checked={isSwitchOn}
                    onChange={handleSwitchChange}
                  />
                </div>
              </Grid>
            </Grid>

            <div
              style={{
                display: "flex",
                justifyContent: "center", // Centers the button horizontally
                alignItems: "center", // Centers the button vertically within the div
                marginTop: "17rem", // Optional: Adjust margin for better spacing
              }}
            >
              <GlobalButton
                label={"Next"}
                background="#282F79"
                color="#FFFFFF"
                padding="8px 75px"
                onClickHandler={handleSubmit}
              />
            </div>
          </Grid>
        </Grid>
      </CardContainer>
    </div>
  );
}

export default ApiflowDesignEA;
