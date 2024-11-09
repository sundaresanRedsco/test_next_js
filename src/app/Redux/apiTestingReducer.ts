// apiTestingReducer.ts
import { combineReducers } from "redux";
import apiTestingDashboardReducer from "./apiTesting/apiTestingDashboardReducer";
import testRunnerReducer from "./apiTesting/testRunnerReducer";

const apiTestingReducer = combineReducers({
  apiTestDashboard: apiTestingDashboardReducer,
  testRunner: testRunnerReducer,
});

export default apiTestingReducer;
