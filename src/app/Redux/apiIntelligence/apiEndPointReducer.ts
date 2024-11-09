import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";

export const GetDashboardEndpointCount = createAsyncThunk(
  "apiEndpoint/getDashboardEndpointCount",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiIntelligence/get_endpointsDetails",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const GetEndpointSummaryList = createAsyncThunk(
  "apiEndpoint/GetEndpointSummaryList",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiIntelligence/get_apiendpoints_summaryDetails",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateApiEndpoint = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  apiEndpointDashboardCount: any[];
  apiEndpointSummaryList: any[];
};

const initialState: InitialStateType = {
  loading: false,
  apiEndpointDashboardCount: [],
  apiEndpointSummaryList: [],
};

export const apiEndpointSlice = createSlice({
  name: "apiEndpoint",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetDashboardEndpointCount.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetDashboardEndpointCount.fulfilled, (state, action) => {
      state.loading = false;
      state.apiEndpointDashboardCount = action.payload;
    });

    builder.addCase(GetDashboardEndpointCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetEndpointSummaryList.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetEndpointSummaryList.fulfilled, (state, action) => {
      state.loading = false;
      state.apiEndpointSummaryList = action.payload;
    });

    builder.addCase(GetEndpointSummaryList.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateApiEndpoint, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type apiEndPointReducer = ReturnType<typeof apiEndpointSlice.reducer>;

export default apiEndpointSlice.reducer;
