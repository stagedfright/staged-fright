import Immutable from 'immutable';
import {
  LOCATION_CHANGE
} from 'react-router-redux';

import initialState from '../../initialState';

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
};