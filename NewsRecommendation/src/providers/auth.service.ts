import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  //Authorized: boolean = false;

  constructor(private db: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    console.log(this.user);
  }

  signup(newEmail: string, newUserName: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(newEmail, newPassword)
        .then( newUser => {
          this.db.object(`Users/${newUser.uid}`).set({ email: `${newEmail}`, userName: `${newUserName}`});
        })
        .then(function(firebaseUser) {
          resolve("success");
        })
        .catch(function(error) {
          console.log('Something went wrong:', error);
          reject(error.message);
        });
    })
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        resolve("success");
      })
      .catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          reject("Wrong password");
        }
        else {
          reject(error.message);
        }
        console.log(error);
        //reject("false");
          // return new Promise(function(resolve, reject) {
          //   // resolve("false");
          //   reject('some fail stuff');
          // });
      });
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
