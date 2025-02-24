// import { translate } from "@/app/Helpers/helpersFunctions";
import React from "react";

type Props = {
  valLabel: any;
  setRowsBody: any;
  rowsBody: any;
  setRowsHeader: any;
  rowsHeader: any;
  setRowsAuthorization: any;
  rowsAuthorization: any;
  setRowsQueryParameters: any;
  rowsQueryParameters: any;
  operationDetails: any;
  collectionDetails: any;
};

export default function useOperation({
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
}: Props) {
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
        rowIndex = rowsBody?.findIndex(
          (details: any) => details?.id === row?.id
        );
        break;
      case "Header":
        stateToUpdate = setRowsHeader;
        rowIndex = rowsHeader?.findIndex(
          (details: any) => details?.id === row?.id
        );
        break;
      case "Authorization":
        stateToUpdate = setRowsAuthorization;
        rowIndex = rowsAuthorization?.findIndex(
          (details: any) => details?.id === row?.id
        );
        break;
      case "Query Parameters":
        stateToUpdate = setRowsQueryParameters;
        rowIndex = rowsQueryParameters?.findIndex(
          (details: any) => details?.id === row?.id
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

  const capitalizeFirstLetter = (word: any) => {
    if (!word) return "-";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const formatWithLineNumbers = (text: any) => {
    return (text ?? "")
      ?.split("\n")
      ?.map((line: any, index: any) => `${index + 1}. ${line}`)
      ?.join("\n");
  };

  const validateEmptyName = (name: string): string | null => {
    if (!name?.trim()) {
      return "Api Operation Name is required";
    }
    return null;
  };

  const validateSpecialCharacters = (name: string): string | null => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\s]/.test(name);
    if (hasSpecialChar) {
      return "Special Characters and spaces are not allowed";
    }
    return null;
  };

  const validateNameLength = (name: string): string | null => {
    if (name.length > 50) {
      return "Operation name should not exceed 50 characters";
    }
    return null;
  };

  const validateOperationDetails = (operationDetails: any) => {
    if (!operationDetails?.name?.trim()) {
      return "Operation name is required";
    }
    if (/[!@#$%^&*(),.?":{}|<>\s]/.test(operationDetails.name)) {
      return "Special characters and spaces are not allowed in the name";
    }
    if (operationDetails?.name?.length > 50) {
      return "Operation name should not exceed 50 characters";
    }
    if (/\s/.test(operationDetails?.method_name)) {
      return "Spaces are not allowed in the method name";
    }
    if (operationDetails?.method_name?.startsWith("/")) {
      return "Method name cannot start with a slash";
    }
    return null;
  };

  const getNavLinks = (value: string) => [];
  // const getNavLinks = (value: string) => [
  //   {
  //     label: translate("apiManagement.BODY"),
  //     id: "body",
  //     active: translate("apiManagement.BODY") === value,
  //   },
  //   {
  //     label: translate("apiManagement.HEADER"),
  //     id: "header",
  //     active: translate("apiManagement.HEADER") === value,
  //   },
  //   {
  //     label: translate("apiManagement.AUTHORIZATION"),
  //     id: "authorization",
  //     active: translate("apiManagement.AUTHORIZATION") === value,
  //   },
  //   {
  //     label: translate("apiManagement.QUERY_PARAMETERS"),
  //     id: "queryParameters",
  //     active: translate("apiManagement.QUERY_PARAMETERS") === value,
  //   },
  // ];

  const getFormattedData = (saveGetResponseData: any) => {
    const requestResponseStatus =
      saveGetResponseData?.serviceOutput?.response?.status;
    const requestResponseStatusCode =
      saveGetResponseData?.serviceOutput?.response?.statusCode;

    const requestPart = saveGetResponseData?.request;
    const serviceInputPart = saveGetResponseData?.serviceInput;
    const serviceOutputPart = saveGetResponseData?.serviceOutput;
    const responsePart = saveGetResponseData?.response;

    const formattedRequest =
      formatWithLineNumbers(JSON.stringify(requestPart, null, 2)) || "";
    const formattedServiceInput =
      formatWithLineNumbers(JSON.stringify(serviceInputPart, null, 2)) || "";
    const formattedServiceOutput =
      formatWithLineNumbers(JSON.stringify(serviceOutputPart, null, 2)) || "";
    const formattedResponse =
      formatWithLineNumbers(JSON.stringify(responsePart, null, 2)) || "";

    return {
      requestResponseStatus,
      requestResponseStatusCode,
      formattedRequest,
      formattedServiceInput,
      formattedServiceOutput,
      formattedResponse,
    };
  };

  return {
    onOpTabChange,
    capitalizeFirstLetter,
    formatWithLineNumbers,
    validateEmptyName,
    validateSpecialCharacters,
    validateNameLength,
    validateOperationDetails,
    getNavLinks,
    getFormattedData,
  };
}
