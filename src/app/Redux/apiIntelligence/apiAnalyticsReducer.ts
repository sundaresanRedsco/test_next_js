import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";

export const GetApiAnalyticsLists = createAsyncThunk(
  "apiAnalytics/getApiAnalyticsLists",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiIntelligence/get_apianalytics_results",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateApiAnalytics = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  apiAnalyticsList: any[];
};

const initialState: InitialStateType = {
  loading: false,
  apiAnalyticsList: [],
};

export const apiAnalyticsSlice = createSlice({
  name: "apiAnalytics",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetApiAnalyticsLists.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetApiAnalyticsLists.fulfilled, (state, action) => {
      state.loading = false;
      state.apiAnalyticsList = action.payload;
    });

    builder.addCase(GetApiAnalyticsLists.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateApiAnalytics, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type apiAnalyticsReducer = ReturnType<typeof apiAnalyticsSlice.reducer>;

export default apiAnalyticsSlice.reducer;
