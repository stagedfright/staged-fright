import math from 'mathjs';

//VOLUME STUFF
//TO DO: refactor soundMeter code to ES6
var SoundMeter = function(context) {
  this.context = context;
  this.instant = 0.0;
  this.slow = 0.0;
  this.clip = 0.0;
  this.script = context.createScriptProcessor(2048, 1, 1);
  var that = this;
  this.script.onaudioprocess = function(event) {
    var input = event.inputBuffer.getChannelData(0);
    var i;
    var sum = 0.0;
    var clipcount = 0;
    for (i = 0; i < input.length; ++i) {
      sum += input[i] * input[i];
      if (Math.abs(input[i]) > 0.99) {
        clipcount += 1;
      }
    }
    that.instant = Math.sqrt(sum / input.length);
    that.slow = 0.95 * that.slow + 0.05 * that.instant;
    that.clip = clipcount / input.length;
  };
}

SoundMeter.prototype.connectToSource = function(stream, callback) {
  try {
    this.mic = this.context.createMediaStreamSource(stream);
    this.mic.connect(this.script);
    // necessary to make sample run, but should not be.
    this.script.connect(this.context.destination);
    if (typeof callback !== 'undefined') {
      callback(null);
    }
  } catch (e) {
    console.error(e);
    if (typeof callback !== 'undefined') {
      callback(e);
    }
  }
};
SoundMeter.prototype.stop = function() {
  this.mic.disconnect();
  this.script.disconnect();
};

//PITCH STUFF
	//The difference between two MIDI values is the semitone interval between the two notes.
	//The function stdSemitones takes the standard deviation of an array of MIDI values, which is an indicator of pitch variation. 
	const stdSemitones = (arrOfMIDI) => {
	    return arrOfMIDI.length && math.std(arrOfMIDI);
	};
	
	const freqToMIDI = (freq) => {
	    var log = Math.log(freq / 440) / Math.LN2;
	    var noteNumber = Math.round(12 * log) + 57;
	    return noteNumber;
	};

	const findFundamentalFreq = (buffer, sampleRate) => {
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

export { findFundamentalFreq, freqToMIDI, stdSemitones, SoundMeter };
