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

    return response.data;
  } catch (error) {
    throw error;
  }
}
