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
      this.prepareUserData()
      this.getMovies(333339);
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
    console.log(`like: ${User.movie_history.Like[0].id}`);
    console.log(`dislike: ${User.movie_history.Dislike[0].id}`);
    console.log(`history: ${User.movie_history.History[0].id}`);
  }

  getMovies(movieId) {
    this.spinnerService.show();

    this.signUpLoginPageService.sendMovieDetails(movieId)
      .then((result: any) => {
        for (let i = 0; i < result.results.length; i++) {
          result.results[i].poster_path = `https://image.tmdb.org/t/p/w500${result.results[i].poster_path}`
        }
        this.movies = result.results;

        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error);
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
