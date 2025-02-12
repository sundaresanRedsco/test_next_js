import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { RootStateType } from "@/app/Redux/store";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import theme from "@/Theme/theme";
import { Box, FormControl, Popover } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ApiTextField from "@/app/apiflow_components/global/apiTextField";
import GInput from "@/app/apiflow_components/global/GInput";
import { TextOutlinedInput } from "@/app/hooks/operations/useOperationHelpers";
import GButton from "@/app/apiflow_components/global/GlobalButtons";
import {
  CreateApiDesignFlow,
  GetDesignflowMinamlInfoFlowoffset,
} from "@/app/Redux/apiManagement/flowReducer";
import toast from "react-hot-toast";
import { updateSessionPopup } from "@/app/Redux/commonReducer";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";

const CreateWorflowPopup = (props: any) => {
  const { open, setOpen } = props;

  const dispatch = useDispatch<any>();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  // const [anchorEl, setAnchorEl] = useState(anchorElProp);
  const [errorApiName, setErrorApiName] = useState("");
  const [createNewApiFlowValues, setCreateNewApiFlowValues] = useState({
    workspace_id: currentWorkspace?.id,
    name: "",
    description: "",
  });

  const handleClosePopover = () => {
    setOpen(false);
    //   setBtnClicked(false);

    setCreateNewApiFlowValues({
      description: "",
      name: "",
      workspace_id: "",
    });
    setErrorApiName("");
  };

  const handleCreateNewApiFlow = (field: any, event: any) => {
    setCreateNewApiFlowValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleCreateApiFlowValidation = () => {
    const hasValidationError = createNewApiFlowValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      createNewApiFlowValues?.name
    );

    const isOverLimit = createNewApiFlowValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
    }
  };

  const handleCreateApiFlow = () => {
    const hasValidationError = createNewApiFlowValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      createNewApiFlowValues?.name
    );

    const isOverLimit = createNewApiFlowValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
      let createData = {
        workspace_id: currentWorkspace?.id,
        projectid: currentEnvironment,
        name: createNewApiFlowValues?.name,
        description: createNewApiFlowValues?.description,
        id: "",
      };

      dispatch(CreateApiDesignFlow(createData))
        .unwrap()
        .then((createRes: any) => {
          let requestData = {
            project_id: currentEnvironment,
            start: 1,
            end: 6,
            name: "",
          };

          dispatch(GetDesignflowMinamlInfoFlowoffset(requestData))
            .unwrap()
            .then((getApiFlowRes: any) => {
              toast?.success("New Api Flow Created");

              setCreateNewApiFlowValues({
                description: "",
                name: "",
                workspace_id: "",
              });
              setOpen(false);
              //   setBtnClicked(false);
            })
            .catch((error: any) => {
              if (error?.message === "UNAUTHORIZED") {
                dispatch(updateSessionPopup(true));
              }
            });
        })
        .catch((error: any) => {
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  };

  return (
    <Box>
      <Popover
        open={open}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.summaryBgColor.main,
            width: "580px",
            height: "380px",
            // position: "absolute",
          },
        }}
      >
        <div style={{ padding: "25px" }}>
          <PrimaryTypography
            style={{
              fontSize: "18px",
              fontFamily: "FiraSans-regular",
              fontWeight: 900,
            }}
          >
            Create a new ApiFlow
          </PrimaryTypography>
          <div style={{ marginTop: "10px" }}>
            <div className="api_designFlow_name">
              <PrimaryTypography
                style={{
                  fontSize: "14px",
                  fontFamily: "FiraSans-regular",
                  fontWeight: 900,
                }}
              >
                ApiFlow Name
              </PrimaryTypography>
              <GInput
                value={createNewApiFlowValues?.name}
                fullWidth={false}
                height="40px"
                width="500px"
                margin="10px 0px"
                padding="7px 0px"
                size="normal"
                onChangeHandler={(e: any) => {
                  handleCreateNewApiFlow("name", e.target.value);
                }}
                onKeyDown={(event: any) => {
                  if (event?.key === "Enter") {
                    handleCreateApiFlowValidation();
                  }
                }}
                error={errorApiName}
                helperText={errorApiName}
                errorHandler={(error: any) => setErrorApiName(error)}
              />
              <span
                style={{
                  whiteSpace: "pre",
                }}
              >
                {"  "}
              </span>
            </div>
            <div className="api_designFlow_description">
              <PrimaryTypography
                style={{
                  fontSize: "14px",
                  fontFamily: "FiraSans-regular",
                  fontWeight: 900,
                }}
              >
                ApiFlow Description
              </PrimaryTypography>
              <FormControl>
                <div style={{ marginTop: "10px" }}>
                  <TextOutlinedInput
                    value={createNewApiFlowValues?.description}
                    data-test={"project-description"}
                    style={{
                      width: "500px",
                      height: "50px",
                      // borderColor: "#9CA3AF",
                      borderColor: "0 0 0 1.3px #F3F3F340",
                      borderRadius: "4px",
                      fontWeight: 700,
                    }}
                    onChange={(e: any) => {
                      handleCreateNewApiFlow("description", e.target.value);
                    }}
                    onKeyUp={(event: any) => {}}
                  />
                </div>
              </FormControl>
            </div>
          </div>
          <div style={{ margin: "10px" }} className="api_designFlow_buttons">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div>
                <GButton
                  buttonType="primary"
                  fontSize="14px"
                  label={`Cancel`}
                  background="transparent"
                  onClickHandler={handleClosePopover}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <GButton
                  buttonType="primary"
                  fontSize="14px"
                  label={`Create ApiFlow`}
                  onClickHandler={handleCreateApiFlow}
                  dataTest="save-project-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </Box>
  );
};

export default CreateWorflowPopup;
