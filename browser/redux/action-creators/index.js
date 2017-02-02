import {
  SET_INITIALIZED,
  SET_DISPLAY_LINES,
  SET_SPEECH_DATA
} from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';
import firedux from '../store/firedux';

const sessionKey = firedux.ref.key;

const createInitialized = () => ({
  type: SET_INITIALIZED
});

const setSpeechData = ({ wpm, speechLines }) => ({
  type: SET_SPEECH_DATA,
  wpm,
  speechLines
});

export const submitSpeechData = fields => dispatch => {
  firedux.set('speechData', fields);
  dispatch(push(`/${sessionKey}/practice`));
};

//TODO
// export const clearSpeechData =() =>
//   (dispatch) => {
//     firedux.get('speechData')
//       .then(({snapshot}) => console.log(snapshot.val))

//     // _.each(speechData, (sd, id) => firedux.remove(`speechData/${id}`));
//   }

// export function deleteTodo(id) {
//   return () => {
//     firedux.remove(`todos/${id}`)
//   }
// }

// export function editTodo(id, text) {
//   return () => {
//     firedux.update(`todos/${id}`, {
//       text
//     })
//   }
// }

// export function completeTodo(id) {
//   return (dispatch, getState) => {
//     const state = getState()
//     const completed = state.firedux.data.todos[id].completed

//     firedux.set(`todos/${id}/completed`, !completed)
//   }
// }

// export function completeAll() {
//   return (dispatch, getState) => {
//     const state = getState()
//     const todos = state.firedux.data.todos

//     const areAllMarked = _.values(todos).every(todo => todo.completed)

//     _.each(todos, (todo, id) => {
//       firedux.set(`todos/${id}/completed`, !areAllMarked)
//     })
//   }
// }

