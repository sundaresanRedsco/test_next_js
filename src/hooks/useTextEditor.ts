// import React, { useEffect, useState } from "react";
// // import { FQL_FUNCTIONS } from "../Constants/JsonDatas";
// import { useWorkflowStore } from "../store/useWorkflowStore";
// import { validateFQLFunctionSyntax } from "@/helpers/helpersFunctions";
// // import { validateFQLFunctionSyntax } from "../Helpers/helpersFunctions";

// type Props = {};

// export default function useTextEditor(
//   inputData?: any,
//   mainKey?: string,
//   mainId?: string,
//   mainIndex?: number
// ) {
//   const [errorMsg, seterrMsg] = useState("");
//   const { setInputDataErr } = useWorkflowStore();
//   const [input, setInput] = useState(inputData || "");
//   function getKeyByValue(
//     obj: Record<string, any>,
//     value: any
//   ): string | undefined {
//     for (const key in obj) {
//       if (obj.hasOwnProperty(key) && obj[key] === value) {
//         return key;
//       }
//     }
//     return undefined; // Return undefined if value is not found
//   }
//   // function handleBraces(inputText: any) {
//   //   const lineBreak = inputText.split("\n"); // Split input into lines
//   //   let stack = []; // This will store the opening braces and their positions
//   //   const pairs: any = { "(": ")", "{": "}", "[": "]" }; // Matching pairs
//   //   const mirrorPairs: any = { ")": "(", "}": "{", "]": "[" }; //
//   //   let line = 1;

//   //   // Iterate through each line
//   //   for (line; line < lineBreak.length + 1; line++) {
//   //     let input = lineBreak[line - 1];

//   //     // Iterate through each character in the current line
//   //     for (let i = 0; i < input.length; i++) {
//   //       const char = input[i];

//   //       // If it's an opening brace, push it to the stack with its line and position
//   //       if (pairs[char]) {
//   //         stack.push({ char, index: i, line });
//   //       }
//   //       // If it's a closing brace, check for a matching opening brace
//   //       else if (Object.values(pairs).includes(char)) {
//   //         const top = stack[stack.length - 1];

//   //         if (top && pairs[top.char] === char) {
//   //           // If the top of the stack matches the closing brace, pop it
//   //           stack.pop();
//   //         } else {
//   //           // If there is no matching opening brace or a mismatch, return an error

//   //           if (top) {
//   //             return {
//   //               line: line,
//   //               position: lineBreak[line - 1].indexOf(char),
//   //               error: `Unmatched closing brace '${char}' at line ${line}, position ${lineBreak[
//   //                 line - 1
//   //               ].indexOf(char)},expected opening brace '${mirrorPairs[char]}'`,
//   //             };
//   //           }
//   //           // else {
//   //           //   return {
//   //           //     line: line,
//   //           //     position: lineBreak[line - 1].indexOf(char),
//   //           //     error: `Unmatched closing brace at line ${line}, position ${lineBreak[
//   //           //       line - 1
//   //           //     ].indexOf(char)} '${char}',expected opening brace '${
//   //           //       mirrorPairs[char]
//   //           //     }'`,
//   //           //   };
//   //           // }
//   //         }
//   //       }
//   //     }
//   //   }

//   //   // If there are unmatched opening braces left in the stack
//   //   if (stack.length > 0) {
//   //     const lastUnmatched = stack[stack.length - 1];
//   //     return {
//   //       line: lastUnmatched.line,
//   //       position: lastUnmatched.index,
//   //       error: `Unmatched opening brace '${lastUnmatched.char}' at line ${lastUnmatched.line}, position ${lastUnmatched.index}`,
//   //     };
//   //   }

//   //   return null; // Return success message if no unmatched braces
//   // }

//   const FQL_FUNCTIONS: any = [];
//   function handleBraces(input: any) {
//     const stack: any = [];
//     const quoteStack: any = []; // Stack to keep track of open quotes
//     let line = 1;
//     let position = 1;

//     // Helper to move to the next line
//     function moveToNextLine() {
//       line++;
//       position = 1;
//     }

//     // Helper to check for matching braces
//     function isMatchingBrace(openBrace: string, closeBrace: string) {
//       return (
//         (openBrace === "{" && closeBrace === "}") ||
//         (openBrace === "[" && closeBrace === "]") ||
//         (openBrace === "(" && closeBrace === ")")
//       );
//     }

//     for (let i = 0; i < input?.length; i++) {
//       const char = input[i];

//       // Move to next line if newline is encountered
//       if (char === "\n") {
//         moveToNextLine();
//         continue;
//       }

