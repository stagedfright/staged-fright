import { SET_VOLUME_DATA, SET_PITCH_DATA, SET_SEMITONE_DATA } from '../../constants';
import initialState from '../../initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_VOLUME_DATA:
      return state.merge({
        volumeMeterArr: action.volumeDataArr
      });
    case SET_PITCH_DATA:
      return state.merge({
        pitchArr: action.pitchDataArr
      });
    case SET_SEMITONE_DATA:
      return state.merge({
        stdSemitonesArr: action.semitoneDataArr
      });
    default:
      return state;
  }
};
