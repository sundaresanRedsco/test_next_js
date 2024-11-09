import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../Services/services";

type CommonInitialStateType = {
  loading: boolean;
  importedDesigns: any;
  projectLists: any[];
  appUuid: string;
};

export const getAppsList = createAsyncThunk("apps/get", async () => {
  try {
    return await AdminServices("get", "App", null, null);
  } catch (err: any) {
    // throw new Error(errorHandling(err));
  }
});

export const importUI = createAsyncThunk("apps/importUI", async (data: any) => {
  try {
    return await AdminServices("post", "Import/GetDetails", data, null);
  } catch (err: any) {
    throw new Error(err);
  }
});

export const createApp = createAsyncThunk("apps/Create", async (data: any) => {
  try {
    return await AdminServices("post", "App/Create", data, null);
  } catch (err: any) {
    throw new Error(err);
  }
});

export const buildApk = createAsyncThunk("apps/build", async (data: any) => {
  try {
    return await AdminServices("post", "ApkJobs/Create", data, null);
  } catch (err: any) {
    throw new Error(err);
  }
});

const initialState: CommonInitialStateType = {
  loading: false,
  importedDesigns: {},
  projectLists: [],
  appUuid: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    clearImportedDesigns: (state) => {
      state.importedDesigns = {};
    },
    setAppUUid: (state, action) => {
      state.appUuid = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAppsList.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getAppsList.fulfilled, (state, action) => {
      state.loading = false;
      state.projectLists = action.payload;
    });

    builder.addCase(getAppsList.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(importUI.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(importUI.fulfilled, (state, action) => {
      state.importedDesigns = action.payload;
      state.loading = false;
    });

    builder.addCase(importUI.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(createApp.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createApp.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(createApp.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(buildApk.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(buildApk.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(buildApk.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export type AppReducer = ReturnType<typeof appSlice.reducer>;
export const { clearImportedDesigns, setAppUUid } = appSlice.actions;
export default appSlice.reducer;
