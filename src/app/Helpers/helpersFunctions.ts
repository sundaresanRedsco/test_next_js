import moment from "moment";
import { textConstants } from "../Constants/textConstants";
import { useEffect } from "react";
import { RootStateType } from "../Redux/store";
import { useSelector } from "react-redux";
import { CommonReducer } from "../Redux/commonReducer";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const SECRET_KEYS = process.env.REACT_APP_SECREAT_KEY;
const Envdata = process.env.AZURE_AUTHORITY;

console.log(SECRET_KEYS, "SECRET_KEYS");

const adminUrl = process.env.AZURE_AUTHORITY;
console.log(adminUrl, "adminUrlllll");

export const translate = (key: string) => {
  let language: string = "en";
  const keys = key.split("."); // Split the keys by dot
  // Using reduce to navigate through the nested structure
  const translatedText = keys.reduce((acc: any, currentKey: any) => {
    return acc ? acc[currentKey] : undefined;
  }, textConstants[language]);
  return translatedText;
};

export const dateFormat = (val: string) => {
  let dateFormat = "DD-MM-YYYY hh:mm:ss A";
  const dateFormatValue = moment(val).format(dateFormat);
  return dateFormatValue;
};

export const dateFormatDateOnly = (val: string) => {
  let dateFormat = "MMM DD, YYYY";
  const dateFormatValue = moment(val).format(dateFormat);
  return dateFormatValue;
};

export const dateTimeFormat = (val: string) => {
  let dateFormat = "MMM D, YYYY - h.mmA";
  const dateTimeFormatValue = moment.utc(val).format(dateFormat);
  return dateTimeFormatValue;
};

export const calculateDaysAgo = (val: string) => {
  const givenDate = moment.utc(val);
  const currentDate = moment.utc();
  const daysDifference = currentDate.diff(givenDate, "days");

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "1 day ago";
  } else if (daysDifference < 0) {
    return "";
  } else {
    return `${daysDifference} days ago`;
  }
};

export const convertToMilliSeconds = (val: any) => {
  const duration = moment.duration(val);
  return duration.asMilliseconds();
};

export const EncrouptionLogic = (val: any): string => {
  // const SECRET_KEY : any = SECRET_KEYS;
  const SECRET_KEY: any = SECRET_KEYS;
  // const SECRET_KEY: any = SECRET_KEYS;

  const encryptedUserProfile = CryptoJS.AES.encrypt(
    JSON.stringify(val),
    "your-secret-key"
  ).toString();
  // Logging only the encrypted userProfile data to the console
  console.log("Encrypted UserProfile Data:", encryptedUserProfile);
  //   }
  // }, [val]);

  return encryptedUserProfile;
};

// export const decryptData = (val : any) => {

//   const SECRET_KEY = 'your-secret-key';
//   const bytes = CryptoJS.AES.decrypt(val, SECRET_KEY);
//   const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   return decryptedData;
// };

export const decryptData = (val: string | null): any => {
  if (!val) {
    // Handle case when val is null
    console.error("No data to decrypt");
    return null;
  }

  const SECRET_KEY: any = "your-secret-key";
  // const SECRET_KEY: any = SECRET_KEYS;

  try {
    const bytes = CryptoJS.AES.decrypt(val, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting data:", error);
    return null;
  }
};

export const setCookies = (key: string, value: string, expires_in: any) => {
  let encryptCookie = EncrouptionLogic(value);
  Cookies.set(key || "", encryptCookie, {
    expires: expires_in, // The expiration time
    path: "/", // Cookie is available site-wide
    sameSite: "Strict", // Strict SameSite policy
    secure: true,
    httpOnly: true,
  });
};

export const getCookies = (key: string) => {
  const cookieValue: any = Cookies.get(key ?? "");
  const decryptCookie = decryptData(cookieValue);
  return decryptCookie;
};

function hasFilterCondition(query: any) {
  // Check if the query contains square brackets and an equality operator
  return /\[([^\]]*=\s*[^]]*)\]/.test(query);
}

