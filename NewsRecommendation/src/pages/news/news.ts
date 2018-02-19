import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import { NewsContentPage } from '../news-content/news-content';
import { SpinnerService } from '../services/spinner-service';
import { CommonUtilService } from '../services/common-util-service';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'news.html',
  providers: [
    SpinnerService,
    CommonUtilService
  ]
})
export class NewsPage {

  newsFromBrand: Observable<any[]>;
  allNews: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public db: AngularFireDatabase,
    private translate: TranslateService,
    public spinnerService: SpinnerService,
    public commonUtilService: CommonUtilService,
  ) {
    // 'BBC/articles' is the name of the list in Firebase Realtime Database
    this.newsFromBrand = db.list('BBC/articles').valueChanges();
    console.log(this.newsFromBrand);
  }

  like(event, news) {
    if (User.email === null || User.firebase_user === null) {
      this.commonUtilService.customizePopup(
        event, 
        this.navCtrl,
        this.translate.instant("NOT_LOGIN"),
        this.translate.instant("NOT_LOGIN_SUBTITLE")
      );
    } else {
      // Present toast
      this.presentToast(`Liked ${news.title}`);
      // Delete clicked movie in the "dislike" list in DB
      const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/news/dislike`);
      dislikedRef.remove(news.id.toString());
      // Add clicked movie in the "like" list in DB
      const likedRef = this.db.list(`Users/${User.firebase_user.uid}/news/like`);
      likedRef.set(news.id.toString(), { id: news.id, url: news.url, title: news.title, all_categories: news.all_categories, main_category: news.main_category, keywords: news.keywords, summary: news.summary, text: news.text, top_image: news.top_image });
    }
  }

  dislike(event, news) {
    if (User.email === null || User.firebase_user === null) {
      this.commonUtilService.customizePopup(
        event, 
        this.navCtrl,
        this.translate.instant("NOT_LOGIN"),
        this.translate.instant("NOT_LOGIN_SUBTITLE")
      );
    } else {
      // Present toast
      this.presentToast(`Disliked ${news.title}`);
      // Delete clicked movie in the "like" list in DB
      const likedRef = this.db.list(`Users/${User.firebase_user.uid}/news/like`);
      likedRef.remove(news.id.toString());
      // Add clicked movie in the "dislike" list in DB
      const dislikedRef = this.db.list(`Users/${User.firebase_user.uid}/news/dislike`);
      dislikedRef.set(news.id.toString(), { id: news.id, url: news.url, title: news.title, all_categories: news.all_categories, main_category: news.main_category, keywords: news.keywords, summary: news.summary, text: news.text, top_image: news.top_image });
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

  itemTapped(event, news) {
    // Save to History in DB if login
    if (User.email != null && User.firebase_user != null) {
      const historyRef = this.db.list(`Users/${User.firebase_user.uid}/news/history`);
      historyRef.set(news.id.toString(), { id: news.id, url: news.url, title: news.title, all_categories: news.all_categories, main_category: news.main_category, keywords: news.keywords, summary: news.summary, text: news.text, top_image: news.top_image });
    }
    // Push to news-content page
    console.log("News clicked!");
    this.navCtrl.push(NewsContentPage, {
      item: news
    });
  }

}
