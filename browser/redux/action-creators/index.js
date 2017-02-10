import { push, replace } from 'react-router-redux';
import firedux, { firebaseApp } from '../store/firedux';
const sessionKey = firedux.ref.key;

const goToSummary = dispatch => {
	dispatch(push(`/${sessionKey}/feedback`));
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
	// This dispatch is called from the AudioSession component. Since Firedux sends back updated snapshots optimistically, updating only 'pitch' and 'loudness' in this action causes the 'recording' prop to be momentarily 'undefined' for the AudioSession component between the optimistic update and syncing back with the whole Firebase ref after the update. Because of the way the ComponentWillReceiveProps hook in AudioSession works, this causes recording to cut out on the first updateData dispatch. To make sure AudioSession never loses the 'recording' prop (i.e. so that it never stops recording), we include 'recording: true' here. 
	firedux.update('speechData', {
		pitch: monotonyBool,
		loudness,
		recording: true,
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


