import SelectionScreen from '../components/SelectionScreen';
import { connect } from 'react-redux';
import { populatePremadeSpeech } from '../../redux/action-creators';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  pickPremadeSpeech: (id) => {
    dispatch(populatePremadeSpeech(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectionScreen);
