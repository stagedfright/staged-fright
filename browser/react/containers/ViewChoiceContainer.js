import DesktopVRView from '../components/DesktopVRView';
import { connect } from 'react-redux';
import { updateLoudness } from '../../redux/action-creators';

const mapStateToProps = state => ({
  loudness: state.get('data').speechData.loudness,
});

const mapDispatchToProps = dispatch => ({
  syncLoudness: (loudness) => {
    dispatch(updateLoudness(loudness));
  },
  handleClick: () => {
    this.stream && this.stream.getAudioTracks().forEach(track => track.stop())
    soundMeter.stop();
    clearInterval(this.meterInterval);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DesktopVRView);
