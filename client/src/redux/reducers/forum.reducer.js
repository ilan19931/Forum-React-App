import { LOAD_ALL_FORUMS, LOAD_FORUM, FORUM_ERROR } from "../types";

const initialState = {
  forums: [],
  forum: {},
  errors: {},
  loading: true,
};

const forumReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ALL_FORUMS:
      return {
        ...state,
        forums: [...payload.forums],
        loading: false,
      };

    case LOAD_FORUM:
      return {
        ...state,
        forum: payload,
        loading: false,
      };

    case FORUM_ERROR:
      return {
        errors: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default forumReducer;
