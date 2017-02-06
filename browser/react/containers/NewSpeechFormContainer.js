import NewSpeechForm from '../components/NewSpeechForm';
import { connect } from 'react-redux';
import { submitSpeechData } from '../../redux/action-creators';

const mapStateToProps = state => ({
  wpm: state.get('wpm'),
});

const mapDispatchToProps = dispatch => ({
  submitSpeechDataForm: (fields) => {
    // evt.preventDefault();
    //fields: { wpm, speechText }
    function splitter(string) {
      var arr = string.replace( /[\n\t]/g, ' ' ).split(' ');
      var speech = [];
      for (var i = 0; i < arr.length; i += 8) {
        speech.push(arr.slice(i, i+8));
      }
      var finalSpeech = speech.map(function(lineArray) {
        return lineArray.join(' ');
      })
      return finalSpeech;
    }

    const speechLines = ['3...', '2...', '1...'].concat(splitter(fields.speechText).concat(['', '', 'You\'re done!']))
    dispatch(submitSpeechData({
    	wpm: fields.wpm,
    	speechLines,
    }));
  }
});




export default connect(mapStateToProps, mapDispatchToProps)(NewSpeechForm);
