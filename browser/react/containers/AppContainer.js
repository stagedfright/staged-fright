import VRViewer from '../components/VRViewer';
import { connect } from 'react-redux';
import { finishRecording, startRecording, stopRecording} from '../../redux/action-creators';

const mapStateToProps = state => ({
  speechLines: state.get('data').speechData.speechLines,
  wpm: state.get('data').speechData.wpm,
  loudness: state.get('data').speechData.loudness,
  pitch: state.get('data').speechData.pitch,
});

const mapDispatchToProps = dispatch => ({
  showSummary: () => {
    dispatch(finishRecording);
  },

  startAudio: () => {
    dispatch(startRecording);
  },

  stopAudio: () => {
    dispatch(stopRecording);
    dispatch(finishRecording);
    //TO DO: combine finish recording and stop recording
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VRViewer);
