import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../Redux/store";
import { FlowReducer } from "../../../Redux/apiManagement/flowReducer";
import debounce from "lodash/debounce";
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { FQL_FUNCTIONS } from "@/app/Constants/JsonDatas";
import { Close, ErrorOutline } from "@mui/icons-material";
import useTextEditor from "@/app/hooks/useTextEditor";
import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import useNodes from "@/app/hooks/workflow/useNodes";
import useNodeErr from "@/app/hooks/workflow/useNodeErr";
import { useWorkflowStore } from "@/app/store/useWorkflowStore";

interface TextEditorProps {
  inputData?: string | null;
  editorId?: any;
  objectToSuggest?: any;
  onChange?: any;
  multiline: boolean;
  currentNode: string;
  disabled?: boolean;
  nodeId?: any;
  keyName?: any;
  index?: any;
}

const getNestedKeys = (obj: any, prefix = ""): string[] => {
  if (obj) {
    let keys: string[] = [];

    Object.keys(obj).forEach((key: string) => {
      const value = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object") {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === "object") {
              keys.push(`${fullKey}[${index}]`);
              keys = keys.concat(getNestedKeys(item, `${fullKey}[${index}]`));
            } else {
              keys.push(`${fullKey}[${index}]`);
            }
          });
        } else {
          keys.push(fullKey);
          keys = keys.concat(getNestedKeys(value, fullKey));
        }
      } else {
        keys.push(fullKey);
      }
    });

    return keys;
  }
  return [];
};

