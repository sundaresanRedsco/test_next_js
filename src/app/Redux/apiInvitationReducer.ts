import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../Services/auth";
import { AdminServices } from "../Services/services";
import { errorHandling } from "../Services/errorHandling";

export const GetAllAcceptedInvitations = createAsyncThunk(
  "apiAcceptedInvitation/GetAllAcceptedInvitations",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Invitations/getall_accepted_invitations_for_project_workspace_group?workspaceId=${value?.workspace_id}&project_id=${value?.project_id}&group_id=${value?.group_id}&start=${value?.startValue}&end=${value?.endValue}`,
        null,
        null
      );
    } catch (error: any) {
      // throw new Error(errorHandling(error));
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
)

const resetGatewayStateLogin = createAction("Gateway/resetState");

type InitialStateType = {
    getAcceptedInvitationLoading: boolean;
    getAcceptedInvitationList: any[];
    tableStartValue: number;
  tableEndValue: number;
  acceptedInvitationTotalCount: number;
}

const initialState: InitialStateType = {
    getAcceptedInvitationLoading: false,
    getAcceptedInvitationList: [],
    tableStartValue: 0,
  tableEndValue: 5,
    acceptedInvitationTotalCount: 0
}

const apiInvitationSlice = createSlice({
    name: "apiinvitation",
    initialState,
    reducers: {
        updateTableStartValue(state, action) {
            state.tableStartValue = action?.payload;
        },
        updateTableEndValue(state, action) {
            state.tableEndValue = action?.payload;
        },
    },
    extraReducers(builder) { 
         builder.addCase(GetAllAcceptedInvitations.pending, (state, action) => {
      state.getAcceptedInvitationLoading = true;
    });

    builder.addCase(GetAllAcceptedInvitations.fulfilled, (state, action) => {
      state.getAcceptedInvitationLoading = false;
      state.getAcceptedInvitationList = action.payload?.invitations;
      state.acceptedInvitationTotalCount = action?.payload?.totalCount;
    });

    builder.addCase(GetAllAcceptedInvitations.rejected, (state, action) => {
      state.getAcceptedInvitationLoading = false;
    });
    }
})

export type apiInvitationReducer = ReturnType<typeof apiInvitationSlice.reducer>;

export const { updateTableStartValue, updateTableEndValue } =
  apiInvitationSlice?.actions;

export default apiInvitationSlice.reducer;
