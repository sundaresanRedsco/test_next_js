// apiManagementReducer.ts
import { combineReducers } from "redux";
import postReducer from "./PostReducer/postReducer";

const apiPostReducer = combineReducers({
  posts: postReducer,
});

export default apiPostReducer;
