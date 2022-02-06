import { combineReducers } from "redux";
import { usersReducer, selectedUsersReducer } from "./usersReducer";
const reducers = combineReducers({
  allUsers: usersReducer,
  user: selectedUsersReducer,
});
export default reducers;
