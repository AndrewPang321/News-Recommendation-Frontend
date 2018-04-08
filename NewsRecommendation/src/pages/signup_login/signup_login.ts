import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { App } from 'ionic-angular';
import { NavController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SpinnerService } from '../services/spinner-service';

import { SignUpLoginPageService } from './signup_login-service';
import { HomePage } from '../home/home';
import { CommonUtilService } from '../services/common-util-service';
import { ContentPage } from '../content/content';
//import { FirebaseService } from '../services/firebase-service';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'signup_login.html',
  providers: [
    AuthService,
    SignUpLoginPageService,
    SpinnerService,
    CommonUtilService
  ]
})
export class SignUpLoginPage {

  newsFromBrand: Observable<any[]>;

  private unauthorized: boolean = User.unauthorized;

  // Get the elements in the Global var User
  private email: string = User.email;
  private password: string;
  private confirm_password: string;
  private user_name: string = User.user_name;

  private auth_select: string;

  private movie_history: any = User.movie_history;

  // Recommended Movies
  movies: any;
  moviesLikeHistory: any;
  moviesDislike: any;
  userLikeHistory: any[];
  userDislike: any[];

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public authService: AuthService,
    //public fbService: FirebaseService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    public appCtrl: App,
    private signUpLoginPageService: SignUpLoginPageService,
    private spinnerService: SpinnerService,
    private commonUtilService: CommonUtilService,
    private toastCtrl: ToastController
  ) {
    this.auth_select = "login";
    // Get recommendation results
    if (!this.unauthorized) {
      this.spinnerService.show();
      this.prepareUserData();
      // console.log(this.userLikeHistory);
      // console.log(this.userDislike);
      Promise.all([
        this.getMoviesByLikeHistory(this.userLikeHistory),
        this.getMoviesByDislike(this.userDislike)
      ])
        .then((result: any) => {
          console.log(this.moviesLikeHistory.length);
          console.log(this.moviesDislike.length);
          this.movies = this.moviesLikeHistory.filter(this.arraysDifference(this.moviesDislike));
          console.log(this.movies.length);
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
        });  
      console.log(this.user_name);
      console.log(this.email);
    }
  }

  signup() {
    if(this.password == this.confirm_password){
      this.authService.signup(this.email, this.user_name, this.password)
      .then((result: any) => {
        console.log(result);
        let loader = this.loadingCtrl.create({
          content: "Signing up...",
          duration: 2000
        });
        loader.present();
        let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'You have sucessfully created your account!',
        buttons: ['OK']
        });
        alert.present();
        this.unauthorized = User.unauthorized = false;
        //this.navCtrl.push(HomePage);
        this.appCtrl.getRootNav().push(HomePage);
      })
      .catch((error: any) => {
        let alert = this.alertCtrl.create({
        title: 'Sign Up Failed',
        subTitle: error,
        buttons: ['OK']
        });
        alert.present();
      });
    }
    else {
      let alert = this.alertCtrl.create({
      title: 'Sign Up Failed',
      subTitle: 'The confirm password should be the same as your passowrd',
      buttons: ['OK']
      });
      alert.present();
    }
  }

  login() {
    this.authService.login(this.email, this.password)
      .then((result: any) => {
        console.log(result);
        let loader = this.loadingCtrl.create({
          content: "Logging in...",
          duration: 1000
        });
        loader.present();
        this.unauthorized = User.unauthorized = false;
        // Push back to root page
        this.navCtrl.setRoot(HomePage);
        // Get User's data
        this.authService.retrieveMovieHistory();
      })
      .catch((error: any) => {
        console.log(error);
        let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: error,
        buttons: ['OK']
        });
        alert.present();
      });
  }

  // Prepare user's data to get recommendation
  prepareUserData() {
    let likeTop5 = [];
    let historyTop5 = [];
    let dislikeTop5 = [];
    
    // If user reads less then or equal to five readings
    if (User.movie_history.Like.length <= 5) {
      likeTop5 = User.movie_history.Like.map(item => item.id);
    } else { // If user reads more then five readings
      for (let i = 0; i < 5; i++) {
        likeTop5[i] = User.movie_history.Like[i].id;
      }
    }

    if (User.movie_history.History.length <= 5) {
      historyTop5 = User.movie_history.History.map(item => item.id);
    } else { // If user reads more then five readings
      for (let i = 0; i < 5; i++) {
        historyTop5[i] = User.movie_history.History[i].id;
      }
    }

    if (User.movie_history.Dislike.length <= 5) {
      dislikeTop5 = User.movie_history.Dislike.map(item => item.id);
    } else { // If user reads more then five readings
      for (let i = 0; i < 5; i++) {
        dislikeTop5[i] = User.movie_history.Dislike[i].id;
      }
    }

    this.userLikeHistory = [...likeTop5, ...historyTop5].filter((item, index, self) => self.indexOf(item) === index);
    this.userDislike = dislikeTop5;
  }

  // ~ Set Union, remove duplication
  removeDuplicate(arr) {
    return arr.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.id === item.id
      ))
    );
  }

  // ~ Set Difference, A - B
  arraysDifference(arr2) {
    return arr1 => arr2.filter(
      (item, index, self) => item.id === arr1.id
    ).length == 0;
  }

  arrOfQueries(moviesArr) {
    return moviesArr.map(id => this.signUpLoginPageService.sendMovieDetails(id));
  }

  getMoviesByLikeHistory(moviesArr) {
    return new Promise((resolve, reject) => {
      Promise.all(this.arrOfQueries(moviesArr))
        .then((result: any) => {
          this.moviesLikeHistory = result[0].results;
          for (let i = 1; i < result.length; i++) {
            this.moviesLikeHistory = [...this.moviesLikeHistory, ...result[i].results];
          }
          for (let i = 0; i < this.moviesLikeHistory.length; i++) {
            this.moviesLikeHistory[i].poster_path = `https://image.tmdb.org/t/p/w500${this.moviesLikeHistory[i].poster_path}`
          }

          this.moviesLikeHistory = this.removeDuplicate(this.moviesLikeHistory);
          console.log(`likehistory: ${this.moviesLikeHistory.length}`);
          resolve(true);
        })
        .catch((error: any) => {
          console.log(error);
          resolve(false);
        });
    });
  }

  getMoviesByDislike(moviesArr) {
    return new Promise((resolve, reject) => {
      Promise.all(this.arrOfQueries(moviesArr))
        .then((result: any) => {
          this.moviesDislike = result[0].results;
          for (let i = 1; i < result.length; i++) {
            this.moviesDislike = [...this.moviesDislike, ...result[i].results];
          }
          for (let i = 0; i < this.moviesDislike.length; i++) {
            this.moviesDislike[i].poster_path = `https://image.tmdb.org/t/p/w500${this.moviesDislike[i].poster_path}`
          }
          this.moviesDislike = this.removeDuplicate(this.moviesDislike);
          console.log(`dislike: ${this.moviesDislike.length}`);
          resolve(true);
        })
        .catch((error: any) => {
          console.log(error);
          resolve(false);
        });
    });
  }

  like(event, movie) {
    if (User.email === null || User.firebase_user === null) {
      this.commonUtilService.customizePopup(
        event,
        this.navCtrl,
        this.translate.instant("NOT_LOGIN"),
        this.translate.instant("NOT_LOGIN_SUBTITLE")
      );
    } else {
      // Present toast
      this.presentToast(`Liked ${movie.title}`);
      // Delete clicked movie in the "dislike" list in DB
      const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/movie/dislike`);
      dislikedRef.remove(movie.id.toString());
      // Add clicked movie in the "like" list in DB
      const likedRef = this.db.list(`Users/${User.firebase_user.uid}/movie/like`);
      likedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
    }
  }

  dislike(event, movie) {
    if (User.email === null || User.firebase_user === null) {
      this.commonUtilService.customizePopup(
        event,
        this.navCtrl,
        this.translate.instant("NOT_LOGIN"),
        this.translate.instant("NOT_LOGIN_SUBTITLE")
      );
    } else {
      // Present toast
      this.presentToast(`Disliked ${movie.title}`);
      // Delete clicked movie in the "like" list in DB
      const likedRef = this.db.list(`Users/${User.firebase_user.uid}/movie/like`);
      likedRef.remove(movie.id.toString());
      // Add clicked movie in the "dislike" list in DB
      const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/movie/dislike`);
      dislikedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: `${msg}`,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  itemTapped(event, movie) {
    // Save to History in DB if login
    if (User.email != null && User.firebase_user != null) {
      const historyRef = this.db.list(`Users/${User.firebase_user.uid}/movie/history`);
      historyRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
    }
    // Push to content page
    console.log("Movie clicked!");
    this.navCtrl.push(ContentPage, {
      item: movie
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    console.log(this.movie_history.Dislike);
    this.authService.retrieveMovieHistory();
    //this.movie_history.Dislike.forEach(element => {
    //        console.log(element.key, element.value);
    //    });
    refresher.complete();
  }

}
