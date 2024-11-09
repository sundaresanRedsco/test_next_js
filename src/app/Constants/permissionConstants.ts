// src/constants/permissions.ts

export const MODULES = {
  API_MANAGEMENT: "API_MANAGEMENT",
  // Add other modules here
};

export const SUB_MODULES = {
  PROJECT: "Project",
  COLLECTION: "Collection",
  WORKSPACE: "Workspace_",
  IMPORTFROMAPIGATEWAY: "ImportFromApiGateWay",
  APIFLOWSERVICE: "Api_design_flow_service",
  // Add other submodules here
};

export const PERMISSIONS = {
  // workspace
  CREATE: "create",
  UPDATE: "update",
  GET_WORKSPACE_LIST: "get_workspaces_list",
  GET_WORKSPACE_TEAM_USERS: "get_workspace_team_users",
  // project
  GET: "Get",
  CLONE: "Clone",
  DELETE: "Delete",
  PUBLISH: "Publish",
  UPDATE_PROJECT_VERSION: "UpdateProjectVersion",
  GET_BY_ID: "GetById",
  GET_PROJECT_BY_WORKSPACE_ID: "GetProjectByWorkspaceId",
  GET_PROJECT_AND_ENDPOINT_COUNT: "GetProjectAndEndpointCount",
  GET_COLLECTIONS_BY_PROJECT_ID: "GetCollectionsByProjectId",

  //flows
  CREATE_API_FLOW: "create_api_flow",
  // Add other permissions here
};
