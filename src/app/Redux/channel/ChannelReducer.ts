import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";

export const CreateChannel = createAsyncThunk(
  "channel/CreateChannel",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `Api/Post/create_channel`,
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

export const getChannels = createAsyncThunk(
  "channel/getChannels",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Post/get_channel_by_workspace_id_offset?workspace_id=${value.workspace_id}&start=${value.start}&end=${value.end}`,
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

type InitialStateType = {
  //   createLoading: boolean;
  //   violatingLoading: boolean;
  //   standardLoading: boolean;
  loading: boolean;
  channels: any;
  //   getKeys: any;
  //   collectionsLists: any;
};

const initialState: InitialStateType = {
  //   createLoading: false,
  //   violatingLoading: false,
  //   standardLoading: false,
  channels: [],
  loading: false,
  //   getKeys: [],
  //   collectionsLists: [],
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(CreateChannel.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateChannel.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateChannel.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getChannels.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
      state.loading = false;
    });

    builder.addCase(getChannels.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export type ChannelReducer = ReturnType<typeof channelSlice.reducer>;

export default channelSlice.reducer;
