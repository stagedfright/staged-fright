import Firedux from 'firedux';
import firebase from 'firebase';
import randomWords from 'random-words';

// Tracker, no tracking!!!
window.FIREDUX_OPTIONS = {
  noTrack: true
};

function createSessionKey() {
  return randomWords() + Math.floor(Math.random() * 100)
}

let session = (() => {
  const currentSession = window.location.pathname.split("/")[1]
  if(!currentSession) {
    window.location.pathname = createSessionKey()
  }
  return currentSession
})()

const firebaseApp = firebase.initializeApp({
  databaseURL: 'https://staged-fright.firebaseio.com',
  apiKey: 'AIzaSyAv8NlhgaumkjXDRLBtRJIw-pOZRnnn4Es'
})

const rootRef = firebaseApp.database().ref()

const ref = rootRef.child(`sessions/${session}`)

const firedux = new Firedux({
  ref
});

export default firedux
