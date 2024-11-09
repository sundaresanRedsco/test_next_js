"use client";

import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import { useEffect, useRef, useState } from "react";
import {
  Typography,
  FormControl,
  TextareaAutosize,
  Button,
  InputAdornment,
  Grid,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  Popover,
  Backdrop,
  Container,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation"; // For Next.js 13+
import { Box, styled } from "@mui/system";
import AddIcon from "../../Assests/icons/plus.svg";
import DeleteIcon from "../../Assests/icons/deleted.svg";
import CloseIcon from "../../Assests/icons/closeIcon.svg";
import GlobeIcon from "../../Assests/icons/globe.svg";
import { GridColDef } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GDataGrid from "../../Components/Global/GDataGrid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import {
  CommonReducer,
  updateSessionPopup,
  updateTourStep,
} from "../../Redux/commonReducer";
import { setCookies, translate } from "../../Helpers/helpersFunctions";
import ApiTextField from "../../Components/ApiManagement/apiTextField";
import GButton from "../../Components/Global/GlobalButtons";
import theme from "../../../Theme/theme";
import ApiDropdowns from "../../Components/ApiManagement/apiDropdowns";
import RadioCheckboxComponent from "../../Components/Global/radioCheckboxComponent";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import ApiInsights from "../../Components/ApiManagement/apiInsights";
import { HeadingTypography } from "../../Styles/signInUp";
import GInput from "../../Components/Global/GInput";
import {
  BackgroundUrlList,
  CreateCollections,
  CreateOperation,
  CreateSoapOperations,
  GetAllStagesByProjectId,
  GetCollectionById,
  GetOperationById,
  GetOperations,
  GetOpertionTest,
  GetWsdlOperByCollId,
  projectReducer,
  SoapOperationById,
  UpdateCollectionsById,
  UpdateOperation,
} from "../../Redux/apiManagement/projectReducer";
import toast from "react-hot-toast";
import PageNotFound from "../../Pages/PageNotFound/pageNotFound";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";
import { workspaceReducer } from "../../Redux/apiManagement/workspaceReducer";

export const PrimaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${theme.palette.primaryText.main};
  font-weight: 500;
  font-size: 0.8rem;
  wordwrap: break-word;
`;

export const SecondaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${theme.palette.primaryText.main};
  font-weight: 300;
  font-size: 0.6rem;
  wordwrap: break-word;
`;

const TextOutlinedInput = styled(TextareaAutosize)`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  fontFamily: "Inter-Regular !important"
  padding: 15px;
  background: transparent;
  border: 1.5px solid ${theme.palette.secondaryColor.main};
  border-radius: 4px;
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

const StyledButton = styled(Button)`
  fontFamily: "Inter-Regular !important"
  position: relative;
  variant: elevated;
  background: #f1f5f9;
  height: 30px;
  text-transform: none;
`;

const StyledNavItem = styled(Button)`
  font-family: Inter-Regular !important;
  padding: 0px;
  border-radius: 0px;
  font-size: 0.8rem;
  color: #6b7280;

  &.active {
    color: ${theme.palette.primaryBlack.main};
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    width: 70%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.primaryBlack.main};
    transform: translateX(-50%);
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    font-size: 0.7rem;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    font-size: 0.7rem;
  }
`;

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  fontfamily: "Inter-Regular !important";
  // padding: 10px 25px;
`;

