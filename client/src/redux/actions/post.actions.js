import axios from "axios";

import { ADD_POST_VIEW, LOAD_POST, POST_ERROR } from "../types";

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/byId/${postId}`);

    dispatch({
      type: LOAD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
