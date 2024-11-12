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

type InitialStateType = {
  //   createLoading: boolean;
  //   violatingLoading: boolean;
  //   standardLoading: boolean;
  loading: boolean;
  //   getKeys: any;
  //   collectionsLists: any;
};

const initialState: InitialStateType = {
  //   createLoading: false,
  //   violatingLoading: false,
  //   standardLoading: false,

  loading: false,
  //   getKeys: [],
  //   collectionsLists: [],
};

export const channelSlice = createSlice({
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
  },
});

export type ChannelReducer = ReturnType<typeof channelSlice.reducer>;

export default channelSlice.reducer;
