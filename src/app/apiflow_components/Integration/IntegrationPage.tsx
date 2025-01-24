import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
} from "@mui/material";
import {
  PrimaryTypography,
  SecondaryTypography,
} from "@/app/hooks/operations/useOperationHelpers";
import GlobalTextField from "@/app/apiflow_components/global/GlobalTextField";
import theme from "@/Theme/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GButton from "@/app/apiflow_components/global/GButton";
import toast from "react-hot-toast";
import {
  CreateIntegration,
  GetIntegrationByProjectIdandType,
  GetIntegrationByTenantId,
  GetIntegrationByTenantIdandType,
  integrationReducer,
  IntegrationsTest,
  UpdateIntegration,
} from "@/app/Redux/apiManagement/integrationReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import ServiceNowImage from "@/app/Assests/images/serviceNow.webp";
// import SplunkImage1 from "../../../Assests/images/Splunk-Symbol1.png";
import SplunkImage1 from "@/app/Assests/images/Splunk-Symbol1.webp";
import GlobalButton from "@/app/apiflow_components/global/GButton";
import { useAlert } from "@/context/alertContext";
import { setRemoveTabs } from "@/app/Redux/tabReducer";
import GlobalCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import Image from "next/image";

function IntegrationPage(props: any) {
  const { id, onCloseHandler } = props;

  const dispatch = useDispatch<any>();

  const { showAlert } = useAlert();

  const { integrationResponse, integrationLoading, testIntegrationLoading } =
    useSelector<RootStateType, integrationReducer>(
      (state) => state.apiManagement.integration
    );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const type =
    id === "integration_page_service_now"
      ? "SERVICE_NOW"
      : id === "integration_page_splunk_siem"
      ? "SPLUNK_SIEM"
      : id === "integration_page_jira"
      ? "JIRA"
      : id === "integration_page_pager_duty"
      ? "PAGER_DUTY"
      : "";

  const [selectedVal, setSelectedVal] = useState("");
  const [error, setError] = useState<any>({});
  const [fieldMatchClicked, setFieldMatchClicked] = useState(false);
  const [errorValue, setErrorValue] = useState<any>();

  const [splunkValues, setSplunkValues] = useState({
    id: "",
    url: "",
    api_key: "",
  });

  const [pagerValues, setPagerValues] = useState({
    email: "",
    api_key: "",
    escalation_id: "",
    id: "",
  });

  const [jiraValues, setJiraValues] = useState({
    email: "",
    token: "",
    url: "",
    projectKey: "",
    id: "",
  });

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
    id: "",
  });

  const handleServiceNowValues = (field: any, event: any) => {
    setServiceNowValues((prevValues) => ({
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

  const handleApplicationInValidation = () => {
    if (id === "integration_page_splunk_siem") {
      const errors: any = {};

      // Check for empty values
      if (splunkValues?.url?.trim() === "") {
        errors.api_url = "API URL is required";
      } else if (/\s/.test(splunkValues?.url)) {
        errors.api_url = "Spaces are not allowed in API URL";
      }

      if (splunkValues?.api_key?.trim() === "") {
        errors.api_key = "API Key is required";
      } else if (/\s/.test(splunkValues?.api_key)) {
        errors.api_key = "Spaces are not allowed in API Key";
      }

      // If there are any errors, set them and return false
      if (Object.keys(errors).length > 0) {
        setError({
          ...error,
          ...errors,
        });
        return false;
      }

      // All validations passed
      return true;
    }

    if (id === "integration_page_service_now") {
      const errors: any = {};

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
        errors.api_key = "Api Key is required";
      } else if (hasNoSpaceApiKey) {
        errors.api_key = "Spaces are not allowed in Api Key";
      }

      if (hasValidationApiUrl) {
        errors.api_url = "Api Url is required";
      } else if (!hasNoSpaceApiUrl) {
        errors.api_url = "Invalid URL format";
      }

      if (hasValidationApiTablename) {
        errors.api_table_name = "Api Table Name is required";
      } else if (hasNoSpaceApiTablename) {
        errors.api_table_name = "Spaces are not allowed in Api Table Name";
      }

      if (hasValidationIncidentTablename) {
        errors.incident_table_name = "Incident Table Name is required";
      } else if (hasNoSpaceIncidentTablename) {
        errors.incident_table_name =
          "Spaces are not allowed in Incident Table Name";
      }

      if (hasValidationMethod) {
        errors.method = "Method is required";
      } else if (hasNoSpaceMethod) {
        errors.method = "Spaces are not allowed in Method";
      }

      if (hasValidationUrl) {
        errors.url = "Url is required";
      } else if (hasNoSpaceUrl) {
        errors.url = "Spaces are not allowed in Url";
      }

      if (hasValidationProjectName) {
        errors.project_name = "Project Name is required";
      } else if (hasNoSpaceProjectName) {
        errors.project_name = "Spaces are not allowed in Project Name";
      }

      if (hasValidationStageName) {
        errors.stage_name = "Stage Name is required";
      } else if (hasNoSpaceStageName) {
        errors.stage_name = "Spaces are not allowed in Stage Name";
      }

      if (hasValidationGroupName) {
        errors.group_name = "Group Name is required";
      } else if (hasNoSpaceGroupName) {
        errors.group_name = "Spaces are not allowed in Group Name";
      }

      if (hasValidationUniqueId) {
        errors.unique_id = "Unique Id is required";
      } else if (hasNoSpaceUniqueId) {
        errors.unique_id = "Spaces are not allowed in Unique Id";
      }

      if (hasValidationOperationName) {
        errors.operation_name = "Operation Name is required";
      } else if (hasNoSpaceOperationName) {
        errors.operation_name = "Spaces are not allowed in Operation Name";
      }

      if (hasValidatioStatus) {
        errors.status = "Status is required";
      } else if (hasNoSpaceStatus) {
        errors.status = "Spaces are not allowed in Status";
      }

      if (hasValidationVersion) {
        errors.api_key = "Api Version is required";
      } else if (hasNoSpaceVersion) {
        errors.api_key = "Spaces are not allowed in Api Version";
      }

      if (Object.keys(errors).length > 0) {
        setError(errors); // Set all errors at once
        return false;
      } else {
        return true; // No errors, validation passed
      }
    }

    if (id === "integration_page_pager_duty") {
      const errors: any = {};
      //for empty value
      const hasValidationEmail = pagerValues?.email?.trim() === "";
      //containing space
      const hasNoSpaceEmail = /\s/.test(pagerValues?.email);
      const hasemailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        pagerValues?.email
      );

      const hasValidationApiKey = pagerValues?.api_key?.trim() === "";
      const hasNoSpaceApiKey = /\s/.test(pagerValues?.api_key);

      const hasValidationEscalationId =
        pagerValues?.escalation_id?.trim() === "";
      const hasNoSpaceEscalationId = /\s/.test(pagerValues?.escalation_id);

      if (hasValidationEmail) {
        errors.email = "Mail Id is required";
      } else if (hasNoSpaceEmail) {
        errors.email = "Spaces are not allowed";
      } else if (!hasemailRegex) {
        errors.email = "Invalid Mail format";
      } else if (hasValidationApiKey) {
        errors.api_key = "Api Key is required";
      } else if (hasNoSpaceApiKey) {
        errors.api_key = "Spaces are not allowed";
      } else if (hasValidationEscalationId) {
        errors.escalation_id = "Escalation Id is required";
      } else if (hasNoSpaceEscalationId) {
        errors.escalation_id = "Spaces are not allowed";
      }

      if (Object.keys(errors).length > 0) {
        setError(errors); // Set all errors at once
        return false;
      } else {
        return true; // No errors, validation passed
      }
    }

    if (id === "integration_page_jira") {
      const errors: any = {};
      //for empty value
      const hasValidationEmail = jiraValues?.email?.trim() === "";
      //containing space
      const hasNoSpaceEmail = /\s/.test(jiraValues?.email);
      const hasemailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(jiraValues.email);

      const hasValidationToken = jiraValues?.token?.trim() === "";
      const hasNoSpaceToken = /\s/.test(jiraValues?.token);

      const hasValidationUrl = jiraValues?.url?.trim() === "";
      const hasNoSpaceUrl = /\s/.test(jiraValues?.url);
      // const hasValidateUrl = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/)?$/.test(jiraValues.url);
      const hasValidateUrl =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[\w\/\-]*)*$/.test(
          jiraValues.url
        );

      const hasValidationProjectUrl = jiraValues?.projectKey?.trim() === "";
      const hasNoSpaceProjectUrl = /\s/.test(jiraValues?.projectKey);

      if (hasValidationEmail) {
        errors.email = "Email is required";
      } else if (hasNoSpaceEmail) {
        errors.email = "Spaces are not allowed in Email";
      } else if (!hasemailRegex) {
        errors.email = "Invalid Email format";
      } else if (hasValidationToken) {
        errors.token = "Token is Required";
      } else if (hasNoSpaceToken) {
        errors.token = "Spaces are not allowed";
      } else if (hasValidationUrl) {
        errors.url = "Url is Required";
      } else if (hasNoSpaceUrl) {
        errors.url = "Spaces are not allowed";
      } else if (!hasValidateUrl) {
        errors.url = "Invalid Url";
      } else if (hasValidationProjectUrl) {
        errors.projectKey = "ProjectKey is required";
      } else if (hasNoSpaceProjectUrl) {
        errors.projectKey = "Spaces are not allowed";
      }

      if (Object.keys(errors).length > 0) {
        setError(errors); // Set all errors at once
        return false;
      } else {
        return true; // No errors, validation passed
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

    return false;
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
        }
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  };

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
        email: "",
        escalation_id: "",
        project_id: "null",
      };

      let serviceNowDataUpdate = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        type: "SERVICE_NOW",
        id: serviceNowValues?.id,
        url: api_url.trim(),
        api_key: serviceNowValues?.api_key,
        servicenow_tblname: serviceNowValues?.api_table_name,
        incident_tblname: serviceNowValues?.incident_table_name,
        json_configuration: stringifyVal,
        is_enable: true,
        email: "",
        escalation_id: "",
        project_id: "null",
      };

      if (serviceNowValues?.id) {
        //update api
        dispatch(UpdateIntegration(serviceNowDataUpdate))
          .unwrap()
          .then((updateRes: any) => {
            showAlert(
              "Success",
              "",
              "instance Updated",
              "",
              () => console.log("Alert closed"),
              () => console.log("Alert clicked")
            );
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
            toast?.success("ServiceNow Instance created Successfully!");
            setErrorValue("");
            showAlert(
              "Success",
              "",
              "instance Created",
              "",
              () => console.log("Alert closed"),
              () => console.log("Alert clicked")
            );
            dispatch(setRemoveTabs("integration_page_servicenow"));
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      }
    }
  };

  const handleSplunkSiem = () => {
    const validationCheck = handleApplicationInValidation();

    if (validationCheck) {
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
        escalation_id: "",
        project_id: "null",
      };

      let splunkDataUpdata = {
        // user_id: userProfile?.user.user_id,
        type: "SPLUNK_SIEM",
        id: splunkValues?.id,
        url: splunkValues?.url,
        api_key: splunkValues?.api_key,
        is_enable: true,
        escalation_id: "",
        email: "",
        project_id: "null",
      };

      // If Splunk SIEM instance already exists, update it, otherwise create new

      if (splunkValues?.id) {
        // Update existing Splunk SIEM instance
        dispatch(UpdateIntegration(splunkDataUpdata))
          .unwrap()
          .then((updateRes: any) => {
            setErrorValue("");
            showAlert(
              "Success",
              "Splunk Siem",
              "instance updated",
              "",
              () => console.log("Alert closed"),
              () => console.log("Alert clicked")
            );
            setError({});
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      } else {
        // Create new Splunk SIEM instance
        dispatch(CreateIntegration(splunkDataCreate))
          .unwrap()
          .then((createRes: any) => {
            setErrorValue("");
            showAlert(
              "Success",
              createRes,
              "instance Created",
              "",
              () => console.log("Alert closed"),
              () => console.log("Alert clicked")
            );
            dispatch(setRemoveTabs("integration_page_splunk_siem"));
            setError({});
          })
          .catch((error: any) => {
            setErrorValue(error);
            setError({});
          });
      }
    }
  };

  const handleJira = () => {
    const validationCheck = handleApplicationInValidation();

    if (validationCheck === true) {
      let jiraDataCreate = {
        // user_id: userProfile?.user?.user_id,
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
        project_id: currentEnvironment,
      };

      let jiraDataUpdata = {
        // user_id: userProfile?.user?.user_id,
        type: "JIRA",
        id: jiraValues?.id,
        email: pagerValues?.email,
        api_key: pagerValues?.api_key,
        escalation_id: pagerValues?.escalation_id,
        is_enable: true,
        url: "",
        project_id: currentEnvironment,
      };

      //if already created, update api is called

      if (jiraValues?.id) {
        //update api
        dispatch(UpdateIntegration(jiraDataUpdata))
          .unwrap()
          .then((updateRes: any) => {
            toast?.success("Jira Instance updated Successfully!");
            setErrorValue("");
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      } else {
        //create api
        dispatch(CreateIntegration(jiraDataCreate))
          .unwrap()
          .then((createRes: any) => {
            toast?.success("JiraInstance created Successfully!");
            setErrorValue("");
          })
          .catch((error: any) => {
            setErrorValue(error);
          });
      }
    }
  };

  const handlePagerDuty = () => {
    const validationCheck = handleApplicationInValidation();

    if (validationCheck === true) {
      let pagerDataCreate = {
        // user_id: userProfile?.user?.user_id,
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
        project_id: currentEnvironment,
      };

      let pagerDataUpdata = {
        // user_id: userProfile?.user?.user_id,
        type: "PAGER_DUTY",
        id: pagerValues?.id,
        email: pagerValues?.email,
        api_key: pagerValues?.api_key,
        escalation_id: pagerValues?.escalation_id,
        is_enable: true,
        url: "",
        project_id: currentEnvironment,
      };

      //if already created, update api is called

      if (pagerValues?.id) {
        //update api
        dispatch(UpdateIntegration(pagerDataUpdata))
          .unwrap()
          .then((updateRes: any) => {
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
            toast?.success("PagerDutyInstance created Successfully!");
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

  const handleConfigureSubmit = () => {
    if (id === "integration_page_service_now") {
      handleServiceNow();
    } else if (id === "integration_page_splunk_siem") {
      handleSplunkSiem();
    } else if (id === "integration_page_jira") {
      handleJira();
    } else if (id === "integration_page_pager_duty") {
      handlePagerDuty();
    }
  };

  const handleSplunkValues = (field: any, event: any) => {
    setSplunkValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleTestIntegration = () => {
    let values = {
      tenant_id: userProfile?.user?.tenant_id,
      type: type,
      project_id: currentEnvironment,
    };

    dispatch(IntegrationsTest(values))
      .unwrap()
      .then((testRes: any) => {
        console.log(testRes, "testRestestRes");
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    const data = {
      tenant_id: userProfile?.user?.tenant_id,
      type: type,
      start: 1,
      end: 5,
    };
    if (type == "SERVICE_NOW" || type == "SPLUNK_SIEM") {
      dispatch(GetIntegrationByTenantIdandType(data))
        .unwrap()
        .then((res: any) => {
          if (res.length > 0) {
            let value = res[0];
            if (type == "SPLUNK_SIEM") {
              setSplunkValues((prevValues) => ({
                ...prevValues,
                url: value?.url,
                api_key: value?.api_key,
                id: value?.id,
              }));
            } else if (type == "SERVICE_NOW") {
              const parsingJson = JSON?.parse(
                JSON?.parse(value?.json_configuration)
              );
              setServiceNowValues((prevValues) => ({
                ...prevValues,
                api_key: value?.api_key,
                api_url: extractBaseUrl(value?.url),
                api_version: extractVersion(value?.url),
                api_table_name: value?.servicenow_tblname,
                incident_table_name: value?.incident_tblname,
                method: parsingJson?.method,
                url: parsingJson?.url,
                project_name: parsingJson?.project_name,
                stage_name: parsingJson?.stage_name,
                group_name: parsingJson?.group_name,
                unique_id: parsingJson?.unique_id,
                operation_name: parsingJson?.operation_name,
                status: parsingJson?.status,
              }));
            }
          }
        });
    } else {
      dispatch(GetIntegrationByProjectIdandType(data))
        .unwrap()
        .then((res: any) => {
          if (res.length > 0) {
            let value = res[0];
            if (type == "PAGER_DUTY") {
              setPagerValues((prevValues) => ({
                ...prevValues,
                email: value?.email,
                api_key: value?.api_key,
                escalation_id: value?.escilation,
                id: value.id,
              }));
            } else if (type == "JIRA") {
              setJiraValues((prevValues) => ({
                ...prevValues,
                email: value?.email,
                token: value?.token,
                url: value?.url,
                projectKey: value?.projectKey,
                id: value.id,
              }));
            }
          }
        });
    }
  }, [id]);

  return (
    <div
      style={{
        padding: "0px 10px",
        width: "100%",
        // backgroundColor: "#F6F9FF",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <GlobalCircularLoader open={integrationLoading} />

      <div style={{ display: "flex" }}>
        <div>
          {
            id === "integration_page_splunk_siem" ? (
              // <img
              //   src={SplunkImage1}
              //   alt="Splunk Siem"
              //   style={{
              //     width: "60px",
              //     height: "33px",
              //   }}
              // />
              <Image
                src={SplunkImage1}
                alt="Splunk Siem"
                style={{
                  width: "60px",
                  height: "33px",
                }}
              />
            ) : id === "integration_page_service_now" ? (
              // <img
              //   src={ServiceNowImage}
              //   alt="Service Now"
              //   style={{
              //     width: "25px",
              //     height: "25px",
              //     marginRight: "10px",
              //     marginLeft: "10px",
              //   }}
              // />
              <Image
                src={ServiceNowImage}
                alt="Service Now"
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              />
            ) : (
              ""
            ) /* Fallback case, which means no image for other values */
          }
        </div>

        <div>
          <PrimaryTypography
            style={{
              fontWeight: 800,
              marginTop: "8px",
            }}
          >
            {/* Service Now */}
            {id === "integration_page_splunk_siem"
              ? "Splunk Siem"
              : id === "integration_page_service_now"
              ? "Service Now"
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
              // color: `${theme.palette.teritiaryColor.main}`,
              marginTop: "5px",
            }}
          >
            {id === "integration_page_splunk_siem"
              ? "Splunk SIEM provides robust API capabilities for integrating security data and automating responses to threats."
              : id === "integration_page_service_now"
              ? "ServiceNow provides comprehensive APIs that empower seamless integration and automation across enterprise workflows and service management processes."
              : id === "integration_page_pager_duty"
              ? "PagerDuty helps you bring together the right people with the right information in real time. Address the unplanned, critical work that your teams aren’t prepared for"
              : id === "integration_page_jira"
              ? "Jira is the #1 agile project management tool used by teams to plan, track, release and support world-class software with confidence"
              : ""}
          </SecondaryTypography>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 10px",
          marginTop: "1rem",
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
            buttonType="primary"
            label={"Test"}
            onClickHandler={handleTestIntegration}
          />
        </div>
      </div>

      <div style={{ marginTop: "1.7rem" }}>
        {id === "integration_page_splunk_siem" ? (
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
                <GlobalTextField
                  value={splunkValues?.url}
                  width="100%"
                  onChange={(e: any) => {
                    handleSplunkValues("url", e.target.value);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      handleApplicationInValidation();
                    }
                  }}
                  name={""} //
                  error={error?.api_url}
                  // errorHandler={(error: any) =>
                  //   setErrorFieldApiUrl(error)
                  // }
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
                <GlobalTextField
                  value={splunkValues?.api_key}
                  width="100%"
                  onChange={(e: any) => {
                    handleSplunkValues("api_key", e.target.value);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      handleApplicationInValidation();
                    }
                  }}
                  name={""} // error={errorFieldApiKey}
                  error={error?.api_key}
                  // errorHandler={(error: any) =>
                  //   setErrorFieldApiKey(error)
                  // }
                />
              </div>
            </div>
          </>
        ) : id === "integration_page_service_now" ? (
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
                <GlobalTextField
                  value={serviceNowValues?.api_key}
                  width="100%"
                  onChange={(e: any) => {
                    handleServiceNowValues("api_key", e.target.value);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      handleApplicationInValidation();
                    }
                  }}
                  error={error?.api_key}
                  errorHandler={(error: any) =>
                    setError({
                      ...error,
                      api_key: "",
                    })
                  }
                  name={""}
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
                <GlobalTextField
                  value={serviceNowValues?.api_url}
                  width="100%"
                  onChange={(e: any) => {
                    handleServiceNowValues("api_url", e.target.value);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      handleApplicationInValidation();
                    }
                  }}
                  error={error?.api_url}
                  errorHandler={(error: any) =>
                    setError({
                      ...error,
                      api_url: "",
                    })
                  }
                  name={""}
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
                <GlobalTextField
                  value={serviceNowValues?.api_version}
                  width="100%"
                  onChange={(e: any) => {
                    handleServiceNowValues("api_version", e.target.value);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      handleApplicationInValidation();
                    }
                  }}
                  name={""}
                  error={error?.api_version}
                  errorHandler={(error: any) =>
                    setError({
                      ...error,
                      api_version: "",
                    })
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
                <GlobalTextField
                  value={serviceNowValues?.api_table_name}
                  width="100%"
                  onChange={(e: any) => {
                    handleServiceNowValues("api_table_name", e.target.value);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      handleApplicationInValidation();
                    }
                  }}
                  error={error?.api_table_name}
                  name={""}
                  errorHandler={(error: any) =>
                    setError({
                      ...error,
                      api_table_name: "",
                    })
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
                <GlobalTextField
                  value={serviceNowValues?.incident_table_name}
                  width="100%"
                  onChange={(e: any) => {
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
                  error={error?.incident_table_name}
                  name={""}
                  errorHandler={(error: any) =>
                    setError({
                      ...error,
                      incident_table_name: "",
                    })
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
                          setFieldMatchClicked(!fieldMatchClicked);
                        }}
                      >
                        Field Matching
                      </SecondaryTypography>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{ marginTop: "-25px" }}>
                    <Grid container>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.method}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues("method", e.target.value);
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.method}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              method: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.url}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues("url", e.target.value);
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.url}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              url: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.project_name}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues(
                              "project_name",
                              e.target.value
                            );
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.project_name}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              project_name: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.stage_name}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues(
                              "stage_name",
                              e.target.value
                            );
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.stage_name}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              stage_name: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.group_name}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues(
                              "group_name",
                              e.target.value
                            );
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.group_name}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              group_name: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.unique_id}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues("unique_id", e.target.value);
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.unique_id}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              unique_id: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.operation_name}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues(
                              "operation_name",
                              e.target.value
                            );
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.operation_name}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              operation_name: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "5px" }}>
                      <Grid item xs={3}>
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
                      <Grid item xs={8}>
                        <GlobalTextField
                          value={serviceNowValues?.status}
                          width="100%"
                          onChange={(e: any) => {
                            handleServiceNowValues("status", e.target.value);
                          }}
                          disabledVal
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              handleApplicationInValidation();
                            }
                          }}
                          error={error?.status}
                          name={""}
                          errorHandler={(error: any) =>
                            setError({
                              ...error,
                              status: "",
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </>
        ) : id === "integration_page_pager_duty" ||
          id === "integration_page_jira" ? (
          <div style={{ padding: "0px 10px" }}>
            <div>
              <SecondaryTypography
                style={{
                  fontWeight: 600,
                }}
              >
                Email
              </SecondaryTypography>
              <GlobalTextField
                value={
                  id === "integration_page_pager_duty"
                    ? pagerValues?.email
                    : id === "integration_page_jira"
                    ? jiraValues?.email
                    : ""
                }
                width="100%"
                onChange={(e: any) => {
                  if (id === "integration_page_pager_duty") {
                    handlePagerValues("email", e.target.value);
                  } else if (id === "integration_page_jira") {
                    handleJiraValues("email", e.target.value);
                  }
                }}
                onKeyUp={(event: any) => {
                  if (event?.key === "Enter") {
                    handleApplicationInValidation();
                  }
                }}
                name={""} //
                error={
                  id === "integration_page_pager_duty"
                    ? error?.email
                    : id === "integration_page_jira"
                    ? error?.email
                    : ""
                }
                errorHandler={(error: any) =>
                  setError({
                    ...error,
                    email: "",
                  })
                }
              />
            </div>

            {id === "integration_page_pager_duty" && (
              <>
                <div style={{ marginTop: "10px" }}>
                  <SecondaryTypography
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Api Key
                  </SecondaryTypography>
                  <GlobalTextField
                    value={pagerValues?.api_key}
                    width="100%"
                    onChange={(e: any) => {
                      handlePagerValues("api_key", e.target.value);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        handleApplicationInValidation();
                      }
                    }}
                    name={""} // error={errorFieldApiKey}
                    error={error?.api_key}
                    errorHandler={(error: any) =>
                      setError({
                        ...error,
                        api_key: "",
                      })
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
                  <GlobalTextField
                    value={pagerValues?.escalation_id}
                    width="100%"
                    onChange={(e: any) => {
                      handlePagerValues("escalation_id", e.target.value);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        handleApplicationInValidation();
                      }
                    }}
                    name={""} // error={errorFieldApiKey}
                    error={error?.escalation_id}
                    errorHandler={(error: any) =>
                      setError({
                        ...error,
                        escalation_id: "",
                      })
                    }
                  />
                </div>
              </>
            )}

            {id === "integration_page_jira" && (
              <>
                <div style={{ marginTop: "10px" }}>
                  <SecondaryTypography
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Token
                  </SecondaryTypography>
                  <GlobalTextField
                    value={jiraValues?.token}
                    width="100%"
                    onChange={(e: any) => {
                      handleJiraValues("token", e.target.value);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        handleApplicationInValidation();
                      }
                    }}
                    name={""} // error={errorFieldApiKey}
                    error={error?.token}
                    errorHandler={(error: any) =>
                      setError({
                        ...error,
                        token: "",
                      })
                    }
                  />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <SecondaryTypography
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Url
                  </SecondaryTypography>
                  <GlobalTextField
                    value={jiraValues?.url}
                    width="100%"
                    onChange={(e: any) => {
                      handleJiraValues("url", e.target.value);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        handleApplicationInValidation();
                      }
                    }}
                    name={""} // error={errorFieldApiKey}
                    error={error?.url}
                    errorHandler={(error: any) =>
                      setError({
                        ...error,
                        url: "",
                      })
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
                  <GlobalTextField
                    value={jiraValues?.projectKey}
                    width="100%"
                    onChange={(e: any) => {
                      handleJiraValues("projectKey", e.target.value);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        handleApplicationInValidation();
                      }
                    }}
                    name={""} // error={errorFieldApiKey}
                    error={error?.projectKey}
                    errorHandler={(error: any) =>
                      setError({
                        ...error,
                        projectKey: "",
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "6rem" }}>
            <GlobalButton
              background="#282F79"
              color="#FFFFFF"
              fontSize="0.6rem"
              // width={"100%"}
              padding="10px"
              borderRadius="8px"
              marginRight="1.5rem"
              label={"Configure"}
              width="25%"
              onClickHandler={() => {
                handleConfigureSubmit();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntegrationPage;
