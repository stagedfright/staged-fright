import React, {Component} from 'react';
import {Link} from 'react-router';
import HelpHint from '../HelpHint';
import HelpNote from '../HelpNote';
import styles from './styles';
import { teal300 } from 'material-ui/styles/colors';
import startRecordingUtil from '../VRViewer/utils/startRecording';

import { VRButton } from '../uiElements';

class DesktopVRView extends Component {
    constructor(props) {
        super(props);

        this.startRecording = startRecordingUtil.bind(this);
        this.meterInterval = null
    }

    componentDidMount() {
        setTimeout(this.startRecording, 4000);
    }

    render() {
        return(
        <div className="container">
            <div className="row">
                <div className="col s12" style={{backgroundColor: teal300 }} >
                    <h4 className="center" style={styles.center}>
                      <span style={{color: '#FFFFFF'}}>
                        Welcome to StagedFright's VR speech practice mode!
                      </span>
                    </h4>
                </div>
                <div className="col s6">
                    <div className="padded" style={styles.padded}>
                        <h4 className="center" style={styles.center}>Continue on Mobile</h4>
                        <ul className="list" style={styles.list}>
                            <li className="list" style={styles.list}>Allow microphone access on your desktop browser.</li>
                            <li className="list" style={styles.list}>Navigate to the following URL on your VR-enabled mobile device:</li>
                        </ul>
                        <p style={{fontSize: '18px'}}><strong>{window.location.href.replace(/choose-view/, "practice")}</strong></p>
                        <br/>
                        <Link to={`/${this.props.params.sessionKey}/feedback`}>
                            <VRButton label={"Click here when mobile VR finishes"} color={teal300} type={"submit"} onClick={this.props.handleClick} />
                        </Link>
                        <HelpNote />
                    </div>
                </div>
                <div className="col s6">
                    <div className="padded" style={styles.padded}>
                        <h4 className="center" style={styles.center}>Continue on Desktop</h4>
                        <ul>
                            <li className="list" style={styles.list}>Allow microphone access on your desktop browser.</li>
                            <li className="list" style={styles.list}>Click the button below to enter VR view:</li>
                        </ul>
                        <div>
                            <br/>
                            <Link to={`/${this.props.params.sessionKey}/practice`}>
                                <VRButton label={"Continue"} color={teal300} type={"submit"} />
                            </Link>
                            <br/>
                            <br/>
                        </div>
                        <HelpHint />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default DesktopVRView;
