import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import firedux from './firedux';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const rrrMiddleware = routerMiddleware(browserHistory);

// Very standard.
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true}),
    rrrMiddleware
  ),
  routerReducer
);



firedux.dispatch = store.dispatch

export default store
