// apiManagementReducer.ts
import { combineReducers } from "redux";
import SecurityCompilanceReducer from "./SecurityCompilance/SecurityCompilanceReducer";

const apiCompilanceReducer = combineReducers({
  securityCompilanes: SecurityCompilanceReducer,
});

export default apiCompilanceReducer;
