import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
//import { AuthService } from '../../providers/auth.service';
// import { User } from '../../models/users';

import { ContentPage } from '../content/content';
import { HomePageService } from './home-service';
import { SpinnerService } from '../services/spinner-service';
import { CommonUtilService } from '../services/common-util-service';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'home.html',
  providers: [
    HomePageService,
    SpinnerService,
    CommonUtilService
  ]
})
export class HomePage {

  // newsFromBrand: Observable<any[]>;

  //user = {};
  //displayInputBox: boolean = true;
  movies: any;
  current_page: any = 1;
  total_pages: any;

  // Get the elements in the Global var User
  //private email: any = User.email;
  //private password: any = User.password;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public db: AngularFireDatabase,
    private translate: TranslateService,
    public homePageService: HomePageService,
    public spinnerService: SpinnerService,
    public commonUtilService: CommonUtilService,
  ) {
    // 'BBC/articles' is the name of the list in Firebase Realtime Database
    // this.newsFromBrand = db.list('BBC/articles').valueChanges();
    // Get Now Playing Movies data
    this.homePageService.getNowPlayingMovies(this.current_page)
      .then((result: any) => {
        this.spinnerService.show();

        for (let i = 0; i < result.results.length; i++) {
          result.results[i].poster_path = `https://image.tmdb.org/t/p/w500${result.results[i].poster_path}`
        }

        this.movies = result.results;
        this.total_pages = result.total_pages;
        this.spinnerService.hide();
        // console.log(this.movies)

      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error);
      });
    // console.log(this.newsFromBrand);
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
      const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/dislike`);
      dislikedRef.remove(movie.id.toString());
      // Add clicked movie in the "like" list in DB
      const likedRef = this.db.list(`Users/${User.firebase_user.uid}/like`);
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
      const likedRef = this.db.list(`Users/${User.firebase_user.uid}/like`);
      likedRef.remove(movie.id.toString());
      // Add clicked movie in the "dislike" list in DB
      const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/dislike`);
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
    if (User.email != null && User.password != null && User.firebase_user != null) {
      const historyRef = this.db.list(`Users/${User.firebase_user.uid}/history`);
      historyRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids, poster_path: movie.poster_path });
    }
    // Push to content page
    console.log("Movie clicked!");
    this.navCtrl.push(ContentPage, {
      item: movie
    });
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      if (this.current_page < this.total_pages) {
        // Increase requested page by 1
        this.current_page++;

        this.homePageService.getNowPlayingMovies(this.current_page)
          .then((result: any) => {

            for (let i = 0; i < result.results.length; i++) {
              result.results[i].poster_path = `https://image.tmdb.org/t/p/w500${result.results[i].poster_path}`
            }

            // Add later contents into the original array
            this.movies = this.movies.concat(result.results);
            resolve();
          });
      } else {
        // Finish the infinite scroll otherwise
        resolve();
      }
    })
  }

  /*
  signup() {
    this.authService.signup(this.email, this.password);
  }*/
  /*
  login() {
    // this.authService.login(this.user.email, this.user.password)
    this.authService.login(this.email, this.password)
      .then((result: any) => {
        console.log(result);
        this.displayInputBox = false;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }*/

}
