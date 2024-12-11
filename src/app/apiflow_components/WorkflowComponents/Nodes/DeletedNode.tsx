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

const extractAllVariables = (inputString: any) => {
  const variablePattern = /\{response\.([^\}\.]+)(?:\.[^\}]*)?\}/g;
  const variables = [];
  let match;

  while ((match = variablePattern.exec(inputString)) !== null) {
    variables.push(match[1]); // Extracted variable name
  }

  return variables;
};

const checkConnections = (
  node_id: string,
  request_variable: string,
  current_node: string,
  edgesArray: any,
  nodesArray: any,
  ydoc: YDoc | null,
  apiFlowId: string,
  user_id: string
) => {
  let matches = extractAllVariables(request_variable);

  for (const match of matches) {
    for (const node of nodesArray) {
      if (node.type !== "startButtonNode" && node.data) {
        const nodeData = JSON.parse(node.data);
        if (nodeData.node_name === match) {
          let update_data = nodeData.id;
          let existingEdge = edgesArray.find(
            (x: any) => x.source === update_data && x.target === node_id
          );

          if (!existingEdge) {
            addEdges_new(ydoc, node_id, update_data, apiFlowId, user_id);
            return {
              error: "",
            };
          } else {
            return {
              error: "",
            };

            // return {
            //   error: existingEdge
            //     ? ""
            //     : `Edge from ${current_node} to ${nodeData.node_name} not found.`,
            // };
          }
        }
      }
    }
  }

  return { error: "" };
};

const addEdges_new = (
  ydoc: YDoc | null,
  target_node: any,
  source_node: any,
  apiFlowId: string,
  user_id: string
) => {
  let id = uuidv4();
  const storedVersionValue = sessionStorage.getItem("versionValue");
  let edge = {
    // ...params,
    flow_id: apiFlowId,
    created_by: user_id,
    id: id,
    animated: true,
    version: storedVersionValue,
    name: "null",
    status: "null",
    source: source_node,
    sourceHandle: source_node + "_success",
    target: target_node,
    targetHandle: target_node + "_input",
    style: {
      //   stroke: "#4CAF50",
      stroke: "#55CCFF",
    },
    type: "buttonEdge",
  };

  let updatedEdge: any = {
    action: "ADD_EDGES",
    status: "null",
    flow_id: apiFlowId,
    id: id,
    edges: edge,
  };

  // setEdges([...edges, edge]);
  const edgeMap = ydoc ? ydoc?.getMap<any>("edges") : null;
  if (edgeMap) {
    edgeMap.set(updatedEdge.id, updatedEdge);
  } else {
  }
};

