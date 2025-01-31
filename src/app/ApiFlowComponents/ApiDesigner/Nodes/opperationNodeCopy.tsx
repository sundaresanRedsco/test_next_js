import React, {
    useRef,
    useCallback,
    useEffect,
    useState,
    useMemo,
  } from "react";
  import { Connection, Handle, Position, useReactFlow } from "reactflow";
  import WarningIcon from "@mui/icons-material/Warning";
  import GButton from "../../../Components/Global/GlobalButtons";
  import { Box, Button, Popover, Typography, useTheme } from "@mui/material";
  import CloseIcon from "../../../Assests/icons/closeIcon.svg";
  import DeleteIcon from "../../../Assests/icons/deleted.svg";
  import TotalProjects from "../../../Assests/icons/TotalProjectsIcon.svg";
  import CustomHandle from "../customHandle";
  import {
    PrimaryTypography,
    SecondaryTypography,
  } from "../../../Styles/signInUp";
  import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
  import { useDispatch } from "react-redux";
  
  import { useSelector } from "react-redux";
  import { RootStateType } from "../../../Redux/store";
  import {
    FlowReducer,
    GetNodeChangeManByFlowNodeId,
    RunSingleNode,
    setGlobalResponse,
  } from "../../../Redux/apiManagement/flowReducer";
  import toast from "react-hot-toast";
  import { CommonReducer } from "../../../Redux/commonReducer";
  
  import Accordion from "@mui/material/Accordion";
  import AccordionSummary from "@mui/material/AccordionSummary";
  import AccordionDetails from "@mui/material/AccordionDetails";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import {
    convertToMilliSeconds,
    getCookies,
    replacePlaceholders,
    updateArray,
  } from "../../../Helpers/helpersFunctions";
  import { v4 as uuidv4 } from "uuid";
  import TextEditor from "../TextEditor/textEditor";
  import AceEditorComponent from "../../AceEditor/aceEditor";
  import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
  import InfoIcon from "@mui/icons-material/Info";
  import GSelect from "../../../Components/Global/GSelect";
  import { RenderNoDataFound } from "../renderNoDataFound";
  import * as Y from "yjs";
  import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
  
  import { ChangeNodeManage } from "../ChangeHistoryDesigner/ChangeNodeManage";
  import { ManageAccounts } from "@mui/icons-material";
  import {
    BackgroundUrlList,
    GetOperationById,
  } from "../../../Redux/apiManagement/projectReducer";
  import { useRouter, usePathname } from "next/navigation"; // For Next.js 13+
  import { styled } from "@mui/system";
  
  type YDoc = Y.Doc;
  
  const dataTypes = [
    { id: "STRING", label: "String" },
    { id: "BOOLEAN", label: "Boolean" },
    { id: "INTEGER", label: "Integer" },
    { id: "FLOAT", label: "Float" },
  ];
  
  export const HeadingTypography = styled(Typography)`
    font-family: Inter-Regular;
    color: black;
  
    font-weight: 600;
    font-size: 0.8rem;
    wordwrap: break-word;
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
    console.log(matches, "errorCOn1");
  
    for (const match of matches) {
      for (const node of nodesArray) {
        if (node.type !== "startButtonNode" && node.data) {
          const nodeData = JSON.parse(node.data);
          if (nodeData.node_name === match) {
            let update_data = nodeData.id;
            let existingEdge = edgesArray.find(
              (x: any) => x.source === update_data && x.target === node_id
            );
            console.log(existingEdge, "existingEdge");
  
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
        stroke: "#4CAF50",
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
      console.log("Yjs Map 'edgeMap' is not initialized.");
    }
  };
  
  export default function OperationNode({ data }: any) {
    const { deleteElements, getEdges, getNode, getNodes } = useReactFlow();
    const theme = useTheme();
  
    const router = useRouter();
    const pathname = usePathname();
  
    console.log(parseData(data), "newnode@");
  
    const nodeData = useMemo(() => parseData(data) || {}, [data]);
  
    console.log(nodeData, "newnodeDatasas");
  
    const popoverRef = useRef<any>(null);
  
    console.log("nodeData", nodeData?.operations_header);
  
    const [headers, setHeaders] = useState<any>(
      nodeData?.operations_header ? [...nodeData?.operations_header] : []
    );
  
    console.log(headers, "headerssds");
  
    const [inputs, setInputs] = useState<any>(
      nodeData?.operations_input ? [...nodeData.operations_input] : []
    );
  
    const [backgroundUrlClicked, setbackgroundUrlClicked] = useState<any>(false);
    const [operationDetails, setOperationDetails] = useState<any>(false);
    const [backgroundUrlData, setBackgroundUrlData] = useState<any>([]);
  
    const [inputsPayload, setInputsPayload] = useState<any>(
      nodeData?.raw_payload ?? ""
    );
  
    console.log(inputsPayload, "inputsPayloaddf");
  
    const [auths, setAuths] = useState<any>(
      nodeData?.operations_auth ? [...nodeData.operations_auth] : []
    );
  
    const [querys, setQuerys] = useState<any>(
      nodeData?.operations_query_param ? [...nodeData.operations_query_param] : []
    );
  
    const [sizeAccClicked, setSizeAccClicked] = useState(false);
    const [timeAccClicked, setTimeAccClicked] = useState(false);
  
    const initialFlowId = pathname.split("/")[6];
    const flowIdVal = getCookies(process.env.NEXT_PUBLIC_COOKIE_FLOWID ?? "");
    const dispatch = useDispatch<any>();
  
    const { nextNode, flowYdoc, globalKeys, globalResponse, isEditable } =
      useSelector<RootStateType, FlowReducer>(
        (state) => state.apiManagement.apiFlowDesign
      );
  
    const { userProfile } = useSelector<RootStateType, CommonReducer>(
      (state) => state.common
    );
  
    // console.log("DataOperationNode: ", data)
  
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
        console.log("Yjs Map 'edges' is not initialized.");
      }
  
      const nodesMap = flowYdoc?.getMap<any>("nodes");
      if (nodesMap) {
        nodesMap?.set(nodeToRemoveId, updatedNode);
      } else {
        console.log("Yjs Map 'run' is not initialized.");
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
  
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
    );
    const [anchorElInput, setAnchorElInput] =
      React.useState<HTMLButtonElement | null>(null);
  
    const [currentResultRun, setCurrentResultRun] = useState<any>({});
    const [inputClicked, setInputClicked] = useState(false);
    const [headerClicked, setHeaderClicked] = useState(false);
    const [queryClicked, setQueryClicked] = useState(false);
    const [globalKeysClicked, setGlobalKeysClicked] = useState(false);
    const [responseClicked, setResponseClicked] = useState(false);
    const [currentNodeRun, setCurrentNodeRun] = useState(false);
    const [warning, setWarning] = useState<any>("");
    const [operationDeleteEditStatus, setOperationDeleteEditStatus] =
      useState("");
  
    const [changeManClicked, setChangeManClicked] = useState(false);
    const [changeManResponse, setChangeManResponse] = useState<any>({});
  
    const handleInputDataFromAceEditor = useCallback(
      (val: any) => {
        setInputsPayload(val);
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
      },
      [flowYdoc, nodeData?.id]
    );
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  
      console.log("runData running");
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      console.log("handleClose");
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
      // console.log("EventCurrentTarget: ", event);
  
      // console.log("Node: ", nodeValues);
    };
  
    const handleClickQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElInput(event.currentTarget);
      setQueryClicked(true);
      setHeaderClicked(false);
      setInputClicked(false);
      setResponseClicked(false);
  
      setGlobalKeysClicked(false);
  
      // console.log("EventCurrentTarget: ", event);
  
      // console.log("Node: ", nodeValues);
    };
  
    const handleClickResponse = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElInput(event.currentTarget);
      setResponseClicked(true);
      setInputClicked(false);
      setHeaderClicked(false);
  
      setQueryClicked(false);
      setGlobalKeysClicked(false);
      // console.log("EventCurrentTarget: ", event);
  
      // console.log("Node: ", nodeValues);
    };
  
    const handleGlobalKeys = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElInput(event.currentTarget);
      setResponseClicked(false);
      setInputClicked(false);
      setHeaderClicked(false);
  
      setQueryClicked(false);
      setGlobalKeysClicked(true);
      // console.log("EventCurrentTarget: ", event);
  
      // console.log("Node: ", nodeValues);
    };
  
    const checkSensitiveInformation = (text: string) => {
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
      name: any,
      value: string,
      details: any,
      index: any,
      type: any
    ) => {
      console.log("HeaderCheck: ", name, value);
      const detailsCheck = { ...details };
      const tempEventInputs = JSON.parse(JSON.stringify(detailsCheck));
      console.log(tempEventInputs, "tempEventInputs");
  
      // if (e.target) {
      //   tempEventInputs[e.target.name] = e.target.value;
      // }
  
      if (name) {
        tempEventInputs[name] = value;
      }
      console.log("TempAfter: ", tempEventInputs);
  
      if (type === "input") {
        setInputs((prevState: any) => {
          prevState[index] = tempEventInputs;
          return [...prevState];
        });
      } else if (type === "headers") {
        // const warningMessage = checkSensitiveInformation(value);
        // setWarning(warningMessage);
  
        setHeaders((prevState: any) => {
          prevState[index] = tempEventInputs;
          return [...prevState];
        });
      } else if (type === "auths") {
        setAuths((prevState: any) => {
          prevState[index] = tempEventInputs;
          return [...prevState];
        });
      } else {
        // const warningMessage = checkSensitiveInformation(value);
        // setWarning(warningMessage);
  
        setQuerys((prevState: any) => {
          prevState[index] = tempEventInputs;
          return [...prevState];
        });
      }
      console.log(inputs, "inputs");
      console.log(headers, "HEadersCheck");
      const nodesMap = flowYdoc?.getMap<any>("nodes");
  
      // const messagesArrayNew = messagesArray.toArray();
      // console.log(messagesArrayNew, "messagesArrayNew");
      let currentData: any = getNode(nodeData?.id);
      console.log(currentData, "currentDataDrag");
  
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
        console.log("operations_header: ", headers);
      } else {
        console.log("Yjs Map 'run' is not initialized.");
      }
    };
  
    // const onChangeHandler = (
    //   name: any,
    //   value: string,
    //   details: any,
    //   index: number,
    //   type: any
    // ) => {
    //   console.log("HeaderCheck: ", name, value);
    //   const tempEventInputs = { ...details, [name]: value }; // Update field in a cloned object
    //   console.log("TempAfter: ", tempEventInputs);
  
    //   if (type === "headers") {
    //     const warningMessage = checkSensitiveInformation(value);
  
    //     // Update warnings immutably
    //     setWarning((prevWarnings: any[]) => {
    //       const newWarnings = [...prevWarnings];
    //       newWarnings[index] = warningMessage;
    //       return newWarnings;
    //     });
  
    //     // Update headers immutably
    //     setHeaders((prevState: any[]) => {
    //       const newHeaders = [...prevState];
    //       newHeaders[index] = tempEventInputs; // Replace the specific header
    //       return newHeaders;
    //     });
    //   } else if (type === "input") {
    //     setInputs((prevState: any[]) => {
    //       const newInputs = [...prevState];
    //       newInputs[index] = tempEventInputs; // Replace the specific input
    //       return newInputs;
    //     });
    //   } else if (type === "auths") {
    //     setAuths((prevState: any[]) => {
    //       const newAuths = [...prevState];
    //       newAuths[index] = tempEventInputs; // Replace the specific auth
    //       return newAuths;
    //     });
    //   } else {
    //     const warningMessage = checkSensitiveInformation(value);
  
    //     setWarning((prevWarnings: any[]) => {
    //       const newWarnings = [...prevWarnings];
    //       newWarnings[index] = warningMessage;
    //       return newWarnings;
    //     });
  
    //     setQuerys((prevState: any[]) => {
    //       const newQuerys = [...prevState];
    //       newQuerys[index] = tempEventInputs; // Replace the specific query
    //       return newQuerys;
    //     });
    //   }
  
    //   console.log(inputs, "inputs");
    //   console.log(headers, "HEadersCheck");
  
    //   const nodesMap = flowYdoc?.getMap<any>("nodes");
    //   let currentData: any = getNode(nodeData?.id);
  
    //   if (nodesMap) {
    //     nodesMap.set(nodeData?.id, {
    //       action: "EDIT_NODE",
    //       status: "null",
    //       id: nodeData?.id,
    //       nodes: {
    //         ...currentData,
    //         data: JSON.stringify({
    //           ...nodeData,
    //           operations_header: headers,
    //           operations_input: inputs,
    //           operations_auth: auths,
    //           operations_query_param: querys,
    //         }),
    //       },
    //     });
    //     console.log("operations_header: ", headers);
    //   } else {
    //     console.log("Yjs Map 'run' is not initialized.");
    //   }
    // };
  
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
        console.log("Yjs Map 'run' is not initialized.");
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
        console.log("Yjs Map 'run' is not initialized.");
      }
    };
  
    const onKeyHandler = (name: string, value: any, id: string) => {
      if (!flowYdoc) {
        console.error("Yjs document is not available.");
        return;
      }
  
      // const warningMessage = checkSensitiveInformation(value);
      // setWarning(warningMessage);
      // Update the globalKeys state
      const newGlobalKeys = globalKeys?.map((item: any) =>
        item?.id === id ? { ...item, [name]: value } : item
      );
      console.log("newGlobalKeyssdsdsdsd", newGlobalKeys);
  
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
      console.log("NodeCHecK: ", headers);
  
      const nodesMap = flowYdoc?.getMap<any>("nodes");
      let currentData: any = getNode(nodeData?.id);
  
      // Prepare the new node data based on the type
      let newNodeData = { ...nodeData };
      console.log("NodeCHecK: ", newNodeData, updatedData, currentData);
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
          console.log("Unknown type");
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
        console.log("NodeCHecK: ", nodeData, nodesMap);
      } else {
        console.log("Yjs Map 'run' is not initialized.");
      }
    };
  
    const handleCloseInput = () => {
      setAnchorElInput(null);
      setWarning([]);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
  
    const formatWithLineNumbers = (text: string) => {
      return (text ?? "")
        .split("\n")
        .map((line: string, index: number) => `${index + 1}. ${line}`)
        .join("\n");
    };
  
    useEffect(() => {
      if (!flowYdoc) return;
      const runMap = flowYdoc?.getMap<any>("run");
      console.log("FlowYDoc: ", flowYdoc, runMap.toJSON(), runMap?.size);
  
      // const editNodesArry = ydoc.getArray<any>("nodes");
  
      const runFlow = () => {
        console.log("call");
        let runData = runMap?.toJSON();
        console.log(runData, "runData");
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
  
    console.log("CurrentResultRun: ", currentResultRun?.response);
  
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
  
    console.log("GlobalResponse: ", globalResponse);
  
    const RunHandler = () => {
      let payload;
      try {
        payload = JSON.parse(nodeData?.raw_payload || "{}");
      } catch (error: any) {
        toast.error(
          `${nodeData?.node_name || "Unknown Node"}:Input Error parsing JSON: ${
            error.message
          }`
        );
      }
      // const payload = JSON.parse(nodeData?.raw_payload || "{}");
  
      console.log(nodeData?.operations_header, headers, "operations_header");
      console.log(nodeData?.raw_payload, "raw_payloadsdsdsd");
  
      // let response = previousOpRaw || null;
  
      let response = globalResponse || null;
  
      const new_payload = replacePlaceholders(payload, { response }, globalKeys);
  
      // console.log(new_payload,"new_payload");
      console.log(globalKeys, "globalKeys");
  
      let headersArr = nodeData.operations_header || [];
      let globalHeaders = globalKeys?.filter(
        (x: any) => x.include === true && x.node_id !== nodeData.id
      );
  
      let globalBody = globalKeys?.filter(
        (x: any) => x.body_include === true && x.node_id !== nodeData.id
      );
  
      // "key":"value"
      console.log("KEYCheck: ", globalHeaders);
  
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
  
      console.log(new_payload, "newpaydata");
  
      let updatedData = {
        operation_id: nodeData.operation_id,
        flow_id: initialFlowId,
        node_id: nodeData.id,
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
      console.log(updatedData.data, "operations_query_param");
      setCurrentNodeRun(true);
      dispatch(RunSingleNode(updatedData))
        .unwrap()
  
        .then((res: any) => {
          setCurrentNodeRun(false);
          console.log(res, "nodeRunResult");
          const responceResult = {
            serviceInput: res?.serviceInput,
            response: res?.response,
            statusCode: res?.statusCode,
          };
  
          console.log(responceResult, "responceResult");
  
          // if (res.statusCode >= 200 && res.statusCode < 300) {
          const nodesMap = flowYdoc?.getMap<any>("nodes");
          let currentData: any = getNode(nodeData?.id);
          console.log(currentData, "currentDataDrag");
  
          if (nodesMap) {
            nodesMap.set(nodeData?.id, {
              action: "EDIT_NODE",
              status: "null",
              id: nodeData?.id,
              nodes: {
                response: responceResult,
                ...currentData,
                data: JSON.stringify({
                  ...nodeData,
                  // raw_output: res?.response?.apiResponse,
                }),
              },
            });
          } else {
            console.log("Yjs Map 'run' is not initialized.");
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
          console.log(err);
          setCurrentNodeRun(false);
        });
    };
  
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
  
    console.log("NodeData: ", nodeData);
  
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
          minWidth: 230,
          minHeight: 120,
  
          background: theme.palette.primaryWhite.main,
          animation:
            nextNode?.includes(nodeData?.id) || currentNodeRun
              ? "blinkShadow 3s infinite"
              : "",
          border:
            currentResultRun?.status == "SUCCESS"
              ? "2px solid #48C9B0"
              : currentResultRun?.status == "FAILED"
              ? "2px solid #FF5252"
              : "2px solid" + nodeData?.color || "transparent",
        }}
        className="rounded"
      >
        {nodeData?.dragger && userProfile?.user?.email !== nodeData?.dragger && (
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
            {/* {draggingDetails?.user.name} */}
            {nodeData?.dragger}
          </div>
        )}
  
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
                <HeadingTypography>Operation Details</HeadingTypography>
  
                <div
                  style={{
                    padding: "10px",
                  }}
                >
                  <pre>
                    <SecondaryTypography>
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
                    </SecondaryTypography>
                  </pre>
  
                  <SecondaryTypography
                    style={{
                      color: `${theme.palette.teritiaryColor.main}`,
                      marginLeft: "10px",
                    }}
                  >
                    Here is the list of background url for the operation{" "}
                  </SecondaryTypography>
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
                            <SecondaryTypography>
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
                            </SecondaryTypography>
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
  
        <CustomHandle
          type="target"
          position={Position.Left}
          id={nodeData?.id + "_input"}
          // isConnectable={3}
          style={{ height: "15px", width: "2px" }}
          isValidConnection={isValidConnection}
        />
  
        <Box
          className="p-2 rounded"
          sx={{
            // background: theme.palette.primaryBody.main,
            background: `#eaecf3`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <SecondaryTypography
              style={{
                marginLeft: "10px",
                fontSize: "0.7rem",
                cursor: "grabbing",
              }}
            >
              {nodeData.node_name}
            </SecondaryTypography>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <Button
                sx={{
                  "&.MuiButton-root:hover path": {
                    fill: "red",
                  },
                  backgroundColor: "unset !important",
                  marginLeft: "auto",
                  width: "max-content",
                }}
              >
                {isEditable && (
                  <DeleteIcon
                    className="position-absolute"
                    style={{
                      width: "12px",
                      height: "12px",
                      fill: theme.palette.v2PrimaryColor.main,
                      right: "5px",
                      cursor: "pointer",
                      transition: "fill 0.1s ease",
                    }}
                    onClick={onClick}
                  />
                )}
              </Button>
            </div>
            <div>
              <PlayArrowOutlinedIcon
                style={{
                  color: `${theme.palette.v2PrimaryColor.main}`,
                  fontSize: "18px",
                }}
                onClick={() => {
                  RunHandler();
                }}
              />
            </div>
  
            <div>
              <ManageAccounts
                style={{
                  color: `${theme.palette.v2PrimaryColor.main}`,
                  fontSize: "18px",
                }}
                onClick={() => {
                  dispatch(GetOperationById(nodeData?.operation_id))
                    .unwrap()
                    .then((operRes: any) => {
                      setOperationDetails(operRes[0]);
                    })
                    .catch((error: any) => {
                      console.log("Error: ", error);
                    });
                  dispatch(BackgroundUrlList(nodeData?.operation_id))
                    .unwrap()
                    .then((changeRes: any) => {
                      console.log("ChangeRes: ", changeRes);
                      setBackgroundUrlData(changeRes);
                      setbackgroundUrlClicked(true);
                    })
                    .catch((error: any) => {
                      console.log("Error: ", error);
                    });
                }}
              />
            </div>
            <div>
              <ChangeCircleOutlinedIcon
                style={{
                  color: `${theme.palette.v2PrimaryColor.main}`,
                  fontSize: "18px",
                }}
                onClick={() => {
                  let data = {
                    flow_id: flowIdVal,
                    node_id: nodeData?.id,
                  };
  
                  dispatch(GetNodeChangeManByFlowNodeId(data))
                    .unwrap()
                    .then((changeRes: any) => {
                      console.log("ChangeRes: ", changeRes);
                      setChangeManResponse(changeRes);
                      setChangeManClicked(!changeManClicked);
                    })
                    .catch((error: any) => {
                      console.log("Error: ", error);
                      toast.error("no data found");
                    });
                }}
              />
            </div>
          </div>
        </Box>
        <div className="px-1 mt-2">
          <Box
            sx={{
              overflowWrap: "anywhere",
              // background: "#f1eeff",
              // color: theme.palette.v2PrimaryColor.main,
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                marginRight: "16px",
                fontFamily: "Inter-Regular",
              }}
            >
              <div style={{ display: "flex" }}>
                <TotalProjects
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                  stroke={theme.palette.v2PrimaryColor.main}
                />
                <SecondaryTypography
                  style={{
                    color:
                      nodeData?.method === "GET"
                        ? "green"
                        : nodeData?.method === "POST"
                        ? "#FDA556"
                        : nodeData?.method === "PUT"
                        ? `${theme.palette.primaryBlue.main}`
                        : nodeData?.method === "DELETE"
                        ? `${theme.palette.mainRed.main}`
                        : "",
                    fontWeight: 600,
                    marginLeft: "3px",
                    // cursor: "grabbing",
                  }}
                >
                  {nodeData?.method}
                </SecondaryTypography>
                <SecondaryTypography
                  style={{
                    marginLeft: "5px",
                    // cursor: "grabbing",
                    maxWidth: "100px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    fontWeight: 600,
                  }}
                >
                  {nodeData?.name}
                </SecondaryTypography>
              </div>
            </label>
  
            <Button
              // aria-describedby={id}
              // variant="contained"
              onClick={handleClick}
              sx={{
                backgroundColor: "transparent",
                textTransform: "none",
                cursor: "pointer",
              }}
            >
              {/* View Input & Headers */}
              <SecondaryTypography
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: `${theme.palette.v2PrimaryColor.main}`,
                  // marginBottom: "5px",
                  cursor: "pointer",
                }}
              >
                Input & Responses
              </SecondaryTypography>
            </Button>
  
            {changeManClicked === true && (
              <ChangeNodeManage
                node_id={nodeData?.id}
                changeManClicked={changeManClicked}
                setChangeManClicked={setChangeManClicked}
                node_name={nodeData?.node_name}
                changeManResponse={changeManResponse}
              />
            )}
  
            {operationDeleteEditStatus && (
              <div>
                <SecondaryTypography
                  style={{
                    color: `${theme.palette.teritiaryColor.main}`,
                    fontWeight: 600,
                  }}
                >
                  <InfoIcon
                    style={{
                      fontSize: "11px",
                      marginRight: "3px",
                      color: `${theme.palette.v2PrimaryColor.main}`,
                    }}
                  />
                  {operationDeleteEditStatus}
                </SecondaryTypography>
              </div>
            )}
  
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
                  <SecondaryTypography
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
                  </SecondaryTypography>
                  {/* <hr /> */}
                  <SecondaryTypography
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
                  </SecondaryTypography>
                  <SecondaryTypography
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
                  </SecondaryTypography>
                  <SecondaryTypography
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
                  </SecondaryTypography>
                  {/* <hr /> */}
                  <SecondaryTypography
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
                    onClick={handleClickResponse}
                    // onMouseEnter={handleClickResponse}
                    // onMouseLeave={handleCloseInput}
                  >
                    Response
                    <span>
                      <ChevronRightOutlinedIcon
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </span>
                  </SecondaryTypography>
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
                  {inputClicked === true ? (
                    <>
                      <PrimaryTypography
                        style={{
                          fontWeight: 900,
                        }}
                      >
                        Operation Input
                      </PrimaryTypography>
  
                      {/*Ace Editor*/}
                      <AceEditorComponent
                        onInputVal={handleInputDataFromAceEditor}
                        defaultInputVal={inputsPayload}
                        currentNode={nodeData.node_name}
                        // suggestionVal={previousOpRaw}
                      />
                    </>
                  ) : headerClicked === true ? (
                    <>
                      <>
                        <PrimaryTypography
                          style={{
                            fontWeight: 900,
                          }}
                        >
                          Operation Header
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
                            <>
                              <div style={{ marginTop: "1rem" }}>
                                {warning[index] && (
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
  
                              <SecondaryTypography>
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
                              </SecondaryTypography>
  
                              <SecondaryTypography
                                style={{ margin: "1rem 0rem" }}
                              >
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
                              </SecondaryTypography>
  
                              <SecondaryTypography>
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
                                      "headers"
                                    );
                                  }}
                                  multiline
                                />
                              </SecondaryTypography>
  
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
                            </>
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
                            <>
                              <div style={{ marginTop: "1rem" }}>
                                {warning[index] && (
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
  
                              <SecondaryTypography>
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
                              </SecondaryTypography>
  
                              <SecondaryTypography>
                                {`Value: `}
                                <TextEditor
                                  inputData={val?.test_value}
                                  currentNode={nodeData?.node_name}
                                  // objectToSuggest={previousOpRaw}
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
  
                                {/* <input
                                  value={val?.test_value}
                                  className="form-control my-1"
                                  name="test_value"
                                  onChange={(e) => {
                                    onChangeHandler("test_value", e.target.value,val, index, "query");
                                  }}
                                /> */}
                              </SecondaryTypography>
  
                              <SecondaryTypography
                                style={{ margin: "1rem 0rem" }}
                              >
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
                              </SecondaryTypography>
  
                              {val?.scope != "path" && (
                                <GButton
                                  buttonType="secondary"
                                  label={"Remove"}
                                  onClickHandler={() => {
                                    const updatedQuery = querys.filter(
                                      (_: any, i: any) => i !== index
                                    );
                                    console.log(
                                      "NodeCHecK: ",
                                      nodeData,
                                      updatedQuery
                                    );
                                    updateNodeData(updatedQuery, "query");
                                    setQuerys(updatedQuery);
                                  }}
                                />
                              )}
                            </>
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
  
                        {warning && (
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
                        )}
  
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
                                console.log("test_globalKeys");
                                const keysArray = flowYdoc.getArray("globalkeys");
                                keysArray.push([newkeys]);
                              }
                            }}
                          />
  
                          {globalKeys
                            ?.filter((x) => x.node_id == nodeData.id)
                            ?.map((val: any, index: number) => (
                              <>
                                <SecondaryTypography>
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
                                </SecondaryTypography>
  
                                <SecondaryTypography>
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
                                </SecondaryTypography>
  
                                <SecondaryTypography>
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
                                </SecondaryTypography>
  
                                {val?.include && (
                                  <>
                                    <SecondaryTypography>
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
                                    </SecondaryTypography>
  
                                    <SecondaryTypography>
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
                                    </SecondaryTypography>
                                  </>
                                )}
  
                                <SecondaryTypography>
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
                                </SecondaryTypography>
  
                                {val?.body_include && (
                                  <>
                                    <SecondaryTypography>
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
                                    </SecondaryTypography>
                                  </>
                                )}
  
                                <GButton
                                  buttonType="secondary"
                                  label={"Remove"}
                                  onClickHandler={() => {
                                    console.log("ValID: ", val?.id);
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
                                      <SecondaryTypography
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
                                      </SecondaryTypography>
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
                                          <SecondaryTypography>
                                            Request Body Size:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            Request Header Size:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            Response Body Size:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            Responce Header Size:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
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
                                      <SecondaryTypography
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
                                      </SecondaryTypography>
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
                                          <SecondaryTypography>
                                            Dns Lookup Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            Download Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            Response Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            SSL Handshake Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            Total Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            TransferStart Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                          <SecondaryTypography>
                                            TCP Handshake Time:{" "}
                                          </SecondaryTypography>
                                          <SecondaryTypography
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
                                          </SecondaryTypography>
                                        </div>
                                      </Box>
                                    </div>
                                  </AccordionDetails>
                                </Accordion>
                              </div>
                              <div style={{ marginTop: "-10px" }}>
                                <SecondaryTypography>
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
                                </SecondaryTypography>
                              </div>
  
                              {data?.currentResultRun?.node_id !== undefined ? (
                                <>
                                  <SecondaryTypography
                                    style={{
                                      margin: "10px",
                                      fontSize: "12px",
                                      fontWeight: 900,
                                      color: `${theme.palette.teritiaryColor.main}`,
                                    }}
                                  >
                                    No data found
                                  </SecondaryTypography>
                                </>
                              ) : (
                                <>
                                  <div style={{ marginTop: "5px" }}>
                                    <SecondaryTypography
                                      style={{
                                        fontWeight: 900,
                                      }}
                                    >
                                      Response:
                                    </SecondaryTypography>
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
          </Box>
        </div>
        {/* <Handle type="target" position={Position.Bottom} id="a" /> */}
        <CustomHandle
          type="source"
          position={Position.Right}
          id={nodeData?.id + "_success"}
          // isConnectable={3}
          style={{ height: "15px", width: "2px", background: "#4CAF50" }}
          isValidConnection={isValidConnection}
        />
        <CustomHandle
          type="source"
          position={Position.Right}
          id={nodeData?.id + "_failure"}
          // isConnectable={3}
          style={{
            height: "15px",
            width: "2px",
            marginTop: "25px",
            background: "#FF5252",
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
    );
  }