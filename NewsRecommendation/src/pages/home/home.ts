import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ContentPage } from '../content/content';
import { HomePageService } from './home-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    HomePageService
  ]
})
export class HomePage {

  newsFromBrand: Observable<any[]>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, private homePageService: HomePageService) {
    // 'BBC/articles' is the name of the list in Firebase Realtime Database
    this.newsFromBrand = db.list('BBC/articles').valueChanges();
    console.log(this.newsFromBrand)

    // Create craft_ai agent with HTTP methods
    this.homePageService.submitCraftAiAgentRequest()
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      })
  }

  itemTapped(event, item) {
    // Record action using craft_ai
    this.homePageService.submitCraftAiActionRequest(item.keywords)
    .then((result: any) => {
      console.log(result);
    })
    .catch((error: any) => {
      console.error(error);
    })

    // Push to content page
    console.log("News clicked!");
    this.navCtrl.push(ContentPage, {
      item: item
    });
  }

}
