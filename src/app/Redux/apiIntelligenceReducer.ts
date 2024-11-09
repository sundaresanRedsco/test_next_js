// apiInteligenceReducer.ts
import { combineReducers } from "redux";
import apiActivityReducer from "./apiIntelligence/apiActivityReducer";
import apiEndPointReducer from "./apiIntelligence/apiEndPointReducer";
import apiAnalyticsReducer from "./apiIntelligence/apiAnalyticsReducer";

const apiInteligenceReducer = combineReducers({
  apiActivity: apiActivityReducer,
  apiEndpoint: apiEndPointReducer,
  apiAnalytics: apiAnalyticsReducer,
});

export default apiInteligenceReducer;
