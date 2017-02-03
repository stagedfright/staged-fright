import React from 'react';
import styles from './styles';
import { MyRaisedButton } from '../uiElements';
import { Link } from 'react-router';

const DesktopVRView = ({ override }) => (
    <div>
    	<h3>1. Allow microphone access on your desktop browser.<br/>2. Navigate to this URL on your mobile device: </h3>
    	<h1>{window.location.href}</h1>

      <h3>Alternatively, you may proceed to VR practice mode on your desktop by clicking the following button.</h3>
      <Link onClick={override}><MyRaisedButton/></Link>
    </div>
)

export default DesktopVRView;
