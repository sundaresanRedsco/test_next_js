import React, { useEffect, useRef, useState } from "react";
import Ajv from "ajv";
import {
  Backdrop,
  Box,
  Button,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import {
  ApacheApiSix,
  ApiFlowLogo,
  CubeImage,
  Cuboid1Image,
  CuboidImage,
  SurfaceImage,
  AwsIcon,
  SoapIcon,
  JsonIcon,
  CloseIcon,
} from "../../Assests/icons";
import theme from "../../../Theme/theme";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondaryTypography,
} from "../../Styles/signInUp";
import { RootStateType } from "../../Redux/store";
import { CommonReducer, updateSessionPopup } from "../../Redux/commonReducer";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Kong from "../../Assests/images/downimage.png";
import AzureImage from "../../Assests/images/azure-logo.png";
import GCPImage from "../../Assests/images/Google-Cloud.jpg";
import ApiTextField from "../../Components/ApiManagement/apiTextField";
import GButton from "../../Components/Global/GlobalButtons";
import {
  ImportApiGateway,
  apiGatewayReducer,
} from "../../Redux/apiManagement/apiGatewayReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import GSelect from "../../Components/Global/GSelect";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  CreateCollections,
  CreateProjects,
  CreateSoapOperations,
  GetAllAwsImportDataByTeamWsId,
  GetAllStagesByProjectId,
  GetOperations,
  GetWsdlOperByCollId,
  UpdateAwsImport,
  UpdateCollectionsById,
} from "../../Redux/apiManagement/projectReducer";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Add from "@mui/icons-material/Add";
import RadioCheckboxComponent from "../../Components/Global/radioCheckboxComponent";
import GsearchBar from "../../Components/Global/GsearchBar";
import {
  getCookies,
  setCookies,
  translate,
} from "../../Helpers/helpersFunctions";
import Image from "next/image";

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

const CustomGrid1 = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const CustomGrid = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const TextTypography = styled(Typography)`
  color: ${theme.palette.primaryPurple.main};
  font-family: Inter-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 10px;
`;

