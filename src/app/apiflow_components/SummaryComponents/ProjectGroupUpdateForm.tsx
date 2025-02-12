import { TextOutlinedInput } from "@/app/hooks/operations/useOperationHelpers";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import GButton from "../global/GlobalButtons";
import GInput from "../global/GInput";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import {
  GetGroupsByWorkspaceIdSolrOffset,
  projectApiReducer,
} from "@/app/Redux/apiManagement/projectApiReducer";
import {
  environmentReducer,
  GetProjectById,
  GetProjectsByGroupOffset,
  UpdateGroups,
  UpdateProject,
} from "@/app/Redux/apiManagement/environmentReducer";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import toast from "react-hot-toast";
import theme from "@/Theme/theme";

const ProjectGroupUpdateForm = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<any>();

  const { currentProject, currentProjectDetails } = useSelector<
    RootStateType,
    projectApiReducer
  >((state) => state.apiManagement.apiProjects);

  const {
    currentEnvironment,
    currentEnvironmentDetails,
    enviProjectsListSolrOffset,
  } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const [updateValues, setUpdateValues] = useState({
    name: "",
    description: "",
  });

  const [errorApiName, setErrorApiName] = useState("");

  const handleUpdateState = (field: any, event: any) => {
    setUpdateValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleUpdateValuesValidation = () => {
    const hasValidationError = updateValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(updateValues?.name);

    const isOverLimit = updateValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
    }
  };

  const handleUpdateValues = () => {
    const hasValidationError = updateValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(updateValues?.name);

    const isOverLimit = updateValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
      if (pathname?.includes("/project")) {
        let data = {
          workspace_id: currentWorkspace?.id,
          requestBody: {
            group_id: currentProject,
            group_name: updateValues?.name,
            description: updateValues?.description,
          },
        };

        dispatch(UpdateGroups(data))
          .unwrap()
          .then((groupRes: any) => {
            toast?.success("Group Updated Successfully!");
            fetchCurrentProjectDetails();
          })
          .catch((error: any) => {
            console.log(error, "Error in updateGroup");
          });
      } else {
        let data = {
          workspace_id: currentWorkspace?.id,
          requestBody: {
            project_id: currentEnvironment,
            api_project_name: updateValues?.name,
            description: updateValues?.description,
            pin_project: true,
          },
        };

        dispatch(UpdateProject(data))
          .unwrap()
          .then((projectRes: any) => {
            toast?.success("Project Updated Successfully!");
            fetchCurrentEnvironmentDetails();
          })
          .catch((error: any) => {
            console.log(error, "error");
          });
      }
    }
  };

  const handleCancelBtn = () => {
    setUpdateValues({
      name: "",
      description: "",
    });
  };

  const fetchCurrentProjectDetails = () => {
    if (currentWorkspace?.id) {
      const data = {
        workspace_id: currentWorkspace?.id,
        // workspace_id: "3204d72de45844cab234cbe28e5a579d",
        start: 1,
        end: 5,
        direction: "asc",
      };

      dispatch(GetGroupsByWorkspaceIdSolrOffset(data))
        .unwrap()
        .then((res: any) => {})
        .catch((error: any) => {
          console.log(error, "error");
        });
    }
  };

  const fetchCurrentEnvironmentDetails = () => {
    dispatch(
      GetProjectById({
        project_id: currentEnvironment,
        workspace_id: currentWorkspace?.id,
      })
    )
      .unwrap()
      .then((res: any) => {})
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    if (pathname?.includes("/project")) {
      fetchCurrentProjectDetails();
    } else {
      fetchCurrentEnvironmentDetails();
    }
  }, [pathname, currentWorkspace?.id]);

  useEffect(() => {
    if (pathname?.includes("/project")) {
      setUpdateValues({
        // name: filteredValue[0].name || "",
        name: currentProjectDetails.name || "",
        description: "",
      });
    } else {
      const findData = enviProjectsListSolrOffset?.filter(
        (filterVal) => filterVal?.project_id === currentEnvironment
      );

      setUpdateValues({
        name: findData[0]?.name || "",
        description: findData[0]?.description || "",
      });
    }
  }, [pathname, currentProjectDetails, currentEnvironment]);

  return (
    <div>
      <div style={{ padding: "25px" }}>
        <PrimaryTypography
          style={{
            fontSize: "18px",
            fontFamily: "FiraSans-regular",
            fontWeight: 900,
          }}
        >
          Update {pathname?.includes("/project") ? "Group" : "Project"}
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
              {pathname?.includes("/project") ? "Group Name" : "Project Name"}
            </PrimaryTypography>
            <GInput
              value={updateValues?.name}
              fullWidth={false}
              disabled={true}
              disabledColor={theme.palette.textPrimaryColor.main}
              height="40px"
              width="500px"
              margin="10px 0px"
              padding="7px 0px"
              size="normal"
              onChangeHandler={(e: any) => {
                handleUpdateState("name", e.target.value);
              }}
              onKeyDown={(event: any) => {
                if (event?.key === "Enter") {
                  handleUpdateValuesValidation();
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
              {pathname?.includes("/project")
                ? "Group Description"
                : "Project Description"}
            </PrimaryTypography>
            <FormControl>
              <div style={{ marginTop: "10px" }}>
                <TextOutlinedInput
                  value={updateValues?.description}
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
                    handleUpdateState("description", e.target.value);
                  }}
                  onKeyUp={(event: any) => {}}
                />
              </div>
            </FormControl>
          </div>
        </div>
        <div style={{ margin: "10px" }} className="api_designFlow_buttons">
          <div style={{ display: "flex" }}>
            <div>
              <GButton
                buttonType="primary"
                fontSize="14px"
                label={`Cancel`}
                background="transparent"
                onClickHandler={handleCancelBtn}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              <GButton
                buttonType="primary"
                fontSize="14px"
                label={
                  pathname?.includes("/project")
                    ? "Update Group"
                    : "Update Project"
                }
                onClickHandler={handleUpdateValues}
                dataTest="save-project-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGroupUpdateForm;
