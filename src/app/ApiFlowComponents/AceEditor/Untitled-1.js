// import React, { useState, useEffect, useRef } from "react";
// import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/mode-json";
// import "ace-builds/src-noconflict/theme-tomorrow";
// import "ace-builds/src-noconflict/ext-language_tools";
// import { useSelector } from "react-redux";
// import { RootStateType } from "../../Redux/store";
// import { FlowReducer } from "../../Redux/apiManagement/flowReducer";
// import WarningIcon from "@mui/icons-material/Warning"; // Import Material UI warning icon
// import { Typography } from "@mui/material";
// import GlobalSensitiveData from "../Global/GlobalSenstiveData";

// interface ObjectToSuggest {
//   firstName: string;
//   lastName: string;
//   age: number;
//   address: {
//     street: string;
//     city: string;
//     postalCode: string;
//   };
//   email: string;
//   responses: { id: number; text: string }[];
// }

// const AceEditorComponent = (props: any) => {
//   const { globalResponse, runSingleNodeData } = useSelector<
//     RootStateType,
//     FlowReducer
//   >((state) => state.apiManagement.apiFlowDesign);

//   const { onInputVal, defaultInputVal, disabled = false } = props;

//   const editorRef = useRef<any>(null);
//   const popoverRef = useRef<HTMLDivElement | null>(null);

//   const getNestedKeys = (obj: any, prefix = ""): string[] => {
//     if (obj == null) {
//       return [];
//     }

//     return Object.keys(obj).reduce((keys: string[], key: string) => {
//       const fullKey = prefix ? `${prefix}.${key}` : key;
//       const value = obj[key];
//       if (typeof value === "object" && !Array.isArray(value)) {
//         keys.push(fullKey);
//         keys = keys.concat(getNestedKeys(value, fullKey));
//       } else if (Array.isArray(value)) {
//         if (value.length > 0 && typeof value[0] === "object") {
//           keys.push(`${fullKey}[0]`);
//           keys = keys.concat(getNestedKeys(value[0], `${fullKey}[0]`));
//         }
//       } else {
//         keys.push(fullKey);
//       }
//       return keys;
//     }, []);
//   };

//   const suggestions = globalResponse
//     ? getNestedKeys({ response: globalResponse })
//     : [];

//   const formatJSON = (input: string) => {
//     try {
//       const parsed = JSON.parse(input);
//       return JSON.stringify(parsed, null, 2);
//     } catch (e) {
//       return input;
//     }
//   };
//   const [isFormatChecked, setIsFormatChecked] = useState<boolean>(false);
//   const [input, setInput] = useState<string>(defaultInputVal);
//   const [suggestedKeys, setSuggestedKeys] = useState<string[]>([]);
//   const [cursorPosition, setCursorPosition] = useState<number>(0);
//   const [inputType, setInputType] = useState<"json" | "text">("json");
//   const [jsonError, setJsonError] = useState<string>("");
//   const [warning, setWarning] = useState("");
//   const [popoverPosition, setPopoverPosition] = useState<{
//     top: number;
//     left: number;
//   } | null>(null);

//   const validateJSON = (input: string) => {
//     try {
//       const parsed = JSON.parse(input);
//       if (parsed.responses && typeof parsed.responses !== "object") {
//         throw new Error();
//       }
//       return "";
//     } catch (e) {
//       return "Invalid JSON format";
//     }
//   };

//   const validateCurlyBraces = (input: string) => {
//     const stack: string[] = [];
//     for (let char of input) {
//       if (char === "{") {
//         stack.push(char);
//       } else if (char === "}") {
//         if (stack.length === 0) {
//           return "Unmatched closing brace";
//         }
//         stack.pop();
//       }
//     }
//     if (stack.length > 0) {
//       return "Unmatched opening brace";
//     }
//     return "";
//   };

//   const handleJsonValidation = () => {
//     const jsonErrorVal = validateJSON(input);
//     const braceError = validateCurlyBraces(input);
//     setJsonError(jsonErrorVal || braceError || "");
//   };

//   useEffect(() => {
//     if (inputType === "json") {
//       handleJsonValidation();
//     }
//   }, [input, inputType]);

//   const sensitiveKeywords: any = {
//     password: "Password",
//     secret: "Secret",
//     token: "Token",
//     key: "Key",
//     api_key: "API Key",
//     email: "Email",
//     ssn: "Social Security Number",
//     "social security": "Social Security Number",
//     "driver’s license": "Driver's License",
//     passport: "Passport",
//     "bank account": "Bank Account",
//     "credit card": "Credit Card",
//     "debit card": "Debit Card",
//   };