export default function DeletedNode({ data }: any) {
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

  const onClick = useCallback(() => {
    const nodeToRemoveId = nodeData?.id;

    // Find edges connected to the node being removed
    const edgesToRemove = getEdges().filter(
      (edge) => edge.source === nodeToRemoveId || edge.target === nodeToRemoveId
    );

    const payload = {
      nodes: [{ id: nodeToRemoveId }], // Node to be removed
      edges: edgesToRemove.map((edge) => ({ id: edge.id })), // Edges connected to the node
    };

    // Delete the node and its associated edges
    // deleteElements(payload);

    let updatedNode: any = {
      action: "DELETE_NODES",
      status: "null",
      id: nodeToRemoveId,
      // flow_id: apiFlowId,
      nodes: {
        id: nodeToRemoveId,
      },
    };

    const edgeMap = flowYdoc?.getMap<any>("edges");
    if (edgeMap) {
      edgesToRemove.forEach((edge) => {
        let updatedEdge: any = {
          action: "DELETE_EDGES",
          status: "null",
          // flow_id: apiFlowId,
          edges: { id: edge.id }, // Assuming edge.id is the id of the current edge
        };
        edgeMap.set(edge.id, updatedEdge); // Assuming edge.id is the key
      });
    } else {
    }

    const nodesMap = flowYdoc?.getMap<any>("nodes");
    if (nodesMap) {
      nodesMap?.set(nodeToRemoveId, updatedNode);
    } else {
    }
  }, [nodeData?.id, deleteElements, getEdges]);

  function isValidConnection(connection: Connection) {
    const { source, target } = connection;

    //   const isTargetConnected = getEdges().some((edge) => edge.target === target);
    //   if (isTargetConnected) {
    //     return false;
    //   }

    // Check if the source and target are the same
    if (source === target) {
      return false;
    }

    // Check if the target handle is already connected to a source handle with "_startHandle"
    const isTargetConnectedToStartHandle = getEdges().some(
      (edge) =>
        edge.target === target && edge?.sourceHandle?.includes("_startHandle")
    );

    if (isTargetConnectedToStartHandle) {
      // If the target is already connected to a "_startHandle", prevent any new connections
      return false;
    }

    // Check if the source handle is already connected to the target handle
    const isSourceConnectedToTarget = getEdges().some(
      (edge) => edge.target === source && edge.source === target
    );
    if (isSourceConnectedToTarget) {
      return false;
    }

    return true;
  }

  // const handleInputDataFromAceEditor = useCallback(
  //   (val: any) => {
  //     setInputsPayload(val);
  //     const nodesMap = flowYdoc?.getMap<any>("nodes");
  //     const currentData = getNode(nodeData?.id);

  //     if (nodesMap) {
  //       nodesMap.set(nodeData?.id, {
  //         action: "EDIT_NODE",
  //         status: "null",
  //         id: nodeData?.id,
  //         nodes: {
  //           ...currentData,
  //           data: JSON.stringify({
  //             ...nodeData,
  //             raw_payload: val,
  //           }),
  //         },
  //       });
  //     }
  //   },
  //   [flowYdoc, nodeData?.id]
  // );

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

  //------------------------------------useEffect---------------------------------------------------------
  //   useEffect(() => {
  //     const nodesMap = flowYdoc?.getMap<any>("nodes");

  //     // const messagesArrayNew = messagesArray.toArray();

  //     let currentData: any = getNode(nodeData?.id);

  //     if (nodesMap) {
  //       nodesMap.set(nodeData?.id, {
  //         action: "EDIT_NODE",
  //         status: "null",
  //         id: nodeData?.id,
  //         nodes: {
  //           ...currentData,

  //           data: JSON.stringify({
  //             ...nodeData,
  //             operations_header: headers,
  //             operations_input: inputs,
  //             operations_auth: auths,
  //             operations_query_param: querys,
  //           }),
  //         },
  //       });
  //     } else {
  //     }
  //   }, [headers, inputs, auths, querys]);

  //   useEffect(() => {
  //     if (!flowYdoc) return;
  //     const runMap = flowYdoc?.getMap<any>("run");

  //     // const editNodesArry = ydoc.getArray<any>("nodes");

  //     const runFlow = () => {
  //       let runData = runMap?.toJSON();

  //       if (runData.run.status === "RUNNING") {
  //         let updateRun = runData?.run?.run_result.find(
  //           (x: any) => x?.node_id == nodeData?.id
  //         );
  //         setCurrentResultRun(updateRun);
  //       }
  //     };

  //     runMap.observe(runFlow);

  //     return () => {
  //       runMap.unobserve(runFlow);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const user_id = userProfile.user.user_id;
  //     const handleClickOutside = (event: any) => {
  //       if (popoverRef?.current && !popoverRef?.current?.contains(event.target)) {
  //         let nodesArray = getNodes();
  //         let edgesArray = getEdges();
  //         for (const node of nodesArray) {
  //           if (node.data) {
  //             const nodeDataV2 = JSON.parse(node.data);

  //             // Validate headers
  //             const headers = nodeDataV2?.operations_header || [];
  //             for (const header of headers) {
  //               const error = checkConnections(
  //                 node.id,
  //                 header.test_value,
  //                 nodeDataV2.node_name,
  //                 edgesArray,
  //                 nodesArray,
  //                 flowYdoc,
  //                 initialFlowId,
  //                 user_id
  //               );
  //             }

  //             const queryParams = nodeDataV2?.operations_query_param || [];
  //             for (const input of queryParams) {
  //               const error = checkConnections(
  //                 node.id,
  //                 input.test_value,
  //                 nodeData.node_name,
  //                 edgesArray,
  //                 nodesArray,
  //                 flowYdoc,
  //                 initialFlowId,
  //                 user_id
  //               );
  //             }

  //             // Validate raw_payload
  //             if (nodeDataV2.raw_payload) {
  //               try {
  //                 // Try parsing the JSON
  //                 const error = checkConnections(
  //                   node.id,
  //                   nodeDataV2.raw_payload,
  //                   nodeDataV2.node_name,
  //                   edgesArray,
  //                   nodesArray,
  //                   flowYdoc,
  //                   initialFlowId,
  //                   user_id
  //                 );
  //               } catch (error: any) {}
  //             }
  //           }
  //         }
  //       }
  //     };

  //     // Add event listener for clicks outside
  //     document.addEventListener("mousedown", handleClickOutside);

  //     // Cleanup event listener on component unmount
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     setHeaders(
  //       nodeData?.operations_header ? [...nodeData.operations_header] : []
  //     );
  //     setInputs(nodeData?.operations_input ? [...nodeData.operations_input] : []);
  //     setInputsPayload(nodeData?.raw_payload ?? "");
  //     setAuths(nodeData?.operations_auth ? [...nodeData.operations_auth] : []);
  //     setQuerys(
  //       nodeData?.operations_query_param
  //         ? [...nodeData.operations_query_param]
  //         : []
  //     );
  //   }, [nodeData]);

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
        border: `3px solid ${theme.palette.mainRed.main}`,
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
        {nodeData?.changeType.split("-")[0] + " - DELETED_NODE" ||
          "CURRENT_NODE"}
      </div>

      <WorkflowCustomHandle
        type="target"
        position={Position.Left}
        id={nodeData?.id + "_input"}
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
      </Box>

      <WorkflowCustomHandle
        type="source"
        position={Position.Right}
        id={nodeData?.id + "_success"}
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
        id={nodeData?.id + "_failure"}
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
