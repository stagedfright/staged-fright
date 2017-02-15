import React, { Component } from 'react';
import { stdSemitones, freqToMIDI, findFundamentalFreq, SoundMeter } from './utils';

class AudioSession extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recording: false
        }

        this.meterInterval = null;
        this.pitchInterval = null;

        this.pitchRafId = null;
        this.pitch = props.pitch || false;

        //an array of pitch measures, in MIDI values. Stores up to ten seconds' worth of data at once.
        this.pitchDataPoints = [ 40 ];

    }

    startRecording = () => {
        if (navigator.userAgent.match('Mobi')) return;
        navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia);
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        if (navigator.mediaDevices.getUserMedia) {
           navigator.mediaDevices.getUserMedia({ audio: true })
           .then((stream) => {
              this.stream = stream
            })
           .then(() => {
                this.processPitch(this.audioCtx, this.stream)
           })
           .then(() => {
                this.processVolume(this.audioCtx, this.stream)
           })
           .catch(e => console.error('getUserMedia() failed: ' + e))
        }

        this.setState({ recording: true });
    }

    processVolume = (context, stream) => {
        var soundMeter = this.soundMeter = new SoundMeter(context);

        soundMeter.connectToSource(stream, (e) => {
            if (e) {
                alert(e);
                return;
            }
        this.meterInterval = setInterval(() => {
            this.props.syncData(soundMeter.slow.toFixed(2), this.pitch)
        }, 16);
      });
    }

    processPitch = (context, stream) => {

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
            var fundamentalFreq = findFundamentalFreq(buffer, context.sampleRate);
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

    stopRecording = () => {
        cancelAnimationFrame(this.pitchRafId);
        this.stream && this.stream.getAudioTracks().forEach(track => track.stop());
        this.soundMeter.stop();
        clearInterval(this.meterInterval);
        clearInterval(this.pitchInterval);
        this.setState({ recording: false });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recording && !this.state.recording) {
            this.startRecording();
        } else {
            if (nextProps.recording === false && this.state.recording) {
                this.stopRecording();
            }
        }
    }

    render() {
        return(<div>{ this.props.children }</div>)
    }
}

export default AudioSession;
