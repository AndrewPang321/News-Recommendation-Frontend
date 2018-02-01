import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { AuthService } from '../../providers/auth.service';
// import { User } from '../../models/users';

import { ContentPage } from '../content/content';
import { HomePageService } from './home-service';

// Global vars from JS
//declare var User: any;

@Component({
  templateUrl: 'home.html',
  providers: [
    HomePageService
  ]
})
export class HomePage {

  // newsFromBrand: Observable<any[]>;

  //user = {};
  //displayInputBox: boolean = true;
  movies: any;

  // Get the elements in the Global var User
  //private email: any = User.email;
  //private password: any = User.password;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public homePageService: HomePageService) {
    // 'BBC/articles' is the name of the list in Firebase Realtime Database
    // this.newsFromBrand = db.list('BBC/articles').valueChanges();
    // Get Now Playing Movies data
    this.homePageService.getNowPlayingMovies()
      .then((result: any) => {

        for (let i = 0; i < result.results.length; i++) {
          result.results[i].poster_path = `https://image.tmdb.org/t/p/w500${result.results[i].poster_path}`
        }

        this.movies = result.results;
        console.log(this.movies)

      })
      .catch((error: any) => {
        console.log(error);
      });
    // console.log(this.newsFromBrand);
  }

  itemTapped(event, item) {
    // Push to content page
    console.log("Movie clicked!");
    this.navCtrl.push(ContentPage, {
      item: item
    });
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