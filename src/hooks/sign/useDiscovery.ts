import React, { useState } from "react";
import { useAlert } from "@/context/alertContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useSignUpStore } from "./signZustand";
import useGPopup from "../useGPopup";
import { awsRegions, timesData } from "@/app/Constants/DropdownOptions";
import { translate } from "@/app/Helpers/helpersFunctions";

type ApiGatewayType = {
  id?: string;
  secretKey?: string;
  name?: string;
  region?: string;
  accessKey?: string;
  type?: string;
  subscription_id?: string;
  azure_tenat_id?: string;
  ApiGatewayType?: string;
  interval?: string;
  client_id?: string;
  client_secreat?: string;
  api_url?: string;
  admin_url?: string;
  server_urls?: string;
  description?: string;
  authentication_key?: string;
  file_store?: any;
  doc_type?: string;
  url?: string;
};

export default function useDiscovery(userData?: any, fetchData?: any) {
  const { showAlert } = useAlert();
  // const userData: any = useSession();
  const {
    setApiDataStore,
    formDataStore,
    handleStep,
    apiDataStore,
    setIsLoading,
    setFormDataStore,
  } = useSignUpStore();
  const { handleOpen } = useGPopup();
  const [discoveryFormDatas, setdiscoveryFormDatas] = useState<any>({
    id: "",
    secretKey: "",
    name: "",
    region: "",
    accessKey: "",
    type: "",
    subscription_id: "",
    azure_tenat_id: "",
    interval: "",
    ApiGatewayType: "",
    client_id: "",
    client_secreat: "",
    api_url: "",
    admin_url: "",
    server_urls: "",
    authentication_key: "",
    description: "",
    file_store: "",
    doc_type: formDataStore?.doc_type,
    url: "",
  });
  const [errorMsg, setErrorMsg] = useState<ApiGatewayType>();

  const validationMsgs: any = {
    AWS: {
      name: {
        regular: `${translate("signupValidation.CONFIG_NAME")}`,
      },
      accessKey: {
        regular: `${translate("signupValidation.ACCESS_KEY")}`,
      },
      secretKey: {
        regular: `${translate("signupValidation.SECRET_KEY")}`,
      },
      region: {
        regular: `${translate("signupValidation.REGION_KEY")}`,
      },
      interval: {
        regular: `${translate("signupValidation.INTERVAL_KEY")}`,
      },
    },
    AZURE: {
      name: {
        regular: `${translate("signupValidation.CONFIG_NAME")}`,
      },
      accessKey: {
        regular: `${translate("signupValidation.ACCESS_KEY")}`,
      },
      secretKey: {
        regular: `${translate("signupValidation.SECRET_KEY")}`,
      },
      interval: {
        regular: `${translate("signupValidation.INTERVAL_KEY")}`,
      },
    },
    GCP: {
      name: {
        regular: `${translate("signupValidation.CONFIG_NAME")}`,
      },
      interval: {
        regular: `${translate("signupValidation.INTERVAL_KEY")}`,
      },
    },
    SWAGGER: {
      URL: {
        name: {
          regular: `${translate("signupValidation.CONFIG_NAME")}`,
        },
        url: {
          regular: `${translate("signupValidation.SWAGGER_URL")}`,
        },
      },
      FILE: {
        name: {
          regular: `${translate("signupValidation.CONFIG_NAME")}`,
        },
        file_store: {
          regular: `${translate("signupValidation.SWAGGER_FILE")}`,
        },
      },
    },
    HTTP: {
      name: {
        regular: `${translate("signupValidation.CONFIG_NAME")}`,
      },
      interval: {
        regular: `${translate("signupValidation.INTERVAL_KEY")}`,
      },
    },
    APISIX: {
      name: {
        regular: `${translate("signupValidation.CONFIG_NAME")}`,
      },
      interval: {
        regular: `${translate("signupValidation.INTERVAL_KEY")}`,
      },
    },
  };
  const handleErrForm = (key: string, value: string) => {
    setErrorMsg((prev: any) => ({ ...prev, [key]: value }));
  };
  const handleValidation = () => {
    let requiredFields = [];
    let currentMsgs;

    if (formDataStore?.gateway == "SWAGGER") {
      const errForm = validationMsgs[formDataStore?.gateway];
      requiredFields = errForm[formDataStore?.doc_type]
        ? Object.keys(errForm[formDataStore?.doc_type])
        : [];
      currentMsgs = errForm[formDataStore?.doc_type];
    } else {
      requiredFields = validationMsgs[formDataStore?.gateway]
        ? Object.keys(validationMsgs[formDataStore?.gateway])
        : [];
      currentMsgs = validationMsgs[formDataStore?.gateway];
    }
    for (let key of requiredFields) {
      if (discoveryFormDatas[key] == "") {
        handleErrForm(key, currentMsgs[key].regular);
      } else {
        handleErrForm(key, "");
      }
    }
  };
  const discoveryhandleChange = (e: any) => {
    const { name, value } = e.target;
    let currentErrMsg;
    if (formDataStore?.gateway == "SWAGGER") {
      const errForm = validationMsgs[formDataStore?.gateway];
      currentErrMsg = errForm[formDataStore?.doc_type];
    } else {
      currentErrMsg = validationMsgs[formDataStore?.gateway];
    }
    setdiscoveryFormDatas((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    if (value) {
      handleErrForm(name, "");
    } else {
      handleErrForm(name, currentErrMsg[name]?.regular);
    }
  };
  const APIs: any = {
    AWS:
      process.env.NEXT_PUBLIC_APP_BACKEND_URL +
      "/api/ImportFromApiGateWay/import_from_api_gateway",
    SWAGGER:
      process.env.NEXT_PUBLIC_APP_BACKEND_URL +
      "/api/Import_/import_from_swagger",
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const access_token = userData?.user?.token;
    let errForm;
    let requiredFields = [];
    if (formDataStore?.gateway == "SWAGGER") {
      errForm = validationMsgs[formDataStore?.gateway];
      requiredFields = errForm[formDataStore?.doc_type]
        ? Object.keys(errForm[formDataStore?.doc_type])
        : [];
    } else {
      requiredFields = validationMsgs[formDataStore?.gateway]
        ? Object.keys(validationMsgs[formDataStore?.gateway])
        : [];
    }
    if (requiredFields.every((i) => discoveryFormDatas[i] != "")) {
      if (apiDataStore?.workspace?.id && APIs[formDataStore?.gateway]) {
        const workspace_id = apiDataStore?.workspace?.id;
        const AllFormData: any = {
          AWS: {
            accessKey: discoveryFormDatas.accessKey,
            secretKey: discoveryFormDatas.secretKey,
            name: discoveryFormDatas.name,
            description: discoveryFormDatas.description,
            region: discoveryFormDatas.region,
            workspace_id: workspace_id,
            import_type: "WORKSPACE",
            project_id: "null",
            interval: discoveryFormDatas.interval,
            type: formDataStore?.gateway,
            api_url: "",
            authentication_key: "",
            admin_url: "",
            subscription_id: "",
            private_key: "",
            azure_tenat_id: "",
            server_urls: [],
          },
          SWAGGER: {
            project_id: "null",
            stage_id: "null",
            workspace_id: workspace_id,
            file_store: discoveryFormDatas?.file_store,
            doc_type: formDataStore?.doc_type,
            name: discoveryFormDatas.name,
            description: discoveryFormDatas.description,
            url: discoveryFormDatas.url,
          },
        };
        let DataToSend;
        if (formDataStore?.gateway == "SWAGGER") {
          const formData = new FormData();
          Object?.entries(AllFormData[formDataStore?.gateway])?.forEach(
            ([key, value]: any) => {
              formData?.append(key, value);
            }
          );
          DataToSend = formData;
        } else {
          DataToSend = AllFormData[formDataStore?.gateway];
        }
        setFormDataStore("gatewayForm", discoveryFormDatas);

        try {
          const { data }: any = await axios.post(
            APIs[formDataStore?.gateway],
            DataToSend,
            { headers: { Authorization: "Bearer " + access_token } }
          );
          if (data) {
            setApiDataStore("gateway", data);
            await fetchData();
            handleStep();
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        } catch (error: any) {
          if (error?.response && error?.response?.status === 401) {
            throw new Error("UNAUTHORIZED");
          }
          const errorRes = error?.response?.data;
          if (
            errorRes?.errorType == "IMPORT_FAILED" &&
            errorRes?.errorMessage.includes("Invalid AWS credentials")
          ) {
            handleOpen(errorRes?.errorMessage);
          } else {
            handleOpen(error?.response?.data);
          }

          setIsLoading(false);
          // throw new Error(errorHandling(error));
        }
      } else {
        toast.error("WorkspaceID is required");
        setIsLoading(false);
      }
    } else {
      handleValidation();
      setIsLoading(false);
    }
  };
  const handleFormData = (key: string, value: any) => {
    setdiscoveryFormDatas((prev: any) => ({ ...prev, [key]: value }));
  };

  return {
    discoveryFormDatas,
    setdiscoveryFormDatas,
    discoveryhandleChange,
    handleSubmit,
    timesData,
    awsRegions,
    errorMsg,
    handleFormData,
  };
}
