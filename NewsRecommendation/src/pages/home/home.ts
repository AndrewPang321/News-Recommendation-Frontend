import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth.service';
//import { User } from '../../models/users';

import { ContentPage } from '../content/content';

@Component({
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage {

  newsFromBrand: Observable<any[]>;

  user = {};
  displayInputBox: boolean = true;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public authService: AuthService) {
    // 'BBC/articles' is the name of the list in Firebase Realtime Database
    this.newsFromBrand = db.list('BBC/articles').valueChanges();
    console.log(this.newsFromBrand);
  }

  itemTapped(event, item) {
    // Push to content page
    console.log("News clicked!");
    this.navCtrl.push(ContentPage, {
      item: item
    });
  }

  signup() {
    this.authService.signup();
  }

  login() {
     console.log(this.authService
      .login(this.user.email, this.user.password));
//      .then(function(result){
//        console.log(result);
//      });
    //this.displayInputBox = false;
  }

}
