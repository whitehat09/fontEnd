import { combineReducers } from "redux";
import todosReducer from "./todosReducers";

export default combineReducers({
  todos: todosReducer,
});
