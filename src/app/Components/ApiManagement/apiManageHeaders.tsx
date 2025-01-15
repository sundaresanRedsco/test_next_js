import React, { useCallback, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Popover,
  FormControl,
  TextareaAutosize,
  Backdrop,
  Select,
  MenuItem,
  Menu,
  Button,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  Checkbox,
  Paper,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import {
  PlusIcon,
  PostManIcon,
  SwaggerIcon,
  VectorIcon,
  InfoIcon,
  JsonIcon,
  SoapIcon,
  GraphQlIcon,
  ImportIcon,
  SortAlp,
  SortNum,
  CloseIcon,
  AnalyticsIcon,
  ChangeHistoryIcon,
  EditIcon,
  TotalProjects,
  DeleteIcon,
  ManageTeamSidebarIcon,
} from "../../Assests/icons";
import theme from "../../../Theme/theme";
import GsearchBar from "../Global/GsearchBar";
// import CloseIcon from "@mui/icons-material/Close";
import {
  HeadingTypography,
  PrimaryTypography,
  SecondaryTypography,
} from "../../Styles/signInUp";
import GToast from "../Global/GToast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostmanImage from "../../Assests/images/postmanImage.png";
import SwaggerImage from "../../Assests/images/swagger.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApiTextField from "./apiTextField";
import ApiDropdowns from "./apiDropdowns";
import GButton from "../Global/GlobalButtons";
import GraphQlImage from "../../Assests/images/graphql.png";
import GrpcImage from "../../Assests/images/gprc.png";
import WebImage from "../../Assests/images/web.png";
import {
  dateFormat,
  dateFormatDateOnly,
  EncrouptionLogic,
  getCookies,
  setCookies,
  translate,
} from "../../Helpers/helpersFunctions";
import GSelect from "../Global/GSelect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import {
  ApiStageCreation,
  GetAllStagesByProjectId,
  GetOperations,
  GetProjectByWorkspaceIdSolrOffset,
  // GetProjectsByWorkspaceId,
  ImportFromPostman,
  ImportFromUrl,
  UpdateApiScanResponse,
  projectReducer,
  setCurrentStage,
} from "../../Redux/apiManagement/projectReducer";
import GLobalLoader from "../Global/GlobalLoader";
import {
  CreateProjects,
  GetProjects,
} from "../../Redux/apiManagement/projectReducer";
import {
  CommonReducer,
  updateSessionPopup,
  updateTourStep,
} from "../../Redux/commonReducer";
import toast from "react-hot-toast";
import { createTeamreducer } from "../../Redux/manageTeam/teamReducer";
import RadioCheckboxComponent from "../Global/radioCheckboxComponent";
import { ExpandLess, IntegrationInstructions } from "@mui/icons-material";

import GDialogBox from "../Global/GDialogBox";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MotionPhotosAutoRoundedIcon from "@mui/icons-material/MotionPhotosAutoRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import {
  CreateApiDesignFlow,
  DesignApiFlow,
  GetApiDesignFlowByWorkspaceId,
} from "../../Redux/apiManagement/flowReducer";
import { INDEX_PATH } from "../../Utilities/pathConstants";
import { ReactFlowInstance } from "reactflow";
import { ImportApiGateway } from "../../Redux/apiManagement/apiGatewayReducer";
import AwsImportPopup from "./AwsImportPopup";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import GInput from "../Global/GInput";
import NotesIcon from "@mui/icons-material/Notes";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import Image from "next/image";

const HeaderTextTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primaryText.main};
  font-family: Inter-Regular;
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-right: 10px;
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

const accordionStyles = {
  elevation: 0,
  borderBottom: "none",
  "&.MuiPaper-root::before": {
    display: "none",
  },
  background: "transparent",
  boxShadow: "none",
  marginTop: "-20px",
  border: "none",
};

const accordionSummaryStyles = {
  borderBottom: "none",
};

const accordionDetailsStyles = {
  marginTop: "-25px",
  marginBottom: "-20px",
  border: "none",
};

