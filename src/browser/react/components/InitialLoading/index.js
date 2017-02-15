import React from 'react';
import styles from './styles';
import CircularProgress from 'material-ui/CircularProgress';

export default () => (
	<div style={styles.container}>
  		<CircularProgress style={styles.progress} size={50} thickness={7} />
  	</div>
);