//   const regexPatterns = {
//     emailPattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
//     ssnPattern: /\b\d{3}-\d{2}-\d{4}\b/,
//     creditCardPattern: /\b(?:\d[ -]*?){13,16}\b/,
//   };

//   const checkSensitiveInformation = (text: string) => {
//     let warningMessages: string[] = [];

//     for (const keyword in sensitiveKeywords) {
//       if (text.toLowerCase().includes(keyword)) {
//         warningMessages.push(
//           `Sensitive Information Detected: ${sensitiveKeywords[keyword]}`
//         );
//       }
//     }

//     if (regexPatterns.emailPattern.test(text)) {
//       warningMessages.push(`Sensitive Information Detected: Email Address`);
//     }
//     if (regexPatterns.ssnPattern.test(text)) {
//       warningMessages.push(
//         `Sensitive Information Detected: Social Security Number (SSN)`
//       );
//     }
//     if (regexPatterns.creditCardPattern.test(text)) {
//       warningMessages.push(
//         `Sensitive Information Detected: Credit Card Number`
//       );
//     }

//     return warningMessages.length > 0 ? warningMessages.join("\n") : "";
//   };

//   const handleChange = (newValue: string) => {
//     console.log(newValue, "NewValueNewValue");
//     onInputVal(newValue);
//     setInput(newValue);
//     // const warningMessage = checkSensitiveInformation(newValue);
//     // setWarning(warningMessage);

//     if (editorRef.current) {
//       const editor = editorRef.current.editor;
//       const cursor = editor.session.selection.getCursor();
//       const cursorPosition = editor.session.doc.positionToIndex(cursor);
//       setCursorPosition(cursorPosition);

//       const lastOpenBrace = newValue.lastIndexOf('{"', cursorPosition);
//       const lastQuote = newValue.lastIndexOf('"', cursorPosition);

//       const braceIsInsideQuotes = lastQuote > lastOpenBrace;
//       let precedingText: string = "";

//       if (braceIsInsideQuotes) {
//         precedingText = newValue.substring(lastQuote + 1, cursorPosition);
//         // console.log("Preceding Text:", precedingText);

//         // const match = precedingText.match(/(\w+(\[\d+\])?(\.\w+)*)$/);
//         // console.log("Match:", match);

//         // if (match) {
//         //   const searchTerm = match[0];
//         //   console.log("Search Term:", searchTerm);

//         //   const filteredSuggestions: string[] = Object.values(suggestions)
//         //     .filter((value) => {
//         //       const result = value.startsWith(searchTerm);
//         //       console.log(
//         //         `Filtering value '${value}' with searchTerm '${searchTerm}':`,
//         //         result
//         //       );
//         //       return result;
//         //     })
//         //     .map((value) => {
//         //       console.log(`Value '${value}'`);
//         //       return value;
//         //     });

//         //   console.log("Filtered Suggestions:", filteredSuggestions);

//         const match = precedingText.match(/(\w+(\[\d+\])?)/g);
//         if (match && match.length > 0) {
//           const lastWord = match[match.length - 1];
//           const filteredSuggestions = suggestions.filter((key) =>
//             key.includes(lastWord)
//           );
//           setSuggestedKeys(filteredSuggestions);
//         } else {
//           setSuggestedKeys([]);
//         }
//       } else {
//         setSuggestedKeys([]);
//       }

//       if (precedingText.endsWith('"')) {
//         setPopoverPosition({
//           top: cursor.row * 20,
//           left: cursor.column * 10, // Adjust left position for better visibility
//         });
//       } else {
//         setPopoverPosition(null);
//       }
//     } else {
//       console.log("Editor reference is not available.");
//     }

//     handleJsonValidation();
//   };

//   const updatePopoverPosition = (dotEndPosition: number) => {
//     if (editorRef.current) {
//       const editor = editorRef.current.editor;
//       const dotPosition = editor.session.doc.indexToPosition(dotEndPosition);
//       const dotScreenPos = editor.renderer.textToScreenCoordinates(
//         dotPosition.row,
//         dotPosition.column + 1
//       );
//       const editorContainer = editor.renderer.container;
//       const editorRect = editorContainer.getBoundingClientRect();

