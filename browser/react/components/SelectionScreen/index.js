import React from 'react';
import styles from './styles';
import { 
    MyNonSubmitButton, 
    OldSpeechPaper, 
    NewSpeechPaper, 
    SpeechSelectList, 
    // PaperContainer 
} from '../uiElements';
import { Link } from 'react-router';
import { teal300 } from 'material-ui/styles/colors';

const SelectionScreen = (props) => (
      <div className="container" style={styles.container}>
        <div className="row">
          <div className="col s12" style={{backgroundColor: teal300 }} >
            <h4>
                <span className='flow-text' style={styles.title}>
                    How will you enjoy StagedFright today?
                </span>
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col s6" style={styles.col}>
            <h5 style={styles.subtitle}>Practice Your Speech</h5>
            <Link to={`/${props.params.sessionKey}/new-speech`}>
                <NewSpeechPaper/>
            </Link>
          </div>
          <div className="col s6" style={styles.col}>
            <h5 style={styles.subtitle}>Practice a Famous Speech</h5>
            <SpeechSelectList/>
          </div>
        </div>
      </div>
)

export default SelectionScreen;