const TextEditor: React.FC<TextEditorProps> = ({
  inputData,
  objectToSuggest,
  currentNode,
  onChange,
  multiline,
  disabled = false,
  editorId,
  nodeId,
  keyName,
  index,
}) => {
  const { updateInputData, inputdatas } = useWorkflowStore();
  const { globalKeys, globalResponse } = useSelector<
    RootStateType,
    FlowReducer
  >((state) => state.apiManagement.apiFlowDesign);

  const modifiedResponse = useMemo(
    () => (globalResponse ? removeKey(globalResponse, currentNode) : {}),
    [globalResponse, currentNode]
  );

  const suggestions = useMemo(() => {
    return getNestedKeys(
      objectToSuggest
        ? { response: objectToSuggest }
        : modifiedResponse
        ? { response: modifiedResponse }
        : {}
    );
  }, [objectToSuggest, modifiedResponse]);
  const { errorMsg, input, setInput, handleValidation } = useTextEditor(
    inputData,
    keyName,
    nodeId,
    index
  );

  // const [input, setInput] = useState<any>(inputData);
  const [suggestedKeys, setSuggestedKeys] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const debouncedUpdateSuggestions = useCallback(
    debounce((value: string, cursor: number) => {
      updateSuggestions(value, cursor);
    }, 300),
    []
  );

  const updateSuggestions = (value: string, cursor: number) => {
    setInput(value);
    setCursorPosition(cursor);
    onChange(value);

    // const lastOpenBrace = value.lastIndexOf("{", cursor);
    const lastOpenAnd = value.lastIndexOf("&", cursor);
    const lastQuote = value.lastIndexOf('"', cursor);

    // let precedingText: string = "";

    // if (
    //   (lastOpenAnd > -1 && lastOpenBrace === -1) ||
    //   lastOpenAnd > lastOpenBrace
    // ) {
    //   precedingText = value.substring(lastOpenAnd + 1, cursorPosition).trim();
    //   console.log("Preceding Text for Functions:", precedingText);

    //   const match = value.match(/([&\w]+)$/);
    //   if (match) {
    //     const searchTerm = match[0];
    //     console.log("Search Term for Functions:", searchTerm);

    //     if (searchTerm == "&") {
    //       // When the search term is empty, show all suggestions
    //       console.log("No search term provided. Showing all suggestions.");
    //       setSuggestedKeys(FQL_FUNCTIONS.map((func) => func.name));
    //       // updatePopoverPosition(lastOpenAnd + searchTerm.length); // Assuming FQL_FUNCTIONS holds all your function suggestions
    //       return; // Exit the function after setting all suggestions
    //     }
    //     const validFunctions = [
    //       "appendArray",
    //       "upperCase",
    //       "lowerCase",
    //       "parseJson",
    //       "checkCondition",
    //     ];
    //     const text = value.trim();
    //     const andIndex = text.indexOf("&");
    //     const nextToAnd = text.substring(andIndex).replace("&", "")[0];
    //     const isExist = !!(
    //       text.substring(andIndex, text.indexOf("(")).indexOf("&") == 0
    //     );
    //     const isNotFunction = (nextToAnd && nextToAnd == "(") || isExist;

    //     const prefix = match[0].replace("&", "");
    //     const suggestionArr =
    //       prefix && isNotFunction
    //         ? validFunctions
    //         : FQL_FUNCTIONS.map((elem) => elem.name);
    //     console.log(suggestionArr, "showErr1");

    //     const filteredFqlFunctions: string[] = FQL_FUNCTIONS.filter((func) =>
    //       func.name.startsWith(searchTerm)
    //     ).map((func) => func.name);

    //     console.log(
    //       "Filtered Suggestions for Functions:",
    //       filteredFqlFunctions
    //     );
    //     setSuggestedKeys(
    //       filteredFqlFunctions.filter((item) => item.trim() !== "")
    //     );
    //     // updatePopoverPosition(lastOpenAnd + searchTerm.length);
    //   } else {
    //     console.log("No match found for preceding text in function context.");
    //     setSuggestedKeys([]);
    //     // setPopoverPosition(null);
    //   }
    // }

    // if (lastOpenBrace > lastQuote) {
    //   const precedingText = value.substring(lastOpenBrace + 1, cursor);
    //   const match = precedingText.match(/(\w+(\[\d+\])?)(\.\w+(\[\d+\])?)*/);

    //   if (match) {
    //     const prefix = match[0];

    //     const filteredSuggestions = suggestions
    //       .filter((key) => key.startsWith(prefix))
    //       .map((key) => key.substring(prefix.length));

    //     setSuggestedKeys(
    //       filteredSuggestions.filter((item) => item.trim() !== "")
    //     );
    //   } else {
    //     setSuggestedKeys([]);
    //   }
    // } else {
    //   setSuggestedKeys([]);
    // }
    const validFunctions = [
      "appendArray",
      "upperCase",
      "lowerCase",
      "parseJson",
      "checkCondition",
    ];
    const lineText = value;
    let lastOpenBrace = -1;
    for (let i = cursor - 1; i >= 0; i--) {
      if (lineText[i] === "{") {
        lastOpenBrace = i;
        break;
      }
    }
    let lastAnd = -1;
    for (let i = cursor - 1; i >= 0; i--) {
      if (lineText[i] === "&") {
        lastAnd = i;
        break;
      }
    }
    const startAndText = lineText.substring(lastAnd, cursor);
    const startText = lineText
      .substring(lastOpenBrace, cursor)
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
        const nextToAnd = text.substring(andIndex).replace(startAndText, "")[0];
        const isExist = !!(
          text.substring(andIndex, text.indexOf("(")).indexOf(startAndText) == 0
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
        if (filteredSuggestions.length > 0) {
          setSuggestedKeys(
            filteredSuggestions.filter((item) => item.trim() !== "")
          );
        } else {
          setSuggestedKeys([]);
        }
      }
    } else if (value.includes("&")) {
      setSuggestedKeys(FQL_FUNCTIONS.map((key) => key.name));
    } else {
      setSuggestedKeys([]);
    }
  };

  function removeKey(obj: any, key: any) {
    const newObj = { ...obj };
    if (newObj[key]) {
      delete newObj[key];
    }
    return newObj;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const cursor = event.target.selectionStart || 0;
    debouncedUpdateSuggestions(value, cursor);
  };
  const [open, setopen] = useState(false);
  const handleSuggestionClick = (key: string) => {
    setopen(false);
    if (inputRef.current) {
      const value = input;
      const cursor = cursorPosition;

      // Determine the text segments before and after the cursor
      const beforeInsert = value.slice(0, cursor);
      const afterInsert = value.slice(cursor);

      // Check if the character before the cursor is a dot
      const charBeforeCursor = beforeInsert.slice(-1);

      // Determine the new input based on whether a dot was before the cursor
      const newInput =
        charBeforeCursor === "."
          ? `${beforeInsert.slice(0, -1)}${key}${afterInsert}`
          : `${beforeInsert}${key}${afterInsert}`;

      // Calculate the new cursor position, right after the inserted suggestion
      const newCursorPosition = beforeInsert.length + key.length;

      // Update state with the new input and cursor position
      setInput(newInput);
      onChange(newInput);
      setCursorPosition(newCursorPosition);

      // Focus on the input field and set the cursor position
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);

      // Clear suggestions
      setSuggestedKeys([]);
    }
  };

  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const option = suggestedKeys[index];

    return (
      <li
        style={{ cursor: "pointer", ...style }}
        key={option}
        onClick={() => handleSuggestionClick(option)}
      >
        {option}
      </li>
    );
  };

  interface ListboxComponentProps {
    children?: React.ReactNode;
  }

  const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    ListboxComponentProps
  >(function ListboxComponent(props, ref) {
    const { children, ...other } = props;

    const itemData = Array.isArray(children) ? children : [];

    return (
      <div ref={ref} {...other}>
        <FixedSizeList
          height={200}
          width="100%"
          itemSize={35}
          itemCount={itemData.length}
          itemData={itemData}
        >
          {renderRow}
        </FixedSizeList>
      </div>
    );
  });
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openError = Boolean(anchorEl);
  const id =
    openError && errorMsg ? "simpleopenError-popover" + editorId : undefined;
  useEffect(() => {
    const currentInputs = inputdatas[nodeId];
    const currentKeyValues = currentInputs[keyName];
    if (currentInputs && currentKeyValues && input != currentKeyValues[index]) {
      updateInputData(nodeId, {
        index,
        value: { input, isErr: errorMsg ? true : false },
        key: keyName,
      });
    }
  }, [input, errorMsg, index, keyName, inputData]);

  return (
    <div style={{ position: "relative" }}>
      <Autocomplete
        open={open}
        onOpen={() => setopen(true)}
        disablePortal
        disabled={disabled}
        id="autocomplete"
        size="small"
        options={suggestedKeys}
        value={input}
        onInputChange={(event, newValue) => {
          if (newValue !== undefined) {
            handleInputChange({
              target: {
                value: newValue,
                selectionStart: inputRef.current?.selectionStart || 0,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        ListboxComponent={ListboxComponent}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={inputRef}
            onClick={() => {
              updateSuggestions(input, inputRef.current?.selectionStart || 0);
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment
                  sx={{
                    background: "#ef5839",
                    borderRadius: "5px",

                    height: "18px",
                    width: "18px",
                    display: errorMsg ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "default",
                    position: "relative",
                  }}
                  position="start"
                >
                  <IconButton
                    aria-describedby={id}
                    aria-owns={id}
                    aria-haspopup="true"
                    // onMouseEnter={handleClick}
                    // onMouseLeave={handleClick}
                    onClick={handleClick}
                  >
                    <Close
                      sx={{
                        textAlign: "center",
                        fontSize: "15px",
                        color: "white",
                      }}
                    />
                  </IconButton>
                  <Popover
                    id={id}
                    open={openError}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <TeritaryTextTypography
                      sx={{
                        p: "5px",
                        alignItems: "center",
                        display: "flex",
                        color: "gray",
                        fontSize: "12px",
                      }}
                    >
                      <ErrorOutline sx={{ color: "#ef5839" }} /> {errorMsg}
                    </TeritaryTextTypography>
                  </Popover>
                </InputAdornment>
              ),
            }}
          />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            handleSuggestionClick(newValue);
          }
        }}
        filterOptions={(options) => options}
      />
    </div>
  );
};

export default TextEditor;
