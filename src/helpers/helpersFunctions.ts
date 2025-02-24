import moment from "moment";
import {
  onboardingConstants,
  sigInUpConstants,
  textConstants,
} from "../constants/appTexts";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { signInUpStyleConstants } from "../constants/styleConstants";
import { landingConstants } from "@/constants/landingTexts";

const SECRET_KEYS = process.env.REACT_APP_SECRET_KEY;

const constants = {
  signInUpStyleConstants,
  sigInUpConstants,
  onboardingConstants,
};

export const translate = (key: string) => {
  let language: string = "en";
  const keys = key.split("."); // Split the keys by dot
  // Using reduce to navigate through the nested structure
  const translatedText = keys.reduce((acc: any, currentKey: any) => {
    return acc ? acc[currentKey] : undefined;
  }, textConstants[language]);
  return translatedText;
};

export const signInUpTranslate = (key: string, constanstName: string) => {
  const keys = key.split(".");
  let language: string = "en";
  const dependencyObject = constants[constanstName as keyof typeof constants];
  const dependency =
    constanstName == "sigInUpConstants"
      ? dependencyObject[language as keyof typeof dependencyObject]
      : dependencyObject;
  const translatedText = keys.reduce((acc: any, currentKey: any) => {
    return acc ? acc[currentKey] : undefined;
  }, dependency);
  return translatedText;
};

export const globalTranslate = (key: string, constanstName: string) => {
  const keys = key.split(".");
  let language: string = "en";

  //constants contains "en" should be conditionally checked
  const API_CONSTANTS =
    constanstName == "sigInUpConstants" ||
    constanstName == "onboardingConstants";

  const dependencyObject = constants[constanstName as keyof typeof constants];
  const dependency = API_CONSTANTS
    ? dependencyObject[language as keyof typeof dependencyObject]
    : dependencyObject;
  const translatedText = keys.reduce((acc: any, currentKey: any) => {
    return acc ? acc[currentKey] : undefined;
  }, dependency);
  return translatedText;
};

export const landingPageTranslate = (key: string) => {
  let language: string = "en";
  const keys = key.split("."); // Split the keys by dot
  // Using reduce to navigate through the nested structure
  const translatedText = keys.reduce((acc: any, currentKey: any) => {
    return acc ? acc[currentKey] : undefined;
  }, landingConstants[language]);
  return translatedText;
};

export const dateFormat = (val: string) => {
  let dateFormat = "DD-MM-YYYY hh:mm:ss A";
  const dateFormatValue = moment(val).format(dateFormat);
  return dateFormatValue;
};

