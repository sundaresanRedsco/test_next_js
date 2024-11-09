import React, { useRef, useEffect, useState } from "react";
import { Position, useReactFlow } from "reactflow";
import GButton from "../../../Components/Global/GlobalButtons";
import theme from "../../../../Theme/theme";
import { Box, Button, Popover } from "@mui/material";
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
  RunSingleNode,
} from "../../../Redux/apiManagement/flowReducer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  convertToMilliSeconds,
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
import { useRouter, usePathname } from "next/navigation"; // For Next.js 13+

type YDoc = Y.Doc;

const dataTypes = [
  { id: "STRING", label: "String" },
  { id: "BOOLEAN", label: "Boolean" },
  { id: "INTEGER", label: "Integer" },
  { id: "FLOAT", label: "Float" },
];

export default function OperationChangeNode({ data }: any) {
  const { getEdges, getNode, getNodes } = useReactFlow();

  const router = useRouter();
  const pathname = usePathname();

  // const [nodeData, setNodeData] = useState(parseData(data));

  // let edgeData = getEdges();
  // console.log("edgeData   : ", edgeData)

  const nodeData = parseData(data);

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
  const [inputsPayload, setInputsPayload] = useState<any>(
    nodeData?.raw_payload ?? ""
  );

  const [auths, setAuths] = useState<any>(
    nodeData?.operations_auth ? [...nodeData.operations_auth] : []
  );

  const [querys, setQuerys] = useState<any>(
    nodeData?.operations_query_param ? [...nodeData.operations_query_param] : []
  );

  const [sizeAccClicked, setSizeAccClicked] = useState(false);
  const [timeAccClicked, setTimeAccClicked] = useState(false);

  const initialFlowId = pathname.split("/")[6];

  const dispatch = useDispatch<any>();

  const { nextNode, flowYdoc, globalKeys, globalResponse } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);

  // console.log("DataOperationNode: ", data)

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

  const [currentResultRun, setCurrentResultRun] = useState<any>(
    nodeData?.response || {}
  );
  const [inputClicked, setInputClicked] = useState(false);
  const [headerClicked, setHeaderClicked] = useState(false);
  const [queryClicked, setQueryClicked] = useState(false);
  const [globalKeysClicked, setGlobalKeysClicked] = useState(false);
  const [responseClicked, setResponseClicked] = useState(false);
  const [currentNodeRun, setCurrentNodeRun] = useState(false);

  const [operationDeleteEditStatus, setOperationDeleteEditStatus] =
    useState("");

  console.log("QueryParam: ", nodeData?.operations_query_param, nodeData, data);

  const handleInputDataFromAceEditor = (val: any) => {
    setInputsPayload(val);
    console.log("CheckingPropVal: ", val);
    const nodesMap = flowYdoc?.getMap<any>("nodes");
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
            raw_payload: val,
          }),
        },
      });
    } else {
      console.log("Yjs Map 'run' is not initialized.");
    }
  };

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

  const onChangeHandler = (
    name: any,
    value: string,
    details: any,
    index: any,
    type: any
  ) => {
    const tempEventInputs = JSON.parse(JSON.stringify(details));
    console.log(tempEventInputs, "tempEventInputs");

    // if (e.target) {
    //   tempEventInputs[e.target.name] = e.target.value;
    // }

    if (name) {
      tempEventInputs[name] = value;
    }
    if (type === "input") {
      setInputs((prevState: any) => {
        prevState[index] = tempEventInputs;
        return [...prevState];
      });
    } else if (type === "headers") {
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
      setQuerys((prevState: any) => {
        prevState[index] = tempEventInputs;
        return [...prevState];
      });
    }
    console.log(inputs, "inputs");
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
    } else {
      console.log("Yjs Map 'run' is not initialized.");
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
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const formatWithLineNumbers = (text: any) => {
    return (text ?? "")
      .split("\n")
      .map((line: any, index: any) => `${index + 1}. ${line}`)
      .join("\n");
  };

  // useEffect(() => {
  //   if (!flowYdoc) return;
  //   const runMap = flowYdoc?.getMap<any>("run");
  //   console.log("FlowYDoc: ", flowYdoc, runMap.toJSON(), runMap?.size);

  //   // const editNodesArry = ydoc.getArray<any>("nodes");

  //   const runFlow = () => {
  //     console.log("call");
  //     let runData = runMap?.toJSON();
  //     console.log(runData, "runData");
  //     if (runData.run.status === "RUNNING") {
  //       let updateRun = runData?.run?.run_result.find(
  //         (x: any) => x?.node_id == nodeData?.id
  //       );
  //       setCurrentResultRun(updateRun);
  //     }
  //   };

  //   runMap.observe(runFlow);

  //   return () => {
  //     runMap.unobserve(runFlow);
  //   };
  // }, []);

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
    const payload = JSON.parse(nodeData?.raw_payload || "{}");

    console.log(nodeData?.operations_query_param, "operations_query_param");
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
          nodeData?.operations_header,
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
        setCurrentResultRun(res);
      })
      .catch((err: any) => {
        console.log(err);
        setCurrentNodeRun(false);
      });
  };

  console.log("NodeData: ", nodeData);

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
          // currentResultRun?.status == "SUCCESS"
          //   ? "2px solid #48C9B0"
          //   : currentResultRun?.status == "FAILED"
          //   ? "2px solid #FF5252"
          //   : "2px solid" + nodeData?.color ||
          //     // : "2px solid" + draggingDetails?.dragging?.dragcolor ||
          //     "transparent",
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
      className="rounded "
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
          fontWeight: "700",
          color: nodeData?.changeType?.includes("MODIFIED_NODE")
            ? `${theme.palette.mainYellow.main}`
            : nodeData?.changeType?.includes("ADDED_NODE")
            ? `${theme.palette.mainGreen.main}`
            : nodeData?.changeType?.includes("DELETED_NODE")
            ? `${theme.palette.mainRed.main}`
            : `#babbbf`,
        }}
      >
        {/* {draggingDetails?.user.name} */}
        {nodeData?.changeType || "CURRENT_NODE"}
      </div>

      <CustomHandle
        type="target"
        position={Position.Left}
        id={nodeData?.id + "_input"}
        // isConnectable={3}
        style={{ height: "15px", width: "2px" }}
        // isValidConnection={isValidConnection}
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
            <PlayArrowOutlinedIcon
              style={{
                color: `${theme.palette.primaryPurple.main}`,
                fontSize: "18px",
              }}
              onClick={() => {
                RunHandler();
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
            // color: theme.palette.primaryPurple.main,
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
              {/* <TotalProjects
                style={{
                  width: "13px",
                  height: "13px",
                }}
                stroke={theme.palette.primaryPurple.main}
              /> */}
              <TotalProjects />
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
                color: `${theme.palette.primaryPurple.main}`,
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              Input & Responsess
            </SecondaryTypography>
          </Button>
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
                    color: `${theme.palette.primaryPurple.main}`,
                  }}
                />
                {operationDeleteEditStatus}
              </SecondaryTypography>
            </div>
          )}

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

                    {/* <div ref={editorRef} style={{ height: '400px' }} /> */}

                    {/* <textarea
                      style={{
                        fontSize: "0.7rem",
                        width: "300px",
                        minHeight: "200px",
                      }}
                      value={inputsPayload}
                      onChange={(e) => {
                        const nodesMap = flowYdoc?.getMap<any>("nodes");
                        setInputsPayload(e.target.value);

                        // const messagesArrayNew = messagesArray.toArray();
                        // console.log(messagesArrayNew, "messagesArrayNew");
                        let currentData: any = getNode(nodeData?.id);
                        console.log(currentData, "currentDataDrag");
                        // const currentDataIndex = messagesArrayNew?.findIndex(
                        //   (item: any) => item?.id === currentData?.id
                        // );

                        if (nodesMap) {
                          nodesMap.set(nodeData?.id, {
                            action: "EDIT_NODE",
                            status: "null",
                            id: data[0]?.id,
                            nodes: {
                              ...currentData,
                              data: JSON.stringify({
                                ...nodeData,
                                raw_payload: e.target.value,
                              }),
                            },
                          });
                        } else {
                          console.log("Yjs Map 'run' is not initialized.");
                        }
                      }}
                    /> */}

                    {/*Ace Editor*/}
                    <AceEditorComponent
                      onInputVal={handleInputDataFromAceEditor}
                      defaultInputVal={inputsPayload}
                      currentNode={nodeData.node_name}
                      disabled={true}
                      // suggestionVal={previousOpRaw}
                    />
                    {/* </> */}
                    {/* // )} */}
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
                        {/* <GButton
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
                        /> */}

                        {headers?.map((val: any, index: number) => (
                          <>
                            <SecondaryTypography>
                              {`Name: `}
                              {/* <span
                                  style={{
                                    fontWeight: 900,
                                  }}
                                >
                                  {`${val?.name}`}
                                </span> */}
                              <input
                                value={val?.name}
                                className="form-control my-1"
                                name="name"
                                disabled={true}
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
                                disabled={true}
                                // onChange={handleRoleChange}
                                // value={dataTypeValue}
                                // onChange={(e: any) => {
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
                            </SecondaryTypography>

                            <SecondaryTypography>
                              {`Value: `}
                              <TextEditor
                                inputData={val?.test_value}
                                currentNode={nodeData?.node_name}
                                disabled={true}
                                // objectToSuggest={currentResultRun?.response?.apiResponse}
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

                              {/* <input
                                value={val?.test_value}
                                className="form-control my-1"
                                name="test_value"
                                onChange={(e) => {
                                  onChangeHandler("test_value", e.target.value,val, index, "headers");
                                }}
                              /> */}
                            </SecondaryTypography>

                            {/* <GButton
                              buttonType="secondary"
                              label={"Remove"}
                              onClickHandler={() => {
                                const updatedHeaders = headers.filter(
                                  (_: any, i: number) => i !== index
                                );
                                console.log(
                                  "NodeCHecKea: ",
                                  nodeData,
                                  updatedHeaders
                                );
                                updateNodeData(updatedHeaders, "header");
                                setHeaders(updatedHeaders);
                              }}
                            /> */}
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
                      <>
                        {querys?.length === 0 && (
                          <>
                            <RenderNoDataFound />
                          </>
                        )}
                        {/* <GButton
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
                        /> */}
                        {querys?.map((val: any, index: number) => (
                          <>
                            <SecondaryTypography>
                              {`Name (${val.scope || "query"}): `}

                              <input
                                value={val?.name}
                                disabled={true}
                                className="form-control my-1"
                                name="name"
                                // onChange={(e) => {
                                //   onChangeHandler(
                                //     "name",
                                //     e.target.value,
                                //     val,
                                //     index,
                                //     "query"
                                //   );
                                // }}
                              />
                            </SecondaryTypography>

                            <SecondaryTypography>
                              {`Value: `}
                              <TextEditor
                                inputData={val?.test_value}
                                currentNode={nodeData?.node_name}
                                // objectToSuggest={previousOpRaw}
                                disabled={true}
                                // onChange={(value: any) => {
                                //   onChangeHandler(
                                //     "test_value",
                                //     value,
                                //     val,
                                //     index,
                                //     "query"
                                //   );
                                // }}
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
                                disabled={true}
                                options={dataTypes?.map((data: any) => ({
                                  label: data?.label,
                                  value: data.id,
                                }))}
                                defaultValue={"1"}
                                // onChange={(e: any) => {
                                //   onChangeHandler(
                                //     "data_type",
                                //     e.target.value,
                                //     val,
                                //     index,
                                //     "query"
                                //   );
                                // }}
                                value={val.data_type}
                              />
                            </SecondaryTypography>

                            {/* <GButton
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
                            /> */}
                            {/* {val?.scope !== "path" && (
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
                            )} */}
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
                        Global Keys
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
                                  inputData={val?.test_value}
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
                                          color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                          color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
                                            color: `${theme.palette.primaryPurple.main}`,
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
        // isValidConnection={isValidConnection}
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
