import {
  FETCH_CAT_FAILURE,
  FETCH_CAT_REQUEST,
  FETCH_CAT_SUCCESS,
  INCREMENT_AGE,
} from "./actionType";
import axios from "axios";

export const incrementAge = () => {
  return {
    type: INCREMENT_AGE,
  };
};

export const fetchCatRequest = () => {
  return {
    type: FETCH_CAT_REQUEST,
  };
};

export const fetchCatSuccess = (cats) => {
  return {
    type: FETCH_CAT_SUCCESS,
    payload: cats,
  };
};

export const fetchCatFailure = (error) => {
  return {
    type: FETCH_CAT_FAILURE,
    payload: error,
  };
};

export const fetchCats = () => {
    return (dispatch) => {
        dispatch(fetchCatRequest);
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const cats = response.data;
            dispatch(fetchCatSuccess(cats));
        })
        .catch(err => {
            const error = err.message;
            dispatch(fetchCatFailure(error));
        })
    }
}