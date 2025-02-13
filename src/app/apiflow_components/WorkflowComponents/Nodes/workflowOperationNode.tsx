import {
  changeValueToString,
  convertToMilliSeconds,
  getCookies,
  updateArray,
} from "@/app/Helpers/helpersFunctions";
import { replacePlaceholders } from "@/app/DesignHelpers/flowHelpers";
import {
  FlowReducer,
  GetNodeChangeManByFlowNodeId,
  RunSingleNode,
  setGlobalResponse,
} from "@/app/Redux/apiManagement/flowReducer";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { borderColor, borderRadius, fontWeight, styled } from "@mui/system";
import { usePathname } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Connection, Handle, Position, useReactFlow } from "reactflow";
import * as Y from "yjs";
import { v4 as uuidv4 } from "uuid";
// import CustomHandle from "@/app/ApiFlowComponents/ApiDesigner/customHandle";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import {
  DeleteIcon,
  TotalProjects,
  TotalNewProjectIcon,
  CloseIcon,
} from "@/app/Assests/icons";
import { Close, PriorityHighRounded } from "@mui/icons-material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RenderNoDataFound } from "@/app/apiflow_components/WorkflowComponents/RenderNoDataFound";
import GButton from "@/app/apiflow_components/global/GButton";
import { ChangeNodeManage } from "../changeManagement/changeManagement";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import GSelect from "@/app/apiflow_components/global/GSelect";
import TextEditor from "@/app/apiflow_components/WorkflowComponents/TextEditor/textEditor";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WorkflowCustomHandle from "../workflowCustomHandle";
import theme from "@/Theme/theme";
import { debounce, method } from "lodash";
import AceEditorComponent from "@/app/apiflow_components/WorkflowComponents/AceEditor/aceEditor";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import { checkConnections } from "@/app/hooks/workflow/helperFunctions";
import useNodes from "@/app/hooks/workflow/useNodes";
import useTextEditor from "@/app/hooks/useTextEditor";
import useNodeErr from "@/app/hooks/workflow/useNodeErr";
import { BiCopy } from "react-icons/bi";
import { BiCut } from "react-icons/bi";
import useReusableFunctions from "@/app/hooks/workflow/useReusableFunctions";

type YDoc = Y.Doc;

const dataTypes = [
  { id: "STRING", label: "String" },
  { id: "BOOLEAN", label: "Boolean" },
  { id: "INTEGER", label: "Integer" },
  { id: "FLOAT", label: "Float" },
];

export const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular;
  color: black;
  font-weight: 600;
  font-size: 0.8rem;
  wordwrap: break-word;
`;

export const SecondaryTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
`;

export const TextTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: ${theme.palette.DarkBlack.main};
  font-size: 10px;
  font-weight: 500;
`;

export const TertiaryTypogrpahy = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffff;
  font-size: 12px;
`;

