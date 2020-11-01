export default class MicrophoneController {

  constructor() {

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream=>{

      this._stream = stream;

      let audio = new Audio();
      audio.srcObject = stream;
      audio.play();

      this.trigger('play', audio);
        
    }).catch(err =>{
        console.error(err);
    });
  }

  stop() {
    this._stream.getTracks().forEach(track => {
        track.stop();
    });
  }

}