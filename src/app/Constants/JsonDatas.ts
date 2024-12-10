export const FQL_FUNCTIONS = [
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
