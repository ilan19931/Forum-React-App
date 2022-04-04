import { combineReducers } from "redux";

import alertReducer from "../reducers/alert.reducer";
import userReducer from "../reducers/user.reducer";
import categoryReducer from "../reducers/category.reducer";
import forumReducer from "../reducers/forum.reducer";
import commentReducer from "../reducers/comment.reducer";
import postReducer from "../reducers/post.reducer";

export default combineReducers({
  alerts: alertReducer,
  auth: userReducer,
  categories: categoryReducer,
  forums: forumReducer,
  post: postReducer,
  comments: commentReducer,
});
