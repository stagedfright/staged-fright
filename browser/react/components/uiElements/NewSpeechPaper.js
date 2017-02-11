import React from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles';

const MyPaper = () => (
  <div>
    <Paper style={styles.newspchPaper} zDepth={2}>
      Click here to input <br/> your own text
    </Paper>
  </div>
);

export default MyPaper;
