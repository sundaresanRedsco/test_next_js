import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import React from "react";
import useTextEditor from "../useTextEditor";
import { useReactFlow } from "reactflow";
import { validateFQLFunctionSyntax } from "@/app/Helpers/helpersFunctions";

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
export default function useNodeErr() {
  const { handleBraces } = useTextEditor();
  const { getEdges, getNodes } = useReactFlow();
  const {
    setInputData,
    setNodeErrors,
    nodeErrors,
    inputdatas,
    updateInputData,
    setParticularInputData,
  } = useWorkflowStore();

  const handleAddInitialErrors = (arr: any) => {
    let annotations: any = [];
    arr.forEach((node: any) => {
      setParticularInputData(node.id, {
        input: { input: "", isErr: false },
        header: [],
        params: [],
        edge: [{ input: [], isErr: false }],
      });
    });
    arr
      .filter(
        (node: any) =>
          node?.type != "groupNode" && node?.type != "startButtonNode"
      )
      .forEach((node: any) => {
        let data = node?.data ? JSON.parse(node?.data) : null;
        let inputdata =
          data && data?.raw_payload
            ? parseData(data?.raw_payload) || data?.raw_payload
            : "";
        if (data?.raw_payload) {
          validateFQLFunctionSyntax({
            isAnnotations: true,
            annotations,
            input: data?.raw_payload,
          });
        }
        if (inputdata) {
          setInputData(node.id, {
            key: "input",
            value: {
              input: inputdata,
              isErr:
                handleBraces(inputdata) || annotations.length > 0
                  ? true
                  : false,
            },
          });
        }
        setNodeErrors(node.id, []);
        if (data?.operations_header) {
          data?.operations_header.forEach((input: any) => {
            setInputData(node.id, {
              key: "header",
              value: { input: input.test_value, isErr: false },
            });
          });
        } else {
          setInputData(node.id, {
            key: "header",
            value: { input: "", isErr: false },
          });
        }
        if (data?.operations_query_param) {
          data?.operations_query_param.forEach((input: any) => {
            setInputData(node.id, {
              key: "params",
              value: { input: input.test_value, isErr: false },
            });
          });
        } else {
          setInputData(node.id, {
            key: "params",
            value: { input: "", isErr: false },
          });
        }
        setInputData(node.id, {
          key: "edge",
          value: { input: [], isErr: false },
        });
      });
  };

  const handleErrors = (id: any) => {
    const keys = ["input", "header", "params", "edge", "keys"];
    let nodeErrKeys: any = [];
    let annotations: any = [];
    const inputs = inputdatas[id];
    for (let index = 0; index < 4; index++) {
      const key = keys[index];
      const element = inputs ? inputs[key] : null;

      if (element && Array.isArray(element) && key != "edge") {
        if (element?.some((elem: any) => elem.isErr == true)) {
          nodeErrKeys.push(key);
        } else {
          if (nodeErrKeys.includes(key)) {
            nodeErrKeys = nodeErrKeys.filter((elem: any) => elem != key);
          }
        }
      } else if (element && Array.isArray(element) && key == "edge") {
        element[0]?.input?.forEach((elem: any) => {
          if (!nodeErrKeys.includes(elem)) {
            nodeErrKeys.push(elem);
          }
        });
      } else if (key == "input") {
        validateFQLFunctionSyntax({
          isAnnotations: true,
          annotations,
          input: JSON.stringify(element?.input),
        });
        (handleBraces(element?.input) || annotations.length > 0) &&
        !nodeErrKeys?.includes(key)
          ? nodeErrKeys?.push(key)
          : null;
      }
    }

    const errMessage: any = {
      input: "Error at input",
      header: "Error at header",
      params: "Error at query params",
      keys: "Error at global keys",
      source: "Success edge not connected",
      target: "Input edge not connected",
    };
    if (!nodeErrors[id]) {
      setNodeErrors(id, []);
    }
    let tempErrors: any = [];
    nodeErrKeys.forEach((err: any) => {
      tempErrors.push(errMessage[err]);
    });
    setNodeErrors(id, tempErrors);
  };
  const handleEdgeError = (tempId: any, value: boolean) => {
    const nodes = getNodes().filter(
      (node: any) => node.type == "operationNode"
    );
    if (nodes.length > 0) {
      nodes.forEach(({ id }, index) => {
        const sourceErr = getEdges().every(
          (edge: any) => !edge.source.includes(id)
        );
        const targetErr = getEdges().every(
          (edge: any) => !edge.target.includes(id)
        );

        if (sourceErr || targetErr) {
          if (sourceErr && targetErr) {
            updateInputData(id, {
              index: 0,
              value: { input: ["source", "target"], isErr: true },
              key: "edge",
            });
          } else if (sourceErr) {
            updateInputData(id, {
              index: 0,
              value: { input: ["source"], isErr: true },
              key: "edge",
            });
          } else if (targetErr) {
            updateInputData(id, {
              index: 0,
              value: { input: ["target"], isErr: true },
              key: "edge",
            });
          }
        } else {
          updateInputData(id, {
            index: 0,
            value: { input: [], isErr: false },
            key: "edge",
          });
        }
      });
    }
  };

  return { handleAddInitialErrors, handleErrors, handleEdgeError };
}
