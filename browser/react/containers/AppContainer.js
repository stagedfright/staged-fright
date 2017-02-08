import VRViewer from '../components/VRViewer';
import { connect } from 'react-redux';
import { finishRecording, updateLoudness, updatePitch } from '../../redux/action-creators';

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

  syncLoudness: (loudness) => {
  	dispatch(updateLoudness(loudness));
  },

  syncPitchData: (pitchArray) => {
  	dispatch(updatePitch(pitchArray));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(VRViewer);