export default function ApiManageHeaders(props: any) {
  const {
    onServicesValue,
    onSortbyClicked,
    onSearchingVal,
    imports,
    logslash,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname.split("/");

  const wsidVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_WSID ?? "");

  const stageId = getCookies(process.env.NEXT_PUBLIC_COOKIE_STAGEID ?? "");

  // const projectId = pathname[2];
  const projectId = pathname[6];

  // const designId = pathname[2];
  const designId = pathname[6];

  const projectIdValue: any = getCookies(
    process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? ""
  );

  const dispatch = useDispatch<any>();
  const { loading, projectsLists, apiMangeDahboardCount } = useSelector<
    RootStateType,
    projectReducer
  >((state) => state.apiManagement.projects);

  const { userProfile, tourStep } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentTeam } = useSelector<RootStateType, createTeamreducer>(
    (state) => state.apiTeam.createTeam
  );

  const [commonHeaderVal, setCommonHeaderVal] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [serviceVal, setServiceVal] = useState("HTTP - JSON");
  const [btnClicked, setBtnClicked] = useState(false);
  const [errorApiName, setErrorApiName] = useState("");
  const [errorVersion, setErrorVersion] = useState("");
  const [sortByClicked, setSortByClicked] = useState(false);

  const [importPostmanClicked, setImportPostmanClicked] = useState(false);
  const [newExistClicked, setNewExistClicked] = useState(false);
  const [existingClicked, setExistingClicked] = useState(false);
  const [newClicked, setNewClicked] = useState(false);
  const [urlClicked, setUrlClicked] = useState(false);
  const [fileClicked, setFileClicked] = useState(false);

  const [projectNameVal, setProjectNameVal] = useState("");
  const [projectUrlVal, setProjectUrlVal] = useState("");
  const [errorProjectName, setErrorProjectName] = useState("");
  const [errorProjectUrl, setErrorProjectUrl] = useState("");
  const [overwriteClicked, setOverwriteClicked] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");

  const [anchorElDrop, setAnchorElDrop] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElDropPostman, setAnchorElDropPostman] =
    React.useState<null | HTMLElement>(null);

  const [anchorElNew, setAnchorElNew] = useState<null | HTMLElement>(null);
  const [anchorElExisting, setAnchorElExisting] = useState<null | HTMLElement>(
    null
  );
  const [anchorElVal, setAnchorElVal] = useState<null | HTMLElement>(null);

  const [dataFileJsonCsv, setDataFileJsonCsv] = useState<any>(null);
  const [existingProjectName, setExistingProjectName] = useState<any>("");
  const [existingImportClicked, setExistingImportClicked] = useState(false);
  const [collOperDetails, setCollOperDetails] = useState<any[]>([]);
  const [existingProjectImport, setExistingProjectImport] = useState("");
  const [uniqueId, setUniqueId] = useState<any>();

  const [collSelectedOperDetails, setCollSelectedOperDetails] = useState<any[]>(
    []
  );
  const [notInsertedCollections, setNotInsertedCollections] = useState<any[]>(
    []
  );
  const [notInsertedOperations, setNotInsertedOpertaions] = useState<any[]>([]);

  const [newCollOper, setNewCollOper] = useState<any>([]);
  const [collIdUnchecked, setCollIdUnchecked] = useState<any[]>([]);
  const [operIdUnchecked, setOperIdUnchecked] = useState<any[]>([]);

  // const [openList, setOpenList] = React.useState(true);

  // const handleClickList = (collectionIdVal: any) => {
  //   setOpenList(!openList);
  // };

  const [openItem, setOpenItem] = useState<any>(null);

  const [operationListVal, setOperationListVal] = useState<any[]>([]);

  const [importVal, setImportVal] = useState("");

  const [importBtn, setImportBtn] = useState(false);

  const [rfInstance, setRfInstance] = React.useState<any>(null);

  const [anchorEl4, setAnchorEl4] = useState<HTMLButtonElement | null>(null);

  const [stagesVal, setStagesVal] = useState("");
  const [manageStagesClicked, setManageStagesClicked] = useState(false);
  const [addStageClicked, setAddStageClicked] = useState(false);
  const [viewStageClicked, setViewStageClicked] = useState(false);
  const [anchorAddStage, setAnchorAddStage] = useState(null);
  const [anchorViewStage, setAnchcorViewStage] = useState(null);
  const [stagesList, setStagesList] = useState([
    {
      name: "Name1",
      description: "Description1",
      modifiedBy: "unify@gmail.com",
      modifiedAt: "2024-04-02T11:44:48.067Z",
    },
    {
      name: "Name2",
      description: "Description2",
      modifiedBy: "unifypro@gmail.com",
      modifiedAt: "2024-04-02T11:44:48.067Z",
    },
    {
      name: "Name3",
      description: "Description3",
      modifiedBy: "mari@yopmail.com",
      modifiedAt: "2024-04-02T11:44:48.067Z",
    },
    {
      name: "Name4",
      description: "Description4",
      modifiedBy: "test@yopmail.com",
      modifiedAt: "2024-04-02T11:44:48.067Z",
    },
    {
      name: "Name5",
      description: "Description5",
      modifiedBy: "hello@gmail.com",
      modifiedAt: "2024-04-02T11:44:48.067Z",
    },
  ]);

  const [stagesResValues, setStagesResValues] = useState<any[]>([]);

  // const [openStage, setOpenStage] = React.useState(true);

  // const handleClickStageValues = () => {
  //   setOpenStage(!openStage);
  // };

  const [openStages, setOpenStages] = useState(
    Array(stagesList.length).fill(false)
  );

  const handleDescriptionChange = (event: any, index: any) => {
    const newValue = event.target.value;

    // Update the description property of the object at the specified index in openStages
    const updatedOpenStages = [...openStages];
    updatedOpenStages[index] = {
      ...updatedOpenStages[index],
      description: newValue,
    };

    // Update the state
    setOpenStages(updatedOpenStages);

    // If you also need to update stagesList
    const updatedStagesList = [...stagesList];
    updatedStagesList[index] = {
      ...updatedStagesList[index],
      description: newValue,
    };
    setStagesList(updatedStagesList);
  };

  const handleClickStageValues = (index: any) => {
    const newOpenStages = [...openStages];
    newOpenStages[index] = !newOpenStages[index];
    setOpenStages(newOpenStages);
  };

  const handleClickAddStage = (event: any) => {
    setAnchorAddStage(event.currentTarget);
  };
  const handleCloseAddStage = () => {
    setAnchorAddStage(null);
    setAddStageClicked(false);
    setViewStageClicked(false);
    setManageStagesClicked(false);
  };

  const handleClickViewStage = (event: any) => {
    setAnchcorViewStage(event.currentTarget);
  };
  const handleCloseViewStage = () => {
    setAnchcorViewStage(null);
    setAddStageClicked(false);
    setViewStageClicked(false);
    setManageStagesClicked(false);
  };

  const handleAddblock = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleCloseAddblock = () => {
    setAnchorEl4(null);
  };

  const open2 = Boolean(anchorEl4);
  const id2 = open2 ? "simple-popover" : undefined;

  const handleClickList = (collectionsId: any) => {
    setOpenItem((prevOpenItem: any) =>
      prevOpenItem === collectionsId ? null : collectionsId
    );
  };

  const open = Boolean(anchorElDrop);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDrop(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElDrop(null);
  };

  const openPostman = Boolean(anchorElDropPostman);
  const handleClickPostman = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDropPostman(event.currentTarget);
  };
  const handleClosePostman = () => {
    setAnchorElDropPostman(null);
    setImportPostmanClicked(false);
  };

  const openNew = Boolean(anchorElNew);
  const handleClickNew = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNew(event.currentTarget);
  };
  const handleCloseNew = () => {
    setAnchorElNew(null);
    setNewClicked(false);
    setExistingClicked(false);
  };

  const openExist = Boolean(anchorElNew);
  const handleClickExisting = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElExisting(event.currentTarget);
  };
  const handleCloseExisting = () => {
    setAnchorElExisting(null);
    setNewClicked(false);
    setExistingClicked(false);
  };

  const openNewExistVal = Boolean(anchorElVal);
  const handleClickNewExisting = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElVal(event.currentTarget);
  };
  const handleCloseNewExisting = () => {
    setAnchorElVal(null);
    setNewClicked(false);
    setExistingClicked(false);
    setExistingImportClicked(false);
    setNewExistClicked(false);
    setFileClicked(false);
    setUrlClicked(false);
    setDataFileJsonCsv(null);
    setImportVal("");
    setProjectUrlVal("");
    setProjectNameVal("");
    setExistingProjectImport("");
    setNotInsertedCollections([]);
    setNotInsertedOpertaions([]);
    setCollOperDetails([]);
  };

  const handleMenuItem = (val: any) => {
    setAnchorElDrop(null);
  };

  // const handleImportSave = () => {
  //   if (projectNameVal.trim() === "" && projectUrlVal.trim() === "") {
  //     setErrorProjectName("Project Name is required");
  //     setErrorProjectUrl("Project Url is required");
  //   } else if (projectNameVal.trim() === "") {
  //     setErrorProjectName("Project Name is required");
  //   // } else if (projectUrlVal.trim() === "") {
  //   //   setErrorProjectUrl("Project Url is required");
  //   // } else {
  //     let importData = {
  //       projectNameVal: projectNameVal,
  //       projectUrlVal: projectUrlVal,
  //     };
  //   }
  // };

  const [createNewProjectValues, setCreateNewProjectValues] = useState({
    user_id: userProfile?.user?.user_id,
    tenant_id: userProfile?.user?.tenant_id,
    api_project_name: "",
    version: "1.0",
    description: "",
    gateway_location: "",
    // workspace_id: currentTeam?.workspace_id,
    workspace_id: wsidVal,
  });

  const [createNewApiFlowValues, setCreateNewApiFlowValues] = useState({
    // workspace_id: currentTeam?.workspace_id,
    workspace_id: wsidVal,
    name: "",
    description: "",
  });

  const [addStageValues, setAddStageValues] = useState({
    workspace_id: wsidVal,
    name: "",
    description: "",
  });

  const handleCreateNewProject = (field: any, event: any) => {
    setCreateNewProjectValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleCreateNewApiFlow = (field: any, event: any) => {
    setCreateNewApiFlowValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleAddStage = (field: any, event: any) => {
    setAddStageValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleAddStageValidation = () => {
    const hasValidationError = addStageValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      addStageValues?.name
    );

    const isOverLimit = addStageValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
      // setErrorDescription("ApiFlow Description is required")
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    }
    // else {
    //   dispatch(updateTourStep(tourStep + 1));
    // }
  };

  const handleAddStageFunction = () => {
    const hasValidationError = addStageValues?.name.trim() === "";
    // ||
    // createNewApiFlowValues?.description.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      addStageValues?.name
    );

    const isOverLimit = addStageValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
      // setErrorDescription("ApiFlow Description is required")
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
      let apiStageCreationValues = {
        workspace_id: addStageValues?.workspace_id,
        stage_name: addStageValues?.name,
        description: addStageValues?.description,
      };
      dispatch(ApiStageCreation(apiStageCreationValues))
        .unwrap()
        .then((res: any) => {
          toast?.success("ApiStage Created Successfully!");
          // navigate(`/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/projectView/${projectId}`);
          setManageStagesClicked(false);
          setAddStageClicked(false);
          setViewStageClicked(false);
        })
        .catch((error: any) => {
          console.log("error: ", error);
        });
    }
  };

  const handleNewProject = (val: any) => {
    setCommonHeaderVal(val);
    // setBtnClicked(true)
  };

  const handleServicesVal = (val: any) => {
    setServiceVal(val);
    if (onServicesValue) {
      onServicesValue(val);
    }
    handleClosePopover();
  };

  const handleOpenPopover = (event: any, value: any) => {
    setAnchorEl(event.currentTarget);
    // setCommonHeaderVal(value);
    setBtnClicked(true);
    // dispatch(updateTourStep(tourStep + 1));
  };

  useEffect(() => {
    if (btnClicked === true) {
      setTimeout(() => {
        dispatch(updateTourStep(tourStep + 1));
      }, 1000);
    }
  }, [btnClicked]);

  const handleClosePopover = () => {
    setDataFileJsonCsv(null);
    setAnchorEl(null);
    setBtnClicked(false);
    setCreateNewProjectValues({
      user_id: userProfile?.user?.user_id,
      tenant_id: userProfile?.user?.tenant_id,
      api_project_name: "",
      version: "1.0",
      description: "",
      gateway_location: "",
      // workspace_id: currentTeam?.workspace_id,
      workspace_id: wsidVal,
    });
    setCreateNewApiFlowValues({
      description: "",
      name: "",
      workspace_id: "",
    });
    setErrorApiName("");
    setErrorProjectName("");
    setErrorProjectUrl("");
    dispatch(updateTourStep(0));
  };

  const servicesVal = [
    {
      name: `${translate("apiManageHeader.HTTP_JSON")}`,
      icon: <JsonIcon style={{ width: "28px", height: "28px" }} />,
    },
    {
      name: `${translate("apiManageHeader.HTTP_SOAP")}`,
      icon: <SoapIcon style={{ width: "30px", height: "30px" }} />,
    },
    {
      name: `${translate("apiManageHeader.GRAPHQL")}`,
      icon: (
        // <img
        //   src={GraphQlImage}
        //   alt=""
        //   style={{ width: "28px", height: "28px" }}
        // />
        <Image
          src={GraphQlImage}
          alt=""
          style={{ width: "28px", height: "28px" }}
        />
      ),
    },
    {
      name: `${translate("apiManageHeader.GRPC")}`,
      icon: (
        // <img src={GrpcImage} alt="" style={{ width: "28px", height: "28px" }} />
        <Image
          src={GrpcImage}
          alt=""
          style={{ width: "28px", height: "28px" }}
        />
      ),
    },
    {
      name: `${translate("apiManageHeader.WEB_SOCKET")}`,
      icon: (
        // <img src={WebImage} alt="" style={{ width: "28px", height: "28px" }} />
        <Image
          src={WebImage}
          alt=""
          style={{ width: "28px", height: "28px" }}
        />
      ),
    },
  ];

  const activeProjects = projectsLists?.filter(
    (filterStatus: any) => filterStatus.status === "ACTIVE"
  );

  const handleCreateProjectValidation = (value: any, type: any) => {
    if (type === "projectName") {
      const hasValidationError =
        createNewProjectValues?.api_project_name.trim() === "";

      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
        createNewProjectValues?.api_project_name
      );

      const isOverLimit = createNewProjectValues?.api_project_name.length > 50;

      if (hasValidationError) {
        setErrorApiName("Project Name is required");
      } else if (hasSpecialChar) {
        setErrorApiName("Special Characters and spaces are not allowed");
      } else if (isOverLimit) {
        setErrorApiName("ProjectName should not exceed 50 characters");
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    } else if (type === "gatewayLocation") {
      const hasValidationError =
        createNewProjectValues?.gateway_location.trim() === "";

      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
        createNewProjectValues?.gateway_location
      );

      const isOverLimit = createNewProjectValues?.gateway_location.length > 50;

      if (hasValidationError) {
        setErrorApiName("Location is required");
      } else if (hasSpecialChar) {
        setErrorApiName("Special Characters and spaces are not allowed");
      } else if (isOverLimit) {
        setErrorApiName("Location should not exceed 50 characters");
      } else {
        dispatch(updateTourStep(tourStep + 1));
      }
    }
  };

  const handleCreateButton = () => {
    const hasValidationError =
      createNewProjectValues?.api_project_name?.trim() === "" ||
      createNewProjectValues?.version?.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/?.test(
      createNewProjectValues?.api_project_name
    );

    const isOverLimit = createNewProjectValues?.api_project_name?.length > 50;

    if (hasValidationError) {
      setErrorApiName("Project Name is required");
      setErrorVersion("Version is required");
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ProjectName should not exceed 50 characters");
    } else {
      let createProjectData = {
        // user_id: userProfile?.user?.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        workspace_id: wsidVal,
        api_project_name: createNewProjectValues?.api_project_name,
        description: createNewProjectValues?.description,
        project_type: "MANUAL",
        gateway_location: createNewProjectValues?.gateway_location,
      };

      // dispatch(CreateProjects(createNewProjectValues))
      dispatch(CreateProjects(createProjectData))
        .unwrap()
        .then((createProjectRes: any) => {
          //encrypt projectId
          const encryptedProjectId = EncrouptionLogic(
            createProjectRes?.project_id
          );

          setCookies(
            process.env.NEXT_PUBLIC_COOKIE_PROJECTID || "",
            projectId,
            userProfile?.user?.expiration_time
          );

          onSearchingVal("");

          dispatch(GetAllStagesByProjectId(createProjectRes?.project_id))
            .unwrap()
            .then((res: any) => {
              setCookies(
                process.env.NEXT_PUBLIC_COOKIE_STAGEID ?? "",
                res?.[0]?.apistage_id,
                userProfile?.user?.expiration_time
              );
            })
            .catch((error: any) => {
              console.log("Error: ", error);
            });

          // dispatch(GetProjects());

          // dispatch(GetProjectsByWorkspaceId(currentTeam?.workspace_id))
          // dispatch(GetProjectsByWorkspaceId(wsidVal))
          //   .unwrap()
          //   .then((res: any) => {
          //     console.log("REs: ", res)
          //     dispatch(updateTourStep(tourStep + 1));
          //   })
          //   .catch((error: any) => {
          //     if (error?.message === "UNAUTHORIZED") {
          //       dispatch(updateSessionPopup(true));
          //     }
          //   });

          let requestData = {
            wsid: wsidVal,
            sortByField: "name",
            sortByValue: "",
            sortDirection: "asc",
            // startValue: startVal,
            startValue: 0,
            // endValue: endVal,
            endValue: apiMangeDahboardCount?.total_no_of_projects,
          };

          dispatch(GetProjectByWorkspaceIdSolrOffset(requestData))
            .unwrap()
            .then((res: any) => {
              // setProjectListsVal(res?.projects);
              // setSearchVal("")
            })
            .catch((error: any) => {
              console.log("Error: ", error);
            });

          toast.success("New project created successfully");
          // navigate(`/projectView/${createProjectRes?.project_id}`);
          navigate(
            // `/userId/${userProfile?.user?.user_id}/workspaceId/${currentTeam?.workspace_id}/projectView/${createProjectRes?.project_id}`
            `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/projectView/${createProjectRes?.project_id}`
          );
          setCreateNewProjectValues({
            user_id: userProfile?.user?.user_id,
            tenant_id: userProfile?.user?.tenant_id,
            api_project_name: "",
            version: "1.0",
            description: "",
            gateway_location: "",
            // workspace_id: currentTeam?.workspace_id,
            workspace_id: wsidVal,
          });
          setAnchorEl(null);
          setBtnClicked(false);
        })
        .catch((error: any) => {
          toast.error(error?.message);
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  };

  const handleImportExisting = () => {
    // const filterProjectByName = activeProjects?.filter(
    //   (filterProjectName: any) =>
    //     filterProjectName?.project_name === projectNameVal
    // );

    // const filteredProjectId = filterProjectByName[0]?.project_id;

    // if (filteredProjectId !== undefined) {
    //   dispatch(GetOperations(filteredProjectId))
    //     .unwrap()
    //     .then((collOperRes: any) => {
    //       setCollOperDetails(collOperRes);
    //     })
    //     .catch((error: any) => {
    //       console.log("Error: ", error);
    //     });
    // } else {
    //   toast.error("Select a project to import");
    // }
    if (urlClicked) {
      const urlLowercase = projectUrlVal.toLowerCase();

      if (projectUrlVal === "") {
        setErrorProjectUrl("Please give import url");
      } else if (projectUrlVal?.indexOf(" ") !== -1) {
        setErrorProjectUrl("Spaces are not allowed");
      } else if (
        !(
          urlLowercase?.startsWith("http://") ||
          urlLowercase?.startsWith("https://")
        )
      ) {
        setErrorProjectUrl("Invalid url");
      } else {
        let importFromUrlData = {
          url: projectUrlVal,
          type: "SWAGGER",
        };
        dispatch(ImportFromUrl(importFromUrlData))
          .unwrap()
          .then((urlRes: any) => {
            console.log(urlRes, "urlRes");
            console.log(urlRes?.unique_id, "unique_id");

            setUniqueId(urlRes?.unique_id);
            setCollOperDetails(urlRes?.result);
            setCollSelectedOperDetails(urlRes?.result);
            dispatch(updateTourStep(tourStep + 1));
          })
          .catch((error: any) => {
            toast?.error(error?.message);
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      }
    }

    if (fileClicked) {
      if (dataFileJsonCsv == null) {
        toast.error("Please select import json file");
      } else {
        const formData = new FormData();
        formData.append("jsonFile", dataFileJsonCsv);
        dispatch(ImportFromPostman(formData))
          .unwrap()
          .then((res: any) => {
            setCollOperDetails(res?.result);
            setUniqueId(res?.unique_id);
            setCollSelectedOperDetails(res?.result);
            setNotInsertedCollections(res?.notInsertedImportCollection);
            setNotInsertedOpertaions(res?.notInserted_operation_import);
            // setDataFileJsonCsv(null)
            dispatch(updateTourStep(tourStep + 1));
          })
          .catch((error: any) => {
            if (error?.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
      }
    }
  };

  const handleImportSaveBtn = () => {
    // const formData = new FormData();
    // formData.append('jsonFile', dataFileJsonCsv)
    // dispatch(ImportFromPostman(formData))
    //   .unwrap()
    //   .then((res: any) => {
    //
    //   })
    //   .catch((error: any) => {
    //     console.log("Error: ", error)
    //   })

    if (collSelectedOperDetails?.length === 0) {
      toast.error("Nothing to import");
    }

    if (!newClicked) {
      if (existingProjectImport === "") {
        setErrorProjectName("Please select one project");
      }
    }

    if (newClicked) {
      if (projectNameVal === "") {
        setErrorProjectName("Project Name is Required");
      }
    }

    if (collIdUnchecked?.length !== 0) {
      const filteredData = collOperDetails?.filter((filterVal: any) =>
        collIdUnchecked?.filter(
          (filterId: any) => filterId === filterVal?.import_id
        )
      );
    }

    if (operIdUnchecked.length !== 0) {
      const filterOper = collOperDetails?.filter((filterVal: any) =>
        // operIdUnchecked?.filter((filterId: any) => filterId === filterVal?.id)
        filterVal?.operations?.filter((filterOper: any) =>
          operIdUnchecked?.filter(
            (filterId: any) => filterId === filterOper?.id
          )
        )
      );
    }

    let saveData = {
      user_id: userProfile?.user?.user_id,
      project_id: newClicked ? "null" : existingProjectImport,
      // workspace_id: currentTeam?.workspace_id,
      stage_id: "null",
      unique_id: uniqueId,
      workspace_id: wsidVal,
      project_name: newClicked ? projectNameVal : "null",
      import_file: JSON.stringify(collSelectedOperDetails),
    };

    dispatch(UpdateApiScanResponse(saveData))
      .unwrap()
      .then((res: any) => {
        setCollOperDetails([]);
        setCollSelectedOperDetails([]);
        setDataFileJsonCsv(null);
        setImportPostmanClicked(false);
        toast.success("imported successfully");
        setNotInsertedCollections([]);
        setNotInsertedOpertaions([]);
        handleCloseNewExisting();
        // dispatch(updateTourStep());
        // if (!newClicked) {
        //   navigate(`/projectView/${existingProjectImport}`);
        // }
        // else {
        //   navigate(`/projectView/${res?.project_id}`);
        // }
        // navigate(`/projectView/${res?.project_id}`);
        navigate(
          `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/projectView/${res?.project_id}`
        );
      })
      .catch((error: any) => {
        if (error?.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });

    // setCollOperDetails(
    //   collOperDetails?.map((collVal: any)=>(
    //     collVal?.operations?.map((operVal: any)=>{
    //       operationListVal
    //       ?.filter((filterVal: any)=>filterVal === operVal?.id)
    //     })
    //   ))
    // )
  };

  const handleCreateApiFlowValidation = () => {
    const hasValidationError = createNewApiFlowValues?.name.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      createNewApiFlowValues?.name
    );

    const isOverLimit = createNewApiFlowValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
      // setErrorDescription("ApiFlow Description is required")
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
      dispatch(updateTourStep(tourStep + 1));
    }
  };

  const handleCreateApiFlow = () => {
    const hasValidationError = createNewApiFlowValues?.name.trim() === "";
    // ||
    // createNewApiFlowValues?.description.trim() === "";

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(
      createNewApiFlowValues?.name
    );

    const isOverLimit = createNewApiFlowValues?.name.length > 50;

    if (hasValidationError) {
      setErrorApiName("ApiFlow Name is required");
      // setErrorDescription("ApiFlow Description is required")
    } else if (hasSpecialChar) {
      setErrorApiName("Special Characters and spaces are not allowed");
    } else if (isOverLimit) {
      setErrorApiName("ApiFlow Name should not exceed 50 characters");
    } else {
      let createData = {
        // tenant_id: userProfile?.user?.tenant_id,
        workspace_id: wsidVal,
        projectid: projectIdValue,
        stageid: stageId,
        name: createNewApiFlowValues?.name,
        description: createNewApiFlowValues?.description,
        // user_id: userProfile?.user.user_id,
      };

      dispatch(CreateApiDesignFlow(createData))
        .unwrap()
        .then((createRes: any) => {
          // dispatch(GetApiDesignFlowByWorkspaceId(currentTeam?.workspace_id))
          dispatch(GetApiDesignFlowByWorkspaceId(wsidVal))
            .unwrap()
            .then((getApiFlowRes: any) => {
              const filterNameValue = getApiFlowRes?.filter(
                (filterVal: any) =>
                  filterVal?.name === createNewApiFlowValues?.name
              );
              // if (filterNameValue?.id !== undefined) {
              // navigate(`/design-api/${filterNameValue[0]?.id}`);
              navigate(
                `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/design-api/${filterNameValue[0]?.id}`
              );
              toast?.success("New Api Flow Created");
              // dispatch(updateTourStep(tourStep + 1));
              setCreateNewApiFlowValues({
                description: "",
                name: "",
                workspace_id: "",
              });
              setAnchorEl(null);
              setBtnClicked(false);
              // }
              // else {
              //   toast?.error("Error")
              // }
            })
            .catch((error: any) => {
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
    }
  };

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow: ReactFlowInstance = rfInstance.toObject();
      // localStorage.setItem(flowKey, JSON.stringify(flow));
      let apiFlowId = location.pathname.split("/")[2];
      let updateData = {
        data: flow,
        flow_id: apiFlowId,
      };
      dispatch(DesignApiFlow(updateData))
        .unwrap()
        .then((res: any) => {
          toast.success("saved Successfully");
        })
        .catch((error: any) => {
          if (error?.message === "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }, [rfInstance]);

  const handleApiStageValues = (apiStageId: any) => {
    // Cookies.set("STAGEID", apiStageId);
  };

  // useEffect(() => {
  //   // const filterStageValue = stagesResValues?.filter((findId: any) => findId?.stage_name === stagesVal);
  //   // console.log("StagesResponse: ", filterStageValue?.[0]?.apistage_id)
  //   // Cookies.set("STAGEID", filterStageValue?.[0]?.apistage_id);
  //   Cookies.set("STAGEID", filterStageValue?.[0]?.apistage_id);
  // }, [stagesVal])

  useEffect(() => {
    // if (location.pathname === "/api-manager") {
    if (
      location.pathname ===
      `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/api-manager`
    ) {
      onSearchingVal("");
    }
  }, [location.pathname]);

  useEffect(() => {
    // dispatch(GetAllStagesByProjectId(projectIdValue))
    //   .unwrap()
    //   .then((stagesRes: any) => {
    //     // const findingStageId = stagesRes?.filter((findId: any) => findId?.apistage_id === stageId);
    //     setStagesResValues(stagesRes);
    //     // setStagesResValues(findingStageId);
    //     // Cookies.set("STAGEID", findingStageId[0]?.apistage_id);
    //     setStagesVal(stagesRes[0]?.stage_name)
    //     // setStagesVal(findingStageId[0]?.stage_name)
    //   })
    //   .catch((error: any) => {
    //     console.log("Error: ", error)
    //   })
    if (location.pathname.includes("/projectView")) {
      dispatch(GetAllStagesByProjectId(projectIdValue))
        .unwrap()
        .then((stageRes: any) => {
          console.log("StageRes: ", stageRes);
          const findingStageId = stageRes?.filter(
            (findId: any) => findId?.apistage_id === stageId
          );
          console.log("StageRes: ", stageRes, findingStageId);
          setStagesResValues(stageRes);
          setStagesVal(findingStageId[0]?.apistage_id);
        })
        .catch((error: any) => {
          console.log("Error: ", error);
        });
    }
  }, [projectIdValue, location.pathname]);

  const [errorApigateway, setErrorApigateway] = useState<any>({
    Secreatkey: "",
    name: "",
    description: "",
    region: "",
    accessKey: "",
  });
  const [apiGateway, setApiGateway] = useState({
    Secreatkey: "",
    name: "mari",
    description: "This is api gateway",
    region: "ap-south-1",
    accessKey: "",
  });

  function apiGatewayErrorHandler() {
    if (
      apiGateway?.Secreatkey === "" ||
      apiGateway?.name === "" ||
      apiGateway?.description === "" ||
      apiGateway?.region === "" ||
      apiGateway?.accessKey === ""
    ) {
      setErrorApigateway({
        Secretkey:
          apiGateway?.Secreatkey === "" ? "Secret Key is required" : "",
        name: apiGateway?.name === "" ? "Name is required" : "",
        description:
          apiGateway?.description === "" ? "Description is required" : "",
        region: apiGateway?.region === "" ? "Region is required" : "",
        accessKey: apiGateway?.accessKey === "" ? "Access Key is required" : "",
      });
      return false; // Errors found, so return false
    } else {
      setErrorApigateway({
        Secretkey: "",
        name: "",
        description: "",
        region: "",
        accessKey: "",
      });
      return true; // No errors, so return true
    }
  }

  return (
    <section className="commonHeaders">
      {loading && <GLobalLoader />}
      <Backdrop
        className="api_selectAService"
        sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        open={btnClicked}
      />
      <div>
        {commonHeaderVal ===
          `${translate("apiManageHeader.CREATE_NEW_SERVICES")}` &&
        location.pathname.includes("/projectView") ? (
          <div>
            {anchorEl && (
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                sx={{
                  zIndex: 9999,
                  "& .MuiPaper-root": {
                    backgroundColor: theme.palette.signInUpWhite.main,
                    width: "450px",
                    height: "160px",
                    position: "absolute",
                    marginLeft: "10px",
                  },
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
                    handleClosePopover();
                  }}
                />
                <div style={{ padding: "20px" }}>
                  <PrimaryTypography
                    style={{
                      color: `${theme.palette.teritiaryColor.main}`,
                    }}
                  >
                    Select a service to continue further...
                  </PrimaryTypography>
                  <div style={{ marginTop: "15px" }}>
                    {servicesVal && servicesVal?.length > 0 ? (
                      <>
                        {
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {servicesVal?.map((val: any, index: any) => (
                              <div
                                key={index}
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => {
                                  handleServicesVal(val?.name);
                                  // navigate("/collectionSelected");
                                  // navigate(`${location.pathname}/collectionSelected`);
                                  navigate(
                                    // `/projectView/${projectId}/collectionSelected`
                                    // `/userId/${userProfile?.user?.user_id}/workspaceId/${currentTeam?.workspace_id}/projectView/${projectId}/collectionSelected`
                                    `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/projectView/${projectId}/collectionSelected`
                                  );
                                  dispatch(updateTourStep(tourStep + 1));
                                }}
                              >
                                {val?.icon}
                                <SecondaryTypography
                                  style={{
                                    color: `${theme.palette.primaryBlack.main}`,
                                  }}
                                >
                                  {val?.name}
                                </SecondaryTypography>
                              </div>
                            ))}
                          </div>
                        }
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Popover>
            )}
          </div>
        ) : location.pathname.includes("/design-api") ? (
          <div>
            <Backdrop
              sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              open={btnClicked}
            />
            <div>
              {anchorEl && (
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  sx={{
                    zIndex: 9999,
                    "& .MuiPaper-root": {
                      backgroundColor: theme.palette.signInUpWhite.main,
                      width: "580px",
                      height: "340px",
                      // position: "absolute",
                    },
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <PrimaryTypography
                      style={{
                        color: `${theme.palette.teritiaryColor.main}`,
                      }}
                    >
                      Create a new ApiFlow
                    </PrimaryTypography>
                    <div style={{ marginTop: "10px" }}>
                      <div className="api_designFlow_name">
                        <SecondaryTypography
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          ApiFlow Name
                        </SecondaryTypography>
                        <ApiTextField
                          // value={element.api_project_name}
                          value={createNewApiFlowValues?.name}
                          dataTest={"project-name-input"}
                          width="500px"
                          height="42px"
                          borderColor="#9CA3AF"
                          borderRadius="4px"
                          onChange={(e: any) => {
                            handleCreateNewApiFlow("name", e.target.value);
                          }}
                          onKeyUp={(event: any) => {
                            if (event?.key === "Enter") {
                              // dispatch(updateTourStep(tourStep + 1));
                              handleCreateApiFlowValidation();
                            }
                          }}
                          error={errorApiName}
                          errorHandler={(error: any) => setErrorApiName(error)}
                        />
                        <span
                          style={{
                            whiteSpace: "pre",
                          }}
                        >
                          {"  "}
                        </span>
                      </div>
                      <div className="api_designFlow_description">
                        <SecondaryTypography
                          style={{
                            fontWeight: "600",
                          }}
                        >
                          ApiFlow Description
                        </SecondaryTypography>
                        <FormControl>
                          <div style={{ marginTop: "10px" }}>
                            <TextOutlinedInput
                              // value={element.description}
                              value={createNewApiFlowValues?.description}
                              data-test={"project-description"}
                              style={{
                                width: "500px",
                                height: "50px",
                                borderColor: "#9CA3AF",
                                borderRadius: "4px",
                              }}
                              onChange={(e: any) => {
                                handleCreateNewApiFlow(
                                  "description",
                                  e.target.value
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
                      style={{ margin: "10px" }}
                      className="api_designFlow_buttons"
                    >
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        <div>
                          <GButton
                            buttonType="primary"
                            label={`${translate("apiManageHeader.CANCEL")}`}
                            color={`${theme.palette.primaryBlack.main}`}
                            background="transparent"
                            onClickHandler={handleClosePopover}
                          />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <GButton
                            buttonType="primary"
                            label={`Create ApiFlow`}
                            onClickHandler={handleCreateApiFlow}
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
        ) : (
          <div>
            <Backdrop
              sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              open={btnClicked}
            />
            {
              // createNewProjectValues.map((element: any, i: any) => (
              <div>
                {anchorEl && (
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    sx={{
                      zIndex: 9999,
                      "& .MuiPaper-root": {
                        backgroundColor: theme.palette.signInUpWhite.main,
                        width: "580px",
                        height: "342px",
                        // position: "absolute",
                      },
                    }}
                  >
                    <div>
                      <div style={{ padding: "20px" }}>
                        <div>
                          <PrimaryTypography
                            style={{
                              color: `${theme.palette.teritiaryColor.main}`,
                            }}
                          >
                            Create a new project
                          </PrimaryTypography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "10px",
                            }}
                          >
                            <div className="api_project_name">
                              <SecondaryTypography
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                {translate("apiManageHeader.API_PROJECTNAME")}
                              </SecondaryTypography>
                              <ApiTextField
                                value={createNewProjectValues?.api_project_name}
                                dataTest={"project-name-input"}
                                width="430px"
                                height="42px"
                                borderColor="#9CA3AF"
                                borderRadius="4px"
                                onChange={(e: any) => {
                                  handleCreateNewProject(
                                    "api_project_name",
                                    e.target.value
                                  );
                                  // handleCreateProjectValidation(e.target.value, "projectName");
                                }}
                                onKeyUp={(event: any) => {
                                  if (event?.key === "Enter") {
                                    // dispatch(updateTourStep(tourStep + 1));
                                    handleCreateProjectValidation(
                                      createNewProjectValues?.api_project_name,
                                      "projectName"
                                    );
                                  }
                                }}
                                error={errorApiName}
                                errorHandler={(error: any) =>
                                  setErrorApiName(error)
                                }
                              />
                              <span style={{ whiteSpace: "pre" }}>
                                {"    "}
                              </span>
                            </div>
                            <div>
                              <SecondaryTypography
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                {translate("apiManageHeader.VERSION")}
                              </SecondaryTypography>
                              {/* <ApiDropdowns
                                // color='#9CA3AF'
                                // borderColor='#9CA3AF'
                                valueDrop="versionTypeVals"
                                width='73px'
                                onVersionTypeVal={(val: any) => {
                                  handleCreateNewProject(i, 'version', val)
                                }}
                              /> */}
                              <div>
                                <Button
                                  variant="outlined"
                                  id="basic-button"
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  onClick={handleClick}
                                  sx={{
                                    fontSize: "0.8rem",
                                    width: "73px",
                                    height: "28px",
                                    color: theme.palette.primaryBlack.main,
                                    background: theme.palette.mainWhite.main,
                                    marginTop: "9px",
                                    border: `1px solid #9CA3AF`,
                                    borderRadius: "4px",
                                  }}
                                >
                                  1.0
                                  <ExpandMoreIcon
                                    style={{
                                      fontFamily: "Inter-Regular",
                                      width: "20px",
                                    }}
                                  />
                                </Button>
                                <Menu
                                  id="basic-menu"
                                  anchorEl={anchorElDrop}
                                  open={Boolean(anchorElDrop)}
                                  onClose={handleClose}
                                  MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                  }}
                                  sx={{
                                    zIndex: 9999,
                                  }}
                                >
                                  <MenuItem
                                    onClick={(e: any) => {
                                      handleMenuItem("1.0");
                                    }}
                                    sx={{ width: "73px" }}
                                  >
                                    1.0
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginTop: "-10px" }}>
                            <SecondaryTypography
                              style={{
                                fontWeight: "600",
                              }}
                            >
                              Location
                            </SecondaryTypography>
                            <ApiTextField
                              value={createNewProjectValues?.gateway_location}
                              dataTest={"project-name-input"}
                              // width="430px"
                              width="100%"
                              height="42px"
                              borderColor="#9CA3AF"
                              borderRadius="4px"
                              onChange={(e: any) => {
                                handleCreateNewProject(
                                  "gateway_location",
                                  e.target.value
                                );
                                // handleCreateProjectValidation(e.target.value, "projectName");
                              }}
                              onKeyUp={(event: any) => {
                                if (event?.key === "Enter") {
                                  // dispatch(updateTourStep(tourStep + 1));
                                  handleCreateProjectValidation(
                                    createNewProjectValues?.gateway_location,
                                    "gatewayLocation"
                                  );
                                }
                              }}
                              error={errorApiName}
                              errorHandler={(error: any) =>
                                setErrorApiName(error)
                              }
                            />
                          </div>
                          <div
                            style={{ marginTop: "10px" }}
                            className="api_project_description"
                          >
                            <SecondaryTypography
                              style={{
                                fontWeight: "600",
                              }}
                            >
                              {translate("apiManageHeader.DESCRIPTION")}
                            </SecondaryTypography>
                            <FormControl>
                              <div style={{ marginTop: "10px" }}>
                                <TextOutlinedInput
                                  // value={element.description}
                                  value={createNewProjectValues?.description}
                                  data-test={"project-description"}
                                  style={{
                                    width: "540px",
                                    height: "30px",
                                    borderColor: "#9CA3AF",
                                    borderRadius: "4px",
                                  }}
                                  onChange={(e: any) => {
                                    handleCreateNewProject(
                                      "description",
                                      e.target.value
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
                          style={{ marginTop: "10px" }}
                          className="api_project_create_cancel_btn"
                        >
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            <div>
                              <GButton
                                buttonType="primary"
                                label={`${translate("apiManageHeader.CANCEL")}`}
                                color={`${theme.palette.primaryBlack.main}`}
                                background="transparent"
                                onClickHandler={handleClosePopover}
                              />
                            </div>
                            <div>
                              <div style={{ marginLeft: "10px" }}>
                                <GButton
                                  buttonType="primary"
                                  label={`${translate(
                                    "apiManageHeader.CREATE"
                                  )}`}
                                  onClickHandler={handleCreateButton}
                                  dataTest="save-project-btn"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popover>
                )}
              </div>
              // ))
            }
          </div>
        )}
      </div>

      <div>
        {/* {location.pathname === "/" || */}
        {location.pathname ===
          `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}` ||
        location.pathname.includes("/projectView") ? (
          <Box
            sx={{
              width: "100%",
              height: "40px",
              padding: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: theme.palette.primaryWhite.main,
              // cursor: "pointer",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <HeaderTextTypography
                // className="api_createNewProject api_createNewServices"
                className={
                  location.pathname.includes("/projectView")
                    ? "api_createNewServices"
                    : "api_createNewProject"
                  // : "api_addManually"
                }
                sx={{ marginRight: "40px", cursor: "pointer" }}
                data-test={"create-new-project-btn"}
                onClick={(event: any) => {
                  // handleOpenPopover(event, "Create New Project");
                  const headerValue = location.pathname.includes("/projectView")
                    ? `${translate("apiManageHeader.CREATE_NEW_SERVICES")}`
                    : `${translate("apiManageHeader.CREATE_NEW_PROJECT")}`;
                  handleOpenPopover(event, headerValue);
                  handleNewProject(headerValue);
                  // dispatch(updateTourStep(tourStep + 1))
                  // onGettingIsOpenVal=true;
                }}
              >
                <PlusIcon style={{ width: "20px", height: "20px" }} />
                {location.pathname.includes("/projectView")
                  ? `${translate("apiManageHeader.CREATE_NEW_SERVICES")}`
                  : `${translate("apiManageHeader.CREATE_NEW_PROJECT")}`}
              </HeaderTextTypography>
              {!location.pathname.includes("/projectView") ? (
                <>
                  <HeaderTextTypography
                    className="api_importFromPostman"
                    sx={{ marginRight: "40px", cursor: "pointer" }}
                    onClick={(e: any) => {
                      handleClickPostman(e);
                      setImportPostmanClicked(!importPostmanClicked);
                      setImportVal("postman");
                      dispatch(updateTourStep(tourStep + 1));
                    }}
                  >
                    {/* <PostManIcon className="mx-2" /> */}
                    {/* <img */}
                    <Image
                      src={PostmanImage}
                      alt=""
                      className="mx-2"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {translate("apiManageHeader.IMPORT_FROM_POSTMAN")}
                  </HeaderTextTypography>
                  <HeaderTextTypography
                    className="api_importFromSwagger"
                    sx={{ marginRight: "40px", cursor: "pointer" }}
                    onClick={(e: any) => {
                      handleClickPostman(e);
                      setImportPostmanClicked(!importPostmanClicked);
                      setImportVal("swagger");
                      dispatch(updateTourStep(tourStep + 1));
                    }}
                  >
                    {/* <SwaggerIcon  className="mx-2"/> */}
                    {/* <img  */}
                    <Image
                      src={SwaggerImage}
                      alt=""
                      className="mx-2"
                      style={{ width: "20px", height: "20px" }}
                    />
                    {translate("apiManageHeader.IMPORT_FROM_SWAGGER")}
                  </HeaderTextTypography>

                  {/* import button for postman, swagger and azure */}
                  {/* <Box> */}
                  {/* <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      borderColor: `${theme.palette.LGrayishBlue.main}`,
                      fontFamily: "Inter-Regular",
                      marginTop: '-5px'
                    }}
                    onClick={() => {
                      setImportBtn(true);
                    }}
                  >
                    <HeaderTextTypography>
                      <span
                        style={
                          {
                            // color: `${theme.palette.primaryPurple.main}`
                          }
                        }
                      >
                        <FileDownloadOutlinedIcon />
                      </span>
                      Import
                    </HeaderTextTypography>
                  </Button> */}
                  {/* </Box> */}
                </>
              ) : (
                ""
              )}
            </Box>

            <div>
              {location?.pathname ===
              `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/projectView/${projectIdValue}` ? (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      {stagesResValues?.length === 0 ? (
                        ""
                      ) : (
                        <div style={{ marginTop: "2px" }}>
                          <GSelect
                            fullWidth={false}
                            size={"small"}
                            borderHeight="2.3rem"
                            radius="4px"
                            options={[
                              // {
                              //   label: "Stages",
                              //   value: "stages",
                              // },
                              // {
                              //   label: "Development",
                              //   value: "development",
                              // },
                              // {
                              //   label: "Production",
                              //   value: "production"
                              // },
                              ...stagesResValues?.map((stageRes: any) => ({
                                label: stageRes?.stage_name,
                                value: stageRes?.apistage_id,
                              })),
                            ]}
                            value={stagesVal}
                            // defaultValue={stagesVal}
                            onChange={(val: any) => {
                              setStagesVal(val);

                              // const filterStageValue = stagesResValues?.filter((findId: any) => findId?.stage_name === val);
                              // Cookies.set("STAGEID", filterStageValue?.[0]?.apistage_id);
                              handleApiStageValues(val);
                              setCookies(
                                process.env.NEXT_PUBLIC_COOKIE_STAGEID ?? "",
                                val,
                                userProfile?.user?.expiration_time
                              );
                              dispatch(setCurrentStage(val));
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <GButton
                        icon={<AutoAwesomeMosaicIcon />}
                        border="1px solid "
                        borderColor={`${theme.palette.secondaryColor.main}`}
                        background="transparent"
                        // background={`${theme.palette.LGrayishBlue.main}`}
                        label={
                          <PrimaryTypography
                            style={{
                              color: `${theme.palette.secondaryColor.main}`,
                              fontWeight: 700,
                            }}
                          >
                            Design
                          </PrimaryTypography>
                        }
                        // padding={"8px"}
                        margin="0px"
                        onClickHandler={() => {
                          navigate(
                            `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/design-api`
                          );
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <GButton
                        buttonType="primary"
                        // background='#2196f3'
                        label="Manage Stages"
                        radius="4px"
                        padding="5px 10px"
                        icon={<RecyclingIcon />}
                        iconPosition="start"
                        onClickHandler={(e: any) => {
                          setManageStagesClicked(true);
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Box>
                    <GsearchBar
                      placeholder={`${translate(
                        "apiManageHeader.GSEARCHBAR_PLACEHOLDER"
                      )}`}
                    />
                  </Box>
                </>
              )}
            </div>
          </Box>
        ) : (
          ""
        )}
      </div>

      <div>
        {manageStagesClicked === true && (
          <div style={{ zIndex: 9999 }}>
            <GDialogBox
              openVal={manageStagesClicked}
              size="small"
              // noCloseIcon={true}
              dialogTitleText={
                <HeaderTextTypography>Manage Stages</HeaderTextTypography>
              }
              dialogContentText={
                <>
                  <PrimaryTypography>
                    How do you want to manage your stage?
                  </PrimaryTypography>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    <div style={{ marginRight: "20px" }}>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        color="info"
                        style={{
                          textTransform: "none",
                          fontSize: "0.8rem",
                        }}
                        onClick={(e: any) => {
                          setManageStagesClicked(false);
                          setAddStageClicked(true);
                          setViewStageClicked(false);
                          handleClickAddStage(e);
                        }}
                      >
                        Add Stage
                      </Button>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                      <Button
                        variant="outlined"
                        startIcon={<PreviewIcon />}
                        color="info"
                        style={{
                          textTransform: "none",
                          fontSize: "0.8rem",
                        }}
                        onClick={(e: any) => {
                          setManageStagesClicked(false);
                          setAddStageClicked(false);
                          setViewStageClicked(true);
                          handleClickViewStage(e);
                        }}
                      >
                        View Stage
                      </Button>
                    </div>
                  </div>
                </>
              }
              confirmBtnColor={`${theme.palette.teritiaryColor.main}`}
              cancelVal={""}
              confirmVal={"Cancel"}
              onClickCancelHandler={() => {
                setManageStagesClicked(false);
                setAddStageClicked(false);
                setViewStageClicked(false);
              }}
              onClickConfirmHandler={() => {
                setManageStagesClicked(false);
                setAddStageClicked(false);
                setViewStageClicked(false);
              }}
            />
          </div>
        )}
      </div>

      <div>
        {addStageClicked === true && (
          <>
            <div>
              <Backdrop
                sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                open={addStageClicked}
              />
              <div>
                {anchorAddStage && (
                  <Popover
                    open={Boolean(anchorAddStage)}
                    anchorEl={anchorAddStage}
                    onClose={handleCloseAddStage}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    sx={{
                      zIndex: 9999,
                      "& .MuiPaper-root": {
                        backgroundColor: theme.palette.signInUpWhite.main,
                        width: "580px",
                        height: "320px",
                        // position: "absolute",
                        marginLeft: "300px",
                        marginTop: "70px",
                      },
                    }}
                  >
                    <div style={{ padding: "20px" }}>
                      <div>
                        <PrimaryTypography
                          style={{
                            color: `${theme.palette.teritiaryColor.main}`,
                          }}
                        >
                          Add a new stage
                        </PrimaryTypography>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <div>
                          <SecondaryTypography
                            style={{
                              fontWeight: "600",
                            }}
                          >
                            Stage Name
                          </SecondaryTypography>
                          <ApiTextField
                            value={addStageValues?.name}
                            dataTest={"project-name-input"}
                            width="500px"
                            height="42px"
                            borderColor="#9CA3AF"
                            borderRadius="4px"
                            onChange={(e: any) => {
                              handleAddStage("name", e.target.value);
                            }}
                            onKeyUp={(event: any) => {
                              if (event?.key === "Enter") {
                                // dispatch(updateTourStep(tourStep + 1));
                                handleAddStageValidation();
                              }
                            }}
                            error={errorApiName}
                            errorHandler={(error: any) =>
                              setErrorApiName(error)
                            }
                          />
                          <span
                            style={{
                              whiteSpace: "pre",
                            }}
                          >
                            {"  "}
                          </span>
                        </div>
                        <div>
                          <SecondaryTypography
                            style={{
                              fontWeight: "600",
                            }}
                          >
                            Stage Description
                          </SecondaryTypography>
                          <FormControl>
                            <div style={{ marginTop: "10px" }}>
                              <TextOutlinedInput
                                value={addStageValues?.description}
                                data-test={"project-description"}
                                style={{
                                  width: "500px",
                                  height: "30px",
                                  borderColor: "#9CA3AF",
                                  borderRadius: "4px",
                                }}
                                onChange={(e: any) => {
                                  handleAddStage("description", e.target.value);
                                }}
                                onKeyUp={(event: any) => {
                                  // if (event?.key === "Enter") {
                                  //   dispatch(updateTourStep(tourStep + 1));
                                  // }
                                }}
                              />
                            </div>
                          </FormControl>
                        </div>
                      </div>
                      <div style={{ margin: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <div>
                            <GButton
                              buttonType="primary"
                              label={`${translate("apiManageHeader.CANCEL")}`}
                              color={`${theme.palette.primaryBlack.main}`}
                              background="transparent"
                              onClickHandler={handleCloseAddStage}
                            />
                          </div>
                          <div style={{ marginLeft: "10px" }}>
                            <GButton
                              buttonType="primary"
                              label={`Add Stage`}
                              onClickHandler={handleAddStageFunction}
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
          </>
        )}
      </div>

      <div>
        {viewStageClicked === true && (
          <>
            <div>
              <Backdrop
                sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                open={viewStageClicked}
              />
            </div>
            <div>
              {anchorViewStage && (
                <Popover
                  open={Boolean(anchorViewStage)}
                  anchorEl={anchorViewStage}
                  onClose={handleCloseViewStage}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  sx={{
                    zIndex: 9999,
                    "& .MuiPaper-root": {
                      backgroundColor: theme.palette.signInUpWhite.main,
                      width: "500px",
                      height: "300px",
                      position: "absolute",
                      marginLeft: "300px",
                      marginTop: "70px",
                    },
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <HeaderTextTypography>
                          Stages Management Console
                        </HeaderTextTypography>
                      </div>
                      <div>
                        <CloseIcon
                          style={{
                            width: "13px",
                            height: "13px",
                            position: "absolute",
                            top: "18px",
                            right: "18px",
                            cursor: "pointer",
                            zIndex: "1",
                            color: `${theme.palette.primaryBlack.main}`,
                            marginBottom: "10px",
                          }}
                          onClick={() => {
                            handleCloseViewStage();
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <List
                        sx={{
                          width: "100%",
                          // maxWidth: 360,
                          bgcolor: "background.paper",
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                      >
                        {stagesResValues?.map((val: any, index: number) => (
                          <React.Fragment key={index}>
                            <ListItemButton
                              onClick={() => handleClickStageValues(index)}
                            >
                              <ListItemText
                                primary={
                                  <>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div>
                                        <PrimaryTypography
                                          style={{
                                            fontWeight: 900,
                                            color: `${theme.palette.primaryPurple.main}`,
                                          }}
                                        >
                                          {`${val?.stage_name}`}
                                        </PrimaryTypography>
                                      </div>
                                      <div>
                                        <DeleteIcon
                                          style={{
                                            width: "13px",
                                            height: "13px",
                                            marginRight: "20px",
                                            marginTop: "10px",
                                          }}
                                          stroke={`${theme.palette.mainRed.main}`}
                                          fill={`${theme.palette.mainRed.main}`}
                                        />
                                      </div>
                                    </div>
                                    <div style={{ marginLeft: "10px" }}>
                                      <SecondaryTypography>
                                        <span
                                          style={{
                                            fontWeight: 900,
                                          }}
                                        >
                                          {val?.created_by}
                                        </span>{" "}
                                        updated this on{" "}
                                        <span
                                          style={{
                                            fontWeight: 900,
                                          }}
                                        >
                                          {dateFormatDateOnly(val?.updated_at)}
                                        </span>
                                        .
                                      </SecondaryTypography>
                                    </div>
                                  </>
                                }
                              />
                              {openStages[index] ? (
                                <ExpandLess />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </ListItemButton>
                            <Collapse
                              in={openStages[index]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                  <ListItemText
                                    primary={
                                      <>
                                        <GInput
                                          variant={"standard"}
                                          color={`${theme.palette.primaryBlack.main}`}
                                          background={"transparent"}
                                          // fontWeight={900}
                                          fullWidth={true}
                                          value={val?.description}
                                          // helperText="You can update your description here."
                                          startIcon={
                                            <NotesIcon
                                              style={{
                                                fontSize: "15px",
                                              }}
                                            />
                                          }
                                          endIcon={
                                            <EditIcon
                                              style={{
                                                width: "13px",
                                                height: "13px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {}}
                                            />
                                          }
                                          onChangeHandler={(e: any) => {
                                            handleDescriptionChange(e, index);
                                          }}
                                          // error={errorApiName}
                                          // helperText={errorApiName}
                                          // errorHandler={(error: any) => setErrorApiName(error)}
                                        />
                                      </>
                                    }
                                  />
                                </ListItemButton>
                              </List>
                            </Collapse>
                          </React.Fragment>
                        ))}
                      </List>
                    </div>
                  </div>
                </Popover>
              )}
            </div>
          </>
        )}
      </div>

      {importBtn === true && (
        <div style={{ zIndex: 9999 }}>
          <GDialogBox
            openVal={importBtn}
            dialogTitleText={
              <HeaderTextTypography>Import</HeaderTextTypography>
            }
            dialogContentText={
              <>
                <PrimaryTypography>
                  What do you want to import?
                </PrimaryTypography>
                <div style={{ display: "flex", marginTop: "5px" }}>
                  <div>
                    <HeaderTextTypography
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e: any) => {
                        handleClickPostman(e);
                        setImportPostmanClicked(!importPostmanClicked);
                        setImportVal("postman");
                        setImportBtn(false);
                      }}
                    >
                      {/* <img */}
                      <Image
                        src={PostmanImage}
                        alt=""
                        className="mx-2"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {"Postman"}
                    </HeaderTextTypography>
                  </div>
                  <div>
                    <HeaderTextTypography
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e: any) => {
                        handleClickPostman(e);
                        setImportPostmanClicked(!importPostmanClicked);
                        setImportVal("swagger");
                        setImportBtn(false);
                      }}
                    >
                      {/* <SwaggerIcon  className="mx-2"/> */}
                      {/* <img */}
                      <Image
                        src={SwaggerImage}
                        alt=""
                        className="mx-2"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {"Swagger"}
                    </HeaderTextTypography>
                  </div>
                  <div>
                    <HeaderTextTypography
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e: any) => {
                        handleClickPostman(e);
                        setImportPostmanClicked(!importPostmanClicked);
                        setImportVal("azure");
                        setImportBtn(false);
                      }}
                    >
                      {/* <SwaggerIcon  className="mx-2"/> */}
                      {/* <img
                          src={SwaggerImage}
                          alt=""
                          className="mx-2"
                          style={{ width: "25px", height: "25px" }}
                        /> */}
                      <span>
                        <MotionPhotosAutoRoundedIcon
                          style={{
                            fontSize: "20px",
                            marginRight: "5px",
                            color: `${theme.palette.primaryBlue.main}`,
                          }}
                        />
                      </span>
                      {"Azure"}
                    </HeaderTextTypography>
                  </div>
                </div>
              </>
            }
            confirmBtnColor={`${theme.palette.teritiaryColor.main}`}
            cancelVal={""}
            confirmVal={"Cancel"}
            onClickCancelHandler={() => {
              setImportBtn(false);
            }}
            onClickConfirmHandler={() => {
              setImportBtn(false);
            }}
          />
        </div>
      )}

      <div>
        {importPostmanClicked === true ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Backdrop
              className="api_postmanSwagger_popUp"
              sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              open={importPostmanClicked}
            />
            {anchorElDropPostman && (
              <Popover
                open={openPostman}
                anchorEl={anchorElDropPostman}
                onClose={() => {
                  handleClosePostman();
                  setImportVal("");
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
                sx={{
                  zIndex: 9999,
                  "& .MuiPaper-root": {
                    backgroundColor: theme.palette.signInUpWhite.main,
                    width: "370px",
                    height: "160px",
                    position: "absolute",
                    // marginLeft: "200px",
                    // marginTop: "200px",
                  },
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
                    handleClosePostman();
                    setImportVal("");
                  }}
                />
                <HeadingTypography
                  style={{
                    margin: "15px",
                    fontSize: "0.8rem",
                  }}
                >
                  {`Import from ${
                    importVal === "swagger" ? "Swagger" : "Postman"
                  }`}
                </HeadingTypography>
                <PrimaryTypography
                  style={{
                    margin: "20px",
                  }}
                >
                  Do you want to import collections into
                  <br /> an existing project or a new project?
                </PrimaryTypography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    // marginTop: "-15px",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>
                    <GButton
                      buttonType="primary"
                      label={`Existing`}
                      onClickHandler={(e: any) => {
                        setExistingClicked(true);
                        setNewClicked(false);
                        handleClosePostman();
                        handleClickExisting(e);
                        setNewExistClicked(true);
                        handleClickNewExisting(e);
                        setProjectNameVal("");
                        setProjectUrlVal("");
                        setCollOperDetails([]);
                        setCollSelectedOperDetails([]);
                        dispatch(updateTourStep(tourStep + 1));
                        setNotInsertedCollections([]);
                        setNotInsertedOpertaions([]);
                      }}
                    />
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <GButton
                      buttonType="primary"
                      label={`New`}
                      onClickHandler={(e: any) => {
                        setNewClicked(true);
                        setExistingClicked(false);
                        handleClosePostman();
                        handleClickNew(e);
                        setNewExistClicked(true);
                        handleClickNewExisting(e);
                        setProjectNameVal("");
                        setProjectUrlVal("");
                        dispatch(updateTourStep(tourStep + 1));
                        setNotInsertedCollections([]);
                        setNotInsertedOpertaions([]);
                      }}
                    />
                  </div>
                </div>
              </Popover>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {newExistClicked ? (
          <div>
            <Backdrop
              className="api_existingNewClicked_popup"
              sx={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              open={newExistClicked}
            />

            <div>
              {anchorElVal && (
                <Popover
                  open={Boolean(anchorElVal)}
                  anchorEl={anchorElVal}
                  onClose={handleCloseNewExisting}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  sx={{
                    // zIndex: 9999,
                    "& .MuiPaper-root": {
                      backgroundColor: theme.palette.signInUpWhite.main,
                      minWidth: "650px",
                      height: "330px",
                      position: "absolute",
                      marginLeft: "300px",
                      marginTop: "100px",
                    },
                  }}
                >
                  <CloseIcon
                    style={{
                      width: "13px",
                      height: "13px",
                      position: "absolute",
                      top: "18px",
                      right: "18px",
                      cursor: "pointer",
                      zIndex: "1",
                      color: `${theme.palette.primaryBlack.main}`,
                      marginBottom: "10px",
                    }}
                    onClick={handleCloseNewExisting}
                  />
                  <div style={{ padding: "30px" }}>
                    <HeaderTextTypography>
                      {newClicked === true ? "New Project" : "Existing Project"}
                    </HeaderTextTypography>
                    <div style={{ marginTop: "10px" }}>
                      <PrimaryTypography
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        Project Name
                      </PrimaryTypography>
                      <div>
                        {newClicked === true ? (
                          <>
                            <ApiTextField
                              value={projectNameVal}
                              placeholder={"Enter project name"}
                              width="430px"
                              height="42px"
                              borderColor="#9CA3AF"
                              borderRadius="4px"
                              onChange={(e: any) => {
                                setProjectNameVal(e.target.value);
                              }}
                              error={errorProjectName}
                              errorHandler={(error: any) =>
                                setErrorProjectName(error)
                              }
                            />
                          </>
                        ) : (
                          <>
                            <GSelect
                              fullWidth={false}
                              size={"small"}
                              width={"200px"}
                              radius="4px"
                              options={[
                                ...activeProjects?.map((projects: any) => ({
                                  label:
                                    projects?.name?.length > 10
                                      ? `${projects?.name?.slice(0, 10)}...`
                                      : `${projects?.name}`,
                                  value: projects?.project_id,
                                })),
                              ]}
                              defaultValue={existingProjectImport}
                              value={existingProjectImport}
                              onChange={(val: any) => {
                                setExistingProjectImport(val);
                                setErrorProjectName("");
                                // setExistingImportClicked(false);
                              }}
                            />
                            {errorProjectName && (
                              <div style={{ color: "red" }}>
                                {errorProjectName}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <PrimaryTypography
                        style={{
                          fontWeight: "600",
                        }}
                      >
                        <span>
                          Select{" "}
                          {importVal === "swagger" && (
                            <>
                              <span
                                style={{
                                  textDecoration: "underline",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  setUrlClicked(!urlClicked);
                                  setFileClicked(false);
                                }}
                              >
                                Project Url
                              </span>{" "}
                              /
                            </>
                          )}
                          <span
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setFileClicked(!fileClicked);
                              setUrlClicked(false);
                            }}
                          >
                            Data file
                          </span>
                        </span>
                        {/* )} */}
                      </PrimaryTypography>
                      {/* {newClicked === true ? (
                        <>
                          <ApiTextField
                            value={projectUrlVal}
                            placeholder={"Enter project url"}
                            width="499px"
                            height="42px"
                            borderColor="#9CA3AF"
                            borderRadius="4px"
                            onChange={(e: any) => {
                              setProjectUrlVal(e.target.value);
                            }}
                            error={errorProjectUrl}
                            errorHandler={(error: any) =>
                              setErrorProjectUrl(error)
                            }
                          />
                        </>
                      ) : ( */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          {fileClicked === true ? (
                            <>
                              <div style={{ marginTop: "20px" }}>
                                {/* <PrimaryTypography
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "14px",
                                  }}
                                >
                                  Data File
                                </PrimaryTypography> */}
                                <div style={{ marginTop: "10px" }}>
                                  <input
                                    type="file"
                                    id={`file-upload-input`}
                                    // accept=".json, .csv"
                                    accept=".json"
                                    style={{ display: "none" }}
                                    onChange={(e: any) => {
                                      const file = e.target.files[0];
                                      setDataFileJsonCsv(file);
                                      dispatch(updateTourStep(tourStep + 1));
                                    }}
                                  />
                                  <label htmlFor={`file-upload-input`}>
                                    {dataFileJsonCsv ? (
                                      <SecondaryTypography
                                        style={{
                                          fontSize: "14px",
                                        }}
                                      >
                                        File selected: {dataFileJsonCsv?.name}
                                      </SecondaryTypography>
                                    ) : (
                                      <Button
                                        component="span"
                                        variant="outlined"
                                        style={{
                                          textTransform: "none",
                                          width: "300px",
                                          color: `${theme.palette.secondaryColor.main}`,
                                          backgroundColor: "transparent",
                                          border: `1.5px solid ${theme.palette.secondaryColor.main}`,
                                        }}
                                      >
                                        Select File
                                        {/* {dataFileJsonCsv ? `File selected: ${dataFileJsonCsv?.name}` : "Select file"} */}
                                      </Button>
                                    )}
                                  </label>
                                </div>
                              </div>
                            </>
                          ) : urlClicked === true ? (
                            <>
                              <>
                                <ApiTextField
                                  value={projectUrlVal}
                                  placeholder={"Enter project url"}
                                  width="499px"
                                  height="42px"
                                  borderColor="#9CA3AF"
                                  borderRadius="4px"
                                  onChange={(e: any) => {
                                    setProjectUrlVal(e.target.value);
                                    // dispatch(updateTourStep(tourStep + 1));
                                  }}
                                  onKeyUp={(event: any) => {
                                    if (event?.key === "Enter") {
                                      dispatch(updateTourStep(tourStep + 1));
                                    }
                                  }}
                                  error={errorProjectUrl}
                                  errorHandler={(error: any) =>
                                    setErrorProjectUrl(error)
                                  }
                                />
                                <span
                                  style={{
                                    fontSize: "10px",
                                    color: "blue",
                                    marginBottom: "-3px",
                                  }}
                                >
                                  * Enter project url and press Enter
                                </span>
                              </>
                            </>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="api_import_btn">
                          {fileClicked === true || urlClicked === true ? (
                            <div style={{ marginTop: "15px" }}>
                              <GButton
                                buttonType="secondary"
                                label={`Import File`}
                                onClickHandler={(e: any) => {
                                  handleImportExisting();
                                  // setExistingImportClicked(!existingImportClicked)
                                  // setExistingImportClicked(true);
                                }}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* )} */}
                    </div>

                    <div>
                      {existingClicked === true ? (
                        <>
                          <div style={{ marginLeft: "10px" }}>
                            <RadioCheckboxComponent
                              buttonWidth="15px"
                              checked={overwriteClicked}
                              label={
                                <SecondaryTypography>
                                  Need to overwrite?
                                </SecondaryTypography>
                              }
                              onChange={(val: any) => {
                                setOverwriteClicked(!overwriteClicked);
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      {collOperDetails?.length === 0 ? (
                        <>
                          <SecondaryTypography
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "20px",
                              fontWeight: 900,
                              color: `${theme.palette.teritiaryColor.main}`,
                            }}
                          >
                            No collection and operation found for this project
                          </SecondaryTypography>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              marginTop: "20px",
                              marginLeft: "-10px",
                            }}
                          >
                            <div>
                              <List
                                sx={{
                                  width: "100%",
                                  maxWidth: 360,
                                  bgcolor: "background.paper",
                                }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                  <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                  >
                                    <HeaderTextTypography>
                                      Collections and operations
                                    </HeaderTextTypography>
                                  </ListSubheader>
                                }
                              >
                                {collOperDetails?.map((collections: any) => (
                                  <React.Fragment key={collections?.import_id}>
                                    <ListItemButton
                                      onClick={() =>
                                        handleClickList(collections?.import_id)
                                      }
                                    >
                                      {/* <RadioCheckboxComponent
                                            buttonWidth="15px"
                                            defaultValue={true}
                                            onChange={() => {

                                            }}
                                          /> */}
                                      <Checkbox
                                        checked={collSelectedOperDetails?.find(
                                          (x) =>
                                            x?.import_id ===
                                            collections?.import_id
                                        )}
                                        size="small"
                                        onChange={(e: any) => {
                                          // let updatedVal = [
                                          //   ...collIdUnchecked,
                                          // ];
                                          // updatedVal.push(
                                          //   collections?.import_id
                                          // );
                                          // setCollIdUnchecked(updatedVal);

                                          if (
                                            collSelectedOperDetails?.find(
                                              (x) =>
                                                x?.import_id ===
                                                collections?.import_id
                                            )
                                          ) {
                                            const filteredOperDetails =
                                              collSelectedOperDetails?.filter(
                                                (x) =>
                                                  x?.import_id !==
                                                  collections?.import_id
                                              );
                                            setCollSelectedOperDetails(
                                              filteredOperDetails
                                            );
                                          } else {
                                            setCollSelectedOperDetails([
                                              ...collSelectedOperDetails,
                                              collections,
                                            ]);
                                          }
                                        }}
                                      />
                                      <ListItemText
                                        primary={`${collections?.collection_name}`}
                                      />
                                      {openItem === collections?.import_id ? (
                                        <ExpandLess
                                          style={{ marginRight: "-100px" }}
                                        />
                                      ) : (
                                        <ExpandMoreIcon
                                          style={{ marginRight: "-100px" }}
                                        />
                                      )}
                                    </ListItemButton>
                                    <Collapse
                                      in={openItem === collections?.import_id}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <List
                                        component="div"
                                        disablePadding
                                        style={{
                                          width: "800px",
                                          maxHeight: "100%",
                                          overflowY: "auto",
                                          overflowX: "hidden",
                                        }}
                                      >
                                        {collections?.operations.map(
                                          (operationVal: any) => (
                                            <>
                                              <ListItemButton
                                                key={operationVal?.id}
                                                sx={{ pl: 4 }}
                                              >
                                                {/* <RadioCheckboxComponent
                                                      buttonWidth="15px"
                                                      checked={true}
                                                      onChange={(e: any) => {
                                                        const isChecked = e.target.checked;
                                                        const operationId = operationVal?.id;

                                                        if (isChecked) {
                                                          // If checkbox is checked, add the operation ID to the array
                                                          // setOperationListVal((prevList) => [...prevList, operationId]);
                                                          setOperationListVal((prevList) => [...prevList, operationVal]);
                                                        } else {
                                                          // If checkbox is unchecked, remove the operation ID from the array
                                                          setOperationListVal((prevList) =>
                                                            // prevList.filter((id) => id !== operationId)
                                                            prevList.filter((id) => id !== operationVal)
                                                          );
                                                        }
                                                      }}
                                                    /> */}
                                                <Checkbox
                                                  checked={
                                                    collSelectedOperDetails
                                                      ?.find(
                                                        (col) =>
                                                          col?.import_id ===
                                                          collections?.import_id
                                                      )
                                                      ?.operations?.find(
                                                        (x: any) =>
                                                          x?.id ===
                                                          operationVal?.id
                                                      )?.id
                                                  }
                                                  size="small"
                                                  onChange={() => {
                                                    let currentData =
                                                      collections;
                                                    let currentOperations =
                                                      collSelectedOperDetails?.find(
                                                        (coll) =>
                                                          coll?.import_id ===
                                                          currentData?.import_id
                                                      )?.operations;

                                                    if (
                                                      currentOperations?.find(
                                                        (x: any) =>
                                                          x?.id ===
                                                          operationVal?.id
                                                      )
                                                    ) {
                                                      const filteredOperations =
                                                        currentOperations?.filter(
                                                          (x: any) =>
                                                            x?.id !==
                                                            operationVal?.id
                                                        );
                                                      setCollSelectedOperDetails(
                                                        (prevDetails) => [
                                                          ...prevDetails.filter(
                                                            (coll) =>
                                                              coll?.import_id !==
                                                              currentData?.import_id
                                                          ),
                                                          {
                                                            ...currentData,
                                                            operations:
                                                              filteredOperations,
                                                          },
                                                        ]
                                                      );
                                                    } else {
                                                      setCollSelectedOperDetails(
                                                        (prevDetails) => [
                                                          ...prevDetails.filter(
                                                            (coll) =>
                                                              coll?.import_id !==
                                                              currentData?.import_id
                                                          ),
                                                          {
                                                            ...currentData,
                                                            operations: [
                                                              ...(currentOperations ||
                                                                []),
                                                              operationVal,
                                                            ],
                                                          },
                                                        ]
                                                      );
                                                    }
                                                  }}
                                                />
                                                <ListItemText
                                                  primary={`${operationVal?.name}`}
                                                  sx={{}}
                                                />
                                              </ListItemButton>
                                            </>
                                          )
                                        )}
                                        {collections?.operations?.length ===
                                          0 && (
                                          <SecondaryTypography
                                            style={{
                                              marginLeft: "40px",
                                              color: `${theme.palette.teritiaryColor.main}`,
                                            }}
                                          >
                                            No operation found
                                          </SecondaryTypography>
                                        )}
                                      </List>
                                    </Collapse>
                                  </React.Fragment>
                                ))}
                              </List>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      {notInsertedCollections?.length !== 0 && (
                        <div>
                          <PrimaryTypography
                            style={{
                              fontWeight: 900,
                            }}
                          >
                            Failed Collections:
                          </PrimaryTypography>
                          {notInsertedCollections?.map(
                            (collectionVal: any, index: any) => (
                              <>
                                <SecondaryTypography key={index}>
                                  {collectionVal?.collection_name}
                                </SecondaryTypography>
                              </>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      {notInsertedOperations?.length !== 0 && (
                        <div>
                          <PrimaryTypography
                            style={{
                              fontWeight: 900,
                            }}
                          >
                            Failed Operations:
                          </PrimaryTypography>
                          {notInsertedOperations?.map(
                            (operationVal: any, index: any) => (
                              <>
                                <SecondaryTypography key={index}>
                                  {operationVal?.name}
                                </SecondaryTypography>
                              </>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      {existingClicked && (
                        <div
                          style={{ display: "flex", justifyContent: "end" }}
                          className="api_save_btn"
                        >
                          <div>
                            <GButton
                              buttonType="primary"
                              label={`Cancelss`}
                              background="transparent"
                              color={`${theme.palette.primaryBlack.main}`}
                              onClickHandler={(e: any) => {
                                handleCloseNewExisting();
                                setProjectNameVal("");
                                setProjectUrlVal("");
                                setErrorProjectName("");
                                setErrorProjectUrl("");
                                setDataFileJsonCsv(null);
                                setImportVal("");
                                setNotInsertedCollections([]);
                                setNotInsertedOpertaions([]);
                              }}
                            />
                          </div>
                          <div>
                            <GButton
                              buttonType="primary"
                              label={`Save`}
                              onClickHandler={(e: any) => {
                                handleImportSaveBtn();
                                setImportVal("");
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      {newClicked && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: "4.5rem",
                          }}
                          className="api_save_btn"
                        >
                          <div>
                            <GButton
                              buttonType="primary"
                              label={`Cancel`}
                              background="transparent"
                              color={`${theme.palette.primaryBlack.main}`}
                              onClickHandler={(e: any) => {
                                handleCloseNewExisting();
                                setProjectNameVal("");
                                setProjectUrlVal("");
                                setErrorProjectName("");
                                setErrorProjectUrl("");
                                setCollOperDetails([]);
                                setCollSelectedOperDetails([]);
                                setDataFileJsonCsv(null);
                                setImportVal("");
                                setNotInsertedCollections([]);
                                setNotInsertedOpertaions([]);
                              }}
                            />
                          </div>
                          <div>
                            <GButton
                              buttonType="primary"
                              label={`Imports`}
                              onClickHandler={(e: any) => {
                                handleImportSaveBtn();
                                setImportVal("");
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Popover>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* {
        existingClicked === true && newClicked === false ?
          <div>
            <Backdrop
              sx={{ zIndex: 9998, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              open={existingClicked}
            />

            <div>
              {
                anchorElExisting && (
                  <Popover
                    open={Boolean(anchorElExisting)}
                    anchorEl={anchorElExisting}
                    onClose={handleCloseExisting}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    sx={{
                      zIndex: 9999,
                      "& .MuiPaper-root": {
                        backgroundColor: theme.palette.signInUpWhite.main,
                        width: "739px",
                        height: "500px",
                        position: "absolute",
                        marginLeft: "200px",
                        marginTop: '60px'
                      },
                    }}
                  >
                    <CloseIcon
                      style={{
                        position: "absolute",
                        top: "18px",
                        right: "18px",
                        cursor: "pointer",
                        zIndex: "1",
                        color: `${theme.palette.primaryBlack.main}`,
                        marginBottom: "10px",
                      }}
                      onClick={handleCloseExisting}
                    />
                    <div style={{ padding: '30px' }}>
                      <HeadingTypography>
                        Existing Project
                      </HeadingTypography>
                      <div style={{ marginTop: '20px' }}>
                        <GSelect
                          fullWidth={false}
                          size={"small"}
                          radius="4px"
                          options={[
                            {
                              label: "Select project",
                              value: "all",
                              // disabled: true,
                            },
                            ...activeProjects.map((projects: any) => (
                              {
                                label: projects?.project_name?.length > 10
                                  ? `${projects?.project_name?.slice(0, 10)}...`
                                  : `${projects?.project_name}`,
                                value: projects?.project_name
                              }
                            ))
                          ]}
                          defaultValue={"all"}
                          onChange={(val: any) => {
                            setExistingProjectName(val)
                            if (val !== "all") {
                              const selectedProject = activeProjects
                                .find((project: any) => project.project_name === val);
                            }
                          }}
                        />
                      </div>
                      <div style={{ marginTop: '20px', }}>
                        <PrimaryTypography
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Project Name
                        </PrimaryTypography>
                        <ApiTextField
                          value={createNewProjectValues.api_project_name}
                          width="499px"
                          height="42px"
                          borderColor="#9CA3AF"
                          borderRadius="4px"
                          onChange={(e: any) => {
                            handleCreateNewProject(
                              "api_project_name",
                              e.target.value
                            );
                          }}
                          error={errorApiName}
                          errorHandler={(error: any) =>
                            setErrorApiName(error)
                          }
                        />
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <PrimaryTypography
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Project Url
                        </PrimaryTypography>
                        <ApiTextField
                          value={createNewProjectValues.api_project_name}
                          width="499px"
                          height="42px"
                          borderColor="#9CA3AF"
                          borderRadius="4px"
                          onChange={(e: any) => {
                            handleCreateNewProject(
                              "api_project_name",
                              e.target.value
                            );
                          }}
                          error={errorApiName}
                          errorHandler={(error: any) =>
                            setErrorApiName(error)
                          }
                        />
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <PrimaryTypography
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Data File
                        </PrimaryTypography>
                        <div style={{ marginTop: "10px" }}>
                          <input
                            type="file"
                            id={`file-upload-input`}
                            accept=".json, .csv"
                            style={{ display: "none" }}
                            onChange={(e: any) => {
                              const file = e.target.files[0];
                              setDataFileJsonCsv(file);
                            }}
                          />
                          <label htmlFor={`file-upload-input`}>
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
                            >
                              Select File
                            </Button>
                          </label>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <div>
                          <GButton
                            buttonType="primary"
                            label={`Cancel`}
                            background="transparent"
                            color={`${theme.palette.primaryBlack.main}`}
                            onClickHandler={(e: any) => {
                              handleCloseExisting()
                            }}
                          />
                        </div>
                        <div>
                          <GButton
                            buttonType="primary"
                            label={`Import`}
                            onClickHandler={(e: any) => {

                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Popover>
                )
              }
            </div>

          </div>
          : ""
      } */}

      <div>
        {location.pathname.includes("/api-manager") ||
        // location.pathname === "/design-api"
        location.pathname ===
          `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/design-api` ? (
          <Box
            sx={{
              width: "100%",
              height: "40px",
              padding: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: theme.palette.primaryWhite.main,
            }}
          >
            <Box className="d-flex">
              <HeaderTextTypography
                className={
                  location.pathname.includes("/design-api")
                    ? "api_create_designFlow"
                    : ""
                }
                sx={{
                  fontWeight: "700",
                  color: theme.palette.primaryBlack.main,
                  cursor: "pointer",
                }}
                onClick={(event: any) => {
                  // handleOpenPopover(event, "Create New Project");
                  handleOpenPopover(
                    event,
                    location.pathname.includes("/design-api")
                      ? "Create New Flow"
                      : "Create New Project"
                  );
                }}
              >
                <PlusIcon
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
                {location.pathname.includes("/design-api")
                  ? "Create New Flow"
                  : translate("apiManageHeader.CREATE_NEW_PROJECT")}
              </HeaderTextTypography>
              {/* {
                    location.pathname.includes("/design-api") ?
                      <></>
                      :
                      <HeaderTextTypography
                        sx={{
                          fontWeight: "700",
                          color: theme.palette.primaryBlack.main,
                          marginLeft: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <ImportIcon
                          style={{ width: "25px", height: "20px", cursor: "pointer" }}
                        />
                        {translate("apiManageHeader.IMPORT")}
                      </HeaderTextTypography>
                  } */}
            </Box>

            <Box>
              <div style={{ display: "flex" }}>
                <div>
                  <HeaderTextTypography
                    sx={{ marginRight: "5px", marginTop: "4px" }}
                  >
                    {/* <ImportIcon style={{ width: '25px', height: '20px' }} /> */}
                    {translate("apiManageHeader.SORT_BY")}
                  </HeaderTextTypography>
                </div>
                <div
                  onClick={() => {
                    setSortByClicked(!sortByClicked);
                    onSortbyClicked(!sortByClicked);
                  }}
                >
                  <SortAlp
                    style={{
                      cursor: "pointer",
                      width: "12px",
                      height: "12px",
                      marginRight: "5px",
                      // stroke: sortByClicked === true ? `${theme.palette.primaryBlack.main}` : ''
                    }}
                    stroke={
                      sortByClicked === true
                        ? `${theme.palette.primaryBlack.main}`
                        : ""
                    }
                  />
                </div>
                <div>
                  <SortNum
                    style={{
                      width: "12px",
                      height: "12px",
                      marginRight: "10px",
                      fill:
                        sortByClicked === true
                          ? `${theme.palette.secondaryColor.main}`
                          : `${theme.palette.secondaryColor.main}`,
                    }}
                  />
                </div>
                <GsearchBar
                  placeholder={`${translate(
                    "apiManageHeader.GSEARCHBAR_PLACEHOLDER"
                  )}`}
                  onChange={(e: any) => {
                    onSearchingVal(e.target.value);
                  }}
                />
              </div>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </div>

      {/* <div>
        {
          location.pathname === `/design-api/${designId}`
            && designId !== undefined
            ? (
              <Box
                sx={{
                  width: "100%",
                  height: "72px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: theme.palette.primaryWhite.main,
                }}
              >
                <Box className="d-flex">
                  <div style={{ marginLeft: '20px' }}>
                    <GButton
                      buttonType="primary"
                      label={"Save"}
                      icon={<SaveOutlinedIcon />}
                      iconPosition="start"
                      onClickHandler={onSave}
                    />
                    <GButton
                      buttonType="primary"
                      label={"Run"}
                      icon={<PlayArrowOutlinedIcon />}
                      iconPosition="start"
                      margin="0px 5px"
                      onClickHandler={onRun}
                    />
                  </div>
                </Box>
              </Box>
            )
            : ""
        }
      </div> */}

      <div>
        {/* {location.pathname === "/api-manage-reports" ? ( */}
        {location.pathname ===
        `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/api-manage-reports` ? (
          <div>
            <Box
              sx={{
                width: "100%",
                height: "50px",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: theme.palette.primaryWhite.main,
              }}
            >
              <Box className="d-flex" sx={{ marginLeft: "15px" }}>
                <AnalyticsIcon
                  style={{
                    width: "15px",
                    height: "15px",
                    stroke: `${theme.palette.primaryBlack.main}`,
                    marginTop: "4px",
                  }}
                />
                <HeaderTextTypography
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primaryBlack.main,
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  {/* Analytics & Reports */}
                  Logs
                </HeaderTextTypography>
              </Box>
            </Box>
          </div>
        ) : (
          ""
        )}
      </div>

      <div>
        {location.pathname.includes("/change-history") ? (
          <div>
            <Box
              sx={{
                width: "100%",
                height: "50px",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: theme.palette.primaryWhite.main,
              }}
            >
              <Box className="d-flex" sx={{ marginLeft: "20px" }}>
                <ChangeHistoryIcon
                  style={{
                    width: "15px",
                    height: "15px",
                    stroke: `${theme.palette.primaryBlack.main}`,
                    marginTop: "3px",
                  }}
                />
                <HeaderTextTypography
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primaryBlack.main,
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  {/* Analytics & Reports */}
                  Change History
                </HeaderTextTypography>
              </Box>
            </Box>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <div>
        {
          location.pathname.includes('/collectionSelected') ?
            <Box
              sx={{
                width: "100%",
                height: "72px",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: theme.palette.primaryWhite.main,
                cursor: 'pointer'
              }}
            >
              <Box className="d-flex" >
                {
                  servicesVal.map((val: any) => (
                    val.name === serviceVal ?
                      <div style={{ display: 'flex', background: `${theme.palette.btnGrey.main}`, padding: '5px' }}>
                        {
                          val.name === 'HTTP - JSON' ? <JsonIcon style={{ width: '20px', height: '20px' }} /> :
                            val.name === 'HTTP - SOAP' ? <SoapIcon style={{ width: '20px', height: '20px' }} /> :
                              val.name === 'GraphQL' ? <SoapIcon style={{ width: '20px', height: '20px' }} /> :
                                val.name === 'gRPC' ? <SoapIcon style={{ width: '20px', height: '20px' }} /> :
                                  val.name === 'WEB SOCKET' ? <SoapIcon style={{ width: '20px', height: '20px' }} />
                                    : ''
                        }
                        <HeaderTextTypography style={{ marginLeft:'10px'}}>{val.name}</HeaderTextTypography>
                        <ExpandMoreIcon style={{ fontSize: '12px', fontWeight: 500, fontFamily: 'Inter-Regular', margin: '3px' }} />
                      </div>
                      : ''
                  ))
                }
              </Box>
            </Box>
            : ''
        }
      </div> */}

      {/* {imports && (
        <Box
          sx={{
            width: "100%",
            height: "72px",
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: theme.palette.primaryWhite.main,
          }}
        >
          <Box className="d-flex">
            <GButton
              buttonType="primary"
              fontSize="0.7rem"
              label={`Import From ApiGatway`}
              // onClickHandler={(e: any) => {
              //   handleImportSaveBtn();
              //   setImportVal("");
              // }}
              onClickHandler={() => navigate(`/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/imports`)}
            />


            <GButton
              color="black"
              background={imports ? "#e2e3e5" : "black"}
              fontSize="0.7rem"
              label={`Import from Logstash`}
              marginLeft="2rem"
              onClickHandler={() => navigate(`/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/imports/logslash`)}
            />

          </Box>

       
        </Box>
      )} */}
      {/* label="Sensible Metrics"
        icon={<SecurityIcon style={{ fontSize: '18px' }} />} */}
      {imports && (
        <Box
          sx={{
            width: "100%",
            height: "50px",
            padding: "5px",
            display: "flex",
            // justifyContent: "between",
            alignItems: "center",
            background: theme.palette.primaryWhite.main,
          }}
        >
          <Box>
            <span
              style={{
                fontSize: "20px",
              }}
            >
              <IntegrationInstructions />
            </span>
            <HeaderTextTypography className="d-inline">
              Intgrations
            </HeaderTextTypography>
          </Box>
        </Box>
      )}

      {logslash && (
        <Box
          sx={{
            width: "100%",
            height: "72px",
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: theme.palette.primaryWhite.main,
          }}
        >
          <Box className="d-flex">
            <GButton
              buttonType="primary"
              fontSize="0.7rem"
              label={`Import From ApiGatway`}
              background={logslash ? "#e2e3e5" : "black"}
              color="black"
              onClickHandler={() =>
                navigate(
                  `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/imports`
                )
              }
            />

            <GButton
              buttonType="primary"
              fontSize="0.7rem"
              label={`Import from Logstash`}
              marginLeft="2rem"
              onClickHandler={() =>
                navigate(
                  `/userId/${userProfile?.user?.user_id}/workspaceId/${wsidVal}/imports/logslash`
                )
              }
            />
          </Box>
        </Box>
      )}
    </section>
  );
}
