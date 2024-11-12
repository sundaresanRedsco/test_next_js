// apiManagementReducer.ts
import { combineReducers } from "redux";
import ChannelReducer from "./channel/ChannelReducer";

const apiChannelReducer = combineReducers({
  channels: ChannelReducer,
});

export default apiChannelReducer;
