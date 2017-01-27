import React, { Component } from 'react';
import styles from './styles';
import BasicSingleLineInput from '../BasicSingleLineInput';
import InitialLoading from '../InitialLoading';
import {Entity, Scene} from 'aframe-react';
import { speech } from '../../../../public/speech.js'
console.log('THIS IS THE SPEEEEEEEEECH    ', speech)

const hello = 'Hello World';

export default class WelcomeDiv extends Component {
  render () {
    const { welcomeText, handleSubmit, isInitialized } = this.props;

    return (
      <div>
        <div style={styles.test}>
        {
          isInitialized
           ?
          (<div>
            <h1> { welcomeText } </h1>
            <BasicSingleLineInput handleSubmit={handleSubmit} />
          </div>)
           :
          (<InitialLoading />)
        }
        </div>
        {/* This 'Scene' madness is aframe-react abstracting.
        <Scene>
          <Entity geometry={{primitive: 'box'}} material="color: red" position={[0, 0, -5]}/>
        </Scene>
        */}

        <a-scene>
          <a-assets>
            <video id="mvp" autoplay loop src="DT_RNC.mp4" />
          </a-assets>
          <a-videosphere src="#mvp"></a-videosphere>

          <a-entity position="-2.28 0 0" bmfont-text={`text: ${speech}; color: white; lineHeight: 50px;`}>
            <a-animation
              attribute="position"
              dur="10000"
              fill="forwards"
              from=""
              to="0 360 0"
              repeat="indefinite"></a-animation>
          </a-entity>
          <a-entity position="0 0 3.8">
            <a-camera></a-camera>
          </a-entity>
        </a-scene>
        {/* This is normal AFrame. */}
      </div>
    );
  }
}

WelcomeDiv.defaultProps = {
  handleSubmit: () => {
    console.log('Still fetching dispatch from server...');
  }
};

WelcomeDiv.propTypes = {
  welcomeText: React.PropTypes.string,
  handleSubmit: React.PropTypes.func
};