export default function OperationPage(props: any) {
  const theme = useTheme();
  const { id, onCloseHandler } = props;

  // const navigate = useNavigate();
  const router = useRouter();
  const location = usePathname();

  const scrollableContentRef = useRef<any>();

  const dispatch = useDispatch<any>();

  const { userProfile, maninContainer, tourStep } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const {
    loading,
    singleCollectionData,
    saveGetResponseData,
    singleOperationData,
    operationLists,
  } = useSelector<RootStateType, projectReducer>(
    (state) => state.apiManagement.projects
  );

  let parts = id.split("_");
  let operationId = parts[1];

  const stageId = currentStage;
  const locationVal = location.split("/");

  const collectionIdVal = parts[2];
  const operationIdVal = parts[1];

  console.log(
    currentEnvironment,
    collectionIdVal,
    operationIdVal,
    location.split("/"),
    currentStage,
    "IDCHECK"
  );

  const columnsOutputParameters: GridColDef[] = [
    {
      field: "name",
      headerName: `Name`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "path",
      headerName: `Path`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "scope",
      headerName: `Scope`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "data_type",
      headerName: `Data type`,
      flex: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      sortable: false,
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "collection_id",
      headerName: `Collection ID`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "record_id",
      headerName: `Record ID`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
    {
      field: "description",
      headerName: `Description`,
      flex: 1,
      sortable: false,
      headerClassName: "super-app-theme--header",
      editable: true,
      renderCell: (params: any) => (
        <div
          style={{ fontSize: "10px", fontFamily: "Inter-Regular !important" }}
        >
          {params?.value || ""}
        </div>
      ),
    },
  ];

  const initialCheckboxStates: any = {};

  const [apiStageId, setApiStageId] = useState("");

  const [serviceVal, setServiceVal] = useState("");
  const [saveAddBtnClicked, setSaveAddBtnClicked] = useState(false);
  const [webServiceVal, setWebServiceVal] = useState("None");
  const [passThroughCookies, setPassThroughCookies] = useState("No");
  const [generateMockDate, setGenerateMockDate] = useState("No");
  const [activeBtn, setActiveBtn] = useState(false);
  const [inputParamBtn, setInputParamBtn] = useState(true);
  const [outputParamBtn, setOutputParamBtn] = useState(false);
  const [valLabel, setValLabel] = useState("Body");
  const [val, setVal] = useState("Body");
  const [enablePassThrough, setEnablePassThrough] = useState(false);
  const [requestTemplate, setRequestTemplate] = useState(false);

  const [serviceDetailsClicked, setServiceDetailsClicked] = useState(false);

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

  const [currentServiceType, setCurrentServiceType] = useState("");
  const [errorname, setErrorname] = useState("");
  const [errorbase_url, setErrorbase_url] = useState("");
  const [errorwsdl_url, setErrorwsdl_url] = useState("");
  const [errorApiOperationName, setErrorApiOperationName] = useState("");

  const [saveGetResponseClicked, setSaveGetResponseClicked] = useState(false);

  const [rowsSelected, setRowsSelected] = useState(false);
  const [deleteRowClicked, setDeleteRowClicked] = useState(false);
  const [rowId, setRowId] = useState<any>([]);

  const [anchorElVersion, setAnchorElVersion] = useState<null | HTMLElement>(
    null
  );
  const [saveVersionVal, setSaveVersionVal] = useState("");
  const [saveVersionDesc, setSaveVersionDesc] = useState("");
  const [saveVersionClicked, setSaveVersionClicked] = useState(false);
  const [versionVal, setVersionVal] = useState("1.0");
  const [errorVersionVal, setErrorVersionVal] = useState("");

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

  const [wsdlPop, setWsdlPop] = useState(false);
  const [anchorElWsdl, setAnchorElWsdl] = useState<HTMLElement | null>(null);

  const [checkedWsdl, setCheckedWsdl] = useState<any[]>([]);
  const [wsdlSearch, setWsdlSearch] = useState("");
  const [soapOperations, setSoapOperations] = useState<any[]>([]);

  const open = Boolean(anchorEl);

  const wsdlPopRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setBackgroundUrlClicked(true);
    handleBackgroundUrlList();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setBackgroundUrlClicked(false);
  };

  const handleClickVersion = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElVersion(event.currentTarget);
  };

  const handleCloseVersionPopOver = () => {
    setAnchorElVersion(null);
    setSaveVersionClicked(false);
    setSaveVersionVal("");
    setSaveVersionDesc("");
    setErrorVersionVal("");
  };

  const handleVersionSave = () => {
    const hasValidationError = saveVersionVal.trim() === "";

    if (hasValidationError) {
      setErrorVersionVal("Version is required");
    } else {
      setErrorVersionVal("");
      setAnchorElVersion(null);
      setSaveVersionClicked(false);
      setSaveVersionVal("");
      setSaveVersionDesc("");
    }
  };

  const handleVersionValue = (e: any) => {
    let versionValue = e.target.value;
    if (versionValue === undefined) {
      setVersionVal("1.0");
    } else {
      setVersionVal(e.target.value);
    }
  };

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

  //functions

  const capitalizeFirstLetter = (word: any) => {
    if (!word) return "-";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const onOpTabChange = (e: any, row: any) => {
    const tempEventInputs = JSON.parse(JSON.stringify(row));
    if (e.target) {
      tempEventInputs[e.target.id] = e.target.value;
    }

    let stateToUpdate;
    let rowIndex: any;
    switch (valLabel) {
      case "Body":
        stateToUpdate = setRowsBody;
        rowIndex = rowsBody?.findIndex((details) => details?.id === row?.id);
        break;
      case "Header":
        stateToUpdate = setRowsHeader;
        rowIndex = rowsHeader?.findIndex((details) => details?.id === row?.id);
        break;
      case "Authorization":
        stateToUpdate = setRowsAuthorization;
        rowIndex = rowsAuthorization?.findIndex(
          (details) => details?.id === row?.id
        );
        break;
      case "Query Parameters":
        stateToUpdate = setRowsQueryParameters;
        rowIndex = rowsQueryParameters?.findIndex(
          (details) => details?.id === row?.id
        );
        break;
      default:
        return;
    }
    stateToUpdate((prevState: any) => {
      let updatedData = [...prevState];
      updatedData[rowIndex] = tempEventInputs;
      return [...updatedData];
    });
  };

  const handleCollectionDetails = (field: any, event: any) => {
    setCurrentLocation(location);
    setChangeOccuredColl(true);
    setPrevCollections((prevValues: any) => ({
      ...prevValues,
      [field]: event,
    }));
    // }
    setCollectionDetails((prevValues: any) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  useEffect(() => {}, [prevCollections, prevOperations]);

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

  // const handleChangedDetails = () => {
  //   let changedColLVal = currentLocation?.split("/");

  //   if (changeOccuredColl === true) {
  //     let collectionUpdateData = {
  //       user_id: userProfile?.user?.user_id,
  //       collection_id: changedColLVal[8],
  //       name: prevCollections?.name || collectionDetails?.name,
  //       description:
  //         prevCollections?.description || collectionDetails?.description,
  //     };
  //     dispatch(UpdateCollectionsById(collectionUpdateData))
  //       .unwrap()
  //       .then((res: any) => {
  //         dispatch(GetAllStagesByProjectId(currentEnvironment))
  //           .unwrap()
  //           .then((resStage: any) => {
  //             setApiStageId(resStage?.[0]?.apistage_id);

  //             let getOperationValues = {
  //               project_id: changedColLVal[6],
  //               stage_id: stageId || currentStage,
  //             };

  //             dispatch(GetOperations(getOperationValues))
  //               .unwrap()
  //               .then((res: any) => {
  //                 dispatch(GetCollectionById(changedColLVal[8]))
  //                   .unwrap()
  //                   .then((res: any) => {
  //                     toast.success("Collection saved successfully");
  //                     setChangeOccuredColl(false);
  //                     setChangeOccuredOper(false);
  //                     setChangeUrlDialog(false);
  //                     navigate(location.pathname);
  //                   })
  //                   .catch((error: any) => {
  //                     if (error?.message === "UNAUTHORIZED") {
  //                       dispatch(updateSessionPopup(true));
  //                     }
  //                   });
  //               })
  //               .catch((error: any) => {
  //                 if (error?.message === "UNAUTHORIZED") {
  //                   dispatch(updateSessionPopup(true));
  //                 }
  //               });
  //           })
  //           .catch((error: any) => {
  //             console.log("Error: ", error);
  //           });
  //       })
  //       .catch((error: any) => {
  //         if (error?.message === "UNAUTHORIZED") {
  //           dispatch(updateSessionPopup(true));
  //         }
  //       });
  //   }
  //   if (changeOccuredOper === true) {
  //     let updateDataOperation = {
  //       user_id: userProfile?.user?.user_id,
  //       collection_id: changedColLVal[8],
  //       operation_id: changedColLVal[10],
  //       name: prevOperations?.name || operationDetails?.name,
  //       description:
  //         prevOperations?.description || operationDetails?.description,
  //       passThroughForHeaders: true,
  //       passThroughForOutputs: true,
  //       passThroughForInputs: true,
  //       passThroughForAuthorization: true,
  //       passthroughqueryparameteres: true,
  //       status: prevOperations?.status || "ACTIVE",
  //       security_type:
  //         prevOperations?.security_type || "Authenticated App Users",
  //       serviceType: prevOperations?.service_type,
  //       soap_action:
  //         prevOperations?.soap_action || operationDetails?.soap_action,
  //       endpoint_url: prevOperations?.base_url || "",
  //       soap_version:
  //         prevOperations?.soap_version || operationDetails?.soap_version,
  //       response_encoding:
  //         prevOperations?.response_encoding ||
  //         operationDetails?.response_encoding,
  //       server_auth_mode:
  //         prevOperations?.server_auth_mode ||
  //         operationDetails?.server_auth_mode,
  //       binding_name: prevOperations?.binding_name || "null",
  //       soap_input_message:
  //         prevOperations?.soap_input_message ||
  //         operationDetails?.soap_input_message,
  //       http_method:
  //         prevOperations?.http_method || operationDetails?.http_method,
  //       method_name: prevOperations?.method_name || "",
  //       service_type: prevOperations?.service_type,
  //       operationHeaders: rowsHeader,
  //       operationInputs: rowsBody,
  //       operation_authorization: rowsAuthorization,
  //       operationQueryparameters: rowsQueryParameters,
  //       publish_name:
  //         prevOperations?.publish_name || operationDetails?.publish_name,
  //       passThroughPayload: "passThroughPayload",
  //       passThroughHeaders: "passThroughHeaders",
  //       input_type: "FORM_DATA",
  //       raw_payload: "null",
  //       raw_output: "null"
  //     };
  //     dispatch(UpdateOperation(updateDataOperation))
  //       .unwrap()
  //       .then((res: any) => {
  //         toast.success("Operation saved successfully");
  //         let getOperationValues = {
  //           project_id: currentEnvironment,
  //           stage_id: stageId || currentStage,
  //         };

  //         // dispatch(GetOperations(projectId))
  //         dispatch(GetOperations(getOperationValues))
  //           .unwrap()
  //           .then((res: any) => {
  //             dispatch(GetOperationById(changedColLVal[10]))
  //               .unwrap()
  //               .then((res: any) => {
  //                 res?.map((val: any) => {
  //                   setOperationDetails({
  //                     operationId: val?.id,
  //                     name: val?.name,
  //                     description: val?.description,
  //                     pass_through_forheaders: false,
  //                     pass_through_forinputs: false,
  //                     pass_through_foroutputs: false,
  //                     pass_through_authorization: "null",
  //                     pass_through_queryparameters: "null",
  //                     status: val?.status,
  //                     security_type:
  //                       val?.security_type || "Authenticated App Users",
  //                     soap_action: val?.soap_action,
  //                     endpoint_url: val?.endpoint_url,
  //                     soap_version: val?.soap_version,
  //                     response_encoding: "null",
  //                     server_auth_mode: "null",
  //                     binding_name: val?.binding_name,
  //                     soap_input_message: val?.soap_input_message,
  //                     http_method: val?.http_method,
  //                     collections_id: val?.collections_id,
  //                     publish_name: "null",
  //                     method_name: val?.method_name,
  //                     generate_MockDate: "No",
  //                     operationHeaders: rowsHeader,
  //                     operationInputs: rowsBody,
  //                     operation_Authorizations: rowsAuthorization,
  //                     operation_queryparamaeters: rowsQueryParameters,
  //                     operationOutputs: rowsOutput,
  //                     passThroughPayload: "null",
  //                     passThroughHeaders: "null",
  //                     endpoint_status: val?.endpoint_status,
  //                     private_or_public: val?.private_or_public,
  //                     input_type: val?.input_type,
  //                     raw_payload: val?.raw_payload,
  //                     raw_output: val?.raw_output,
  //                   });
  //                   setRowsBody([...val?.operationInputs]);
  //                   setRowsHeader([...val?.operationHeaders]);
  //                   setRowsAuthorization([...val?.operation_Authorizations]);
  //                   setRowsQueryParameters([
  //                     ...val?.operation_queryparamaeters,
  //                   ]);
  //                   //for map function in order to return
  //                   return null;
  //                 });
  //                 setChangeOccuredColl(false);
  //                 setChangeOccuredOper(false);
  //                 setChangeUrlDialog(false);
  //                 navigate(location.pathname);
  //               })
  //               .catch((error: any) => {
  //                 if (error?.message === "UNAUTHORIZED") {
  //                   dispatch(updateSessionPopup(true));
  //                 }
  //               });
  //           })
  //           .catch((error: any) => {
  //             if (error?.message === "UNAUTHORIZED") {
  //               dispatch(updateSessionPopup(true));
  //             }
  //           });
  //       })
  //       .catch((error: any) => {
  //         if (error?.message === "UNAUTHORIZED") {
  //           dispatch(updateSessionPopup(true));
  //         }
  //       });
  //   }
  // };

  console.log("RowsBody: ", rowsBody);

  const handleWebServiceVal = (val: any) => {
    setWebServiceVal(val);
  };

  const handlePassthroughCookies = (val: any) => {
    setPassThroughCookies(val);
  };

  const handleGenerateMockDate = (val: any) => {
    setGenerateMockDate(val);
  };

  const handleCancelBtn = () => {
    router.push(
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}`
    );
  };

  const handleCollectionValidation = (type: any) => {
    if (type === "collectionName") {
      const hasValidationError = collectionDetails?.name.trim() === "";

      const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/.test(
        collectionDetails?.name
      );

      const hasNoSpaces = /\s/.test(collectionDetails?.base_url);
      const isOverLimit = collectionDetails?.name?.length > 50;

      if (hasValidationError) {
        setErrorname("Collection Name is required");
      } else if (collectionDetails?.name.trim() === "") {
        setErrorname("Collection Name is required");
      } else if (hasSpecialCharName) {
        setErrorname("Special Characters and spaces are not allowed");
      } else if (hasNoSpaces) {
        setErrorbase_url("Spaces are not allowed");
      } else if (isOverLimit) {
        setErrorname("Collection name should not exceed 50 characters");
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    }

    if (type === "collectionBaseUrl") {
      const hasValidationError = collectionDetails?.base_url.trim() === "";

      const hasNoSpaces = /\s/.test(collectionDetails?.base_url);
      const restrictSlash = collectionDetails?.base_url?.endsWith("/");

      if (hasValidationError) {
        setErrorbase_url("Api Base Url is required");
      } else if (collectionDetails?.base_url.trim() === "") {
        setErrorbase_url("Api Base Url is required");
      } else if (hasNoSpaces) {
        setErrorbase_url("Spaces are not allowed");
      } else if (restrictSlash) {
        setErrorbase_url(
          "Invalid collection URL format: remove the ending slash."
        );
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    }

    if (type === "collectionWsdlUrl") {
      const hasValidationError = collectionDetails?.wsdl_url.trim() === "";

      const hasNoSpaces = /\s/.test(collectionDetails?.wsdl_url);
      const restrictSlash = collectionDetails?.wsdl_url?.endsWith("/");

      if (hasValidationError) {
        setErrorwsdl_url("Api Wsdl Url is required");
      } else if (collectionDetails?.wsdl_url.trim() === "") {
        setErrorwsdl_url("Api Wsdl Url is required");
      } else if (hasNoSpaces) {
        setErrorwsdl_url("Spaces are not allowed");
      } else if (restrictSlash) {
        setErrorwsdl_url(
          "Invalid collection URL format: remove the ending slash."
        );
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    }
  };

  const handleSaveBtn = () => {
    dispatch(GetAllStagesByProjectId(currentEnvironment))
      .unwrap()
      .then((res: any) => {
        console.log("StageId: ", res);
        setApiStageId(res?.[0]?.apistage_id);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });

    if (currentLocation === location) {
      setChangeOccuredColl(false);
    }

    const hasValidationError =
      collectionDetails?.name.trim() === "" &&
      collectionDetails?.base_url.trim() === "";

    const wsdlUrlValidationCheck = collectionDetails?.wsdl_url?.trim() === "";

    const hasSpecialCharName = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      collectionDetails?.name
    );

    const hasNoSpaces = /\s/.test(collectionDetails?.base_url);
    const hasNoSpacesWsdl = /\s/.test(collectionDetails?.wsdl_url);
    const isOverLimit = collectionDetails?.name?.length > 50;

    const restrictSlash = collectionDetails?.base_url?.endsWith("/");
    const restrictSlashWsdl = collectionDetails?.wsdl_url?.endsWith("/");

    if (hasValidationError) {
      setErrorname("Collection Name is required");
      setErrorbase_url("Api Base Url is required");
    } else if (collectionDetails?.name.trim() === "") {
      setErrorname("Collection Name is required");
    } else if (collectionDetails?.base_url.trim() === "") {
      setErrorbase_url("Api Base Url is required");
    } else if (hasSpecialCharName) {
      setErrorname("Special Characters and spaces are not allowed");
    } else if (hasNoSpaces) {
      setErrorbase_url("Spaces are not allowed");
    } else if (restrictSlash) {
      setErrorbase_url(
        "Invalid collection URL format: remove the ending slash."
      );
    } else if (isOverLimit) {
      setErrorname("Collection name should not exceed 50 characters");
    } else if (
      wsdlUrlValidationCheck &&
      (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP")
    ) {
      if (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP") {
        setErrorwsdl_url("WSDL Url is required");
      }
    } else if (
      hasNoSpacesWsdl &&
      (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP")
    ) {
      if (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP") {
        setErrorwsdl_url("Spaces are not allowed");
      }
    } else if (
      restrictSlashWsdl &&
      (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP")
    ) {
      if (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP") {
        setErrorwsdl_url(
          "Invalid collection URL format: remove the ending slash."
        );
      }
    } else {
      if (collectionIdVal !== undefined) {
        let updatedData = {
          // user_id: userProfile?.user?.user_id,
          collection_id: collectionIdVal,
          name: collectionDetails?.name,
          description: collectionDetails?.description,
          stage_id: apiStageId,
        };

        dispatch(UpdateCollectionsById(updatedData))
          .unwrap()
          .then((res: any) => {
            let getOperationValues = {
              project_id: currentEnvironment,
              stage_id: stageId || currentStage,
            };
            dispatch(GetOperations(getOperationValues))
              .unwrap()
              .then((res: any) => {
                console.log("REs: ", res);
              })
              .catch((error: any) => {
                if (error?.message === "UNAUTHORIZED") {
                  dispatch(updateSessionPopup(true));
                }
              });
            toast.success("Collection updated successfully");
            setCookies(
              process.env.NEXT_PUBLIC_COOKIE_COLLID ?? "",
              res?.collection_id,
              userProfile?.user?.expiration_time
            );
            router.push(
              `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${res?.collection_id}`
            );
          })
          .catch((error: any) => {
            toast.error(error?.message);
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      } else {
        let createData = {
          // user_id: userProfile?.user?.user_id,
          project_id: currentEnvironment,
          stage_id: apiStageId,
          name: collectionDetails?.name,
          type: "OWNER",
          base_url: collectionDetails?.base_url,
          web_service_authentication:
            collectionDetails?.web_service_authentication,
          description: collectionDetails?.description,
          status: "ACTIVE",
          service_type: serviceVal,
          wsdl_url: collectionDetails?.wsdl_url,
          activeVersionID: "null",
          active_vesion: "null",
        };

        console.log("IN Savebtn: ", createData);
        console.log("REach1");

        dispatch(CreateCollections(createData))
          .unwrap()
          .then((res: any) => {
            console.log("CreateCollectionRes: ", res);
            console.log("REach2");
            let getOperationValues = {
              project_id: currentEnvironment,
              stage_id: stageId || currentStage,
            };
            dispatch(GetOperations(getOperationValues))
              .unwrap()
              .then((res: any) => {
                console.log("Res: ", res);
                dispatch(updateTourStep(tourStep + 1));
              })
              .catch((error: any) => {
                if (error?.message === "UNAUTHORIZED") {
                  dispatch(updateSessionPopup(true));
                }
              });
            toast.success("Service Details saved successfully");
            setCookies(
              process.env.NEXT_PUBLIC_COOKIE_COLLID ?? "",
              res?.collection_id,
              userProfile?.user?.expiration_time
            );
            if (
              collectionDetails?.service_type === "SOAP" ||
              serviceVal === "SOAP"
            ) {
              setWsdlPop(true);
              setAnchorElWsdl(wsdlPopRef?.current);
            } else {
              router.push(
                `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${res?.collection_id}/operations`
              );
            }
          })
          .catch((error: any) => {
            toast.error(error?.message);
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      }
    }
  };

  const handleSaveAddBtn = (e: any) => {
    console.log("Working saveAdd");
    if (currentLocation === location) {
      setChangeOccuredColl(false);
    }

    setOperationDetails({});

    const hasValidationError =
      collectionDetails?.name?.trim() === "" ||
      collectionDetails?.base_url?.trim() === "";

    const wsdlUrlValidationCheck = collectionDetails?.wsdl_url?.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      collectionDetails?.name
    );

    const isOverLimit = collectionDetails?.name?.length > 50;

    const hasNoSpaces = /\s/.test(collectionDetails?.base_url);
    const hasNoSpacesWsdl = /\s/.test(collectionDetails?.wsdl_url);

    const restrictSlash = collectionDetails?.base_url?.endsWith("/");
    const restrictSlashWsdl = collectionDetails?.wsdl_url?.endsWith("/");

    if (hasValidationError) {
      setErrorname("Collection Name is required");
      setErrorbase_url("Api Base Url is required");
    } else if (collectionDetails?.name.trim() === "") {
      setErrorname("Collection Name is required");
    } else if (collectionDetails?.base_url.trim() === "") {
      setErrorbase_url("Api Base Url is required");
    } else if (hasSpecialChar) {
      setErrorname("Special Characters and spaces are not allowed");
    } else if (hasNoSpaces) {
      setErrorbase_url("Spaces are not allowed");
    } else if (restrictSlash) {
      setErrorbase_url(
        "Invalid collection URL format: remove the ending slash."
      );
    } else if (isOverLimit) {
      setErrorname("Collection name should not exceed 50 characters");
    } else if (
      wsdlUrlValidationCheck &&
      (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP")
    ) {
      if (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP") {
        setErrorwsdl_url("WSDL Url is required");
      }
    } else if (
      hasNoSpacesWsdl &&
      (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP")
    ) {
      if (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP") {
        setErrorwsdl_url("Spaces are not allowed");
      }
    } else if (
      restrictSlashWsdl &&
      (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP")
    ) {
      if (collectionDetails?.wsdl_url === "SOAP" || serviceVal === "SOAP") {
        setErrorwsdl_url(
          "Invalid collection URL format: remove the ending slash."
        );
      }
    } else {
      dispatch(GetAllStagesByProjectId(currentEnvironment))
        .unwrap()
        .then((res: any) => {
          setApiStageId(res?.[0]?.apistage_id);
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });

      if (collectionIdVal !== undefined) {
        let updatedData = {
          // user_id: userProfile?.user?.user_id,
          collection_id: collectionIdVal,
          name: collectionDetails?.name,
          description: collectionDetails?.description,
          stage_id: apiStageId,
        };

        dispatch(UpdateCollectionsById(updatedData))
          .unwrap()
          .then((res: any) => {
            console.log("RessUpdateCollection: ", res);
            toast.success("Collection updated successfully");
            setCookies(
              process.env.NEXT_PUBLIC_COOKIE_COLLID ?? "",
              collectionIdVal,
              userProfile?.user?.expiration_time
            );
            if (
              collectionDetails?.service_type === "SOAP" ||
              serviceVal === "SOAP"
            ) {
              setWsdlPop(true);
              handleWsdlOperations(collectionIdVal);
            } else {
              router.push(
                `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations`
              );
            }

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
            setRowsBody([]);
            setRowsHeader([]);
            setRowsAuthorization([]);
            setRowsQueryParameters([]);
            setRowsOutput([]);
          })
          .catch((error: any) => {
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      } else {
        console.log("Else part working: ", collectionDetails);
        let createData = {
          user_id: userProfile?.user?.user_id,
          project_id: currentEnvironment,
          stage_id: apiStageId,
          name: collectionDetails?.name,
          type: "OWNER",
          base_url: collectionDetails?.base_url,
          web_service_authentication:
            collectionDetails?.web_service_authentication,
          description: collectionDetails?.description,
          status: "ACTIVE",
          service_type: serviceVal,
          wsdl_url: collectionDetails?.wsdl_url,
          activeVersionID: "null",
          active_vesion: "null",
        };

        console.log("CreateCollection: ", createData);

        dispatch(CreateCollections(createData))
          .unwrap()
          .then((res: any) => {
            console.log("REsCreateCollection: ", res);
            let getOperationValues = {
              project_id: currentEnvironment,
              stage_id: stageId || currentStage,
            };

            dispatch(GetOperations(getOperationValues))
              .unwrap()
              .then((res: any) => {
                console.log("REs: ", res);
                dispatch(updateTourStep(tourStep + 1));
              })
              .catch((error: any) => {
                if (error?.message === "UNAUTHORIZED") {
                  dispatch(updateSessionPopup(true));
                }
              });
            toast.success("Service Details saved successfully");
            setCookies(
              process.env.NEXT_PUBLIC_COOKIE_COLLID ?? "",
              res?.collection_id,
              userProfile?.user?.expiration_time
            );

            if (
              collectionDetails?.service_type === "SOAP" ||
              serviceVal === "SOAP"
            ) {
              setWsdlPop(true);
              setAnchorElWsdl(wsdlPopRef?.current);
              handleWsdlOperations(res?.collection_id);
            } else {
              router.push(
                `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${res?.collection_id}/operations`
              );
            }

            setRowsBody([]);
            setRowsHeader([]);
            setRowsAuthorization([]);
            setRowsQueryParameters([]);
            setRowsOutput([]);
          })
          .catch((error: any) => {
            toast.error(error?.message);
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      }
    }
  };

  const handleOperationValidation = (type: any) => {
    if (type === "operationName") {
      const hasValidationError = operationDetails?.name?.trim() === "";

      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
        operationDetails?.name
      );

      const isOverLimit = operationDetails?.name?.length > 50;

      if (hasValidationError) {
        setErrorApiOperationName("Api Operation Name is required");
      } else if (!operationDetails?.name?.trim()) {
        setErrorApiOperationName("Api Operation Name is required");
      } else if (hasSpecialChar) {
        setErrorApiOperationName(
          "Special Characters and spaces are not allowed"
        );
      } else if (isOverLimit) {
        setErrorApiOperationName(
          "Operation name should not exceed 50 characters"
        );
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    }
  };

  const handleCancelOperation = () => {
    setSaveGetResponseClicked(false);
    setOperationDetails({});
    router.push(
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}`
    );
  };

  const handleSaveOperationBtn = () => {
    if (currentLocation === location) {
      setChangeOccuredOper(false);
    }

    setSaveGetResponseClicked(false);

    const hasValidationError =
      operationDetails?.name?.trim() === "" ||
      operationDetails?.method_name?.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      operationDetails?.name
    );

    const isOverLimit = operationDetails?.name?.length > 50;

    const hasNoSpaces = /\s/.test(operationDetails?.method_name);

    const restrictSlash = operationDetails?.method_name?.startsWith("/");

    let createOperationDetails = {
      // user_id: userProfile?.user?.user_id,
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

    let updateOperationDetails = {
      // user_id: userProfile?.user?.user_id,
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
      endpoint_url: collectionDetails?.base_url,
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
    };

    console.log("OperationData: ", updateOperationDetails, operationDetails);

    if (operationId?.trim() === undefined) {
      dispatch(CreateOperation(createOperationDetails))
        .unwrap()
        .then((res: any) => {
          toast.success("Operation created successfully");
          setCookies(
            process.env.NEXT_PUBLIC_COOKIE_OPERID ?? "",
            res?.id,
            userProfile?.user?.expiration_time
          );
          router.push(
            `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations/${res?.id}`
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
    } else {
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
    }
  };

  const handleSaveGetResponseBtn = () => {
    if (currentLocation === location) {
      setChangeOccuredOper(false);
    }

    const hasValidationError =
      operationDetails?.name?.trim() === "" ||
      operationDetails?.method_name?.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      operationDetails?.name
    );

    const isOverLimit = operationDetails?.name?.length > 50;

    const hasNoSpaces = /\s/.test(operationDetails?.method_name);

    const restrictSlash = operationDetails?.method_name?.startsWith("/");

    let createOperationDetails = {
      // user_id: userProfile?.user?.user_id,
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

    let updateOperationDetails = {
      // user_id: userProfile?.user?.user_id,
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
      endpoint_url: collectionDetails?.base_url,
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
    };

    if (operationId?.trim() === undefined) {
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
          router.push(
            `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations/${res?.id}`
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
    } else {
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
    }
    // }
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

  const requestResponseStatus =
    saveGetResponseData?.serviceOutput?.response?.status;
  const requestResponseStatusCode =
    saveGetResponseData?.serviceOutput?.response?.statusCode;

  const requestPart = saveGetResponseData?.request;
  const serviceInputPart = saveGetResponseData?.serviceInput;
  const serviceOutputPart = saveGetResponseData?.serviceOutput;
  const responsePart = saveGetResponseData?.response;

  const formatWithLineNumbers = (text: any) => {
    return (text ?? "")
      ?.split("\n")
      ?.map((line: any, index: any) => `${index + 1}. ${line}`)
      ?.join("\n");
  };

  const formattedRequest =
    formatWithLineNumbers(JSON.stringify(requestPart, null, 2)) || "";
  const formattedServiceInput =
    formatWithLineNumbers(JSON.stringify(serviceInputPart, null, 2)) || "";
  const formattedServiceOutput =
    formatWithLineNumbers(JSON.stringify(serviceOutputPart, null, 2)) || "";
  const formattedResponse =
    formatWithLineNumbers(JSON.stringify(responsePart, null, 2)) || "";

  const handleInputParameter = () => {
    setInputParamBtn(true);
    setOutputParamBtn(false);
    setActiveBtn(false);
  };

  const handleOutputParameter = () => {
    setOutputParamBtn(true);
    setInputParamBtn(false);
    setActiveBtn(true);
  };

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

  const handleWsdlSearch = (event: any) => {
    setWsdlSearch(event?.target?.value);
    console.log("SearchvalWsdl: ", event?.target?.value);
  };

  const filteredSoapOperations =
    wsdlSearch?.trim() !== ""
      ? soapOperations?.filter((filterVal) =>
          filterVal?.name?.toLowerCase().includes(wsdlSearch?.toLowerCase())
        )
      : soapOperations;

  console.log("filteredSoapOperations: ", filteredSoapOperations);

  const handleCloseWsdl = () => {
    setAnchorElWsdl(null);
    setWsdlPop(false);
    setCheckedWsdl([]);
    setWsdlSearch("");
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
    console.log("CheckedWsdlVal: ", checkedWsdl);
    const idValues = checkedWsdl?.map((val: any) => val?.id);

    if (idValues && idValues?.length > 0) {
      let requestData = {
        id: idValues,
        collection_id: collectionIdVal,
      };

      dispatch(CreateSoapOperations(requestData))
        .unwrap()
        .then((createSoapRes: any) => {
          console.log("CreateSoapRes: ", createSoapRes);
          if (createSoapRes === "wsdl operation status updated successfully.") {
            router.push(
              `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations`
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

  const handleWsdlOperations = (collectionIdValue: any) => {
    dispatch(GetWsdlOperByCollId(collectionIdValue))
      .unwrap()
      .then((wsdlRes: any) => {
        console.log(wsdlRes, "wsdlRes");
        setSoapOperations(wsdlRes);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  };

  //predefined values

  const navLinks = [
    {
      label: `${translate("apiManagement.BODY")}`,
      id: "body",
      active: `${translate("apiManagement.BODY")}` === valLabel,
    },
    {
      label: `${translate("apiManagement.HEADER")}`,
      id: "header",
      active: `${translate("apiManagement.HEADER")}` === valLabel,
    },
    {
      label: `${translate("apiManagement.AUTHORIZATION")}`,
      id: "authorization",
      active: `${translate("apiManagement.AUTHORIZATION")}` === valLabel,
    },
    {
      label: `${translate("apiManagement.QUERY_PARAMETERS")}`,
      id: "queryParameters",
      active: `${translate("apiManagement.QUERY_PARAMETERS")}` === valLabel,
    },
  ];

  console.log(
    collectionDetails,
    operationDetails,
    singleOperationData,
    "CollectionOperationDetails"
  );

  //useEffect

  useEffect(() => {
    setCollectionDetails(
      location ===
        `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}`
        ? singleCollectionData
        : collectionDetails
    );
  }, [singleCollectionData, location]);

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

        //for map
        return null;
      });
    }
  }, [singleOperationData, operationId]);

  useEffect(() => {
    if (collectionIdVal !== undefined) {
      dispatch(GetCollectionById(collectionIdVal))
        .unwrap()
        .then((res: any) => {
          console.log(res, "collectionResponse");
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
    if (
      location ===
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections`
    ) {
    } else if (
      location ===
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}`
    ) {
      setServiceVal(currentServiceType);
    } else {
      setServiceVal("");
    }

    if (
      location ===
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations/${operationId}`
    ) {
      setSaveAddBtnClicked(true);
    }
  }, [currentServiceType, location]);

  useEffect(() => {
    if (saveGetResponseData?.operationOutputs !== undefined) {
      setRowsOutput(saveGetResponseData?.operationOutputs);
    }
  }, [saveGetResponseData]);

  useEffect(() => {
    if (
      location ===
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations`
    ) {
      setOperationDetails({
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
        serviceType: "",
        soap_action: "null",
        soap_version: "null",
        endpoint_url: collectionDetails?.base_url,
        response_encoding: "null",
        server_auth_mode: "null",
        binding_name: "null",
        soap_input_message: "null",
        http_method: "GET",
        method_name: "",
        operationHeaders: "",
        operationInputs: "",
        operation_authorization: "",
        operationQueryparameters: "",
        operationOutputs: "",
        service_type: "",
        publish_name: "null",
        passThroughPayload: "null",
        passThroughHeaders: "null",
        passThrough_Cookies: "No",
        generate_MockDate: "No",
        endpoint_status: "",
        private_or_public: "",
        input_type: "FORM_DATA",
        raw_payload: "null",
        raw_output: "null",
      });

      setRowsBody([]);
      setRowsHeader([]);
      setRowsAuthorization([]);
      setRowsQueryParameters([]);
      setRowsOutput([]);
    }

    if (
      location ===
      `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections`
    ) {
      setCollectionDetails({
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
    }
  }, [location]);

  useEffect(() => {
    if (saveGetResponseClicked) {
      const containerElement = document.getElementById(maninContainer);

      if (containerElement) {
        containerElement.scrollTo({
          top: 1000,
          behavior: "smooth",
        });
      }
    } else {
      //  window.scrollTo({ behaviour: "smooth", top: 0 });
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
        // router.push(`${currentLocation}`);
      } else {
        setCurrentLocation("");
        setChangeUrlDialog(false);
      }
    }
  }, [location]);

  useEffect(() => {
    if (
      currentEnvironment !== undefined &&
      locationVal[6] !== undefined &&
      !location.includes("/design-api")
    ) {
      if (currentEnvironment !== locationVal[6]) {
        setInvalidIdValues(true);
      } else {
        if (collectionIdVal !== undefined && locationVal[8] !== undefined) {
          if (collectionIdVal !== locationVal[8]) {
            if (changeUrlDialog === true) {
              setInvalidIdValues(false);
            } else {
              setInvalidIdValues(true);
            }
          } else {
            if (locationVal[9] !== undefined) {
              if (locationVal[9] !== "operations") {
                setOpertionSpellValidation(true);
              }
            }
            if (operationIdVal !== undefined && locationVal[10] !== undefined) {
              if (operationIdVal !== locationVal[10]) {
                if (changeUrlDialog === true) {
                  setInvalidIdValues(false);
                } else {
                  setInvalidIdValues(true);
                }
              }
            }
          }
        }
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
    dispatch(GetOperationById(operationIdVal))
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
          //for map function in order to return
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
  }, [operationIdVal]);

  console.log("operationDetails: ", operationDetails);

  if (operationSpellValidation) {
    return <PageNotFound />;
  }

  return (
    <>
      <GlobalHeader
        id={id}
        label={collectionDetails?.name}
        subLabel={operationDetails?.name}
        onCloseHandler={onCloseHandler}
      />
      <CardContainer
        style={{
          padding: "10px ",
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: "5px",
              background: theme.palette.primaryWhite.main,
            }}
          >
            <div>
              <div>
                <Accordion
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                  onClick={() =>
                    setServiceDetailsClicked(!serviceDetailsClicked)
                  }
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <PrimaryTypography
                        style={{
                          color: `${theme.palette.v2PrimaryColor.main}`,
                          fontSize: "10px",
                        }}
                      >
                        {translate("apiManagement.SHOW_SERVICE_DETAILS")}
                      </PrimaryTypography>
                      <ExpandMoreIcon
                        style={{ fontSize: "13px", fontWeight: 600 }}
                      />
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          background: theme.palette.primaryWhite.main,
                        }}
                      >
                        <div>
                          <Grid container>
                            <Grid item xs={11}>
                              <PrimaryTypography style={{ fontSize: "10px" }}>
                                {translate("apiManagement.API_SERVICE_NAME")}
                              </PrimaryTypography>
                              <ApiTextField
                                width="99%"
                                value={collectionDetails?.name}
                                onChange={(e: any) => {
                                  let name = e.target.value;
                                  handleCollectionDetails("name", name);
                                }}
                                onKeyUp={(event: any) => {
                                  if (event?.key === "Enter") {
                                    handleCollectionValidation(
                                      "collectionName"
                                    );
                                  }
                                }}
                                error={errorname}
                                errorHandler={(error: any) =>
                                  setErrorname(error)
                                }
                              />
                            </Grid>
                            <Grid item xs={1}>
                              <PrimaryTypography style={{ fontSize: "10px" }}>
                                {translate("apiManagement.VERSION")}
                              </PrimaryTypography>
                              {location.includes(
                                `/projects/${currentEnvironment}/collections/${collectionIdVal}`
                              ) ? (
                                <>
                                  <div>
                                    <FormControl>
                                      <Select
                                        id="version"
                                        variant="outlined"
                                        value={versionVal}
                                        autoWidth
                                        style={{
                                          width: "100%",
                                          height: "30px",
                                          padding: 0,
                                          fontSize: "0.6rem",
                                          borderColor: `${theme.palette.primaryBlack.main}`,
                                        }}
                                        onChange={(e: any) => {
                                          handleVersionValue(e);
                                        }}
                                      >
                                        <MenuItem value="1.0">
                                          <PrimaryTypography>
                                            1.0{" "}
                                          </PrimaryTypography>
                                        </MenuItem>
                                        <MenuItem value="2.0">
                                          <PrimaryTypography>
                                            2.0
                                          </PrimaryTypography>
                                        </MenuItem>
                                        <hr />
                                        <MenuItem>
                                          <GButton
                                            buttonType="primary"
                                            label="Save as new version"
                                            onClickHandler={(e: any) => {
                                              setSaveVersionClicked(true);
                                              handleClickVersion(e);
                                            }}
                                          />
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div>
                                    {saveVersionClicked && (
                                      <div>
                                        <Backdrop
                                          sx={{
                                            zIndex: 9998,
                                            backgroundColor:
                                              "rgba(0, 0, 0, 0.5)",
                                          }}
                                          open={saveVersionClicked}
                                        />
                                        <div>
                                          {anchorElVersion && (
                                            <Popover
                                              open={Boolean(anchorElVersion)}
                                              anchorEl={anchorElVersion}
                                              onClose={
                                                handleCloseVersionPopOver
                                              }
                                              anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "right",
                                              }}
                                              sx={{
                                                zIndex: 9999,
                                                "& .MuiPaper-root": {
                                                  backgroundColor:
                                                    theme.palette.signInUpWhite
                                                      .main,
                                                  width: "340px",
                                                  height: "330px",
                                                  position: "absolute",
                                                },
                                              }}
                                            >
                                              <div>
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                    background: `${theme.palette.btnCancelGrey.main}`,
                                                    height: "38px",
                                                    width: "100%",
                                                  }}
                                                >
                                                  <PrimaryTypography
                                                    style={{
                                                      marginLeft: "10px",
                                                      marginTop: "10px",
                                                      fontWeight: 600,
                                                    }}
                                                  >
                                                    Save as
                                                  </PrimaryTypography>
                                                  <CloseIcon
                                                    style={{
                                                      color: `${theme.palette.primaryBlack.main}`,
                                                      width: "12px",
                                                      height: "12px",
                                                      marginRight: "10px",
                                                      marginTop: "10px",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={
                                                      handleCloseVersionPopOver
                                                    }
                                                  />
                                                </div>
                                                <div
                                                  style={{
                                                    padding: "10px",
                                                  }}
                                                >
                                                  <div>
                                                    <PrimaryTypography
                                                      aria-required="true"
                                                      style={{
                                                        fontWeight: 900,
                                                        color: `${theme.palette.teritiaryColor.main}`,
                                                      }}
                                                    >
                                                      Version
                                                      <span
                                                        style={{
                                                          color: `${theme.palette.mainRed.main}`,
                                                        }}
                                                      >
                                                        *
                                                      </span>
                                                    </PrimaryTypography>
                                                    <div>
                                                      <ApiTextField
                                                        value={saveVersionVal}
                                                        dataTest={
                                                          "project-name-input"
                                                        }
                                                        width="300px"
                                                        height="42px"
                                                        borderColor="#9CA3AF"
                                                        error={errorVersionVal}
                                                        errorHandler={(
                                                          error: any
                                                        ) => {
                                                          setErrorVersionVal(
                                                            error
                                                          );
                                                        }}
                                                        borderRadius="4px"
                                                        onChange={(e: any) => {
                                                          setSaveVersionVal(
                                                            e.target.value
                                                          );
                                                          setVersionVal(
                                                            e.target.value
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                  <div
                                                    style={{
                                                      marginTop: "20px",
                                                    }}
                                                  >
                                                    <PrimaryTypography
                                                      style={{
                                                        fontWeight: 900,
                                                        color: `${theme.palette.teritiaryColor.main}`,
                                                      }}
                                                    >
                                                      Description
                                                    </PrimaryTypography>
                                                    <div
                                                      style={{
                                                        marginTop: "10px",
                                                      }}
                                                    >
                                                      <TextOutlinedInput
                                                        value={saveVersionDesc}
                                                        data-test={
                                                          "project-description"
                                                        }
                                                        minRows={2}
                                                        style={{
                                                          width: "300px",
                                                          borderColor:
                                                            "#9CA3AF",
                                                          borderRadius: "4px",
                                                          fontSize: "0.6rem",
                                                        }}
                                                        onChange={(e: any) => {
                                                          setSaveVersionDesc(
                                                            e.target.value
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{
                                                    marginTop: "-10px",
                                                    padding: "10px",
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      justifyContent: "end",
                                                    }}
                                                  >
                                                    <div>
                                                      <GButton
                                                        buttonType="primary"
                                                        label="Cancel"
                                                        color={`${theme.palette.primaryBlack.main}`}
                                                        background="transparent"
                                                        onClickHandler={
                                                          handleCloseVersionPopOver
                                                        }
                                                      />
                                                    </div>
                                                    <div
                                                      style={{
                                                        marginLeft: "10px",
                                                      }}
                                                    >
                                                      <GButton
                                                        buttonType="primary"
                                                        label="Save"
                                                        onClickHandler={
                                                          handleVersionSave
                                                        }
                                                        dataTest="save-project-btn"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </Popover>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <ApiDropdowns
                                    color="#9CA3AF"
                                    valueDrop="versionTypeVals"
                                    width="100%"
                                    onVersionTypeVal={(val: any) => {
                                      handleCollectionDetails("version", val);
                                    }}
                                  />
                                </>
                              )}
                            </Grid>
                          </Grid>

                          <div style={{ marginTop: "10px" }}>
                            <PrimaryTypography style={{ fontSize: "10px" }}>
                              {translate("apiManagement.API_BASE_URL")}
                            </PrimaryTypography>
                            <ApiTextField
                              // width="1030px"
                              width="100%"
                              value={collectionDetails?.base_url}
                              disabledVal={
                                location ===
                                `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections`
                                  ? false
                                  : true
                              }
                              onChange={(e: any) => {
                                let url = e.target.value;
                                handleCollectionDetails("base_url", url);
                              }}
                              onKeyUp={(event: any) => {
                                if (event?.key === "Enter") {
                                  // dispatch(updateTourStep(tourStep + 1));
                                  handleCollectionValidation(
                                    "collectionBaseUrl"
                                  );
                                }
                              }}
                              error={errorbase_url}
                              errorHandler={(error: any) =>
                                setErrorbase_url(error)
                              }
                            />
                          </div>
                          <div>
                            {(collectionDetails?.service_type === "SOAP" ||
                              serviceVal === "SOAP") && (
                              <div>
                                <PrimaryTypography style={{ fontSize: "10px" }}>
                                  API Wsdl URL
                                </PrimaryTypography>
                                <ApiTextField
                                  width="100%"
                                  value={collectionDetails?.wsdl_url}
                                  disabledVal={
                                    location ===
                                    `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections`
                                      ? false
                                      : true
                                  }
                                  onChange={(e: any) => {
                                    let wsdl_url = e.target.value;
                                    handleCollectionDetails(
                                      "wsdl_url",
                                      wsdl_url
                                    );
                                  }}
                                  onKeyUp={(event: any) => {
                                    if (event?.key === "Enter") {
                                      // dispatch(updateTourStep(tourStep + 1));
                                      handleCollectionValidation(
                                        "collectionWsdlUrl"
                                      );
                                    }
                                  }}
                                  error={errorwsdl_url}
                                  errorHandler={(error: any) =>
                                    setErrorwsdl_url(error)
                                  }
                                />
                                <span style={{ whiteSpace: "pre" }}>
                                  {"  "}
                                </span>
                              </div>
                            )}
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <PrimaryTypography
                              aria-required="true"
                              style={{ fontSize: "10px" }}
                            >
                              {translate(
                                "apiManagement.WEB_SERVICE_AUTHENTICATION"
                              )}
                            </PrimaryTypography>
                            <div>
                              <RadioCheckboxComponent
                                radioButton
                                buttonWidth="12px"
                                buttonColor={
                                  collectionDetails?.web_service_authentication ===
                                  `${translate("apiManagement.NONE")}`
                                    ? // ? `#8B5CF6`
                                      `${theme.palette.v2PrimaryColor.main}`
                                    : `${theme.palette.fourthColor.main}`
                                }
                                label={
                                  <SecondaryTypography
                                    style={{
                                      textTransform: "none",
                                      marginRight: "20px",
                                    }}
                                  >
                                    {translate("apiManagement.NONE")}
                                  </SecondaryTypography>
                                }
                                checked={
                                  collectionDetails?.web_service_authentication ===
                                  `${translate("apiManagement.NONE")}`
                                }
                                onChange={(e: any) => {
                                  handleWebServiceVal("NONE");
                                  handleCollectionDetails(
                                    "web_service_authentication",
                                    "NONE"
                                  );
                                }}
                              />
                              <RadioCheckboxComponent
                                radioButton
                                buttonWidth="12px"
                                buttonColor={
                                  collectionDetails?.web_service_authentication ===
                                  `${translate("apiManagement.BASIC")}`
                                    ? // ? `#8B5CF6`
                                      `${theme.palette.v2PrimaryColor.main}`
                                    : `${theme.palette.fourthColor.main}`
                                }
                                label={
                                  <SecondaryTypography
                                    style={{
                                      textTransform: "none",
                                      marginRight: "20px",
                                    }}
                                  >
                                    {translate("apiManagement.BASIC")}
                                  </SecondaryTypography>
                                }
                                checked={
                                  collectionDetails?.web_service_authentication ===
                                  `${translate("apiManagement.BASIC")}`
                                }
                                onChange={(e: any) => {
                                  handleWebServiceVal("Basic");
                                  handleCollectionDetails(
                                    "web_service_authentication",
                                    "Basic"
                                  );
                                }}
                              />
                              <RadioCheckboxComponent
                                radioButton
                                buttonWidth="12px"
                                buttonColor={
                                  collectionDetails?.web_service_authentication ===
                                  `${translate("apiManagement.NTLM")}`
                                    ? // ? `#8B5CF6`
                                      `${theme.palette.v2PrimaryColor.main}`
                                    : `${theme.palette.fourthColor.main}`
                                }
                                label={
                                  <SecondaryTypography
                                    style={{
                                      textTransform: "none",
                                    }}
                                  >
                                    {translate("apiManagement.NTLM")}
                                  </SecondaryTypography>
                                }
                                checked={
                                  collectionDetails?.web_service_authentication ===
                                  `${translate("apiManagement.NTLM")}`
                                }
                                onChange={(e: any) => {
                                  handleWebServiceVal("NTLM");
                                  handleCollectionDetails(
                                    "web_service_authentication",
                                    "NTLM"
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ marginTop: "10px" }}>
                            <PrimaryTypography style={{ fontSize: "10px" }}>
                              {translate("apiManagement.DESCRIPTION")}
                            </PrimaryTypography>
                            <div>
                              <FormControl sx={{ width: "100%" }}>
                                <div style={{ marginTop: "10px" }}>
                                  <TextOutlinedInput
                                    style={{
                                      width: "100%",
                                      fontSize: "0.6rem",
                                    }}
                                    minRows={2}
                                    placeholder=""
                                    value={collectionDetails?.description}
                                    onChange={(e: any) => {
                                      let description = e.target.value;
                                      handleCollectionDetails(
                                        "description",
                                        description
                                      );
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
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <GButton
                              buttonType="primary"
                              color={`${theme.palette.primaryBlack.main}`}
                              label={`${translate("apiManagement.CANCEL")}`}
                              fontWeight="500"
                              fontSize="10px"
                              background="transparent"
                              margin="10px"
                              onClickHandler={handleCancelBtn}
                            />
                            <GButton
                              buttonType="primary"
                              background={`${theme.palette.v2PrimaryColor.main}`}
                              label={`${translate("apiManagement.SAVE")}`}
                              fontWeight={"500"}
                              fontSize="10px"
                              margin="10px"
                              onClickHandler={handleSaveBtn}
                            />
                            <div style={{ marginLeft: "10px" }}>
                              <GButton
                                buttonType="primary"
                                background={`${theme.palette.v2PrimaryColor.main}`}
                                label={`${translate(
                                  "apiManagement.SAVE_ADD_OPERATIONS"
                                )}`}
                                fontWeight={"500"}
                                fontSize="10px"
                                margin="10px"
                                onClickHandler={handleSaveAddBtn}
                              />
                            </div>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <div
              style={{
                padding: "0px 10px",
              }}
              // className="api_operation_create"
            >
              <>
                <div>
                  {location !==
                    `/userId/${userProfile?.user?.user_id}/workspaceId/${currentWorkspace?.id}/projects/${currentEnvironment}/collections/${collectionIdVal}/operations` && (
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div style={{ marginRight: "20px" }}>
                        {loading && <GlobalLoader />}
                        {
                          <>
                            {operationDetails?.endpoint_status?.trim() !==
                              "" && (
                              <SecondaryTypography
                                style={{
                                  color:
                                    operationDetails?.endpoint_status ===
                                    "NORMAL"
                                      ? "#0055ff"
                                      : operationDetails?.endpoint_status ===
                                        "SHADOW"
                                      ? "#808080"
                                      : operationDetails?.endpoint_status ===
                                        "ZOMBIE"
                                      ? "#cc6600"
                                      : "",
                                  borderRadius: "5px",
                                  display: "inline-block",
                                  padding:
                                    operationDetails?.endpoint_status ===
                                      "NORMAL" ||
                                    operationDetails?.endpoint_status ===
                                      "SHADOW" ||
                                    operationDetails?.endpoint_status ===
                                      "ZOMBIE"
                                      ? "5px"
                                      : "",
                                  transition:
                                    "background-color 0.3s, box-shadow 0.3s",
                                }}
                              >
                                {operationDetails?.endpoint_status ===
                                  "NORMAL" ||
                                operationDetails?.endpoint_status === "null" ? (
                                  <>
                                    <span>
                                      <CheckCircleIcon
                                        style={{
                                          fontSize: "12px",
                                          marginRight: "3px",
                                          color: `#0055ff`,
                                          fontWeight: 900,
                                        }}
                                      />
                                      {`Marked as Established`}
                                    </span>
                                  </>
                                ) : operationDetails?.endpoint_status ===
                                  "SHADOW" ? (
                                  <>
                                    <span>
                                      <InfoIcon
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "3px",
                                          color: "#808080",
                                          fontWeight: 900,
                                        }}
                                      />
                                      {`Marked as ${capitalizeFirstLetter(
                                        operationDetails?.endpoint_status
                                      )}`}
                                    </span>
                                  </>
                                ) : operationDetails?.endpoint_status ===
                                  "ZOMBIE" ? (
                                  <>
                                    <span>
                                      <WarningIcon
                                        style={{
                                          fontSize: "15px",
                                          marginRight: "3px",
                                          color: `#cc6600`,
                                          fontWeight: 900,
                                        }}
                                      />
                                      {`Marked as ${capitalizeFirstLetter(
                                        operationDetails?.endpoint_status
                                      )}`}
                                    </span>
                                  </>
                                ) : (
                                  " "
                                )}
                              </SecondaryTypography>
                            )}
                          </>

                          // )
                        }
                      </div>
                      {/* This is the Insights component */}
                      <>
                        <ApiInsights />
                      </>
                    </div>
                  )}
                </div>
                {/* operations */}
                <>
                  <Grid container sx={{ marginTop: "20px" }}>
                    <Grid item xs={9}>
                      <div className="api_operation_name">
                        <PrimaryTypography style={{ fontSize: "10px" }}>
                          {translate("apiManagement.API_OPERATION_NAME")}
                        </PrimaryTypography>
                        <ApiTextField
                          width="99%"
                          value={operationDetails?.name}
                          onChange={(e: any) => {
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
                          errorHandler={(error: any) =>
                            setErrorApiOperationName(error)
                          }
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <PrimaryTypography style={{ fontSize: "10px" }}>
                        {translate("apiManagement.OPERATION_SECURITY_LEVEL")}
                      </PrimaryTypography>
                      <ApiDropdowns
                        valueDrop="operationSecurityLevel"
                        width="100%"
                        initialValue={operationDetails?.security_type}
                        onGettingOperationSecurityValue={(val: any) => {
                          handleOperationDetails("security_type", val);
                        }}
                      />
                    </Grid>
                  </Grid>
                </>

                <div style={{ marginTop: "10px" }}>
                  <PrimaryTypography style={{ fontSize: "10px" }}>
                    {translate("apiManagement.API_OPERATION_URL")}
                    <span>
                      <Tooltip
                        arrow
                        title="Click here to see the background url."
                      >
                        <InfoIcon
                          style={{
                            marginLeft: "3px",
                            // color: `${theme.palette.primaryPurple.main}`,
                            color: `${theme.palette.v2PrimaryColor.main}`,
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                          onClick={(e: any) => {
                            handleClick(e);
                          }}
                        />
                      </Tooltip>
                    </span>
                  </PrimaryTypography>
                  <div className="api_operation_url">
                    <ApiTextField
                      width="100%"
                      value={operationDetails?.method_name}
                      onChange={(e: any) => {
                        let methodName = e.target.value;
                        handleOperationDetails("method_name", methodName);
                      }}
                      onKeyUp={(event: any) => {
                        if (event?.key === "Enter") {
                          // dispatch(updateTourStep(tourStep + 1));
                          handleOperationValidation("operationUrl");
                        }
                      }}
                      // error={errorApiOperationUrl}
                      // errorHandler={(error: any) =>
                      //   setErrorApiOperationUrl(error)
                      // }
                      startAdornment={
                        <>
                          <InputAdornment
                            position="start"
                            style={{
                              marginLeft: "-10px",
                              marginTop: "-9px",
                            }}
                          >
                            <div style={{ pointerEvents: "none" }}>
                              <ApiTextField
                                value={collectionDetails?.base_url}
                                width="250px"
                                background="#9CA3AF"
                                borderColor="transparent"
                                placeholder={collectionDetails?.base_url}
                              />
                            </div>
                          </InputAdornment>
                        </>
                      }
                      endAdornment={
                        <div>
                          <InputAdornment
                            position="end"
                            style={{
                              display: "flex",
                              // marginRight: "-20px",
                              marginBottom: "5px",
                            }}
                            className="api_operation_method"
                          >
                            <Box
                              className="container"
                              sx={{
                                borderLeft: "1px solid",
                                borderColor: theme.palette.primaryBorder.main,
                                height: "3vh",
                                overflowY: "auto",
                                marginLeft: "-30px",
                                marginTop: "12px",
                                padding: "0",
                                marginBottom: "6px",
                              }}
                            ></Box>
                            <ApiDropdowns
                              width="100%"
                              valueDrop="method"
                              initialValue={
                                // collectionDetails?.apiOperationMethod
                                operationDetails?.http_method
                              }
                              // initialValue={"Check"}
                              color="#16A34A"
                              borderColor="transparent"
                              onMethodChange={(val: any) => {
                                handleOperationDetails("http_method", val);
                                dispatch(updateTourStep(tourStep + 1));
                              }}
                            />
                          </InputAdornment>
                        </div>
                      }
                    />
                    {/* <span style={{ whiteSpace: "pre" }}>{"  "}</span> */}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: "10px",
                  }}
                >
                  <div style={{ marginRight: "150px" }}>
                    <PrimaryTypography
                      aria-required="true"
                      style={{ fontSize: "10px" }}
                    >
                      {translate("apiManagement.PASS_THROUGH_COOKIES")}
                    </PrimaryTypography>
                    <div>
                      <RadioCheckboxComponent
                        radioButton
                        buttonWidth="13px"
                        buttonColor={
                          passThroughCookies ===
                          `${translate("apiManagement.NO")}`
                            ? // ? `#8B5CF6`
                              `${theme.palette.v2PrimaryColor.main}`
                            : `${theme.palette.fourthColor.main}`
                        }
                        label={
                          <SecondaryTypography
                            style={{ textTransform: "none" }}
                          >
                            {translate("apiManagement.NO")}
                          </SecondaryTypography>
                        }
                        checked={
                          passThroughCookies ===
                          `${translate("apiManagement.NO")}`
                        }
                        onChange={(e: any) => {
                          handlePassthroughCookies(
                            `${translate("apiManagement.NO")}`
                          );
                          handleOperationDetails(
                            "passThrough_Cookies",
                            passThroughCookies
                          );
                        }}
                      />
                      <RadioCheckboxComponent
                        radioButton
                        buttonWidth="13px"
                        buttonColor={
                          passThroughCookies ===
                          `${translate("apiManagement.YES")}`
                            ? // ? `#8B5CF6`
                              `${theme.palette.v2PrimaryColor.main}`
                            : `${theme.palette.fourthColor.main}`
                        }
                        label={
                          <SecondaryTypography
                            style={{ textTransform: "none" }}
                          >
                            {translate("apiManagement.YES")}
                          </SecondaryTypography>
                        }
                        checked={
                          passThroughCookies ===
                          `${translate("apiManagement.YES")}`
                        }
                        onChange={(e: any) => {
                          handlePassthroughCookies(
                            `${translate("apiManagement.YES")}`
                          );
                          handleOperationDetails(
                            "passThrough_Cookies",
                            passThroughCookies
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <PrimaryTypography
                      aria-required="true"
                      style={{ fontSize: "10px" }}
                    >
                      {translate("apiManagement.GENERATE_MOCK_DATE")}
                    </PrimaryTypography>
                    <div>
                      <RadioCheckboxComponent
                        radioButton
                        buttonWidth="13px"
                        buttonColor={
                          generateMockDate ===
                          `${translate("apiManagement.NO")}`
                            ? // ? `#8B5CF6`
                              `${theme.palette.v2PrimaryColor.main}`
                            : `${theme.palette.fourthColor.main}`
                        }
                        label={
                          <SecondaryTypography
                            style={{ textTransform: "none" }}
                          >
                            {translate("apiManagement.NO")}
                          </SecondaryTypography>
                        }
                        checked={
                          generateMockDate ===
                          `${translate("apiManagement.NO")}`
                        }
                        onChange={(e: any) => {
                          handleGenerateMockDate(
                            `${translate("apiManagement.NO")}`
                          );
                          handleOperationDetails(
                            "generate_MockDate",
                            generateMockDate
                          );
                        }}
                      />
                      <RadioCheckboxComponent
                        radioButton
                        buttonWidth="13px"
                        buttonColor={
                          generateMockDate ===
                          `${translate("apiManagement.YES")}`
                            ? // ? `#8B5CF6`
                              `${theme.palette.v2PrimaryColor.main}`
                            : `${theme.palette.fourthColor.main}`
                        }
                        label={
                          <SecondaryTypography
                            style={{ textTransform: "none" }}
                          >
                            {translate("apiManagement.YES")}
                          </SecondaryTypography>
                        }
                        checked={
                          generateMockDate ===
                          `${translate("apiManagement.YES")}`
                        }
                        onChange={(e: any) => {
                          handleGenerateMockDate(
                            `${translate("apiManagement.YES")}`
                          );
                          handleOperationDetails(
                            "generate_MockDate",
                            generateMockDate
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ marginTop: "10px" }}
                  className="api_operation_description"
                >
                  <PrimaryTypography style={{ fontSize: "10px" }}>
                    {translate("apiManagement.DESCRIPTION")}
                  </PrimaryTypography>
                  <div>
                    <FormControl sx={{ width: "100%" }}>
                      <div style={{ marginTop: "10px" }}>
                        <TextOutlinedInput
                          style={{ width: "100%", fontSize: "0.6rem" }}
                          minRows={2}
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
                </div>
                <div style={{ marginTop: "20px" }}>
                  <StyledButton>
                    <GButton
                      buttonType="primary"
                      fontSize="10px"
                      color={
                        activeBtn
                          ? `${theme.palette.primaryBlack.main}`
                          : `${theme.palette.primaryWhite.main}`
                      }
                      label={`${translate("apiManagement.INPUT_PARAMETERS")}`}
                      background={
                        activeBtn
                          ? "#F1F5F9"
                          : `${theme.palette.v2PrimaryColor.main}`
                        // : "#A855F7"
                      }
                      onClickHandler={handleInputParameter}
                    />
                    <GButton
                      buttonType="primary"
                      fontSize="10px"
                      color={
                        activeBtn
                          ? `${theme.palette.primaryWhite.main}`
                          : `${theme.palette.primaryBlack.main}`
                      }
                      label={`${translate("apiManagement.OUTPUT_PARAMETERS")}`}
                      background={
                        activeBtn
                          ? // ? "#A855F7"
                            `${theme.palette.v2PrimaryColor.main}`
                          : "#F1F5F9"
                      }
                      onClickHandler={handleOutputParameter}
                    />
                  </StyledButton>
                </div>
                {inputParamBtn === true && outputParamBtn === false ? (
                  <>
                    <div style={{ marginTop: "10px" }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} className="pr-0">
                          {navLinks?.map((nav, index) => (
                            <>
                              <StyledNavItem
                                key={nav?.id}
                                className={nav?.active ? "active" : ""}
                                onClick={() => {
                                  navLinkHandler(nav?.id, nav?.label);
                                  setEnablePassThrough(false);
                                }}
                              >
                                <SecondaryTypography
                                  style={{
                                    textTransform: "none",
                                    marginLeft: "10px",
                                    color: nav.active
                                      ? `${theme.palette.primaryBlack.main}`
                                      : "#6B7280",
                                  }}
                                >
                                  {nav?.label}
                                </SecondaryTypography>
                              </StyledNavItem>
                            </>
                          ))}
                        </Grid>
                      </Grid>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      {valLabel === "Body" || valLabel === "Header" ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <SecondaryTypography style={{ fontWeight: 800 }}>
                                {translate("apiManagement.ENABLE_PASS_THROUGH")}
                              </SecondaryTypography>
                              <div
                                style={{
                                  marginTop: "-8px",
                                  marginLeft: "20px",
                                }}
                              >
                                <RadioCheckboxComponent
                                  // radioButton
                                  buttonWidth="11px"
                                  buttonColor={
                                    enablePassThrough === true
                                      ? // ? `#8B5CF6`
                                        `${theme.palette.v2PrimaryColor.main}`
                                      : `${theme.palette.fourthColor.main}`
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
                              </div>
                            </div>
                            {!enablePassThrough && (
                              <>
                                <div>
                                  {valLabel === "Body" ? (
                                    <div style={{ display: "flex" }}>
                                      <SecondaryTypography>
                                        {translate(
                                          "apiManagement.REQUEST_TEMPLATE"
                                        )}
                                      </SecondaryTypography>
                                      <div
                                        style={{
                                          marginTop: "-7px",
                                          marginLeft: "15px",
                                        }}
                                      >
                                        <RadioCheckboxComponent
                                          // radioButton
                                          buttonWidth="11px"
                                          buttonColor={
                                            requestTemplate === true
                                              ? // ? `#8B5CF6`
                                                `${theme.palette.v2PrimaryColor.main}`
                                              : `${theme.palette.fourthColor.main}`
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
                                            setRequestTemplate(
                                              !requestTemplate
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}

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
                            width: "400px",
                            height: "350px",
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
                              handleClose();
                            }}
                          />
                          <HeadingTypography
                            style={{
                              fontSize: "10px",
                              fontFamily: "Inter-Regular !important",
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
                            Here is the list of background URLs for the
                            operation{" "}
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
                                          fontFamily:
                                            "Inter-Regular !important",
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
                <div>
                  {!enablePassThrough && !requestTemplate && inputParamBtn && (
                    <div style={{ display: "flex" }}>
                      <div>
                        <GButton
                          buttonType="secondary"
                          fontSize="10px"
                          label={`Add ${valLabel} Row`}
                          background={`${theme.palette.LGrayishBlue.main}`}
                          // icon={
                          icon={
                            <AddIcon
                              style={{
                                width: "10px",
                                height: "10px",
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
                              fontSize="10px"
                              label={`Delete row`}
                              background={`${theme.palette.LGrayishBlue.main}`}
                              // icon={
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
                <div>
                  {!enablePassThrough && !requestTemplate ? (
                    <>
                      <div style={{ marginTop: "10px" }}>
                        {valLabel === "Body" && outputParamBtn === false ? (
                          <>
                            <Box
                              sx={{
                                borderLeft: "1px solid black",
                                borderRight: "1px solid black",
                              }}
                            >
                              {/* <OperationTable  headers={columns} /> */}
                              <GDataGrid
                                hideFooter
                                checkboxSelection
                                dataGridType={"primary"}
                                // editMode='row'
                                columns={columns}
                                rows={rowsBody}
                                disableColumnMenu={true}
                                fontSize="0.6rem"
                                fontWeight={800}
                                backgroundColor="transparent"
                                color={`${theme.palette.primaryBlack.main}`}
                                onRowSelect={(val: any) => {
                                  handleRowDelete(val);
                                  setRowId(val);
                                }}
                              />
                            </Box>
                          </>
                        ) : valLabel === "Header" &&
                          outputParamBtn === false ? (
                          <>
                            <Box
                              sx={{
                                borderLeft: "1px solid black",
                                borderRight: "1px solid black",
                              }}
                            >
                              <GDataGrid
                                hideFooter
                                checkboxSelection
                                dataGridType={"primary"}
                                columns={columns}
                                rows={rowsHeader}
                                // editMode='row'
                                disableColumnMenu={true}
                                fontSize="0.6rem"
                                fontWeight={800}
                                backgroundColor="transparent"
                                color={`${theme.palette.primaryBlack.main}`}
                                onRowSelect={(val: any) => {
                                  handleRowDelete(val);
                                  setRowId(val);
                                }}
                                processRowUpdate={(
                                  newVal: any,
                                  oldVal: any
                                ) => {
                                  let updatedRow = { ...newVal };
                                  let indexOfUpdatedRow = rowsHeader?.findIndex(
                                    (item) => item?.id === updatedRow?.id
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
                        ) : valLabel === "Authorization" &&
                          outputParamBtn === false ? (
                          <>
                            <Box
                              sx={{
                                borderLeft: "1px solid black",
                                borderRight: "1px solid black",
                              }}
                            >
                              <GDataGrid
                                hideFooter
                                checkboxSelection
                                dataGridType={"primary"}
                                columns={columns}
                                rows={rowsAuthorization}
                                // editMode='row'
                                disableColumnMenu={true}
                                fontSize="0.6rem"
                                fontWeight={800}
                                backgroundColor="transparent"
                                color={`${theme.palette.primaryBlack.main}`}
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
                                      (item) => item?.id === updatedRow?.id
                                    );
                                  if (indexOfUpdatedRow !== -1) {
                                    let updatedValue = [...rowsAuthorization];
                                    updatedValue[indexOfUpdatedRow] =
                                      updatedRow;
                                    setRowsAuthorization(updatedValue);
                                  }
                                }}
                              />
                            </Box>
                          </>
                        ) : valLabel === "Query Parameters" &&
                          outputParamBtn === false ? (
                          <>
                            <Box
                              sx={{
                                borderLeft: "1px solid black",
                                borderRight: "1px solid black",
                              }}
                            >
                              <GDataGrid
                                hideFooter
                                checkboxSelection
                                dataGridType={"primary"}
                                columns={columns}
                                rows={rowsQueryParameters}
                                // editMode='row'
                                disableColumnMenu={true}
                                fontSize="0.6rem"
                                fontWeight={800}
                                backgroundColor="transparent"
                                color={`${theme.palette.primaryBlack.main}`}
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
                                      (item) => item?.id === updatedRow?.id
                                    );
                                  if (indexOfUpdatedRow !== -1) {
                                    let updatedValue = [...rowsQueryParameters];
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
                    </>
                  ) : (
                    <>
                      {requestTemplate === true ? (
                        <>
                          <div style={{ display: "flex" }}>
                            <div>
                              <GButton
                                buttonType="secondary"
                                label={`Add ${valLabel} Row`}
                                background={`${theme.palette.LGrayishBlue.main}`}
                                // icon={
                                icon={
                                  <AddIcon
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                    }}
                                  />
                                }
                                onClickHandler={() =>
                                  handleAddRowButton(valLabel)
                                }
                              />
                            </div>
                            <div style={{ marginLeft: "10px" }}>
                              {rowsSelected === true ? (
                                <>
                                  <GButton
                                    buttonType="secondary"
                                    label={`Delete row`}
                                    background={`${theme.palette.LGrayishBlue.main}`}
                                    // icon={
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
                              <Grid item xs={6}>
                                <div style={{ marginTop: "10px" }}>
                                  {valLabel === "Body" &&
                                  outputParamBtn === false ? (
                                    <>
                                      <Box
                                        sx={{
                                          borderLeft: "1px solid black",
                                          borderRight: "1px solid black",
                                          padding: "2px",
                                          overflow: "auto",
                                        }}
                                      >
                                        {/* <OperationTable  headers={columns} /> */}
                                        <GDataGrid
                                          hideFooter
                                          checkboxSelection
                                          dataGridType={"primary"}
                                          // editMode='row'
                                          columns={columns}
                                          rows={rowsBody}
                                          disableColumnMenu={true}
                                          fontSize="0.6rem"
                                          fontWeight={800}
                                          backgroundColor="transparent"
                                          color={`${theme.palette.primaryBlack.main}`}
                                          onRowSelect={(val: any) => {
                                            handleRowDelete(val);
                                            setRowId(val);
                                          }}
                                        />
                                      </Box>
                                    </>
                                  ) : valLabel === "Header" &&
                                    outputParamBtn === false ? (
                                    <>
                                      <Box
                                        sx={{
                                          borderLeft: "1px solid black",
                                          borderRight: "1px solid black",
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
                                          // editMode='row'
                                          disableColumnMenu={true}
                                          fontSize="0.6rem"
                                          fontWeight={800}
                                          backgroundColor="transparent"
                                          color={`${theme.palette.primaryBlack.main}`}
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
                                              let updatedValue = [
                                                ...rowsHeader,
                                              ];
                                              updatedValue[indexOfUpdatedRow] =
                                                updatedRow;
                                              setRowsHeader(updatedValue);
                                            }
                                          }}
                                        />
                                      </Box>
                                    </>
                                  ) : valLabel === "Authorization" &&
                                    outputParamBtn === false ? (
                                    <>
                                      <Box
                                        sx={{
                                          borderLeft: "1px solid black",
                                          borderRight: "1px solid black",
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
                                          // editMode='row'
                                          disableColumnMenu={true}
                                          fontSize="0.6rem"
                                          fontWeight={800}
                                          backgroundColor="transparent"
                                          color={`${theme.palette.primaryBlack.main}`}
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
                                              setRowsAuthorization(
                                                updatedValue
                                              );
                                            }
                                          }}
                                        />
                                      </Box>
                                    </>
                                  ) : valLabel === "Query Parameters" &&
                                    outputParamBtn === false ? (
                                    <>
                                      <Box
                                        sx={{
                                          borderLeft: "1px solid black",
                                          borderRight: "1px solid black",
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
                                          // editMode='row'
                                          disableColumnMenu={true}
                                          fontSize="0.6rem"
                                          fontWeight={800}
                                          backgroundColor="transparent"
                                          color={`${theme.palette.primaryBlack.main}`}
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
                                              setRowsQueryParameters(
                                                updatedValue
                                              );
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
                              <Grid item xs={6}>
                                <div
                                  style={{ padding: "5px", marginTop: "10px" }}
                                >
                                  <FormControl>
                                    <div style={{ marginTop: "10px" }}>
                                      <TextOutlinedInput
                                        style={{
                                          width: "490px",
                                          height: "380px",
                                          fontSize: "0.6rem",
                                        }}
                                        // minRows={10}
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
                          <Box
                            sx={{
                              width: "100%",
                              height: "300px",
                            }}
                          >
                            {""}
                          </Box>
                        </>
                      )}
                    </>
                  )}
                </div>

                <div>
                  {outputParamBtn === true && inputParamBtn === false ? (
                    <>
                      <Box
                        sx={{
                          borderLeft: "1px solid black",
                          borderRight: "1px solid black",
                        }}
                      >
                        <GDataGrid
                          // hideFooter
                          dataGridType={"primary"}
                          columns={columnsOutputParameters}
                          rows={rowsOutput}
                          disableColumnMenu={true}
                          fontSize="0.6rem"
                          fontWeight={800}
                          backgroundColor="transparent"
                          color={`${theme.palette.primaryBlack.main}`}
                          hideFooter={false}
                        />
                      </Box>
                    </>
                  ) : (
                    ""
                  )}
                </div>
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
                    fontSize="10px"
                    color={`${theme.palette.primaryBlack.main}`}
                    label={`${translate("apiManagement.CANCEL")}`}
                    margin={"10px"}
                    background="transparent"
                    onClickHandler={handleCancelOperation}
                  />
                  <GButton
                    buttonType="primary"
                    background={`${theme.palette.v2PrimaryColor.main}`}
                    fontSize="10px"
                    label={`${translate("apiManagement.SAVE")}`}
                    margin={"10px"}
                    onClickHandler={handleSaveOperationBtn}
                  />
                  <div
                    className="api_saveGetResponse_btn"
                    style={{ marginLeft: "10px" }}
                  >
                    <GButton
                      buttonType="primary"
                      background={`${theme.palette.v2PrimaryColor.main}`}
                      fontSize="10px"
                      label={`${translate("apiManagement.SAVE_GET_RESPONSE")}`}
                      margin={"10px"}
                      onClickHandler={handleSaveGetResponseBtn}
                    />
                  </div>
                </div>
              </>
            </div>
            <div>
              {saveGetResponseClicked === true && (
                <div
                  ref={scrollableContentRef}
                  className="api_operation_saveGetResponse"
                >
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
                        background: "#E2E8F0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <PrimaryTypography style={{ fontSize: "10px" }}>
                          {translate("apiManagement.REQUEST_RESPONSE")}
                        </PrimaryTypography>
                      </div>
                      <div style={{ display: "flex" }}>
                        <GlobeIcon
                          style={{
                            width: "10px",
                            height: "10px",
                            margin: "10px",
                          }}
                        />
                        <pre
                          style={{
                            margin: "10px",
                            fontSize: "10px",
                            fontFamily: "Inter-Regular !important",
                          }}
                        >
                          <SecondaryTypography>
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
                          <PrimaryTypography style={{ fontSize: "10px" }}>
                            {translate("apiManagement.REQUEST")}
                          </PrimaryTypography>
                          <div
                            style={{ background: "#F1F5F9", marginTop: "10px" }}
                          >
                            <pre
                              style={{
                                fontSize: "10px",
                                fontFamily: "Inter-Regular !important",
                              }}
                            >
                              {formattedRequest}
                            </pre>
                          </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "10px" }}>
                            {translate(
                              "apiManagement.INTEGRATION_SERVICE_INPUT"
                            )}
                          </PrimaryTypography>
                          <div
                            style={{ background: "#F1F5F9", marginTop: "10px" }}
                          >
                            <pre
                              style={{
                                fontSize: "10px",
                                fontFamily: "Inter-Regular !important",
                              }}
                            >
                              {formattedServiceInput}
                            </pre>
                          </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "10px" }}>
                            {translate(
                              "apiManagement.INTEGRATION_SERVICE_OUTPUT"
                            )}
                          </PrimaryTypography>
                          <div
                            style={{ background: "#F1F5F9", marginTop: "10px" }}
                          >
                            <pre
                              style={{
                                fontSize: "10px",
                                fontFamily: "Inter-Regular !important",
                              }}
                            >
                              {formattedServiceOutput}
                            </pre>
                          </div>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                          <PrimaryTypography style={{ fontSize: "10px" }}>
                            Response
                          </PrimaryTypography>
                          <div
                            style={{ background: "#F1F5F9", marginTop: "10px" }}
                          >
                            <pre
                              style={{
                                fontSize: "10px",
                                fontFamily: "Inter-Regular !important",
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
          </Box>
        </div>
      </CardContainer>
    </>
  );
}
