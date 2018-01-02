import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// import { EscapeHtmlPipe } from '../../pipes/keep-html.pipe';

@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  news: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    // Get the item from page navigation from home page
    this.news = navParams.get('item');

    // Replace \n to <br /> to display content with formatting in content.html
    this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />")
    
    console.log(JSON.stringify(this.news));
    // console.log(this.news.text);
  }

}
