import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";

const GetSenstiveDatacount = createAsyncThunk(
  "senstivedata/getsenstivedatacount",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/getall_sensitivedata_summaries",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const GetsenstivedataTypes = createAsyncThunk(
  "senstivedatatypes/getsenstivedatatypes",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/get_topObserved_dataSets",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const GetobservedSensitivity = createAsyncThunk(
  "observedsenstivity/getobservedsensitivity",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/get_chartbarData",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const GetsenstivedataTable = createAsyncThunk(
  "senstiveratatable/getsenstivedatatable",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/getAll_sensitivewithproperties",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const GetsenstiveDatatablePopup = createAsyncThunk(
  "senstivedatatablepopup/getsenstivedatatablepopup",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/get_PropertiesWithServices",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

const GetsenstiveDataNestedPopup = createAsyncThunk(
  "senstivedatanestedpopup/getsenstivedatanestedpopup",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Risk/get_apiDetails_byoperations",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateSensitiveData =
  createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  SummaryDataCount: any[];
  senstivedatatypesgraph: any[];
  observedsenstivitygraph: any[];
  senstivedatatablecount: any[];
  senstivetablepopupcount: any[];
  nestedtablepopupcount: any[];
};

const initialState: InitialStateType = {
  loading: false,
  SummaryDataCount: [],
  senstivedatatypesgraph: [],
  observedsenstivitygraph: [],
  senstivedatatablecount: [],
  senstivetablepopupcount: [],
  nestedtablepopupcount: [],
};

const senstiveDataSlice = createSlice({
  name: "senstivedata",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetSenstiveDatacount.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetSenstiveDatacount.fulfilled, (state, action) => {
      state.loading = false;
      state.SummaryDataCount = action.payload;
    });

    builder.addCase(GetSenstiveDatacount.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetsenstivedataTypes.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetsenstivedataTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.senstivedatatypesgraph = action.payload;
    });

    builder.addCase(GetsenstivedataTypes.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetobservedSensitivity.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetobservedSensitivity.fulfilled, (state, action) => {
      state.loading = false;
      state.observedsenstivitygraph = action.payload;
    });

    builder.addCase(GetobservedSensitivity.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetsenstivedataTable.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetsenstivedataTable.fulfilled, (state, action) => {
      state.loading = false;
      state.senstivedatatablecount = action.payload;
    });

    builder.addCase(GetsenstivedataTable.rejected, (state, action) => {
      state.loading = false;
    });

    //popup builder

    builder.addCase(GetsenstiveDatatablePopup.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetsenstiveDatatablePopup.fulfilled, (state, action) => {
      state.loading = false;
      state.senstivetablepopupcount = action.payload;
    });

    builder.addCase(GetsenstiveDatatablePopup.rejected, (state, action) => {
      state.loading = false;
    });

    //nested popup

    builder.addCase(GetsenstiveDataNestedPopup.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetsenstiveDataNestedPopup.fulfilled, (state, action) => {
      state.loading = false;
      state.nestedtablepopupcount = action.payload;
    });

    builder.addCase(GetsenstiveDataNestedPopup.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateSensitiveData, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type senstiveDataReducer = ReturnType<typeof senstiveDataSlice.reducer>;

export default senstiveDataSlice.reducer;
