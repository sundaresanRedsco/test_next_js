// rootReducer.ts

import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";
import commonReducer from "./commonReducer";
import apiManagementReducer from "./apiManagementReducer";
import apiRiskReducer from "./apiRiskReducer";
import apiIntelligenceReducer from "./apiIntelligenceReducer";
import apiTestingReducer from "./apiTestingReducer";
import apiTeamReducer from "./apiTeamReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  common: commonReducer,
  apiManagement: apiManagementReducer,
  apiRisk: apiRiskReducer,
  apiIntelligence: apiIntelligenceReducer,
  apiTesting: apiTestingReducer,
  apiTeam: apiTeamReducer,
  settings: settingsReducer,
});

export default rootReducer;
