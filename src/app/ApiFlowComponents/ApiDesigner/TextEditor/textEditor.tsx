// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { RootStateType } from "../../../Redux/store";
// import { FlowReducer } from "../../../Redux/apiManagement/flowReducer";
// import debounce from "lodash/debounce";
// import { Autocomplete, TextField } from "@mui/material";

// interface TextEditorProps {
//   inputData?: string | null;
//   objectToSuggest?: any;
//   onChange?: any;
//   multiline: boolean;
//   currentNode: string;
// }

// const getNestedKeys = (obj: any, prefix = ""): string[] => {
//   if (obj) {
//     let keys: string[] = [];

//     Object.keys(obj).forEach((key: string) => {
//       const value = obj[key];
//       const fullKey = prefix ? `${prefix}.${key}` : key;

//       if (typeof value === "object") {
//         if (Array.isArray(value)) {
//           value.forEach((item, index) => {
//             if (typeof item === "object") {
//               keys.push(`${fullKey}[${index}]`);
//               keys = keys.concat(getNestedKeys(item, `${fullKey}[${index}]`));
//             } else {
//               keys.push(`${fullKey}[${index}]`);
//             }
//           });
//         } else {
//           keys.push(fullKey);
//           keys = keys.concat(getNestedKeys(value, fullKey));
//         }
//       } else {
//         keys.push(fullKey);
//       }
//     });

//     return keys;
//   }
//   return [];
// };

// const TextEditor: React.FC<TextEditorProps> = ({
//   inputData,
//   objectToSuggest,
//   currentNode,
//   onChange,
//   multiline,
// }) => {
//   const { globalKeys, globalResponse } = useSelector<
//     RootStateType,
//     FlowReducer
//   >((state) => state.apiManagement.apiFlowDesign);

//   console.log(globalResponse, "textEditer");

//   // const globalResponse = {
//   //   user: {
//   //     id: 1,
//   //     name: "John Doe",
//   //     email: "john.doe@example.com",
//   //     address: {
//   //       street: "123 Elm Street",
//   //       city: "Somewhere",
//   //       state: "CA",
//   //       postalCode: "90210",
//   //     },
//   //     phoneNumbers: [
//   //       {
//   //         type: "home",
//   //         number: "555-1234",
//   //       },
//   //       {
//   //         type: "mobile",
//   //         number: "555-5678",
//   //       },
//   //     ],
//   //     active: true,
//   //     roles: ["admin", "user"],
//   //   },
//   //   posts: [
//   //     {
//   //       id: 101,
//   //       title: "First Post",
//   //       content: "This is the content of the first post.",
//   //       createdAt: "2024-07-25T12:34:56Z",
//   //     },
//   //     {
//   //       id: 102,
//   //       title: "Second Post",
//   //       content: "This is the content of the second post.",
//   //       createdAt: "2024-07-26T15:00:00Z",
//   //     },
//   //   ],
//   //   settings: {
//   //     theme: "dark",
//   //     notifications: {
//   //       email: true,
//   //       sms: false,
//   //     },
//   //   },
//   // };

//   // Replace with the actual key you want to remove

//   const modifiedResponse = globalResponse
//     ? removeKey(globalResponse, currentNode)
//     : {};

//   const suggestions = getNestedKeys(
//     objectToSuggest
//       ? { response: objectToSuggest }
//       : modifiedResponse
//       ? { response: modifiedResponse }
//       : {}
//   );

//   const [input, setInput] = useState<any>(inputData);
//   const [suggestedKeys, setSuggestedKeys] = useState<string[]>([]);
//   const [cursorPosition, setCursorPosition] = useState<number>(0);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const updateSuggestions = (value: string, cursor: number) => {
//     setInput(value);
//     setCursorPosition(cursor);
//     onChange(value);

//     const lastOpenBrace = value.lastIndexOf("{", cursor);
//     const lastQuote = value.lastIndexOf('"', cursor);

//     if (lastOpenBrace > lastQuote) {
//       const precedingText = value.substring(lastOpenBrace + 1, cursor);
//       const match = precedingText.match(/(\w+(\[\d+\])?)(\.\w+(\[\d+\])?)*/);

//       if (match) {
//         const prefix = precedingText.match(/.*(?=\.\w+|\[)/)?.[0] || "";
//         const filteredSuggestions = suggestions
//           .filter((key) => key.startsWith(prefix))
//           .map((key) => key.substring(prefix.length));

