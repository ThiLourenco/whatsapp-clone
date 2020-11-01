import { Firebase } from "../utils/Firebase";
import { ClassEvent } from "../utils/ClassEvent";

export class User extends ClassEvent {

  static getRef() {

    return Firebase.db().collection('/users');

  }

  static findByEmail(email) {

    return User.getRef().doc(email);

  }

}