export default function WorkflowOperationNode({ data }: any) {
  //--------------------variable declarations-----------------------------------------
  const { deleteElements, getEdges, getNode, getNodes } = useReactFlow();

  const theme = useTheme();
  const pathname = usePathname();
  const dispatch = useDispatch<any>();
  const nodeData = useMemo(() => parseData(data) || {}, [data]);
  const popoverRef = useRef<any>(null);
  const initialFlowId = pathname.split("/")[6];
  const flowIdVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_FLOWID ?? "");

  //--------------------state declarations----------------------------------------------
  const {
    nextNode,
    flowYdoc,
    globalKeys,
    globalResponse,
    isEditable,
    currentFlowDetails,
  } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const {
    addFlowId,
    removeFlowId,
    selectedFlowIds,
    nodeErrors,
    copyClicked,
    setCopyClicked,
    setCutClicked,
    setNestedInputData,
    inputdatas,
    copiedData,
    multiSelectClicked,
    resetWorkFlowState,
  } = useWorkflowStore();
  const { handleCopyNodes } = useReusableFunctions();
  const { isValidConnection, onClick, showErr } = useNodes({
    nodeData,
  });
  //-----------------------------useState-------------------------------------------------------
  const [headers, setHeaders] = useState<any>(
    nodeData?.operations_header ? [...nodeData?.operations_header] : []
  );
  const [inputs, setInputs] = useState<any>(
    nodeData?.operations_input ? [...nodeData.operations_input] : []
  );
  const [inputsPayload, setInputsPayload] = useState<any>(
    nodeData?.raw_payload ?? ""
  );
  const [auths, setAuths] = useState<any>(
    nodeData?.operations_auth ? [...nodeData.operations_auth] : []
  );
  const [querys, setQuerys] = useState<any>(
    nodeData?.operations_query_param ? [...nodeData.operations_query_param] : []
  );

  const [operationDetails, setOperationDetails] = useState<any>(false);
  const [backgroundUrlData, setBackgroundUrlData] = useState<any>([]);
  const [sizeAccClicked, setSizeAccClicked] = useState(false);
  const [timeAccClicked, setTimeAccClicked] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElError, setAnchorElError] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElInput, setAnchorElInput] = useState<HTMLButtonElement | null>(
    null
  );
  const [anchorElResponse, setAnchorElResponse] =
    useState<HTMLButtonElement | null>(null);

  const [currentResultRun, setCurrentResultRun] = useState<any>({});
  const [inputClicked, setInputClicked] = useState(false);
  const [headerClicked, setHeaderClicked] = useState(false);
  const [queryClicked, setQueryClicked] = useState(false);
  const [globalKeysClicked, setGlobalKeysClicked] = useState(false);
  const [responseClicked, setResponseClicked] = useState(false);
  const [currentNodeRun, setCurrentNodeRun] = useState(false);
  const [warning, setWarning] = useState<any>("");
  const [Querywarning, setQueryWarning] = useState<any>("");
  const [Globalwarning, setGlobalWarning] = useState<any>("");
  const [operationDeleteEditStatus, setOperationDeleteEditStatus] =
    useState("");

  const [changeManClicked, setChangeManClicked] = useState(false);
  const [changeManResponse, setChangeManResponse] = useState<any>({});
  const [isCopied, setIsCopied] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openError = Boolean(anchorElError);
  const errId = openError ? "error-popover" + nodeData?.id : undefined;

  //-------------------------------------functions--------------------------------------------------------
  function parseData(data: any) {
    // Check if data is an object
    if (typeof data === "object") {
      return data; // Return as is
    } else {
      try {
        // Try to parse the data
        return JSON.parse(data);
      } catch (error) {
        // If parsing fails, return null or handle the error accordingly

        return null;
      }
    }
  }

  const handleInputDataFromAceEditor = useCallback(
    debounce((val: any) => {
      if (val !== inputsPayload) {
        setInputsPayload(val); // Only update if the value has changed
      }

      const nodesMap = flowYdoc?.getMap<any>("nodes");
      const currentData = getNode(nodeData?.id);

      if (nodesMap) {
        nodesMap.set(nodeData?.id, {
          action: "EDIT_NODE",
          status: "null",
          id: nodeData?.id,
          nodes: {
            ...currentData,
            data: JSON.stringify({
              ...nodeData,
              raw_payload: val,
            }),
          },
        });
      }
      // Trigger necessary canvas or Yjs updates here, but with debounce
    }, 300), // Debounce for 300ms
    [inputsPayload, flowYdoc, nodeData?.id]
  );
  const handleClick = (event: any) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClickInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorElInput(event.currentTarget);
    setInputClicked(true);
    setHeaderClicked(false);
    setResponseClicked(false);
    setQueryClicked(false);
  };

  const handleClickHeader = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorElInput(event.currentTarget);
    setHeaderClicked(true);
    setInputClicked(false);
    setResponseClicked(false);
    setQueryClicked(false);
  };

  const handleClickQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorElInput(event.currentTarget);
    setQueryClicked(true);
    setHeaderClicked(false);
    setInputClicked(false);
    setResponseClicked(false);

    setGlobalKeysClicked(false);
  };

  const handleClickResponse = (event: any) => {
    event.stopPropagation();
    setAnchorElResponse(event.currentTarget);
    setResponseClicked(true);
    setInputClicked(false);
    setHeaderClicked(false);

    setQueryClicked(false);
    setGlobalKeysClicked(false);
  };

  const handleGlobalKeys = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorElInput(event.currentTarget);
    setResponseClicked(false);
    setInputClicked(false);
    setHeaderClicked(false);

    setQueryClicked(false);
    setGlobalKeysClicked(true);
  };

  const handleOpenError = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElError(event.currentTarget);
  };

  const handleCloseError = () => {
    setAnchorElError(null);
  };

  const checkSensitiveInformation = (text: any) => {
    const sensitiveKeywords: any = [
      "password",
      "secret",
      "token",
      "key",
      "api_key",
      "email",
      "mail",
      "ssn",
      "social security",
      "driver’s license",
      "passport",
      "bank account",
      "credit card",
      "debit card",
      "taxpayer",
      "employment",
      "username",
      "address",
      "biometric",
    ];

    const regexPatterns = {
      emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      apiKeyPattern: /\b[A-Za-z0-9]{32}\b/,
      genericKeyPattern: /\b[A-Za-z0-9]{16}\b/,
      ssnPattern: /\b\d{3}-\d{2}-\d{4}\b/,
      passportPattern: /\b[A-Za-z0-9]{9}\b/,
      driversLicensePattern: /\b[A-Za-z0-9]{7,9}\b/,
      creditCardPattern: /\b(?:\d[ -]*?){13,16}\b/,
      phonePattern: /\b\d{3}-\d{3}-\d{4}\b/,
      dobPattern: /\b\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}\b/,
    };

    // Ensure text is a string before performing operations
    if (typeof text !== "string") {
      return ""; // Return an empty string or handle it according to your logic
    }

    // Check against sensitive keywords
    for (const keyword of sensitiveKeywords) {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        return `Sensitive Information Detected: ${keyword}`;
      }
    }

    // Check against regular expressions
    if (regexPatterns.emailPattern.test(text)) {
      return "Sensitive Information Detected: Email Address";
    }
    if (regexPatterns.apiKeyPattern.test(text)) {
      return "Sensitive Information Detected: API Key";
    }
    if (regexPatterns.genericKeyPattern.test(text)) {
      return "Sensitive Information Detected: Generic Key (16 Characters)";
    }
    if (regexPatterns.ssnPattern.test(text)) {
      return "Sensitive Information Detected: Social Security Number (SSN)";
    }
    if (regexPatterns.passportPattern.test(text)) {
      return "Sensitive Information Detected: Passport Number";
    }
    if (regexPatterns.driversLicensePattern.test(text)) {
      return "Sensitive Information Detected: Driver's License Number";
    }
    if (regexPatterns.creditCardPattern.test(text)) {
      return "Sensitive Information Detected: Credit/Debit Card Number";
    }
    if (regexPatterns.phonePattern.test(text)) {
      return "Sensitive Information Detected: Phone Number";
    }
    if (regexPatterns.dobPattern.test(text)) {
      return "Sensitive Information Detected: Date of Birth";
    }

    return ""; // No sensitive information found
  };

  const checkQuerySensitiveInformation = (text: string) => {
    const sensitiveKeywords = [
      "password",
      "secret",
      "token",
      "key",
      "api_key",
      "email",
      "mail",
      "ssn",
      "social security",
      "driver’s license",
      "passport",
      "bank account",
      "credit card",
      "debit card",
      "taxpayer",
      "employment",
      "username",
      "address",
      "biometric",
    ];

    const regexPatterns = {
      emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      apiKeyPattern: /\b[A-Za-z0-9]{32}\b/,
      genericKeyPattern: /\b[A-Za-z0-9]{16}\b/,
      ssnPattern: /\b\d{3}-\d{2}-\d{4}\b/,
      passportPattern: /\b[A-Za-z0-9]{9}\b/,
      driversLicensePattern: /\b[A-Za-z0-9]{7,9}\b/,
      creditCardPattern: /\b(?:\d[ -]*?){13,16}\b/,
      phonePattern: /\b\d{3}-\d{3}-\d{4}\b/,
      dobPattern: /\b\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}\b/,
    };

    if (typeof text !== "string") {
      return ""; // Return an empty string or handle it according to your logic
    }

    for (const keyword of sensitiveKeywords) {
      if (text.toLowerCase().includes(keyword)) {
        return `Sensitive Information Detected: ${keyword}`;
      }
    }

    if (regexPatterns.emailPattern.test(text)) {
      return "Sensitive Information Detected: Email Address";
    }
    if (regexPatterns.apiKeyPattern.test(text)) {
      return "Sensitive Information Detected: API Key";
    }
    if (regexPatterns.genericKeyPattern.test(text)) {
      return "Sensitive Information Detected: Generic Key (16 Characters)";
    }
    if (regexPatterns.ssnPattern.test(text)) {
      return "Sensitive Information Detected: Social Security Number (SSN)";
    }
    if (regexPatterns.passportPattern.test(text)) {
      return "Sensitive Information Detected: Passport Number";
    }
    if (regexPatterns.driversLicensePattern.test(text)) {
      return "Sensitive Information Detected: Driver's License Number";
    }
    if (regexPatterns.creditCardPattern.test(text)) {
      return "Sensitive Information Detected: Credit/Debit Card Number";
    }
    if (regexPatterns.phonePattern.test(text)) {
      return "Sensitive Information Detected: Phone Number";
    }
    if (regexPatterns.dobPattern.test(text)) {
      return "Sensitive Information Detected: Date of Birth";
    }

    return "";
  };

  const checkGlobalSensitiveInformation = (text: string) => {
    const sensitiveKeywords = [
      "password",
      "secret",
      "token",
      "key",
      "api_key",
      "email",
      "mail",
      "ssn",
      "social security",
      "driver’s license",
      "passport",
      "bank account",
      "credit card",
      "debit card",
      "taxpayer",
      "employment",
      "username",
      "address",
      "biometric",
    ];

    const regexPatterns = {
      emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      apiKeyPattern: /\b[A-Za-z0-9]{32}\b/,
      genericKeyPattern: /\b[A-Za-z0-9]{16}\b/,
      ssnPattern: /\b\d{3}-\d{2}-\d{4}\b/,
      passportPattern: /\b[A-Za-z0-9]{9}\b/,
      driversLicensePattern: /\b[A-Za-z0-9]{7,9}\b/,
      creditCardPattern: /\b(?:\d[ -]*?){13,16}\b/,
      phonePattern: /\b\d{3}-\d{3}-\d{4}\b/,
      dobPattern: /\b\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2}\b/,
    };

    if (typeof text !== "string") {
      return ""; // Return an empty string or handle it according to your logic
    }

    for (const keyword of sensitiveKeywords) {
      if (text.toLowerCase().includes(keyword)) {
        return `Sensitive Information Detected: ${keyword}`;
      }
    }

    if (regexPatterns.emailPattern.test(text)) {
      return "Sensitive Information Detected: Email Address";
    }
    if (regexPatterns.apiKeyPattern.test(text)) {
      return "Sensitive Information Detected: API Key";
    }
    if (regexPatterns.genericKeyPattern.test(text)) {
      return "Sensitive Information Detected: Generic Key (16 Characters)";
    }
    if (regexPatterns.ssnPattern.test(text)) {
      return "Sensitive Information Detected: Social Security Number (SSN)";
    }
    if (regexPatterns.passportPattern.test(text)) {
      return "Sensitive Information Detected: Passport Number";
    }
    if (regexPatterns.driversLicensePattern.test(text)) {
      return "Sensitive Information Detected: Driver's License Number";
    }
    if (regexPatterns.creditCardPattern.test(text)) {
      return "Sensitive Information Detected: Credit/Debit Card Number";
    }
    if (regexPatterns.phonePattern.test(text)) {
      return "Sensitive Information Detected: Phone Number";
    }
    if (regexPatterns.dobPattern.test(text)) {
      return "Sensitive Information Detected: Date of Birth";
    }

    return "";
  };

  const onChangeHandler = (
    name: string,
    value: string,
    details: any,
    index: number,
    type: string
  ) => {
    // Create a cloned object for immutability and update the field
    const tempEventInputs = { ...details, [name]: value };

    if (type === "headers") {
      // Update headers state
      setHeaders((prevState: any) => {
        const newHeaders = [...prevState];
        newHeaders[index] = tempEventInputs; // Replace the specific header
        return newHeaders;
      });

      // Check for sensitive information
      const warningMessage = value ? checkSensitiveInformation(value) : "";
      setWarning((prevWarnings: any) => {
        const newWarnings = [...prevWarnings];
        newWarnings[index] = warningMessage; // Update warning message
        return newWarnings;
      });
    } else if (type === "input") {
      setInputs((prevState: any[]) => {
        const newInputs = [...prevState];
        newInputs[index] = tempEventInputs; // Replace the specific input
        return newInputs;
      });
    } else if (type === "auths") {
      setAuths((prevState: any) => {
        prevState[index] = tempEventInputs;
        return [...prevState];
      });
    } else if (type === "query") {
      // Update query state
      setQuerys((prevState: any) => {
        const newQueries = [...prevState];
        newQueries[index] = tempEventInputs; // Replace the specific query
        return newQueries;
      });

      // Check for sensitive information
      const warningMessage = value ? checkQuerySensitiveInformation(value) : "";
      setQueryWarning((prevWarnings: any) => {
        const newWarnings = [...prevWarnings];
        newWarnings[index] = warningMessage; // Update warning message
        return newWarnings;
      });
    }
  };

  const onClickHeaderHandler = () => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    let currentData: any = getNode(nodeData?.id);

    if (nodesMap) {
      nodesMap.set(nodeData?.id, {
        action: "EDIT_NODE",
        status: "null",
        id: nodeData?.id,
        nodes: {
          ...currentData,

          data: JSON.stringify({
            ...nodeData,
            operations_header: headers,
          }),
        },
      });
    } else {
    }
  };

  const onClickQueryHandler = () => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    let currentData: any = getNode(nodeData?.id);

    if (nodesMap) {
      nodesMap.set(nodeData?.id, {
        action: "EDIT_NODE",
        status: "null",
        id: nodeData?.id,
        nodes: {
          ...currentData,

          data: JSON.stringify({
            ...nodeData,
            operations_query_param: querys,
          }),
        },
      });
    } else {
    }
  };

  const onKeyHandler = (name: string, value: any, id: string) => {
    if (!flowYdoc) {
      return;
    }

    const warningMessage = value ? checkGlobalSensitiveInformation(value) : "";
    setGlobalWarning((prevWarnings: any) => {
      const newWarnings = [...prevWarnings];
      newWarnings[index] = warningMessage; // Update warning message
      return newWarnings;
    });
    // Update the globalKeys state
    const newGlobalKeys = globalKeys?.map((item: any) =>
      item?.id === id ? { ...item, [name]: value } : item
    );

    // Update the Yjs document
    const keysArray = flowYdoc.getArray("globalkeys");
    const itemsArray = keysArray.toArray();

    const index = itemsArray.findIndex((item: any) => item?.id === id);

    if (index === -1) {
      return;
    }

    // Remove the old item
    keysArray.delete(index, 1);

    // Insert the updated item
    const updatedItem = newGlobalKeys.find((item: any) => item?.id === id);
    if (updatedItem) {
      keysArray.insert(index, [updatedItem]);
    } else {
    }
  };

  const updateNodeData = (updatedData: any, type: any) => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");
    let currentData: any = getNode(nodeData?.id);

    // Prepare the new node data based on the type
    let newNodeData = { ...nodeData };

    switch (type) {
      case "header":
        newNodeData.operations_header = updatedData;
        break;
      case "input":
        newNodeData.operations_input = updatedData;
        break;
      case "auth":
        newNodeData.operations_auth = updatedData;
        break;
      case "query":
        newNodeData.operations_query_param = updatedData;
        break;
      default:
        return;
    }

    if (nodesMap) {
      nodesMap.set(nodeData?.id, {
        action: "EDIT_NODE",
        status: "null",
        id: nodeData?.id,
        nodes: {
          ...currentData,
          data: JSON.stringify(newNodeData),
        },
      });
    } else {
    }
  };

  const handleCloseInput = (event: any) => {
    event.stopPropagation();
    setAnchorElInput(null);
  };

  const handleCloseResponse = (event: any) => {
    event.stopPropagation();
    setAnchorElResponse(null);
  };

  const formatWithLineNumbers = (text: string) => {
    return (text ?? "")
      .split("\n")
      .map((line: string, index: number) => `${index + 1}. ${line}`)
      .join("\n");
  };

  const calculateTotalSize = () => {
    if (currentResultRun?.size) {
      const {
        request_HeaderSize,
        request_BodySize,
        response_BodySize,
        response_HeaderSize,
      } = currentResultRun.size;
      return (
        request_HeaderSize +
        request_BodySize +
        response_BodySize +
        response_HeaderSize
      );
    }
    return 0; // Return 0 if currentResultRun?.size is falsy
  };

  function calculateTotalTime() {
    const dnsTime = convertToMilliSeconds(
      currentResultRun?.lookups?.dnsLookupTime
    );
    const downloadTimeMs = convertToMilliSeconds(
      currentResultRun?.lookups?.downloadTime
    );
    const responceTime = convertToMilliSeconds(
      currentResultRun?.lookups?.responseTime
    );
    const handShakeTime = convertToMilliSeconds(
      currentResultRun?.lookups?.sslHandshakeTime
    );
    const totalTime = convertToMilliSeconds(
      currentResultRun?.lookups?.totalTime
    );
    const transferStartTime = convertToMilliSeconds(
      currentResultRun?.lookups?.transferStartTime
    );

    return (
      dnsTime +
      downloadTimeMs +
      responceTime +
      handShakeTime +
      totalTime +
      transferStartTime
    );
  }

  const RunHandler = () => {
    let payload;
    try {
      payload = JSON.parse(changeValueToString(nodeData?.raw_payload) || "{}");
      // payload = nodeData?.raw_payload;
    } catch (error: any) {
      toast.error(
        `${nodeData?.node_name || "Unknown Node"}:Input Error parsing JSON: ${
          error.message
        }`
      );
    }

    let response = globalResponse || null;

    const new_payload = replacePlaceholders(payload, { response }, globalKeys);

    let headersArr = nodeData.operations_header || [];
    let globalHeaders = globalKeys?.filter(
      (x: any) => x.include === true && x.node_id !== nodeData.id
    );

    let globalBody = globalKeys?.filter(
      (x: any) => x.body_include === true && x.node_id !== nodeData.id
    );

    if (globalHeaders.length > 0) {
      for (let key of globalHeaders) {
        headersArr = [
          ...headersArr,
          {
            name: key?.header_key,
            test_value: key.prefix_value + "" + key?.value,
            default_value: "",
          },
        ];
      }
    }

    if (globalBody.length > 0) {
      for (let key of globalBody) {
        new_payload[key.body_key] = key.body_key; // or key.body_key = value if there is a corresponding value
      }
    }

    let updatedData = {
      operation_id: nodeData.operation_id,
      flow_id: initialFlowId,
      node_id: nodeData.id,
      project_id: currentFlowDetails?.project_id,
      data: {
        operation_inputs: [],
        operation_headers: updateArray(headers, response, globalKeys),
        operation_authorization: [],
        operation_query_params: updateArray(
          nodeData?.operations_query_param,
          response,
          globalKeys
        ),
        payload: new_payload ? JSON.stringify(new_payload) : "",
      },
    };

    setCurrentNodeRun(true);
    dispatch(RunSingleNode(updatedData))
      .unwrap()

      .then((res: any) => {
        setCurrentNodeRun(false);
        const responseResult = {
          serviceInput: res?.serviceInput,
          response: res?.response,
          statusCode: res?.statusCode,
        };

        const nodesMap = flowYdoc?.getMap<any>("nodes");
        let currentData: any = getNode(nodeData?.id);

        if (nodesMap) {
          nodesMap.set(nodeData?.id, {
            action: "EDIT_NODE",
            status: "null",
            id: nodeData?.id,
            nodes: {
              response: responseResult,
              ...currentData,
              data: JSON.stringify({
                ...nodeData,
              }),
            },
          });
        } else {
        }

        dispatch(
          setGlobalResponse({
            ...globalResponse,
            [nodeData?.node_name]: res.response.apiResponse,
          })
        );

        setCurrentResultRun(res);
      })
      .catch((err: any) => {
        setCurrentNodeRun(false);
      });
  };

  //------------------------------------useEffect---------------------------------------------------------
  useEffect(() => {
    const nodesMap = flowYdoc?.getMap<any>("nodes");

    let currentData: any = getNode(nodeData?.id);

    if (nodesMap) {
      nodesMap.set(nodeData?.id, {
        action: "EDIT_NODE",
        status: "null",
        id: nodeData?.id,
        nodes: {
          ...currentData,

          data: JSON.stringify({
            ...nodeData,
            operations_header: headers,
            operations_input: inputs,
            operations_auth: auths,
            operations_query_param: querys,
          }),
        },
      });
    } else {
    }
  }, [headers, inputs, auths, querys]);

  useEffect(() => {
    if (!flowYdoc) return;
    const runMap = flowYdoc?.getMap<any>("run");

    const runFlow = () => {
      let runData = runMap?.toJSON();

      if (runData.run.status === "RUNNING") {
        let updateRun = runData?.run?.run_result.find(
          (x: any) => x?.node_id == nodeData?.id
        );
        setCurrentResultRun(updateRun);
      }
    };

    runMap.observe(runFlow);

    return () => {
      runMap.unobserve(runFlow);
    };
  }, []);

  useEffect(() => {
    const user_id = userProfile.user.user_id;
    const handleClickOutside = (event: any) => {
      if (popoverRef?.current && !popoverRef?.current?.contains(event.target)) {
        let nodesArray = getNodes();
        let edgesArray = getEdges();
        for (const node of nodesArray) {
          if (node.data) {
            const nodeDataV2 = JSON.parse(node.data);

            // Validate headers
            const headers = nodeDataV2?.operations_header || [];
            for (const header of headers) {
              const error = checkConnections(
                node.id,
                header.test_value,
                nodeDataV2.node_name,
                edgesArray,
                nodesArray,
                flowYdoc,
                initialFlowId,
                user_id
              );
            }

            const queryParams = nodeDataV2?.operations_query_param || [];
            for (const input of queryParams) {
              const error = checkConnections(
                node.id,
                input.test_value,
                nodeData.node_name,
                edgesArray,
                nodesArray,
                flowYdoc,
                initialFlowId,
                user_id
              );
            }

            // Validate raw_payload
            if (nodeDataV2.raw_payload) {
              try {
                // Try parsing the JSON
                const error = checkConnections(
                  node.id,
                  nodeDataV2.raw_payload,
                  nodeDataV2.node_name,
                  edgesArray,
                  nodesArray,
                  flowYdoc,
                  initialFlowId,
                  user_id
                );
              } catch (error: any) {}
            }
          }
        }
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHeaders(
      nodeData?.operations_header ? [...nodeData.operations_header] : []
    );
    setInputs(nodeData?.operations_input ? [...nodeData.operations_input] : []);
    setInputsPayload(nodeData?.raw_payload ?? "");
    setAuths(nodeData?.operations_auth ? [...nodeData.operations_auth] : []);
    setQuerys(
      nodeData?.operations_query_param
        ? [...nodeData.operations_query_param]
        : []
    );
  }, [nodeData]);

  const nodeSelected = isEditable && selectedFlowIds?.includes(nodeData?.id);
  const selectedNodeData = getNode(nodeData?.id);

  const handleClickNode = (id: any, event: React.MouseEvent) => {
    if (multiSelectClicked) return;

    if (isEditable) {
      if (event.ctrlKey || event.metaKey) {
        if (selectedFlowIds?.includes(id)) {
          removeFlowId(id);
        } else {
          addFlowId(id);
        }
      } else {
        if (selectedFlowIds?.includes(id)) {
          removeFlowId(id);
        } else {
          resetWorkFlowState("selectedFlowIds");
          addFlowId(id);
        }
      }
    }
  };

  const handleKeyDown = (event: any) => {
    if (event?.key === "Escape" && isEditable) {
      // removeFlowId(nodeData?.id);
      resetWorkFlowState("selectedFlowIds");
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the box

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditable, multiSelectClicked]);

  useEffect(() => {
    setIsCopied(copyClicked[nodeData?.id]);
  }, [copyClicked]);

  return (
    <Box sx={{ position: "relative" }}>
      {isEditable &&
        selectedFlowIds?.length === 1 &&
        selectedFlowIds?.includes(nodeData?.id) &&
        !multiSelectClicked && (
          <Stack
            direction={"row"}
            sx={{ position: "absolute", top: -22, left: 5 }}
          >
            <BiCopy
              className="exclude-click-outside"
              style={{
                marginRight: "10px",
                cursor: "pointer",
                color: isCopied ? "green" : "auto",
              }}
              onClick={() => {
                setCopyClicked(nodeData?.id, true);
                handleCopyNodes(false);
              }}
            />
            <BiCut
              className="exclude-click-outside"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                setCutClicked(nodeData?.id, true);
                handleCopyNodes(true);
              }}
            />
          </Stack>
        )}
      {showErr &&
        nodeErrors[nodeData?.id] &&
        nodeErrors[nodeData?.id]?.length > 0 && (
          <IconButton
            aria-owns={errId}
            aria-haspopup="true"
            sx={{
              position: "absolute",
              top: -6,
              right: -6,
              zIndex: 1,
              background: "orange",
              height: "18px",
              width: "18px",
              "&:hover": {
                background: "orange",
              },
            }}
            onClick={handleOpenError}
          >
            <PriorityHighRounded sx={{ color: "white", fontSize: "16px" }} />
          </IconButton>
        )}
      <Popover
        id={"error-popover" + nodeData?.id}
        open={openError}
        anchorEl={anchorElError || null}
        onClose={handleCloseError}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            padding: "10px",
          },
        }}
      >
        <ul style={{ marginBottom: 0 }}>
          {nodeErrors[nodeData?.id]?.map((error: any) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </Popover>
      <Box
        id="selectable-box"
        sx={{
          width: "230px",
          height: "120px",
          background: "rgba(243, 243, 243, 0.15)",
          boxShadow: "inset 0px 4.73px 11.82px rgba(255, 255, 255, 0.17)",
          backdropFilter: "blur(7.09px)",
          borderRadius: "15px",
          animation:
            nextNode?.includes(nodeData?.id) ||
            currentNodeRun ||
            selectedFlowIds.includes(nodeData?.id)
              ? // nodeSelected ||
                // selectedNodeData?.selected
                "blinkShadow 3s infinite"
              : "",
          border:
            currentResultRun?.status == "SUCCESS"
              ? "2px solid #48C9B0"
              : currentResultRun?.status == "FAILED"
              ? "2px solid #FF5252"
              : // nodeSelected ||
              // selectedNodeData?.selected ||
              selectedFlowIds.includes(nodeData?.id)
              ? // ? "2px solid rgba(122, 67, 254, 0.35)"
                "2px solid white"
              : "2px solid transparent",
          transition: "border-color 0.3s ease-in-out",
        }}
        onClick={(event: any) => {
          handleClickNode(nodeData?.id, event);
        }}
      >
        {nodeData?.dragger &&
          userProfile?.user?.email !== nodeData?.dragger && (
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "25px",
                backgroundColor: "white",
                padding: "3px",
                borderRadius: "5px",
                fontSize: "8px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {nodeData?.dragger}
            </div>
          )}

        {changeManClicked === true && (
          <ChangeNodeManage
            node_id={nodeData?.id}
            changeManClicked={changeManClicked}
            setChangeManClicked={setChangeManClicked}
            node_name={nodeData?.node_name}
            changeManResponse={changeManResponse}
            project_id={currentFlowDetails?.project_id}
            flow_id={initialFlowId}
          />
        )}

        <WorkflowCustomHandle
          type="target"
          position={Position.Left}
          id={nodeData?.id + "_input"}
          style={{
            height: "7px",
            width: "6px",
            background: "#55CCFF",
            borderRadius: "inherit",
            borderColor: "#D2D2D2",
            boxShadow: "0 0 12px 2px rgb(85, 204, 255)",
          }}
          isValidConnection={isValidConnection}
        />
        <Box
          sx={{
            background: "rgba(243, 243, 243, 0.25)",
            backdropFilter: "blur(7.09px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "40%",
            padding: "10px",

            borderRadius: "15px 15px 0px 0px",
          }}
        >
          <div style={{ display: "flex" }}>
            <TotalNewProjectIcon />
            <SecondaryTypography
              style={{
                color:
                  nodeData?.method === "GET"
                    ? "#3DD775"
                    : nodeData?.method === "POST"
                    ? "#FDA556"
                    : nodeData?.method === "PUT"
                    ? `${theme.palette.primaryBlue.main}`
                    : nodeData?.method === "DELETE"
                    ? `${theme.palette.mainRed.main}`
                    : "",
                marginLeft: "3px",
                fontSize: "12px",
              }}
            >
              {nodeData?.method}
            </SecondaryTypography>
            <SecondaryTypography
              title={nodeData?.node_name}
              style={{
                marginLeft: "5px",
                maxWidth:
                  nodeData?.method && isEditable
                    ? "87px"
                    : isEditable && !nodeData?.method
                    ? "90px"
                    : nodeData?.method && !isEditable
                    ? "87px"
                    : "100px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: "12px",
              }}
            >
              {nodeData?.node_name}
            </SecondaryTypography>
          </div>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              sx={{
                "&.MuiButton-root:hover path": {
                  fill: "red",
                },
                backgroundColor: "unset !important",
                marginLeft: "auto",
                minWidth: "auto",
              }}
            >
              {isEditable && (
                <DeleteIcon
                  className="position-absolute"
                  style={{
                    width: "15px",
                    height: "15px",
                    fill: theme.palette.mainRed.main,
                    cursor: "pointer",
                    transition: "fill 0.1s ease",
                  }}
                  onClick={onClick}
                />
              )}
            </Button>

            <IconButton
              sx={{
                height: "18px",
                width: "18px",
              }}
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                let data = {
                  flow_id: initialFlowId,
                  node_id: nodeData?.id,
                  project_id: currentFlowDetails?.project_id,
                };

                dispatch(GetNodeChangeManByFlowNodeId(data))
                  .unwrap()
                  .then((changeRes: any) => {
                    setChangeManResponse(changeRes);
                    setChangeManClicked(!changeManClicked);
                  })
                  .catch((error: any) => {
                    toast.error("no data found");
                  });
              }}
            >
              <ChangeCircleOutlinedIcon
                style={{
                  color: `${theme.palette.v2PrimaryColor.main}`,
                  fontSize: "18px",
                }}
              />
            </IconButton>

            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                RunHandler();
              }}
              sx={{
                color: `#FFFFFF`,
                backgroundColor: "#7E59DC",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#6c49c2",
                },
                height: "18px",
                width: "18px",
              }}
              size="small"
            >
              <PlayArrowIcon
                style={{
                  fontSize: "18px",
                }}
              />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            overflowWrap: "anywhere",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 10px",
            }}
            onClick={handleClick}
          >
            <TertiaryTypogrpahy>Input</TertiaryTypogrpahy>
            <KeyboardArrowRightIcon
              style={{ fontSize: "16px", color: "#FFFFFF", cursor: "pointer" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 10px",
            }}
            onClick={handleClickResponse}
          >
            <TertiaryTypogrpahy>Response</TertiaryTypogrpahy>
            <KeyboardArrowRightIcon
              style={{ fontSize: "16px", color: "#FFFFFF", cursor: "pointer" }}
            />
          </div>
          <Popover
            id={id}
            open={isEditable && open}
            anchorEl={anchorEl}
            ref={popoverRef}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div>
              <Box
                sx={{
                  minWidth: 100,
                  minHeight: 50,
                  padding: "10px",
                }}
              >
                <TextTypography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "9px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={handleClickInput}
                >
                  Input
                  <span>
                    <ChevronRightOutlinedIcon
                      style={{
                        fontSize: "15px",
                      }}
                    />
                  </span>
                </TextTypography>
                {/* <hr /> */}
                <TextTypography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "9px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={handleClickHeader}
                >
                  Header
                  <span>
                    <ChevronRightOutlinedIcon
                      style={{
                        fontSize: "15px",
                      }}
                    />
                  </span>
                </TextTypography>
                <TextTypography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "9px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={handleClickQuery}
                >
                  Query Params
                  <span>
                    <ChevronRightOutlinedIcon
                      style={{
                        fontSize: "15px",
                      }}
                    />
                  </span>
                </TextTypography>
                <TextTypography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "9px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                  onClick={handleGlobalKeys}
                >
                  Global keys
                  <span>
                    <ChevronRightOutlinedIcon
                      style={{
                        fontSize: "15px",
                      }}
                    />
                  </span>
                </TextTypography>
                {/* <hr /> */}
              </Box>
              <Popover
                id="mouse-over-popover"
                open={Boolean(anchorElInput)}
                anchorEl={anchorElInput}
                onClose={handleCloseInput}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx:
                    inputClicked === true
                      ? {
                          overflow: "hidden",

                          background: "transparent",
                          boxShadow: "none",
                        }
                      : {
                          padding: "15px",
                          overflowY: "auto",
                          maxHeight: "200px",
                          width: "350px",
                        },
                }}
                disableRestoreFocus
              >
                {inputClicked === true ? (
                  <div
                    style={{
                      position: "relative",
                      height: "55vh",
                      width: "40vw",
                    }}
                  >
                    {/*Ace Editor*/}
                    <AceEditorComponent
                      onInputVal={handleInputDataFromAceEditor}
                      defaultInputVal={inputsPayload}
                      currentNode={nodeData.node_name}
                      nodeId={nodeData.id}
                    />
                  </div>
                ) : headerClicked === true ? (
                  <>
                    <>
                      <PrimaryTypography
                        style={{
                          fontWeight: 900,
                        }}
                      >
                        Operation Headers
                      </PrimaryTypography>

                      <>
                        {headers?.length === 0 && (
                          <>
                            <RenderNoDataFound />
                          </>
                        )}
                        <GButton
                          buttonType="primary"
                          label="Add"
                          onClickHandler={() => {
                            setHeaders([
                              ...headers,
                              {
                                name: "",
                                test_value: "",
                                data_type: "STRING",
                              },
                            ]);

                            onClickHeaderHandler();
                          }}
                        />

                        {headers?.map((val: any, index: number) => (
                          <div key={index}>
                            <div style={{ marginTop: "1rem" }}>
                              {warning[index] && val && (
                                <label
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    backgroundColor: "#E50001",
                                    color: "white",
                                    fontWeight: "bold",
                                    padding: "8px 12px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <span style={{ fontSize: "10px" }}>
                                    {warning[index]}
                                  </span>
                                </label>
                              )}
                            </div>

                            <TextTypography>
                              {`Name: `}
                              <input
                                value={val?.name}
                                className="form-control my-1"
                                name="name"
                                onChange={(e) => {
                                  onChangeHandler(
                                    "name",
                                    e.target.value,
                                    val,
                                    index,
                                    "headers"
                                  );
                                }}
                              />
                            </TextTypography>

                            <TextTypography style={{ margin: "1rem 0rem" }}>
                              Data Type:
                              <GSelect
                                fullWidth={true}
                                borderHeight="40px"
                                size={"small"}
                                radius="0px"
                                options={dataTypes?.map((data: any) => ({
                                  label: data?.label,
                                  value: data.id,
                                }))}
                                defaultValue={"1"}
                                onChange={(value: any, e: any) => {
                                  onChangeHandler(
                                    "data_type",
                                    e.target.value,
                                    val,
                                    index,
                                    "headers"
                                  );
                                }}
                                value={val.data_type}
                              />
                            </TextTypography>

                            <TextTypography>
                              {`Value: `}
                              <TextEditor
                                index={index}
                                keyName="header"
                                nodeId={nodeData.id}
                                inputData={val?.test_value}
                                currentNode={nodeData?.node_name}
                                onChange={(value: any) => {
                                  onChangeHandler(
                                    "test_value",
                                    value,
                                    val,
                                    index,
                                    "headers"
                                  );
                                }}
                                multiline
                              />
                            </TextTypography>

                            <GButton
                              buttonType="secondary"
                              label={"Remove"}
                              onClickHandler={() => {
                                const updatedHeaders = headers.filter(
                                  (_: any, i: number) => i !== index
                                );
                                const inputs = updatedHeaders.map(
                                  (header: any) => ({
                                    input: header.test_value,
                                    isErr: false,
                                  })
                                );
                                setNestedInputData(
                                  nodeData?.id,
                                  "header",
                                  inputs
                                );

                                updateNodeData(updatedHeaders, "header");
                                setHeaders(updatedHeaders);
                              }}
                            />
                          </div>
                        ))}
                      </>
                    </>
                  </>
                ) : queryClicked === true ? (
                  <>
                    <>
                      <PrimaryTypography
                        style={{
                          fontWeight: 900,
                        }}
                      >
                        Operation query Parameters
                      </PrimaryTypography>

                      <>
                        {querys?.length === 0 && (
                          <>
                            <RenderNoDataFound />
                          </>
                        )}
                        <GButton
                          buttonType="primary"
                          label="Add"
                          onClickHandler={() => {
                            setQuerys([
                              ...querys,
                              {
                                name: "",
                                test_value: "",
                                data_type: "string",
                              },
                            ]);
                            onClickQueryHandler();
                          }}
                        />
                        {querys?.map((val: any, index: number) => (
                          <div key={index}>
                            <div style={{ marginTop: "1rem" }}>
                              {Querywarning[index] && val?.name && (
                                <label
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    backgroundColor: "#E50001",
                                    color: "white",
                                    fontWeight: "bold",
                                    padding: "8px 12px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                  }}
                                >
                                  <span style={{ fontSize: "10px" }}>
                                    {Querywarning[index]}
                                  </span>
                                </label>
                              )}
                            </div>

                            <TextTypography>
                              {`Name (${val.scope || "query"}): `}
                              <input
                                value={val?.name}
                                disabled={val?.scope === "path"}
                                className="form-control my-1"
                                name="name"
                                onChange={(e) => {
                                  onChangeHandler(
                                    "name",
                                    e.target.value,
                                    val,
                                    index,
                                    "query"
                                  );
                                }}
                              />
                            </TextTypography>

                            <TextTypography>
                              {`Value: `}
                              <TextEditor
                                index={index}
                                keyName="params"
                                nodeId={nodeData.id}
                                inputData={val?.test_value}
                                currentNode={nodeData?.node_name}
                                onChange={(value: any) => {
                                  onChangeHandler(
                                    "test_value",
                                    value,
                                    val,
                                    index,
                                    "query"
                                  );
                                }}
                                multiline
                              />
                            </TextTypography>

                            <TextTypography style={{ margin: "1rem 0rem" }}>
                              Data Type:
                              <GSelect
                                fullWidth={true}
                                borderHeight="40px"
                                size={"small"}
                                radius="0px"
                                options={dataTypes?.map((data: any) => ({
                                  label: data?.label,
                                  value: data.id,
                                }))}
                                defaultValue={"1"}
                                onChange={(value: any, e: any) => {
                                  onChangeHandler(
                                    "data_type",
                                    e.target.value,
                                    val,
                                    index,
                                    "query"
                                  );
                                }}
                                value={val?.data_type}
                              />
                            </TextTypography>

                            {val?.scope !== "path" && (
                              <GButton
                                buttonType="secondary"
                                label={"Remove"}
                                onClickHandler={() => {
                                  const updatedQuery = querys.filter(
                                    (_: any, i: any) => i !== index
                                  );
                                  const inputs = updatedQuery.map(
                                    (header: any) => ({
                                      input: header.test_value,
                                      isErr: false,
                                    })
                                  );
                                  setNestedInputData(
                                    nodeData?.id,
                                    "params",
                                    inputs
                                  );
                                  updateNodeData(updatedQuery, "query");
                                  setQuerys(updatedQuery);
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </>
                    </>
                  </>
                ) : globalKeysClicked === true ? (
                  <>
                    <>
                      <PrimaryTypography
                        style={{
                          fontWeight: 900,
                        }}
                      >
                        Global
                      </PrimaryTypography>

                      <>
                        {globalKeys?.length === 0 && (
                          <>
                            <RenderNoDataFound />
                          </>
                        )}
                        <GButton
                          buttonType="primary"
                          label={"Add"}
                          onClickHandler={() => {
                            // Update the state
                            const newkeys = {
                              id: uuidv4(),
                              key_name: "",
                              body_key: "",
                              value: "",
                              request_template: "",
                              global_key: "",
                              flow_id: initialFlowId,
                              node_id: nodeData.id,
                              include: false,
                              body_include: false,
                              header_key: "",
                              prefix_value: "",
                              node_name: nodeData?.node_name,
                            };

                            // Assuming ydoc is accessible in this scope and has a method to update it
                            if (flowYdoc) {
                              const keysArray = flowYdoc.getArray("globalkeys");
                              keysArray.push([newkeys]);
                            }
                          }}
                        />

                        {globalKeys
                          ?.filter((x) => x.node_id == nodeData.id)
                          ?.map((val: any, index: number) => (
                            <>
                              <div style={{ marginTop: "1rem" }}>
                                {Globalwarning[index] && val?.key_name && (
                                  <label
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      backgroundColor: "#E50001",
                                      color: "white",
                                      fontWeight: "bold",
                                      padding: "8px 12px",
                                      borderRadius: "20px",
                                      fontSize: "14px",
                                      boxShadow:
                                        "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                  >
                                    <span style={{ fontSize: "10px" }}>
                                      {Globalwarning[index]}
                                    </span>
                                  </label>
                                )}
                              </div>

                              <TextTypography>
                                {`Name: `}

                                <input
                                  value={val?.key_name}
                                  className="form-control my-1"
                                  name="key_name"
                                  onChange={(e) => {
                                    onKeyHandler(
                                      "key_name",
                                      e.target.value,
                                      val.id
                                    );
                                  }}
                                />
                              </TextTypography>

                              <TextTypography>
                                {`Value: `}
                                <TextEditor
                                  index={index}
                                  keyName="keys"
                                  nodeId={nodeData.id}
                                  inputData={val?.request_template}
                                  currentNode={nodeData?.node_name}
                                  objectToSuggest={
                                    currentResultRun?.response?.apiResponse
                                  }
                                  onChange={(value: any) => {
                                    onKeyHandler(
                                      "request_template",
                                      value,
                                      val.id
                                    );
                                  }}
                                  multiline
                                />
                              </TextTypography>

                              <TextTypography>
                                {`include in Global Header: `}
                                <input
                                  type="checkbox"
                                  checked={val?.include || false}
                                  className="form-check-input my-1"
                                  name="include"
                                  onChange={(e) => {
                                    onKeyHandler(
                                      "include",
                                      e.target.checked,
                                      val.id
                                    );
                                  }}
                                />
                              </TextTypography>

                              {val?.include && (
                                <>
                                  <TextTypography>
                                    {`Key name: `}
                                    <input
                                      value={val?.header_key || ""}
                                      className="form-control my-1"
                                      name="header_key"
                                      onChange={(e) => {
                                        onKeyHandler(
                                          "header_key",
                                          e.target.value,
                                          val.id
                                        );
                                      }}
                                    />
                                  </TextTypography>

                                  <TextTypography>
                                    {`prefix value: `}
                                    <input
                                      value={val?.prefix_value || ""}
                                      className="form-control my-1"
                                      name="prefix_value"
                                      onChange={(e) => {
                                        onKeyHandler(
                                          "prefix_value",
                                          e.target.value,
                                          val.id
                                        );
                                      }}
                                    />
                                  </TextTypography>
                                </>
                              )}

                              <TextTypography>
                                {`include in Global Body: `}
                                <input
                                  type="checkbox"
                                  checked={val?.body_include || false}
                                  className="form-check-input my-1"
                                  name="body_include"
                                  onChange={(e) => {
                                    onKeyHandler(
                                      "body_include",
                                      e.target.checked,
                                      val.id
                                    );
                                  }}
                                />
                              </TextTypography>

                              {val?.body_include && (
                                <>
                                  <TextTypography>
                                    {`Body Key: `}
                                    <input
                                      value={val?.body_key || ""}
                                      className="form-control my-1"
                                      name="header_key"
                                      onChange={(e) => {
                                        onKeyHandler(
                                          "body_key",
                                          e.target.value,
                                          val.id
                                        );
                                      }}
                                    />
                                  </TextTypography>
                                </>
                              )}

                              <GButton
                                buttonType="secondary"
                                label={"Remove"}
                                onClickHandler={() => {
                                  const keysArray =
                                    flowYdoc?.getArray("globalkeys");
                                  const itemsArray: any = keysArray?.toArray();

                                  const index = itemsArray?.findIndex(
                                    (item: any) => item?.id === val?.id
                                  );
                                  if (index !== -1) {
                                    keysArray?.delete(index, 1);
                                  }
                                }}
                              />
                            </>
                          ))}
                      </>
                    </>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <PrimaryTypography
                        style={{
                          fontWeight: 900,
                        }}
                      >
                        Operation Response
                      </PrimaryTypography>
                    </div>
                    <>
                      {JSON?.stringify(currentResultRun) === "{}" ? (
                        <>
                          <RenderNoDataFound />
                        </>
                      ) : (
                        <>
                          <div
                            style={{ marginTop: "-5px", marginLeft: "-18px" }}
                          >
                            <Accordion
                              style={{
                                background: "transparent",
                                boxShadow: "none",
                              }}
                              onClick={() => {
                                setSizeAccClicked(!sizeAccClicked);
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <div>
                                  <TextTypography
                                    style={{
                                      fontWeight: 900,
                                    }}
                                  >
                                    Size:{" "}
                                    <span
                                      style={{
                                        color: `${theme.palette.v2PrimaryColor.main}`,
                                        fontWeight: 900,
                                      }}
                                    >
                                      {calculateTotalSize()} KB
                                    </span>
                                  </TextTypography>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div
                                  style={{
                                    marginTop: "-25px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      background:
                                        theme.palette.primaryWhite.main,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto auto",
                                        rowGap: "4px",
                                      }}
                                    >
                                      <TextTypography>
                                        Request Body Size:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-105px",
                                        }}
                                      >
                                        {
                                          currentResultRun?.size
                                            ?.request_BodySize
                                        }{" "}
                                        KB
                                      </TextTypography>
                                      <TextTypography>
                                        Request Header Size:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-105px",
                                        }}
                                      >
                                        {
                                          currentResultRun?.size
                                            ?.request_HeaderSize
                                        }{" "}
                                        KB
                                      </TextTypography>
                                      <TextTypography>
                                        Response Body Size:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-105px",
                                        }}
                                      >
                                        {
                                          currentResultRun?.size
                                            ?.response_BodySize
                                        }{" "}
                                        KB
                                      </TextTypography>
                                      <TextTypography>
                                        Responce Header Size:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-105px",
                                        }}
                                      >
                                        {
                                          currentResultRun?.size
                                            ?.response_HeaderSize
                                        }{" "}
                                        KB
                                      </TextTypography>
                                    </div>
                                  </Box>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <div
                            style={{
                              marginTop: "-25px",
                              marginLeft: "-18px",
                            }}
                          >
                            <Accordion
                              style={{
                                background: "transparent",
                                boxShadow: "none",
                              }}
                              onClick={() => {
                                setTimeAccClicked(!timeAccClicked);
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                expandIcon={<ExpandMoreIcon />}
                              >
                                <div>
                                  <TextTypography
                                    style={{
                                      fontWeight: 900,
                                    }}
                                  >
                                    Time:{" "}
                                    <span
                                      style={{
                                        color: `${theme.palette.v2PrimaryColor.main}`,
                                        fontWeight: 900,
                                      }}
                                    >
                                      {calculateTotalTime()} ms
                                    </span>
                                  </TextTypography>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails>
                                <div
                                  style={{
                                    marginTop: "-25px",
                                    marginLeft: "15px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      background:
                                        theme.palette.primaryWhite.main,
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "grid",
                                        gridTemplateColumns: "auto auto",
                                        rowGap: "4px",
                                      }}
                                    >
                                      <TextTypography>
                                        Dns Lookup Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups
                                            ?.dnsLookupTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                      <TextTypography>
                                        Download Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups
                                            ?.downloadTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                      <TextTypography>
                                        Response Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups
                                            ?.responseTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                      <TextTypography>
                                        SSL Handshake Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups
                                            ?.sslHandshakeTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                      <TextTypography>
                                        Total Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups?.totalTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                      <TextTypography>
                                        TransferStart Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups
                                            ?.transferStartTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                      <TextTypography>
                                        TCP Handshake Time:{" "}
                                      </TextTypography>
                                      <TextTypography
                                        style={{
                                          color: `${theme.palette.v2PrimaryColor.main}`,
                                          fontWeight: 900,
                                          marginLeft: "-90px",
                                        }}
                                      >
                                        {convertToMilliSeconds(
                                          currentResultRun?.lookups
                                            ?.tcpHandshakeTime
                                        )}{" "}
                                        ms
                                      </TextTypography>
                                    </div>
                                  </Box>
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                          <div style={{ marginTop: "-10px" }}>
                            <TextTypography>
                              <span
                                style={{
                                  fontWeight: 900,
                                }}
                              >
                                {`StatusCode: `}
                              </span>
                              <span
                                style={{
                                  fontWeight: 900,
                                }}
                              >
                                {currentResultRun?.statusCode >= 100 &&
                                currentResultRun?.statusCode <= 199 ? (
                                  <span
                                    style={{
                                      color: `${theme.palette.primaryBlue.main}`,
                                    }}
                                  >
                                    {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                                  </span>
                                ) : currentResultRun?.statusCode >= 200 &&
                                  currentResultRun?.statusCode <= 299 ? (
                                  <span
                                    style={{
                                      color: `#16A34A`,
                                    }}
                                  >
                                    {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                                  </span>
                                ) : currentResultRun?.statusCode >= 300 &&
                                  currentResultRun?.statusCode <= 399 ? (
                                  <span
                                    style={{
                                      color: `#D8A805`,
                                    }}
                                  >
                                    {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                                  </span>
                                ) : currentResultRun?.statusCode >= 400 &&
                                  currentResultRun?.statusCode <= 499 ? (
                                  <span
                                    style={{
                                      color: `#FF8C00`,
                                    }}
                                  >
                                    {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                                  </span>
                                ) : currentResultRun?.statusCode >= 500 &&
                                  currentResultRun?.statusCode <= 509 ? (
                                  <span
                                    style={{
                                      color: `${theme.palette.mainRed.main}`,
                                    }}
                                  >
                                    {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>
                            </TextTypography>
                          </div>

                          {data?.currentResultRun?.node_id !== undefined ? (
                            <>
                              <TextTypography
                                style={{
                                  margin: "10px",
                                  fontSize: "12px",
                                  fontWeight: 900,
                                  color: `${theme.palette.teritiaryColor.main}`,
                                }}
                              >
                                No data found
                              </TextTypography>
                            </>
                          ) : (
                            <>
                              <div style={{ marginTop: "5px" }}>
                                <TextTypography
                                  style={{
                                    fontWeight: 900,
                                  }}
                                >
                                  Response:
                                </TextTypography>
                                <pre
                                  style={{
                                    fontSize: "9px",
                                  }}
                                >
                                  {formatWithLineNumbers(
                                    JSON.stringify(
                                      currentResultRun?.response,
                                      null,
                                      2
                                    )
                                  )}
                                </pre>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </>
                  </>
                )}
              </Popover>
            </div>
          </Popover>
          {/* Response section */}
          <Popover
            id="mouse-over-popover"
            open={Boolean(anchorElResponse)}
            anchorEl={anchorElResponse}
            onClose={handleCloseResponse}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: "400px",

                padding: "15px",
                maxHeight: "200px",

                overflow: "auto",
              },
            }}
            disableRestoreFocus
          >
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <PrimaryTypography
                  style={{
                    fontWeight: 900,
                  }}
                >
                  Operation Response
                </PrimaryTypography>
              </div>
              <>
                {JSON?.stringify(currentResultRun) === "{}" ? (
                  <>
                    <RenderNoDataFound />
                  </>
                ) : (
                  <>
                    <div style={{ marginTop: "-5px", marginLeft: "-18px" }}>
                      <Accordion
                        style={{
                          background: "transparent",
                          boxShadow: "none",
                        }}
                        onClick={() => {
                          setSizeAccClicked(!sizeAccClicked);
                        }}
                      >
                        <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <div>
                            <TextTypography
                              style={{
                                fontWeight: 900,
                              }}
                            >
                              Size:{" "}
                              <span
                                style={{
                                  color: `${theme.palette.v2PrimaryColor.main}`,
                                  fontWeight: 900,
                                }}
                              >
                                {calculateTotalSize()} KB
                              </span>
                            </TextTypography>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            style={{
                              marginTop: "-25px",
                              marginLeft: "15px",
                            }}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                background: theme.palette.primaryWhite.main,
                              }}
                            >
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "auto auto",
                                  rowGap: "4px",
                                }}
                              >
                                <TextTypography>
                                  Request Body Size:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-105px",
                                  }}
                                >
                                  {currentResultRun?.size?.request_BodySize} KB
                                </TextTypography>
                                <TextTypography>
                                  Request Header Size:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-105px",
                                  }}
                                >
                                  {currentResultRun?.size?.request_HeaderSize}{" "}
                                  KB
                                </TextTypography>
                                <TextTypography>
                                  Response Body Size:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-105px",
                                  }}
                                >
                                  {currentResultRun?.size?.response_BodySize} KB
                                </TextTypography>
                                <TextTypography>
                                  Response Header Size:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-105px",
                                  }}
                                >
                                  {currentResultRun?.size?.response_HeaderSize}{" "}
                                  KB
                                </TextTypography>
                              </div>
                            </Box>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div
                      style={{
                        marginTop: "-25px",
                        marginLeft: "-18px",
                      }}
                    >
                      <Accordion
                        style={{
                          background: "transparent",
                          boxShadow: "none",
                        }}
                        onClick={() => {
                          setTimeAccClicked(!timeAccClicked);
                        }}
                      >
                        <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <div>
                            <TextTypography
                              style={{
                                fontWeight: 900,
                              }}
                            >
                              Time:{" "}
                              <span
                                style={{
                                  color: `${theme.palette.v2PrimaryColor.main}`,
                                  fontWeight: 900,
                                }}
                              >
                                {calculateTotalTime()} ms
                              </span>
                            </TextTypography>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div
                            style={{
                              marginTop: "-25px",
                              marginLeft: "15px",
                            }}
                          >
                            <Box
                              sx={{
                                width: "100%",
                                height: "100%",
                                background: theme.palette.primaryWhite.main,
                              }}
                            >
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "auto auto",
                                  rowGap: "4px",
                                }}
                              >
                                <TextTypography>
                                  Dns Lookup Time:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.dnsLookupTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                                <TextTypography>Download Time: </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.downloadTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                                <TextTypography>Response Time: </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.responseTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                                <TextTypography>
                                  SSL Handshake Time:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.sslHandshakeTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                                <TextTypography>Total Time: </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.totalTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                                <TextTypography>
                                  TransferStart Time:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.transferStartTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                                <TextTypography>
                                  TCP Handshake Time:{" "}
                                </TextTypography>
                                <TextTypography
                                  style={{
                                    color: `${theme.palette.v2PrimaryColor.main}`,
                                    fontWeight: 900,
                                    marginLeft: "-90px",
                                  }}
                                >
                                  {convertToMilliSeconds(
                                    currentResultRun?.lookups?.tcpHandshakeTime
                                  )}{" "}
                                  ms
                                </TextTypography>
                              </div>
                            </Box>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                    <div style={{ marginTop: "-10px" }}>
                      <TextTypography>
                        <span
                          style={{
                            fontWeight: 900,
                          }}
                        >
                          {`StatusCode: `}
                        </span>
                        <span
                          style={{
                            fontWeight: 900,
                          }}
                        >
                          {currentResultRun?.statusCode >= 100 &&
                          currentResultRun?.statusCode <= 199 ? (
                            <span
                              style={{
                                color: `${theme.palette.primaryBlue.main}`,
                              }}
                            >
                              {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                            </span>
                          ) : currentResultRun?.statusCode >= 200 &&
                            currentResultRun?.statusCode <= 299 ? (
                            <span
                              style={{
                                color: `#16A34A`,
                              }}
                            >
                              {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                            </span>
                          ) : currentResultRun?.statusCode >= 300 &&
                            currentResultRun?.statusCode <= 399 ? (
                            <span
                              style={{
                                color: `#D8A805`,
                              }}
                            >
                              {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                            </span>
                          ) : currentResultRun?.statusCode >= 400 &&
                            currentResultRun?.statusCode <= 499 ? (
                            <span
                              style={{
                                color: `#FF8C00`,
                              }}
                            >
                              {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                            </span>
                          ) : currentResultRun?.statusCode >= 500 &&
                            currentResultRun?.statusCode <= 509 ? (
                            <span
                              style={{
                                color: `${theme.palette.mainRed.main}`,
                              }}
                            >
                              {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </TextTypography>
                    </div>

                    {data?.currentResultRun?.node_id !== undefined ? (
                      <>
                        <TextTypography
                          style={{
                            margin: "10px",
                            fontSize: "12px",
                            fontWeight: 900,
                            color: `${theme.palette.teritiaryColor.main}`,
                          }}
                        >
                          No data found
                        </TextTypography>
                      </>
                    ) : (
                      <>
                        <div style={{ marginTop: "5px" }}>
                          <TextTypography
                            style={{
                              fontWeight: 900,
                            }}
                          >
                            Response:
                          </TextTypography>
                          <pre
                            style={{
                              fontSize: "9px",
                            }}
                          >
                            {formatWithLineNumbers(
                              JSON.stringify(
                                currentResultRun?.response,
                                null,
                                2
                              )
                            )}
                          </pre>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            </>
          </Popover>
        </Box>

        <WorkflowCustomHandle
          type="source"
          position={Position.Right}
          id={nodeData?.id + "_success"}
          style={{
            height: "8px",
            width: "8px",

            background: "#4CAF50",
            borderRadius: "inherit",
            borderColor: "#D2D2D2",
            boxShadow: "0 0 10px 2px rgb(76, 175, 80, 0.5)",
          }}
          isValidConnection={isValidConnection}
        />
        <WorkflowCustomHandle
          type="source"
          position={Position.Right}
          id={nodeData?.id + "_failure"}
          style={{
            height: "8px",
            width: "8px",

            background: "#FF5252",
            borderRadius: "inherit",
            borderColor: "#D2D2D2",
            marginTop: "20px",
            boxShadow: "0 0 10px 2px rgba(255, 82, 82, 0.5)",
          }}
          isValidConnection={isValidConnection}
        />

        <style>
          {`
          @keyframes blinkShadow {
            0% {
              box-shadow: 0 0 5px rgba(107, 33, 168, 0.8); /* Start with the shadow color */
            }
            50% {
              box-shadow: 0 0 10px rgba(107, 33, 168, 1); /* Blinking shadow with higher opacity */
            }
            100% {
              box-shadow: 0 0 5px rgba(107, 33, 168, 0.8); /* Return to the original shadow color */
            }
          }
        `}
        </style>
      </Box>
    </Box>
  );
}
