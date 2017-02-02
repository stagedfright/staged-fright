import React, { Component } from 'react';
import styles from './styles';
import InitialLoading from '../InitialLoading';
import DesktopVRView from '../DesktopVRView';
//import {Entity, Scene} from 'aframe-react';
import {speech} from '../../../../public/speech-line-test-data.js';

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
    console.log("PROPS", props);
    this.state = {
      at: 0, 
      time: window.performance.now(),
      loading: true,
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({ loading: false }), 1500); 
    this.tick(window.performance.now())
  }

  tick = time => {
    const dt = time - this.state.time
    const at = this.state.at + 0.0005 * dt
    this.setState({ time, at })
    requestAnimationFrame(this.tick)
  }

  render () {
    const { handleSubmit, isInitialized } = this.props;
    const { at, loading } = this.state
    const scene = document.querySelector('a-scene');

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
