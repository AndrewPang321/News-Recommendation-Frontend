import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newsFromBrand: Observable<any[]>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    // 'BBC/articles' is the name of the list in Firebase Realtime Database
    this.newsFromBrand = db.list('BBC/articles').valueChanges();
    console.log(this.newsFromBrand)
  }

}
