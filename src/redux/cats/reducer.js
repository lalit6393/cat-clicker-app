import {
  FETCH_CAT_FAILURE,
  FETCH_CAT_REQUEST,
  FETCH_CAT_SUCCESS,
  UPDATE_CAT_REQUEST,
  UPDATE_CAT_SUCCESS,
  UPDATE_CAT_FAILURE,
  NEW_CAT_REQUEST
} from "./actionType";

const initialState = {
  loading: false,
  cats: [],
  error: "",
  updating: false,
  updateError: "",
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
    case UPDATE_CAT_REQUEST:
      return {
        ...state,
        updating: true,
      };
    case UPDATE_CAT_SUCCESS:
      return {
        ...state,
        updating: false
      };
    case UPDATE_CAT_FAILURE:
      return {
        ...state,
        updating: false,
        updateError: action.payload,
      };
    case NEW_CAT_REQUEST:
      return {
        ...state,
        cats: [action.payload, ...state.cats]
      };
    default:
      return state;
  }
};

export default reducer;
