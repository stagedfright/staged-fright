import initialState from '../initialState';
import { SET_DISPLAY_LINES } from '../constants';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_LINES:
      return state.merge({
        prevLine: state.get('prevLine') + 1,
        currentLine: state.get('currentLine') + 1,
        nextLine: state.get('nextLine') + 1
      });
    default:
      return state;
  }
};
