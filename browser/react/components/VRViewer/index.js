import React, { Component } from 'react';
import styles from './styles';
import InitialLoading from '../InitialLoading';
import DesktopVRView from '../DesktopVRView';
import VolumeBar from '../VolumeBar';
import SpeechLine from '../SpeechLines';
import startRecordingUtil from './utils/startRecording';



export default class VRViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      at: 0,
      time: window.performance.now(),
      loading: true,
      clap: false,
      override: false,
    }

    this.meterInterval = null

    this.speechLines = this.props.speechLines;
    // this coefficient adjust the text scrolling speed based on user provided WMP value
    // the formula used was empirically verified
    this.coefficient = this.props.wpm * 0.000002084;
    // this is the delay (in ms) used for initialization of recording (5 sec after component starts mounting)
    this.initRecording = 5000;
    // the time needed for the whole speech rolling display with user defined WPM speed
    this.doneSpeaking = ((60*1000*(this.speechLines.length*8))/(this.props.wpm)) + 5000;
    this.startApplause = this.startApplause.bind(this);

    this.startRecording = startRecordingUtil.bind(this);
    this.override = this.override.bind(this);

  }

  override() {
    this.setState({ override: true })
  }

  startApplause() {
    this.setState({clap: true})
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 3500);
    this.tick(window.performance.now());
    setTimeout(this.startRecording, this.initRecording);
    setTimeout(this.props.showSummary, this.doneSpeaking + this.initRecording);
    setTimeout(this.startApplause, this.doneSpeaking + this.initRecording - 5000);
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
    const { at, loading } = this.state
    const scene = document.querySelector('a-scene');
    var volume = this.props.loudness * 30;

    if (this.state.override || navigator.userAgent.match('Mobi')) {

      if (loading) {
        return <InitialLoading />;
      } else return (
        <div style={styles.container}>
        {this.state.clap && <audio src='/bravo.mp3' autoPlay></audio>}
          <a-scene auto-enter-vr="false">
            <a-assets>
              <audio src="/CrowdNoise2.mp3" autoPlay loop></audio>
              <video muted id="mvp" autoPlay loop src="/DT_RNC.mp4" />
            </a-assets>
            <a-videosphere src="#mvp"></a-videosphere>
            <a-entity position="0 0 3.8">
              <a-camera rotation="-10.00 -44.00 0">
              </a-camera>
            </a-entity>


            <a-entity
              position="3 1 1.3"
              rotation="-4.00 -42.00 0"
              geometry="primitive: plane; width: 100"
              material="side: double; transparent: true; opacity: 0; color: #EF2D5E"
              text={`value: TESTING; line-height: 30px; anchor: center; wrapCount: 1000; align: center;`}>
            </a-entity>
            <VolumeBar volume={volume} />
            {this.speechLines
              .map((line, idx) => ({
                line, idx, position: [3, at - idx, 1.3]
              }))
              .filter(({ position: [x, y, z] }) => y > 1 && y < 5)
              .map(({ line, position, idx }) =>
                <SpeechLine key={idx} line={line} position={position} idx={idx}/>
            )}
          </a-scene>
        </div>
      );
    } else return <DesktopVRView override={this.override}/>
  }
}
