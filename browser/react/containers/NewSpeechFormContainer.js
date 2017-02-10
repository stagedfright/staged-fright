import NewSpeechForm from '../components/NewSpeechForm';
import { connect } from 'react-redux';
import { submitSpeechData } from '../../redux/action-creators';

const stripSpeechLines = lines => {
  return lines && lines.slice(3, lines.length - 3).join(' ');
};

const mapStateToProps = state => ({
  wpm: state.get('data').speechData ? state.get('data').speechData.wpm : 140,
  speechLines: state.get('data').speechData ? stripSpeechLines(state.get('data').speechData.speechLines) : '',
});

const mapDispatchToProps = dispatch => ({
  submitSpeechDataForm: (fields) => {
    //fields: { wpm, speechText }
    const splitter = (string) => {
    let arr = string.replace( /[\n\t]/g, ' ' ).split(' ');
    let speech = [], i=0, aLine = '';
    //split the speech into lines NO LONGER than 40 characters
    while (i<arr.length) {
      if ((aLine.length + arr[i].length)>40) {
        speech.push(aLine);
        aLine = '';
      } else aLine += ((arr[i++])+' ');
    }
    if (aLine !== '') speech.push(aLine);
    return speech;
  }

  const speechLines = ['3...', '2...', '1...']
    .concat(splitter(fields.speechText)
    .concat(['', 'You\'re done!']))
  dispatch(submitSpeechData({
  	wpm: fields.wpm,
  	speechLines,
  }));
  },

});




export default connect(mapStateToProps, mapDispatchToProps)(NewSpeechForm);
