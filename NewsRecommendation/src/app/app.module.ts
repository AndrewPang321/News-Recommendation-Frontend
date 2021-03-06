import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environment';
import { AuthService } from '../providers/auth.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContentPage } from '../pages/content/content';
import { SignUpLoginPage } from '../pages/signup_login/signup_login';
import { HistoryPage } from '../pages/history/history';
import { NewsPage } from '../pages/news/news';
import { NewsContentPage } from '../pages/news-content/news-content';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContentPage,
    SignUpLoginPage,
    HistoryPage,
    NewsPage,
    NewsContentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'news-recommendation'),  // imports firebase/app
    AngularFireDatabaseModule,  // imports firebase/database
    AngularFireAuthModule,      // imports firebase/authentication
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),  // i18n ng2-translate
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContentPage,
    SignUpLoginPage,
    HistoryPage,
    NewsPage,
    NewsContentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
