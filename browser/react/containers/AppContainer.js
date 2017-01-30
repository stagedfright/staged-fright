import VRViewer from '../components/VRViewer';
import { connect } from 'react-redux';
import { changeWelcomeText } from '../../redux/action-creators';

const mapStateToProps = state => ({
  speechLines: state.get('speechLines'),
  wpm: state.get('wpm'),
  prevLine: state.get('prevLine'),
  currentLine: state.get('currentLine'),
  nextLine: state.get('nextLine'),
  isInitialized: state.get('isInitialized')
});

// Handles the enter key changing the welcomeText.
const mapDispatchToProps = dispatch => ({
  handleSubmit: (evt) => {
    evt.preventDefault();
    dispatch(changeWelcomeText(evt.target.textField.value));
    evt.target.textField.value = '';
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VRViewer);
