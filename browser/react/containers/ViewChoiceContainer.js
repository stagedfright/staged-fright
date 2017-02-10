import DesktopVRView from '../components/DesktopVRView';
import { connect } from 'react-redux';
import { finishRecording, stopRecording} from '../../redux/action-creators';

const mapDispatchToProps = dispatch => ({
  showSummary: () => {
    dispatch(finishRecording);
  },

  stopAudio: () => {
    dispatch(stopRecording);
  },

  handleClick: () => {
    dispatch(stopRecording);
    dispatch(finishRecording);
  }

})

export default connect(null, mapDispatchToProps)(DesktopVRView);
