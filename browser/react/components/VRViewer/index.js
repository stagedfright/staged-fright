import React, { Component } from 'react';
import styles from './styles';
import InitialLoading from '../InitialLoading';
import DesktopVRView from '../DesktopVRView';
import { speech } from '../../../../public/speech-line-test-data.js';
import { SoundMeter } from './utils/loudness';

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      at: 0,
      time: window.performance.now(),
      loading: true,
      overrideVR: false,
    }

    this.meterInterval = null;
    this.speechLines = this.props.speechLines;
    // this coefficient adjust the text scrolling speed based on user provided WMP value
    // the formula used was empirically verified
    this.coefficient = this.props.wpm * 0.000002084;
    // this is the delay (in ms) used for initialization of recording (5 sec after component starts mounting)
    this.initRecording = 5000;
    // the time needed for the whole speech rolling display with user defined WPM speed
    this.doneSpeaking = ((60*1000*(this.speechLines.length*8))/(this.props.wpm)) + 1000;
    this.startRecording = this.startRecording.bind(this);
    this.override = this.override.bind(this);
    
  }

  override() {
    this.setState({
      overrideVR: true
    });
    this.forceUpdate();
  }


  startRecording() {
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
       navigator.mediaDevices.getUserMedia({ audio: true })
       .then((stream) => {
          this.stream = stream
          var soundMeter = window.soundMeter = new SoundMeter(audioCtx);
                soundMeter.connectToSource(stream, (e) => {
                  if (e) {
                    alert(e);
                    return;
                  }
                  this.meterInterval = setInterval(() => {
                    const loudness = soundMeter.slow.toFixed(2);
                    this.props.syncLoudness(loudness);
                  }, 200);
                });
            //connect audio context to the stream we created
             // source = audioCtx.createMediaStreamSource(stream);
             // source.connect(analyser);
             // this.streamToStore(analyser);
        })
       .catch(e => console.error('getUserMedia() failed: ' + e))
    }
  }


  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 1500);
    this.tick(window.performance.now());
    setTimeout(this.startRecording, this.initRecording);
    // Commented out while testing the visualization
    // setTimeout(this.props.showSummary, this.doneSpeaking + this.initRecording);
  }

  componentWillUnmount () {

    cancelAnimationFrame(this.tickRafId)
    this.stream && this.stream.getAudioTracks().forEach(track => track.stop())
    soundMeter.stop();
    clearInterval(this.meterInterval);
  }

  tick = time => {
    const dt = time - this.state.time
    const at = this.state.at + this.coefficient * dt
    this.setState({ time, at })
    this.tickRafId = requestAnimationFrame(this.tick)
  }

  render () {
    const { handleSubmit, isInitialized } = this.props;
    const { at, loading } = this.state
    const scene = document.querySelector('a-scene');
    var volume = this.props.loudness * 30;
    function colorChange(volume) {
      if (volume < 2.1) {
        return `#FF0000`
      } else if (volume < 3.6) {
        return `#FFFF00`
      } else {
        return `#00FF00`
      }
    }

    if (this.state.overrideVR || navigator.userAgent.match('Mobi')) {
      if (loading) {
        return <InitialLoading />;
      } else return (
        <div style={styles.container}>
          <a-scene auto-enter-vr="false">
            <a-assets>
              <video muted id="mvp" autoPlay loop src="/DT_RNC.mp4" />
            </a-assets>
            <a-videosphere src="#mvp"></a-videosphere>
            <a-entity position="0 0 3.8">
              <a-camera>
              </a-camera>
            </a-entity>
            <a-box  color="gray"
                    position="-7.38 0.88 -4.53"
                    rotation="0 7.42 0"
                    depth="0.2"
                    height="6"
                    width=".7">
            </a-box>
            <a-box  color={colorChange(volume)}
                    position={`
                      -7.38
                      ${-2.12 + volume/2}
                      -4.32
                    `}
                    rotation="0 7.42 0"
                    depth="0.2"
                    height={volume}
                    width=".7"
                    anchor="bottom">
              </a-box>
            <a-entity position="-3.26 0.87 -4.24" 
                      scale="10 10 10" 
                      text="value: V\nO\nL\nU\nM\nE; line-height: 30px;">
            </a-entity>

            {
              this.speechLines
              .map((line, idx) => ({
                line, idx, position: [0.28, at - idx, -0.26]
              }))
              .filter(({ position: [x, y, z] }) => y > 1 && y < 5)
              .map(({ line, position, idx }) =>
                <a-entity 
                key={ idx }
                position={ position.join(' ') }
                geometry="primitive: plane; width: 100"
                material="side: double; transparent: true; opacity: 0; color: #EF2D5E"
                text={`value: ${line}; line-height: 30px; anchor: center; wrapCount: 1000; align: center;`} />
              )
            }
          </a-scene>
        </div>
      );
    } else return <DesktopVRView override={this.override}/>
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
