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
      <div style={styles.padded}>
        The speech you entered on the previous page has been formatted into lines, which will be scrolled at the speaking rate you selected.
        <br/>
        In addition to the on-screen teleprompter, StagedFright's graphic overlay also includes 2 indicators displaying real-time visual feedback on your performance:
        <br/>
        <div className="col s6">
          <ul className="list" style={styles.list}>
            <li className="list" style={styles.list}><strong>Volume Bar</strong>: The volume bar measures how well you’re projecting your voice. When it's green, you’re speaking at a loud enough level.</li>
            <li className="list" style={styles.list}><strong>Pitch Detector</strong>: The pitch detector measures changes in the tone of your voice, and will turn yellow if you speak in a monotone.</li>
          </ul>
          <br/>
          <p>
            <strong>Important Note</strong>: Whether you proceed on desktop or mobile, your voice will be recorded via your desktop browser. Therefore, please remain near your desktop for the most accurate real-time feedback!
          </p>
        </div>
        <div className="col s6">
          <img src="/screenshot.png" style={{ width: '100%', padding: '20px' }}/>
        </div>
      </div>
    );
  }
}

export default HowTo;
