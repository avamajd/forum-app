import { combineReducers } from "redux";
import auth from "./authReducer";
import forum from "./forumReducer";
import discussion from "./discussionReducer";

const rootReducer = combineReducers({
  auth,
  forum,
  discussion
});

export default rootReducer;
