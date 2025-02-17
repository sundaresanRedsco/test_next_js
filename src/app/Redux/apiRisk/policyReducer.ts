import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

const GetAllPolicyDetails = createAsyncThunk(
  "policy/getAllPolicyDetails",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Policy/getall_policydetails",
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const CreatePolicyGroup = createAsyncThunk(
  "policy/createPolicyGroup",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Policy/policy_create",
        data,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const GetAllPolicyGroup = createAsyncThunk(
  "policy/getAllPolicyGroup",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/Policy/getall_Userpolicydetails",
        null,
        null,
      );
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        //   // Handle 401 Unauthorized error here

        //   // For example, you can dispatch an action to update state indicating unauthorized access
        //   // dispatch(unauthorizedAction())
        //   // You can also reject the thunk with an error using rejectWithValue
        throw new Error("UNAUTHORIZED");
      }

      throw new Error(errorHandling(err));
    }
  },
);

const GetAllPolicyGroupbyWorkspaceId = createAsyncThunk(
  "policy/getAllPolicyGroupbyWorkspaceId",
  async (workspace_id: string) => {
    try {
      return await AdminServices(
        "get",
        "api/Policy/userpolicy_by_workspaceId?workspace_id=" + workspace_id,
        null,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const GetpolicybyUserpolicyid = createAsyncThunk(
  "policy/GetpolicybyUserpolicyid",
  async (value: any) => {
    try {
      return await AdminServices("get", `api/Scan/scans/${value}`, null, null);
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

const ShowPolicygroupByWorkspaceid = createAsyncThunk(
  "policy/ShowPolicygroupByWorkspaceid",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Policy/userpolicy_by_workspaceId?workspace_id=${value}`,
        null,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

const UpdateScanPolicy = createAsyncThunk(
  "policy/UpdateScanPolicy",
  async (data: any) => {
    try {
      return await AdminServices(
        "put",
        "api/Policy/Update_policyGroup?user_policy_id=" + data?.user_policy_id,
        data,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const DeleteUserpolicy = createAsyncThunk(
  "userpolicy/DeleteUserpolicy",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Policy/Deleteby_userPolicyId?userPolicyId=${value.user_policy_id}`,
        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

// export const GetPolicyOffset = createAsyncThunk(
//   "policy/GetPolicyOffset",
//   async (value: any) => {
//     try {
//       return await AdminServices("get", `api/Policy/policy_offset?workspace_id=${value?.workspace_id}&offset=${value?.offset}&limit=${value?.limit}&searchKeyword=${value?.searchKeyword}&sortBy=${value?.user_policy_name}&sortOrder=${value?.sortOrder}`, null, null);
//     } catch (error) {
//       throw new Error(errorHandling(error));
//     }
//   }
// );

const GetPolicyOffset = createAsyncThunk(
  "policy/GetPolicyOffset",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Policy/Policy_offset",
        data,
        null,
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStatePolicy = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  loadingValue: boolean;
  deleteLoading: boolean;
  policyLists: any[];
  policyGroups: any[];
  userSelectedPolicyLists: any[];
  policyWorklists: any;
  policyOffset: any[];
};

const initialState: InitialStateType = {
  loading: false,
  loadingValue: false,
  deleteLoading: false,
  policyLists: [],
  policyGroups: [],
  userSelectedPolicyLists: [],
  policyWorklists: [],
  policyOffset: [],
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetAllPolicyDetails.pending, (state, action) => {
      // state.loading = true;
      state.loadingValue = true;
    });

    builder.addCase(GetAllPolicyDetails.fulfilled, (state, action) => {
      // state.loading = false;
      state.loadingValue = false;
      state.policyLists = action.payload;
    });

    builder.addCase(GetAllPolicyDetails.rejected, (state, action) => {
      // state.loading = false;
      state.loadingValue = false;
    });

    // builder.addCase(GetAllPolicyGroupbyWorkspaceId.pending, (state, action) => {
    //   state.loading = true;
    // });

    // builder.addCase(GetAllPolicyGroupbyWorkspaceId.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.policyLists = action.payload;
    // });

    // builder.addCase(GetAllPolicyGroupbyWorkspaceId.rejected, (state, action) => {
    //   state.loading = false;
    // });

    builder.addCase(CreatePolicyGroup.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreatePolicyGroup.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllPolicyGroup.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetAllPolicyGroup.fulfilled, (state, action) => {
      state.loading = false;
      state.policyGroups = action.payload;
    });

    builder.addCase(GetAllPolicyGroup.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetpolicybyUserpolicyid.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetpolicybyUserpolicyid.fulfilled, (state, action) => {
      state.loading = false;
      state.userSelectedPolicyLists = action.payload;
    });

    builder.addCase(GetpolicybyUserpolicyid.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateScanPolicy.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateScanPolicy.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateScanPolicy.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteUserpolicy.pending, (state, action) => {
      // state.loading = true;
      state.deleteLoading = true;
    });

    builder.addCase(DeleteUserpolicy.fulfilled, (state, action) => {
      state.deleteLoading = false;
      // state.loading = false;
    });

    builder.addCase(DeleteUserpolicy.rejected, (state, action) => {
      // state.loading = false;
      state.deleteLoading = false;
    });

    builder.addCase(ShowPolicygroupByWorkspaceid.pending, (state, action) => {
      // state.loading = true;
      state.loadingValue = true;
    });

    builder.addCase(ShowPolicygroupByWorkspaceid.fulfilled, (state, action) => {
      // state.loading = false;
      state.loadingValue = false;
      state.policyWorklists = action.payload;
    });

    builder.addCase(ShowPolicygroupByWorkspaceid.rejected, (state, action) => {
      state.loadingValue = false;
      // state.loading = false;
    });

    builder.addCase(GetPolicyOffset.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetPolicyOffset.fulfilled, (state, action) => {
      state.loading = false;
      state.policyOffset = action.payload;
    });

    builder.addCase(GetPolicyOffset.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStatePolicy, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type policyReducer = ReturnType<typeof policySlice.reducer>;

export default policySlice.reducer;