//       const popoverTop =
//         dotScreenPos.pageY - editorRect.top + editorContainer.scrollTop;
//       const popoverLeft =
//         dotScreenPos.pageX - editorRect.left + editorContainer.scrollLeft + 10;

//       setPopoverPosition({
//         top: popoverTop,
//         left: popoverLeft,
//       });
//     }
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     if (editorRef.current) {
//       const editor = editorRef.current.editor;
//       const cursor = editor.session.selection.getCursor();
//       const newInput =
//         input.substring(0, cursor.index) +
//         suggestion +
//         input.substring(cursor.index);
//       const newCursorPosition = cursor.index + suggestion.length;

//       // Update the state and clear suggestions
//       setInput(newInput);
//       setCursorPosition(newCursorPosition);
//       setSuggestedKeys([]); // Clear suggestions after selection
//       setPopoverPosition(null); // Hide popover
//     }
//   };

//   const isValueContext = () => {
//     if (editorRef.current) {
//       const editor = editorRef.current.editor;
//       const cursor = editor.session.selection.getCursor();
//       const cursorPosition = editor.session.doc.positionToIndex(cursor);
//       const newValue = input;

//       // Find relevant positions
//       const lastColon = newValue.lastIndexOf(":", cursorPosition);
//       const lastOpenBrace = newValue.lastIndexOf("{", cursorPosition);

//       // Determine if the cursor is inside a value context
//       if (lastColon !== -1) {
//         const afterColon = newValue.slice(lastColon + 1, cursorPosition).trim();
//         return afterColon.startsWith('"') || afterColon.startsWith("{");
//       }

//       return false;
//     }
//     return false;
//   };

//   const handleFormatCheckboxChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setIsFormatChecked(e.target.checked);
//     if (e.target.checked) {
//       setInput(formatJSON(input));
//     }
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (
//       popoverRef.current &&
//       !popoverRef.current.contains(event.target as Node)
//     ) {
//       setPopoverPosition(null); // Close popover if clicked outside
//     }
//   };

//   useEffect(() => {
//     if (popoverPosition) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [popoverPosition]);

//   useEffect(() => {
//     const editor = editorRef.current.editor;
//     editor.session.setOption("useWorker", false);
//     editor.commands.addCommand({
//       name: "showAutocomplete",
//       bindKey: { win: "Ctrl-Space", mac: "Ctrl-Space" },
//       exec: function (editor: any) {
//         // Handle autocomplete
//       },
//     });
//   }, []);
//   // const renderHighlightedJSON = (json: string) => {
//   //   const sensitiveWordsRegex = new RegExp(`(${Object.keys(sensitiveKeywords).join('|')})`, 'gi');
//   //   return json.split(sensitiveWordsRegex).map((part, index) => {
//   //     if (sensitiveWordsRegex.test(part)) {
//   //       return <span key={index} style={{ backgroundColor: '#E50001',fontFamily:"Inter-Regular",color:"white",padding:"2px",borderRadius:"4px",fontSize:"9px" }}>{part}</span>;
//   //     }
//   //     return part;
//   //   });
//   // };

//   return (
//     <div>
//       {/* {warning && (
//         <label style={{ color: 'red', display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//           <WarningIcon style={{ fontSize: "8px", marginRight: "5px" }} />
//           <Typography variant="caption" component="span" style={{ fontSize: '8px' }}>
//             {warning}
//           </Typography>
//         </label>
//       )} */}

//       <AceEditor
//         ref={editorRef}
//         mode={warning ? "json" : "text"}
//         value={formatJSON(input)} // Format JSON on input
//         onChange={handleChange}
//         name="json_editor"
//         editorProps={{ $blockScrolling: true }}
//         theme="tomorrow"
//         fontSize={14}
//         width="100%"
//         height="300px"
//         showPrintMargin={false}
//         highlightActiveLine={true}
//         setOptions={{
//           showLineNumbers: true,
//           tabSize: 2,
//           enableBasicAutocompletion: true,
//           enableLiveAutocompletion: true,
//           enableSnippets: true,
//         }}
//       />
//       {jsonError.trim() !== "" && (
//         <div style={{ color: "red" }}>{jsonError}</div>
//       )}
//       {/* {suggestedKeys.length > 0 && popoverPosition && isValueContext() && (
//         <ul

//       {/* Display highlighted JSON */}
//       <div
//         style={{
//           whiteSpace: "pre-wrap",
//           marginTop: "10px",
//           background: "#f7f7f7",
//           padding: "10px",
//           borderRadius: "7px",
//         }}
//       >

//         <GlobalSensitiveData jsonData={formatJSON(input)} />
//       </div>

//       {jsonError.trim() !== "" && (
//         <div style={{ color: "red" }}>{jsonError}</div>
//       )}

//       {/* Suggestions Popover */}
//       {popoverPosition && (
//         <div
//           style={{
//             position: "absolute",
//             top: popoverPosition.top,
//             left: popoverPosition.left,
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
//             zIndex: 1,
//           }}
//         >
//           {suggestedKeys.map((suggestion, index) => (
//             <div
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               style={{
//                 padding: "8px",
//                 cursor: "pointer",
//                 borderBottom: "1px solid #ddd",
//               }}
//             >
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* {suggestedKeys.length > 0 && popoverPosition && isValueContext() && (
//         <div
//           ref={popoverRef} // Attach ref to the popover container
//           style={{
//             position: "absolute",
//             top: popoverPosition.top,
//             left: popoverPosition.left,
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
//             zIndex: 1,
//           }}
//         >
//           {suggestedKeys.map((suggestion, index) => (
//             <div
//               key={index}
//               onClick={() => handleSuggestionClick(suggestion)}
//               style={{
//                 padding: "8px",
//                 cursor: "pointer",
//                 borderBottom: "1px solid #ddd",
//               }}
//             >
//               {suggestion}
//             </div>
//           ))}
//         </ul>
//       )} */}
//       {suggestedKeys.length > 0 && popoverPosition && isValueContext() && (
//         <div
//           ref={popoverRef} // Attach ref to the popover container
//           style={{
//             position: "absolute",
//             top: `${popoverPosition.top}px`,
//             left: `${popoverPosition.left}px`,
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             zIndex: 1000,
//             padding: "5px",
//             margin: 0,
//             maxHeight: "100px",
//             overflowY: "auto",
//           }}
//         >
//           <ul
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//             }}
//           >
//             {suggestedKeys.map((key, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleSuggestionClick(key)}
//                 style={{
//                   cursor: "pointer",
//                   padding: "2px 5px",
//                 }}
//               >
//                 {key}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {inputType === "json" && (
//         <div>
//           <input
//             type="checkbox"
//             checked={isFormatChecked}
//             onChange={handleFormatCheckboxChange}
//           />
//           <label>Format JSON</label>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default AceEditorComponent;

import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/webpack-resolver";
import { useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { FlowReducer } from "../../Redux/apiManagement/flowReducer";
import GlobalSensitiveData from "../Global/GlobalSenstiveData";
import "./ace.css";

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

// const markers: any = [
//   {
//     start: { row: 1, column: 2 }, // Start position for "sdsd"
//     end: { row: 1, column: 6 }, // End position for "sdsd
//     className: "test-marker", // Custom CSS class for the marker
//     type: "text", // Marker type (can be 'text' or 'background')
//   },
//   {
//     start: { row: 3, column: 0 },
//     end: { row: 3, column: 10 },
//     className: "another-marker",
//     type: "background",
//   },
// ];

// const markers: any = [
//   {
//     startRow: 3, // This is the line you want to highlight
//     type: "text",
//     className: "test-marker", // Your custom class for styling
//   },
// ];

// const annotationsArray = [
//   {
//     row: 2, // Fourth line
//     column: 1, // Fifth character in that line
//     text: "error.message", // Tooltip message
//     type: "error", // Type of annotation
//   },
// ];

const AceEditorComponent = (props: any) => {
  const popoverRef = useRef<any>();

  const { globalResponse } = useSelector<RootStateType, FlowReducer>(
    (state) => state.apiManagement.apiFlowDesign
  );
  const [highlightedFunction, setHighlightedFunction] = useState<any>(null); // Default to first function

  const { onInputVal, defaultInputVal, disabled = false } = props;
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

  // const handleChange = (newValue: string) => {
  //   onInputVal(newValue);
  //   setInput(newValue);

  //   if (editorRef.current) {
  //     const editor = editorRef.current.editor;
  //     const cursor = editor.session.selection.getCursor();
  //     const cursorPosition = editor.session.doc.positionToIndex(cursor);
  //     setCursorPosition(cursorPosition);

  //     const lastOpenBrace = newValue.lastIndexOf("{", cursorPosition);
  //     const lastOpenAnd = newValue.lastIndexOf("&", cursorPosition);
  //     const lastQuote = newValue.lastIndexOf('"', cursorPosition);
  //     const lastKey = newValue.lastIndexOf(":", cursorPosition);

  //     console.log("Cursor Position:", cursorPosition);
  //     console.log("Last Open Brace:", lastOpenBrace);
  //     console.log("Last Open And:", lastOpenAnd);

  //     console.log("Last Quote:", lastQuote);

  //     const andIsInsideQuotes = lastQuote > lastOpenAnd;

  //     const braceIsInsideQuotes = lastQuote > lastOpenBrace;
  //     let precedingText: string = "";

  //     if (lastOpenAnd > lastOpenBrace) {
  //       precedingText = newValue.substring(lastKey + 1, cursorPosition);
  //       console.log("Preceding Text:", precedingText);

  //       const match = precedingText;
  //       console.log("Match FQL:", match);

  //       if (match) {
  //         const searchTerm = match;
  //         console.log("Search Term FQL:", searchTerm);

  //         const filteredFqlFunctions: string[] = FQL_FUNCTIONS.filter((func) =>
  //           func.name.startsWith(searchTerm)
  //         ).map((func) => {
  //           return func.name;
  //         });

  //         // Combine both suggestions

  //         console.log("Filtered Suggestions FQL:", filteredFqlFunctions);
  //         setSuggestedKeys(filteredFqlFunctions);
  //         updatePopoverPosition(lastKey + searchTerm.length);
  //       } else {
  //         console.log("No match found for preceding text.");
  //         setSuggestedKeys([]);
  //         setPopoverPosition(null);
  //       }
  //     } else if (lastOpenBrace > 0 && lastOpenAnd < lastOpenBrace) {
  //       // if (braceIsInsideQuotes) {
  //       precedingText = newValue.substring(lastQuote + 1, cursorPosition);
  //       console.log("Preceding Text:", precedingText);

  //       const match = precedingText.match(/(\w+(\[\d+\])?(\.\w+)*)$/);
  //       console.log("Match:", match);

  //       if (match) {
  //         const searchTerm = match[0];
  //         console.log("Search Term:", searchTerm);

  //         // Combine both suggestions

  //         const filteredSuggestions: string[] = Object.values(suggestions)
  //           .filter((value) => {
  //             const result = value.startsWith(searchTerm);
  //             console.log(
  //               `Filtering value '${value}' with searchTerm '${searchTerm}':`,
  //               result
  //             );
  //             return result;
  //           })
  //           .map((value) => {
  //             console.log(`Value '${value}'`);
  //             return value;
  //           });

  //         console.log("Filtered Suggestions:", filteredSuggestions);
  //         setSuggestedKeys(filteredSuggestions);
  //         updatePopoverPosition(lastQuote + searchTerm.length);
  //       } else {
  //         console.log("No match found for preceding text.");
  //         setSuggestedKeys([]);
  //         setPopoverPosition(null);
  //       }
  //       // } else {
  //       //   console.log("Open brace is not inside double quotes.");
  //       //   setSuggestedKeys([]);
  //       //   setPopoverPosition(null);
  //       // }
  //     } else {
  //       console.log("Open brace is not inside double quotes.");
  //       setSuggestedKeys([]);
  //       setPopoverPosition(null);
  //     }
  //   } else {
  //     console.log("Editor reference is not available.");
  //   }

  //   handleJsonValidation();
  // };

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
          setSuggestedKeys(filteredFqlFunctions);
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
          setSuggestedKeys(filteredSuggestions);
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

  const handleSuggestionClick = (suggestion: string) => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const cursor = editor.session.selection.getCursor();
      const cursorPosition = editor.session.doc.positionToIndex(cursor);
      const newValue = input;

      // Find the position of the last open brace
      const lastOpenBraceIndex = newValue.lastIndexOf("{", cursorPosition);

      // Identify the start position of the typed value
      const typedWordRegex = /[a-zA-Z0-9_$]+$/;
      const match = newValue.slice(0, cursorPosition).match(typedWordRegex);
      const typedValueStart = match
        ? cursorPosition - match[0].length
        : cursorPosition;

      const beforeTypedValue = newValue.slice(0, typedValueStart); // Before the typed word
      const afterTypedValue = newValue.slice(cursorPosition); // After the cursor position

      // Replace the typed value with the suggestion
      const newInput = `${beforeTypedValue}${suggestion}${afterTypedValue}`;
      const newCursorPosition = typedValueStart + suggestion.length;

      // Update the editor value and cursor position
      editor.setValue(newInput);
      editor.session.selection.moveCursorToPosition({
        row: cursor.row,
        column: newCursorPosition,
      });

      // Update the state and clear suggestions
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

  const regexPattern = /&\w+\(.*?\)/g;

  // const highlightErrors = (input: any) => {
  //   const markers: any = [];
  //   let match;

  //   // Find matches based on regex
  //   while ((match = regexPattern.exec(input)) !== null) {
  //     const startColumn = match.index;
  //     const endColumn = match.index + match[0].length;

  //     // Create a marker for the matched error
  //     markers.push({
  //       start: { row: 0, column: startColumn },
  //       end: { row: 0, column: endColumn },
  //       className: "error-highlight", // This class needs to be defined in your CSS
  //       type: "text", // 'text' or 'background'
  //     });
  //   }

  //   setErrorMarkers(markers);
  // };

  // useEffect(() => {
  //   highlightErrors(input);
  // }, [input]);

  useEffect(() => {
    const setErrorAnnotations = (editor: any) => {
      const annotations = [];

      console.log("test annotations");
      if (inputType == "json") {
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
          const sanitizedInput = input
            .replace(/&[a-zA-Z]+\(\)/g, '""') // Replace function calls with dummy quotes
            .replace(/\{[a-zA-Z0-9_.]+\}/g, '""'); // Replace placeholders with dummy quotes
          JSON.parse(sanitizedInput); // Now try parsing the sanitized version
        } catch (e: any) {
          annotations.push({
            row: e.lineNumber - 1 || 0, // Adjust row if error object provides a lineNumber
            column: e.columnNumber || 0, // If available, else default to 0
            text: `JSON error: ${e.message}`,
            type: "error",
          });
        }
      }

      if (inputType == "array") {
        const arrayRegex = /\[([^\]]+)\]/g; // Regex to match arrays
        let arrayMatch;
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

      // Step 1: Detect unclosed curly braces
      const unclosedBracesRegex = /{[^}]*$/g;
      const matchUnclosed = input.match(unclosedBracesRegex);
      if (matchUnclosed) {
        annotations.push({
          row: input.split("\n").length - 1, // Last line where the error is detected
          column: matchUnclosed.index,
          text: "Unclosed curly brace or invalid key-value structure",
          type: "error",
        });
      }

      // Step 2: Detect invalid function calls (e.g., unrecognized FQL functions)
      const functionRegex = /&([a-zA-Z]+)\(/g;
      let match;
      while ((match = functionRegex.exec(input)) !== null) {
        const functionName = match[1] + "()";
        const validFunction = FQL_FUNCTIONS.find(
          (func) => func.name === functionName
        );

        if (!validFunction) {
          annotations.push({
            row: input.split("\n").length - 1,
            column: match.index,
            text: `Invalid function "${functionName}"`,
            type: "error",
          });
        }
      }
      console.log("test annotations", annotations);
      // Step 3: Set annotations in Ace Editor
      editor.getSession().setAnnotations(annotations);
    };

    if (editorRef.current) {
      const editor = editorRef.current.editor;
      setErrorAnnotations(editor);
    }
  }, [input]); // Re-run whenever the code changes

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
  return (
    <div style={{ position: "relative" }}>
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
      {/* {suggestedKeys.length > 0 && popoverPosition && isValueContext() && (
        <ul
          style={{
            position: "absolute",
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
            backgroundColor: "white",
            border: "1px solid #ccc",
            zIndex: 1000,
            listStyle: "none",
            padding: "5px",
            margin: 0,
            maxHeight: "100px",
            overflowY: "auto",
          }}
        >
          {suggestedKeys.map((key, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(key)}
              style={{ cursor: "pointer", padding: "2px 5px" }}
            >
              {key}
            </li>
          ))}
        </ul>
      )} */}

      {suggestedKeys.length > 0 && popoverPosition && (
        <div
          ref={popoverRef}
          style={{
            position: "absolute",
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
            backgroundColor: "white",
            border: "1px solid #ccc",
            zIndex: 1000,
            padding: "5px",
            margin: 0,
            maxHeight: "200px",
            overflowY: "auto",
            display: "flex",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              width: "100%",
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
        </div>
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
  );
};

export default AceEditorComponent;
