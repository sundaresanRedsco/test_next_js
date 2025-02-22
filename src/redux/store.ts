import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import commonReducer from "./commonReducer";
import signupReducer from "./signupReducer";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    common: commonReducer,
  },
});

setupListeners(store.dispatch);

export default store;

export type RootStateType = ReturnType<typeof store.getState>;

type AppDispatchType = typeof store.dispatch;
