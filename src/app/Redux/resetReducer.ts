// resetReducer.js
import rootReducer from "./rootReducer";

const resetReducer = (state: any, action: any) => {
  if (action.type === "RESET_STATE") {
    console.log("reset working");
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default resetReducer;
