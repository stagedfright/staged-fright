
import { push, replace } from 'react-router-redux';
import firedux from '../store/firedux';

const sessionKey = firedux.ref.key;

export const submitSpeechData = fields => dispatch => {
  firedux.set('speechData', fields);
  dispatch(push(`/${sessionKey}/practice`));
};

export const sendFeedback = fields => dispatch => {
  firedux.push('speechData/feedback', fields);
};

export const finishRecording = dispatch => {
	//redirects instead of a push as a way to get over component mounting scroll problems
	window.location.pathname = `/${sessionKey}/feedback`;
};

export const updateLoudness = loudness => dispatch => {
  firedux.update('speechData', { loudness });
};
