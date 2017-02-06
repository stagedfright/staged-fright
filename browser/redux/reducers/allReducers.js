import routingReducer from './routing-reducer';
import firedux from '../store/firedux';

const fireduxReducer = firedux.reducer()

// File to use to explain to superReducer what its reducers are.
export default [
  routingReducer,
  fireduxReducer
];
