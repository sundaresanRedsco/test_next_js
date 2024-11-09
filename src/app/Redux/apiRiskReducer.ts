// apiRiskReducer.ts
import { combineReducers } from "redux";
import vulnerabilityReducer from "./apiRisk/vulnerabilityReducer";
import projectRiskreducer from "./apiRisk/projectRiskreducer";
import riskApiReducer from "./apiRisk/riskApiReducer";
import senstiveDataReducer from "./apiRisk/senstiveDataReducer";
import policyReducer from "./apiRisk/policyReducer";
import sensibleMetricsReducer from "./apiRisk/sensibleMetricsReducer";

// import vulnerabilitiesReducer from "./apiRisk/vulnerabilitiesReducer";
// import riskapiTablereducer from "./apiRisk/riskapiTablereducer";
// import riskDashboardtablereducer from "./apiRisk/riskDashboardtablereducer";

const apiRiskReducer = combineReducers({
  projects: projectRiskreducer,
  riskApi: riskApiReducer,
  vulnerablity: vulnerabilityReducer,
  senstivedata: senstiveDataReducer,
  policy: policyReducer,
  sensibleMetrics: sensibleMetricsReducer,

  // table:riskapiTablereducer,
  // dashboardTable:riskDashboardtablereducer
});

export default apiRiskReducer;