const GatewayChooser = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const wsidVal: any = getCookies(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "");

  const teamWsidVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_TEAMWSID ?? "");
  const stageIdVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_STAGEID ?? "");
  const collectionIdVal = getCookies(
    process.env.NEXT_PUBLIC_COOKIE_COLLID ?? ""
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { loading } = useSelector<RootStateType, apiGatewayReducer>(
    (state) => state.apiManagement.gateWay
  );

  const gatewayList = [
    {
      name: "AWS",
      icon: <AwsIcon width={"100%"} height={"100%"} />,
    },
    {
      name: "KONG",
      icon: (
        <Image src={Kong} alt="" style={{ width: "100%", height: "100%" }} />
      ),
    },
    {
      name: "AZURE",
      icon: (
        <Image
          src={AzureImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),
    },
    {
      name: "GCP",
      icon: (
        <Image
          src={GCPImage}
          alt=""
          width={80}
          height={50}
          style={{
            marginLeft: "-8px",
            width: "80px",
            height: "50px",
          }}
        />
      ),
    },
    {
      name: "SOAP",
      icon: <SoapIcon width={"100%"} height={"100%"} />,
    },
    {
      name: "JSON",
      icon: <JsonIcon width={"100%"} height={"100%"} />,
    },
    {
      name: "APISIX",
      icon: <ApacheApiSix width={"100%"} height={"100%"} />,
    },
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

  const timesData = [
    { id: 0, name: "5 mins" },
    { id: 1, name: "10 mins" },
    { id: 2, name: "15 mins" },
    { id: 3, name: "20 mins" },
  ];

  const [startUsingClicked, setStartUsingClicked] = useState(false);
  const [gatewayValue, setGatewayValue] = useState("");

  //only this value is getting used for all gateways and it is common.
  const [awsValues, setAwsValues] = useState({
    name: "",
    secretKey: "",
    accessKey: "",
    region: "",
    description: "",
    admin_url: "",
    api_url: "",
    authentication_key: "",
    subscription_id: "",
    tenant_id: "",
    project_name: "",
    collection_name: "",
    base_url: "",
    wsdl_url: "",
    gcpName: "",
  });

  const [kongValues, setKongValues] = useState({
    name: "",
    admin_url: "",
    api_url: "",
    authentication_key: "",
    description: "",
  });

  const [apacheApisixValues, setApacheApisixValues] = useState({
    name: "",
    admin_url: "",
    api_url: "",
    authentication_key: "",
    description: "",
  });

  const [soapValues, setSoapValues] = useState({
    project_name: "",
    collection_name: "",
    base_url: "",
    wsdl_url: "",
  });

  const [timedata, setTimedata] = useState<any>(timesData);

  const [intervalSeconds, setIntervalSeconds] = useState<number>(300);
  const [kongIntervalSeconds, setKongIntervalSeconds] = useState<number>(300);
  const [gcpIntervalSeconds, setGcpIntervalSeconds] = useState<number>(300);

  const [selectedRoleId, setSelectedRoleId] = useState<number>(0);

  const [errorField1, setErrorField1] = useState("");
  const [errorField2, setErrorField2] = useState("");
  const [errorField3, setErrorField3] = useState("");
  const [errorField4, setErrorField4] = useState("");
  const [errorField5, setErrorField5] = useState("");
  const [errorField6, setErrorField6] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [idValue, setIdValue] = useState("");
  const [gatewayLength, setGatewayLength] = useState(0);
  const [allGatewayValues, setAllGatewayValues] = useState<any[]>([]);
  const [successGateway, setSuccessGateway] = useState(false);
  const [listView, setListView] = useState(true);
  const [editClicked, setEditClicked] = useState(false);
  const [importClicked, setImportClicked] = useState(false);
  const [updateValue, setUpdateValue] = useState({});

  const [gcpDataFile, setGcpDataFile] = useState<any>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const [wsdlPop, setWsdlPop] = useState(false);
  const [anchorElWsdl, setAnchorElWsdl] = React.useState<HTMLElement | null>(
    null
  );
  const [checkedWsdl, setCheckedWsdl] = useState<any[]>([]);
  const [wsdlSearch, setWsdlSearch] = useState("");
  const [soapOperations, setSoapOperations] = useState<any[]>([]);
  const [soapEdit, setSoapEdit] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const wsdlPopRef = useRef<HTMLDivElement>(null);

  const handleAwsValues = (field: any, event: any) => {
    setAwsValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  // const handleKongValues = (field: any, event: any) => {
  //   setKongValues((prevValues) => ({
  //     ...prevValues,
  //     [field]: event,
  //   }));
  // };

  // const handleApacheApisixValues = (field: any, event: any) => {
  //   setApacheApisixValues((prevValues) => ({
  //     ...prevValues,
  //     [field]: event,
  //   }));
  // };

  const handleRoleChange = (value: any) => {
    const selectedRole = timedata?.find(
      (role: any) => role?.id === Number(value)
    );
    if (selectedRole) {
      const minutesToSeconds = selectedRole?.name?.split(" ")[0] * 60; // Convert minutes to seconds
      setIntervalSeconds(minutesToSeconds); // Update intervalSeconds state with seconds value
    }
    setSelectedRoleId(Number(value));
  };

  const kongHandleRoleChange = (value: any) => {
    const selectedRole = timedata?.find(
      (role: any) => role?.id === Number(value)
    );
    if (selectedRole) {
      const minutesToSeconds = selectedRole?.name?.split(" ")[0] * 60; // Convert minutes to seconds
      setKongIntervalSeconds(minutesToSeconds); // Update intervalSeconds state with seconds value
    }
    setSelectedRoleId(Number(value));
  };

  const gcpHandleRoleChange = (value: any) => {
    const selectedRole = timedata?.find(
      (role: any) => role?.id === Number(value)
    );
    if (selectedRole) {
      const minutesToSeconds = selectedRole?.name?.split(" ")[0] * 60; // Convert minutes to seconds
      setGcpIntervalSeconds(minutesToSeconds);
    }
    setSelectedRoleId(Number(value));
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setGcpDataFile(JSON.stringify(file));
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const valid = validate(json);
          if (valid) {
            console.log("File is valid according to the schema");
            setValidationMessage("File is valid according to the schema");
          } else {
            console.error("File validation errors:", validate.errors);
            setValidationMessage(
              "File validation errors: " +
                JSON.stringify(validate.errors, null, 2)
            );
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
          //   setValidationMessage('Invalid JSON file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleGatewayValuesValidation = () => {
    if (gatewayValue === "AWS") {
      const hasValidationErrorName = awsValues?.name?.trim() === "";
      const hasValidationErrorSecretKey = awsValues?.secretKey?.trim() === "";
      const hasValidationErrorAccesskey = awsValues?.accessKey?.trim() === "";
      const hasValidationErrorRegion = awsValues?.region?.trim() === "";
      const hasValidationErrorInterval =
        intervalSeconds?.toString()?.trim() === "";
      const hasValidationErrorDescription =
        awsValues?.description?.trim() === "";

      const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.name
      );

      const isOverLimitName = awsValues?.name?.length > 50;

      if (hasValidationErrorName) {
        setErrorField1("Name is required");
      } else if (hasValidationErrorSecretKey) {
        setErrorField2("Secret Key is required");
      } else if (hasValidationErrorAccesskey) {
        setErrorField3("Access Key is required");
      } else if (hasValidationErrorRegion) {
        setErrorField4("Region is required");
        // } else if (hasValidationErrorInterval) {
        //     setErrorField5("Interval is required")
      } else if (hasValidationErrorDescription) {
        setErrorField5("Description is required");
      } else if (hasSpecialCharName) {
        setErrorField1("Special Characters and space are not allowed.");
      } else if (isOverLimitName) {
        setErrorField1("Name should not exceed 50 characters.");
      } else {
        return true;
      }
    } else if (gatewayValue === "KONG") {
      //changing kongValues to awsValues
      const hasValidationErrorName = awsValues?.name?.trim() === "";
      const hasValidationErrorAdminUrl = awsValues?.admin_url?.trim() === "";
      const hasValidationErrorApiUrl = awsValues?.api_url?.trim() === "";
      const hasValidationErrorAuthKey =
        awsValues?.authentication_key?.trim() === "";
      const hasValidationErrorDescription =
        awsValues?.description?.trim() === "";

      const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.name
      );

      const isOverLimitName = awsValues?.name?.length > 50;

      if (hasValidationErrorName) {
        setErrorField1("Name is required");
      } else if (hasValidationErrorAdminUrl) {
        setErrorField2("Admin Url is required");
      } else if (hasValidationErrorApiUrl) {
        setErrorField3("Api Url is required");
      } else if (hasValidationErrorAuthKey) {
        setErrorField4("Auth Key is required");
      } else if (hasValidationErrorDescription) {
        setErrorField5("Description is required");
      } else if (hasSpecialCharName) {
        setErrorField1("Special Characters and space are not allowed.");
      } else if (isOverLimitName) {
        setErrorField1("Name should not exceed 50 characters.");
      } else {
        return true;
      }
    } else if (gatewayValue === "APISIX") {
      //changing apacheApisixValues to awsValues
      const hasValidationErrorName = awsValues?.name?.trim() === "";
      const hasValidationErrorAdminUrl = awsValues?.admin_url?.trim() === "";
      const hasValidationErrorApiUrl = awsValues?.api_url?.trim() === "";
      const hasValidationErrorAuthKey =
        awsValues?.authentication_key?.trim() === "";
      const hasValidationErrorDescription =
        awsValues?.description?.trim() === "";

      const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.name
      );

      const isOverLimitName = awsValues?.name?.length > 50;

      if (hasValidationErrorName) {
        setErrorField1("Name is required");
      } else if (hasValidationErrorAdminUrl) {
        setErrorField2("Admin Url is required");
      } else if (hasValidationErrorApiUrl) {
        setErrorField3("Api Url is required");
      } else if (hasValidationErrorAuthKey) {
        setErrorField4("Auth Key is required");
      } else if (hasValidationErrorDescription) {
        setErrorField5("Description is required");
      } else if (hasSpecialCharName) {
        setErrorField1("Special Characters and space are not allowed.");
      } else if (isOverLimitName) {
        setErrorField1("Name should not exceed 50 characters.");
      } else {
        return true;
      }
    } else if (gatewayValue === "AZURE") {
      const hasValidationErrorName = awsValues?.name?.trim() === "";
      const hasValidationErrorClientSecret =
        awsValues?.secretKey?.trim() === "";
      const hasValidationErrorClientId = awsValues?.accessKey?.trim() === "";
      const hasValidationErrorTenantId = awsValues?.tenant_id?.trim() === "";
      const hasValidationErrorSubscriptionId =
        awsValues?.subscription_id?.trim() === "";
      const hasValidationErrorDescription =
        awsValues?.description?.trim() === "";

      const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.name
      );

      const isOverLimitName = awsValues?.name?.length > 50;

      if (hasValidationErrorName) {
        setErrorField1("Name is required");
      } else if (hasValidationErrorClientSecret) {
        setErrorField2("Client Secret is required");
      } else if (hasValidationErrorClientId) {
        setErrorField3("Client Id is required");
      } else if (hasValidationErrorTenantId) {
        setErrorField4("Tenant Id  is required");
      } else if (hasValidationErrorSubscriptionId) {
        setErrorField5("SubscriptionId is required");
      } else if (hasValidationErrorDescription) {
        setErrorField6("Description is required");
      } else if (hasSpecialCharName) {
        setErrorField1("Special Characters and space are not allowed.");
      } else if (isOverLimitName) {
        setErrorField1("Name should not exceed 50 characters.");
      } else {
        return true;
      }
    } else if (gatewayValue === "SOAP") {
      const hasValidationErrorProjectName =
        awsValues?.project_name?.trim() === "";
      const hasValidationErrorCollName =
        awsValues?.collection_name?.trim() === "";

      const hasSpecialCharProjectName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.project_name
      );
      const hasSpecialCharCollectionName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.collection_name
      );

      const isOverLimitProjectName = awsValues?.project_name?.length > 50;
      const isOverLimitCollName = awsValues?.collection_name?.length > 50;

      const hasValidationErrorBaseUrl = awsValues?.base_url?.trim() === "";
      const hasValidationErrorWsdlUrl = awsValues?.wsdl_url?.trim() === "";

      if (hasValidationErrorProjectName) {
        setErrorField1("Project Name is required");
      } else if (hasValidationErrorCollName) {
        setErrorField2("Collection Name is required");
      } else if (hasSpecialCharProjectName) {
        setErrorField1("Special Characters and space are not allowed.");
      } else if (hasSpecialCharCollectionName) {
        setErrorField2("Special Characters and space are not allowed.");
      } else if (isOverLimitProjectName) {
        setErrorField1("Project Name should not exceed 50 characters.");
      } else if (isOverLimitCollName) {
        setErrorField2("Collection Name should not exceed 50 characters.");
      } else if (hasValidationErrorBaseUrl) {
        setErrorField2("Base Url is required.");
      } else if (hasValidationErrorWsdlUrl) {
        setErrorField2("Wsdl Url is required.");
      } else {
        return true;
      }
    } else if (gatewayValue === "GCP") {
      const hasValidationErrorName = awsValues?.gcpName?.trim() === "";
      const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
        awsValues?.gcpName
      );
      const isOverLimitName = awsValues?.gcpName?.length > 50;

      if (hasValidationErrorName) {
        setErrorField1("Name is required");
      } else if (hasSpecialCharName) {
        setErrorField1("Special Characters and space are not allowed.");
      } else if (isOverLimitName) {
        setErrorField1("Name should not exceed 50 characters.");
      } else {
        return true;
      }
    }
  };

  const handleWsdlSearch = (event: any) => {
    setWsdlSearch(event?.target?.value);
  };

  const filteredSoapOperations =
    wsdlSearch?.trim() !== ""
      ? soapOperations?.filter((filterVal) =>
          filterVal?.name?.toLowerCase().includes(wsdlSearch?.toLowerCase())
        )
      : soapOperations;

  const handleCloseWsdl = () => {
    setAnchorElWsdl(null);
    setWsdlPop(false);
    setCheckedWsdl([]);
    setWsdlSearch("");
    if (filteredSoapOperations?.length === 0 && gatewayValue === "SOAP") {
      // setListView(true);
      setGatewayLength(0);
      setGatewayValue("SOAP");
      setSoapEdit(true);
    }
  };

  const handleWsdlCheckbox = (val: any) => {
    setCheckedWsdl((prevCheckedItems) => {
      if (prevCheckedItems?.includes(val)) {
        return prevCheckedItems?.filter((filterVal: any) => filterVal !== val);
      } else {
        return [...prevCheckedItems, val];
      }
    });
  };

  const handleSelectAllChecked = (event: any) => {
    if (event?.target?.checked) {
      setCheckedWsdl(filteredSoapOperations);
    } else {
      setCheckedWsdl([]);
    }
  };

  const isAllChecked =
    filteredSoapOperations &&
    checkedWsdl?.length === filteredSoapOperations?.length;

  const handleSaveContinueWsdlPop = () => {
    const idValues = checkedWsdl?.map((val: any) => val?.id);

    if (idValues && idValues?.length > 0) {
      let requestData = {
        id: idValues,
        collection_id: collectionIdVal,
      };

      setLoadingState(true);
      dispatch(CreateSoapOperations(requestData))
        .unwrap()
        .then((createSoapRes: any) => {
          setLoadingState(false);
          console.log("CreateSoapRes: ", createSoapRes);
          if (createSoapRes === "wsdl operation status updated successfully.") {
            navigate(
              `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`
            );
          } else {
            toast?.error("An error occured in the Soap Creation");
          }
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    } else {
      toast?.error("Select atleast 1 operation to continue further!");
    }
  };

  const handleCancelGatewayValues = () => {
    setAwsValues({
      name: "",
      secretKey: "",
      accessKey: "",
      region: "",
      description: "",
      admin_url: "",
      api_url: "",
      authentication_key: "",
      subscription_id: "",
      tenant_id: "",
      project_name: "",
      collection_name: "",
      base_url: "",
      wsdl_url: "",
      gcpName: "",
    });
    setKongValues({
      name: "",
      admin_url: "",
      api_url: "",
      authentication_key: "",
      description: "",
    });
    setApacheApisixValues({
      name: "",
      admin_url: "",
      api_url: "",
      authentication_key: "",
      description: "",
    });
    setSoapValues({
      project_name: "",
      collection_name: "",
      base_url: "",
      wsdl_url: "",
    });
    setGatewayValue("");
    if (gatewayLength > 0) {
      setListView(true);
    }
    setErrorField1("");
    setErrorField2("");
    setErrorField3("");
    setErrorField4("");
    setErrorField5("");
    setErrorField6("");
    setSelectedRoleId(0);
    setErrorMessage("");
    setEditClicked(false);
    setImportClicked(false);
    setGcpDataFile(null);
    setValidationMessage("");
  };

  const handleGatewayValues = () => {
    //changing kongValues and apacheApisixValues to awsValues
    const validationCheck = handleGatewayValuesValidation();
    let importGatewayData: any;
    if (gatewayValue === "AWS") {
      if (validationCheck === true) {
        importGatewayData = {
          id: idValue,
          accessKey: awsValues?.accessKey,
          secretKey: awsValues?.secretKey,
          name: awsValues?.name,
          region: awsValues?.region,
          workspace_id: teamWsidVal,
          user_id: userProfile?.user.user_id,
          interval: intervalSeconds?.toString(),
          type: "AWS",
          api_url: "",
          authentication_key: "",
          admin_url: "",
          subscription_id: "",
          tenant_id: userProfile?.user?.tenant_id,
          project_name: "",
          collection_name: "",
          base_url: "",
          wsdl_url: "",
          private_key: "",
          project_id: "",
          import_type: "WORKSPACE",
          server_urls: [],
          azure_tenat_id: "",
          description: awsValues.description,
        };
      }
    } else if (gatewayValue === "KONG") {
      // const validationCheck = handleGatewayValuesValidation();
      if (validationCheck === true) {
        importGatewayData = {
          id: idValue,
          accessKey: "",
          secretKey: "",
          name: awsValues?.name,
          region: "",
          workspace_id: teamWsidVal,
          user_id: userProfile?.user.user_id,
          interval: kongIntervalSeconds?.toString(),
          type: "KONG",
          api_url: awsValues?.api_url,
          authentication_key: awsValues?.authentication_key,
          admin_url: awsValues?.admin_url,
          subscription_id: "",
          tenant_id: "",
          project_name: "",
          collection_name: "",
          base_url: "",
          wsdl_url: "",
          project_id: "",
          import_type: "WORKSPACE",
          server_urls: [],
          azure_tenat_id: "",
          description: awsValues.description,
        };
      }
    } else if (gatewayValue === "APISIX") {
      // const validationCheck = handleGatewayValuesValidation();
      if (validationCheck === true) {
        importGatewayData = {
          id: idValue,
          accessKey: "",
          secretKey: "",
          name: awsValues?.name,
          region: "",
          workspace_id: teamWsidVal,
          // workspace_id:,
          user_id: userProfile?.user.user_id,
          interval: "000",
          type: "APISIX",
          api_url: awsValues?.api_url,
          authentication_key: awsValues?.authentication_key,
          admin_url: awsValues?.admin_url,
          subscription_id: "",
          tenant_id: "",
          project_name: "",
          collection_name: "",
          base_url: "",
          wsdl_url: "",
          project_id: "",
          import_type: "WORKSPACE",
          server_urls: [],
          azure_tenat_id: "",
          description: awsValues.description,
        };
      }
    } else if (gatewayValue === "AZURE") {
      // const validationCheck = handleGatewayValuesValidation();
      if (validationCheck === true) {
        importGatewayData = {
          id: idValue,
          accessKey: awsValues?.accessKey,
          secretKey: awsValues?.secretKey,
          name: awsValues?.name,
          region: "",
          workspace_id: teamWsidVal,
          // workspace_id:,
          user_id: userProfile?.user.user_id,
          interval: "000",
          type: "AZURE",
          api_url: "",
          authentication_key: "",
          admin_url: "",
          subscription_id: awsValues?.subscription_id,
          tenant_id: userProfile?.user?.tenant_id,
          project_name: "",
          collection_name: "",
          base_url: "",
          wsdl_url: "",
          project_id: "",
          import_type: "WORKSPACE",
          server_urls: [],
          azure_tenat_id: awsValues?.tenant_id,
          description: awsValues.description,
        };
      }
    } else if (gatewayValue === "SOAP") {
      if (validationCheck === true) {
        importGatewayData = {
          id: idValue,
          accessKey: "",
          secretKey: "",
          name: "",
          region: "",
          workspace_id: wsidVal,
          user_id: userProfile?.user.user_id,
          interval: "",
          type: "SOAP",
          api_url: "",
          authentication_key: "",
          admin_url: "",
          subscription_id: "",
          tenant_id: "",
          project_name: awsValues?.project_name,
          collection_name: awsValues?.collection_name,
          base_url: awsValues?.base_url,
          wsdl_url: awsValues?.wsdl_url,
          project_id: "",
          import_type: "WORKSPACE",
          server_urls: [],
          azure_tenat_id: "",
          description: awsValues.description,
        };
      }
    } else if (gatewayValue === "GCP") {
      if (validationCheck === true) {
        importGatewayData = {
          id: idValue,
          accessKey: "",
          secretKey: "",
          region: "",
          workspace_id: wsidVal,
          user_id: userProfile?.user.user_id,
          type: "GCP",
          api_url: "",
          authentication_key: "",
          admin_url: "",
          subscription_id: "",
          tenant_id: "",
          project_name: "",
          collection_name: "",
          base_url: "",
          wsdl_url: "",
          name: awsValues?.gcpName,
          interval: gcpIntervalSeconds?.toString(),
          private_key: gcpDataFile,
          project_id: "",
          import_type: "WORKSPACE",
          server_urls: [],
          azure_tenat_id: "",
          description: awsValues.description,
        };
      }
    }

    //for single gateway
    // dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
    //     .unwrap()
    //     .then((teamWsidRes: any) => {
    //         console.log("teamWsidRes: ", teamWsidRes)
    //         if (teamWsidRes?.length > 0) {
    //             console.log("Exists: ", importGatewayData);
    //             dispatch(UpdateAwsImport(importGatewayData))
    //                 .unwrap()
    //                 .then((updateRes: any) => {
    //                     console.log("UpdateRes: ", updateRes);
    //                     toast.success("Your Gateway has been Updated Successfully");
    //                     setErrorMessage("");
    //                     dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
    //                         .unwrap()
    //                         .then((teamWsidRes: any) => {
    //                             if (gatewayValue === "AWS") {
    //                                 const filteredAwsValues = teamWsidRes
    //                                     ?.filter((filterVal: any) => filterVal?.type === "AWS")
    //                                     ?.map((val: any) => ({
    //                                         name: val?.name,
    //                                         secretKey: val?.secretKey,
    //                                         accessKey: val?.accessKey,
    //                                         region: val?.region,
    //                                         description: awsValues?.description,
    //                                         id: val?.id,
    //                                         type: val?.type,
    //                                         error_message: val?.error_message,
    //                                         import_status: val?.import_status,
    //                                     }));

    //                                 console.log(filteredAwsValues?.[0], "filteredAwsValues");
    //                                 setAwsValues(filteredAwsValues?.[0]);
    //                                 // setErrorMessage(filteredAwsValues?.[0]?.error_message);
    //                                 setErrorMessage(
    //                                     filteredAwsValues?.[0]?.import_status === "INVALID_CREDENTIALS"
    //                                         ? filteredAwsValues?.[0]?.import_status
    //                                         : filteredAwsValues?.[0]?.error_message
    //                                 );
    //                                 setIdValue(filteredAwsValues?.[0]?.id);
    //                             }
    //                             else if (gatewayValue === "KONG") {
    //                                 const filteredKongValues = teamWsidRes
    //                                     ?.filter((filterVal: any) => filterVal?.type === "KONG")
    //                                     ?.map((val: any) => ({
    //                                         name: val?.name,
    //                                         admin_url: val?.admin_url,
    //                                         api_url: val?.api_url,
    //                                         authentication_key: val?.authentication_key,
    //                                         region: val?.region,
    //                                         description: awsValues?.description,
    //                                         id: val?.id,
    //                                         type: val?.type,
    //                                         error_message: val?.error_message,
    //                                     }));

    //                                 console.log(filteredKongValues?.[0], "filteredKongValues");

    // setAwsValues(filteredKongValues?.[0]);
    //                                 // setErrorMessage(filteredKongValues?.[0]?.error_message);
    //                                 setErrorMessage(
    //                                     filteredKongValues?.[0]?.import_status === "INVALID_CREDENTIALS"
    //                                         ? filteredKongValues?.[0]?.import_status
    //                                         : filteredKongValues?.[0]?.error_message
    //                                 );
    //                                 setIdValue(filteredKongValues?.[0]?.id);
    //                             }
    //                             else if (gatewayValue === "APISIX") {
    //                                 const filteredApisixValues = teamWsidRes
    //                                     ?.filter((filterVal: any) => filterVal?.type === "APISIX")
    //                                     ?.map((val: any) => ({
    //                                         name: val?.name,
    //                                         admin_url: val?.admin_url,
    //                                         api_url: val?.api_url,
    //                                         authentication_key: val?.authentication_key,
    //                                         description: awsValues?.description,
    //                                         id: val?.id,
    //                                         type: val?.type,
    //                                         error_message: val?.error_message,
    //                                     }));

    //                                 console.log(filteredApisixValues?.[0], "filteredApisixValues");
    //                                 setAwsValues(filteredApisixValues?.[0]);
    //                                 // setErrorMessage(filteredApisixValues?.[0]?.error_message);
    //                                 setErrorMessage(
    //                                     filteredApisixValues?.[0]?.import_status === "INVALID_CREDENTIALS"
    //                                         ? filteredApisixValues?.[0]?.import_status
    //                                         : filteredApisixValues?.[0]?.error_message
    //                                 );

    //                                 setIdValue(filteredApisixValues?.[0]?.id);
    //                             }
    //                         })
    //                         .catch((error: any) => {
    //                             console.log("Error")
    //                         })
    //                 })
    //                 .catch((error: any) => {
    //                     console.log("Error: ", error)
    //                 })
    //         }
    //         else {
    //             dispatch(ImportApiGateway(importGatewayData))
    //                 .unwrap()
    //                 .then((res: any) => {
    //                     toast?.success("Gateway imported successfully!");
    //                     setErrorMessage("");
    //                     dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
    //                         .unwrap()
    //                         .then((teamWsidRes: any) => {
    //                             if (gatewayValue === "AWS") {
    //                                 const filteredAwsValues = teamWsidRes
    //                                     ?.filter((filterVal: any) => filterVal?.type === "AWS")
    //                                     ?.map((val: any) => ({
    //                                         name: val?.name,
    //                                         secretKey: val?.secretKey,
    //                                         accessKey: val?.accessKey,
    //                                         region: val?.region,
    //                                         description: awsValues?.description,
    //                                         id: val?.id,
    //                                         type: val?.type,
    //                                         error_message: val?.error_message,
    //                                     }));

    //                                 console.log(filteredAwsValues?.[0], "filteredAwsValues");
    //                                 setAwsValues(filteredAwsValues?.[0]);
    //                                 // setErrorMessage(filteredAwsValues?.[0]?.error_message);
    //                                 setErrorMessage(
    //                                     filteredAwsValues?.[0]?.import_status === "INVALID_CREDENTIALS"
    //                                         ? filteredAwsValues?.[0]?.import_status
    //                                         : filteredAwsValues?.[0]?.error_message
    //                                 );
    //                                 setIdValue(filteredAwsValues?.[0]?.id);
    //                             }
    //                             else if (gatewayValue === "KONG") {
    //                                 const filteredKongValues = teamWsidRes
    //                                     ?.filter((filterVal: any) => filterVal?.type === "KONG")
    //                                     ?.map((val: any) => ({
    //                                         name: val?.name,
    //                                         admin_url: val?.admin_url,
    //                                         api_url: val?.api_url,
    //                                         authentication_key: val?.authentication_key,
    //                                         region: val?.region,
    //                                         description: kongValues?.description,
    //                                         id: val?.id,
    //                                         type: val?.type,
    //                                         error_message: val?.error_message,
    //                                     }));

    //                                 console.log(filteredKongValues?.[0], "filteredKongValues");
    //                                 setAwsValues(filteredKongValues?.[0]);
    //                                 // setErrorMessage(filteredKongValues?.[0]?.error_message);
    //                                 setErrorMessage(
    //                                     filteredKongValues?.[0]?.import_status === "INVALID_CREDENTIALS"
    //                                         ? filteredKongValues?.[0]?.import_status
    //                                         : filteredKongValues?.[0]?.error_message
    //                                 );
    //                                 setIdValue(filteredKongValues?.[0]?.id);
    //                             }
    //                             else if (gatewayValue === "APISIX") {
    //                                 const filteredApisixValues = teamWsidRes
    //                                     ?.filter((filterVal: any) => filterVal?.type === "APISIX")
    //                                     ?.map((val: any) => ({
    //                                         name: val?.name,
    //                                         admin_url: val?.admin_url,
    //                                         api_url: val?.api_url,
    //                                         authentication_key: val?.authentication_key,
    //                                         description: apacheApisixValues?.description,
    //                                         id: val?.id,
    //                                         type: val?.type,
    //                                         error_message: val?.error_message,
    //                                     }));

    //                                 console.log(filteredApisixValues?.[0], "filteredApisixValues");
    //                                 setAwsValues(filteredApisixValues?.[0]);
    //                                 // setErrorMessage(filteredApisixValues?.[0]?.error_message);
    //                                 setErrorMessage(
    //                                     filteredApisixValues?.[0]?.import_status === "INVALID_CREDENTIALS"
    //                                         ? filteredApisixValues?.[0]?.import_status
    //                                         : filteredApisixValues?.[0]?.error_message
    //                                 );
    //                                 setIdValue(filteredApisixValues?.[0]?.id);
    //                             }
    //                         })
    //                         .catch((error: any) => {
    //                             console.log("Error")
    //                         })
    //                 })
    //                 .catch((error: any) => {
    //                     console.log("Error: ", error)
    //                 })
    //         }
    //     })
    //     .catch((error: any) => {
    //         console.log("Error: ", error);
    //     })

    //for multipleGateway
    if (
      validationCheck === true &&
      gatewayLength > 0 &&
      editClicked === true &&
      importClicked === false &&
      gatewayValue !== "SOAP"
    ) {
      dispatch(UpdateAwsImport(importGatewayData))
        .unwrap()
        .then((updateRes: any) => {
          console.log("UpdateRes: ", updateRes);
          toast.success("Your Gateway has been Updated Successfully");
          setErrorMessage("");
          dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
            .unwrap()
            .then((teamWsidRes: any) => {
              setTimeout(() => {
                navigate(
                  `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`
                );
              }, 2000);
              setAllGatewayValues(teamWsidRes);
              const filterValues = teamWsidRes?.find(
                (filterId: any) => filterId?.id === idValue
              );
              setAwsValues(filterValues);
            })
            .catch((error: any) => {
              console.log("Error: ", error);
            });
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    } else if (
      validationCheck === true &&
      gatewayLength > 0 &&
      importClicked === true &&
      editClicked === false &&
      gatewayValue !== "SOAP"
    ) {
      dispatch(ImportApiGateway(importGatewayData))
        .unwrap()
        .then((importRes: any) => {
          toast?.success("Gateway imported successfully!");
          setErrorMessage("");
          dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
            .unwrap()
            .then((teamWsidRes: any) => {
              setTimeout(() => {
                navigate(
                  `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`
                );
              }, 4000);
              setAllGatewayValues(teamWsidRes);
              const filterValues = teamWsidRes?.find(
                (filterId: any) => filterId?.id === idValue
              );
              setAwsValues(filterValues);
            })
            .catch((error: any) => {
              console.log("Error: ", error);
            });
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    } else if (
      validationCheck === true &&
      gatewayLength === 0 &&
      gatewayValue !== "SOAP"
    ) {
      dispatch(ImportApiGateway(importGatewayData))
        .unwrap()
        .then((importRes: any) => {
          toast?.success("Gateway imported successfully!");
          setTimeout(() => {
            navigate(
              `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`
            );
          }, 4000);
          setErrorMessage("");
          dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
            .unwrap()
            .then((teamWsidRes: any) => {
              setAllGatewayValues(teamWsidRes);
              const filterValues = teamWsidRes?.find(
                (filterId: any) => filterId?.id === idValue
              );
              setAwsValues(filterValues);
            })
            .catch((error: any) => {
              console.log("Error: ", error);
            });
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    } else if (
      validationCheck === true &&
      // gatewayLength === 0 &&
      gatewayValue === "SOAP"
    ) {
      let createProjectData = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        workspace_id: wsidVal,
        api_project_name: awsValues?.project_name,
        description: "",
        project_type: "MANUAL",
        gateway_location: "",
      };

      setLoadingState(true);
      dispatch(CreateProjects(createProjectData))
        .unwrap()
        .then((createProjectRes: any) => {
          console.log("SOapRes: ", createProjectRes);
          //encrypt projectId

          setCookies(
            process.env.NEXT_PUBLIC_COOKIE_PROJECTID || "",
            createProjectRes?.project_id,
            userProfile?.user?.expiration_time
          );

          dispatch(GetAllStagesByProjectId(createProjectRes?.project_id))
            .unwrap()
            .then((stageRes: any) => {
              console.log("SOapRes: ", stageRes);
              setCookies(
                process.env.NEXT_PUBLIC_COOKIE_STAGEID ?? "",
                stageRes?.[0]?.apistage_id,
                userProfile?.user?.expiration_time
              );

              let collectionData = {
                // user_id: userProfile?.user.user_id,
                project_id: createProjectRes?.project_id,
                stage_id: stageRes?.[0]?.apistage_id,
                name: awsValues?.collection_name,
                type: "OWNER",
                base_url: awsValues?.base_url,
                web_service_authentication: "",
                description: "",
                status: "ACTIVE",
                service_type: "SOAP",
                wsdl_url: awsValues?.wsdl_url,
                activeVersionID: "null",
                active_vesion: "null",
              };

              dispatch(CreateCollections(collectionData))
                .unwrap()
                .then((createCollRes: any) => {
                  console.log("SOapRes: ", createCollRes);
                  setCookies(
                    process.env.NEXT_PUBLIC_COOKIE_COLLID ?? "",
                    createCollRes?.collection_id,
                    userProfile?.user?.expiration_time
                  );
                  let getOperationValues = {
                    project_id: createProjectRes?.project_id,
                    stage_id: stageRes?.[0]?.apistage_id,
                  };

                  dispatch(GetOperations(getOperationValues))
                    .unwrap()
                    .then((getOperRes: any) => {
                      console.log("SOapRes: ", getOperRes);
                    })
                    .catch((error: any) => {
                      console.log("Error: ", error);
                      dispatch(updateSessionPopup(true));
                      setTimeout(() => {});
                    });

                  toast?.success("SOAP Gateway Created Successfully!");
                  if (createCollRes) {
                    setWsdlPop(true);
                    setAnchorElWsdl(wsdlPopRef?.current);
                    dispatch(GetWsdlOperByCollId(createCollRes?.collection_id))
                      .unwrap()
                      .then((wsdlRes: any) => {
                        console.log(wsdlRes, "wsdlRes");
                        setSoapOperations(wsdlRes);
                        setLoadingState(false);
                      })
                      .catch((error: any) => {
                        console.log("Error: ", error);
                      });
                  }
                })
                .catch((error: any) => {
                  console.log("Errror: ", error);
                });
            })
            .catch((error: any) => {
              console.log("Error: ", error);
            });
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    }
  };

  const handleEditSoapValues = () => {
    let updatedData = {
      // user_id: userProfile?.user.user_id,
      collection_id: collectionIdVal,
      name: awsValues?.collection_name,
      description: "",
      stage_id: stageIdVal,
    };
    dispatch(UpdateCollectionsById(updatedData))
      .unwrap()
      .then((updateRes: any) => {
        console.log(updateRes, "updateRes");
        toast?.success("Collection Name updated successfully");
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  };

  const handleEditGateway = (idValue: any) => {
    const filterResponse = allGatewayValues?.find(
      (val: any) => val?.id === idValue
    ); // 2000 milliseconds = 2 seconds

    setGatewayValue(filterResponse?.type);
    setUpdateValue(filterResponse);
    setIdValue(filterResponse?.id);
    setAwsValues({
      name: filterResponse?.name,
      secretKey: filterResponse?.secretKey,
      accessKey: filterResponse?.accessKey,
      region: filterResponse?.region,
      description: filterResponse?.description,
      admin_url: filterResponse?.admin_url,
      api_url: filterResponse?.api_url,
      authentication_key: filterResponse?.authentication_key,
      subscription_id: filterResponse?.subscription_id,
      tenant_id: filterResponse?.tenant_id,
      project_name: "",
      collection_name: "",
      base_url: "",
      wsdl_url: "",
      gcpName: "",
    });
  };

  useEffect(() => {
    if (collectionIdVal !== undefined) {
      setSoapEdit(true);
    } else {
      setSoapEdit(false);
    }
  }, [collectionIdVal]);

  //for single gateway
  // useEffect(() => {
  //     dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
  //         .unwrap()
  //         .then((teamWsidRes: any) => {
  //             console.log("teamWsidRes: ", teamWsidRes)
  //             if (teamWsidRes?.length > 0) {
  //                 if (gatewayValue === "AWS") {
  //                     const filteredAwsValues = teamWsidRes
  //                         ?.filter((filterVal: any) => filterVal?.type === "AWS")
  //                         ?.map((val: any) => ({
  //                             name: val?.name,
  //                             secretKey: val?.secretKey,
  //                             accessKey: val?.accessKey,
  //                             region: val?.region,
  //                             description: val?.description,
  //                             id: val?.id,
  //                             type: val?.type,
  //                             error_message: val?.error_message,
  //                             import_status: val?.import_status,
  //                         }));

  //                     console.log(filteredAwsValues?.[0], filteredAwsValues?.[0]?.import_status, "filteredAwsValues");
  //                     console.log(filteredAwsValues?.[0]?.error_message, "MEssage")
  //                     setAwsValues(filteredAwsValues?.[0]);
  //                     // setErrorMessage(filteredAwsValues?.[0]?.error_message);
  //                     setErrorMessage(
  //                         filteredAwsValues?.[0]?.import_status === "INVALID_CREDENTIALS"
  //                             ? filteredAwsValues?.[0]?.import_status
  //                             : filteredAwsValues?.[0]?.error_message
  //                     );
  //                     setIdValue(filteredAwsValues?.[0]?.id);
  //                 }
  //                 else if (gatewayValue === "KONG") {
  //                     const filteredKongValues = teamWsidRes
  //                         ?.filter((filterVal: any) => filterVal?.type === "KONG")
  //                         ?.map((val: any) => ({
  //                             name: val?.name,
  //                             admin_url: val?.admin_url,
  //                             api_url: val?.api_url,
  //                             authentication_key: val?.authentication_key,
  //                             region: val?.region,
  //                             description: val?.description,
  //                             id: val?.id,
  //                             type: val?.type,
  //                             error_message: val?.error_message,
  //                         }));

  //                     console.log(filteredKongValues?.[0], "filteredKongValues");
  //                     setKongValues(filteredKongValues?.[0]);
  //                     // setErrorMessage(filteredKongValues?.[0]?.error_message);
  //                     setErrorMessage(
  //                         filteredKongValues?.[0]?.import_status === "INVALID_CREDENTIALS"
  //                             ? filteredKongValues?.[0]?.import_status
  //                             : filteredKongValues?.[0]?.error_message
  //                     );

  //                     setIdValue(filteredKongValues?.[0]?.id);
  //                 }
  //                 else if (gatewayValue === "APISIX") {
  //                     const filteredApisixValues = teamWsidRes
  //                         ?.filter((filterVal: any) => filterVal?.type === "APISIX")
  //                         ?.map((val: any) => ({
  //                             name: val?.name,
  //                             admin_url: val?.admin_url,
  //                             api_url: val?.api_url,
  //                             authentication_key: val?.authentication_key,
  //                             description: val?.description,
  //                             id: val?.id,
  //                             type: val?.type,
  //                             error_message: val?.error_message,
  //                         }));

  //                     console.log(filteredApisixValues?.[0], "filteredApisixValues");
  //                     setApacheApisixValues(filteredApisixValues?.[0]);
  //                     // setErrorMessage(filteredApisixValues?.[0]?.error_message);
  //                     setErrorMessage(
  //                         filteredApisixValues?.[0]?.import_status === "INVALID_CREDENTIALS"
  //                             ? filteredApisixValues?.[0]?.import_status
  //                             : filteredApisixValues?.[0]?.error_message
  //                     );
  //                     setIdValue(filteredApisixValues?.[0]?.id);
  //                 }
  //             }
  //         })
  //         .catch((error: any) => {
  //             console.log("Error: ", error)
  //         })
  // }, [gatewayValue]);

  //for multiple gateway
  useEffect(() => {
    dispatch(GetAllAwsImportDataByTeamWsId(teamWsidVal))
      .unwrap()
      .then((teamWsidRes: any) => {
        setGatewayLength(teamWsidRes?.length);
        setAllGatewayValues(teamWsidRes);
        const filterSuccessGateway = teamWsidRes?.filter(
          (filterVal: any) => filterVal?.import_status === "SUCCESS"
        );
        if (filterSuccessGateway?.length > 0) {
          setSuccessGateway(true);
        } else {
          setSuccessGateway(false);
        }
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  }, [startUsingClicked]);

  return (
    <div>
      {loading && <GlobalLoader />}
      {loadingState && <GlobalLoader />}

      <div>
        {startUsingClicked === true ? (
          <>
            <>
              {gatewayLength > 0 && listView === true ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <CustomGrid>
                        <Box sx={{ padding: "50px" }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ApiFlowLogo className="mx-2" />
                            <HeadingTypography
                              sx={{ fontWeight: 900, fontSize: "20px" }}
                            >
                              Api Flow
                            </HeadingTypography>
                          </Box>
                          <HeadingTypography variant="h4" sx={{ mt: 4 }}>
                            Hello!
                          </HeadingTypography>
                          <HeadingTypography variant="h5" sx={{ mt: 2 }}>
                            {`Welcome to Apiflow, ${
                              userProfile?.user?.first_name === "null"
                                ? "User"
                                : userProfile?.user?.first_name
                            }!`}
                          </HeadingTypography>
                          <PrimaryTypography sx={{ mt: 3 }}>
                            ApiFlow provides complete management & visibility of
                            your APIs with their vulnerabilities and the
                            ever-evolving attack surface.
                          </PrimaryTypography>
                          <div
                            style={{
                              marginTop: "30px",
                            }}
                          >
                            <Box
                              sx={{
                                padding: "15px",
                                margin: "10px 0px",
                                border: `1px solid ${theme.palette.primaryPurple.main}`,
                                background: `linear-gradient(to bottom right, #f2e6ff, #ecf2f9)`,
                                borderRadius: "5px",
                              }}
                            >
                              <TextTypography>
                                <SecondaryTypography
                                  style={{
                                    fontSize: "12px",
                                    color: `${theme.palette.primaryPurple.main}`,
                                  }}
                                >
                                  <span>
                                    <CheckCircleIcon
                                      style={{
                                        color: `${theme.palette.primaryPurple.main}`,
                                        fontSize: "16px",
                                      }}
                                    />
                                  </span>
                                  Your account is verified successfully!
                                </SecondaryTypography>
                              </TextTypography>
                            </Box>
                          </div>
                        </Box>
                      </CustomGrid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <div style={{ padding: "50px" }}>
                        <div>
                          <HeadingTypography>
                            {`Listing of Imported Gateways`}
                          </HeadingTypography>
                        </div>
                        <div>
                          <div
                            style={{
                              height: "375px",
                              overflowY: "auto",
                              margin: "20px",
                            }}
                          >
                            {allGatewayValues?.map(
                              (val: any, index: number) => (
                                <>
                                  <div key={val?.id}>
                                    <div
                                      key={index}
                                      style={{
                                        // display: 'flex',
                                        // alignItems: 'center',
                                        marginRight: "5px",
                                        marginBottom: "35px",
                                        border: `1px solid #eee`,
                                        borderRadius: "5px",
                                        padding: "10px",
                                        width: "550px",
                                        // height: '100px',
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            margin: "10px",
                                            width: "50px",
                                            height: "50px",
                                          }}
                                        >
                                          {val?.type === "AWS" ? (
                                            <AwsIcon
                                              width={"100%"}
                                              height={"100%"}
                                            />
                                          ) : val?.type === "KONG" ? (
                                            <Image
                                              src={Kong}
                                              alt=""
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                              }}
                                              // width={"100%}
                                              // height={"100%"}
                                            />
                                          ) : val?.type === "APISIX" ? (
                                            <ApacheApiSix
                                              width={"100%"}
                                              height={"100%"}
                                            />
                                          ) : val?.type === "AZURE" ? (
                                            <Image
                                              src={AzureImage}
                                              alt=""
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                              }}
                                              // width={"100%"}
                                              // height={"100%"}
                                            />
                                          ) : val?.type === "GCP" ? (
                                            <Image
                                              src={GCPImage}
                                              alt=""
                                              // width={"80px"}
                                              // height={"50px"}
                                              style={{
                                                marginLeft: "-8px",
                                              }}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <div style={{ margin: "10px" }}>
                                          <div>
                                            <div>
                                              <SecondaryTypography
                                                style={{
                                                  fontSize: "11px",
                                                }}
                                              >
                                                <span
                                                  style={{ fontWeight: 900 }}
                                                >
                                                  Name:
                                                </span>
                                                {` ${val?.name}`}
                                              </SecondaryTypography>
                                            </div>
                                            <div>
                                              <SecondaryTypography
                                                style={{
                                                  fontSize: "11px",
                                                }}
                                              >
                                                <span
                                                  style={{ fontWeight: 900 }}
                                                >
                                                  {val?.type === "AWS"
                                                    ? "Access Key: "
                                                    : val?.type === "KONG" ||
                                                      val?.type === "APISIX"
                                                    ? "Api URL: "
                                                    : val?.type === "AZURE"
                                                    ? "Client ID: "
                                                    : ""}
                                                </span>
                                                {val?.type === "AWS"
                                                  ? ` ${val?.accessKey}`
                                                  : val?.type === "KONG" ||
                                                    val?.type === "APISIX"
                                                  ? ` ${val?.api_url}`
                                                  : val?.type === "AZURE"
                                                  ? ` ${val?.accessKey}`
                                                  : ""}
                                              </SecondaryTypography>
                                            </div>
                                            <div>
                                              <SecondaryTypography
                                                style={{
                                                  fontSize: "11px",
                                                }}
                                              >
                                                <span
                                                  style={{ fontWeight: 900 }}
                                                >
                                                  {val?.type === "AWS"
                                                    ? "Secret Key: "
                                                    : val?.type === "KONG" ||
                                                      val?.type === "APISIX"
                                                    ? "Admin URL: "
                                                    : val?.type === "AZURE"
                                                    ? "Client Secret: "
                                                    : ""}
                                                </span>
                                                {val?.type === "AWS"
                                                  ? ` ${val?.secretKey}`
                                                  : val?.type === "KONG" ||
                                                    val?.type === "APISIX"
                                                  ? ` ${val?.admin_url}`
                                                  : val?.type === "AZURE"
                                                  ? ` ${val?.secretKey}`
                                                  : ""}
                                              </SecondaryTypography>
                                            </div>
                                            <div>
                                              <SecondaryTypography
                                                style={{
                                                  fontSize: "11px",
                                                }}
                                              >
                                                <span
                                                  style={{ fontWeight: 900 }}
                                                >
                                                  {val?.type === "AWS"
                                                    ? "Region: "
                                                    : val?.type === "KONG" ||
                                                      val?.type === "APISIX"
                                                    ? "Authentication Key: "
                                                    : val?.type === "AZURE"
                                                    ? "Tenant ID: "
                                                    : ""}
                                                </span>
                                                {val?.type === "AWS"
                                                  ? ` ${val?.region}`
                                                  : val?.type === "KONG" ||
                                                    val?.type === "APISIX"
                                                  ? ` ${val?.authentication_key}`
                                                  : val?.type === "AZURE"
                                                  ? ` ${val?.tenant_id}`
                                                  : ""}
                                              </SecondaryTypography>
                                            </div>
                                            {val?.type === "AZURE" && (
                                              <div>
                                                <SecondaryTypography
                                                  style={{
                                                    fontSize: "11px",
                                                  }}
                                                >
                                                  <span
                                                    style={{ fontWeight: 900 }}
                                                  >
                                                    Subscription ID:
                                                  </span>
                                                  {` ${val?.subscription_id}`}
                                                </SecondaryTypography>
                                              </div>
                                            )}
                                            {val?.type !== "AZURE" && (
                                              <>
                                                <div>
                                                  <SecondaryTypography
                                                    style={{
                                                      fontSize: "11px",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontWeight: 900,
                                                      }}
                                                    >
                                                      Interval:
                                                    </span>
                                                    {` ${val?.interval}`}
                                                  </SecondaryTypography>
                                                </div>
                                                <div>
                                                  <SecondaryTypography
                                                    style={{
                                                      fontSize: "11px",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontWeight: 900,
                                                      }}
                                                    >
                                                      Status:
                                                    </span>
                                                    <span
                                                      style={{
                                                        color:
                                                          val?.import_status ===
                                                          "INVALID_CREDENTIALS"
                                                            ? `${theme.palette.mainRed.main}`
                                                            : `${theme.palette.mainGreen.main}`,
                                                      }}
                                                    >
                                                      {` ${val?.import_status}`}
                                                    </span>
                                                  </SecondaryTypography>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        {val?.import_status ===
                                        "INVALID_CREDENTIALS" ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <Button
                                              variant="contained"
                                              size="small"
                                              style={{
                                                background:
                                                  val?.import_status ===
                                                  "INVALID_CREDENTIALS"
                                                    ? // ? `linear-gradient(to bottom right, #5900b3, #3366cc)`
                                                      `linear-gradient(to bottom right, #6A11CB, #2575FC)`
                                                    : // ? `linear-gradient(to bottom right, #6441A5,#2a0845)`
                                                      "",
                                                textTransform: "none",
                                              }}
                                              onClick={() => {
                                                handleEditGateway(val?.id);
                                                setListView(false);
                                                setEditClicked(true);
                                                setImportClicked(false);
                                              }}
                                            >
                                              {val?.import_status ===
                                                "INVALID_CREDENTIALS" && (
                                                <SecondaryTypography
                                                  style={{
                                                    color: `${theme.palette.mainWhite.main}`,
                                                    // fontWeight: 600,
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  {"Edit"}
                                                  <EditIcon
                                                    style={{
                                                      fontSize: "15px",
                                                      marginLeft: "5px",
                                                    }}
                                                  />
                                                </SecondaryTypography>
                                              )}
                                            </Button>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                textTransform: "none",
                                // background: `linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)`
                                // background: `linear-gradient(to bottom right, #5900b3, #3366cc)`
                                // background: `linear-gradient(to left, #606c88, #3f4c6b)`
                                background: `${theme.palette.btnCancelGrey.main}`,
                                color: `${theme.palette.primaryBlack.main}`,
                              }}
                              onClick={() => {
                                if (
                                  importClicked === true &&
                                  gatewayLength > 0
                                ) {
                                  setListView(true);
                                  setImportClicked(false);
                                  setEditClicked(false);
                                } else {
                                  setGatewayValue("");
                                  setStartUsingClicked(false);
                                }
                              }}
                            >
                              <span>
                                <KeyboardBackspaceIcon
                                  style={{
                                    fontSize: "18px",
                                    marginRight: "5px",
                                  }}
                                />
                              </span>
                              Back
                            </Button>
                          </div>
                          <div>
                            <Button
                              variant="contained"
                              size="small"
                              style={{
                                // background: `linear-gradient(to bottom right, #6A11CB, #2575FC)`,
                                // background: `linear-gradient(to bottom right, #8E2DE2, #4A00E0)`,
                                background: `${theme.palette.primaryPurple.main}`,
                                textTransform: "none",
                                margin: "10px",
                              }}
                              onClick={() => {
                                handleCancelGatewayValues();
                                setListView(false);
                                setImportClicked(true);
                                setEditClicked(false);
                              }}
                            >
                              <SecondaryTypography
                                style={{
                                  color: `${theme.palette.mainWhite.main}`,
                                  // fontWeight: 600,
                                  fontSize: "12px",
                                }}
                              >
                                <Add
                                  style={{
                                    fontSize: "15px",
                                    marginRight: "5px",
                                  }}
                                />
                                {"Import Gateway"}
                              </SecondaryTypography>
                            </Button>
                            {successGateway === true && (
                              <Button
                                variant="contained"
                                size="small"
                                style={{
                                  // background: `linear-gradient(to bottom right, #6A11CB, #2575FC)`,
                                  // background: `linear-gradient(to left, #8E2DE2, #4A00E0)`,
                                  background: `${theme.palette.primaryPurple.main}`,
                                  margin: "10px",
                                  textTransform: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <SecondaryTypography
                                  style={{
                                    color: `${theme.palette.mainWhite.main}`,
                                    // fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    navigate(
                                      `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`
                                    );
                                  }}
                                >
                                  {"Go to Dashboard"}
                                  <ArrowForwardIcon
                                    style={{
                                      fontSize: "15px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </SecondaryTypography>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <CustomGrid>
                      <Box sx={{ padding: "50px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ApiFlowLogo className="mx-2" />
                          <HeadingTypography
                            sx={{ fontWeight: 900, fontSize: "20px" }}
                          >
                            Api Flow
                          </HeadingTypography>
                        </Box>
                        <HeadingTypography variant="h4" sx={{ mt: 4 }}>
                          Hello!
                        </HeadingTypography>
                        <HeadingTypography variant="h5" sx={{ mt: 2 }}>
                          {`Welcome to Apiflow, ${
                            userProfile?.user?.first_name === "null"
                              ? "User"
                              : userProfile?.user?.first_name
                          }!`}
                        </HeadingTypography>
                        <PrimaryTypography sx={{ mt: 3 }}>
                          ApiFlow provides complete management & visibility of
                          your APIs with their vulnerabilities and the
                          ever-evolving attack surface.
                        </PrimaryTypography>
                        <div
                          style={{
                            marginTop: "30px",
                          }}
                        >
                          <Box
                            sx={{
                              padding: "15px",
                              margin: "10px 0px",
                              border: `1px solid ${theme.palette.primaryPurple.main}`,
                              background: `linear-gradient(to bottom right, #f2e6ff, #ecf2f9)`,
                              borderRadius: "5px",
                            }}
                          >
                            <TextTypography>
                              <SecondaryTypography
                                style={{
                                  fontSize: "12px",
                                  color: `${theme.palette.primaryPurple.main}`,
                                }}
                              >
                                <span>
                                  <CheckCircleIcon
                                    style={{
                                      color: `${theme.palette.primaryPurple.main}`,
                                      fontSize: "16px",
                                    }}
                                  />
                                </span>
                                Your account is verified successfully!
                              </SecondaryTypography>
                            </TextTypography>
                          </Box>
                        </div>
                      </Box>
                    </CustomGrid>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div>
                      {gatewayValue?.trim() !== "" ? (
                        <div style={{ padding: "50px" }}>
                          <div>
                            <HeadingTypography>
                              {`Api Gateway - ${gatewayValue}`}
                            </HeadingTypography>
                          </div>
                          <div>
                            {errorMessage?.trim() !== "" &&
                              errorMessage !== null &&
                              errorMessage !== undefined && (
                                <div>
                                  <Box
                                    sx={{
                                      display: "inline-block",
                                      minWidth: "500px",
                                      maxWidth: "min-content",
                                      padding: "10px",
                                      margin: "10px 0px 0px 20px",
                                      border: " 1px solid #F87171",
                                      background: "#FEF2F2",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <PrimaryTypography
                                      style={{
                                        color: `${theme.palette.mainRed.main}`,
                                      }}
                                    >
                                      <span>
                                        <CancelIcon
                                          style={{
                                            color: `${theme.palette.mainRed.main}`,
                                            marginRight: "5px",
                                          }}
                                        />
                                      </span>
                                      {errorMessage}
                                    </PrimaryTypography>
                                  </Box>
                                </div>
                              )}
                          </div>
                          {gatewayValue === "AWS" ? (
                            <>
                              <div>
                                <Box>
                                  <div
                                    style={{
                                      height: "360px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Name
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.name}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "name",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField1}
                                          errorHandler={(error: any) =>
                                            setErrorField1(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Secret Key
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.secretKey}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "secretKey",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField2}
                                          errorHandler={(error: any) =>
                                            setErrorField2(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Access Key
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.accessKey}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          // height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "accessKey",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField3}
                                          errorHandler={(error: any) =>
                                            setErrorField3(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Region
                                        </PrimaryTypography>
                                        {/* <ApiTextField
                                          value={awsValues?.region}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues("region", e.target.value);
                                          }}
                                          onKeyUp={(event: any) => {
                                            console.log("EnterValue: ", event);
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField4}
                                          errorHandler={(error: any) => setErrorField4(error)}
                                        /> */}
                                        <div
                                          style={{
                                            marginTop: "10px",
                                          }}
                                        >
                                          <GSelect
                                            fullWidth={false}
                                            width="300px"
                                            height="22px"
                                            border={`1px solid ${theme.palette.primaryBorder.main}`}
                                            size={"small"}
                                            borderColor="#9CA3AF"
                                            radius="4px"
                                            helperText={errorField4}
                                            error={errorField4}
                                            options={awsRegions?.map(
                                              (data: any) => ({
                                                label: data?.region,
                                                value: data?.region,
                                              })
                                            )}
                                            value={awsValues?.region}
                                            onChange={(value: any) => {
                                              handleAwsValues("region", value);
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Interval
                                        </PrimaryTypography>
                                        <div
                                          style={{
                                            marginTop: "10px",
                                          }}
                                        >
                                          <GSelect
                                            fullWidth={false}
                                            width="300px"
                                            height="22px"
                                            border={`1px solid ${theme.palette.primaryBorder.main}`}
                                            size={"small"}
                                            borderColor="#9CA3AF"
                                            radius="4px"
                                            // helperText={errorField5}
                                            // error={errorField5}
                                            options={timedata?.map(
                                              (data: any) => ({
                                                label: data?.name,
                                                value: data?.id,
                                              })
                                            )}
                                            value={selectedRoleId}
                                            onChange={handleRoleChange}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Description
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.description}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "description",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField5}
                                          errorHandler={(error: any) =>
                                            setErrorField5(error)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div>
                                      <GButton
                                        buttonType="secondary"
                                        padding="5px"
                                        label={`Cancel`}
                                        color={`${theme.palette.primaryBlack.main}`}
                                        // background="transparent"
                                        onClickHandler={
                                          handleCancelGatewayValues
                                        }
                                      />
                                    </div>
                                    <div>
                                      <div style={{ marginLeft: "20px" }}>
                                        <GButton
                                          buttonType="primary"
                                          padding="5px"
                                          // label={`Import ${gatewayValue}`}
                                          label={
                                            editClicked === true
                                              ? `Update ${gatewayValue}`
                                              : `Import ${gatewayValue}`
                                          }
                                          onClickHandler={handleGatewayValues}
                                          dataTest="save-project-btn"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              </div>
                            </>
                          ) : gatewayValue === "KONG" ||
                            gatewayValue === "APISIX" ? (
                            <>
                              <div>
                                <Box sx={{}}>
                                  <div
                                    style={{
                                      height: "360px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Name
                                        </PrimaryTypography>
                                        <ApiTextField
                                          // value={gatewayValue === "KONG" ? kongValues?.name : apacheApisixValues?.name}
                                          value={awsValues?.name}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            // if (gatewayValue === "KONG") {
                                            //     handleKongValues("name", e.target.value);
                                            // } else {
                                            //     handleApacheApisixValues("name", e.target.value)
                                            // }
                                            handleAwsValues(
                                              "name",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField1}
                                          errorHandler={(error: any) =>
                                            setErrorField1(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Admin Url
                                        </PrimaryTypography>
                                        <ApiTextField
                                          // value={gatewayValue === "KONG" ? kongValues?.admin_url : apacheApisixValues?.admin_url}
                                          value={awsValues?.admin_url}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            // if (gatewayValue === "KONG") {
                                            //     handleKongValues("admin_url", e.target.value);
                                            // } else {
                                            //     handleApacheApisixValues("admin_url", e.target.value)
                                            // }
                                            handleAwsValues(
                                              "admin_url",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField2}
                                          errorHandler={(error: any) =>
                                            setErrorField2(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Api Url
                                        </PrimaryTypography>
                                        <ApiTextField
                                          // value={gatewayValue === "KONG" ? kongValues?.api_url : apacheApisixValues?.api_url}
                                          value={awsValues?.api_url}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            // if (gatewayValue === "KONG") {
                                            //     handleKongValues("api_url", e.target.value);
                                            // } else {
                                            //     handleApacheApisixValues("api_url", e.target.value)
                                            // }
                                            handleAwsValues(
                                              "api_url",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField3}
                                          errorHandler={(error: any) =>
                                            setErrorField3(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Auth Key
                                        </PrimaryTypography>
                                        <ApiTextField
                                          // value={gatewayValue === "KONG" ? kongValues?.authentication_key : apacheApisixValues?.authentication_key}
                                          value={awsValues?.authentication_key}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            // if (gatewayValue === "KONG") {
                                            //     handleKongValues("authentication_key", e.target.value);
                                            // } else {
                                            //     handleApacheApisixValues("authentication_key", e.target.value)
                                            // }
                                            handleAwsValues(
                                              "authentication_key",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField4}
                                          errorHandler={(error: any) =>
                                            setErrorField4(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Interval
                                        </PrimaryTypography>
                                        <div
                                          style={{
                                            marginTop: "10px",
                                          }}
                                        >
                                          <GSelect
                                            fullWidth={false}
                                            width="300px"
                                            height="22px"
                                            border={`1px solid ${theme.palette.primaryBorder.main}`}
                                            size={"small"}
                                            borderColor="#9CA3AF"
                                            radius="4px"
                                            // helperText={errorField5}
                                            // error={errorField5}
                                            options={timedata?.map(
                                              (data: any) => ({
                                                label: data?.name,
                                                value: data.id,
                                              })
                                            )}
                                            value={selectedRoleId}
                                            onChange={kongHandleRoleChange}
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Description
                                        </PrimaryTypography>
                                        <ApiTextField
                                          // value={gatewayValue === "KONG" ? kongValues?.description : apacheApisixValues?.description}
                                          value={awsValues?.description}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            // if (gatewayValue === "KONG") {
                                            //     handleKongValues("description", e.target.value);
                                            // } else {
                                            //     handleApacheApisixValues("description", e.target.value)
                                            // }
                                            handleAwsValues(
                                              "description",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField5}
                                          errorHandler={(error: any) =>
                                            setErrorField5(error)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div>
                                      <GButton
                                        buttonType="secondary"
                                        padding="5px"
                                        label={`Cancel`}
                                        color={`${theme.palette.primaryBlack.main}`}
                                        // background="transparent"
                                        onClickHandler={
                                          handleCancelGatewayValues
                                        }
                                      />
                                    </div>
                                    <div>
                                      <div style={{ marginLeft: "20px" }}>
                                        <GButton
                                          buttonType="primary"
                                          padding="5px"
                                          // label={`Import ${gatewayValue}`}
                                          label={
                                            editClicked === true
                                              ? `Update ${gatewayValue}`
                                              : `Import ${gatewayValue}`
                                          }
                                          onClickHandler={handleGatewayValues}
                                          dataTest="save-project-btn"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              </div>
                            </>
                          ) : gatewayValue === "AZURE" ? (
                            <>
                              <div>
                                <Box>
                                  <div
                                    style={{
                                      height: "360px",
                                      overflowY: "auto",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Name
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.name}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "name",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField1}
                                          errorHandler={(error: any) =>
                                            setErrorField1(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Client Secret
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.secretKey}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "secretKey",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField2}
                                          errorHandler={(error: any) =>
                                            setErrorField2(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Client ID
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.accessKey}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          // height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "accessKey",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField3}
                                          errorHandler={(error: any) =>
                                            setErrorField3(error)
                                          }
                                        />
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Tenant ID
                                        </PrimaryTypography>
                                        <div
                                          style={{
                                            marginTop: "10px",
                                          }}
                                        >
                                          <ApiTextField
                                            value={awsValues?.tenant_id}
                                            width="300px"
                                            dataTest={"project-name-input"}
                                            // height="42px"
                                            borderColor="#9CA3AF"
                                            borderRadius="4px"
                                            onChange={(e: any) => {
                                              handleAwsValues(
                                                "tenant_id",
                                                e.target.value
                                              );
                                            }}
                                            onKeyUp={(event: any) => {
                                              if (event?.key === "Enter") {
                                                handleGatewayValuesValidation();
                                              }
                                            }}
                                            error={errorField4}
                                            errorHandler={(error: any) =>
                                              setErrorField4(error)
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Subscription ID
                                        </PrimaryTypography>
                                        <div
                                          style={{
                                            marginTop: "10px",
                                          }}
                                        >
                                          <ApiTextField
                                            value={awsValues?.subscription_id}
                                            width="300px"
                                            dataTest={"project-name-input"}
                                            // height="42px"
                                            borderColor="#9CA3AF"
                                            borderRadius="4px"
                                            onChange={(e: any) => {
                                              handleAwsValues(
                                                "subscription_id",
                                                e.target.value
                                              );
                                            }}
                                            onKeyUp={(event: any) => {
                                              if (event?.key === "Enter") {
                                                handleGatewayValuesValidation();
                                              }
                                            }}
                                            error={errorField5}
                                            errorHandler={(error: any) =>
                                              setErrorField5(error)
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          margin: "20px",
                                        }}
                                      >
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Description
                                        </PrimaryTypography>
                                        <ApiTextField
                                          value={awsValues?.description}
                                          width="300px"
                                          dataTest={"project-name-input"}
                                          height="42px"
                                          borderColor="#9CA3AF"
                                          borderRadius="4px"
                                          onChange={(e: any) => {
                                            handleAwsValues(
                                              "description",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleGatewayValuesValidation();
                                            }
                                          }}
                                          error={errorField6}
                                          errorHandler={(error: any) =>
                                            setErrorField6(error)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div>
                                      <GButton
                                        buttonType="secondary"
                                        padding="5px"
                                        label={`Cancel`}
                                        color={`${theme.palette.primaryBlack.main}`}
                                        // background="transparent"
                                        onClickHandler={
                                          handleCancelGatewayValues
                                        }
                                      />
                                    </div>
                                    <div>
                                      <div style={{ marginLeft: "20px" }}>
                                        <GButton
                                          buttonType="primary"
                                          padding="5px"
                                          // label={`Import ${gatewayValue}`}
                                          label={
                                            editClicked === true
                                              ? `Update ${gatewayValue}`
                                              : `Import ${gatewayValue}`
                                          }
                                          onClickHandler={handleGatewayValues}
                                          dataTest="save-project-btn"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              </div>
                            </>
                          ) : gatewayValue === "GCP" ? (
                            <>
                              <div>
                                <Box>
                                  <div
                                    style={{
                                      height: "400px",
                                      overflowY: "auto",
                                      margin: "20px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Name
                                      </PrimaryTypography>
                                      <ApiTextField
                                        value={awsValues?.gcpName}
                                        width="350px"
                                        dataTest={"project-name-input"}
                                        height="42px"
                                        borderColor="#9CA3AF"
                                        borderRadius="4px"
                                        onChange={(e: any) => {
                                          handleAwsValues(
                                            "gcpName",
                                            e.target.value
                                          );
                                        }}
                                        onKeyUp={(event: any) => {
                                          if (event?.key === "Enter") {
                                            handleGatewayValuesValidation();
                                          }
                                        }}
                                        error={errorField1}
                                        errorHandler={(error: any) =>
                                          setErrorField1(error)
                                        }
                                      />
                                    </div>
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Interval
                                      </PrimaryTypography>
                                      <GSelect
                                        fullWidth={false}
                                        width="350px"
                                        height="22px"
                                        border={`1px solid ${theme.palette.primaryBorder.main}`}
                                        size={"small"}
                                        borderColor="#9CA3AF"
                                        radius="4px"
                                        // helperText={errorField5}
                                        // error={errorField5}
                                        options={timedata?.map((data: any) => ({
                                          label: data?.name,
                                          value: data?.id,
                                        }))}
                                        value={selectedRoleId}
                                        onChange={gcpHandleRoleChange}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Secret Key
                                      </PrimaryTypography>
                                      {/* <div>
                                        <input
                                          type="file"
                                          id={`file-upload-input`}
                                          accept=".json"
                                          style={{ display: "none" }}
                                          onChange={(e: any)=>{
                                          const file = e.target.files?.[0];
                                          setGcpDataFile(file)
                                          }}
                                        />
                                        <label htmlFor="file-upload-input">
                                          {
                                            gcpDataFile ? (
                                              <SecondaryTypography
                                                style={{
                                                  fontSize: "14px",
                                                }}
                                              >
                                                {`File selected: ${gcpDataFile?.name}`}
                                              </SecondaryTypography>
                                            )
                                              : (
                                                <Button
                                                  component="span"
                                                  variant="outlined"
                                                  style={{
                                                    textTransform: "none",
                                                    width: "150px",
                                                    color: `${theme.palette.secondaryColor.main}`,
                                                    backgroundColor: "transparent",
                                                    border: `1.5px solid ${theme.palette.secondaryColor.main}`,
                                                  }}
                                                  onClick={handleButtonClick}
                                                >
                                                  Select File
                                                </Button>
                                              )
                                          }
                                        </label>
                                      </div> */}
                                      <div>
                                        <Button
                                          component="span"
                                          variant="outlined"
                                          style={{
                                            textTransform: "none",
                                            marginTop: "0.8rem",
                                            width: "350px",
                                            color: `${theme.palette.secondaryColor.main}`,
                                            backgroundColor: "transparent",
                                            border: `1.5px solid ${theme.palette.secondaryColor.main}`,
                                          }}
                                          onClick={handleButtonClick}
                                        >
                                          Select File
                                        </Button>
                                        <input
                                          type="file"
                                          accept=".json"
                                          id="fileInput"
                                          style={{ display: "none" }}
                                          onChange={handleFileChange}
                                        />
                                        {gcpDataFile && (
                                          <p>
                                            Selected file: {gcpDataFile?.name}
                                          </p>
                                        )}
                                        {validationMessage && (
                                          <p>{validationMessage}</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div>
                                      <GButton
                                        buttonType="secondary"
                                        padding="5px"
                                        label={`Cancel`}
                                        color={`${theme.palette.primaryBlack.main}`}
                                        // background="transparent"
                                        onClickHandler={
                                          handleCancelGatewayValues
                                        }
                                      />
                                    </div>
                                    <div>
                                      <div style={{ marginLeft: "20px" }}>
                                        <GButton
                                          buttonType="primary"
                                          padding="5px"
                                          // label={`Import ${gatewayValue}`}
                                          label={
                                            editClicked === true
                                              ? `Update ${gatewayValue}`
                                              : `Import ${gatewayValue}`
                                          }
                                          onClickHandler={handleGatewayValues}
                                          dataTest="save-project-btn"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              </div>
                            </>
                          ) : gatewayValue === "SOAP" ? (
                            <>
                              <div>
                                <Box>
                                  <div
                                    style={{
                                      height: "400px",
                                      overflowY: "auto",
                                      margin: "20px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Project Name
                                      </PrimaryTypography>
                                      <ApiTextField
                                        value={awsValues?.project_name}
                                        width="350px"
                                        dataTest={"project-name-input"}
                                        height="42px"
                                        borderColor="#9CA3AF"
                                        borderRadius="4px"
                                        disabledVal={
                                          soapEdit === true ? true : false
                                        }
                                        onChange={(e: any) => {
                                          handleAwsValues(
                                            "project_name",
                                            e.target.value
                                          );
                                        }}
                                        onKeyUp={(event: any) => {
                                          if (event?.key === "Enter") {
                                            handleGatewayValuesValidation();
                                          }
                                        }}
                                        error={errorField1}
                                        errorHandler={(error: any) =>
                                          setErrorField1(error)
                                        }
                                      />
                                    </div>
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Collection Name
                                      </PrimaryTypography>
                                      <ApiTextField
                                        value={awsValues?.collection_name}
                                        width="350px"
                                        dataTest={"project-name-input"}
                                        height="42px"
                                        borderColor="#9CA3AF"
                                        borderRadius="4px"
                                        onChange={(e: any) => {
                                          handleAwsValues(
                                            "collection_name",
                                            e.target.value
                                          );
                                        }}
                                        onKeyUp={(event: any) => {
                                          if (event?.key === "Enter") {
                                            handleGatewayValuesValidation();
                                          }
                                        }}
                                        error={errorField2}
                                        errorHandler={(error: any) =>
                                          setErrorField2(error)
                                        }
                                      />
                                    </div>
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Base Url
                                      </PrimaryTypography>
                                      <ApiTextField
                                        value={awsValues?.base_url}
                                        width="350px"
                                        dataTest={"project-name-input"}
                                        // height="42px"
                                        borderColor="#9CA3AF"
                                        borderRadius="4px"
                                        disabledVal={
                                          soapEdit === true ? true : false
                                        }
                                        onChange={(e: any) => {
                                          handleAwsValues(
                                            "base_url",
                                            e.target.value
                                          );
                                        }}
                                        onKeyUp={(event: any) => {
                                          if (event?.key === "Enter") {
                                            handleGatewayValuesValidation();
                                          }
                                        }}
                                        error={errorField3}
                                        errorHandler={(error: any) =>
                                          setErrorField3(error)
                                        }
                                      />
                                    </div>
                                    <div
                                      style={{
                                        margin: "20px",
                                      }}
                                    >
                                      <PrimaryTypography
                                        style={{
                                          fontWeight: "600",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Wsdl Url
                                      </PrimaryTypography>
                                      <ApiTextField
                                        value={awsValues?.wsdl_url}
                                        width="350px"
                                        dataTest={"project-name-input"}
                                        height="42px"
                                        borderColor="#9CA3AF"
                                        borderRadius="4px"
                                        disabledVal={
                                          soapEdit === true ? true : false
                                        }
                                        onChange={(e: any) => {
                                          handleAwsValues(
                                            "wsdl_url",
                                            e.target.value
                                          );
                                        }}
                                        onKeyUp={(event: any) => {
                                          if (event?.key === "Enter") {
                                            handleGatewayValuesValidation();
                                          }
                                        }}
                                        error={errorField4}
                                        errorHandler={(error: any) =>
                                          setErrorField4(error)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                    }}
                                  >
                                    <div>
                                      <GButton
                                        buttonType="secondary"
                                        padding="5px"
                                        label={`Cancel`}
                                        color={`${theme.palette.primaryBlack.main}`}
                                        // background="transparent"
                                        onClickHandler={
                                          handleCancelGatewayValues
                                        }
                                      />
                                    </div>
                                    <div>
                                      <div style={{ marginLeft: "20px" }}>
                                        <GButton
                                          buttonType="primary"
                                          padding="5px"
                                          // label={`Import ${gatewayValue}`}
                                          label={
                                            soapEdit === true &&
                                            collectionIdVal !== undefined
                                              ? `Update ${gatewayValue}`
                                              : `Import ${gatewayValue}`
                                          }
                                          onClickHandler={
                                            soapEdit === true &&
                                            collectionIdVal !== undefined
                                              ? handleEditSoapValues
                                              : handleGatewayValues
                                          }
                                          dataTest="save-project-btn"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Box>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <Box style={{ padding: "50px" }}>
                          <div className="d-flex justify-content-between">
                            <HeadingTypography
                              style={{
                                fontSize: "18px",
                              }}
                            >
                              Select a gateway to facilitate further
                              progression...
                            </HeadingTypography>

                            {/* <GButton
                            buttonType="secondary"
                            label="go to dashboard"
                            onClickHandler={() => {
                              navigate(
                                `/userId/${userProfile.user.user_id}/workspaceId/${teamWsidVal}`
                              );
                            }}
                          /> */}
                          </div>

                          <div
                            style={{
                              height: "410px",
                              overflowY: "auto",
                              marginTop: "40px",
                            }}
                          >
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
                                    }}
                                  >
                                    <div
                                      key={index}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: "50px",
                                        marginBottom: "35px",
                                        border: "1px solid #eee",
                                        borderRadius: "5px",
                                        padding: "20px",
                                        width: "300px",
                                        height: "100px",
                                        boxShadow:
                                          "0 2px 4px rgba(0, 0, 0, 0.2)",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setGatewayValue(val?.name);
                                      }}
                                    >
                                      <div
                                        style={{
                                          marginRight: "10px",
                                          width: "50px",
                                          height: "50px",
                                        }}
                                      >
                                        {val.icon}
                                      </div>
                                      <div>
                                        <SecondaryTypography
                                          style={{
                                            fontSize: "16px",
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
                          <div>
                            {/* <KeyboardBackspaceIcon
                                                        style={{
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => {
                                                            setStartUsingClicked(false);
                                                            setGatewayValue("");
                                                        }}
                                                    /> */}
                            <Button
                              variant="contained"
                              style={{
                                // backgroundColor: '#3973ac'
                                // background: `linear-gradient(to bottom right, #f2e6ff, #3973ac)`
                                background: `linear-gradient(to bottom right, #5900b3, #3366cc)`,
                              }}
                              onClick={() => {
                                if (
                                  importClicked === true &&
                                  gatewayLength > 0
                                ) {
                                  setListView(true);
                                  setImportClicked(false);
                                  setEditClicked(false);
                                } else {
                                  setGatewayValue("");
                                  setStartUsingClicked(false);
                                }
                              }}
                            >
                              <span>
                                <KeyboardBackspaceIcon
                                  style={{
                                    fontSize: "18px",
                                    marginRight: "5px",
                                  }}
                                />
                              </span>
                              Back
                            </Button>
                          </div>
                        </Box>
                      )}
                    </div>
                  </Grid>
                </Grid>
              )}
            </>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CustomGrid1>
                  <Box sx={{ padding: "50px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ApiFlowLogo className="mx-2" />
                      <HeadingTypography
                        sx={{ fontWeight: 900, fontSize: "20px" }}
                      >
                        Api Flow
                      </HeadingTypography>
                    </Box>
                    <HeadingTypography variant="h4" sx={{ mt: 4 }}>
                      Hello!
                    </HeadingTypography>
                    <HeadingTypography variant="h5" sx={{ mt: 2 }}>
                      {`Welcome to Apiflow, ${
                        userProfile?.user?.first_name === "null"
                          ? "User"
                          : userProfile?.user?.first_name
                      }!`}
                    </HeadingTypography>
                    <PrimaryTypography sx={{ mt: 3 }}>
                      ApiFlow provides complete management & visibility of your
                      APIs with their vulnerabilities and the ever-evolving
                      attack surface.
                    </PrimaryTypography>
                    <div
                      style={{
                        marginTop: "30px",
                      }}
                    >
                      <Box
                        sx={{
                          padding: "15px",
                          margin: "10px 0px",
                          border: `1px solid ${theme.palette.primaryPurple.main}`,
                          background: `linear-gradient(to bottom right, #f2e6ff, #ecf2f9)`,
                          borderRadius: "5px",
                        }}
                      >
                        <TextTypography>
                          <SecondaryTypography
                            style={{
                              fontSize: "12px",
                              color: `${theme.palette.primaryPurple.main}`,
                            }}
                          >
                            <span>
                              <CheckCircleIcon
                                style={{
                                  color: `${theme.palette.primaryPurple.main}`,
                                  fontSize: "16px",
                                }}
                              />
                            </span>
                            Your account is verified successfully!
                          </SecondaryTypography>
                        </TextTypography>
                      </Box>
                    </div>
                  </Box>
                </CustomGrid1>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomGrid sx={{ backgroundColor: "#521980", color: "#fff" }}>
                  <>
                    <Box style={{ padding: "50px" }}>
                      <HeadingTypography variant="h5" sx={{ fontWeight: 900 }}>
                        Explore Api Documentation
                      </HeadingTypography>
                      <div
                        style={
                          {
                            // maxWidth: '300px',
                          }
                        }
                      >
                        {/* <CubeImage width={"100%"} height={"100%"} /> */}
                        <CuboidImage width={"100%"} height={"100%"} />
                      </div>
                      <PrimaryTypography
                        sx={{ mt: 1 }}
                        style={{
                          color: `${theme.palette.teritiaryColor.main}`,
                        }}
                      >
                        Explore detailed information on endpoints,
                        authentication, error handling and more
                      </PrimaryTypography>
                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          style={{
                            // backgroundColor: '#3973ac'
                            // background: `linear-gradient(to bottom right, #f2e6ff, #3973ac)`
                            background: `linear-gradient(to bottom right, #5900b3, #3366cc)`,
                          }}
                        >
                          Checkout
                        </Button>
                      </Box>
                    </Box>
                  </>
                </CustomGrid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <CustomGrid>
                  <>
                    <Box style={{ padding: "50px" }}>
                      <HeadingTypography variant="h5" sx={{ fontWeight: 900 }}>
                        Start using ApiFlow
                      </HeadingTypography>
                      <div
                        style={{
                          maxWidth: "300px",
                        }}
                      >
                        {/* <CuboidImage width={"100%"} height={"100%"} /> */}
                        {/* <CubeImage width={"100%"} height={"100%"} /> */}
                        <SurfaceImage width={"100%"} height={"100%"} />
                      </div>
                      <PrimaryTypography sx={{ mt: 3 }}>
                        ApiFlow streamlines API management, safeguarding
                        collections with built-in protection, and enabling
                        seamless export/import.
                      </PrimaryTypography>
                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          style={{
                            // background: `linear-gradient(to bottom right, #0000cc, ${theme.palette.primaryPurple.main})`
                            background: `linear-gradient(to bottom right, #6A11CB, #2575FC)`,
                          }}
                          onClick={() => {
                            setStartUsingClicked(true);
                          }}
                        >
                          Start using
                        </Button>
                      </Box>
                    </Box>
                  </>
                </CustomGrid>
              </Grid>
            </Grid>
          </>
        )}
      </div>
      <div>
        <Backdrop
          sx={{
            zIndex: 9998,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          open={wsdlPop}
        />
        {wsdlPop === true && (
          <div ref={wsdlPopRef}>
            <Popover
              open={wsdlPop}
              anchorEl={anchorElWsdl}
              onClose={handleCloseWsdl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              sx={{
                zIndex: 9999,
                "& .MuiPaper-root": {
                  backgroundColor: theme.palette.signInUpWhite.main,
                  width: "570px",
                  height: "330px",
                  position: "absolute",
                  // marginLeft: "10px",
                  top: "101px !important",
                  left: "340px !important",
                },
              }}
            >
              <div
                style={{
                  padding: "20px",
                }}
              >
                <CloseIcon
                  style={{
                    width: "10px",
                    height: "10px",
                    position: "absolute",
                    top: "18px",
                    right: "18px",
                    cursor: "pointer",
                    zIndex: "1",
                    color: `${theme.palette.primaryBlack.main}`,
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    handleCloseWsdl();
                  }}
                />
                <PrimaryTypography
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Select Operations from this list
                </PrimaryTypography>
                <SecondaryTypography
                  style={{
                    color: `${theme.palette.teritiaryColor.main}`,
                    fontSize: "12px",
                    // marginLeft: '10px'
                  }}
                >
                  Available Operations
                </SecondaryTypography>
                <div>
                  {
                    <div
                      style={{
                        marginLeft: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {filteredSoapOperations?.length > 0 && (
                          <div>
                            <RadioCheckboxComponent
                              label={
                                <SecondaryTypography
                                  style={{ fontSize: "13px" }}
                                >
                                  {"Select All"}
                                </SecondaryTypography>
                              }
                              buttonWidth="16px"
                              checked={isAllChecked}
                              onChange={handleSelectAllChecked}
                            />
                          </div>
                        )}
                        <div style={{ marginLeft: "auto" }}>
                          <Box>
                            <GsearchBar
                              placeholder={`Search Operations`}
                              onChange={handleWsdlSearch}
                            />
                          </Box>
                        </div>
                      </div>
                    </div>
                    // )
                  }
                </div>
                <div
                  style={{
                    padding: "10px",
                  }}
                >
                  {filteredSoapOperations?.length === 0 ? (
                    <>
                      <PrimaryTypography
                        style={{
                          alignItems: "center",
                          textAlign: "center",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: `${theme.palette.teritiaryColor.main}`,
                          fontWeight: 900,
                        }}
                      >
                        No data found
                      </PrimaryTypography>
                    </>
                  ) : (
                    <>
                      <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {filteredSoapOperations?.map((val: any) => (
                          <div
                            key={val?.id}
                            style={{
                              padding: "5px",
                              marginLeft: "30px",
                              width: "40%",
                              display: "flex",
                            }}
                          >
                            <RadioCheckboxComponent
                              label={
                                <SecondaryTypography
                                  style={{
                                    fontSize: "12px",
                                  }}
                                >
                                  {val?.name}
                                </SecondaryTypography>
                              }
                              buttonWidth="15px"
                              checked={checkedWsdl?.includes(val)}
                              onChange={() => handleWsdlCheckbox(val)}
                            />
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          marginTop: "20px",
                        }}
                      >
                        <GButton
                          buttonType="secondary"
                          label={`${translate("apiManagement.CANCEL")}`}
                          onClickHandler={handleCloseWsdl}
                        />
                        <GButton
                          buttonType="primary"
                          label={`Save & Continue`}
                          marginLeft={"10px"}
                          onClickHandler={handleSaveContinueWsdlPop}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default GatewayChooser;
