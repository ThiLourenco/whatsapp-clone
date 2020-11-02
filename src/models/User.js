import { Firebase } from "../utils/Firebase";
import { Model } from "./Model";

export class User extends Model {

  constructor(id) {

    super();

    if (id) this.getById(id);

  }

  get name() { return this._data.name; }
  set name(value) { this._data.name = value; }

  get email() { return this._data.email; }
  set email(value) { this._data.email = value; }

  get photo() { return this._data.photo; }
  set photo(value) { this._data.photo = value; }

  getById(id) {

    return new Promise((success, fail) => {

      User.findByEmail(id).onSnapshot(doc=> {

        this.fromJSON(doc.data());

        success(doc);

      });

    });

  }

  save() {

    return User.findByEmail(this.email).set(this.toJSON());

  }

  static getRef() {

    return Firebase.db().collection('/users');

  }

  static findByEmail(email) {

    return User.getRef().doc(email);

  }

  addContact(contact) {

    User.getRef().doc(this.email).collection('contacts').doc(btoa(contact.email)).set(contact.toJSON());

  }

}