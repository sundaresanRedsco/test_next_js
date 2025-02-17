// redux/permissionsSlice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import {
  ModulePermission,
  PermissionsState,
} from "../../../interface/permissionInterface";

const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (role_id: string): Promise<ModulePermission[]> => {
    try {
      return await AdminServices(
        "get",
        "api/auth/getallpermission_by_role_id?RoleId=" + role_id
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

const initialState: PermissionsState = {
  permissions: [],
  // permissionState:[],
  loading: false,
  error: null,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissionState: (state, action) => {
      // Update the state with the selected container value
      state.permissions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPermissions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPermissions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

const selectPermissions = (state: { permissions: PermissionsState }) =>
  state.permissions.permissions;
export const { setPermissionState } = permissionsSlice.actions;

export type permissionReducer = ReturnType<typeof permissionsSlice.reducer>;

export default permissionsSlice.reducer;
