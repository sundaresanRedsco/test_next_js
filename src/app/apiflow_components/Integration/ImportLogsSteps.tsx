import {
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SecondaryTypography } from "../../Styles/signInUp";
import GButton from "@/app/apiflow_components/global/GButton";
import { CheckCircle, FileCopy } from "@mui/icons-material";
import toast from "react-hot-toast";
import cloud1 from "@/app/Assests/images/cloudstep1.jpeg";
import cloud2 from "@/app/Assests/images/cloudstep2.jpeg";
import cloud3 from "@/app/Assests/images/cloudstep3.jpeg";
import cloud4 from "@/app/Assests/images/cloudstep4.jpeg";
import cloud5 from "@/app/Assests/images/cloudstep5.jpeg";
import cloud6 from "@/app/Assests/images/cloudstep6.jpeg";
import cloud7 from "@/app/Assests/images/cloudstep7.jpeg";
import cloud8 from "@/app/Assests/images/cloudstep8.jpeg";
import cloud9 from "@/app/Assests/images/cloudstep9.jpeg";
import cloud10 from "@/app/Assests/images/cloudstep10.jpeg";
import cloud11 from "@/app/Assests/images/cloudstep11.jpeg";
import loggroup1 from "@/app/Assests/images/1.png";
import loggroup2 from "@/app/Assests/images/2.png";
import logtrace from "@/app/Assests/images/3.png";
import logtrace1 from "@/app/Assests/images/4.png";
import lamda from "@/app/Assests/images/5.png";
// import trigger from '@/app/Assests/images/6.png'
import trigger1 from "@/app/Assests/images/7.png";
import tri from "@/app/Assests/images/6.png";
import deploy from "@/app/Assests/images/8.png";

import { TeamProfileHeading } from "../../Styles/manageTeamComponet";
import GInput from "@/app/apiflow_components/global/GInput";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import Reload from "@mui/icons-material/Replay";
import {
  CreateLogsKeys,
  EnableDisableLogs,
  GetApiGatewaySdkKeys,
  GetLogskeyBySdkId,
  RegenerateLogsKey,
  apiGatewayReducer,
} from "../../Redux/apiManagement/apiGatewayReducer";
import { CommonReducer, updateSessionPopup } from "../../Redux/commonReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import GDialogBox from "@/app/apiflow_components/global/GDialogBox";
import { createTeamreducer } from "@/app/Redux/manageTeam/teamReducer";
import GlobalCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import GlobalLoader from "@/app/apiflow_components/global/GLoader";
import Image from "next/image";

interface FormData {
  name: string;
}

