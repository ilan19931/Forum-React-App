import {
  LOAD_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  user: {},
  isAuthenticated: false,
  loading: true,
  errors: {},
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case USER_LOGOUT:
      return { ...initialState, token: null };

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
