import { LOAD_USER, USER_ERROR } from "../types";

const initialState = {
  user: {},
  loading: true,
  errors: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case USER_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    default:
      return state;
  }
}

export default userReducer;
