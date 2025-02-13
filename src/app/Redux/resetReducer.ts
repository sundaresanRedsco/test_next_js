// resetReducer.js
import rootReducer from "./rootReducer";

const resetReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resetReducer;
