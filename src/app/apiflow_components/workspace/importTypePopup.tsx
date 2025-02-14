import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Ajv from "ajv";
import { Box, Button, Popover } from "@mui/material";
import GSelect from "@/app/apiflow_components/sign/discovery/GSelect";
import GlobalTextField from "../global/GlobalTextField";
import GlobalButton from "../global/GButton";
import theme from "@/Theme/theme";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import GButton from "../global/GlobalButtons";
import GInput from "../global/GInput";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { useAlert } from "@/context/alertContext";
import {
  GetAllImportConfigurationWorkspaceId,
  ImportApiGateway,
} from "@/app/Redux/apiManagement/apiGatewayReducer";

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

const ImportTypePopup = (props: any) => {
  const { importedType, importedId, open, setOpen } = props;
  const { showAlert } = useAlert();
  const dispatch = useDispatch<any>();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

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

    //azure
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

    //gcp
    {
      id: "name",
      label: "Name",
      placeholder: "name",
      dataTest: "name-key-input",
      type: "GCP",
    },

    // {
    //   id: "fileInput",
    //   label: "Select JSON File",
    //   placeholder: "",
    //   dataTest: "file-input",
    //   type: "GCP",
    // },
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
    //swagger
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

  const [apiGateway, setApiGateway] =
    useState<ApiGatewayType>(initialApiGateway);
  const [fileUrl, setFileUrl] = useState<any>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [jsonString, setJsonString] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [fileContentNew, setFileContentNew] = useState<string>("");
  const [kongIntervalSeconds, setKongIntervalSeconds] = useState<number>(300);
  const [emails, setEmails] = useState<string[]>([]);

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

  const handleClosePopover = () => {
    setOpen(false);
    handleBackToStep();
  };

  const handleBackToStep = () => {
    setSelectedFile(null);
    setJsonError("");
    setFileUrl(false);
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
  };

  const handleChange = (id: string, value: string) => {
    setApiGateway((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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
              errors.name = apiGateway.name === "" ? "Name  is required" : "";
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

  const handleSubmit = () => {
    let addGatewayDetails: any;
    let hasNoErrors: boolean = false;

    if (importedType === "AWS") {
      hasNoErrors = apiGatewayErrorHandler("AWS");
      addGatewayDetails = {
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,
        name: apiGateway?.name,
        description: apiGateway?.description,
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
    } else if (importedType === "KONG") {
      hasNoErrors = apiGatewayErrorHandler("KONG");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway?.name,
        description: apiGateway?.description,
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
    } else if (importedType === "APISIX") {
      hasNoErrors = apiGatewayErrorHandler("APISIX");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway?.name,
        description: apiGateway?.description,
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
    } else if (importedType === "AZURE") {
      hasNoErrors = apiGatewayErrorHandler("AZURE");
      addGatewayDetails = {
        accessKey: apiGateway?.accessKey,
        secretKey: apiGateway?.secretKey,
        name: apiGateway?.name,
        description: apiGateway?.description,
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
    } else if (importedType === "GCP") {
      hasNoErrors = apiGatewayErrorHandler("GCP");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway?.name,
        description: apiGateway?.description,
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
    } else if (importedType === "SWAGGER") {
      hasNoErrors = apiGatewayErrorHandler("SWAGGER");
      addGatewayDetails = {
        accessKey: "",
        secretKey: "",
        name: apiGateway?.name,
        description: apiGateway?.description,
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

    dispatch(ImportApiGateway(addGatewayDetails))
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
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    dispatch(GetAllImportConfigurationWorkspaceId(currentWorkspace?.id))
      .unwrap()
      .then((res: any) => {
        const filterResponse = res?.filter(
          (filterType: any) =>
            filterType?.type === importedType && filterType?.id === importedId
        );

        setApiGateway({
          Secretkey: filterResponse[0]?.secretKey,
          id: filterResponse[0]?.id,
          secretKey: filterResponse[0]?.secretKey,
          name: filterResponse[0]?.name,
          description: filterResponse[0]?.description,
          region: filterResponse[0]?.region,
          accessKey: filterResponse[0]?.accessKey,
          type: filterResponse[0]?.type,
          subscription_id: filterResponse[0]?.subscription_id,
          azure_tenat_id: filterResponse[0]?.azure_tenat_id,
          interval: filterResponse[0]?.interval,
          ApiGatewayType: "",
          client_id: "",
          client_secreat: "",
          api_url: filterResponse[0]?.api_url,
          admin_url: filterResponse[0]?.admin_url,
          server_urls: filterResponse[0]?.server_urls,
          authentication_key: filterResponse[0]?.authentication_key,
        });
      })
      .catch((error: any) => {});
  }, [currentWorkspace?.id]);

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
        <Box>
          <div
            style={{
              padding: "15px",
            }}
          >
            <PrimaryTypography>{importedType}</PrimaryTypography>

            {apiFieldsConfig.map((field) => (
              <div key={field.id}>
                {field && field.type === importedType && (
                  <div>
                    {/* {field.id !== "name" && field.id !== "description" ? ( */}
                    <>
                      {field.id === "region" ? (
                        <div style={{ marginTop: "2rem" }}>
                          <PrimaryTypography>{field?.label}</PrimaryTypography>
                          <GSelect
                            // label={field.placeholder}
                            width={"500px"}
                            radius="7px"
                            size="small"
                            options={field.options}
                            value={apiGateway.region}
                            onChange={(e: any) => handleChange("region", e)}
                            // defaultValue={"0"}
                            helperText={errorApigateway.region}
                            error={errorApigateway.region}
                          />
                        </div>
                      ) : field.id === "interval" ? (
                        <div style={{ marginTop: "2rem" }}>
                          <PrimaryTypography>{field?.label}</PrimaryTypography>
                          <GSelect
                            // label={field.placeholder}
                            width={"500px"}
                            radius="7px"
                            size="small"
                            value={apiGateway.interval}
                            options={field.options}
                            onChange={(e: any) => handleChange("interval", e)}
                          />
                        </div>
                      ) : field.id === "fileInput" ? (
                        <div style={{ marginTop: "2rem" }}>
                          <PrimaryTypography>{field?.label}</PrimaryTypography>
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
                        <div style={{ marginTop: "2rem" }}>
                          <PrimaryTypography>{field?.label}</PrimaryTypography>

                          <GInput
                            value={apiGateway[field.id as keyof ApiGatewayType]}
                            fullWidth={false}
                            height="40px"
                            width="500px"
                            margin="10px 0px"
                            padding="7px 0px"
                            size="normal"
                            onChangeHandler={(e: any) => {
                              handleChange(field.id, e.target.value);
                            }}
                            error={
                              errorApigateway[field.id as keyof ApiGatewayType]
                            }
                            helperText={
                              errorApigateway[field.id as keyof ApiGatewayType]
                            }
                          />
                        </div>
                      )}
                    </>
                    {/* ) : null} */}
                  </div>
                )}
              </div>
            ))}
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
                  label={"Import"}
                  onClickHandler={handleSubmit}
                />
              </div>
            </div>
          </div>
        </Box>
      </Popover>
    </Box>
  );
};

export default ImportTypePopup;
