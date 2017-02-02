import VRViewer from '../components/VRViewer';
import { connect } from 'react-redux';
import { finishRecording } from '../../redux/action-creators';

const mapStateToProps = state => ({
  speechLines: state.get('data').speechData.speechLines,
  wpm: state.get('data').speechData.wpm,
  // isInitialized: state.get('isInitialized')
});

const mapDispatchToProps = dispatch => ({
  showSummary: () => {
    dispatch(finishRecording);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VRViewer);