function ImportLogsSteps(props: any) {
  const { open, onClose, nameData, types, idData, enables } = props;

  const { userProfile, maninContainer } = useSelector<
    RootStateType,
    CommonReducer
  >((state) => state.common);

  const dispatch = useDispatch<any>();
  const { loading, logsKey, apiGatewayKeys, loadingValue } = useSelector<
    RootStateType,
    apiGatewayReducer
  >((state) => state.apiManagement.gateWay);
  const { currentTeam } = useSelector<RootStateType, createTeamreducer>(
    (state) => state.apiTeam.createTeam
  );
  const CopyUrl =
    "https://api.apiflow.pro/api/Import_/gcp_publisher_import_log?log_id= enter_your_log_id&&authenticationkey=enter_your_authenticatio_key";

  const lambdaFunctionString = `
    const axios = require('axios');
    const zlib = require('zlib');

    exports.handler = async (event) => {
      try {

        const compressedPayload = Buffer.from(event?.awslogs?.data, 'base64');
        const jsonPayload = zlib.gunzipSync(compressedPayload).toString('utf8');

        let object = {
          log_id: "put Your log_id",
          authentication_id: "put Your authentication_id",
          message: jsonPayload
        };

        let updatedDecodedData = JSON.stringify(object);

        const base64EncodedAgain = Buffer.from(updatedDecodedData).toString('base64');

        const response = await axios.post(
          'https://api.apiflow.pro/api/ImportFromApiGateWay/Aws_logs_import_publisher', 
          base64EncodedAgain,
          { headers: { 'Content-Type': 'application/json' } }
        );

        return {
          statusCode: 200,
          body: JSON.stringify(response.data)
        };
      } catch (error) {
        console.error('Error sending log data:', error);
        return {
          statusCode: 500,
          body: JSON.stringify('Error sending log data')
        };
      }
    };
  `;

  const [inputVisible, setInputVisible] = useState(false);
  const [deleteValueClicked, setDeleteValueClicked] = useState(false);
  const [logsName, setLogsName] = useState<any>();
  const [regnerateType, setRegnerateType] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [eabledata, setEnableData] = useState<any>(enables);
  // const [idNew, setIdNew] = useState<any>(idData)
  const [trigger, setTrigger] = useState(0);
  const [jsonData, setJsonData] = useState(lambdaFunctionString);
  const [copied, setCopied] = useState(false);
  const [nameError, setNameError] = useState({
    otp: "",
  });

  const tableHeaders = [
    { key: "name", label: "Name" },
    { key: "logid", label: "LogId" },
    { key: "authkey", label: "AuthKey" },
    { key: "action", label: "Action" },
  ];

  const cloudSteps = [
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud1,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud2,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash",
      image: cloud3,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one ",
      image: cloud4,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your",
      image: cloud5,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable",
      image: cloud6,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable yousds",
      image: cloud7,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud8,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud9,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud10,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud11,
    },
  ];

  const AwsSteps = [
    {
      text: "1.Create CloudWatch Log Group:",
      subtext:
        "- In CloudWatch Console, create a log group for API Gateway logs.",
      image: loggroup1,
      subimage: loggroup2,
    },
    {
      text: "2.Enable Logs and Tracing:",
      subtext:
        "- Should Enable the logs and Tracing for which you want to configure the log services.",
      subtext1: "- Should select the full request and response log.",
      image: logtrace,
      subimage: logtrace1,
    },
    {
      text: "3.Create AWS Lambda Function:",
      subtext: "- Go to Lambda Console, create a function from scratch.",
      subtext1: "- Choose a runtime (e.g., Python, Node.js).",
      image: lamda,
    },
    {
      text: "4.Configure CloudWatch Logs Trigger:",
      subtext: "- In Lambda Console, add a trigger for CloudWatch Logs.",
      subtext1: "- Select your log group and configure filters if needed.",
      image: tri,
      // subimage: trigger1,
    },
    {
      text: "5.Write Lambda Function Code:",
      subtext: "- Write code to process log events in your chosen runtime.",
      // image: cloud5,
    },
  ];

  const AwsSubsteps = [
    {
      awstext: "6.Deploy Lambda Function:",
      awssubtext: "- Save and deploy your Lambda function.",
      awsimage: deploy,
    },
    {
      awstext: "7.Test Setup:",
      awssubtext: "- Trigger your API Gateway endpoints to generate logs.",
      awssubtext1: "- Verify logs appear in CloudWatch log group.",
    },
  ];

  const AzureSteps = [
    {
      text: "AzureExpands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud1,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud2,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash",
      image: cloud3,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one ",
      image: cloud4,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your",
      image: cloud5,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable",
      image: cloud6,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable yousds",
      image: cloud7,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud8,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud9,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud10,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud11,
    },
  ];

  const KongSteps = [
    {
      text: "KongExpands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud1,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud2,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash",
      image: cloud3,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one ",
      image: cloud4,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your",
      image: cloud5,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable",
      image: cloud6,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable yousds",
      image: cloud7,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud8,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud9,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud10,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud11,
    },
  ];

  const ApacheSteps = [
    {
      text: "ApacheExpands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud1,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one instanace id",
      image: cloud2,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash",
      image: cloud3,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your Logstash and one ",
      image: cloud4,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable your",
      image: cloud5,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable",
      image: cloud6,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable yousds",
      image: cloud7,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud8,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud9,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud10,
    },
    {
      text: "Expands or collapses content contained in collapsible items,Enable Logstash and one instanace id",
      image: cloud11,
    },
  ];

  useEffect(() => {
    if (idData) {
      dispatch(GetLogskeyBySdkId(idData))
        .unwrap()
        .then()
        .catch((errr: any) => {
          if (errr.message == "UNAUTHORIZED") {
            dispatch(updateSessionPopup(true));
          }
        });
    }
  }, [idData]);

  // useEffect(() => {
  //   // let isMounted = true;

  //   if (currentTeam?.workspace_id) {
  //     dispatch(GetApiGatewaySdkKeys(currentTeam?.workspace_id))
  //       .unwrap()
  //       .then()
  //       .catch((errr: any) => {
  //         if (errr.message == "UNAUTHORIZED") {
  //           dispatch(updateSessionPopup(true));
  //         }
  //       });
  //   }
  //   console.log("samplesdsd");

  //   return () => {
  //     console.log("Component is unmounting");
  //   };
  // }, [currentTeam.workspace_id]);

  const handleUrlClick = () => {
    setInputVisible(true);
  };
  const handleCancelClick = () => {
    setInputVisible(false);
    setLogsName("");
    setNameError({
      otp: "",
    });
  };

  const activeLogDatas = logsKey.filter((logs: any) => logs.isactive === true);
  console.log("active", activeLogDatas);

  const handleCopyClick = (type: string, value: any) => {
    if (type === "Id") {
      navigator.clipboard.writeText(value);
      toast.success("Your LogId ");
    } else if (type === "authid") {
      navigator.clipboard.writeText(value);
      toast.success("Your AuthKey");
    } else if (type === "url") {
      navigator.clipboard.writeText(CopyUrl);
      toast.success("Url Copied");
    }
  };

  const createLogsbySdkId = () => {
    const otp = logsName || "";
    // const urlRegex = /^(http|https):\/\/[^ "]+$/;

    if (otp === "") {
      setNameError({
        otp: "name is required",
      });
      return;
    }

    let logsKeyDetails;
    logsKeyDetails = {
      name: logsName,
      sdk_id: idData,
      tenant_id: userProfile?.user?.tenant_id,
    };
    // if(validateForm){

    dispatch(CreateLogsKeys(logsKeyDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Created");
        handleCancelClick();

        dispatch(GetLogskeyBySdkId(idData))
          .unwrap()
          .then()
          .catch((errr: any) => {
            if (errr.message == "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
        console.log("UpdateResponse: ", res);
      })
      .catch((error: any) => {
        console.log(error, "error Occurred");
        if (error.message == "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error.message);
        }
      });
    // }
  };

  useEffect(() => {
    if (!regnerateType || !actionType) return;

    let regenerateKeyDetails;
    if (actionType === "REGENARATE") {
      regenerateKeyDetails = {
        id: regnerateType,
        type: "REGENARATE",
      };
    } else if (actionType === "DEACTIVE") {
      regenerateKeyDetails = {
        id: regnerateType,
        type: "DEACTIVE",
      };
    }

    dispatch(RegenerateLogsKey(regenerateKeyDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Created");
        dispatch(GetLogskeyBySdkId(idData))
          .unwrap()
          .then()
          .catch((err: any) => {
            if (err.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
        console.log("UpdateResponse: ", res);
      })
      .catch((error: any) => {
        console.log(error, "error Occurred");
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error.message);
        }
      });
  }, [trigger, dispatch]);

  const handleRegenerateClick = (type: any) => {
    setActionType(type);
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    setEnableData(enables);
  }, [enables]);

  const enableDisableLogs = () => {
    console.log("test");
    const addGatewayDetails = {
      id: idData,
      log_enable: true,
    };

    dispatch(EnableDisableLogs(addGatewayDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Enabled");
        if (idData) {
          setEnableData(true);
        }
        dispatch(GetApiGatewaySdkKeys(currentTeam?.workspace_id));
      });
  };

  const handleClose = () => {
    setDeleteValueClicked(false);
  };

  const handleOpen = () => {
    setDeleteValueClicked(true);
  };

  const handleConfirmDelete = () => {
    handleRegenerateClick("DEACTIVE");
    handleClose();
  };

  const formatWithLineNumbers = (text: any) => {
    return (text ?? "")
      .split("\n")
      .map((line: any, index: any) => `${index + 1}. ${line}`)
      .join("\n");
  };

  const formattedRequest = formatWithLineNumbers(jsonData);

  const handleJsonCopy = () => {
    // navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    const cleanedData = jsonData.replaceAll("\n", "");
    navigator.clipboard.writeText(cleanedData);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // const errorHandles = () => {
  //   // const value = e.target.value;
  //   let errorMessage = "";

  //   if (logsName === "") {
  //     // errorMessage = "Name is required";
  //   setNameError("Name is required");

  //   }
  //   // else if (logsName.length > 30) {
  //   //   errorMessage = "Name must be at most 30 characters long";
  //   // }

  //   // setLogsName(logsName);
  //   // setNameError(errorMessage);
  // };
  // const [formData, setFormData] = useState<FormData>({
  //   name: "",

  // });

  // const [errors1, setErrors1] = useState<Partial<FormData>>({});
  // const validateForm = (): any => {
  //   const newErrors: Partial<FormData> = {};
  //   if (!formData.name) {
  //     newErrors.name = " name is required";
  //   }

  //   setErrors1(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const [errorOtpDetails, setErrorOtpdetails] = useState<any>({
    errorData: "",
  });

  //   const validateForm = (dataType: any) => {
  //   if (dataType === "url") {
  //     const otp = logsName || "";
  //     // const urlRegex = /^(http|https):\/\/[^ "]+$/;

  //     if (otp === "") {
  //       setErrorOtpdetails({
  //         otp: "name is required",
  //       });
  //       return;
  //     }

  //     if (otp.length > 30) {
  //       setErrorOtpdetails({
  //         otp: "name must be 30 characters or less",
  //       });
  //       return;
  //     }
  //     //  else if (!urlRegex.test(otp?.trim())) {
  //     //   setErrorOtpdetails({
  //     //     otp: "Invalid URL format",
  //     //   });
  //     //   return;
  //     // }
  //     else {
  //       setErrorOtpdetails({});
  //     }
  //   }
  // }

  return (
    <div>
      {loading && <GlobalLoader />}
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => {
          onClose();
          setInputVisible(false);
        }}
        PaperProps={{ style: { width: "90%" } }}
      >
        <div>
          <div onClick={(e) => e.stopPropagation()}>
            <div style={{ margin: "3rem" }}>
              <SecondaryTypography
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  marginTop: "1rem",
                }}
              >
                Enable Logs -{" "}
                <span style={{ marginLeft: "1rem" }}>{nameData}</span>
              </SecondaryTypography>

              <SecondaryTypography
                style={{ fontSize: "0.8rem", marginTop: "2rem" }}
              >
                {types === "AWS"
                  ? "Amazon Web Service"
                  : "Google Cloud platform"}
              </SecondaryTypography>

              <SecondaryTypography
                style={{
                  marginTop: "1.5rem",
                  fontSize: "0.6rem",
                  color: "rgb(173, 181, 189)",
                }}
              >
                Expands or collapses content contained in collapsible
                items,Enable your Logstash and one instanace id<br></br> is
                created and click that id. id will copy and place any
              </SecondaryTypography>

              <GButton
                buttonType="primary"
                // label={"Enable Logs"}
                label={eabledata == true ? "Disable Logs" : "Enable Logs"}
                margin="2rem 0rem"
                onClickHandler={enableDisableLogs}
              />

              {idData && eabledata && (
                <>
                  <p style={{ fontSize: "0.8rem" }}>Endpoint Url:</p>
                  <p
                    onClick={() => handleCopyClick("url", "data")}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      fontSize: "0.7rem",
                    }}
                  >
                    {CopyUrl}
                    <FileCopy
                      style={{
                        marginLeft: "0.8rem",
                        color: "#110b18ad",
                        fontSize: "0.8rem",
                      }}
                    />
                  </p>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <SecondaryTypography
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            marginTop: "1rem",
                          }}
                        >
                          Authenticationkey List
                        </SecondaryTypography>
                      </div>

                      <GButton
                        buttonType="primary"
                        label={"Add Key"}
                        // margin="2rem 0rem"
                        onClickHandler={handleUrlClick}
                      />
                    </div>

                    {inputVisible && (
                      <div>
                        <TeamProfileHeading
                          style={{
                            fontSize: "0.6rem",
                            // marginTop: "1rem",
                            marginBottom: "1px",
                          }}
                        >
                          Enter Name
                        </TeamProfileHeading>
                        <div style={{ display: "flex", marginTop: "0.8rem" }}>
                          <GInput
                            width={"14.7rem"}
                            fontSize="0.6rem"
                            type="text"
                            color={"#000000"}
                            background={"#ffffff"}
                            // fontWeight={700}
                            radius="5px"
                            labelShrink={true}
                            dataTest={"email-input"}
                            variant="outlined"
                            value={logsName}
                            helperText={nameError?.otp}
                            // maxLength={30}
                            error={nameError?.otp}
                            onChangeHandler={(e: any) => {
                              setLogsName(e.target.value);
                            }}
                          />

                          <CheckCircleOutlineIcon
                            style={{
                              cursor: "pointer",
                              color: "green",
                              margin: "0.5rem 0.5rem",
                              fontSize: "1rem",
                            }}
                            onClick={() => {
                              createLogsbySdkId();
                              // errorHandles();
                            }}
                          />
                          <CancelIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "1rem",
                              color: "red",
                              margin: "0.5rem 0.5rem",
                              fontSize: "1rem",
                            }}
                            onClick={handleCancelClick}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {tableHeaders?.map((header) => (
                            <TableCell key={header?.key}>
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
                        {activeLogDatas?.length <= 0 && (
                          <GlobalCircularLoader open={loadingValue} />
                        )}
                        {activeLogDatas.length === 0 ? (
                          <TableRow style={{ height: "17rem" }}>
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
                          activeLogDatas?.map((datas: any) => (
                            <TableRow key={datas?.id}>
                              <TableCell
                                style={{
                                  fontSize: "0.6rem",
                                  padding: "5px 16px",
                                }}
                              >
                                {datas?.name}
                              </TableCell>
                              <TableCell
                                onClick={() => handleCopyClick("Id", datas?.id)}
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  fontSize: "0.6rem",
                                  padding: "5px 16px",
                                }}
                              >
                                {datas?.id}
                                <FileCopy
                                  style={{
                                    marginLeft: "0.8rem",
                                    color: "#110b18ad",
                                    fontSize: "12px",
                                  }}
                                />
                              </TableCell>

                              <TableCell
                                onClick={() =>
                                  handleCopyClick(
                                    "authid",
                                    datas?.authendication_key
                                  )
                                }
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  fontSize: "0.6rem",
                                  padding: "5px 16px",
                                }}
                              >
                                {datas?.authendication_key}

                                <FileCopy
                                  style={{
                                    marginLeft: "0.8rem",
                                    color: "#110b18ad",
                                    fontSize: "12px",
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Reload
                                  style={{
                                    color: "#6c757d",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                  }}
                                  //   onClick={regnerateLogsbyId}
                                  onClick={() => {
                                    handleRegenerateClick("REGENARATE");
                                    setRegnerateType(datas?.id);
                                  }}
                                />

                                <DeleteIcon
                                  style={{
                                    color: "#adb5bd",
                                    marginLeft: "1rem",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                  }}
                                  onClick={() => {
                                    handleOpen();
                                    setRegnerateType(datas?.id);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <SecondaryTypography
                    style={{
                      fontSize: "0.8rem",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {types === "AWS"
                      ? ""
                      : "You Enable Google Cloud Logs Follow the steps"}
                  </SecondaryTypography>

                  {types === "GCP" &&
                    cloudSteps.map((step, index) => (
                      <div key={index}>
                        <SecondaryTypography
                          style={{
                            marginTop: "1.5rem",
                            marginBottom: "1rem",
                            fontSize: "0.6rem",
                            color: "rgb(173, 181, 189)",
                          }}
                        >
                          {step.text}
                        </SecondaryTypography>
                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.image}
                            className="img-fluid"
                            alt={step.text}
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>
                      </div>
                    ))}

                  {types === "AZURE" &&
                    AzureSteps.map((step, index) => (
                      <div key={index}>
                        <SecondaryTypography
                          style={{
                            marginTop: "1.5rem",
                            marginBottom: "1rem",
                            fontSize: "0.6rem",
                            color: "rgb(173, 181, 189)",
                          }}
                        >
                          {step.text}
                        </SecondaryTypography>
                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.image}
                            className="img-fluid"
                            alt={step.text}
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>
                      </div>
                    ))}

                  {types === "AWS" &&
                    AwsSteps.map((step: any, index: any) => (
                      <div key={index}>
                        <SecondaryTypography
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            // color: "rgb(173, 181, 189)",
                          }}
                        >
                          {step.text}
                        </SecondaryTypography>
                        <p style={{ fontSize: "0.6rem" }}>{step.subtext}</p>
                        <p style={{ fontSize: "0.6rem" }}>{step.subtext1}</p>

                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.image}
                            alt=""
                            className="img-fluid"
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>

                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.subimage}
                            alt=""
                            className="img-fluid"
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>
                      </div>
                    ))}

                  {types === "AWS" && (
                    <div>
                      <div
                        style={{
                          backgroundColor: "#F1F5F9",
                          marginBottom: "3rem",
                          cursor: "pointer",
                          padding: "1rem 1.4rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                          onClick={() => handleJsonCopy()}
                        >
                          {copied ? (
                            <CheckCircle
                              style={{ marginLeft: "1rem", fontSize: "16px" }}
                            />
                          ) : (
                            <FileCopy
                              style={{ marginLeft: "1rem", fontSize: "16px" }}
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
                        <pre>{formattedRequest}</pre>
                      </div>
                    </div>
                  )}

                  {types === "AWS" &&
                    AwsSubsteps.map((step: any, index: any) => (
                      <div key={index}>
                        <SecondaryTypography
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            // color: "rgb(173, 181, 189)",
                          }}
                        >
                          {step.awstext}
                        </SecondaryTypography>
                        <p style={{ fontSize: "0.8rem" }}>{step.awssubtext}</p>
                        <p style={{ fontSize: "0.8rem" }}>{step.awssubtext1}</p>

                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.awsimage}
                            alt=""
                            className="img-fluid"
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>
                      </div>
                    ))}

                  {types === "KONG" &&
                    KongSteps.map((step, index) => (
                      <div key={index}>
                        <SecondaryTypography
                          style={{
                            marginTop: "1.5rem",
                            marginBottom: "1rem",
                            fontSize: "0.6rem",
                            color: "rgb(173, 181, 189)",
                          }}
                        >
                          {step.text}
                        </SecondaryTypography>
                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.image}
                            className="img-fluid"
                            alt={step.text}
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>
                      </div>
                    ))}

                  {types === "APISIX" &&
                    ApacheSteps.map((step, index) => (
                      <div key={index}>
                        <SecondaryTypography
                          style={{
                            marginTop: "1.5rem",
                            marginBottom: "1rem",
                            fontSize: "0.6rem",
                            color: "rgb(173, 181, 189)",
                          }}
                        >
                          {step.text}
                        </SecondaryTypography>
                        <div style={{ maxHeight: "15rem", overflow: "hidden" }}>
                          <Image
                            src={step.image}
                            className="img-fluid"
                            alt={step.text}
                            style={{ maxHeight: "15rem", width: "auto" }}
                          />
                        </div>
                      </div>
                    ))}
                </>
              )}

              {deleteValueClicked === true ? (
                <>
                  <div>
                    <GDialogBox
                      openVal={deleteValueClicked}
                      dialogContentText={`Are you sure to delete`}
                      confirmVal={"Confirm"}
                      cancelVal={"Cancel"}
                      onClickConfirmHandler={handleConfirmDelete}
                      onClickCancelHandler={handleClose}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
export default ImportLogsSteps;
