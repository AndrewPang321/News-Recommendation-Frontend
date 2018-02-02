import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { AuthService } from '../../providers/auth.service';
// import { User } from '../../models/users';

import { ContentPage } from '../content/content';
import { HomePageService } from './home-service';
import { SpinnerService } from '../services/spinner-service';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'home.html',
  providers: [
    HomePageService,
    SpinnerService
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
    public db: AngularFireDatabase,
    public homePageService: HomePageService,
    public spinnerService: SpinnerService
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
    const likedRef = this.db.list(`Users/${User.firebase_user.uid}/like`);
    likedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids });
  }

  dislike(event, movie) {
    const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/dislike`);
    dislikedRef.set(movie.id.toString(), { id: movie.id, title: movie.title, vote_average: movie.vote_average, genre_ids: movie.genre_ids });
  }

  itemTapped(event, item) {
    // Push to content page
    console.log("Movie clicked!");
    this.navCtrl.push(ContentPage, {
      item: item
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
