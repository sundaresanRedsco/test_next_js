import React, { useState } from "react";
import styled from "@mui/system/styled";
import { Button, Menu, MenuItem } from "@mui/material";
import theme from "../../../Theme/theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledMenu = styled(Button)`
  font-family: Inter-Regular;
  padding: 0;
  width: 30px;
  border: 1px solid ${({ theme }) => theme.palette.primaryBorder.main};
  padding: 10px 20px;
`;

const StyledExpandMoreIcon = styled(ExpandMoreIcon)`
  position: absolute;
  right: 6px;
  fill: ${({ theme }) => theme.palette.teritiaryColor.main};
  width: 1rem !important;
  height: 1rem !important;
  margin-right: 0px !important;
`;

export default function ApiDropdowns(props: any) {
  //props
  const {
    borderColor,
    borderRadius,
    value,
    valueDrop,
    onChange,
    onValueChange,
    onMethodChange,
    onSrcChange,
    onTypeChange,
    onBoolChange,
    onBodyChange,
    parameterNameVal,
    onFromVariableVals,
    onAuthorizationChange,
    width,
    display,
    onJwtBearerVals,
    onOauth10Vals,
    onOauth20Vals,
    onAwsSignVals,
    onJwtBearerDropVal,
    onDigestAuthAdvanceDropVal,
    onOauth10Values,
    onHawkAuthChanges,
    onOauth20GrantType,
    onOauth20TokenValues,
    onOauth20CodeChallenge,
    onVersionTypeVal,
    onGettingOperationSecurityValue,
    initialValue,
  } = props;

  //values
  const methods = ["GET", "POST", "DELETE", "PUT", "PATCH"];
  const options = ["JSON", "SOAP"];
  const valueSource = ["Specific Value", "From Variable"];
  const typeVal = [
    "String",
    "Integer",
    "Double",
    "Boolean",
    "JSON",
    "Image Path",
    "Video Path",
    "Audio Path",
  ];
  const boolVal = ["True", "False"];
  const bodyVal = [
    "None",
    "JSON",
    "Text",
    "x-www-form-urlencoded",
    "Multipart",
  ];
  const authorizeVal = [
    "Inherit auth from parent",
    "No Auth",
    "API Key",
    "Bearer Token",
    "JWT Bearer",
    "Basic Auth",
    "OAuth 1.0",
    "OAuth 2.0",
    "NTLM Authentication [Beta]",
  ];
  // "Digest Auth", "AWS Signature", "Akami EdgeGrid", "Hawk Authentication",
  const jwtBearerVal = ["Request Header", "Query Param"];
  const oauth10Val = ["Request Body / Request URL", "Request Headers"];
  const oauth20Val = ["Request URL", "Request Headers"];
  const awsSignVal = ["Request Headers", "Request URL"];
  const jwtBearerValDropdownVal = [
    "HS256",
    "HS384",
    "HS512",
    "RS256",
    "RS384",
    "RS512",
    "PS256",
    "PS384",
    "PS512",
    "ES256",
    "ES384",
    "ES512",
  ];
  const digestAuthAdvanceVal = [
    "MD5",
    "MD5-sess",
    "SHA-256",
    "SHA-256-sess",
    "SHA-512-256",
    "SHA-512-256-sess",
  ];
  const oauth10DropVal = [
    "HMAC-SHA1",
    "HMAC-SHA256",
    "HMAC-SHA512",
    "RSA-SHA1",
    "RSA-SHA256",
    "RSA-SHA512",
    "PLAINTEXT",
  ];
  const hawkAuthVal = ["SHA-256", "SHA-1"];
  const oauth20GrantTypeVal = [
    "Authorization Code",
    "Authorization Code with (PKCE)",
    "Implicit",
    "Password Credentials",
    "Client Credentials",
  ];
  const oauth20TokenVal = ["No Tokens Available"];
  const oauth20CodeChallengeVal = ["SHA-256", "Plain"];
  const versionTypeVal = ["1.0"];
  const operationSecrityLevelVal = [
    "Authenticated App Users",
    "Anonymous App Users",
    "Public(All Users)",
    "Private(Internal Server only)",
  ];

  //useState
  const [menuValue, setMenuValue] = useState(methods[0]);
  const [optionsValue, setOptionsValue] = useState(options[0]);
  const [srcValue, setSrcValue] = useState(valueSource[0]);
  const [typeValue, setTypeValue] = useState("Unset");
  const [booleanValue, setBooleanValue] = useState("");
  const [variable, setVariable] = useState("Unset");
  const [varOptions, setVarOptions] = useState<string[]>([
    "+ Create New Variable",
  ]);
  const [bodyValue, setBodyValue] = useState("Unset");
  const [authorizationValue, setAuthorizationValue] = useState(authorizeVal[0]);
  const [jwtBearerValue, setJwtBearerValue] = useState(jwtBearerVal[0]);
  const [oauth10Value, setOauth10Value] = useState(oauth10Val[0]);
  const [oauth20Value, setOauth20Value] = useState(oauth20Val[0]);
  const [awsSignValue, setAwsSignValue] = useState(awsSignVal[0]);
  const [jwtBearerDropValue, setJwtBearerDropValue] = useState(
    jwtBearerValDropdownVal[0]
  );
  const [digestAuthAdvanceValues, setDigestAuthAdvanceValues] = useState(
    digestAuthAdvanceVal[0]
  );
  const [oauth10DropValues, setOauth10DropValues] = useState(oauth10DropVal[0]);
  const [hawkAuthValues, setHawkAuthValues] = useState(hawkAuthVal[0]);
  const [oauth20GrantValues, setOauth20GrantValues] = useState(
    oauth20GrantTypeVal[0]
  );
  const [oauth20TokenValues, setOauth20TokenValues] =
    useState("Available Tokens");
  const [oauth20CodeChallengeValues, setOauth20CodeChallengeValues] = useState(
    oauth20CodeChallengeVal[0]
  );

  const [versionTypeValues, setVersionTypeValues] = useState(versionTypeVal[0]);
  const [operationSecurityValues, setOperationSecurityValues] = useState(
    operationSecrityLevelVal[0]
  );

  const [isIcon, setIsIcon] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //functions
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsIcon(!isIcon);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAuthorizationChange = (selectedValue: string) => {
    setAuthorizationValue(selectedValue);
    if (onAuthorizationChange) {
      onAuthorizationChange(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleMenuChange = (selectedValue: string) => {
    setMenuValue(selectedValue);
    if (onMethodChange) {
      onMethodChange(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOptionChange = (selectedOption: string) => {
    setOptionsValue(selectedOption);
    if (onValueChange) {
      onValueChange(selectedOption);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleValSrcChange = (selectedSrc: string) => {
    setSrcValue(selectedSrc);
    if (onSrcChange) {
      onSrcChange(selectedSrc);
    }
    if (onChange) {
      onChange(selectedSrc);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleTypeChange = (selectedType: string) => {
    setTypeValue(selectedType);
    if (onTypeChange) {
      onTypeChange(selectedType);
    }
    if (onChange) {
      onChange(selectedType);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleBoolChange = (selectedBool: string) => {
    setBooleanValue(selectedBool);
    if (onBoolChange) {
      onBoolChange(selectedBool);
    }
    if (onChange) {
      onChange(selectedBool);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleFromVarChange = (fromVar: any) => {
    if (fromVar === "+ Create New Variable" && parameterNameVal !== "") {
      setVariable(parameterNameVal);
      // setVarOptions([ variable, parameterNameVal,  "+ Create New Variable"])
      setVarOptions((prevVarOptions: any) => [
        ...prevVarOptions,
        parameterNameVal,
      ]);
      const newArray = [...varOptions, parameterNameVal];
      if (onFromVariableVals) {
        onFromVariableVals(newArray);
      }
      if (onChange) {
        onChange(newArray);
      }
    } else if (fromVar === "+ Create New Variable" && parameterNameVal === "") {
      setVariable("newVariable");
      setVarOptions(["newVariable", "+ Create New Variable"]);
      if (onFromVariableVals) {
        onFromVariableVals(varOptions);
      }
      if (onChange) {
        onChange(varOptions);
      }
    } else {
      setVariable(fromVar);
    }
    if (onValueChange) {
      onValueChange(fromVar);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleBodyChange = (selectedbody: any) => {
    setBodyValue(selectedbody);
    if (onBodyChange) {
      onBodyChange(selectedbody);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleJwtBearerChange = (selectedValue: any) => {
    setJwtBearerValue(selectedValue);
    if (onJwtBearerVals) {
      onJwtBearerVals(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOauth10Change = (selectedValue: any) => {
    setOauth10Value(selectedValue);
    if (onOauth10Vals) {
      onOauth10Vals(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOauth20Change = (selectedValue: any) => {
    setOauth20Value(selectedValue);
    if (onOauth20Vals) {
      onOauth20Vals(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleAwsSignChange = (selectedValue: any) => {
    setAwsSignValue(selectedValue);
    if (onAwsSignVals) {
      onAwsSignVals(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleJwtBearerDropChange = (selectedValue: any) => {
    setJwtBearerDropValue(selectedValue);
    if (onJwtBearerDropVal) {
      onJwtBearerDropVal(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleDigestAuthAdvanceDropChange = (selectedValue: any) => {
    setDigestAuthAdvanceValues(selectedValue);
    if (onDigestAuthAdvanceDropVal) {
      onDigestAuthAdvanceDropVal(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOauth10DropChange = (selectedValue: any) => {
    setOauth10DropValues(selectedValue);
    if (onOauth10Values) {
      onOauth10Values(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleHawkAuthChange = (selectedValue: any) => {
    setHawkAuthValues(selectedValue);
    if (onHawkAuthChanges) {
      onHawkAuthChanges(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOauth20GrantTypeChange = (selectedValue: any) => {
    setOauth20GrantValues(selectedValue);
    if (onOauth20GrantType) {
      onOauth20GrantType(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOauth20TokensChange = (selectedValue: any) => {
    setOauth20TokenValues(selectedValue);
    if (onOauth20TokenValues) {
      onOauth20TokenValues(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOauth20CodeChallengeChange = (selectedValue: any) => {
    setOauth20CodeChallengeValues(selectedValue);
    if (onOauth20CodeChallenge) {
      onOauth20CodeChallenge(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleVersionTypeValues = (selectedValue: any) => {
    console.log("reach");
    setVersionTypeValues(selectedValue);
    if (onVersionTypeVal) {
      onVersionTypeVal(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  const handleOperationSecurityLevel = (selectedValue: any) => {
    console.log("reach");
    setOperationSecurityValues(selectedValue);
    if (onGettingOperationSecurityValue) {
      onGettingOperationSecurityValue(selectedValue);
    }
    handleClose();
    setIsIcon(!isIcon);
  };

  return (
    <div>
      <StyledMenu
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: display || "flex",
          justifyContent: "start",
          color: theme.palette.primaryBlack.main,
          fontSize: "0.6rem",
          width: width || "170px",
          marginTop: "10px",
          textTransform: "none",
          height: "28px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          border: `1px solid ${borderColor}`,
          borderRadius: borderRadius,
        }}
      >
        {valueDrop === "method"
          ? initialValue || menuValue
          : valueDrop === "json"
          ? optionsValue
          : valueDrop === "specificValue"
          ? value
          : valueDrop === "type"
          ? value
          : valueDrop === "boolean"
          ? value
          : valueDrop === "fromVariable"
          ? variable
          : valueDrop === "body"
          ? bodyValue
          : valueDrop === "authorization"
          ? authorizationValue
          : valueDrop === "jwtBearer"
          ? jwtBearerValue
          : valueDrop === "oauth10data"
          ? oauth10Value
          : valueDrop === "oauth20data"
          ? oauth20Value
          : valueDrop === "awsSignData"
          ? awsSignValue
          : valueDrop === "jwtBearerDropdownVal"
          ? jwtBearerDropValue
          : valueDrop === "digestAuthAdvance"
          ? digestAuthAdvanceValues
          : valueDrop === "oauth10AdvanceDrop"
          ? oauth10DropValues
          : valueDrop === "hawkAuthDrop"
          ? hawkAuthValues
          : valueDrop === "oauth20GrantType"
          ? oauth20GrantValues
          : valueDrop === "oauth20TokenVal"
          ? oauth20TokenValues
          : valueDrop === "oauth20CodeChallenge"
          ? oauth20CodeChallengeValues
          : valueDrop === "versionTypeVals"
          ? versionTypeValues
          : valueDrop === "operationSecurityLevel"
          ? initialValue || operationSecurityValues
          : ""}
        {/* {isIcon ? <StyledExpandMoreIcon /> : ""} */}
        <StyledExpandMoreIcon />
      </StyledMenu>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          ".MuiPaper-root": {
            background: theme.palette.primaryBody.main,
            zIndex: 10000,
          },
          "&.MuiPopover-root": {
            zIndex: 99999999999,
            // backgroundColor: 'green'
          },
        }}
      >
        {valueDrop === "method" ? (
          <>
            {methods.map((methodVal) => (
              <MenuItem
                sx={{
                  fontSize: "0.6rem",
                  width: "100px",
                  height: "30px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                  zIndex: 1000000,
                }}
                key={methodVal}
                onClick={() => handleMenuChange(methodVal)}
              >
                {methodVal}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "json" ? (
          <>
            {options.map((optionVal) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={optionVal}
                onClick={() => handleOptionChange(optionVal)}
              >
                {optionVal}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "specificValue" ? (
          <>
            {valueSource.map((valueSrc) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={valueSrc}
                onClick={() => handleValSrcChange(valueSrc)}
              >
                {valueSrc}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "type" ? (
          <>
            {typeVal.map((typesValue) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={typesValue}
                onClick={() => handleTypeChange(typesValue)}
              >
                {typesValue}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "boolean" ? (
          <>
            {boolVal.map((boolValue) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={boolValue}
                onClick={() => handleBoolChange(boolValue)}
              >
                {boolValue}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "fromVariable" ? (
          <>
            {varOptions.map((fromVarValue) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={fromVarValue}
                onClick={() => handleFromVarChange(fromVarValue)}
              >
                {fromVarValue}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "body" ? (
          <>
            {bodyVal.map((bodyValues) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={bodyValues}
                onClick={() => handleBodyChange(bodyValues)}
              >
                {bodyValues}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "authorization" ? (
          <>
            {authorizeVal.map((authorizeValues) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "180px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={authorizeValues}
                defaultValue={value}
                onClick={() => handleAuthorizationChange(authorizeValues)}
              >
                {authorizeValues}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "jwtBearer" ? (
          <>
            {jwtBearerVal.map((jwtValues) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={jwtValues}
                onClick={() => handleJwtBearerChange(jwtValues)}
              >
                {jwtValues}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "oauth10data" ? (
          <>
            {oauth10Val.map((oauth10Values) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={oauth10Values}
                onClick={() => handleOauth10Change(oauth10Values)}
              >
                {oauth10Values}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "oauth20data" ? (
          <>
            {oauth20Val.map((oauth20Values) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={oauth20Values}
                onClick={() => handleOauth20Change(oauth20Values)}
              >
                {oauth20Values}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "awsSignData" ? (
          <>
            {awsSignVal.map((awsSignValues) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={awsSignValues}
                onClick={() => handleAwsSignChange(awsSignValues)}
              >
                {awsSignValues}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "jwtBearerDropdownVal" ? (
          <>
            {jwtBearerValDropdownVal.map((jwtDropValues) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={jwtDropValues}
                onClick={() => handleJwtBearerDropChange(jwtDropValues)}
              >
                {jwtDropValues}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "digestAuthAdvance" ? (
          <>
            {digestAuthAdvanceVal.map((digestAuthAdvanceVal: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={digestAuthAdvanceVal}
                onClick={() =>
                  handleDigestAuthAdvanceDropChange(digestAuthAdvanceVal)
                }
              >
                {digestAuthAdvanceVal}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "oauth10AdvanceDrop" ? (
          <>
            {oauth10DropVal.map((oauth10dropVals: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={oauth10dropVals}
                onClick={() => handleOauth10DropChange(oauth10dropVals)}
              >
                {oauth10dropVals}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "hawkAuthDrop" ? (
          <>
            {hawkAuthVal.map((hawkAuthVal: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "170px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={hawkAuthVal}
                onClick={() => handleHawkAuthChange(hawkAuthVal)}
              >
                {hawkAuthVal}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "oauth20GrantType" ? (
          <>
            {oauth20GrantTypeVal.map((oauth20GrantVals: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "250px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={oauth20GrantVals}
                onClick={() => handleOauth20GrantTypeChange(oauth20GrantVals)}
              >
                {oauth20GrantVals}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "oauth20TokenVal" ? (
          <>
            {oauth20TokenVal.map((oauth20TokenVals: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "250px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={oauth20TokenVals}
                onClick={() => handleOauth20TokensChange(oauth20TokenVals)}
              >
                {oauth20TokenVals}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "oauth20CodeChallenge" ? (
          <>
            {oauth20CodeChallengeVal.map((oauth20CodeChallengeVals: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "250px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                }}
                key={oauth20CodeChallengeVals}
                onClick={() =>
                  handleOauth20CodeChallengeChange(oauth20CodeChallengeVals)
                }
              >
                {oauth20CodeChallengeVals}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "versionTypeVals" ? (
          <>
            {versionTypeVal.map((versionVals: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.8rem",
                  width: "73px",
                  height: "45px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                  zIndex: 9999,
                }}
                key={versionVals}
                onClick={() => handleVersionTypeValues(versionVals)}
              >
                {versionVals}
              </MenuItem>
            ))}
          </>
        ) : valueDrop === "operationSecurityLevel" ? (
          <>
            {operationSecrityLevelVal.map((operationVals: any) => (
              <MenuItem
                sx={{
                  fontSize: "0.6rem",
                  width: "250px",
                  height: "30px",
                  color: theme.palette.primaryBlack.main,
                  background: theme.palette.mainWhite.main,
                  zIndex: 9999,
                }}
                key={operationVals}
                onClick={() => handleOperationSecurityLevel(operationVals)}
              >
                {operationVals}
              </MenuItem>
            ))}
          </>
        ) : null}
      </Menu>
    </div>
  );
}
