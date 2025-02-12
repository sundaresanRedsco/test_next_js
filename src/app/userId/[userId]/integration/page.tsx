"use client";

import React, { useEffect, useState } from "react";
import GlobalLoader from "@/app/apiflow_components/global/GLoader";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import {
  GetApiGatewaySdkKeys,
  apiGatewayReducer,
} from "@/app/Redux/apiManagement/apiGatewayReducer";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  Drawer,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import styled from "@emotion/styled";
import GButton from "@/app/apiflow_components/global/GButton";
import theme from "@/Theme/theme";
import { PrimaryTypography, SecondaryTypography } from "@/app/Styles/signInUp";
import GsearchBar from "@/app/apiflow_components/global/GSearchBar";

import { paginator } from "@/app/apiflow_components/global/GPaginator";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import GlobalCircularLoader from "@/app/apiflow_components/global/GCircularLoader";

import InfoIcon from "@/app/Assests/icons/info.svg";
import PlusIcon from "@/app/Assests/icons/circleplus.svg";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  dateFormat,
  getCookies,
  translate,
} from "@/app/Helpers/helpersFunctions";
import ImportLogsSteps from "@/app/apiflow_components/Integration/ImportLogsSteps";
import SplunkImage1 from "@/app/Assests/images/Splunk-Symbol1.png";
import ServiceNowImage from "@/app/Assests/images/serviceNow.png";
import dutyImage from "@/app/Assests/images/pager.png";
import jiraImage from "@/app/Assests/images/jira-log.png";
import GInput from "@/app/apiflow_components/global/GInput";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// import {
//   SoapIcon,
//   JsonIcon,
//   CloseIcon,
//   // DeleteIcon,
//   // EditIcon,
//   // AwsIcon,
//   ApacheApiSix,
// } from "../../Assests/icons";

import AwsIcon from "@/app/Assests/icons/AwsIcon.svg";
import ApacheApiSix from "@/app/Assests/icons/ApacheApisixSvg.svg";
// "./ApacheApisixSvg.svg"
// "./AwsIcon.svg";

import AzureImage from "@/app/Assests/images/azure-logo.png";
import CloudImage from "@/app/Assests/images/google.png";
import SwaggerImage from "@/app/Assests/images/swagger.png";
import Kong from "@/app/Assests/images/downimage.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogSlash from "@/app/apiflow_components/Integration/LogStash";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CreateIntegration,
  GetIntegrationByTenantId,
  integrationReducer,
  UpdateIntegration,
} from "@/app/Redux/apiManagement/integrationReducer";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

const StyledButton = styled(Button)`
  position: relative;
  variant: elevated;
  background: #f1f5f9;
  height: 30px;
  text-transform: none;
`;

