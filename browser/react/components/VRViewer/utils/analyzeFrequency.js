import { findFundamentalFreq } from './findF0';
import math from 'mathjs';

//The difference between two MIDI values is the semitone interval between the two notes. 
export const stdSemitones = (arrOfMIDI) => {
	return math.std(arrOfMIDI);
}; 

export default function streamReceived() {
	const micStream = this.stream;

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

var freqToMIDI = function(freq){
    var log = Math.log(freq / 440) / Math.LN2;
    var noteNumber = Math.round(12 * log) + 57;
	return noteNumber;
};





