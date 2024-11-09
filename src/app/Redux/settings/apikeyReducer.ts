import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

export const GetApiSettings = createAsyncThunk(
  "apikeys/getApiSettings",
  async (workspace_id: any) => {
    try {
      return await AdminServices(
        "get",
        "Api/Api_settings_/get_api_settings_key?workspace_id=" + workspace_id,
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const GetApiKeys = createAsyncThunk(
  "apikeys/getApiKeys",
  async (workspace_id: any) => {
    try {
      return await AdminServices(
        "get",
        "Api/Api_settings_/get_api_key?workspace_id=" + workspace_id,
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const CreatAPiKeys = createAsyncThunk(
  "apikeys/createApiKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_settings_/create_api_key",
        value,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);
export const Updateapikeys = createAsyncThunk(
  "apikeys/Updateapikeys",
  async () => {
    try {
      return await AdminServices(
        "get",
        "Api/Api_roles_contoller/get_roles",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const DeleteapiKeys = createAsyncThunk(
  "apikeys/DeleteapiKeys",
  async () => {
    try {
      return await AdminServices(
        "get",
        "Api/Api_roles_contoller/get_roles_permissions",
        null,
        null,
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const UpdateApiKeySettings = createAsyncThunk(
  "apiKeys/updateApiKeySettings",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_settings_/update_api_key_settings",
        value,
        null,
      );
    } catch (error) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const RegenerateApiKey = createAsyncThunk(
  "apiKeys/regenerateApiKey",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_settings_/regenerate_api_key",
        value,
        null,
      );
    } catch (error) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const UpdateApiKey = createAsyncThunk(
  "apiKeys/updateApiKey",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_settings_/update_api_key",
        value,
        null,
      );
    } catch (error) {
      // throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateApiKey = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  apikeySetting: any[];
  apiKeyLists: any[];
};

const initialState: InitialStateType = {
  loading: false,
  apikeySetting: [],
  apiKeyLists: [],
};

export const prrmissionSlice = createSlice({
  name: "apikey",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetApiSettings.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetApiSettings.fulfilled, (state, action) => {
      state.loading = false;
      state.apikeySetting = action.payload;
    });

    builder.addCase(GetApiSettings.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(GetApiKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetApiKeys.fulfilled, (state, action) => {
      state.loading = false;
      state.apiKeyLists = action.payload;
    });

    builder.addCase(GetApiKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreatAPiKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreatAPiKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreatAPiKeys.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(Updateapikeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(Updateapikeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(Updateapikeys.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DeleteapiKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DeleteapiKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteapiKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiKeySettings.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateApiKeySettings.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiKeySettings.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(RegenerateApiKey.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(RegenerateApiKey.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(RegenerateApiKey.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiKey.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateApiKey.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiKey.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateApiKey, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type apikeyReducer = ReturnType<typeof prrmissionSlice.reducer>;

export default prrmissionSlice.reducer;
