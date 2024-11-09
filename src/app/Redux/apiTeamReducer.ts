// apiRiskReducer.ts
import { combineReducers } from "redux";
import vulnerabilityReducer from "./apiRisk/vulnerabilityReducer";
// import riskDashboardtablereducer from "./apiRisk/riskDashboardtablereducer";
import createTeamreducer from "./manageTeam/teamReducer";
import membersReducer from "./manageTeam/membersReducer";
import rolesandPermissionReducer from "./manageTeam/rolesandPermissionReducer";

const apiTeamReducer = combineReducers({
  createTeam: createTeamreducer,
  member: membersReducer,
  permissions: rolesandPermissionReducer,
});

export default apiTeamReducer;
