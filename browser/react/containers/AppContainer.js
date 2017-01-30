import VRViewer from '../components/VRViewer';
import { connect } from 'react-redux';
import { changeWelcomeText, changeLines } from '../../redux/action-creators';

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
  },

  scrollLines: (wpm, numOfLines) => {
    var interval = Math.floor((60 / (wpm / 7)) * 1000);
    var counter = 0;
    var scroller = setInterval(function() {
      dispatch(changeLines());
      console.log("SCROLL LINES HAS BEEN CALLED ", counter)
      if (++counter === numOfLines - 3) {
        window.clearInterval(scroller);
      }
    }, interval);
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(VRViewer);
