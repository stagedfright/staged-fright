export const findFundamentalFreq = (buffer, sampleRate) => {
	// We use autocorrelation to find the fundamental frequency.
	
	// In order to correlate the signal with itself (hence the name of the algorithm), we will check two points 'k' frames away. 
	// The autocorrelation index will be the average of these products. At the same time, we normalize the values.
	// Source: http://www.phy.mty.edu/~suits/autocorrelation.html

	// the default sample rate, depending on the hardware, is 44100Hz or 48000Hz. 
	// a 'k' range between 120 and 650 covers signals ranging from ~70Hz to ~350Hz, which is just a little broader than the average frequency range for human speech (80-260Hz, per Wikipedia). 
	var n = 1024, bestR = 0, bestK = -1;
	for(var k = 120; k <= 650; k++){
		var sum = 0;
		
		for(var i = 0; i < n; i++){
			sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
		}
		
		var r = sum / (n + k);

		if(r > bestR){
			bestR = r;
			bestK = k;
		}

		if(r > 0.95) {
			// Let's assume that this is good enough and stop right here
			break;
		}
	}
	
	if(bestR > 0.0025) {
		// The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
		var fundamentalFreq = sampleRate / bestK;
		return fundamentalFreq;
	}
	else {
		// We haven't found a good correlation
		return -1;
	}
};