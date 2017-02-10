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
        The speech you just entered on the previous page has been formatted for you and will be scrolled at the speed selected.
        <br/>
        In addition to the speech text there will also be 2 graphic indicators providing you with a visual feedback of your performace:
        <br/>
        <div className="col s6">
          <ul className="list" style={styles.list}>
            <li className="list" style={styles.list}><strong>Volume Bar</strong>: The volume bar will indicate how well you’re projecting your voice. Green will indicate that you’re speaking at a loud enough level.</li>
            <li className="list" style={styles.list}><strong>Pitch Detector</strong>: The pitch detector looks at 10 second increments of your tone of voice, and determines whether or not you’re modulating your voice (green) or if you sound monotonous (yellow).</li>
          </ul>
          <br/>
          <p>
            <strong>Important Note</strong>: Whether or not you proceed on desktop or mobile, your voice will be recorded via your desktop browser. Therefore please stay near your desktop to get good results with real-time feedback!
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