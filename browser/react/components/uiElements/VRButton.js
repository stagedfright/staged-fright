import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles';

const VRButton = (props) => (
    <RaisedButton
      label={props.label}
      type={props.type}
      backgroundColor={props.color}
      style={styles.VRButton}
      width={props.width}
      labelStyle={styles.myraisedbuttonlabel} />
);

export default VRButton;
