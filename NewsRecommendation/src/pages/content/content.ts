import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ContentPageService } from './content-service';
import { SpinnerService } from '../services/spinner-service';
import { timeInterval } from 'rxjs/operator/timeInterval';
// import { EscapeHtmlPipe } from '../../pipes/keep-html.pipe';

// Global vars from JS
declare var User: any;

@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
  providers: [
    ContentPageService,
    SpinnerService
  ]
})
export class ContentPage {

  movie: any;
  overview: any;
  adult: any;
  genres: any = [];
  popularity: any;
  tagline: any;
  vote_average: any;
  release_date: any;
  runtime: any;
  spoken_languages: any = [];

  startTime: any;
  endTime: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public contentPageService: ContentPageService,
    public spinnerService: SpinnerService
  ) {
    this.spinnerService.show();
    
    // Get the item from page navigation from home page
    this.movie = navParams.get('item');
    console.log(this.movie);

    this.contentPageService.sendMovieDetails(this.movie.id)
      .then((result: any) => {

        this.overview = result.overview;
        this.adult = result.adult;
        this.genres = result.genres;
        this.popularity = result.popularity;
        this.tagline = result.tagline;
        this.vote_average = result.vote_average;
        this.release_date = result.release_date;
        this.runtime = result.runtime;
        this.spoken_languages = result.spoken_languages;

        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error);
      });

    // Replace \n to <br /> to display content with formatting in content.html
    // this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />")
    
    // console.log(JSON.stringify(this.news));
    // console.log(this.news.text);
  }

  ionViewWillEnter() {
    this.startTime = new Date().getTime();
  }

  ionViewWillLeave() {
    this.endTime = new Date().getTime();
    // Unit of timeSession is milliseconds
    let timeSession = this.endTime - this.startTime;
    console.log(`time sessioni: ${timeSession} ms`);
    
    if (User.email != null && User.password != null && User.firebase_user != null && this.movie.id != null) {
      const historyRef = this.db.list(`Users/${User.firebase_user.uid}/history`);
      historyRef.update(this.movie.id.toString(), { activeTime: timeSession });
    }
  }

}
