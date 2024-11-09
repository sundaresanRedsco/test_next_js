import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

export const GetAllSensitiveDataCount = createAsyncThunk(
  "sensibleMetrics/getAllSensitiveDataCount",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Operations/get_all_sensitivedata_counts?workspace_id=${value}`,
        `Api/Api_operation_sensitivity/get_all_sensitivedata_counts?workspace_id=${value}`,
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const GetAllSensitiveDataKeyCounts = createAsyncThunk(
  "sensibleMetrics/getAllSensitiveDataKeyCounts",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Operations/get_all_sensitivedata_key_counts?workspace_id=${value}`,
        `Api/Api_operation_sensitivity/get_all_sensitivedata_key_counts?workspace_id=${value}`,
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const GetAllSensitiveDateKeyInOperations = createAsyncThunk(
  "sensibleMetrics/getAllSensitiveDateKeyInOperations",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Operations/get_all_sensitivedata_key_in_operations?workspace_id=${value?.wsid}&key_id=${value?.keyid}`,
        `Api/Api_operation_sensitivity/get_all_sensitivedata_key_in_operations?workspace_id=${values?.workspace_id}&key_id=${values?.key_id}&searchfield=${values?.searchfield}&search_value=${values?.search_value}&sortAscending=${values?.sortAscending}&pageNo=${values?.pageNo}&countPerPage=${values?.countPerPage}`,
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewaySensibleMetrics = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
};

const initialState: InitialStateType = {
  loading: false,
};

export const sensibleMetricSlice = createSlice({
  name: "sensibleMetric",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetAllSensitiveDataCount.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetAllSensitiveDataCount.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllSensitiveDataCount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllSensitiveDataKeyCounts.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetAllSensitiveDataKeyCounts.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllSensitiveDataKeyCounts.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetAllSensitiveDateKeyInOperations.pending,
      (state, action) => {
        state.loading = true;
      },
    );

    builder.addCase(
      GetAllSensitiveDateKeyInOperations.fulfilled,
      (state, action) => {
        state.loading = false;
      },
    );

    builder.addCase(
      GetAllSensitiveDateKeyInOperations.rejected,
      (state, action) => {
        state.loading = false;
      },
    );

    builder.addCase(resetGatewaySensibleMetrics, (state, action) => {
      return initialState;
    });
  },
});

export type sensibleMetricsReducer = ReturnType<
  typeof sensibleMetricSlice.reducer
>;

export default sensibleMetricSlice.reducer;
