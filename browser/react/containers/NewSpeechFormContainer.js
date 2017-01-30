import NewSpeechForm from '../components/NewSpeechForm';
import { connect } from 'react-redux';
import { submitSpeechData } from '../../redux/action-creators';

const mapStateToProps = state => ({
  wpm: state.get('wpm'),
  // speechLines: state.get('speechLines')
});

const mapDispatchToProps = dispatch => ({
  submitSpeechDataForm: (fields) => {
    // evt.preventDefault();
    //fields: { wpm, speechText }
    const speechLines = ['', '', ''].concat(fields.speechText.split('.').concat(['', '', '']))
    dispatch(submitSpeechData({
    	wpm: fields.wpm,
    	speechLines,
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSpeechForm);
