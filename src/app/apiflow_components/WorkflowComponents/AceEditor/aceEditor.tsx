import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import { useSelector } from "react-redux";
// import "./ace.css";
import { RootStateType } from "@/app/Redux/store";
import { FlowReducer } from "@/app/Redux/apiManagement/flowReducer";
import GlobalSensitiveData from "@/app/ApiFlowComponents/Global/GlobalSenstiveData";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import { PrimaryTypography } from "@/app/Styles/signInUp";
import { Box } from "@mui/material";
import useTextEditor from "@/app/hooks/useTextEditor";
import useNodes from "@/app/hooks/workflow/useNodes";
import useNodeErr from "@/app/hooks/workflow/useNodeErr";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";
import {
  validateFQLFunctionSyntax,
  validateTernarySyntax,
} from "@/app/Helpers/helpersFunctions";

interface ObjectToSuggest {
  firstName: string;
  lastName: string;
  age: number;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  email: string;
  responses: { id: number; text: string }[];
}

const FQL_FUNCTIONS = [
  {
    name: "appendArray()",
    description: "Appends values to an existing array.",
    syntax: "&appendArray([{value1}, {value2}], [{value3}, {value4}, ...])",
    example:
      "{ \"combinedProducts\": \"&appendArray([{response.node_5mkzc7or.products[0].title}, 'New Product'], ['Additional Product 1', 'Additional Product 2'])\" }",
  },
  {
    name: "upperCase()",
    description: "Transforms a string to all uppercase.",
    syntax: "&upperCase({value})",
    example:
      '{ "title": "&upperCase({response.node_5mkzc7or.products[0].title})" }',
  },
  {
    name: "lowerCase()",
    description: "Transforms a string to all lowercase.",
    syntax: "&lowerCase({value})",
    example:
      '{ "title": "&lowerCase({response.node_5mkzc7or.products[0].title})" }',
  },
  {
    name: "parseJson()",
    description: "Converts a string into JSON.",
    syntax: "&parseJson({value})",
    example:
      '{ "title": "&parseJson({response.node_ts0c4cyi.products[0].title})" }',
  },

  {
    name: "checkCondition()",
    description:
      "Evaluates a condition and returns a value based on the result. Supports nested conditions.",
    syntax:
      "&checkCondition({ifCondition}?{truePart}:{falsePart}) (or) &checkCondition({ifCondition}?{truePart}:{nestedIfCondition}?{truePart}:{elsePart})",
    example:
      '{ "title": "&checkCondition({response.node_4mvfag04.products[0].id}===2?truePart:{response.node_4mvfag04.products[0].id}===1?{response.node_4mvfag04.products[0].price}: falsyPart)" }',
  },
  // Add more functions as needed
];
const validFunctions = FQL_FUNCTIONS.map(
  (elem: any) => elem.name.split("(")[0]
);
const getNestedKeys = (obj: any, prefix = ""): string[] => {
  if (obj == null) {
    return [];
  }

  return Object.keys(obj).reduce((keys: string[], key: string) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === "object" && !Array.isArray(value)) {
      keys.push(fullKey);
      keys = keys.concat(getNestedKeys(value, fullKey));
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object") {
        keys.push(`${fullKey}[0]`);
        keys = keys.concat(getNestedKeys(value[0], `${fullKey}[0]`));
      }
    } else {
      keys.push(fullKey);
    }
    return keys;
  }, []);
};

const sensitiveKeywords: any = {
  password: "Password",
  secret: "Secret",
  token: "Token",
  key: "Key",
  api_key: "API Key",
  email: "Email",
  ssn: "Social Security Number",
  "social security": "Social Security Number",
  "driver’s license": "Driver's License",
  passport: "Passport",
  "bank account": "Bank Account",
  "credit card": "Credit Card",
  "debit card": "Debit Card",
};

const regexPatterns = {
  emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  ssnPattern: /\b\d{3}-\d{2}-\d{4}\b/,
  creditCardPattern: /\b(?:\d[ -]*?){13,16}\b/,
};

