import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../providers/auth.service';

import { HomePage } from '../pages/home/home';
import { SignUpLoginPage } from '../pages/signup_login/signup_login';
import { HistoryPage } from '../pages/history/history';

declare var User: any;

@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //@ViewChild('otherBlocks')
  //otherBlocks: TemplateRef<any>|null = null;
  //@ViewChild('profileBlock')
  //profileBlock: TemplateRef<any>|null = null;

  //displayBlock: TemplateRef<any>|null = null;

  private user_name: string = User.user_name;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  icons: Array<string>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public authService: AuthService
  ) {
    this.initializeApp();

    // Set English as default language
    translate.setDefaultLang('en');

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'History', component: HistoryPage },
      { title: 'Sign Up/Login', component: SignUpLoginPage },
      { title: 'Log Out', component: null}
    ];

    this.icons = ["home", "book", "log-in", "exit"];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == 'Log Out'){
      if(User.email != null && User.firebase_user != null){
        this.authService.logout();
        User.unauthorized = true;
        User.email = null;
        User.user_name = null;
        User.firebase_user = null;
        this.nav.setRoot(HomePage);
      }
      else{
        console.log("haven't logged in");
      }
    }
    else{
      this.nav.setRoot(page.component);
    }
  }

  titleCheck(pageTitle){
    return (pageTitle == 'History' || pageTitle == 'Log Out')? false : true;
  }

  profileCheck(pageTitle) {
    return (pageTitle == 'Sign Up/Login')? true : false;
  }

  unauthorizedCheck() {
    this.user_name = User.user_name;
    return User.unauthorized? true : false;
  }

  getTitle(pageTitle) {
    switch(pageTitle){
      case 'Home': return this.icons[0];
      case 'History': return this.icons[1];
      case 'Sign Up/Login': return this.icons[2];
      case 'Log Out': return this.icons[3];
    }
  }
}
