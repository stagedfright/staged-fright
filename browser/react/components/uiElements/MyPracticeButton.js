import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';
import { teal300 } from 'material-ui/styles/colors';

const MyPracticeButton = () => (
  <div>
    <RaisedButton 
      label="Let's Practice!"
      type="submit" 
      backgroundColor={teal300} 
      style={styles.myraisedbuttonpractice} 
      labelStyle={styles.myraisedbuttonlabel} />
  </div>
);

export default MyPracticeButton;