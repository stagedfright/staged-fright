import {stream} from './startRecording';

var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var speech_to_text = new SpeechToTextV1 ({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD
});


  var params = {
    audio: stream,
    content_type: 'audio/flac',
    timestamps: true,
    word_alternatives_threshold: 0.9,
    keywords: ['colorado', 'tornado', 'tornadoes'],
    keywords_threshold: 0.5,
    continuous: true
  };

  speech_to_text.recognize(params, function(error, transcript) {
    if (error)
      console.log('Error:', error);
    else
      console.log(JSON.stringify(transcript, null, 2));
  });
