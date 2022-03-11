import { combineReducers } from "redux";

import alertReducer from "../reducers/alert.reducer";
import userReducer from "../reducers/user.reducer";

export default combineReducers({
  alerts: alertReducer,
  user: userReducer,
});
