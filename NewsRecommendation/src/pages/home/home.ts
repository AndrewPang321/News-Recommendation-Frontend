import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
//import { AuthService } from '../../providers/auth.service';
// import { User } from '../../models/users';

import { ContentPage } from '../content/content';

// Global vars from JS
//declare var User: any;

@Component({
  templateUrl: 'home.html'
  //providers: [AuthService]
})
export class HomePage {

  newsFromBrand: Observable<any[]>;

  //user = {};
  //private displayInputBox: boolean = true;

  // Get the elements in the Global var User
  //private email: any = User.email;
  //private password: any = User.password;

  //, public authService: AuthService
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
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
