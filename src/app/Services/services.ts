import axios from "../axios-client";
import { adminUrl } from "./auth";

export async function AdminServices(
  method: string,
  url: string,
  data?: any,
  headers?: any
) {
  try {
    const response = await axios({
      method,
      url: `${adminUrl}/${url}`,
      data,
      ...(headers && { headers: { Authorization: `Bearer ${headers}` } }),
    });

    // const response = await axios({
    //   method:"POST",
    //   url: `/api/admin`,
    //   data: {
    //     method,   // Original HTTP method (GET, POST, etc.)
    //     endpoint: url, // The actual API endpoint that is being masked
    //     data,     // Payload for the request
    //   },
    //   headers
    // })
    return response.data;
  } catch (error) {
    throw error;
  }
}
