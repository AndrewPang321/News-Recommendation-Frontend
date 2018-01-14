import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  signup(newEmail: string, newPassword: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword("csiuab@ust.hk", "csiuab")
      .then( newUser => {
        firebase
        .database()
        .ref('/Users')
        .child(newUser.uid)
        .set({ email: "csiuab@ust.hk" });
        })
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        return new Promise(function(resolve, reject) {
          resolve("true");
          reject('some fail stuff');
        });
      })
      .catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else {
          alert(error.message);
        }
        console.log(error);
          return new Promise(function(resolve, reject) {
            resolve("false");
            reject('some fail stuff');
          });
        });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