export default function Integrations() {
  const dispatch = useDispatch<any>();

  //cookies
  const wsid: any = getCookies(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "");

  //useSelectors
  const { apiGatewayKeys, loadingValue, loading } = useSelector<
    RootStateType,
    apiGatewayReducer
  >((state) => state.apiManagement.gateWay);

  const { integrationResponse, integrationLoading } = useSelector<
    RootStateType,
    integrationReducer
  >((state) => state.apiManagement.integration);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const [activeBtn2, setActiveBtn2] = useState(false);
  const [activeBtn3, setActiveBtn3] = useState(false);

  //useState
  const [activeBtn, setActiveBtn] = useState(true);
  const [gatewayInBtn, setGatewayInBtn] = useState(true);
  const [applicationInBtn, setApplicationInBtn] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [open, setOpen] = useState(false);
  const [errorData, setErrorData] = useState<any>("");
  const [types, setTypes] = useState<any>("");
  const [anchorElDrop, setAnchorElDrop] = React.useState<boolean>(false);
  const [logsDrawer, setLogsDrawer] = useState(false);
  const [apiEditData, setApiEditData] = useState<any>({});
  const [apiKongEditData, setApiKongEditData] = useState<any>({});
  const [getsdkKeys, setGetsdkKeys] = useState<any>(apiGatewayKeys);
  const [typeData, setTypeData] = useState<any>("");
  const [typeNameData, setTypeNameData] = useState<any>("");
  const [idData, setIdData] = useState<any>("");
  const [enable, setEnable] = useState<any>();
  const [configureBtnClicked, setConfigureBtnClicked] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");

  const [anchorElPopup, setAnchorElPopup] = useState<null | HTMLElement>(null);

  const openAnchorElPopup = Boolean(anchorElPopup);

  const [splunkValues, setSplunkValues] = useState({
    url: "",
    api_key: "",
  });

  const [pagerValues, setPagerValues] = useState({
    email: "",
    api_key: "",
    escalation_id: "",
  });

  const [jiraValues, setJiraValues] = useState({
    email: "",
    token: "",
    url: "",
    projectKey: "",
  });

  const [errorPagerApiUrl, setErrorPagerApiUrl] = useState("");
  const [errorPagerApiKey, setErrorPagerApiKey] = useState("");
  const [errorJiraValues, setErrorJiraValues] = useState("");
  const [errorTokenValues, setErrorTokenValues] = useState("");
  const [errorUrlValues, setErrorUrlValues] = useState("");
  const [errorProjectKeyValues, setErrorProjectkeyValues] = useState("");

  const [serviceNowValues, setServiceNowValues] = useState({
    api_key: "",
    api_url: "",
    api_version: "",
    api_table_name: "",
    incident_table_name: "",
    method: "u_apiflow_method",
    url: "u_apiflow_url",
    project_name: "u_apiflow_project_name",
    stage_name: "u_apiflow_stage_name",
    group_name: "u_apiflow_group_name",
    unique_id: "u_apiflow_unique_id",
    operation_name: "u_apiflow_operation_name",
    status: "u_apiflow_status",
  });
  const [labels, setLabels] = useState([]);

  const [splunkEnable, setSplunkEnable] = useState(false);
  const [serviceNowEnable, setServiceNowEnable] = useState(false);
  const [pagerEnable, setPagerEnable] = useState(false);
  const [jiraEnable, setJiraEnable] = useState(false);

  const [splunkError, setSplunkError] = useState("");
  const [serviceNowError, setServiceNowError] = useState("");
  const [pagerError, setPagerError] = useState("");
  const [jiraError, setjiraError] = useState("");

  const [splunkId, setSplunkId] = useState("");
  const [serviceNowId, setServiceNowId] = useState("");
  const [pagerId, setPagerId] = useState("");
  const [jiraId, setJiraId] = useState("");

  const [fieldMatchClicked, setFieldMatchClicked] = useState(false);

  const [errorFieldApiUrl, setErrorFieldApiUrl] = useState("");
  const [errorFieldApiKey, setErrorFieldApiKey] = useState("");

  const [errorApiKey, setErrorApiKey] = useState("");
  const [errorApiUrl, setErrorApiUrl] = useState("");
  const [errorApiTableName, setErrorApiTableName] = useState("");
  const [errorIncidentTableName, setErrorIncidentTableName] = useState("");
  const [errorMethod, setErrorMethod] = useState("");
  const [errorUrl, setErrorUrl] = useState("");
  const [errorProjectName, setErrorProjectName] = useState("");
  const [errorStageName, setErrorStageName] = useState("");
  const [errorGroupName, setErrorGroupName] = useState("");
  const [errorUniqueId, setErrorUniqueId] = useState("");
  const [errorOperationName, setErrorOperationName] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [errorVersion, setErrorVersion] = useState("");

  const [enableLoading, setEnableLoading] = useState<any>({});
  const [splunkCount, setSplunkCount] = useState<number>(0);
  const [pagerCount, setPagerCount] = useState<number>(0);
  const [jiraCount, setJiraCount] = useState<number>(0);

  const [serviceNowCount, setServiceNowCount] = useState<number>(0);

  const [imprortConfigureClicked, setImprortConfigureClicked] = useState(false);
  const [gateWaysConfigureClicked, setGateWaysConfigureClicked] =
    useState(true);
  const [anchorEl9, setAnchorEl9] = useState(null);

  const [gateWaysClickableType, setGateWaysClickableType] = useState<any>();
  const [logstashInBtn, setLogstashInBtn] = useState(false);
  const [errorValue, setErrorValue] = useState<any>();

  //pre-defined values
  const tableHeaders = [
    { key: "name", label: "Gateway Type" },
    { key: "senstive", label: "Name" },
    { key: "senstive", label: "Status" },
    { key: "datasets", label: "Created at" },
    { key: "ENDPOINTS", label: "Created By" },
    // { key: "ENABLE", label: "Enable" },
    { key: "sync", label: "" },
    { key: "log", label: "Logs" },
    { key: "Action", label: "Action" },
  ];

  const applicationInLists = [
    {
      name: "Splunk Siem",
      description:
        "Splunk SIEM provides APIs for seamless integration, enabling real-time security monitoring and efficient threat detection.",
      icon: (
        <Image
          // src={SplunkImage}
          src={SplunkImage1}
          alt=""
          style={{ width: "70px", height: "43px", marginLeft: "-17px" }}
        />
      ),
      is_enable: splunkEnable,
      error: splunkError,
    },
    {
      name: "Service Now",
      description:
        "ServiceNow offers APIs for automating workflows and streamlining IT service management.",
      icon: (
        <Image
          src={ServiceNowImage}
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      ),
      is_enable: serviceNowEnable,
      error: serviceNowError,
    },

    {
      name: "Pager Duty",
      description:
        "Pagerduty Build more reliable services. Eliminate alert fatigue and burnout.",
      icon: (
        <Image
          src={dutyImage}
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      ),
      is_enable: pagerEnable,
      error: pagerError,
    },

    {
      name: "Jira",
      description:
        "Jira Build more reliable services. Eliminate alert fatigue and burnout.",
      icon: (
        <Image
          src={jiraImage}
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      ),
      is_enable: jiraEnable,
      error: jiraError,
    },
  ];

  const GatewayInLists = [
    {
      name: "GCP",
      description:
        "ServiceNow offers APIs for automating workflows and streamlining IT service management.",
      icon: (
        <Image
          src={CloudImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),
      clickableType: "GCP",
    },

    {
      name: "Aws",
      description:
        "Splunk SIEM provides APIs for seamless integration, enabling real-time security monitoring and efficient threat detection.",
      icon: <AwsIcon width={"100%"} height={"100%"} />,
      clickableType: "AWS",
    },

    {
      name: "Azure",
      description:
        "ServiceNow offers APIs for automating workflows and streamlining IT service management.",
      icon: (
        <Image
          src={AzureImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),
      clickableType: "AZURE",
    },

    {
      name: "Swagger",
      description:
        "ServiceNow offers APIs for automating workflows and streamlining IT service management.",
      icon: (
        <Image
          src={SwaggerImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      ),

      clickableType: "SWAGGER",
    },

    {
      name: "Apache",
      description:
        "ServiceNow offers APIs for automating workflows and streamlining IT service management.",
      icon: (
        // <img
        //     src={ServiceNowImage}
        //     alt=''
        //     style={{ width: '40px', height: '40px' }}
        // />
        <ApacheApiSix width={"100%"} height={"100%"} />
      ),
      clickableType: "APISIX",
      // is_enable: serviceNowActive,
      // error: serviceNowError,
    },

    {
      name: "Kong",
      description:
        "ServiceNow offers APIs for automating workflows and streamlining IT service management.",
      icon: (
        // <Image
        //     src={ServiceNowImage}
        //     alt=''
        //     style={{ width: '40px', height: '40px' }}
        // />
        <Image src={Kong} alt="" style={{ width: "100%", height: "100%" }} />
      ),
      // is_enable: serviceNowActive,
      // error: serviceNowError,
      clickableType: "KONG",
    },
  ];

  const handleImportsIntegration = (type: any) => {
    setGateWaysClickableType(type);
    setGateWaysConfigureClicked(false);
    setImprortConfigureClicked(true);
  };

  const handleBackIntegration = () => {
    // setGateWaysClickableType(type);
    setGateWaysConfigureClicked(true);
    setImprortConfigureClicked(false);
  };

  const handleApplicationInBtn = () => {
    setApplicationInBtn(true);
    setGatewayInBtn(false);
    setLogstashInBtn(false);
    setActiveBtn(false);
    setActiveBtn2(true);

    setActiveBtn3(false);
  };

  const handleGatewayInBtn = () => {
    setGatewayInBtn(true);
    setApplicationInBtn(false);
    setLogstashInBtn(false);
    setActiveBtn2(false);
    setActiveBtn(true);
    setActiveBtn3(false);
  };

  const handleLogstashInBtn = () => {
    // setActiveBtn(false);

    setApplicationInBtn(false);
    setGatewayInBtn(false);
    setLogstashInBtn(true);
    setActiveBtn2(false);
    setActiveBtn(false);
    setActiveBtn3(true);
  };

  let filteredData = [];
  if (apiGatewayKeys) {
    filteredData = apiGatewayKeys?.filter((data: any) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleChange = (event: any, value: any) => {
    setPage(paginator(apiGatewayKeys, value, 5).page);
  };
  const count = Math.ceil(filteredData?.length / 5);

  const handleClickOpen = (type: any) => {
    // setOpen(true);
    if (type === "INVALID_CREDENTIALS") {
      setTypes(type);
      setOpen(true);
    } else if (type === "enable") {
      setTypes(type);
      setOpen(true);
    }
  };

  const handleCloseError = () => {
    setOpen(false);
    setErrorData("");
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: any
  ) => {
    setAnchorElDrop(true);
    setApiEditData(data);
    setApiKongEditData(data);
  };
  const handleClose = () => {
    setAnchorElDrop(false);
  };

  const handleLogsSteps = () => {
    setLogsDrawer(true);
  };

  const handleCloseLogSteps = () => {
    setLogsDrawer(false);
  };

  const handleConfigureBtn = (
    event: React.MouseEvent<HTMLButtonElement>,
    val: any
  ) => {
    setSelectedVal(val?.name);
    setConfigureBtnClicked(true);
    setAnchorElPopup(event?.currentTarget);
  };

  //handles enable/disable chip
  const handleStatusBtn = (val: any, index: any) => {
    //set global circular loading true
    setEnableLoading((prevLoadingStates: any) => ({
      ...prevLoadingStates,
      [index]: true,
    }));

    if (val?.name === "Splunk Siem") {
      if (integrationResponse?.length > 0) {
        const splunkSiem = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "SPLUNK_SIEM"
        );

        if (splunkSiem?.length > 0) {
          let updateData = {
            // user_id: userProfile?.user.user_id,
            type: "SPLUNK_SIEM",
            id: splunkSiem?.[0]?.id,
            url: splunkSiem?.[0]?.url,
            api_key: splunkSiem?.[0]?.api_key,
            is_enable: !splunkSiem?.[0]?.is_enable,
          };
          dispatch(UpdateIntegration(updateData))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              //set global circular loading false
              setEnableLoading((prevLoadingStates: any) => ({
                ...prevLoadingStates,
                [index]: false,
              }));
              toast?.success(
                `Splunk Siem instance ${
                  splunkEnable === true ? "Disabled" : "Enabled"
                }!`
              );
            })
            .catch((error: any) => {
              toast?.error("Error Occured!");
            });
        }
      }
    }

    if (val?.name === "Pager Duty") {
      if (integrationResponse?.length > 0) {
        const pagerDutys = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "PAGER_DUTY"
        );

        if (pagerDutys?.length > 0) {
          let updateData = {
            // user_id: userProfile?.user.user_id,
            type: "PAGER_DUTY",
            id: pagerDutys?.[0]?.id,
            url: pagerDutys?.[0]?.url,
            api_key: pagerDutys?.[0]?.api_key,
            is_enable: !pagerDutys?.[0]?.is_enable,
          };
          dispatch(UpdateIntegration(updateData))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              //set global circular loading false
              setEnableLoading((prevLoadingStates: any) => ({
                ...prevLoadingStates,
                [index]: false,
              }));
              toast?.success(
                `Pager Duty instance ${
                  pagerEnable === true ? "Disabled" : "Enabled"
                }!`
              );
            })
            .catch((error: any) => {
              toast?.error("Error Occured!");
            });
        }
      }
    }

    if (val?.name === "Jira") {
      if (integrationResponse?.length > 0) {
        const jiraDutys = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "JIRA"
        );

        if (jiraDutys?.length > 0) {
          let updateData = {
            // user_id: userProfile?.user.user_id,
            type: "JIRA",
            id: jiraDutys?.[0]?.id,
            email: jiraDutys?.[0]?.email,
            token: jiraDutys?.[0]?.token,
            projectKey: jiraDutys?.[0]?.projectKey,
            is_enable: !jiraDutys?.[0]?.is_enable,
          };
          dispatch(UpdateIntegration(updateData))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              //set global circular loading false
              setEnableLoading((prevLoadingStates: any) => ({
                ...prevLoadingStates,
                [index]: false,
              }));
              toast?.success(
                `Jira instance ${jiraEnable === true ? "Disabled" : "Enabled"}!`
              );
            })
            .catch((error: any) => {
              toast?.error("Error Occured!");
            });
        }
      }
    }

    if (val?.name === "Service Now") {
      if (integrationResponse?.length > 0) {
        const serviceNow = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "SERVICE_NOW"
        );

        if (serviceNow?.length > 0) {
          let fieldMatching = {
            method: serviceNow?.[0]?.method,
            url: serviceNow?.[0]?.url,
            project_name: serviceNow?.[0]?.project_name,
            stage_name: serviceNow?.[0]?.stage_name,
            group_name: serviceNow?.[0]?.group_name,
            unique_id: serviceNow?.[0]?.unique_id,
            operation_name: serviceNow?.[0]?.operation_name,
            status: serviceNow?.[0]?.status,
          };

          let stringifyVal = JSON?.stringify(fieldMatching);

          let updateData = {
            // user_id: userProfile?.user.user_id,
            // tenant_id: userProfile?.user?.tenant_id,
            type: "SERVICE_NOW",
            id: serviceNow?.[0]?.id,
            url: serviceNow?.[0]?.url,
            api_key: serviceNow?.[0]?.api_key,
            servicenow_tblname: serviceNow?.[0]?.api_table_name,
            incident_tblname: serviceNow?.[0]?.incident_table_name,
            json_configuration: stringifyVal,
            is_enable: !serviceNow?.[0]?.is_enable,
          };

          dispatch(UpdateIntegration(updateData))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              //set global circular loading false
              setEnableLoading((prevLoadingStates: any) => ({
                ...prevLoadingStates,
                [index]: false,
              }));
              toast?.success(
                `Service Now instance ${
                  serviceNowEnable === true ? "Disabled" : "Enabled"
                }!`
              );
            })
            .catch((error: any) => {
              toast.error("!Error Occured");
            });
        }
      }
    }
  };

  //drawer close function
  const handleConfigurePopupClose = () => {
    setConfigureBtnClicked(false);
    setSelectedVal("");
    setAnchorElPopup(null);
    setSplunkValues({
      url: "",
      api_key: "",
    });

    setPagerValues({
      escalation_id: "",
      api_key: "",
      email: "",
    });
    setErrorFieldApiUrl("");
    setErrorFieldApiKey("");
    setServiceNowValues({
      api_key: "",
      api_url: "",
      api_version: "",
      api_table_name: "",
      incident_table_name: "",
      method: "",
      url: "",
      project_name: "",
      stage_name: "",
      group_name: "",
      unique_id: "",
      operation_name: "",
      status: "",
    });
    setErrorApiKey("");
    setErrorApiUrl("");
    setErrorApiTableName("");
    setErrorIncidentTableName("");
    setErrorMethod("");
    setErrorUrl("");
    setErrorProjectName("");
    setErrorStageName("");
    setErrorGroupName("");
    setErrorUniqueId("");
    setErrorOperationName("");
    setErrorStatus("");
    setErrorVersion("");
    // errorPagerApiUrl
    setErrorPagerApiUrl("");
    setErrorPagerApiKey("");
  };

  const handleGetIntergrationByTenantId = () => {
    dispatch(GetIntegrationByTenantId(userProfile?.user?.tenant_id))
      // dispatch(GetIntegrationByTenantId("db567d96817040ce90286387dd4b7d2e"))
      .unwrap()
      .then((getRes: any) => {
        console.log("getRes: ", getRes);
      })
      .catch((error: any) => {
        if (error?.message === "No data found for the provided tenant_id ") {
          setSplunkCount(0);
          setServiceNowCount(0);
          setPagerCount(0);
          setJiraCount(0);
        }
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  };

  //sets the values to the respective states.
  const handleSplunkValues = (field: any, event: any) => {
    setSplunkValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handlePagerValues = (field: any, event: any) => {
    setPagerValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleJiraValues = (field: any, event: any) => {
    setJiraValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleServiceNowValues = (field: any, event: any) => {
    setServiceNowValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  //validating both splunkSiem and serviceNow
  //this function retruns true, if no error occured, else returns false
  const handleApplicationInValidation = () => {
    if (selectedVal === "Splunk Siem") {
      //for empty value
      const hasValidationApiUrl = splunkValues?.url?.trim() === "";
      //containing space
      const hasNoSpaceApiUrl = /\s/.test(splunkValues?.url);

      const hasValidationApiKey = splunkValues?.api_key?.trim() === "";
      const hasNoSpaceApiKey = /\s/.test(splunkValues?.api_key);

      if (hasValidationApiUrl) {
        setErrorFieldApiUrl("Api Url is required");
        return false;
      } else if (hasNoSpaceApiUrl) {
        setErrorFieldApiUrl("Spaces are not allowed");
        return false;
      } else if (hasValidationApiKey) {
        setErrorFieldApiKey("Api Key is required");
        return false;
      } else if (hasNoSpaceApiKey) {
        setErrorFieldApiKey("Spaces are not allowed");
        return false;
      } else {
        return true;
      }
    }

    if (selectedVal === "Pager Duty") {
      //for empty value
      const hasValidationApiUrl = pagerValues?.email?.trim() === "";
      //containing space
      const hasNoSpaceApiUrl = /\s/.test(pagerValues?.email);

      const hasValidationApiKey = pagerValues?.api_key?.trim() === "";
      const hasNoSpaceApiKey = /\s/.test(pagerValues?.api_key);
      const hasemailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (hasValidationApiUrl) {
        setErrorPagerApiUrl("Mail Id is required");
        return false;
      } else if (hasNoSpaceApiUrl) {
        setErrorPagerApiUrl("Spaces are not allowed");
        return false;
      } else if (hasemailRegex) {
        setErrorPagerApiUrl("Invalid Mail format");
        return false;
      } else if (hasValidationApiKey) {
        setErrorPagerApiKey("Api Key is required");
        return false;
      } else if (hasNoSpaceApiKey) {
        setErrorPagerApiKey("Spaces are not allowed");
        return false;
      } else {
        return true;
      }
    }

    if (selectedVal === "Jira") {
      if (jiraValues.email.trim() === "") {
        setErrorJiraValues("Email is required");
        return false;
      } else if (/\s/.test(jiraValues.email)) {
        setErrorJiraValues("Spaces are not allowed in Email");
        return false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(jiraValues.email)) {
        setErrorJiraValues("Invalid Email format");
        return false;
      } else if (jiraValues.token.trim() === "") {
        setErrorTokenValues("Token is Required");
        return false;
      } else if (jiraValues.url.trim() === "") {
        setErrorUrlValues("Url is Required");
        return false;
      } else if (jiraValues.projectKey.trim() === "") {
        setErrorUrlValues("projectKey is Required");
        return false;
      } else {
        return true;
      }
      // //for empty value
      // const hasValidationApiUrl = jiraValues?.email?.trim() === "";
      // //containing space
      // const hasNoSpaceApiUrl = /\s/.test(jiraValues?.email);

      // const hasValidationApiKey = pagerValues?.api_key?.trim() === "";
      // const hasNoSpaceApiKey = /\s/.test(pagerValues?.api_key);
      // const hasemailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // if (hasValidationApiUrl) {
      //   setErrorPagerApiUrl("Mail Id is required");
      //   return false;
      // } else if (hasNoSpaceApiUrl) {
      //   setErrorPagerApiUrl("Spaces are not allowed");
      //   return false;
      // } else if (hasemailRegex) {
      //   setErrorPagerApiUrl("Invalid Mail format");
      //   return false;
      // } else if (hasValidationApiKey) {
      //   setErrorPagerApiKey("Api Key is required");
      //   return false;
      // } else if (hasNoSpaceApiKey) {
      //   setErrorPagerApiKey("Spaces are not allowed");
      //   return false;
      // } else {
      //   return true;
      // }
    }

    if (selectedVal === "Service Now") {
      const urlRegex =
        /((http|https|ftp):\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?/gi;

      const hasValidationApiKey = serviceNowValues?.api_key?.trim() === "";
      const hasNoSpaceApiKey = /\s/.test(serviceNowValues?.api_key);
      const hasValidationApiUrl = serviceNowValues?.api_url?.trim() === "";

      const hasNoSpaceApiUrl = urlRegex.test(serviceNowValues?.api_url);

      const hasValidationApiTablename =
        serviceNowValues?.api_table_name?.trim() === "";
      const hasNoSpaceApiTablename = /\s/.test(
        serviceNowValues?.api_table_name
      );

      const hasValidationIncidentTablename =
        serviceNowValues?.incident_table_name?.trim() === "";
      const hasNoSpaceIncidentTablename = /\s/.test(
        serviceNowValues?.incident_table_name
      );

      const hasValidationMethod = serviceNowValues?.method?.trim() === "";
      const hasNoSpaceMethod = /\s/.test(serviceNowValues?.method);

      const hasValidationUrl = serviceNowValues?.url?.trim() === "";
      const hasNoSpaceUrl = /\s/.test(serviceNowValues?.url);

      const hasValidationProjectName =
        serviceNowValues?.project_name?.trim() === "";
      const hasNoSpaceProjectName = /\s/.test(serviceNowValues?.project_name);

      const hasValidationStageName =
        serviceNowValues?.stage_name?.trim() === "";
      const hasNoSpaceStageName = /\s/.test(serviceNowValues?.stage_name);

      const hasValidationGroupName =
        serviceNowValues?.group_name?.trim() === "";
      const hasNoSpaceGroupName = /\s/.test(serviceNowValues?.group_name);

      const hasValidationUniqueId = serviceNowValues?.unique_id?.trim() === "";
      const hasNoSpaceUniqueId = /\s/.test(serviceNowValues?.unique_id);

      const hasValidationOperationName =
        serviceNowValues?.operation_name?.trim() === "";
      const hasNoSpaceOperationName = /\s/.test(
        serviceNowValues?.operation_name
      );

      const hasValidatioStatus = serviceNowValues?.status?.trim() === "";
      const hasNoSpaceStatus = /\s/.test(serviceNowValues?.status);

      const hasValidationVersion = serviceNowValues?.api_key?.trim() === "";
      const hasNoSpaceVersion = /\s/.test(serviceNowValues?.api_key);

      if (hasValidationApiKey) {
        setErrorApiKey("Api Key is required");
        return false;
      } else if (hasNoSpaceApiKey) {
        setErrorApiKey("Spaces are not allowed");
        return false;
      } else if (hasValidationApiUrl) {
        setErrorApiUrl("Api Url is required");
        return false;
      } else if (!hasNoSpaceApiUrl) {
        setErrorApiUrl("Invalid url");
        return false;
      } else if (hasValidationApiTablename) {
        setErrorApiTableName("Api Table Name is required");
        return false;
      } else if (hasNoSpaceApiTablename) {
        setErrorApiTableName("Spaces are not allowed");
        return false;
      } else if (hasValidationIncidentTablename) {
        setErrorIncidentTableName("Incident Table Name is required");
        return false;
      } else if (hasNoSpaceIncidentTablename) {
        setErrorIncidentTableName("Spaces are not allowed");
        return false;
      } else if (hasValidationMethod) {
        setErrorMethod("Method is required");
        return false;
      } else if (hasNoSpaceMethod) {
        setErrorMethod("Spaces are not allowed");
        return false;
      } else if (hasValidationUrl) {
        setErrorUrl("Url is required");
        return false;
      } else if (hasNoSpaceUrl) {
        setErrorUrl("Spaces are not allowed");
        return false;
      } else if (hasValidationProjectName) {
        setErrorProjectName("Project Name is required");
        return false;
      } else if (hasNoSpaceProjectName) {
        setErrorProjectName("Spaces are not allowed");
        return false;
      } else if (hasValidationStageName) {
        setErrorStageName("Stage Name is required");
        return false;
      } else if (hasNoSpaceStageName) {
        setErrorStageName("Spaces are not allowed");
        return false;
      } else if (hasValidationGroupName) {
        setErrorGroupName("Group Name is required");
        return false;
      } else if (hasNoSpaceGroupName) {
        setErrorGroupName("Spaces are not allowed");
        return false;
      } else if (hasValidationUniqueId) {
        setErrorUniqueId("Unique Id is required");
        return false;
      } else if (hasNoSpaceUniqueId) {
        setErrorUniqueId("Spaces are not allowed");
        return false;
      } else if (hasValidationOperationName) {
        setErrorOperationName("Operation Name is required");
        return false;
      } else if (hasNoSpaceOperationName) {
        setErrorOperationName("Spaces are not allowed");
        return false;
      } else if (hasValidatioStatus) {
        setErrorStatus("Status is required");
        return false;
      } else if (hasNoSpaceStatus) {
        setErrorStatus("Spaces are not allowed");
        return false;
      } else if (hasValidationVersion) {
        setErrorVersion("Api Version is required");
        return false;
      } else if (hasNoSpaceVersion) {
        setErrorVersion("Spaces are not allowed");
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  //based on the validation result, the api is called
  const handleSplunkSiem = () => {
    console.log("REACH1");
    const validationCheck = handleApplicationInValidation();

    if (validationCheck === true) {
      let splunkDataCreate = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        isFieldCreation: false,
        type: "SPLUNK_SIEM",
        email: "",
        url: splunkValues?.url,
        api_key: splunkValues?.api_key,
        json_configuration: "",
        servicenow_tblname: "",
        incident_tblname: "",
      };

      let splunkDataUpdata = {
        // user_id: userProfile?.user.user_id,
        type: "SPLUNK_SIEM",
        id: splunkId,
        url: splunkValues?.url,
        api_key: splunkValues?.api_key,
        is_enable: true,
      };

      //if already created, update api is called
      if (integrationResponse?.length > 0) {
        const splunkSiem = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "SPLUNK_SIEM"
        );

        if (splunkSiem?.length > 0) {
          //update api
          dispatch(UpdateIntegration(splunkDataUpdata))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("Splunk Siem Instance updated Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        } else {
          //create api
          dispatch(CreateIntegration(splunkDataCreate))
            .unwrap()
            .then((createRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("Splunk Siem Instance created Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        }
      } else {
        //create api
        dispatch(CreateIntegration(splunkDataCreate))
          .unwrap()
          .then((createRes: any) => {
            handleGetIntergrationByTenantId();
            toast?.success("Splunk Siem Instance created Successfully!");
            setErrorValue("");
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      }
    } else {
      console.log("Error occurred");
    }
  };

  const handlePagerDuty = () => {
    const validationCheck = handleApplicationInValidation();

    if (validationCheck === true) {
      let pagerDataCreate = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        type: "PAGER_DUTY",
        email: pagerValues?.email,
        api_key: pagerValues?.api_key,
        escalation_id: pagerValues?.escalation_id,
        json_configuration: "",
        url: "",
        servicenow_tblname: "",
        isFieldCreation: false,
        incident_tblname: "",
      };

      let pagerDataUpdata = {
        // user_id: userProfile?.user.user_id,
        type: "PAGER_DUTY",
        id: pagerId,
        email: pagerValues?.email,
        api_key: pagerValues?.api_key,
        escalation_id: pagerValues?.escalation_id,
        is_enable: true,
        url: "",
      };

      //if already created, update api is called
      if (integrationResponse?.length > 0) {
        const splunkSiem = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "PAGER_DUTY"
        );

        if (splunkSiem?.length > 0) {
          //update api
          dispatch(UpdateIntegration(pagerDataUpdata))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("Pager Duty Instance updated Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        } else {
          //create api
          dispatch(CreateIntegration(pagerDataCreate))
            .unwrap()
            .then((createRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("PagerDutyInstance created Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        }
      } else {
        //create api
        dispatch(CreateIntegration(pagerDataCreate))
          .unwrap()
          .then((createRes: any) => {
            handleGetIntergrationByTenantId();
            toast?.success("Pager Duty Instance created Successfully!");
            setErrorValue("");
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      }
    } else {
      console.log("Error occurred");
    }
  };

  const handleJira = () => {
    const validationCheck = handleApplicationInValidation();

    if (validationCheck === true) {
      let pagerDataCreate = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        type: "JIRA",
        email: jiraValues?.email,
        api_key: jiraValues?.token,
        escalation_id: "",
        json_configuration: "",
        url: jiraValues?.url,
        servicenow_tblname: jiraValues?.projectKey,
        isFieldCreation: false,
        incident_tblname: "",
      };

      let pagerDataUpdata = {
        // user_id: userProfile?.user.user_id,
        type: "JIRA",
        id: jiraId,
        email: pagerValues?.email,
        api_key: pagerValues?.api_key,
        escalation_id: pagerValues?.escalation_id,
        is_enable: true,
        url: "",
      };

      //if already created, update api is called
      if (integrationResponse?.length > 0) {
        const splunkSiem = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "JIRA"
        );

        if (splunkSiem?.length > 0) {
          //update api
          dispatch(UpdateIntegration(pagerDataUpdata))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("Jira Instance updated Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        } else {
          //create api
          dispatch(CreateIntegration(pagerDataCreate))
            .unwrap()
            .then((createRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("JiraInstance created Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        }
      } else {
        //create api
        dispatch(CreateIntegration(pagerDataCreate))
          .unwrap()
          .then((createRes: any) => {
            handleGetIntergrationByTenantId();
            toast?.success("Pager Duty Instance created Successfully!");
            setErrorValue("");
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      }
    } else {
      console.log("Error occurred");
    }
  };

  const handleServiceNow = () => {
    const validationCheck = handleApplicationInValidation();

    if (validationCheck === true) {
      let fieldMatching = {
        method: serviceNowValues?.method,
        url: serviceNowValues?.url,
        project_name: serviceNowValues?.project_name,
        stage_name: serviceNowValues?.stage_name,
        group_name: serviceNowValues?.group_name,
        unique_id: serviceNowValues?.unique_id,
        operation_name: serviceNowValues?.operation_name,
        status: serviceNowValues?.status,
      };

      let stringifyVal = JSON?.stringify(fieldMatching);
      let api_url =
        serviceNowValues?.api_url.trim() +
        "/api/now/" +
        serviceNowValues?.api_version +
        "/table";
      let serviceNowDataCreate = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        type: "SERVICE_NOW",
        url: api_url.trim(),
        api_key: serviceNowValues?.api_key,
        servicenow_tblname: serviceNowValues?.api_table_name,
        incident_tblname: serviceNowValues?.incident_table_name,
        json_configuration: stringifyVal,
        isFieldCreation: true,
      };

      let serviceNowDataUpdate = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        type: "SERVICE_NOW",
        id: serviceNowId,
        url: api_url.trim(),
        api_key: serviceNowValues?.api_key,
        servicenow_tblname: serviceNowValues?.api_table_name,
        incident_tblname: serviceNowValues?.incident_table_name,
        json_configuration: stringifyVal,
        is_enable: true,
      };

      if (integrationResponse?.length > 0) {
        const serviceNow = integrationResponse?.filter(
          (filterVal: any) => filterVal?.type === "SERVICE_NOW"
        );

        if (serviceNow?.length > 0) {
          //update api
          dispatch(UpdateIntegration(serviceNowDataUpdate))
            .unwrap()
            .then((updateRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("ServiceNow Instance updated Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        } else {
          //create api
          dispatch(CreateIntegration(serviceNowDataCreate))
            .unwrap()
            .then((createRes: any) => {
              handleGetIntergrationByTenantId();
              toast?.success("ServiceNow Instance created Successfully!");
              setErrorValue("");
            })
            .catch((error: any) => {
              setErrorValue(error);
            });
        }
      } else {
        //create api
        dispatch(CreateIntegration(serviceNowDataCreate))
          .unwrap()
          .then((createRes: any) => {
            handleGetIntergrationByTenantId();
            toast?.success("ServiceNow Instance created Successfully!");
            setErrorValue("");
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      }
    } else {
      console.log("Error occured");
    }
  };

  //calling the respective functions based on the type selected
  const handleConfigureSubmit = () => {
    if (selectedVal === "Splunk Siem") {
      handleSplunkSiem();
    } else if (selectedVal === "Service Now") {
      handleServiceNow();
    } else if (selectedVal === "Pager Duty") {
      handlePagerDuty();
    } else if (selectedVal === "Jira") {
      handleJira();
    }
  };

  //useEffect
  useEffect(() => {
    if (wsid) {
      dispatch(GetApiGatewaySdkKeys(wsid))
        .unwrap()
        .then()
        .catch((errr: any) => {
          if (errr.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }

    return () => {
      console.log("Component is unmounting");
    };
  }, [wsid]);

  //calling the GetIntegrationByTenantId api
  useEffect(() => {
    handleGetIntergrationByTenantId();
    return () => {
      console.log("Component is unmounting");
    };
  }, [userProfile?.user?.tenant_id, selectedVal, applicationInBtn]);

  // based on the response from GetIntegrationByTenantId api,
  // the values are filtered based on the type
  useEffect(() => {
    if (integrationResponse?.length > 0) {
      const serviceNow = integrationResponse?.filter(
        (filterVal: any) => filterVal?.type === "SERVICE_NOW"
      );

      const splunkSiem = integrationResponse?.filter(
        (filterVal: any) => filterVal?.type === "SPLUNK_SIEM"
      );

      const pagerDut = integrationResponse?.filter(
        (filterVal: any) => filterVal?.type === "PAGER_DUTY"
      );

      const jiraDut = integrationResponse?.filter(
        (filterVal: any) => filterVal?.type === "JIRA"
      );

      setSplunkCount(splunkSiem?.length);
      setServiceNowCount(serviceNow?.length);
      setPagerCount(pagerDut?.length);
      setJiraCount(jiraDut?.length);
      //splunk siem
      if (splunkSiem?.length > 0) {
        splunkSiem?.map((val: any) => {
          setSplunkValues((prevValues) => ({
            ...prevValues,
            url: val?.url,
            api_key: val?.api_key,
          }));
          setSplunkEnable(val?.is_enable);
          setSplunkError(val?.error);
          setSplunkId(val?.id);
          return null;
        });
      }

      if (pagerDut?.length > 0) {
        pagerDut?.map((val: any) => {
          setPagerValues((prevValues) => ({
            ...prevValues,
            email: val?.email,
            api_key: val?.api_key,
            escalation_id: val?.escilation,
          }));
          setPagerEnable(val?.is_enable);

          setPagerError(val?.error);
          setPagerId(val?.id);
          return null;
        });
      }

      if (jiraDut?.length > 0) {
        jiraDut?.map((val: any) => {
          setJiraValues((prevValues) => ({
            ...prevValues,
            email: val?.email,
            token: val?.token,
            url: val?.url,
            projectKey: val?.projectKey,
          }));
          setJiraEnable(val?.is_enable);

          setjiraError(val?.error);
          setJiraId(val?.id);
          return null;
        });
      }

      //service Now
      if (serviceNow?.length > 0) {
        serviceNow.map((val: any) => {
          const parsingJson = JSON?.parse(JSON?.parse(val?.json_configuration));

          setServiceNowValues((prevValues) => ({
            ...prevValues,
            api_key: val?.api_key,
            api_url: extractBaseUrl(val?.url),
            api_version: extractVersion(val?.url),
            api_table_name: val?.servicenow_tblname,
            incident_table_name: val?.incident_tblname,
            method: parsingJson?.method,
            url: parsingJson?.url,
            project_name: parsingJson?.project_name,
            stage_name: parsingJson?.stage_name,
            group_name: parsingJson?.group_name,
            unique_id: parsingJson?.unique_id,
            operation_name: parsingJson?.operation_name,
            status: parsingJson?.status,
          }));
          setServiceNowEnable(val?.is_enable);
          setServiceNowError(val?.error);
          setServiceNowId(val?.id);
          return null;
        });
      }
    }
    return () => {
      console.log("Component is unmounting");
    };
  }, [integrationResponse, selectedVal, applicationInBtn]);

  const extractBaseUrl = (url: any) => {
    const baseUrlRegex = /^((http|https|ftp):\/\/)?([^\/:]+)(:\d+)?/;
    const match = url.match(baseUrlRegex);
    return match ? match[0] : null;
  };

  const extractVersion = (url: any) => {
    const versionRegex = /\/api\/now\/(v\d+)\//;
    const match = url.match(versionRegex);
    return match ? match[1] : null;
  };

  const opens = Boolean(anchorEl9);
  const handleClickGatwayPop = (event: any) => {
    setAnchorEl9(event.currentTarget);
  };
  const handleCloseGateways = () => {
    setAnchorEl9(null);
  };

  // const labelsHandler= ()=>{
  //    let url= serviceNowValues.api_url +`sys_dictionary?sysparm_query=name=${serviceNowValues.api_table_name}&sysparm_fields=column_label,element`
  //     axios.get('')
  //     .then((response:any) => {
  //         setLabels(response?.result)
  //     })
  //     .catch(error => {

  //     });

  // }

  return (
    <div>
      {loading && <GlobalLoader />}

      {/* importing Header */}
      {/* <ApiManageHeaders imports /> */}

      <Box
        sx={{
          marginTop: "1rem",
          backgroundColor: `${theme.palette.mainWhite.main}`,
          marginBottom: "10px",
          padding: "1rem",
          // height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Box>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <PrimaryTypography
              style={{
                fontWeight: "600",
              }}
            >
              Integrations and Connected apps
            </PrimaryTypography>

            <div>
              {activeBtn === true && (
                <PrimaryTypography
                  style={{
                    fontWeight: "700",
                    color: theme.palette.primaryBlack.main,
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                  onClick={handleClickGatwayPop}
                >
                  <PlusIcon
                    style={{
                      width: "15px",
                      height: "15px",
                      cursor: "pointer",
                      marginRight: "3px",
                    }}
                  />
                  {"Import"}
                </PrimaryTypography>
              )}
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <StyledButton>
              <GButton
                buttonType="primary"
                color={
                  activeBtn === true
                    ? `${theme.palette.primaryWhite.main}`
                    : `${theme.palette.primaryBlack.main}`
                }
                label={`Gateway Integration`}
                background={activeBtn === true ? "#A855F7" : "#F1F5F9"}
                onClickHandler={handleGatewayInBtn}
              />
              <GButton
                buttonType="primary"
                color={
                  activeBtn2 === true
                    ? `${theme.palette.primaryWhite.main}`
                    : `${theme.palette.primaryBlack.main}`
                }
                label={`Application Integration`}
                background={activeBtn2 === true ? "#A855F7" : "#F1F5F9"}
                onClickHandler={handleApplicationInBtn}
              />

              <GButton
                buttonType="primary"
                color={
                  activeBtn3 === true
                    ? `${theme.palette.primaryWhite.main}`
                    : `${theme.palette.primaryBlack.main}`
                }
                label={`Import from Logstash`}
                background={activeBtn3 === true ? "#A855F7" : "#F1F5F9"}
                // marginLeft="20px"
                onClickHandler={handleLogstashInBtn}
              />
            </StyledButton>

            {/* based on the button clicked, code is given on the condition*/}
            <div style={{ marginTop: "20px" }}>
              {/* gatewayBtn clicked*/}
              {gatewayInBtn === true && applicationInBtn === false ? (
                <>
                  <div>
                    {gateWaysConfigureClicked === true &&
                      GatewayInLists?.map((val: any, index: number) => (
                        <Card
                          key={index}
                          variant="outlined"
                          style={{
                            width: "90%",
                            height: "70px",
                            margin: "20px 10px",
                            padding: "10px",
                          }}
                        >
                          <Grid container>
                            <Grid size={{ xs: 1, md: 1, sm: 2 }}>
                              <Box
                                width={"50px"}
                                height={"50px"}
                                sx={{
                                  display: "flex",
                                  justifyContent: "left",
                                  alignItems: "left",
                                }}
                              >
                                {val?.icon}
                              </Box>
                            </Grid>

                            <Grid size={{ xs: 9, md: 8, sm: 6 }}>
                              <div style={{ padding: "5px 0px" }}>
                                <PrimaryTypography
                                  style={{
                                    fontWeight: 900,
                                  }}
                                >
                                  {val?.name}
                                </PrimaryTypography>
                                <SecondaryTypography>
                                  {val?.description}
                                </SecondaryTypography>
                              </div>
                            </Grid>
                            <Grid size={{ xs: 2, md: 3, sm: 4 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                }}
                              >
                                <div style={{ marginRight: "10px" }}>
                                  <GButton
                                    buttonType="primary"
                                    label={"Manage"}
                                    onClickHandler={() => {
                                      handleImportsIntegration(
                                        val?.clickableType
                                      );
                                    }}
                                    // onClickHandler={handleImportsIntegration}
                                  />
                                </div>
                                <div
                                  style={{
                                    marginBottom: "10px",
                                    position: "relative",
                                  }}
                                >
                                  {enableLoading[index] && (
                                    <GlobalCircularLoader
                                      open={integrationLoading}
                                    />
                                  )}
                                  {/* <Tooltip
                                    arrow
                                    title={`Click here to switch to ${
                                      val?.is_enable === true
                                        ? "InActive"
                                        : "Active"
                                    }`}
                                  >
                                    <Chip
                                      label={
                                        val?.is_enable === true
                                          ? "Active"
                                          : "Inactive"
                                        // val?.status === false
                                        //     ? "Inactive"
                                        //     : ""
                                      }
                                      sx={{
                                        backgroundColor:
                                          val?.is_enable === true
                                            ? "rgba(33, 150, 83, 0.08)"
                                            : "rgb(243 71 71 / 23%)",
                                        // : val?.status === false
                                        //     ? "rgb(243 71 71 / 23%)"
                                        //     : "",
                                        color:
                                          val?.is_enable === true
                                            ? "#219653"
                                            : "red",
                                        // : val?.status === false
                                        //     ? 'red'
                                        //     : "",
                                        fontFamily: "Inter-regular",
                                        fontSize: "0.6rem",
                                        alignItems: "center",
                                        marginTop: "0.6rem",
                                        width: "100%",
                                        height: "30px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        handleStatusBtn(val, index);
                                      }}
                                    />
                                  </Tooltip> */}
                                </div>
                              </div>
                            </Grid>
                          </Grid>
                        </Card>
                      ))}
                  </div>

                  {imprortConfigureClicked === true && (
                    <>
                      <div onClick={handleBackIntegration}>
                        <div style={{ margin: "1rem 0rem" }}>
                          <ArrowBackIosIcon
                            sx={{
                              fontSize: "0.75rem",
                              color: "#64748B",
                              cursor: "pointer",
                            }}
                          />
                          <span
                            style={{
                              cursor: "pointer",
                              color: "#64748B",
                              fontSize: "0.75rem",
                              fontFamily: "Inter-regular",
                            }}
                          >
                            Back
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "1rem",
                        }}
                      >
                        <PrimaryTypography
                          style={{
                            fontWeight: 900,
                          }}
                        >
                          {gateWaysClickableType === "AWS"
                            ? "AWS Gateway"
                            : gateWaysClickableType === "AZURE"
                            ? "Azure Gateway"
                            : gateWaysClickableType === "KONG"
                            ? "Kong Gateway"
                            : gateWaysClickableType === "GCP"
                            ? "GCP Gateway"
                            : gateWaysClickableType === "SWAGGER"
                            ? "Swagger Gateway"
                            : gateWaysClickableType === "APISIX"
                            ? "Apisix Gateway"
                            : ""}
                          {/* Api Gateway SDK */}
                        </PrimaryTypography>
                        <GsearchBar
                          onChange={(e: {
                            target: { value: React.SetStateAction<string> };
                          }) => setSearchQuery(e.target.value)}
                          placeholder={"Search Gateway"}
                          color="black"
                        />
                      </div>
                      <SecondaryTypography
                        style={{
                          color: `${theme.palette.teritiaryColor.main}`,
                        }}
                      >
                        The import process may take some time to complete
                      </SecondaryTypography>

                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {tableHeaders?.map((header: any) => (
                                <TableCell key={header?.key}>
                                  <div
                                    style={{
                                      fontSize: "0.6rem",
                                      fontFamily: "Inter-regular",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {" "}
                                    <PrimaryTypography>
                                      {header.label}
                                    </PrimaryTypography>
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody style={{ position: "relative" }}>
                            {filteredData?.length <= 0 && (
                              <GlobalCircularLoader open={loadingValue} />
                            )}

                            {(() => {
                              const filteredRows = paginator(
                                filteredData,
                                page,
                                5
                              )?.data?.filter(
                                (row: any) =>
                                  (row?.type === "AWS" &&
                                    gateWaysClickableType === "AWS") ||
                                  (row?.type === "AZURE" &&
                                    gateWaysClickableType === "AZURE") ||
                                  (row?.type === "KONG" &&
                                    gateWaysClickableType === "KONG") ||
                                  (row?.type === "GCP" &&
                                    gateWaysClickableType === "GCP") ||
                                  (row?.type === "SWAGGER" &&
                                    gateWaysClickableType === "SWAGGER") ||
                                  (row?.type === "APISIX" &&
                                    gateWaysClickableType === "APISIX")
                              );

                              if (!filteredRows || filteredRows.length === 0) {
                                return (
                                  <TableRow style={{ height: "22rem" }}>
                                    <TableCell colSpan={12}>
                                      <PrimaryTypography
                                        style={{
                                          color: `${theme.palette.teritiaryColor.main}`,
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        No data found.
                                      </PrimaryTypography>
                                    </TableCell>
                                  </TableRow>
                                );
                              }

                              return filteredRows.map((row: any) => (
                                <TableRow key={row?.id}>
                                  <TableCell
                                    style={{
                                      fontSize: "0.6rem",
                                      fontFamily: "Inter-regular",
                                      padding: "5px 16px",
                                    }}
                                  >
                                    {row?.type}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "0.6rem",
                                      fontFamily: "Inter-regular",
                                      padding: "5px 16px",
                                    }}
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell
                                    onClick={() => {
                                      handleClickOpen(row.import_status);
                                      setErrorData(row);
                                    }}
                                    style={{
                                      fontSize: "0.6rem",
                                      fontFamily: "Inter-regular",
                                      padding: "5px 16px",
                                    }}
                                  >
                                    {row.import_status === "" ? (
                                      <Box
                                        sx={{
                                          textAlign: "center",
                                          marginRight: "20px",
                                        }}
                                      >
                                        -
                                      </Box>
                                    ) : (
                                      <Chip
                                        label={
                                          row.import_status ===
                                          "INVALID_CREDENTIALS"
                                            ? "Error Occurred"
                                            : row.import_status === "SUCCESS"
                                            ? "Success"
                                            : row.import_status
                                        }
                                        sx={{
                                          backgroundColor:
                                            row.import_status === "SUCCESS"
                                              ? "rgba(33, 150, 83, 0.08)"
                                              : row.import_status ===
                                                "INVALID_CREDENTIALS"
                                              ? "rgb(243 71 71 / 23%)"
                                              : "",
                                          color:
                                            row.import_status === "SUCCESS"
                                              ? "#219653"
                                              : row.import_status ===
                                                "INVALID_CREDENTIALS"
                                              ? "red"
                                              : "black",
                                          fontFamily: "Inter-regular",
                                          fontSize: "0.6rem",
                                          alignItems: "center",
                                          marginTop: "0.6rem",
                                          cursor: "pointer",
                                          width: "70%",
                                          height: "30px",
                                        }}
                                        icon={
                                          row.import_status ===
                                          "INVALID_CREDENTIALS" ? (
                                            <Box>
                                              <Tooltip
                                                title={
                                                  "Please provide valid input"
                                                }
                                              >
                                                <InfoIcon
                                                  style={{
                                                    width: "15px",
                                                    height: "15px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </Tooltip>
                                            </Box>
                                          ) : undefined
                                        }
                                      />
                                    )}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "0.6rem",
                                      fontFamily: "Inter-regular",
                                      padding: "5px 16px",
                                    }}
                                  >
                                    {dateFormat(row.createdat)}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontSize: "0.6rem",
                                      fontFamily: "Inter-regular",
                                      padding: "5px 16px",
                                    }}
                                  >
                                    {row.createdby}
                                  </TableCell>
                                  <TableCell
                                    style={{ width: "8%", padding: "5px 16px" }}
                                  >
                                    {row.import_status ===
                                      "INVALID_CREDENTIALS" ||
                                    row.import_status === "SUCCESS" ? (
                                      ""
                                    ) : (
                                      <LinearProgress
                                        color="success"
                                        style={{
                                          width: "80%",
                                          height: "0.67rem",
                                        }}
                                      />
                                    )}
                                  </TableCell>
                                  <TableCell style={{ padding: "5px 16px" }}>
                                    <GButton
                                      background="#e2e3e5"
                                      color="black"
                                      label={`Manage Logs`}
                                      fontSize="0.6rem"
                                      onClickHandler={() => {
                                        handleLogsSteps();
                                        setTypeData(row?.type);
                                        setTypeNameData(row?.name);
                                        setIdData(row?.id);
                                        setEnable(row?.log_enable);
                                      }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <EditIcon
                                      style={{
                                        color: "#6c757d",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                      }}
                                      onClick={(e: any) => handleClick(e, row)}
                                    />
                                    <DeleteIcon
                                      style={{
                                        color: "#adb5bd",
                                        marginLeft: "2rem",
                                        cursor: "pointer",
                                        fontSize: "1rem",
                                      }}
                                    />
                                  </TableCell>
                                </TableRow>
                              ));
                            })()}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  )}

                  <Dialog
                    open={open}
                    onClose={handleCloseError}
                    sx={{
                      "& .MuiPaper-root": {
                        width: "450px",
                        marginTop: "4rem",
                      },
                    }}
                    PaperProps={{
                      sx: {
                        backgroundColor: "rgb(226, 232, 240)",
                      },
                    }}
                    BackdropProps={{
                      style: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  >
                    <div style={{ padding: "1rem 1.5rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ fontSize: "0.8rem" }}>Error Occured</p>

                        <h1
                          style={{ fontSize: "0.8rem", cursor: "pointer" }}
                          onClick={() => {
                            handleCloseError();
                          }}
                        >
                          X
                        </h1>
                      </div>

                      {types === "INVALID_CREDENTIALS" && (
                        <div>
                          <div
                            style={{
                              height: "285px",
                              width: "400px",
                              overflow: "auto",
                              backgroundColor: "rgb(191 60 60 / 17%)",
                              padding: "1.5rem 1rem",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "Inter-regular",
                                fontSize: "0.6rem",
                              }}
                            >
                              {errorData?.error_message === null
                                ? "No one Error is Found "
                                : errorData?.error_message}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              marginTop: "1rem",
                            }}
                          >
                            <GButton
                              buttonType="primary"
                              label={`OK`}
                              onClickHandler={() => {
                                handleCloseError();
                              }}
                              dataTest="save-project-btn"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {types === "enable" && <div>test</div>}
                  </Dialog>

                  {filteredData.length === 0 ? (
                    <div></div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        // padding: "4rem 0rem",
                        // paddingBottom:"5rem",
                        padding: "3.6rem",
                      }}
                    >
                      {/* <Pagination
                        count={count}
                        page={page}
                        onChange={handleChange}
                        color="secondary"
                        shape="rounded"
                        // sx={{fontSize:"0.6rem" }}
                        sx={{
                          "& .MuiPaginationItem-root": {
                            width: "24px",
                            height: "24px",
                            minWidth: "24px",
                            minHeight: "24px",
                            fontSize: "0.6rem",
                          },
                        }}
                      /> */}
                    </div>
                  )}

                  {/* <imprtLogsSteps /> */}
                  <ImportLogsSteps
                    open={logsDrawer}
                    nameData={typeNameData}
                    types={typeData}
                    idData={idData}
                    enables={enable}
                    onClose={handleCloseLogSteps}
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              {/* applicationBtn clicked*/}
              {applicationInBtn === true && gatewayInBtn === false ? (
                <>
                  <div>
                    <PrimaryTypography
                      style={{
                        fontWeight: 900,
                      }}
                    >
                      Application Integration
                    </PrimaryTypography>
                    <SecondaryTypography
                      style={{
                        color: `${theme.palette.teritiaryColor.main}`,
                      }}
                    >
                      Application integration connects different software
                      systems for seamless data exchange and communication.
                    </SecondaryTypography>
                  </div>
                  <div>
                    {applicationInLists?.map((val: any, index: number) => (
                      <Card
                        key={index}
                        variant="outlined"
                        style={{
                          width: "90%",
                          height: "70px",
                          margin: "20px 10px",
                          padding: "10px",
                        }}
                      >
                        <Grid container>
                          <Grid size={{ xs: 1, md: 1, sm: 2 }}>
                            <Box
                              width={"50px"}
                              height={"50px"}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "left",
                              }}
                            >
                              {val?.icon}
                            </Box>
                          </Grid>
                          <Grid size={{ xs: 9, md: 8, sm: 6 }}>
                            <div style={{ padding: "5px 0px" }}>
                              <PrimaryTypography
                                style={{
                                  fontWeight: 900,
                                }}
                              >
                                {val?.name}
                              </PrimaryTypography>
                              <SecondaryTypography>
                                {val?.description}
                              </SecondaryTypography>
                            </div>
                          </Grid>
                          <Grid size={{ xs: 2, md: 3, sm: 4 }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                              }}
                            >
                              <div style={{ marginRight: "10px" }}>
                                <GButton
                                  buttonType="primary"
                                  label={"Configure"}
                                  onClickHandler={(event: any) => {
                                    handleConfigureBtn(event, val);
                                  }}
                                />
                              </div>
                              <div>
                                {val?.name === "Splunk Siem" &&
                                splunkCount > 0 ? (
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      position: "relative",
                                    }}
                                  >
                                    {enableLoading[index] && (
                                      <GlobalCircularLoader
                                        open={integrationLoading}
                                      />
                                    )}
                                    <Tooltip
                                      arrow
                                      title={`Click here to switch to ${
                                        val?.is_enable === true
                                          ? "Disable"
                                          : "Enable"
                                      }`}
                                    >
                                      <Chip
                                        label={
                                          val?.is_enable === true
                                            ? "Enable"
                                            : // : "Disable"
                                            val?.is_enable === false
                                            ? "Disable"
                                            : ""
                                        }
                                        sx={{
                                          backgroundColor:
                                            val?.is_enable === true
                                              ? "rgba(33, 150, 83, 0.08)"
                                              : // : "rgb(243 71 71 / 23%)",
                                              val?.is_enable === false
                                              ? "rgb(243 71 71 / 23%)"
                                              : "",
                                          color:
                                            val?.is_enable === true
                                              ? "#219653"
                                              : // : 'red',
                                              val?.is_enable === false
                                              ? "red"
                                              : "",
                                          fontFamily: "Inter-regular",
                                          fontSize: "0.6rem",
                                          alignItems: "center",
                                          marginTop: "0.6rem",
                                          width: "100%",
                                          height: "30px",
                                          cursor: "pointer",
                                        }}
                                        // onClick={() => {
                                        //     handleStatusBtn(val, index)
                                        // }}
                                      />
                                    </Tooltip>
                                  </div>
                                ) : val?.name === "Service Now" &&
                                  serviceNowCount > 0 ? (
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      position: "relative",
                                    }}
                                  >
                                    {enableLoading[index] && (
                                      <GlobalCircularLoader
                                        open={integrationLoading}
                                      />
                                    )}
                                    <Tooltip
                                      arrow
                                      title={`Click here to switch to ${
                                        val?.is_enable === true
                                          ? "Disable"
                                          : "Enable"
                                      }`}
                                    >
                                      <Chip
                                        label={
                                          val?.is_enable === true
                                            ? "Enable"
                                            : // : "Disable"
                                            val?.is_enable === false
                                            ? "Disable"
                                            : ""
                                        }
                                        sx={{
                                          backgroundColor:
                                            val?.is_enable === true
                                              ? "rgba(33, 150, 83, 0.08)"
                                              : //         : "rgb(243 71 71 / 23%)",
                                              val?.is_enable === false
                                              ? "rgb(243 71 71 / 23%)"
                                              : "",
                                          color:
                                            val?.is_enable === true
                                              ? "#219653"
                                              : // : 'red',
                                              val?.is_enable === false
                                              ? "red"
                                              : "",
                                          fontFamily: "Inter-regular",
                                          fontSize: "0.6rem",
                                          alignItems: "center",
                                          marginTop: "0.6rem",
                                          width: "100%",
                                          height: "30px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          handleStatusBtn(val, index);
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                ) : val?.name === "Pager Duty" &&
                                  pagerCount > 0 ? (
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      position: "relative",
                                    }}
                                  >
                                    {enableLoading[index] && (
                                      <GlobalCircularLoader
                                        open={integrationLoading}
                                      />
                                    )}
                                    <Tooltip
                                      arrow
                                      title={`Click here to switch to ${
                                        val?.is_enable === true
                                          ? "Disable"
                                          : "Enable"
                                      }`}
                                    >
                                      <Chip
                                        label={
                                          val?.is_enable === true
                                            ? "Enable"
                                            : // : "Disable"
                                            val?.is_enable === false
                                            ? "Disable"
                                            : ""
                                        }
                                        sx={{
                                          backgroundColor:
                                            val?.is_enable === true
                                              ? "rgba(33, 150, 83, 0.08)"
                                              : //         : "rgb(243 71 71 / 23%)",
                                              val?.is_enable === false
                                              ? "rgb(243 71 71 / 23%)"
                                              : "",
                                          color:
                                            val?.is_enable === true
                                              ? "#219653"
                                              : // : 'red',
                                              val?.is_enable === false
                                              ? "red"
                                              : "",
                                          fontFamily: "Inter-regular",
                                          fontSize: "0.6rem",
                                          alignItems: "center",
                                          marginTop: "0.6rem",
                                          width: "100%",
                                          height: "30px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          handleStatusBtn(val, index);
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                ) : val?.name === "Jira" && jiraCount > 0 ? (
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      position: "relative",
                                    }}
                                  >
                                    {enableLoading[index] && (
                                      <GlobalCircularLoader
                                        open={integrationLoading}
                                      />
                                    )}
                                    <Tooltip
                                      arrow
                                      title={`Click here to switch to ${
                                        val?.is_enable === true
                                          ? "Disable"
                                          : "Enable"
                                      }`}
                                    >
                                      <Chip
                                        label={
                                          val?.is_enable === true
                                            ? "Enable"
                                            : // : "Disable"
                                            val?.is_enable === false
                                            ? "Disable"
                                            : ""
                                        }
                                        sx={{
                                          backgroundColor:
                                            val?.is_enable === true
                                              ? "rgba(33, 150, 83, 0.08)"
                                              : //         : "rgb(243 71 71 / 23%)",
                                              val?.is_enable === false
                                              ? "rgb(243 71 71 / 23%)"
                                              : "",
                                          color:
                                            val?.is_enable === true
                                              ? "#219653"
                                              : // : 'red',
                                              val?.is_enable === false
                                              ? "red"
                                              : "",
                                          fontFamily: "Inter-regular",
                                          fontSize: "0.6rem",
                                          alignItems: "center",
                                          marginTop: "0.6rem",
                                          width: "100%",
                                          height: "30px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          handleStatusBtn(val, index);
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Card>
                    ))}
                  </div>
                  <div>
                    {/* configureBtn clicked, the drawer code is here respective to the selectedVal*/}
                    {configureBtnClicked === true && (
                      <div>
                        <Drawer
                          anchor="right"
                          open={configureBtnClicked}
                          onClose={handleConfigurePopupClose}
                        >
                          <Box
                            sx={{
                              width: "500px",
                              padding: "20px",
                              position: "relative",
                            }}
                          >
                            <GlobalCircularLoader open={integrationLoading} />
                            <div onClick={handleConfigurePopupClose}>
                              <ArrowBackIosIcon
                                sx={{
                                  fontSize: "0.6rem",
                                  color: "#64748B",
                                  cursor: "pointer",
                                }}
                              />
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "#64748B",
                                  fontSize: "0.6rem",
                                  fontFamily: "Inter-Regular",
                                }}
                              >
                                Back
                              </span>
                            </div>
                            <div style={{ padding: "10px" }}>
                              <>
                                <div style={{ display: "flex" }}>
                                  <div>
                                    {selectedVal === "Splunk Siem" ? (
                                      <Image
                                        src={SplunkImage1}
                                        alt=""
                                        style={{
                                          width: "60px",
                                          height: "33px",
                                        }}
                                      />
                                    ) : selectedVal === "Service Now" ? (
                                      <Image
                                        src={ServiceNowImage}
                                        alt=""
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    ) : selectedVal === "Pager Duty" ? (
                                      <Image
                                        src={dutyImage}
                                        alt=""
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    ) : selectedVal === "Jira" ? (
                                      <Image
                                        src={jiraImage}
                                        alt=""
                                        style={{
                                          width: "25px",
                                          height: "25px",
                                          marginRight: "10px",
                                          marginLeft: "10px",
                                        }}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div>
                                    <PrimaryTypography
                                      style={{
                                        fontWeight: 800,
                                        marginTop: "8px",
                                      }}
                                    >
                                      {selectedVal === "Splunk Siem"
                                        ? "Splunk Siem"
                                        : selectedVal === "Service Now"
                                        ? "Service Now"
                                        : selectedVal === "Pager Duty"
                                        ? "Pager Duty"
                                        : selectedVal === "Jira"
                                        ? "Jira"
                                        : ""}
                                    </PrimaryTypography>
                                  </div>
                                </div>
                                <div style={{ padding: "10px" }}>
                                  <div>
                                    <SecondaryTypography
                                      style={{
                                        fontWeight: 700,
                                      }}
                                    >
                                      Description
                                    </SecondaryTypography>
                                  </div>
                                  <div>
                                    <SecondaryTypography
                                      style={{
                                        color: `${theme.palette.teritiaryColor.main}`,
                                        marginTop: "5px",
                                      }}
                                    >
                                      {selectedVal === "Splunk Siem"
                                        ? "Splunk SIEM provides robust API capabilities for integrating security data and automating responses to threats."
                                        : selectedVal === "Service Now"
                                        ? "ServiceNow provides comprehensive APIs that empower seamless integration and automation across enterprise workflows and service management processes."
                                        : selectedVal === "Pager Duty"
                                        ? "PagerDuty helps you bring together the right people with the right information in real time. Address the unplanned, critical work that your teams aren’t prepared for"
                                        : selectedVal === "Jira"
                                        ? "Jira is the #1 agile project management tool used by teams to plan, track, release and support world-class software with confidence"
                                        : ""}
                                    </SecondaryTypography>
                                  </div>
                                </div>
                                <div>
                                  {selectedVal === "Splunk Siem" &&
                                  splunkCount > 0 &&
                                  (splunkError?.trim() !== "" ||
                                    errorValue !== "") ? (
                                    <div style={{ padding: "10px" }}>
                                      <Accordion
                                        style={{
                                          boxShadow: "none",
                                          background: `rgb(243 71 71 / 23%)`,
                                        }}
                                      >
                                        <AccordionSummary
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                          expandIcon={
                                            <ExpandMoreIcon
                                              style={{ color: "red" }}
                                            />
                                          }
                                        >
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 600,
                                              color: "red",
                                            }}
                                          >
                                            Error
                                          </SecondaryTypography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <SecondaryTypography
                                            style={{
                                              marginTop: "-20px",
                                            }}
                                          >
                                            {splunkError}
                                          </SecondaryTypography>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  ) : selectedVal === "Service Now" &&
                                    serviceNowCount > 0 &&
                                    (serviceNowError?.trim() !== "" ||
                                      errorValue !== "") &&
                                    serviceNowError?.trim() !== null ? (
                                    <div style={{ padding: "10px" }}>
                                      <Accordion
                                        style={{
                                          boxShadow: "none",
                                          background: `rgb(243 71 71 / 23%)`,
                                        }}
                                      >
                                        <AccordionSummary
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                          expandIcon={
                                            <ExpandMoreIcon
                                              style={{ color: "red" }}
                                            />
                                          }
                                        >
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 600,
                                              color: "red",
                                            }}
                                          >
                                            Error
                                          </SecondaryTypography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <SecondaryTypography
                                            style={{
                                              marginTop: "-20px",
                                            }}
                                          >
                                            {serviceNowError}
                                          </SecondaryTypography>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  ) : selectedVal === "Pager Duty" &&
                                    // serviceNowCount > 0 &&
                                    pagerCount > 0 &&
                                    // serviceNowError?.trim() !== "" &&
                                    (pagerError?.trim() !== "" ||
                                      errorValue !== "") ? (
                                    <div style={{ padding: "10px" }}>
                                      <Accordion
                                        style={{
                                          boxShadow: "none",
                                          background: `rgb(243 71 71 / 23%)`,
                                        }}
                                      >
                                        <AccordionSummary
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                          expandIcon={
                                            <ExpandMoreIcon
                                              style={{ color: "red" }}
                                            />
                                          }
                                        >
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 600,
                                              color: "red",
                                            }}
                                          >
                                            Error
                                          </SecondaryTypography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <SecondaryTypography
                                            style={{
                                              marginTop: "-20px",
                                            }}
                                          >
                                            {/* {serviceNowError} */}
                                            {errorValue || pagerError}
                                          </SecondaryTypography>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  ) : selectedVal === "Jira" &&
                                    // serviceNowCount > 0 &&
                                    jiraCount > 0 &&
                                    // serviceNowError?.trim() !== "" &&
                                    (jiraError?.trim() !== "" ||
                                      errorValue !== "") ? (
                                    <div style={{ padding: "10px" }}>
                                      <Accordion
                                        style={{
                                          boxShadow: "none",
                                          background: `rgb(243 71 71 / 23%)`,
                                        }}
                                      >
                                        <AccordionSummary
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                          expandIcon={
                                            <ExpandMoreIcon
                                              style={{ color: "red" }}
                                            />
                                          }
                                        >
                                          <SecondaryTypography
                                            style={{
                                              fontWeight: 600,
                                              color: "red",
                                            }}
                                          >
                                            Error
                                          </SecondaryTypography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <SecondaryTypography
                                            style={{
                                              marginTop: "-20px",
                                            }}
                                          >
                                            {/* {serviceNowError} */}
                                            {errorValue || jiraError}
                                          </SecondaryTypography>
                                        </AccordionDetails>
                                      </Accordion>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0px 10px",
                                  }}
                                >
                                  <div>
                                    <SecondaryTypography
                                      style={{
                                        fontWeight: 800,
                                      }}
                                    >
                                      Configuration
                                    </SecondaryTypography>
                                    <SecondaryTypography
                                      style={{
                                        color: `${theme.palette.teritiaryColor.main}`,
                                      }}
                                    >
                                      {`Fill in the details below to configure ${selectedVal}`}
                                    </SecondaryTypography>
                                  </div>
                                  <div>
                                    <GButton
                                      buttonType="secondary"
                                      label={"Test"}
                                    />
                                  </div>
                                </div>
                              </>
                              <div>
                                {selectedVal === "Splunk Siem" ? (
                                  <>
                                    <div style={{ padding: "0px 10px" }}>
                                      <div>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Url
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={splunkValues?.url}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleSplunkValues(
                                              "url",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorFieldApiUrl}
                                          errorHandler={(error: any) =>
                                            setErrorFieldApiUrl(error)
                                          }
                                        />
                                      </div>
                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Key
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={splunkValues?.api_key}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleSplunkValues(
                                              "api_key",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorFieldApiKey}
                                          errorHandler={(error: any) =>
                                            setErrorFieldApiKey(error)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : selectedVal === "Service Now" ? (
                                  <>
                                    <div style={{ padding: "0px 10px" }}>
                                      <div>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Key
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={serviceNowValues?.api_key}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleServiceNowValues(
                                              "api_key",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorApiKey}
                                          errorHandler={(error: any) =>
                                            setErrorApiKey(error)
                                          }
                                        />
                                      </div>

                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Url
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={serviceNowValues?.api_url}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleServiceNowValues(
                                              "api_url",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorApiUrl}
                                          errorHandler={(error: any) =>
                                            setErrorApiUrl(error)
                                          }
                                        />
                                      </div>

                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Version
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={serviceNowValues?.api_version}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleServiceNowValues(
                                              "api_version",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorVersion}
                                          errorHandler={(error: any) =>
                                            setErrorVersion(error)
                                          }
                                        />
                                      </div>
                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Table Name
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={
                                            serviceNowValues?.api_table_name
                                          }
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleServiceNowValues(
                                              "api_table_name",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorApiTableName}
                                          errorHandler={(error: any) =>
                                            setErrorApiTableName(error)
                                          }
                                        />
                                      </div>
                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Incident Table Name
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={
                                            serviceNowValues?.incident_table_name
                                          }
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleServiceNowValues(
                                              "incident_table_name",
                                              e.target.value
                                            );
                                          }}
                                          onKeyUp={(event: any) => {
                                            if (event?.key === "Enter") {
                                              handleApplicationInValidation();
                                            }
                                          }}
                                          error={errorIncidentTableName}
                                          errorHandler={(error: any) =>
                                            setErrorIncidentTableName(error)
                                          }
                                        />
                                      </div>

                                      <div>
                                        <Accordion
                                          style={{
                                            background: "transparent",
                                            boxShadow: "none",
                                          }}
                                        >
                                          <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            expandIcon={<ExpandMoreIcon />}
                                            style={{ marginLeft: "-16px" }}
                                            // onClick={()=>{labelsHandler()}}
                                          >
                                            <div>
                                              <SecondaryTypography
                                                style={{
                                                  fontWeight: 600,
                                                }}
                                                onClick={() => {
                                                  setFieldMatchClicked(
                                                    !fieldMatchClicked
                                                  );
                                                }}
                                              >
                                                Field Matching
                                              </SecondaryTypography>
                                            </div>
                                          </AccordionSummary>
                                          <AccordionDetails
                                            sx={{ marginTop: "-25px" }}
                                          >
                                            <Grid container>
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Method
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.method
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "method",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorMethod}
                                                  errorHandler={(error: any) =>
                                                    setErrorMethod(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Url
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={serviceNowValues?.url}
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "url",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorUrl}
                                                  errorHandler={(error: any) =>
                                                    setErrorUrl(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Project Name
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.project_name
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "project_name",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorProjectName}
                                                  errorHandler={(error: any) =>
                                                    setErrorProjectName(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Stage Name
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.stage_name
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "stage_name",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorStageName}
                                                  errorHandler={(error: any) =>
                                                    setErrorStageName(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Group Name
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.group_name
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "group_name",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorGroupName}
                                                  errorHandler={(error: any) =>
                                                    setErrorGroupName(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Unique Id
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.unique_id
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "unique_id",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorUniqueId}
                                                  errorHandler={(error: any) =>
                                                    setErrorUniqueId(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Operation Name
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.operation_name
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "operation_name",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorOperationName}
                                                  errorHandler={(error: any) =>
                                                    setErrorOperationName(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                            <Grid
                                              container
                                              sx={{ marginTop: "5px" }}
                                            >
                                              <Grid size={{ xs: 3 }}>
                                                <SecondaryTypography
                                                  style={{
                                                    fontWeight: 600,
                                                    color: `${theme.palette.teritiaryColor.main}`,
                                                    margin: "17px 0px 0px 0px",
                                                  }}
                                                >
                                                  Status
                                                </SecondaryTypography>
                                              </Grid>
                                              <Grid size={{ xs: 8 }}>
                                                <GInput
                                                  background="tranparent"
                                                  type="text"
                                                  fullWidth={true}
                                                  color="black"
                                                  radius="0px"
                                                  border="0 0 0 0.2px black"
                                                  value={
                                                    serviceNowValues?.status
                                                  }
                                                  width="100%"
                                                  onChangeHandler={(e: any) => {
                                                    handleServiceNowValues(
                                                      "status",
                                                      e.target.value
                                                    );
                                                  }}
                                                  //   disabledVal
                                                  onKeyUp={(event: any) => {
                                                    if (
                                                      event?.key === "Enter"
                                                    ) {
                                                      handleApplicationInValidation();
                                                    }
                                                  }}
                                                  error={errorStatus}
                                                  errorHandler={(error: any) =>
                                                    setErrorStatus(error)
                                                  }
                                                />
                                              </Grid>
                                            </Grid>
                                          </AccordionDetails>
                                        </Accordion>
                                      </div>
                                    </div>
                                  </>
                                ) : selectedVal === "Pager Duty" ? (
                                  <>
                                    <div style={{ padding: "0px 10px" }}>
                                      <div>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Email
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={pagerValues?.email}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handlePagerValues(
                                              "email",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorPagerApiUrl}
                                          errorHandler={(error: any) =>
                                            setErrorPagerApiUrl(error)
                                          }
                                        />
                                      </div>
                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Api Key
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={pagerValues?.api_key}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handlePagerValues(
                                              "api_key",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorPagerApiKey}
                                          errorHandler={(error: any) =>
                                            setErrorPagerApiKey(error)
                                          }
                                        />
                                      </div>

                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Escalation Id
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={pagerValues?.escalation_id}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handlePagerValues(
                                              "escalation_id",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorPagerApiKey}
                                          errorHandler={(error: any) =>
                                            setErrorPagerApiKey(error)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : selectedVal === "Jira" ? (
                                  <>
                                    <div style={{ padding: "0px 10px" }}>
                                      <div>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Email
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={jiraValues?.email}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleJiraValues(
                                              "email",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorJiraValues}
                                          errorHandler={(error: any) =>
                                            setErrorJiraValues(error)
                                          }
                                        />
                                      </div>
                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Token
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={jiraValues?.token}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleJiraValues(
                                              "token",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorTokenValues}
                                          errorHandler={(error: any) =>
                                            setErrorTokenValues(error)
                                          }
                                        />
                                      </div>

                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          URL
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={jiraValues?.url}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleJiraValues(
                                              "url",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorUrlValues}
                                          errorHandler={(error: any) =>
                                            setErrorUrlValues(error)
                                          }
                                        />
                                      </div>

                                      <div style={{ marginTop: "10px" }}>
                                        <SecondaryTypography
                                          style={{
                                            fontWeight: 600,
                                          }}
                                        >
                                          Project Key
                                        </SecondaryTypography>
                                        <GInput
                                          background="tranparent"
                                          type="text"
                                          fullWidth={true}
                                          color="black"
                                          radius="0px"
                                          border="0 0 0 0.2px black"
                                          value={jiraValues?.projectKey}
                                          width="100%"
                                          onChangeHandler={(e: any) => {
                                            handleJiraValues(
                                              "projectKey",
                                              e.target.value
                                            );
                                          }}
                                          // onKeyUp={(event: any) => {
                                          //   if (event?.key === "Enter") {
                                          //     handleApplicationInValidation();
                                          //   }
                                          // }}
                                          error={errorProjectKeyValues}
                                          errorHandler={(error: any) =>
                                            setErrorProjectkeyValues(error)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div style={{ marginTop: "20px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "end",
                                  }}
                                >
                                  <div>
                                    <GButton
                                      buttonType="primary"
                                      label={`${translate(
                                        "apiManageHeader.CANCEL"
                                      )}`}
                                      color={`${theme.palette.primaryBlack.main}`}
                                      background="transparent"
                                      onClickHandler={handleConfigurePopupClose}
                                    />
                                  </div>
                                  <div style={{ marginLeft: "10px" }}>
                                    <GButton
                                      buttonType="primary"
                                      label={`Configure`}
                                      onClickHandler={handleConfigureSubmit}
                                      // onClickHandler={handleApplicationInValidation}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Box>
                        </Drawer>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div>
              {logstashInBtn === true && (
                <div>
                  <LogSlash />
                </div>
              )}
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}
