import { useAlert } from "@/context/alertContext";
import React, { useEffect, useState } from "react";

import axios from "axios";

import { useSignUpStore } from "./signZustand";
import useGPopup from "../useGPopup";

export default function useCatalogue(userData?: any, handleStep?: any) {
  const { showAlert } = useAlert();
  const { handleOpen } = useGPopup();
  const [isUpdating, setisUpdating] = useState("");
  // const userData: any = useSession();
  const { setApiDataStore, formDataStore, apiDataStore } = useSignUpStore();
  const fetchData = async (start?: number, end?: number) => {
    try {
      const access_token = userData?.user?.token;
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_APP_BACKEND_URL +
          `/api/Project/get_group_project_by_workspaceid?WorkspaceId=${apiDataStore?.workspace?.id}&start=0&end=3`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (data) {
        setApiDataStore("projectDetails", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      //   showAlert("Failed to fetch workspace data.", "error");
    }
  };
  const updateGroup = async (formData: any) => {
    setisUpdating(formData.group_id);
    try {
      const access_token = userData?.user?.token;
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_APP_BACKEND_URL +
          `/api/Project/update_groups?workspace_id=${apiDataStore?.workspace?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (data) {
        fetchData();
        setisUpdating("");
      }
    } catch (error: any) {
      // console.error("Error Updation group data:", error);
      handleOpen(error?.response?.data);
      fetchData();
      setisUpdating("");
      //   showAlert("Failed to fetch workspace data.", "error");
    }
  };
  const updateProject = async (formData: any) => {
    setisUpdating(formData.project_id);
    try {
      const access_token = userData?.user?.token;
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_APP_BACKEND_URL +
          `/api/Project/update_project?workspace_id=${apiDataStore?.workspace?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (data) {
        fetchData();
        setisUpdating("");
      }
    } catch (error: any) {
      //   showAlert("Failed to fetch workspace data.", "error");
      handleOpen(error?.response?.data);
      fetchData();
      setisUpdating("");
    }
  };

  return {
    fetchData,
    updateProject,
    updateGroup,
    isUpdating,
  };
}
