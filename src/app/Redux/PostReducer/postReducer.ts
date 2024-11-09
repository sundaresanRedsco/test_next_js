import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

export const GetChanelByWorkspaceId = createAsyncThunk(
  "posts/GetWorkspacesByUserId",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Post/get_channel_by_workspace_id_offset?workspace_id=${data?.workspace_id}&start=${data?.start}&end=${data?.end}`,
        null,
        null,
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  },
);

export const GetChanelById = createAsyncThunk(
  "posts/GetChanelById",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Post/get_channel_by_id?channel_id=${value}`,
        null,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

type InitialStateType = {
  workSpaceLoading: boolean;
  getWorspaceOffset: any;
  getChannel: any;
};

const initialState: InitialStateType = {
  workSpaceLoading: false,
  getWorspaceOffset: [],
  getChannel: [],
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetChanelByWorkspaceId.pending, (state, action) => {
      state.workSpaceLoading = true;
    });

    builder.addCase(GetChanelByWorkspaceId.fulfilled, (state, action) => {
      state.workSpaceLoading = false;
      // state.getWorspaceOffset = action.payload;
    });

    builder.addCase(GetChanelByWorkspaceId.rejected, (state, action) => {
      state.workSpaceLoading = false;
    });

    builder.addCase(GetChanelById.pending, (state, action) => {
      state.workSpaceLoading = true;
    });

    builder.addCase(GetChanelById.fulfilled, (state, action) => {
      state.workSpaceLoading = false;
      state.getChannel = action.payload;
    });

    builder.addCase(GetChanelById.rejected, (state, action) => {
      state.workSpaceLoading = false;
    });
  },
});

export type postReducer = ReturnType<typeof postSlice.reducer>;

export default postSlice.reducer;
