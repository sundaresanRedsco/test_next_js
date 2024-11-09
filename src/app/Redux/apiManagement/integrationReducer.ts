import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

export const CreateIntegration = createAsyncThunk(
  "integration/createIntegration",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Integrations/create_integration",
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const UpdateIntegration = createAsyncThunk(
  "integration/updateIntegration",
  async (value: any) => {
    try {
      return await AdminServices(
        "put",
        "api/Integrations/update_integration",
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetIntegrationByTenantId = createAsyncThunk(
  "integration/getIntegrationByTenantId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Integrations/get_integration_by_tenantid?tenant_id=${value}`,
        `api/Integrations/get_integration_by_tenantid`,

        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetIntegrationByTenantIdandType = createAsyncThunk(
  "integration/getIntegrationByTenantIdandType",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Integrations/getbytenant_typeoffset?tenant_id=${value.tenant_id}&type=${value.type}&start=${value.start}&end=${value.end}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetIntegrationByProjectIdandType = createAsyncThunk(
  "integration/GetIntegrationByProjectIdandType",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Integrations/getbyproject_typeoffset?project_id=${value.project_id}&type=${value.type}&start=${value.start}&end=${value.end}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const IntegrationsTest = createAsyncThunk(
  "integration/IntegrationsTest",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Integrations/intergrations_test`,
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

type InitialStateType = {
  integrationLoading: boolean;
  updateLoading: boolean;
  getIntegrationLoading: boolean;
  integrationResponse: any;
  testIntegrationLoading: boolean;
};

const initialState: InitialStateType = {
  integrationLoading: false,
  updateLoading: false,
  getIntegrationLoading: false,
  integrationResponse: [],
  testIntegrationLoading: false,
};

export const integrationSlice = createSlice({
  name: "integration",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(CreateIntegration.pending, (state, action) => {
      state.integrationLoading = true;
    });

    builder.addCase(CreateIntegration.fulfilled, (state, action) => {
      state.integrationLoading = false;
    });

    builder.addCase(CreateIntegration.rejected, (state, action) => {
      state.integrationLoading = false;
    });

    builder.addCase(UpdateIntegration.pending, (state, action) => {
      state.integrationLoading = true;
    });

    builder.addCase(UpdateIntegration.fulfilled, (state, action) => {
      state.integrationLoading = false;
    });

    builder.addCase(UpdateIntegration.rejected, (state, action) => {
      state.integrationLoading = false;
    });

    builder.addCase(GetIntegrationByTenantId.pending, (state, action) => {
      state.integrationLoading = true;
    });

    builder.addCase(GetIntegrationByTenantId.fulfilled, (state, action) => {
      state.integrationLoading = false;
      state.integrationResponse = action.payload;
    });

    builder.addCase(GetIntegrationByTenantId.rejected, (state, action) => {
      state.integrationLoading = false;
    });

    builder.addCase(
      GetIntegrationByTenantIdandType.pending,
      (state, action) => {
        state.integrationLoading = true;
      }
    );

    builder.addCase(
      GetIntegrationByTenantIdandType.fulfilled,
      (state, action) => {
        state.integrationLoading = false;
      }
    );

    builder.addCase(
      GetIntegrationByTenantIdandType.rejected,
      (state, action) => {
        state.integrationLoading = false;
      }
    );

    builder.addCase(
      GetIntegrationByProjectIdandType.pending,
      (state, action) => {
        state.integrationLoading = true;
      }
    );

    builder.addCase(
      GetIntegrationByProjectIdandType.fulfilled,
      (state, action) => {
        state.integrationLoading = false;
      }
    );

    builder.addCase(
      GetIntegrationByProjectIdandType.rejected,
      (state, action) => {
        state.integrationLoading = false;
      }
    );

    builder.addCase(IntegrationsTest.pending, (state, action) => {
      state.testIntegrationLoading = true;
    });

    builder.addCase(IntegrationsTest.fulfilled, (state, action) => {
      state.testIntegrationLoading = false;
    });

    builder.addCase(IntegrationsTest.rejected, (state, action) => {
      state.testIntegrationLoading = false;
    });
  },
});

export type integrationReducer = ReturnType<typeof integrationSlice.reducer>;

export default integrationSlice.reducer;
