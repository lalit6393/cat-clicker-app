import {
  FETCH_CAT_FAILURE,
  FETCH_CAT_REQUEST,
  FETCH_CAT_SUCCESS,
} from "./actionType";

const initialState = {
  loading: true,
  cats: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        cats: action.payload,
      };
    case FETCH_CAT_FAILURE:
      return {
        ...state,
        loading: false,
        cats: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
