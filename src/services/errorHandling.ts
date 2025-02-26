export function errorHandling(error: any) {
  let errorData: any = "Try again later";

  // Check if error.response is defined to avoid TypeError
  if (error?.errormessage) {
    errorData = error?.errormessage;
  }

  return errorData;
}
