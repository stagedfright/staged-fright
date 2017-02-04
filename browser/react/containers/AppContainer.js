import VRViewer from '../components/VRViewer';
import { connect } from 'react-redux';
import { finishRecording, updateLoudness } from '../../redux/action-creators';

const mapStateToProps = state => ({
  speechLines: state.get('data').speechData.speechLines,
  wpm: state.get('data').speechData.wpm,
  loudness: state.get('data').speechData.loudness,
});

const mapDispatchToProps = dispatch => ({
  showSummary: () => {
    dispatch(finishRecording);
  }, 
  syncLoudness: (loudness) => {
  	dispatch(updateLoudness(loudness));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VRViewer);