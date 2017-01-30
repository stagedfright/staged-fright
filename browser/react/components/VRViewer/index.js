import React, { Component } from 'react';
import styles from './styles';
// import BasicSingleLineInput from '../BasicSingleLineInput';
// import InitialLoading from '../InitialLoading';
//import {Entity, Scene} from 'aframe-react';
import {speech} from '../../../../public/speech-line-test-data.js'

export default class VRViewer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.scrollLines(this.props.wpm, this.props.speechLines.length)
  }

  render () {
    const { handleSubmit, isInitialized } = this.props;

    return (
      <div>
        <a-scene>
          <a-assets>
            <video muted id="mvp" autoplay loop src="DT_RNC.mp4" />
          </a-assets>
          <a-videosphere src="#mvp"></a-videosphere>
          <a-entity position="0 0 3.8">
            <a-camera>
            </a-camera>
          </a-entity>
          <a-entity position=".28 4 -.26" scale="5 5 5" text={`value: ${this.props.speechLines[this.props.prevLine]}; lineHeight: 50px;`}>
          </a-entity>
          <a-entity position=".28 3 -.26" scale="5 5 5" text={`value: ${this.props.speechLines[this.props.currentLine]}; lineHeight: 50px;`}>
          </a-entity>
          <a-entity position=".28 2 -.26" scale="5 5 5" text={`value: ${this.props.speechLines[this.props.nextLine]}; lineHeight: 50px;`}>
          </a-entity>
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
