import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";

export const GetVulnerablitiesSummary = createAsyncThunk(
  "apiTestDashboard/GetVulnerablitiesSummary",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiTest/get_vulnerablity_summary",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const GetVulnerabilitiesLits = createAsyncThunk(
  "apiTestDashboard/GetVulnerabilitiesLits",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiTest/get_vulnerability_list",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const GetManRunCountByWorkspaceId = createAsyncThunk(
  "apiTestingDashboard/GetManRunCountByWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/TestRunner/GetManualRunCountByWorkspaceId?workspaceId=${value?.workspaceId}&startDate=${value?.startDate}&endDate=${value?.endDate}`,
        null,
        null,
      );
    } catch (error) {
      // throw new Error(errorHandling(error));
    }
  },
);

export const GetAllManRunCountByWorkspaceId = createAsyncThunk(
  "apiTestingDashboard/GetAllManRunCountByWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/TestRunner/getAll_manualruncount_byworkSpace?workspaceId=${value?.workspaceId}&startDate=${value?.startDate}&endDate=${value?.endDate}`,
      );
    } catch (error) {
      // throw new Error(errorHandling(error));
    }
  },
);

export const resetGatewayStateApiTestingDash =
  createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  vulnerabilitySummary: any[];
  vulnerabilityList: any[];
  getManRunCount: any;
  getAllManRunCount: any;
};

const initialState: InitialStateType = {
  loading: false,
  vulnerabilitySummary: [],
  vulnerabilityList: [],
  getManRunCount: {},
  getAllManRunCount: {},
};

export const apiInvitationSlice = createSlice({
  name: "apiinvitation",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetVulnerablitiesSummary.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetVulnerablitiesSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.vulnerabilitySummary = action.payload;
    });

    builder.addCase(GetVulnerablitiesSummary.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetVulnerabilitiesLits.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetVulnerabilitiesLits.fulfilled, (state, action) => {
      state.loading = false;
      state.vulnerabilityList = action.payload;
    });

    builder.addCase(GetVulnerabilitiesLits.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetManRunCountByWorkspaceId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetManRunCountByWorkspaceId.fulfilled, (state, action) => {
      state.loading = false;
      state.getManRunCount = action.payload;
    });

    builder.addCase(GetManRunCountByWorkspaceId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllManRunCountByWorkspaceId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetAllManRunCountByWorkspaceId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.getAllManRunCount = action.payload;
      },
    );

    builder.addCase(
      GetAllManRunCountByWorkspaceId.rejected,
      (state, action) => {
        state.loading = false;
      },
    );

    builder.addCase(resetGatewayStateApiTestingDash, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type invitationReducer = ReturnType<
  typeof apiInvitationSlice.reducer
>;

export default apiInvitationSlice.reducer;
