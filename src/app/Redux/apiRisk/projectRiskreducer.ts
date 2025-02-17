import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

const GetRiskdashboardCount = createAsyncThunk(
  "riskdashboardcount/getriskdashboardcount",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/getall_summaries",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const GetDashboardtable = createAsyncThunk(
  "apiEndpoint/GetEndpointSummaryList",
  async () => {
    try {
      return await AdminServices("get", "api/Risk/get_topriskyapi", null, null);
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const ScanedDatabyWorkspaceid = createAsyncThunk(
  "scannedendpints/ScanedDatabyWorkspaceid",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Scan/get_api_scan_test_details?workspace_id=${value}`,
        null,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

const CreateScanTest = createAsyncThunk(
  "scan/CreateScanTest",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Operations/operation_create?collectionId=${value.collections_id}`,
        `api/Scan/create_api_scan_test?scan_id=${value.scan_id}&user_id=${value.user_id}`,
        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const resetGatewayStateProjectRisk = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  // apiEndpointDashboardCount: any[];
  apiRiskdashboardCount: any[];
  riskDashboardTable: any[];
  scannedEndpoints: any;
};

const initialState: InitialStateType = {
  loading: false,
  // apiEndpointDashboardCount: [],
  apiRiskdashboardCount: [],
  riskDashboardTable: [],
  scannedEndpoints: [],
};

const projectSlice = createSlice({
  name: "apirisk",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetRiskdashboardCount.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetRiskdashboardCount.fulfilled, (state, action) => {
      state.loading = false;
      state.apiRiskdashboardCount = action.payload;
    });

    builder.addCase(GetRiskdashboardCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetDashboardtable.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetDashboardtable.fulfilled, (state, action) => {
      state.loading = false;
      state.riskDashboardTable = action.payload;
    });

    builder.addCase(GetDashboardtable.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScanedDatabyWorkspaceid.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ScanedDatabyWorkspaceid.fulfilled, (state, action) => {
      state.loading = false;
      state.scannedEndpoints = action.payload;
    });

    builder.addCase(ScanedDatabyWorkspaceid.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateScanTest.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateScanTest.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateScanTest.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateProjectRisk, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type projectRiskreducer = ReturnType<typeof projectSlice.reducer>;

export default projectSlice.reducer;
