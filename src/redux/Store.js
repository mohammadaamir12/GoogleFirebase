// store.js

import { createStore } from 'redux';
import { combineReducers } from 'redux';
import userReducer from './Reducer';
const rootReducer = combineReducers({
    user: userReducer
});

const store = createStore(rootReducer);

export default store;
