import { push, replace } from 'react-router-redux';
import firedux, { firebaseApp } from '../store/firedux';
const sessionKey = firedux.ref.key;

const goToSummary = dispatch => {
	// dispatch(push(`/${sessionKey}/feedback`));
	window.location.href = `/${sessionKey}/feedback`;
};

const goToChooseView = dispatch => {
	dispatch(push(`/${sessionKey}/choose-view`));
};

const goToNewSpeech = dispatch => {
	dispatch(push(`/${sessionKey}/new-speech`));
};

export const submitSpeechData = fields => dispatch => {
  firedux.set('speechData', fields)
  .then(dispatch(goToChooseView));
};

export const populatePremadeSpeech = id => dispatch => {
	firebaseApp.database().ref(`sessions/${id}`)
	.once('value', (value) => {
		const { speechLines, wpm } = value.val().speechData;
		firedux.set('speechData', { speechLines, wpm })
		.then(dispatch(goToNewSpeech));
	});
};

export const sendFeedback = fields => dispatch => {
  firedux.push('speechData/feedback', fields);
};

export const updateData = (loudness, monotonyBool) => dispatch => {
	firedux.update('speechData', {
		pitch: monotonyBool,
		loudness
	});
};

export const startRecording = dispatch => {
	firedux.update('speechData', {
		recording: true,
	});
};

export const stopRecording = dispatch => {
	firedux.update('speechData', {
		recording: false,
	})
	.then(dispatch(goToSummary));
};


