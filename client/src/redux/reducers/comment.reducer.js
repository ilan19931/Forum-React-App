import { ADD_COMMENT, ADD_LIKE, COMMENTS_ERROR, LOAD_COMMENTS } from "../types";

const initialState = {
  comments: [],
  loading: true,
  errors: {},
};

const commentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, payload],
        loading: false,
      };

    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [...payload],
        loading: false,
      };

    case COMMENTS_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    case ADD_LIKE:
      return {
        ...state,
        likes: [...payload],
        loading: false,
      };

    default:
      return state;
  }
};

export default commentReducer;
