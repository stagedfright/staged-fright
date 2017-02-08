import { SoundMeter } from './loudness';

export default function startRecording() {
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
