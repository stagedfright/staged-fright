import Firedux from 'firedux';
import firebase from 'firebase';
import randomWords from 'random-words';

// Tracker, no tracking!!!
window.FIREDUX_OPTIONS = {
  noTrack: true
};

let session = (() => {
  const match = (window.location.search || '').match(/s=([^&]*)/)
  return match ? match[1] : null
})()

session = session ? session : (() => {
  return randomWords() + Math.floor(Math.random() * 100)
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
