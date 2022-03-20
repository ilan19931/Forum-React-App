import { combineReducers } from "redux";

import alertReducer from "../reducers/alert.reducer";
import userReducer from "../reducers/user.reducer";
import categoryReducer from "../reducers/category.reducer";

export default combineReducers({
  alerts: alertReducer,
  auth: userReducer,
  categories: categoryReducer,
});