//       // Handle opening braces
//       if (char === "{" || char === "[" || char === "(") {
//         stack.push({ brace: char, line, position });
//       }
//       // Handle closing braces
//       else if (char === "}" || char === "]" || char === ")") {
//         const lastBrace = stack?.pop();
//         if (!lastBrace) {
//           // No opening brace for the current closing brace
//           return {
//             error: "Unmatched braces found!",
//             line,
//             position,
//           };
//         }
//         // Check for matching braces
//         if (!isMatchingBrace(lastBrace?.brace, char)) {
//           return {
//             error: "Unmatched braces found!",
//             line: lastBrace.line,
//             position: lastBrace.position,
//           };
//         }
//       }

//       // Handle opening quotes
//       else if (char === '"' || char === "'") {
//         // Check if the quote matches the last opened quote
//         if (
//           quoteStack?.length > 0 &&
//           quoteStack[quoteStack?.length - 1].quote === char
//         ) {
//           quoteStack.pop(); // Close the current quote
//         } else {
//           quoteStack.push({ quote: char, line, position }); // Open a new quote
//         }
//       }

//       position++;
//     }

//     // Check for unmatched opening braces
//     if (stack.length > 0) {
//       const lastBrace = stack[stack.length - 1];
//       return {
//         error: "Unmatched braces found!",
//         line: lastBrace.line,
//         position: lastBrace.position,
//       };
//     }

//     // Check for unmatched quotes
//     if (quoteStack.length > 0) {
//       const lastQuote = quoteStack[quoteStack.length - 1];
//       return {
//         error: `Unmatched quote '${lastQuote.quote}' found!`,
//         line: 1,
//         position: lastQuote.position,
//       };
//     }

//     return null;
//   }

//   function getMatchingOpeningBrace(brace: any) {
//     switch (brace) {
//       case "}":
//         return "{";
//       case "]":
//         return "[";
//       case ")":
//         return "(";
//       default:
//         return "";
//     }
//   }

//   function getMatchingClosingBrace(brace: any) {
//     switch (brace) {
//       case "{":
//         return "}";
//       case "[":
//         return "]";
//       case "(":
//         return ")";
//       default:
//         return "";
//     }
//   }

//   function isMatchingBrace(opening: any, closing: any) {
//     return (
//       (opening === "{" && closing === "}") ||
//       (opening === "[" && closing === "]") ||
//       (opening === "(" && closing === ")")
//     );
//   }

//   const handleValidation = (
//     inputData: any,
//     type: any,
//     id: any,
//     index?: number
//   ) => {
//     const input = inputData;
//     if (id && type && inputData) {
//       const placeholderRegex = /\{([a-zA-Z0-9_.]+)\}/g;
//       let placeholderMatch;
//       while ((placeholderMatch = placeholderRegex.exec(input)) !== null) {
//         const placeholder = placeholderMatch[1]; // e.g., response.node_id
//         // You can add additional validation here to verify that the placeholder is valid (e.g., check known keys)
//         // For example, if you want to verify response.node_id format, you can add more specific checks
//         if (!placeholder.includes("response")) {
//           setInputDataErr(id, type, true, index);
//         }
//       }
//       if (input && input?.includes("&")) {
//         try {
//           const sanitizedInput = input.replace(
//             /&[a-zA-Z_][a-zA-Z0-9_]*\([^\)]*\)/g,
//             '""'
//           ); // Replace function calls with dummy quotes
//           JSON.parse(sanitizedInput); // Now try parsing the sanitized version
//           setInputDataErr(id, type, false, index);
//         } catch (e: any) {
//           setInputDataErr(id, type, true, index);
//         }
//         const isFunctionErr = validateFQLFunctionSyntax({
//           input,
//           textEditor: true,
//           seterrMsg,
//         });
//         if (!isFunctionErr) {
//           seterrMsg("");
//           setInputDataErr(id, type, false, index);
//         } else {
//           setInputDataErr(id, type, true, index);
//         }
//       } else {
//         try {
//           const sanitizedInput = input.replace(/\{[a-zA-Z0-9_.\[\]]+\}/g, '""'); // Replace placeholders with dummy quotes
//           JSON.parse(sanitizedInput); // Now try parsing the sanitized version
//           setInputDataErr(id, type, false, index);
//         } catch (e: any) {
//           setInputDataErr(id, type, true, index);
//         }
//       }

//       const unclosedBracesRegex = /{[^}]*$/g;
//       const matchUnclosed = input?.match(unclosedBracesRegex);
//       if (matchUnclosed) {
//         setInputDataErr(id, type, true, index);
//       }

