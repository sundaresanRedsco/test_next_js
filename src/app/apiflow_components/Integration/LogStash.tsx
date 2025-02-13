import React, { useEffect, useState } from "react";
import { OuterBoxContainer } from "@/app/Styles/dashboradStyledComponents";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { PrimaryTypography, SecondaryTypography } from "@/app/Styles/signInUp";
import GButton from "@/app/apiflow_components/global/GButton";
import toast from "react-hot-toast";
import { Edit, FileCopy } from "@mui/icons-material";
import Logstash from "@/app/Assests/icons/logstash.svg";
import CheckCircle from "@mui/icons-material/CheckCircle";
import {
  GetAuthkeyById,
  GetIpDomainNames,
  GetLogstashData,
  ImportLogstash,
  UpdateDomainName,
  apiGatewayReducer,
} from "../../Redux/apiManagement/apiGatewayReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer, updateSessionPopup } from "@/app/Redux/commonReducer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import GInput from "@/app/apiflow_components/global/GInput";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  GetProjectByWorkspaceIdSolrOffset,
  projectReducer,
} from "@/app/Redux/apiManagement/projectReducer";
import GlobalCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { getCookies } from "@/app/Helpers/helpersFunctions";

interface Project {
  project_id: any;
  id: string;
  name: string;
  // Other properties of your project object
}

