import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminServices } from "../../Services/services";
import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

export const apiManagementProjects = createApi({
  reducerPath: "apiManagementProjects",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.apiflow.pro",
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer " + Cookies.get("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllProjectByWorkspaceId: builder.query({
      query: (workspaceId) =>
        `/api/Project/get_project_by_workspace_id?workspace_id=${workspaceId}`,
    }),
  }),
});

// export const { useGetAllProjectByWorkspaceIdQuery } = apiManagementProjects;
export const {
  useLazyGetAllProjectByWorkspaceIdQuery,
  useGetAllProjectByWorkspaceIdQuery,
} = apiManagementProjects;
