"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Popover,
  Backdrop,
  Tooltip,
  useTheme,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { usePathname } from "next/navigation"; // For Next.js 13+
import { Box, styled } from "@mui/system";
import { GridColDef } from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import theme from "@/Theme/theme";
import { RootStateType } from "@/app/Redux/store";
import {
  CommonReducer,
  updateSessionPopup,
  updateTourStep,
} from "@/app/Redux/commonReducer";
import {
  BackgroundUrlList,
  CreateOperation,
  GetOperationById,
  GetOperations,
  GetOpertionTest,
  projectReducer,
  SoapOperationById,
  UpdateOperation,
} from "@/app/Redux/apiManagement/projectReducer";
import {
  environmentReducer,
  GetAllStagesByProjectId,
} from "@/app/Redux/apiManagement/environmentReducer";
import GInput from "@/app/apiflow_components/global/GInput";
import { setCookies, translate } from "@/app/Helpers/helpersFunctions";
import RadioCheckboxComponent from "@/app/apiflow_components/global/radioCheckboxComponentV1";

import Grid from "@mui/material/Grid2";
import GlobalLoader from "@/app/apiflow_components/global/GlobalLoaderV1";
import ApiInsights from "@/app/apiflow_components/Operations/apiInsights";
// import ApiInsights from "@/app/Components/ApiManagement/apiInsights";
import GSelect from "@/app/apiflow_components/global/GSelect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GButton from "@/app/apiflow_components/global/GButton";
import GDataGrid from "@/app/apiflow_components/global/GDataGrid";
import { DeleteIcon } from "@/app/Assests/icons";
import GlobeIcon from "../../Assests/icons/globe.svg";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import OutputParamTable from "@/app/apiflow_components/Operations/OutputParamTable";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondaryTypography,
  TextOutlinedInput,
  CardContainer,
  operationSecrityLevelData,
  btnVal,
} from "@/app/hooks/operations/useOperationHelpers";
import { GetCollectionById } from "@/app/Redux/apiManagement/endpointReducer";
import useOperation from "@/app/hooks/operations/useOperation";
import PageNotFound from "../pages/PageNotFound";

