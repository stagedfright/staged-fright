import welcomeReducer from './welcome-reducer';
import initializationReducer from './initialization-reducer';
import speechReducer from './speech-reducer';
import formReducer from './form-reducer';
import routingReducer from './routing-reducer';
import firedux from '../store/firedux';

const fireduxReducer = firedux.reducer()

// File to use to explain to superReducer what its reducers are.
export default [
  welcomeReducer,
  initializationReducer,
  speechReducer,
  formReducer,
  routingReducer,
  fireduxReducer
];
