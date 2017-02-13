import React, { Component } from 'react';
import styles from './styles';
import { VRButton } from '../uiElements';
import { Link } from 'react-router';
import { teal300 } from 'material-ui/styles/colors';

export const OverlayText1 = () => (
  <a href="#" style={styles.overlayText}>
    <h1 style={styles.overlayTextBig}>
      Conquer stage fright.
    </h1>
    <h2 style={styles.overlayTextSmall}>(Click to continue)</h2>
  </a>
);

export const OverlayText2 = ({ sessionKey }) => (
  <div className="container">
    <div style={styles.overlayText}>
      <div className="row">
        <h1 style={styles.overlayTextBig}>
          Choose StagedFright®
        </h1>
      </div>
      <div className="row">
        <div className="col s4">
        </div>
        <div className="col s4">
          <Link to={`/${sessionKey}/select`}>
            <VRButton label={"Let's Go!"} color={teal300} type={"submit"} />
          </Link>
        </div>
        <div className="col s4">
        </div>
      </div>
    </div>
  </div>
);

const appendVideoResizeScript = () => {
  // appends a script element that dynamically resizes the background video. 
  const script = document.createElement('script');

  script.src = '/scripts/video-resize.js';
  script.async = true;

  document.body.appendChild(script);
}

export const toggleShowMe = state => Object.assign({}, state, { showMe : true });

export default class SplashScreen extends Component {

	constructor(props) {
    super();
    this.state = { showMe : false };
  }

	componentWillMount() {
    this.props.compWillMount();
  }

  onClick = () => this.setState(this.props.onClick(this.state))

  render() {
    const sessionKey = this.props.params.sessionKey;

  	return (
    	<div id='container'
    		style={styles.container}>
    	    <video
    	    	style={styles.video}
    	    	id='background-video'
    	    	loop muted autoPlay>
    	        <source
    	        	src='/assets/videos/openingvid.mp4'
    	        	type='video/mp4'/>
    	        Your browser does not support the video tag.
    	    </video>
    	    <div id='overlay'
    	    	onClick={this.onClick}
    	    	className='center'
    	    	style={styles.overlay}>
    		    { 
              this.state.showMe 
              ? <OverlayText2 sessionKey={sessionKey}/> 
              : <OverlayText1 /> 
            }
    	    </div>
    	</div>
    )
	}
};

// making methods props passed in facilitates testing
SplashScreen.defaultProps = {
  onClick: toggleShowMe,
  compWillMount: appendVideoResizeScript,
};
