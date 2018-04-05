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
    //this.user = firebaseAuth.authState;
  }

  signup(newEmail: string, newUserName: string, newPassword: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(newEmail, newPassword)
        .then( newUser => {
          this.db.object(`Users/${newUser.uid}`).set({ email: `${newEmail}`, userName: `${newUserName}`});
          User.email = newEmail;
          User.user_name = newUserName;
          User.firebase_user = newUser;
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
      .then( firebaseUser => {
        resolve("success");
        User.email = email;
        User.firebase_user = firebaseUser;
        console.log(User.firebase_user.uid);
        this.db.object(`Users/${User.firebase_user.uid}/userName`).valueChanges().subscribe(data => {
          User.user_name = data;
          console.log(User.user_name);
        });
      })
      .catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          reject("Wrong password");
        }
        else {
          reject(error.message);
        }
        console.log(error);
        reject("false");
      });
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(result => {
        console.log("success");
      })
      .catch(error => {
        console.log(error);
      });
  }

  retrieveMovieHistory() {
    User.movie_history.Dislike = this.db.list(`Users/${User.firebase_user.uid}/movie/dislike`).valueChanges();
    User.movie_history.History = this.db.list(`Users/${User.firebase_user.uid}/movie/history`).valueChanges();
    User.movie_history.Like = this.db.list(`Users/${User.firebase_user.uid}/movie/like`).valueChanges();
  }

}
