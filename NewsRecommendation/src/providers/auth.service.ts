import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

// Global vars from JS
declare var User: any;

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(newEmail: string, newPassword: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(newEmail, newPassword)
      // .createUserWithEmailAndPassword("csiuab@ust.hk", "csiuab")
      .then( newUser => {
        this.db.object(`Users/${newUser.uid}`).set({ email: `${newEmail}`});
        User.email = newEmail;
        User.password = newPassword;
        User.firebase_user = newUser;
        // console.log(`User.email: ${User.email}`);
        // console.log(`User.pw: ${User.password}`);
        // console.log(`User.firebaseUserUid: ${User.firebase_user.uid}`);
      })
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        User.email = email;
        User.password = password;
        User.firebase_user = firebaseUser;
        // console.log(`User.email: ${User.email}`);
        // console.log(`User.pw: ${User.password}`);
        // console.log(`User.firebaseUserUid: ${User.firebase_user.uid}`);
        resolve("true");
      })
      .catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else {
          alert(error.message);
        }
        console.log(error);
        reject("false");
      });
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
