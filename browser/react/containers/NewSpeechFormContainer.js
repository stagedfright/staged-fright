import NewSpeechForm from '../components/NewSpeechForm';
import { connect } from 'react-redux';
import { setSpeechData } from '../../redux/action-creators';

const mapStateToProps = state => ({
  wpm: state.get('wpm'),
  // speechLines: state.get('speechLines')
});

const mapDispatchToProps = dispatch => ({
  submitSpeechData: (fields) => {
    // evt.preventDefault();
    //fields: { wpm, speechText }
    const speechLines = ['', '', ''].concat(fields.speechText.split('.').concat(['', '', '']))
    dispatch(setSpeechData({
    	wpm: fields.wpm,
    	speechLines,
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSpeechForm);
