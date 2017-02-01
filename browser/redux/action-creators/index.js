import {
  CHANGE_WELCOME,
  SET_INITIALIZED,
  SET_DISPLAY_LINES,
  SET_SPEECH_DATA
} from '../constants';
import axios from 'axios';
import { push } from 'react-router-redux';
import firedux from '../store/firedux';


const createWelcomeText = (text) => ({
  type: CHANGE_WELCOME,
  welcomeText: text
});
const createInitialized = () => ({
  type: SET_INITIALIZED
});

const setSpeechData = ({ wpm, speechLines }) => ({
  type: SET_SPEECH_DATA,
  wpm,
  speechLines
});

export const submitSpeechData = fields => dispatch => {
  dispatch(setSpeechData(fields));
  dispatch(push('/practice'));
};

export const changeLines = () => ({ type: SET_DISPLAY_LINES });

// Used by the front end to live change the welcomeText.
// export const changeWelcomeText = text => dispatch => {
//   axios.put('/api/sessions', {welcomeText: text})
//     .then(() => {
//       dispatch(createWelcomeText(text));
//     })
//     .catch(() => {
//       console.log('Changing Welcome Text Failed.');
//     });
// };

// This function is run by sockets after they've initialized a user.
// export const fetchWelcomeText = () => dispatch => {
//   // Fetch the recently reset session information.
//   axios.get('/api/sessions')
//     .then(res => {
//       return res.data;
//     })
//     // Now reset the data.
//     .then(({ session }) => {
//       if (session.welcomeText) {
//         dispatch(createWelcomeText(session.welcomeText));
//         dispatch(createInitialized());
//       } else {
//         console.log('No previous welcome text.');
//         dispatch(createInitialized());
//       }
//     })
//     .catch(() => {
//       console.log('Fetching Welcome Text Failed.');
//     });
// };

export function addTodo(text) {
  return () => {
    firedux.push('todos', {
      completed: false,
      text
    })
  }
}

export function deleteTodo(id) {
  return () => {
    firedux.remove(`todos/${id}`)
  }
}

export function editTodo(id, text) {
  return () => {
    firedux.update(`todos/${id}`, {
      text
    })
  }
}

export function completeTodo(id) {
  return (dispatch, getState) => {
    const state = getState()
    const completed = state.firedux.data.todos[id].completed

    firedux.set(`todos/${id}/completed`, !completed)
  }
}

export function completeAll() {
  return (dispatch, getState) => {
    const state = getState()
    const todos = state.firedux.data.todos

    const areAllMarked = _.values(todos).every(todo => todo.completed)

    _.each(todos, (todo, id) => {
      firedux.set(`todos/${id}/completed`, !areAllMarked)
    })
  }
}

export function clearCompleted() {
  return (dispatch, getState) => {
    const state = getState()
    const todos = state.firedux.data.todos

    _.each(todos, (todo, id) => {
      if (todo.completed) {
        firedux.remove(`todos/${id}`)
      }
    })
  }
}
