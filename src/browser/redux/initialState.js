import { Map } from 'immutable';

// I prefer having a hardcoded initial state so we can have an idea of what it looks like.
const initialState = Map({
  isInitialized: false,
  wpm: 140,
  speechLines: [],
  locationBeforeTransitions: null,
  loudness: 0,
  pitch: false,
  recording: false
});

export default initialState;
