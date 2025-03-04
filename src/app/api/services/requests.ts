import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BACKEND_URL,
});
export const getApi = async (url: string, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get(url, { headers });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const postApi = async (url: string, data: any, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