//       const functionRegex = /&([a-zA-Z]+)\(/g;
//       let match;
//       while ((match = functionRegex.exec(input)) !== null) {
//         const functionName = match[1] + "()";
//         const validFunction = FQL_FUNCTIONS.find(
//           (func) => func.name === functionName
//         );

//         if (!validFunction) {
//           setInputDataErr(id, type, true, index);
//         }
//       }
//       if (!input.includes("{") && !input.includes("&")) {
//         setInputDataErr(id, type, true, index);
//       }
//     }
//   };

//   useEffect(() => {
//     if (inputData) {
//       if (input == "") {
//         seterrMsg("");
//         if (mainId && mainKey) {
//           setInputDataErr(mainId, mainKey, false, mainIndex);
//         }
//       } else {
//         const placeholderRegex = /\{([a-zA-Z0-9_.]+)\}/g;
//         let placeholderMatch;
//         while ((placeholderMatch = placeholderRegex.exec(input)) !== null) {
//           const placeholder = placeholderMatch[1]; // e.g., response.node_id
//           // You can add additional validation here to verify that the placeholder is valid (e.g., check known keys)
//           // For example, if you want to verify response.node_id format, you can add more specific checks
//           if (!placeholder.includes("response")) {
//             seterrMsg(`Invalid placeholder "${placeholder}"`);
//             if (mainId && mainKey) {
//               setInputDataErr(mainId, mainKey, true, mainIndex);
//             }
//           }
//         }
//         if (input && input?.includes("&")) {
//           try {
//             const sanitizedInput = input.replace(
//               /&[a-zA-Z_][a-zA-Z0-9_]*\([^\)]*\)/g,
//               '""'
//             ); // Replace function calls with dummy quotes
//             JSON.parse(sanitizedInput); // Now try parsing the sanitized version
//             seterrMsg("");
//             if (mainId && mainKey) {
//               setInputDataErr(mainId, mainKey, false, mainIndex);
//             }
//           } catch (e: any) {
//             seterrMsg("Unclosed round brace");
//             if (mainId && mainKey) {
//               setInputDataErr(mainId, mainKey, true, mainIndex);
//             }
//           }
//           const isFunctionErr = validateFQLFunctionSyntax({
//             input,
//             textEditor: true,
//             seterrMsg,
//           });

//           if (!isFunctionErr) {
//             if (mainId && mainKey) {
//               seterrMsg("");
//               setInputDataErr(mainId, mainKey, false, mainIndex);
//             }
//           }
//         } else {
//           try {
//             const sanitizedInput = input.replace(
//               /\{[a-zA-Z0-9_.\[\]]+\}/g,
//               '""'
//             ); // Replace placeholders with dummy quotes
//             JSON.parse(sanitizedInput); // Now try parsing the sanitized version
//             seterrMsg("");
//             if (mainId && mainKey) {
//               setInputDataErr(mainId, mainKey, false, mainIndex);
//             }
//           } catch (e: any) {
//             seterrMsg("Unclosed curly brace");
//             if (mainId && mainKey) {
//               setInputDataErr(mainId, mainKey, true, mainIndex);
//             }
//           }
//         }

//         const unclosedBracesRegex = /{[^}]*$/g;
//         const matchUnclosed = input?.match(unclosedBracesRegex);
//         if (matchUnclosed) {
//           seterrMsg("Unclosed curly brace or invalid key-value structure");
//           if (mainId && mainKey) {
//             setInputDataErr(mainId, mainKey, true, mainIndex);
//           }
//         }

//         const functionRegex = /&([a-zA-Z]+)\(/g;
//         let match;
//         while ((match = functionRegex.exec(input)) !== null) {
//           const functionName = match[1] + "()";
//           const validFunction = FQL_FUNCTIONS.find(
//             (func) => func.name === functionName
//           );

//           if (!validFunction) {
//             seterrMsg(`Invalid function "${functionName}"`);
//             if (mainId && mainKey) {
//               setInputDataErr(mainId, mainKey, true, mainIndex);
//             }
//           }
//         }
//         if (!input.includes("{") && !input.includes("&")) {
//           seterrMsg("Not a valid input");
//           if (mainId && mainKey) {
//             setInputDataErr(mainId, mainKey, true, mainIndex);
//           }
//         }
//       }
//     }
//   }, [input, mainId, mainKey, mainIndex]);

//   return {
//     input,
//     setInput,
//     errorMsg,
//     handleBraces,
//     handleValidation,
//   };
// }
export {};