const checkSensitiveInformation = (text: string) => {
  let warningMessages: string[] = [];

  for (const keyword in sensitiveKeywords) {
    if (text.toLowerCase().includes(keyword)) {
      warningMessages.push(
        `Sensitive Information Detected: ${sensitiveKeywords[keyword]}`
      );
    }
  }

  if (regexPatterns.emailPattern.test(text)) {
    warningMessages.push(`Sensitive Information Detected: Email Address`);
  }
  if (regexPatterns.ssnPattern.test(text)) {
    warningMessages.push(
      `Sensitive Information Detected: Social Security Number (SSN)`
    );
  }
  if (regexPatterns.creditCardPattern.test(text)) {
    warningMessages.push(`Sensitive Information Detected: Credit Card Number`);
  }

  return warningMessages.length > 0 ? warningMessages.join("\n") : "";
};

const AceEditorComponent = (props: any) => {
  const popoverRef = useRef<any>();

  const { globalResponse } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );
  const [highlightedFunction, setHighlightedFunction] = useState<any>(null); // Default to first function

  const { onInputVal, defaultInputVal, disabled = false, nodeId } = props;
  const { handleErrors } = useNodeErr();
  console.log(defaultInputVal, "defaultInputValdkkd");

  console.log(onInputVal, "onInputValsdsd");

  const editorRef = useRef<any>(null);

  const suggestions = globalResponse
    ? getNestedKeys({ response: globalResponse })
    : [];
  console.log(suggestions, "newsdusuggestions");

  const formatJSON = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      return input;
    }
  };

  const [input, setInput] = useState<string>(defaultInputVal);
  console.log(input, "inputsdsd");

  // const [annotationsArray, setAnnotationsArray] = useState([]);

  const [suggestedKeys, setSuggestedKeys] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [inputType, setInputType] = useState<"json" | "text" | "array">("json");

  const [jsonError, setJsonError] = useState<string>("");
  const [popoverPosition, setPopoverPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isFormatChecked, setIsFormatChecked] = useState<boolean>(false);
  const [errorMarkers, setErrorMarkers] = useState([]);

  const validateJSON = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      if (parsed.responses && typeof parsed.responses !== "object") {
        throw new Error();
      }
      return "";
    } catch (e) {
      return "Invalid JSON format";
    }
  };

  const validateCurlyBraces = (input: string) => {
    const stack: string[] = [];
    for (let char of input) {
      if (char === "{") {
        stack.push(char);
      } else if (char === "}") {
        if (stack.length === 0) {
          return "Unmatched closing brace";
        }
        stack.pop();
      }
    }
    if (stack.length > 0) {
      return "Unmatched opening brace";
    }
    return "";
  };

  const handleJsonValidation = () => {
    const jsonErrorVal = validateJSON(input);
    const braceError = validateCurlyBraces(input);
    setJsonError(jsonErrorVal || braceError || "");
  };

  useEffect(() => {
    if (inputType === "json") {
      handleJsonValidation();
    }
  }, [input, inputType]);

  const handleChange = (newValue: string) => {
    onInputVal(newValue);
    setInput(newValue);

    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const cursor = editor.session.selection.getCursor();
      const cursorPosition = editor.session.doc.positionToIndex(cursor);
      setCursorPosition(cursorPosition);

      const lastOpenBrace = newValue.lastIndexOf("{", cursorPosition);
      const lastOpenAnd = newValue.lastIndexOf("&", cursorPosition);
      const lastQuote = newValue.lastIndexOf('"', cursorPosition);
      const lastKey = newValue.lastIndexOf(":", cursorPosition);

      console.log("Cursor Position:", cursorPosition);
      console.log("Last Open Brace:", lastOpenBrace);
      console.log("Last Open And:", lastOpenAnd);
      console.log("Last Quote:", lastQuote);

      let precedingText: string = "";

      // Handle suggestions when '&' is present
      if (
        lastOpenAnd > -1 &&
        (lastOpenBrace === -1 || lastOpenAnd > lastOpenBrace)
      ) {
        precedingText = newValue
          .substring(lastOpenAnd + 1, cursorPosition)
          .trim();
        console.log("Preceding Text for Functions:", precedingText);

        // const match = precedingText.match(/(\w+)$/);
        const match = precedingText.match(/([&\w]+)$/); // Match the last word including '&'
        if (match) {
          const searchTerm = match[0];
          console.log("Search Term for Functions:", searchTerm);

          if (searchTerm == "&") {
            // When the search term is empty, show all suggestions
            console.log("No search term provided. Showing all suggestions.");
            setSuggestedKeys(FQL_FUNCTIONS.map((func) => func.name));
            updatePopoverPosition(lastOpenAnd + searchTerm.length); // Assuming FQL_FUNCTIONS holds all your function suggestions
            return; // Exit the function after setting all suggestions
          }

          const filteredFqlFunctions: string[] = FQL_FUNCTIONS.filter((func) =>
            func.name.startsWith(searchTerm)
          ).map((func) => func.name);

          console.log(
            "Filtered Suggestions for Functions:",
            filteredFqlFunctions
          );
          setSuggestedKeys(
            filteredFqlFunctions.filter((item) => item.trim() !== "")
          );
          updatePopoverPosition(lastOpenAnd + searchTerm.length);
        } else {
          console.log("No match found for preceding text in function context.");
          setSuggestedKeys([]);
          setPopoverPosition(null);
        }
      }
      // Handle suggestions for keys in JSON context
      else if (
        lastOpenBrace > -1 &&
        (lastOpenAnd === -1 || lastOpenAnd < lastOpenBrace)
      ) {
        precedingText = newValue
          .substring(lastQuote + 1, cursorPosition)
          .trim();
        console.log("Preceding Text for Keys:", precedingText);

        const match = precedingText.match(/(\w+(\[\d+\])?(\.\w+)*)$/);
        if (match) {
          const searchTerm = match[0];
          console.log("Search Term for Keys:", searchTerm);

          const filteredSuggestions: string[] = Object.values(suggestions)
            .filter((value) => value.startsWith(searchTerm))
            .map((value) => value);

          console.log("Filtered Suggestions for Keys:", filteredSuggestions);
          setSuggestedKeys(
            filteredSuggestions.filter((item) => item.trim() !== "")
          );
          updatePopoverPosition(lastQuote + searchTerm.length);
        } else {
          console.log("No match found for preceding text in key context.");
          setSuggestedKeys([]);
          setPopoverPosition(null);
        }
      } else {
        console.log("No relevant context for suggestions.");
        setSuggestedKeys([]);
        setPopoverPosition(null);
      }
    } else {
      console.log("Editor reference is not available.");
    }

    handleJsonValidation();
  };

  const updatePopoverPosition = (dotEndPosition: number) => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const dotPosition = editor.session.doc.indexToPosition(dotEndPosition);
      const dotScreenPos = editor.renderer.textToScreenCoordinates(
        dotPosition.row,
        dotPosition.column + 1
      );
      const editorContainer = editor.renderer.container;
      const editorRect = editorContainer.getBoundingClientRect();

      const popoverTop =
        dotScreenPos.pageY - editorRect.top + editorContainer.scrollTop;
      const popoverLeft =
        dotScreenPos.pageX - editorRect.left + editorContainer.scrollLeft + 10;

      setPopoverPosition({
        top: popoverTop,
        left: popoverLeft,
      });
    }
  };

  const handleSuggestionClick = (key: string) => {
    const cursor = cursorPosition;
    if (editorRef.current) {
      const beforeInsert = input.slice(0, cursor + 1);
      const afterInsert = input.slice(cursor + 1);

      // Check if the character before the cursor is a dot
      const charBeforeCursor = beforeInsert.slice(-1);

      // Determine the new input based on whether a dot was before the cursor
      const newInput =
        charBeforeCursor === "."
          ? `${beforeInsert.slice(0, -1)}${key}${afterInsert}`
          : `${beforeInsert}${key}${afterInsert}`;

      // Calculate the new cursor position, right after the inserted suggestion
      const newCursorPosition = beforeInsert.length + key.length;
      onInputVal(newInput);
      setInput(newInput);
      setCursorPosition(newCursorPosition);
      setSuggestedKeys([]);
      setPopoverPosition(null);
    }
  };

  const isValueContext = () => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const cursor = editor.session.selection.getCursor();
      const cursorPosition = editor.session.doc.positionToIndex(cursor);
      const newValue = input;

      // Find relevant positions
      const lastColon = newValue.lastIndexOf(":", cursorPosition);
      const lastOpenBrace = newValue.lastIndexOf("{", cursorPosition);

      // Determine if the cursor is inside a value context
      if (lastColon !== -1) {
        const afterColon = newValue.slice(lastColon + 1, cursorPosition).trim();
        return afterColon.startsWith('"') || afterColon.startsWith("{");
      }

      return false;
    }
    return false;
  };

  const handleFormatCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsFormatChecked(e.target.checked);
    if (e.target.checked) {
      setInput(formatJSON(input));
    }
  };

  useEffect(() => {
    const editor = editorRef.current.editor;
    editor.session.setOption("useWorker", false);
    editor.commands.addCommand({
      name: "showAutocomplete",
      bindKey: { win: "Ctrl-Space", mac: "Ctrl-Space" },
      exec: function (editor: any) {
        // Handle autocomplete
      },
    });
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setPopoverPosition(null); // Close popover if clicked outside
    }
  };

  const handleInputTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.stopPropagation();
    const newInputType = event.target.value as "json" | "text" | "array";
    setInputType(newInputType);

    // Optionally reset the input value when switching types
    setInput(newInputType === "json" ? formatJSON(input) : input);
    setSuggestedKeys([]); // Clear suggestions when type changes
  };

  const handleSuggestionHover = (key: string) => {
    const selectedFunc = FQL_FUNCTIONS.find((f) => f.name === key);
    if (selectedFunc) {
      setHighlightedFunction(selectedFunc);
    } else {
    }
  };

  const { handleBraces } = useTextEditor();
  const [tempAnnotations, settempAnnotations] = useState<any>([]);
  useEffect(() => {
    const setErrorAnnotations = (editor: any) => {
      const annotations = [];
      if (handleBraces(input)) {
        const error: any = handleBraces(input);
        if (error) {
          annotations.push({
            row: parseInt(error.line) - 1, // Zero-indexed in Ace
            column: parseInt(error.position) - 1, // Zero-indexed in Ace
            text: error.error,
            type: "error",
          });
        }
      }
      if (inputType == "json") {
        if (!input.startsWith("{") || !input.endsWith("}")) {
          annotations.push({
            row: 0,
            column: 0,
            text: "Input must be an object (enclosed in curly braces)",
            type: "error",
          });
        }
        const placeholderRegex = /\{([a-zA-Z0-9_.]+)\}/g;
        let placeholderMatch;
        while ((placeholderMatch = placeholderRegex.exec(input)) !== null) {
          const placeholder = placeholderMatch[1]; // e.g., response.node_id
          // You can add additional validation here to verify that the placeholder is valid (e.g., check known keys)
          // For example, if you want to verify response.node_id format, you can add more specific checks
          if (!placeholder.includes("response")) {
            annotations.push({
              row:
                input.substring(0, placeholderMatch.index).split("\n").length -
                1,
              column:
                placeholderMatch.index -
                input.lastIndexOf("\n", placeholderMatch.index) -
                1,
              text: `Invalid placeholder "${placeholder}"`,
              type: "error",
            });
          }
        }

        // Step 4: Custom parsing for JSON-like structure but ignore function values without quotes
        try {
          const cleanedInput = input
            .replace(
              /:\s*(['"])?(&[a-zA-Z_][a-zA-Z0-9_]*\([^\)]*\))\1/g,
              (match, quote, value) => {
                // For function calls with &, remove quotes around the value
                return `: ${value}`;
              }
            )
            .replace(/:\s*(['"])?\{([^\}]+)\}\1/g, (match, quote, value) => {
              // Always remove the quotes around curly brace expressions
              return `: {${value}}`;
            })
            .replace(/:\s*(['"])?([^\}]+)\1/g, (match, quote, value) => {
              // For other values, remove quotes if they exist
              if (value.indexOf("&") !== -1 || value.startsWith("{")) {
                return `: ${value}`; // No quotes if the value contains "&" or starts with "{"
              } else {
                return `: "${value}"`; // Add quotes for other cases
              }
            });

          const sanitizedInput = cleanedInput
            .replace(/&[a-zA-Z_][a-zA-Z0-9_]*\([^\)]*\)/g, '""')
            .replace(/\{([a-zA-Z0-9_.\[\]]+)\}/g, '""');
          JSON.parse(sanitizedInput);
          setJsonError("");
        } catch (e: any) {
          annotations.push({
            row: e.lineNumber - 1 || 0, // Adjust row if error object provides a lineNumber
            column: e.columnNumber || 0, // If available, else default to 0
            text: `JSON error: ${e.message}`,
            type: "error",
          });

          setJsonError("Invalid JSON format");
        }
      }

      if (inputType === "array") {
        // Step 1: Ensure the input is enclosed in square brackets
        if (!input.startsWith("[") || !input.endsWith("]")) {
          annotations.push({
            row: 0,
            column: 0,
            text: "Input must be an array (enclosed in square brackets)",
            type: "error",
          });
        }

        // Step 2: Check for empty array
        const arrayRegex = /\[([^\]]+)\]/g; // Regex to match arrays
        let arrayMatch: any;
        while ((arrayMatch = arrayRegex.exec(input)) !== null) {
          const arrayContent = arrayMatch[1].trim(); // Content inside the array brackets
          if (arrayContent === "") {
            annotations.push({
              row: input.substring(0, arrayMatch.index).split("\n").length - 1,
              column: arrayMatch.index,
              text: "Empty array found",
              type: "error",
            });
          }
        }
      }
      validateFQLFunctionSyntax({ isAnnotations: true, annotations, input });
      // Step 3: Set annotations in Ace Editor
      editor.getSession().setAnnotations(annotations);
      settempAnnotations(annotations);
    };

    if (editorRef.current) {
      const editor = editorRef.current.editor;
      setErrorAnnotations(editor);
    }
  }, [input, inputType]); // Re-run whenever the code changes

  useEffect(() => {
    if (popoverPosition) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverPosition]);

  const { arr, setArr } = useGlobalStore();
  const customCompleter: any = () => {
    return {
      getCompletions: (
        editor: any,
        session: any,
        pos: any,
        prefix: any,
        callback: any
      ) => {
        // Map the suggestions into the appropriate format
        const suggestionArr = arr.concat(
          FQL_FUNCTIONS.map((elem) => ({
            caption: elem.name,
            value: elem.name,
            // meta: "property",
          }))
        );

        callback(null, suggestionArr);
      },
    };
  };
  const customizedEditor = () => {
    const editor = editorRef.current.editor;
    if (!editor) {
      return;
    }
    editor.completers = [customCompleter()];
    editor.setOptions({
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
    });

    editor.commands.on("afterExec", function (e: any) {
      const cursorposition = editor.getCursorPosition();
      if (e.command.name == "backspace") {
        const editor = editorRef.current.editor;
        const cursorPosition = editor.session.selection.getCursor();
        const cursor = editor.session.doc.positionToIndex(cursorPosition);
        setCursorPosition(cursor - 1);
      }

      const row = cursorposition.row;
      const lineText = editor.session.getLine(row);
      let lastOpenBrace = -1;
      for (let i = cursorposition.column - 1; i >= 0; i--) {
        if (lineText[i] === "{") {
          lastOpenBrace = i;
          break;
        }
      }
      let lastAnd = -1;
      for (let i = cursorposition.column - 1; i >= 0; i--) {
        if (lineText[i] === "&") {
          lastAnd = i;
          break;
        }
      }
      const startAndText = lineText.substring(lastAnd, cursorposition.column);
      const startText = lineText
        .substring(lastOpenBrace, cursorposition.column)
        .replace("{", "");
      const andMatch = startAndText.match(/([&\w]+)$/);
      const match = startText.match(/(\w+(\[\d+\])?)(\.\w+(\[\d+\])?)*/);

      if (match) {
        const prefix = match[0];
        const filteredSuggestions = suggestions
          .filter((key) =>
            key.toLowerCase().trim().startsWith(prefix.toLowerCase().trim())
          )
          .map((key) => key.substring(prefix.length));

        if (andMatch && andMatch[0].includes("&")) {
          const text = lineText.trim();
          const andIndex = text.indexOf(startAndText);
          const nextToAnd = text
            .substring(andIndex)
            .replace(startAndText, "")[0];
          const isExist = !!(
            text.substring(andIndex, text.indexOf("(")).indexOf(startAndText) ==
            0
          );
          const isNotFunction = (nextToAnd && nextToAnd == "(") || isExist;

          const prefix = andMatch[0].replace("&", "");
          const suggestionArr =
            prefix && isNotFunction
              ? validFunctions
              : FQL_FUNCTIONS.map((elem) => elem.name);

          setSuggestedKeys(
            suggestionArr
              .filter((key) =>
                key.toLowerCase().trim().startsWith(prefix.toLowerCase().trim())
              )
              .map((key) => key.substring(prefix.length))
          );
        } else {
          setSuggestedKeys(
            filteredSuggestions.filter((item) => item.trim() !== "")
          );
        }
      } else {
        setSuggestedKeys([]);
      }
    });
  };

  useEffect(() => {
    customizedEditor();
  }, []);
  const { setInputData } = useWorkflowStore();
  useEffect(() => {
    setInputData(nodeId, {
      key: "input",
      value: {
        input: input,
        isErr: jsonError || tempAnnotations.length > 0 ? true : false,
      },
    });
  }, [jsonError, nodeId, tempAnnotations.length]);

  return (
    <>
      <div
        style={{
          background: "white",
          boxShadow: "0px 0px 4px 2px #00000030",
          borderRadius: 10,
          margin: "5px 0 0 5px",
          overflow: "hidden",
          width: "415px",
          padding: "5px",
        }}
      >
        <div
          style={{
            padding: "15px",
            maxHeight: "250px",
            width: "410px",
            overflowY: "auto",
            overflowX: "hidden",
            paddingRight: "17px",
          }}
        >
          <PrimaryTypography
            style={{
              fontWeight: 900,
            }}
          >
            Operation Input
          </PrimaryTypography>
          <select
            value={inputType}
            onChange={handleInputTypeChange}
            style={{ marginBottom: "10px" }}
          >
            <option value="json">JSON</option>
            <option value="text">Text</option>
            <option value="array">Array</option>
          </select>
          <AceEditor
            readOnly={disabled}
            ref={editorRef}
            mode="json"
            //  mode={warning ? "json" : "text"}
            theme="tomorrow"
            onChange={handleChange}
            name="json_editor"
            editorProps={{ $blockScrolling: true }}
            value={input}
            width="100%"
            minLines={200}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            style={{
              maxHeight: "180px",
              width: "380px",
            }}

            // markers={markers}
            // annotations={annotations} // Pass the annotations to the editor
          />

          <div
            style={{
              whiteSpace: "pre-wrap",
              marginTop: "10px",
              background: "#f7f7f7",
              padding: "10px",
              borderRadius: "7px",
            }}
          >
            <GlobalSensitiveData jsonData={formatJSON(input)} />
          </div>
          {jsonError.trim() !== "" && (
            <div style={{ color: "red" }}>{jsonError}</div>
          )}

          {inputType === "json" && (
            <div>
              <input
                type="checkbox"
                checked={isFormatChecked}
                onChange={handleFormatCheckboxChange}
              />
              <label>Format JSON</label>
            </div>
          )}
        </div>
      </div>
      {suggestedKeys.length > 0 && popoverPosition && (
        <Box
          ref={popoverRef}
          style={{
            position: "absolute",
            top: `${popoverPosition.top + 84}px`,
            left: `${popoverPosition.left}px`,
            backgroundColor: "white",
            border: "1px solid #ccc",
            zIndex: 9999,
            padding: "5px 3px 3px 5px",
            margin: 0,
            display: "flex",
            borderRadius: "10px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              maxHeight: "200px",
              overflow: "auto",
              width: "350px",
            }}
          >
            {suggestedKeys.map((key, index) => (
              <li
                key={index}
                onMouseEnter={() => handleSuggestionHover(key)}
                onClick={() => handleSuggestionClick(key)}
                style={{
                  cursor: "pointer",
                  padding: "2px 5px",
                  backgroundColor:
                    highlightedFunction && highlightedFunction?.name === key
                      ? "#f0f0f0"
                      : "transparent",
                }}
              >
                {key}

                {highlightedFunction && highlightedFunction?.name == key && (
                  <div style={{ width: "100%", paddingLeft: "10px" }}>
                    <h6>{highlightedFunction?.name}</h6>
                    <p>
                      <strong>Description:</strong>{" "}
                      {highlightedFunction?.description}
                    </p>
                    <p>
                      <strong>Syntax:</strong>{" "}
                      <code>{highlightedFunction?.syntax}</code>
                    </p>
                    <p>
                      <strong>Example:</strong>{" "}
                      <code>{highlightedFunction?.example}</code>
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </>
  );
};

export default AceEditorComponent;
