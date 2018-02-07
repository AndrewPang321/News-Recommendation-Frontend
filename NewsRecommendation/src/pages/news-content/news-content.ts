import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// Global vars from JS
declare var User: any;

@Component({
  selector: 'page-news-content',
  templateUrl: 'news-content.html'
})
export class NewsContentPage {

  news: any;
  startTime: any;
  endTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    // Get the item from page navigation from home page
    this.news = navParams.get('item');

    // Replace \n to <br /> to display content with formatting in content.html
    this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />")
    
    console.log(JSON.stringify(this.news));
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
    
    if (User.email != null && User.firebase_user != null && this.news.title != "") {
      const historyRef = this.db.list(`Users/${User.firebase_user.uid}/news/history`);
      historyRef.update(this.news.id.toString(), { activeTime: timeSession });
    }
  }

}