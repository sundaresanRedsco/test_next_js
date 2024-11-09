import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";

export const GetCallsCount = createAsyncThunk(
  "apiActivity/getCallsCount",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiIntelligence/get_totalapi_count",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const GetApiActivityList = createAsyncThunk(
  "apiActivity/getApiActivityList",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiIntelligence/get_apiactivity_list",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateApiActivity = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  callsCount: any[];
  apiActivityList: any[];
};

const initialState: InitialStateType = {
  loading: false,
  callsCount: [],
  apiActivityList: [],
};

export const apiActivitySlice = createSlice({
  name: "apiActivity",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetCallsCount.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetCallsCount.fulfilled, (state, action) => {
      state.loading = false;
      state.callsCount = action.payload;
    });

    builder.addCase(GetCallsCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetApiActivityList.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetApiActivityList.fulfilled, (state, action) => {
      state.loading = false;
      state.apiActivityList = action.payload;
    });

    builder.addCase(GetApiActivityList.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateApiActivity, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type apiActivityReducer = ReturnType<typeof apiActivitySlice.reducer>;

export default apiActivitySlice.reducer;