function LogSlash() {
  const dispatch = useDispatch<any>();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const wsidVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "");

  const { instanceId, ipDetails, loading, loadingValue } = useSelector<
    RootStateType,
    apiGatewayReducer
  >((state) => state.apiManagement.gateWay);

  const { projectsListSolrOffset } = useSelector<RootStateType, projectReducer>(
    (state) => state.apiManagement.projects
  );

  const initialYAMLData = `
  filebeat.inputs:
  - type: log
    enabled: true
    paths: Paths\\logs\\LogFiles\\Logs\\*.log
    fields:
      instance_id: "put Your instance id"

  output.logstash:
    hosts: ["localhost:5044"]
`;

  const [jsonData, setJsonData] = useState({
    input: {
      beats: {
        port: 5044,
      },
    },
    filter: [
      {
        mutate: {
          add_field: {
            instance_id: "d31382162f9f424e8a38d8201805f8b8",
            authentication_key: "383e1e53e5994657bdadadeb2b32040e",
            logstashversion: "%{[@metadata][version]}",
          },
        },
      },
      {
        grok: {
          match: {
            message:
              "%{TIMESTAMP_ISO8601:timestamp} %{IP:server} %{WORD:http_method} %{URIPATH:request_path}(?:%{DATA:request_params})? - %{IP:client} %{DATA:user_agent} %{NUMBER:status_code:int} %{NUMBER:bytes_sent:int} %{NUMBER:request_time:int} %{NUMBER:response_time:int}",
          },
        },
      },
      {
        if: {
          condition: [
            "swagger/v1/swagger.json",
            "swagger/index.html",
            "swagger/swagger-ui.css",
            "swagger/favicon",
          ],
          then: "drop",
        },
      },
    ],
    output: {
      http: {
        url: "https://api.apiflow.pro/api/Logstash/polllingLogfrom_logstash",
        http_method: "post",
        format: "json",
        content_type: "application/json",
        message:
          '{"instance_id": "%{[instance_id]}", "timestamp": "%{timestamp}", "client": "%{client}", "http_method": "%{http_method}", "request_path": "%{request_path}", "status_code": %{status_code}, "bytes_sent": %{bytes_sent}, "request_time": %{request_time}, "response_time": %{response_time}, "user_agent": "%{user_agent}", "authentication_key": "%{authentication_key}", "logstashversion": "%{logstashversion}"}',
      },
    },
  });

  const [discoveryState, setDiscoveryState] = useState(ipDetails);
  const [enableDiscovery, setEnableDiscovery] = useState(
    ipDetails?.is_discovery
  );
  const [switchState, setSwitchState] = useState<any>();
  const [status, setStatus] = useState<string>("In Active");
  const textToCopy = instanceId.instance_id;
  const [copied, setCopied] = useState(false);
  const [yamelCopied, setYamelCopied] = useState(false);
  const [yamalDatas, setYamalDatas] = useState<any>(initialYAMLData);
  const [typeDecleard, setTypedecleard] = useState("");
  const [showText, setShowText] = useState(false);
  const [authKey, setAuthKey] = useState(instanceId.authendication_key);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [discoveryStatus, setDiscoveryStatus] = useState<any>({});
  const [editedName, setEditedName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [errorEditedName, setErrorEditedName] = useState({ name: "" });
  const [errorProjectName, setErrorProjectName] = useState({ name: "" });
  const [selectedProjectId, setSelectedProjectId] = useState<string | "">("");
  const [editId, setEditId] = useState("");
  const [serversIp, setServersIps] = useState("");
  const [instancesIds, setInstancesIds] = useState("");
  const [active, setActive] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const tableHeaders = [
    { id: "1", key: "name", label: "IP" },
    { id: "2", key: "senstive", label: "Domain Name" },
    { id: "3", key: "senstive", label: "Project" },
    { id: "4", key: "datasets", label: "Logstash Version" },
    { id: "5", key: "ENDPOINTS", label: "FileBeat Version" },
    { id: "6", key: "ENDPOINTS", label: "Discovery" },
    { id: "7", key: "ENDPOINTSdata", label: "Action" },
  ];

  useEffect(() => {
    localStorage.setItem("showText", showText.toString());
  }, [showText]);

  const toggleSwitch = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  const handleCopyClick = (type: string) => {
    setTypedecleard(type);
    if (type === "Id") {
      navigator.clipboard.writeText(textToCopy);

      toast.success("Id Copied");
    } else if (type === "JsonInput") {
      navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
      toast.success("JSON Copied");
    } else if (type === "Yamal") {
      navigator.clipboard.writeText(JSON.stringify(yamalDatas, null, 2));
      setYamelCopied(true);
      setTimeout(() => {
        setYamelCopied(false);
      }, 2000);
      toast.success("Yamal File Copied");
    } else if (type === "showid") {
      navigator.clipboard.writeText(authKey);
      toast.success("Your Authentication Key");
    }
  };

  const formatWithLineNumbers = (text: any) => {
    return (text ?? "")
      .split("\n")
      .map((line: any, index: any) => `${index + 1}. ${line}`)
      .join("\n");
  };

  const formattedRequest =
    formatWithLineNumbers(JSON.stringify(jsonData, null, 2)) || "";

  const enableDisableLogstash = () => {
    setActive(true);
    // showText === false
    if (showText === false) {
      const addGatewayDetails = {
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        tenant_id: userProfile?.user?.tenant_id,
        enable: true,
      };

      dispatch(ImportLogstash(addGatewayDetails))
        .unwrap()
        .then((res: any) => {
          toast.success("Logstash Enabled");
          setShowText(true);
          setStatus("Active");

          dispatch(GetLogstashData(currentWorkspace?.id));
        });
    } else {
      const addGatewayDetails = {
        workspace_id: currentWorkspace?.id,
        user_id: userProfile?.user?.user_id,
        tenant_id: userProfile?.user?.tenant_id,
        enable: false,
      };

      dispatch(ImportLogstash(addGatewayDetails))
        .unwrap()
        .then((res: any) => {
          toast.success("Logstash Disabled");
          setShowText(true);

          dispatch(GetLogstashData(currentWorkspace?.id));
        });
    }
  };

  const regenerateAuthkey = () => {
    dispatch(GetAuthkeyById(instanceId?.id))
      .unwrap()
      .then((res: any) => {
        toast.success("AuthKey Regenerated");

        dispatch(GetLogstashData(currentWorkspace?.id))
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
  };

  useEffect(() => {
    const initialYAMLData = `
    filebeat.inputs:
    - type: log
      enabled: true
      paths: Paths\\logs\\LogFiles\\Logs\\*.log
      fields:

        instance_id: "put Your instance id"


    output.logstash:
      hosts: ["localhost:5044"]
  `;

    setYamalDatas(initialYAMLData);
    setAuthKey(instanceId?.authendication_key);

    setJsonData({
      input: {
        beats: {
          port: 5044,
        },
      },
      filter: [
        {
          mutate: {
            add_field: {
              instance_id: "d31382162f9f424e8a38d8201805f8b8",
              authentication_key: "383e1e53e5994657bdadadeb2b32040e",
              logstashversion: "%{[@metadata][version]}",
            },
          },
        },
        {
          grok: {
            match: {
              message:
                "%{TIMESTAMP_ISO8601:timestamp} %{IP:server} %{WORD:http_method} %{URIPATH:request_path}(?:%{DATA:request_params})? - %{IP:client} %{DATA:user_agent} %{NUMBER:status_code:int} %{NUMBER:bytes_sent:int} %{NUMBER:request_time:int} %{NUMBER:response_time:int}",
            },
          },
        },
        {
          if: {
            condition: [
              "swagger/v1/swagger.json",
              "swagger/index.html",
              "swagger/swagger-ui.css",
              "swagger/favicon",
            ],
            then: "drop",
          },
        },
      ],
      output: {
        http: {
          url: "https://api.apiflow.pro/api/Logstash/polllingLogfrom_logstash",
          http_method: "post",
          format: "json",
          content_type: "application/json",
          message:
            '{"instance_id": "%{[instance_id]}", "timestamp": "%{timestamp}", "client": "%{client}", "http_method": "%{http_method}", "request_path": "%{request_path}", "status_code": %{status_code}, "bytes_sent": %{bytes_sent}, "request_time": %{request_time}, "response_time": %{response_time}, "user_agent": "%{user_agent}", "authentication_key": "%{authentication_key}", "logstashversion": "%{logstashversion}"}',
        },
      },
    });
    if (instanceId.instance_id) {
      setShowText(true);
      setStatus(instanceId.enable ? "Active" : "In Active");
    }
  }, [instanceId]);

  useEffect(() => {
    dispatch(GetLogstashData(currentWorkspace?.id))
      .unwrap()
      .then()
      .catch((errr: any) => {
        if (errr.message == "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  }, [instanceId?.authendication_key, currentWorkspace?.id]);

  useEffect(() => {
    dispatch(GetIpDomainNames(instanceId?.instance_id))
      .unwrap()
      .then()
      .catch((errr: any) => {
        if (errr.message == "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  }, [instanceId?.instance_id]);

  const handleEditClick = (
    id: any,
    domain_name: any,
    project_id: any,
    discovery: any,
    server_ip: any,
    instance_id: any
  ) => {
    setEditId(id);
    setEditedName(domain_name);
    setProjectId(project_id);
    setSwitchState(discovery);
    setServersIps(server_ip);
    setInstancesIds(instance_id);
    setDiscoveryStatus(discovery);
    setErrorEditedName({ name: "" });
    setErrorProjectName({ name: "" });
  };

  const handleInputChange = (e: any) => {
    setEditedName(e.target.value);
    setErrorEditedName({ name: "" });
  };

  const domainNameRegex = /^(?:https:\/\/).+[^\/]$/;

  function domainNameErrorHandler() {
    if (switchState === true) {
      if (editedName === "") {
        setErrorEditedName({ name: "Domain Name is required" });
        return false;
      } else if (!domainNameRegex.test(editedName)) {
        setErrorEditedName({ name: "Domain Name not valid" });
        return false;
      } else if (!domainNameRegex.test(editedName)) {
        return "Domain Name not valid";
      }
    }
    if (switchState === false) {
      if (selectedProjectId === "") {
        setErrorProjectName({ name: "Project Field is required" });
        return false;
      }
    } else {
      setErrorEditedName({ name: "" });
      setErrorProjectName({ name: "" });

      return true;
    }
    return true;
  }

  const handleToggle = (id: number, disco: any) => {
    setDiscoveryState((prevState: any) =>
      prevState.map((row: any) =>
        row.id === id ? { ...row, is_discovery: !row.is_discovery } : row
      )
    );
    setSwitchState(!disco);
  };

  useEffect(() => {
    setDiscoveryState(ipDetails);
  }, [ipDetails]);

  const handleUpdateDomainName = () => {
    let hasNoErrors;
    hasNoErrors = domainNameErrorHandler();
    if (discoveryStatus == false) {
      const updateipDomains = {
        domain_name: editedName,
        id: editId,
        is_discovery: switchState,
        project_id: selectedProjectId,
        server_ip: serversIp,
        instance_id: instancesIds,
      };
      if (hasNoErrors) {
        dispatch(UpdateDomainName(updateipDomains))
          .unwrap()
          .then((res: any) => {
            toast.success("Updated Successfully !");

            setEditId("");
            setEditedName("");
            setProjectId("");

            dispatch(GetIpDomainNames(instanceId?.instance_id))
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
    } else if (discoveryStatus == true) {
      const updateipDomains = {
        domain_name: editedName,
        id: editId,
        is_discovery: switchState,
        project_id: selectedProjectId,
        server_ip: serversIp,
        instance_id: instancesIds,
      };
      if (hasNoErrors) {
        dispatch(UpdateDomainName(updateipDomains))
          .unwrap()
          .then((res: any) => {
            toast.success("Updated Successfully !");
            setEditId("");
            setEditedName("");
            setProjectId("");

            dispatch(GetIpDomainNames(instanceId?.instance_id))
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
    }
  };

  const handleLogstashClose = () => {
    setEditId("");
    setEditedName("");
    setProjectId("");
  };

  useEffect(() => {
    let requestData = {
      wsid: wsidVal,
      sortByField: "name",
      sortByValue: searchInput,
      sortDirection: "asc",
      startValue: 1,
      endValue: 10,
    };

    dispatch(GetProjectByWorkspaceIdSolrOffset(requestData))
      .unwrap()
      .then((res: any) => {})
      .catch((error: any) => {});
  }, []);

  return (
    <div>
      <OuterBoxContainer style={{ marginTop: "1rem", padding: "1rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="d-flex">
            <SecondaryTypography
              style={{
                fontSize: "0.8rem",
                fontWeight: "600",
                marginTop: "1rem",
              }}
            >
              Import Logstash
            </SecondaryTypography>

            <Logstash
              style={{ height: "40px", width: "40px", marginLeft: "1rem" }}
            />
          </div>

          <div>
            <SecondaryTypography
              style={{
                marginTop: "2rem",
                fontSize: "0.8rem",
                marginRight: "4rem",
              }}
            >
              Status
            </SecondaryTypography>
            <Chip
              style={{
                background:
                  active == false
                    ? "rgb(243 71 71 / 23%)"
                    : "rgba(33, 150, 83, 0.08)",
                color: active == false ? "red" : "#219653",
                marginTop: "0.7rem",
              }}
              label={active == false ? "In Active" : "Active"}
            />
          </div>
        </div>

        <SecondaryTypography style={{ fontSize: "0.7rem" }}>
          logstash Stash Setup Guide
        </SecondaryTypography>

        <SecondaryTypography
          style={{
            marginTop: "2rem",
            fontSize: "0.6rem",
            color: "rgb(173, 181, 189)",
          }}
        >
          Expands or collapses content contained in collapsible items,Enable
          your Logstash and one instanace id is created and click that id. id
          will copy and place any items such a normal this is id is avilable so
          place your id. such as panels.Click Here......!
        </SecondaryTypography>

        <GButton
          buttonType="primary"
          label={
            instanceId.enable === true ? "Disable Logstash" : "Enable Logstash"
          }
          margin="2rem 0rem"
          onClickHandler={enableDisableLogstash}
        />

        {showText && (
          <>
            <p style={{ fontSize: "0.8rem" }}>Your Instance Id:</p>
            <p
              onClick={() => handleCopyClick("Id")}
              style={{ cursor: "pointer", color: "blue", fontSize: "0.7rem" }}
            >
              {instanceId.instance_id}{" "}
              <FileCopy
                style={{
                  marginLeft: "0.8rem",
                  color: "#110b18ad",
                  fontSize: "0.8rem",
                }}
              />
            </p>

            <p style={{ fontSize: "0.8rem" }}>Your Authentication Key:</p>
            <div className="d-flex">
              <p
                onClick={() => toggleSwitch()}
                style={{ cursor: "pointer", color: "blue", fontSize: "0.7rem" }}
              >
                <input
                  style={{
                    border: "none",
                    outline: "none",
                    width: "13rem",
                    color: isOn ? "blue" : "black",
                  }}
                  type={isOn ? "text" : "password"}
                  value={instanceId?.authendication_key}
                />
                {isOn ? (
                  <VisibilityIcon
                    style={{
                      color: "#110b18ad",
                      fontSize: "16px",
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{
                      color: "#110b18ad",
                      fontSize: "16px",
                    }}
                  />
                )}
              </p>

              <FileCopy
                style={{
                  marginLeft: "0.8rem",
                  color: "#110b18ad",
                  fontSize: "0.8rem",
                  marginTop: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleCopyClick("showid")}
              />
              <div style={{ marginLeft: "4rem" }}>
                <GButton
                  buttonType="primary"
                  label={"Regenerate"}
                  margin="0px"
                  onClickHandler={regenerateAuthkey}
                />
              </div>
            </div>

            <div style={{ marginTop: "2rem" }}>
              <SecondaryTypography
                style={{
                  marginTop: "2rem",
                  fontSize: "0.6rem",
                  color: "rgb(173, 181, 189)",
                }}
              >
                Expands or collapses content contained in collapsible
                items,Enable your Logstash and one instanace id<br></br> is
                created and click that id. id will copy and place any items such
                a normal this is id
              </SecondaryTypography>

              <SecondaryTypography
                style={{
                  marginTop: "2rem",
                  fontSize: "0.8rem",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                IP & DomainLists
              </SecondaryTypography>
              <div style={{ margin: "2rem 1rem" }}>
                <div
                  style={{
                    maxHeight: "20rem",
                    overflow: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        {tableHeaders.map((header) => (
                          <TableCell key={header.key}>
                            <div
                              style={{
                                fontSize: "0.6rem",
                                fontFamily: "Inter-regular",
                                fontWeight: "600",
                              }}
                            >
                              {" "}
                              {header.label}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ position: "relative" }}>
                      {discoveryState?.length <= 0 && (
                        <GlobalCircularLoader open={loadingValue} />
                      )}

                      {discoveryState.length === 0 ? (
                        <TableRow style={{ height: "22rem" }}>
                          <TableCell colSpan={12}>
                            <Typography variant="body2" color="textSecondary">
                              <p
                                style={{
                                  alignItems: "center",
                                  textAlign: "center",
                                }}
                              >
                                {" "}
                                No data found.
                              </p>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        discoveryState.map((row: any) => (
                          <TableRow key={row.id} style={{ height: "3rem" }}>
                            <TableCell>
                              <SecondaryTypography
                                style={{ fontSize: "0.6rem" }}
                              >
                                {row.server_ip}
                              </SecondaryTypography>{" "}
                            </TableCell>
                            <TableCell
                              style={{ padding: "0px", width: "2rem" }}
                            >
                              {switchState === true && editId === row.id ? (
                                <div>
                                  <GInput
                                    background="tranparent"
                                    type="text"
                                    fullWidth={true}
                                    color="black"
                                    radius="0px"
                                    border="0 0 0 0.2px black"
                                    value={editedName}
                                    error={
                                      switchState === true &&
                                      errorEditedName?.name
                                    }
                                    dataTest={"project-name-input"}
                                    width="15rem"
                                    fontSize="0.6rem"
                                    height="10px"
                                    borderColor="#9CA3AF"
                                    onChangeHandler={handleInputChange}
                                  />
                                </div>
                              ) : (
                                <SecondaryTypography
                                  style={{ fontSize: "0.6rem" }}
                                >
                                  {row.domain_name}
                                </SecondaryTypography>
                              )}
                            </TableCell>

                            <TableCell>
                              <Stack spacing={3} sx={{ width: 150 }}>
                                <Autocomplete
                                  id="tags-standard"
                                  options={projectsListSolrOffset}
                                  getOptionLabel={(option) => option.name}
                                  onChange={(
                                    event,
                                    newValue: Project | null
                                  ) => {
                                    if (newValue) {
                                      setSelectedProjectId(newValue.project_id);
                                      setErrorProjectName({ name: "" });
                                    } else {
                                      setSelectedProjectId("");
                                      if (switchState === false) {
                                        setErrorProjectName({
                                          name: "Project Field is requiredsss",
                                        });
                                      }
                                    }
                                  }}
                                  onInputChange={(event, newInputValue) => {
                                    setSearchInput(newInputValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      style={{ fontSize: "0.6rem" }}
                                      {...params}
                                      variant="standard"
                                      label="Select the project"
                                      placeholder="Enter the project"
                                      error={
                                        editId === row.id &&
                                        !!errorProjectName.name
                                      }
                                      helperText={
                                        editId === row.id
                                          ? errorProjectName.name
                                          : null
                                      }
                                    />
                                  )}
                                  defaultValue={
                                    projectsListSolrOffset.length > 0
                                      ? projectsListSolrOffset[0]
                                      : null
                                  }
                                  disabled={
                                    switchState === true || editId !== row.id
                                  }
                                />
                              </Stack>
                            </TableCell>
                            <TableCell style={{ fontSize: "0.6rem" }}>
                              {row.logstash_versionid}
                            </TableCell>
                            <TableCell style={{ fontSize: "0.6rem" }}>
                              {row.filebeat_versionid}
                            </TableCell>
                            <TableCell>
                              <Switch
                                style={{ fontSize: "1rem" }}
                                color="primary"
                                checked={row.is_discovery}
                                onChange={() => {
                                  handleToggle(row.id, row.is_discovery);
                                  setSwitchState(!switchState); // Toggle switchState
                                }}
                                disabled={editId !== row.id}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {editId === row.id ? (
                                <div>
                                  <CancelIcon
                                    onClick={() => handleLogstashClose()}
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "14px",
                                    }}
                                  />
                                  <CheckCircle
                                    onClick={handleUpdateDomainName}
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "14px",
                                      marginLeft: "1rem",
                                    }}
                                  />
                                </div>
                              ) : (
                                <Edit
                                  style={{
                                    color: "#6c757d",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    handleEditClick(
                                      row.id,
                                      row.domain_name,
                                      row.project_id,
                                      row.is_discovery,
                                      row?.server_ip,
                                      row?.instance_id
                                    )
                                  }
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <SecondaryTypography
                style={{
                  marginTop: "2rem",
                  fontSize: "0.8rem",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                logstash Config
              </SecondaryTypography>
              <SecondaryTypography
                style={{
                  marginTop: "1rem",
                  fontSize: "0.6rem",
                  color: "rgb(173, 181, 189)",
                }}
              >
                Expands or collapses content contained in collapsible
                items,Enable your Logstash and one instanace id<br></br> is
                created and install the{" "}
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "black",
                    fontWeight: "600",
                    fontFamily: "Inter-regular",
                    margin: "0px 5px",
                  }}
                >
                  Version 8.9.1
                </span>{" "}
                id will copy and place any items such a normal this is id is
                created and click<br></br> that id. id will copy and place any
                items
              </SecondaryTypography>
              <SecondaryTypography
                style={{
                  fontSize: "0.8rem",
                  margin: "1rem 0rem",
                }}
              >
                Logstash Json
              </SecondaryTypography>

              <div
                style={{
                  backgroundColor: "#F1F5F9",
                  marginBottom: "3rem",
                  cursor: "pointer",
                  padding: "1rem 1.4rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "flex-end" }}
                  onClick={() => handleCopyClick("JsonInput")}
                >
                  {copied ? (
                    <CheckCircle
                      style={{ marginLeft: "1rem", fontSize: "16px" }}
                    />
                  ) : (
                    <FileCopy
                      style={{ marginLeft: "1rem", fontSize: "0.8rem" }}
                    />
                  )}
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      marginLeft: "0.4rem",
                    }}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </p>
                </div>
                <pre style={{ fontSize: "0.7rem" }}>{formattedRequest}</pre>
              </div>
              <SecondaryTypography
                style={{
                  marginTop: "2rem",
                  fontSize: "0.8rem",
                  marginBottom: "1rem",
                  fontWeight: "600",
                }}
              >
                Filebeat Config
              </SecondaryTypography>

              <SecondaryTypography
                style={{
                  marginTop: "1rem",
                  fontSize: "0.6rem",
                  color: "rgb(173, 181, 189)",
                }}
              >
                Expands or collapses content contained in collapsible
                items,Enable your Logstash and one instanace id<br></br> is
                created and{" "}
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "black",
                    fontWeight: "600",
                    fontFamily: "Inter-regular",
                    margin: "0px 5px",
                  }}
                >
                  Version 8.9.1
                </span>{" "}
                id will copy and place any items such a normal this is id is
                created and click<br></br> that id. id will copy and place any
                items
              </SecondaryTypography>

              <SecondaryTypography
                style={{
                  fontSize: "0.8rem",
                  margin: "1rem 0rem",
                  fontWeight: "600",
                }}
              >
                Filebeat Yaml
              </SecondaryTypography>

              <div
                style={{
                  backgroundColor: "#F1F5F9",
                  marginBottom: "3rem",
                  cursor: "pointer",
                  padding: "0.5rem 1.4rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <pre style={{ fontSize: "0.7rem" }}>
                    {yamalDatas.split("\n").map((line: any, index: any) => (
                      <p key={index}>{line}</p>
                    ))}
                  </pre>

                  <div
                    className="d-flex"
                    onClick={() => handleCopyClick("Yamal")}
                  >
                    {yamelCopied ? (
                      <CheckCircle
                        style={{ marginLeft: "1rem", fontSize: "16px" }}
                      />
                    ) : (
                      <FileCopy
                        style={{ marginLeft: "1rem", fontSize: "0.8rem" }}
                      />
                    )}
                    <p
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        marginLeft: "0.4rem",
                      }}
                    >
                      {yamelCopied ? "Copied!" : "Copy"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </OuterBoxContainer>
    </div>
  );
}

export default LogSlash;
