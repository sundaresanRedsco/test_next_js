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
    [globalResponse, currentNode],
  );

  const suggestions = useMemo(() => {
    return getNestedKeys(
      objectToSuggest
        ? { response: objectToSuggest }
        : modifiedResponse
          ? { response: modifiedResponse }
          : {},
    );
  }, [objectToSuggest, modifiedResponse]);

  const [input, setInput] = useState<any>(inputData);
  const [suggestedKeys, setSuggestedKeys] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedUpdateSuggestions = useCallback(
    debounce((value: string, cursor: number) => {
      updateSuggestions(value, cursor);
    }, 300),
    [],
  );

  const updateSuggestions = (value: string, cursor: number) => {
    setInput(value);
    setCursorPosition(cursor);
    onChange(value);

    const lastOpenBrace = value.lastIndexOf("{", cursor);
    const lastQuote = value.lastIndexOf('"', cursor);

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
