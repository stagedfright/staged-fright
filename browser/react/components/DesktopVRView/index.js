import React from 'react';
import styles from './styles';
import { MyNonSubmitButton } from '../uiElements';

const DesktopVRView = ({ override }) => (
    <div style={styles.container}>
    	<h3 style={styles.title}><strong>Welcome to StagedFright's VR speech practice mode!</strong></h3>
    	<h4>1. Allow microphone access on your desktop browser.<br/>
    		2. Navigate to the following URL on your VR-enabled mobile device:
    	</h4>
    	<h3><strong>{window.location.href}</strong></h3>
    	<br/>
    	<br/>
    	<div onClick={override}>
    		<h4>Alternatively, click the button below to override device check and proceed to VR speech practice in desktop mode.</h4>
    	{/*TODO: fix button styling that cuts off label text*/}
    		<MyNonSubmitButton />
    	</div>
    	<br/>
    	<br/>
    	<br/>
    	<h4><strong>Having trouble enabling VR in your desktop browser?</strong></h4>
    	<br/>
    	<h5>Follow these instructions to <a href="https://superuser.com/questions/836832/how-can-i-enable-webgl-in-my-browser">enable WebGL and WebVR in your browser</a>.
    	</h5> 
    </div>
)

export default DesktopVRView;
