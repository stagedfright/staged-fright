import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { MyRaisedButton } from '../uiElements';

export default class NewSpeechForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      wpm: props.wpm, 
      speechText: 'Copy and paste your speech text here.',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = field => event => {
    const value = event.target.value;

    this.setState({
      [`${field}`]: value
    })
    console.log('changed!', this.state);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitSpeechData({
      wpm: this.state.wpm,
      speechText: this.state.speechText
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="wpm-field-controlled"
          floatingLabelText="Words per minute (average is 110-150)"
          type="number"
          value={this.state.wpm}
          onChange={this.handleChange('wpm')}
        />
        <br />
        <TextField
          id="speechtext-field-controlled"
          floatingLabelText="Speech text"
          multiLine={true}
          rows={20}
          value={this.state.speechText}
          onChange={this.handleChange('speechText')}
        />
        <br />
        <MyRaisedButton/>
      </form>
    );
  }
}