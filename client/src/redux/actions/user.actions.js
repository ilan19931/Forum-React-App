import axios from "axios";

import { LOAD_USER, USER_ERROR } from "../types";

import { setAlert } from "./alert.actions";

// login user
export const login = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", formData);

    dispatch({
      type: LOAD_USER,
      payload: response.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: USER_ERROR,
      payload: errors,
    });

    console.log("length: " + errors.length);
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
