import React, { useEffect, useState } from "react";
import {
  Popover,
  Typography,
  Backdrop,
  FormControl,
  Button,
} from "@mui/material";
// import { MuiChipsInput, MuiChipsInputChip } from "mui-chips-input";
import {
  SoapIcon,
  JsonIcon,
  DeleteIcon,
  EditIcon,
  AwsIcon,
  ApacheApiSix,
} from "@/app/Assests/icons";
import CloseIcon from "@mui/icons-material/Close";
import Aws from "@/app/Assests/icons/AwsIcon.svg";
import {
  CardImage,
  PrimaryTypography,
  SecondaryTypography,
} from "@/app/Styles/signInUp";
import GInput from "@/app/apiflow_components/global/GInput";
import theme from "@/Theme/theme";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import styled from "@emotion/styled";
import GButton from "@/app/apiflow_components/global/GButton";
import {
  GetApiGatewaySdkKeys,
  ImportApiGateway,
  UpdateApiGateway,
  apiGatewayReducer,
} from "@/app/Redux/apiManagement/apiGatewayReducer";
import toast from "react-hot-toast";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { createTeamreducer } from "@/app/Redux/manageTeam/teamReducer";
import GlobalLoader from "@/app/apiflow_components/global/GLoader";
import Kong from "@/app/Assests/images/downimage.png";
import GSelect from "@/app/apiflow_components/global/GSelect";
import azuer from "@/app/Assests/images/azure-logo.png";
import Paper from "@mui/material/Paper";
import AzureImage from "@/app/Assests/images/azure-logo.png";
import CloudImage from "@/app/Assests/images/Google-Cloud.jpg";
import SwaggerImage from "@/app/Assests/images/swagger.png";
import Ajv from "ajv";
import { errorHandling } from "@/app/Services/errorHandling";
import Image from "next/image";
import { height } from "@mui/system";

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

  authentication_key: string;
};

const Item = styled(Paper)`
backgroundColor:${theme.palette.mode === "dark" ? "#1A2027" : "#fff"};
...theme.typography.body2;
padding: theme.spacing(1);
textAlign: 'center';
color: ${theme.palette.text.secondary},

`;
const TextOutlinedInput = styled(TextareaAutosize)`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 15px;
  border: 1.5px solid ${theme.palette.secondaryColor.main};
  border-radius: 4px;
  background: transparent;
  color: ${theme.palette.primaryBlack.main};
  svg {
    width: 1rem;
    height: 1rem;
  }
  &::placeholder {
    color: ${theme.palette.secondaryColor.main};
    opacity: 1; /* Ensure placeholder text is fully visible */
  }
`;

