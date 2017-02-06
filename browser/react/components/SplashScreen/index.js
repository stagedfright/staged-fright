import React, { Component } from 'react';
import styles from './styles';
import { VRButton } from '../uiElements';
import { Link } from 'react-router';
import { teal300 } from 'material-ui/styles/colors';

export default class SplashScreen extends Component {

	constructor() {
	super();
        this.state = { showMe : false };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
       this.setState({ showMe : true });
    }

	componentWillMount() {
        const script = document.createElement('script');

        script.src = '/video-resize.js';
        script.async = true;

        document.body.appendChild(script);
    }

    render() {

    let overlayText = null;
		if (this.state.showMe) overlayText =
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
      				<Link to={`/${this.props.params.sessionKey}/select`}>
      					<VRButton label={"Let's Go!"} color={teal300} type={"submit"} style={{width: '40%'}}/>
      				</Link>
            </div>
            <div className="col s4">
            </div>
          </div>
  			</div>
      </div>;
		else overlayText =
			<a href="#" style={styles.overlayText}>
				<h1 style={styles.overlayTextBig}>
					Conquer stage fright.
				</h1>
				<h2 style={styles.overlayTextSmall}>(Click to continue)</h2>
			</a>;

    	return (
			<div id='container'
				style={styles.container}>
			    <video
			    	style={styles.video}
			    	id='background-video'
			    	loop muted autoPlay>
			        <source
			        	src='/openingvid.mp4'
			        	type='video/mp4'/>
			        Your browser does not support the video tag.
			    </video>
			    <div id='overlay'
			    	onClick={this.onClick}
			    	className='center'
			    	style={styles.overlay}>
				    {overlayText}
			    </div>
			</div>
			)
    	}
    };
