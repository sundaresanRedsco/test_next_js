export function errorHandling(error: any) {
  let errorData: any = "Try again later";

  // Check if error.response is defined to avoid TypeError
  if (error?.response) {
    const { data } = error.response;

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
    } else if (Array.isArray(data?.error)) {
      errorData = JSON.stringify(data.error, null, 2);
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

  return errorData;
}
