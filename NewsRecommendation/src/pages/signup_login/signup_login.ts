import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth.service';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

// Global vars from JS
declare var User: any;
//declare var Unauthorized: boolean = true;

@Component({
  templateUrl: 'signup_login.html',
  providers: [AuthService]
})
export class SignUpLoginPage {

  newsFromBrand: Observable<any[]>;

  private authorized: boolean = AuthService.Authorized;

  // Get the elements in the Global var User
  private email: any = User.email;
  private password: any = User.password;
  private confirm_password: any = User.confirm_password;
  private user_name: any = User.user_name;

  private auth_select: string;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public authService: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.auth_select = "login";
    console.log(this.authorized);
  }

  signup() {
    if(this.password == this.confirm_password){
      this.authService.signup(this.email, this.user_name, this.password)
      .then((result: any) => {
        console.log(result);
        let loader = this.loadingCtrl.create({
          content: "Signing up...",
          duration: 1500
        });
        loader.present();
        let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'You have sucessfully created your account!',
        buttons: ['OK']
        });
        alert.present();
      })
      .catch((error: any) => {
        let alert = this.alertCtrl.create({
        title: 'Sign Up Failed',
        subTitle: error,
        buttons: ['OK']
        });
        alert.present();
      });
    }
  }

  login() {
    this.authService.login(this.email, this.password)
      .then((result: any) => {
        console.log(result);
        let loader = this.loadingCtrl.create({
          content: "Logging in...",
          duration: 1000
        });
        loader.present();
        console.log(this.authorized);
        this.authorized = true;
        console.log(this.authorized);
      })
      .catch((error: any) => {
        console.log(error);
        let alert = this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: error,
        buttons: ['OK']
        });
        alert.present();
      });
  }

}
