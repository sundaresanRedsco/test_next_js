import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

const GetRiskTableCount = createAsyncThunk(
  "riskapi/GetRiskTableCount",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/get_riskyapi_withRiskProperties",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const ScanCreate = createAsyncThunk(
  "riskapi/scanCreate",
  async (value: any) => {
    try {
      return await AdminServices("post", "api/Scan/create_scan", value, null);
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const ScanSchduleCreate = createAsyncThunk(
  "riskapi/scanschduleCreate",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Scan/create_schedulescan",
        value,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const ScanManualCreate = createAsyncThunk(
  "riskapi/scanManualCreate",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Scan/create_manual_scan",
        value,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const GetScanPolicyDetailsById = createAsyncThunk(
  "riskapi/getScanPolicyDetailsById",
  async (user_policy_id: any) => {
    try {
      return await AdminServices(
        "get",
        "api/Scan/scans/" + user_policy_id,
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateRiskApi = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  apiRisktableCount: any[];
  scanPolicyDetails: any;
};

const initialState: InitialStateType = {
  loading: false,
  apiRisktableCount: [],
  scanPolicyDetails: [],
};

const projectSlice = createSlice({
  name: "riskapi",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetRiskTableCount.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetRiskTableCount.fulfilled, (state, action) => {
      state.loading = false;
      state.apiRisktableCount = action.payload;
    });

    builder.addCase(GetRiskTableCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanCreate.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ScanCreate.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanCreate.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanSchduleCreate.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ScanSchduleCreate.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanSchduleCreate.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanManualCreate.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ScanManualCreate.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanManualCreate.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetScanPolicyDetailsById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetScanPolicyDetailsById.fulfilled, (state, action) => {
      state.loading = false;
      state.scanPolicyDetails = action.payload;
    });

    builder.addCase(GetScanPolicyDetailsById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateRiskApi, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type riskApiReducer = ReturnType<typeof projectSlice.reducer>;

export default projectSlice.reducer;
