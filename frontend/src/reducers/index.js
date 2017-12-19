import { combineReducers } from "redux";
import { postReducer } from './Postreducers.js';
import { commentReducer } from './commentReducer';
import { categoryReducer } from './categoryReducer';
import { reducer as FormReducer } from 'redux-form';


const reducers = combineReducers({
    posts: postReducer,
    comments: commentReducer,
    postincategory: categoryReducer,
    form:FormReducer
    
});

export default reducers;
