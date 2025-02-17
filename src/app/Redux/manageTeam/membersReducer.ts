import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { TeamMembersInterface } from "../../Utilities/interface/manageTeam";

const GetmembersbyTeamid = createAsyncThunk(
  "memebers/GetmembersbyTeamid",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Team_/get_members_by_team_id?team_id=${value}`,
        null,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

const GetivitedMembersbyTeamid = createAsyncThunk(
  "memebers/GetivitedMembersbyTeamid",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Team_/get_the_all_invited_members_status?team_id=${value}`,
        null,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

const InviteMember = createAsyncThunk(
  "memeber/InviteMember",
  async (data: any) => {
    try {
      return await AdminServices("post", "api/Team_/invite_member", data, null);
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  },
);

const BulkInviteMember = createAsyncThunk(
  "memeber/BulkInviteMember",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Operations/operation_create?collectionId=${value.collections_id}`,
        `api/Team_/bulk_invite_member?user_id=${value.user_id}&team_id=${value.team_id}`,

        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const resetGatewayStateMembers = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;

  teamMembers: TeamMembersInterface[];
  inviteMemberList: any[];
};

const initialState: InitialStateType = {
  loading: false,

  teamMembers: [],
  inviteMemberList: [],
};

const projectSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetmembersbyTeamid.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetmembersbyTeamid.fulfilled, (state, action) => {
      state.loading = false;
      state.teamMembers = action.payload;
    });

    builder.addCase(GetmembersbyTeamid.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetivitedMembersbyTeamid.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetivitedMembersbyTeamid.fulfilled, (state, action) => {
      state.loading = false;
      state.inviteMemberList = action.payload;
    });

    builder.addCase(GetivitedMembersbyTeamid.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(InviteMember.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(InviteMember.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(InviteMember.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(BulkInviteMember.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(BulkInviteMember.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(BulkInviteMember.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateMembers, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type membersReducer = ReturnType<typeof projectSlice.reducer>;

export default projectSlice.reducer;
