import axios from "axios";
import { FORUM_ERROR, LOAD_FORUM, LOAD_ALL_FORUMS } from "../types";

export const getAllForums = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/forums");

    dispatch({
      type: LOAD_ALL_FORUMS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: FORUM_ERROR,
      payload: err.message,
    });
  }
};

export const getForumById = (forumId) => async (dispatch) => {
  try {
    const response = await axios.get("/api/forums/" + forumId);
    const postsResponse = await axios.get("/api/posts/" + forumId);

    dispatch({
      type: LOAD_FORUM,
      payload: {
        ...response.data,
        posts: [...postsResponse.data],
      },
    });
  } catch (err) {
    dispatch({
      type: FORUM_ERROR,
      payload: err.message,
    });
  }
};
