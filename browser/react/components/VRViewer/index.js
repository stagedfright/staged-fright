import React, { Component } from 'react';
import styles from './styles';
<<<<<<< HEAD
=======
import {Link} from 'react-router';
// import BasicSingleLineInput from '../BasicSingleLineInput';
>>>>>>> audio-stream-#27
import InitialLoading from '../InitialLoading';
import DesktopVRView from '../DesktopVRView';
//import {Entity, Scene} from 'aframe-react';
import {speech} from '../../../../public/speech-line-test-data.js';

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
<<<<<<< HEAD
    console.log("PROPS", props);
    this.state = {
      at: 0, 
      time: window.performance.now(),
      loading: true,
    }
=======
    this.pollData = [];
    this.state = {
      at: 0,
      time: window.performance.now()
    };
    this.startRecording = this.startRecording.bind(this);
    this.streamToStore = this.streamToStore.bind(this);
>>>>>>> audio-stream-#27
  }

  startRecording() {

    console.log('HEY THE RECORDING FUNCTION STARTED');

    navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
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

    if (navigator.mediaDevices.getUserMedia) {
       console.log('getUserMedia supported.');
       navigator.mediaDevices.getUserMedia({ audio: true })
       .then((stream) => {
          this.stream = stream
          //connect audio context to the stream we created
           source = audioCtx.createMediaStreamSource(stream);
           source.connect(analyser);
           this.streamToStore(analyser);
        })
       .catch(e => console.error('getUserMedia() failed: ' + e))
    }
  }


streamToStore(analyser) {

  analyser.fftSize = 2048;
  // the AnalyserNode.frequencyBinCount value is half the fft
  // & = how many data pts we collect for that buffer size
  var bufferLength = analyser.frequencyBinCount;
  console.log(bufferLength);

  // instantiate an unsigned 8-bit integer array to hold our values
  var dataArray = new Uint8Array(bufferLength);

  var poll = () => {
    // loops and gets the data continuously over time
    this.pollRafId = requestAnimationFrame(poll);

    // fill the array with the current sine wave for the point in time polled
    analyser.getByteTimeDomainData(dataArray);
    //console.log(dataArray);
  };

  // starts the loop off; it will run continuously from here
  poll();
}

  componentDidMount () {
<<<<<<< HEAD
    setTimeout(() => this.setState({ loading: false }), 1500); 
    this.tick(window.performance.now())
=======
    this.tick(window.performance.now());
    setTimeout(this.startRecording, 4000)
    setTimeout(this.props.showSummary, 8000)
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.pollRafId);
    cancelAnimationFrame(this.tickRafId)
    this.stream && this.stream.getAudioTracks().forEach(track => track.stop())
    console.log('THE COMPONENT HAS UNMOUNTED!!!')
>>>>>>> audio-stream-#27
  }

  tick = time => {
    const dt = time - this.state.time
    const at = this.state.at + 0.0005 * dt
<<<<<<< HEAD
    this.setState({ time, at })
    requestAnimationFrame(this.tick)
=======

    this.setState({time, at})
    this.tickRafId = requestAnimationFrame(this.tick)
>>>>>>> audio-stream-#27
  }

  render () {
    const { handleSubmit, isInitialized } = this.props;
    const { at, loading } = this.state
    const scene = document.querySelector('a-scene');

<<<<<<< HEAD
    if (navigator.userAgent.match('Mobi')) {
      if (loading) {
        return <InitialLoading />;
      } else return (
        <div>
          <a-scene>
            <a-assets>
              <video muted id="mvp" autoPlay loop src="/DT_RNC.mp4" />
            </a-assets>
            <a-videosphere src="#mvp"></a-videosphere>
            <a-entity position="0 0 3.8">
              <a-camera>
              </a-camera>
            </a-entity>
            {
              this.props.speechLines
              .map((line, idx) => ({
                line, idx, position: [0.28, at - idx, -0.26]
              }))
              .filter(({ position: [x, y, z] }) => y > 1 && y < 5)
              .map(({ line, position, idx }) =>
                <a-entity key={ idx } 
                position={ position.join(' ') } 
                geometry="primitive: plane; width: 100" 
                material="side: double; transparent: true; opacity: 0; color: #EF2D5E" /*scale="5 5 5"*/ 
                text={`value: ${line}; line-height: 30px; anchor: center; wrapCount: 1000; align: center;`} />
              )
            }
          </a-scene>
        </div>
      );
    } else return <DesktopVRView />
=======
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
>>>>>>> audio-stream-#27
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
