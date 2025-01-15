import {
  convertToMilliSeconds,
  getCookies,
  // replacePlaceholders,
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
  Popover,
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
import CustomHandle from "@/app/ApiFlowComponents/ApiDesigner/customHandle";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import {
  DeleteIcon,
  InfoIcon,
  TotalProjects,
  TotalNewProjectIcon,
  CloseIcon,
} from "@/app/Assests/icons";
import { ManageAccounts } from "@mui/icons-material";
import {
  BackgroundUrlList,
  GetOperationById,
} from "@/app/Redux/apiManagement/projectReducer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RenderNoDataFound } from "@/app/ApiFlowComponents/ApiDesigner/renderNoDataFound";
import GButton from "@/app/apiflow_components/global/GButton";
import { ChangeNodeManage } from "@/app/ApiFlowComponents/ApiDesigner/ChangeHistoryDesigner/ChangeNodeManage";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import GSelect from "@/app/apiflow_components/global/GSelect";
import TextEditor from "@/app/apiflow_components/WorkflowComponents/TextEditor/textEditor";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WorkflowCustomHandle from "../workflowCustomHandle";
import theme from "@/Theme/theme";
import { debounce } from "lodash";
import AceEditorComponent from "@/app/apiflow_components/WorkflowComponents/AceEditor/aceEditor";

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

export default function RevHistoryNode({ data }: any) {
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

  const [backgroundUrlClicked, setbackgroundUrlClicked] = useState<any>(false);
  const [operationDetails, setOperationDetails] = useState<any>(false);
  const [backgroundUrlData, setBackgroundUrlData] = useState<any>([]);
  const [sizeAccClicked, setSizeAccClicked] = useState(false);
  const [timeAccClicked, setTimeAccClicked] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        console.error("Error parsing data:", error);
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
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElInput(event.currentTarget);
    setInputClicked(true);
    setHeaderClicked(false);
    setResponseClicked(false);
    setQueryClicked(false);
  };

  const handleClickHeader = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElInput(event.currentTarget);
    setHeaderClicked(true);
    setInputClicked(false);
    setResponseClicked(false);
    setQueryClicked(false);
  };

  const handleClickQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElInput(event.currentTarget);
    setQueryClicked(true);
    setHeaderClicked(false);
    setInputClicked(false);
    setResponseClicked(false);

    setGlobalKeysClicked(false);
  };

  const handleClickResponse = (event: any) => {
    setAnchorElResponse(event.currentTarget);
    setResponseClicked(true);
    setInputClicked(false);
    setHeaderClicked(false);

    setQueryClicked(false);
    setGlobalKeysClicked(false);
  };

  const handleGlobalKeys = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElInput(event.currentTarget);
    setResponseClicked(false);
    setInputClicked(false);
    setHeaderClicked(false);

    setQueryClicked(false);
    setGlobalKeysClicked(true);
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
      console.error("Yjs document is not available.");
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
      console.error("Item with the provided id not found in Yjs array.");
      return;
    }

    // Remove the old item
    keysArray.delete(index, 1);

    // Insert the updated item
    const updatedItem = newGlobalKeys.find((item: any) => item?.id === id);
    if (updatedItem) {
      keysArray.insert(index, [updatedItem]);
    } else {
      console.error("Updated item not found in newGlobalKeys.");
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

  const handleCloseInput = () => {
    setAnchorElInput(null);
    // setWarning([]);
  };

  const handleCloseResponse = () => {
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

  function safeJSONParse(rawPayload: string) {
    if (!rawPayload) return {};

    // Preprocess the raw payload to ensure valid JSON
    const preprocessedPayload = rawPayload
      //   .replace(
      //   /:\s*(&[a-zA-Z]+\(\{[^}]*\}\))/g, // Match unquoted functions like &upperCase({...})
      //   (match: any, group: any) => `: "${group}"` // Wrap the match in quotes
      // );
      .replace(
        /:\s*({[^}]*})/g, // Match unquoted object-like values (e.g., `{...}`)
        (match, group) => `: "${group}"`
      )
      .replace(
        /:\s*(&[a-zA-Z]+\(\{[^}]*\}\))/g, // Match unquoted functions like &upperCase({...})
        (match, group) => `: "${group}"`
      )
      .replace(
        /:\s*([^",\s}\]]+)/g, // Match unquoted standalone values (e.g., response.getAllProducts...)
        (match, group) => `: "${group}"`
      );

    // Parse the preprocessed JSON string
    try {
      return JSON.parse(preprocessedPayload);
    } catch (e) {
      console.error("Invalid JSON format:", e);
      return {};
    }
  }

  const RunHandler = () => {
    let payload;
    try {
      // payload = JSON.parse(nodeData?.raw_payload || "{}");
      payload = safeJSONParse(nodeData.raw_payload);
      // payload = nodeData?.raw_payload;
    } catch (error: any) {
      toast.error(
        `${nodeData?.node_name || "Unknown Node"}:Input Error parsing JSON: ${
          error.message
        }`
      );
    }
    // const payload = JSON.parse(nodeData?.raw_payload || "{}");

    // let response = previousOpRaw || null;

    let response = globalResponse || null;

    const new_payload = replacePlaceholders(payload, { response }, globalKeys);

    let headersArr = nodeData.operations_header || [];
    let globalHeaders = globalKeys?.filter(
      (x: any) => x.include === true && x.node_id !== nodeData.id
    );

    let globalBody = globalKeys?.filter(
      (x: any) => x.body_include === true && x.node_id !== nodeData.id
    );

    // "key":"value"

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
        // operation_inputs: updateArray(nodeData?.operations_input),
        operation_inputs: [],
        operation_headers: updateArray(
          // nodeData?.operations_header,
          headers,
          response,
          globalKeys
        ),
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

        // if (res.statusCode >= 200 && res.statusCode < 300) {
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
                // raw_output: res?.response?.apiResponse,
              }),
            },
          });
        } else {
        }
        // setCurrentResponse(res.response.apiResponse);
        // dispatch(setGlobalResponse({ ...globalResponse ,  }));
        dispatch(
          setGlobalResponse({
            ...globalResponse,
            [nodeData?.node_name]: res.response.apiResponse,
          })
        );
        // }

        setCurrentResultRun(res);
      })
      .catch((err: any) => {
        setCurrentNodeRun(false);
      });
  };

  //------------------------------------useEffect---------------------------------------------------------

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

  return (
    <Box
      sx={{
        width: "230px",
        height: "120px",
        // borderColor: "#F3F3F340",
        // backdropFilter: "blur(14.19)",
        background: "rgba(243, 243, 243, 0.15)",
        boxShadow: "inset 0px 4.73px 11.82px rgba(255, 255, 255, 0.17)",
        backdropFilter: "blur(7.09px)", // Note: minimal browser support
        borderRadius: "15px", // Rounded to 2 decimal places
        // background: "transparent",
        animation:
          nextNode?.includes(nodeData?.id) || currentNodeRun
            ? "blinkShadow 3s infinite"
            : "",
        border:
          currentResultRun?.status == "SUCCESS"
            ? "2px solid #48C9B0"
            : currentResultRun?.status == "FAILED"
            ? "2px solid #FF5252"
            : nodeData?.changeType?.includes("MODIFIED_NODE")
            ? `3px solid ${theme.palette.mainYellow.main}`
            : nodeData?.changeType?.includes("ADDED_NODE")
            ? `3px solid ${theme.palette.mainGreen.main}`
            : nodeData?.changeType?.includes("DELETED_NODE")
            ? `3px solid ${theme.palette.mainRed.main}`
            : `3px solid #babbbf`,
      }}
      // className="rounded"
    >
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
        {nodeData?.changeType || "CURRENT_NODE"}
      </div>

      {backgroundUrlClicked === true && (
        <div>
          <Popover
            open={backgroundUrlClicked}
            anchorEl={backgroundUrlClicked || null}
            onClose={() => {
              setbackgroundUrlClicked(false);
            }}
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
                  setbackgroundUrlClicked(false);
                }}
              />
              <HeadingTypography
                style={{ color: `${theme.palette.DarkBlack.main}` }}
              >
                Operation Details
              </HeadingTypography>

              <div
                style={{
                  padding: "10px",
                }}
              >
                <pre>
                  <TextTypography>
                    {`. Location: ${operationDetails?.location}\n
     URL Type: ${
       !operationDetails?.private_or_public ||
       operationDetails?.private_or_public === "null"
         ? "-"
         : operationDetails?.private_or_public
     }\n
    Orphan: ${
      operationDetails?.orphan_status &&
      operationDetails?.orphan_status !== "null"
        ? operationDetails?.orphan_status
        : "-"
    }\n
    Endpoint Status: ${
      operationDetails?.endpoint_status &&
      operationDetails?.endpoint_status !== "null"
        ? operationDetails?.endpoint_status
        : "-"
    }\n`}
                  </TextTypography>
                </pre>

                <TextTypography
                  style={{
                    color: `${theme.palette.teritiaryColor.main}`,
                    marginLeft: "10px",
                  }}
                >
                  Here is the list of background url for the operation{" "}
                </TextTypography>
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
                      }}
                    >
                      No data found
                    </PrimaryTypography>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        padding: "5px",
                      }}
                    ></div>
                    {backgroundUrlData?.map((val: any, index: number) => (
                      <div
                        key={val?.id}
                        style={{
                          padding: "5px",
                        }}
                      >
                        <pre>
                          <TextTypography>
                            {`${index + 1}. Type: ${val?.type}\n
    Background URL: ${
      !val?.background_url || val?.background_url === "null"
        ? "-"
        : val?.background_url
    }\n
    Method: ${val?.method && val?.method !== "null" ? val?.method : "-"}\n
    Region: ${val?.region && val?.region !== "null" ? val?.region : "-"}\n
    Api Type: ${
      val?.api_type && val?.api_type !== "null" ? val?.api_type : "-"
    }\n
    Function name: ${
      val?.function_name && val?.function_name !== "null"
        ? val?.function_name
        : "-"
    }\n
    Updated at: ${val?.updated_at ?? "-"}\n
    Created at: ${val?.created_at ?? "-"}`}
                          </TextTypography>
                        </pre>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Popover>
        </div>
      )}

      <WorkflowCustomHandle
        type="target"
        position={Position.Left}
        id={
          (nodeData?.modifiedID ? nodeData?.modifiedID : nodeData?.id) +
          "_input"
        }
        // isConnectable={3}
        style={{
          height: "7px",
          width: "6px",
          background: "#55CCFF",
          borderRadius: "inherit",
          borderColor: "#D2D2D2",
          boxShadow: "0 0 12px 2px rgb(85, 204, 255)",
        }}
        // isValidConnection={isValidConnection}
      />
      <Box
        // className="p-2 rounded"
        sx={{
          background: "rgba(243, 243, 243, 0.25)",
          backdropFilter: "blur(7.09px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: "40%",
          padding: "10px",
          // borderTopLeftRadius: "10px",
          // borderTopRightRadius: "10px",
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
            style={{
              marginLeft: "5px",
              maxWidth: "100px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "12px",
            }}
          >
            {nodeData?.node_name}
          </SecondaryTypography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PlayArrowIcon
            style={{
              color: `#FFFFFF`,
              fontSize: "18px",
              backgroundColor: "#7E59DC",
              borderRadius: "4px",
            }}
            onClick={() => {
              RunHandler();
            }}
          />
        </div>
      </Box>

      <Box
        sx={{
          overflowWrap: "anywhere",
          // background: "#F3F3F326",
          // backdropFilter: "blur(14.19)",
          // //  boxShadow: "inset 0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
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
          open={open}
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
                // onMouseEnter={handleClickInput}
                // onMouseLeave={handleCloseInput}
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
                // onMouseEnter={handleClickHeader}
                // onMouseLeave={handleCloseInput}
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
                // onMouseEnter={handleClickHeader}
                // onMouseLeave={handleCloseInput}
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
                // onMouseEnter={handleClickHeader}
                // onMouseLeave={handleCloseInput}
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
              // id={id}
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
                        // minWidth: "180px",
                        // overflowY: "auto",
                        overflow: "hidden",
                        // pointerEvents: 'none',
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
                    // suggestionVal={previousOpRaw}
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
                          // setWarning(null);
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
                                  backgroundColor: "#E50001", // Soft pink background
                                  color: "white", // White text color
                                  fontWeight: "bold", // Bold text
                                  padding: "8px 12px", // Padding around the label
                                  borderRadius: "20px", // Rounded corners
                                  fontSize: "14px", // Font size for the text
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
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
                              // onChange={(e) => {
                              //   onChangeHandler(
                              //     "name",
                              //     e.target.value,
                              //     val,
                              //     index,
                              //     "headers"
                              //   );
                              // }}
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
                              // onChange={(value: any, e: any) => {
                              //   onChangeHandler(
                              //     "data_type",
                              //     e.target.value,
                              //     val,
                              //     index,
                              //     "headers"
                              //   );
                              // }}
                              value={val.data_type}
                            />
                          </TextTypography>

                          <TextTypography>
                            {`Value: `}
                            <TextEditor
                              inputData={val?.test_value}
                              currentNode={nodeData?.node_name}
                              // onChange={(value: any) => {
                              //   onChangeHandler(
                              //     "test_value",
                              //     value,
                              //     val,
                              //     index,
                              //     "headers"
                              //   );
                              // }}
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
                              updateNodeData(updatedHeaders, "header");
                              setHeaders(updatedHeaders);

                              // Also remove the warning for this field
                              // setWarning((prevWarnings: any[]) => {
                              //   return prevWarnings.filter(
                              //     (_: any, i: number) => i !== index
                              //   );
                              // });
                            }}
                          />
                        </div>
                      ))}
                    </>
                    {/* // )} */}
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
                    {/* {warning && (
                        <div
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <WarningIcon
                            style={{
                              fontSize: "10px",
                              marginRight: "7px",
                            }}
                          />
                          <p
                            style={{
                              marginTop: "0.9rem",
                              fontSize: "10px",
                            }}
                          >
                            {warning}
                          </p>
                        </div>
                      )} */}

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
                                  backgroundColor: "#E50001", // Soft pink background
                                  color: "white", // White text color
                                  fontWeight: "bold", // Bold text
                                  padding: "8px 12px", // Padding around the label
                                  borderRadius: "20px", // Rounded corners
                                  fontSize: "14px", // Font size for the text
                                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
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

                    {/* {warning && (
                        <div
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <WarningIcon
                            style={{ fontSize: "10px", marginRight: "7px" }}
                          />
                          <p style={{ marginTop: "0.9rem", fontSize: "10px" }}>
                            {warning}
                          </p>
                        </div>
                      )} */}

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
                                    backgroundColor: "#E50001", // Soft pink background
                                    color: "white", // White text color
                                    fontWeight: "bold", // Bold text
                                    padding: "8px 12px", // Padding around the label
                                    borderRadius: "20px", // Rounded corners
                                    fontSize: "14px", // Font size for the text
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Slight shadow for depth
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

                              {/* <input
                                  value={val?.request_template}
                                  className="form-control my-1"
                                  name="request_template"
                                  onChange={(e) => {
                                    onKeyHandler(
                                      "request_template",
                                      e.target.value,
                                      val.id
                                    );
                                  }}
                                /> */}

                              {/* <TextEditor
                                  inputData={val?.request_template}
                                  objectToSuggest={currentResponse || {}}
                                  onChange={(value: any) => {
                                    onKeyHandler(
                                      "request_template",
                                      value,
                                      val
                                    );
                                  }}
                                  multiline
                                /> */}

                              <TextEditor
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
                    {
                      // ((currentResultRun === null) || (currentResultRun === undefined)) ?
                      JSON?.stringify(currentResultRun) === "{}" ? (
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
                                      {/* {currentResultRun?.size?.response_BodySize} KB */}
                                      {/* {currentResultRun?.size && `${currentResultRun?.size?.request_HeaderSize + currentResultRun?.size?.request_BodySize + currentResultRun?.size?.response_BodySize + currentResultRun?.size?.response_HeaderSize}`} KB */}
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
                                        // columnGap: '5px'
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
                                      {/* {convertToMilliSeconds(currentResultRun?.lookups?.totalTime)} ms */}
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
                                        // columnGap: '5px'
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
                                {/* {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`} */}
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
                      )
                    }
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
              // minWidth: "180px",
              padding: "15px",
              maxHeight: "200px",
              // overflowY: "auto",
              overflow: "auto",
              // pointerEvents: 'none',
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
              {
                // ((currentResultRun === null) || (currentResultRun === undefined)) ?
                JSON?.stringify(currentResultRun) === "{}" ? (
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
                                {/* {currentResultRun?.size?.response_BodySize} KB */}
                                {/* {currentResultRun?.size && `${currentResultRun?.size?.request_HeaderSize + currentResultRun?.size?.request_BodySize + currentResultRun?.size?.response_BodySize + currentResultRun?.size?.response_HeaderSize}`} KB */}
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
                                  // columnGap: '5px'
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
                                {/* {convertToMilliSeconds(currentResultRun?.lookups?.totalTime)} ms */}
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
                                  // columnGap: '5px'
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
                          {/* {`${currentResultRun?.statusCode}  ${currentResultRun?.request_status}`} */}
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
                )
              }
            </>
          </>
        </Popover>
      </Box>

      <WorkflowCustomHandle
        type="source"
        position={Position.Right}
        id={
          (nodeData?.modifiedID ? nodeData?.modifiedID : nodeData?.id) +
          "_success"
        }
        style={{
          height: "8px",
          width: "8px",
          // background: "#55CCFF",
          background: "#4CAF50",
          borderRadius: "inherit",
          borderColor: "#D2D2D2",
          boxShadow: "0 0 10px 2px rgb(76, 175, 80, 0.5)",
        }}
        // isValidConnection={isValidConnection}
      />
      <WorkflowCustomHandle
        type="source"
        position={Position.Right}
        id={
          (nodeData?.modifiedID ? nodeData?.modifiedID : nodeData?.id) +
          "_failure"
        }
        style={{
          height: "8px",
          width: "8px",
          // background: "#55CCFF",
          background: "#FF5252",
          borderRadius: "inherit",
          borderColor: "#D2D2D2",
          marginTop: "20px",
          boxShadow: "0 0 10px 2px rgba(255, 82, 82, 0.5)",
        }}
        // isValidConnection={isValidConnection}
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
  );
}
