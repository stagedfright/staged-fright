import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const rrrMiddleware = routerMiddleware(browserHistory);

// Very standard.
export default createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true}),
    rrrMiddleware
  ), 
  routerReducer
);
