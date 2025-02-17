import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

const AddViolatingKeys = createAsyncThunk(
  "compilance/AddViolatingKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Standards/create_voilationkey?tenant_id=${value?.tenant_id}&standard_id=${value?.standard_id}`,
        `api/Standards/create_voilationkey?standard_id=${value?.standard_id}`,

        value.data,
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

const GetStandards = createAsyncThunk(
  "compilance/GetStandards",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Standards/get_all_Standardskey",
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

const GetViolatingKeysByStandards = createAsyncThunk(
  "compilance/GetViolatingKeysByStandards",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Standards/getvoilationkey_by_tenantid_and_standard_id?Standard_key_id=${value?.Standard_key_id}&tenant_id=${value?.tenant_id}`,
        `api/Standards/getvoilationkey_by_tenantid_and_standard_id?Standard_key_id=${value?.Standard_key_id}`,

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

const UpdateViolatingKeys = createAsyncThunk(
  "compilance/UpdateViolatingKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "put",
        // `api/Standards/update_voilationkey_byid?teant_id=${value?.tenant_id}&standardkey_id=${value?.standard_id}`,
        `api/Standards/update_voilationkey_byid?standardkey_id=${value?.standard_id}`,

        value.data,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

const DeleteViolatingKeys = createAsyncThunk(
  "compilance/DeleteViolatingKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "delete",
        `api/Standards/delete_voilationkey_by_id?voilation_key=${value.voilation_key}`,
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

const BulkDeleteViolatingKeys = createAsyncThunk(
  "compilance/BulkDeleteViolatingKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "delete",
        "api/Standards/VoilationKey_BulkDelete",
        value,
        null

        // "api/Policy/policy_create",
        // data,
        // null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

const BulkUpdateViolatingKeys = createAsyncThunk(
  "compilance/BulkUpdateViolatingKeys",
  async (value: any) => {
    try {
      return await AdminServices(
        "put",
        // `api/Standards/Voilationkey_bulk_update?tenant_id=${value?.tenant_id}&standardkey_id=${value?.standard_id}`,
        `api/Standards/Voilationkey_bulk_update?standardkey_id=${value?.standard_id}`,

        value.data,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

type InitialStateType = {
  createLoading: boolean;
  violatingLoading: boolean;
  standardLoading: boolean;
  loading: boolean;
  getKeys: any;
  collectionsLists: any;
};

const initialState: InitialStateType = {
  createLoading: false,
  violatingLoading: false,
  standardLoading: false,

  loading: false,
  getKeys: [],
  collectionsLists: [],
};

const compilanceSlice = createSlice({
  name: "compilance",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AddViolatingKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(AddViolatingKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(AddViolatingKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetViolatingKeysByStandards.pending, (state, action) => {
      state.violatingLoading = true;
    });

    builder.addCase(GetViolatingKeysByStandards.fulfilled, (state, action) => {
      state.violatingLoading = false;
      state.getKeys = action.payload;
    });

    builder.addCase(GetViolatingKeysByStandards.rejected, (state, action) => {
      state.violatingLoading = false;
    });

    builder.addCase(UpdateViolatingKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateViolatingKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateViolatingKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteViolatingKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DeleteViolatingKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteViolatingKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(BulkDeleteViolatingKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(BulkDeleteViolatingKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(BulkDeleteViolatingKeys.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetStandards.pending, (state, action) => {
      state.standardLoading = true;
    });

    builder.addCase(GetStandards.fulfilled, (state, action) => {
      state.standardLoading = false;
      state.collectionsLists = action.payload;
    });

    builder.addCase(GetStandards.rejected, (state, action) => {
      state.standardLoading = false;
    });

    builder.addCase(BulkUpdateViolatingKeys.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(BulkUpdateViolatingKeys.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(BulkUpdateViolatingKeys.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

type SecurityCompilanceReducer = ReturnType<
  typeof compilanceSlice.reducer
>;

export default compilanceSlice.reducer;
