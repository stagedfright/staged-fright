import React, { Component } from 'react';
import styles from './styles';
import InitialLoading from '../InitialLoading';
import DesktopVRView from '../DesktopVRView';
import VolumeBar from '../VolumeBar';
import SpeechLine from '../SpeechLines';
import 'aframe';
import PitchTracker from '../PitchTracker';

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
      time: window.performance.now(),
      loading: true,
      clap: false,
    }

    this.meterInterval = null;

    this.speechLines = this.props.speechLines;
    // this coefficient adjust the text scrolling speed based on user provided WMP value
    // the formula used was empirically verified
    this.coefficient = this.props.wpm * 0.000002084;
    this.initRecording = 5000;
    // the time needed for the whole speech rolling display with user defined WPM speed
    this.doneSpeaking = ((60*1000*(this.speechLines.length*8))/(this.props.wpm)) + 5000;
    this.startApplause = this.startApplause.bind(this);

  }

  startApplause() {
    this.setState({clap: true})
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 3500);
    this.tick(window.performance.now());

    setTimeout(this.props.showSummary, this.doneSpeaking + this.initRecording);
    setTimeout(this.startApplause, this.doneSpeaking + this.initRecording - 5000);
  }

  //dispatch stuff in CWU to stop audio stream 
  componentWillUnmount () {
    cancelAnimationFrame(this.tickRafId);
    cancelAnimationFrame(this.pitchRafId);
    this.stream && this.stream.getAudioTracks().forEach(track => track.stop());
    soundMeter.stop();
    clearInterval(this.meterInterval);
    clearInterval(this.pitchInterval);
  }

  tick = time => {
    const dt = time - this.state.time
    const scrollOffset = this.state.scrollOffset + this.coefficient * dt
    this.setState({ time, scrollOffset })
    this.tickRafId = requestAnimationFrame(this.tick)
  }

  render () {
    const { scrollOffset, loading } = this.state
    const scene = document.querySelector('a-scene');
    var volume = this.props.loudness * 30;
    var pitch = this.props.pitch;

      if (loading) {
        return <InitialLoading />;
      } else return (
        <div style={styles.container}>
        {this.state.clap && <audio src='/bravo.mp3' autoPlay></audio>}
          <a-scene auto-enter-vr="false">
            <a-assets>
              <audio src="/CrowdNoise4.mp3" autoPlay loop></audio>
              <video muted id="mvp" autoPlay loop src="/DT_RNC.mp4" />
              <canvas id="my-canvas" crossOrigin="anonymous"></canvas>
            </a-assets>
            <a-videosphere src="#mvp"></a-videosphere>
            <a-entity position="0 0 3.8">
              <a-camera rotation="-10.00 -44.00 0">
              </a-camera>
            </a-entity>
            <PitchTracker pitch={pitch} />
            <a-entity geometry="primitive: box; height: 50px; width: 80px"
                      position="-53 46 72"
                      material="color: gray"></a-entity>
            <a-entity geometry="primitive: box; height: 80px; width: 200px"
                      position="-40.27 139.62 -39.42"
                      rotation="48.30 -11.12 0.18"
                      material="color: black"></a-entity>
            <a-entity text="value: Turn around!\nYour fans are waiting!"
                      position="-70 44.50 70.68"
                      rotation="0 180 0"
                      scale="100 100 100"></a-entity>
            <VolumeBar volume={volume} />
            {this.speechLines
              .map((line, idx) => ({
                line, idx, position: [3, scrollOffset - idx, 1.3]
              }))
              .filter(({ position: [x, y, z] }) => y > 1 && y < 5)
              .map(({ line, position, idx }) =>
                <SpeechLine key={idx} line={line} position={position} idx={idx}/>
            )}
          </a-scene>
        </div>
      );
  }
}
