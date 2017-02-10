import ViewChoice from '../components/ViewChoice';
import { connect } from 'react-redux';
import { stopRecording } from '../../redux/action-creators';

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch(stopRecording);
    // stops recording and moves to summary page
  },

  onHint: () => {
    }
})

const mapStateToProps = (state) => ({
  showHint: false
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewChoice);
