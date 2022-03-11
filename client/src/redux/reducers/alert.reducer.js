import { SET_ALERT, DELETE_ALERT } from "../types";

const initialState = [];

function alertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case DELETE_ALERT:
      return state.filter((alert) => alert._id !== payload);

    default:
      return state;
  }
}

export default alertReducer;
