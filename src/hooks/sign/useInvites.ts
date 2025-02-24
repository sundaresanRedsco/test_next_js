import React, { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";
import { useSignUpStore } from "@/store/useSignUpStore";

export default function useInvites(userData?: any) {
  // const { showAlert } = useAlert();
  // const userData: any = useSession();
  const { setApiDataStore, formDataStore, apiDataStore, setIsLoading } =
    useSignUpStore();
  const [projectDetails, setProjectDetails] = useState([]);
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([]);
  const [errMsg, seterrMsg] = useState<any>({
    email: "",
    role: "",
  });
  const [inviteUserForm, setinviteUserForm] = useState<any>({
    email: "",
    role: "",
  });
  const [isFetchingTableData, setisFetchingTableData] = useState(false);
  const fetchRoles = async () => {
    try {
      const access_token = userData?.user?.token;
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_APP_BACKEND_URL + `/api/Roles/get_all_roles`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setRoles(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   showAlert("Failed to fetch workspace data.", "error");
    }
  };
  const validationMsg: any = {
    email: "Email is required",
    role: "Role is required",
  };
  const handleErrForm = (key: string, value: string) => {
    seterrMsg((prev: any) => ({ ...prev, [key]: value }));
  };
  const handleValidation = () => {
    const requiredFields = ["email", "role"];
    for (let key of requiredFields) {
      if (inviteUserForm[key] == "") {
        handleErrForm(key, validationMsg[key]);
      } else {
        handleErrForm(key, "");
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const access_token = userData?.user?.token;
    if (inviteUserForm.email != "" && inviteUserForm.role != "") {
      try {
        const { data }: any = await axios.post(
          process.env.NEXT_PUBLIC_APP_BACKEND_URL +
            "/api/Invitations/create_invitations",
          {
            invited_by: userData?.user?.user_id,
            email: inviteUserForm?.email,
            workspace_id: apiDataStore?.workspace?.id,
            project_id: "null",
            group_id: "null",
            role_id: inviteUserForm?.role,
            channel_id: "null",
          },
          { headers: { Authorization: "Bearer " + access_token } }
        );

        if (data) {
          // setApiDataStore("invitedUsers", data);
          toast.success(data);
          setIsLoading(false);
          setinviteUserForm({ email: "", role: "" });
          fetchMembers();
          // handleStep();
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        if (error?.response && error?.response?.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        //   setFormNewerror(error?.response?.data?.Error);
        if (error?.response?.data?.Error) {
          handleErrForm("email", error?.response?.data?.Error);
        }

        setIsLoading(false);

        // throw new Error(errorHandling(error));
      }
    } else {
      handleValidation();
      setIsLoading(false);
    }
  };

  const fetchMembers = async () => {
    setisFetchingTableData(true);
    try {
      const access_token = userData?.user?.token;
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_APP_BACKEND_URL +
          `/api/Invitations/getall_invitations_details_workspaceandproject_id?workspace_id=${apiDataStore?.workspace?.id}&start=0&end=5`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (data) {
        setApiDataStore("invitedUsers", data);
        setMembers(data);
        setisFetchingTableData(false);
      } else {
        setisFetchingTableData(false);
      }
    } catch (error) {
      setisFetchingTableData(false);
      console.error("Error fetching data:", error);
      //   showAlert("Failed to fetch workspace data.", "error");
    }
  };
  const handleInviteUserFormData = (name: string, value: any) => {
    setinviteUserForm((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setinviteUserForm((prev: any) => ({ ...prev, [name]: value }));
    if (value) {
      handleErrForm(name, "");
    } else {
      handleErrForm(name, validationMsg[name]);
    }
  };
  useEffect(() => {
    fetchRoles();
    fetchMembers();
  }, []);

  return {
    projectDetails,
    fetchRoles,
    roles,
    handleSubmit,
    fetchMembers,
    isFetchingTableData,
    inviteUserForm,
    handleChange,
    errMsg,
    members,
    handleInviteUserFormData,
  };
}
