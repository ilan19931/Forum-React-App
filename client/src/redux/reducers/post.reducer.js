import { LOAD_POST, POST_ERROR } from "../types";

const initialState = {
  post: {},
  loading: true,
  errors: {},
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
