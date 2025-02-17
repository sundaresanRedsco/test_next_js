import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { getCookies } from "@/app/Helpers/helpersFunctions";

export const GetGroupsByWorkspaceIdSolrOffset = createAsyncThunk(
  "groups/getGroupsByWorkspaceIdSolrOffset",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Project/get_groups_by_workspace_id?WorkspaceId=${value.workspace_id}`,
        `api/Project/get_groups_by_workspace_id?WorkspaceId=${value.workspace_id}&start=${value.start}&end=${value.end}`,
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

export const GetGroupsByWorkspaceIdOVerView = createAsyncThunk(
  "groups/GetGroupsByWorkspaceIdOVerView",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_groups_by_workspace_id?WorkspaceId=${value?.WorkspaceId}&start=${value?.start}&end=${value?.end}`,
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

const GetProjectByWorkspaceIdOverView = createAsyncThunk(
  "projects/GetProjectByWorkspaceIdOverView",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_workspace_id?workspace_id=${value}`,
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

const resetProjectstate = createAction("groups/resetState");

type InitialStateType = {
  getProjectLoading: boolean;
  projectsList: any[];
  currentProject: any;
  currentProjectDetails: any;
  projectStartValue: number;
  projectEndValue: number;
  groupOverViewStart: number;
  groupOverViewEnd: number;
  getGroupOverViewLoading: boolean;
  getGroupTotalCount: number;
  getGroupList: any;

  getProjectByWorkspaceLoading: boolean;
};

const initialState: InitialStateType = {
  getProjectLoading: false,
  projectStartValue: 0,
  projectEndValue: 8,
  projectsList: [],
  currentProject: null,
  currentProjectDetails: {},
  groupOverViewStart: 1,
  groupOverViewEnd: 8,
  getGroupOverViewLoading: false,
  getGroupTotalCount: 0,
  getProjectByWorkspaceLoading: false,
  getGroupList: {},
};

const projectApiSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },

    setCurrentProjectDetails(state, action) {
      state.currentProjectDetails = action.payload;
    },
    resetProjectState(state) {
      // Reset all properties to their initial values
      return initialState;
    },
    updateProjectStartValue(state, action) {
      state.projectStartValue = action.payload;
    },
    updateProjectEndValue(state, action) {
      state.projectEndValue = action.payload;
    },
    updateGroupOverViewStart(state, action) {
      state.groupOverViewStart = action.payload;
    },
    updateGroupOverViewEnd(state, action) {
      state.groupOverViewEnd = action.payload;
    },
    resetProjectList(state, action) {
      state.projectsList = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(
      GetGroupsByWorkspaceIdSolrOffset.pending,
      (state, action) => {
        state.getProjectLoading = true;
      }
    );

    builder.addCase(
      GetGroupsByWorkspaceIdSolrOffset.fulfilled,
      (state, action) => {
        state.getProjectLoading = false;
        const newprojectList = action.payload?.groups;
        if (state.projectsList.length > 0) {
          // const projectId = getCookies(
          //   process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? ""
          // );
          // if (projectId) {
          //   state.currentProject = "";
          //   state.currentProjectDetails = null;
          // } else {
          state.currentProject = newprojectList[0].group_id;
          state.currentProjectDetails = newprojectList[0];
          // }
        }

        // Create a set of IDs from the new workspace list for quick lookup
        const projectIds = new Set(
          newprojectList.map((nw: any) => nw.group_id)
        );

        // Filter out workspaces from the old list that are not in the new list
        const filteredOldprojects = state.projectsList.filter(
          (project: any) => !projectIds.has(project.group_id)
        );

        // Update the workspace list with the filtered old workspaces and the new workspaces
        state.projectsList = [...filteredOldprojects, ...newprojectList];
      }
    );

    builder.addCase(
      GetGroupsByWorkspaceIdSolrOffset.rejected,
      (state, action) => {
        state.getProjectLoading = false;
      }
    );

    builder.addCase(GetGroupsByWorkspaceIdOVerView.pending, (state, action) => {
      state.getGroupOverViewLoading = true;
    });

    builder.addCase(
      GetGroupsByWorkspaceIdOVerView.fulfilled,
      (state, action) => {
        state.getGroupOverViewLoading = false;
        state.getGroupTotalCount = action?.payload?.totalCount;
        state.getGroupList = action?.payload;
      }
    );

    builder.addCase(
      GetGroupsByWorkspaceIdOVerView.rejected,
      (state, action) => {
        state.getGroupOverViewLoading = false;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdOverView.pending,
      (state, action) => {
        state.getProjectByWorkspaceLoading = true;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdOverView.fulfilled,
      (state, action) => {
        state.getProjectByWorkspaceLoading = false;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdOverView.rejected,
      (state, action) => {
        state.getProjectByWorkspaceLoading = false;
      }
    );
  },
});

export type projectApiReducer = ReturnType<typeof projectApiSlice.reducer>;
export const {
  setCurrentProject,
  resetProjectState,
  
  
  updateGroupOverViewEnd,
  updateGroupOverViewStart,
  setCurrentProjectDetails,
  resetProjectList,
} = projectApiSlice.actions;
export default projectApiSlice.reducer;
