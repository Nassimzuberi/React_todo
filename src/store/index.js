import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
import * as reducers from './reducers';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const todosReducer = combineReducers(reducers);

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

let store = createStore(todosReducer, composeWithDevTools(applyMiddleware(...middlewares)));

store.asyncReducers = {};

const createInjectReducer = store => (key,reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(combineReducers({...reducers,...store.asyncReducers}));
}

export const injectReducer = createInjectReducer(store);

export default store;