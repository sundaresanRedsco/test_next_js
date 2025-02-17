// apiRiskReducer.ts
import { combineReducers } from "redux";

import accountReducer from "./settings/accountReducer";

const settingsReducer = combineReducers({
  account: accountReducer,
});

export default settingsReducer;
