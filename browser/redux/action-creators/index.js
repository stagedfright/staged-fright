import { push, replace } from 'react-router-redux';
import firedux, { firebaseApp } from '../store/firedux';
const sessionKey = firedux.ref.key;

export const submitSpeechData = fields => dispatch => {
  firedux.set('speechData', fields)
  .then(dispatch(push(`/${sessionKey}/practice`)));
};

export const populatePremadeSpeech = id => dispatch => {
	firebaseApp.database().ref(`sessions/${id}`)
	.once('value', (value) => {
		const { speechLines, wpm } = value.val().speechData;
		firedux.set('speechData', { speechLines, wpm })
		.then(dispatch(push(`/${sessionKey}/new-speech`)));
	});
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

export const updatePitch = pitchArray => dispatch => {
  firedux.update('speechData', { pitchArray });
};
