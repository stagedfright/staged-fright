import React, { Component } from 'react';
import styles from './styles';
// import BasicSingleLineInput from '../BasicSingleLineInput';
import InitialLoading from '../InitialLoading';
//import {Entity, Scene} from 'aframe-react';
import {speech} from '../../../../public/speech-line-test-data.js'

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
    console.log("PROPS", props);
    this.state = {at: 0, time: window.performance.now(), stream:[]}

    this.startRecording = this.startRecording.bind(this);

  }

  startRecording() {
    console.log('HEY THE RECORDING FUNCTION STARTED');

    navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream) => {
      console.log('THIS IS THE CONTEXT ', this)
      console.log('THIS IS THE STREAM ', stream)
      this.setState({stream});
      return setTimeout(() => {stream.getAudioTracks().forEach((track, idx) => {
        console.log('THIS IS THE TRACK ON THE STREAM ', track);
        track.stop();
        console.log(`TRACK ${idx} STOPPED`);
      })}, 10000);
    })
    .then(() => {
      console.log('IS THIS THE SAME STREAM???? ', this.state.stream)
      this.state.stream.onended = function() {
      console.log('THE STREAM HAS ENDED YOU GUYS');
    }})
    .catch(console.err(err))
  }

  componentDidMount () {
    // this.props.scrollLines(this.props.wpm, this.props.speechLines.length)
    this.tick(window.performance.now());

    setTimeout(this.startRecording, 5000)

  }

  tick = time => {
    const dt = time - this.state.time
    const at = this.state.at + 0.0005 * dt
    this.setState({time, at})
    requestAnimationFrame(this.tick)
  }

  render () {
    const { handleSubmit, isInitialized } = this.props;
    const { at } = this.state
    const scene = document.querySelector('a-scene');

    return (
      <div>
        <a-scene>

        {/* Make the loading screen work!!

          !scene.hasLoaded ?
          <InitialLoading />
          :



        */}

          <a-assets>
            <video muted id="mvp" autoPlay loop src="DT_RNC.mp4" />
          </a-assets>
          <a-videosphere src="#mvp"></a-videosphere>
          <a-entity position="0 0 3.8">
            <a-camera>
            </a-camera>
          </a-entity>

          { /*
            <a-entity position={`0 ${-0.01 * time} 0`}>

          <a-entity position=".28 5 -.26" scale="5 5 5" text={`value: ${this.props.speechLines[this.props.prevLine]}; lineHeight: 50px; opacity: 0.5`}>
          </a-entity>
          <a-entity position=".28 3 -.26" scale="5 5 5" text={`value: ${this.props.speechLines[this.props.currentLine]}; lineHeight: 50px;`}>
          </a-entity>
          <a-entity position=".28 1 -.26" scale="5 5 5" text={`value: ${this.props.speechLines[this.props.nextLine]}; lineHeight: 50px; opacity: 0.5`}>

          </a-entity>
          */ }

          {
            this.props.speechLines.map((line, idx) => ({
              line, idx, position: [0.28, at - idx, -0.26]
            }))
            .filter(({position: [x, y, z]}) => y > 1 && y < 5)
            .map(({line, position, idx}) =>
              <a-entity key={idx} position={position.join(' ')} geometry="primitive: plane; width: 100" material="side: double; transparent: true; opacity: 0; color: #EF2D5E" /*scale="5 5 5"*/ text={`value: ${line}; line-height: 30px; anchor: center; wrapCount: 1000; align: center;`} />
            )
          }
        </a-scene>
      </div>
    );
  }
}






VRViewer.defaultProps = {
  handleSubmit: () => {
    console.log('Still fetching dispatch from server...');
  }
};

VRViewer.propTypes = {
  welcomeText: React.PropTypes.string,
  handleSubmit: React.PropTypes.func
};
