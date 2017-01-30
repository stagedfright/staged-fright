import { SET_SPEECH_DATA } from '../../constants';
import initialState from '../../initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPEECH_DATA:
      return state.merge({
      	wpm: action.wpm,
      	speechLines: action.speechLines
      });
    default:
      return state;
  }
};
