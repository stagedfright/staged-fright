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
  SelectContainer 
} from './containers';
import SplashScreen from './components/SplashScreen';
// import SelectionScreen from './components/SelectionScreen';
import 'aframe';
import { component as draw } from 'aframe-draw-component';
import movingAvg from './components/VRViewer/utils/movingAverage';

AFRAME.registerComponent('draw', draw);

AFRAME.registerComponent("someshit", {
    dependencies: ["draw"],

    schema: {
      points: {
        default: []
      },
    },
    init: function() {
        this.draw = this.el.components.draw;
        this.draw.register(this.render.bind(this));
    },
    update: function () {
        this.draw.render();
    },
    render: function () {
        const dataLength = 200; // number of dataPoints visible at any point

        var ctx = this.draw.ctx;
        var canvas = this.draw.canvas;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.data.color;
        const clear = 'rgb(255, 255, 255)';

        ctx.fillStyle = clear;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgb(40, 95, 95)';
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.lineJoin="round";

        var sliceWidth = 300 * 1.0 / dataLength;
        var x = 0;
        const dps = this.data.points;
        var wmadps = movingAvg(dps, 7, (val) => val !== 0);
        for(var i = 0; i < wmadps.length; i++) {
            var y = 100 - wmadps[i]/5;

            if(i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
              ctx.stroke();
            }
            console.log(x, y);
            x += sliceWidth;
        };
    }
});

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