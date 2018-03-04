import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { App } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'signup_login.html',
  providers: [AuthService]
})
export class SignUpLoginPage {

  newsFromBrand: Observable<any[]>;

  private unauthorized: boolean = User.unauthorized;

  // Get the elements in the Global var User
  private email: string = User.email;
  private password: string;
  private confirm_password: string;
  private user_name: string = User.user_name;

  private auth_select: string;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private translate: TranslateService,
    public appCtrl: App
  ) {
    this.auth_select = "login";
    console.log(this.user_name);
    console.log(this.email);
  }

  signup() {
    if(this.password == this.confirm_password){
      this.authService.signup(this.email, this.user_name, this.password)
      .then((result: any) => {
        console.log(result);
        let loader = this.loadingCtrl.create({
          content: "Signing up...",
          duration: 2000
        });
        loader.present();
        let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'You have sucessfully created your account!',
        buttons: ['OK']
        });
        alert.present();
        this.unauthorized = User.unauthorized = false;
        //this.navCtrl.push(HomePage);
        this.appCtrl.getRootNav().push(HomePage);
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
    else {
      let alert = this.alertCtrl.create({
      title: 'Sign Up Failed',
      subTitle: 'The confirm password should be the same as your passowrd',
      buttons: ['OK']
      });
      alert.present();
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
        this.unauthorized = User.unauthorized = false;
        //this.navCtrl.push(HomePage);
        this.appCtrl.getRootNav().push(HomePage);
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
