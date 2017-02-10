import AudioSession from '../components/AudioSession';
import { connect } from 'react-redux';
import { updateData } from '../../redux/action-creators';

const mapStateToProps = state => ({
  pitch: state.get('data').speechData
    ? state.get('data').speechData.pitch
    : false,
  recording: state.get('data').speechData
    ? state.get('data').speechData.recording
    : false
});

const mapDispatchToProps = dispatch => ({
  syncData: (loudness, monotonyBool) => {
    dispatch(updateData(loudness, monotonyBool));
  },

  startAudio: () => {
    dispatch(startRecording);
  },

  stopAudio: () => {
    dispatch(stopRecording);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioSession);
