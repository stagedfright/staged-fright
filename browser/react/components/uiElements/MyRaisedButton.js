import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import { lightGreenA700 } from 'material-ui/styles/colors';


const MyRaisedButton = () => (
  <div>
    <RaisedButton 
      label="Let's go!" 
      backgroundColor={lightGreenA700} 
      style={styles.myraisedbutton} 
      labelStyle={styles.myraisedbuttonlabel} />
  </div>
);

export default MyRaisedButton;