//         setSuggestedKeys(filteredSuggestions);
//       } else {
//         setSuggestedKeys([]);
//       }
//     } else {
//       setSuggestedKeys([]);
//     }
//   };

//   function removeKey(obj: any, key: any) {
//     const newObj = { ...obj }; // Create a copy of the object
//     if (newObj[key]) {
//       delete newObj[key]; // Remove the key
//     }
//     return newObj;
//   }

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     const cursor = event.target.selectionStart || 0;
//     updateSuggestions(value, cursor);
//   };

//   const handleSuggestionClick = (key: string) => {
//     if (inputRef.current) {
//       const value = input;
//       const cursor = cursorPosition;

//       const lastOpenBraceIndex = value.lastIndexOf("{", cursor);
//       const beforeInsert = value.slice(0, lastOpenBraceIndex + 1);
//       const afterInsert = value.slice(cursor);

//       const newInput = `${beforeInsert}${key}${afterInsert}`;
//       const newCursorPosition = beforeInsert.length + key.length;

//       setInput(newInput);
//       onChange(newInput);

//       setCursorPosition(newCursorPosition);

//       inputRef.current.focus();
//       inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);

//       setSuggestedKeys([]);
//     }
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <Autocomplete
//         disablePortal
//         id="autocomplete"
//         size="small"
//         options={suggestedKeys}
//         value={input}
//         onInputChange={(event, newValue) => {
//           if (newValue !== undefined) {
//             handleInputChange({
//               target: {
//                 value: newValue,
//                 selectionStart: inputRef.current?.selectionStart || 0,
//               },
//             } as React.ChangeEvent<HTMLInputElement>);
//           }
//         }}
//         renderInput={(params) => <TextField {...params} inputRef={inputRef} />}
//         onChange={(event, newValue) => {
//           if (newValue) {
//             handleSuggestionClick(newValue);
//           }
//         }}
//         filterOptions={(options) => options} // To allow custom filtering
//       />
//     </div>
//   );
// };

// export default TextEditor;

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
import { Autocomplete, TextField } from "@mui/material";
import { FixedSizeList, ListChildComponentProps } from "react-window";

interface TextEditorProps {
  inputData?: string | null;
  objectToSuggest?: any;
  onChange?: any;
  multiline: boolean;
  currentNode: string;
  disabled?: boolean;
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
}) => {
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

  const [input, setInput] = useState<any>(inputData);
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

    const lastOpenBrace = value.lastIndexOf("{", cursor);
    const lastOpenAnd = value.lastIndexOf("&", cursor);
    const lastQuote = value.lastIndexOf('"', cursor);

    let precedingText: string = "";

    if (
      (lastOpenAnd > -1 && lastOpenBrace === -1) ||
      lastOpenAnd > lastOpenBrace
    ) {
      precedingText = value.substring(lastOpenAnd + 1, cursorPosition).trim();
      console.log("Preceding Text for Functions:", precedingText);

      const match = precedingText.match(/([&\w]+)$/);
      if (match) {
        const searchTerm = match[0];
        console.log("Search Term for Functions:", searchTerm);

        if (searchTerm == "&") {
          // When the search term is empty, show all suggestions
          console.log("No search term provided. Showing all suggestions.");
          setSuggestedKeys(FQL_FUNCTIONS.map((func) => func.name));
          // updatePopoverPosition(lastOpenAnd + searchTerm.length); // Assuming FQL_FUNCTIONS holds all your function suggestions
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
        // updatePopoverPosition(lastOpenAnd + searchTerm.length);
      } else {
        console.log("No match found for preceding text in function context.");
        setSuggestedKeys([]);
        // setPopoverPosition(null);
      }
    }

    if (lastOpenBrace > lastQuote) {
      const precedingText = value.substring(lastOpenBrace + 1, cursor);
      const match = precedingText.match(/(\w+(\[\d+\])?)(\.\w+(\[\d+\])?)*/);

      if (match) {
        const prefix = match[0];

        const filteredSuggestions = suggestions
          .filter((key) => key.startsWith(prefix))
          .map((key) => key.substring(prefix.length));

        setSuggestedKeys(filteredSuggestions);
      } else {
        setSuggestedKeys([]);
      }
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

  const handleSuggestionClick = (key: string) => {
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
        style={style}
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

  return (
    <div style={{ position: "relative" }}>
      <Autocomplete
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
        renderInput={(params) => <TextField {...params} inputRef={inputRef} />}
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
