import { configureStore } from "@reduxjs/toolkit";

import { Socket } from "../Services/WebSocket/Socket";

import loginReducer from "./loginReducer";
import commonReducer from "./commonReducer";
import signupReducer from "./signupReducer";
import apiManagementReducer from "./apiManagementReducer";
import apiRiskReducer from "./apiRiskReducer";
import apiTeamReducer from "./apiTeamReducer";
import settingsReducer from "./settingsReducer";
import { socketMiddleware } from "../Services/WebSocket/middleware";

import { setupListeners } from "@reduxjs/toolkit/query";
import { apiTeams } from "./manageTeam/teamProjectSlice";

import resetReducer from "./resetReducer";
import rootReducer from "./rootReducer";

import apiCompilanceReducer from "./apiCompilanceReducer";
import tabsReducer from "./tabReducer";
import permissionReducer from "./permissionReducer/permissionReducer";

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

    [apiTeams.reducerPath]: apiTeams.reducer,
  },
});

setupListeners(store.dispatch);

export default store;

export type RootStateType = ReturnType<typeof store.getState>;

type AppDispatchType = typeof store.dispatch;
