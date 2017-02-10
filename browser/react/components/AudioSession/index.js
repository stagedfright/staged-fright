import React, { Component } from 'react';
import { stdSemitones, freqToMIDI, findFundamentalFreq, SoundMeter } from './utils';

//put all audio stuff in a component that doesn't render anything, conncet to store, put it at the top of your page so it never goesa way, and dispatch things as needed to start/stop

class AudioSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recording: false
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.meterInterval = null;
        this.pitchInterval = null;

        this.pitchRafId = null;
        this.pitch = props.pitch || false;
        //an array of pitch measures, in MIDI values. Stores up to ten seconds' worth of data at once.
        this.pitchDataPoints = [ 40 ];

        this.processPitch = this.processPitch.bind(this);

    }

    startRecording() {
        console.log("START RECORDING IS RECORDING FROM AUDIO SESSIONS PART 1")
        if (navigator.userAgent.match('Mobi')) return;
        navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);
        console.log("START RECORDING IS RECORDING FROM AUDIO SESSIONS PART 2")
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        if (navigator.mediaDevices.getUserMedia) {
           navigator.mediaDevices.getUserMedia({ audio: true })
           .then((stream) => {
              this.stream = stream
              this.processPitch(this.audioCtx, this.stream)
              console.log("AUDIO CONTEXT: ", this.audioCtx, "STREAM: ", stream);
              var soundMeter = window.soundMeter = new SoundMeter(this.audioCtx);

              soundMeter.connectToSource(stream, (e) => {
                if (e) {
                  alert(e);
                  return;
                }
                this.meterInterval = setInterval(() => {
                    console.log("SOUND METER ", soundMeter.slow.toFixed(2), this.pitch)
                  this.props.syncData(soundMeter.slow.toFixed(2), this.pitch)
                }, 200);
              });
            })
           .catch(e => console.error('getUserMedia() failed: ' + e))
        }
    }

    processPitch(context, stream) {

        const analyserAudioNode = context.createAnalyser();
        analyserAudioNode.fftSize = 2048;

        const sourceAudioNode = context.createMediaStreamSource(stream);
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
    }

    stopRecording() {
        cancelAnimationFrame(this.pitchRafId);
        this.stream && this.stream.getAudioTracks().forEach(track => track.stop());
        soundMeter.stop();
        clearInterval(this.meterInterval);
        clearInterval(this.pitchInterval);
    }

    componentWillReceiveProps(nextProps) {
        console.log("THIS IS NEXT PROPS IN AUDIO SESSION", nextProps)
        if (nextProps.recording && !this.state.recording) {
            this.startRecording();
            this.setState({
                recording: true
            })
        } else {
            this.state.recording && this.stopRecording();
        }
    }

    render() {
        return(<div>{ this.props.children }</div>)
    }
}

export default AudioSession;
