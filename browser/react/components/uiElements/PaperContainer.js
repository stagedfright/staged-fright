import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '90%',
  paddingTop: '10vh',
  height: '100%',
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleRounded = () => (
  <div>
    <Paper style={style} zDepth={2} rounded={false} />
  </div>
);

export default PaperExampleRounded;