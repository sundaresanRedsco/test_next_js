import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { TeamListInterface } from "../../Utilities/interface/manageTeam";

export const CreateNewteam = createAsyncThunk(
  "teams/CreateNewteam",
  async (data: any) => {
    try {
      return await AdminServices("post", "api/Team_/create_teams", data, null);
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const GetTeamsbyUserid = createAsyncThunk(
  "teams/GetteamsbyUserid",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Team_/get_user_teams?user_id=${value}`,
        null,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const TeamProfileUpdate = createAsyncThunk(
  "teams/TeamProfileUpdate",
  async (data: any) => {
    try {
      return await AdminServices("post", "api/Team_/update_teams", data, null);
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

export const GetTeamsByWorkspaceId = createAsyncThunk(
  "teams/GetTeamsByWorkspaceId",
  async (wsid: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Team_/get_teams_by_workspace_id?workspace_id=${wsid}`,
        null,
        null,
      );
    } catch (err) {
      throw new Error(errorHandling(err));
    }
  },
);

export const resetGatewayStateTeam = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  teamList: TeamListInterface[];
  currentTeam: any;
};

const initialState: InitialStateType = {
  loading: false,
  teamList: [],
  currentTeam: {},
};

export const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    selectCurrentTeam: (state, action) => {
      // Update the state with the selected container value
      state.currentTeam = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(CreateNewteam.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateNewteam.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetTeamsbyUserid.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetTeamsbyUserid.fulfilled, (state, action) => {
      state.loading = false;
      state.teamList = action.payload?.teams;
    });

    builder.addCase(GetTeamsbyUserid.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(TeamProfileUpdate.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(TeamProfileUpdate.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetTeamsByWorkspaceId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetTeamsByWorkspaceId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetTeamsByWorkspaceId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateTeam, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type createTeamreducer = ReturnType<typeof teamSlice.reducer>;
export const { selectCurrentTeam } = teamSlice.actions;

export default teamSlice.reducer;
