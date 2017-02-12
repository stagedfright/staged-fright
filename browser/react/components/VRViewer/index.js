import React, { Component } from 'react';
import styles from './styles';
import InitialLoading from '../InitialLoading';
import VolumeBar from '../VolumeBar';
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
    this.props.startAudio();

    setTimeout(this.props.stopAudio, this.doneSpeaking + this.initRecording);
    setTimeout(this.startApplause, this.doneSpeaking);
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.tickRafId);
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
        {this.state.clap && <audio src='/assets/audio/bravo.mp3' autoPlay></audio>}
          <a-scene>
            <a-assets>
              <audio src="/assets/audio/CrowdNoise4.mp3" autoPlay loop></audio>
              <video muted id="mvp" autoPlay loop src="/assets/videos/DT_RNC.mp4" />
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
                      position="2959.52 543.21 -2541.69"
                      rotation="0 -49 0"
                      scale="5 2 1"
                      material="color: black"></a-entity>
            <a-entity text="value: Turn around!\nYour fans are waiting!"
                      position="-70 44.50 70.68"
                      rotation="0 180 0"
                      scale="100 100 100"></a-entity>
            <a-entity geometry="primitive: box; height: 80px; width: 200px"
                      position="-40.27 139.62 -39.42"
                      rotation="48.30 -11.12 0.18"
                      material="color: black"></a-entity>
            <VolumeBar volume={volume} />
            {this.speechLines
              .map((line, idx) => ({
                line, idx, position: [3, scrollOffset - idx, 1.3]
              }))
              .filter(({ position: [x, y, z] }) => y > 1 && y < 5)
              .map(({ line, position, idx }) =>
                <a-entity key={idx} idx={idx}>
                  <a-entity
                    position={`3.01 ${position[1]} 1.29`}
                    rotation="-4.00 -42.00 0"
                    scale="1.015 1.015 1.015"
                    geometry="primitive: plane; width: 100"
                    material="side: double; transparent: true; opacity: 0; color: #000000;"
                    text={`value: ${line}; line-height: 30px; anchor: center; wrapCount: 1000; align: center; color: black`}>
                  </a-entity>
                  <a-entity
                    position={ position.join(' ') }
                    rotation="-4.00 -42.00 0"
                    geometry="primitive: plane; width: 100"
                    material="side: double; transparent: true; opacity: 0; color: #EF2D5E"
                    text={`value: ${line}; line-height: 30px; anchor: center; wrapCount: 1000; align: center;`}>
                  </a-entity>
                </a-entity>
            )}
          </a-scene>
        </div>
      );
  }
}
