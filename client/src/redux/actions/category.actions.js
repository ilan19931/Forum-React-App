import axios from "axios";
import { CATEGORY_ERROR, LOAD_CATEGORIES } from "../types";

export const getAllCategories = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/categories");

    dispatch({
      type: LOAD_CATEGORIES,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.message,
    });
  }
};
