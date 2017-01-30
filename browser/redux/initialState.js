import { Map } from 'immutable';

// I prefer having a hardcoded initial state so we can have an idea of what it looks like.
const initialState = Map({
  isInitialized: false,
  speechLines: [],
  wpm: 0,
  prevLine: 0,
  currentLine: 1,
  nextLine: 2
});

export default initialState;
