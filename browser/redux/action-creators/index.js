
import { push } from 'react-router-redux';
import firedux from '../store/firedux';

const sessionKey = firedux.ref.key;

export const submitSpeechData = fields => dispatch => {
  firedux.set('speechData', fields);
  dispatch(push(`/${sessionKey}/practice`));
};

export const sendFeedback = fields => dispatch => {
  firedux.set('speechData/feedback', fields);
  dispatch(push(`/${sessionKey}/home`));
};

export const finishRecording = dispatch => {
  dispatch(push(`/${sessionKey}/summary`));
};

export const updateLoudness = loudness => dispatch => {
  firedux.update('speechData', { loudness });
};
