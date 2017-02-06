import FeedbackForm from '../components/FeedbackForm';
import { connect } from 'react-redux';
import { sendFeedback } from '../../redux/action-creators';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  submitFeedback: (fields) => {
    dispatch(sendFeedback(fields));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
