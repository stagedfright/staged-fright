import React, { Component } from 'react';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';

const Word = function(props) {

  function click(e) {
    e.preventDefault();
    props.onClick();
  }
  return (
    <span className="word arrow-box-container" onClick={click} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <a className="base--a" href="#">{props.alternatives[0].word}</a>
      {props.alternatives.length > 1
        ? (
          <sup>{props.alternatives.length}</sup>
        )
        : null}
      <ArrowBox direction="top" show={props.showDetails} color={Colors.purple_50}>
        <div style={{
          color: 'white'
        }}>
          <p>{props.start_time}s - {props.end_time}s</p>
          <ul className="base--ul">
            {props.alternatives.map(w => (
              <li key={w.word} className="base--li">{w.word}: {Math.round(w.confidence * 1000) / 10}%</li>
            ))}
          </ul>
        </div>
      </ArrowBox>
    </span>
  );
};

function Transcript(props) {
  try {

    const results = props.messages.map(msg => {
      // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
      // The result_index is for the first result in the message, so we need to count up from there to calculate the key.
      return msg.results.map((result, i) => (
        <span key={`result-${msg.result_index + i}`}>{result.alternatives[0].transcript}</span>
      ));
    }).reduce((a, b) => a.concat(b), []); // the reduce() call flattens the array
    return (
      <div>
        {results}
      </div>
    );
  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}

export default class InvisibleWatson extends Component {

  constructor(props) { //pass in stream as a prop
    super(props);
    this.state = {
      model: 'en-US_BroadbandModel',
      rawMessages: [],
      formattedMessages: [],
      audioSource: null,
      speakerLabels: false,
      keywords: '',
      // transcript model and keywords are the state that they were when the button was clicked.
      // Changing them during a transcription would cause a mismatch between the setting sent to the service and what is displayed on the demo, and could cause bugs.
    };
  }

  reset() {
    if (this.state.audioSource) {
      this.stopTranscription();
    }
    this.setState({ rawMessages: [], formattedMessages: [] });
  }

  startRecording() {
    console.log('this is my stream');
    navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source;
    var stream;

    if (navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia({ audio: true })
       .then((stream) => {
          this.stream = stream;
        })
       .catch(e => console.error('getUserMedia() failed: ' + e))
    }
  },

  stopTranscription() {
    //this.stream && this.stream.stop();
    console.log(this.stream);
    this.setState({audioSource: null});
  },

  getRecognizeOptions(extra) {
    var keywords = this.getKeywordsArr();
    return Object.assign({
      mediaStream: this.props.stream,
      token: this.state.token, smart_formatting: true, // formats phone numbers, currency, etc. (server-side)
      format: true, // adds capitals, periods, and a few other things (client-side)
      model: this.state.model,
      objectMode: true,
      interim_results: true,
      continuous: true,
      word_alternatives_threshold: 0.01, // note: in normal usage, you'd probably set this a bit higher
      keywords: keywords,
      keywords_threshold: keywords.length
        ? 0.01
        : undefined, // note: in normal usage, you'd probably set this a bit higher
      timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
      speaker_labels: this.state.speakerLabels, // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
      resultsBySpeaker: this.state.speakerLabels, // combines speaker_labels and results together into single objects, making for easier transcript outputting
      speakerlessInterim: this.state.speakerLabels // allow interim results through before the speaker has been determined
    }, extra);
  },

  handleMicClick() {
    // if (this.state.audioSource === 'mic') {
    //   return this.stopTranscription();
    // }
    // this.reset();
    this.startRecording()
    .then(() => {
      this.setState({audioSource: 'mic'});
      // The recognizeMicrophone() method is a helper method provided by the watson-speach package
      // It sets up the microphone, converts and downsamples the audio, and then transcribes it over a WebSocket connection
      // It also provides a number of optional features, some of which are enabled by default:
      //  * enables object mode by default (options.objectMode)
      //  * formats results (Capitals, periods, etc.) (options.format)
      //  * outputs the text to a DOM element - not used in this demo because it doesn't play nice with react (options.outputElement)
      //  * a few other things for backwards compatibility and sane defaults
      // In addition to this, it passes other service-level options along to the RecognizeStream that manages the actual WebSocket connection.
      this.handleStream(recognizeMicrophone(this.getRecognizeOptions()));
    });
  },


  handleStream(stream) {
    // cleanup old stream if appropriate
    // if (this.stream) {
    //   this.stream.stop();
    //   this.stream.removeAllListeners();
    //   this.stream.recognizeStream.removeAllListeners();
    // }
    this.stream = stream;
    this.captureSettings();

    // grab the formatted messages and also handle errors and such
    stream.on('data', this.handleFormattedMessage).on('end', this.handleTranscriptEnd);  //possibly eventually implement error handling for w/e 

    // when errors occur, the end event may not propagate through the helper streams.
    // However, the recognizeStream should always fire a end and close events
    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });

    // grab raw messages from the debugging events for display on the JSON tab
    stream.recognizeStream
      .on('message', (frame, json) => this.handleRawdMessage({sent: false, frame, json}))
      .on('send-json', json => this.handleRawdMessage({sent: true, json}))
      .once('send-data', () => this.handleRawdMessage({
        sent: true, binary: true, data: true // discard the binary data to avoid wasting memory
      }))
      .on('close', (code, message) => this.handleRawdMessage({close: true, code, message}));

    // ['open','close','finish','end','error', 'pipe'].forEach(e => {
    //     stream.recognizeStream.on(e, console.log.bind(console, 'rs event: ', e));
    //     stream.on(e, console.log.bind(console, 'stream event: ', e));
    // });
  }

  handleRawdMessage(msg) {
    console.log('formatted', this.state.formattedMessages);
    console.log('raw', this.state.rawMessages);
    this.setState({rawMessages: this.state.rawMessages.concat(msg)});
  }

  handleFormattedMessage(msg) {
    this.setState({formattedMessages: this.state.formattedMessages.concat(msg)});
  }

  handleTranscriptEnd() { //connected to our shit 
    // note: this function will be called twice on a clean end,
    // but may only be called once in the event of an error
    this.setState({audioSource: null}); 
  }

  componentDidMount() {
    this.fetchToken();
    // tokens expire after 60 minutes, so automatcally fetch a new one ever 50 minutes
    // Not sure if this will work properly if a computer goes to sleep for > 50 minutes and then wakes back up
    // react automatically binds the call to this

    this.setState({'tokenInterval' : setInterval(this.fetchToken, 50 * 60 * 1000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.tokenInterval);
  }

  fetchToken() {
    return fetch('/api/token').then(res => {
      if (res.status != 200) {
        throw new Error('Error retrieving auth token');
      }
      return res.text();
    }). // todo: throw here if non-200 status
    then(token => this.setState({token})).catch(this.handleError);
  }

  handleKeywordsChange(e) {
    this.setState({keywords: e.target.value});
  }

  // cleans up the keywords string into an array of individual, trimmed, non-empty keywords/phrases
  getKeywordsArr() {
    return this.state.keywords.split(',').map(k => k.trim()).filter(k => k);
  }

  getFinalResults() {
    console.log(this.state.formattedMessages.filter(r => r.results && r.results.length && r.results[0].final));
    return this.state.formattedMessages.filter(r => r.results && r.results.length && r.results[0].final);
  }

  getCurrentInterimResult() {
    const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];

    // When resultsBySpeaker is enabled, each msg.results array may contain multiple results. However, all results
    // in a given message will be either final or interim, so just checking the first one still works here.
    if (!r || !r.results || !r.results.length || r.results[0].final) {
      return null;
    }
    return r;
  }

  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    return final;
  }

  render() {
    const messages = this.getFinalAndLatestInterimResult();
    return (
      <div>
      <div className="flex buttons">

          <button className={micButtonClass} onClick={this.handleMicClick}> {/*we should know what handlemicclick does so we can use it */}
            <Icon type={this.state.audioSource === 'mic' ? 'stop' : 'microphone'} fill={micIconFill} /> Record Audio
          }
          </button>

        </div>

        <Tabs selected={0}>
          <Pane label="Text">
            {this.state.settingsAtStreamStart.speakerLabels
              // ? <SpeakersView messages={messages}/>
              : <Transcript messages={messages}/>}
          </Pane>
          <Pane label="Word Timings and Alternatives">
            <TimingView messages={messages}/>
          </Pane>
          {/*<Pane label={'Keywords ' + getKeywordsSummary(this.state.settingsAtStreamStart.keywords, messages)}>
            <Keywords messages={messages} keywords={this.state.settingsAtStreamStart.keywords} isInProgress={!!this.state.audioSource}/>
          </Pane>*/}
          <Pane label="JSON">
            <JSONView raw={this.state.rawMessages} formatted={this.state.formattedMessages}/>
          </Pane>
        </Tabs>

</div>    );
  }
};
