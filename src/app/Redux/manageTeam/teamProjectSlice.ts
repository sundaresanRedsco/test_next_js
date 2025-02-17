import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminServices } from "../../Services/services";
import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

export const apiTeams = createApi({
  reducerPath: "apiTeams",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.apiflow.pro",
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer " + Cookies.get("token"));
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeamsByUserId: builder.query({
      query: (user_id) => `/api/Team_/get_user_teams?user_id=${user_id}`,
    }),
  }),
});

// export const { useLazyGetAllProjectByWorkspaceIdQuery, useGetAllProjectByWorkspaceIdQuery } = apiManagementProjects;

export const {   } =
  apiTeams;