function AwsImportPopup(props: any) {
  const { open, anchorEl, handleClose, edits, gatewayData } = props;

  const timesData = [
    { id: 0, name: "5 mins" },
    { id: 1, name: "10 mins" },
    { id: 2, name: "15 mins" },
    { id: 3, name: "20 mins" },
  ];

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
  };

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

  const apiFieldsConfig = [
    //AWS Fields
    {
      id: "name",
      label: "Name",
      placeholder: "Enter Name",
      dataTest: "name-input",
      type: "AWS",
    },
    {
      id: "accessKey",
      label: "Access Key",
      placeholder: "Enter Access Key",
      dataTest: "access-key-input",
      type: "AWS",
    },
    {
      id: "secretKey",
      label: "Secret Key",
      placeholder: "Enter Secret Key",
      dataTest: "secret-key-input",
      type: "AWS",
    },
    {
      id: "region",
      label: "Regions",
      placeholder: "",
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
      placeholder: "",
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
      placeholder: "Description",
      dataTest: "description-input",
      type: "AWS",
    },

    // Azure Content
    {
      id: "name",
      label: "Name",
      placeholder: "Enter Name",
      dataTest: "name-input",
      type: "AZURE",
    },
    {
      id: "accessKey",
      label: "Access Key",
      placeholder: "Enter the Id",
      dataTest: "client-id-input",
      type: "AZURE",
    },
    {
      id: "secretKey",
      label: "Secret Key",
      placeholder: "Enter the Secret",
      dataTest: "client-secreat-input",
      type: "AZURE",
    },
    {
      id: "subscription_id",
      label: "Subscription Id",
      placeholder: "Enter the id",
      dataTest: "subscription-id-input",
      type: "AZURE",
    },
    {
      id: "azure_tenat_id",
      label: "Tenant Id",
      placeholder: "Enter the id",
      dataTest: "tenant-id-input",
      type: "AZURE",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "",
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
      placeholder: "Description",
      dataTest: "description-input",
      type: "AZURE",
    },

    //Kong Fields
    {
      id: "name",
      label: "Name",
      placeholder: "Enter Name",
      dataTest: "name-input",
      type: "KONG",
    },
    {
      id: "admin_url",
      label: "Admin Url",
      placeholder: "Enter the Url",
      dataTest: "admin-url-input",
      type: "KONG",
    },
    {
      id: "api_url",
      label: "Api Url",
      placeholder: "Enter the Url",
      dataTest: "api-url-input",
      type: "KONG",
    },
    {
      id: "authentication_key",
      label: "Auth Key",
      placeholder: "Enter the Key",
      dataTest: "auth-key-input",
      type: "KONG",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "",
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
      placeholder: "Description",
      dataTest: "kong-description-input",
      type: "KONG",
    },

    //Apache Fields
    {
      id: "name",
      label: "Name",
      placeholder: "Enter Name",
      dataTest: "name-input",
      type: "APISIX",
    },
    {
      id: "admin_url",
      label: "Admin Url",
      placeholder: "Enter the Url",
      dataTest: "apacheadmin-url-input",
      type: "APISIX",
    },
    {
      id: "api_url",
      label: "Api Url",
      placeholder: "Enter the Url",
      dataTest: "apacheapi-url-input",
      type: "APISIX",
    },
    {
      id: "authentication_key",
      label: "Auth Key",
      placeholder: "Enter the Key",
      dataTest: "apacheauth-key-input",
      type: "APISIX",
    },
    {
      id: "interval",
      label: "Interval",
      placeholder: "",
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
      placeholder: "Description",
      dataTest: "apache-description-input",
      type: "APISIX",
    },
    //Google cloud fields
    {
      id: "name",
      label: "Name",
      placeholder: "Enter Name",
      dataTest: "name-input",
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
      placeholder: "",
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
      placeholder: "Description",
      dataTest: "cloud-description-input",
      type: "GCP",
    },

    //swagger Files

    {
      id: "name",
      label: "Name",
      placeholder: "Enter Name",
      dataTest: "name-input",
      type: "SWAGGER",
    },
    {
      id: "server_urls",
      label: "Swagger Url",
      placeholder: "Enter the Url",
      dataTest: "swagger-url-input",
      type: "SWAGGER",
    },
    {
      id: "swaggerchip",
      label: "Server Url",
      placeholder: "Enter the Url",
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
      placeholder: "Description",
      dataTest: "kong-description-input",
      type: "SWAGGER",
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const [apiGateway, setApiGateway] =
    useState<ApiGatewayType>(initialApiGateway);

  const [sdkType, setSdkType] = useState(edits ? gatewayData?.type : "");

  const [kongGateway, setKongGateway] = useState({
    id: "",
    name: "",
    project_name: "",
    location: "",
    admin_url: "",
    api_url: "",
    authentication_key: "",

    // description: "",
  });

  const [errorKonggateway, setErrorKonggateway] = useState<any>({
    name: "",
    admiurl: "",
    apiurl: "",
    authkey: "",
    location: "",
    project_name: "",
    // description: "",
  });

  const [errorApigateway, setErrorApigateway] = useState<
    Partial<Record<keyof ApiGatewayType, string>>
  >({
    Secretkey: "",
    name: "",
    // description: "",
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

  const dispatch = useDispatch<any>();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentTeam } = useSelector<RootStateType, createTeamreducer>(
    (state) => state.apiTeam.createTeam
  );

  const { loading, apiGatewayKeys } = useSelector<
    RootStateType,
    apiGatewayReducer
  >((state) => state.apiManagement.gateWay);

  const [timedata, setTimedata] = useState<any>(timesData);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(0);
  const [intervalSeconds, setIntervalSeconds] = useState<number>(300);
  const [kongIntervalSeconds, setKongIntervalSeconds] = useState<number>(300);
  const [selectedRegionName, setSelectedRegionName] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [jsonString, setJsonString] = useState("");
  const [fileContent, setFileContent] = useState<any | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [errorHandingImports, setErrorHandlingImports] = useState<any[]>([]);
  const [extractedData, setExtractedData] = useState<any>();

  const handleNextStep = (type: string) => {
    setSdkType(type);
    setCurrentStep(currentStep === 1 ? 2 : 1);
  };

  const handlePopoverClose = () => {
    setCurrentStep(1);
    handleClose();
    setErrorApigateway({
      Secretkey: "",
      name: "",
      // description: "",
      region: "",
      accessKey: "",
      client_id: "",
      client_secreat: "",
      subscription_id: "",
      api_url: "",
      admin_url: "",
      server_urls: "",

      authentication_key: "",
      // interval: ""
    });
    setApiGateway({
      Secretkey: "",
      id: "",
      secretKey: "",
      name: "",
      // description: "",
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

    setErrorKonggateway({
      name: "",
      admiurl: "",
      apiurl: "",
      authkey: "",
      location: "",
      project_name: "",
    });

    setKongGateway({
      id: "",
      name: "",
      project_name: "",
      location: "",
      admin_url: "",
      api_url: "",
      authentication_key: "",
    });

    setSdkType("");
    setFileName("");
    setJsonString("");
    setFileContent("");
  };

  const handleChange = (id: string, value: string) => {
    setApiGateway((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
                apiGateway.secretKey === ""
                  ? "Secreat Key is required"
                  : extractedData?.secretKey;
              break;
            default:
              break;
          }
        } else if (id === "name" && clickable) {
          switch (clickable) {
            case "AZURE":
            case "AWS":
            case "GCP":
            case "APISIX":
            case "KONG":
            case "SWAGGER":
              if (apiGateway.name === "") {
                errors.name = "Name is required";
              } else if (apiGateway.name.length > 30) {
                errors.name = "Name must be at most 30 characters long";
              } else {
                errors.name = "";
              }
              break;
          }
        } else if (id === "accessKey") {
          if (clickable == "AZURE") {
            errors.accessKey =
              apiGateway.accessKey === "" ? "Access Key is required" : "";
          } else if (clickable == "AWS") {
            errors.accessKey =
              apiGateway.accessKey === ""
                ? "Access Key is required"
                : extractedData?.accessKey;
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

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

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
            // setValidationMessage('File is valid according to the schema');
          } else {
            toast.error("provide valid json file");
            // setValidationMessage('File validation errors: ' + JSON.stringify(validate.errors, null, 2));
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
          //   setValidationMessage('Invalid JSON file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };
  const urlRegex = /^(http|https):\/\/[^ "]+$/;

  const importGateway = () => {
    let addGatewayDetails;
    let hasNoErrors;

    if (sdkType === "AWS") {
      hasNoErrors = apiGatewayErrorHandler("AWS");
      addGatewayDetails = {
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,
        name: apiGateway?.name,
        region: apiGateway.region,
        workspace_id: currentTeam?.workspace_id,
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
      };
    } else if (sdkType === "KONG") {
      hasNoErrors = apiGatewayErrorHandler("KONG");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway?.name,
        region: "",
        workspace_id: currentTeam?.workspace_id,
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
      };
    } else if (sdkType === "APISIX") {
      hasNoErrors = apiGatewayErrorHandler("APISIX");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway?.name,
        region: "",
        workspace_id: currentTeam?.workspace_id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "APISIX",
        api_url: apiGateway?.api_url,
        authentication_key: apiGateway?.authentication_key,
        admin_url: apiGateway?.admin_url,
        // tenant_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        subscription_id: "",
        private_key: "",
        server_urls: [],
      };
    } else if (sdkType === "AZURE") {
      hasNoErrors = apiGatewayErrorHandler("AZURE");
      addGatewayDetails = {
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,
        name: apiGateway?.name,
        region: "",
        workspace_id: currentTeam?.workspace_id,
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
      };
    } else if (sdkType === "GCP") {
      hasNoErrors = apiGatewayErrorHandler("GCP");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway.name,
        region: "",
        workspace_id: currentTeam?.workspace_id,
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
      };
    } else if (sdkType === "SWAGGER") {
      hasNoErrors = apiGatewayErrorHandler("SWAGGER");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway.name,
        region: "",
        workspace_id: currentTeam?.workspace_id,
        user_id: userProfile?.user?.user_id,
        interval: kongIntervalSeconds?.toString(),
        type: "SWAGGER",
        api_url: "",
        authentication_key: "",
        admin_url: apiGateway.server_urls,
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        subscription_id: "",
        private_key: "",
        server_urls: emails,
      };
    }

    // if (hasNoErrors) {
    dispatch(ImportApiGateway(addGatewayDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Apis Imported");
        handlePopoverClose();
        dispatch(GetApiGatewaySdkKeys(currentTeam?.workspace_id))
          .unwrap()
          .then()
          .catch((errr: any) => {
            if (errr.message == "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      })
      .catch((error: any) => {
        let errorMessage: any = error.message;

        try {
          const parsedError = JSON.parse(errorMessage);

          setErrorHandlingImports(parsedError);
        } catch (parseError) {
          console.error("Error parsing the error message: ", parseError);
        }

        // const errorData = errorHandling(error);
        // setErrorHandlingImports(error)

        if (error.message == "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          // toast.error(error?.message[0]?.errorMessage);
          // toast.error(error?.message);
          // toast.error(errorMessage);
        }
      });
    // }
  };

  // useEffect(() => {
  //   setEnableData(enables);
  // }, [enables]);

  // useEffect(() => {
  //   // Extract specific properties when errorHandlingImports changes
  //   if (errorHandingImports.length > 0) {
  //     const extractedData = errorHandingImports.map((error: any) => ({
  //       propertyName: error.propertyName,
  //       errorMessage: error.errorMessage
  //     }));

  //   }
  // }, [errorHandingImports]);

  useEffect(() => {
    // Extract specific properties when errorHandlingImports changes
    if (errorHandingImports && errorHandingImports.length > 0) {
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

  const importsUpdateApigate = () => {
    let hasNoErrors;
    let updateApisGate = {};

    if (apiGateway.type == "AWS") {
      hasNoErrors = apiGatewayErrorHandler("AWS");

      updateApisGate = {
        id: apiGateway?.id,
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,
        name: apiGateway?.name,
        region: apiGateway?.region,
        api_url: "",
        authentication_key: "",
        admin_url: "",
        type: "AWS",
        subscription_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: "",
        server_urls: [],
      };
    } else if (apiGateway.type == "KONG") {
      hasNoErrors = apiGatewayErrorHandler("KONG");
      updateApisGate = {
        id: apiGateway?.id,
        api_url: apiGateway?.api_url,
        authentication_key: apiGateway?.authentication_key,
        admin_url: apiGateway?.admin_url,
        name: apiGateway?.name,
        accessKey: "",
        secretKey: "",
        region: "",
        type: "KONG",
        subscription_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: "",
        server_urls: [],
      };
    } else if (apiGateway.type == "APISIX") {
      hasNoErrors = apiGatewayErrorHandler("APISIX");
      updateApisGate = {
        id: apiGateway?.id,
        api_url: apiGateway?.api_url,
        authentication_key: apiGateway?.authentication_key,
        admin_url: apiGateway?.admin_url,
        name: apiGateway?.name,
        accessKey: "",
        secretKey: "",
        region: "",
        type: "APISIX",
        subscription_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: "",
        server_urls: [],
      };
    } else if (apiGateway.type == "AZURE") {
      hasNoErrors = apiGatewayErrorHandler("AZURE");
      updateApisGate = {
        id: apiGateway?.id,
        api_url: "",
        authentication_key: "",
        admin_url: "",
        name: apiGateway?.name,
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,
        region: "",
        type: "AZURE",
        subscription_id: apiGateway?.subscription_id,
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: apiGateway?.azure_tenat_id,
        private_key: "",
        server_urls: [],
      };
    } else if (apiGateway.type == "GCP") {
      hasNoErrors = apiGatewayErrorHandler("GCP");
      updateApisGate = {
        id: apiGateway?.id,
        api_url: "",
        authentication_key: "",
        admin_url: "",
        name: apiGateway?.name,
        accessKey: "",
        secretKey: "",
        region: "",
        type: "GCP",
        subscription_id: "",
        tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: jsonString,
        server_urls: [],
      };
    } else if (apiGateway.type == "SWAGGER") {
      hasNoErrors = apiGatewayErrorHandler("SWAGGER");
      updateApisGate = {
        id: apiGateway?.id,
        api_url: "",
        authentication_key: "",
        admin_url: apiGateway.server_urls,
        name: apiGateway?.name,
        accessKey: "",
        secretKey: "",
        region: "",
        type: "SWAGGER",
        subscription_id: "",
        // tenant_id: userProfile?.user?.tenant_id,
        azure_tenat_id: "",
        private_key: "",
        server_urls: emails,
      };
    }
    if (hasNoErrors) {
      dispatch(UpdateApiGateway(updateApisGate))
        .unwrap()
        .then((res: any) => {
          toast.success(" Apis Imported");
          handlePopoverClose();
          dispatch(GetApiGatewaySdkKeys(currentTeam?.workspace_id))
            .unwrap()
            .then()
            .catch((errr: any) => {
              if (errr.message == "UNAUTHORIZED") {
                dispatch(updateSessionPopup(true));
              }
            });
        })
        .catch((error: any) => {
          if (error.message == "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          } else {
            toast.error(error.message);
          }
        });
    }
  };

  useEffect(() => {
    setApiGateway(
      edits
        ? gatewayData
        : {
            secretKey: "",
            name: "",
            description: "",
            region: "",
            accessKey: "",
            // interval : ""
          }
    );
    setKongGateway(
      edits
        ? gatewayData
        : {
            name: "",
            admin_url: "",
            server_urls: "",

            api_url: "",
            authentication_key: "",
            description: "",
          }
    );
    setJsonString(edits ? gatewayData.private_key : "");

    setFileName(edits && gatewayData.private_key ? "private_key.json" : "");
  }, [edits, gatewayData]);

  const handleRoleChange = (value: any) => {
    const selectedRole = timedata.find(
      (role: any) => role.id === Number(value)
    );
    if (selectedRole) {
      const minutesToSeconds = selectedRole.name.split(" ")[0] * 60; // Convert minutes to seconds
      setIntervalSeconds(minutesToSeconds); // Update intervalSeconds state with seconds value
    }
    setSelectedRoleId(Number(value));
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

  return (
    <div>
      {loading && <GlobalLoader />}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        sx={{
          "& .MuiPaper-root": {
            width: "520px",
            height: "406px",
            left: "500px !important",
            top: "80px !important",
            // marginRight: "60rem",
            // marginTop: "5rem",
            // marginRight:"18rem"
          },
        }}
        BackdropComponent={Backdrop}
        // BackdropProps={{
        //   style: {
        //     backgroundColor: "rgba(0, 0, 0, 0.5)",
        //   },
        // }}
      >
        <div style={{ padding: "10px 0px 10px 0px" }}>
          {currentStep === 1 && !edits && (
            <div style={{ margin: "1rem 1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <PrimaryTypography
                  style={{
                    fontWeight: "600",
                    fontSize: "0.8rem",
                  }}
                >
                  Imports Api Gateways
                </PrimaryTypography>
                <CloseIcon
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  onClick={handlePopoverClose}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {gatewayList?.map((val: any, index: number) => (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #eee",
                          borderRadius: "5px",
                          padding: "20px",
                          width: "230px",
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
                              color: `${theme.palette.teritiaryColor.main}`,
                              fontWeight: 900,
                              marginLeft: "10px",
                            }}
                          >
                            {val.name}
                          </SecondaryTypography>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}

          {(currentStep === 2 || edits) && (
            <div>
              <div style={{ padding: "10px 20px 10px 22px" }}>
                <PrimaryTypography
                  style={{
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    // padding: "0px 30px"
                    marginBottom: "2rem",
                  }}
                >
                  {sdkType === "AZURE" ||
                  (gatewayData && gatewayData.type === "AZURE")
                    ? "Imports from AZURE Api Gateway"
                    : sdkType === "KONG" ||
                      (gatewayData && gatewayData.type === "KONG")
                    ? "Imports from KONG Api Gateway"
                    : sdkType === "APISIX" ||
                      (gatewayData && gatewayData.type === "APISIX")
                    ? "Imports from APACHE Api Gateway"
                    : sdkType === "GCP" ||
                      (gatewayData && gatewayData.type === "GCP")
                    ? "Imports from Google Cloud plartform"
                    : sdkType === "APISIX" ||
                      (gatewayData && gatewayData.type === "APISIX")
                    ? "Imports from APACHE Api Gateway"
                    : sdkType === "SWAGGER"
                    ? // (gatewayData && gatewayData.type === "APISIX")
                      "Imports from Swagger Api Gateway"
                    : "Imports from AWS Api Gateway"}
                </PrimaryTypography>

                {apiFieldsConfig?.map((field) => (
                  <div key={field.id}>
                    {((field && field?.type === sdkType) ||
                      (gatewayData && gatewayData.type === field?.type)) && (
                      <div>
                        {field.id === "region" ? (
                          <div>
                            <PrimaryTypography
                              style={{
                                fontWeight: "600",
                                fontSize: "0.6rem",
                                marginTop: "1.5rem",
                              }}
                            >
                              {field.label}
                            </PrimaryTypography>
                            <GSelect
                              borderHeight="40px"
                              width={"100%"}
                              size="small"
                              radius="0px"
                              color={"black"}
                              options={field.options}
                              value={apiGateway[field.id]}
                              onChange={(e: any) =>
                                handleChange(
                                  field.id as keyof ApiGatewayType,
                                  e
                                )
                              }
                              // dataTest={field.dataTest}
                              helperText={errorApigateway?.region}
                              error={errorApigateway?.region}
                              // maxLength={30}
                            />
                          </div>
                        ) : field.id === "interval" ? (
                          <div>
                            <PrimaryTypography
                              style={{
                                fontWeight: "600",
                                fontSize: "0.6rem",
                                marginTop: "1.5rem",
                              }}
                            >
                              {field.label}
                            </PrimaryTypography>
                            <GSelect
                              // fullWidth
                              borderHeight="40px"
                              width={"100%"}
                              size="small"
                              radius="0px"
                              color={"black"}
                              value={selectedRoleId}
                              options={field.options}
                              onChange={kongHandleRoleChange}
                              // dataTest={field.dataTest}
                            />
                          </div>
                        ) : field.id === "swaggerchip" ? (
                          <div>
                            <PrimaryTypography
                              style={{
                                fontWeight: "600",
                                fontSize: "0.6rem",
                                marginTop: "1.5rem",
                              }}
                            >
                              {field.label}
                            </PrimaryTypography>
                            {/* <MuiChipsInput
                              sx={{
                                width: "29rem",
                                marginTop: "10px",

                                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                  // padding:"0px",
                                  // paddingLeft:"1rem",
                                  border: "1px solid #2c2c2c",
                                  fontSize: "12px",
                                  height: "6rem",
                                  // overflowY: "auto",
                                },
                              }}
                              value={emails}
                              onChange={handleChangeChip}
                              // onBeforeAdd={handleAdd}
                              // onDelete={handleDelete}
                              placeholder="Enter the Url"
                              // error={Boolean(error)}
                              // helperText={error}
                            /> */}
                          </div>
                        ) : field.id === "fileInput" ? (
                          <div>
                            <PrimaryTypography
                              style={{
                                fontWeight: "600",
                                fontSize: "0.6rem",
                                marginTop: "1.5rem",
                              }}
                            >
                              {field.label}
                            </PrimaryTypography>

                            <div>
                              <Button
                                component="span"
                                variant="outlined"
                                style={{
                                  textTransform: "none",
                                  marginTop: "0.8rem",
                                  width: "105px",
                                  color: `${theme.palette.secondaryColor.main}`,
                                  backgroundColor: "transparent",
                                  border: `1.5px solid ${theme.palette.secondaryColor.main}`,
                                }}
                                onClick={() => handleButtonClick()}
                              >
                                Select File
                              </Button>
                              <br></br>
                              <span
                                style={{
                                  color: "#d32f2f",
                                  fontSize: "0.75rem",
                                }}
                              >
                                {errorApigateway?.region}
                              </span>

                              {/* helperText={errorApigateway?.region}
                                error={errorApigateway?.region} */}
                              <input
                                type="file"
                                accept=".json"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />
                              {/* {fileName && <p>Selected file: {fileName}</p>} */}
                              {/* {jsonString && <pre>{jsonString}</pre>} */}
                              {fileName && !errorApigateway?.region && (
                                <p>Selected file: {fileName}</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <PrimaryTypography
                              style={{
                                fontWeight: "600",
                                fontSize: "0.6rem",
                                marginTop: "1.5rem",
                              }}
                            >
                              {field.label}
                            </PrimaryTypography>
                            <GInput
                              background="tranparent"
                              type="text"
                              fullWidth={true}
                              color="black"
                              value={
                                apiGateway[field.id as keyof ApiGatewayType]
                              }
                              id={field.id}
                              // variant="outlined"
                              radius="0px"
                              border="0 0 0 0.2px black"
                              onChangeHandler={(e: any) =>
                                handleChange(field.id, e.target.value)
                              }
                              placeholder={field.placeholder}
                              error={
                                errorApigateway[
                                  field.id as keyof ApiGatewayType
                                ]
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <GButton
                      buttonType="primary"
                      label={`Cancel`}
                      color={`${theme.palette.primaryBlack.main}`}
                      background="transparent"
                      onClickHandler={handlePopoverClose}
                    />
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                    <GButton
                      buttonType="primary"
                      label={`Imports`}
                      onClickHandler={
                        edits ? importsUpdateApigate : importGateway
                      }
                      // onClickHandler={() => apiGatewayErrorHandler("SWAGGER")}

                      dataTest="save-project-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Popover>
    </div>
  );
}

export default AwsImportPopup;