// replace holders in apiflow designer
export function replacePlaceholders(
  template: any,
  data: any,
  globalArrayKeys: any
) {

  if (typeof template === "string" && template.includes("{")) {
    if (hasFilterCondition(template)) {
      console.log("template", template);
      console.log("template", hasFilterCondition(template));
      template = dynamicFilter(data, template);
      console.log("template3", template);
      return template;
    }
    const placeholders = template.match(/{(.*?)}/g); // Find all placeholders
    if (placeholders) {
      placeholders.forEach((place) => {
        let keys;
        let replacementValue;
        // Check if the placeholder starts with 'global.'
        console.log("place", place, typeof place);
        if (globalArrayKeys?.length > 0 && place.includes("{global.")) {
          const startIndex = place.indexOf("{global.") + 8; // 8 is the length of '{global.'
          const endIndex = place.indexOf("}", startIndex); // Find the closing '}'
          let globalKey: any;
          if (endIndex > startIndex) {
            globalKey = place.slice(startIndex, endIndex);
            console.log(globalKey, "globalKey");
          } else {
            console.error("Closing brace '}' not found for '{global.'");
          }
          const globalObject = globalArrayKeys
            ? globalArrayKeys.find((obj: any) => obj.key_name === globalKey)
            : null;
          console.log(globalObject, "globalObject");
          replacementValue = globalObject?.value
            ? globalObject?.value
            : undefined;
        } else {
          keys = place
            .slice(1, -1)
            .split(/\.|\[|\]/)
            .filter(Boolean); // Split by . or [ or ]
          replacementValue = data;
        }
        // Navigate through the structure if not a global key
        if (keys) {
          for (const k of keys) {
            if (Array.isArray(replacementValue)) {
              replacementValue = replacementValue[parseInt(k)] || undefined;
            } else {
              replacementValue = replacementValue
                ? replacementValue[k]
                : undefined;
            }
          }
        }

        template = template.replace(
          place,
           JSON.stringify(replacementValue) || place
          // replacementValue ? replacementValue : place
        );
      });
    }

    //----------------------multiple condition-----------------------------------------

    const multipleCondition = splitAndExtractPatterns(template);
    
    let multipleConditionResult = multipleFqlConditions(multipleCondition);
    return multipleConditionResult;

     //----------------------multiple condition-----------------------------------------

  } else if (typeof template === "object" && template !== null) {
    const result: any = Array.isArray(template) ? [] : {};
    for (const key in template) {
      result[key] = replacePlaceholders(template[key], data, globalArrayKeys);
    }
    return result;
  } else {
    return template; // Return the value if it's not a placeholder
  }
}

export const updateArray = (
  array: any,
  previousEdgeResponse: any,
  globalKeysArray: any
) => {
  if (Array.isArray(array)) {
    return array.map((item) => {
      const key = item.name;

      let response = previousEdgeResponse;
      let value = previousEdgeResponse
        ? replacePlaceholders(item.test_value, { response }, globalKeysArray)
        : item.test_value;
      console.log(value, "operations_query_param");
      value =
        typeof value === "object" || Array.isArray(value)
          ? JSON.stringify(value)
          : value?.toString();

      console.log(value, "operations_query_param");
      return { key, value };
    });
  }
  return [];
};

function extractPathConditionAndField(query: any) {
  const pathMatch = query.match(/\{([^\[]+)\[/);
  const conditionMatch = query.match(/\[([^\]]+)\]/);
  const fieldMatch = query.match(/\]\.([^}]+)\}/);

  const path = pathMatch ? pathMatch[1].trim() : null;
  const condition = conditionMatch ? conditionMatch[1].trim() : null;
  const field = fieldMatch ? fieldMatch[1].trim() : null;

  return { path, condition, field };
}

