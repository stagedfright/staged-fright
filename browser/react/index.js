import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import store from '../redux/store';
//For debugging
// window.store = store;
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';
import firedux from '../redux/store/firedux';

import {
  AppContainer,
  NewSpeechFormContainer,
  FeedbackFormContainer,
  SelectContainer,
  ViewChoiceContainer
} from './containers';
import SplashScreen from './components/SplashScreen';

import 'aframe';

// Hack for mobile support for materialize-ui
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState (state) {
//       return {
//         'locationBeforeTransitions': state.get('locationBeforeTransitions')
//       }
//   }
// });

const render = () =>
  ReactDOM.render(
      <MuiThemeProvider>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path='/:sessionKey/home' component={SplashScreen} />
          <Route path='/:sessionKey/select' component={SelectContainer} />
          <Route path='/:sessionKey/new-speech' component={NewSpeechFormContainer} />
          <Route path='/:sessionKey/choose-view' component={ViewChoiceContainer} />
          <Route path='/:sessionKey/practice' component={AppContainer} />
          <Route path='/:sessionKey/feedback' component={FeedbackFormContainer} />
        </Router>
      </Provider>
      </MuiThemeProvider>,
    document.getElementById('react-app')
  );

firedux.watch('speechData')
.then(render)
.catch(console.log);
