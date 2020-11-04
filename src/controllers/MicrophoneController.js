import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent {

  constructor() {

    super();

    this._mimeType = 'audio/webm';

    this._available = false;

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream=>{

      this._available = true;
      this._stream = stream;

      this.trigger('ready',  this._stream);
        
    }).catch(err =>{
        console.error(err);
    });
  }

  isAvailable() {

    return this._available;

  }

  stop() {
    this._stream.getTracks().forEach(track => {
        track.stop();
    });
  }

  startRecorder() {

    if (this.isAvailable()) {

      this._mediaRecorder = new MediaRecorder(this._stream, {
        mimeType: this._mimeType
      });

      this._recordedChunks = [];

      this._mediaRecorder.addEventListener('dataavailable', e => {

        if (e.data.size > 0) this._recordedChunks.push(e.data);

      });

      this._mediaRecorder.addEventListener('stop', e => {

        let blob = new Blob(this._recordedChunks, {
          type: this._mimeType,
        });

        let filename = `rec${Date.now()}.webm`;

        let audioContext = new AudioContext();

        let reader = new FileReader();

        reader.onload = e => {

          audioContext.decodeAudioData(reader.result).then(decode => {

              let file = new File([blob], filename, {
                type: this._mimeType,
                lastModified: Date.now()

              });

            this.trigger('recorded', file, decode);

          });

        }

        reader.readAsArrayBuffer(blob);

        // let reader = new FileReader();

        // reader.onload = e => {

        //   console.log('TCL: reader file', file);

        //   let audio = new Audio(reader.result);

        //   audio.play();
        // }

        // reader.readAsDataURL(file);

      });

      this._mediaRecorder.start();
      this.startTime();

    }; 

  }

  stopRecorder() {

    if (this.isAvailable()) {

      this._mediaRecorder.stop();
      this.stop();
      this.stopTime();

    };

  }

  startTime() {

    let start = Date.now();

		this._recordMicrophoneInterval = setInterval(() => {

			this.trigger('recordtimer', (Date.now() - start));

    }, 100);
    
  }

  stopTime() {
    clearInterval(this._recordMicrophoneInterval);

  }

}