import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import {
  GetTeamPermissionsInterface,
  TeamRoleInterface,
} from "../../Utilities/interface/manageTeam";

const GetTeamRoles = createAsyncThunk(
  "permissions/getTeamRoles",
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

const Getpermissions = createAsyncThunk(
  "permissions/Getpermissions",
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

export const resetGatewayStateRolesPermisssion =
  createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  teamRoles: TeamRoleInterface[];
  getRoles: GetTeamPermissionsInterface[];
};

const initialState: InitialStateType = {
  loading: false,
  teamRoles: [],
  getRoles: [],
};

const prrmissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetTeamRoles.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetTeamRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.teamRoles = action.payload;
    });

    builder.addCase(GetTeamRoles.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(Getpermissions.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(Getpermissions.fulfilled, (state, action) => {
      state.loading = false;
      state.getRoles = action.payload;
    });

    builder.addCase(Getpermissions.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateRolesPermisssion, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type rolesandPermissionsReducer = ReturnType<
  typeof prrmissionSlice.reducer
>;

export default prrmissionSlice.reducer;
