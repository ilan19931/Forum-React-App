import axios from "axios";

import { v4 as uuid } from "uuid";

import { SET_ALERT, DELETE_ALERT } from "../types";

// login user
export const setAlert =
  ({ alertType, msg, timeOut = 5000 }) =>
  (dispatch) => {
    try {
      const _id = uuid();

      dispatch({
        type: SET_ALERT,
        payload: {
          alertType,
          msg,
          _id,
        },
      });

      // delete alert after 5 seconds
      setTimeout(() => dispatch(deleteAlert(_id)), timeOut);
    } catch (err) {
      console.log(err);
    }
  };

// delete alert
export const deleteAlert = (alertId) => (dispatch) => {
  try {
    dispatch({
      type: DELETE_ALERT,
      payload: alertId,
    });
  } catch (err) {
    console.log(err);
  }
};
