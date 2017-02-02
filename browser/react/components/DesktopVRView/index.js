import React from 'react';
import styles from './styles';

const DesktopVRView = () => (
    <div>
    	<h3>1. Allow microphone access on your desktop browser.<br/>2. Navigate to this URL on your mobile device: </h3>
    	<h1>{window.location.href}</h1>
    </div>
)

export default DesktopVRView;
