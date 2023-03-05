import catsReducer from './cats/reducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    cats: catsReducer
});

export default rootReducer;