const dateFormatDateOnly = (val: string) => {
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

    return null;
  }

  const SECRET_KEY: any = "your-secret-key";
  // const SECRET_KEY: any = SECRET_KEYS;

  try {
    const bytes = CryptoJS.AES.decrypt(val, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
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
function replacePlaceholders(template: any, data: any, globalArrayKeys: any) {
  if (
    typeof template === "string" &&
    (template.includes("{") || template.includes("&"))
  ) {
    if (hasFilterCondition(template)) {
      template = dynamicFilter(data, template);
      return template;
    }
    const placeholders = template.match(/{(.*?)}/g); // Find all placeholders
    if (placeholders) {
      placeholders.forEach((place) => {
        let keys;
        let replacementValue;
        // Check if the placeholder starts with 'global.'
        if (globalArrayKeys?.length > 0 && place.includes("{global.")) {
          const startIndex = place.indexOf("{global.") + 8; // 8 is the length of '{global.'
          const endIndex = place.indexOf("}", startIndex); // Find the closing '}'
          let globalKey: any;
          if (endIndex > startIndex) {
            globalKey = place.slice(startIndex, endIndex);
          } else {
          }
          const globalObject = globalArrayKeys
            ? globalArrayKeys.find((obj: any) => obj.key_name === globalKey)
            : null;
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

      value =
        typeof value === "object" || Array.isArray(value)
          ? JSON.stringify(value)
          : value?.toString();

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
  return checkValue; // Ensure the returned value is always a string
};

const extractAllVariables = (inputString: any) => {
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

function getFirstThreeLetters(str: string) {
  return str.substring(0, 3);
}

function multipleFqlConditions(multipleCondition: any) {
  let multiVal: any[] = [];

  multipleCondition?.forEach((pattern: any) => {
    const templateSplit = extractCurlyBraceContent(pattern);

    if (templateSplit?.beforeCurly === "upperCase") {
      const upperCaseResult = upperCaseFunc(templateSplit?.curlyContent);
      multiVal?.push(upperCaseResult);
    } else if (templateSplit?.beforeCurly === "lowerCase") {
      const lowerCaseResult = lowerCaseFunc(templateSplit?.curlyContent);
      multiVal?.push(lowerCaseResult);
    } else if (templateSplit?.beforeCurly === "parseJson") {
      const stringToJsonResult = stringToJsonFunc(templateSplit?.curlyContent);
      multiVal?.push(stringToJsonResult);
    } else if (templateSplit?.beforeCurly === "appendArray") {
      const appendArrayResult = appendArraysFunc(templateSplit?.curlyContent);
      multiVal?.push(appendArrayResult);
    } else if (templateSplit?.beforeCurly === "checkCondition") {
      const conditionResult = parseTernaryExpressionFunc(
        templateSplit?.curlyContent
      );
      multiVal?.push(conditionResult);
    } else {
      // multiVal?.push(templateSplit?.curlyContent);
      multiVal?.push(pattern);
    }
  });
  let multiValResult = multiVal?.toString();

  return multiValResult;
}

function splitAndExtractPatterns(input: string) {
  if (input.startsWith("&appendArray")) {
    const patterns = input
      .replace(/^\&appendArray\(/, "")
      .replace(/\)$/, "")
      .replace(/\[|\]/g, "")
      .split(",")
      .map((value) => value.trim());
    return patterns;
  } else if (input.startsWith("&checkCondition")) {
    const splitWithRespectToBrackets = (val: string | any[]) => {
      const result = [];
      let current = "";
      let depth = 0;

      for (let i = 0; i < val.length; i++) {
        const char = val[i];
        if (char === "[" || char === "(") {
          depth++;
        } else if (char === "]" || char === ")") {
          depth--;
        }

        if (char === "," && depth === 0) {
          // If at the top level (not inside brackets), split here
          result.push(current.trim());
          current = "";
        } else {
          current += char; // Accumulate characters
        }
      }

      if (current) {
        result.push(current.trim()); // Add the last segment
      }

      return result.map((str, index) => (index === 0 ? str : `&${str}`));
    };
    const patterns = splitWithRespectToBrackets(input);
    return patterns;
  } else {
    const patterns = input.split(",&").map((str, index) => {
      const check = index === 0 ? str.trim() : `&${str.trim()}`;
      return check;
    });

    return patterns;
  }
  // const patterns = input.split(",&").map((str, index) => {
  //   const check = index === 0 ? str.trim() : `&${str.trim()}`;
  //   return check;
  // });

  // return patterns;
}

function extractCurlyBraceContent(str: any) {
  if (typeof str !== "string" || !str.startsWith("&")) {
    return { beforeCurly: null, curlyContent: null };
  }

  const start = str?.indexOf("(");
  const end = str?.lastIndexOf(")");

  if (start === -1 || end === -1 || start >= end) {
    return { beforeCurly: null, curlyContent: null };
  }

  const beforeCurly = str.substring(0, start).replace("&", "");
  const curlyContent = str.substring(start + 1, end);

  return { beforeCurly, curlyContent };
}

function splitCommaSeparatedConditions(input: string): string[] {
  // This regular expression matches balanced parentheses and everything outside them.
  const regex = /(?:\([^()]*\)|[^,])+/g;
  const matches = input.match(regex);

  // Trim each match to remove excess spaces
  return matches ? matches.map((match) => match.trim()) : [];
}

const upperCaseFunc = (str: string | number | object | null) => {
  if (typeof str !== "string") {
    return str;
  }

  let upperCaseValue: any[] = [];

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
    });
  });

  return upperCaseValue;
};

const lowerCaseFunc = (
  str: string | number | object | null
): string | number | object | null => {
  if (typeof str !== "string") {
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
  });

  return lowerCaseValue;
};

const stringToJsonFunc = (value: any) => {
  try {
    if (typeof value === "string") {
      if (
        (value.startsWith("{") && value.endsWith("}")) ||
        (value.startsWith("[") && value.endsWith("]"))
      ) {
        return JSON.parse(value);
      }
    }
    return value;
  } catch (error) {
    return value;
  }
};

//for array

function extractCommaSeperatedValues(input: any): any[] {
  // const arrays = input
  //   .replace(/^\[|\]$/g, "")
  //   .split(",")
  //   .map((value) => value.trim().replace(/^\[|\]$/g, ""))
  //   .filter((value) => value !== "");

  const multipleCondition = splitAndExtractPatterns(input);

  // const arrays = input
  //   .replace(/^\&appendArray\(\[/, "")
  //   .replace(/\]\)$/, "")
  //   .split(/,(?![^\[]*\])/g)
  //   .map((value) => value.trim());

  const arrays =
    input
      .replace(/^\&appendArray\(\[/, "") // Remove &appendArray([ wrapper
      .replace(/\]\)$/, "") // Remove closing brackets ])
      .match(/(?<=\[).*?(?=\])/g) // Match content inside square brackets
      ?.flatMap((group: string) =>
        group.split(",").map((value: string) => value.trim())
      ) || [];

  // Return the resulting flattened array
  const result = arrays;

  let multipleFqlArr: any[] = [];
  result?.forEach((val: any) => {
    if (val?.startsWith("&")) {
      let multipleConditionResult = multipleFqlConditions([val]);

      multipleFqlArr.push(multipleConditionResult);
    } else {
      multipleFqlArr.push(val);
    }
  });

  // return result;
  return multipleFqlArr;
}

function appendArraysFunc(inputs: any) {
  const commaSeperatedValues = extractCommaSeperatedValues(inputs);
  let resultArray: any[] = [];

  resultArray = commaSeperatedValues;

  return resultArray;
}

//for condition
interface ConditionParts {
  lhs: string;
  operator: string;
  rhs: string;
}

const operatorPattern = /(===|!==|==|!=|>=|<=|>|<)/;

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
  const operValue = condition?.operator;

  switch (operValue) {
    case "===":
      return lhsValue === rhsValue;

    case "!==":
      return lhsValue !== rhsValue;

    case ">":
      return lhsValue > rhsValue;

    case "<":
      return lhsValue < rhsValue;

    case ">=":
      return lhsValue >= rhsValue;

    case "<=":
      return lhsValue <= rhsValue;

    default:
      throw new Error(`Unsupported operator: ${operValue}`);
  }
}

function parseTernaryExpressionFunc(expression: string): string {
  if (!expression?.includes("?")) return expression;

  const ternaryPattern = /(.+?)\?(.+?):(.+)/;
  // const ternaryPattern = /^(.*?[^?])\?([^:]+):(.+)$/;
  const match = expression?.match(ternaryPattern);

  if (!match) return expression;

  const [_, condition, truePart, falsePart] = match.map((part) => part.trim());

  const isConditionTrue = evaluateCondition(extractConditionParts(condition));

  const parsePart = (part: string) => {
    const evaluatedPart = parseTernaryExpressionFunc(part);

    return evaluatedPart.startsWith("&")
      ? multipleFqlConditions([evaluatedPart])
      : evaluatedPart;
  };

  return isConditionTrue ? parsePart(truePart) : parsePart(falsePart);

  // if (match) {
  //   const condition = match[1]?.trim();
  //   const truePart = match[2]?.trim();
  //   const falsePart = match[3]?.trim();

  //   const conditionParts = extractConditionParts(condition);

  //   const isConditionTrue = evaluateCondition(conditionParts);

  //   const evaluatedTruePart = parseTernaryExpressionFunc(truePart);
  //   const evaluatedFalsePart = parseTernaryExpressionFunc(falsePart);

  //   const fqlTruePart = evaluatedTruePart?.startsWith("&")
  //     ? multipleFqlConditions([evaluatedTruePart])
  //     : evaluatedTruePart;

  //   const fqlFalsePart = evaluatedFalsePart?.startsWith("&")
  //     ? multipleFqlConditions([evaluatedFalsePart])
  //     : evaluatedFalsePart;

  //   // return isConditionTrue ? evaluatedTruePart : evaluatedFalsePart;
  //   return isConditionTrue ? fqlTruePart : fqlFalsePart;
  // }

  // return expression;
}

export function formatWorkspaceDate(val: string | any) {
  return moment(val).format("DD/MM/YYYY, hh:mm:ss A");
}
export const changeValueToString = (input: any) => {
  let lines = input.split("\n");
  let keys: any = [];
  lines.forEach((line: any, index: number) => {
    if (line.includes('":')) {
      const key = line.split('":')[0];
      keys.push(key);
    }
  });
  lines.forEach((line: any, index: number) => {
    if (line.includes('":')) {
      const value = line.split('":')[1];
      const key = line.split('":')[0];
      if (value.split("").filter((char: any) => char == '"').length == 0) {
        let customVal = value;
        if (value[value.length - 1] == ",") {
          customVal = `"${value.substring(0, value.length - 1)}",`;
        } else {
          customVal = `"${value}"`;
        }

        lines[index] = key + '":' + customVal;
      }
    }
  });
  return lines.join("\n");
};
export function validateTernarySyntax(input: any) {
  const text = input.replace(/\s+/g, "");
  let stack = [];
  let hasTernary = false; // Flag to check if at least one ternary is found
  let lastChar = ""; // To keep track of the last character seen to ensure expressions after ? and :

  // Iterate over each character in the string
  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char === "?") {
      lastChar = text[i + 1];
      stack.push("?"); // Push ? onto the stack
      hasTernary = true; // We found a ternary operator

      // Check if there is a valid expression before the ?
      if (!lastChar || lastChar == ":" || lastChar == "?") {
        return false; // Invalid if : is the first or after another :
      }
    } else if (char === ":") {
      lastChar = text[i + 1];

      // Check if there's a matching ? for this :
      if (stack.length === 0 || stack[stack.length - 1] !== "?") {
        return false; // No ? before this :, invalid ternary syntax
      }
      stack.pop(); // Pop the matching ? from the stack

      // Check if there's a valid expression before the :
      if (!lastChar || lastChar == ":" || lastChar == "?") {
        return false; // Invalid if : is the first or after another :
      }

      // After the colon, there must be a valid expression (not just an empty or invalid character)
      if (i + 1 < text.length && (text[i + 1] === " " || text[i + 1] === ":")) {
        return false; // Invalid if there is nothing after the colon
      }
    }

    // Skip spaces or other irrelevant characters
    // if (char !== " ") {
    //   lastChar = char; // Update the last character seen
    // }
  }

  // If there are any unmatched ? left, it's invalid
  if (stack.length > 0) {
    return false;
  }

  // Ensure at least one ternary operator was found
  if (!hasTernary) {
    return false;
  }

  return true;
}