function parseCondition(condition: any) {
  const [key, value] = condition.split("=").map((s: any) => s.trim());
  const parsedValue = isNaN(value) ? value.replace(/"/g, "") : Number(value);
  return { key, value: parsedValue };
}

function getValueByPath(obj: any, path: any) {
  return path
    .split(".")
    .reduce((o: any, p: any) => (o ? o[p] : undefined), obj);
}

function filterByCondition(array: any, { key, value }: any) {
  return array.filter((item: any) => item[key] === value);
}

// function dynamicFilter(data: any, queries: any) {
//   // Split queries by delimiter (assumed to be ',')
//   const queryArray = queries.split(/\s*,\s*/);

//   // Process each query and collect results
//   const results = queryArray.map((query: any) => {
//     const { path, condition, field } = extractPathConditionAndField(query);

//     if (!path) {
//       throw new Error("Invalid query format: missing path");
//     }

//     const array = getValueByPath(data, path);
//     if (!Array.isArray(array)) {
//       throw new Error(`Path does not lead to an array: ${path}`);
//     }

//     let result;
//     if (condition) {
//       const parsedCondition = parseCondition(condition);
//       const filteredArray = filterByCondition(array, parsedCondition);
//       result = field
//         ? filteredArray.map((item: any) => item[field])
//         : filteredArray;
//     } else {
//       result = field ? array.map((item) => item[field]) : array;
//     }

//     // If the result is an array with one item and no field is specified, return the item directly
//     if (result.length === 1 && !field) {
//       result = result[0];
//     }

//     return result;
//   });

//   // Flatten the results if there's only one query, otherwise return as an array of results
//   return results.length === 1 ? results[0] : results;
// }

// function dynamicFilter(data: any, queries: any) {
//   // Split queries by delimiter (assumed to be ',')
//   const queryArray = queries.split(/\s*,\s*/);

//   const results = queryArray.map((query: any) => {
//     const { path, condition, field } = extractPathConditionAndField(query);

//     if (!path) {
//       throw new Error("Invalid query format: missing path");
//     }

//     const array = getValueByPath(data, path);
//     if (!Array.isArray(array)) {
//       throw new Error(`Path does not lead to an array: ${path}`);
//     }

//     if (condition) {
//       const parsedCondition = parseCondition(condition);
//       const filteredArray = filterByCondition(array, parsedCondition);
//       return field
//         ? filteredArray.map((item: any) => item[field])
//         : filteredArray;
//     } else {
//       return field ? array.map((item) => item[field]) : array;
//     }
//   });

//   return results;
// }

function dynamicFilter(data: any, queries: any) {
  // Split queries by delimiter (assumed to be ',')
  const queryArray = queries.split(/\s*,\s*/);

  const results = queryArray.map((query: any) => {
    const { path, condition, field } = extractPathConditionAndField(query);

    if (!path) {
      throw new Error("Invalid query format: missing path");
    }

    console.log("DataPath: ", data, path)
    const array = getValueByPath(data, path);
    if (!Array.isArray(array)) {
      throw new Error(`Path does not lead to an array: ${path}`);
    }

    if (condition) {
      const parsedCondition = parseCondition(condition);
      const filteredArray = filterByCondition(array, parsedCondition);
      return field
        ? filteredArray.map((item: any) => item[field])
        : filteredArray;
    } else {
      return field ? array.map((item) => item[field]) : array;
    }
  });

  // Return a single array if there's only one query, otherwise return an array of arrays
  return results.length === 1 ? results[0] : results;
}

export function generateUniqueNodeName() {
  const prefix = "node_";
  const randomString = Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric string
  return `${prefix}${randomString}`;
}

// export function extractPlaceholdersFromPath(url: string) {
//   if (!url) {
//     return [];
//   }

//   try {
//     // Create a URL object to handle the URL components properly
//     const urlObject = new URL(url);

//     // Get the pathname (which is the part of the URL after the host and port)
//     const urlPath = urlObject.pathname;

//     // Define regular expressions to match placeholders
//     const curlyBraceRegex = /\{([^}]+)\}/g;
//     const colonRegex = /:([^\/\?\{\}]+)/g;

//     const placeholders = [];
//     let match;

//     // Extract curly brace placeholders
//     while ((match = curlyBraceRegex.exec(urlPath)) !== null) {
//       placeholders.push(match[1]);
//     }

//     // Extract colon placeholders
//     while ((match = colonRegex.exec(urlPath)) !== null) {
//       placeholders.push(match[1]);
//     }

//     return placeholders;
//   } catch (error) {
//     console.error("Invalid URL:", error);
//     return [];
//   }
// }

export function extractPlaceholdersFromPath(path: string | null): string[] {
  if (!path) return [];
  const placeholderRegex = /\{([^}]+)\}/g; // matches {placeholder}
  const matches = [];
  let match;

  while ((match = placeholderRegex.exec(path)) !== null) {
    matches.push(match[1]); // push the placeholder name
  }

  return matches;
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

 export const getValueOrDefault = (value: any) => {
    // Check if value is null, "null", or undefined
    const checkValue =
      value === null || value === "null" || value === undefined ? "-" : value;
    console.log("checkValue: ", checkValue);
    return checkValue; // Ensure the returned value is always a string
  };

export const extractAllVariables = (inputString: any) => {
  const variablePattern = /\{response\.([^\}\.]+)(?:\.[^\}]*)?\}/g;
  const variables = [];
  let match;

  while ((match = variablePattern.exec(inputString)) !== null) {
    variables.push(match[1]); // Extracted variable name
  }

  return variables;
};

