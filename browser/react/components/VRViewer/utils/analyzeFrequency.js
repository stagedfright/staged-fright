import { findFundamentalFreq } from './findF0';

export default function streamReceived() {
	const micStream = this.stream;

	const analyserAudioNode = this.audioCtx.createAnalyser();
	analyserAudioNode.fftSize = 2048;

	const sourceAudioNode = this.audioCtx.createMediaStreamSource(micStream);
	sourceAudioNode.connect(analyserAudioNode);

	const detectPitch = () => {

		var buffer = new Uint8Array(analyserAudioNode.fftSize);
		// console.log('extensible?', Object.isExtensible(pitchDataPoints));
		this.pitchDataPoints = this.pitchDataPoints.slice(0, 199); //hacky workaround for extensibility error 
		var bufferLength = analyserAudioNode.fftSize; 
		analyserAudioNode.getByteTimeDomainData(buffer); 
		var fundamentalFreq = findFundamentalFreq(buffer, this.audioCtx.sampleRate);
		if (fundamentalFreq !== -1) {
			this.pitchDataPoints.push(fundamentalFreq);
		} else this.pitchDataPoints.push(0); 

		this.props.syncPitchData(this.pitchDataPoints);

		this.pitchRafId = window.requestAnimationFrame(detectPitch);
	};
	detectPitch();
};