export default function OperationsPage(props: any) {
  const theme = useTheme();

  const location = usePathname();

  const scrollableContentRef = useRef<any>();

  //--------------------------------------------------Redux-----------------------------------------------------------------

  const dispatch = useDispatch<any>();

  const { userProfile, maninContainer, tourStep } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const {
    loading,
    saveGetResponseData,
    singleOperationData,
    operationLists,
    saveAndGetResponseLoading,
    operationByIdLoading,
    testLoading,
  } = useSelector<RootStateType, projectReducer>(
    (state) => state.apiManagement.projects
  );

  const locationVal = location.split("/");

  let operationId = locationVal[6];
  const stageId = currentStage;
  const collectionIdVal = "";
  const operationIdVal = locationVal[6];

  const initialCheckboxStates: any = {};

  //------------------------------------------------------------useState--------------------------------------------------------------

  const [operSecurityLevelValue, setOperSecurityLevelValue] = useState(
    "Authenticated App Users"
  );

  const [btnValue, setBtnValue] = useState("Input Parameters");

  const [apiStageId, setApiStageId] = useState("");

  const [serviceVal, setServiceVal] = useState("");
  const [passThroughCookies, setPassThroughCookies] = useState("No");
  const [generateMockDate, setGenerateMockDate] = useState("No");
  const [valLabel, setValLabel] = useState("Body");
  const [val, setVal] = useState("Body");
  const [enablePassThrough, setEnablePassThrough] = useState(false);
  const [requestTemplate, setRequestTemplate] = useState(false);
  const [checkboxStates, setCheckBoxStates] = useState<any>(
    initialCheckboxStates
  );
  const [showTemplateDescription, setShowTemplateDescription] = useState("");
  const [rowsBody, setRowsBody] = useState<any[]>([
    {
      name: "",
      source_value: "request",
      test_value: "",
      default_value: "",
      data_type: "NUMBER",
      encode: false,
      description: "",
      param_order: 0,
      id: "",
      operation_id: operationId,
      is_deletable: true,
      pass_null: true,
      scope: "request",
      optional: true,
    },
  ]);

  const [rowsHeader, setRowsHeader] = useState([
    {
      name: "",
      source_value: "null",
      test_value: "",
      default_value: "",
      data_type: "NUMBER",
      encode: false,
      description: "",
      param_order: 0,
      id: "",
      operation_id: operationId,
      is_deletable: true,
      pass_null: true,
      scope: "request",
      optional: true,
    },
  ]);

  const [rowsAuthorization, setRowsAuthorization] = useState([
    {
      name: "",
      source_value: "null",
      test_value: "",
      default_value: "",
      data_type: "NUMBER",
      encode: false,
      description: "",
      param_order: 0,
      id: "",
      operation_id: operationId,
      is_deletable: true,
      pass_null: true,
      scope: "request",
      optional: true,
    },
  ]);

  const [rowsQueryParameters, setRowsQueryParameters] = useState([
    {
      name: "",
      source_value: "null",
      test_value: "",
      default_value: "",
      data_type: "NUMBER",
      encode: false,
      description: "",
      param_order: 0,
      id: "",
      operation_id: operationId,
      is_deletable: true,
      pass_null: true,
      scope: "request",
      optional: true,
    },
  ]);

  const [rowsOutput, setRowsOutput] = useState<any>([
    {
      name: "",
      path: "",
      scope: "",
      data_type: "",
      collection_id: "",
      record_id: "",
      description: "",
      id: "",
    },
  ]);

  const [collectionDetails, setCollectionDetails] = useState<any>({
    user_id: userProfile?.user?.user_id,
    collection_id: collectionIdVal,
    project_id: currentEnvironment,
    stage_id: apiStageId,
    name: "",
    type: "OWNER",
    base_url: "",
    web_service_authentication: "NONE",
    description: "",
    status: "ACTIVE",
    service_type: serviceVal,
    wsdl_url: "",
    version: "1.0",
    activeVersionID: "null",
    active_vesion: "null",
  });

  const [operationDetails, setOperationDetails] = useState<any>({
    user_id: userProfile?.user?.user_id,
    collections_id: collectionIdVal,
    operation_id: operationId,
    name: "",
    description: "",
    passThroughForHeaders: true,
    passThroughForOutputs: true,
    passThroughForInputs: true,
    passThroughForAuthorization: "null",
    passthroughqueryparameteres: "null",
    status: "ACTIVE",
    security_type: "Authenticated App Users",
    serviceType: serviceVal || "JSON",
    soap_action: "null",
    soap_version: "null",
    endpoint_url: collectionDetails?.base_url,
    response_encoding: "null",
    server_auth_mode: "null",
    binding_name: "null",
    soap_input_message: "null",
    http_method: "GET",
    method_name: "",
    operationHeaders: rowsHeader,
    operationInputs: rowsBody,
    operation_authorization: rowsAuthorization,
    operationQueryparameters: rowsQueryParameters,
    operationOutputs: rowsOutput,
    service_type: serviceVal,
    publish_name: "null",
    passThroughPayload: "null",
    passThroughHeaders: "null",
    passThrough_Cookies: "No",
    generate_MockDate: "No",
    endpoint_status: "",
    private_or_public: "null",
    input_type: "FORM_DATA",
    raw_payload: "null",
    raw_output: "null",
  });

  const [errorApiOperationName, setErrorApiOperationName] = useState("");

  const [saveGetResponseClicked, setSaveGetResponseClicked] = useState(false);

  const [rowsSelected, setRowsSelected] = useState(false);
  const [deleteRowClicked, setDeleteRowClicked] = useState(false);
  const [rowId, setRowId] = useState<any>([]);

  const [currentLocation, setCurrentLocation] = useState("");
  const [prevOperations, setPrevOperations] = useState<any>({});
  const [prevCollections, setPrevCollections] = useState<any>({});
  const [changeUrlDialog, setChangeUrlDialog] = useState(false);
  const [changeOccuredColl, setChangeOccuredColl] = useState(false);
  const [changeOccuredOper, setChangeOccuredOper] = useState(false);
  const [clickedLocation, setClickedLocation] = useState("");

  const [invalidIdValues, setInvalidIdValues] = useState(false);
  const [operationSpellValidation, setOpertionSpellValidation] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [backgroundUrlClicked, setBackgroundUrlClicked] = useState(false);
  const [backgroundUrlData, setBackgroundUrlData] = useState<any[]>([]);

  const [activeTab, setActiveTab] = React.useState(0);

  const open = Boolean(anchorEl);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: `${translate("apiManagement.NAME")}`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div style={{ marginTop: "21px" }}>
          <GInput
            id="name"
            width="110px"
            border="none"
            size="normal"
            fontSize="10px"
            defaultValue={params?.row?.name}
            disableUnderline={true}
            variant="standard"
            onKeyDown={(event: any) => {
              event?.stopPropagation();
            }}
            onChangeHandler={(e: any) => {
              onOpTabChange(e, params?.row);
            }}
          />
        </div>
      ),
    },
    {
      field: "scope",
      headerName: `Scope`,

      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: any) => (
        <div style={{}}>
          <FormControl>
            <Select
              id={"scope"}
              variant="standard"
              value={params?.row?.scope || "request"}
              style={{
                width: "100px",
                height: "60px",
                padding: "0",
                fontSize: "10px",
                color: "#FFFFFF",
              }}
              onChange={(e: any) => {
                let event = {
                  target: {
                    value: e.target.value,
                    id: "scope",
                  },
                };
                onOpTabChange(event, params?.row);
              }}
            >
              <MenuItem value="request" style={{ fontSize: "10px" }}>
                request
              </MenuItem>
              <MenuItem value="session" style={{ fontSize: "10px" }}>
                session
              </MenuItem>
              <MenuItem value="identity" style={{ fontSize: "10px" }}>
                identity
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      ),
    },
    {
      field: "test_value",
      headerName: `${translate("apiManagement.TEST_VALUE")}`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ marginTop: "21px" }}>
          <GInput
            id="test_value"
            width="110px"
            border="none"
            size="normal"
            defaultValue={params?.row?.test_value}
            disableUnderline={true}
            variant="standard"
            onKeyDown={(event: any) => {
              event?.stopPropagation();
            }}
            onChangeHandler={(e: any) => {
              onOpTabChange(e, params?.row);
            }}
          />
        </div>
      ),
    },
    {
      field: "default_value",
      headerName: `${translate("apiManagement.DEFAULT_VALUE")}`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
      renderCell: (params: any) => (
        <div style={{ marginTop: "21px" }}>
          <GInput
            id="default_value"
            width="110px"
            border="none"
            size="normal"
            defaultValue={params?.row?.default_value}
            disableUnderline={true}
            variant="standard"
            onKeyDown={(event: any) => {
              event?.stopPropagation();
            }}
            onChangeHandler={(e: any) => {
              onOpTabChange(e, params?.row);
            }}
          />
        </div>
      ),
    },
    {
      field: "data_type",
      headerName: `${translate("apiManagement.DATA_TYPE")}`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: any) => (
        <div style={{ fontSize: "10px" }}>
          <FormControl>
            <Select
              id={"data_type"}
              variant="standard"
              value={params?.row?.data_type || "NUMBER"}
              style={{
                width: "100px",
                height: "60px",
                padding: "0",
                fontSize: "10px",
                color: "#FFFFFF",
              }}
              onChange={(e: any) => {
                let event = {
                  target: {
                    value: e.target.value,
                    id: "data_type",
                  },
                };
                onOpTabChange(event, params?.row);
              }}
            >
              <MenuItem value="NUMBER" style={{ fontSize: "10px" }}>
                Number
              </MenuItem>
              <MenuItem value="STRING" style={{ fontSize: "10px" }}>
                String
              </MenuItem>
              <MenuItem value="BOOLEAN" style={{ fontSize: "10px" }}>
                Boolean
              </MenuItem>
              <MenuItem value="DOUBLE" style={{ fontSize: "10px" }}>
                Double
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      ),
    },
    {
      field: "encode",
      headerName: `${translate("apiManagement.ENCODE")}`,
      sortable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params: any) => (
        <div style={{ marginLeft: "40px" }}>
          <RadioCheckboxComponent
            checked={checkboxStates[params?.row?.name] ?? true}
            onChange={(e: any) => {
              handleCheckBox(params?.row?.name);
            }}
          />
        </div>
      ),
    },
    {
      field: "description",
      headerName: `${translate("apiManagement.DESCRIPTION_CAPS")}`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div style={{ marginTop: "21px" }}>
          <GInput
            id="description"
            width="110px"
            border="none"
            size="normal"
            defaultValue={params?.row?.description}
            disableUnderline={true}
            variant="standard"
            onKeyDown={(event: any) => {
              event?.stopPropagation();
            }}
            onChangeHandler={(e: any) => {
              onOpTabChange(e, params?.row);
            }}
          />
        </div>
      ),
    },
  ];

  //--------------------------------------------------------------functions----------------------------------------------------------

  const {
    onOpTabChange,
    capitalizeFirstLetter,
    formatWithLineNumbers,
    validateNameLength,
    validateSpecialCharacters,
    validateEmptyName,
    validateOperationDetails,
    getNavLinks,
    getFormattedData,
  } = useOperation({
    valLabel,
    setRowsBody,
    rowsBody,
    setRowsHeader,
    rowsHeader,
    setRowsAuthorization,
    rowsAuthorization,
    setRowsQueryParameters,
    rowsQueryParameters,
    operationDetails,
    collectionDetails,
  });
  //predefined values
  const navLinks = getNavLinks(valLabel);
  const {
    requestResponseStatus,
    requestResponseStatusCode,
    formattedRequest,
    formattedResponse,
    formattedServiceInput,
    formattedServiceOutput,
  } = getFormattedData(saveGetResponseData);

  useEffect(() => {}, [prevCollections, prevOperations]);

  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
    const selectedNav = navLinks[newValue];
    navLinkHandler(selectedNav?.id, selectedNav?.label);
    setEnablePassThrough(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setBackgroundUrlClicked(true);
    handleBackgroundUrlList();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setBackgroundUrlClicked(false);
  };

  const handleOperationDetails = (field: any, event: any) => {
    setCurrentLocation(location);
    setChangeOccuredOper(true);
    setOperationDetails((prevValues: any) => ({
      ...prevValues,
      [field]: event,
    }));
    setPrevOperations((prevValues: any) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handlePassthroughCookies = (val: any) => {
    setPassThroughCookies(val);
  };

  const handleGenerateMockDate = (val: any) => {
    setGenerateMockDate(val);
  };

  const handleOperationValidation = (type: any) => {
    if (type === "operationName") {
      const name = operationDetails?.name || "";

      const error =
        validateEmptyName(name) ||
        validateSpecialCharacters(name) ||
        validateNameLength(name);

      if (error) {
        setErrorApiOperationName(error);
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    }
  };

  const handleCreateOperationSave = () => {
    let createOperationDetails = {
      collections_id: collectionIdVal,
      name: operationDetails?.name,
      description: operationDetails?.description || "",
      passThroughForHeaders: false,
      passThroughForOutputs: false,
      passThroughForInputs: false,
      passThroughForAuthorization: true,
      passthroughqueryparameteres: true,
      status: operationDetails?.status || "ACTIVE",
      security_type:
        operationDetails?.security_type || "Authenticated App Users",
      serviceType: serviceVal,
      soap_action: "null",
      soap_version: "null",
      endpoint_url: collectionDetails?.base_url,
      response_encoding: "null",
      server_auth_mode: "null",
      binding_name: "null",
      soap_input_message: "null",
      http_method: operationDetails?.http_method || "GET",
      method_name: operationDetails?.method_name,
      operationHeaders: rowsHeader,
      operationInputs: rowsBody,
      operation_authorization: rowsAuthorization,
      operationQueryparameters: rowsQueryParameters,
      operationOutputs: rowsOutput,
      publish_name: "null",
      passThroughPayload: "null",
      passThroughHeaders: "null",
      input_type: "FORM_DATA",
      raw_payload: "null",
      raw_output: "null",
    };

    dispatch(CreateOperation(createOperationDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Operation created successfully");
        setCookies(
          process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "",
          res?.id,
          userProfile?.user?.expiration_time
        );

        let getOperationValues = {
          project_id: currentEnvironment,
          stage_id: stageId || currentStage,
        };

        dispatch(GetOperations(getOperationValues))
          .unwrap()
          .then((res: any) => {
            dispatch(updateTourStep(tourStep + 1));
          })
          .catch((error: any) => {
            toast.error(error?.message);
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      })
      .catch((error: any) => {
        if (error?.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  };

  const handleUpdateOperationSave = () => {
    let updateOperationDetails = {
      project_id: currentEnvironment,
      details: {
        collection_id: collectionIdVal,
        operation_id: operationId,
        name: operationDetails?.name,
        description: operationDetails?.description || "",
        passThroughForHeaders: true,
        passThroughForOutputs: true,
        passThroughForInputs: true,
        passThroughForAuthorization: true,
        passthroughqueryparameteres: true,
        status: operationDetails?.status || "ACTIVE",
        security_type:
          operationDetails?.security_type || "Authenticated App Users",
        serviceType: operationDetails?.service_type || serviceVal,
        soap_action: operationDetails?.soap_action,
        endpoint_url: operationDetails?.endpoint_url,
        soap_version: operationDetails?.soap_version,
        response_encoding: operationDetails?.response_encoding || "",
        server_auth_mode: operationDetails?.server_auth_mode || "",
        binding_name: operationDetails?.binding_name || "null",
        soap_input_message: operationDetails?.soap_input_message,
        http_method: operationDetails?.http_method,
        method_name: operationDetails?.method_name,
        service_type: operationDetails?.service_type || serviceVal,
        operationHeaders: rowsHeader,
        operationInputs: rowsBody,
        operation_authorization: rowsAuthorization,
        operationQueryparameters: rowsQueryParameters,
        publish_name: operationDetails?.publish_name || "",
        passThroughPayload: "passThroughPayload",
        passThroughHeaders: "passThroughHeaders",
        input_type: "FORM_DATA",
        raw_payload: "null",
        raw_output: "null",
      },
    };

    dispatch(UpdateOperation(updateOperationDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Operation updated successfully");
        setCookies(
          process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "",
          operationId,
          userProfile?.user?.expiration_time
        );

        let getOperationValues = {
          project_id: currentEnvironment,
          stage_id: stageId || currentStage,
        };

        dispatch(GetOperations(getOperationValues))
          .unwrap()
          .then((res: any) => {})
          .catch((error: any) => {
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      })
      .catch((error: any) => {
        toast.error(error?.message);
        if (error?.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  };

  const handleCreateOperationSaveGet = () => {
    let createOperationDetails = {
      collections_id: collectionIdVal,
      name: operationDetails?.name,
      description: operationDetails?.description || "",
      passThroughForHeaders: true,
      passThroughForOutputs: true,
      passThroughForInputs: true,
      passThroughForAuthorization: true,
      passthroughqueryparameteres: true,
      status: operationDetails?.status || "ACTIVE",
      security_type:
        operationDetails?.security_type || "Authenticated App Users",
      serviceType: serviceVal || "JSON",
      soap_action: "null",
      soap_version: "null",
      endpoint_url: collectionDetails?.base_url,
      response_encoding: "null",
      server_auth_mode: "null",
      binding_name: "null",
      soap_input_message: "null",
      http_method: operationDetails?.http_method || "GET",
      method_name: operationDetails?.method_name,
      operationHeaders: rowsHeader,
      operationInputs: rowsBody,
      operation_authorization: rowsAuthorization,
      operationQueryparameters: rowsQueryParameters,
      operationOutputs: rowsOutput,
      publish_name: "null",
      passThroughPayload: "null",
      passThroughHeaders: "null",
      input_type: "FORM_DATA",
      raw_payload: "null",
      raw_output: "null",
    };

    dispatch(CreateOperation(createOperationDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Operation created successfully");
        setTimeout(() => {
          dispatch(updateTourStep(tourStep + 1));
        }, 5000);
        setCookies(
          process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "",
          operationId,
          userProfile?.user?.expiration_time
        );

        // call test api
        testOperation(res?.id);

        let getOperationValues = {
          project_id: currentEnvironment,
          stage_id: stageId || currentStage,
        };

        dispatch(GetOperations(getOperationValues))
          .unwrap()
          .then((res: any) => {})
          .catch((error: any) => {
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      })
      .catch((error: any) => {
        toast.error(error?.message);
        if (error?.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  };

  const handleUpdateOperationSaveGet = () => {
    let updateOperationDetails = {
      project_id: currentEnvironment,

      details: {
        collection_id: collectionIdVal,
        operation_id: operationId,
        name: operationDetails?.name,
        description: operationDetails?.description || "",
        passThroughForHeaders: true,
        passThroughForOutputs: true,
        passThroughForInputs: true,
        passThroughForAuthorization: true,
        passthroughqueryparameteres: true,
        status: operationDetails?.status || "ACTIVE",
        security_type:
          operationDetails?.security_type || "Authenticated App Users",
        serviceType: operationDetails?.service_type || serviceVal,
        soap_action: operationDetails?.soap_action,
        endpoint_url: operationDetails?.endpoint_url,
        soap_version: operationDetails?.soap_version,
        response_encoding: operationDetails?.response_encoding || "",
        server_auth_mode: operationDetails?.server_auth_mode || "",
        binding_name: operationDetails?.binding_name || "null",
        soap_input_message: operationDetails?.soap_input_message,
        http_method: operationDetails?.http_method,
        method_name: operationDetails?.method_name,
        service_type: operationDetails?.service_type || serviceVal,
        operationHeaders: rowsHeader,
        operationInputs: rowsBody,
        operation_authorization: rowsAuthorization,
        operationQueryparameters: rowsQueryParameters,
        publish_name: operationDetails?.publish_name || "",
        passThroughPayload: "passThroughPayload",
        passThroughHeaders: "passThroughHeaders",
        input_type: "FORM_DATA",
        raw_payload: "null",
        raw_output: "null",
      },
    };
    dispatch(UpdateOperation(updateOperationDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Operation updated successfully");
        setCookies(
          process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "",
          operationId,
          userProfile?.user?.expiration_time
        );
        setTimeout(() => {
          dispatch(updateTourStep(tourStep + 1));
        }, 5000);
        // call test api
        testOperation(res?.id);

        let getOperationValues = {
          project_id: currentEnvironment,
          stage_id: stageId || currentStage,
        };

        dispatch(GetOperations(getOperationValues))
          .unwrap()
          .then((res: any) => {})
          .catch((error: any) => {
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      })
      .catch((error: any) => {
        toast.error(error?.message);
        if (error?.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
  };

  const handleSaveOperationBtn = () => {
    if (currentLocation === location) {
      setChangeOccuredOper(false);
    }

    setSaveGetResponseClicked(false);

    const validationError = validateOperationDetails(operationDetails);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (operationId?.trim() === undefined) {
      handleCreateOperationSave();
    } else {
      handleUpdateOperationSave();
    }
  };

  const handleSaveGetResponseBtn = () => {
    if (currentLocation === location) {
      setChangeOccuredOper(false);
    }

    const validationError = validateOperationDetails(operationDetails);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (operationId?.trim() === undefined) {
      handleCreateOperationSaveGet();
    } else {
      handleUpdateOperationSaveGet();
    }
  };

  function testOperation(operationIDVal: any) {
    let getResponseData = {
      operationId: operationIDVal,
      data: {
        user_id: userProfile?.user?.user_id,
        operationInputs: rowsBody?.map((val: any) => ({
          key: val?.name,
          value: val?.test_value,
        })),
        operationHeaders: rowsHeader?.map((val: any) => ({
          key: val?.name,
          value: val?.test_value,
        })),
        requestPayload: "null",
      },
    };

    if (collectionDetails?.service_type === "SOAP" || serviceVal === "SOAP") {
      dispatch(SoapOperationById(getResponseData))
        .unwrap()
        .then((res: any) => {
          setSaveGetResponseClicked(true);
        })
        .catch((error: any) => {
          toast?.error(error?.message, {
            style: {
              minWidth: "900px",
              height: "500px",
              overflowY: "auto",
              fontSize: "10px",
            },
          });
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    } else {
      dispatch(GetOpertionTest(getResponseData))
        .unwrap()
        .then((res: any) => {
          setSaveGetResponseClicked(true);
        })
        .catch((error: any) => {
          toast?.error(error?.message, {
            style: {
              minWidth: "900px",
              height: "500px",
              overflowY: "auto",
              fontSize: "10px",
            },
          });
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }

  const handleAddRowButton = (val: any) => {
    let newRows = {
      name: "",
      source_value: "null",
      test_value: "",
      default_value: "",
      data_type: "NUMBER",
      encode: false,
      description: "",
      param_order: rowsBody?.length,
      id: "",
      operation_id: operationId,
      is_deletable: true,
      pass_null: true,
      scope: "request",
      optional: true,
    };

    if (valLabel === "Body") {
      setRowsBody((prevValues: any) => [
        ...prevValues,
        {
          ...newRows,
          id: "body" + rowsBody?.length + 1,
          param_order: rowsBody?.length,
        },
      ]);
    } else if (valLabel === "Header") {
      setRowsHeader((prevValues: any) => [
        ...prevValues,
        {
          ...newRows,
          id: "header" + rowsHeader?.length + 1,
          param_order: rowsBody?.length,
        },
      ]);
    } else if (valLabel === "Authorization") {
      setRowsAuthorization((prevValues: any) => [
        ...prevValues,
        {
          ...newRows,
          id: "auth" + rowsAuthorization?.length + 1,
          param_order: rowsBody?.length,
        },
      ]);
    } else if (valLabel === "Query Parameters") {
      setRowsQueryParameters((prevValues: any) => [
        ...prevValues,
        {
          ...newRows,
          id: "param" + rowsQueryParameters?.length + 1,
          param_order: rowsBody?.length,
        },
      ]);
    } else {
    }
  };

  const navLinkHandler = (valId: any, valLabel: any) => {
    setVal(valId);
    setValLabel(valLabel);
  };

  const handleCheckBox = (name: any) => {
    setCheckBoxStates((prevStates: any) => ({
      ...prevStates,
      [name]: !prevStates[name],
    }));
  };

  const handleRowDelete = (rowIds: any) => {
    if (rowIds?.length !== 0) {
      setRowsSelected(true);
    } else {
      setRowsSelected(false);
    }
  };

  const handleDeleteRows = () => {
    if (valLabel === "Body") {
      const updatedRow = rowsBody?.filter(
        (rows: any) => !rowId?.includes(rows?.id)
      );

      setRowsBody(updatedRow);
      setDeleteRowClicked(false);
    }
    if (valLabel === "Header") {
      const updatedRow = rowsHeader?.filter(
        (rows: any) => !rowId?.includes(rows?.id)
      );

      setRowsHeader(updatedRow);
      setDeleteRowClicked(false);
    }
    if (valLabel === "Authorization") {
      const updatedRow = rowsAuthorization?.filter(
        (rows: any) => !rowId?.includes(rows?.id)
      );

      setRowsAuthorization(updatedRow);
      setDeleteRowClicked(false);
    }
    if (valLabel === "Query Parameters") {
      const updatedRow = rowsQueryParameters?.filter(
        (rows: any) => !rowId?.includes(rows?.id)
      );

      setRowsQueryParameters(updatedRow);
      setDeleteRowClicked(false);
    }
    setDeleteRowClicked(false);
  };

  const handleBackgroundUrlList = () => {
    // dispatch(BackgroundUrlList("ccd743827c4f4f07be7ac6c54654abf0"))
    dispatch(BackgroundUrlList(operationId))
      .unwrap()
      .then((res: any) => {
        setBackgroundUrlData(res);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  };

  const handleBtnClick = (val: any) => {
    setBtnValue(val);
  };

  useEffect(() => {
    if (collectionIdVal && currentEnvironment) {
      dispatch(
        GetCollectionById({
          collection_id: collectionIdVal,
          project_id: currentEnvironment,
        })
      )
        .unwrap()
        .then((res: any) => {
          setCollectionDetails({
            user_id: userProfile?.user?.user_id,
            collection_id: res?.collections_id,
            project_id: res?.project_id,
            stage_id: apiStageId,
            name: res?.name,
            type: res?.type,
            base_url: res?.base_url,
            web_service_authentication: res?.web_service_authentication,
            description: res?.description,
            status: "ACTIVE",
            service_type: res?.service_type || serviceVal,
            wsdl_url: res?.wsdl_url,
            version: "1.0",
            activeVersionID: "null",
            active_vesion: "null",
          });
        })
        .catch((error: any) => {
          console.log("collectionResponseError: ", error);
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }

    setSaveGetResponseClicked(false);
  }, [collectionIdVal, operationId, location]);

  useEffect(() => {
    if (operationLists?.length > 0 && operationId !== undefined) {
      singleOperationData?.map((val: any) => {
        setOperationDetails({
          operationId: val?.id,
          name: val?.name,
          description: val?.description,
          pass_through_forheaders: val?.pass_through_forheaders,
          pass_through_forinputs: val?.pass_through_forinputs,
          pass_through_foroutputs: val?.pass_through_foroutputs,
          pass_through_authorization: val?.pass_through_authorization,
          pass_through_queryparameters: val?.pass_through_queryparameters,
          status: val?.status,
          security_type: val?.security_type || "Authenticated App Users",
          soap_action: val?.soap_action,
          endpoint_url: val?.endpoint_url,
          soap_version: val?.soap_version,
          response_encoding: val?.response_encoding,
          server_auth_mode: val?.server_auth_mode,
          binding_name: val?.binding_name,
          soap_input_message: val?.soap_input_message,
          http_method: val?.http_method,
          collections_id: val?.collections_id,
          publish_name: val?.publish_name,
          method_name: val?.method_name,
          generate_MockDate: "No",
          operationHeaders: rowsHeader,
          operationInputs: rowsBody,
          operation_Authorizations: rowsAuthorization,
          operation_queryparamaeters: rowsQueryParameters,
          operationOutputs: rowsOutput,
          passThroughPayload: val?.passThroughPayload,
          passThroughHeaders: val?.passThroughHeaders,
          endpoint_status: val?.endpoint_status,
          private_or_public: val?.private_or_public,
          input_type: val?.input_type,
          raw_payload: val?.raw_payload,
          raw_output: val?.raw_output,
        });

        setRowsBody([...val?.operationInputs]);
        setRowsHeader([...val?.operationHeaders]);
        setRowsAuthorization([...val?.operation_Authorizations]);
        setRowsQueryParameters([...val?.operation_queryparamaeters]);
        setRowsOutput([]);

        return null;
      });
    }
  }, [singleOperationData, operationId]);

  useEffect(() => {
    if (saveGetResponseData?.operationOutputs !== undefined) {
      setRowsOutput(saveGetResponseData?.operationOutputs);
    }
  }, [saveGetResponseData]);

  useEffect(() => {
    if (saveGetResponseClicked) {
      const containerElement = document.getElementById(maninContainer);

      if (containerElement) {
        containerElement.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      }
    }
  }, [saveGetResponseClicked]);

  useEffect(() => {
    setClickedLocation(location);
    if (currentLocation !== location) {
      setClickedLocation(location);
    }
    if (currentLocation?.trim() !== "") {
      if (changeOccuredColl === true || changeOccuredOper === true) {
        setChangeUrlDialog(true);
        setInvalidIdValues(false);
      } else {
        setCurrentLocation("");
        setChangeUrlDialog(false);
      }
    }
  }, [location]);

  useEffect(() => {
    dispatch(GetAllStagesByProjectId(currentEnvironment))
      .unwrap()
      .then((res: any) => {
        setApiStageId(res?.[0]?.apistage_id);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  }, []);

  useEffect(() => {
    let data = {
      operation_id: operationIdVal,
      project_id: currentEnvironment,
    };
    if (operationIdVal && currentEnvironment) {
      dispatch(GetOperationById(data))
        .unwrap()
        .then((res: any) => {
          res?.map((val: any) => {
            setOperationDetails({
              operationId: val?.id,
              name: val?.name,
              description: val?.description,
              pass_through_forheaders: false,
              pass_through_forinputs: false,
              pass_through_foroutputs: false,
              pass_through_authorization: "null",
              pass_through_queryparameters: "null",
              status: val?.status,
              security_type: val?.security_type || "Authenticated App Users",
              soap_action: val?.soap_action,
              endpoint_url: val?.endpoint_url,
              soap_version: val?.soap_version,
              response_encoding: "null",
              server_auth_mode: "null",
              binding_name: val?.binding_name,
              soap_input_message: val?.soap_input_message,
              http_method: val?.http_method,
              collections_id: val?.collections_id,
              publish_name: "null",
              method_name: val?.method_name,
              generate_MockDate: "No",
              operationHeaders: rowsHeader,
              operationInputs: rowsBody,
              operation_Authorizations: rowsAuthorization,
              operation_queryparamaeters: rowsQueryParameters,
              operationOutputs: rowsOutput,
              passThroughPayload: "null",
              passThroughHeaders: "null",
              endpoint_status: val?.endpoint_status,
              private_or_public: val?.private_or_public,
              input_type: val?.input_type,
              raw_payload: val?.raw_payload,
              raw_output: val?.raw_output,
            });
            setRowsBody([...val?.operationInputs]);
            setRowsHeader([...val?.operationHeaders]);
            setRowsAuthorization([...val?.operation_Authorizations]);
            setRowsQueryParameters([...val?.operation_queryparamaeters]);
            return null;
          });
          setChangeOccuredColl(false);
          setChangeOccuredOper(false);
          setChangeUrlDialog(false);
        })
        .catch((error: any) => {
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }, [operationIdVal]);

  if (operationSpellValidation) {
    return <PageNotFound />;
  }

  return (
    <Grid
      size={{
        xl: 12,
        lg: 12,
        md: 12,
        xs: 12,
      }}
    >
      <CardContainer>
        <Box
          sx={{
            padding: "30px",
          }}
        >
          {operationByIdLoading && <GlobalLoader />}
          <HeadingTypography>Application / Get Application</HeadingTypography>

          <Grid
            size={{
              xl: 12,
              lg: 12,
              md: 12,
              xs: 12,
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                <Box
                  sx={{
                    margin: "20px 0px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <InfoIcon
                    style={{
                      fontSize: "15px",
                      marginRight: "5px",
                      color: `#ACAAB3`,
                      fontWeight: 900,
                    }}
                  />
                  <SecondaryTypography
                    sx={{
                      color: "#ACAAB3",
                      fontSize: "16px",
                      fontWeight: 500,
                    }}
                  >
                    {`Marked as ${capitalizeFirstLetter(
                      operationDetails?.endpoint_status
                    )}`}
                  </SecondaryTypography>
                </Box>
                <>
                  <ApiInsights />
                </>
              </Box>
            </Stack>
          </Grid>

          {/* operations */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
              <div className="api_operation_name">
                <PrimaryTypography>
                  {translate("apiManagement.API_OPERATION_NAME")}
                </PrimaryTypography>
                <GInput
                  fullWidth={true}
                  height="50px"
                  value={operationDetails?.name}
                  margin="10px 0px"
                  onChangeHandler={(e: any) => {
                    let name = e.target.value;
                    handleOperationDetails("name", name);
                  }}
                  onKeyUp={(event: any) => {
                    if (event?.key === "Enter") {
                      // dispatch(updateTourStep(tourStep + 1));
                      handleOperationValidation("operationName");
                    }
                  }}
                  error={errorApiOperationName}
                  errorHandler={(error: any) => setErrorApiOperationName(error)}
                />
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
              <PrimaryTypography>
                {translate("apiManagement.OPERATION_SECURITY_LEVEL")}
              </PrimaryTypography>
              <GSelect
                fullWidth={true}
                borderHeight="52px"
                fontSize="0.7rem"
                color="#ACAAB3"
                fontWeight={500}
                margin="10px 0px"
                border="1px solid #F3F3F340"
                radius="7px"
                options={operationSecrityLevelData?.map((x) => ({
                  label: x,
                  value: x,
                }))}
                value={
                  operationDetails?.security_type === "null"
                    ? operSecurityLevelValue
                    : operationDetails?.security_type
                }
                iconPosition="end"
                icon={
                  <KeyboardArrowDownIcon
                    sx={{
                      color: "#EEEEEE",
                      fontSize: "10px",
                      fontWeight: "800",
                    }}
                  />
                }
                onChange={(val: any) => {
                  setOperSecurityLevelValue(val);
                  handleOperationDetails("security_type", val);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{ marginTop: "15px" }}
          >
            <PrimaryTypography
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {translate("apiManagement.API_OPERATION_URL")}
              {/* <span> */}
              <Tooltip arrow title="Click here to see the background url.">
                <InfoIcon
                  style={{
                    fontSize: "20px",
                    marginLeft: "10px",
                    color: `#ACAAB3`,
                    fontWeight: 900,
                  }}
                  onClick={(e: any) => {
                    handleClick(e);
                  }}
                />
              </Tooltip>
              {/* </span> */}
            </PrimaryTypography>
            <div className="api_operation_url">
              <Box
                sx={{
                  border: "1.5px solid #F3F3F340",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  borderRadius: "7px",
                  marginTop: "10px",
                }}
              >
                <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                  <Box
                    sx={{ borderRight: "1.5px solid #F3F3F340", width: "100%" }}
                  >
                    <GInput
                      fullWidth={true}
                      height="50px"
                      border="none"
                      disabled={true}
                      disabledColor="#ACAAB3"
                      value={operationDetails?.endpoint_url}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                  <Box
                    sx={{ borderRight: "1.5px solid #F3F3F340", width: "100%" }}
                  >
                    <GInput
                      fullWidth={true}
                      height="50px"
                      border="none"
                      value={operationDetails?.method_name}
                      onChangeHandler={(e: any) => {
                        let methodName = e.target.value;
                        handleOperationDetails("method_name", methodName);
                      }}
                      onKeyUp={(event: any) => {
                        if (event?.key === "Enter") {
                          // dispatch(updateTourStep(tourStep + 1));
                          handleOperationValidation("operationUrl");
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                  <Box>
                    <Select
                      value={operationDetails?.http_method}
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        width: "100%",
                        color: "#fff",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        fontFamily: "FiraSans-regular",

                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#FFFFFF",
                          fontSize: "small",
                        },
                      }}
                      onChange={(val: any) => {
                        handleOperationDetails("http_method", val);
                      }}
                    >
                      <MenuItem value="GET">GET</MenuItem>
                      <MenuItem value="POST">POST</MenuItem>
                      <MenuItem value="PUT">PUT</MenuItem>
                      <MenuItem value="DELETE">DELETE</MenuItem>
                    </Select>
                  </Box>
                </Grid>
              </Box>
            </div>
          </Grid>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
              <PrimaryTypography aria-required="true">
                {translate("apiManagement.PASS_THROUGH_COOKIES")}
              </PrimaryTypography>
              <RadioCheckboxComponent
                radioButton
                buttonWidth="13px"
                fontSize="16px"
                buttonColor={
                  passThroughCookies === `${translate("apiManagement.NO")}`
                    ? `#7946FD`
                    : `#FFFFFF`
                }
                strokeColor="#FFFFFF"
                label={
                  <SecondaryTypography
                    style={{
                      textTransform: "none",
                      fontWeight:
                        passThroughCookies ===
                        `${translate("apiManagement.NO")}`
                          ? 600
                          : 100,
                      color:
                        passThroughCookies ===
                        `${translate("apiManagement.NO")}`
                          ? "#FFFFFF"
                          : "#ACAAB3",
                    }}
                  >
                    {translate("apiManagement.NO")}
                  </SecondaryTypography>
                }
                checked={
                  passThroughCookies === `${translate("apiManagement.NO")}`
                }
                onChange={(e: any) => {
                  handlePassthroughCookies(`${translate("apiManagement.NO")}`);
                  handleOperationDetails(
                    "passThrough_Cookies",
                    passThroughCookies
                  );
                }}
              />
              <RadioCheckboxComponent
                radioButton
                buttonWidth="13px"
                fontSize="16px"
                buttonColor={
                  passThroughCookies === `${translate("apiManagement.YES")}`
                    ? `#7946FD`
                    : `#FFFFFF`
                }
                strokeColor="#FFFFFF"
                label={
                  <SecondaryTypography
                    style={{
                      textTransform: "none",
                      fontWeight:
                        passThroughCookies ===
                        `${translate("apiManagement.YES")}`
                          ? 600
                          : 400,
                      color:
                        passThroughCookies ===
                        `${translate("apiManagement.YES")}`
                          ? "#FFFFFF"
                          : "#ACAAB3",
                    }}
                  >
                    {translate("apiManagement.YES")}
                  </SecondaryTypography>
                }
                checked={
                  passThroughCookies === `${translate("apiManagement.YES")}`
                }
                onChange={(e: any) => {
                  handlePassthroughCookies(`${translate("apiManagement.YES")}`);
                  handleOperationDetails(
                    "passThrough_Cookies",
                    passThroughCookies
                  );
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8, xl: 8 }}>
              <PrimaryTypography aria-required="true">
                {translate("apiManagement.GENERATE_MOCK_DATE")}
              </PrimaryTypography>
              <RadioCheckboxComponent
                radioButton
                buttonWidth="13px"
                fontSize="16px"
                strokeColor="#FFFFFF"
                buttonColor={
                  generateMockDate === `${translate("apiManagement.NO")}`
                    ? `#7946FD`
                    : `#FFFFFF`
                }
                label={
                  <SecondaryTypography
                    style={{
                      textTransform: "none",
                      fontWeight:
                        generateMockDate === `${translate("apiManagement.NO")}`
                          ? 600
                          : 400,
                      color:
                        generateMockDate === `${translate("apiManagement.NO")}`
                          ? "#FFFFFF"
                          : "#ACAAB3",
                    }}
                  >
                    {translate("apiManagement.NO")}
                  </SecondaryTypography>
                }
                checked={
                  generateMockDate === `${translate("apiManagement.NO")}`
                }
                onChange={(e: any) => {
                  handleGenerateMockDate(`${translate("apiManagement.NO")}`);
                  handleOperationDetails("generate_MockDate", generateMockDate);
                }}
              />
              <RadioCheckboxComponent
                radioButton
                buttonWidth="13px"
                fontSize="16px"
                buttonColor={
                  generateMockDate === `${translate("apiManagement.YES")}`
                    ? `#7946FD`
                    : `#FFFFFF`
                }
                stroke={"#FFFFFF"}
                label={
                  <SecondaryTypography
                    style={{
                      textTransform: "none",
                      fontWeight:
                        generateMockDate === `${translate("apiManagement.YES")}`
                          ? 600
                          : 400,
                      color:
                        generateMockDate === `${translate("apiManagement.YES")}`
                          ? "#FFFFFF"
                          : "#ACAAB3",
                    }}
                  >
                    {translate("apiManagement.YES")}
                  </SecondaryTypography>
                }
                checked={
                  generateMockDate === `${translate("apiManagement.YES")}`
                }
                onChange={(e: any) => {
                  handleGenerateMockDate(`${translate("apiManagement.YES")}`);
                  handleOperationDetails("generate_MockDate", generateMockDate);
                }}
              />
            </Grid>
          </Stack>
          <Grid
            size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{ margin: "20px 0px" }}
          >
            <PrimaryTypography>
              {translate("apiManagement.DESCRIPTION")}
            </PrimaryTypography>
            <div>
              <FormControl sx={{ width: "100%" }}>
                <div style={{ marginTop: "10px" }}>
                  <TextOutlinedInput
                    style={{
                      width: "100%",
                      fontSize: "0.7",
                      fontWeight: 500,
                      padding: "15px",
                    }}
                    minRows={5}
                    placeholder=""
                    value={operationDetails?.description}
                    onChange={(e: any) => {
                      let description = e.target.value;
                      handleOperationDetails("description", description);
                    }}
                    onKeyUp={(event: any) => {
                      if (event?.key === "Enter") {
                        dispatch(updateTourStep(tourStep + 1));
                      }
                    }}
                  />
                </div>
              </FormControl>
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            {btnVal?.map((item: any) => (
              <GButton
                label={item}
                background={btnValue === item ? "#7A43FE" : "transparent"}
                color={btnValue === item ? "#EEEEEE" : "#FFFFFF"}
                border="1px solid"
                borderColor={btnValue === item ? "#7A43FE" : "#F3F3F340"}
                fontWeight={btnValue === item ? 600 : 400}
                radius="8px"
                padding="6px 30px"
                marginRight="15px"
                fontSize="15px"
                onClickHandler={() => handleBtnClick(item)}
              />
            ))}
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            sx={{
              margin: "10px 0px",
            }}
          >
            {btnValue === "Input Parameters" && (
              <>
                <Grid container spacing={10} alignItems="center">
                  <Grid size={{ xs: 12 }} className="pr-0">
                    <Tabs
                      value={activeTab}
                      onChange={handleTabChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      aria-label="scrollable auto tabs example"
                      textColor="inherit"
                      sx={{
                        "& .MuiTabs-indicator": {
                          borderRadius: "10px",
                          height: "5px",
                          backgroundColor: "#7A43FE",
                        },
                      }}
                    >
                      {navLinks?.map((nav, index) => (
                        <Tab
                          key={nav?.id}
                          label={
                            <SecondaryTypography
                              style={{
                                textTransform: "none",
                                color:
                                  index === activeTab ? "#FFFFFF" : "#acaab3",
                              }}
                            >
                              {nav?.label}
                            </SecondaryTypography>
                          }
                          disableRipple
                          sx={{
                            fontFamily: "FiraSans-regular",
                            "&.Mui-selected": { color: "#FFFFFF" },
                          }}
                        />
                      ))}
                    </Tabs>
                  </Grid>
                </Grid>

                <>
                  {(valLabel === "Body" || valLabel === "Header") &&
                    btnValue === "Input Parameters" && (
                      <>
                        <Grid
                          size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
                          sx={{ marginTop: "20px" }}
                        >
                          <Stack
                            direction={{
                              xs: "column",
                              sm: "column",
                              md: "column",
                              lg: "row",
                              xl: "row",
                            }}
                            sx={{
                              display: "flex",
                              flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "column",
                                lg: "row",
                                xl: "row",
                              },
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <SecondaryTypography
                                style={{ marginRight: "20px" }}
                              >
                                {translate("apiManagement.ENABLE_PASS_THROUGH")}
                              </SecondaryTypography>
                              <RadioCheckboxComponent
                                fontSize="15px"
                                buttonWidth="15px"
                                buttonColor={
                                  enablePassThrough === true
                                    ? `#7946FD`
                                    : `#FFFFFF`
                                }
                                label={
                                  <SecondaryTypography
                                    style={{
                                      textTransform: "none",
                                    }}
                                  >
                                    {translate("apiManagement.REQUEST")}{" "}
                                    {valLabel}
                                  </SecondaryTypography>
                                }
                                checked={enablePassThrough}
                                onChange={(e: any) => {
                                  setEnablePassThrough(e.target.checked);
                                }}
                              />
                            </Box>
                            {!enablePassThrough && (
                              <>
                                {valLabel === "Body" ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <SecondaryTypography
                                      style={{ marginRight: "20px" }}
                                    >
                                      {translate(
                                        "apiManagement.REQUEST_TEMPLATE"
                                      )}
                                    </SecondaryTypography>
                                    <RadioCheckboxComponent
                                      buttonWidth="15px"
                                      fontSize="15px"
                                      buttonColor={
                                        requestTemplate === true
                                          ? `#7946FD`
                                          : `#FFFFFF`
                                      }
                                      label={
                                        <SecondaryTypography
                                          style={{
                                            textTransform: "none",
                                          }}
                                        >
                                          {translate("apiManagement.SHOW")}
                                        </SecondaryTypography>
                                      }
                                      checked={requestTemplate}
                                      onChange={(e: any) => {
                                        setRequestTemplate(!requestTemplate);
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </Stack>
                        </Grid>
                      </>
                    )}
                </>
              </>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <div>
              <Backdrop
                sx={{
                  zIndex: 9998,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                open={backgroundUrlClicked}
              />
              {backgroundUrlClicked === true && anchorEl && (
                <div>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    sx={{
                      zIndex: 9999,
                      "& .MuiPaper-root": {
                        backgroundColor: theme.palette.signInUpWhite.main,
                        width: "500px",
                        height: "400px",
                        position: "absolute",
                        marginLeft: "10px",
                        top: "131px !important",
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
                          fontSize: "10px",
                          position: "absolute",
                          top: "18px",
                          right: "18px",
                          cursor: "pointer",
                          zIndex: "1",
                          color: `${theme.palette.primaryBlack.main}`,
                          marginBottom: "10px",
                        }}
                        onClick={() => {
                          handleClose();
                        }}
                      />
                      <HeadingTypography
                        style={{
                          fontSize: "10px",
                          fontFamily: "FiraSans-regular",
                        }}
                      >
                        Background Url List
                      </HeadingTypography>
                      <SecondaryTypography
                        style={{
                          color: `${theme.palette.teritiaryColor.main}`,
                          marginLeft: "10px",
                        }}
                      >
                        Here is the list of background URLs for the operation{" "}
                        <span style={{ fontWeight: 900 }}>
                          {operationDetails?.name}
                        </span>
                      </SecondaryTypography>
                      <div
                        style={{
                          padding: "10px",
                        }}
                      >
                        {backgroundUrlData?.length === 0 ? (
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
                                fontSize: "10px",
                              }}
                            >
                              No data found
                            </PrimaryTypography>
                          </>
                        ) : (
                          <>
                            {backgroundUrlData?.map(
                              (val: any, index: number) => (
                                <div
                                  key={val?.id}
                                  style={{
                                    padding: "5px",
                                  }}
                                >
                                  <pre
                                    style={{
                                      fontSize: "10px",
                                      fontFamily: "FiraSans-regular",
                                    }}
                                  >
                                    <SecondaryTypography>
                                      {`${index + 1}. `}
                                      {val?.background_url}
                                    </SecondaryTypography>
                                  </pre>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </Popover>
                </div>
              )}
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <div>
              {!enablePassThrough &&
                !requestTemplate &&
                btnValue === "Input Parameters" && (
                  <div style={{ display: "flex" }}>
                    <div>
                      <GButton
                        buttonType="primary"
                        fontSize="15px"
                        label={`Add ${valLabel} Row`}
                        icon={
                          <AddIcon
                            style={{
                              color: "#FFFFFF",
                              fontSize: "15px",
                            }}
                          />
                        }
                        onClickHandler={() => handleAddRowButton(valLabel)}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      {rowsSelected === true ? (
                        <>
                          <GButton
                            buttonType="primary"
                            fontSize="15px"
                            label={`Delete row`}
                            background="transparent"
                            icon={
                              <DeleteIcon
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  fill: `${theme.palette.mainRed.main}`,
                                }}
                              />
                            }
                            onClickHandler={() => {
                              setDeleteRowClicked(true);
                              handleDeleteRows();
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <div>
              {!enablePassThrough &&
              !requestTemplate &&
              btnValue !== "Output Parameters" ? (
                <>
                  <div style={{ marginTop: "10px" }}>
                    {valLabel === "Body" && btnValue !== "Output Parameters" ? (
                      <>
                        <Box
                          sx={{
                            borderLeft: "1.5px solid #F3F3F340",
                            borderRight: "1.5px solid #F3F3F340",
                          }}
                        >
                          <GDataGrid
                            hideFooter
                            checkboxSelection
                            dataGridType={"primary"}
                            columns={columns}
                            rows={rowsBody}
                            disableColumnMenu={true}
                            fontSize="0.6rem"
                            fontWeight={800}
                            color={`black`}
                            onRowSelect={(val: any) => {
                              handleRowDelete(val);
                              setRowId(val);
                            }}
                          />
                        </Box>
                      </>
                    ) : valLabel === "Header" &&
                      btnValue !== "Output Parameters" ? (
                      <>
                        <Box
                          sx={{
                            borderLeft: "1.5px solid #F3F3F340",
                            borderRight: "1.5px solid #F3F3F340",
                          }}
                        >
                          <GDataGrid
                            hideFooter
                            checkboxSelection
                            dataGridType={"primary"}
                            columns={columns}
                            rows={rowsHeader}
                            disableColumnMenu={true}
                            fontSize="0.6rem"
                            fontWeight={800}
                            color={`black`}
                            onRowSelect={(val: any) => {
                              handleRowDelete(val);
                              setRowId(val);
                            }}
                            processRowUpdate={(newVal: any, oldVal: any) => {
                              let updatedRow = { ...newVal };
                              let indexOfUpdatedRow = rowsHeader?.findIndex(
                                (item) => item?.id === updatedRow?.id
                              );
                              if (indexOfUpdatedRow !== -1) {
                                let updatedValue = [...rowsHeader];
                                updatedValue[indexOfUpdatedRow] = updatedRow;
                                setRowsHeader(updatedValue);
                              }
                            }}
                          />
                        </Box>
                      </>
                    ) : valLabel === "Authorization" &&
                      btnValue !== "Output Parameters" ? (
                      <>
                        <Box
                          sx={{
                            borderLeft: "1.5px solid #F3F3F340",
                            borderRight: "1.5px solid #F3F3F340",
                          }}
                        >
                          <GDataGrid
                            hideFooter
                            checkboxSelection
                            dataGridType={"primary"}
                            columns={columns}
                            rows={rowsAuthorization}
                            disableColumnMenu={true}
                            fontSize="0.6rem"
                            fontWeight={800}
                            color={`black`}
                            onRowSelect={(val: any) => {
                              handleRowDelete(val);
                              setRowId(val);
                            }}
                            processRowUpdate={(newVal: any, oldVal: any) => {
                              let updatedRow = { ...newVal };
                              let indexOfUpdatedRow =
                                rowsAuthorization?.findIndex(
                                  (item) => item?.id === updatedRow?.id
                                );
                              if (indexOfUpdatedRow !== -1) {
                                let updatedValue = [...rowsAuthorization];
                                updatedValue[indexOfUpdatedRow] = updatedRow;
                                setRowsAuthorization(updatedValue);
                              }
                            }}
                          />
                        </Box>
                      </>
                    ) : valLabel === "Query Parameters" &&
                      btnValue !== "Output Parameters" ? (
                      <>
                        <Box
                          sx={{
                            borderLeft: "1.5px solid #F3F3F340",
                            borderRight: "1.5px solid #F3F3F340",
                          }}
                        >
                          <GDataGrid
                            hideFooter
                            checkboxSelection
                            dataGridType={"primary"}
                            columns={columns}
                            rows={rowsQueryParameters}
                            disableColumnMenu={true}
                            fontSize="0.6rem"
                            fontWeight={800}
                            color={`black`}
                            onRowSelect={(val: any) => {
                              handleRowDelete(val);
                              setRowId(val);
                            }}
                            processRowUpdate={(newVal: any, oldVal: any) => {
                              let updatedRow = { ...newVal };
                              let indexOfUpdatedRow =
                                rowsQueryParameters?.findIndex(
                                  (item) => item?.id === updatedRow?.id
                                );
                              if (indexOfUpdatedRow !== -1) {
                                let updatedValue = [...rowsQueryParameters];
                                updatedValue[indexOfUpdatedRow] = updatedRow;
                                setRowsQueryParameters(updatedValue);
                              }
                            }}
                          />
                        </Box>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              ) : (
                <>
                  {requestTemplate === true &&
                  btnValue !== "Output Parameters" ? (
                    <>
                      <div style={{ display: "flex" }}>
                        <div>
                          <GButton
                            buttonType="secondary"
                            label={`Add ${valLabel} Row`}
                            background={`${theme.palette.LGrayishBlue.main}`}
                            icon={
                              <AddIcon
                                style={{
                                  fontSize: "15px",
                                  color: "#FFFFFF",
                                }}
                              />
                            }
                            onClickHandler={() => handleAddRowButton(valLabel)}
                          />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          {rowsSelected === true ? (
                            <>
                              <GButton
                                buttonType="secondary"
                                label={`Delete row`}
                                background={`${theme.palette.LGrayishBlue.main}`}
                                icon={
                                  <DeleteIcon
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      fill: `${theme.palette.mainRed.main}`,
                                    }}
                                  />
                                }
                                onClickHandler={() => {
                                  setDeleteRowClicked(true);
                                  handleDeleteRows();
                                }}
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div>
                        <Grid container>
                          <Grid size={{ xs: 6 }}>
                            <div style={{ marginTop: "10px" }}>
                              {valLabel === "Body" ? (
                                <>
                                  <Box
                                    sx={{
                                      borderLeft: "1.5px solid #F3F3F340",
                                      borderRight: "1.5px solid #F3F3F340",
                                      padding: "2px",
                                      overflow: "auto",
                                    }}
                                  >
                                    <GDataGrid
                                      hideFooter
                                      checkboxSelection
                                      dataGridType={"primary"}
                                      columns={columns}
                                      rows={rowsBody}
                                      disableColumnMenu={true}
                                      fontSize="0.6rem"
                                      fontWeight={800}
                                      color={`black`}
                                      onRowSelect={(val: any) => {
                                        handleRowDelete(val);
                                        setRowId(val);
                                      }}
                                    />
                                  </Box>
                                </>
                              ) : valLabel === "Header" ? (
                                <>
                                  <Box
                                    sx={{
                                      borderLeft: "1.5px solid #F3F3F340",
                                      borderRight: "1.5px solid #F3F3F340",
                                      padding: "2px",
                                      overflow: "auto",
                                    }}
                                  >
                                    <GDataGrid
                                      hideFooter
                                      checkboxSelection
                                      dataGridType={"primary"}
                                      columns={columns}
                                      rows={rowsHeader}
                                      disableColumnMenu={true}
                                      fontSize="0.6rem"
                                      fontWeight={800}
                                      color={`black`}
                                      onRowSelect={(val: any) => {
                                        handleRowDelete(val);
                                        setRowId(val);
                                      }}
                                      processRowUpdate={(
                                        newVal: any,
                                        oldVal: any
                                      ) => {
                                        let updatedRow = { ...newVal };
                                        let indexOfUpdatedRow =
                                          rowsHeader?.findIndex(
                                            (item) =>
                                              item?.id === updatedRow?.id
                                          );
                                        if (indexOfUpdatedRow !== -1) {
                                          let updatedValue = [...rowsHeader];
                                          updatedValue[indexOfUpdatedRow] =
                                            updatedRow;
                                          setRowsHeader(updatedValue);
                                        }
                                      }}
                                    />
                                  </Box>
                                </>
                              ) : valLabel === "Authorization" ? (
                                <>
                                  <Box
                                    sx={{
                                      borderLeft: "1.5px solid #F3F3F340",
                                      borderRight: "1.5px solid #F3F3F340",
                                      padding: "2px",
                                      overflow: "auto",
                                    }}
                                  >
                                    <GDataGrid
                                      hideFooter
                                      checkboxSelection
                                      dataGridType={"primary"}
                                      columns={columns}
                                      rows={rowsAuthorization}
                                      disableColumnMenu={true}
                                      fontSize="0.6rem"
                                      fontWeight={800}
                                      color={`black`}
                                      onRowSelect={(val: any) => {
                                        handleRowDelete(val);
                                        setRowId(val);
                                      }}
                                      processRowUpdate={(
                                        newVal: any,
                                        oldVal: any
                                      ) => {
                                        let updatedRow = { ...newVal };
                                        let indexOfUpdatedRow =
                                          rowsAuthorization?.findIndex(
                                            (item) =>
                                              item?.id === updatedRow?.id
                                          );
                                        if (indexOfUpdatedRow !== -1) {
                                          let updatedValue = [
                                            ...rowsAuthorization,
                                          ];
                                          updatedValue[indexOfUpdatedRow] =
                                            updatedRow;
                                          setRowsAuthorization(updatedValue);
                                        }
                                      }}
                                    />
                                  </Box>
                                </>
                              ) : valLabel === "Query Parameters" ? (
                                <>
                                  <Box
                                    sx={{
                                      borderLeft: "1.5px solid #F3F3F340",
                                      borderRight: "1.5px solid #F3F3F340",
                                      padding: "2px",
                                      overflow: "auto",
                                    }}
                                  >
                                    <GDataGrid
                                      hideFooter
                                      checkboxSelection
                                      dataGridType={"primary"}
                                      columns={columns}
                                      rows={rowsQueryParameters}
                                      disableColumnMenu={true}
                                      fontSize="0.6rem"
                                      fontWeight={800}
                                      color={`black`}
                                      onRowSelect={(val: any) => {
                                        handleRowDelete(val);
                                        setRowId(val);
                                      }}
                                      processRowUpdate={(
                                        newVal: any,
                                        oldVal: any
                                      ) => {
                                        let updatedRow = { ...newVal };
                                        let indexOfUpdatedRow =
                                          rowsQueryParameters?.findIndex(
                                            (item) =>
                                              item?.id === updatedRow?.id
                                          );
                                        if (indexOfUpdatedRow !== -1) {
                                          let updatedValue = [
                                            ...rowsQueryParameters,
                                          ];
                                          updatedValue[indexOfUpdatedRow] =
                                            updatedRow;
                                          setRowsQueryParameters(updatedValue);
                                        }
                                      }}
                                    />
                                  </Box>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <div style={{ padding: "5px", marginTop: "10px" }}>
                              <FormControl>
                                <div>
                                  <TextOutlinedInput
                                    style={{
                                      width: "550px",
                                      height: "400px",
                                      fontSize: "15px",
                                    }}
                                    placeholder=""
                                    value={showTemplateDescription}
                                    onChange={(e: any) => {
                                      setShowTemplateDescription(
                                        e.target.value
                                      );
                                    }}
                                  />
                                </div>
                              </FormControl>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </>
                  ) : (
                    <>
                      {btnValue !== "Output Parameters" && (
                        <Box
                          sx={{
                            width: "100%",
                            height: "300px",
                          }}
                        >
                          {""}
                        </Box>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            {btnValue === "Output Parameters" && (
              <>
                <OutputParamTable rowsOutput={rowsOutput} />
              </>
            )}
          </Grid>
          <Grid>
            <div
              className="api_operation_buttons"
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "10px",
              }}
            >
              <GButton
                buttonType="primary"
                fontSize="13px"
                label={`${translate("apiManagement.SAVE")}`}
                margin={"10px"}
                radius="8px"
                padding="5px 10px"
                onClickHandler={handleSaveOperationBtn}
              />
              <div
                className="api_saveGetResponse_btn"
                style={{ marginLeft: "10px" }}
              >
                <GButton
                  buttonType="primary"
                  fontSize="13px"
                  label={`${translate("apiManagement.SAVE_GET_RESPONSE")}`}
                  margin={"10px"}
                  radius="8px"
                  padding="5px 15px"
                  onClickHandler={handleSaveGetResponseBtn}
                />
              </div>
            </div>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            {(saveAndGetResponseLoading || testLoading) && <GlobalLoader />}

            <div ref={scrollableContentRef}>
              {saveGetResponseClicked === true && (
                <div className="api_operation_saveGetResponse">
                  <div
                    style={{
                      marginTop: "20px",
                      overflow: "auto",
                      zIndex: 9999,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "rgba(255, 255, 255, 0.15)",

                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0px 5px",
                        borderRadius: "5px",
                      }}
                    >
                      <div>
                        <PrimaryTypography style={{ fontSize: "13px" }}>
                          {translate("apiManagement.REQUEST_RESPONSE")}
                        </PrimaryTypography>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <GlobeIcon
                          style={{
                            width: "20px",
                            height: "20px",
                            margin: "10px",
                          }}
                        />
                        <pre
                          style={{
                            margin: "10px",
                            fontSize: "10px",
                            fontFamily: "FiraSans-regular",
                          }}
                        >
                          <SecondaryTypography style={{ fontSize: "13px" }}>
                            {requestResponseStatusCode >= 100 &&
                            requestResponseStatusCode <= 109 ? (
                              <span
                                style={{
                                  color: `${theme.palette.primaryBlue.main}`,
                                }}
                              >
                                {" "}
                                {`${requestResponseStatusCode} ${requestResponseStatus} ms 1.03 KB`}
                              </span>
                            ) : requestResponseStatusCode >= 200 &&
                              requestResponseStatusCode <= 209 ? (
                              <span style={{ color: `#16A34A` }}>
                                {" "}
                                {`${requestResponseStatusCode} ${requestResponseStatus} ms 1.03 KB`}
                              </span>
                            ) : requestResponseStatusCode >= 300 &&
                              requestResponseStatusCode <= 309 ? (
                              <span style={{ color: `#D8A805` }}>
                                {" "}
                                {`${requestResponseStatusCode} ${requestResponseStatus} ms 1.03 KB`}
                              </span>
                            ) : requestResponseStatusCode >= 400 &&
                              requestResponseStatusCode <= 409 ? (
                              <span style={{ color: `#FF8C00` }}>
                                {" "}
                                {`${requestResponseStatusCode} ${requestResponseStatus} ms 1.03 KB`}
                              </span>
                            ) : requestResponseStatusCode >= 500 &&
                              requestResponseStatusCode <= 509 ? (
                              <span
                                style={{
                                  color: `${theme.palette.mainRed.main}`,
                                }}
                              >
                                {" "}
                                {`${requestResponseStatusCode} ${requestResponseStatus} ms 1.03 KB`}
                              </span>
                            ) : (
                              ""
                            )}
                          </SecondaryTypography>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "13px" }}>
                            {translate("apiManagement.REQUEST")}
                          </PrimaryTypography>
                          <div
                            style={{
                              background: "#362F47",
                              marginTop: "10px",
                              padding: "5px 10px",
                              borderRadius: "10px",
                            }}
                          >
                            <pre
                              style={{
                                fontSize: "12px",
                                fontFamily: "FiraSans-regular",
                                marginBottom: "0px",
                              }}
                            >
                              {formattedRequest}
                            </pre>
                          </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "13px" }}>
                            {translate(
                              "apiManagement.INTEGRATION_SERVICE_INPUT"
                            )}
                          </PrimaryTypography>
                          <div
                            style={{
                              background: "#362F47",
                              marginTop: "10px",
                              padding: "5px 10px",
                              borderRadius: "10px",
                            }}
                          >
                            <pre
                              style={{
                                fontSize: "12px",
                                fontFamily: "FiraSans-regular",
                                marginBottom: "0px",
                              }}
                            >
                              {formattedServiceInput}
                            </pre>
                          </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "13px" }}>
                            {translate(
                              "apiManagement.INTEGRATION_SERVICE_OUTPUT"
                            )}
                          </PrimaryTypography>
                          <div
                            style={{
                              background: "#362F47",
                              marginTop: "10px",
                              padding: "5px 10px",
                              borderRadius: "10px",
                            }}
                          >
                            <pre
                              style={{
                                fontSize: "12px",
                                fontFamily: "FiraSans-regular",
                                marginBottom: "0px",
                              }}
                            >
                              {formattedServiceOutput}
                            </pre>
                          </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "13px" }}>
                            Response
                          </PrimaryTypography>
                          <div
                            style={{
                              background: "#362F47",
                              marginTop: "10px",
                              padding: "5px 10px",
                              borderRadius: "10px",
                            }}
                          >
                            <pre
                              style={{
                                fontSize: "12px",
                                fontFamily: "FiraSans-regular",
                                marginBottom: "0px",
                              }}
                            >
                              {formattedResponse}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Grid>
        </Box>
      </CardContainer>
    </Grid>
  );
}
