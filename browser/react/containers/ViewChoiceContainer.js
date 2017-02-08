import DesktopVRView from '../components/DesktopVRView';
import { connect } from 'react-redux';
import { updateData } from '../../redux/action-creators';

const mapStateToProps = state => ({
  loudness: state.get('data').speechData.loudness,
  pitch: state.get('data').speechData.pitch,
});

const mapDispatchToProps = dispatch => ({
  syncData: (loudness, monotonyBool) => {
    dispatch(updateData(loudness, monotonyBool));
  },

  handleClick: () => {
    this.stream && this.stream.getAudioTracks().forEach(track => track.stop())
    soundMeter.stop();
    clearInterval(this.meterInterval);
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(DesktopVRView);
