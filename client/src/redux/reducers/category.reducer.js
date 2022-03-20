import { CATEGORY_ERROR, LOAD_CATEGORIES } from "../types";

const initialState = {
  categories: [],
  loading: true,
  errors: {},
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CATEGORIES:
      return {
        categories: [...payload.categories],
        loading: false,
      };

    case CATEGORY_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default categoryReducer;