export const validatePlaceholders = (str: any) => {
  const regex = /\{[^}]*$/;
  return !regex.test(str);
};

export function prepareNodes(nodeMap: any) {
  const nodeArray: any = [];
  const deleteNodeId: any = [];
  const nodeJson = nodeMap?.toJSON();

  Object.keys(nodeJson).forEach((key) => {
    if (nodeJson[key].action === "DELETE_NODES") {
      deleteNodeId.push(nodeJson[key]?.nodes?.id);
    } else {
      // if (nodeJson[key].nodes?.type === "operationNode") {
      nodeArray.push({
        ...nodeJson[key].nodes,
        // data: JSON.stringify(nodeJson[key]?.nodes?.data),
        response: nodeJson[key]?.response || null,
        data: nodeJson[key]?.nodes?.data,

        is_active: true,
      });
      // } else {
      //   nodeArray.push({ ...nodeJson[key].nodes, status: "Active" });
      // }
    }
  });

  return { nodeArray, deleteNodeId };
}

// Helper function to prepare edges data
export function prepareEdges(edgesMap: any) {
  const edgesArray: any = [];
  const deleteEdgeId: any = [];
  const edgesJson = edgesMap?.toJSON();

  Object.keys(edgesJson).forEach((key) => {
    if (edgesJson[key].action === "DELETE_EDGES") {
      deleteEdgeId.push(edgesJson[key]?.edges?.id);
    } else {
      edgesArray.push({
        ...edgesJson[key].edges,
        type: "buttonEdge",
        is_active: true,
      });
    }
  });

  return { edgesArray, deleteEdgeId };
}

export function formatToTitleCase(str: string) {
  // First, replace camelCase with spaces before capital letters
  const words = str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // This splits camelCase
    .split("_"); // Then, split by underscores

  // Capitalize the first letter of each word and join with spaces
  const formattedString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedString;
}

export function getFirstThreeLetters(str: string) {
  return str.substring(0, 3);
}

export function multipleFqlConditions(multipleCondition: any) {
let multiVal: any[] = [];
  
  multipleCondition?.forEach((pattern: any) => {
      const templateSplit = extractCurlyBraceContent(pattern);

      if (templateSplit?.beforeCurly === "upperCase") {
        const upperCaseResult = upperCaseFunc(templateSplit?.curlyContent);
        multiVal?.push(upperCaseResult)
      }
      else if (templateSplit?.beforeCurly === "lowerCase") {
        const lowerCaseResult = lowerCaseFunc(templateSplit?.curlyContent);
        multiVal?.push(lowerCaseResult);
      }
      else if (templateSplit?.beforeCurly === "parseJson") {
        const stringToJsonResult = stringToJsonFunc(templateSplit?.curlyContent);
        multiVal?.push(stringToJsonResult);
      }
      else if (templateSplit?.beforeCurly === "appendArray") {
        const appendArrayResult = appendArraysFunc(templateSplit?.curlyContent);
        multiVal?.push(appendArrayResult);
      }
      else if (templateSplit?.beforeCurly === "checkCondition") {
        const conditionResult = parseTernaryExpressionFunc(templateSplit?.curlyContent);
        multiVal?.push(conditionResult)
      }
      else {
        multiVal?.push(templateSplit?.curlyContent)
      }
    })
    let multiValResult = multiVal?.toString();
    
    return multiValResult;
}

export function splitAndExtractPatterns(input: string) {
  const patterns = input.split(",&").map((str, index) => {
      const check = index === 0 ? str.trim() : `&${str.trim()}`;
      return check;
  });
  
  return patterns;
}

export function extractCurlyBraceContent(str: any) {
  if (typeof str !== 'string' || !str.startsWith('&')) {  
    return { beforeCurly: null, curlyContent: null}
  }

  const start = str?.indexOf('(');
  const end = str?.lastIndexOf(')');

  if (start === -1 || end === -1 || start >= end) {
     return {beforeCurly: null, curlyContent: null}
  }
  
  const beforeCurly = str.substring(0, start).replace('&', '');
  const curlyContent = str.substring(start + 1, end);

  return {beforeCurly, curlyContent}
}

function splitCommaSeparatedConditions(input: string): string[] {
  // This regular expression matches balanced parentheses and everything outside them.
  const regex = /(?:\([^()]*\)|[^,])+/g;
  const matches = input.match(regex);

  // Trim each match to remove excess spaces
  return matches ? matches.map(match => match.trim()) : [];
}


