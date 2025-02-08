"use client";
import {
  CreateWorkspace,
  workspaceReducer,
} from "@/app/Redux/apiManagement/workspaceReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import { setRemoveTabs } from "@/app/Redux/tabReducer";
import { initSession } from "@/app/Services/auth";
import { useAlert } from "@/context/alertContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpStore } from "./signZustand";
import { errorHandling } from "@/app/Services/errorHandling";

interface userDataErrorsType {
  description?: string;
  workspace_name?: string;
  method?: string;
}

export default function useWorkspace(userData?: any) {
  const dispatch = useDispatch<any>();
  const {
    setApiDataStore,
    handleStep,
    setIsLoading,
    apiDataStore,
    formDataStore,
    setFormDataStore,
  } = useSignUpStore();
  const { showAlert } = useAlert();

  const { loading, workSpaceResponce } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const [formData, setFormData] = useState({
    workspace_name: "",
    description: "",
    post_content: "null",
    is_channel: true,
  });
  const [methodErr, setmethodErr] = useState("");
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "Error" | "Success";
  } | null>(null);

  const [formErrors, setFormErrors] = useState<userDataErrorsType>({
    workspace_name: "",
    description: "",
    method: "",
  });

  const [formNewError, setFormNewerror] = useState<any>("");
  const hasSpecialChars = (str: any) => /[^a-zA-Z0-9_ ]/g.test(str);
  const hasNumbers = (str: any) => /\d/g.test(str);
  const isValidLength = (str: any, min = 3, max = 50) =>
    str.length >= min && str.length <= max;

  const validateForm = () => {
    const newErrors: userDataErrorsType = {};
    if (formData.workspace_name === "") {
      newErrors.workspace_name = "Workspace Name is required";
    } else if (hasSpecialChars(formData.workspace_name)) {
      newErrors.workspace_name =
        "Workspace Name should not contain special characters";
    } else if (!isValidLength(formData.workspace_name, 3, 50)) {
      newErrors.workspace_name =
        "Workspace Name should be between 3 and 50 characters";
    } else if (formDataStore?.gateway == "" || !formDataStore?.gateway) {
      newErrors.method = "Discovery type is required";
    }
    // if (formData.description === "") {
    //   newErrors.description = "Description is required";
    // } else if (!isValidLength(formData.description, 0, 200)) {
    //   newErrors.description = "Description should be 200 characters";
    // }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const access_token = userData?.user?.token;
    if (validateForm()) {
      // let WorkSpaceDetails;
      // WorkSpaceDetails = {
      //   // user_id: userProfile?.user.user_id,
      //   // tenant_id: userProfile?.user?.tenant_id,
      //   name: formData.workspace_name,
      //   summary: formData.description,
      //   permission: formData?.visibility,
      //   post_content: "null",
      // };

      // dispatch(CreateWorkspace(WorkSpaceDetails))
      //   .unwrap()
      //   .then((res: any) => {
      //     toast.success("Workspace Created");
      //     console.log("UpdateResponse: ", res);
      //     let name = res?.name;
      //     showAlert(
      //       "Success",
      //       name,
      //       "Workspace Created",
      //       "",
      //       () => console.log("Alert closed"),
      //       () => console.log("Alert clicked")
      //     );
      //     dispatch(setRemoveTabs("new_workspace"));
      //   })
      //   .catch((error: any) => {
      //     console.log(error, "error OccurredWork");
      //     setFormNewerror(error.message);
      //     toast.error(error.message);
      //   });

      if (apiDataStore?.workspace?.id && apiDataStore?.workspace) {
        const prevData = apiDataStore?.workspace;
        if (
          formData.description == prevData?.summary &&
          formData.workspace_name == prevData?.name &&
          formData.is_channel == prevData?.is_channel
        ) {
          handleStep();
          setIsLoading(false);
        } else {
          try {
            const { data }: any = await axios.post(
              process.env.NEXT_PUBLIC_APP_BACKEND_URL +
                "/Api/Workspace_/update_workspace?workspace_id=" +
                apiDataStore?.workspace?.id,
              {
                workspace_id: apiDataStore?.workspace?.id,
                name: formData.workspace_name,
                descriptions: formData.description,
                profile_picture: "",
                is_channel: formData.is_channel,
              },
              { headers: { Authorization: "Bearer " + access_token } }
            );

            if (data) {
              setApiDataStore("workspace", data);
              setFormDataStore("workspace", formData);
              handleStep();
              setIsLoading(false);
            } else {
              console.log("Form has errors.");
              setIsLoading(false);
            }
          } catch (error: any) {
            if (error?.response && error?.response?.status === 401) {
              setIsLoading(false);
              throw new Error("UNAUTHORIZED");
            }

            setIsLoading(false);
            if (error?.response?.data?.errors?.descriptions?.length > 0) {
              setFormErrors((prev: any) => ({
                ...prev,
                description: error?.response?.data?.errors?.descriptions[0],
              }));
            }
            // throw new Error(errorHandling(error));
          }
        }
      } else {
        try {
          const { data }: any = await axios.post(
            process.env.NEXT_PUBLIC_APP_BACKEND_URL +
              "/Api/Workspace_/workspace_create",
            {
              name: formData.workspace_name,
              summary: formData.description,
              permission: "",
              post_content: "null",
              profile_picture: "",
              is_channel: formData.is_channel,
            },
            { headers: { Authorization: "Bearer " + access_token } }
          );

          if (data) {
            setApiDataStore("workspace", data);
            setFormDataStore("workspace", formData);
            handleStep();
            setIsLoading(false);
          } else {
            console.log("Form has errors.");
            setIsLoading(false);
          }
        } catch (error: any) {
          if (error?.response && error?.response?.status === 401) {
            setIsLoading(false);
            throw new Error("UNAUTHORIZED");
          }
          setFormNewerror(error?.response?.data?.Error);
          setIsLoading(false);

          // throw new Error(errorHandling(error));
        }
      }
    } else {
      setIsLoading(false);
    }
  };
  const handleRadioChange = (selected: string) => {
    setFormData((prevData) => ({
      ...prevData,
      visibility: selected,
    }));
  };
  const handleOnChange = (e: any) => {
    const { name, value } = e.target.value;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleWorkspaceFormDatas = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return {
    handleWorkspaceFormDatas,
    formData,
    handleSubmit,
    formNewError,
    alertInfo,
    loading,
    formErrors,
    handleOnChange,
    setFormData,
    methodErr,
    setmethodErr,
  };
}
