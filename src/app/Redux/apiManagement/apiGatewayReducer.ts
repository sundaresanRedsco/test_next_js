import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { apiMangeDahboardCountInterface } from "../../Utilities/interface/projectInterface";
// import { logout } from "../loginReducer";
import { createAction } from "@reduxjs/toolkit";

export const ImportApiGateway = createAsyncThunk(
  "gateway/ImportApiGateway",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/ImportFromApiGateWay/import_from_api_gateway",
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

export const GetAllImportConfigurationWorkspaceId = createAsyncThunk(
  "gateway/GetAllImportConfigurationWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/ImportFromApiGateWay/get_all_import_configuration_workspace_id?workspace_id=${value}`,
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

export const ImportFromSwagerGateway = createAsyncThunk(
  "gateway/ImportFromSwagerGateway",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Import_/import_from_swagger",
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

export const GetApiGatewaySdkKeys = createAsyncThunk(
  "apiGateway/GetApiGatewaySdkKeys",
  async (workpaceId: any) => {
    try {
      return await AdminServices(
        "get",
        "api/ImportFromApiGateWay/getall_Awsimportdata_by_Workspaceid?workspaceid=" +
          workpaceId,
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

export const GetAuthkeyById = createAsyncThunk(
  "apiGateway/GetAuthkeyById",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Logstash/regenerat_authedicationkey?id=${value}`,
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

export const UpdateApiGateway = createAsyncThunk(
  "Gateway/UpdateApiGateway",
  async (data: any) => {
    try {
      return await AdminServices(
        "put",
        "api/ImportFromApiGateWay/update_awsimport",
        data,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const ImportLogstash = createAsyncThunk(
  "project/ImportLogstash",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Logstash/createLogstash",
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

export const GetLogstashData = createAsyncThunk(
  "apiGateway/GetLogstashData",
  async (workpaceId: any) => {
    try {
      return await AdminServices(
        "get",
        "api/Logstash/getloginstanceid_by_workspaceid?workspaceId=" +
          workpaceId,
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

export const GetIpDomainNames = createAsyncThunk(
  "apiGateway/GetIpDomainNames",
  async (instance_id: any) => {
    try {
      return await AdminServices(
        "get",
        "api/Logstash/getallLogstashserverinfoBy_instanceid?instance_id=" +
          instance_id,
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

export const UpdateDomainName = createAsyncThunk(
  "Gateway/UpdateDomainName",
  async (data: any) => {
    try {
      return await AdminServices(
        "put",
        "api/Logstash/updateDomainNameByid",
        data,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const resetGatewayStateApiGateway = createAction("Gateway/resetState");

// export const logout = createAction("auth/logout");

// export const CLEAR_API_GATEWAY_KEYS = 'CLEAR_API_GATEWAY_KEYS';

// // Action creator for clearing the apiGatewayKeys state
// export const clearApiGatewayKeys = () => ({
//   type: CLEAR_API_GATEWAY_KEYS,
// });

export const GetLogskeyBySdkId = createAsyncThunk(
  "apiGateway/GetLogskeyBySdkId",
  async (instance_id: any) => {
    try {
      return await AdminServices(
        "get",
        "api/ImportFromApiGateWay/getall_logskey_bysdkid?sdk_id=" + instance_id,
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

export const CreateLogsKeys = createAsyncThunk(
  "apiGateway/CreateLogsKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/ImportFromApiGateWay/create_apigateway_logskey?name=${value?.name}&sdk_id=${value?.sdk_id}&tenant_id=${value?.tenant_id}`,
        `api/ImportFromApiGateWay/create_apigateway_logskey?name=${value?.name}&sdk_id=${value?.sdk_id}`,

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

export const RegenerateLogsKey = createAsyncThunk(
  "apiGateway/RegenerateLogsKey",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/ImportFromApiGateWay/update_regentaratAuthkey_or_deactivelogskeybyid",
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

export const EnableDisableLogs = createAsyncThunk(
  "apiGateway/EnableDisableLogs",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/ImportFromApiGateWay/update_logenable_byid",
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

export const GetApiGatewayByProjectId = createAsyncThunk(
  "apiGateway/GetApiGatewayByProjectId",
  async (projectId: any) => {
    try {
      return await AdminServices(
        "get",
        "api/ImportFromApiGateWay/get_all_import_configuration_project_id?project_id=" +
          projectId,
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

type InitialStateType = {
  loading: boolean;
  loadingValue: boolean;
  apiGatewayKeys: any;
  apiGatewayProject: any;

  instanceId: any;
  ipDetails: any;
  logsKey: any;
  getAllImportConfigWsIdLoading: boolean;
};

const initialState: InitialStateType = {
  loading: false,
  loadingValue: false,
  apiGatewayKeys: [],
  apiGatewayProject: [],

  instanceId: {},
  ipDetails: [],
  logsKey: [],
  getAllImportConfigWsIdLoading: false,

  // apiGatewayKeys: null || [],
};

export const gatewaySlice = createSlice({
  name: "gateway",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(ImportApiGateway.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ImportApiGateway.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportApiGateway.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportFromSwagerGateway.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ImportFromSwagerGateway.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportFromSwagerGateway.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetApiGatewaySdkKeys.pending, (state, action) => {
      // state.loading = true;
      state.loadingValue = true;
    });

    builder.addCase(GetApiGatewaySdkKeys.fulfilled, (state, action) => {
      state.apiGatewayKeys = action.payload;
      // state.loading = false;
      state.loadingValue = false;
    });

    builder.addCase(GetApiGatewaySdkKeys.rejected, (state, action) => {
      // state.loading = false;
      state.loadingValue = false;
    });

    builder.addCase(GetApiGatewayByProjectId.pending, (state, action) => {
      // state.loading = true;
      state.loading = true;
    });

    builder.addCase(GetApiGatewayByProjectId.fulfilled, (state, action) => {
      state.apiGatewayProject = action.payload;
      // state.loading = false;
      state.loading = false;
    });

    builder.addCase(GetApiGatewayByProjectId.rejected, (state, action) => {
      // state.loading = false;
      state.loading = false;
    });

    // builder.addCase(logout, (state, action) => {
    //   state.apiGatewayKeys = null; // Clear the API data
    // });

    builder.addCase(UpdateApiGateway.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateApiGateway.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiGateway.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportLogstash.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ImportLogstash.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportLogstash.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetLogstashData.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetLogstashData.fulfilled, (state, action) => {
      state.instanceId = action.payload;
      state.loading = false;
    });

    builder.addCase(GetLogstashData.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAuthkeyById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetAuthkeyById.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAuthkeyById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetIpDomainNames.pending, (state, action) => {
      // state.loading = true;
      state.loadingValue = true;
    });

    builder.addCase(GetIpDomainNames.fulfilled, (state, action) => {
      state.ipDetails = action.payload;
      // state.loading = false;
      state.loadingValue = false;
    });

    builder.addCase(GetIpDomainNames.rejected, (state, action) => {
      // state.loading = false;
      state.loadingValue = false;
    });

    builder.addCase(UpdateDomainName.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateDomainName.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateDomainName.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateApiGateway, (state, action) => {
      return initialState; // Reset state to initial values
    });

    builder.addCase(GetLogskeyBySdkId.pending, (state, action) => {
      // state.loading = true;
      state.loadingValue = true;
    });

    builder.addCase(GetLogskeyBySdkId.fulfilled, (state, action) => {
      state.logsKey = action.payload;
      // state.loading = false;
      state.loadingValue = false;
    });

    builder.addCase(GetLogskeyBySdkId.rejected, (state, action) => {
      // state.loading = false;
      state.loadingValue = false;
    });

    builder.addCase(CreateLogsKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateLogsKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateLogsKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(RegenerateLogsKey.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(RegenerateLogsKey.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(RegenerateLogsKey.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(EnableDisableLogs.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(EnableDisableLogs.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(EnableDisableLogs.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetAllImportConfigurationWorkspaceId.pending,
      (state, action) => {
        state.getAllImportConfigWsIdLoading = true;
      }
    );

    builder.addCase(
      GetAllImportConfigurationWorkspaceId.fulfilled,
      (state, action) => {
        state.getAllImportConfigWsIdLoading = false;
      }
    );

    builder.addCase(
      GetAllImportConfigurationWorkspaceId.rejected,
      (state, action) => {
        state.getAllImportConfigWsIdLoading = false;
      }
    );
  },
});
export type apiGatewayReducer = ReturnType<typeof gatewaySlice.reducer>;

export default gatewaySlice.reducer;