export function validateFQLFunctionSyntax({
  isAnnotations,
  annotations,
  input,
  isErr,
  err,
  nodeData,
  textEditor,
  seterrMsg,
  type,
}: any) {
  const validFunctions = [
    "appendArray",
    "upperCase",
    "lowerCase",
    "parseJson",
    "checkCondition",
  ];
  if (input && input.includes("&")) {
    const lines = input.split("\n");

    const isFunctionErr = lines.map((line: any, lineIndex: number) => {
      let match;
      const regex = /&([a-zA-Z]+)\((.*?)\)/g; // Regex to match &functionName(...)
      // Check for all function calls in the line
      while ((match = regex.exec(line)) !== null) {
        const functionName = match[1];
        const argumentsContent = match[2];
        const position = match.index;
        if (
          functionName == "checkCondition" &&
          match[0] &&
          !validateTernarySyntax(argumentsContent)
        ) {
          if (isAnnotations) {
            annotations.push({
              row: lineIndex,
              column: position,
              text: `Function "${functionName}" contains invalid ternary operator at line ${
                lineIndex + 1
              }, position ${position + 1}`,
              type: "error",
            });
          } else if (isErr) {
            if (type == "input") {
              err.push(
                `In ${
                  nodeData.node_name
                } at ${type}, Function "${functionName}" has invalid ternary operator at line ${
                  lineIndex + 1
                }, position ${position + 1}.`
              );
            } else {
              err.push(
                `In ${nodeData.node_name} ${type}, Function "${functionName}" has invalid ternary operator.`
              );
            }
          } else if (textEditor) {
            seterrMsg("Invalid ternary operator");
            return true;
          }
        }
        // Check if the function name is valid
        if (!validFunctions.includes(functionName)) {
          if (isAnnotations) {
            annotations.push({
              row: lineIndex,
              column: position,
              text: `Invalid function "${functionName}" at line ${
                lineIndex + 1
              }, position ${position + 1}`,
              type: "error",
            });
          } else if (isErr) {
            if (type == "input") {
              err.push(
                `In ${
                  nodeData.node_name
                } ${type}, invalid function "${functionName}" at line ${
                  lineIndex + 1
                }, position ${position + 1}.`
              );
            } else {
              err.push(
                `In ${nodeData.node_name} ${type}, Function "${functionName}" is invalid .`
              );
            }
          } else if (textEditor) {
            seterrMsg("Invalid function");
            return true;
          }
        }

        // Check if the parentheses are empty
        if (argumentsContent.trim() === "") {
          if (isAnnotations) {
            annotations.push({
              row: lineIndex,
              column: position,
              text: `"${functionName}" at line ${lineIndex + 1}, position ${
                position + 1
              } has empty parentheses.`,
              type: "error",
            });
          } else if (isErr) {
            if (type == "input") {
              err.push(
                `In ${
                  nodeData.node_name
                } ${type}, Function "${functionName}" at line ${
                  lineIndex + 1
                }, position ${position + 1} has empty parentheses.`
              );
            } else {
              err.push(
                `In ${nodeData.node_name} ${type}, Function "${functionName}" has empty parentheses.`
              );
            }
          } else if (textEditor) {
            seterrMsg("Has empty parentheses");
            return true;
          }
        } else if (
          functionName == "appendArray" &&
          (argumentsContent[0] != "[" ||
            argumentsContent[argumentsContent.length - 1] != "]")
        ) {
          if (isAnnotations) {
            annotations.push({
              row: lineIndex,
              column: position,
              text: `The value passed in "${functionName}" must be a valid array at line ${
                lineIndex + 1
              }, position ${position + 1}`,
              type: "error",
            });
          } else if (isErr) {
            if (type == "input") {
              err.push(
                `In ${
                  nodeData.node_name
                } ${type}, Function "${functionName}" at line ${
                  lineIndex + 1
                }, position ${
                  position + 1
                } the value passed inside parentheses must be a valid array.`
              );
            } else {
              err.push(
                `In ${nodeData.node_name} ${type}, Function "${functionName}" must have valid array inside parentheses.`
              );
            }
          } else if (textEditor) {
            seterrMsg("Value inside parentheses must be a valid array");
            return true;
          }
        } else if (
          functionName == "appendArray" &&
          argumentsContent.includes("[") &&
          argumentsContent.includes("]") &&
          !argumentsContent.substring(1, argumentsContent.length - 1)
        ) {
          if (isAnnotations) {
            annotations.push({
              row: lineIndex,
              column: position,
              text: `The Function "${functionName}" must have least one element at line ${
                lineIndex + 1
              }, position ${position + 1}`,
              type: "error",
            });
          } else if (isErr) {
            if (type == "input") {
              err.push(
                `In ${
                  nodeData.node_name
                } ${type}, Function "${functionName}" at line ${
                  lineIndex + 1
                }, position ${position + 1} must have least one element.`
              );
            } else {
              err.push(
                `In ${nodeData.node_name} ${type}, Function "${functionName}" must have least one element.`
              );
            }
          } else if (textEditor) {
            seterrMsg("Must have atleast one element in the array");
            return true;
          }
        }
      }

      // Check for any invalid use of "&" that's not followed by a valid function call
      // This checks for cases like "& someText", "& wrongFunction", or just "&"
      const invalidAmpersandRegex = /&(?![a-zA-Z]+\(.*\))/g;
      while ((match = invalidAmpersandRegex.exec(line)) !== null) {
        const position = match.index;
        if (isAnnotations) {
          annotations.push({
            row: lineIndex,
            column: position,
            text: `Invalid "&" usage at line ${lineIndex + 1}, position ${
              position + 1
            }`,
            type: "error",
          });
        } else if (isErr) {
          if (type == "input") {
            err.push(
              `In ${nodeData.node_name} ${type}, Invalid "&" usage at line ${
                lineIndex + 1
              }, position ${position + 1}.`
            );
          } else {
            err.push(`In ${nodeData.node_name} ${type}, Invalid "&" usage.`);
          }
        } else if (textEditor) {
          seterrMsg(`Invalid "&" usage`);
          return true;
        }
      }
    });
    if (textEditor) {
      return isFunctionErr[0];
    }
  }
}
