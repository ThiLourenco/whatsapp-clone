import { Firebase } from './Firebase';

export class Upload {

  static send(file, from) {

    return new Promise((success, fail)=> {

			let uploadTask = Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file);

			uploadTask.on('state_changed', e=> {

				console.info('TCL: upload', e);

				}, err => {
					fail(err);

				}, () => {
					uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
						
						success(downloadURL);

					});

				});
		});

  }

}