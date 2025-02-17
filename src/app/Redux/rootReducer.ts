// rootReducer.ts

import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import commonReducer from "./commonReducer";
import apiManagementReducer from "./apiManagementReducer";
import apiRiskReducer from "./apiRiskReducer";

import apiTeamReducer from "./apiTeamReducer";
import settingsReducer from "./settingsReducer";
import apiChannelReducer from "./apiChannelReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  common: commonReducer,
  apiManagement: apiManagementReducer,
  apiRisk: apiRiskReducer,
  apiTeam: apiTeamReducer,
  settings: settingsReducer,
  channels: apiChannelReducer,
});

export default rootReducer;
