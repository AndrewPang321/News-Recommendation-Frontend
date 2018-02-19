import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth.service';
import { TranslateService } from '@ngx-translate/core';

// Global vars from JS
declare var User: any;

@Component({
  templateUrl: 'signup_login.html',
  providers: [AuthService]
})
export class SignUpLoginPage {

  newsFromBrand: Observable<any[]>;

  private displayInputBox: boolean = true;

  // Get the elements in the Global var User
  private email: any = User.email;
  private password: any = User.password;

  private auth_select: string;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public authService: AuthService, private translate: TranslateService) {
    this.auth_select = "login";
  }

  signup() {
    this.authService.signup(this.email, this.password);
  }

  login() {
    this.authService.login(this.email, this.password)
      .then((result: any) => {
        console.log(result);
        this.displayInputBox = false;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

}