export const upperCaseFunc = (str: string | number | object | null) => {
  if (typeof str !== 'string') {
    return str;
  }

  let upperCaseValue:any[] = [];

  const multipleCondition = splitAndExtractPatterns(str);

  multipleCondition?.forEach((val: any) => {

    const commaSeperatedValues = splitCommaSeparatedConditions(val);

    commaSeperatedValues?.forEach((item: any) => {
      if (item?.startsWith("&")) {
      let multipleConditionResult = multipleFqlConditions(multipleCondition);
 
      let strUpperCase = multipleConditionResult?.toUpperCase();

      upperCaseValue.push(strUpperCase);
    } else {
      upperCaseValue.push(item?.toUpperCase());
    }
    })
  })

  return upperCaseValue;
}

export const lowerCaseFunc = (str: string | number | object | null): string | number | object | null => {
  if (typeof str !== 'string') {
    return str;
  }
  // return str?.toLowerCase();
  let lowerCaseValue = "";

  const multipleCondition = splitAndExtractPatterns(str);

  multipleCondition?.forEach((val: any) => {
    if (val?.startsWith("&")) {
      let multipleConditionResult = multipleFqlConditions(multipleCondition);
 
      let strUpperCase = multipleConditionResult?.toLowerCase();
      lowerCaseValue = strUpperCase;
    } else {
      lowerCaseValue = val?.toLowerCase();
    }
  })

  return lowerCaseValue;
}

export const stringToJsonFunc = (value: any) => {
  try {
    if (typeof value === 'string') {
    
      if ((value.startsWith('{') && value.endsWith('}')) || 
          (value.startsWith('[') && value.endsWith(']'))) {
        return JSON.parse(value); 
      }
    }
    return value; 
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return value; 
  }
}

//for array
export function extractCommaSeperatedValues(input: string): string[] {
  const arrays = input
    .replace(/^\[|\]$/g, "") 
    .split(",") 
    .map(value => value.trim().replace(/^\[|\]$/g, ""))
    .filter(value => value !== ""); 

// Return the resulting flattened array
  const result = arrays;
  return result;
}

export function appendArraysFunc(inputs: any) {
  const commaSeperatedValues = extractCommaSeperatedValues(inputs);
  let resultArray: any[] = [];
  
  resultArray = commaSeperatedValues;

  return resultArray;
}


//for condition
interface ConditionParts{
  lhs: string;
  operator: string;
  rhs: string;
}

const operatorPattern =  /(===|!==|==|!=|>=|<=|>|<)/;

//condition part
function extractConditionParts(condition: string): ConditionParts {
  const match = condition?.match(operatorPattern);
  if (!match) {
    throw new Error("No operator found in condition");
  }

  const operator = match[0];
  const [lhs, rhs] = condition?.split(operator)?.map((part) => part.trim());

  return { lhs, operator, rhs };
}

//evaluate based on condition
function evaluateCondition(condition: ConditionParts): boolean {
  const lhsValue = condition?.lhs;
  const rhsValue = condition?.rhs;
  const operValue =  condition?.operator

  switch (operValue) {
    case '===':
      return lhsValue === rhsValue;
    
    case '!==':
      return lhsValue !== rhsValue;
    
    case '>':
      return lhsValue > rhsValue;
    
    case '<':
      return lhsValue < rhsValue;
    
    case '>=':
      return lhsValue >= rhsValue;
    
    case '<=':
      return lhsValue <= rhsValue;
    
    default:
      throw new Error(`Unsupported operator: ${operValue}`);
  }
}

export function parseTernaryExpressionFunc(expression: string): string {
  if (!expression?.includes('?')) {
    return expression;
  }


  const ternaryPattern = /(.+?)\?(.+?):(.+)/;
  const match = expression?.match(ternaryPattern);

  if (match) {
    const condition = match[1]?.trim();
    const truePart = match[2]?.trim();
    const falsePart = match[3]?.trim();

    const conditionParts = extractConditionParts(condition);

    const isConditionTrue = evaluateCondition(conditionParts);

    const evaluatedTruePart = parseTernaryExpressionFunc(truePart);
    const evaluatedFalsePart = parseTernaryExpressionFunc(falsePart);

    return isConditionTrue ? evaluatedTruePart : evaluatedFalsePart;
  }


  return expression;
}


export function formatWorkspaceDate(val: string | any) {
  return moment(val).format("DD/MM/YYYY, hh:mm:ss A");
}