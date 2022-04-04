import axios from "axios";
import { ADD_COMMENT, ADD_LIKE, COMMENTS_ERROR, LOAD_COMMENTS } from "../types";

export const getAllComments = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/comments/${postId}`);

    dispatch({
      type: LOAD_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: err.message,
    });
  }
};

export const addComment = (comment, postId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comments/${postId}`, comment);
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: err.message,
    });
  }
};

export const likeComment = (commentId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/comments/likes/${commentId}`);

    dispatch({
      type: ADD_LIKE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: err.message,
    });
  }
};
