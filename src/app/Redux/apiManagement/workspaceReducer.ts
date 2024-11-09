import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { workspaceInterface } from "../../../interface/workspaceInterface";
import { X } from "@mui/icons-material";

export const CreateWorkspace = createAsyncThunk(
  "workspace/CreateWorkspace",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Workspace_/workspace_create",
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

export const GetWorkspacesByUserId = createAsyncThunk(
  "workspace/GetWorkspacesByUserId",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        // `Api/Workspace_/get_workspaces_by_userid?user_id=${data?.user_id}&offset=${data?.offset}&limit=${data?.limit}`,
        `Api/Workspace_/get_workspaces_by_userid?offset=${data?.offset}&limit=${data?.limit}`,

        null,
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

export const GetWorkspacesById = createAsyncThunk(
  "workspace/GetWorkspacesById",
  async (workspace_id: string) => {
    try {
      return await AdminServices(
        "get",
        // `Api/Workspace_/get_workspaces_by_id?workspace_id=` + workspace_id,
        `Api/Workspace_/get_workspaces_by_id?workspaceId=` + workspace_id,
        null,
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

export const UpdateWorkspace = createAsyncThunk(
  "workspace/UpdateWorkspace",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        `Api/Workspace_/update_workspace?workspace_id=${data?.workspace_id}`,
        data?.details,
        null,
      )
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
)

export const resetWorkspaceState = createAction("workspace/resetState");

type InitialStateType = {
  loading: boolean;
  workspaceList: workspaceInterface[];
  getWsidLoading: boolean;
  currentWorkspace: workspaceInterface | null;
  workSpaceResponce: any;
  updateWorkspaceLoading: boolean;
};

const initialState: InitialStateType = {
  loading: false,
  workspaceList: [],
  workSpaceResponce: {},
  getWsidLoading: false,
  currentWorkspace: null,
  updateWorkspaceLoading: false,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentWorkspace(state, action) {
      state.currentWorkspace = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(resetWorkspaceState, (state, action) => {
      return initialState; // Reset state to initial values
    });

    builder.addCase(CreateWorkspace.pending, (state, action) => {
      state.loading = true;

      // Set currentWorkspace to the created workspace
    });

    builder.addCase(CreateWorkspace.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.id) {
        state.currentWorkspace = action.payload;

        // Check if the workspace with the same id is already in the workspaceList
        const workspaceExists = state.workspaceList.some(
          (workspace) => workspace.id === action.payload.id
        );

        // If the workspace does not exist in the list, add it
        if (!workspaceExists) {
          state.workspaceList.push(action.payload);
        }
      }
    });

    builder.addCase(CreateWorkspace.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetWorkspacesById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetWorkspacesById.fulfilled, (state, action) => {
      state.loading = false;
      // Set currentWorkspace to the created workspace
      if (action.payload && action.payload.id) {
        state.currentWorkspace = action.payload;

        // Check if the workspace with the same id is already in the workspaceList
        const workspaceExists = state.workspaceList.some(
          (workspace) => workspace.id === action.payload?.id
        );

        // If the workspace does not exist in the list, add it
        if (!workspaceExists) {
          state.workspaceList.push(action.payload);
        }
      }
    });

    builder.addCase(GetWorkspacesById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetWorkspacesByUserId.pending, (state, action) => {
      state.getWsidLoading = true;
    });

    builder.addCase(GetWorkspacesByUserId.fulfilled, (state, action) => {
      state.getWsidLoading = false;
      const newWorkspaceList = action.payload;

      // Create a set of IDs from the new workspace list for quick lookup
      const newWorkspaceIds = new Set(newWorkspaceList.map((nw: any) => nw.id));

      // Filter out workspaces from the old list that are not in the new list
      const filteredOldWorkspaces = state.workspaceList.filter(
        (workspace) => !newWorkspaceIds.has(workspace.id)
      );

      // Update the workspace list with the filtered old workspaces and the new workspaces
      state.workspaceList = [...filteredOldWorkspaces, ...newWorkspaceList];
    });

    builder.addCase(GetWorkspacesByUserId.rejected, (state, action) => {
      state.getWsidLoading = false;
    });

    builder.addCase(UpdateWorkspace.pending, (state, action) => {
      state.updateWorkspaceLoading = true;

      // Set currentWorkspace to the created workspace
    });

    builder.addCase(UpdateWorkspace.fulfilled, (state, action) => {
      state.updateWorkspaceLoading = false; 
    });

    builder.addCase(UpdateWorkspace.rejected, (state, action) => {
      state.updateWorkspaceLoading = false;
    });

  },
});

export type workspaceReducer = ReturnType<typeof workspaceSlice.reducer>;

export const { setCurrentWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
