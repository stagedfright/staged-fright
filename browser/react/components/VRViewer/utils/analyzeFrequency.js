import { findFundamentalFreq } from './findF0';

export default function streamReceived() {
	const micStream = this.stream;

	const analyserAudioNode = this.audioCtx.createAnalyser();
	analyserAudioNode.fftSize = 2048;

	const sourceAudioNode = this.audioCtx.createMediaStreamSource(micStream);
	sourceAudioNode.connect(analyserAudioNode);

	const dataLength = 200; // number of dataPoints visible at any point

	const detectPitch = () => {

		var buffer = new Uint8Array(analyserAudioNode.fftSize);
		// console.log('extensible?', Object.isExtensible(dps));
		this.dps = this.dps.slice(); //hacky workaround for extensibility error 
		var bufferLength = analyserAudioNode.fftSize; 
		analyserAudioNode.getByteTimeDomainData(buffer); 
		var fundamentalFreq = findFundamentalFreq(buffer, this.audioCtx.sampleRate);
		if (fundamentalFreq !== -1) {
			this.dps.push(fundamentalFreq);
		} else this.dps.push(0); 
		if (this.dps.length > dataLength) this.dps.shift();

		this.props.syncPitchData(this.dps);

		this.pitchRafId = window.requestAnimationFrame(detectPitch);
	};
	detectPitch();
};
