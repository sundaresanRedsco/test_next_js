"use client";

import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import ApacheApiSix from "@/app/Assests/icons/ApacheApisixSvg.svg";
import AwsIcon from "@/app/Assests/icons/AwsIcon.svg";
import AzureImage from "@/app/Assests/images/azure-logo.webp";
import CloudImage from "@/app/Assests/images/Cloud.webp";
import SwaggerImage from "@/app/Assests/images/swagger.webp";
import Kong from "@/app/Assests/images/downimage.webp";
import theme from "@/Theme/theme";
import GlobalTextField from "@/app/apiflow_components/global/GlobalTextField";
import GlobalSelect from "@/app/apiflow_components/global/GSelect";
import GlobalButton from "@/app/apiflow_components/global/GButton";
import GlobalBackButton from "@/app/apiflow_components/global/GlobalBackButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import {
  apiGatewayReducer,
  ImportApiGateway,
  ImportFromSwagerGateway,
} from "@/app/Redux/apiManagement/apiGatewayReducer";
import Ajv from "ajv";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import {
  CreateProjects,
  environmentReducer,
  GetProjectByWorkspaceIdSolrOffset,
} from "@/app/Redux/apiManagement/environmentReducer";
import { useAlert } from "@/context/alertContext";
import { setAddTabs, setRemoveTabs } from "@/app/Redux/tabReducer";
import Image from "next/image";
import {
  PrimaryTypography,
  SecondaryTypography,
} from "@/app/hooks/operations/useOperationHelpers";
import Grid from "@mui/material/Grid2";

const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    type: { type: "string" },
    project_id: { type: "string" },
    private_key_id: { type: "string" },
    private_key: { type: "string" },
    client_email: { type: "string" },
    client_id: { type: "string" },
    auth_uri: { type: "string" },
    token_uri: { type: "string" },
    auth_provider_x509_cert_url: { type: "string" },
    client_x509_cert_url: { type: "string" },
    universe_domain: { type: "string" },
  },
  required: [
    "type",
    "project_id",
    "private_key_id",
    "private_key",
    "client_email",
    "client_id",
    "auth_uri",
    "token_uri",
    "auth_provider_x509_cert_url",
    "client_x509_cert_url",
  ],
};

const validate = ajv.compile(schema);

const CardContainer = styled(Box)`
  padding: 10px 0px;
  margin-top: 1.5rem;
  height: 470px;
  max-height: 470px;
`;

const awsRegions = [
  { id: 1, region: "us-east-1" },
  { id: 2, region: "us-east-2" },
  { id: 3, region: "us-west-1" },
  { id: 4, region: "us-west-2" },
  { id: 5, region: "ca-central-1" },
  { id: 6, region: "sa-east-1" },
  { id: 7, region: "eu-west-1" },
  { id: 8, region: "eu-west-2" },
  { id: 9, region: "eu-central-1" },
  { id: 10, region: "eu-west-3" },
  { id: 11, region: "eu-north-1" },
  { id: 12, region: "ap-south-1" },
  { id: 13, region: "ap-southeast-1" },
  { id: 14, region: "ap-southeast-2" },
  { id: 15, region: "ap-northeast-1" },
  { id: 16, region: "ap-northeast-2" },
  { id: 17, region: "ap-northeast-3" },
  { id: 18, region: "ap-east-1" },
  { id: 19, region: "me-south-1" },
  { id: 20, region: "af-south-1" },
];

const timesData = [
  { id: 0, name: "5 mins" },
  { id: 1, name: "10 mins" },
  { id: 2, name: "15 mins" },
  { id: 3, name: "20 mins" },
];

const SwagerData = [
  { id: 0, name: "File" },
  { id: 1, name: "Url" },
];

type ApiGatewayType = {
  id: string;
  secretKey: string;
  name: string;
  region: string;
  accessKey: string;
  type: string;
  subscription_id: string;
  azure_tenat_id: string;
  Secretkey: string;
  ApiGatewayType: string;
  interval: string;
  client_id: string;
  client_secreat: string;
  api_url: string;
  admin_url: string;
  server_urls: string;
  description: string;

  authentication_key: string;
};

