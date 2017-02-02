import React, { Component } from 'react';
import styles from './styles';
// import BasicSingleLineInput from '../BasicSingleLineInput';
import InitialLoading from '../InitialLoading';
//import {Entity, Scene} from 'aframe-react';
import {speech} from '../../../../public/speech-line-test-data.js'

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      at: 0, 
      time: window.performance.now(), 
      stream:[]
    };
    this.startRecording = this.startRecording.bind(this);
  }

  startRecording() {

    console.log('HEY THE RECORDING FUNCTION STARTED');

    navigator.getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source;
    var stream;

    var analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    var pollData;
    
    if (navigator.getUserMedia) {
       console.log('getUserMedia supported.');
       navigator.getUserMedia(
        // constraints 
        { audio: true },
        // success cb
        function(stream) {
          //connect audio context to the stream we created
           source = audioCtx.createMediaStreamSource(stream);
           source.connect(analyser);
           streamToStore();
        },
        // error cb
        function(err) {
           console.log('Error getting UserMedia: ' + err);
        }
      );
    } else {
       console.log('getUserMedia not supported on your browser!');
    }

    function streamToStore() {

          analyser.fftSize = 2048;
          // the AnalyserNode.frequencyBinCount value is half the fft
          // & = how many data pts we collect for that buffer size 
          var bufferLength = analyser.frequencyBinCount;
          console.log(bufferLength);

          // instantiate an unsigned 8-bit integer array to hold our values 
          var dataArray = new Uint8Array(bufferLength);

          function poll() {
            // loops and gets the data continuously over time
            pollData = requestAnimationFrame(poll);
              //TODO: on leaving the page, call
              //window.cancelAnimationFrame(pollData);
            
            // fill the array with the current sine wave for the point in time polled
            analyser.getByteTimeDomainData(dataArray);
            console.log(dataArray);

          };

          // starts the loop off; it will run continuously from here
          poll();
      }
  }

  componentDidMount () {
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
