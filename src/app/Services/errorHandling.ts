// export function errorHandling(error: any) {
//   let errorData = "Try again later";
//   console.log(error?.response?.data?.error, "error?.responsesdsdsdww");
//   console.log(error?.response?.data, "error?.response22");

//   if (Array.isArray(error?.response?.data?.error)) {
//     errorData = JSON.stringify(error.response.data.error, null, 2); // Convert array to JSON string with indentation
//     console.log(errorData, "error?.response?.data (array)");
//     return errorData;
//   }

//   if (error?.response?.data?.Error) {
//     errorData = error?.response?.data?.Error;
//     return errorData;
//   }

//   if (error?.response?.data?.error[0]?.errorMessage) {
//     errorData = error?.response?.data?.error[0]?.errorMessage;
//     return errorData;
//   }

//   if (error?.response?.data.error) {
//     errorData = error?.response?.data.error;
//     return errorData;
//   }

//   if (error?.response?.data?.Code) {
//     errorData = error?.response?.data?.Code;
//     return errorData;
//   }

//   if (error?.response?.data) {
//     errorData = error?.response?.data;
//     return errorData;
//   }

//   return errorData;
// }

export function errorHandling(error: any) {
  let errorData: any = "Try again later";
  console.log(error, "error");
  console.log(error?.response?.data?.error, "error?.response?.data.error");
  console.log(error?.response?.data, "error?.response");

  // Check if error.response is defined to avoid TypeError
  if (error?.response) {
    const { data } = error.response;
    console.log(data, "data");
    if (Array.isArray(data)) {
      const errorObject = data.reduce((acc: any, errorItem: any) => {
        if (errorItem.propertyName && errorItem.errorMessage) {
          acc[errorItem.propertyName] = errorItem.errorMessage;
        }
        return acc;
      }, {});
      errorData = JSON.stringify(errorObject);
    } else if (data?.errorType && data?.errorMessage) {
      errorData = data.errorMessage;
      console.log("Custom import error:", errorData);
    } else if (Array.isArray(data?.error)) {
      errorData = JSON.stringify(data.error, null, 2);
      console.log(errorData, "error?.response.data (array)");
    } else if (data?.Error) {
      errorData = data.Error;
    } else if (data?.error && data.error[0]?.errorMessage) {
      errorData = data.error[0].errorMessage;
    } else if (data?.error) {
      errorData = data.error;
    } else if (data?.Code) {
      errorData = data.Code;
    } else if (data) {
      errorData = JSON.stringify(data); // Serialize if it's an object
    }
  }
  // else if (error?.status == 401) {
  //   errorData={message:error.error}
  // }

  return errorData;
}
