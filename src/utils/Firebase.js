const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

  constructor () {

    this._config = {

      apiKey: "AIzaSyDB4d3rBVjkVy-F1_xsrx_UcG6utOA4ixA",
      authDomain: "whatsapp-clone-680c3.firebaseapp.com",
      databaseURL: "https://whatsapp-clone-680c3.firebaseio.com",
      projectId: "whatsapp-clone-680c3",
      storageBucket: "gs://whatsapp-clone-680c3.appspot.com/",
      messagingSenderId: "118780678870",
      appId: "1:118780678870:web:76a98954f54de659d8af77"
    }

    this.init();

  }

  init() {
    
    if (!window._initializedFirebase) {
      firebase.initializeApp(this._config);

      firebase.firestore().settings({});

      window._initializedFirebase = true;

    }
  
  }

  static db() {

    return firebase.firestore();

  }

  static hd() {

    return firebase.storage();

  }

  initAuth() {

    return new Promise((success, fail)=> {

      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
      .then((result)=> {

        let token = result.credential.accessToken;
        let user = result.user;

        success({
          user,
          token
        });

      }).catch(err=> {
          fail(err);
      });

    });

  }

}