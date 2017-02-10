import React, {Component} from 'react';
import styles from './styles';

class HowTo extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.revealHowTo();
  }

  render() {
    return (
      <div style={styles.padded}>Here is some info on how to use It!!!!</div>
    );
  }
}

export default HowTo;