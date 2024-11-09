// apiRiskReducer.ts
import { combineReducers } from "redux";

import apikeyReducer from "./settings/apikeyReducer";
import accountReducer from "./settings/accountReducer";

const settingsReducer = combineReducers({
  apikey: apikeyReducer,
  account: accountReducer,
});

export default settingsReducer;
