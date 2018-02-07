import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

import { ContentPage } from '../content/content';
import { SpinnerService } from '../services/spinner-service';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'history.html',
  providers: [
    SpinnerService
  ]
})
export class HistoryPage {

  history: any;
  isLogin: boolean;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    private translate: TranslateService,
    public spinnerService: SpinnerService
  ) {
    this.spinnerService.show();

    if (User.email != null && User.password != null && User.firebase_user != null) {
      this.isLogin = true;
      this.history = this.db.list(`Users/${User.firebase_user.uid}/history`).valueChanges();
    } else {
      this.isLogin = false;
    }

    this.spinnerService.hide();
  }

  itemTapped(event, item) {
    // Push to content page
    console.log("Movie in History clicked!");
    this.navCtrl.push(ContentPage, {
      item: item
    });
  }

}
