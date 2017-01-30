import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from '../redux/store';
//For debugging
window.store = store;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { AppContainer, NewSpeechFormContainer } from './containers';
import SplashScreen from './components/SplashScreen';
import 'aframe';
// import 'aframe-bmfont-text-component';

import SOCKET from '../sockets';

// Hack for mobile support for materialize-ui
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
      return {
        'locationBeforeTransitions': state.get('locationBeforeTransitions')
      }
  }
})

/*
  Provider = react-redux supplying context of store.
  Mui = materialize-ui providing a default theme for itself.
  Router = react-router
*/
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path='/' component={SplashScreen} />
        <Route path='/new-speech' component={NewSpeechFormContainer} />
        <Route path='/practice' component={AppContainer} />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-app')
);
