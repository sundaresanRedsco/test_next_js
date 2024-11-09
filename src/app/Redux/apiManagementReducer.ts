// apiManagementReducer.ts
import { combineReducers } from "redux";
import projectReducer from "./apiManagement/projectReducer";
import flowReducer from "./apiManagement/flowReducer";
import apiGatewayReducer from "./apiManagement/apiGatewayReducer";
import swaggerDocReducer from "./apiManagement/swaggerDocReducer";
import integrationReducer from "./apiManagement/integrationReducer";
import workspaceReducer from "./apiManagement/workspaceReducer";
import environmentReducer from "./apiManagement/environmentReducer";
import endpointReducer from "./apiManagement/endpointReducer";
import projectApiReducer from "./apiManagement/projectApiReducer";

const apiManagementReducer = combineReducers({
  projects: projectReducer,
  apiFlowDesign: flowReducer,
  gateWay: apiGatewayReducer,
  swaggerDoc: swaggerDocReducer,
  integration: integrationReducer,
  workspace: workspaceReducer,
  environment: environmentReducer,
  endpoint: endpointReducer,
  apiProjects: projectApiReducer,
});

export default apiManagementReducer;
