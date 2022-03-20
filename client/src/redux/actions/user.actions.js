import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  LOAD_USER,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
} from "../types";

import { setAlert } from "./alert.actions";

// login user
export const login = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", formData);

    // create cookie
    await localStorage.setItem("token", response.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: USER_ERROR,
      payload: errors,
    });

    if (errors.length > 0) {
      errors.map((error) =>
        dispatch(setAlert({ alertType: "danger", msg: error }))
      );
    }
  }
};

// register user
export const register = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/register", formData);

    // create cookie
    localStorage.setItem("token", response.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: USER_ERROR,
      payload: errors,
    });

    if (errors.length > 0) {
      errors.map((error) =>
        dispatch(setAlert({ alertType: "danger", msg: error }))
      );
    }
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const response = await axios.get("/api/users/auth");

    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err,
    });
  }
};

//logout
export const logout = () => async (dispatch) => {
  if (localStorage.token) {
    localStorage.removeItem("token");
    dispatch({
      type: USER_LOGOUT,
    });
  }
};
