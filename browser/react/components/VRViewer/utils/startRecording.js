import { SoundMeter } from './loudness';

export default function startRecording() {
    navigator.mediaDevices.getUserMedia = (navigator.mediaDevices.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source;
    var stream;

    if (navigator.mediaDevices.getUserMedia) {
       navigator.mediaDevices.getUserMedia({ audio: true })
       .then((stream) => {
          this.stream = stream
          var soundMeter = window.soundMeter = new SoundMeter(audioCtx);

          soundMeter.connectToSource(stream, (e) => {
            if (e) {
              alert(e);
              return;
            }
            this.meterInterval = setInterval(() => {
              this.props.syncLoudness(soundMeter.slow.toFixed(2));
            }, 200);
          });
        })
       .catch(e => console.error('getUserMedia() failed: ' + e))
    }
  }