function ImportsCard(props: any) {
  const {
    datas,
    projectId,
    vadilate,
    onFormDataChange,
    add = false,
    type,
    onErrorData,
    showNameAndDescription = false,
  } = props;

  const { showAlert } = useAlert();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { ProjectsListOffset, projectStartValue, projectEndValue } =
    useSelector<RootStateType, environmentReducer>(
      (state) => state.apiManagement.environment
    );

  const { apiGatewayKeys, loading } = useSelector<
    RootStateType,
    apiGatewayReducer
  >((state) => state.apiManagement.gateWay);

  const dispatch = useDispatch<any>();

  const initialApiGateway: ApiGatewayType = {
    id: "",
    secretKey: "",
    name: "",
    region: "",
    accessKey: "",
    type: "",
    subscription_id: "",
    azure_tenat_id: "", // Added tenant_id field
    Secretkey: "",
    interval: "",
    ApiGatewayType: "",
    client_id: "",
    client_secreat: "",
    api_url: "",
    admin_url: "",
    server_urls: "",
    authentication_key: "",
    description: "",
  };
  const [nextStep, setNextstep] = useState<any>(add);
  const [ImportsStep, setImportsstep] = useState<any>(add ? false : true);
  const [apiGateway, setApiGateway] =
    useState<ApiGatewayType>(initialApiGateway);
  const [selectedName, setSelectedName] = useState("");

  const [errorMsg, setErrorMsg] = useState<any>();

  const [sdkType, setSdkType] = useState(add ? type : "");

  const [errorApigateway, setErrorApigateway] = useState<
    Partial<Record<keyof ApiGatewayType, string>>
  >({
    Secretkey: "",
    name: "",

    region: "",
    accessKey: "",
    subscription_id: "",
    azure_tenat_id: "",
    interval: "",
    client_id: "",
    client_secreat: "",
    api_url: "",
    admin_url: "",
    server_urls: "",

    authentication_key: "",
  });
  const [errorHandingImports, setErrorHandlingImports] = useState<any[]>([]);
  const [extractedData, setExtractedData] = useState<any>();
  const [fileContent, setFileContent] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [jsonString, setJsonString] = useState("");
  const [kongIntervalSeconds, setKongIntervalSeconds] = useState<number>(300);
  const [timedata, setTimedata] = useState<any>(timesData);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(0);
  const [emails, setEmails] = useState<string[]>([]);
  const [fileUrl, setFileUrl] = useState<any>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContentNew, setFileContentNew] = useState<string>("");

  const [jsonError, setJsonError] = useState<string | null>(null);

  const gatewayList = [
    {
      name: "Amazon Web Service",
      icon: <AwsIcon width={"100%"} height={"100%"} />,
      clickable: "AWS",
    },
    {
      name: "Google Cloud",

      icon: (
        <Image
          src={CloudImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),
      clickable: "GCP",
    },

    {
      name: "Azure",

      icon: (
        <Image
          src={AzureImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),
      clickable: "AZURE",
    },

    {
      name: "Swagger",

      icon: (
        <Image
          src={SwaggerImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),
      clickable: "SWAGGER",
    },

    {
      name: "Kong",

      icon: (
        <Image src={Kong} alt="" style={{ width: "100%", height: "100%" }} />
      ),
      clickable: "KONG",
    },
    {
      name: "Apache APISIX",
      icon: <ApacheApiSix width={"100%"} height={"100%"} />,
      clickable: "APISIX",
    },
  ];

  const handleNextStep = (type: string) => {
    setSdkType(type);

    setNextstep(true);
    setImportsstep(false);
  };

  const handleBackToStep = () => {
    setSelectedFile(null);
    setJsonError("");
    setFileUrl(false);

    setNextstep(false);
    setImportsstep(true);
    setSelectedName("");
    setErrorApigateway({
      Secretkey: "",
      name: "",

      region: "",
      accessKey: "",
      client_id: "",
      client_secreat: "",
      subscription_id: "",
      api_url: "",
      admin_url: "",
      server_urls: "",

      authentication_key: "",
    });
    setApiGateway({
      Secretkey: "",
      id: "",
      secretKey: "",
      name: "",
      description: "",
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
    });

    setSdkType(add ? type : "");
    setFileName("");
    setJsonString("");
    setFileContent("");
  };

  const apiFieldsConfig = [
    //AWS Fields

    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "AWS",
    },

    {
      id: "accessKey",
      label: "Access Key",
      placeholder: "Access Key",
      dataTest: "access-key-input",
      type: "AWS",
    },
    {
      id: "secretKey",
      label: "Secret Key",
      placeholder: "Secret Key",
      dataTest: "secret-key-input",
      type: "AWS",
    },
    {
      id: "region",
      label: "Regions",
      placeholder: "Region",
      dataTest: "region-select",
      type: "AWS",
      options: awsRegions.map((region) => ({
        value: region.region,
        label: region.region,
      })),
    },
    {
      id: "interval",
      label: "Intervals",
      placeholder: "Interval",
      dataTest: "interval-select",
      type: "AWS",
      options: timesData.map((times) => ({
        value: times.id,
        label: times.name,
      })),
    },

    {
      id: "description",
      label: "Description",
      placeholder: "description",
      dataTest: "description-key-input",
      type: "AWS",
    },

    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "AZURE",
    },

    {
      id: "accessKey",
      label: "Access Key",
      placeholder: "Access Key",
      dataTest: "client-id-input",
      type: "AZURE",
    },
    {
      id: "secretKey",
      label: "Secret Key",
      placeholder: "Secret Key",
      dataTest: "client-secreat-input",
      type: "AZURE",
    },
    {
      id: "subscription_id",
      label: "Subscription Id",
      placeholder: "Subscription Id",
      dataTest: "subscription-id-input",
      type: "AZURE",
    },
    {
      id: "azure_tenat_id",
      label: "Tenant Id",
      placeholder: "Tenant Id",
      dataTest: "tenant-id-input",
      type: "AZURE",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "Interval",
      dataTest: "interval-select",
      type: "AZURE",
      options: timesData.map((times) => ({
        value: times.id,
        label: times.name,
      })),
    },

    {
      id: "description",
      label: "Description",
      placeholder: "description",
      dataTest: "description-key-input",
      type: "AZURE",
    },

    //KONG Fields

    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "KONG",
    },

    {
      id: "admin_url",
      label: "Admin Url",
      placeholder: "Admin Url",
      dataTest: "admin-url-input",
      type: "KONG",
    },
    {
      id: "api_url",
      label: "Api Url",
      placeholder: "Api Url",
      dataTest: "api-url-input",
      type: "KONG",
    },
    {
      id: "authentication_key",
      label: "Auth Key",
      placeholder: "Auth Key",
      dataTest: "auth-key-input",
      type: "KONG",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "Interval",
      dataTest: "interval-select",
      type: "KONG",
      options: timesData.map((times) => ({
        value: times.id,
        label: times.name,
      })),
    },

    {
      id: "description",
      label: "Description",
      placeholder: "description",
      dataTest: "description-key-input",
      type: "KONG",
    },

    //APISIX Fields

    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "APISIX",
    },

    {
      id: "admin_url",
      label: "Admin Url",
      placeholder: "Admin Url",
      dataTest: "apacheadmin-url-input",
      type: "APISIX",
    },
    {
      id: "api_url",
      label: "Api Url",
      placeholder: "Api Url",
      dataTest: "apacheapi-url-input",
      type: "APISIX",
    },
    {
      id: "authentication_key",
      label: "Auth Key",
      placeholder: "Auth Key",
      dataTest: "apacheauth-key-input",
      type: "APISIX",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "Interval",
      dataTest: "interval-select",
      type: "APISIX",
      options: timesData.map((times) => ({
        value: times.id,
        label: times.name,
      })),
    },
    {
      id: "description",
      label: "Description",
      placeholder: "description",
      dataTest: "description-key-input",
      type: "APISIX",
    },

    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "GCP",
    },

    {
      id: "fileInput",
      label: "Select JSON File",
      placeholder: "",
      dataTest: "file-input",
      type: "GCP",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "Interval",
      dataTest: "interval-select",
      type: "GCP",
      options: timesData.map((times) => ({
        value: times.id,
        label: times.name,
      })),
    },

    {
      id: "description",
      label: "Description",
      placeholder: "description",
      dataTest: "description-key-input",
      type: "GCP",
    },
  ];

  const swagggerFields = [
    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "SWAGGER",
    },

    {
      id: "server_urls",
      label: "Swagger Url",
      placeholder: "Swagger Url",
      dataTest: "swagger-url-input",
      type: "SWAGGER",
    },

    {
      id: "interval",
      label: "Interval",
      placeholder: "",
      dataTest: "interval-select",
      type: "SWAGGER",
      options: timesData.map((times) => ({
        value: times.id,
        label: times.name,
      })),
    },

    {
      id: "description",
      label: "Description",
      placeholder: "description",
      dataTest: "description-key-input",
      type: "SWAGGER",
    },
  ];

  const handleChange = (id: string, value: string) => {
    setApiGateway((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: any) => {
    const selectedId = value; // No need for parseInt, use value as string
    const selectedOption = SwagerData.find((data) => data.id === selectedId); // Compare as string
    if (selectedOption) {
      setSelectedName(selectedOption.name); // Update state with the selected name
    }
    setFileUrl(true);
  };

  //
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          setFileContent(json);
          const valid = validate(json);
          if (valid) {
            const jsonStringified = JSON.stringify(json, null, 2);
            setJsonString(jsonStringified);

            toast.success("Valid Json File");
          } else {
            toast.error("Please provide a valid JSON file");
          }
        } catch (error) {
          toast.error("Invalid JSON format");
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    // Extract specific properties when errorHandlingImports changes
    if (errorHandingImports && errorHandingImports?.length > 0) {
      // Combine all extracted properties into a single object
      const combinedData = errorHandingImports.reduce(
        (acc: any, error: any) => {
          acc[error.propertyName] = error.errorMessage;
          return acc;
        },
        {}
      );

      setExtractedData(combinedData);
    }
  }, [errorHandingImports, extractedData]);

  const handleChangeChip = (newEmails: string[]) => {
    setEmails(newEmails);
  };

  const apiGatewayErrorHandler = (clickable: string) => {
    const errors: Partial<Record<keyof ApiGatewayType, string>> = {};

    apiFieldsConfig.forEach((field) => {
      const { type, id } = field;

      if (["AWS", "AZURE", "KONG", "APACHE", "GCP", "SWAGGER"].includes(type)) {
        if (id === "secretKey" && clickable) {
          switch (clickable) {
            case "AZURE":
            case "AWS":
              errors.secretKey =
                apiGateway.secretKey === "" ? "Secreat Key is required" : "";
              errors.name =
                add && apiGateway.name === "" ? "Name  is required" : "";
              break;
            default:
              break;
          }
        } else if (id === "accessKey") {
          if (clickable == "AZURE") {
            errors.accessKey =
              apiGateway.accessKey === "" ? "Access Key is required" : "";
          } else if (clickable == "AWS") {
            errors.accessKey =
              apiGateway.accessKey === "" ? "Access Key is required" : "";
          }
        } else if (id === "azure_tenat_id") {
          if (clickable == "AZURE") {
            if (clickable == "AZURE") {
              errors.azure_tenat_id =
                apiGateway.azure_tenat_id === "" ? "Tenant ID is required" : "";
            }
          }
        } else if (id === "subscription_id" && clickable == "AZURE") {
          if (clickable == "AZURE") {
            errors.subscription_id =
              apiGateway.subscription_id === ""
                ? "Subscription ID is required"
                : "";
          }
        } else if (id === "region") {
          if (clickable == "AWS") {
            errors.region =
              apiGateway.region === "" ? "Region is required" : "";
          }
        } else if (id === "fileInput") {
          if (clickable == "GCP") {
            if (!fileContent) {
              errors.region = "JSON is required";
            } else if (!validate(fileContent)) {
              errors.region = "Provide a valid file";
            }
          }
        } else if (id === "admin_url" && clickable) {
          switch (clickable) {
            case "APISIX":
            case "KONG":
              errors.admin_url =
                apiGateway.admin_url === "" ? "Admin Url is required" : "";
              break;
            default:
              break;
          }
        } else if (id === "api_url" && clickable) {
          switch (clickable) {
            case "APISIX":
            case "KONG":
              errors.api_url =
                apiGateway.api_url === "" ? "Api Url is required" : "";
              break;
            default:
              break;
          }
        } else if (id === "authentication_key" && clickable) {
          switch (clickable) {
            case "APISIX":
            case "KONG":
              errors.authentication_key =
                apiGateway.authentication_key === ""
                  ? "Auth Key is required"
                  : "";
              break;
            default:
              break;
          }
        } else if (id === "server_urls" && clickable === "SWAGGER") {
          errors.server_urls =
            apiGateway.server_urls === "" ? "Swagger URL is required" : "";
        }
      }
    });

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setErrorApigateway(errors);
      return false; // Errors found, so return false
    } else {
      setErrorApigateway({});
      return true; // No errors, so return true
    }
  };
  const validateSwaggerFields = () => {
    const errors: Partial<Record<keyof typeof apiGateway, string>> = {};

    // Reset the jsonError state before validation
    setJsonError(null);

    // Validate the swagger fields for the "Url" case
    if (sdkType === "SWAGGER" && selectedName === "Url") {
      // Check if the server_urls field is required and validate it
      if (!apiGateway.server_urls || apiGateway.server_urls.trim() === "") {
        errors["server_urls"] = "URL is required.";
      }
    }

    // Additional validation for the file input when selectedName is "File"
    if (sdkType === "SWAGGER" && selectedName === "File") {
      if (!selectedFile) {
        setJsonError("JSON file is required.");
      }
    }

    // Determine if there are any errors
    const hasErrors =
      Object.values(errors).some((error) => error !== "") || jsonError;

    if (hasErrors) {
      setErrorApigateway(errors);
      return false; // Validation failed
    } else {
      setErrorApigateway({});
      return true; // Validation passed
    }
  };

  const handleChangeData = (inputName: string, file: File) => {
    // Update the file state when a file is selected
    const reader = new FileReader();

    // Read the file content as text
    reader.onload = function (event) {
      const fileContent = event.target?.result as string;

      // Update the file content state with the stringified file content
      setFileContentNew(JSON.stringify(fileContent));
      setJsonError("");
    };

    // Start reading the file
    reader.readAsText(file);

    setSelectedFile(file); // Optional: If you still need the file object itself
  };

  const kongHandleRoleChange = (value: any) => {
    const selectedRole = timedata.find(
      (role: any) => role.id === Number(value)
    );
    if (selectedRole) {
      const minutesToSeconds = selectedRole.name.split(" ")[0] * 60; // Convert minutes to seconds
      setKongIntervalSeconds(minutesToSeconds); // Update intervalSeconds state with seconds value
    }
    setSelectedRoleId(Number(value));
  };

  const handleSubmit = () => {
    vadilate();

    let addGatewayDetails: any;
    let hasNoErrors: boolean = false;

    if (sdkType === "AWS") {
      hasNoErrors = apiGatewayErrorHandler("AWS");
      addGatewayDetails = {
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,

        region: apiGateway.region,
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "AWS",
        api_url: "",
        authentication_key: "",
        admin_url: "",
        subscription_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: "",
        server_urls: [],
        project_id: "",

        import_type: "PROJECT",
      };
    } else if (sdkType === "KONG") {
      hasNoErrors = apiGatewayErrorHandler("KONG");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",

        region: "",
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "KONG",
        api_url: apiGateway?.api_url,
        authentication_key: apiGateway?.authentication_key,
        admin_url: apiGateway?.admin_url,
        subscription_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: "",
        server_urls: [],
        project_id: "",

        import_type: "PROJECT",
      };
    } else if (sdkType === "APISIX") {
      hasNoErrors = apiGatewayErrorHandler("APISIX");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",

        region: "",
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "APISIX",
        api_url: apiGateway?.api_url,
        authentication_key: apiGateway?.authentication_key,
        admin_url: apiGateway?.admin_url,

        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        subscription_id: "",
        private_key: "",
        server_urls: [],
        project_id: "",

        import_type: "PROJECT",
      };
    } else if (sdkType === "AZURE") {
      hasNoErrors = apiGatewayErrorHandler("AZURE");
      addGatewayDetails = {
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,

        region: "",
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "AZURE",
        api_url: "",
        authentication_key: "",
        admin_url: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: apiGateway?.azure_tenat_id || "",
        subscription_id: apiGateway?.subscription_id,
        private_key: "",
        server_urls: [],
        project_id: "",

        import_type: "PROJECT",
      };
    } else if (sdkType === "GCP") {
      hasNoErrors = apiGatewayErrorHandler("GCP");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",

        region: "",
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "GCP",
        api_url: "",
        authentication_key: "",
        admin_url: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        subscription_id: "",
        private_key: jsonString,
        server_urls: [],
        project_id: "",

        import_type: "PROJECT",
      };
    } else if (sdkType === "SWAGGER") {
      hasNoErrors = apiGatewayErrorHandler("SWAGGER");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",

        region: "",
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "SWAGGER",
        api_url: "",
        authentication_key: "",
        admin_url: apiGateway.server_urls,

        azure_tenat_id: "",
        subscription_id: "",
        private_key: "",
        server_urls: emails,
        project_id: "",

        import_type: "PROJECT",
      };
    }

    let startValue =
      ProjectsListOffset?.length < projectEndValue
        ? projectStartValue
        : projectStartValue + 5;
    let endvalue =
      ProjectsListOffset?.length < projectEndValue
        ? projectEndValue
        : projectEndValue + 5;
    if (!projectId) {
      if (hasNoErrors) {
        let updateData = {
          ...addGatewayDetails,
          name: datas?.project_name,
          description: datas?.description,
          import_type: "WORKSPACE",
        };

        showAlert(
          "Success",
          "",
          "Importing In Progress",
          "",
          () => console.log("Alert closed"),
          () => console.log("Alert closed")
        );
        dispatch(ImportApiGateway(updateData))
          .unwrap()
          .then((res: any) => {
            showAlert(
              "Success",
              "",
              "Environment Created. Next create flow",
              "Add {APIFlow} to start security scan and API testing",
              () => console.log("Alert closed"),
              () => dispatch(setAddTabs("new_API_flow"))
            );

            let requestData = {
              wsid: currentWorkspace?.id,
              sortByField: "name",
              sortByValue: "",
              sortDirection: "asc",
              startValue: startValue,
              endValue: endvalue,
            };

            dispatch(GetProjectByWorkspaceIdSolrOffset(requestData))
              .unwrap()
              .then((projectRes: any) => {});

            dispatch(setRemoveTabs("import_Environment"));
            setApiGateway({
              Secretkey: "",
              id: "",
              secretKey: "",
              name: "",
              description: "",
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
            });
            onFormDataChange({
              project_name: "",
              description: "",
            });
          })
          .catch((error: any) => {
            showAlert(
              "Error",
              "Error Occur in Importing",
              error.message,
              "",
              () => console.log("Alert closed"),
              () => console.log("Alert closed")
            );
          });
      }
    } else {
      if (hasNoErrors) {
        let updateData = {
          ...addGatewayDetails,
          project_id: projectId,
          name: add ? apiGateway.name : datas?.project_name,
          description: add ? apiGateway.description : datas?.description,
          import_type: "PROJECT",
        };
        dispatch(ImportApiGateway(updateData))
          .unwrap()
          .then((res: any) => {
            setApiGateway({
              Secretkey: "",
              id: "",
              secretKey: "",
              name: "",
              description: "",
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
            });
            if (add) {
              showAlert(
                "Success",
                res.name,
                "Configuration Created",
                "",
                () => console.log("Alert closed"),
                () => console.log("Alert clicked")
              );
            } else {
              showAlert(
                "Success",
                datas?.project_name,
                "Endpoints imported. Next create flow",
                "Add {APIFlow} to start security scan and API testing",
                () => console.log("Alert closed"),
                () => dispatch(setAddTabs("new_API_flow"))
              );
            }
          });
      }
    }
  };

  const handleSwaggerFormSubmit = () => {
    let startValue =
      ProjectsListOffset?.length < projectEndValue
        ? projectStartValue
        : projectStartValue + 5;
    let endvalue =
      ProjectsListOffset?.length < projectEndValue
        ? projectEndValue
        : projectEndValue + 5;
    if (validateSwaggerFields()) {
      const updateDoc = {
        stage_id: "",
        project_id: "",
        url: (selectedName === "Url" && apiGateway.server_urls) || "", // Ensure the URL is set correctly
        workspace_id: currentWorkspace?.id,
        file_store: selectedFile || "",
        doc_type: selectedName === "Url" ? "URL" : "FILE",
        name: datas?.project_name || "",
        description: datas?.description || "",
      };

      const formData = new FormData();
      Object.entries(updateDoc).forEach(([key, value]: any) => {
        formData.append(key, value);
      });

      showAlert(
        "Success",
        "",
        "Importing In Progress",
        "",
        () => console.log("Alert closed"),
        () => console.log("Alert closed")
      );

      dispatch(ImportFromSwagerGateway(formData))
        .unwrap()
        .then((res: any) => {
          showAlert(
            "Success",
            "",
            "Swagger Imported",
            "",
            () => console.log("Alert closed"),
            () => console.log("Alert clicked")
          );

          let requestData = {
            wsid: currentWorkspace?.id,
            sortByField: "name",
            sortByValue: "",
            sortDirection: "asc",
            startValue: startValue,
            endValue: endvalue,
          };

          dispatch(GetProjectByWorkspaceIdSolrOffset(requestData))
            .unwrap()
            .then((projectRes: any) => {});

          // Remove the "new_workspace" tab after successful submission
          dispatch(setRemoveTabs("import_Environment"));
        })
        .catch((error: any) => {
          setErrorMsg(error);
        });
    }
  };

  return (
    <div>
      {ImportsStep && (
        <PrimaryTypography>
          Select Any of the source for API end points
        </PrimaryTypography>
      )}
      {ImportsStep && (
        <CardContainer>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {ImportsStep &&
              gatewayList?.map((val: any, index: number) => (
                <Grid
                  size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}
                  sx={{ padding: "0rem 1rem", marginTop: "2rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #eee",
                      borderRadius: "5px",
                      padding: "20px",
                      width: "100%", // Adjusted width to be responsive
                      height: "80px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      cursor: "pointer",
                      margin: "0.6rem",
                    }}
                    onClick={() => {
                      handleNextStep(val?.clickable);
                    }}
                  >
                    <div
                      style={{
                        marginRight: "10px",
                        width: "35px",
                        height: "35px",
                      }}
                    >
                      {val.icon}
                    </div>
                    <div>
                      <SecondaryTypography
                        style={{
                          fontSize: "0.6rem",

                          fontWeight: 900,
                          marginLeft: "10px",
                        }}
                      >
                        {val.name}
                      </SecondaryTypography>
                    </div>
                  </div>
                </Grid>
              ))}
          </div>
        </CardContainer>
      )}

      {nextStep && (
        <div>
          {!add && (
            <div style={{ marginRight: "1rem" }}>
              <GlobalBackButton
                onClick={handleBackToStep}
                fontSize="0.7rem"
                color="#282F79"
              />
            </div>
          )}

          <PrimaryTypography style={{ marginTop: "1rem" }}>
            {sdkType === "AWS"
              ? "Please provide Configuration for AWS"
              : sdkType === "AZURE"
              ? "Please provide Configuration for Azure"
              : sdkType === "KONG"
              ? "Please provide Configuration for Kong"
              : sdkType === "GCP"
              ? "Please provide Configuration for Google Cloud"
              : sdkType === "SWAGGER"
              ? "Please provide Configuration for Swagger"
              : sdkType === "APISIX"
              ? "Please provide Configuration for Apache ApiSix"
              : "Please provide Configuration for Swagger"}
          </PrimaryTypography>
          <div
            style={{
              height: "400px",
              overflowY: "auto",
              maxHeight: "100%",
              border: "0.5px solid #EEEEEE",
              padding: "10px",
            }}
          >
            {sdkType === "SWAGGER" && (
              <div style={{ marginTop: "2rem" }}>
                <GlobalSelect
                  fullWidth={false}
                  label="Select the value"
                  borderHeight="40px"
                  size="small"
                  radius="0px"
                  fontSize="0.6rem"
                  options={SwagerData.map((data) => ({
                    label: data.name,
                    value: data.id,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}

            {sdkType === "SWAGGER" && selectedName === "File" && (
              <div style={{ marginTop: "2rem" }}>
                {/* Wrap the button in a label to associate with the input */}
                <label htmlFor="fileInput">
                  <Button
                    component="span"
                    variant="outlined"
                    style={{
                      textTransform: "none",
                      marginTop: "0.8rem",
                      width: "150px",
                      color: "#EEEEEE",
                      backgroundColor: "transparent",
                      border: `1.5px solid #EEEEEE`,
                      cursor: "pointer", // Make sure the cursor shows as pointer
                    }}
                  >
                    Select File
                  </Button>
                </label>
                {/* Input for file upload */}
                <input
                  type="file"
                  accept=".json"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleChangeData("fileInput", e.target.files[0]);
                    }
                  }}
                />
                {/* Conditionally render the selected file name */}
                {selectedFile && (
                  <div
                    style={{
                      marginTop: "1rem",
                      color: `#EEEEEE`,
                    }}
                  >
                    Selected File: {selectedFile.name}
                  </div>
                )}

                {jsonError && (
                  <p
                    style={{
                      marginTop: "0.3rem",
                      color: "red",
                      fontSize: "0.5rem",
                      fontFamily: "FiraSans",
                    }}
                  >
                    {jsonError}
                  </p>
                )}
              </div>
            )}

            {sdkType === "SWAGGER" &&
              selectedName === "Url" &&
              fileUrl &&
              swagggerFields.map((field) => {
                // Handle logic to conditionally show fields
                if (
                  (field.id !== "name" && field.id !== "description") ||
                  showNameAndDescription
                ) {
                  let fieldComponent;
                  switch (field.id) {
                    case "interval":
                      fieldComponent = (
                        <div style={{ marginTop: "2rem" }}>
                          <GlobalSelect
                            key={field.id}
                            placeholder={field.placeholder}
                            fontSize="0.6rem"
                            width="100%"
                            size="small"
                            radius="0px"
                            value={apiGateway.interval}
                            options={field.options}
                            onChange={(e: any) =>
                              handleChange("interval", e.target.value)
                            }
                            dataTest={field.dataTest}
                            defaultValue="0"
                          />
                        </div>
                      );
                      break;
                    default:
                      fieldComponent = (
                        <GlobalTextField
                          key={field.id}
                          value={
                            field.id === "url"
                              ? apiGateway.server_urls // Use server_urls for the URL field
                              : apiGateway[field.id as keyof typeof apiGateway]
                          }
                          error={
                            errorApigateway[
                              field.id as keyof typeof errorApigateway
                            ]
                          }
                          onChange={(e: any) =>
                            handleChange(field.id, e.target.value)
                          }
                          id={field.id}
                          width="100%"
                          fontSize="0.6rem"
                          height="42px"
                          label={field.placeholder}
                          name={field.id}
                          data-test={field.dataTest}
                        />
                      );
                      break;
                  }

                  // Render the field component if available
                  return <div key={field.id}>{fieldComponent}</div>;
                } else {
                  return null;
                }
              })}

            {apiFieldsConfig.map((field) => (
              <div key={field.id}>
                {field && field.type === sdkType && (
                  <div>
                    {(field.id !== "name" && field.id !== "description") ||
                    showNameAndDescription ? (
                      <>
                        {field.id === "region" ? (
                          <div style={{ marginTop: "2rem" }}>
                            <GlobalSelect
                              fontSize="0.6rem"
                              label={field.placeholder}
                              width={"100%"}
                              size="small"
                              radius="0px"
                              options={field.options}
                              value={apiGateway.region}
                              onChange={(e: any) => handleChange("region", e)}
                              dataTest={field.dataTest}
                              defaultValue={"0"}
                              helperText={errorApigateway.region}
                              error={errorApigateway.region}
                            />
                          </div>
                        ) : field.id === "interval" ? (
                          <div style={{ marginTop: "2rem" }}>
                            <GlobalSelect
                              label={field.placeholder}
                              fontSize="0.6rem"
                              width={"100%"}
                              size="small"
                              radius="0px"
                              value={apiGateway.interval}
                              options={field.options}
                              onChange={(e: any) => handleChange("interval", e)}
                              dataTest={field.dataTest}
                            />
                          </div>
                        ) : field.id === "swaggerchip" ? (
                          <div style={{ marginTop: "2rem" }}></div>
                        ) : field.id === "fileInput" ? (
                          <div style={{ marginTop: "2rem" }}>
                            <label htmlFor="fileInput">
                              <Button
                                component="span"
                                variant="outlined"
                                style={{
                                  textTransform: "none",
                                  marginTop: "0.8rem",
                                  width: "150px",
                                  color: `#EEEEEE`,
                                  backgroundColor: "transparent",
                                  border: `1.5px solid #EEEEEE`,
                                }}
                              >
                                Select File
                              </Button>
                            </label>
                            <input
                              type="file"
                              accept=".json"
                              id="fileInput"
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              marginTop: "1rem",
                              paddingRight: "0.8rem",
                            }}
                          >
                            <GlobalTextField
                              value={
                                apiGateway[field.id as keyof ApiGatewayType]
                              }
                              error={
                                errorApigateway[
                                  field.id as keyof ApiGatewayType
                                ]
                              }
                              onChange={(e: any) =>
                                handleChange(field.id, e.target.value)
                              }
                              id={field.id}
                              width={"100%"}
                              fontSize="0.6rem"
                              height="42px"
                              label={field.placeholder}
                              name={""}
                            />
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "0.3rem", textAlign: "center" }}>
            <GlobalButton
              background="#282F79"
              color="#FFFFFF"
              fontSize="0.6rem"
              padding="10px"
              borderRadius="8px"
              marginRight="1.5rem"
              label={"Import"}
              width="50%"
              onClickHandler={() => {
                sdkType === "SWAGGER"
                  ? handleSwaggerFormSubmit()
                  : handleSubmit();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImportsCard;
