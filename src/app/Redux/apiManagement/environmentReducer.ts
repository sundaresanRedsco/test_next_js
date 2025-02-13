import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { environmentProjectSolrOffsetInterface } from "../../Utilities/interface/environmentInterface";
import { setCurrentStage } from "./projectReducer";
import { environmentDataInterface } from "../../../interface/environmentInterface";
import { getCookies } from "@/app/Helpers/helpersFunctions";

export const GetProjectByWorkspaceIdSolrOffset = createAsyncThunk(
  "projects/getProjectByWorkspaceIdSolrOffset",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_workspace_id_solr_offset?workspaceId=${values?.wsid}&sortByField=${values?.sortByField}&sortByvalue=${values?.sortByValue}&sortDirection=${values?.sortDirection}&start=${values?.startValue}&end=${values?.endValue}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetAllStagesByProjectId = createAsyncThunk(
  "projects/getAllStagesByProjectId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Stages/getallstages_by_projectid?projectid=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const CreateProjects = createAsyncThunk(
  "project/createProjects",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Project/project_create",
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

export const GetProjectById = createAsyncThunk(
  "projects/GetProjectById",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_id?project_id=${value?.project_id}&workspace_id=${value?.workspace_id}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetNewProjectByWorkspaceIdSolrOffset = createAsyncThunk(
  "projects/GetNewProjectByWorkspaceIdSolrOffset",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_workspace_id_solr_offset?workspaceId=${values?.wsid}&sortByField=${values?.sortByField}&sortByvalue=${values?.sortByValue}&sortDirection=${values?.sortDirection}&start=${values?.startValue}&end=${values?.endValue}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetProjectsByGroupOffset = createAsyncThunk(
  "projects/GetProjectsByGroupOffset",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_group_id_solr_offset?group_id=${values?.group_id}&start=${values?.startValue}&end=${values?.endValue}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetProjectByWorkspaceIdSolrOffsetOverView = createAsyncThunk(
  "projects/getProjectByWorkspaceIdSolrOffset",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_workspace_id_solr_offset?workspaceId=${values?.workspaceId}&sortByField=${values?.sortByField}&sortByvalue=${values?.sortByvalue}&sortDirection=${values?.sortDirection}&start=${values?.start}&end=${values?.end}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const resetGatewayStateSwaggerDoc = createAction("Gateway/resetState");

export const resetSwaggerState = createAction("swaggerDoc/resetState");

type InitialStateType = {
  getProjectWsidLoading: boolean;
  getProjectLoading: boolean;
  createProjectLoading: boolean;
  enviProjectsListSolrOffset: environmentProjectSolrOffsetInterface[];
  stagesLoading: boolean;
  currentEnvironment: string;
  currentEnvironmentDetails: environmentDataInterface | null;
  currentStage: string;
  ProjectsListOffset: any;
  projectStartValue: number;
  projectEndValue: number;
  getProjectOverViewLoading: boolean;
  getProjectOverViewStart: number;
  getProjectOverViewEnd: number;
  getProjectOverViewTotalCount: number;
};

const initialState: InitialStateType = {
  getProjectWsidLoading: false,
  getProjectLoading: false,
  createProjectLoading: false,
  enviProjectsListSolrOffset: [],
  ProjectsListOffset: [],
  stagesLoading: false,
  currentEnvironment: "",
  currentEnvironmentDetails: null,
  currentStage: "",
  projectStartValue: 0,
  projectEndValue: 8,
  getProjectOverViewLoading: false,
  getProjectOverViewStart: 0,
  getProjectOverViewEnd: 8,
  getProjectOverViewTotalCount: 0,
};

export const environmentSlice = createSlice({
  name: "environments",
  initialState,
  reducers: {
    setCurrentEnvironment(state, action) {
      state.currentEnvironment = action.payload;
    },

    setCurrentEnvironmentDetails(state, action) {
      state.currentEnvironmentDetails = action.payload;
    },
    resetEnvironmentState(state) {
      // Reset all properties to their initial values
      return initialState;
    },
    updateProjectStartValue(state, action) {
      state.projectStartValue = action.payload;
    },
    updateProjectEndValue(state, action) {
      state.projectEndValue = action.payload;
    },
    updateProjectOverViewStart(state, action) {
      state.getProjectOverViewStart = action.payload;
    },
    updateProjectOverViewEnd(state, action) {
      state.getProjectOverViewEnd = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(GetProjectsByGroupOffset.pending, (state, action) => {
      state.getProjectWsidLoading = true;
    });

    builder.addCase(GetProjectsByGroupOffset.fulfilled, (state, action) => {
      state.getProjectWsidLoading = false;
      if (action.payload.length == 0) {
        state.enviProjectsListSolrOffset = [];
      }
      const newprojectList = action.payload;
      if (state.enviProjectsListSolrOffset.length > 0) {
        const projectId = getCookies(
          process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? ""
        );
        if (projectId) {
          state.currentEnvironment = "";
          state.currentEnvironmentDetails = null;
        } else {
          state.currentEnvironment = newprojectList[0].project_id;
          state.currentEnvironmentDetails = newprojectList[0];
        }
      }

      // Create a set of IDs from the new workspace list for quick lookup
      const projectIds = new Set(
        newprojectList.map((nw: any) => nw.project_id)
      );

      // Filter out workspaces from the old list that are not in the new list
      const filteredOldprojects = state.enviProjectsListSolrOffset.filter(
        (project: any) => !projectIds.has(project.project_id)
      );

      // Update the workspace list with the filtered old workspaces and the new workspaces
      state.enviProjectsListSolrOffset = [
        ...filteredOldprojects,
        ...newprojectList,
      ];
    });

    builder.addCase(GetProjectsByGroupOffset.rejected, (state, action) => {
      state.getProjectWsidLoading = false;
    });

    builder.addCase(GetAllStagesByProjectId.pending, (state, action) => {
      state.stagesLoading = true;
    });

    builder.addCase(GetAllStagesByProjectId.fulfilled, (state, action) => {
      state.stagesLoading = false;
      state.currentStage = action.payload[0]?.apistage_id;
    });

    builder.addCase(GetAllStagesByProjectId.rejected, (state, action) => {
      state.stagesLoading = false;
    });

    builder.addCase(GetProjectById.pending, (state, action) => {
      state.stagesLoading = true;
    });

    builder.addCase(GetProjectById.fulfilled, (state, action) => {
      state.stagesLoading = false;

      if (action.payload && action.payload[0]) {
        state.currentEnvironmentDetails = action.payload.projects[0];

        // Check if the workspace with the same id is already in the workspaceList
        const ProjectsList = state.enviProjectsListSolrOffset.some(
          (project: any) =>
            project?.project_id === action.payload[0]?.project_id
        );

        // If the workspace does not exist in the list, add it
        if (!ProjectsList) {
          state.enviProjectsListSolrOffset.push(action.payload[0]);
        }
        state.currentEnvironment = action.payload[0]?.project_id;
      }
    });

    builder.addCase(GetProjectById.rejected, (state, action) => {
      state.stagesLoading = false;
    });

    builder.addCase(CreateProjects.pending, (state, action) => {
      state.createProjectLoading = true;
    });

    builder.addCase(CreateProjects.fulfilled, (state, action) => {
      state.createProjectLoading = false;
      state.currentEnvironment = action.payload.project_id;
      let newProjectData = {
        name: action.payload.project_name,
        ...action.payload,
      };
      state.currentEnvironmentDetails = newProjectData;
      state.currentEnvironment = newProjectData.project_id;
      // Check if the workspace with the same id is already in the workspaceList
      const projectExists = state.enviProjectsListSolrOffset.some(
        (project: any) => project.project_id === action.payload.project_id
      );

      // If the workspace does not exist in the list, add it
      if (!projectExists) {
        state.enviProjectsListSolrOffset.push(newProjectData);
      }

      // Extract the current path from the window object
      let currentPath = window.location.pathname; // Example: '/userId/1/workspaceId/2'

      // Define the projectId you want to add
      const projectId = action.payload.project_id; // Dynamically obtained

      // Check if the path contains '/projects'
      if (currentPath.includes("/projects")) {
        // If '/projects' exists but doesn't have an ID, append the projectId
        if (!/projects\/\d+/.test(currentPath)) {
          currentPath = `${currentPath}/${projectId}`;
        }
      } else {
        // If '/projects' is not present, add it along with the projectId
        currentPath = `${currentPath}/projects/${projectId}`;
      }

      // Update the browser URL (without reloading the page)
      window.history.replaceState({}, "", currentPath);
    });

    builder.addCase(CreateProjects.rejected, (state, action) => {
      state.createProjectLoading = false;
    });

    builder.addCase(
      GetNewProjectByWorkspaceIdSolrOffset.pending,
      (state, action) => {
        state.getProjectLoading = true;
      }
    );

    builder.addCase(
      GetNewProjectByWorkspaceIdSolrOffset.fulfilled,
      (state, action) => {
        state.getProjectLoading = false;
      }
    );

    builder.addCase(
      GetNewProjectByWorkspaceIdSolrOffset.rejected,
      (state, action) => {
        state.getProjectLoading = false;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffsetOverView.pending,
      (state, action) => {
        state.getProjectOverViewLoading = true;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffsetOverView.fulfilled,
      (state, action) => {
        state.getProjectOverViewLoading = false;
        state.getProjectOverViewTotalCount = action.payload.total_count;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffsetOverView.rejected,
      (state, action) => {
        state.getProjectOverViewLoading = false;
      }
    );
  },
});

export type environmentReducer = ReturnType<typeof environmentSlice.reducer>;
export const {
  setCurrentEnvironment,
  setCurrentEnvironmentDetails,
  resetEnvironmentState,
  updateProjectStartValue,
  updateProjectEndValue,
  updateProjectOverViewStart,
  updateProjectOverViewEnd,
} = environmentSlice.actions;
export default environmentSlice.reducer;
