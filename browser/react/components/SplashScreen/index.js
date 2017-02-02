import React, { Component } from 'react';
import styles from './styles';
import { MyRaisedButton } from '../uiElements';
import { Link } from 'react-router';

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

        script.src = 'video-resize.js';
        script.async = true;

        document.body.appendChild(script);
    }

    render() {

    let overlayText = null;
		if (this.state.showMe) overlayText =
			<div style={styles.overlayText}>
				<h1 style={styles.overlayTextBig}>
					Choose StagedFright®
				</h1>
				<Link to={`${this.props.params.sessionKey}/new-speech`}>
					<MyRaisedButton/>
				</Link>
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
			        	src='openingvid.mp4'
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
