import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import { Socket } from "../Services/WebSocket/Socket";
// import { socketMiddleware } from "../Services/WebSocket/middleware";
import loginReducer from "./loginReducer";
import commonReducer from "./commonReducer";
import signupReducer from "./signupReducer";
import apiManagementReducer from "./apiManagementReducer";
import apiRiskReducer from "./apiRiskReducer";
// import riskapiTablereducer from "./apiRisk/riskapiTablereducer";
// import riskDashboardtablereducer from "./apiRisk/riskDashboardtablereducer";
import apiInteligenceReducer from "./apiIntelligenceReducer";
import apiTestingReducer from "./apiTestingReducer";
import apiTeamReducer from "./apiTeamReducer";
import settingsReducer from "./settingsReducer";
import { socketMiddleware } from "../Services/WebSocket/middleware";

import { setupListeners } from "@reduxjs/toolkit/query";
import { apiTeams } from "./manageTeam/teamProjectSlice";
// import resetReducer from "./resetReducer";
// import rootReducer1 from "./rootReducer";
// import resetMiddleware from "./rootReducer";
import resetReducer from "./resetReducer";
import rootReducer from "./rootReducer";
import SecurityCompilanceReducer from "./SecurityCompilance/SecurityCompilanceReducer";
import apiCompilanceReducer from "./apiCompilanceReducer";
import tabsReducer from "./tabReducer";
import permissionReducer from "./permissionReducer/permissionReducer";
import postReducer from "./PostReducer/postReducer";
import apiPostReducer from "./apiPostReducer";
import apiInvitationReducer from "./apiInvitationReducer";
import apiChannelReducer from "./apiChannelReducer";

const socket = new Socket(); // Create an instance of the Socket class
const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    common: commonReducer,
    apiManagement: apiManagementReducer,
    apiRisk: apiRiskReducer,
    apiIntelligence: apiInteligenceReducer,
    apiTesting: apiTestingReducer,
    apiTeam: apiTeamReducer,
    settings: settingsReducer,
    reset: resetReducer,
    root: rootReducer,
    tabs: tabsReducer,
    compilances: apiCompilanceReducer,
    permission: permissionReducer,
    // posts: postReducer,
    apiPosts: apiPostReducer,
    apiInvitation: apiInvitationReducer,
    channels: apiChannelReducer,

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(resetMiddleware),
    // app: appReducer,

    [apiTeams.reducerPath]: apiTeams.reducer,
  },

  //   middleware: (getDefaultMiddleware) => [
  //     ...getDefaultMiddleware({
  //       serializableCheck: false, // Disable serializable check for WebSocket actions
  //       // }),
  //       // apiManagementProjects.middleware,
  //     }).concat(
  //       apiManagementProjects.middleware,
  //       apiTeams.middleware
  //       // resetMiddleware,
  //     ),
  //     // getDefaultMiddleware().concat(apiManagementProjects.middleware),
  //     socketMiddleware(socket), // Add your socket middleware
  //     // Add other middleware if needed
  //   ],
});
console.log(apiRiskReducer);

setupListeners(store.dispatch);

export default store;

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
