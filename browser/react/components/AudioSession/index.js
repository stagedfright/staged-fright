import React, { Component } from 'react';
import { stdSemitones, freqToMIDI, findFundamentalFreq } from './utils';

//put all audio stuff in a component that doesn't render anything, conncet to store, put it at the top of your page so it never goesa way, and dispatch things as needed to start/stop 

class AudioSession extends Component {
    constructor(props) {
        super(props);

        this.startRecording = startRecordingUtil.bind(this);
        this.meterInterval = null
        this.pitchInterval = null;

        this.pitchRafId = null;
        this.pitch = this.props.pitch || false;
        //an array of pitch measures, in MIDI values. Stores up to ten seconds' worth of data at once. 
        this.pitchDataPoints = [ 40 ];

        this.processPitch = pitchProcessingUtil.bind(this);

    }

    componentDidMount() {
        setTimeout(this.startRecording, 4000);
        setTimeout(this.processPitch, 6000);
    }

    startRecording() {
        navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);

        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var source;
        var stream;

        if (navigator.mediaDevices.getUserMedia) {
           navigator.mediaDevices.getUserMedia({ audio: true })
           .then((stream) => {
              this.stream = stream
              var soundMeter = window.soundMeter = new SoundMeter(this.audioCtx);

              soundMeter.connectToSource(stream, (e) => {
                if (e) {
                  alert(e);
                  return;
                }
                this.meterInterval = setInterval(() => {
                  this.props.syncData(soundMeter.slow.toFixed(2), this.pitch)
                }, 200);
              });
            })
           .catch(e => console.error('getUserMedia() failed: ' + e))
        }
    }

    streamReceived() {
        const micStream = this.stream; //when refactoring, pass in a stream bc this is opaque 

        const analyserAudioNode = this.audioCtx.createAnalyser();
        analyserAudioNode.fftSize = 2048;

        const sourceAudioNode = this.audioCtx.createMediaStreamSource(micStream);
        sourceAudioNode.connect(analyserAudioNode);

        const detectPitch = () => {

            var buffer = new Uint8Array(analyserAudioNode.fftSize);
            this.pitchDataPoints = this.pitchDataPoints.length > 249 ? this.pitchDataPoints.slice(1, 250) : this.pitchDataPoints.slice(); 
            //hacky workaround for extensibility error

            var bufferLength = analyserAudioNode.fftSize; 
            analyserAudioNode.getByteTimeDomainData(buffer); 
            var fundamentalFreq = findFundamentalFreq(buffer, this.audioCtx.sampleRate);
            if (fundamentalFreq !== -1) {
                this.pitchDataPoints.push(freqToMIDI(fundamentalFreq));
            } else this.pitchDataPoints.push(0);
            this.pitchRafId = window.requestAnimationFrame(detectPitch);
        };
        detectPitch();

        this.pitchInterval = setInterval(() => {
            const stdSemi = stdSemitones(this.pitchDataPoints.filter(e => e > 0));
            const monotonyBool = stdSemi < 3.5
            this.pitch = monotonyBool;
        }, 500);
    };

    render() {
        return(<div>{ this.props.children }</div>)
    }
}

export default DesktopVRView;
